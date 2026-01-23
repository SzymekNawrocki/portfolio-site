import { defineField, defineType } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";

export const contactMessageType = defineType({
  name: "contactMessage",
  title: "Contact Message",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      readOnly: true,
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
      date: "createdAt",
    },
    prepare({ title, subtitle, date }) {
      return {
        title: title || "Anonymous",
        subtitle: `${subtitle} - ${date ? new Date(date).toLocaleDateString() : ""}`,
      };
    },
  },
});
