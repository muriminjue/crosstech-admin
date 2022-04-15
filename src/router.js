import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
//import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//

import DashboardApp from "./pages/Dashboard";

// ----------------------------------------------------------------------

export default function Router() {
  let routes = [
    {
      path: "/app",
      element: <DashboardLayout />,
      children: [
        { path: "home", element: <DashboardApp /> },
        //     { path: 'user', element: <User /> },
        //     { path: 'products', element: <Products /> },
        //     { path: 'blog', element: <Blog /> }
      ],
    },
    // {
    //   path: '/',
    //   element: <LogoOnlyLayout />,
    //   children: [
    //     { path: '/', element: <Navigate to="/dashboard/app" /> },
    //     { path: 'login', element: <Login /> },
    //     { path: 'register', element: <Register /> },
    //     { path: '404', element: <NotFound /> },
    //     { path: '*', element: <Navigate to="/404" /> }
    //   ]
    // },
    { path: "*", element: <Navigate to="/404" replace /> },
  ];
  return useRoutes(routes);
}
