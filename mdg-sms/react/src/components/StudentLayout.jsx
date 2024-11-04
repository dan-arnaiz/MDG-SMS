import { Outlet, Navigate, NavLink } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client.js";
import { Home, Users, FileChartPie, Mailbox, HandCoins } from 'lucide-react';
import { Button } from '@/components/ui/button';
export default function StudentLayout() {

    const {token} = useStateContext();
    if (token) {
        return <Navigate to="/" />
    }

    return (
        <div className="grid h-screen bg-slate-300">
            <div className="bg-white h-14 mt-5 mx-5 rounded-xl">
                <div className="flex ">
                   
                        <p className="flex-auto ml-5 mt-3">Profile</p>
                        <p >Settings</p>
                        
                   
                   

                </div>

            </div>

            <main>
                <Outlet/>
            </main>
        </div>      
    )
}