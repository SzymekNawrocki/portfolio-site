import dynamic from "next/dynamic";

const Hero = dynamic(() =>
  import("@/components/blocks/hero").then((mod) => mod.Hero)
);
const Features = dynamic(() =>
  import("@/components/blocks/features").then((mod) => mod.Features)
);
const SplitImage = dynamic(() =>
  import("@/components/blocks/split-image").then((mod) => mod.SplitImage)
);
const FAQs = dynamic(() =>
  import("@/components/blocks/faqs").then((mod) => mod.FAQs)
);
const TechnologiesBlock = dynamic(() =>
  import("@/components/blocks/technologies-block").then(
    (mod) => mod.TechnologiesBlock
  )
);
const ServicesBlock = dynamic(() =>
  import("@/components/blocks/services-block").then((mod) => mod.ServicesBlock)
);
const CTA = dynamic(() =>
  import("@/components/blocks/cta").then((mod) => mod.CTA)
);
const ProjectsBlock = dynamic(() =>
  import("@/components/blocks/projects-block").then((mod) => mod.ProjectsBlock)
);
const ContactSection = dynamic(() =>
  import("@/components/blocks/contact-section").then((mod) => mod.ContactSection)
);

import { PAGE_QUERYResult } from "@/sanity/types";

export function PageBuilder({
  content,
  documentId,
  documentType,
}: {
  content: NonNullable<PAGE_QUERYResult>["content"];
  documentId?: string;
  documentType?: string;
}) {

  if (!content) return null;

  return (
    <div className="space-y-16">
      {content.map((block) => {
        switch (block._type) {
          case "hero":
            return <Hero key={block._key} {...block} />;
          case "features":
            return <Features key={block._key} {...block} />;
          case "splitImage":
            return <SplitImage key={block._key} {...block} />;
          case "faqs":
            return <FAQs key={block._key} {...block} />;
          case "technologiesBlock":
            return <TechnologiesBlock key={block._key} {...block} />;
          case "servicesBlock":
            return <ServicesBlock key={block._key} {...block} />;
          case "cta":
            return <CTA key={block._key} {...block} />;
          case "projectsBlock":
            return <ProjectsBlock key={block._key} {...block} />;
          case "contactSection":
            return <ContactSection key={block._key} {...block} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
