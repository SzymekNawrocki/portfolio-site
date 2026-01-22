"use client";

import { Link } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/ui/dark-mode";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./language-switcher";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        scrolled
          ? "backdrop-blur bg-background/80 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center mx-auto p-4 md:p-6 max-w-7xl">
        <Link href="/" className="font-bold text-primary md:text-xl">
          Devemite
        </Link>

        <nav className="hidden md:flex gap-8 font-semibold text-primary">
          <Link href="/posts" className="hover:text-primary transition-colors">
            Blog
          </Link>
          <Link href="/projects" className="hover:text-primary transition-colors">
            Projects
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <LanguageSwitcher />
          <Button className="bg-primary hover:bg-secondary text-black whitespace-nowrap">
            Contact us
          </Button>
        </div>
      </div>
    </header>
  );
}
