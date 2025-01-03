import { createRootRouteWithContext } from "@tanstack/react-router";
import App from "@/App";
import { type AuthContextProps } from "@/components/context/AuthContext";

interface Route {
  auth: AuthContextProps;
}

export const Route = createRootRouteWithContext<Route>()({
  component: App,
});
