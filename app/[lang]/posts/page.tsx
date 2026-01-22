import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }> | { lang: string };
}) {

  const resolvedParams = await params;
  const { lang } = resolvedParams;

  const posts = await client.fetch(POSTS_QUERY, { lang });

  return (
    <main className="gap-6 grid grid-cols-1 mx-auto p-12 container">
      <ul className="grid grid-cols-1 divide-y divide-blue-100">
        {posts?.map((post: any) => (
          <li key={post._id}>
            <Link
              className="block p-4 hover:text-blue-500"
              href={`/${lang}/posts/${post?.slug?.current}`}
            >
              {post?.title}
            </Link>
          </li>
        ))}
      </ul>
      <hr />
      <Link href={`/${lang}`}>&larr; Return home</Link>
    </main>
  );
}