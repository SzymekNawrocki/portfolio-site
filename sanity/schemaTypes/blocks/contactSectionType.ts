import { defineField, defineType } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";

export const contactSectionType = defineType({
  name: "contactSection",
  title: "Contact Section",
  type: "object",
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "contactDetails",
      title: "Contact Details",
      type: "object",
      fields: [
        defineField({
          name: "email",
          title: "Email",
          type: "string",
        }),
        defineField({
          name: "phone",
          title: "Phone",
          type: "string",
        }),
        defineField({
          name: "location",
          title: "Location",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "showForm",
      title: "Show Contact Form",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "formSettings",
      title: "Contact Form Settings",
      type: "object",
      hidden: ({ parent }) => !parent?.showForm,
      fields: [
        defineField({
          name: "nameLabel",
          title: "Name Field Label",
          type: "string",
          initialValue: "Name",
        }),
        defineField({
          name: "namePlaceholder",
          title: "Name Field Placeholder",
          type: "string",
          initialValue: "Your name",
        }),
        defineField({
          name: "emailLabel",
          title: "Email Field Label",
          type: "string",
          initialValue: "Email",
        }),
        defineField({
          name: "emailPlaceholder",
          title: "Email Field Placeholder",
          type: "string",
          initialValue: "Your email",
        }),
        defineField({
          name: "messageLabel",
          title: "Message Field Label",
          type: "string",
          initialValue: "Message",
        }),
        defineField({
          name: "messagePlaceholder",
          title: "Message Field Placeholder",
          type: "string",
          initialValue: "Tell us more...",
        }),
        defineField({
          name: "submitButtonLabel",
          title: "Submit Button Label",
          type: "string",
          initialValue: "Send Message",
        }),
        defineField({
          name: "successMessage",
          title: "Success Message",
          type: "string",
          initialValue: "Thank you! Your message has been sent.",
        }),
        defineField({
          name: "errorMessage",
          title: "Error Message",
          type: "string",
          initialValue: "Something went wrong. Please try again.",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Contact Section",
        subtitle: "Contact Section Block",
        media: EnvelopeIcon,
      };
    },
  },
});
