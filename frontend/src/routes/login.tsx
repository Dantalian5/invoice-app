import { createFileRoute } from "@tanstack/react-router";
import Login from "@/components/layout/Login";

export const Route = createFileRoute("/login")({
  component: Login,
});
