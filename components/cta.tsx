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
import { SectionTitle } from "./section-title";
import { Eyebrow } from './eyebrow';

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
    <Card className="relative mx-auto my-22 rounded-2xl max-w-7xl h-64 md:h-72 overflow-hidden">
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

      <CardContent className="z-10 relative flex flex-col justify-center items-center h-full text-center">
        <Eyebrow text={subtitle} className="text-foreground/80" />

        <SectionTitle text={title} tag="h3" className="mb-6 text-2xl md:text-4xl" />

        {buttonText && buttonLink && (
          <Button asChild size="lg" className="font-medium">
            <Link href={buttonLink}>{buttonText}</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
