import { defineField, defineType } from "sanity";
import { RocketIcon } from "@sanity/icons";

export const technologyType = defineType({
  name: "technology",
  title: "Technology",
  type: "document",
  icon: RocketIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Technology Name",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      type: "image",
      title: "Icon/Logo",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Short Description",
      rows: 3,
    }),
    defineField({
      name: "color",
      type: "string",
      title: "Brand Color",
    }),
    defineField({
      name: "content",
      type: "pageBuilder",
    }),
    defineField({
      name: "seo",
      type: "seo",
    }),
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "icon",
      subtitle: "slug.current",
    },
  },
});