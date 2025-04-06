import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"), // default page
    route("about", "routes/About.tsx"), // another page
    route("Paintings", "routes/Paintings.tsx"), // another page
    route("FiberArts", "routes/FiberArts.tsx"), 
  ] satisfies RouteConfig;