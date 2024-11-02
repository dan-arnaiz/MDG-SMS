import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminLayout from "./components/AdminLayout.jsx";
import StudentLayout from "./components/StudentLayout.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
import Signup from "./views/Signup.jsx"; // Import the Signup component::Just for Overriding
import Login from "./views/Login.jsx";
import NotFound from "./views/NotFound.jsx";
import AdminDash from "./views/AdminDash.jsx";
import StudentDash from "./views/StudentDash.jsx";
import Students from "./views/Students.jsx";
import AdminScholarships from "./views/AdminScholarships.jsx";
import AdminReports from "./views/AdminReports.jsx";
import AdminStudentProfile from "./views/AdminStudentProfile.jsx";
import AddStudent from "./views/Add-Student.jsx";
import AdminApplications from "./views/AdminApplications.jsx";
import AddStudentModal from "./components/modals/AddStudentModal.jsx";

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
                path: '/scholarships',
                element: <AdminScholarships />
            },
            {
                path: '/applications',
                element: <AdminApplications />
            },
            {
                path: '/reports',
                element: <AdminReports/>
            },
            {
                path: '/students/:id',
                element: <AdminStudentProfile/>
            },
            {
                path: '/add-student',
                element: <AddStudent/>
            },
            {
                path: '/new-student',
                element: <AddStudentModal/>
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