"use client";

import { useLocale } from "next-intl";
import { getDictionaryLabel, getBreadcrumbLabel, Locale } from "@/lib/breadcrumb-dictionary";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "@/i18n/navigation";
import React from "react";

export interface BreadcrumbItemData {
  label?: string;
  href?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItemData[];
  homeLabel?: string;
  className?: string;
}

export function Breadcrumbs({ items = [], homeLabel = "Home", className }: BreadcrumbsProps) {
  const locale = useLocale();

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">{homeLabel}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          // Static segment resolution:
          // 1. Try dictionary (highest priority for folder names)
          // 2. Use item.label (passed from Sanity for dynamic slugs)
          // 3. Fallback to capitalized segment
          const segmentKey = item.href?.replace(/^\//, "").toLowerCase() || "";
          const dictLabel = getDictionaryLabel(segmentKey, locale as Locale);
          
          const segmentLabel = dictLabel || item.label || getBreadcrumbLabel(segmentKey, locale as Locale);

          return (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {item.href && !isLast ? (
                  <BreadcrumbLink asChild>
                    <Link href={item.href as any}>{segmentLabel}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{segmentLabel}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
