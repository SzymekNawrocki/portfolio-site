import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { Separator } from "@/components/ui/separator";
import { PAGE_QUERYResult } from "@/sanity/types";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "../ui/eyebrow";
import { SectionTitle } from "../ui/section-title";
import { Container } from "../ui/container";

type TechnologiesBlockProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "technologiesBlock" }
>;

export function TechnologiesBlock({
  eyebrow,
  title,
  image,
  technologies,
}: TechnologiesBlockProps) {
  if (!technologies || technologies.length === 0) return null;

  return (
    <section className="py-16">
      <Container>
        <Eyebrow text={eyebrow} />

        <SectionTitle text={title} className="mb-12" />

        <div className="gap-12 grid grid-cols-1 md:grid-cols-2">
          {image && (
            <div className="relative rounded-lg w-full h-full overflow-hidden">
              <Image
                src={urlFor(image).width(1000).height(1000).url()}
                alt={title ?? "Technologies"}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="space-y-4">
            {technologies.map((tech, index) => (
              <div key={tech._id}>
                <Link
                  href={`/technologies/${tech.slug.current}`}
                  className="group flex items-center gap-4 bg-card hover:bg-accent p-4 rounded-lg transition-colors"
                >
                  {tech.icon && (
                    <div className="relative flex-shrink-0 w-12 h-12">
                      <Image
                        src={urlFor(tech.icon).width(48).height(48).url()}
                        alt={tech.name}
                        fill
                        className="rounded-lg object-contain"
                      />
                    </div>
                  )}

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg transition-colors group-hover:text-accent-foreground">
                      {tech.name}
                    </h3>
                  </div>

                  <ArrowRight className="w-5 h-5 text-muted-foreground transition-colors group-hover:text-accent-foreground" />
                </Link>

                {index < technologies.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
