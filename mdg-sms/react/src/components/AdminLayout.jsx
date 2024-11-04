import { Outlet, Navigate, NavLink } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client.js";
import { Home, Users, FileChartPie, Mailbox, HandCoins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { CircleUserRound } from 'lucide-react';

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
                <NavLink to="" className="text-sm -translate-x-2 font-semibold text-black hover:text-blue-500">
                    Need help?
                </NavLink>
                
                <DropdownMenu className="bg-white border z-[1050]">
                    <DropdownMenuTrigger asChild>
                        <button className="bg-slate-200 text-sm justify-center place-items-center font-semibold text-black border hover:bg-slate-500 px-3 py-2 h-9 hover:text-white rounded-md">
                            <CircleUserRound className="inline-block mr-2  h-5 -mt-1" />
                            {user && user.name}
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white opacity-100">
                        <DropdownMenuItem className="hover:bg-slate-400" onSelect={() => console.log('Profile clicked')}>
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-slate-400" onSelect={onLogout}>
                            Sign out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
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
                        <NavLink to="/scholarships" className={({ isActive }) => isActive ? 'active' : ''}>
                            <div className="nav-item">
                                <HandCoins size={24} /> Scholarships
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