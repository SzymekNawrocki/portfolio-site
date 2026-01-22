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
      <div className="mx-auto max-w-7xl px-4">
        <Eyebrow text={eyebrow} />

        <SectionTitle text={title} className="mb-12" />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon =
              service.icon && iconsMap[service.icon]
                ? iconsMap[service.icon]
                : Globe;

            return (
              <Card
                key={service._id}
                className="border-border group rounded-xl border shadow-sm transition-shadow hover:shadow-md"
              >
                <CardHeader className="flex items-center gap-4 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                    <Icon className="text-secondary-foreground h-5 w-5" />
                  </div>
                  <CardTitle className="text-card-foreground text-xl font-semibold">
                    {service.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="text-muted-foreground mb-4 text-sm">
                  {service.description}
                </CardContent>

                <div className="px-6 pb-6">
                  <Link
                    href={`/services/${service.slug.current}`}
                    className="hover:text-primary-foreground inline-flex items-center gap-1 text-sm font-semibold tracking-wide text-primary"
                  >
                    Read more
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-4 w-4"
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
