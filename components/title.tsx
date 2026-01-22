import { PropsWithChildren } from 'react'

export function Title(props: PropsWithChildren) {
  return (
    <h1 className="max-w-3xl font-semibold text-foreground text-2xl md:text-4xl lg:text-6xl">
      {props.children}
    </h1>
  )
}