import Link from "next/link";
import Image from "next/image";
import { POSTS_QUERYResult } from "@/sanity/types";
import { PublishedAt } from "./published-at";
import { urlFor } from "@/sanity/lib/image";
import { Categories } from "./categories";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";


export function PostCard(props: POSTS_QUERYResult[0] & { lang: string }) {
  const { title, mainImage, publishedAt, categories, slug, lang } = props;

  return (
    <Link href={`/${lang}/posts/${slug!.current}`} className="group">
      <Card className="gap-4 md:gap-0 grid grid-cols-1 md:grid-cols-12 hover:shadow-md rounded-2xl transition-shadow">
        <CardContent className="md:col-span-2 md:py-6">
          <Categories categories={categories} />
        </CardContent>

        <CardHeader className="flex flex-col justify-center md:col-span-5">
          <CardTitle className="relative font-semibold text-slate-800 group-hover:text-pink-600 text-2xl transition-colors">
            <span className="z-10 relative">{title}</span>
            <span className="z-0 absolute inset-0 bg-pink-50 opacity-0 group-hover:opacity-100 rounded-lg scale-75 group-hover:scale-100 transition-all" />
          </CardTitle>

          <div className="flex items-center gap-x-6 mt-3">
            <PublishedAt publishedAt={publishedAt} />
          </div>
        </CardHeader>

        <CardContent className="flex justify-end md:col-span-4 md:col-start-9 p-0 rounded-lg overflow-hidden">
          {mainImage ? (
            <Image
              src={urlFor(mainImage).width(400).height(220).url()}
              width={400}
              height={220}
              alt={mainImage.alt || title || ""}
              className="w-full h-full object-cover"
            />
          ) : null}
        </CardContent>
      </Card>
    </Link>
  );
}