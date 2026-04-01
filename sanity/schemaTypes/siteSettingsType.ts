import { defineField, defineType } from "sanity";
import { ControlsIcon } from "@sanity/icons";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: ControlsIcon,
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
      title: "Site Title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Site Description",
    }),
    defineField({
      name: "homePage",
      type: "reference",
      to: [{ type: "page" }],
    }),
    defineField({
      name: "copyrightText",
      type: "string",
      title: "Copyright Text",
      description: "Text shown in the footer (e.g. 'Szymon Nawrocki - Devemite')",
    }),
  ],
  preview: {
    select: {
      language: "language",
    },
    prepare({ language }) {
      return {
        title: "Site Settings",
        subtitle: language ? `Language: ${language}` : "No language set",
      };
    },
  },
});