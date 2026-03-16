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



export function PostCard(props: POSTS_QUERYResult[0] & { lang: string; excerpt?: string | null }) {
  const { title, mainImage, categories, slug, lang, excerpt } = props;

  return (
    <Link href={`/${lang}/posts/${slug!.current}`} className="group block h-full">
      <Card className="flex flex-col h-full bg-card/40 hover:bg-card/80 border-border/50 hover:border-accent/50 rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-sm group-hover:-translate-y-1">
        
        <div className="relative aspect-[16/10] overflow-hidden m-2 rounded-[1.5rem]">
          {mainImage ? (
            <Image
              src={urlFor(mainImage).width(800).height(500).url()}
              width={800}
              height={500}
              alt={mainImage.alt || title || ""}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-muted/30 flex items-center justify-center">
              <span className="text-muted-foreground/50 font-medium">No cover image</span>
            </div>
          )}
          

          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
             <Categories categories={categories} />
          </div>
        </div>

        <div className="flex flex-col flex-1 p-6 pt-4">
          <CardTitle className="font-bold text-xl md:text-2xl leading-tight group-hover:text-accent transition-colors duration-300 line-clamp-2 mb-3">
            {title}
          </CardTitle>

          {excerpt && (
            <p className="text-muted-foreground/80 line-clamp-3 text-sm md:text-[0.95rem] leading-relaxed mb-6">
              {excerpt}
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
}