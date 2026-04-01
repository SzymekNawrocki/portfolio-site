'use client'

import { resolve } from "@/sanity/presentation/resolve";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { assist } from "@sanity/assist";
import { documentInternationalization } from "@sanity/document-internationalization";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,

  document: {
    newDocumentOptions: (prev) =>
      prev.filter((item) => item.templateId !== "siteSettings"),
  },

  plugins: [
    structureTool({ structure }),

    visionTool({ defaultApiVersion: apiVersion }),

    presentationTool({
      resolve,
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),

    assist(),

    documentInternationalization({
      supportedLanguages: (client) =>
        client.fetch(`*[_type == "locale"]{"id": tag, "title": name}`),

      schemaTypes: ["page", "post", "header", "footer", "postsPage", "projectsPage", "servicesPage", "technologiesPage", "siteSettings", "faq", "technology", "service", "project"],
    }),
  ],
});
