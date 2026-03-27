import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SERVICES_QUERY, HOME_TITLE_QUERY, HEADER_QUERY, SERVICES_PAGE_QUERY } from "@/sanity/lib/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/section-title";
import { Globe, Code, Mail, Server, Cpu, ArrowRight, Layers, Zap, LineChart, Database, Monitor } from "lucide-react";

import { SERVICES_QUERYResult } from "@/sanity/types";

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

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }> | { lang: string };
}) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  const [services, homeData, headerData, pageData]: [SERVICES_QUERYResult, any, any, any] = await Promise.all([
    client.fetch(SERVICES_QUERY, { lang }),
    client.fetch(HOME_TITLE_QUERY, { lang }),
    client.fetch(HEADER_QUERY, { lang }),
    client.fetch(SERVICES_PAGE_QUERY, { lang }),
  ]);

  const servicesLabel = pageData?.title ||
    headerData?.navigation?.find((n: any) => n.href === "/services")?.label || "Services";

  const readMoreLabel = pageData?.readMoreLabel || (lang === "pl" ? "Dowiedz się więcej" : "Learn more");

  return (
    <section className="pt-28 md:pt-40 pb-24">
      <Container className="space-y-12">
        <div className="space-y-4">
          <Breadcrumbs
            homeLabel={homeData?.title || "Home"}
            items={[{ label: servicesLabel, href: "/services" }]}
          />
          <SectionTitle text={servicesLabel} />
        </div>

        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services?.map((service) => {
            const Icon =
              service.icon && iconsMap[service.icon] ? iconsMap[service.icon] : Globe;

            return (
              <Card key={service._id} className="relative overflow-hidden">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="flex justify-center items-center bg-primary/10 rounded-lg w-12 h-12 text-primary">
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="line-clamp-1">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="line-clamp-3 text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <Link
                    href={`/${lang}/services/${service.slug?.current}`}
                    className="inline-flex items-center gap-2 font-semibold hover:opacity-70 transition-opacity"
                  >
                    {readMoreLabel}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}