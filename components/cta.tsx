import { PAGE_QUERYResult } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

type CTAProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "cta" }
>;

export function CTA({
  subtitle,
  title,
  buttonText,
  buttonLink,
  backgroundImage,
}: CTAProps) {
  return (
    <Card className="relative mx-auto rounded-2xl max-w-7xl h-64 md:h-72 overflow-hidden">
      {backgroundImage && (
        <>
          <Image
            src={urlFor(backgroundImage).url()}
            alt={title || "CTA Background"}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-background/70" />
        </>
      )}

      {!backgroundImage && <div className="absolute inset-0 bg-background" />}

      <CardContent className="z-10 relative flex flex-col justify-center items-center px-4 h-full text-center">
        {subtitle && (
          <CardDescription className="mb-3 text-white text-sm md:text-base">
            {subtitle}
          </CardDescription>
        )}

        {title && (
          <CardTitle className="mb-6 font-semibold text-foreground text-2xl md:text-4xl">
            {title}
          </CardTitle>
        )}

        {buttonText && buttonLink && (
          <Button asChild size="lg" className="font-medium">
            <Link href={buttonLink}>{buttonText}</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
