import { createFileRoute } from '@tanstack/react-router'
import Dashboard from '@/components/layout/Dashboard'

export const Route = createFileRoute('/_authenticated/dashboard/')({
  component: Dashboard,
})
