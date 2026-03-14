"use client";

import { Link } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/ui/dark-mode";
import LanguageSwitcher from "./language-switcher";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

import { HEADER_QUERYResult } from "@/sanity/types";

export function Header({ data }: { data: HEADER_QUERYResult }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigation = data?.navigation || [
    { label: "Blog", href: "/posts" },
    { label: "Projects", href: "/projects" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur bg-background/80 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center mx-auto px-4 sm:px-6 lg:px-8  md:py-2 max-w-7xl">
       <Link href="/" className="flex items-center transition-opacity hover:opacity-90">
  {data?.logoImage && (
    <Image
      src={urlFor(data.logoImage).url()}
      alt="Logo Devemite"
      width={600} // Zwiększone, żeby Next.js pobrał gęstszy plik
      height={200}
      priority
      // Zmienione h-10 na h-16 (mobile) i h-14 na h-24 (desktop)
      className="w-auto h-16 md:h-24 object-contain" 
    />
  )}
</Link>

        {navigation && (
          <nav className={`hidden md:flex gap-8 font-semibold transition-colors ${scrolled ? 'text-primary' : 'text-white'}`}>
            {navigation.map((item, index: number) => (
              <Link
                key={index}
                href={item.href as "/" | "/posts" | "/projects"}
                className="hover:opacity-70 transition-opacity"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
        
        <div className="flex items-center gap-2">
          <ModeToggle scrolled={scrolled} />
          <LanguageSwitcher scrolled={scrolled} />
        </div>
      </div>
    </header>
  );
}