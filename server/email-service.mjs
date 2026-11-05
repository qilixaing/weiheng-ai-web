import nodemailer from 'nodemailer';

export function smtpIsConfigured(env = process.env) {
  return !!(String(env.SMTP_HOST || '').trim()
    && Number(env.SMTP_PORT) > 0
    && String(env.SMTP_USER || '').trim()
    && String(env.SMTP_PASSWORD || '').trim()
    && String(env.SMTP_FROM || '').trim());
}

export async function sendRegistrationCode(env, recipient, code, purpose = 'register') {
  if (!smtpIsConfigured(env)) throw new Error('SMTP is not configured');
  const action=purpose==='reset'?'重置密码':'注册';
  const port = Number(env.SMTP_PORT);
  const secure = env.SMTP_SECURE === 'true' || port === 465;
  const transporter = nodemailer.createTransport({
    host: String(env.SMTP_HOST).trim(),
    port,
    secure,
    requireTLS: !secure,
    auth: { user: String(env.SMTP_USER).trim(), pass: String(env.SMTP_PASSWORD) },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
  try {
    await transporter.sendMail({
      from: String(env.SMTP_FROM).trim(),
      to: recipient,
      subject: '维衡 AI 邮箱验证码',
      text: `你的维衡 AI ${action}验证码是：${code}。验证码 10 分钟内有效，请勿转发给他人。若非本人操作，请忽略此邮件。`,
      html: `<div style="font-family:Arial,sans-serif;color:#203b30;max-width:560px;margin:auto;padding:24px"><h2>维衡 AI 邮箱验证</h2><p>你的${action}验证码是：</p><p style="font-size:32px;letter-spacing:8px;font-weight:700">${code}</p><p>验证码 10 分钟内有效，请勿转发给他人。若非本人操作，请忽略此邮件。</p></div>`,
    });
  } finally {
    transporter.close();
  }
}
