import { POST_QUERYResult } from '@/sanity/types'

type CategoriesProps = {
  categories: NonNullable<POST_QUERYResult>['categories']
}

export function Categories({ categories }: CategoriesProps) {
  return categories.map((category : any) => (
    <span
      key={category._id}
      className="bg-cyan-50 px-2 py-1 rounded-full font-semibold text-accent text-sm"
    >
      {category.title}
    </span>
  ))
}