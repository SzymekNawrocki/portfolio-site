import { type SchemaTypeDefinition } from "sanity";
import { seoType } from "./seoType";
import { postType } from "./postType";
import { pageType } from "./pageType";
import { pageBuilderType } from "./blocks/pageBuilderType";
import { faqType } from "./faqType";
import { faqsType } from "./blocks/faqsType";
import { featuresType } from "./blocks/featuresType";
import { heroType } from "./blocks/heroType";
import { splitImageType } from "./blocks/splitImageType";
import { blockContentType } from "./blockContentType";
import { siteSettingsType } from "./siteSettingsType";
import { redirectType } from "./redirectType";
import { socialType } from "./socialType";
import { localeType } from "./locale";
import { postsPageType } from "./postsPageType";
import { technologyType } from "./technologyType";
import { technologiesBlockType } from "./blocks/technologiesBlockType";
import { servicesBlockType } from "./blocks/servicesBlockType";
import { serviceType } from "./serviceType";
import { ctaBlockType } from './blocks/ctaBlockType';
import { projectType } from "./projectType";
import { projectsBlockType } from "./blocks/projectsBlockType";
import { contactSectionType } from "./blocks/contactSectionType";
import { contactMessageType } from "./contactMessageType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    socialType,
    seoType,
    blockContentType,
    postType,
    pageType,
    pageBuilderType,
    faqType,
    faqsType,
    localeType,
    featuresType,
    heroType,
    splitImageType,
    siteSettingsType,
    redirectType,
    postsPageType,
    technologyType,
    technologiesBlockType,
    servicesBlockType,
    serviceType,
    ctaBlockType,
    projectType,
    projectsBlockType,
    contactSectionType,
    contactMessageType,
  ],
};

// npx sanity schema validate
