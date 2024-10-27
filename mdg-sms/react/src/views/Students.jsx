import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import {Link} from "react-router-dom"

export default function Students() {

    const[students,setStudents] = useState([]);
    const[loading,setLoading] = useState(false);

    useEffect(() => {

    }, [])

    const getStudents = () => {
        setLoading(true)
        axiosClient.get('/students')
            .then(({data}) => {
                setLoading(false)
                console.log(data);
            })

            .catch(() => {
                setLoading(false)
            })

    }
    
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
                        <Link className='addstudent-btn' to="">Add Student</Link>
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
                                <th>Program</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(s => (
                                <tr>
                                    <td></td>
                                    <td>{s.studentName}</td>
                                    <td>{s.studentid}</td>
                                    <td>{s.scholarship}</td>
                                    <td>{s.program}</td>
                                    <td>{s.status}</td>
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