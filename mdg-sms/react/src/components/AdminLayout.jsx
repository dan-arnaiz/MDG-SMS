import { Outlet, Navigate, NavLink } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import * as Icons from '@fortawesome/free-solid-svg-icons';
import axiosClient from "../axios-client.js";

export default function AdminLayout() {

    const {user, token, setToken, setUser} = useStateContext();

    if (!token) {
        return <Navigate to="/login" />
    }

    const onLogout = (ev) => {
        ev.preventDefault();


        axiosClient.post('/logout')
        .then(({data}) => {
            setToken(null)
            setUser(null);
        })
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("USER");
        window.location.href = "/login";
    }
    
    return(

        <div className="adminlayout-background">
            <header className="AdminLay-Header">
                <div className="header-logo">
                    <img src="images/Logo-Final-2.png" alt="Logo"/>
                </div>
                <div className="Head-Toolbox">
                    <NavLink to="">Need help?</NavLink>
                    <NavLink to="">Applications</NavLink>
                    <NavLink to="">{user && user.name}</NavLink> 
                    <div>
                        <a href="#" onClick={onLogout} className="btn-logout">Logout (for testing)</a>
                    </div>   
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