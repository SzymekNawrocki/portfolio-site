import { PortableText } from "next-sanity";
import { ContactForm } from "./contact-form";
import { SectionTitle } from "@/components/ui/section-title";
import { Mail, Phone, MapPin } from "lucide-react";

interface ContactSectionProps {
  title: string;
  description?: any[];
  contactDetails?: {
    email?: string;
    phone?: string;
    location?: string;
  };
  showForm?: boolean;
  formSettings?: {
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

export function ContactSection({
  title,
  description,
  contactDetails,
  showForm,
  formSettings,
}: ContactSectionProps) {
  return (
    <section className="container py-12 md:py-24">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="space-y-2">
            <SectionTitle text={title} />
            {description && (
              <div className="text-muted-foreground prose prose-sm dark:prose-invert">
                <PortableText value={description} />
              </div>
            )}
          </div>

          {contactDetails && (
            <div className="space-y-4">
              {contactDetails.email && (
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <a href={`mailto:${contactDetails.email}`} className="hover:underline">
                    {contactDetails.email}
                  </a>
                </div>
              )}
              {contactDetails.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <a href={`tel:${contactDetails.phone}`} className="hover:underline">
                    {contactDetails.phone}
                  </a>
                </div>
              )}
              {contactDetails.location && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>{contactDetails.location}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {showForm && (
          <div className="mx-auto w-full max-w-md lg:mx-0">
            <ContactForm settings={formSettings} />
          </div>
        )}
      </div>
    </section>
  );
}
