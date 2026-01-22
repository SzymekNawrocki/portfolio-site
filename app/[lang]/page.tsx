import { PageBuilder } from "@/components/sanity/page-builder";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_PAGE_QUERY } from "@/sanity/lib/queries";

type PageProps = {
  params: Promise<{ lang: string }>;
};

export default async function Page({ params }: PageProps) {
  const { lang } = await params;

  const { data: page } = await sanityFetch({
    query: HOME_PAGE_QUERY,
    params: { lang },
  });

  return page?.homePage?.content ? (
    <PageBuilder
      content={page.homePage.content}
      documentId={page.homePage._id}
      documentType="page"
    />
  ) : null;
}