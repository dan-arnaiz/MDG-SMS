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
import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

export default function AdminStudentProfile() {

    const { id } = useParams();

    const [student,setStudent] = useState([]);
    const [files,setFiles] = useState([]);
    const [defFiles, setDefFiles] = useState([]);
    const [contactNums,setContactNums] = useState([]);
    const [addresses,setAddresses] = useState([]);
    const [loading,setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getStudent();
    }, [])

    const resetPassword = () => {
        try{
            axiosClient.put(`/students/${id}`, 'reset');
            alert(`Student ${id}'s password reset to default!`);
            setOpen(false);
        }catch (err) {
            console.error("Update failed:", err.response?.data || err.message);
        } 
    }

    const handleEditingChange = () =>{
        setIsEditing(!isEditing);
    }

    const handleEditFile = (file) =>{

        const updatedFiles = files.map(f =>
            f.id === file.id ? { ...f, is_submitted: f.is_submitted === 1 ? 0 : 1 } : f
        );
        setFiles(updatedFiles);
        console.log(files);

    }

    const handleCancelEdits = () =>{

        setFiles(defFiles);
        handleEditingChange();

    }

    const saveFiles = () =>{

        if (JSON.stringify(files) === JSON.stringify(defFiles)) {
            handleEditingChange();
            alert("Files updated successfully", response.data);
            return;
        }

        console.log(files)

        axiosClient.put(`/students/${id}`, { files })
            .then(response => {
                alert("Files updated successfully", response.data);
                handleEditingChange();
            })
            .catch(err => {
                console.error("Update failed:", err.response?.data || err.message);
            });

    }

    const getStudent = () => {

        setLoading(true)
        axiosClient.get(`/students/${id}`)
            .then(({data}) => {
                setLoading(false)
                setStudent(data.profile); 
                setFiles(data.files); 
                setDefFiles(data.files); 
                setContactNums(data.contactNums);
                setAddresses(data.addresses);
                console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error.response ? error.response.data : error.message);
                setLoading(false); 
            });
    }

    const defaultProfilePic = '/images/default-profile.png';
    
    return(
        <div>
            <div className="main ">
                <div className="header-toolbar">
                    <h1 className='text-black font-bold font-sans text-lg'>Students</h1>             
                </div>
                <div className="students-toolbar">
                    <Button onClick={() => navigate("/students")}>Back</Button>                   
                    <div className="students-toolbar-btns">
                        <Button>Export</Button>
                        <Button variant='destructive'>Delete</Button>
                    </div>                          
                </div>
                
                <div className="grid grid-cols-3 gap-2 h-[100%]">
                    <Card className="hover:border-blue-900">
                        <CardHeader className='flex flex-row items-center'> 
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className="ml-auto">
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                        onClick={() => navigate(`/edit-student-profile/${student.student_id}`)}
                                    >
                                        Edit
                                    </DropdownMenuItem>               
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardHeader>
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
                            <CardHeader className='flex flex-row items-center'>
                                <CardTitle>Scholarship</CardTitle>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild className="ml-auto">
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => navigate(`/edit-student-scholarship/${student.student_id}`)} >Edit</DropdownMenuItem>                              
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </CardHeader>
                            <CardContent className='flex flex-col gap-2 justify-center items-center text-center'>
                                <div>
                                    <p className='text-black font-semibold text-2xl'>{student.scholarship}</p>
                                </div> 
                                <p className={student.status === "Active" ? "text-green-500 font-bold"  : "text-red-500 font-bold"}>{student.status}</p>   
                                <Separator className='w-[80%]'/>                                                     
                            </CardContent>
                            <CardFooter className='flex flex-col'>
                                <Button onClick={() => navigate(`/scholarships/${student.scholarshipId}`)} className='text-xs mx-6 my-1 pb-1 w-[80%]'>View Scholarship</Button>
                            </CardFooter>
                        </Card> 
                        <Card className="h-[100%] hover:border-blue-900">
                            <CardHeader className='flex flex-row items-center'>
                                <CardTitle>Contact Information</CardTitle>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild className="ml-auto">
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                            onClick={() => navigate(`/edit-student-contact/${student.student_id}`)}
                                        >
                                            Edit
                                        </DropdownMenuItem>               
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </CardHeader>
                            <CardContent className='flex flex-col gap-5 mt-2 justify-center items-center text-center'>                          
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
                                    <ul className='flex flex-col gap-5'>
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
                                <CardTitle>User Credentials</CardTitle>                  
                            </CardHeader>
                            <CardContent className='flex justify-center'> 
                                <Dialog open={open} onOpenChange={setOpen}>
                                    <DialogTrigger asChild>
                                        <Button className='w-[80%]'>Reset Password</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogTitle>Student Password Reset</DialogTitle>
                                        <DialogDescription>
                                            <p>Are you sure in reseting the password of student {id}? His/her valid login credentials will return to default.</p>     
                                            <p className='mt-2 text-blue-900'>Default Username: {student.schoolEmail}</p>                                   
                                            <p className='text-blue-900'>Default Password: {id}</p>
                                        </DialogDescription>  
                                        <DialogFooter>
                                            <Button variant='destructive' className='w-[%50]' onClick={resetPassword}>Confirm</Button>
                                        </DialogFooter>                                     
                                    </DialogContent>
                                </Dialog>
                            </CardContent>
                        </Card>
                        <Card className='flex flex-col h-[100%]'>
                            <CardHeader className='flex flex-row items-center'>
                                <CardTitle>Documents</CardTitle>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild className="ml-auto">
                                        <Button variant="ghost" className="h-8 w-8 p-0" disabled={isEditing}>
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={handleEditingChange}>Edit</DropdownMenuItem>               
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </CardHeader>
                            <CardContent className='px-[15%] h-[100%]'>
                                <div>
                                    <ul>
                                        {files.map((file, index) => (
                                            <li key={index} className={ file.is_submitted === "1" ? "items-center text-gray-500" : "items-center text-green-500"}>
                                                <Checkbox onClick={() => handleEditFile(file)} disabled={!isEditing} checked={file.is_submitted === 1} className={file.is_submitted === "1" ? "bg-transparent h-5 w-5 border-2 border-gray-500" : "bg-transparent h-5 w-5 border-2 border-green-500"}></Checkbox>
                                                <Label className='px-3 text-base font-bold'>{file.name}</Label>
                                            </li>
                                        ))}
                                    </ul> 
                                </div>  
                            </CardContent>
                            <CardFooter className='h-auto'>
                                {isEditing && (
                                    <div className='flex flex-row gap-5 justify-center item-center w-[100%]'>
                                    <Button onClick={handleCancelEdits} variant='destructive' className='w-[40%]'>Cancel</Button>
                                    <Button onClick={saveFiles} className='w-[40%]'>Save Changes</Button>
                                    </div>
                                )}                             
                            </CardFooter>
                        </Card>                        
                    </div>
                </div>
            </div>
        </div>
    )
}