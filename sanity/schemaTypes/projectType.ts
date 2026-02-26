import { defineField, defineType } from "sanity";
import { FolderGit2 } from "lucide-react";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: FolderGit2,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Alt text is required when an image is present",
          validation: (rule) =>
            rule.custom((value, context) => {
              const parent = context?.parent as { asset?: { _ref?: string } };
              return !value && parent?.asset?._ref
                ? "Alt text is required when an image is present"
                : true;
            }),
        }),
      ],
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      type: "blockContent",
    }),
    defineField({
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "reference", to: [{ type: "technology" }] }],
    }),
    defineField({
      name: "projectLink",
      title: "Project Link",
      type: "url",
    }),
    defineField({
      name: "githubLink",
      title: "GitHub Link",
      type: "url",
    }),
    defineField({
      name: "seo",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
    },
  },
});
