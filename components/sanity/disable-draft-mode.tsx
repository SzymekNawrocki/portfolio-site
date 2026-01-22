'use client'

import { useDraftModeEnvironment } from 'next-sanity/hooks'

export function DisableDraftMode() {
  const environment = useDraftModeEnvironment()

  if (environment !== 'live' && environment !== 'unknown') {
    return null
  }

  return (
    <a
      href="/api/draft-mode/disable"
      className="right-4 bottom-4 fixed bg-secondary px-4 py-2 text-accent"
    >
      Disable Draft Mode
    </a>
  )
}