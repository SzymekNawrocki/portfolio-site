import { PortableText } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PAGE_QUERYResult } from "@/sanity/types";
import { SectionTitle } from "../ui/section-title";
import { Container } from "../ui/container";

type HeroProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "hero" }
>;

export function Hero(props: HeroProps) {
  const { title, text, image } = props;

  // Narrow image to ensure it's expanded enough for urlFor
  const isExpandedImage = (img: any): img is { asset: any } => {
    return !!img && typeof img === "object" && "asset" in img;
  };
  return (
    <section className="relative w-full aspect-[2/1] overflow-hidden">
      {isExpandedImage(image) && (
     <Image
  className="absolute inset-0 w-full h-full object-cover"

  src={urlFor(image).width(2000).auto('format').quality(100).url()}
  alt={title || ""}
  fill
  priority
  sizes="100vw"
/>
      )}

      <div className="absolute inset-0 bg-black/40" />

      <Container className="z-10 relative flex flex-col justify-center items-center gap-8 h-full text-center">
        <SectionTitle text={title} tag="h1" className="text-white lg:text-6xl" />
        {text && (
          <div className="flex items-center text-white lg:prose-xl">
            <PortableText value={text} />
          </div>
        )}
      </Container>
    </section>
  );
}
