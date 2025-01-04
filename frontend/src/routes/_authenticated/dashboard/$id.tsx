import { createFileRoute } from '@tanstack/react-router'
import Invoice from '@/components/layout/Invoice'

export const Route = createFileRoute('/_authenticated/dashboard/$id')({
  component: Invoice,
})
