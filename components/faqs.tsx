import { PAGE_QUERYResult } from "@/sanity/types";
import { PortableText } from "next-sanity";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { urlFor } from "@/sanity/lib/image";
import { Eyebrow } from "./eyebrow";
import { SectionTitle } from "./section-title";

type FAQsProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "faqs" }
> & { eyebrow?: string };

export function FAQs({ eyebrow, title, faqs, image }: FAQsProps) {
  return (
    <section className="py-22">
      <div className="mx-auto px-4 max-w-7xl">
        <div className="items-start gap-12 grid md:grid-cols-1">
          <div>
            {(eyebrow || title) && (
              <header className="mb-8">
                <Eyebrow text={eyebrow} />
                <SectionTitle text={title} />
              </header>
            )}

            {Array.isArray(faqs) ? (
              <Accordion type="single" collapsible className="flex flex-col">
                {faqs.map((faq, index) => {
                  const faqKey = faq._id || `faq-${index}`;
                  return (
                    <AccordionItem
                      key={faqKey}
                      value={faqKey}
                      className="border-border border-b"
                    >
                      <AccordionTrigger className="py-6 text-primary [&>svg]:text-accent text-lg text-left hover:no-underline [&[data-state=open]>svg]:rotate-180">
                        {faq.title}
                      </AccordionTrigger>

                      <AccordionContent className="pb-6 text-accent">
                        {faq.body ? <PortableText value={faq.body} /> : null}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
