import { notFound } from "next/navigation";
import { client, sanityFetch } from "@/sanity/lib/client";
import {
  TECHNOLOGY_QUERY,
  TECHNOLOGIES_QUERY,
  HOME_TITLE_QUERY,
  HEADER_QUERY,
  TECHNOLOGIES_PAGE_QUERY,
} from "@/sanity/lib/queries";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { routing } from "@/i18n/routing";
import { PageBuilder } from "@/components/sanity/page-builder";
import { Container } from "@/components/ui/container";
import { TechnologyBody } from "@/components/technology/technology-body";

export const dynamicParams = true;

export async function generateStaticParams() {
  const allParams = await Promise.all(
    routing.locales.map(async (lang) => {
      const slugs = await client
        .withConfig({ useCdn: false })
        .fetch(TECHNOLOGIES_QUERY, { lang });

      return (slugs || []).map((item: { slug: { current: string } }) => ({
        lang,
        slug: item.slug.current,
      }));
    }),
  );

  return allParams.flat();
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}) {
  const { slug, lang } = await params;
  const [tech, homeData, headerData, pageData] = await Promise.all([
    sanityFetch({
      query: TECHNOLOGY_QUERY,
      params: { slug, lang },
      revalidate: 3600,
      tags: [`technology:${lang}:${slug}`],
    }),
    sanityFetch({
      query: HOME_TITLE_QUERY,
      params: { lang },
    }),
    sanityFetch({
      query: HEADER_QUERY,
      params: { lang },
    }),
    sanityFetch({
      query: TECHNOLOGIES_PAGE_QUERY,
      params: { lang },
    }),
  ]);

  const technologiesLabel = (pageData as any)?.title || (headerData as any)?.navigation?.find((n: any) => n.href === "/technologies")?.label || "Technologies";

  if (!tech) notFound();

  return (
    <section className="py-22 mt-12">
      <Container className="space-y-6">
        <Breadcrumbs
          homeLabel={(homeData as any)?.title || "Home"}
          items={[
            { label: technologiesLabel, href: "/technologies" },
            { label: tech?.name }
          ]} 
          className="mb-8"
        />
        <h1 className="font-bold text-4xl">{tech.name}</h1>

        {tech.description && (
          <p className="text-muted-foreground">{tech.description}</p>
        )}

        {tech.body && (
           <div className="mt-8 pt-8 border-t">
              <TechnologyBody body={tech.body} />
           </div>
        )}

        {tech.content && (
          <div className="mt-8">
            <PageBuilder content={tech.content} documentId={tech._id} documentType="technology" />
          </div>
        )}
      </Container>
    </section>
  );
}
