// A damped water-height simulation. RGBA8 packs current/previous heights at
// 16-bit precision, so no float-texture extensions or external libraries are needed.
const VERTEX = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;
const HEIGHT = `
  float unpackHeight(vec2 value) {
    return (dot(value, vec2(65280.0, 255.0)) - 32768.0) / 32767.0;
  }
  vec2 packHeight(float value) {
    float n = floor(clamp(value * 32767.0 + 32768.0, 0.0, 65535.0) + 0.5);
    return vec2(floor(n / 256.0), mod(n, 256.0)) / 255.0;
  }
`;
const SIMULATION = `
  precision highp float;
  varying vec2 v_uv;
  uniform sampler2D u_state;
  uniform vec2 u_size;
  uniform vec2 u_from;
  uniform vec2 u_to;
  uniform float u_radius;
  uniform float u_strength;
  ${HEIGHT}
  float heightAt(vec2 uv) { return unpackHeight(texture2D(u_state, uv).rg); }
  void main() {
    vec2 texel = 1.0 / u_size;
    vec4 state = texture2D(u_state, v_uv);
    float h = unpackHeight(state.rg);
    float previous = unpackHeight(state.ba);
    float laplacian = heightAt(v_uv + vec2(texel.x, 0.0))
      + heightAt(v_uv - vec2(texel.x, 0.0))
      + heightAt(v_uv + vec2(0.0, texel.y))
      + heightAt(v_uv - vec2(0.0, texel.y)) - 4.0 * h;
    float next = (2.0 * h - previous + 0.44 * laplacian) * 0.982;
    // Inject a smooth stroke along the whole pointer segment, not a following spot.
    vec2 p = v_uv * u_size;
    vec2 segment = u_to - u_from;
    float t = clamp(dot(p - u_from, segment) / max(dot(segment, segment), 0.001), 0.0, 1.0);
    float distance = length(p - u_from - segment * t) / u_radius;
    next += exp(-distance * distance * 2.0) * u_strength;
    // A soft absorbing boundary prevents hard reflections at the screen edges.
    float edge = min(min(v_uv.x, 1.0-v_uv.x) * u_size.x,
                     min(v_uv.y, 1.0-v_uv.y) * u_size.y);
    next *= mix(0.91, 1.0, smoothstep(0.0, 14.0, edge));
    gl_FragColor = vec4(packHeight(next), packHeight(h));
  }
`;
const DISPLAY = `
  precision highp float;
  varying vec2 v_uv;
  uniform sampler2D u_state;
  uniform vec2 u_size;
  ${HEIGHT}
  float heightAt(vec2 uv) { return unpackHeight(texture2D(u_state, uv).rg); }
  void main() {
    // Interpolate decoded heights, never the packed bytes. Four taps also give
    // the surface normal, keeping the full-screen shading pass inexpensive.
    vec2 cell = v_uv * u_size - 0.5;
    vec2 fraction = fract(cell);
    vec2 uv = (floor(cell) + 0.5) / u_size;
    vec2 texel = 1.0 / u_size;
    float a = heightAt(uv);
    float b = heightAt(uv + vec2(texel.x, 0.0));
    float c = heightAt(uv + vec2(0.0, texel.y));
    float d = heightAt(uv + texel);
    float h = mix(mix(a,b,fraction.x), mix(c,d,fraction.x), fraction.y);
    vec2 slope = vec2(mix(b-a,d-c,fraction.y), mix(c-a,d-b,fraction.x));
    vec2 refracted = v_uv + slope * 0.62;
    float diagonal = clamp((refracted.x + 1.0-refracted.y) * 0.5, 0.0, 1.0);
    vec3 base = mix(vec3(0.965,0.985,1.0), vec3(0.908,0.950,0.985), diagonal);
    float shade = clamp(dot(slope, vec2(-0.65,0.76)) * 26.0, -0.22, 0.22);
    vec3 color = mix(base, vec3(0.55,0.80,0.95), min(max(-shade,0.0)*0.86,0.15));
    color += max(shade,0.0) * vec3(0.20,0.16,0.08);
    color = mix(color, vec3(0.66,0.87,0.96), min(abs(h)*0.65,0.08));
    gl_FragColor = vec4(clamp(color,0.0,1.0),1.0);
  }
`;

