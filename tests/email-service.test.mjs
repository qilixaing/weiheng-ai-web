import test from 'node:test';
import assert from 'node:assert/strict';
import { smtpIsConfigured } from '../server/email-service.mjs';

test('SMTP delivery is enabled only when the server has complete private mail settings', () => {
  assert.equal(smtpIsConfigured({}), false);
  assert.equal(smtpIsConfigured({ SMTP_HOST:'smtp.example.com', SMTP_PORT:'465', SMTP_USER:'site@example.com', SMTP_PASSWORD:'', SMTP_FROM:'site@example.com' }), false);
  assert.equal(smtpIsConfigured({ SMTP_HOST:'smtp.example.com', SMTP_PORT:'465', SMTP_USER:'site@example.com', SMTP_PASSWORD:'server-only-secret', SMTP_FROM:'site@example.com' }), true);
});
