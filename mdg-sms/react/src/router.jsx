import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login.jsx"; // Ensure this path is correct
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
        path: '*',
        element: <NotFound />
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                path: 'dashboard',
                element: <AdminDash />
            }
        ]
    },
    {
        path: '/student',
        element: <StudentLayout />,
        children: [
            {
                path: 'dashboard',
                element: <StudentDash />
            }
        ]
    }
]);

export default router;