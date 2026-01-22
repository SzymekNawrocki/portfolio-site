import { PortableText } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PAGE_QUERYResult } from "@/sanity/types";
import { SectionTitle } from "./section-title";

type HeroProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "hero" }
>;

export function Hero({ title, text, image }: HeroProps) {
  return (
    <section className="relative w-full aspect-[2/1] overflow-hidden">
      {image && (
     <Image
  className="absolute inset-0 object-cover"
  src={urlFor(image)
    .width(2560)
    .quality(100)
    .auto("format")
    .url()}
  alt={image.alt || ""}
  fill
  priority
  sizes="100vw"
/>

      )}

      <div className="absolute inset-0 bg-black/40" />

      <div className="z-10 relative flex flex-col justify-center items-center gap-8 px-4 h-full text-center">
        <SectionTitle text={title} tag="h1" className="text-white lg:text-6xl" />
        {text && (
          <div className="flex items-center text-white lg:prose-xl">
            <PortableText value={text} />
          </div>
        )}
      </div>
    </section>
  );
}
