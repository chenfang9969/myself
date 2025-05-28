import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/Home"
import Tools from "../pages/Tools"
import NotFound from "../pages/NotFound"

require('dotenv').config();

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/tools",
    element: <Tools />
  },
  {
    path: "*",
    element: <NotFound />
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  }
])
