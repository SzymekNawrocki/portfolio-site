import { defineType, defineField } from "sanity";

export const button = defineType({
  name: "button",
  title: "Button",
  type: "object",

  fields: [
    defineField({
      name: "label",
      type: "string",
      title: "Label",
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: "slug",
      type: "string",
      title: "Slug (destination)",
      description: "np. /pl/technologies/react",
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: "variant",
      type: "string",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Outline", value: "outline" },
        ],
      },
      initialValue: "default",
    }),
  ],

  preview: {
    select: {
      title: "label",
    },
  },
});
