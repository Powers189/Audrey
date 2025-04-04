import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"), // default page
    route("about", "routes/About.tsx"), // another page
  ] satisfies RouteConfig;