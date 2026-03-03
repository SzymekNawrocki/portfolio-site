import { defineQuery } from "next-sanity";

const TECHNOLOGY_FIELDS = `
  _id,
  slug,
  name,
  icon,
  language
`;

const TECHNOLOGIES_WITH_FALLBACK = `
  "technologies": coalesce(
    technologies[]->{
      "tech": coalesce(
        *[_type == "translation.metadata" && references(^._id)][0].translations[_key == $lang][0].value->,
        @
      ){
        ${TECHNOLOGY_FIELDS}
      }
    }.tech,
    []
  )
`;

export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && language == $lang]
  | order(publishedAt desc)[0...12]{
    _id,
    title,
    slug,
    body,
    mainImage,
    publishedAt,
    "categories": coalesce(
      categories[]->{_id, slug, title},
      []
    ),
    author->{name, image},
    relatedPosts[]{
      _key,
      ...@->{
        _id,
        title,
        slug,
        language
      }
    },
    "seo": {
      "title": coalesce(seo.title, title, ""),
      "description": coalesce(seo.description, ""),
      "seoImage": seo.seoImage
    }
  }
`);

export const POSTS_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && language == $lang]{
    "slug": slug.current,
    language
  }
`);

export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug && language == $lang][0]{
    _id,
    title,
    body,
    mainImage,
    publishedAt,
    "categories": coalesce(
      categories[]->{_id, slug, title},
      []
    ),
    author->{name, image},
    relatedPosts[]{
      _key,
      ...@->{
        _id,
        title,
        slug,
        language
      }
    },
    "seo": {
      "title": coalesce(seo.title, title, ""),
      "description": coalesce(seo.description, ""),
      "seoImage": seo.seoImage
    }
  }
`);

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current) && language == $lang]
  | order(_createdAt desc){
    _id,
    title,
    slug,
    description,
    mainImage,
    projectLink,
    githubLink,
    ${TECHNOLOGIES_WITH_FALLBACK},
    language
  }
`);

export const PROJECTS_SLUGS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current) && language == $lang]{
    "slug": slug.current,
    language
  }
`);

export const PROJECT_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug && language == $lang][0]{
    _id,
    title,
    slug,
    description,
    body,
    mainImage,
    projectLink,
    githubLink,
    ${TECHNOLOGIES_WITH_FALLBACK},
    "seo": {
      "title": coalesce(seo.title, title, ""),
      "description": coalesce(seo.description, description, ""),
      "seoImage": seo.seoImage
    }
  }
`);

export const PAGE_QUERY = defineQuery(`
  *[_type in ["page", "technology", "service"] && slug.current == $slug && language == $lang][0]{
    ...,
    "seo": {
      "title": coalesce(seo.title, title, name, ""),
      "description": coalesce(seo.description, description, ""),
      "seoImage": seo.seoImage
    },
    content[]{
      ...,
      _type == "faqs" => {
        "faqs": faqs[]->{_id, _type, title, body}
      },
      _type == "servicesSection" => {
        "services": services[]->{_id, title, slug, description, icon}
      },
      _type == "servicesBlock" => {
        "services": services[]->{_id, title, slug, description, icon}
      },
      _type == "technologiesBlock" => {
        "technologies": technologies[]->{_id, name, slug, description, icon, color, language}
      },
      _type == "projectsBlock" => {
        "eyebrow": eyebrow,
        "title": title,
        "description": description,
        "mode": mode,
        mode == "selected" => {
          "projects": projects[]->[language == $lang]{
            _id, title, slug, description, mainImage, projectLink, githubLink,
            ${TECHNOLOGIES_WITH_FALLBACK}
          }
        },
        mode == "all" => {
          "projects": *[_type == "project" && defined(slug.current) && language == $lang] | order(_createdAt desc)[0...100] {
            _id, title, slug, description, mainImage, projectLink, githubLink,
            ${TECHNOLOGIES_WITH_FALLBACK}
          }
        }
      }
    }
  }
`);

export const PAGES_SLUGS_QUERY = defineQuery(`
  *[_type == "page" && defined(slug.current) && language == $lang]{
    "slug": slug.current,
    language
  }
`);

export const HOME_PAGE_QUERY = defineQuery(`
  *[_id == "siteSettings"][0]{
    "homePage": coalesce(
      *[_type == "translation.metadata" && references(^.homePage._ref)][0].translations[_key == $lang][0].value->,
      homePage->
    ) {
      _id,
      title,
      content[] {
        ...,
        _type == "faqs" => {
          "faqs": faqs[]->{_id, _type, title, body}
        },
        _type == "servicesSection" => {
          "services": services[]->{_id, title, slug, description, icon}
        },
        _type == "servicesBlock" => {
          "services": services[]->{_id, title, slug, description, icon}
        },
        _type == "technologiesBlock" => {
          "technologies": technologies[]->{_id, name, slug, description, icon, color, language}
        },
        _type == "projectsBlock" => {
          "eyebrow": eyebrow,
          "title": title,
          "description": description,
          "mode": mode,
          mode == "selected" => {
            "projects": projects[]->[language == $lang]{
              _id, title, slug, description, mainImage, projectLink, githubLink,
              ${TECHNOLOGIES_WITH_FALLBACK}
            }
          },
          mode == "all" => {
            "projects": *[_type == "project" && defined(slug.current) && language == $lang] | order(_createdAt desc)[0...100] {
              _id, title, slug, description, mainImage, projectLink, githubLink,
              ${TECHNOLOGIES_WITH_FALLBACK}
            }
          }
        }
      }
    }
  }
`);

