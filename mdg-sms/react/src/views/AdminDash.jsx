// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import * as Icons from '@fortawesome/free-solid-svg-icons'
// import { Link } from "react-router-dom"

export default function AdminDash() {
    return (
        <div>
            <div className="students-main">
                <div className="students-title">
                    <h1>Dashboard</h1>   
                </div>
            <div className="admin-dash">
                <div className="cards-container">
                    <div className="card">
                        <h2>198</h2>
                        <p>Active Scholars</p>
                    </div>
                    <div className="card">
                        <h2>147</h2>
                        <p>Inactive Scholars</p>
                    </div>
                    <div className="card">
                        <h2>Chart 1</h2>
                        <p>Analytics</p>
                    </div>
                    <div className="card">
                        <h2>Chart 2</h2>
                        <p>Analytics</p>
                    </div>
                    <div className="card">
                        <h2>14</h2>
                        <p>Scholarships</p>
                    </div>
                    <div className="card">
                    <h2>475</h2>
                    <p>Scholarship to date</p>
                    </div>
                    <div className="card">
                        <h2>Chart 3</h2>
                        <p>Analytics</p>
                    </div>
                    <div className="card">
                        <h2>Chart 4</h2>
                        <p>Analytics</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}