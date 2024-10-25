import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/Login.jsx";
import NotFound from "./views/NotFound.jsx";
import AdminLayout from "./components/AdminLayout.jsx";
import StudentLayout from "./components/StudentLayout.jsx";
import AdminDash from "./views/AdminDash.jsx";
import StudentDash from "./views/StudentDash.jsx";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/',
        element: <AdminLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/admin/dashboard" />
            },
            {
                path: 'dashboard',
                element: <AdminDash />
            }
        ]
    },
    {
        path: '/',
        element: <StudentLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/student/dashboard" />
            },
            {
                path: 'dashboard',
                element: <StudentDash />
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
]);

export default router;