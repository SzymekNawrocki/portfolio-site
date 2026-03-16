import { PortableText } from "next-sanity";
import Image from "next/image";
import { PROJECT_QUERYResult } from "@/sanity/types";
import { SectionTitle } from "../ui/section-title";
import { urlFor } from "@/sanity/lib/image";
import { components } from "@/sanity/components/portableTextComponents";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { Eyebrow } from '../ui/eyebrow';

export function Project(props: NonNullable<PROJECT_QUERYResult>) {
  const {
    title,
    mainImage,
    body,
    projectLink,
    githubLink,
    technologies
  } = props;

  return (
    <Card className="mt-22 md:mt-24 p-6 md:p-14 rounded-3xl">
      <CardHeader className="space-y-6">
        <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-4">
            <div>
                <CardTitle>
                    <SectionTitle text={title} tag="h1" className="lg:text-4xl text-xl md:text-4xl" />
                </CardTitle>
            </div>

            <div className="flex gap-3">
                {githubLink && (
                    <Button asChild variant="outline">
                        <a href={githubLink} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 w-4 h-4" /> GitHub
                        </a>
                    </Button>
                )}
                {projectLink && (
                    <Button asChild>
                        <a href={projectLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" /> 
                        </a>
                    </Button>
                )}
            </div>
        </div>

        <Separator />
      </CardHeader>

      <CardContent>
        <div className="gap-y-12 grid lg:grid-cols-12">
          {mainImage ? (
            <figure className="flex flex-col items-start gap-3 lg:col-span-12">
              <div className="relative rounded-xl w-full h-[300px] md:h-[500px] overflow-hidden">
                <Image
                    src={urlFor(mainImage).width(1200).height(600).url()}
                    alt={mainImage.alt || title || "Project Image"}
                    fill
                    className="object-cover"
                    priority
                />
              </div>
            </figure>
          ) : null}

          <div className="lg:col-span-8 lg:prose-lg">
             {body ? (
                <PortableText value={body} components={components} />
             ) : (
                <p className="text-muted-foreground italic">No detailed description provided.</p>
             )}
          </div>

          <div className="lg:col-span-4 lg:pl-12">
             {technologies && technologies.length > 0 && (
                <div className="bg-muted/30 p-6 rounded-2xl">
                    <h3 className="mb-4 font-semibold text-lg">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                         {technologies.map((tech) => (
                            <Badge
                               key={tech?._id}
                               variant="secondary"
                               className="flex items-center gap-2 px-3 py-1"
                            >
                                {tech?.icon ? (
                                  <Image
                                    src={urlFor(tech.icon).width(20).height(20).url()}
                                    alt={tech?.name ?? ""}
                                    width={20}
                                    height={20}
                                  />
                                ) : null}
                                {tech?.name ?? "—"}
                            </Badge>
                         ))}
                    </div>
                </div>
             )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
