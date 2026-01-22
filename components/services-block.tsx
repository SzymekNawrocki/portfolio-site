import Link from "next/link";
import { Globe, Code, Mail, Server, Cpu } from "lucide-react";
import { PAGE_QUERYResult } from "@/sanity/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Eyebrow } from "./eyebrow";
import { SectionTitle } from "./section-title";

const iconsMap = {
  Globe,
  Code,
  Mail,
  Server,
  Cpu,
};

type ServicesBlockProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "servicesBlock" }
>;

export function ServicesBlock({
  eyebrow,
  title,
  services,
}: ServicesBlockProps) {
  if (!services || services.length === 0) return null;

  return (
    <div className="py-16">
      <div className="mx-auto px-4 max-w-7xl">
        <Eyebrow text={eyebrow} />

        <SectionTitle text={title} className="mb-12" />

        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon =
              service.icon && iconsMap[service.icon]
                ? iconsMap[service.icon]
                : Globe;

            return (
              <Card
                key={service._id}
                className="group shadow-sm hover:shadow-md border border-border rounded-xl transition-shadow"
              >
                <CardHeader className="flex items-center gap-4 pb-4">
                  <div className="flex justify-center items-center bg-secondary rounded-xl w-10 h-10">
                    <Icon className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  <CardTitle className="font-semibold text-card-foreground text-xl">
                    {service.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="mb-4 text-accent text-sm">
                  {service.description}
                </CardContent>

                <div className="px-6 pb-6">
                  <Link
                    href={`/services/${service.slug.current}`}
                    className="inline-flex items-center gap-1 font-semibold text-primary hover:text-primary-foreground text-sm tracking-wide"
                  >
                    Read more
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
