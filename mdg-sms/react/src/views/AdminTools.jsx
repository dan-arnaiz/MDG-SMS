import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog";


export default function ExtraDetails() {

    const [programs, setPrograms] = useState([]);
    const [program,setProgram] =useState('')
    const [years, setYears] = useState([]);
    const [year, setYear] = useState('');
    const [academicYears, setAcademicYears] = useState([]);
    const [academicYear, setAcademicYear] = useState('');
    const [semesters, setSemesters] = useState([]);
    const [semester, setSemester] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadDetails();
    }, [])

    const loadDetails = () => {
        axiosClient.get(`/admintools`)
        .then((response) =>{
            console.log(response);
            setPrograms(response.data.programs);
            setYears(response.data.years);
            setAcademicYears(response.data.academicYears);
            setSemesters(response.data.semesters);
        })
    }

    const handleAdd = (type, name) => {

        if (!name) return;

        if (type === 'program'){
            if (programs.some(p => p.name.toLowerCase() === name.toLowerCase())) {
                alert("Program already exists!"); // Handle duplicate case
                return;
            }
            setPrograms([...programs, { name: name }]);
            setProgram('');
        }
        else if (type === 'year'){
            if (years.some(y => y.name.toLowerCase() === name.toLowerCase())) {
                alert("Year already exists!"); // Handle duplicate case
                return;
            }
            setYears([...years, { name: name }]);
            setYear('');
        }
        else if (type === 'academicYear'){
            if (academicYears.some(a => a.name.toLowerCase() === name.toLowerCase())) {
                alert("Academic Year already exists!"); // Handle duplicate case
                return;
            }
            setAcademicYears([...academicYears, { name: name }]);
            setAcademicYear('');
        }
        else if (type === 'semester'){
            if (semesters.some(s => s.name.toLowerCase() === name.toLowerCase())) {
                alert("Semester already exists!"); // Handle duplicate case
                return;
            } 
            setSemesters([...semesters, { name: name }]);
            setSemester('');
        }

        const payload = {type:type, name:name}

        console.log(payload)

        try{
            axiosClient.post(`/admintools`, payload);         
        } catch(error) {
            if (error.response && error.response.status === 409 && error.response.data.errors) {
                const { errors: backendErrors } = error.response.data;
                // Set the errors returned by the backend into react-hook-form
                Object.keys(backendErrors).forEach((key) => {
                    setError(key, {
                        message: backendErrors[key]
                    });
                });
            } else {
                // Handle other errors if needed (e.g., network issues)
                const errorMessage = error.response ? error.response.data.message : "An unexpected error occurred.";
                alert(errorMessage);
            }
        }
    }

    const handleDelete = (type,name) => {

        try{
            axiosClient.delete(`/admintools/${name}`, { data: { type } });
            loadDetails();
        } catch(error) {
            if (error.response && error.response.status === 409 && error.response.data.errors) {
                const { errors: backendErrors } = error.response.data;
                // Set the errors returned by the backend into react-hook-form
                Object.keys(backendErrors).forEach((key) => {
                    setError(key, {
                        message: backendErrors[key]
                    });
                });
            } else {
                // Handle other errors if needed (e.g., network issues)
                const errorMessage = error.response ? error.response.data.message : "An unexpected error occurred.";
                alert(errorMessage);
            }
        }

    }


    return (
        <div className="main">
            <div className="header-toolbar">
                <h1 className="text-black font-bold font-sans text-lg">Admin Tools</h1>   
            </div>
            <Card className='h-[100%]'>
                <CardHeader className='flex flex-row justify-between items-center'>
                    <CardTitle>Programs</CardTitle>                     
                </CardHeader>
                <CardContent className='flex flex-col gap-1'>
                    <Table className='border'>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='w-[90%] font-bold text-center'>Name</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {programs.map((program, index) => (
                                <TableRow key={index}>
                                    <TableCell className="text-center">{program.name}</TableCell>
                                    <TableCell className="text-right">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button size="sm" className='h-[20px]' variant="destructive">Delete</Button>
                                            </DialogTrigger>
                                            <DialogContent className='w-[50%]'>
                                                <DialogHeader>
                                                    <DialogTitle>Delete Program</DialogTitle>
                                                </DialogHeader>
                                                <DialogDescription>
                                                    Are you sure you want to delete the program '{program.name}'?
                                                </DialogDescription>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button onClick={() => handleDelete('program',program.name)} variant='destructive'>Confirm</Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>                                       
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="flex justify-end">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant='secondary' className='w-[100px]'>Add</Button>
                            </DialogTrigger>
                            <DialogContent className='w-[50%]'>
                                <DialogHeader>
                                    <DialogTitle>Add Program</DialogTitle>
                                </DialogHeader>
                                <Label>Name</Label>
                                <Input value={program} onChange={(e) => setProgram(e.target.value)}></Input>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button className='w-[100px]' onClick={() => handleAdd('program',program)}>Add</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>                        
                    </div>
                </CardContent>
            </Card> 
            <Card className='h-[100%]'>
                <CardHeader className='flex flex-row justify-between items-center'>
                    <CardTitle>Years</CardTitle>                     
                </CardHeader>
                <CardContent className='flex flex-col gap-1'>
                    <Table className='border'>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='w-[90%] text-center font-bold'>Name</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {years.map((year, index) => (
                                <TableRow key={index}>
                                    <TableCell className="text-center">{year.name}</TableCell>
                                    <TableCell className="text-right">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button size="sm" className='h-[20px]' variant="destructive">Delete</Button>
                                            </DialogTrigger>
                                            <DialogContent className='w-[50%]'>
                                                <DialogHeader>
                                                    <DialogTitle>Delete Year</DialogTitle>
                                                </DialogHeader>
                                                <DialogDescription>
                                                    Are you sure you want to delete the year '{year.name}'?
                                                </DialogDescription>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button onClick={() => handleDelete('year',year.name)} variant='destructive'>Confirm</Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>                                       
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="flex justify-end">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant='secondary' className='w-[100px]'>Add</Button>
                            </DialogTrigger>
                            <DialogContent className='w-[50%]'>
                                <DialogHeader>
                                    <DialogTitle>Add Year</DialogTitle>
                                </DialogHeader>
                                <Label>Name</Label>
                                <Input value={year} onChange={(e) => setYear(e.target.value)}></Input>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button className='w-[100px]' onClick={() => handleAdd('year',year)}>Add</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>                        
                    </div>
                </CardContent>
            </Card>
            <Card className='h-[100%]'>
                <CardHeader className='flex flex-row justify-between items-center'>
                    <CardTitle>Academic Years</CardTitle>                     
                </CardHeader>
                <CardContent className='flex flex-col gap-1'>
                    <Table className='border'>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='w-[90%] text-center font-bold'>Name</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {academicYears.map((year, index) => (
                                <TableRow key={index}>
                                    <TableCell className="text-center">{year.name}</TableCell>
                                    <TableCell className="text-right">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button size="sm" className='h-[20px]' variant="destructive">Delete</Button>
                                            </DialogTrigger>
                                            <DialogContent className='w-[50%]'>
                                                <DialogHeader>
                                                    <DialogTitle>Delete Academic Year</DialogTitle>
                                                </DialogHeader>
                                                <DialogDescription>
                                                    Are you sure you want to delete academic year '{year.name}'?
                                                </DialogDescription>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button onClick={() => handleDelete('academicYear',year.name)} variant='destructive'>Confirm</Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>                                       
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="flex justify-end">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant='secondary' className='w-[100px]'>Add</Button>
                            </DialogTrigger>
                            <DialogContent className='w-[50%]'>
                                <DialogHeader>
                                    <DialogTitle>Add Academic Year</DialogTitle>
                                </DialogHeader>
                                <Label>Name</Label>
                                <Input value={academicYear} onChange={(e) => setAcademicYear(e.target.value)}></Input>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button className='w-[100px]' onClick={() => handleAdd('academicYear',academicYear)}>Add</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>                        
                    </div>
                </CardContent>
            </Card>
            <Card className='h-[100%]'>
                <CardHeader className='flex flex-row justify-between items-center'>
                    <CardTitle>Semesters</CardTitle>                     
                </CardHeader>
                <CardContent className='flex flex-col gap-1'>
                    <Table className='border'>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='w-[90%] text-center font-bold'>Name</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {semesters.map((semester, index) => (
                                <TableRow key={index}>
                                    <TableCell className="text-center">{semester.name}</TableCell>
                                    <TableCell className="text-right">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button size="sm" className='h-[20px]' variant="destructive">Delete</Button>
                                            </DialogTrigger>
                                            <DialogContent className='w-[50%]'>
                                                <DialogHeader>
                                                    <DialogTitle>Delete Semester</DialogTitle>
                                                </DialogHeader>
                                                <DialogDescription>
                                                    Are you sure you want to delete semester '{semester.name}'?
                                                </DialogDescription>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button onClick={() => handleDelete('semester',semester.name)} variant='destructive'>Confirm</Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>                                       
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="flex justify-end">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant='secondary' className='w-[100px]'>Add</Button>
                            </DialogTrigger>
                            <DialogContent className='w-[50%]'>
                                <DialogHeader>
                                    <DialogTitle>Add Semester</DialogTitle>
                                </DialogHeader>
                                <Label>Name</Label>
                                <Input value={semester} onChange={(e) => setSemester(e.target.value)}></Input>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button className='w-[100px]' onClick={() => handleAdd('semester',semester)}>Add</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>                        
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}