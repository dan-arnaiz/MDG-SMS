import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import {Link, useParams} from "react-router-dom"
import { useEffect, useState } from 'react'
import axiosClient from "../axios-client.js";

export default function AdminStudentProfile() {

    const { id } = useParams();

    const[student,setStudent] = useState([]);
    const[loading,setLoading] = useState(false);

    useEffect(() => {
        getStudent();
    }, [])

    const getStudent = () => {
        setLoading(true)
        axiosClient.get(`/students/${id}`)
            .then(({data}) => {
                setLoading(false)
                setStudent(data.data);
                console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error.response ? error.response.data : error.message);
                setLoading(false); 
            });
    }
    
    return(
        <div>
            <div className="students-main">
                <div className="students-title">
                    <h1>Students</h1>             
                </div>
                <div className="students-toolbar">
                    <div>
                        <Link className='back-btn' to="/students">Back</Link>
                    </div>                    
                    <div className="students-toolbar-btns">
                        <button>Edit</button>
                        <button>Export</button>
                        <button className='delete-student'>Delete</button>
                    </div>                          
                </div>
                <div className='admin-student-info-main'>
                    <div className="student-personal-profile">
                        <h1 className='profile-title'>Profile</h1>
                        <div className="profile-1">
                            <img className='Profile-Pic'></img>
                            <h1>{student.full_name}</h1>     {/* bind student full name */}
                            <p>{student.student_id}</p>     {/* bind studentid*/}
                        </div>
                        <hr></hr>
                        <div className="profile-2">
                            <div>
                                <h2>{student.program_year} Year</h2> {/* bind program year */}
                                <h3>{student.program}</h3>    {/* bind program name */}
                                <p>Program</p>
                            </div>
                            <div className="student-dob">
                                <h2>{student.dob}</h2> {/* bind student dob */}
                                <p>Date of Birth</p>
                            </div>   
                            <div>
                                <h2>{student.age}</h2>  {/* bind student age */}
                                <p>Age</p>
                            </div>                       
                        </div>                       
                    </div>
                    <div className='student-more'>
                        <div className='student-more1'>
                            <div className="student-password-info">
                                <h1>Password</h1>
                                <button>Reset Password</button>
                            </div>
                            <div className="student-contact-info">
                                <h1>Contact Information</h1>
                                <div className="student-email">
                                    <h4>{student.schoolEmail}</h4>{/* bind student email */}
                                    <p>School Email Address</p>
                                </div>   
                                <div className="personal-email">
                                    <h4>{student.personalEmail}</h4> {/* bind student personal email */}
                                    <p>Personal Email Address</p>
                                </div>
                                <div className="Phone-Number">
                                    <h4>{student.mobileNum}</h4> {/* bind student phone num */}
                                    <p>Mobile Phone</p>
                                </div>
                                <hr></hr>
                                <div className="student-address">
                                    <h4>Address</h4> {/* bind student address */}
                                    <p>Address</p>
                                </div>
                            </div>      
                        </div>  
                        <div className='student-more1'>
                            <div className="student-scholarship-info">
                                <h1>Scholarship Status</h1>
                                <h2>{student.status}</h2> {/* bind student scholarship status */}
                                <hr></hr>
                                <p>scholarship</p> {/* bind student scholarship name */}
                            </div>
                            <div className="student-docs">
                                <h1>Documents</h1>
                            </div>
                        </div>         
                    </div>
                </div>
            </div>
        </div>
    )
}