import { Outlet, Navigate, NavLink } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

export default function AdminLayout() {

    const {user, token} = useStateContext()

    // commented to see viewport live
    // if (!token) {
    //     return <Navigate to="/login" />
    // }

    const onLogout = (ev) => {
        ev.preventDefault();
        localStorage.removeItem("ACCESS_TOKEN");
        window.location.href = "/login";
    }
    
    return(

        <div className="adminlayout-background">
            <header className="AdminLay-Header">
                <div className="header-logo">
                    <img src="images/Logo-Final-2.png" alt="Logo"/>
                </div>
                <div className="Head-Toolbox">
                    <NavLink to="">need help?</NavLink>
                    <NavLink to="">Application</NavLink>
                    <NavLink to="">Username</NavLink>             
                </div>
            </header>
            <aside className="navbar">
                <ul>
                    <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                    <li><NavLink to="/student-list">Students</NavLink></li>
                    <li><NavLink to="/scholarship-list">Scholarships</NavLink></li>
                    <li><NavLink to="/reports">Reports</NavLink></li>
                </ul>
            </aside>
            <main>
                <Outlet/>
            </main>
        </div>      
    )
}