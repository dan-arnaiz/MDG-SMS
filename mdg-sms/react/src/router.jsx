import { createBrowserRouter, Navigate } from "react-router-dom";

// admin imports //
import AdminLayout from "./components/AdminLayout.jsx";
import AdminDash from "./views/AdminDash.jsx";
import Students from "./views/AdminStudents.jsx";
import AdminScholarships from "./views/AdminScholarships.jsx";
import AdminReports from "./views/AdminReports.jsx";

// student imports //
import StudentLayout from "./components/StudentLayout.jsx";
import StudentProfile from "./views/StudentProfile.jsx";

// auth imports //
import AuthLayout from "./components/AuthLayout.jsx";
import Signup from "./views/Signup.jsx"; // Import the Signup component::Just for Overriding
import Login from "./views/Login.jsx";

import NotFound from "./views/NotFound.jsx";
import StudentDash from "./views/StudentDash.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <AdminLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard" />
            },
            {
                path: '/dashboard',
                element: <AdminDash />
            },
            {
                path: '/students',
                element: <Students/>
            },
            {
                path: '/scholarship-list',
                element: <AdminScholarships />
            },
            {
                path: '/reports',
                element: <AdminReports/>
            },
            {
                path: '/student/profile/:studentId',
                element: <StudentProfile />
            },
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
        path: '/',
        element: <AuthLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
                // Override the Signup component
            }]
            
    },
    {
        path: '*',
        element: <NotFound />
    }
]);

export default router;