export function initAmbientBackground() {
  const background = document.querySelector('.ambient-background');
  const canvas = background?.querySelector('.fluid-background-canvas');
  if (!canvas || background.dataset.initialized) return;
  background.dataset.initialized = 'true';
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let gl = null, resources = null, frame = 0, lastFrame = 0, accumulator = 0;
  let width = 1, height = 1, simWidth = 1, simHeight = 1;
  let previousPoint = null, stroke = null, lastInput = -Infinity;
  let readIndex = 0, disposed = false;
  const STEP = 1 / 60;
  const MAX_STROKES_PER_FRAME = 1;
  const IDLE_MS = 12000;

  const stop = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    lastFrame = 0;
    accumulator = 0;
    background.dataset.active = 'false';
  };
  const release = () => {
    if (!gl || !resources) return;
    for (const target of resources.targets) {
      gl.deleteTexture(target.texture);
      gl.deleteFramebuffer(target.framebuffer);
    }
    gl.deleteBuffer(resources.quad);
    if (resources.sim) gl.deleteProgram(resources.sim.program);
    if (resources.display) gl.deleteProgram(resources.display.program);
    resources = null;
  };
  const fail = error => {
    stop();
    release();
    background.dataset.renderer = 'fallback';
    console.warn('Water background is using its static gradient fallback.', error);
  };
  const createProgram = fragment => {
    const shaders = [];
    const program = gl.createProgram();
    try {
      for (const [type, source] of [[gl.VERTEX_SHADER, VERTEX], [gl.FRAGMENT_SHADER, fragment]]) {
        const shader = gl.createShader(type);
        shaders.push(shader);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
        gl.attachShader(program, shader);
      }
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
      const uniforms = {};
      for (const name of ['u_state','u_size','u_from','u_to','u_radius','u_strength']) {
        uniforms[name] = gl.getUniformLocation(program, name);
      }
      return { program, position: gl.getAttribLocation(program, 'a_position'), uniforms };
    } catch (error) {
      gl.deleteProgram(program);
      throw error;
    } finally {
      for (const shader of shaders) gl.deleteShader(shader);
    }
  };
  const bind = program => {
    gl.useProgram(program.program);
    gl.bindBuffer(gl.ARRAY_BUFFER, resources.quad);
    gl.enableVertexAttribArray(program.position);
    gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, resources.targets[readIndex].texture);
    gl.uniform1i(program.uniforms.u_state, 0);
    gl.uniform2f(program.uniforms.u_size, simWidth, simHeight);
  };
  const draw = () => {
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, canvas.width, canvas.height);
    bind(resources.display);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  };
  const clear = () => {
    if (!resources || gl.isContextLost()) return;
    gl.clearColor(128/255, 0, 128/255, 0);
    for (const target of resources.targets) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.framebuffer);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }
    readIndex = 0;
    previousPoint = stroke = null;
    draw();
  };
  const resize = () => {
    width = Math.max(1, window.innerWidth);
    height = Math.max(1, window.innerHeight);
    if (!resources || gl.isContextLost()) return;
    stop();
    // Cap both passes independently; high-DPI screens do not multiply GPU cost.
    const displayScale = Math.min(window.devicePixelRatio || 1, 1.25, 1440 / Math.max(width,height));
    const simulationScale = Math.min(1, (width < 720 ? 300 : 420) / Math.max(width,height));
    canvas.width = Math.max(1, Math.round(width * displayScale));
    canvas.height = Math.max(1, Math.round(height * displayScale));
    simWidth = Math.max(2, Math.round(width * simulationScale));
    simHeight = Math.max(2, Math.round(height * simulationScale));
    for (const target of resources.targets) {
      gl.bindTexture(gl.TEXTURE_2D, target.texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, simWidth, simHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.framebuffer);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, target.texture, 0);
      if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) throw new Error('Water framebuffer unavailable');
    }
    clear();
  };
  const step = input => {
    const destination = 1-readIndex;
    gl.bindFramebuffer(gl.FRAMEBUFFER, resources.targets[destination].framebuffer);
    gl.viewport(0,0,simWidth,simHeight);
    bind(resources.sim);
    const u = resources.sim.uniforms;
    gl.uniform2f(u.u_from, (input?.from.x || 0)*simWidth, (input?.from.y || 0)*simHeight);
    gl.uniform2f(u.u_to, (input?.to.x || 0)*simWidth, (input?.to.y || 0)*simHeight);
    gl.uniform1f(u.u_radius, Math.max(3, (input?.radius || 44)*simWidth/width));
    gl.uniform1f(u.u_strength, input ? input.strength : 0);
    gl.drawArrays(gl.TRIANGLES,0,6);
    readIndex = destination;
  };
  const animate = now => {
    frame = 0;
    if (disposed || document.hidden || motion.matches || !resources || gl.isContextLost()) return;
    if (now-lastInput > IDLE_MS) {
      clear();
      stop();
      return;
    }
    // Render at 30fps, integrate at a fixed 60Hz so damping is refresh-rate independent.
    if (!lastFrame || now-lastFrame >= 1000/30-1) {
      accumulator += lastFrame ? Math.min((now-lastFrame)/1000, 0.067) : 1/30;
      lastFrame = now;
      const input = stroke;
      stroke = null;
      let strokesInjected = 0;
      while (accumulator >= STEP) {
        step(strokesInjected < MAX_STROKES_PER_FRAME ? input : null);
        if (input && strokesInjected < MAX_STROKES_PER_FRAME) strokesInjected++;
        accumulator -= STEP;
      }
      draw();
    }
    frame = requestAnimationFrame(animate);
  };
  const setup = () => {
    if (disposed || motion.matches) {
      background.dataset.renderer = 'static';
      return;
    }
    try {
      gl ||= canvas.getContext('webgl', { alpha: false, antialias: false, depth: false, stencil: false, preserveDrawingBuffer: false, powerPreference: 'low-power' });
      if (!gl) throw new Error('WebGL unavailable');
      if (!gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER,gl.HIGH_FLOAT)?.precision) throw new Error('High precision unavailable');
      resources = { quad: gl.createBuffer(), targets: [], sim: null, display: null };
      resources.sim = createProgram(SIMULATION);
      resources.display = createProgram(DISPLAY);
      gl.bindBuffer(gl.ARRAY_BUFFER,resources.quad);
      gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
      gl.disable(gl.DEPTH_TEST);
      gl.disable(gl.BLEND);
      gl.disable(gl.DITHER); // Packed height bytes must remain exact.
      for (let i=0;i<2;i++) {
        const texture = gl.createTexture();
        const framebuffer = gl.createFramebuffer();
        resources.targets.push({texture,framebuffer});
        gl.bindTexture(gl.TEXTURE_2D,texture);
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
      }
      resize();
      background.dataset.renderer = 'webgl';
    } catch (error) { fail(error); }
  };
  const onMove = event => {
    if (disposed || document.hidden || motion.matches || !resources || gl.isContextLost() || event.isPrimary === false) return;
    const pointer = event.touches ? event.touches[0] : event;
    if (!pointer || !Number.isFinite(pointer.clientX) || !Number.isFinite(pointer.clientY)) return;
    const now = performance.now();
    const point = { x: Math.max(0,Math.min(1,pointer.clientX/width)), y: 1-Math.max(0,Math.min(1,pointer.clientY/height)) };
    const pointerMovementX = Number.isFinite(pointer.movementX) ? pointer.movementX : 0;
    const pointerMovementY = Number.isFinite(pointer.movementY) ? pointer.movementY : 0;
    const previousDistance = previousPoint
      ? Math.hypot((point.x-previousPoint.x)*width,(point.y-previousPoint.y)*height)
      : 0;
    const eventDistance = Math.hypot(pointerMovementX,pointerMovementY);
    const distance = Math.max(previousDistance,eventDistance);
    const isMoveEvent = event.type === 'pointermove' || event.type === 'mousemove' || event.type === 'touchmove';
    if (!isMoveEvent && distance < 0.15) return;
    // Use the actual movement delta for strength even after a pause; otherwise
    // the old 150ms gate turned the first slow move after stopping into zero.
    const from = previousPoint && now-lastInput < 180
      ? previousPoint
      : {
          x: Math.max(0,Math.min(1,point.x-pointerMovementX/width)),
          y: Math.max(0,Math.min(1,point.y+pointerMovementY/height))
        };
    // Keep one merged segment at a time: fast pointer events never build a queue.
    stroke = {
      from: stroke?.from || from,
      to: point,
      strength: Math.min(0.12,0.022+distance*0.001),
      radius: Math.min(52,18+distance*0.7)
    };
    previousPoint = point;
    lastInput = now;
    background.dataset.active = 'true';
    if (!frame) frame = requestAnimationFrame(animate);
  };
  const leave = () => { previousPoint = null; };
  const onResize = () => { try { resize(); } catch (error) { fail(error); } };
  const onMotionChange = () => {
    stop();
    if (motion.matches) {
      clear();
      background.dataset.renderer = 'static';
    } else if (resources) {
      clear();
      background.dataset.renderer = 'webgl';
    } else setup();
  };
  canvas.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    stop();
    resources = null;
    background.dataset.renderer = 'fallback';
  });
  canvas.addEventListener('webglcontextrestored', setup);
  if ('PointerEvent' in window) {
    window.addEventListener('pointermove',onMove,{passive:true});
    window.addEventListener('pointerdown',onMove,{passive:true});
    document.documentElement.addEventListener('pointerleave',leave,{passive:true});
    window.addEventListener('pointercancel',leave,{passive:true});
    window.addEventListener('pointerup',event => { if(event.pointerType!=='mouse')leave(); },{passive:true});
  } else {
    window.addEventListener('mousemove',onMove,{passive:true});
    window.addEventListener('touchstart',onMove,{passive:true});
    window.addEventListener('touchmove',onMove,{passive:true});
    window.addEventListener('touchend',leave,{passive:true});
    window.addEventListener('touchcancel',leave,{passive:true});
    document.documentElement.addEventListener('mouseleave',leave,{passive:true});
  }
  window.addEventListener('blur',leave);
  window.addEventListener('resize',onResize,{passive:true});
  document.addEventListener('visibilitychange',() => {
    stop();
    if(!document.hidden)clear();
  });
  motion.addEventListener('change',onMotionChange);
  window.addEventListener('pagehide',event => {
    stop();
    if(!event.persisted) { disposed=true; release(); }
  });
  window.addEventListener('pageshow',event => { if(event.persisted)clear(); });
  setup();
}
