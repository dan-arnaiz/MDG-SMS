import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function AdminLayout() {
    const { user, token } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            Admin
            <Outlet />
        </div>
    );
}
