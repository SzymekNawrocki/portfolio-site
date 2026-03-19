import { PortableText } from "next-sanity";
import { components } from "@/sanity/components/portableTextComponents";
import { Container } from "../ui/container";
import { cn } from "@/lib/utils";

interface RichTextProps {
  _type: "richText";
  _key: string;
  body: any;
  alignment?: "left" | "center";
}

export function RichText({ body, alignment }: RichTextProps) {
  if (!body) return null;

  return (
    <section className="py-16">
      <Container
        className={cn(
          "max-w-4xl",
          alignment === "center" ? "mx-auto text-center" : "text-left"
        )}
      >
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <PortableText value={body} components={components} />
        </div>
      </Container>
    </section>
  );
}
