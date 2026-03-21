import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export const aboutMeType = defineType({
  name: "aboutMe",
  title: "About Me",
  type: "object",
  icon: UserIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      type: "blockContent",
      title: "Rich Text Content",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title || "About Me",
        subtitle: "About Me Section",
        media: media ?? UserIcon,
      };
    },
  },
});
