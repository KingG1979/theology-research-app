// Vercel serverless function — receives feedback and (eventually) emails it.
//
// Currently: validates the payload and returns 200.
// Later:     uncomment the nodemailer block below and add ZOHO_EMAIL +
//            ZOHO_PASSWORD to your Vercel environment variables.

// TODO: Uncomment when SMTP credentials are added to Vercel env vars
// const nodemailer = require('nodemailer');
// const transporter = nodemailer.createTransport({
//   host: 'smtp.zoho.eu',
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.ZOHO_EMAIL,     // support@ccc-study.org
//     pass: process.env.ZOHO_PASSWORD,  // App-specific password
//   }
// });

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

  // TODO: Uncomment when SMTP credentials are available
  // try {
  //   await transporter.sendMail({
  //     from: `"CCC Study Feedback" <${process.env.ZOHO_EMAIL}>`,
  //     to: 'support@ccc-study.org',
  //     subject: `[${feedbackType.toUpperCase()}] New feedback from ${from}`,
  //     text: [
  //       `Type: ${feedbackType}`,
  //       `From: ${from}`,
  //       `Page: ${feedbackPage}`,
  //       ``,
  //       message.trim(),
  //     ].join('\n'),
  //   });
  // } catch (err) {
  //   console.error('Email send failed:', err);
  //   return res.status(500).json({ error: 'Failed to send email' });
  // }

  return res.status(200).json({
    ok: true,
    note: "Email delivery is not yet active — feedback was stored in Supabase.",
  });
}
