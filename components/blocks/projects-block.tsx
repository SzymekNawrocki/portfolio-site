import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { PAGE_QUERYResult } from "@/sanity/types";
import { Eyebrow } from "../ui/eyebrow";
import { SectionTitle } from "../ui/section-title";
import { Container } from "../ui/container";
import { Badge } from "@/components/ui/badge";

type ProjectsBlockProps = Partial<Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "projectsBlock" }
>> & {
  // Ensure _type is still present for the type guard if needed, 
  // though Partial makes it optional. We can keep it simple.
  _type?: "projectsBlock";
  detailsLabel?: string;
};

export function ProjectsBlock(props: ProjectsBlockProps) {
  // Use a type guard to narrow the entire props object
  const isExpanded = (
    p: ProjectsBlockProps
  ): p is Extract<ProjectsBlockProps, { projects: Array<any> }> => {
    return !!p.projects && p.projects.length > 0;
  };

  if (!isExpanded(props)) {
    return null;
  }

  const { eyebrow, title, description, mode, limit, projects, detailsLabel } = props;

  const displayProjects =
    mode === "all" ? (projects as any[]).slice(0, limit || 6) : projects;

  return (
    <section className="py-16">
      <Container>
        <div className="mb-12">
          <Eyebrow text={eyebrow} />
          <SectionTitle text={title} className="mb-4" />
          {description && (
            <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
              {description}
            </p>
          )}
        </div>

        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {(displayProjects as any[]).map((project: any) => (
            <div
              key={project._id}
              className="flex flex-col bg-card border border-border rounded-xl overflow-hidden"
            >
              {project.mainImage && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={urlFor(project.mainImage).width(600).height(400).url()}
                    alt={project.mainImage.alt || project.title || "Project Image"}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-col flex-1 p-6">
                <div className="mb-4">
                  {project.slug?.current ? (
                    <Link href={`/projects/${project.slug.current}`} className="hover:opacity-70 transition-opacity">
                      <h3 className="font-bold text-xl">{project.title}</h3>
                    </Link>
                  ) : (
                    <h3 className="font-bold text-xl">{project.title}</h3>
                  )}
                </div>

                {project.description && (
                   <p className="mb-6 text-muted-foreground line-clamp-3">
                    {project.description}
                   </p>
                )}

                <div className="flex flex-wrap gap-2 mt-auto mb-6">
                    {(project.technologies as any[])?.filter(Boolean).map((tech: any) => (
                        <Badge
                          key={tech?._id}
                          variant="outline"
                          title={tech?.name || ""}
                          className="bg-primary/5 text-primary border-primary/20 flex items-center gap-2 px-2.5 py-1 rounded-lg"
                        >
                             {tech?.icon ? (
                                <Image
                                    src={urlFor(tech.icon).width(16).height(16).url()}
                                    alt={tech?.name || ""}
                                    width={16}
                                    height={16}
                                    className="w-4 h-4 object-contain"
                                />
                             ) : null}
                             <span className="text-[10px] uppercase font-bold tracking-wider">{tech?.name ?? "—"}</span>
                        </Badge>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                  {project.slug?.current && (
                    <Link
                      href={`/projects/${project.slug.current}`}
                      className="flex items-center gap-2 font-semibold hover:opacity-70 transition-opacity text-sm"
                    >
                      {detailsLabel}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                     {project.githubLink && (
                        <Button asChild variant="ghost" size="icon">
                             <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                <Github className="w-5 h-5" />
                             </a>
                        </Button>
                    )}
                     {project.projectLink && (
                        <Button asChild variant="ghost" size="icon">
                             <a href={project.projectLink} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-5 h-5" />
                             </a>
                        </Button>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
