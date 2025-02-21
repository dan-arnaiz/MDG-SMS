import { Link, useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axiosClient from "../axios-client.js";
import { ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"

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

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    RowSelection,
  } from "@tanstack/react-table"

  import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
  } from "@radix-ui/react-icons"
   
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
 
export default function ScholarshipProfile() {

    const[scholarship,setScholarship] = useState([]);
    const[loading,setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("description");

    const { id } = useParams();
    const scholarshipId = id.split('-')[0];

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
    const types = scholarship.types || [];
    const retentions = scholarship.retentions || [];
    const qualifications = scholarship.qualifications || [];
    const files = scholarship.files || [];
    const students = scholarship.students || [];

    const [sorting, setSorting] = useState([]);
    const [globalFilter, setGlobalFilter] = useState([])
    const [rowSelection, setRowSelection] = useState({})
    const [studentsDel, setStudentsDel] = useState([])
    const [studentIds, setStudentIds] = useState([])

    const table = useReactTable({
        data: students,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            globalFilter,
            rowSelection,
        },
        onGlobalFilterChange: setGlobalFilter
    });

    const getSelectedRows = () => {
        const selectedRows = table.getSelectedRowModel().rows.map(row => row.original);
        setStudentsDel(selectedRows); // Store the selected rows in the studentsDel state
  
        const ids = table.getSelectedRowModel().rows.map(row => row.original.student_id);
        setStudentIds(ids);
  
        console.log(ids);
      };

    const navigate = useNavigate();


    const onDelete = () => {
        axiosClient.delete(`/scholarships/${scholarshipId}`)
        .then(() => {
            getScholarship();
            navigate('/scholarships')
        })
    }

    const handleAddStudent = () => {

        if (!profile.is_full) navigate(`/add-student/${scholarshipId}`);
        else alert('This scholarship is already at its maximum capacity')

    }

    const deleteStudents = () =>{
      
        if (!studentIds || studentIds.length === 0) {
          alert('No students selected for deletion.');
          return;
        }
  
      // Send the data to the backend
        axiosClient.delete('/students', {
            data: { student_id: studentIds }
        })
        .then(response => {
            console.log('Server response:', response.data);  // Debugging
            alert('Deletion was successful');
            getStudents();
        })
        .catch(error => {
            console.error('Error:', error.response ? error.response.data : error.message);
            alert('Error: ' + (error.response ? error.response.data.error : error.message));
        });
  
      };

    return(
        <div>
            <div className="main">
                <div className="header-toolbar">
                    <h1 className='text-black font-bold font-sans text-lg'>Scholarships</h1>             
                </div>
                <div className="students-toolbar justify-between gap-2"> 
                    <Button onClick={() => navigate(`/scholarships`)}>Back</Button>                 
                    <div className="students-toolbar-btns">
                        <Button onClick={() => navigate(`/edit-scholarship/${scholarshipId}`)}>Edit</Button>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant='destructive'>Delete</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription className='pt-5 pb-5'>
                                    This action cannot be undone. This will permanently delete the scholarship option. Students enrolled in this scholarship will become inactive.
                                </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button onClick={ev => onDelete()} variant='destructive'>Confirm</Button>
                                    </DialogClose> 
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
                                                <CardTitle>Benefits</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <ul className="list-disc list-inside">
                                                    {types.map((t,index) =>(
                                                        <li key={index}>{t.name}
                                                        <p className='text-gray-500'>{t.description}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                            </Card>
                                        )}                                   
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Retention Policy</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <ul className="list-disc list-inside">
                                                    {retentions.map((r,index) =>(
                                                        <li key={index}>{r.text}</li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Qualifications</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <ul className="list-disc list-inside">
                                                    {qualifications.map((q,index)=>(
                                                        <li key={index}>{q.text}</li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Requirements</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <ul className="list-disc list-inside">
                                                    {files.map((f,index) =>(
                                                        <li key={index}>{f.name}
                                                        <p className='text-gray-500'>{f.description}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                        </Card>
                                    </CardContent>
                                    <CardFooter></CardFooter>
                                </Card>                           
                            </TabsContent>
                            <TabsContent value="students">
                                <Card className='flex flex-col gap-2 p-5 bg-[#E8E8E8]'>
                                    <Card className='py-2 px-5 flex justify-between gap-2'> 
                                        <Input
                                            onChange={e => table.setGlobalFilter(String(e.target.value))}
                                            placeholder="Search..."
                                            className="max-w-sm"
                                        /> 
                                        <div className="flex gap-2">
                                            <Button>Export</Button>
                                            <Button variant='secondary' onClick={() => handleAddStudent()}>Add Student</Button>
                                            <Dialog>
                                                {table.getFilteredSelectedRowModel().rows.length > 0 && (
                                                <DialogTrigger asChild>                        
                                                    <Button variant='destructive' onClick={getSelectedRows}>Delete Student(s)</Button> 
                                                </DialogTrigger>
                                                )}
                                                <DialogContent>
                                                    <DialogHeader>
                                                    <DialogTitle>Student Deletion Confirmation</DialogTitle>
                                                    <DialogDescription>The selected student(s) will be permanently removed from the records with their respective applications.</DialogDescription>
                                                    </DialogHeader>
                                                    <ScrollArea className='h-[150px]'>
                                                    {studentsDel.length > 0 ? (
                                                        <ul className="flex flex-col justify-between">
                                                        {studentsDel.map((student, index) => (
                                                            <li key={index} className='flex gap-[5%] text-[10px]'>
                                                            <p>{student.student_id}</p>
                                                            <p>{student.full_name}</p>
                                                            <p>{student.program}</p>
                                                            <p>{student.scholarship || 'No scholarship assigned'}</p> 
                                                            <p className={student.status === 'Inactive' || student.status === 'Terminated' ? 'text-red-500' : 'text-green-500'}>
                                                                {student.status}
                                                            </p>
                                                            </li>
                                                        ))}
                                                        </ul>
                                                    ) : (
                                                        <p>No students selected for deletion.</p>
                                                    )}
                                                    </ScrollArea>                                            
                                                    <DialogFooter> 
                                                    <DialogClose asChild>
                                                        <Button onClick={deleteStudents}>Confirm</Button> 
                                                    </DialogClose>                                        
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </div>                                 
                                    </Card>
                                    <Card className='p-5 flex flex-col gap-2 h-[55vh]'>
                                        <div className="rounded-md border h-[100%]">
                                            <Table className='h-[100%]'> 
                                                <TableHeader>                       
                                                    {table.getHeaderGroups().map((headerGroup) => (
                                                    <TableRow key={headerGroup.id}>
                                                    
                                                        {headerGroup.headers.map((header) => (
                                                        <TableHead key={header.id}>
                                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                                        </TableHead>
                                                        ))}
                                                    </TableRow>
                                                    ))}                
                                                </TableHeader>
                                                <TableBody>
                                                    {table.getRowModel().rows?.length ? (
                                                    table.getRowModel().rows.map((row) => (
                                                        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                                        {row.getVisibleCells().map((cell) => (
                                                            <TableCell key={cell.id}>
                                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                            </TableCell>
                                                        ))}
                                                        </TableRow>
                                                    ))
                                                    ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                                        No results.
                                                        </TableCell>
                                                    </TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>        
                                        </div>
                                        <div className="flex items-center justify-between px-2">
                                            <div className="flex-1 text-sm text-muted-foreground">
                                                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                                                {table.getFilteredRowModel().rows.length} row(s) selected.
                                            </div>
                                            <div className="flex items-center space-x-6 lg:space-x-8">
                                                <div className="flex items-center space-x-2">
                                                <p className="text-sm font-medium">Rows per page</p>
                                                <Select
                                                    value={`${table.getState().pagination.pageSize}`}
                                                    onValueChange={(value) => {
                                                    table.setPageSize(Number(value))
                                                    }}
                                                >
                                                    <SelectTrigger className="h-8 w-[70px]">
                                                    <SelectValue placeholder={table.getState().pagination.pageSize} />
                                                    </SelectTrigger>
                                                    <SelectContent side="top">
                                                    {[10, 20, 30, 40, 50].map((pageSize) => (
                                                        <SelectItem key={pageSize} value={`${pageSize}`}>
                                                        {pageSize}
                                                        </SelectItem>
                                                    ))}
                                                    </SelectContent>
                                                </Select>
                                                </div>
                                                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                                                Page {table.getState().pagination.pageIndex + 1} of{" "}
                                                {table.getPageCount()}
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                <Button
                                                    variant="outline"
                                                    className="hidden h-8 w-8 p-0 lg:flex"
                                                    onClick={() => table.setPageIndex(0)}
                                                    disabled={!table.getCanPreviousPage()}
                                                >
                                                    <span className="sr-only">Go to first page</span>
                                                    <DoubleArrowLeftIcon className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="h-8 w-8 p-0"
                                                    onClick={() => table.previousPage()}
                                                    disabled={!table.getCanPreviousPage()}
                                                >
                                                    <span className="sr-only">Go to previous page</span>
                                                    <ChevronLeftIcon className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="h-8 w-8 p-0"
                                                    onClick={() => table.nextPage()}
                                                    disabled={!table.getCanNextPage()}
                                                >
                                                    <span className="sr-only">Go to next page</span>
                                                    <ChevronRightIcon className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="hidden h-8 w-8 p-0 lg:flex"
                                                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                                    disabled={!table.getCanNextPage()}
                                                >
                                                    <span className="sr-only">Go to last page</span>
                                                    <DoubleArrowRightIcon className="h-4 w-4" />
                                                </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Card>                            
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