export const TECHNOLOGY_QUERY = defineQuery(`
  *[_type == "technology" && slug.current == $slug && language == $lang][0]{
    _id,
    name,
    slug,
    description,
    icon,
    color,
    content[]{
      ...,
      _type == "faqs" => {
        "faqs": faqs[]->{_id, _type, title, body}
      },
      _type == "servicesSection" => {
        "services": services[]->{_id, title, slug, description, icon}
      },
      _type == "servicesBlock" => {
        "services": services[]->{_id, title, slug, description, icon}
      },
      _type == "technologiesBlock" => {
        "technologies": technologies[]->{_id, name, slug, description, icon, color, language}
      },
      _type == "projectsBlock" => {
        "eyebrow": eyebrow,
        "title": title,
        "description": description,
        "mode": mode,
        mode == "selected" => {
          "projects": projects[]->[language == $lang]{
            _id,
            title,
            slug,
            description,
            mainImage,
            projectLink,
            githubLink,
            ${TECHNOLOGIES_WITH_FALLBACK}
          }
        },
        mode == "all" => {
          "projects": *[_type == "project" && defined(slug.current) && language == $lang] | order(_createdAt desc)[0...100] {
            _id,
            title,
            slug,
            description,
            mainImage,
            projectLink,
            githubLink,
            ${TECHNOLOGIES_WITH_FALLBACK},
            language
          }
        }
      }
    },
    "seo": {
      "title": coalesce(seo.title, name, ""),
      "description": coalesce(seo.description, description, ""),
      "seoImage": seo.seoImage
    }
  }
`);

export const TECHNOLOGIES_QUERY = defineQuery(`
  *[_type == "technology" && defined(slug.current) && language == $lang]
  | order(name asc){
    _id,
    name,
    slug,
    description,
    icon,
    color,
    language
  }
`);

export const SERVICE_QUERY = defineQuery(`
  *[_type == "service" && slug.current == $slug && language == $lang][0]{
    _id,
    title,
    slug,
    description,
    icon,
    content[]{
      ...,
      _type == "faqs" => {
        "faqs": faqs[]->{_id, _type, title, body}
      },
      _type == "servicesSection" => {
        "services": services[]->{_id, title, slug, description, icon}
      },
      _type == "servicesBlock" => {
        "services": services[]->{_id, title, slug, description, icon}
      },
      _type == "technologiesBlock" => {
        "technologies": technologies[]->{_id, name, slug, description, icon, color, language}
      },
      _type == "projectsBlock" => {
        "eyebrow": eyebrow,
        "title": title,
        "description": description,
        "mode": mode,
        mode == "selected" => {
          "projects": projects[]->[language == $lang]{
            _id,
            title,
            slug,
            description,
            mainImage,
            projectLink,
            githubLink,
            ${TECHNOLOGIES_WITH_FALLBACK}
          }
        },
        mode == "all" => {
          "projects": *[_type == "project" && defined(slug.current) && language == $lang] | order(_createdAt desc)[0...100] {
            _id,
            title,
            slug,
            description,
            mainImage,
            projectLink,
            githubLink,
            ${TECHNOLOGIES_WITH_FALLBACK},
            language
          }
        }
      }
    },
    "seo": {
      "title": coalesce(seo.title, title, ""),
      "description": coalesce(seo.description, description, ""),
      "seoImage": seo.seoImage
    }
  }
`);

export const SERVICES_QUERY = defineQuery(`
  *[_type == "service" && defined(slug.current) && language == $lang]
  | order(title asc){
    _id,
    title,
    slug,
    description,
    icon,
    language
  }
`);

export const SERVICES_SLUGS_QUERY = defineQuery(`
  *[_type == "service" && defined(slug.current) && language == $lang]{
    "slug": slug.current,
    language
  }
`);

export const REDIRECTS_QUERY = defineQuery(`
  *[_type == "redirect" && isEnabled == true]{
    source,
    destination,
    permanent
  }
`);

export const OG_IMAGE_QUERY = defineQuery(`
  *[_id == $id][0]{
    title,
    mainImage
  }
`);

export const SITEMAP_QUERY = defineQuery(`
  *[_type in ["page", "post", "technology", "service", "project"] && defined(slug.current) && language == $lang]{
    "href": select(
      _type == "page" => "/" + slug.current,
      _type == "post" => "/posts/" + slug.current,
      _type == "technology" => "/technologies/" + slug.current,
      _type == "service" => "/services/" + slug.current,
      _type == "project" => "/projects/" + slug.current,
      slug.current
    ),
    _updatedAt
  }
`);

export const HEADER_QUERY = defineQuery(`
  *[_type == "header" && language == $lang][0]{
    logoImage,
    navigation[]{
      label,
      href
    }
  }
`);

export const FOOTER_QUERY = defineQuery(`
  *[_type == "footer" && language == $lang][0]{
    logoImage,
    privacyPolicyLink{
      label,
      href
    },
    socialLinks[]{
      platform,
      url,
      iconImage
    }
  }
`);