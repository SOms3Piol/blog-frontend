import Login from "./Pages/Login/Login";
import SignUp from "./Pages/Signup/SignUp";
import Verify from "./Pages/verify/Verify";
import Dashboard from "./Pages/dashboard/Dashboard";
import Edit from "./Pages/EditBlog/Edit";
import Create from "./Pages/CreateBlog/Create";
import Home from "./Pages/Home/Home";
import Blog from "./Pages/Blog/Blog";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import AuthProvider from "./context/authContext.jsx";

const AuthLayout = () => (
  <AuthProvider>
    <Outlet />
  </AuthProvider>
);

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/Blog/:id",
        element: <Blog />,
      },
      {
        path: "/verify",
        element: <Verify />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/edit/:id",
            element: <Edit />,
          },
          {
            path: "/create",
            element: <Create />,
          },

          {
            path: "/dashboard",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);

export { router };
