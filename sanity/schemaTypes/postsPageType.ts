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
      name: "backToHomeLabel",
      type: "string",
      title: "Back to Home label",
      description: 'Text for the "Back to Home" link (e.g., "Return home")',
    }),
    defineField({
      name: "backToBlogLabel",
      type: "string",
      title: "Back to Blog label",
      description: 'Text for the "Back to Blog" link (e.g., "Back to blog")',
    }),
    defineField({
      name: "minReadLabel",
      type: "string",
      title: "Min read label",
      description: 'Text for reading time (e.g., "min read")',
    }),
    defineField({
      name: "noDescriptionLabel",
      type: "string",
      title: "No description label",
      description: 'Text shown when there is no body content (e.g., "No detailed description provided.")',
    }),
    defineField({
      name: "relatedPostsEyebrow",
      type: "string",
      title: "Related posts eyebrow",
      description: 'Eyebrow text for the related posts section (e.g., "Keep Reading")',
    }),
    defineField({
      name: "relatedPostsTitle",
      type: "string",
      title: "Related posts title",
      description: 'Title for the related posts section (e.g., "Related posts")',
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
    defineField({
      name: "seo",
      type: "seo",
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
