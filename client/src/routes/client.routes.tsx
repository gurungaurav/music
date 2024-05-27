import { lazy } from "react";
const HomePage = lazy(() => import("../pages/homePage"));
const SearchPage = lazy(() => import("../pages/searchPage"));

export const clientRoutes = [
  {
    id: "home",
    path: "/",
    element: HomePage,
    hasHomeLayout: true,
    hasAdminLayout: false,
  },
  {
    id: "home",
    path: "/search",
    element: SearchPage,
    hasHomeLayout: true,
    hasAdminLayout: false,
  },
];
