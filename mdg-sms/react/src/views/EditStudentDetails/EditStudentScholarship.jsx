import { useState, useEffect, useRef } from 'react';
import { Form, FormItem } from '@/components/ui/form';
import { useForm, Controller } from 'react-hook-form'; // Import useForm
import { useNavigate, useParams } from 'react-router-dom';
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
    scholarship: z.string().min(2),
    status: z.string().min(2),
});

export default function EditStudentScholarship() {

    const { id } = useParams();
    const [scholarships, setScholarships] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const {user} = useStateContext();

    useEffect(() => {
            loadFirstResources();
            loadStudent();
    }, []);

    const loadFirstResources = () => {

        axiosClient.get('/editstudentscholarship')
        .then((response) => {
            setScholarships(response.data.scholarships);
            setStatuses(response.data.statuses);
            console.log(response.data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }   

    const loadStudent = () => {

        axiosClient.get(`/editstudentscholarship/${id}`)
        .then(({ data }) => {
            reset({
                scholarship: data.scholarship || "",
                status: data.status || ""
            });
        })
        .catch(error => {
            setError(error.response?.data?.message || "An error occurred");
            console.log(error);
        });
    }

    const { register,reset, handleSubmit, getValues, setValue, setError, formState: { errors, isSubmitting, isDirty }, trigger } = useForm({
            resolver: zodResolver(formSchema),
    });

    const handleScholarshipChange = (scholarshipName) => {

        setValue('scholarship', scholarshipName, { shouldDirty: true });
        trigger('scholarship');

    };

    const handleStatusChange = (statusName) => {

        setValue('status',statusName, { shouldDirty: true });
        trigger('status');
    };

    const navigate = useNavigate();

    const onSubmit = async (data) => {

        if (!isDirty) {
            navigate(-1); // Go back if no fields are dirty
            return;
        }

        const scholarshipId = scholarships.find((s) => s.name === data?.scholarship)?.id; 
        const statusId = statuses.find((s) => s.name === data?.status)?.id; 

        const payload ={
            scholarship: scholarshipId,
            status: statusId 
        }

        console.log('payload: ',payload, id);

        try {
            await axiosClient.put(`/editstudentscholarship/${id}`, payload);
            alert(`Student ${id} scholarship successfully updated!`);
            navigate(`/students/${id}`); // Fix: Use `data.studentNo`
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
                            <CardTitle>Scholarship</CardTitle>                    
                        </CardHeader>
                        <CardContent className='flex flex-col gap-5'>                                               
                            <FormItem>                     
                                <Select value={getValues('scholarship')} disabled={isSubmitting} onValueChange={(value) => handleScholarshipChange(value)}>
                                    <SelectTrigger className={`w-[100%] mb-3 ${errors.scholarship ? 'border-red-500' : ''}`}>
                                        <SelectValue placeholder="Select a Scholarship"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {scholarships.map((scholarships, index) => (
                                            <SelectItem key={index} value={scholarships.name} disabled={scholarships.is_full}>
                                                <div className='flex w-full justify-between items-center'>
                                                    <span className={scholarships.is_full ? "text-gray-400" : ""}>{scholarships.name}</span>
                                                    <div className='flex flex-row ml-[100px]'>
                                                        <span className={scholarships.is_full ? "text-gray-400" : ""}>{scholarships.taken_slots}</span>
                                                        <span className={scholarships.is_full ? "text-gray-400" : ""}>/</span>
                                                        <span className={scholarships.is_full ? "text-gray-400" : ""}>{scholarships.max_slots}</span>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>                           
                                </Select>                                
                            </FormItem>
                            <FormItem>                     
                                <Select value={getValues('status')} disabled={isSubmitting} onValueChange={(value) => handleStatusChange(value)}>
                                    <SelectTrigger className={`w-[100%] mb-3 ${errors.scholarship ? 'border-red-500' : ''}`}>
                                        <SelectValue placeholder="Select a Status"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statuses.map((status, index) => (
                                            <SelectItem key={index} value={status.name}>{status.name}</SelectItem>
                                        ))}
                                    </SelectContent>                           
                                </Select>                                
                            </FormItem>                         
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