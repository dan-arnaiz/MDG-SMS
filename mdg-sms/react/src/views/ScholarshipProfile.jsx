import { Link, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axiosClient from "../axios-client.js";
import { DataTable } from "./Data-Table.jsx";
import { ArrowUpDown } from "lucide-react"

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

    const columns = [
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
                    <span className={status === 'Active' ? 'text-green-600' : 'text-red-600'}>
                        {status}
                    </span>
                );
            },
        },
    ];

    return(
        <div>
            <div className="main">
                <div className="header-toolbar">
                    <h1 className='text-black font-bold font-sans text-lg'>Scholarships</h1>             
                </div>
                <div className="students-toolbar"> 
                    <Button>Back</Button>                   
                    <div className="students-toolbar-btns">
                        <Button>Filter</Button>
                        <Button asChild>
                            <Link className='addstudent-btn' to="">Add Scholarship</Link>
                        </Button>
                    </div>                          
                </div>
                <Card className="profile">
                    <CardHeader>
                        <CardTitle>{profile.name}</CardTitle>
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
                    <CardContent>   
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList>
                                <TabsTrigger value="description">Description</TabsTrigger>
                                <TabsTrigger value="students">Students</TabsTrigger>
                            </TabsList>
                            <TabsContent value="description">
                                <Card>
                                    <CardHeader></CardHeader>
                                    <CardContent> 
                                        {types.length > 0 && (
                                            <Card>
                                            <CardHeader>
                                                <CardTitle>TYPES</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <ul>
                                                    {types.map(t =>(
                                                        <li key={t.id}>{t.text}</li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                            </Card>
                                        )}                                   
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>BENEFITS</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <ul>
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
                                                <ul>
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
                                                <ul>
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
                                                <ul>
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
                                <DataTable columns={columns} data={students}></DataTable>                             
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
