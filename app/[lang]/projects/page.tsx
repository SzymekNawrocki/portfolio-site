import { client } from "@/sanity/lib/client";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import { ProjectsBlock } from "@/components/projects-block";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const projects = await client.fetch(PROJECTS_QUERY, { lang });

  return (
    <main className="min-h-screen">
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
