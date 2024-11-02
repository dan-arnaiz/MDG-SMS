import { Outlet, Navigate, NavLink } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client.js";
import { Home, Users, FileChartPie, Mailbox, HandCoins } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
                        <NavLink to="/applications" className={({ isActive }) => isActive ? 'active' : ''}>
                            <div className="nav-item">
                                <Mailbox size={24} /> Applications
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/scholarships" className={({ isActive }) => isActive ? 'active' : ''}>
                            <div className="nav-item">
                                <HandCoins size={24} /> Scholarships
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/reports" className={({ isActive }) => isActive ? 'active' : ''}>
                            <div className="nav-item">
                                <FileChartPie size={24} /> Reports
                            </div>
                        </NavLink>
                    </li>
                    </ul>
                    <footer className="sidebar-footer">
                        <div className="footer-wrapper">
                            <p className="dev">© 2024 MDG</p>
                            <div>
                            <Button variant="destructive" className="signout-button" onClick={onLogout}>Sign out</Button>
                            </div>
                        </div>
                    </footer>
            </aside>
            <main>
                <Outlet/>
            </main>
        </div>      
    )
}