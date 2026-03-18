import { defineType, defineField } from "sanity";
import { TextIcon } from "@sanity/icons";

export const richTextType = defineType({
  name: "richText",
  title: "Rich Text Content",
  type: "object",
  icon: TextIcon,
  fields: [
    defineField({
      name: "eyebrow",
      type: "string",
      title: "Eyebrow (Optional)",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title (Optional)",
    }),
    defineField({
      name: "body",
      type: "blockContent",
      title: "Body Content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alignment",
      type: "string",
      title: "Alignment",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Center", value: "center" },
        ],
        layout: "radio",
      },
      initialValue: "left",
    }),
    defineField({
      name: "maxWidth",
      type: "string",
      title: "Max Width",
      options: {
        list: [
          { title: "Standard (4xl)", value: "max-w-4xl" },
          { title: "Narrow (2xl)", value: "max-w-2xl" },
          { title: "Full", value: "max-w-none" },
        ],
        layout: "radio",
      },
      initialValue: "max-w-4xl",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "body",
    },
    prepare({ title, subtitle }) {
      const block = (subtitle || []).find((block: any) => block._type === "block");
      return {
        title: title || "Rich Text Content",
        subtitle: block
          ? block.children
              .filter((child: any) => child._type === "span")
              .map((span: any) => span.text)
              .join("")
          : "No content",
      };
    },
  },
});
