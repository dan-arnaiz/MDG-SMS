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
            <div className="students-main">
                <div className="students-title">
                    <h1>Dashboard</h1>   
                </div>
            <div className="admin-dash">
                <div className="cards-container">
                    <div className="active-card">
                        <h2>{scholars.activeScholars}</h2>
                        <p>Active Scholars</p>
                    </div>
                    <div className="inactive-card">
                        <h2>{scholars.inactiveScholars}</h2>
                        <p>Inactive Scholars</p>
                    </div>
                    <div className="card">
                        <h2>{scholars.scholarships}</h2>
                        <p>Scholarships</p>
                    </div>
                    <div className="card">
                    <h2>{scholars.scholarsTotal}</h2>
                    <p>Scholarship to date</p>
                    </div>
                </div>
                <div className="chart-1">
                    <h2>Chart 1</h2>
                    <p>Analytics</p>
                </div>
            </div>
        </div>
        </div>
    );
}