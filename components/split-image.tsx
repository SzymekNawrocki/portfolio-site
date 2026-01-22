import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PAGE_QUERYResult } from "@/sanity/types";
import { stegaClean } from "next-sanity";
import { SectionTitle } from "./section-title";

type SplitImageProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "splitImage" }
>;

export function SplitImage({ title, image, orientation }: SplitImageProps) {
  return (
    <div
      className="container mx-auto flex gap-8 py-16 data-[orientation='imageRight']:flex-row-reverse"
      data-orientation={stegaClean(orientation) || "imageLeft"}
    >
      {image ? (
        <Image
          className="h-auto w-2/3 rounded-xl"
          src={urlFor(image).width(500).height(500).url()}
          width={800}
          height={600}
          alt=""
        />
      ) : null}
      <div className="flex w-1/3 items-center">
        <SectionTitle text={title} className="mx-auto max-w-3xl text-pretty text-accent font-light lg:text-8xl" />
      </div>
    </div>
  );
}
