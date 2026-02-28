import { PortableText } from "next-sanity";
import { PAGE_QUERYResult } from "@/sanity/types";
import { ContactForm } from "./contact-form";
import { SectionTitle } from "@/components/ui/section-title";
import { Mail, Phone, MapPin } from "lucide-react";
import { Container } from "../ui/container";

type ContactSectionProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "contactSection" }
>;

export function ContactSection(props: ContactSectionProps) {
  const { title, description, contactDetails, showForm, formSettings } = props;

  // Narrow description to what PortableText expects
  const portableTextValue = Array.isArray(description) ? (description as any) : null;
  return (
    <section className="py-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="space-y-2">
              <SectionTitle text={title} />
              {portableTextValue && (
                <div className="text-muted-foreground prose prose-sm dark:prose-invert">
                  <PortableText value={portableTextValue} />
                </div>
              )}
            </div>

            {contactDetails && (
              <div className="space-y-4">
                {contactDetails.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <a href={`mailto:${contactDetails.email}`} className="hover:underline font-medium">
                      {contactDetails.email}
                    </a>
                  </div>
                )}
                {contactDetails.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <a href={`tel:${contactDetails.phone}`} className="hover:underline font-medium">
                      {contactDetails.phone}
                    </a>
                  </div>
                )}
                {contactDetails.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="font-medium">{contactDetails.location}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {showForm && (
            <div className="w-full">
              <ContactForm settings={formSettings} />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
