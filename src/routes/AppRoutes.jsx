import { useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import ChangePassword from '../pages/ChangePassword';
import SubmitTool from "../pages/SubmitTool";
import Admin from "../pages/Admin/Admin";
import AdminAudit from "../pages/Admin/AdminAudit";
import AdminTools from "../pages/Admin/AdminTools";


export default function AppRoutes() {
  const routes = [
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/profile", element: <Profile /> },
    { path:"/change-password", element:<ChangePassword />} ,
    { path: "/submit", element: <SubmitTool /> },
    { path:"/admin", element: <Admin /> },
    { path: "/admin/audit", element:<AdminAudit />},
    { path: "/admin/tools", element:<AdminTools />}
  ];

  return useRoutes(routes);
}
