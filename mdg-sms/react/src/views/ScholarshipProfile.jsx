import { Link, useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axiosClient from "../axios-client.js";
import { DataTable } from "./Tables/Students-Data-Table.jsx";
import { ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import { MoreHorizontal } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
 
export default function ScholarshipProfile() {

    const[scholarship,setScholarship] = useState([]);
    const[loading,setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("description");

    const { id } = useParams();
    const scholarshipId = id.split('-')[0];

    useEffect(() => {
        getScholarship();
    }, [scholarshipId])


    const getScholarship = () => {
        setLoading(true)
        axiosClient.get(`/scholarships/${scholarshipId}`)
            .then(({data}) => {
                setLoading(false)
                setScholarship(data.data);
                console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error.response ? error.response.data : error.message);
                setLoading(false); 
            });
    }

    const profile = scholarship.profile || {};
    const benefits = scholarship.benefits || [];
    const types = scholarship.types || [];
    const retentions = scholarship.retentions || [];
    const qualifications = scholarship.qualifications || [];
    const files = scholarship.files || [];
    const students = scholarship.students || [];

    const navigate = useNavigate();

    const columns = [
        {
        id: "select",
        header: ({ table }) => (
        <Checkbox
            checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
        />),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
        },
        {
            accessorKey: 'full_name',
            header: ({ column }) => {
                return (
                  <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                  >
                    Full Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                )
              },
        },
        {
            accessorKey: 'student_id',
            header: ({ column }) => {
                return (
                  <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                  >
                    Student ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                )
              },

        },
        {
            accessorKey: 'program',
            header: ({ column }) => {
                return (
                  <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                  >
                    Program
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                )
              },

        },
        {
            accessorKey: 'date_filed',
            header: ({ column }) => {
                return (
                  <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                  >
                    Date of Inquiry
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                )
              },
        },
        {
            accessorKey: 'prevSchoolName',
            header: ({ column }) => {
                return (
                  <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                  >
                    Previous School
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                )
              },
        },
        {
            accessorKey: 'status',
            header: ({ column }) => {
                return (
                  <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                  >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                )
              },
            cell: ({ row }) => {
                const status = row.getValue('status');
                return (
                    <div className="">
                        <span className={status === 'Active' ? 'text-green-600' : 'text-red-600'}>{status}</span>
                    </div>
                );
            },
            
        },
        {
            id: "actions",
            cell: ({ row }) => {
              const student = row.original
         
              return (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => navigate(`/students/${student.student_id}`)}
                    >
                      View Student
                    </DropdownMenuItem>               
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            },
          },
    ];

    const onDelete = () => {
        axiosClient.delete(`/scholarships/${scholarshipId}`)
        .then(() => {
            getScholarship();
            navigate('/scholarships')
        })
    }

    return(
        <div>
            <div className="main">
                <div className="header-toolbar">
                    <h1 className='text-black font-bold font-sans text-lg'>Scholarships</h1>             
                </div>
                <div className="students-toolbar"> 
                    <Button className="hover:bg-slate-500 border hover:black hover:text-white" onClick={() => window.history.back()}>Back</Button>                 
                    <div className="students-toolbar-btns">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className='bg-[rgb(236,58,58)] text-white hover:bg-white hover:text-black'>Delete</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription className='pt-5 pb-5'>
                                    This action cannot be undone. This will permanently delete the scholarship option. Students enrolled in this scholarship will become inactive.
                                </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <div className="flex flex-row justify-between w-full pr-10 pl-10">
                                        <DialogClose>
                                            <Button className="hover:bg-slate-500 border hover:black hover:text-white">Cancel</Button>
                                        </DialogClose>                                     
                                        <Button onClick={ev => onDelete()} className='bg-[rgb(236,58,58)] text-white hover:bg-white hover:text-black'>Confirm</Button>
                                    </div>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>                      
                    </div>                          
                </div>
                <Card className='bg-white'>
                    <div className="flex flex-col items-center w-full">
                        <CardHeader className="flex flex-col gap-3 text-center w-[50%]">
                            <CardTitle className="text-3xl">{profile.name}</CardTitle>
                            <hr></hr>
                            <div className='scholarship-info'>
                                <div>
                                    <h3 className='taken'>{profile.taken_slots}</h3>
                                    <p>Taken</p>
                                </div>
                                <div>
                                    <h3 className='available'>{profile.available_slots}</h3>
                                    <p>Available</p>
                                </div>
                                <div>
                                    <h3>{profile.max_slots}</h3>
                                    <p>Maximum</p>
                                </div>
                            </div>
                        </CardHeader>
                    </div>
                    <CardContent>   
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="flex w-full">
                                <TabsTrigger  value="description" className='w-full py-2 text-center' 
                                 style={{
                                    backgroundColor: activeTab === 'description' ? '#0F2554' : 'transparent',
                                    color: activeTab === 'description' ? 'white' : 'black',
                                }}>Description</TabsTrigger>
                                <TabsTrigger value="students" className='w-full py-2 text-center' 
                                 style={{
                                    backgroundColor: activeTab === 'students' ? '#0F2554' : 'transparent',
                                    color: activeTab === 'students' ? 'white' : 'black',
                                }}>Students</TabsTrigger>
                            </TabsList>
                            <TabsContent value="description">
                                <Card className='bg-[#E8E8E8]'>
                                    <CardHeader></CardHeader>
                                    <CardContent className="flex flex-col gap-4"> 
                                        {types.length > 0 && (
                                            <Card>
                                            <CardHeader>
                                                <CardTitle>TYPES</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <ul className="list-disc list-inside">
                                                    {types.map(t =>(
                                                        <li key={t.id}>{t.text}</li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                            </Card>
                                        )}                                   
                                        <Card className>
                                            <CardHeader>
                                                <CardTitle>BENEFITS</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <ul className="list-disc list-inside">
                                                    {benefits.map(b =>(
                                                        <li key={b.id}>{b.text}</li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>RETENTION POLICY</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <ul className="list-disc list-inside">
                                                    {retentions.map(r =>(
                                                        <li key={r.id}>{r.text}</li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>QUALIFICATIONS</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <ul className="list-disc list-inside">
                                                    {qualifications.map(q =>(
                                                        <li key={q.id}>{q.text}</li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>REQUIREMENTS</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <ul className="list-disc list-inside">
                                                    {files.map(f =>(
                                                        <li key={f.id}>{f.name}</li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                        </Card>
                                    </CardContent>
                                    <CardFooter></CardFooter>
                                </Card>                           
                            </TabsContent>
                            <TabsContent value="students">
                                <Card className='p-5 bg-[#E8E8E8]'>
                                    <DataTable columns={columns} data={students}></DataTable> 
                                </Card>                            
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
