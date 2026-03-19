import { PortableText } from "next-sanity";
import { components } from "@/sanity/components/portableTextComponents";
import { cn } from "@/lib/utils";

interface TechnologyDetailsProps {
  body: any;
  className?: string;
}

export function TechnologyDetails({ body, className }: TechnologyDetailsProps) {
  if (!body) return null;

  return (
    <div className={cn("prose prose-lg dark:prose-invert max-w-none", className)}>
      <PortableText value={body} components={components} />
    </div>
  );
}
