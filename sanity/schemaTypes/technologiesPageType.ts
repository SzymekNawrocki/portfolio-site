import { defineField, defineType } from "sanity";
import { Cpu } from "lucide-react";

export const technologiesPageType = defineType({
  name: "technologiesPage",
  title: "Technologies Page",
  type: "document",
  icon: Cpu,
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
      name: "backToHomeLabel",
      type: "string",
      title: "Back to Home label",
    }),
    defineField({
      name: "emptyStateTitle",
      type: "string",
      title: "Empty state title",
      initialValue: "No technologies found",
    }),
    defineField({
      name: "emptyStateDescription",
      type: "text",
      title: "Empty state description",
      initialValue: "Come back later to see more updates.",
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
        title: title || "Technologies Page",
        subtitle: language ? `Language: ${language}` : "No language set",
      };
    },
  },
});
