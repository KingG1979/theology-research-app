// Vercel serverless function — receives feedback and emails it.
// Requires ZOHO_EMAIL and ZOHO_PASSWORD in Vercel environment variables.

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.eu',
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_PASSWORD,
  },
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { type, message, user_email, page } = req.body || {};

  if (!message || !message.trim()) {
    return res.status(400).json({ error: "Message is required" });
  }

  const feedbackType = type || "suggestion";
  const from = user_email || "anonymous";
  const feedbackPage = page || "unknown";
  const timestamp = new Date().toISOString();

  try {
    await transporter.sendMail({
      from: 'support@ccc-study.org',
      to: 'support@ccc-study.org',
      subject: `CCCR Feedback: ${feedbackType}`,
      text: [
        `Type:      ${feedbackType}`,
        `From:      ${from}`,
        `Page:      ${feedbackPage}`,
        `Timestamp: ${timestamp}`,
        ``,
        `Message:`,
        `--------`,
        message.trim(),
      ].join('\n'),
    });
  } catch (err) {
    console.error('Email send failed:', err);
    // Supabase is the primary store; email is only a notification.
  }

  return res.status(200).json({ ok: true });
}
