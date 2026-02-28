import { notFound } from "next/navigation";
import { client, sanityFetch } from "@/sanity/lib/client";
import {
  TECHNOLOGY_QUERY,
  TECHNOLOGIES_QUERY,
} from "@/sanity/lib/queries";
import { routing } from "@/i18n/routing";
import { PortableText } from "next-sanity";
import { Container } from "@/components/ui/container";

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

  const tech = await sanityFetch({
    query: TECHNOLOGY_QUERY,
    params: { slug, lang },
    revalidate: 3600,
    tags: [`technology:${lang}:${slug}`],
  });

  if (!tech) notFound();

  return (
    <section className="py-12">
      <Container className="space-y-6">
        <h1 className="font-bold text-4xl">{tech.name}</h1>

        {tech.description && (
          <p className="text-muted-foreground">{tech.description}</p>
        )}

        {tech.content && (
          <div className="mt-8">
            <PortableText value={tech.content} />
          </div>
        )}
      </Container>
    </section>
  );
}
