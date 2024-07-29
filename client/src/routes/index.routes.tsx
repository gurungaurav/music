import { Fragment, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeLayout from "../layouts/homeLayout";
import { allRoutes } from "./all.routes";
import { RouteTypes } from "../interfaces/types/index.interfaces";

// Define MainWrapper component with proper prop types
function MainWrapper({
  route, 
  children,
}: {
  route: RouteTypes;
  children: React.ReactNode;
}) {
  const HomeWrapper = route.hasHomeLayout ? HomeLayout : Fragment;
  // Add AdminWrapper and PrivateWrapper if needed later
  // const AdminWrapper = route.hasAdminLayout ? AdminLayout : Fragment;
  // const PrivateWrapper = route.requiredAuth ? AuthChecker : Fragment;

  // If using more wrappers, they can be nested heres
  // return (
  //   <PrivateWrapper>
  //     <AdminWrapper>
  //       <HomeWrapper>{children}</HomeWrapper>
  //     </AdminWrapper>
  //   </PrivateWrapper>
  // );

  return <HomeWrapper>{children}</HomeWrapper>;
}

// Define Router component
export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          {allRoutes.map((route: RouteTypes) => (
            <Route
              key={route.id}
              path={route.path}
              element={
                <MainWrapper route={route}>
                  <route.element />
                </MainWrapper>
              }
            />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
