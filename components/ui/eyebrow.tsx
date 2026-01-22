import { cn } from "@/lib/utils";

interface EyebrowProps {
  text?: string;
  className?: string;
}

export function Eyebrow({ text, className }: EyebrowProps) {
  if (!text) return null;

  return (
    <span
      className={cn(
        "mb-2 block text-accent text-sm font-medium uppercase tracking-[0.2em]",
        className
      )}
    >
      {text}
    </span>
  );
}
