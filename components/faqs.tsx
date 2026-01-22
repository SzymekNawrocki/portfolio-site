import { PAGE_QUERYResult } from "@/sanity/types";
import { PortableText } from "next-sanity";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

type FAQsProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "faqs" }
>;

export function FAQs({ title, faqs, image }: FAQsProps) {
  return (
    <section className="py-16">
      <div className="mx-auto px-4 max-w-7xl">
        <div className="items-start gap-12 grid md:grid-cols-2">
          <div>
            {title ? (
              <header className="mb-8">
                <p className="tracking-[0.1em]">FAQ</p>
                <h2 className="text-white text-4xl md:text-5xl">{title}</h2>
              </header>
            ) : null}

            {Array.isArray(faqs) ? (
              <Accordion type="single" collapsible className="flex flex-col">
                {faqs.map((faq, index) => {
                  const faqKey = faq._id || `faq-${index}`;
                  return (
                    <AccordionItem
                      key={faqKey}
                      value={faqKey}
                      className="border-gray-600 border-b"
                    >
                      <AccordionTrigger className="py-6 text-primary [&>svg]:text-primary text-lg text-left hover:no-underline [&[data-state=open]>svg]:rotate-180">
                        {faq.title}
                      </AccordionTrigger>

                      <AccordionContent className="pb-6 text-white">
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
