import { cn } from "@/lib/utils";

interface SectionTitleProps {
  text?: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4";
}

export function SectionTitle({ text, className, tag = "h2" }: SectionTitleProps) {
  if (!text) return null;

  const Tag = tag;

  return (
    <Tag
      className={cn(
        "text-foreground font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight",
        className
      )}
    >
      {text}
    </Tag>
  );
}
