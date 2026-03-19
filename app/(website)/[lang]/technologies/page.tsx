import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/client";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { TECHNOLOGIES_QUERY, HOME_TITLE_QUERY, HEADER_QUERY } from '@/sanity/lib/queries';

import { TECHNOLOGIES_QUERYResult } from "@/sanity/types";

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
    <section className="py-24">
      <Container className="space-y-6">
        <Breadcrumbs
          homeLabel={homeData?.title || "Home"}
          items={[{ label: technologiesLabel, href: "/technologies" }]} 
          className="mb-8"
        />
        <h1 className="font-bold text-3xl mb-4">Technologies ({lang})</h1>
        <ul className="grid grid-cols-1 divide-y divide-border">
          {technologies?.map((tech) => (
            <li key={tech._id}>
              <Link
                className="block p-4 hover:bg-muted transition-colors rounded-lg"
                href={`/${lang}/technologies/${tech.slug?.current}`}
              >
                <span className="font-semibold">{tech.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        <hr className="my-8" />

        <Link href={`/${lang}`} className="text-primary hover:underline font-medium">
          &larr; Return home
        </Link>
      </Container>
    </section>
  );
}
