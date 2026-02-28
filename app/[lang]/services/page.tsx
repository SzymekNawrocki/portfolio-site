import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { SERVICES_QUERY } from '../../../sanity/lib/queries';
import { Container } from "@/components/ui/container";


export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }> | { lang: string };
}) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;

  const services = await client.fetch(SERVICES_QUERY, { lang });

  return (
    <section className="py-12">
      <Container className="space-y-6">
        <ul className="grid grid-cols-1 divide-y divide-border">
          {services?.map((service: any) => (
            <li key={service._id}>
              <Link
                className="block p-4 hover:text-blue-500"
                href={`/${lang}/services/${service.slug.current}`}
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