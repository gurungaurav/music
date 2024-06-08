import { lazy } from "react";
const HomePage = lazy(() => import("../pages/homePage"));
const SearchPage = lazy(() => import("../pages/searchPage"));
const ProfilePage = lazy(() => import("@/pages/profilePage"));

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
  {
    id: "home",
    path: "/profile",
    element: ProfilePage,
    hasHomeLayout: true,
    hasAdminLayout: false,
  },
];
