import { createBrowserRouter } from "react-router-dom";
import Login from "./views/login.jsx";
import NotFound from "./views/NotFound.jsx";
import AdminLayout from "./components/AdminLayout.jsx";
import StudentLayout from "./components/StudentLayout.jsx";
import AdminDash from "./views/AdminDash.jsx";
import StudentDash from "./views/StudentDash.jsx";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
    {
        path: "/",
        element: <AdminLayout />,
        children: [
            {
                path: "/adashboard",
                element: <AdminDash />,
            },
        ],
    },
    {
        path: "/",
        element: <StudentLayout />,
        children: [
            {
                path: "/sdashboard",
                element: <StudentDash />,
            },
        ],
    },
]);

export default router;
