import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { SITEMAP_QUERY } from "@/sanity/lib/queries";
import { routing } from "@/i18n/routing";

type SitemapPath = {
  href: string | null;
  _updatedAt: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const baseUrl = process.env.VERCEL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";


    const allUrls = await Promise.all(
      routing.locales.map(async (lang) => {
        const paths = await client.fetch<SitemapPath[]>(SITEMAP_QUERY, { lang });

        if (!paths) return [];

        return paths
          .filter((path): path is { href: string; _updatedAt: string } => path.href !== null)
          .map((path) => ({
            url: new URL(`/${lang}${path.href}`, baseUrl).toString(),
            lastModified: new Date(path._updatedAt),
            changeFrequency: "weekly" as const,
            priority: 0.8,
          }));
      })
    );

    const urls = allUrls.flat();


    const homepages = routing.locales.map((lang) => ({
      url: new URL(`/${lang}`, baseUrl).toString(),
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    }));

    return [...homepages, ...urls];
  } catch (error) {
    console.error("Failed to generate sitemap:", error);
    return [];
  }
}