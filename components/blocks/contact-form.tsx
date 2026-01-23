"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { submitContactForm } from "@/app/actions/contact";
import { cn } from "@/lib/utils";
import { contactSchema, type ContactFormData } from "@/lib/validation/contact";

interface ContactFormProps {
  settings?: {
    nameLabel?: string;
    namePlaceholder?: string;
    emailLabel?: string;
    emailPlaceholder?: string;
    messageLabel?: string;
    messagePlaceholder?: string;
    submitButtonLabel?: string;
    successMessage?: string;
    errorMessage?: string;
  };
}

export function ContactForm({ settings }: ContactFormProps) {
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string | null;
  }>({ type: null, message: null });

  const {
    nameLabel = "Name",
    namePlaceholder = "Your name",
    emailLabel = "Email",
    emailPlaceholder = "Your email",
    messageLabel = "Message",
    messagePlaceholder = "Tell us more...",
    submitButtonLabel = "Send Message",
    successMessage = "Thank you! Your message has been sent.",
    errorMessage = "Something went wrong. Please try again.",
  } = settings || {};

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormData) {
    setStatus({ type: null, message: null });
    
    try {
      const result = await submitContactForm(data);
      if (result.success) {
        setStatus({ type: "success", message: successMessage });
        form.reset();
      } else {
        setStatus({ type: "error", message: result.message || errorMessage });
      }
    } catch (error) {
      setStatus({ type: "error", message: errorMessage });
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{submitButtonLabel}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">{nameLabel}</label>
            <Input
              id="name"
              placeholder={namePlaceholder}
              {...form.register("name")}
              aria-invalid={!!form.formState.errors.name}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">{emailLabel}</label>
            <Input
              id="email"
              type="email"
              placeholder={emailPlaceholder}
              {...form.register("email")}
              aria-invalid={!!form.formState.errors.email}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">{messageLabel}</label>
            <Textarea
              id="message"
              placeholder={messagePlaceholder}
              {...form.register("message")}
              aria-invalid={!!form.formState.errors.message}
            />
            {form.formState.errors.message && (
              <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "..." : submitButtonLabel}
          </Button>

          {status.message && (
            <p className={cn(
              "text-sm font-medium text-center p-2 rounded-md",
              status.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            )}>
              {status.message}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
