import { defineField, defineType } from "sanity";
import { CaseIcon } from "@sanity/icons";

export const serviceType = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Service Title",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "icon",
      type: "string",
      title: "Icon (Lucide)",
      options: {
        list: [
          { title: "Globe", value: "Globe" },
          { title: "Code", value: "Code" },
          { title: "Mail", value: "Mail" },
          { title: "Server", value: "Server" },
          { title: "Cpu", value: "Cpu" },
        ],
      },
    }),

    defineField({
      name: "description",
      type: "text",
      title: "Short Description",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),

    defineField({ name: "content", type: "pageBuilder" }),
    defineField({ name: "seo", type: "seo" }),

    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
});
