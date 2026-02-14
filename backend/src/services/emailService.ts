import { Resend } from 'resend';
import { env } from '../config/env.js';

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

export async function sendContactNotification(data: {
  name: string;
  email: string;
  company?: string;
  message: string;
}): Promise<void> {
  if (!resend) {
    console.warn('Resend not configured, skipping email notification');
    return;
  }

  await resend.emails.send({
    from: 'Portfolio <noreply@daniel-granda.com>',
    to: env.CONTACT_EMAIL,
    subject: `New contact from ${data.name}`,
    html: `
      <h2>New Portfolio Contact</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      ${data.company ? `<p><strong>Company:</strong> ${escapeHtml(data.company)}</p>` : ''}
      <hr />
      <p>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>
    `,
    replyTo: data.email,
  });
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
