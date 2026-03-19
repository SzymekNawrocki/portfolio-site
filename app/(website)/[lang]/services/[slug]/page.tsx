import { notFound } from "next/navigation";
import { client, sanityFetch } from "@/sanity/lib/client";
import {
  SERVICE_QUERY,
  SERVICES_QUERY,
  HOME_TITLE_QUERY,
  HEADER_QUERY,
} from "@/sanity/lib/queries";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { routing } from "@/i18n/routing";
import { PageBuilder } from "@/components/sanity/page-builder";
import { Container } from "@/components/ui/container";

export async function generateStaticParams() {
  const allParams = await Promise.all(
    routing.locales.map(async (lang) => {
      const slugs = await client
        .withConfig({ useCdn: false })
        .fetch(SERVICES_QUERY, { lang });

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
  const [service, homeData, headerData] = await Promise.all([
    sanityFetch({
      query: SERVICE_QUERY,
      params: { slug, lang },
      revalidate: 3600,
      tags: [`service:${slug}`],
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

  const servicesLabel = headerData?.navigation?.find((n: any) => n.href === "/services")?.label || "Services";

  if (!service) notFound();

  return (
    <section className="py-24">
      <Container className="space-y-6">
        <Breadcrumbs
          homeLabel={homeData?.title || "Home"}
          items={[
            { label: servicesLabel, href: "/services" },
            { label: service?.title }
          ]} 
          className="mb-8"
        />
        <h1 className="font-bold text-4xl">{service.title}</h1>

        {service.description && (
          <p className="text-muted-foreground">{service.description}</p>
        )}

        {service.content && (
          <div className="mt-8">
            <PageBuilder content={service.content} documentId={service._id} documentType="service" />
          </div>
        )}
      </Container>
    </section>
  );
}