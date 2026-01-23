import { notFound } from "next/navigation";
import { client, sanityFetch } from "@/sanity/lib/client";
import { PROJECT_QUERY, PROJECTS_SLUGS_QUERY } from "@/sanity/lib/queries";
import { PROJECTS_SLUGS_QUERYResult } from "@/sanity/types";
import { Project } from "@/components/projects/project";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";
import { urlFor } from "@/sanity/lib/image";

type RouteParams = {
  slug: string;
  lang: string;
};

type RouteProps = {
  params: Promise<RouteParams>;
};

const getProject = async (params: RouteParams) =>
  sanityFetch({
    query: PROJECT_QUERY,
    params,
    revalidate: 3600,
    tags: [`project:${params.slug}`, "project"],
  });

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await getProject(resolvedParams);

  if (!project) {
    return {};
  }

  const metadata: Metadata = {
    title: project.seo?.title || project.title,
    description: project.seo?.description || project.description,
  };

  if (project.seo?.seoImage || project.mainImage) {
      const image = project.seo?.seoImage || project.mainImage;
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
        .fetch<PROJECTS_SLUGS_QUERYResult>(PROJECTS_SLUGS_QUERY, { lang });

      return slugs.map((item: { slug: string }) => ({
        lang,
        slug: item.slug,
      }));
    })
  );

  return allParams.flat();
}

export default async function Page({ params }: RouteProps) {
  const resolvedParams = await params;
  const project = await getProject(resolvedParams);

  if (!project) {
    notFound();
  }

  return (
    <main className="gap-6 grid grid-cols-1 mx-auto my-22 p-12 container">
      <Project {...project} />
    </main>
  );
}
