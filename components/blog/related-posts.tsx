"use client";

import Link from "next/link";
import { createDataAttribute } from "next-sanity";
import { useOptimistic } from "next-sanity/hooks";
import { POST_QUERYResult } from "@/sanity/types";
import { client } from "@/sanity/lib/client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Eyebrow } from "../ui/eyebrow";
import { SectionTitle } from "../ui/section-title";

const { projectId, dataset, stega } = client.config();
export const createDataAttributeConfig = {
  projectId,
  dataset,
  baseUrl: typeof stega.studioUrl === "string" ? stega.studioUrl : "",
};

export function RelatedPosts({
  relatedPosts,
  documentId,
  documentType,
}: {
  relatedPosts: NonNullable<POST_QUERYResult>["relatedPosts"];
  documentId: string;
  documentType: string;
}) {
  const posts = useOptimistic<
    NonNullable<POST_QUERYResult>["relatedPosts"] | undefined,
    NonNullable<POST_QUERYResult>
  >(relatedPosts, (state, action) => {
    if (action.id === documentId && action?.document?.relatedPosts) {
      return action.document.relatedPosts.map(
        (post) => state?.find((p) => p._key === post._key) ?? post
      );
    }
    return state;
  });

  if (!posts) return null;

  return (
    <aside className="mt-16">
      <Card className="bg-card/80 shadow-primary/10 shadow-xl border border-border rounded-[2rem] text-card-foreground">
        <CardHeader className="gap-3">
          <Eyebrow text="Desert echoes" className="tracking-[0.35em] text-xs" />
          <SectionTitle text="Related posts" tag="h3" className="text-2xl font-serif" />
          <Separator className="bg-border/60" />
        </CardHeader>

        <CardContent className="pt-6">
          <ul
            className="flex sm:flex-row flex-col gap-4"
            data-sanity={createDataAttribute({
              ...createDataAttributeConfig,
              id: documentId,
              type: documentType,
              path: "relatedPosts",
            }).toString()}
          >
            {posts.map((post) => (
              <li
                key={post._key}
                className="group flex-1 bg-muted/20 hover:bg-accent hover:text-accent-foreground p-5 border border-border rounded-[1.5rem] text-foreground text-sm"
                data-sanity={createDataAttribute({
                  ...createDataAttributeConfig,
                  id: documentId,
                  type: documentType,
                  path: `relatedPosts[_key==\"${post._key}\"]`,
                }).toString()}
              >
                <Link
                  href={`/posts/${post?.slug?.current}`}
                  className="focus-visible:outline-none focus-visible:ring-2 font-semibold text-primary hover:text-accent-foreground"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </aside>
  );
}
