import { Navigate, useRoutes } from "react-router-dom";
import jwtDecode from "jwt-decode";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Login from "./pages/Login";
import Stock from "./pages/Stock";
import Sales from "./pages/Sales";
import DashboardApp from "./pages/Dashboard";
import NotFound from "./pages/Page404";

// ----------------------------------------------------------------------

export default function Router() {
  let isLoggedout = () => {
    let user = JSON.parse(localStorage.getItem("user")),
      expirationTime = Date.now() + 1000;
    if (user) {
      const { exp } = jwtDecode(user.token);
      expirationTime = exp * 1000 - 60000;
    }
    if (!user || Date.now() >= expirationTime) {
      localStorage.removeItem("user");
      return false;
    } else {
      return true;
    }
  };
  let routes = [

    { path: "/app", element: <Navigate to="/app/dashboard" /> },
    {
      path: "/app",
      element:isLoggedout() ?  <DashboardLayout />: <Navigate to="/login"/>,
      children: [
        { path: "dashboard", element: <DashboardApp /> },
        { path: "stock", element: <Stock /> },
        { path: "sales", element: <Sales /> },
        { path: "*", element: <NotFound /> },

        //     { path: 'user', element: <User /> },
        //     { path: 'products', element: <Products /> },
        //     { path: 'blog', element: <Blog /> }
      ],
    },
    {
      path: "/",
      element: isLoggedout() ? <Navigate to="/app/dashboard" /> : <LogoOnlyLayout />,
      children: [
        { path: "/", element: <Navigate to="/app/dashboard" /> },
        { path: "login", element: <Login /> },
        // { path: 'register', element: <Register /> },

        { path: "*", element: <Navigate to="/app/404" /> },
      ],
    },
    
  ];
  return useRoutes(routes);
}
