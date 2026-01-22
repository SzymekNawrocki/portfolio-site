import { defineField, defineType } from "sanity";
import { FolderGit2 } from "lucide-react";

export const projectsBlockType = defineType({
  name: "projectsBlock",
  title: "Projects Block",
  type: "object",
  icon: FolderGit2,
  fields: [
    defineField({
      name: "eyebrow",
      type: "string",
      title: "Eyebrow",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      rows: 3,
    }),
    defineField({
      name: "mode",
      type: "string",
      title: "Display Mode",
      options: {
        list: [
          { title: "Selected Projects", value: "selected" },
          { title: "All Recent Projects", value: "all" },
        ],
        layout: "radio",
      },
      initialValue: "all",
    }),
    defineField({
      name: "projects",
      type: "array",
      title: "Projects",
      of: [{ type: "reference", to: [{ type: "project" }] }],
      hidden: ({ parent }) => parent?.mode === "all",
    }),
    defineField({
      name: "limit",
      type: "number",
      title: "Number of projects to show",
      hidden: ({ parent }) => parent?.mode !== "all",
      initialValue: 6,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "mode",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Projects Block",
        subtitle: subtitle === "all" ? "All recent projects" : "Selected projects",
      };
    },
  },
});
