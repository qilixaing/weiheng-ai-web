import http from 'node:http';
import https from 'node:https';
import tls from 'node:tls';
import { Readable } from 'node:stream';

class EnvProxyError extends Error {
  constructor(code) {
    super(code);
    this.name = 'EnvProxyError';
    this.code = code;
  }
}

function getProxyUrl(env, protocol) {
  const value = protocol === 'https:'
    ? (env.HTTPS_PROXY || env.https_proxy || env.ALL_PROXY || env.all_proxy)
    : (env.HTTP_PROXY || env.http_proxy || env.ALL_PROXY || env.all_proxy);
  if (!value) return null;

  let proxy;
  try {
    proxy = new URL(value);
  } catch {
    throw new EnvProxyError('PROXY_CONFIG');
  }
  if (!['http:', 'https:'].includes(proxy.protocol) || !proxy.hostname) {
    throw new EnvProxyError('PROXY_CONFIG');
  }
  return proxy;
}

function bypassesProxy(target, env) {
  const noProxy = String(env.NO_PROXY || env.no_proxy || '');
  const hostname = target.hostname.toLowerCase();
  const port = target.port || (target.protocol === 'https:' ? '443' : '80');

  return noProxy.split(',').some((entry) => {
    const token = entry.trim().toLowerCase();
    if (!token) return false;
    if (token === '*') return true;

    const separator = token.lastIndexOf(':');
    const hasPort = separator > -1 && !token.endsWith(']');
    const ruleHost = (hasPort ? token.slice(0, separator) : token).replace(/^\*?\./, '');
    const rulePort = hasPort ? token.slice(separator + 1) : '';
    if (rulePort && rulePort !== port) return false;
    return hostname === ruleHost || hostname.endsWith(`.${ruleHost}`);
  });
}

function proxyErrorFrom(error) {
  if (error instanceof EnvProxyError) return error;
  if (error?.name === 'TimeoutError' || error?.code === 'ETIMEDOUT') {
    return new EnvProxyError('PROXY_TIMEOUT');
  }
  if (['ECONNREFUSED', 'ENOTFOUND', 'EHOSTUNREACH', 'ECONNRESET'].includes(error?.code)) {
    return new EnvProxyError('PROXY_UNAVAILABLE');
  }
  if (String(error?.code || '').startsWith('ERR_TLS') || String(error?.code || '').startsWith('CERT_')) {
    return new EnvProxyError('PROXY_TLS_FAILED');
  }
  return new EnvProxyError('PROXY_CONNECT_FAILED');
}

function openTunnel(target, proxy, signal) {
  return new Promise((resolve, reject) => {
    const proxyPort = Number(proxy.port || (proxy.protocol === 'https:' ? 443 : 80));
    const requestFn = proxy.protocol === 'https:' ? https.request : http.request;
    const proxyHeaders = { Host: `${target.hostname}:${target.port || 443}` };
    if (proxy.username || proxy.password) {
      const credentials = `${decodeURIComponent(proxy.username)}:${decodeURIComponent(proxy.password)}`;
      proxyHeaders['Proxy-Authorization'] = `Basic ${Buffer.from(credentials).toString('base64')}`;
    }

    const request = requestFn({
      protocol: proxy.protocol,
      hostname: proxy.hostname,
      port: proxyPort,
      method: 'CONNECT',
      path: `${target.hostname}:${target.port || 443}`,
      headers: proxyHeaders,
      signal,
    });

    request.setTimeout(12000, () => request.destroy(Object.assign(new Error('timeout'), { code: 'ETIMEDOUT' })));
    request.once('connect', (response, socket, head) => {
      if (response.statusCode !== 200) {
        socket.destroy();
        reject(new EnvProxyError(response.statusCode === 407 ? 'PROXY_AUTH_FAILED' : 'PROXY_TUNNEL_FAILED'));
        return;
      }
      if (head.length) socket.unshift(head);

      const secureSocket = tls.connect({
        socket,
        servername: target.hostname,
        ALPNProtocols: ['http/1.1'],
      });
      secureSocket.once('secureConnect', () => resolve(secureSocket));
      secureSocket.once('error', (error) => reject(proxyErrorFrom(error)));
    });
    request.once('error', (error) => reject(proxyErrorFrom(error)));
    request.end();
  });
}

function requestThroughTunnel(target, options, proxy) {
  return new Promise((resolve, reject) => {
    const agent = new https.Agent({ keepAlive: false, maxSockets: 1 });
    agent.createConnection = (connectionOptions, callback) => {
      openTunnel(target, proxy, options.signal).then(
        (socket) => callback(null, socket),
        (error) => callback(error),
      );
      return undefined;
    };

    const headers = Object.fromEntries(new Headers(options.headers || {}).entries());
    headers['accept-encoding'] = 'identity';
    if (options.body !== undefined && headers['content-length'] === undefined) {
      headers['content-length'] = String(Buffer.byteLength(options.body));
    }
    const request = https.request(target, {
      method: options.method || 'GET',
      headers,
      agent,
      signal: options.signal,
    }, (response) => {
      if (options.stream) {
        response.once('end', () => agent.destroy());
        response.once('close', () => agent.destroy());
        resolve({
          ok: response.statusCode >= 200 && response.statusCode < 300,
          status: response.statusCode,
          body: Readable.toWeb(response),
        });
        return;
      }
      const chunks = [];
      let size = 0;
      response.on('data', (chunk) => {
        size += chunk.length;
        if (size > 2_200_000) {
          request.destroy(new EnvProxyError('UPSTREAM_RESPONSE_TOO_LARGE'));
          return;
        }
        chunks.push(chunk);
      });
      response.once('error', (error) => reject(error));
      response.once('end', () => {
        const body = Buffer.concat(chunks).toString('utf8');
        resolve({
          ok: response.statusCode >= 200 && response.statusCode < 300,
          status: response.statusCode,
          json: async () => JSON.parse(body),
        });
      });
    });

    request.once('error', (error) => reject(error));
    if (options.body !== undefined) request.write(options.body);
    if (!options.stream) request.once('close', () => agent.destroy());
    request.end();
  });
}

/** Use the OS-configured HTTPS proxy when present; works on Node versions before built-in proxy support. */
export async function fetchWithEnvironmentProxy(input, options = {}, env = process.env) {
  const target = new URL(input);
  const { stream, ...fetchOptions } = options;
  if (target.protocol !== 'https:' || bypassesProxy(target, env)) {
    return fetch(input, fetchOptions);
  }
  const proxy = getProxyUrl(env, target.protocol);
  if (!proxy) return fetch(input, fetchOptions);
  return requestThroughTunnel(target, options, proxy);
}

