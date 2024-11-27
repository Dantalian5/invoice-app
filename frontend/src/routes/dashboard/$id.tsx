import { createFileRoute } from "@tanstack/react-router";
import Invoice from "@/components/layout/Invoice";

export const Route = createFileRoute("/dashboard/$id")({
  component: Invoice,
});
