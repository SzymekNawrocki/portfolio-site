import { defineField, defineType } from "sanity";
import { CaseIcon } from "@sanity/icons";

export const servicesPageType = defineType({
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  icon: CaseIcon,
  fields: [
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
      name: "readMoreLabel",
      type: "string",
      title: "Read More Label",
    }),
    defineField({
      name: "seo",
      type: "seo",
    }),
  ],
});
