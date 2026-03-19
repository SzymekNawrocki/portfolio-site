export type Locale = "pl" | "de" | "en";

export const breadcrumbDictionary: Record<Locale, Record<string, string>> = {
  pl: {
    projects: "Projekty",
    services: "Usługi",
    technologies: "Technologie",
    posts: "Artykuły",
  },
  de: {
    projects: "Projekte",
    services: "Dienstleistungen",
    technologies: "Technologien",
    posts: "Beiträge",
  },
  en: {
    projects: "Projects",
    services: "Services",
    technologies: "Technologies",
    posts: "Posts",
  },
};

/**
 * Returns a localized label from the dictionary if it exists.
 * If not found, returns null.
 */
export function getDictionaryLabel(segment: string, locale: Locale): string | null {
  const currentLocale = (locale as any) || "en";
  const dictionary = breadcrumbDictionary[currentLocale as Locale];
  const normalizedSegment = segment.toLowerCase().replace(/^\//, "");

  if (dictionary && dictionary[normalizedSegment]) {
    return dictionary[normalizedSegment];
  }

  return null;
}

/**
 * Returns a localized label for a static URL segment.
 * If the segment is not in the dictionary (e.g., dynamic slug),
 * it returns the raw segment capitalized.
 * 
 * @param segment The URL segment (e.g., "projects")
 * @param locale The current language ('pl', 'de', or 'en')
 */
export function getBreadcrumbLabel(segment: string, locale: Locale): string {
  const dictLabel = getDictionaryLabel(segment, locale);
  if (dictLabel) return dictLabel;

  // Graceful Fallback: Capitalize first letter and replace dashes with spaces
  if (!segment) return "";
  
  const cleanSegment = segment.replace(/^\//, "");
  return cleanSegment
    .charAt(0)
    .toUpperCase() + 
    cleanSegment.slice(1).replace(/-/g, " ");
}
