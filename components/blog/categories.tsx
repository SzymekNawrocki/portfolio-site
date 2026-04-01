import { POST_QUERYResult } from '@/sanity/types'
import { Badge } from "@/components/ui/badge"

type CategoriesProps = {
  categories: NonNullable<POST_QUERYResult>['categories']
}

export function Categories({ categories }: CategoriesProps) {
  if (!categories) return null;
  
  return categories.map((category : any) => (
    <Badge
      key={category._id}
      variant="outline"
      className="bg-primary/5 text-primary border-primary/20 px-2.5 py-1 rounded-lg text-[10px] uppercase font-bold tracking-wider"
    >
      {category.title}
    </Badge>
  ))
}