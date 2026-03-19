import { PortableText } from "next-sanity";
import { components } from "@/sanity/components/portableTextComponents";

interface TechnologyBodyProps {
  body: any;
}

export function TechnologyBody({ body }: TechnologyBodyProps) {
  if (!body) return null;

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <PortableText value={body} components={components} />
    </div>
  );
}
