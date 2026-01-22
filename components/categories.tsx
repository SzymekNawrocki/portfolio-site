import { POST_QUERYResult } from '@/sanity/types'

type CategoriesProps = {
  categories: NonNullable<POST_QUERYResult>['categories']
}

export function Categories({ categories }: CategoriesProps) {
  return categories.map((category : any) => (
    <span
      key={category._id}
      className="bg-secondary px-2 py-1 rounded-full font-semibold text-secondary-foreground text-xs"
    >
      {category.title}
    </span>
  ))
}