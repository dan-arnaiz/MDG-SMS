
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import { Form, FormItem } from '@/components/ui/form';
import { useNavigate,useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form'; // Import useForm
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod'; // Import zodResolver
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({

    firstName: z.string().min(2),
    employeeId: z.string().min(10,'Invalid Employee ID. ID must have 10 characters.').max(10,'Invalid Employee ID. ID must have 10 characters.'),
    middleName: z.string().optional(),
    lastName: z.string().min(2),
    suffix: z.string().optional(),
    dob: z.preprocess((arg) => new Date(arg), z.date().max(new Date(), 'Invalid Date')),
    jobTitle: z.string().min(2),
});

export default function AddEmployee() {

    const { id } = useParams();
    const [laoding, setLoading] = useState(false);
    const defaultProfilePic = '/images/default-profile.png';
    const navigate = useNavigate();

    const { register, handleSubmit, setValue, getValues, setError, reset, formState: { errors, isSubmitting, isDirty}, trigger } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            addressSimilarity: false,
        },
    });

    useEffect(() => {

        LoadEmployee();

    }, [])

    const handleRoleChange = (role) => {

        setValue('role',role);
        trigger('role');
    }

    const LoadEmployee = () => {
        axiosClient.get(`/editemployeeprofile/${id}`)
        .then((response) => {
            console.log(response.data);
            reset(response.data);
            setValue('employeeId',id)
        })
        .catch((error) => console.error("Error fetching data:", error));

    }

    const onSubmit = async(data) => {

        if (!isDirty) {
            alert('No new details were detected...')
            navigate(-1); // Go back if no fields are dirty
            return;
        }

        const payload = {
            id: data?.employeeId,
            jobTitle: data?.jobTitle,
            firstName: data?.firstName,
            middleName: data?.middleName?.trim(),
            lastName: data?.lastName?.trim(),
            suffix: data?.suffix?.trim() === "" ? null : data?.suffix?.trim(),
            dob: data?.dob ? new Date(data.dob).toISOString().split('T')[0] : null,
        }
        console.log(payload);

        try{
            await axiosClient.put(`/editemployeeprofile/${id}`, payload)
            alert(`Employee ${id} successfully updated!`)
            navigate(`/employee/${getValues(employeeId)}`);

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
                <h1 className="text-black font-bold font-sans text-lg">Add Employees</h1>   
                <Button onClick = {() => navigate('/employees')}>Back</Button>
            </div>
            <Form>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Organization Details</CardTitle>
                        </CardHeader>
                        <CardContent className='flex flex-col gap-5'>
                            <FormItem>
                                <Label>Employee Id</Label>
                                <Input disabled={isSubmitting} {...register('employeeId')} className={`w-[100%] mb-3 ${errors.employeeId ? 'border-red-500' : ''}`}></Input>
                                {errors.employeeId && <p className="text-red-500 text-[10px] italic">{errors.employeeId.message}</p>} 
                            </FormItem>
                            <FormItem>
                                <Label>Job Title</Label>
                                <Input disabled={isSubmitting} {...register('jobTitle')} className={`w-[100%] mb-3 ${errors.jobTitle ? 'border-red-500' : ''}`}></Input>
                            </FormItem>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                        </CardHeader>
                        <CardContent className='flex flex-col gap-5'>
                            <FormItem>
                                <Label>First Name</Label>
                                <Input disabled={isSubmitting} type="text" {...register('firstName')} className={`w-[100%] mb-3 ${errors.firstName ? 'border-red-500' : ''}`}/>
                            </FormItem>
                            <FormItem>
                                <Label>Middle Name</Label>
                                <Input disabled={isSubmitting} type="text" {...register('middleName')} className={`w-[100%] mb-3 ${errors.middleName ? 'border-red-500' : ''}`}/>
                            </FormItem>
                            <FormItem>
                                <Label>Last Name</Label>
                                <Input disabled={isSubmitting} type="text" {...register('lastName')} className={`w-[100%] mb-3 ${errors.lastName ? 'border-red-500' : ''}`} />
                            </FormItem>
                            <div className='flex flex-row gap-[10%]'>
                                <FormItem>
                                    <Label>Suffix</Label>
                                    <Input disabled={isSubmitting} type="text" {...register('suffix')} className={`w-[100%] mb-3 ${errors.suffix ? 'border-red-500' : ''}`}/>
                                </FormItem>
                                <FormItem>
                                    <Label>Date of Birth</Label>
                                    <Input disabled={isSubmitting} {...register('dob')} type='Date' className={`w-[100%] mb-3 ${errors.dob ? 'border-red-500' : ''}`}/>
                                    {errors.dob && <p className="text-red-500 text-[10px] italic">{errors.dob.message}</p>}            
                                </FormItem>
                            </div>                                         
                        </CardContent>
                    </Card>
                    <div className='flex justify-center'>
                    <Button disabled={isSubmitting} type="submit" className='w-[200px] mb-5 bg-white'>
                        {isSubmitting ? "Loading..." : "Save Changes"}
                    </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}