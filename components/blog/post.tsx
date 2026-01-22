import { PortableText } from "next-sanity";
import Image from "next/image";
import { Categories } from "./categories";
import { POST_QUERYResult } from "@/sanity/types";
import { SectionTitle } from "../ui/section-title";
import { urlFor } from "@/sanity/lib/image";
import { components } from "@/sanity/components/portableTextComponents";
import { RelatedPosts } from "./related-posts";
import { Separator } from "@/components/ui/separator";
import { calculateReadingTime } from "@/lib/utils";
import { MoveLeft, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { PublishedAt } from "./published-at";

export function Post(props: NonNullable<POST_QUERYResult> & { lang?: string }) {
  const {
    _id,
    title,
    mainImage,
    body,
    publishedAt,
    categories,
    relatedPosts,
    lang,
  } = props;

  const readingTime = calculateReadingTime(body || []);

  return (
    <div className="py-16">
      <div className="mx-auto px-4 max-w-4xl">
        <Link 
          href={`/${lang ?? ""}/posts`} 
          className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <MoveLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <Categories categories={categories} />
          </div>

          <SectionTitle text={title} tag="h1" className="mb-6 text-4xl md:text-5xl lg:text-6xl" />

          <div className="flex flex-wrap items-center gap-6 text-muted-foreground text-sm font-medium">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <PublishedAt publishedAt={publishedAt} />
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{readingTime} min read</span>
            </div>
          </div>
        </header>

        <Separator className="mb-12" />

        <article>
          <div className="gap-y-12 grid grid-cols-1">
            {mainImage ? (
              <figure className="mb-12">
                <div className="relative rounded-3xl w-full h-[300px] md:h-[500px] overflow-hidden">
                  <Image
                      src={urlFor(mainImage).width(1200).height(600).url()}
                      alt={mainImage.alt || title || "Post Image"}
                      fill
                      className="object-cover"
                      priority
                  />
                </div>
              </figure>
            ) : null}

            <div className="mx-auto max-w-none prose lg:prose-xl dark:prose-invert">
               {body ? (
                  <PortableText value={body} components={components} />
               ) : (
                  <p className="text-muted-foreground italic">No detailed description provided.</p>
               )}
            </div>

            <Separator className="my-16" />

            <RelatedPosts
              relatedPosts={relatedPosts}
              documentId={_id}
              documentType="post"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
