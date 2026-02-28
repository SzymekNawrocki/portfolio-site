import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

import { FOOTER_QUERYResult } from "@/sanity/types";

export function Footer({ data }: { data: FOOTER_QUERYResult }) {
  return (
    <footer className="bg-background border-t">
      <div className="flex md:flex-row flex-col justify-between items-center gap-6 mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        <Link href="/" className="flex items-center gap-2 font-bold text-primary text-xl">
          {data?.logoImage && (
            <Image
              src={urlFor(data.logoImage).url()}
              alt="Logo"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
          )}
        </Link>

        <div className="flex items-center gap-6">
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
                className="text-primary/70 hover:text-primary transition-colors"
                title={link.platform ?? undefined}
              >
                {link.iconImage && (
                  <Image
                    src={urlFor(link.iconImage).url()}
                    alt={link.platform ?? ""}
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain"
                  />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>

      <Separator className="opacity-30" />

      <div className="py-4 text-primary/70 text-sm text-center">
        &copy; {new Date().getFullYear()} All rights reserved.
      </div>
    </footer>
  );
}
