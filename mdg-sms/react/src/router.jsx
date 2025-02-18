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
import AddStudentModal from "./components/dialogs/AddStudentModal.jsx";
import ScholarshipProfile from "./views/ScholarshipProfile.jsx";
import AddScholarship from "./views/Add-Scholarship.jsx";
import EditStudentProfile from "./views/EditStudentDetails/EditStudentProfile.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import EditStudentScholarship from "./views/EditStudentDetails/EditStudentScholarship.jsx";
import EditStudentContact from "./views/EditStudentDetails/EditStudentContact.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoute allowedRoles={["Admin"]} />,
        children: [
            {
                path: '',
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
                        path: '/scholarships/:id',
                        element: <ScholarshipProfile/>
                    },
                    {
                        path: '/add-scholarship',
                        element: <AddScholarship/>
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
                        path: '/add-student/:id',
                        element: <AddStudent/>
                    },
                    {
                        path: '/new-student',
                        element: <AddStudentModal/>
                    },
                    {
                        path: '/edit-student-profile/:id',
                        element: <EditStudentProfile/>
                    },
                    {
                        path: '/edit-student-scholarship/:id',
                        element: <EditStudentScholarship/>
                    },
                    {
                        path: '/edit-student-contact/:id',
                        element: <EditStudentContact/>
                    },


                ]
            }
            
        ]
    },
    {
        path: '/',
        element: <ProtectedRoute allowedRoles={["Student"]} />,
        children: [
            {
                path: '',
                element: <StudentLayout />, // Student Layout wraps child routes
                children: [
                    {
                        path: '/',
                        element: <Navigate to="/student-board" />
                    },
                    {
                        path: '/student-board',
                        element: <StudentDash/>
                    }
                ]
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
