import { PortableText } from "next-sanity";
import { components } from "@/sanity/components/portableTextComponents";
import { PAGE_QUERYResult } from "@/sanity/types";
import { Container } from "../ui/container";
import { Eyebrow } from "../ui/eyebrow";
import { SectionTitle } from "../ui/section-title";
import { cn } from "@/lib/utils";

interface RichTextProps {
  _type: "richText";
  _key: string;
  eyebrow?: string;
  title?: string;
  body: any;
  alignment?: "left" | "center";
  maxWidth?: "max-w-4xl" | "max-w-2xl" | "max-w-none";
}

export function RichText(props: RichTextProps) {
  const { eyebrow, title, body, alignment, maxWidth } = props;

  if (!body) return null;

  return (
    <section className="py-16">
      <Container 
        className={cn(
          "flex flex-col gap-6",
          alignment === "center" ? "items-center text-center" : "items-start text-left"
        )}
      >
        {eyebrow && <Eyebrow text={eyebrow} />}
        {title && <SectionTitle text={title} className="mb-4" />}
        
        <div 
          className={cn(
            "prose prose-lg dark:prose-invert",
            maxWidth,
            alignment === "center" && "mx-auto"
          )}
        >
          <PortableText value={body} components={components} />
        </div>
      </Container>
    </section>
  );
}
