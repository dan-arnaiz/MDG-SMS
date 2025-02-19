
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Button } from '@/components/ui/button';
import Chart1 from "../components/dialogs/Chart1.jsx";
import {useNavigate} from "react-router-dom"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";



export default function Employees() {

    const [employees, setEmployees] = useState([]);
    const [laoding, setLoading] = useState(false);
    const defaultProfilePic = '/images/default-profile.png';
    const navigate = useNavigate();

    useEffect(() => {
        getEmployees();
    }, [])

    const getEmployees = () =>{

        axiosClient.get('/employees')
        .then(({data}) => {
            setLoading(false);
            console.log(data);
            setEmployees(data.data);
        })
        .catch((error) => {
            console.error('Error:', error.response ? error.response.data : error.message);
            setLoading(false); 
        });
    }

    return (
        <div>
            <div className="main">
                <div className="header-toolbar">
                    <h1 className="text-black font-bold font-sans text-lg">Employees</h1>   
                </div>
                <Card className='flex flex-row justify-end p-2'>
                    <Button variant='secondary' onClick={()=>navigate(`/add-employee`)}>Add Employee</Button>
                </Card>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {employees.map((employee, index) => (
                        <div key={index}>
                            <Card className='flex flex-row p-5'>
                            <img src={defaultProfilePic} alt='profile-pic' className="w-32 h-32 object-cover border border-black"/>
                            <div className="px-3">
                                <h1 className="font-bold">{employee.fullName}</h1>
                                <p>{employee.id}</p>
                                <p>{employee.job}</p>
                                <p>{employee.email}</p>
                            </div>
                            </Card>
                        </div>
                    ))}
                </div>  
            </div>
        </div>
    );
}