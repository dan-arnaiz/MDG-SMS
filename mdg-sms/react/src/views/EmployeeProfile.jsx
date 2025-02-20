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
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowUpDown } from "lucide-react"


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
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    RowSelection,
  } from "@tanstack/react-table";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { DialogClose } from '@radix-ui/react-dialog';

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


export default function EmployeeProfile() {

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
            accessorKey: 'scholarship',
            header: ({ column }) => {
                return (
                  <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                  >
                    Scholarship
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                )
              },

        },
        {
          accessorKey: 'type',
          header: ({ column }) => {
              return (
                <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                  Type
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
            accessorKey: 'created',
            header: ({ column }) => {
                return (
                  <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                  >
                    Reviewed At
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

    const { id } = useParams();
    const [employee,setEmployee] = useState([]);
    const [contactNums,setContactNums] = useState([]);
    const [addresses,setAddresses] = useState([]);
    const [loading,setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [students,setStudents] = useState([]);
    const [sorting, setSorting] = useState([]);
    const [globalFilter, setGlobalFilter] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        getEmployee();
    }, [])

    const table = useReactTable({
        data: students,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
          sorting,
          globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter
      });
    const resetPassword = () => {

    }

    const getEmployee = () => {

        axiosClient.get(`/employees/${id}`)
        .then((response) => {
            console.log(response);
            setEmployee(response.data.employee);
            setContactNums(response.data.contacts);
            setAddresses(response.data.addresses);
            setStudents(response.data.students);
        })
        .catch((error) => {
            console.error('Error:', error.response ? error.response.data : error.message);
            setLoading(false); 
        });

    }

    const deleteEmployee = () => {
        axiosClient.delete(`/employees/${id}`)
        .then((response) => {
            alert(`Employee ${id} was successfully deleted`);
            navigate(`/employees`);
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
                    <h1 className='text-black font-bold font-sans text-lg'>Employees</h1>             
                </div>
                <div className="students-toolbar justify-between">
                    <Button onClick={() => navigate("/employees")}>Back</Button>                   
                    <div className="students-toolbar-btns">
                        <Button>Export</Button>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant='destructive'>Delete</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription className='pt-5 pb-5'>
                                    This action cannot be undone. This will permanently delete employee {id}...
                                </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button onClick={ev => deleteEmployee()} variant='destructive'>Confirm</Button>
                                    </DialogClose>                                     
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>                          
                </div>
                
                <div className="grid grid-cols-2 gap-2 h-[100%]">
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
                                        <DropdownMenuItem onClick={() => navigate(`/edit-employee-profile/${id}`)}>
                                            Edit
                                        </DropdownMenuItem>               
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </CardHeader>
                            <CardContent className='flex flex-col gap-5 justify-center items-center text-center'>
                                    {/* Preview Personal Info */}
                                <div className='flex flex-col justify-center items-center'>
                                    <img 
                                        src={defaultProfilePic} 
                                        alt='profile-pic' 
                                        className="w-32 h-32 object-cover border border-black"
                                    />          
                                    <div className='flex flex-row gap-1'>
                                        <p className='text-black text-lg font-semibold mt-5'>{employee.lastName},</p>
                                        <p className='text-black text-lg font-semibold mt-5'>{employee.firstName}</p>
                                        <p className='text-black text-lg font-semibold mt-5'>{employee.middleName}</p>
                                        <p className='text-black text-lg font-semibold mt-5'>{employee.suffix}</p>
                                    </div>
                                    <p className='text-black text-sm font-semibold'>{id}</p>                 
                                </div>
                                <Separator className='w-[80%]'/>
                                <div className='flex flex-col gap-10 text-center'>                       
                                    <div>
                                        <p className='text-black text-lg font-semibold'>{employee.jobTitle}</p>
                                        <p className='text-gray-500 text-xs'>Program</p>
                                    </div>
                                    <div className="justify-center">
                                        <p className='text-black text-sm font-semibold'>{employee.dob}</p>
                                        <p className='text-gray-500 text-xs'>Date of Birth</p>
                                    </div>
                                </div>                                 
                            </CardContent>
                            <CardFooter></CardFooter>
                        </Card>
                        {/* Preview Enrollment Info */}
                        <div className='flex flex-col gap-3'>
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
                                            <DropdownMenuItem onClick={() => navigate(`/edit-employee-contacts/${id}`)}>
                                                Edit
                                            </DropdownMenuItem>               
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </CardHeader>
                                <CardContent className='flex flex-col gap-5 mt-2 justify-center items-center text-center'>                          
                                    <div>
                                        <p className='text-black text-sm font-semibold'>{employee.employeeEmail}</p>
                                        <p className='text-gray-500 text-xs pl-2'>Organization Email Address</p>
                                    </div>
                                    <div>
                                        <p className='text-black text-sm font-semibold'>{employee.personalEmail}</p>
                                        <p className='text-gray-500 text-xs'>Personal Email Address</p>
                                    </div>
                                    <div>
                                        <ul className='flex flex-col gap-5'>
                                            {contactNums.map((contactnum, index) => (
                                                <li key={index}>
                                                    <p className='text-black text-sm font-semibold'>{contactnum.nums}</p>
                                                    <p className='text-gray-500 text-xs'>{contactnum.type}</p>
                                                </li>
                                            ))}
                                        </ul> 
                                    </div>
                                    <div>
                                        <ul className='flex flex-col gap-5'>
                                            {addresses.map((address, index) => (
                                                <li key={index}>
                                                    <p className='text-black text-sm font-semibold'>{address.full_address},</p>
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
                                                <p className='mt-2 text-blue-900'>Default Username: {employee.employeeEmail}</p>                                   
                                                <p className='text-blue-900'>Default Password: {id}</p>
                                            </DialogDescription>  
                                            <DialogFooter>
                                                <Button variant='destructive' className='w-[%50]' onClick={resetPassword}>Confirm</Button>
                                            </DialogFooter>                                     
                                        </DialogContent>
                                    </Dialog>
                                </CardContent>
                            </Card>                
                        </div>
                    <div> 
                </div>
            </div>
            <Card className='flex flex-col gap-2 p-5'>
                    <CardTitle className='p-2'>Applications Reviewed</CardTitle>
                    <Input
                      onChange={e => table.setGlobalFilter(String(e.target.value))}
                      placeholder="Search..."
                      className="max-w-sm"
                    />
                    <div className="rounded-md border h-[100%]">
                        <Table className="h=[100%]"> 
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
        </div>
    </div>
    )
}