import { ProjectsBlock } from "@/components/blocks/projects-block";
import { client } from "@/sanity/lib/client";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/ui/container";
import { HOME_TITLE_QUERY, PROJECTS_QUERY, HEADER_QUERY, PROJECTS_PAGE_QUERY } from "@/sanity/lib/queries";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const [projects, homeData, headerData, pageData] = await Promise.all([
    client.fetch(PROJECTS_QUERY, { lang }),
    client.fetch(HOME_TITLE_QUERY, { lang }),
    client.fetch(HEADER_QUERY, { lang }),
    client.fetch(PROJECTS_PAGE_QUERY, { lang }),
  ]);

  const projectsLabel = pageData?.title || headerData?.navigation?.find((n: any) => n.href === "/projects")?.label;

  return (
    <main className="min-h-screen pt-28 md:pt-40">
       <Container>
         <Breadcrumbs 
            homeLabel={homeData?.title ?? undefined}
            items={[{ label: projectsLabel ?? undefined, href: "/projects" }]} 
            className="mb-8" 
         />
       </Container>
       <ProjectsBlock 
          _type="projectsBlock"
          _key="projects-listing"
          mode="selected" 
          projects={projects}
          title={pageData?.title ?? ""}
          description={pageData?.description ?? ""}
       />
    </main>
  );
}
