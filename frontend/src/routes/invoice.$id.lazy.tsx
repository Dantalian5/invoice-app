import * as React from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/invoice/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/invoice/$id"!</div>
}
