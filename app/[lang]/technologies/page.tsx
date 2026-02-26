import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/client";
import { TECHNOLOGIES_QUERY } from '@/sanity/lib/queries';

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const technologies = await sanityFetch({
    query: TECHNOLOGIES_QUERY,
    params: { lang },
    tags: [`technologies:${lang}`],
  });

  return (
    <main className="gap-6 grid mx-auto p-12 container">
      <h1 className="font-bold text-3xl mb-4">Technologies ({lang})</h1>
      <ul className="grid grid-cols-1 divide-y divide-border">
        {technologies?.map((tech: any) => (
          <li key={tech._id}>
            <Link
              className="block p-4 hover:bg-muted transition-colors rounded-lg"
              href={`/${lang}/technologies/${tech.slug.current}`}
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
    </main>
  );
}
