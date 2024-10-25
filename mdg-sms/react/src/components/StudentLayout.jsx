import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function StudentLayout() {
    const { token } = useStateContext();

    if (!token) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            Student
            <Outlet />
        </div>
    );
}
