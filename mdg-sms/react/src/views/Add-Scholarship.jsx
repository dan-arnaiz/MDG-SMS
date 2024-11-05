import { useState, useEffect } from 'react';
import * as React from "react"
import { Form, FormItem, FormLabel } from '@/components/ui/form';
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
import { useNavigate } from 'react-router-dom';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    maxSlots: z.number().min(1, { message: "Max Slots must be greater than 0" })
});

export default function AddScholarship() {

    const [open, setOpen] = React.useState(false)
    const [comboValue, setComboValue] = React.useState(null)
    const[files,setFiles] = useState([]);

    const [types, setTypes] = useState([]);
    const [typeInput, setTypeInput] = useState('');
    const [benefits, setBenefits] = useState([]);
    const [benefitInput, setBenefitInput] = useState('');
    const [retentionPolicies, setRetentionPolicies] = useState([]);
    const [retentionInput, setRetentionInput] = useState('');
    const [qualifications, setQualifications] = useState([]);
    const [qualificationInput, setQualificationInput] = useState('');
    const [newFiles, setNewFiles] = useState([]);
    const [newFileInput, setFileInput] = useState('');
    const [existingFiles, setExistingFiles] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getFiles();
    }, [])

    const getFiles = () => {
        axiosClient.get('/files')
            .then(({data}) => {
                setFiles(data.data);
                console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error.response ? error.response.data : error.message);
            });
    }

    const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema),
    });

    const addType = (newType) => {
        if (newType === '')return
        if(!types.includes(newType))
        setTypes([...types, newType]);
        setTypeInput('');
    };

    const addBenefit = (newBenefit) => {
        if (newBenefit === '')return
        if (!benefits.includes(newBenefit)) setBenefits([...benefits, newBenefit]);
        setBenefitInput('');
    };
    const addRetention = (newRetention) => {
        if (newRetention === '')return
        if (!retentionPolicies.includes(newRetention)) setRetentionPolicies([...retentionPolicies, newRetention]);
        setRetentionInput('');
    };

    const addQualification = (newQualification) => {
        if (newQualification === '')return
        if (!qualifications.includes(newQualification)) setQualifications([...qualifications, newQualification]);
        setQualificationInput('');
    };

    const addNewFile = (newFile) => {

        if (newFile === '')return
        if (!newFiles.includes(newFile)) {
            setNewFiles([...newFiles, newFile]);
        }
        setFileInput('');
    };

    const addExistingFile = () => {
        const file = files.find((file) => file.id === comboValue);
        if (comboValue === null)return
        if (!existingFiles.includes(file)) {
            setExistingFiles([...existingFiles, file]);
        }
        setComboValue(null);
    };

    const onSubmit = (data) => {

        console.log("Types:", types);
        console.log("Benefits:", benefits);
        console.log("Retentions:", retentionPolicies);
        console.log("Qualifications:", qualifications);
        console.log("New Files:", newFiles);
        console.log("Existing Files:", existingFiles);


        const payload = {
            name: data.name,
            description: data.description,
            maxSlots: Number(data.maxSlots),
            types: types,
            benefits: benefits,
            retentions: retentionPolicies,
            qualifications: qualifications,
            newFiles: newFiles,
            existingFiles: existingFiles,
        }
        console.log(payload);

        try{
            axiosClient.post('/scholarships', payload)
            navigate('/scholarships')
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
                                <Input type="text" placeholder="Name" {...register('name')} className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`} />
                                {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                            </FormItem>
                        <Label>Description</Label>
                        <FormItem>
                        <Textarea placeholder="Description" {...register('description')} className={`w-[100%] mb-3 ${errors.description ? 'border-red-500' : ''}`} />
                        {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
                        </FormItem>
                        <div>
                            <Label>Max Slots</Label>
                            <FormItem>
                            <Input type="number" placeholder="Max Slots" {...register('maxSlots', {setValueAs: value => Number(value)})} className={`w-[20%] mb-3 ${errors.maxSlots ? 'border-red-500' : ''}`} />
                            {errors.maxSlots && <span className="text-red-500 text-xs">{errors.maxSlots.message}</span>}
                            </FormItem>
                        </div>                    
                        <div className='flex gap-20 justify-evenly'>
                            <div className='w-[100%]'>
                                <Label>Types</Label>
                                <Accordion type="single" collapsible>
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger className='no-underline'>
                                            <div className='w-[100%] flex gap-2 items-center'>
                                                <Input type='text' placeholder='add types here' value={typeInput} onChange={(e) => setTypeInput(e.target.value)}></Input>
                                                <Button type='button' className='bg-[#0F2554] w-8 h-8 text-white' onClick={() => addType(typeInput)}>
                                                    <Plus size={20}></Plus>
                                                </Button>
                                                <Button type='button' className=' w-8 h-8' onClick={() => setTypes([])}>
                                                    <Eraser size={20}></Eraser>
                                                </Button>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <ul className="list-disc pl-10">
                                                {types.map((type, index) => (
                                                    <li key={index}>{type}</li>
                                                ))}
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>                            
                            </div> 
                            <div className='w-[100%]'>
                                <Label>Benefits</Label>
                                <Accordion type="single" collapsible>
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>
                                            <div className='w-[100%] flex gap-2 items-center'>
                                                <Input type='text' placeholder='add benefits here' value={benefitInput} onChange={(e) => setBenefitInput(e.target.value)}></Input>
                                                <Button type='button' className='bg-[#0F2554] w-8 h-8 text-white' onClick={() => addBenefit(benefitInput)}>
                                                    <Plus size={20}></Plus>
                                                </Button>
                                                <Button type='button' className=' w-8 h-8' onClick={() => setBenefits([])}>
                                                    <Eraser size={20}></Eraser>
                                                </Button>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <ul className="list-disc pl-10">
                                                {benefits.map((benefit, index) => (
                                                    <li key={index}>{benefit}</li>
                                                ))}
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>                            
                            </div>                                             
                        </div>
                        <div className='flex gap-20 justify-evenly'>
                            <div className='w-[100%]'>
                                <Label>Retention Policies</Label>
                                <Accordion type="single" collapsible>
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger className='no-underline'>
                                            <div className='w-[100%] flex gap-2 items-center'>
                                                <Input type='text' placeholder='add policies here' value={retentionInput} onChange={(e) => setRetentionInput(e.target.value)}></Input>
                                                <Button type='button' className='bg-[#0F2554] w-8 h-8 text-white' onClick={() => addRetention(retentionInput)}>
                                                    <Plus size={20}></Plus>
                                                </Button>
                                                <Button type='button' className=' w-8 h-8' onClick={() => setRetentionPolicies([])}>
                                                    <Eraser size={20}></Eraser>
                                                </Button>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <ul className="list-disc pl-10">
                                                {retentionPolicies.map((policy, index) => (
                                                    <li key={index}>{policy}</li>
                                                ))}
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>                            
                            </div> 
                            <div className='w-[100%]'>
                                <Label>Qualifications</Label>
                                <Accordion type="Qualifications" collapsible>
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>
                                            <div className='w-[100%] flex gap-2 items-center'>
                                                <Input type='text' placeholder='add qualifications here' value={qualificationInput} onChange={(e) => setQualificationInput(e.target.value)}></Input>
                                                <Button type='button' className='bg-[#0F2554] w-8 h-8 text-white' onClick={() => addQualification(qualificationInput)}>
                                                    <Plus size={20}></Plus>
                                                </Button>
                                                <Button type='button' className=' w-8 h-8' onClick={() => setQualifications([])}>
                                                    <Eraser size={20}></Eraser>
                                                </Button>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <ul className="list-disc pl-10">
                                                {qualifications.map((quali, index) => (
                                                    <li key={index}>{quali}</li>
                                                ))}
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>                            
                            </div>                                             
                        </div>
                        <div className='flex gap-20 justify-start'>
                            <div className='w-[50%] pr-10'>
                                <Label>Required Files</Label>
                                <Accordion type="single" collapsible>
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger className='no-underline'>
                                            <div className='w-[100%] flex gap-2 items-center'>
                                                <div className='w-[100%]'>
                                                    <Popover open={open} onOpenChange={setOpen}>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            aria-expanded={open}
                                                            className="w-[100%] justify-between"
                                                            >
                                                            {comboValue
                                                                ? files.find((file) => file.id === comboValue)?.name
                                                                : "Select existing file..."}
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-[100%] p-0">
                                                            <Command>
                                                            <CommandInput placeholder="Search files..." />
                                                            <CommandList>
                                                                <CommandEmpty>No framework found.</CommandEmpty>
                                                                <CommandGroup>
                                                                {files.map((framework) => (
                                                                    <CommandItem
                                                                    key={framework.id}
                                                                    value={framework.name}
                                                                    data-role={framework}
                                                                    onSelect={(currentValue) => {
                                                                        setComboValue((prev) => (prev === framework.id ? null : framework.id))
                                                                        setOpen(false)
                                                                    }}
                                                                    >
                                                                    <Check
                                                                        className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        comboValue === framework.id ? "opacity-100" : "opacity-0"
                                                                        )}
                                                                    />
                                                                    {framework.name}
                                                                    </CommandItem>
                                                                ))}
                                                                </CommandGroup>
                                                            </CommandList>
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                                <Button type='button' className='bg-[#0F2554] w-8 h-8 text-white' onClick={() => addExistingFile()}>
                                                    <Plus size={20}></Plus>
                                                </Button>
                                                <Button type='button' className=' w-8 h-8' onClick={() => setExistingFiles([])}>
                                                    <Eraser size={20}></Eraser>
                                                </Button>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className='flex justify-evenly'>
                                                <div className='py-2'>
                                                    <Label>Existing Files</Label>
                                                    <ul className="list-disc">
                                                        {existingFiles.map((file) => (
                                                        <li key={file.id}>{file.name}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className='p-2'>
                                                    <Label>New Files</Label>
                                                    <ul className="list-disc">
                                                        {newFiles.map((file, index) => (
                                                        <li key={index}>{file}</li>
                                                        ))}
                                                    </ul>
                                                </div>                              
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion> 
                                <div className='w-[97%] flex gap-2 items-center'>
                                    <Input type='text' placeholder='add new files here' value={newFileInput} onChange={(e) => setFileInput(e.target.value)}></Input>
                                    <Button type='button' className='bg-[#0F2554] w-8 h-8 text-white' onClick={() => addNewFile(newFileInput)}>
                                        <Plus size={20}></Plus>
                                    </Button>
                                    <Button type='button' className=' w-8 h-8' onClick={() => setNewFiles([])}>
                                        <Eraser size={20}></Eraser>
                                    </Button>
                                </div>                           
                            </div>                                                                    
                        </div>
                        <div className='flex justify-end px-10 mt-10'>
                            <Button className='bg-[#0F2554] p-5 text-white' type="submit">Submit</Button>
                        </div>                  
                    </Card>
                </form>            
            </Form>
        </div>
    )
}