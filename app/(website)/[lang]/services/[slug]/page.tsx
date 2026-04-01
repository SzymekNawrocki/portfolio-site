import { notFound } from "next/navigation";
import { client, sanityFetch } from "@/sanity/lib/client";
import {
  SERVICE_QUERY,
  SERVICES_QUERY,
  HOME_TITLE_QUERY,
  HEADER_QUERY,
  SERVICES_PAGE_QUERY,
} from "@/sanity/lib/queries";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { routing } from "@/i18n/routing";
import { PageBuilder } from "@/components/sanity/page-builder";
import { Container } from "@/components/ui/container";
import { Globe, Code, Mail, Server, Cpu, Layers, Zap, LineChart, Database, Monitor } from "lucide-react";

const iconsMap: any = {
  Globe,
  Code,
  Mail,
  Server,
  Cpu,
  Layers,
  Zap,
  LineChart,
  Database,
  Monitor,
};

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
  const [service, homeData, headerData, pageData] = await Promise.all([
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
    sanityFetch({
      query: SERVICES_PAGE_QUERY,
      params: { lang },
    }),
  ]);

  const servicesLabel = (pageData as any)?.title || (headerData as any)?.navigation?.find((n: any) => n.href === "/services")?.label;

  if (!service) notFound();

  const Icon = service?.icon && iconsMap[service.icon] ? iconsMap[service.icon] : Globe;

  return (
    <section className="pt-28 md:pt-40">
      <Container className="space-y-10">
        <Breadcrumbs
          homeLabel={(homeData as any)?.title ?? undefined}
          items={[
            { label: servicesLabel ?? undefined, href: "/services" },
            { label: service?.title }
          ]} 
        />

        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex justify-center items-center bg-primary/10 rounded-2xl w-16 h-16 text-primary">
            <Icon className="w-9 h-9" />
          </div>
          <h1 className="font-bold text-4xl lg:text-5xl">{service.title}</h1>
        </div>



        {service.content && (
          <PageBuilder content={service.content} documentId={service._id} documentType="service" disablePadding />
        )}
      </Container>
    </section>
  );
}