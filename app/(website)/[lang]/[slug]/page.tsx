import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageBuilder } from "@/components/sanity/page-builder";
import { sanityFetch } from "@/sanity/lib/live";
import { PAGE_QUERY, PAGES_SLUGS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";

type RouteParams = {
  slug: string;
  lang: string;
};

type RouteProps = {
  params: Promise<RouteParams>;
};

const getPage = async (params: RouteParams) =>
  sanityFetch({
    query: PAGE_QUERY,
    params,
  });

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { data: page } = await getPage(resolvedParams);

  if (!page) {
    return {};
  }

  const metadata: Metadata = {
    metadataBase: new URL("https://acme.com"),
    title: page.seo.title,
    description: page.seo.description,
  };

  metadata.openGraph = {
    images: [
      {
        url: page.seo.seoImage
          ? urlFor(page.seo.seoImage).width(1200).height(630).url()
          : `/api/og?id=${page._id}`,
        width: 1200,
        height: 630,
      },
    ],
  };

  return metadata;
}

export async function generateStaticParams() {
  const locales = ["en", "de", "pl"];

  const allParams = await Promise.all(
    locales.map(async (lang) => {
      const pages = await client
        .withConfig({ useCdn: false })
        .fetch<
          { slug: string; language: string | null }[]
        >(PAGES_SLUGS_QUERY, { lang });

      return pages.map((item) => ({
        lang,
        slug: item.slug,
      }));
    })
  );

  return allParams.flat();
}
export default async function Page({ params }: RouteProps) {
  const resolvedParams = await params;
  const { data: page } = await getPage(resolvedParams);

  if (!page || !page.content) {
    notFound();
  }

  return (
    <PageBuilder
      content={page.content}
      documentId={page._id}
      documentType={page._type}
    />
  );
}