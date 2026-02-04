import { Resend } from 'resend';
import { ENV } from "../lib/env.js";
import { createWelcomeEmailTemplate } from './emailTemplates.js';

const resend = new Resend(ENV.RESEND_API_KEY);

export const sendWelcomeEmail = async (email, name, clientURL) => {
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: 'Welcome to the App',
    html: createWelcomeEmailTemplate(name, clientURL),
  });

  if (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Failed to send welcome email");
  }

  console.log("Welcome Email sent Successfully", data);
}