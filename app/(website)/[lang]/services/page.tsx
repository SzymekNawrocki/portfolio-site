import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SERVICES_QUERY, HOME_TITLE_QUERY, HEADER_QUERY } from '@/sanity/lib/queries';


import { SERVICES_QUERYResult } from "@/sanity/types";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }> | { lang: string };
}) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  const [services, homeData, headerData]: [SERVICES_QUERYResult, any, any] = await Promise.all([
    client.fetch(SERVICES_QUERY, { lang }),
    client.fetch(HOME_TITLE_QUERY, { lang }),
    client.fetch(HEADER_QUERY, { lang }),
  ]);

  const servicesLabel = headerData?.navigation?.find((n: any) => n.href === "/services")?.label || "Services";

  return (
    <section className="py-24">
      <Container className="space-y-6">
        <Breadcrumbs
          homeLabel={homeData?.title || "Home"}
          items={[{ label: servicesLabel, href: "/services" }]} 
          className="mb-8"
        />
        <ul className="grid grid-cols-1 divide-y divide-border">
          {services?.map((service) => (
            <li key={service._id}>
              <Link
                className="block p-4 hover:text-blue-500"
                href={`/${lang}/services/${service.slug?.current}`}
              >
                {service.title}
              </Link>
            </li>
          ))}
        </ul>

        <hr />

        <Link href={`/${lang}`}>&larr; Return home</Link>
      </Container>
    </section>
  );
}