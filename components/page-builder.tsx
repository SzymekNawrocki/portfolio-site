"use client";

import { Hero } from "./hero";
import { Features } from "./features";
import { SplitImage } from "./split-image";
import { FAQs } from "./faqs";
import { client } from "@/sanity/lib/client";
import { createDataAttribute } from "next-sanity";
import { useOptimistic } from "next-sanity/hooks";
import { TechnologiesBlock } from "./technologies-block";
import { ServicesBlock } from "./services-block";
import { CTA } from "./cta";
import { ProjectsBlock } from "./projects-block";

type PageBuilderProps = {
  content: Array<{ _key: string; _type: string; [key: string]: any }> | null;
  documentId: string;
  documentType: string;
};

const { projectId, dataset, stega } = client.config();
export const createDataAttributeConfig = {
  projectId,
  dataset,
  baseUrl: typeof stega.studioUrl === "string" ? stega.studioUrl : "",
};

export function PageBuilder({
  content,
  documentId,
  documentType,
}: PageBuilderProps) {
  const blocks = useOptimistic<
    NonNullable<PageBuilderProps["content"]> | undefined,
    any
  >(content || [], (state, action) => {
    if (action.id === documentId) {
      return (
        action?.document?.content?.map(
          (block: any) => state?.find((s) => s._key === block?._key) || block
        ) || []
      );
    }
    return state;
  });

  if (!Array.isArray(blocks)) {
    return null;
  }

  return (
    <main
      data-sanity={createDataAttribute({
        ...createDataAttributeConfig,
        id: documentId,
        type: documentType,
        path: "content",
      }).toString()}
    >
      {blocks.map((block) => {
        const DragHandle = ({ children }: { children: React.ReactNode }) => (
          <div
            data-sanity={createDataAttribute({
              ...createDataAttributeConfig,
              id: documentId,
              type: documentType,
              path: `content[_key=="${block._key}"]`,
            }).toString()}
          >
            {children}
          </div>
        );

        switch (block._type) {
          case "hero":
            return (
              <DragHandle key={block._key}>
                <Hero {...(block as any)} />
              </DragHandle>
            );
          case "features":
            return (
              <DragHandle key={block._key}>
                <Features {...(block as any)} />
              </DragHandle>
            );
          case "splitImage":
            return (
              <DragHandle key={block._key}>
                <SplitImage {...(block as any)} />
              </DragHandle>
            );
          case "faqs":
            return (
              <DragHandle key={block._key}>
                <FAQs {...(block as any)} />
              </DragHandle>
            );
          case "technologiesBlock":
            return (
              <DragHandle key={block._key}>
                <TechnologiesBlock {...(block as any)} />
              </DragHandle>
            );
          case "servicesBlock":
            return (
              <DragHandle key={block._key}>
                <ServicesBlock {...(block as any)} />
              </DragHandle>
            );
          case "cta":
            return (
              <DragHandle key={block._key}>
                <CTA {...(block as any)} />
              </DragHandle>
            );
          case "projectsBlock":
            return (
              <DragHandle key={block._key}>
                <ProjectsBlock {...(block as any)} />
              </DragHandle>
            );
          default:
            return null;
        }
      })}
    </main>
  );
}
