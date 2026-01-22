import { defineField, defineType } from "sanity";
import { BlockElementIcon } from "@sanity/icons";

export const ctaBlockType = defineType({
  name: "cta",
  title: "CTA",
  type: "object",
  fields: [
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
    }),
    defineField({
      name: "buttonLink",
      title: "Button Link",
      type: "string",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
  icon: BlockElementIcon,
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      media: "backgroundImage",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "CTA",
        subtitle: subtitle || "Call to Action",
      };
    },
  },
});