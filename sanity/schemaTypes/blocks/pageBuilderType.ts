import { defineType, defineArrayMember } from "sanity";

export const pageBuilderType = defineType({
  name: "pageBuilder",
  type: "array",
  of: [
    defineArrayMember({ type: "hero" }),
    defineArrayMember({ type: "splitImage" }),
    defineArrayMember({ type: "features" }),
    defineArrayMember({ type: "faqs" }),
    defineArrayMember({ type: "technologiesBlock" }),
    defineArrayMember({ type: "servicesBlock" }),
    defineArrayMember({ type: "cta" }),
    defineArrayMember({ type: "projectsBlock" }),
    defineArrayMember({ type: "contactSection" }),
    defineArrayMember({ type: "richText" }),
    defineArrayMember({ type: "aboutMe" }),
  ],
  options: {
    insertMenu: {
      views: [
        {
          name: "grid",
          previewImageUrl: (schemaType) => `/block-previews/${schemaType}.png`,
        },
      ],
    },
  },
});
