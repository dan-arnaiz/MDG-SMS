import { useState, useEffect, useRef } from 'react';
import { Form, FormItem } from '@/components/ui/form';
import { useForm, Controller } from 'react-hook-form'; // Import useForm
import { useNavigate } from 'react-router-dom';
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
import axiosClient from "../axios-client.js";
import ReviewModal from '../components/dialogs/ReviewModal.jsx';
import { useStateContext } from '../contexts/ContextProvider.jsx'; // Import the context
import { DialogClose } from '@radix-ui/react-dialog';
import { Check, LucideSquareBottomDashedScissors } from 'lucide-react';


const noMailingSchema = z.object({
    prevSchool: z.string().min(2),
    prevSchoolLandline: z.string().min(7,'Invalid phone number').max(8,'Invalid phone number').optional().or(z.literal('')),
    prevSchoolEmail: z.string().email(),
    studentNo: z.string().length(10),
    studentEmail: z.string().email().min(10),
    firstName: z.string().min(2),
    middleName: z.string().optional(),
    lastName: z.string().min(2),
    suffix: z.string().optional(),
    dob: z.preprocess((arg) => new Date(arg), z.date().max(new Date(), 'Invalid Date')),
    email: z.string().email(),
    mobileNum: z.string().length(11, 'Invalid phone number'),
    landline: z.string().min(7).min(7,'Invalid phone number').max(8,'Invalid phone number').optional().or(z.literal('')),
    permHouse: z.string().min(2).max(200),
    permStreet: z.string().min(2),
    permZip: z.string().length(4, 'Invalid Zip Code'),
    mailHouse: z.string().max(200).optional(),
    mailStreet: z.string().optional(),
    mailZip: z.string().length(4, 'Invalid Zip Code').optional().or(z.literal('')),
    fatherFirstName: z.string().min(2).optional().or(z.literal('')),
    fatherMiddleName: z.string().min(2).optional().or(z.literal('')),
    fatherLastName: z.string().min(2).optional().or(z.literal('')),
    fatherSuffix: z.string().min(2).optional().or(z.literal('')),
    fatherEmail: z.string().email().or(z.literal("")).optional(),
    fatherMobileNum: z.string().length(11, 'Invalid phone number').optional().or(z.literal('')),
    fatherLandline: z.string().min(7,'Invalid phone number').max(8,'Invalid phone number').optional().or(z.literal('')),
    fatherOfficeNo: z.string().length(11, 'Invalid phone number').optional().or(z.literal('')),
    fatherOccupation: z.string().min(2).optional().or(z.literal('')),
    motherFirstName: z.string().min(2).optional().or(z.literal('')),
    motherMiddleName: z.string().min(2).optional().or(z.literal('')),
    motherLastName: z.string().min(2).optional().or(z.literal('')),
    motherSuffix: z.string().min(2).optional().or(z.literal('')),
    motherEmail: z.string().email().or(z.literal("")).optional(),
    motherMobileNum: z.string().length(11, 'Invalid phone number').optional().or(z.literal('')),
    motherLandline: z.string().min(7,'Invalid phone number').max(8,'Invalid phone number').optional().or(z.literal('')),
    motherOccupation: z.string().min(2).optional().or(z.literal('')),
    motherOfficeNo: z.string().length(11, 'Invalid phone number').optional().or(z.literal('')),
    scholarship: z.number().min(1),
    program: z.number().min(1),
    year: z.number().min(1),
    academicYear: z.number().min(1),
    semester: z.number().min(1),
    provinceP: z.number().min(1),
    cityP: z.number().min(1),
    barangayP: z.number().min(1),
    provinceM: z.number().optional(),
    cityM: z.number().optional(),
    barangayM: z.number().optional(),
    addressSimilarity: z.literal(true),
});

const MailingSchema = noMailingSchema.extend({
    mailHouse: z.string().min(2),  // Required for mailing
    mailStreet: z.string().min(2),
    mailZip: z.string().min(2),
    provinceM: z.number().min(1),
    cityM: z.number().min(1),
    barangayM: z.number().min(1),
    addressSimilarity: z.literal(false),
});

const formSchema = z.discriminatedUnion('addressSimilarity', [
        MailingSchema,
        noMailingSchema,
]);

