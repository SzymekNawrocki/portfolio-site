import { notFound } from "next/navigation";
import { client, sanityFetch } from "@/sanity/lib/client";
import { POST_QUERY, POSTS_SLUGS_QUERY } from "@/sanity/lib/queries";
import { Post } from "@/components/blog/post";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/container";

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
    <section className="py-12">
      <Container>
        <Post {...post} lang={lang} />
      </Container>
    </section>
  );
}