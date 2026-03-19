import { ProjectsBlock } from "@/components/blocks/projects-block";
import { client } from "@/sanity/lib/client";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/ui/container";
import { HOME_TITLE_QUERY, PROJECTS_QUERY, HEADER_QUERY } from "@/sanity/lib/queries";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const [projects, homeData, headerData] = await Promise.all([
    client.fetch(PROJECTS_QUERY, { lang }),
    client.fetch(HOME_TITLE_QUERY, { lang }),
    client.fetch(HEADER_QUERY, { lang }),
  ]);

  const projectsLabel = headerData?.navigation?.find((n: any) => n.href === "/projects")?.label || "Projects";

  return (
    <main className="min-h-screen pt-24">
       <Container>
         <Breadcrumbs 
            homeLabel={homeData?.title || "Home"}
            items={[{ label: projectsLabel, href: "/projects" }]} 
            className="mb-8" 
         />
       </Container>
       <ProjectsBlock 
          _type="projectsBlock"
          _key="projects-listing"
          mode="selected" 
          projects={projects}
          title="All Projects"
          description="Explore our latest work and case studies."
       />
    </main>
  );
}
