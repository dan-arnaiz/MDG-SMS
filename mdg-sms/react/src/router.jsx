import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminLayout from "./components/AdminLayout.jsx";
import StudentLayout from "./components/StudentLayout.jsx";
import AuthLayout from "./components/AuthLayout.jsx";

import Login from "./views/Login.jsx";
import NotFound from "./views/NotFound.jsx";
import AdminDash from "./views/AdminDash.jsx";
import StudentDash from "./views/StudentDash.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AdminLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/dashboard" />,
            },
            {
                path: "/dashboard",
                element: <AdminDash />,
            },
        ],
    },
    {
        path: "/",
        element: <StudentLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/student/dashboard" />,
            },
            {
                path: "dashboard",
                element: <StudentDash />,
            },
        ],
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
