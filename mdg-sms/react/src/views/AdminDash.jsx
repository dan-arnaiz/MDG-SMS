// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import * as Icons from '@fortawesome/free-solid-svg-icons'
// import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";

export default function AdminDash() {

    const [scholars, setScholars] = useState([]);
    const [laoding, setLoading] = useState(false);

    useEffect(() => {

        getScholars();

    }, [])

    const getScholars = () =>{

        axiosClient.get('/analytics')
        .then(({data}) => {
            setLoading(false);
            console.log(data);
            setScholars(data);
        })
        .catch((error) => {
            console.error('Error:', error.response ? error.response.data : error.message);
            setLoading(false); 
        });
    }

    return (
        <div>
            <div className="main">
                <div className="header-toolbar">
                    <h1 className="text-black font-bold font-sans text-lg">Dashboard</h1>   
                </div>
                <div className="dashboard-main grid-cols-3 gap-2">
                    <div className="chart-1 border hover:border-blue-100">
                        <h2 className="font-semibold  text-right mr-6">Chart 1</h2>
                        <p>Analytics</p>
                    </div>
                    <div className="cards-container">
                        <div className="active-card mb-2 border hover:border-blue-100 w-10 grid">
                                <h2 className="font-semibold  text-right mr-6">{scholars.activeScholars}</h2>
                                <p className="font-semibold  text-right mr-8">Active Scholars</p>
                        </div>
                        <div className="inactive-card mb-2 border hover:border-blue-100">
                            <h2 className="font-semibold  text-right mr-6">{scholars.inactiveScholars}</h2>
                            <p className="font-semibold  text-right mr-8">Inactive Scholars</p>
                        </div>
                        
                    </div>
                    <div className="cards-container pb-2">
                        <div className="card mb-2 border hover:border-blue-100">
                            <h2 className="font-semibold  text-right mr-6">{scholars.scholarships}</h2>
                            <p className="font-semibold  text-right mr-8">Scholarships</p>
                        </div>
                        <div className="card mb-2 border hover:border-blue-100">
                        <h2 className="font-semibold  text-right mr-6">{scholars.scholarsTotal}</h2>
                        <p className="font-semibold  text-right mr-8">Total Scholars</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}