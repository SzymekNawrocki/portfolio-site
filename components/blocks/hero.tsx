import { PortableText } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PAGE_QUERYResult } from "@/sanity/types";
import { SectionTitle } from "../ui/section-title";

type HeroProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "hero" }
>;

export function Hero({ title, text, image }: HeroProps) {
  return (
    <section className="relative w-full aspect-[2/1] overflow-hidden">
      {image && (
        <Image
          className="absolute inset-0 w-full h-full object-cover"
          src={urlFor(image).width(1600).height(800).url()}
          alt=""
          fill
          priority
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
