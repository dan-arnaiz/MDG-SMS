import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import {Link, useParams, useNavigate} from "react-router-dom"
import { useEffect, useState } from 'react'
import axiosClient from "../axios-client.js";
import { Separator } from '@/components/ui/separator'
import { useForm, Controller } from 'react-hook-form'; // Import useForm
import { zodResolver } from '@hookform/resolvers/zod'; // Import zodResolver
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export default function AdminStudentProfile() {

    const { id } = useParams();

    const[student,setStudent] = useState([]);
    const[files,setFiles] = useState([]);
    const[contactNums,setContactNums] = useState([]);
    const[addresses,setAddresses] = useState([]);
    const[loading,setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getStudent();
    }, [])

    const getStudent = () => {

        setLoading(true)
        axiosClient.get(`/students/${id}`)
            .then(({data}) => {
                setLoading(false)
                setStudent(data.profile); 
                setFiles(data.files);  
                setContactNums(data.contactNums);
                setAddresses(data.addresses);
                console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error.response ? error.response.data : error.message);
                setLoading(false); 
            });
    }

    const formSchema = z.object({
        firstName: z.string().nonempty("First name is required"),
        middleName: z.string().optional(),
        lastName: z.string().nonempty("Last name is required"),
        suffix: z.string().optional(),
        studentNumber: z.string().nonempty("Student number is required"),
        yearLevel: z.string().nonempty("Year level is required"),
        program: z.string().nonempty("Program is required"),
        dateOfBirth: z.string().nonempty("Date of birth is required"),
        age: z.number().min(0, "Age must be a positive number"),
        enrollmentStatus: z.string().nonempty("Enrollment status is required"),
        recentSchoolYear: z.string().nonempty("Most recent school year attended is required"),
        scholarshipStatus: z.string().nonempty("Scholarship status is required"),
        scholarship: z.string().optional(),
        profilePic: z.any().optional(),
    });

    const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema),
    });

    const enrollmentStatusMapping = {
        enrolled: { text: "Enrolled", img: "images/check.png" },
        not_enrolled: { text: "Not Enrolled", img: "images/xmark.png" },
    };
    
    const scholarshipStatusMapping = {
        active: { text: "Active", img: "images/check.png" },
        inactive: { text: "Inactive", img: "images/xmark.png" },
    };

    const profilePic = watch('profilePic');
    const defaultProfilePic = '/images/default-profile.png';
    
    return(
        <div>
            <div className="main ">
                <div className="header-toolbar">
                    <h1 className='text-black font-bold font-sans text-lg'>Students</h1>             
                </div>
                <div className="students-toolbar">
                    <Button onClick={() => window.history.back()}  type="button" id="Edit" className="bg-slate-100 border hover:border-blue-800 font-sans text-xs px-5" >Back</Button>                   
                    <div className="students-toolbar-btns">
                    <Button type="button" id="Edit" className="bg-slate-100 border hover:border-blue-800 font-sans text-xs" >Edit</Button>
                    <Button type="button" id="export" className="bg-slate-100 border hover:border-blue-800 font-sans text-xs">Export</Button>
                        <button className='bg-red-600 border hover:bg-red-500 hover:border-red-500 text-white text-sm font-semibold'>Delete</button>
                    </div>                          
                </div>
                
                <div className="grid grid-cols-3 gap-2 h-[100%]">
                    <Card className="hover:border-blue-900">
                        <CardHeader></CardHeader>
                        <CardContent className='flex flex-col gap-5 justify-center items-center text-center'>
                                {/* Preview Personal Info */}
                            <div className='flex flex-col justify-center items-center'>
                                <img 
                                    src={student.profilePic || defaultProfilePic} 
                                    alt='profile-pic' 
                                    className="w-32 h-32 object-cover border border-black"
                                />          
                                <p className='text-black text-lg font-semibold mt-5'>{student.full_name}</p>
                                <p className='text-black text-sm font-semibold'>{student.student_id}</p>                 
                            </div>
                            <Separator className='w-[80%]'/>
                            <div className='flex flex-col gap-10 text-center'>                       
                                <div>
                                    <p className='text-black text-lg font-semibold'>{student.year}</p>
                                    <p className='text-blue-800 text-xs font-semibold'>{student.program}</p>
                                    <p className='text-gray-500 text-xs'>Program</p>
                                </div>
                                <div className="justify-center">
                                    <p className='text-black text-sm font-semibold'>{student.dob}</p>
                                    <p className='text-gray-500 text-xs'>Date of Birth</p>
                                </div>
                                <div className='flex flex-col '>
                                    <p className='text-black text-sm font-semibold'>{student.age}</p>
                                    <p className='text-gray-500 text-xs'>Age</p>
                                </div>
                            </div>                                 
                        </CardContent>
                        <CardFooter></CardFooter>
                    </Card>
                    {/* Preview Enrollment Info */}
                    <div className='flex flex-col gap-3'>
                        <Card className="h-50% hover:border-blue-900">
                            <CardHeader>
                                <CardTitle>Scholarship Status</CardTitle>
                                <CardDescription></CardDescription>
                            </CardHeader>
                            <CardContent className='flex flex-col gap-5 justify-center items-center text-center'>  
                                <p className={student.status === "Active" ? "text-green-500 text-3xl font-bold"  : "text-gray-500 text-3xl font-bold"}>{student.status}</p>                         
                                <Separator className='w-[80%]'/>
                                <h1 className='text-black text-xs font-semibold'>{scholarshipStatusMapping[watch('scholarship')]}</h1>
                            </CardContent>
                        </Card> 
                        <Card className="h-[100%] hover:border-blue-900">
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                                <CardDescription></CardDescription>
                            </CardHeader>
                            <CardContent className='flex flex-col gap-5 justify-center items-center text-center'>                          
                                <div>
                                    <p className='text-black text-sm font-semibold'>{student.schoolEmail}</p>
                                    <p className='text-gray-500 text-xs pl-2'>School Email Address</p>
                                </div>
                                <div>
                                    <p className='text-black text-sm font-semibold'>{student.personalEmail}</p>
                                    <p className='text-gray-500 text-xs'>Personal Email Address</p>
                                </div>
                                <div>
                                    <ul>
                                        {contactNums.map((contactnum, index) => (
                                            <li key={index}>
                                                <p className='text-black text-sm font-semibold'>{contactnum.nums}</p>
                                                <p className='text-gray-500 text-xs'>{contactnum.title}</p>

                                            </li>
                                        ))}
                                    </ul> 
                                </div>
                                <div>
                                    <ul>
                                        {addresses.map((address, index) => (
                                            <li key={index}>
                                                <p className='text-black text-sm font-semibold'>{address.address}</p>
                                                <p className='text-gray-500 text-xs'>{address.type}</p>
                                            </li>
                                        ))}
                                    </ul> 
                                </div>
                                
                                <Separator className='w-[80%]'></Separator>
                                <div className="border rounded-lg hover:bg-blue-900 hover:text-white">
                                    <button className='text-xs mx-6 my-1 pb-1'>Contact</button>
                                </div>
                            </CardContent>
                        </Card>                
                    </div>
                    <div className='flex flex-col gap-3'>
                        <Card>
                            <CardHeader>
                                <CardTitle>Scholarship</CardTitle>
                            </CardHeader>
                            <CardContent className='flex flex-col gap-5 text-center'>
                                <div>
                                    <p className='text-black text-lg font-semibold'>{student.scholarship}</p>
                                </div>
                                <div className="border rounded-lg hover:bg-blue-900 hover:text-white">
                                    <button className='text-xs mx-6 my-1 pb-1'>View Scholarship</button>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className='h-[100%]'>
                            <CardHeader>
                                <CardTitle>Documents</CardTitle>
                            </CardHeader>
                            <CardContent className='px-10'>
                                <div>
                                    <ul className="list-disc pl-5">
                                        {files.map((file, index) => (
                                            <li 
                                            key={index}
                                            className={ file.isSubmitted ? "text-gray-500" : "text-green-500"}
                                            >
                                            {file.name}
                                            </li>
                                        ))}
                                    </ul> 
                                </div>  
                            </CardContent>
                        </Card>                        
                    </div>
                </div>
            </div>
        </div>
    )
}