import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom"

export default function AdminStudentProfile() {
    
    return(
        <div>
            <div className="students-main">
                <div className="students-title">
                    <h1>Students</h1>             
                </div>
                <div className="students-toolbar">
                    <div>
                        <Link className='back-btn' to="/student-list">Back</Link>
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
                            <h1>John Doe</h1>     {/* bind student full name */}
                            <p>0000000000</p>     {/* bind studentid*/}
                        </div>
                        <hr></hr>
                        <div className="profile-2">
                            <div>
                                <h2>First Year</h2> {/* bind program year */}
                                <h3>Program</h3>    {/* bind program name */}
                                <p>Program</p>
                            </div>
                            <div className="student-dob">
                                <h2>month 0,0000</h2> {/* bind student dob */}
                                <p>Date of Birth</p>
                            </div>   
                            <div>
                                <h2>0</h2>  {/* bind student age */}
                                <p>Age</p>
                            </div>                       
                        </div>                       
                    </div>
                    <div className='student-more'>
                        <div className='student-more1'>
                            <div className="student-password-info">
                                <h1>Password</h1>
                                <div>
                                    <p>Password: </p>
                                    <p>password</p>
                                </div>
                            </div>
                            <div className="student-contact-info">
                                <h1>Contact Information</h1>
                                <div className="student-email">
                                    <h4>Email</h4>{/* bind student email */}
                                    <p>School Email Address</p>
                                </div>   
                                <div className="personal-email">
                                    <h4>Email</h4> {/* bind student personal email */}
                                    <p>Personal Email Address</p>
                                </div>
                                <div className="Phone-Number">
                                    <h4>PhoneNum</h4> {/* bind student phone num */}
                                    <p>Personal Email Address</p>
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
                                <h2>status</h2> {/* bind student scholarship status */}
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