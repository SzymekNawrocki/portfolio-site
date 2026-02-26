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
        isUnique: async (slug, context) => {
          const { document, getClient } = context;
          const client = getClient({ apiVersion: "2023-01-01" });
          const id = document?._id.replace(/^drafts\./, "");
          const type = document?._type;
          const lang = document?.language;

          const query = `count(*[_type == $type && slug.current == $slug && language == $lang && !(_id in [$id, "drafts." + $id])]) == 0`;
          const params = { type, slug, lang, id };

          return client.fetch(query, params);
        },
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