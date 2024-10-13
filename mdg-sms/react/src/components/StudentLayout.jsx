import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function StudentLayout() {
    const { user, token } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            Student
            <Outlet />
        </div>
    );
}
