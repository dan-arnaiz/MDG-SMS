import { Outlet, Navigate, NavLink } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client.js";
import { Home, Users, FileChartPie, Mailbox, HandCoins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {useEffect} from 'react';



export default function StudentLayout() {

    const {user,token} = useStateContext();

    console.log("🔹 StudentLayout Rendered");
    console.log("🔹 Token:", token);
    console.log("🔹 User:", user);
    
    if (!token) {
        return <Navigate to="/login" />
    }

    const onLogout = async (ev) => {
        ev.preventDefault();

        try {
            await axiosClient.post('/logout'); // Ensure logout request completes
    
            setToken(null);
            setUser(null);
            localStorage.removeItem("ACCESS_TOKEN");
            localStorage.removeItem("USER");
    
            window.location.href = "/login"; // Redirect to login
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    return (
        <div>
            <h1>Welcome, {user.name}!</h1>
            <main>
                <p>This section is still under construction :)</p>
                <p>Log out mate!</p>
                <Button onClick={onLogout}>Logout</Button>

                <Outlet></Outlet>
            </main>
        </div>      
    )
}