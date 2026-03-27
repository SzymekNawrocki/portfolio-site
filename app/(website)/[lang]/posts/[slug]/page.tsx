import { notFound } from "next/navigation";
import { client, sanityFetch } from "@/sanity/lib/client";
import { POST_QUERY, POSTS_SLUGS_QUERY, POSTS_PAGE_QUERY, HOME_TITLE_QUERY } from "@/sanity/lib/queries";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Post } from "@/components/blog/post";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Metadata } from "next";
import { urlFor } from "@/sanity/lib/image";

type RouteParams = {
  slug: string;
  lang: string;
};

type RouteProps = {
  params: Promise<RouteParams>;
};

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug, lang } = await params;
  const post = await sanityFetch({
    query: POST_QUERY,
    params: { slug, lang },
    revalidate: 3600,
    tags: [`post:${slug}`],
  });

  if (!post) {
    return {};
  }

  const metadata: Metadata = {
    title: post.seo?.title || post.title,
    description: post.seo?.description,
  };

  if (post.seo?.seoImage || post.mainImage) {
    const image = post.seo?.seoImage || post.mainImage;
    if (image) {
      metadata.openGraph = {
        images: [
          {
            url: urlFor(image).width(1200).height(630).url(),
            width: 1200,
            height: 630,
          },
        ],
      };
    }
  }

  return metadata;
}

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
}: RouteProps) {
  const { slug, lang } = await params;

  const [post, pageData, homeData] = await Promise.all([
    sanityFetch({
      query: POST_QUERY,
      params: { slug, lang },
      revalidate: 3600,
      tags: [`post:${slug}`, "category"],
    }),
    sanityFetch({
      query: POSTS_PAGE_QUERY,
      params: { lang },
      revalidate: 3600,
      tags: ["postsPage"],
    }),
    sanityFetch({
      query: HOME_TITLE_QUERY,
      params: { lang },
    }),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <section className="pt-28 md:pt-40 pb-12">
      <Container>
        <Breadcrumbs 
          homeLabel={homeData?.title || "Home"}
          items={[
            { label: pageData?.title || "Blog", href: "/posts" },
            { label: post?.title }
          ]} 
          className="mb-8"
        />
        <Post {...post} lang={lang} labels={pageData} />
      </Container>
    </section>
  );
}