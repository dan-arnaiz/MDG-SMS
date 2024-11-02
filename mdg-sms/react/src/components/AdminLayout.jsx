import { Outlet, Navigate, NavLink } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client.js";
import { Home, Users, Award, BarChart2 } from 'lucide-react';

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
                        <a href="#" onClick={onLogout} className="btn-logout">Sign out</a>
                    </div>   
                </div>
            </header>
            <aside className="navbar">
                    <ul>
                        <p className="sidebar-subtitle">Manage</p>
                        <li>
                        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
                            <div className="nav-item">
                                <Home size={24} /> Dashboard
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/students" className={({ isActive }) => isActive ? 'active' : ''}>
                            <div className="nav-item">
                                <Users size={24} /> Students
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/scholarship-list" className={({ isActive }) => isActive ? 'active' : ''}>
                            <div className="nav-item">
                                <Award size={24} /> Scholarships
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/reports" className={({ isActive }) => isActive ? 'active' : ''}>
                            <div className="nav-item">
                                <BarChart2 size={24} /> Reports
                            </div>
                        </NavLink>
                    </li>
                    </ul>
                    <footer className="sidebar-footer">
                        <wrapper className="footer-wrapper">
                            <p className="dev">© 2024 MDG</p>
                            <div>
                            <button className="signout-button" onClick={onLogout}>Sign out</button>
                            </div>
                        </wrapper>
                    </footer>
            </aside>
            <main>
                <Outlet/>
            </main>
        </div>      
    )
}