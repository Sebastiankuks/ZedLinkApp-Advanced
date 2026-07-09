import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "sonner";
import appCss from "@/styles/globals.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ZedLink Advanced - Zambia's Premier Classifieds" },
      { name: "description", content: "Buy, sell, and discover jobs, cars, property & more across Zambia" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <Toaster richColors position="top-center" />
    </>
  );
}
