import { defineType, defineField } from "sanity";
import { TextIcon } from "@sanity/icons";

export const richTextType = defineType({
  name: "richText",
  title: "Rich Text Content",
  type: "object",
  icon: TextIcon,
  fields: [
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
  ],
  preview: {
    select: {
      body: "body",
    },
    prepare({ body }) {
      const block = (body || []).find((block: any) => block._type === "block");
      return {
        title: "Rich Text Content",
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
