import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { ProjectsBlock as ProjectsBlockSchema, Project as ProjectSchema, Technology, Slug } from "@/sanity/types";
import { Eyebrow } from "../ui/eyebrow";
import { SectionTitle } from "../ui/section-title";
import { Container } from "../ui/container";

type Project = {
  _id: string;
  title?: string;
  slug?: Slug;
  description?: string | null;
  mainImage?: ProjectSchema["mainImage"] | null;
  technologies?: Array<Omit<Partial<Technology>, "language"> & { language?: string | null }> | null;
  projectLink?: string | null;

  githubLink?: string | null;
  language?: string | null;
};


type ProjectsBlockProps = Omit<ProjectsBlockSchema, "projects"> & {
  projects?: Array<Project>;
  _key?: string;
};

export function ProjectsBlock({
  eyebrow,
  title,
  description,
  mode,
  limit,
  projects,
}: ProjectsBlockProps) {
  const displayProjects = mode === 'all' && projects ? projects.slice(0, limit || 6) : projects;

  if (!displayProjects || displayProjects.length === 0) return null;

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
          {displayProjects.map((project) => (
            <div
              key={project._id}
              className="flex flex-col bg-card shadow-sm hover:shadow-md border border-border rounded-xl overflow-hidden transition-all"
            >
              {project.mainImage && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={urlFor(project.mainImage).width(600).height(400).url()}
                    alt={project.mainImage.alt || project.title || "Project Image"}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="flex flex-col flex-1 p-6">
                <div className="mb-4">
                  {project.slug?.current ? (
                    <Link href={`/projects/${project.slug.current}`} className="hover:underline">
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
                    {project.technologies?.filter(Boolean).map((tech) => (
                        <div key={tech?._id} className="bg-secondary/50 p-1.5 rounded-md" title={tech?.name || ""}>
                             {tech.icon ? (
                                <Image
                                    src={urlFor(tech.icon).width(24).height(24).url()}
                                    alt={tech.name || ""}
                                    width={20}
                                    height={20}
                                    className="w-5 h-5 object-contain"
                                />
                             ) : (
                                <span className="text-xs">{tech.name}</span>
                             )}
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <Button asChild variant="outline" size="sm" className="flex-1">
                        {project.slug?.current && (
                        <Link href={`/projects/${project.slug.current}`}>
                            Details <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                        )}
                    </Button>
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
