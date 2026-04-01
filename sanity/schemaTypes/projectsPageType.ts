import { defineField, defineType } from "sanity";
import { FolderGit2 } from "lucide-react";

export const projectsPageType = defineType({
  name: "projectsPage",
  title: "Projects Page",
  type: "document",
  icon: FolderGit2,
  fields: [
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Page Title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      rows: 3,
    }),
    defineField({
      name: "detailsLabel",
      type: "string",
      title: "Details Button Label",
      description: "Text for the 'Details' button (e.g. 'Details', 'Szczegóły')",
      initialValue: "Details",
    }),
    defineField({
      name: "backToProjectsLabel",
      type: "string",
      title: "Back to Projects label",
      description: 'Text for the "Back to Projects" link (e.g., "Back to projects")',
    }),
    defineField({
      name: "technologiesLabel",
      type: "string",
      title: "Technologies label",
      description: 'Text for the "Technologies" section title',
    }),
    defineField({
      name: "noDescriptionLabel",
      type: "string",
      title: "No description label",
      description: 'Text shown when there is no body content (e.g., "No detailed description provided.")',
    }),
    defineField({
      name: "backToHomeLabel",
      type: "string",
      title: "Back to Home label",
    }),
    defineField({
      name: "seo",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      language: "language",
    },
    prepare({ title, language }) {
      return {
        title: title || "Projects Page",
        subtitle: language ? `Language: ${language}` : "No language set",
      };
    },
  },
});
