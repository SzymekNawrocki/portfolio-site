import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { TECHNOLOGIES_QUERY } from '../../../sanity/lib/queries';


export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }> | { lang: string };
}) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;

  const technologies = await client.fetch(TECHNOLOGIES_QUERY, { lang });

  return (
    <main className="gap-6 grid mx-auto p-12 container">
      <ul className="grid grid-cols-1 divide-y divide-border">
        {technologies?.map((tech: any) => (
          <li key={tech._id}>
            <Link
              className="block p-4 hover:text-blue-500"
              href={`/${lang}/technologies/${tech.slug.current}`}
            >
              {tech.name}
            </Link>
          </li>
        ))}
      </ul>

      <hr />

      <Link href={`/${lang}`}>&larr; Return home</Link>
    </main>
  );
}
