import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S, context) => {
  const { currentUser } = context;
  const isAdmin = currentUser?.roles.some(
    (role) => role.name === "administrator"
  );

  return S.list()
    .title("Devemite")
    .items([

      S.documentTypeListItem("post").title("Posts"),

      S.divider(),

      S.documentTypeListItem("page").title("Pages"),

      S.documentTypeListItem("redirect").title("Redirects"),
      S.divider(),
      S.documentTypeListItem("header").title("Header"),
      S.documentTypeListItem("footer").title("Footer"),

      S.divider(),
      S.listItem()
        .id("siteSettings")
        .schemaType("siteSettings")
        .title("Site Settings")
        .child(
          S.editor()
            .id("siteSettings")
            .schemaType("siteSettings")
            .documentId("siteSettings")
        ),

      S.divider(),

      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        if (!id) return false;

        if (["post", "page", "redirect", "siteSettings", "header", "footer"].includes(id)) {
          return false;
        }

        return true;
      }),
    ]);
};
