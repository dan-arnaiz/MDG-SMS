import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import {Link, useParams, useNavigate} from "react-router-dom"
import { useEffect, useState } from 'react'
import axiosClient from "../axios-client.js";
import { Button } from "@/components/ui/button"
import { Separator } from '@/components/ui/separator'
import { useForm, Controller } from 'react-hook-form'; // Import useForm
import { zodResolver } from '@hookform/resolvers/zod'; // Import zodResolver
import { z } from 'zod';

export default function AdminStudentProfile() {

    const { id } = useParams();

    const[student,setStudent] = useState([]);
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
                setStudent(data.data);
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
            <div className="main">
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
                
                <div className="grid grid-cols-3 gap-2">
                    <div className="card-add-student-preview grid-cols-1 place-items-center justify-center justify-items-center border hover:border-blue-900">
                        {/* Preview Personal Info */}
                        <div>
                            <h1 className='text-black text-lg font-bold pb-4'>Profile</h1>
                        </div>
                        <div>
                            <img 
                                src={student.profilePic || defaultProfilePic} 
                                alt='profile-pic' 
                                className="w-32 h-32 object-cover border border-black justify-center"
                            />
                        </div>
                        <div className='pt-2'>
                            <p className='text-black text-lg font-semibold'>
                                {student.full_name}
                            </p>
                        </div>
                        <div className='-m-7'>
                            <p className='text-black text-sm font-semibold'>{student.student_id}</p>
                        </div>
                        <Separator className="-mt-6" />
                        <div>
                            <p className='text-black text-lg font-semibold -mt-6'>{student.program_year} Year</p>
                        </div>
                        <div>
                            <p className='text-blue-800 text-xs font-semibold -mt-5'>{student.program}</p>
                        </div>
                        <div>
                            <p className='text-gray-500 text-xs -mt-10'>Program</p>
                        </div>
                        <div className="justify-center">
                            <p className='text-black text-sm font-semibold -mt-6'>{student.dob}</p>
                        </div>
                        <div>
                            <p className='text-gray-500 text-xs -mt-10'>Date of Birth</p>
                        </div>
                        <div>
                            <p className='text-black text-sm font-semibold -mt-6'>{student.age}</p>
                        </div>
                        <div>
                            <p className='text-gray-500 text-xs mt-2 -mt-11'>Age</p>
                        </div>
                    </div>
                    {/* Preview Enrollment Info */}
                    <div className='grid gap-3'>
                        <div id="col2row1" className="card-add-student-preview grid-rows-3 place-items-center justify-center justify-items-center border hover:border-blue-900">
                            <div>
                                <h1 className='text-black text-lg font-bold pb-2'>Enrollment Status</h1>
                            </div>
                            <div className='flex items-center'>
                                <p className='text-blue-950 text-2xl font-bold'>{student.enrollmentStatus}</p>
                                {student.enrollmentStatus && (
                                    <img src={enrollmentStatusMapping[student.enrollmentStatus]?.img} alt={enrollmentStatusMapping[student.enrollmentStatus]?.text} className="ml-2 w-9 h-9" />
                                )}
                            </div>
                            <Separator className="-mt-6 w-3/4" />
                            <div className='-mt-8'>
                                <p className='text-black text-xs font-semibold'>{student.recentSchoolYear}</p>
                            </div>
                        </div>
                        <div id="col2row2" className="card-add-student-preview grid-rows-3 gap-2 place-items-center justify-center justify-items-center border hover:border-blue-900">
                            <div>
                                <h1 className='text-black text-lg font-bold pb-2'>Scholarship Status</h1>
                            </div>
                            <div className='flex items-center'>
                                <p className='text-blue-950 text-2xl font-bold'>{scholarshipStatusMapping[watch('scholarshipStatus')]?.text}</p>
                                {watch('scholarshipStatus') && (
                                    <img src={scholarshipStatusMapping[watch('scholarshipStatus')]?.img} alt={scholarshipStatusMapping[watch('scholarshipStatus')]?.text} className="ml-2 w-9 h-9" />
                                )}
                            </div>
                            <Separator className="-mt-6 w-3/4" />
                            <div className='-mt-8'>
                                <h1 className='text-black text-xs font-semibold'>{scholarshipStatusMapping[watch('scholarship')]}</h1>
                            </div>
                        </div>
                        <div id="col2row3" className="card-add-student-preview grid-rows-3 gap-2 place-items-center justify-center justify-items-center border hover:border-blue-900">
                        <div>
                            <h1 className='text-black text-lg font-bold pb-2'>Contact Information</h1>
                        </div>
                        <div>
                            <p className='text-black text-sm font-semibold'>{student.schoolEmail}</p>
                            <p className='text-gray-500 text-xs mt-2 pl-2'>School Email Address</p>
                        </div>
                        <div>
                            <p className='text-black text-sm font-semibold'>{student.personalEmail}</p>
                            <p className='text-gray-500 text-xs mt-2'>Personal Email Address</p>
                        </div>
                        <div>
                            <p className='text-black text-sm font-semibold'>{student.mobileNum}</p>
                            <p className='text-gray-500 text-xs mt-2'>Phone Number</p>
                        </div>
                        <Separator className="my-2 w-3/4" />
                        <div>
                            <p className='text-black text-sm font-semibold'>{student.address}</p>
                            <p className='text-gray-500 text-xs mt-2'>Address</p>
                        </div>
                        <div className="border rounded-lg hover:bg-blue-900 hover:text-white">
                            <button className='text-xs mx-6 my-1 pb-1'>Contact</button>
                        </div>
                    </div>
                    </div>
                    <div className='grid gap-3'>
                    <div id="col3row1" className="card-add-student-preview grid-rows-3 gap-2 place-items-center justify-center justify-items-center border hover:border-blue-900">
                        <div>
                            <h1 className='text-black text-lg font-bold pb-2'>Scholarship</h1>
                        </div>
                        <div>
                            <p className='text-black text-sm font-semibold'>{student.scholarship?.name}</p>
                        </div>
                        <Separator className="my-2 w-3/4" />
                        <div>
                            <p className='text-gray-500 text-xs mt-2'>Benefits</p>
                            <p className='text-black text-sm font-semibold'>{student.scholarship?.benefits}</p>
                        </div>
                        <div>
                            <p className='text-gray-500 text-xs mt-2'>Retention Policy</p>
                            <p className='text-black text-sm font-semibold'>{student.scholarship?.retentionpolicy}</p>
                        </div>
                        <div className="border rounded-lg hover:bg-blue-900 hover:text-white">
                            <button className='text-xs mx-6 my-1 pb-1'>View Scholarship</button>
                        </div>
                    </div>
                    <div id="col3row2" className="card-add-student-preview grid-rows-3 gap-2 place-items-center justify-center justify-items-center border hover:border-blue-900">
                    <div>
                        <h1 className='text-black text-lg font-bold pb-2'>Documents</h1>
                    </div>
                    {student.documents && student.documents.slice(0, 3).map((doc, index) => (
                        <div key={index} className="text-center">
                            <p className='text-black text-sm font-semibold'>{doc.name}</p>
                            <p className='text-gray-500 text-xs'>{doc.type}, {doc.size}</p>
                        </div>
                    ))}
                    {student.documents && student.documents.length > 3 && (
                        <div className="text-center">
                            <FontAwesomeIcon icon={Icons.faEllipsisH} className="text-gray-500" />
                        </div>
                    )}
                    <div className="border rounded-lg hover:bg-blue-900 hover:text-white">
                            <button className='text-xs mx-6 my-1 pb-1 mt-2'>All Documents</button>
                    </div>
                </div> 
                    </div>
                </div>
            </div>
        </div>
    )
}