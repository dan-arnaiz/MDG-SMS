import { useState, useEffect } from 'react';
import * as React from "react"
import { Form, FormItem } from '@/components/ui/form';
import { useForm, Controller } from 'react-hook-form'; // Import useForm
import { zodResolver } from '@hookform/resolvers/zod'; // Import zodResolver
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { z } from 'zod';
import { Label } from '@/components/ui/label';
import axiosClient from "../axios-client.js";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus,Eraser, Check, ChevronsUpDown } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useNavigate,useParams, } from 'react-router-dom';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { DialogClose } from '@radix-ui/react-dialog';

const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    maxSlots: z.number().min(1, { message: "Max Slots must be greater than 0" })
});

export default function EditScholarship() {

    const { id } = useParams();
    const [open, setOpen] = React.useState(false)
    const [comboValue, setComboValue] = React.useState(null)
    const[files,setFiles] = useState([]);
    const[profile,setProfile] = useState([]);

    const [benefits, setBenefits] = useState([]);
    const [benefitName, setBenefitName] = useState('');
    const [benefitDesc, setBenefitDesc] = useState('');
    const [retentionPolicies, setRetentionPolicies] = useState([]);
    const [retentionDesc, setRetentionDesc] = useState('');
    const [qualifications, setQualifications] = useState([]);
    const [qualificationDesc, setQualificationDesc] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileDesc, setFileDesc] = useState('');
    const [taken, setTaken] = useState(0);
    const[loading,setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        getScholarship();
    }, [])

    const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm({
        resolver: zodResolver(formSchema),
    });

    const getScholarship = () => {
        setLoading(true)
        axiosClient.get(`/scholarships/${id}`)
            .then(({data}) => {
                setLoading(false)
                setBenefits(data.data.types);
                setRetentionPolicies(data.data.retentions);
                setQualifications(data.data.qualifications);
                setFiles(data.data.files);
                setTaken(data.data.profile.taken_slots);
                console.log(data);

                reset({
                    name:data.data.profile.name,
                    description: data.data.profile.description,
                    maxSlots: data.data.profile.max_slots
                });
            })
            .catch((error) => {
                console.error('Error:', error.response ? error.response.data : error.message);
                setLoading(false); 
            });
    }

    const addBenefit = () => {
        if (!benefitName) return; // Ensure both fields are filled

        const newBenefit = { name: benefitName, description: benefitDesc };

        // Check if a benefit with the same name already exists
        if (!benefits.some(b => b.name === benefitName)) {
            setBenefits([...benefits, newBenefit]);
        }

        setBenefitName('');
        setBenefitDesc('');
    };

    const delBenefit = (name) => {
        setBenefits(benefits.filter(b => b.name !== name));
    }

    const addRetention = () => {
        if ( !retentionDesc) return; // Ensure both fields are filled

        // Check if a benefit with the same name already exists
        if (!retentionPolicies.some(r => r=== retentionDesc)) {
            setRetentionPolicies([...retentionPolicies, retentionDesc]);
        }

        setRetentionDesc('');
    };

    const delRetention = (name) => {
        setRetentionPolicies(retentionPolicies.filter(r => r.name !== name));
    }

    const addQualification = () => {

        if (!qualificationDesc) return; // Ensure both fields are filled

        // Check if a benefit with the same name already exists
        if (!qualifications.some(q => q === qualificationDesc)) {
            setQualifications([...qualifications, qualificationDesc]);
        }

        setQualificationDesc('');
    };

    const delQualification = (name) => {
        setQualifications(qualifications.filter(q => q.name !== name));
    }

    const addFile = () => {

        if (!fileName) return; // Ensure both fields are filled

        const newFile = { name: fileName, description: fileDesc };

        // Check if a benefit with the same name already exists
        if (!files.some(f => f.name === fileName)) {
            setFiles([...files, newFile]);
        }

        setFileName('');
        setFileDesc('');
    };

    const delFile = (name) => {
        setFiles(files.filter(f => f.name !== name));
    }

    const onSubmit = (data) => {

        if(data.maxSlots < taken){
            alert(`There are ${taken} student currently active in this scholarship. Max Slots cannot be less than that number...`)
            return;
        } 

        console.log("Benefits:", benefits);
        console.log("Retentions:", retentionPolicies);
        console.log("Qualifications:", qualifications);
        console.log("New Files:", files);

        const payload = {
            name: data.name,
            description: data.description,
            maxSlots: Number(data.maxSlots),
            taken: taken,
            benefits: benefits,
            retentions: retentionPolicies,
            qualifications: qualifications,
            files: files,
        }
        console.log(payload);

        try{
            axiosClient.put(`/scholarships/${id}`, payload)
            alert('Scholarship successfully updated!!')
            navigate(`/scholarships/${id}-${data.name}`)
        } catch(err ) {
            console.error('Error:', error.response ? error.response.data : error.message);
            const response = err.response;
        }
    }
    
    return(
        <div className="main">
            <div className="header-toolbar">
                <h1 className="text-black font-bold font-sans text-lg pt-1">Add Scholarship</h1>
                <Button className="hover:bg-slate-500 border hover:black hover:text-white" onClick={() => window.history.back()}>Cancel</Button>
            </div>
            <Form >
                <form onSubmit={handleSubmit(onSubmit)}>    
                    <Card className='p-5 flex flex-col gap-2'>
                        <Label>Name</Label>
                            <FormItem>
                                <Input type="text" {...register('name')} className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`} />
                                {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                            </FormItem>
                        <Label>Description</Label>
                        <FormItem>
                        <Textarea {...register('description')} className={`w-[100%] mb-3 ${errors.description ? 'border-red-500' : ''}`} />
                        {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
                        </FormItem>
                        <div>
                            <Label>Max Slots</Label>
                            <FormItem>
                            <Input type="number" {...register('maxSlots', {setValueAs: value => Number(value)})} className={`w-[20%] mb-3 ${errors.maxSlots ? 'border-red-500' : ''}`} />
                            {errors.maxSlots && <span className="text-red-500 text-xs">{errors.maxSlots.message}</span>}
                            </FormItem>
                        </div> 
                        <Card>
                            <CardHeader className='flex flex-row items-center justify-between'>
                                <CardTitle>Benefits</CardTitle>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant='secondary'className='h-[30px]' >Add</Button>
                                    </DialogTrigger>
                                    <DialogContent className='w-[30%]'>
                                        <DialogHeader>
                                            <DialogTitle>Add Benefit</DialogTitle>
                                        </DialogHeader>
                                        <Label>Name</Label>
                                        <Input value={benefitName} onChange={(e) => setBenefitName(e.target.value)}></Input>
                                        <Label>Description</Label>
                                        <Textarea value={benefitDesc} onChange={(e) => setBenefitDesc(e.target.value)} className='min-h-[150px]'></Textarea>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                            <Button className="mt-4" onClick={addBenefit}>Add</Button>
                                            </DialogClose>
                                        </DialogFooter>                                   
                                    </DialogContent>                      
                                </Dialog>
                            </CardHeader>
                            <CardContent className='px-10'>
                                <ul>
                                    {benefits.map((b,index) =>(
                                        <li key={index}>
                                            <div className='flex flex-row items-center'>
                                                <Button variant='destructive' className='rounded-full text-[13px] p-1.5 h-1 w-1' onClick={() => delBenefit(b.name)}>x</Button>
                                                <p className='mx-5 font-semibold'>{b.name}</p>
                                            </div>
                                            <p className='text-gray-500'>{b.description}</p>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className='flex flex-row items-center justify-between'>
                                <CardTitle>Retentions</CardTitle>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant='secondary'className='h-[30px]'>Add</Button>
                                    </DialogTrigger>
                                    <DialogContent className='w-[30%]'>
                                        <DialogHeader>
                                            <DialogTitle>Add Retention</DialogTitle>
                                        </DialogHeader>
                                        <Label>Description</Label>
                                        <Textarea value={retentionDesc} onChange={(e) => setRetentionDesc(e.target.value)} className='min-h-[150px]'></Textarea>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                            <Button className="mt-4" onClick={addRetention}>Add</Button>
                                            </DialogClose>
                                        </DialogFooter>                                   
                                    </DialogContent>                      
                                </Dialog>
                            </CardHeader>
                            <CardContent className='px-10'>
                                <ul>
                                    {retentionPolicies.map((r,index) =>(
                                        <li key={index}>
                                            <div className='flex flex-row items-center'>
                                                <Button variant='destructive' className='rounded-full text-[13px] p-1.5 h-1 w-1' onClick={() => delRetention(r.name)}>x</Button>
                                                <p className='mx-5'>{r.text}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className='flex flex-row items-center justify-between'>
                                <CardTitle>Qualifications</CardTitle>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant='secondary'className='h-[30px]'>Add</Button>
                                    </DialogTrigger>
                                    <DialogContent className='w-[30%]'>
                                        <DialogHeader>
                                            <DialogTitle>Add Qualification</DialogTitle>
                                        </DialogHeader>
                                        <Label>Description</Label>
                                        <Textarea value={qualificationDesc} onChange={(e) => setQualificationDesc(e.target.value)} className='min-h-[150px]'></Textarea>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                            <Button className="mt-4" onClick={addQualification}>Add</Button>
                                            </DialogClose>
                                        </DialogFooter>                                   
                                    </DialogContent>                      
                                </Dialog>
                            </CardHeader>
                            <CardContent className='px-10'>
                                <ul>
                                    {qualifications.map((q,index) =>(
                                        <li key={index}>
                                            <div className='flex flex-row items-center'>
                                                <Button variant='destructive' className='rounded-full text-[13px] p-1.5 h-1 w-1' onClick={() => delQualification(q.name)}>x</Button>
                                                <p className='mx-5'>{q.text}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className='flex flex-row items-center justify-between'>
                                <CardTitle>Required Files</CardTitle>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant='secondary'className='h-[30px]'>Add</Button>
                                    </DialogTrigger>
                                    <DialogContent className='w-[30%]'>
                                        <DialogHeader>
                                            <DialogTitle>Add File</DialogTitle>
                                        </DialogHeader>
                                        <Label>Name</Label>
                                        <Input value={fileName} onChange={(e) => setFileName(e.target.value)}></Input>
                                        <Label>Description</Label>
                                        <Textarea value={fileDesc} onChange={(e) => setFileDesc(e.target.value)} className='min-h-[150px]'></Textarea>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                            <Button className="mt-4" onClick={addFile}>Add</Button>
                                            </DialogClose>
                                        </DialogFooter>                                   
                                    </DialogContent>                      
                                </Dialog>
                            </CardHeader>
                            <CardContent className='px-10'>
                                <ul>
                                    {files.map((f,index) =>(
                                        <li key={index}>
                                            <div className='flex flex-row items-center'>
                                                <Button variant='destructive' className='rounded-full text-[13px] p-1.5 h-1 w-1' onClick={() => delFile(f.name)}>x</Button>
                                                <p className='mx-5 font-semibold'>{f.name}</p>
                                            </div>
                                            <p className='text-gray-500'>{f.description}</p>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>                                  
                        <div className='flex justify-end mt-10'>
                            <Button className='w-[100px]' type="submit">Submit</Button>
                        </div>                  
                    </Card>
                </form>            
            </Form>
        </div>
    )
}