export default function AddStudent() {

    const [siblings, setSiblings] = useState([]);
    const [siblingInput, setSiblingInput] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        suffix: '',
        dob: '',
        educationalAttainment: '',
    });
    const [scholarships, setScholarships] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [barangays, setBarangays] = useState([]);
    const [cities2, setCities2] = useState([]);
    const [barangays2, setBarangays2] = useState([]);
    const [addressSimilarity, setAddressSimilarity] = useState(false);
    const [files, setFiles] = useState([]);
    const [open, setOpen] = useState(false);
    const [programs, setPrograms] = useState([]);
    const [years, setYears] = useState([]);
    const [academicYears,setAcademicYears] = useState([]);
    const [semesters,setSemesters] = useState([]);
    const {user} = useStateContext();


    useEffect(() => {
            loadFirstResources();
            setAddressSimilarity(false);
        }, []);

    const calculateAge = (dob) => {
      
        const birthDate = new Date(dob);
        const today = new Date();
      
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
      
        // Adjust age if the birthday hasn't occurred yet this year
        if (
          monthDifference < 0 || 
          (monthDifference === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }
      
        return age;
    };

    const loadFirstResources = () => {
        axiosClient.get('/addstudent')
      .then((response) => {
        setScholarships(response.data.scholarships);
        setProvinces(response.data.provinces);
        setPrograms(response.data.programs);
        setYears(response.data.years);
        setAcademicYears(response.data.academicYears);
        setSemesters(response.data.semesters);
        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
    }   

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

    const { register, handleSubmit, setValue, watch, control, setError, formState: { errors, isSubmitting }, trigger } = useForm({
            resolver: zodResolver(formSchema),
            defaultValues: {
                addressSimilarity: false,
              },
    });

    const handleRemoveSibling = (index) => {
        setSiblings((prevSiblings) => prevSiblings.filter((_, i) => i !== index));
    };

    const handleSubmitFile = (index) => {
        setFiles((prevFiles) => {
            const newFiles = [...prevFiles];
            newFiles[index].is_submitted = !newFiles[index].is_submitted;
            return newFiles;
        });
    };

    const handleProvinceChange = (provinceName, addresstype) => {
        const isPermanent = addresstype == 'permanent'

        const provinceId = provinces.find((p) => p.name === provinceName)?.id;

        if(isPermanent){
            setValue('provinceP',provinceId);
            trigger('provinceP');
        } else if (!addressSimilarity){
            setValue('provinceM',provinceId);
            trigger('provinceM');
        }

        if (provinceId) {
            axiosClient.get(`/cities/${provinceId}`)
                .then(response => {
                    if (isPermanent) setCities(response.data);
                    else setCities2(response.data);
                    console.log(response.data);
                })
                .catch(error => console.error('Error fetching cities:', error));
        } else {
            if (isPermanent) setCities([]);
            else setCities2([]);
        }
    };

    const handleCityChange = (cityName, addresstype) => {
        const isPermanent = addresstype === 'permanent';


        let cityId = 0;

        if (isPermanent) {
            cityId = cities.find((c) => c.name === cityName)?.id;
            setValue('cityP',cityId)
            trigger('cityP')
        } else if (!addressSimilarity){
            cityId = cities2.find((c) => c.name === cityName)?.id;
            setValue('cityM',cityId)
            trigger('cityM')
        }


        if (cityId) {
            axiosClient.get(`/barangays/${cityId}`)
                .then(response => {
                    if (isPermanent) setBarangays(response.data);
                    else setBarangays2(response.data);
                    console.log(response.data);
                })
                .catch(error => console.error('Error fetching cities:', error));
        } else {
            if (isPermanent) setBarangays([]);
            else setBarangays2([]);
        }
    };

    const handleBarangayChange = (barangayName,addresstype) => {
        const isPermanent = addresstype === 'permanent';

        let barangayId = 0

        if (isPermanent) {
            barangayId = barangays.find((b) => b.name === barangayName)?.id;
            setValue('barangayP',barangayId)
            trigger('barangayP')
        } else if (!addressSimilarity){
            barangayId = barangays2.find((b) => b.name === barangayName)?.id;
            setValue('barangayM',barangayId)
            trigger('barangayM')
        }
    }

    const handleCheckboxChange = (e) => {
        setAddressSimilarity(!addressSimilarity)

        setValue('addressSimilarity', !addressSimilarity);
        trigger('addressSimilarity');
    };

    const handleScholarshipChange = (scholarshipName) => {
        const scholarshipId = scholarships.find((s) => s.name === scholarshipName)?.id;

        setValue('scholarship', scholarshipId);
        trigger('scholarship');

        if (scholarshipId) {
            axiosClient.get(`/reqfiles/${scholarshipId}`)
                .then(({data}) => {
                    setFiles(data.data);
                    console.log(data);
                })
                .catch(error => console.error('Error fetching cities:', error));
        } else {
            setFiles([]);
        }
    };

    const handleProgramChange = (programName) => {
        const programId = programs.find((p) => p.name === programName)?.id;

        setValue('program',programId);
        trigger('program');
    }

    const handleYearChange = (yearName) => {
        const yearId = years.find((y) => y.name === yearName)?.id;

        setValue('year',yearId);
        trigger('year');

    }

    const handleAcademicYearChange = (acadYearName) => {
        const acadYearId = academicYears.find((a) => a.name === acadYearName)?.id;

        setValue('academicYear',acadYearId);
        trigger('academicYear');
    }

    const handleSemesterChange = (semesterName) => {
        const semesterId = semesters.find((s) => s.name === semesterName)?.id;

        setValue('semester',semesterId);
        trigger('semester');
    }


    const onSubmit = async (data) => {

        let userId = user?.id

        let scholarshipData = {
            prevSchool: data?.prevSchool?.trim(),
            prevSchoolLandline: data?.prevSchoolLandline ? data.prevSchoolLandline.trim() : null,
            prevSchoolEmail: data?.prevSchoolEmail?.toLowerCase().trim(),
            scholarship: data?.scholarship,
        };

        let organization = {
            studentNo: data?.studentNo?.trim(),
            studentEmail: data?.studentEmail?.trim(),
            program: data?.program,
            year: data?.year,
            academicYear: data?.academicYear,
            semester: data?.semester,
        }

        let personal = {
            firstName: data?.firstName,
            middleName: data?.middleName?.trim(),
            lastName: data?.lastName?.trim(),
            suffix: data?.suffix?.trim() === "" ? null : data?.suffix?.trim(),
            dob: data?.dob ? new Date(data.dob).toISOString().split('T')[0] : null,
            email: data?.email?.trim(),
            mobileNum: data?.mobileNum?.trim(),
            landline: data?.landline?.trim() === "" ? null : data?.landline?.trim(),
        }

        let permAddress = {
            houseBlockUnitNo: data?.permHouse,
            street: data?.permStreet,
            zipCode: data?.permZip?.trim(),
            barangay: data?.barangayP
        }

        let sameAddress = addressSimilarity;

        let mailAddress = null;

        if (!addressSimilarity){

            mailAddress = {
                houseBlockUnitNo: data?.mailHouse,
                street: data?.mailStreet,
                zipCode: data?.mailZip?.trim(),
                barangay: data?.barangayM
            }
        }

        let father = {
            firstName: data?.fatherFirstName,
            middleName: data?.fatherMiddleName,
            lastName: data?.fatherLastName,
            suffix: data?.fatherSuffix?.trim() === "" ? null : data?.fatherSuffix?.trim(),
            email: data?.fatherEmail,
            mobileNum: data?.fatherMobileNum,
            landline: data?.fatherLandline?.trim() === "" ? null : data?.fatherLandline?.trim(),
            occupation: data?.fatherOccupation,
            officeNo: data?.fatherOfficeNo?.trim() === "" ? null : data?.fatherOfficeNo?.trim(),           
        }

        let mother = {
            firstName: data?.motherFirstName,
            middleName: data?.motherMiddleName,
            lastName: data?.motherLastName,
            suffix: data?.motherSuffix?.trim() === "" ? null : data?.motherSuffix?.trim(),
            email: data?.motherEmail,
            mobileNum: data?.motherMobileNum,
            landline: data?.motherLandline?.trim() === "" ? null : data?.motherLandline?.trim(),
            occupation: data?.motherOccupation,
            officeNo: data?.motherOfficeNo?.trim() === "" ? null : data?.motherOfficeNo?.trim(),
        }

        if (Object.values(father).every(value => value == null || value === "")) {
            father = null; // Exclude father if all fields are empty or null
        }
    
        if (Object.values(mother).every(value => value == null || value === "")) {
            mother = null; // Exclude mother if all fields are empty or null
        }

        let siblingsData = siblings;

        let filesData = files;

        const payload ={
            userId,
            scholarshipData,
            organization,
            personal,
            permAddress,
            sameAddress,
            mailAddress,
            father,
            mother,
            siblingsData,
            filesData,           
        }

        console.log(payload);

        try{
            await axiosClient.post('/addstudent', payload)
            alert('Student successfully added!')
            navigate('/students');
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
                            <FormItem>                     
                                <Select disabled={isSubmitting} onValueChange={(value) => handleScholarshipChange(value)}>
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
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Organization Information</CardTitle>
                        </CardHeader>
                        <CardContent className='flex flex-col gap-[20px]'>
                            <div className='flex flex-row gap-[10%]'>
                                <FormItem className='w-[50%]'>
                                    <Label>MMCM Student No.</Label>
                                    <Input disabled={isSubmitting} type="text" {...register('studentNo')} className={`w-[100%] mb-3 ${errors.studentNo ? 'border-red-500' : ''}`}/>
                                    {errors.studentNo && <p className="text-red-500 text-[10px] italic">{errors.studentNo.message}</p>}
                                </FormItem>
                                <FormItem className='w-[50%]'>
                                    <Label>School Email</Label>
                                    <Input disabled={isSubmitting} type="email" {...register('studentEmail')} className={`w-[100%] mb-3 ${errors.studentEmail ? 'border-red-500' : ''}`}/>
                                    {errors.studentEmail && <p className="text-red-500 text-[10px] italic">{errors.studentEmail.message}</p>}
                                </FormItem>
                            </div>               
                            <div className='flex flex-row gap-[10%]'>
                                <FormItem className='w-[50%]'>
                                    <Select disabled={isSubmitting} onValueChange={(value) => handleProgramChange(value)}>
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
                                    <Select disabled={isSubmitting} onValueChange={(value) => handleYearChange(value)}>
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
                            <div className='flex flex-row gap-[10%]'>
                                <FormItem className='w-[50%]'>
                                    <Select disabled={isSubmitting} onValueChange={(value) => handleAcademicYearChange(value)}>
                                        <SelectTrigger className={`w-[100%] mb-3 ${errors.academicYear ? 'border-red-500' : ''}`}>
                                            <SelectValue placeholder='Select Academic Year'></SelectValue>
                                        </SelectTrigger>
                                        <SelectContent> 
                                            {academicYears.map((year, index) => (
                                                    <SelectItem key={index} value={year.name}>
                                                        {year.name}
                                                    </SelectItem>
                                                ))}                                          
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                                <FormItem className='w-[50%]'>
                                    <Select disabled={isSubmitting} onValueChange={(value) => handleSemesterChange(value)}>
                                        <SelectTrigger className={`w-[100%] mb-3 ${errors.semester ? 'border-red-500' : ''}`}>
                                            <SelectValue placeholder='Select Semester'></SelectValue>
                                        </SelectTrigger>
                                        <SelectContent> 
                                            {semesters.map((semester, index) => (
                                                    <SelectItem key={index} value={semester.name}>
                                                        {semester.name}
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
                            <FormItem>
                                <Label>Personal Email</Label>
                                <Input disabled={isSubmitting} type="email" {...register('email')} className={`w-[100%] mb-3 ${errors.email ? 'border-red-500' : ''}`}/>
                                {errors.email && <p className="text-red-500 text-[10px] italic">{errors.email.message}</p>}
                            </FormItem>
                            <div className='flex flex-row gap-[10%] w-[100%]'>
                                <FormItem className='w-[50%]'>
                                    <Label>Mobile Number</Label>
                                    <Input disabled={isSubmitting} type="text" {...register('mobileNum')} className={`w-[100%] mb-3 ${errors.mobileNum ? 'border-red-500' : ''}`}/>
                                    {errors.mobileNum && <p className="text-red-500 text-[10px] italic">{errors.mobileNum.message}</p>}
                                </FormItem>
                                <FormItem className='w-[50%]'>
                                    <Label>Landline Number</Label>
                                    <Input disabled={isSubmitting} type="text" {...register('landline')} className={`w-[100%] mb-3 ${errors.landline ? 'border-red-500' : ''}`}/>
                                    {errors.landline && <p className="text-red-500 text-[10px] italic">{errors.landline.message}</p>}            
                                </FormItem>
                            </div>                       
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Permanent Address</CardTitle>
                        </CardHeader>
                        <CardContent className='flex flex-col gap-5'>
                            <FormItem>
                                <Label>House/Block/Unit No.</Label>
                                <Input disabled={isSubmitting} type="text" {...register('permHouse')} className={`w-[100%] mb-3 ${errors.permHouse ? 'border-red-500' : ''}`}/>
                                {errors.permHouse && <p className="text-red-500 text-[10px] italic">{errors.permHouse.message}</p>}
                            </FormItem>
                            <FormItem>
                                <Label>Street</Label>
                                <Input disabled={isSubmitting} type="text" {...register('permStreet')} className={`w-[100%] mb-3 ${errors.permStreet ? 'border-red-500' : ''}`}/>                 
                            </FormItem> 
                            <FormItem>
                                <Label>Province</Label>
                                <Select disabled={isSubmitting} onValueChange={(value) => handleProvinceChange(value, 'permanent')}>
                                        <SelectTrigger className={`w-[100%] mb-3 ${errors.provinceP ? 'border-red-500' : ''}`}>
                                            <SelectValue placeholder="Select Province" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {provinces.map((provinces, index) => (
                                                <SelectItem key={index} value={provinces.name}>
                                                    {provinces.name}
                                                </SelectItem>
                                            ))}                           
                                        </SelectContent>
                                </Select>
                            </FormItem>                    
                            <FormItem>
                                <Label>City</Label>
                                <Select disabled={isSubmitting} onValueChange={(value) => handleCityChange(value, 'permanent')}>
                                    <SelectTrigger className={`w-[100%] mb-3 ${errors.cityP ? 'border-red-500' : ''}`}>
                                        <SelectValue placeholder="Select City" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {cities.map((cities, index) => (
                                                    <SelectItem key={index} value={cities.name}>
                                                        {cities.name}
                                                    </SelectItem>
                                                ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>                       
                            <FormItem>
                                <Label>Barangay</Label>
                                <Select disabled={isSubmitting} onValueChange={(value) => handleBarangayChange(value, 'permanent')}>
                                    <SelectTrigger className={`w-[100%] mb-3 ${errors.barangayP ? 'border-red-500' : ''}`}>
                                        <SelectValue placeholder="Select Barangay" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {barangays.map((barangays, index) => (
                                                        <SelectItem key={index} value={barangays.name}>
                                                            {barangays.name}
                                                        </SelectItem>
                                                    ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                            <div>
                                <Label>Zip Code</Label>
                                <div className='flex flex-row gap-[10%] justify-between'>
                                    <FormItem>                               
                                        <Input disabled={isSubmitting} type="text" {...register('permZip')} {...register('permZip')} className={`w-[100%] mb-3 ${errors.permZip ? 'border-red-500' : ''}`}  />
                                        {errors.permZip && <p className="text-red-500 text-[10px] italic">{errors.permZip.message}</p>}
                                    </FormItem>
                                    <div className='flex flex-row gap-3 text-center'>
                                        <Checkbox disabled={isSubmitting} onClick={handleCheckboxChange}></Checkbox>
                                        <Label>Use permanent address as mailing address</Label>
                                    </div>
                                </div>                                                                        
                            </div>                        
                        </CardContent>
                    </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Mailing Address</CardTitle>
                            </CardHeader>
                            <CardContent className='flex flex-col gap-5'>
                                <FormItem>
                                    <Label>House/Block/Unit No.</Label>
                                    <Input disabled={addressSimilarity || isSubmitting} type="text" {...register('mailHouse')} className={`w-[100%] mb-3 ${errors.mailHouse ? 'border-red-500' : ''}`}/>
                                    {errors.mailHouse && <p className="text-red-500 text-[10px] italic">{errors.mailHouse.message}</p>}                
                                </FormItem>
                                <FormItem>
                                    <Label>Street</Label>
                                    <Input disabled={addressSimilarity || isSubmitting} type="text" {...register('mailStreet')}  className={`w-[100%] mb-3 ${errors.mailStreet ? 'border-red-500' : ''}`}/>
                                </FormItem>  
                                <FormItem>
                                    <Label>Province</Label>
                                    <Select disabled={addressSimilarity || isSubmitting}  onValueChange={(value) => handleProvinceChange(value, 'mailing')}>
                                            <SelectTrigger className={`w-[100%] mb-3 ${errors.provinceM ? 'border-red-500' : ''}`}>
                                                <SelectValue placeholder="Select Province" />
                                            </SelectTrigger>
                                            <SelectContent>                                       
                                                {provinces.map((provinces, index) => (
                                                    <SelectItem key={index} value={provinces.name}>
                                                        {provinces.name}
                                                    </SelectItem>
                                                ))}                           
                                            </SelectContent>
                                    </Select>
                                </FormItem>                   
                                <FormItem>
                                    <Label>City</Label>
                                    <Select disabled={addressSimilarity || isSubmitting} onValueChange={(value) => handleCityChange(value, 'mailing')}>
                                        <SelectTrigger className={`w-[100%] mb-3 ${errors.cityM ? 'border-red-500' : ''}`}>
                                            <SelectValue placeholder="Select City" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {cities2.map((cities2, index) => (
                                                        <SelectItem key={index} value={cities2.name}>
                                                            {cities2.name}
                                                        </SelectItem>
                                                    ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>                      
                                <FormItem>
                                    <Label>Barangay</Label>
                                    <Select disabled={addressSimilarity || isSubmitting} onValueChange={(value) => handleBarangayChange(value, 'mailing')}>
                                        <SelectTrigger className={`w-[100%] mb-3 ${errors.barangayM ? 'border-red-500' : ''}`}>
                                            <SelectValue placeholder="Select Barangay" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {barangays2.map((barangays2, index) => (
                                                            <SelectItem key={index} value={barangays2.name}>
                                                                {barangays2.name}
                                                            </SelectItem>
                                                        ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                                <div>
                                    <Label>Zip Code</Label>
                                    <div className='flex flex-row gap-[10%] justify-between'>
                                        <FormItem>                               
                                            <Input disabled={addressSimilarity || isSubmitting} type="text" {...register('mailZip')} className={`w-[100%] mb-3 ${errors.mailZip ? 'border-red-500' : ''}`} />
                                            {errors.mailZip && <p className="text-red-500 text-[10px] italic">{errors.mailZip.message}</p>} 
                                        </FormItem>
                                    </div>                                                                        
                                </div>                        
                            </CardContent>
                        </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Family Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <Label className='text-bottom'>Father</Label>
                                <div className='m-5'>
                                    <FormItem>
                                        <Label>First Name</Label>
                                        <Input disabled={isSubmitting} type="text" {...register('fatherFirstName')} className={`w-[100%] mb-3 ${errors.fatherFirstName ? 'border-red-500' : ''}`}/>
                                    </FormItem>
                                    <FormItem>
                                        <Label>Middle Name</Label>
                                        <Input disabled={isSubmitting} type="text" {...register('fatherMiddleName')} className={`w-[100%] mb-3 ${errors.fatherMiddleName ? 'border-red-500' : ''}`}/>
                                    </FormItem>
                                    <FormItem>
                                        <Label>Last Name</Label>
                                        <Input disabled={isSubmitting} type="text" {...register('fatherLastName')} className={`w-[100%] mb-3 ${errors.fatherLastName ? 'border-red-500' : ''}`}/>
                                    </FormItem>
                                    <div className='flex flex-row gap-[10%]'>
                                        <FormItem>
                                            <Label>Suffix</Label>
                                            <Input disabled={isSubmitting} type="text" {...register('fatherSuffix')} className={`w-[100%] mb-3 ${errors.fatherSuffix ? 'border-red-500' : ''}`}/>
                                        </FormItem>
                                    </div>                      
                                    <FormItem>
                                        <Label>Personal Email</Label>
                                        <Input disabled={isSubmitting} type="email" {...register('fatherEmail')} className={`w-[100%] mb-3 ${errors.fatherEmail ? 'border-red-500' : ''}`}/>
                                        {errors.fatherEmail && <p className="text-red-500 text-[10px] italic">{errors.fatherEmail.message}</p>} 
                                    </FormItem>
                                    <div className='flex flex-row gap-[10%] w-[100%]'>
                                        <FormItem className='w-[50%]'>
                                            <Label>Mobile Number</Label>
                                            <Input disabled={isSubmitting} type="text" {...register('fatherMobileNum')} className={`w-[100%] mb-3 ${errors.fatherMobileNum ? 'border-red-500' : ''}`}/>
                                            {errors.fatherMobileNum && <p className="text-red-500 text-[10px] italic">{errors.fatherMobileNum.message}</p>} 
                                        </FormItem>
                                        <FormItem className='w-[50%]'>
                                            <Label>Landline Number</Label>
                                            <Input disabled={isSubmitting} type="text" {...register('fatherLandline')} className={`w-[100%] mb-3 ${errors.fatherLandline ? 'border-red-500' : ''}`}/>
                                            {errors.fatherLandline && <p className="text-red-500 text-[10px] italic">{errors.fatherLandline.message}</p>}             
                                        </FormItem>
                                    </div>
                                    <div className='flex flex-row gap-[10%] w-[100%]'>
                                        <FormItem className='w-[50%]'>
                                            <Label>Occupation</Label>
                                            <Input disabled={isSubmitting} type="text" {...register('fatherOccupation')} className={`w-[100%] mb-3 ${errors.fatherOccupation ? 'border-red-500' : ''}`}/>
                                        </FormItem>
                                        <FormItem className='w-[50%]'>
                                            <Label>Office No.</Label>
                                            <Input disabled={isSubmitting} type="text" {...register('fatherOfficeNo')} className={`w-[100%] mb-3 ${errors.fatherOfficeNo ? 'border-red-500' : ''}`}/>
                                            {errors.fatherOfficeNo && <p className="text-red-500 text-[10px] italic">{errors.fatherOfficeNo.message}</p>}            
                                        </FormItem>
                                    </div>
                                </div>                         
                            </div>
                            <div>
                                <Label>Mother</Label>
                                <div className='m-5'>
                                    <FormItem>
                                        <Label>First Name</Label>
                                        <Input disabled={isSubmitting} type="text" {...register('motherFirstName')} className={`w-[100%] mb-3 ${errors.motherFirstName ? 'border-red-500' : ''}`}/>
                                    </FormItem>
                                    <FormItem>
                                        <Label>Middle Name</Label>
                                        <Input disabled={isSubmitting} type="text" {...register('motherMiddleName')} className={`w-[100%] mb-3 ${errors.motherMiddleName? 'border-red-500' : ''}`}/>
                                    </FormItem>
                                    <FormItem>
                                        <Label>Last Name</Label>
                                        <Input disabled={isSubmitting} type="text" {...register('motherLastName')} className={`w-[100%] mb-3 ${errors.motherLastName ? 'border-red-500' : ''}`}/>
                                    </FormItem>
                                    <div className='flex flex-row gap-[10%]'>
                                        <FormItem>
                                            <Label>Suffix</Label>
                                            <Input disabled={isSubmitting} type="text" {...register('motherSuffix')} className={`w-[100%] mb-3 ${errors.motherSuffix ? 'border-red-500' : ''}`}/>
                                        </FormItem>
                                    </div>                      
                                    <FormItem>
                                        <Label>Personal Email</Label>
                                        <Input disabled={isSubmitting} type="email" {...register('motherEmail')} className={`w-[100%] mb-3 ${errors.motherEmail ? 'border-red-500' : ''}`}/>
                                        {errors.motherEmail && <p className="text-red-500 text-[10px] italic">{errors.motherEmail.message}</p>}                
                                    </FormItem>
                                    <div className='flex flex-row gap-[10%] w-[100%]'>
                                        <FormItem className='w-[50%]'>
                                            <Label>Mobile Number</Label>
                                            <Input disabled={isSubmitting} type="text" {...register('motherMobileNum')} className={`w-[100%] mb-3 ${errors.motherMobileNum ? 'border-red-500' : ''}`}/>
                                            {errors.motherMobileNum && <p className="text-red-500 text-[10px] italic">{errors.motherMobileNum.message}</p>}    
                                        </FormItem>
                                        <FormItem className='w-[50%]'>
                                            <Label>Landline Number</Label>
                                            <Input disabled={isSubmitting} type="text" {...register('motherLandline')} className={`w-[100%] mb-3 ${errors.motherLandline ? 'border-red-500' : ''}`}/>
                                            {errors.motherLandline && <p className="text-red-500 text-[10px] italic">{errors.motherLandline.message}</p>}    
                                        </FormItem>
                                    </div>  
                                    <div className='flex flex-row gap-[10%] w-[100%]'>
                                        <FormItem className='w-[50%]'>
                                            <Label>Occupation</Label>
                                            <Input disabled={isSubmitting} type="text" {...register('motherOccupation')} className={`w-[100%] mb-3 ${errors.motherOccupation ? 'border-red-500' : ''}`}/>
                                        </FormItem>
                                        <FormItem className='w-[50%]'>
                                            <Label>Office No.</Label>
                                            <Input disabled={isSubmitting} type="text" {...register('motherOfficeNo')} className={`w-[100%] mb-3 ${errors.motherOfficeNo ? 'border-red-500' : ''}`}/>
                                            {errors.motherOfficeNo && <p className="text-red-500 text-[10px] italic">{errors.motherOfficeNo.message}</p>} 
                                        </FormItem>
                                    </div>                             
                                </div>                           
                            </div>    
                            <div>
                                <Label>Siblings</Label>
                                <div className='m-5'>
                                    <Table className='mb-5 min-h-[100px] rounded-md border-2 border-solid border-grey-100 shadow-sm'>
                                        <TableHeader className=''>
                                            <TableRow>
                                                <TableHead>First Name</TableHead>
                                                <TableHead>Middle Name</TableHead>
                                                <TableHead>Last Name</TableHead>
                                                <TableHead>Suffix</TableHead>
                                                <TableHead>Age</TableHead>
                                                <TableHead>Educational Attainment</TableHead>
                                                <TableHead></TableHead>
                                            </TableRow>                                       
                                        </TableHeader>
                                        <TableBody>
                                            {siblings.length > 0 ? (
                                                siblings.map((sibling, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>{sibling.firstName}</TableCell>
                                                        <TableCell>{sibling.middleName}</TableCell>
                                                        <TableCell>{sibling.lastName}</TableCell>
                                                        <TableCell>{sibling.suffix}</TableCell>
                                                        <TableCell>{calculateAge(sibling.dob)}</TableCell>
                                                        <TableCell>{sibling.educationalAttainment}</TableCell>
                                                        <TableCell>
                                                            <button
                                                                disabled={isSubmitting}
                                                                onClick={() => handleRemoveSibling(index)}
                                                                className='text-red-500 hover:underline'
                                                            >
                                                                Remove
                                                            </button>
                                                        </TableCell>
                                                    </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={8} className='text-center text-gray-500'>
                                                            No siblings added yet.
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                    </Table>
                                    <div className='flex justify-end'>                                      
                                        <Dialog open={open} onOpenChange={setOpen}>    
                                            <DialogTrigger asChild>
                                                <Button disabled={isSubmitting}>Add Sibling</Button>                                       
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Add Sibling</DialogTitle>
                                                </DialogHeader>
                                                <Label>First Name</Label>
                                                <Input value={siblingInput.firstName} onChange={(e) => setSiblingInput({ ...siblingInput, firstName: e.target.value })}/>
                                                <Label>Middle Name</Label>
                                                <Input value={siblingInput.middleName} onChange={(e) => setSiblingInput({ ...siblingInput, middleName: e.target.value })}/>
                                                <Label>Last Name</Label>
                                                <Input value={siblingInput.lastName} onChange={(e) => setSiblingInput({ ...siblingInput, lastName: e.target.value })} />

                                                <div className='flex flex-row gap-[10%]'>
                                                    <div>
                                                        <Label>Suffix</Label>
                                                        <Input  value={siblingInput.suffix} onChange={(e) => setSiblingInput({ ...siblingInput, suffix: e.target.value })} />
                                                    </div>  
                                                    <div>
                                                        <Label>Date of Birth</Label>
                                                        <Input value={siblingInput.dob} type='Date' onChange={(e) => setSiblingInput({ ...siblingInput, dob: e.target.value })}/>
                                                    </div>                                                                                                   
                                                </div>  
                                                <Label>Educational Attainment</Label>
                                                <Input  value={siblingInput.educationalAttainment} onChange={(e) => setSiblingInput({...siblingInput,educationalAttainment: e.target.value,})}/>
                                                <DialogFooter className='flex justify-between'>                                           
                                                    <Button onClick={addSibling} className='w-20'>Add</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                            </div>                   
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Files</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Label>Select submitted required files.</Label>
                            <div className='flex flex-col justify-center p-5'>
                                <ul className='grid grid-cols-2 gap-5'>
                                    {files.map((files, index) => (
                                        <li key={index} value={files.name}>
                                            <div className='flex gap-10'>
                                                <Checkbox disabled={isSubmitting} onClick={() => handleSubmitFile(index)}></Checkbox>
                                                <Label>{files.name}</Label>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>                      
                        </CardContent>
                    </Card>
                    <div className='flex justify-center'>
                        <Button disabled={isSubmitting} type="submit" className='w-[200px] mb-5 bg-white'>
                            {isSubmitting ? "Loading..." : "Submit"}
                        </Button>
                    </div>
                </form>
            </Form>  
    </div>
    );  
}