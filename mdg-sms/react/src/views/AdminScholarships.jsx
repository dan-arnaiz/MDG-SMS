import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import axiosClient from "../axios-client.js"
import { Button } from '@/components/ui/button';

export default function AdminScholarships() {

    const[scholarships,setScholarships] = useState([]);
    const[loading,setLoading] = useState(true);

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

    const navigate = useNavigate();

    const handleCardDoubleClick = ({id,name}) => {
        navigate(`/scholarships/${id}-${name}`);
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator
    }
    

    return(
        <div>
            <div className="main">
                <div className="header-toolbar">
                    <h1 className='text-black font-bold font-sans text-lg'>Scholarships</h1>             
                </div>
                <div className="flex flex-row justify-end bg-white p-[10px] shadow-md rounded-[10px]">                   
                    <div className="students-toolbar-btns">
                        <Link to="/add-scholarship">
                            <Button variant='secondary'>Add Scholarship</Button>
                        </Link>
                    </div>                          
                </div>
                <div className='scholarship-list'>
                    <ul>
                        {scholarships.map(s =>(
                            <li key={s.id} onClick={() => handleCardDoubleClick({ id: s.id, name: s.name })}>
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
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}