"use server";

import { db, schema } from "@/lib/db";
import { sendContactNotification } from "@/lib/email";
import { z } from "zod";

const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters").max(60),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().optional(),
  subject: z.string().trim().min(4, "Subject must be at least 4 characters").max(50),
  message: z.string().trim().min(15, "Message must be at least 15 characters").max(1000),
});

export async function submitContactForm(
  data: unknown
): Promise<{ success: true } | { error: string }> {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { fullName, email, phone, subject, message } = parsed.data;

  try {
    await db.insert(schema.contactSubmissions).values({
      fullName,
      email,
      phone: phone || null,
      subject,
      message,
    });
  } catch (err) {
    console.error("[contact] Failed to save submission:", err);
    return { error: "Failed to save your message. Please try again later." };
  }

  try {
    await sendContactNotification({ fullName, email, phone, subject, message });
  } catch (err) {
    const smtpError = err as {
      name?: string;
      code?: string;
      responseCode?: number;
      message?: string;
    };

    console.error("[contact] Failed to send email notification", {
      name: smtpError.name,
      code: smtpError.code,
      responseCode: smtpError.responseCode,
      message: smtpError.message,
      subject,
      senderEmail: email,
    });

    if (
      smtpError.name === "SmtpAuthError" ||
      smtpError.code === "EAUTH" ||
      smtpError.responseCode === 535 ||
      /authentication unsuccessful|invalid login/i.test(smtpError.message ?? "")
    ) {
      return {
        error:
          "We received your message, but email delivery failed. Please try again later.",
      };
    }

    return {
      error:
        "We received your message, but email delivery failed. Please try again later.",
    };
  }

  return { success: true };
}
