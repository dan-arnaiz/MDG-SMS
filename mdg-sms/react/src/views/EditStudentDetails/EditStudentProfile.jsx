import { useState, useEffect, useRef } from 'react';
import { Form, FormItem } from '@/components/ui/form';
import { useForm, Controller } from 'react-hook-form'; // Import useForm
import { useNavigate, useParams} from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod'; // Import zodResolver
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { z } from 'zod';
import { Toaster } from "@/components/ui/sonner";  
import { useToast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
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
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table" 
import { Label } from '@/components/ui/label';
import axiosClient from "../../axios-client.js";
import ReviewModal from '../../components/dialogs/ReviewModal.jsx';
import { useStateContext } from '../../contexts/ContextProvider.jsx'; // Import the context
import { DialogClose } from '@radix-ui/react-dialog';
import { Check, LucideSquareBottomDashedScissors } from 'lucide-react';


const formSchema = z.object({
    prevSchool: z.string().min(2),
    prevSchoolLandline: z.string().min(7,'Invalid phone number').max(8,'Invalid phone number').optional().or(z.literal('')),
    prevSchoolEmail: z.string().email(),
    studentNo: z.string().length(10),
    firstName: z.string().min(2),
    middleName: z.string().optional(),
    lastName: z.string().min(2),
    suffix: z.string().optional(),
    dob: z.preprocess((arg) => new Date(arg), z.date().max(new Date(), 'Invalid Date')),
    program: z.string().min(2),
    year: z.string().min(2),
});

export default function EditStudentProfile() {

    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const [programs, setPrograms] = useState([]);
    const [years, setYears] = useState([]);
    const {user} = useStateContext();


    useEffect(() => {
            loadFirstResources();
            loadStudent();
    }, []);

    const loadFirstResources = () => {
        axiosClient.get('/addstudent')
        .then((response) => {
            setPrograms(response.data.programs);
            setYears(response.data.years);
            console.log(response.data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    } 
    
    const loadStudent = () => {
        axiosClient.get(`/editstudentprofile/${id}`)
        .then((response) => {
            console.log("Profile data:", response.data.profile);
            reset(response.data.profile);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }

    const navigate = useNavigate();

    const addSibling = () => {
        const { firstName, middleName, lastName, suffix, dob, educationalAttainment } =
      siblingInput;

      if (
        firstName === "" ||
        lastName === "" ||
        dob === "" ||
        educationalAttainment === ""
      ) {
        alert("Please fill in all fields.");
        return;
      }
  
      const duplicate = siblings.find(
        (sibling) =>
          sibling.firstName === firstName &&
          sibling.lastName === lastName &&
          sibling.suffix === suffix &&
          sibling.dob === dob
      );
      if (duplicate) {
        alert("This sibling already exists.");
        return;
      }

      setSiblings([
        ...siblings,
        {
            firstName,
            middleName,
            lastName,
            suffix,
            dob,
            educationalAttainment,
        },
    ]);
      setSiblingInput({
        firstName: "",
        middleName: "",
        lastName: "",
        suffix: "",
        dob: "",
        educationalAttainment: "",
      });

      setOpen(false);
    };

    const { register, handleSubmit, setValue, reset, formState: { errors, isSubmitting, isDirty }, trigger, getValues } = useForm({
            resolver: zodResolver(formSchema),
            defaultValues: {
                addressSimilarity: false,
              },
    });


    const handleProgramChange = (programName) => {

        setValue('program',programName, { shouldDirty: true });
        trigger('program');
    }

    const handleYearChange = (yearName) => {

        setValue('year',yearName, { shouldDirty: true });
        trigger('year');

    }

    const onSubmit = async (data) => {

        if (!isDirty) {
            alert('No new details were detected...')
            navigate(-1); // Go back if no fields are dirty
            return;
        }

        const programId = programs.find((p) => p.name === data?.program)?.id;
        const yearId = years.find((y) => y.name === data?.year)?.id;

        const payload = {
            prevSchool: data?.prevSchool,
            prevSchoolLandline: data?.prevSchoolLandline,
            prevSchoolEmail: data?.prevSchoolEmail,
            studentNo: data?.studentNo,
            program: programId,
            year: yearId,
            firstName: data?.firstName,
            middleName: data?.middleName,
            lastName: data?.lastName,
            suffix: data?.suffix,
            dob: data?.dob
        };

        try {
            await axiosClient.put(`/editstudentprofile/${id}`, payload);
            alert(`Student ${id} successfully updated!`);
            navigate(`/students/${data.studentNo}`); // Fix: Use `data.studentNo`
        } catch (err) {
            console.error("Update failed:", err.response?.data || err.message);
        }       
    }
  
    return (
        <div className="main">
            <div className="header-toolbar">
                <h1 className="text-black font-bold font-sans text-lg pt-1">Add Student</h1>
                <Button className="hover:bg-slate-500 border hover:black hover:text-white" onClick={() => window.history.back()}>Cancel</Button>
            </div>
            <Form>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>                               
                    <Card>
                        <CardHeader>
                            <CardTitle>Previous School</CardTitle>                    
                        </CardHeader>
                        <CardContent className='flex flex-col gap-5'>                        
                            <FormItem>      
                                <Label>Previous School</Label>                 
                                <Input disabled={isSubmitting} type="text" {...register("prevSchool")} className={`w-[100%] mb-3 ${errors.prevSchool ? 'border-red-500' : ''}`}/>
                            </FormItem>
                            <div className='flex flex-row gap-[10%]'>
                                <FormItem>
                                    <Label>Landline</Label>
                                    <Input disabled={isSubmitting} type="text" {...register("prevSchoolLandline")} className={`w-[100%] mb-3 ${errors.prevSchoolLandline ? 'border-red-500' : ''}`}/>
                                    {errors.prevSchoolLandline && <p className="text-red-500 text-[10px] italic">{errors.prevSchoolLandline.message}</p>}
                                </FormItem>
                                <FormItem className='w-[100%]'>
                                    <Label>Email</Label>
                                    <Input disabled={isSubmitting} type="email" {...register('prevSchoolEmail')} className={`w-[100%] mb-3 ${errors.prevSchoolEmail ? 'border-red-500' : ''}`}/>
                                    {errors.prevSchoolEmail && <p className="text-red-500 text-[10px] italic">{errors.prevSchoolEmail.message}</p>}
                                </FormItem>
                            </div>                                                                          
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Organization Information</CardTitle>
                        </CardHeader>
                        <CardContent className='flex flex-col gap-[20px]'>
                            <div className='flex flex-row gap-[10%]'>
                                <FormItem className='w-[45%]'>
                                    <Label>MMCM Student No.</Label>
                                    <Input disabled={isSubmitting} type="text" {...register('studentNo')} className={`w-[100%] mb-3 ${errors.studentNo ? 'border-red-500' : ''}`}/>
                                    {errors.studentNo && <p className="text-red-500 text-[10px] italic">{errors.studentNo.message}</p>}
                                </FormItem>
                            </div>               
                            <div className='flex flex-row gap-[10%]'>
                                <FormItem className='w-[50%]'>
                                    <Select value={getValues('program')} disabled={isSubmitting} onValueChange={(value) => handleProgramChange(value)}>
                                        <SelectTrigger className={`w-[100%] mb-3 ${errors.program ? 'border-red-500' : ''}`}>
                                            <SelectValue placeholder='Select your Program'></SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>  
                                            {programs.map((program, index) => (
                                                        <SelectItem key={index} value={program.name}>
                                                            {program.name}
                                                        </SelectItem>
                                                    ))}                                          
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                                <FormItem className='w-[50%]'>
                                    <Select value={getValues('year')} disabled={isSubmitting} onValueChange={(value) => handleYearChange(value)}>
                                        <SelectTrigger className={`w-[100%] mb-3 ${errors.year ? 'border-red-500' : ''}`}>
                                            <SelectValue placeholder='Select your Year Level'></SelectValue>
                                        </SelectTrigger>
                                        <SelectContent> 
                                            {years.map((year, index) => (
                                                    <SelectItem key={index} value={year.name}>
                                                        {year.name}
                                                    </SelectItem>
                                                ))}                                          
                                        </SelectContent>
                                    </Select>
                                </FormItem>                               
                            </div>                                      
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