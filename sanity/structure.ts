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
      S.divider(),
      S.documentTypeListItem("projectsPage").title("Projects Page Settings"),
      S.documentTypeListItem("servicesPage").title("Services Page Settings"),
      S.documentTypeListItem("technologiesPage").title("Technologies Page Settings"),
      S.documentTypeListItem("postsPage").title("Posts Page Settings"),

      S.divider(),

      S.documentTypeListItem("redirect").title("Redirects"),
      S.divider(),
      S.documentTypeListItem("header").title("Header"),
      S.documentTypeListItem("footer").title("Footer"),

      S.divider(),
      S.documentTypeListItem("siteSettings").title("Site Settings"),

      S.divider(),

      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        if (!id) return false;

        if (["post", "page", "redirect", "siteSettings", "header", "footer", "projectsPage", "servicesPage", "technologiesPage", "postsPage"].includes(id)) {
          return false;
        }

        return true;
      }),
    ]);
};
