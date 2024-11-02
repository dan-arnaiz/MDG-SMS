import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import axiosClient from "../axios-client.js"

export default function AdminScholarships() {

    const[scholarships,setScholarships] = useState([]);
    const[loading,setLoading] = useState(false);

    useEffect(() => {
        getScholarships();
    }, [])

    const getScholarships = () => {
        setLoading(true)
        axiosClient.get('/scholarships')
            .then(({data}) => {
                setLoading(false)
                setScholarships(data.data);
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
                    <h1>Scholarships</h1>             
                </div>
                <div className="students-toolbar">
                    <div className="students-searchbox">
                        <div>
                            <FontAwesomeIcon icon={Icons.faMagnifyingGlass} size='lg'/>
                        </div>
                        <input type="text"  placeholder="Search Scholarships"/>
                    </div>                    
                    <div className="students-toolbar-btns">
                        <button>Filter</button>
                        <Link className='addstudent-btn' to="">Add Scholarship</Link>
                    </div>                          
                </div>
                <div className='scholarship-list'>
                    <ul>
                        {scholarships.map(s =>(
                            <li key={s.id}>
                                <Link to="">
                                    <div className='scholarship-card'>
                                        <h1>{s.name}</h1>
                                        <hr></hr>
                                        <div className='scholarship-info'>
                                            <div>
                                                <h3 className='taken'>{s.taken_slots}</h3>
                                                <p>Taken</p>
                                            </div>
                                            <div>
                                                <h3 className='available'>{s.available_slots}</h3>
                                                <p>Available</p>
                                            </div>
                                            <div>
                                                <h3>{s.max_slots}</h3>
                                                <p>Maximum</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}