import { notFound } from "next/navigation";
import { client, sanityFetch } from "@/sanity/lib/client";
import { POST_QUERY, POSTS_SLUGS_QUERY } from "@/sanity/lib/queries";
import { Post } from "@/components/post";
import { routing } from "@/i18n/routing";

export async function generateStaticParams() {

  const allParams = await Promise.all(
    routing.locales.map(async (lang) => {
      const slugs = await client
        .withConfig({ useCdn: false })
        .fetch(POSTS_SLUGS_QUERY, { lang });

      return slugs.map((item: { slug: string }) => ({
        lang,
        slug: item.slug,
      }));
    })
  );


  return allParams.flat();
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}) {
  const { slug, lang } = await params;

  const post = await sanityFetch({
    query: POST_QUERY,
    params: { slug, lang },
    revalidate: 3600,
    tags: [`post:${slug}`, "category"],
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="gap-6 grid grid-cols-1 mx-auto p-12 container">
      <Post {...post} />
    </main>
  );
}