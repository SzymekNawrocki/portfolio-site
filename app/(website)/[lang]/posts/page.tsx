import { client } from "@/sanity/lib/client";
import { POSTS_QUERY, POSTS_PAGE_QUERY } from "@/sanity/lib/queries";
import { SectionTitle } from "@/components/ui/section-title";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PostCard } from "@/components/blog/post-card";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Metadata } from "next";
import { urlFor } from "@/sanity/lib/image";

import { POSTS_QUERYResult, POSTS_PAGE_QUERYResult } from "@/sanity/types";

type Props = {
  params: Promise<{ lang: string }> | { lang: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { lang } = resolvedParams;

  const pageData: POSTS_PAGE_QUERYResult = await client.fetch(POSTS_PAGE_QUERY, { lang });

  if (!pageData) return {};

  const metadata: Metadata = {
    title: pageData.seo?.title || pageData.title,
    description: pageData.seo?.description,
  };

  if (pageData.seo?.seoImage) {
    metadata.openGraph = {
      images: [
        {
          url: urlFor(pageData.seo.seoImage).width(1200).height(630).url(),
          width: 1200,
          height: 630,
        },
      ],
    };
  }

  return metadata;
}

export default async function Page({
  params,
}: Props) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;

  const [posts, pageData]: [POSTS_QUERYResult, POSTS_PAGE_QUERYResult] = await Promise.all([
    client.fetch(POSTS_QUERY, { lang }),
    client.fetch(POSTS_PAGE_QUERY, { lang }),
  ]);

  return (
    <section className="py-24">
      <Container>
        <header className="my-16">
          {pageData?.eyebrow && <Eyebrow text={pageData.eyebrow} />}
          <SectionTitle
            text={pageData?.title || "Blog"}
            tag="h1"
            className="mb-4 max-w-1xl"
          />
        </header>

        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts?.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post._id} {...post} lang={lang} />
            ))
          ) : (
            <div className="py-20 text-center">
               <h2 className="text-2xl font-semibold">{pageData?.emptyStateTitle || "No posts yet"}</h2>
               <p className="mt-2 text-muted-foreground">{pageData?.emptyStateDescription || "Check back soon for new articles."}</p>
            </div>
          )}
        </div>

        <div className="mt-20 pt-8 border-t">
          <Link
            href={`/${lang}`}
            className="group inline-flex items-center gap-2 text-muted-foreground"
          >
            <MoveLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            {pageData?.backToHomeLabel || "Return home"}
          </Link>
        </div>
      </Container>
    </section>
  );
}
