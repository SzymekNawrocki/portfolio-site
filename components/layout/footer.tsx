import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

import { FOOTER_QUERYResult } from "@/sanity/types";

export function Footer({ data }: { data: FOOTER_QUERYResult }) {
  return (
    <footer className="bg-background border-t">
      <div className="flex md:flex-row flex-col justify-between items-center gap-6 mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        <Link href="/" className="flex items-center transition-opacity hover:opacity-90">
          {data?.logoImage && (
            <Image
              src={urlFor(data.logoImage).url()}
              alt="Logo Devemite"
              width={400}
              height={120}
              className="w-auto h-12 md:h-16 object-contain"
            />
          )}
        </Link>

        <div className="flex flex-col md:flex-row items-center gap-6">
          {data?.privacyPolicyLink && (
            <Link
              href={data.privacyPolicyLink.href as "/"}
              className="text-sm text-primary/70 hover:text-primary transition-colors"
            >
              {data.privacyPolicyLink.label}
            </Link>
          )}
          
          <div className="flex items-center gap-4">
            {data?.socialLinks?.map((link, index: number) => (
              <a
                key={index}
                href={link.url ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary/70 hover:text-primary transition-colors hover:scale-110 transform transition-transform"
                title={link.platform ?? undefined}
              >
                {link.iconImage && (
                  <Image
                    src={urlFor(link.iconImage).url()}
                    alt={link.platform ?? ""}
                    width={28} 
                    height={28}
                    className="w-7 h-7"
                  />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>

      <Separator className="opacity-30" />

      <div className="py-6 text-primary/70 text-sm text-center">
        &copy; {new Date().getFullYear()} 
      </div>
    </footer>
  );
}