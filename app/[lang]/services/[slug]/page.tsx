import { notFound } from "next/navigation";
import { client, sanityFetch } from "@/sanity/lib/client";
import {
  SERVICE_QUERY,
  SERVICES_QUERY,
} from "../../../../sanity/lib/queries";
import { routing } from "@/i18n/routing";
import { PortableText } from "next-sanity";
import { Container } from "@/components/ui/container";

export async function generateStaticParams() {
  const allParams = await Promise.all(
    routing.locales.map(async (lang) => {
      const slugs = await client
        .withConfig({ useCdn: false })
        .fetch(SERVICES_QUERY, { lang });

      return slugs.map((item: { slug: { current: string } }) => ({
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

  const service = await sanityFetch({
    query: SERVICE_QUERY,
    params: { slug, lang },
    revalidate: 3600,
    tags: [`service:${slug}`],
  });

  if (!service) notFound();

  return (
    <section className="py-12">
      <Container className="space-y-6">
        <h1 className="font-bold text-4xl">{service.title}</h1>

        {service.description && (
          <p className="text-muted-foreground">{service.description}</p>
        )}

        {service.content && (
          <div className="mt-8">
            <PortableText value={service.content} />
          </div>
        )}
      </Container>
    </section>
  );
}