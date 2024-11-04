import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import {Link, useNavigate} from "react-router-dom"
// import { Link } from "react-router-dom"



export default function AdminDash() {

    const navigate = useNavigate();

    
    return (
        <div>
            <div className="main">
                <div className="header-toolbar">
                    <h1 className='text-black font-bold font-sans text-lg'>Reports</h1>
                      
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
                        <button className='addstudent-btn' onClick={() => navigate('/add-student')}>Add Student</button>
                    </div>                              
                </div>
                
            <div className="admin-dash">
                <div className="cards-container">
                    <div className="card">
                        <h1>Students</h1>
                        <p>569</p>
                    </div>
                    
                </div>
            </div>
        </div>
        </div>
    );
}