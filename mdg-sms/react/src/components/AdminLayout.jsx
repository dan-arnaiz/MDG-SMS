import { Outlet, Navigate, Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function AdminLayout() {

    const {user, token} = useStateContext()

    if (!token) {
        return <Navigate to="/login" />
    }

    const onLogout = (ev) => {
        ev.preventDefault();
        localStorage.removeItem("ACCESS_TOKEN");
        window.location.href = "/login";
    }
    
    return(
        <div>
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            
            <h1>Admin</h1>

            <div className="content">
            <header>
            <div>
                Header
            </div>
            <div>
                {user.name}
                <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
            </div>
            </header>
                <main>
                    <Outlet />
                </main>
             </div>
        </div>
    )
}