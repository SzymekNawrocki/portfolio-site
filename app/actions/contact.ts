"use server";

import { z } from "zod";
import { createClient } from "next-sanity";
import { Resend } from "resend";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { contactSchema, type ContactFormData } from "@/lib/validation/contact";

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(data: ContactFormData) {
  try {

    const validatedData = contactSchema.parse(data);

    await writeClient.create({
      _type: "contactMessage",
      ...validatedData,
      createdAt: new Date().toISOString(),
    });

    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY env var. Skipping email notification.");
    } else {
      const { data: _emailData, error: emailError } = await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["devnawrocki@gmail.com"],
        subject: `Nowa wiadomość od: ${validatedData.name}`,
        html: `<p><strong>Imię:</strong> ${validatedData.name}</p>
               <p><strong>Email:</strong> ${validatedData.email}</p>
               <p><strong>Wiadomość:</strong> ${validatedData.message}</p>`,
      });

      if (emailError) {
        console.error("Resend email error:", emailError);
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Contact form error:", error);
    if (error instanceof z.ZodError) {
      return { success: false, message: "Invalid form data. Please check your inputs." };
    }
    return { success: false, message: "Something went wrong. Please try again later." };
  }
}
