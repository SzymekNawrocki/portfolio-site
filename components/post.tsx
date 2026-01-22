import { PortableText } from "next-sanity";
import Image from "next/image";
import { Categories } from "./categories";
import { POST_QUERYResult } from "@/sanity/types";
import { SectionTitle } from "./section-title";
import { urlFor } from "@/sanity/lib/image";
import { components } from "@/sanity/components/portableTextComponents";
import { RelatedPosts } from "./related-posts";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function Post(props: NonNullable<POST_QUERYResult>) {
  const {
    _id,
    title,
    mainImage,
    body,
    publishedAt,
    categories,
    relatedPosts,
  } = props;

  return (
    <Card className="p-6 md:p-10 rounded-3xl">
      <CardHeader className="space-y-6">
        <div className="flex items-center gap-4">
          <Categories categories={categories} />
        </div>

        <CardTitle>
          <SectionTitle text={title} tag="h1" className="lg:text-6xl text-2xl md:text-4xl" />
        </CardTitle>

        <Separator />
      </CardHeader>

      <CardContent>
        <div className="gap-y-12 grid lg:grid-cols-12">
          {mainImage ? (
            <figure className="flex flex-col items-start gap-3 lg:col-span-4">
              <Image
                src={urlFor(mainImage).width(400).height(400).url()}
                width={400}
                height={400}
                alt={mainImage.alt || ""}
                className="rounded-xl object-cover"
              />
            </figure>
          ) : null}

          {body ? (
            <div className="lg:col-span-7 lg:col-start-6 lg:prose-lg">
              <PortableText value={body} components={components} />

              <Separator className="my-10" />

              <RelatedPosts
                relatedPosts={relatedPosts}
                documentId={_id}
                documentType="post"
              />
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
