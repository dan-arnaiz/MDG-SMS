import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import axiosClient from "../axios-client.js";
import {Link, useNavigate} from "react-router-dom"

export default function Students() {

    const[students,setStudents] = useState([]);
    const[loading,setLoading] = useState(false);

    useEffect(() => {
        getStudents();
    }, [])

    const getStudents = () => {
        setLoading(true)
        axiosClient.get('/students')
            .then(({data}) => {
                setLoading(false)
                setStudents(data.data);
                console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error.response ? error.response.data : error.message);
                setLoading(false); 
            });
    }

    const navigate = useNavigate();

    const handleRowDoubleClick = (studentId) => {
        navigate(`/students/${studentId}`);
    };
    
    return(
        <div>
            <div className="main">
                <div className="students-title">
                    <h1>Students</h1>             
                </div>
                <div className="students-toolbar">
                    <div className="students-searchbox">
                        <div>
                            <FontAwesomeIcon icon={Icons.faMagnifyingGlass} size='lg'/>
                        </div>
                        <input type="text"  placeholder="Search Students"/>
                    </div>                    
                    <div className="students-toolbar-btns">
                        <button>Filter</button>
                        <button>Import</button>
                        <button>Export</button>
                        <Link className='addstudent-btn' to="/add-student">Add Student</Link>
                    </div>                          
                </div>
                <div className="students-list">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Student ID</th>
                                <th>Scholarship</th>
                                <th>Email Address</th>
                                <th>Program</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(s => (
                                <tr key={s.student_id} onDoubleClick={() => handleRowDoubleClick(s.student_id)}>
                                <td> 
                                    <img src={s.picture ? `/storage/${s.picture.replace(/\\/g, '/')}` : '/storage/pictures/default-profile-placeholder.png'}></img>
                                </td>
                                <td>{s.full_name}</td>
                                <td>{s.student_id}</td>
                                <td>{s.scholarship}</td>
                                <td>{s.email}</td>
                                <td>{s.program}</td>
                                <td id='status'>
                                    <span style={{display: 'inline-block',width: '10px',height: '10px',borderRadius: '50%', marginLeft: '8px', backgroundColor: s.status === 'Active' ? 'green' : 'red', margin: '0 10px' }}></span>
                                    {s.status}</td>
                                </tr>
                            ))}                                                     
                        </tbody>
                    </table>
                </div>
                <div className="students-search-tools">
                    <div className="students-list-numdisplay">
                        <p>Display</p>
                        <select>
                            <option>10</option>
                            <option>15</option>
                            <option>20</option>
                        </select>
                        <p>Entries</p>
                    </div>
                    <p>Showing n of n of n entries</p>
                    <div className='search-tools-btns'>
                        <button><FontAwesomeIcon icon={Icons.faArrowLeft} size='lg'/></button>
                        {/* PAGINATION HERE */}
                        <button>1</button>
                        <button>2</button>
                        <button>3</button>
                        <button><FontAwesomeIcon icon={Icons.faArrowRight} size='lg'/></button>
                    </div>
                </div>
            </div>
        </div>
    )
}