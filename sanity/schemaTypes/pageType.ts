import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const pageType = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "social",
      type: "social",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
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
    }),
    defineField({
      name: "content",
      type: "pageBuilder",
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "seo",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
      language: "language",
    },
    prepare({ title, subtitle, language }) {
      return {
        title: title,
        subtitle: `${subtitle || ''} ${language ? `(${language})` : ''}`.trim(),
      };
    },
  },
});