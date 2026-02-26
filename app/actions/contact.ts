"use server";

import { z } from "zod";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { contactSchema, type ContactFormData } from "@/lib/validation/contact";

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

export async function submitContactForm(data: ContactFormData) {
  try {

    const validatedData = contactSchema.parse(data);

    await writeClient.create({
      _type: "contactMessage",
      ...validatedData,
      createdAt: new Date().toISOString(),
    });

    return { success: true };
  } catch (error) {
    console.error("Contact form error:", error);
    if (error instanceof z.ZodError) {
      return { success: false, message: "Invalid form data. Please check your inputs." };
    }
    return { success: false, message: "Something went wrong. Please try again later." };
  }
}
