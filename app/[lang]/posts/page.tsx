import { client } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { SectionTitle } from "@/components/section-title";
import { Eyebrow } from "@/components/eyebrow";
import { PostCard } from "@/components/post-card";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }> | { lang: string };
}) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;

  const posts = await client.fetch(POSTS_QUERY, { lang });

  return (
    <main className="py-24">
      <div className="mx-auto px-4 max-w-7xl">
        <header className="my-16">
          <Eyebrow text="Insights & Articles" />
          <SectionTitle
            text="Exploring the world of technology and design"
            tag="h1"
            className="mb-4 max-w-2xl"
          />
        </header>

        <div className="gap-8 grid grid-cols-1">
          {posts?.map((post: any) => (
            <PostCard key={post._id} {...post} lang={lang} />
          ))}
        </div>

        <div className="mt-20 pt-8 border-t">
          <Link
            href={`/${lang}`}
            className="group inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <MoveLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Return home
          </Link>
        </div>
      </div>
    </main>
  );
}
