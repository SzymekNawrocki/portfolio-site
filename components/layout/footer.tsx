import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

import { FOOTER_QUERYResult } from "@/sanity/types";

export function Footer({ data, copyrightText }: { data: FOOTER_QUERYResult; copyrightText?: string }) {
  return (
    <footer className="bg-background border-t">
      <div className="flex md:flex-row flex-col justify-between items-center gap-8 mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-7xl">
        {/* Left: Logo */}
        <div className="flex-1 flex justify-center md:justify-start">
          <Link href="/" className="flex items-center transition-opacity hover:opacity-90">
            {data?.logoImage && (
              <Image
                src={urlFor(data.logoImage).url()}
                alt="Logo Devemite"
                width={400}
                height={120}
                className="w-auto h-12 md:h-16 lg:h-20 object-contain"
              />
            )}
          </Link>
        </div>

        <div className="flex-1 flex justify-center text-center">
          {data?.privacyPolicyLink && (
            <Link
              href={data.privacyPolicyLink.href as "/"}
              className="text-sm font-medium text-primary/60 hover:text-primary transition-colors tracking-wide"
            >
              {data.privacyPolicyLink.label}
            </Link>
          )}
        </div>
        
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="flex items-center gap-5">
            {data?.socialLinks?.map((link, index: number) => (
              <a
                key={index}
                href={link.url ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary/60 hover:text-primary transition-all hover:scale-125 transform"
                title={link.platform ?? undefined}
              >
                {link.iconImage && (
                  <Image
                    src={urlFor(link.iconImage).url()}
                    alt={link.platform ?? ""}
                    width={24} 
                    height={24}
                    className="w-6 h-6"
                  />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>

      <Separator className="opacity-30" />

      <div className="py-6 text-primary/70 text-sm text-center">
        &copy; {new Date().getFullYear()} {copyrightText || "Szymon Nawrocki - Devemite"}
      </div>
    </footer>
  );
}