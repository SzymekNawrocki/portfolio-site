"use client";

import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="flex md:flex-row flex-col justify-between items-center gap-6 mx-auto px-6 md:px-8 py-8 max-w-7xl">
        <div className="font-bold text-primary text-xl">Devemite</div>

        <div className="flex items-center gap-4">
        </div>
      </div>

      <Separator className="opacity-30" />

      <div className="py-4 text-primary/70 text-sm text-center">
        &copy; {new Date().getFullYear()} All rights reserved.
      </div>
    </footer>
  );
}
