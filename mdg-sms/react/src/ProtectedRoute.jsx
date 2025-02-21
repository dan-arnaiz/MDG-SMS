import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "./contexts/ContextProvider";

const ProtectedRoute = ({ allowedRoles }) => {
    const { user } = useStateContext();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to={user.role === "Admin" ? "/dashboard" : "/student-board"} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;