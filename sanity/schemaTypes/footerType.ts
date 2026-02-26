import { defineField, defineType } from "sanity";
import { LinkIcon } from "@sanity/icons";

export const footerType = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "logoImage",
      title: "Logo Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "privacyPolicyLink",
      title: "Privacy Policy Link",
      type: "object",
      fields: [
        { name: "label", type: "string" },
        { name: "href", type: "string" },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "socialLink",
          fields: [
            { name: "platform", type: "string", title: "Platform Name" },
            { name: "url", type: "string", title: "URL" },
            { 
              name: "iconImage", 
              type: "image", 
              title: "Icon Image",
              options: {
                hotspot: true,
              }
            },
          ],
        },
      ],
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
      media: "logoImage",
      language: "language",
    },
    prepare({ media, language }) {
      return {
        title: "Footer Settings",
        subtitle: language ? `Language: ${language}` : "No language set",
        media: media,
      };
    },
  },
});
