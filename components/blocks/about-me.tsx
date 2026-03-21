import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import { components } from "@/sanity/components/portableTextComponents";
import { Container } from "../ui/container";
import { cn } from "@/lib/utils";
import { SectionTitle } from "../ui/section-title";

interface AboutMeProps {
  _type: "aboutMe";
  _key: string;
  title?: string;
  image: any;
  content: any;
}

export function AboutMe({ title, image, content }: AboutMeProps) {
  if (!image || !content) return null;

  return (
    <section className="py-24 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center text-accent">
          <div className="relative group">
            {/* Background Blob/Shape for premium look */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-accent/20 to-transparent rounded-2xl blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative aspect-square md:aspect-[4/5] lg:aspect-square overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <Image
                className="object-cover w-full h-full transition duration-500 group-hover:scale-105"
                src={urlFor(image).width(1200).height(1200).url()}
                width={800}
                height={800}
                alt={title || "About Me Image"}
                loading="lazy"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/10 rounded-full blur-3xl -z-10"></div>
          </div>

          <div className="flex flex-col space-y-8">
            {title && (
              <div className="space-y-4">
                <span className="text-sm font-medium tracking-[0.2em] text-accent/60 uppercase">
                  Discover
                </span>
                <SectionTitle
                  text={title}
                  className="text-4xl md:text-5xl lg:text-7xl font-extralight tracking-tight leading-none text-accent"
                />
                <div className="h-1 w-20 bg-gradient-to-r from-accent to-transparent"></div>
              </div>
            )}
            <div className="prose prose-lg dark:prose-invert max-w-none prose-p:leading-relaxed prose-p:text-accent/80 prose-headings:font-light prose-headings:text-accent">
              <PortableText value={content} components={components} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
