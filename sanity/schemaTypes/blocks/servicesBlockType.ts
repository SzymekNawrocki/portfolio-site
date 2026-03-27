import { defineField, defineType } from "sanity";
import { BlockElementIcon } from "@sanity/icons";

export const servicesBlockType = defineType({
  name: "servicesBlock",
  title: "Services Section",
  type: "object",
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: "eyebrow",
      type: "string",
      title: "Eyebrow Text",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Section Title",
    }),
    defineField({
      name: "services",
      type: "array",
      title: "Services",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "readMoreLabel",
      type: "string",
      title: "Read More Label",
      description: "Text for the 'Read more' link (e.g. 'Read more', 'Czytaj więcej')",
      initialValue: "Read more",
    }),
  ],
  preview: {
    select: {
      title: "title",
      services: "services",
    },
    prepare({ title, services }) {
      return {
        title: title || "Services Section",
        subtitle: `${services?.length || 0} services`,
      };
    },
  },
});