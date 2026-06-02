import "server-only";
import nodemailer from "nodemailer";

export interface ContactEmailData {
  fullName: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
}

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT ?? 587);

  if (!host || !user || !pass) {
    return null;
  }

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error("Invalid SMTP port configuration");
  }

  return { host, user, pass, port };
}

function buildContactEmailHtml(data: ContactEmailData): string {
  const date = new Date().toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  });

  const phoneRow = data.phone
    ? `<tr>
        <td style="padding:8px 0;color:#888;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;width:120px">Phone</td>
        <td style="padding:8px 0;color:#0b0e19;font-size:15px">${escapeHtml(data.phone)}</td>
      </tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><title>New Contact Submission</title></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 20px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08)">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#7d25cd,#3caefc);padding:24px 32px">
            <p style="margin:0;color:#fff;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;opacity:.8">SAARZ Website</p>
            <h1 style="margin:4px 0 0;color:#fff;font-size:22px;font-weight:700">New Contact Form Submission</h1>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:32px">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:8px 0;color:#888;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;width:120px">Full Name</td>
                <td style="padding:8px 0;color:#0b0e19;font-size:15px;font-weight:600">${escapeHtml(data.fullName)}</td>
              </tr>
              <tr><td colspan="2" style="border-bottom:1px solid #f0f0f0"></td></tr>
              <tr>
                <td style="padding:8px 0;color:#888;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em">Email</td>
                <td style="padding:8px 0;font-size:15px"><a href="mailto:${escapeHtml(data.email)}" style="color:#7d25cd;text-decoration:none">${escapeHtml(data.email)}</a></td>
              </tr>
              <tr><td colspan="2" style="border-bottom:1px solid #f0f0f0"></td></tr>
              ${phoneRow}
              ${data.phone ? '<tr><td colspan="2" style="border-bottom:1px solid #f0f0f0"></td></tr>' : ""}
              <tr>
                <td style="padding:8px 0;color:#888;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em">Subject</td>
                <td style="padding:8px 0;color:#0b0e19;font-size:15px">${escapeHtml(data.subject)}</td>
              </tr>
              <tr><td colspan="2" style="border-bottom:1px solid #f0f0f0"></td></tr>
              <tr>
                <td style="padding:8px 0;color:#888;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;vertical-align:top">Message</td>
                <td style="padding:8px 0"></td>
              </tr>
              <tr>
                <td colspan="2">
                  <div style="background:#f9f9f9;border-left:3px solid #7d25cd;padding:14px 18px;border-radius:4px;color:#0b0e19;font-size:15px;line-height:1.6;white-space:pre-wrap">${escapeHtml(data.message)}</div>
                </td>
              </tr>
              <tr><td colspan="2" style="padding:12px 0"></td></tr>
              <tr>
                <td style="padding:8px 0;color:#888;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em">Submitted</td>
                <td style="padding:8px 0;color:#555;font-size:14px">${date}</td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:16px 32px;background:#f9f9f9;border-top:1px solid #eee">
            <p style="margin:0;font-size:12px;color:#aaa">Reply directly to this email to respond to ${escapeHtml(data.fullName)}.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendContactNotification(
  data: ContactEmailData
): Promise<void> {
  const smtpConfig = getSmtpConfig();

  if (!smtpConfig) {
    throw new Error("SMTP is not configured");
  }

  const useImplicitTls = false;
  const transportSummary = {
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: useImplicitTls,
    requireTLS: !useImplicitTls,
    tlsMinVersion: "TLSv1.2",
    user: smtpConfig.user,
    recipient: process.env.CONTACT_RECEIVER_EMAIL ?? smtpConfig.user,
  };

  console.info("[email] SMTP transport configuration", transportSummary);

  const transporter = nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: useImplicitTls,
    requireTLS: !useImplicitTls,
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
    tls: {
      minVersion: "TLSv1.2",
    },
    auth: {
      user: smtpConfig.user,
      pass: smtpConfig.pass,
    },
  });

  try {
    // Microsoft 365 / Outlook typically requires SMTP AUTH to be enabled for the mailbox.
    // If the account uses MFA, an app password may be required instead of the normal password.
    const from = `"${process.env.SMTP_FROM_NAME ?? "SAARZ Website"}" <${process.env.SMTP_FROM_EMAIL ?? smtpConfig.user}>`;

    await transporter.verify();

    await transporter.sendMail({
      from,
      to: transportSummary.recipient,
      replyTo: `"${data.fullName}" <${data.email}>`,
      subject: `[Contact] ${data.subject}`,
      html: buildContactEmailHtml(data),
    });
  } catch (error) {
    const smtpError = error as {
      code?: string;
      responseCode?: number;
      command?: string;
      message?: string;
    };

    console.error("[email] Failed to send contact notification", {
      code: smtpError.code,
      responseCode: smtpError.responseCode,
      command: smtpError.command,
      message: smtpError.message,
      config: transportSummary,
    });

    if (
      smtpError.code === "EAUTH" ||
      smtpError.responseCode === 535 ||
      /authentication unsuccessful|invalid login/i.test(smtpError.message ?? "")
    ) {
      const authError = new Error(
        "SMTP authentication failed. Check the Outlook mailbox password or app password, and confirm SMTP AUTH is enabled."
      );
      authError.name = "SmtpAuthError";
      throw authError;
    }

    throw new Error("Failed to send contact email notification");
  }
}
