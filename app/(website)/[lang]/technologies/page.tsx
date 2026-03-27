import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/client";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionTitle } from "@/components/ui/section-title";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from "@/components/ui/card";
import { urlFor } from "@/sanity/lib/image";
import { 
  TECHNOLOGIES_QUERY, 
  HOME_TITLE_QUERY, 
  HEADER_QUERY 
} from '@/sanity/lib/queries';
import { MoveLeft } from "lucide-react";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const [technologies, homeData, headerData] = await Promise.all([
    sanityFetch({
      query: TECHNOLOGIES_QUERY,
      params: { lang },
      tags: [`technologies:${lang}`],
    }),
    sanityFetch({
      query: HOME_TITLE_QUERY,
      params: { lang },
    }),
    sanityFetch({
      query: HEADER_QUERY,
      params: { lang },
    }),
  ]);

  const technologiesLabel = headerData?.navigation?.find((n: any) => n.href === "/technologies")?.label || "Technologies";

  return (
    <section className="pt-28 md:pt-40 pb-24 min-h-screen">
      <Container>
        <Breadcrumbs
          homeLabel={homeData?.title || "Home"}
          items={[{ label: technologiesLabel, href: "/technologies" }]} 
          className="mb-12"
        />
        
        <header className="mb-16">
          <SectionTitle
            text={technologiesLabel}
            tag="h1"
            className="mb-4"
          />
          <p className="text-muted-foreground text-lg max-w-2xl">
            A comprehensive list of the tools, frameworks, and technologies that drive our projects and solutions.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {technologies?.length > 0 ? (
            technologies.map((tech) => (
              <Link
                key={tech._id}
                href={`/${lang}/technologies/${tech.slug?.current}`}
                className="block h-full hover:opacity-70 transition-opacity"
              >
                <Card className="h-full border-border/40">
                  <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                    {tech.icon ? (
                      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-background/50 p-2 shadow-sm">
                        <Image
                          src={urlFor(tech.icon).width(48).height(48).url()}
                          alt={tech.name ?? "Technology Icon"}
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      </div>
                    ) : (
                       <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted/50 font-bold text-lg">
                          {tech.name?.charAt(0)}
                       </div>
                    )}
                    <CardTitle className="text-xl">
                      {tech.name}
                    </CardTitle>
                  </CardHeader>
                  {tech.description && (
                    <CardContent>
                      <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                        {tech.description}
                      </p>
                    </CardContent>
                  )}
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <h2 className="text-2xl font-semibold opacity-50">No technologies found</h2>
              <p className="text-muted-foreground mt-2">Come back later to see more updates.</p>
            </div>
          )}
        </div>

        <div className="mt-20 pt-8 border-t">
          <Link
            href={`/${lang}`}
            className="group inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            <MoveLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            &larr; Return home
          </Link>
        </div>
      </Container>
    </section>
  );
}
