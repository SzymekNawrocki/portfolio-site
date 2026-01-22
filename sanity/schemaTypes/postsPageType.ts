import { defineField, defineType } from "sanity";
import { ComposeIcon } from "@sanity/icons";

export const postsPageType = defineType({
  name: "postsPage",
  title: "Posts Page",
  type: "document",
  icon: ComposeIcon,
  fields: [
    defineField({
      name: "eyebrow",
      type: "string",
      title: "Eyebrow",
    }),
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Page Title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "intro",
      type: "blockContent",
      title: "Intro text",
    }),
    defineField({
      name: "emptyStateTitle",
      type: "string",
      title: "Empty state title",
    }),
    defineField({
      name: "emptyStateDescription",
      type: "text",
      title: "Empty state description",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Posts Page",
        subtitle: "Content for /posts",
      };
    },
  },
});
