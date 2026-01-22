import { defineField, defineType } from "sanity";
import { BlockElementIcon } from "@sanity/icons";

export const technologiesBlockType = defineType({
  name: "technologiesBlock",
  title: "Technologies Section",
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
      name: "image",
      type: "image",
      title: "Left Image",
      options: { hotspot: true },
    }),
    defineField({
      name: "technologies",
      type: "array",
      title: "Technologies",
      of: [{ type: "reference", to: [{ type: "technology" }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      technologies: "technologies",
    },
    prepare({ title, technologies }) {
      return {
        title: title || "Technologies Section",
        subtitle: `${technologies?.length || 0} technologies`,
      };
    },
  },
});
