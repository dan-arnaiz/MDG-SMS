import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom"

export default function Students() {

    const[students,setStudents] = useState([]);
    const[loading,setLoading] = useState(false);

    // useEffect(() => {
    //     getStudents();
    // }, [])

    // const getStudents = () => {
    //     setLoading(true)
    //     axiosClient.get('/students')
    //         .then(({data}) => {
    //             setLoading(false)
    //             console.log(data);
    //         })

    //         .catch(() => {
    //             setLoading(false)
    //         })

    // }
    
    return(
        <div>
            <div className="students-main">
                <div className="students-title">
                    <h1>Students</h1>             
                </div>
                <div className="students-toolbar">
                    <div className="students-searchbox">
                        <div>
                            <FontAwesomeIcon icon={Icons.faMagnifyingGlass} size='lg'/>
                        </div>
                        <input type="text"  placeholder="Search Student"/>
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
                        <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Student ID</th>
                                    <th>Scholarship</th>
                                    <th>Email Address</th>
                                    <th>Program</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                        </thead>
                        <tbody>
                                {students.map(s => {
                                    return (
                                        <tr key={s.id}>
                                            <td>
                                                <img src={s.picture ? `/storage/${s.picture.replace(/\\/g, '/')}` : '/storage/pictures/default-profile-placeholder.png'} alt={`${s.last_name} ${s.first_name}`} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                                            </td>
                                            <td>{`${s.last_name}, ${s.first_name} ${s.suffix ? s.suffix + ' ' : ''}(${s.middle_name})`}</td>
                                            <td>{s.studentId}</td>
                                            <td>{s.scholarship}</td>
                                            <td>{s.emailaddress}</td>
                                            <td>{s.program}</td>
                                            <td>{s.status}</td>
                                            <td>
                                                <button onClick={() => openModal(s)}>Edit</button>
                                                <button onClick={() => deleteStudent(s.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    );
                                })}
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