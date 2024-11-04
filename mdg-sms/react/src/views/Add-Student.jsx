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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import axiosClient from "../axios-client.js";
import ReviewModal from '../components/dialogs/ReviewModal.jsx';
import { useStateContext } from '../contexts/ContextProvider.jsx'; // Import the context

const formSchema = z.object({
    firstName: z.string().min(1, { message: "First Name is required" }), // first_name
    middleName: z.string().optional(), // middle_name
    lastName: z.string().min(1, { message: "Last Name is required" }), // last_name
    suffix: z.string().optional(), // suffix
    dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }), // dob
    email: z.string().email({ message: "Invalid email address" }), // email
    personalEmail: z.string().email({ message: "Invalid email address" }).optional(), // personal_email
    mobileNum: z.string().optional(), // mobile_num
    program: z.string().min(1, { message: "Program is required" }), // program_id
    scholarship: z.string().optional(), // scholarship_id
    scholarshipStatus: z.string().min(1, { message: "Scholarship Status is required" }), // scholarship_status_id
    houseBlockUnitNo: z.string().optional(), // address.house_block_unit_no
    street: z.string().optional(), // address.street
    barangay: z.string().optional(), // address.barangay
    city: z.string().optional(), // address.city
    municipality: z.string().optional(), // address.municipality
    zipCode: z.string().optional(), // address.zip_code
});


export default function AddStudent() {

    const [age, setAge] = useState('');
    const [loading, setLoading] = useState(false);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        // Add your form data here
        firstName: '',
        middleName: '',
        lastName: '',
        suffix: '',
        studentNumber: '',
        yearLevel: '',
        program: '',
        formattedDateOfBirth: '',
        age: '',
        enrollmentStatus: '',
        recentSchoolYear: '',
        scholarshipStatus: '',
        scholarship: '',
        schoolEmail: '',
        personalEmail: '',
        contactNumber: '',
        houseBlockUnitNo: '',
        street: '',
        barangay: '',
        city: '',
        municipality: '',
        zipCode: '',
        profilePic: [],
        defaultProfilePic: 'images/default-profile.png',
    });

    const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema),
    });

    const profilePic = watch('profilePic');
    const defaultProfilePic = '/images/default-profile.png';



    const dateOfBirth = watch('dateOfBirth');
    const formattedDateOfBirth = dateOfBirth ? new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(dateOfBirth)) : '';


    const navigate = useNavigate();
    const { token } = useStateContext();
    
    const { toast } = useToast();

    const handleSameAsPermanent = (event) => {
        if (event.target.checked) {
            setValue('mailingHouseBlockUnitNo', watch('houseBlockUnitNo'));
            setValue('mailingStreet', watch('street'));
            setValue('mailingBarangay', watch('barangay'));
            setValue('mailingCity', watch('city'));
            setValue('mailingMunicipality', watch('municipality'));
            setValue('mailingZipCode', watch('zipCode'));
        } else {
            setValue('mailingHouseBlockUnitNo', '');
            setValue('mailingStreet', '');
            setValue('mailingBarangay', '');
            setValue('mailingCity', '');
            setValue('mailingMunicipality', '');
            setValue('mailingZipCode', '');
        }
    };

    const firstNameRef = useRef();
    const middleNameRef = useRef();
    const lastNameRef = useRef();
    const suffixRef = useRef();
    const dateOfBirthRef = useRef();
    const emailRef = useRef();
    const personalEmailRef = useRef();
    const mobileNumRef = useRef();
    const programRef = useRef();
    const scholarshipRef = useRef();
    const scholarshipStatusRef = useRef();
    const houseBlockUnitNoRef = useRef();
    const streetRef = useRef();
    const barangayRef = useRef();
    const cityRef = useRef();
    const municipalityRef = useRef();
    const zipCodeRef = useRef();

    useEffect(() => {
        // Initialize CSRF token
        axiosClient.get('/sanctum/csrf-cookie').then(response => {
            console.log('CSRF token initialized');
        });

        const savedFormData = localStorage.getItem('formData');
        if (savedFormData) {
            const parsedFormData = JSON.parse(savedFormData);
            Object.keys(parsedFormData).forEach((key) => {
                setValue(key, parsedFormData[key]);
            });
        }
    }, [setValue]);

    const mapFormDataToPayload = () => {
        return {
            first_name: firstNameRef.current.value,
            last_name: lastNameRef.current.value,
            middle_name: middleNameRef.current.value,
            suffix: suffixRef.current.value,
            dob: dateOfBirthRef.current.value,
            email: emailRef.current.value,
            personal_email: personalEmailRef.current.value,
            mobile_num: mobileNumRef.current.value,
            program_id: programRef.current.value,
            scholarship_id: scholarshipRef.current.value,
            scholarship_status_id: scholarshipStatusRef.current.value,
            address: {
                house_block_unit_no: houseBlockUnitNoRef.current.value,
                street: streetRef.current.value,
                barangay: barangayRef.current.value,
                city: cityRef.current.value,
                municipality: municipalityRef.current.value,
                zip_code: zipCodeRef.current.value,
            },
        };
    };
    
    const onSubmit = (ev) => {
        ev.preventDefault();
        console.log('Form submission triggered');
        setLoading(true); // Set loading state
        const payload = mapFormDataToPayload();
        console.log('Payload:', payload);

        axiosClient.post('/students', payload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Include token in headers
            },
        })
        .then(({ data }) => {
            setLoading(false); // Clear loading state
            console.log('Form submitted successfully:', data);
            localStorage.removeItem('formData'); // Clear localStorage
            navigate('/students'); // Redirect to /students route
        })
        .catch((error) => {
            console.error('Error submitting form:', error.response ? error.response.data : error.message);
            setLoading(false); // Clear loading state
            if (error.response && error.response.status === 422) {
                // Handle validation errors
                console.error('Validation errors:', error.response.data.errors);
            }
        });
    };

    const handleReviewSubmit = () => {
        handleSubmit(onSubmit)();
        setIsModalOpen(false);
    };

    useEffect(() => {
        const subscription = watch((value) => {
            localStorage.setItem('formData', JSON.stringify(value));
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    useEffect(() => {
        const savedFormData = localStorage.getItem('formData');
        if (savedFormData) {
            const parsedFormData = JSON.parse(savedFormData);
            Object.keys(parsedFormData).forEach((key) => {
                setValue(key, parsedFormData[key]);
            });
        }
    }, [setValue]);

    

    

    return (
        <div className="main">
            <div className="header-toolbar">
                <h1 className="text-black font-bold font-sans text-lg pt-1">Add Student</h1>
                <Button className="hover:bg-slate-500 border hover:black hover:text-white" onClick={() => window.history.back()}>Cancel</Button>
            </div>
            <Form id="regForm" onSubmit={handleSubmit(onSubmit)}>
                <div className="tab mt-3">
                <input type="hidden" name="csrf-token" value={document.querySelector('meta[name="csrf-token"]').getAttribute('content')} />
                
                    {/* Personal Info  */}
                        <div className="grid grid-cols-2 gap-2">
                            <div className="card-add-student hover:border-blue-200">
                                <h1 className='text-stone-600 text-sm font-semibold'>Personal Information</h1>
                                <div className='pl-5 pt-5 '>
                                    <Label htmlFor="firstname" className="text-black text-xs">First Name</Label>
                                    <FormItem label="first-name">
                                        <Input ref={firstNameRef} type="text" placeholder="First Name" className="w-11/12 mb-3" {...register('firstName')} />
                                        {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName.message}</span>}
                                    </FormItem>
                                    <Label htmlFor="middlename" className="text-black text-xs">Middle Name</Label>
                                    <FormItem label="middle-name">
                                        <Input ref={middleNameRef} type="text" placeholder="Middle Name" className="w-11/12 mb-3" {...register('middleName')} />
                                    </FormItem>
                                    <Label htmlFor="lastname" className="text-black text-xs">Last Name</Label>
                                    <FormItem label="last-name">
                                        <Input ref={lastNameRef} type="text" placeholder="Last Name" className="w-11/12 mb-3" {...register('lastName')} />
                                        {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName.message}</span>}
                                    </FormItem>
                                    <Label htmlFor="suffix" className="text-black text-xs">Suffix</Label>
                                    <FormItem label="Suffix" >
                                        <Select >
                                            <SelectTrigger className="w-auto mb-3" defaultValue="blank">
                                                <SelectValue ref={suffixRef} placeholder="Suffix" />
                                            </SelectTrigger>
                                            <SelectContent>
                                            <SelectGroup className="bg-slate-50">
                                                    <SelectLabel>Select Suffix</SelectLabel>
                                                    <SelectItem value="blank" className="mb-3 hover:bg-slate-200"></SelectItem>
                                                    <SelectItem value="jr" className="mb-2 hover:bg-slate-200">Jr.</SelectItem>
                                                    <SelectItem value="sr" className="mb-2 hover:bg-slate-200">Sr.</SelectItem>
                                                    <SelectItem value="ii" className="mb-2 hover:bg-slate-200">II</SelectItem>
                                                    <SelectItem value="iii" className="mb-2 hover:bg-slate-200">III</SelectItem>
                                                    <SelectItem value="iv" className="mb-2 hover:bg-slate-200">IV</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                    <Label htmlFor="dateofbirth" className="text-black text-xs">Date of Birth</Label>
                                    <FormItem label="dateofbirth">
                                        <Input ref={dateOfBirthRef} type="date" className="w-35 mb-3 text-xs" {...register('dateOfBirth')} />
                                    </FormItem>
                                    <Label htmlFor="age" className="text-black text-xs">Age</Label>
                                    <FormItem label="age">
                                        <Input type="number" className="w-24 mb-3" {...register('age')} />
                                        {errors.age && <span className="text-red-500 text-xs">{errors.age.message}</span>}
                                    </FormItem>
                                </div>

                            <h1 className='text-stone-600 text-sm font-semibold mt-2'>Upload Picture</h1>
                            <div className='pl-5 pt-5 -translate-y-3'>
                                <Label htmlFor="profilePic" className="text-black text-xs mt-4">Profile Picture</Label>
                                <FormItem label="profilePic">
                                    <Input type="file" className="w-11/12 mb-3 border hover:border-blue-500" {...register('profilePic')} />
                                    {errors.profilePic && <span className="text-red-500 text-xs">{errors.profilePic.message}</span>}
                                </FormItem>
                            </div>
                            <div className="place-items-center">
                                <img 
                                    src={profilePic && profilePic.length > 0 ? URL.createObjectURL(profilePic[0]) : defaultProfilePic} 
                                    alt='profile-pic' 
                                    className="w-32 h-32 object-cover border border-black justify-center"
                                />
                            </div>
                            
                            </div>
                            
                            {/* Org Info  */}

                            <div className="grid gap-3 ">
                                <div className=''>
                                    <div className="card-add-student hover:border-blue-200 text-sm">
                                        <h1 className='text-stone-600 text-sm font-semibold'>Student Information</h1>
                                        <div className='pl-5 pt-5'>
                                            <div>
                                                <Label htmlFor="MMCM Student Number" className="text-black text-xs mt-1">Student Number</Label>
                                                <FormItem label="student-number">
                                                    <Input type="text" placeholder="Student Number" className="w-11/12 mb-3" {...register('studentNumber')} />
                                                    {errors.studentNumber && <span className="text-red-500 text-xs">{errors.studentNumber.message}</span>}
                                                </FormItem>
                                                <Label htmlFor="yearlevel" className="text-black text-xs mt-2">Year Level</Label>
                                                <FormItem label="Current Year" className="w-3/5 mb-3">
                                                <Controller
                                                    name="yearLevel"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Select {...field} onValueChange={(value) => field.onChange(value)}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select Year" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup className='bg-slate-50'>
                                                                    <SelectLabel className="text-xs">Junior High School</SelectLabel>
                                                                    <SelectItem value="jhs_grade_7" className="pl-7 hover:bg-slate-200">Grade 7</SelectItem>
                                                                    <SelectLabel className="text-xs">Senior High School</SelectLabel>
                                                                    <SelectItem value="shs_grade_11" className="pl-7 hover:bg-slate-200">Grade 11</SelectItem>
                                                                    <SelectItem value="shs_grade_12" className="pl-7 hover:bg-slate-200">Grade 12</SelectItem>
                                                                    <SelectLabel className="text-xs">College</SelectLabel>
                                                                    <SelectItem value="college_first_year" className="pl-7 hover:bg-slate-200">First Year</SelectItem>
                                                                    <SelectItem value="college_second_year" className="pl-7 hover:bg-slate-200">Second Year</SelectItem>
                                                                    <SelectItem value="college_third_year" className="pl-7 hover:bg-slate-200">Third Year</SelectItem>
                                                                    <SelectItem value="college_fourth_year" className="pl-7 hover:bg-slate-200">Fourth Year</SelectItem>
                                                                    <SelectItem value="college_fifth_year" className="pl-7 hover:bg-slate-200">Fifth Year</SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                />
                                                {errors.yearLevel && <span className="text-red-500 text-xs">{errors.yearLevel.message}</span>}
                                            </FormItem>
                                                <Label htmlFor="program" className="text-black text-xs">Program</Label>
                                                <FormItem label="Program/Strand" className="w-3/5 mb-3">
                                                    <Controller
                                                        name="program"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <Select {...field} onValueChange={(value) => field.onChange(value)}>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue ref={programRef} placeholder="Select Program/Strand" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup className='bg-slate-50'>
                                                                        <SelectLabel className="text-xs">Senior High School</SelectLabel>
                                                                        <SelectItem value="abm" className="pl-10 hover:bg-slate-200">ABM</SelectItem>
                                                                        <SelectItem value="humss" className="pl-10 hover:bg-slate-200">HUMSS</SelectItem>
                                                                        <SelectItem value="stem" className="pl-10 hover:bg-slate-200">STEM</SelectItem>
                                                                        <SelectItem value="arts_design" className="pl-10 hover:bg-slate-200">Arts and Design</SelectItem>
                                                                        <SelectItem value="tvl_ict" className="pl-10 hover:bg-slate-200">TVL-ICT</SelectItem>
                                                                    </SelectGroup>
                                                                    <SelectGroup className='bg-slate-50'>
                                                                        <SelectLabel className="text-xs">College</SelectLabel>
                                                                        <SelectLabel className="text-black pl-5">ATYCB</SelectLabel>
                                                                        <SelectItem value="bs_entrepreneurship" className="pl-10 hover:bg-slate-200">BS Entrepreneurship</SelectItem>
                                                                        <SelectItem value="bs_management_accounting" className="pl-10 hover:bg-slate-200">BS Management Accounting</SelectItem>
                                                                        <SelectItem value="bs_real_estate_management" className="pl-10 hover:bg-slate-200">BS Real Estate Management</SelectItem>
                                                                        <SelectItem value="bs_tourism_management" className="pl-10 hover:bg-slate-200">BS Tourism Management</SelectItem>
                                                                        <SelectItem value="bs_accountancy" className="pl-10 hover:bg-slate-200">BS Accountancy</SelectItem>
                                                                        <SelectLabel className="text-black pl-5">CAS</SelectLabel>
                                                                        <SelectItem value="bs_communication" className="pl-10 hover:bg-slate-200">BS Communication</SelectItem>
                                                                        <SelectItem value="bs_multimedia_arts" className="pl-10 hover:bg-slate-200">BS Multimedia Arts</SelectItem>
                                                                        <SelectLabel className="text-black pl-5">CCIS</SelectLabel>
                                                                        <SelectItem value="bs_computer_science" className="pl-10 hover:bg-slate-200">BS Computer Science</SelectItem>
                                                                        <SelectItem value="bs_entertainment_multimedia_computing" className="pl-10 hover:bg-slate-200">BS Entertainment and Multimedia Computing</SelectItem>
                                                                        <SelectItem value="bs_information_systems" className="pl-10 hover:bg-slate-200">BS Information Systems</SelectItem>
                                                                        <SelectLabel className="text-black pl-5">CEA</SelectLabel>
                                                                        <SelectItem value="bs_architecture" className="pl-10 hover:bg-slate-200">BS Architecture</SelectItem>
                                                                        <SelectItem value="bs_chemical_engineering" className="pl-10 hover:bg-slate-200">BS Chemical Engineering</SelectItem>
                                                                        <SelectItem value="bs_civil_engineering" className="pl-10 hover:bg-slate-200">BS Civil Engineering</SelectItem>
                                                                        <SelectItem value="bs_computer_engineering" className="pl-10 hover:bg-slate-200">BS Computer Engineering</SelectItem>
                                                                        <SelectItem value="bs_electrical_engineering" className="pl-10 hover:bg-slate-200">BS Electrical Engineering</SelectItem>
                                                                        <SelectItem value="bs_electronics_engineering" className="pl-10 hover:bg-slate-200">BS Electronics Engineering</SelectItem>
                                                                        <SelectItem value="bs_industrial_engineering" className="pl-10 hover:bg-slate-200">BS Industrial Engineering</SelectItem>
                                                                        <SelectItem value="bs_mechanical_engineering" className="pl-10 hover:bg-slate-200">BS Mechanical Engineering</SelectItem>
                                                                        <SelectLabel className="text-black pl-5">CHS</SelectLabel>
                                                                        <SelectItem value="bs_biology" className="pl-10 hover:bg-slate-200">BS Biology</SelectItem>
                                                                        <SelectItem value="bs_psychology" className="pl-10 hover:bg-slate-200">BS Psychology</SelectItem>
                                                                        <SelectItem value="bs_pharmacy" className="pl-10 hover:bg-slate-200">BS Pharmacy</SelectItem>
                                                                        <SelectItem value="bs_physical_therapy" className="pl-10 hover:bg-slate-200">BS Physical Therapy</SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        )}
                                                    />
                                                    {errors.program && <span className="text-red-500 text-xs">{errors.program.message}</span>}
                                                </FormItem>

                                                <Label htmlFor="recentSchoolYear" className="text-black text-xs">Most Recent School Year Attended</Label>
                                                <FormItem label="recentSchoolYear" className="w-3/5 mb-3">
                                                    <Controller
                                                        name="recentSchoolYear"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <Select {...field} onValueChange={(value) => field.onChange(value)}>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select School Year" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup className='bg-slate-50'>
                                                                        <SelectLabel className="text-xs">AY 2024-2025</SelectLabel>
                                                                        <SelectItem value="ay_2024_2025_2nd_term" className="pl-7 hover:bg-slate-200">2nd Term</SelectItem>
                                                                        <SelectItem value="ay_2024_2025_1st_term" className="pl-7 hover:bg-slate-200">1st Term</SelectItem>
                                                                    </SelectGroup>
                                                                    <SelectGroup className='bg-slate-50'>
                                                                        <SelectLabel className="text-xs">AY 2023-2024</SelectLabel>
                                                                        <SelectItem value="ay_2023_2024_3rd_term" className="pl-7 hover:bg-slate-200">3rd Term</SelectItem>
                                                                        <SelectItem value="ay_2023_2024_2nd_term" className="pl-7 hover:bg-slate-200">2nd Term</SelectItem>
                                                                        <SelectItem value="ay_2023_2024_1st_term" className="pl-7 hover:bg-slate-200">1st Term</SelectItem>
                                                                    </SelectGroup>
                                                                    <SelectGroup className='bg-slate-50'>
                                                                        <SelectLabel className="text-xs">AY 2022-2023</SelectLabel>
                                                                        <SelectItem value="ay_2022_2023_3rd_term" className="pl-7 hover:bg-slate-200">3rd Term</SelectItem>
                                                                        <SelectItem value="ay_2022_2023_2nd_term" className="pl-7 hover:bg-slate-200">2nd Term</SelectItem>
                                                                        <SelectItem value="ay_2022_2023_1st_term" className="pl-7 hover:bg-slate-200">1st Term</SelectItem>
                                                                    </SelectGroup>
                                                                    <SelectGroup className='bg-slate-50'>
                                                                        <SelectLabel className="text-xs">AY 2021-2022</SelectLabel>
                                                                        <SelectItem value="ay_2021_2022_3rd_term" className="pl-7 hover:bg-slate-200">3rd Term</SelectItem>
                                                                        <SelectItem value="ay_2021_2022_2nd_term" className="pl-7 hover:bg-slate-200">2nd Term</SelectItem>
                                                                        <SelectItem value="ay_2021_2022_1st_term" className="pl-7 hover:bg-slate-200">1st Term</SelectItem>
                                                                    </SelectGroup>
                                                                    <SelectGroup className='bg-slate-50'>
                                                                        <SelectLabel className="text-xs">AY 2020-2021</SelectLabel>
                                                                        <SelectItem value="ay_2020_2021_3rd_term" className="pl-7 hover:bg-slate-200">3rd Term</SelectItem>
                                                                        <SelectItem value="ay_2020_2021_2nd_term" className="pl-7 hover:bg-slate-200">2nd Term</SelectItem>
                                                                        <SelectItem value="ay_2020_2021_1st_term" className="pl-7 hover:bg-slate-200">1st Term</SelectItem>
                                                                    </SelectGroup>
                                                                    <SelectGroup className='bg-slate-50'>
                                                                        <SelectLabel className="text-xs">AY 2019-2020</SelectLabel>
                                                                        <SelectItem value="ay_2019_2020_3rd_term" className="pl-7 hover:bg-slate-200">3rd Term</SelectItem>
                                                                        <SelectItem value="ay_2019_2020_2nd_term" className="pl-7 hover:bg-slate-200">2nd Term</SelectItem>
                                                                        <SelectItem value="ay_2019_2020_1st_term" className="pl-7 hover:bg-slate-200">1st Term</SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        )}
                                                    />
                                                    {errors.recentSchoolYear && <span className="text-red-500 text-xs">{errors.recentSchoolYear.message}</span>}
                                                </FormItem>

                                                <Label htmlFor="recentschoolyear" className="text-black text-xs">Previous School Attended</Label>
                                                <FormItem label="Previous School">
                                                    <Input type="text" className="w-11/12 mb-3" {...register('previousSchool')} />
                                                    {errors.previousSchool && <span className="text-red-500 text-xs">{errors.previousSchool.message}</span>}
                                                </FormItem>

                                        </div>        
                                    </div>
                                 </div>
                                    </div>
                                        <div className='card-add-student border hover:border-blue-200 '> 
                                            <h1 className='text-stone-600 text-sm font-semibold'>Scholarship Information</h1>
                                            <div className='pl-5 pt-5'>
                                            <Label htmlFor="scholarship" className="text-black text-xs mt-1">Scholarship</Label>
                                            <FormItem label="scholarship" className="w-11/12 mb-5">
                                                <Controller
                                                    name="scholarship"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Select {...field} onValueChange={(value) => field.onChange(value)}>
                                                            <SelectTrigger>
                                                                <SelectValue ref={scholarshipRef} placeholder="Select Scholarship" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup className='bg-slate-50'>
                                                                    <SelectLabel className="text-xs">Scholarship</SelectLabel>
                                                                    <SelectItem value="academic_honoree_g11" className="pl-7 hover:bg-slate-200">Academic Honoree - G11</SelectItem>
                                                                    <SelectItem value="academic_honoree_grade_7" className="pl-7 hover:bg-slate-200">Academic Honoree - Grade 7</SelectItem>
                                                                    <SelectItem value="academic_honoree_rank_1_and_2" className="pl-7 hover:bg-slate-200">Academic Honoree - Rank 1 and 2</SelectItem>
                                                                    <SelectItem value="academic_excellence_axa" className="pl-7 hover:bg-slate-200">Academic Excellence (AXA)</SelectItem>
                                                                    <SelectItem value="academic_achiever_grade_11_top_20" className="pl-7 hover:bg-slate-200">Academic Achiever - Grade 11 - Top 20</SelectItem>
                                                                    <SelectItem value="academic_honoree_grade_12_top_20" className="pl-7 hover:bg-slate-200">Academic Honoree - Grade 12 - Top 20</SelectItem>
                                                                    <SelectItem value="presidents_list" className="pl-7 hover:bg-slate-200">President&lsquo;s List</SelectItem>
                                                                    <SelectItem value="et_yuchengco" className="pl-7 hover:bg-slate-200">E.T. Yuchengco</SelectItem>
                                                                    <SelectItem value="jose_rizal" className="pl-7 hover:bg-slate-200">Jose Rizal Scholarship</SelectItem>
                                                                    <SelectItem value="mcm_cup" className="pl-7 hover:bg-slate-200">MCM Cup</SelectItem>
                                                                    <SelectItem value="hyperlink" className="pl-7 hover:bg-slate-200">Hyperlink</SelectItem>
                                                                    <SelectItem value="st_scholarship" className="pl-7 hover:bg-slate-200">S&T Scholarship</SelectItem>
                                                                </SelectGroup>
                                                                <SelectGroup className='bg-slate-50'>
                                                                    <SelectLabel className="text-xs">Financial Assistance</SelectLabel>
                                                                    <SelectItem value="paid_fund" className="pl-7 hover:bg-slate-200">PAID Fund</SelectItem>
                                                                    <SelectItem value="bukas_ph" className="pl-7 hover:bg-slate-200">Bukas.ph</SelectItem>
                                                                </SelectGroup>
                                                                <SelectGroup className='bg-slate-50'>
                                                                    <SelectLabel className="text-xs">Discounts</SelectLabel>
                                                                    <SelectItem value="early_bird" className="pl-7 hover:bg-slate-200">Early Bird</SelectItem>
                                                                    <SelectItem value="referral" className="pl-7 hover:bg-slate-200">Referral</SelectItem>
                                                                    <SelectItem value="sibling" className="pl-7 hover:bg-slate-200">Sibling</SelectItem>
                                                                    <SelectItem value="ygc" className="pl-7 hover:bg-slate-200">YGC</SelectItem>
                                                                    <SelectItem value="study_aid" className="pl-7 hover:bg-slate-200">Study Aid</SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                />
                                                {errors.scholarship && <span className="text-red-500 text-xs">{errors.scholarship.message}</span>}
                                                </FormItem>
                                            <Label htmlFor="enrollmentStatus" className="text-black text-xs">Enrollment Status</Label>
                                            <FormItem label="enrollmentStatus" className="mb-3 w-3/5">
                                                <Controller
                                                    name="enrollmentStatus"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Select {...field} onValueChange={(value) => field.onChange(value)}>
                                                        <SelectTrigger>
                                                            <SelectValue ref={scholarshipStatusRef} placeholder="Select Enrollment Status" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup className='bg-slate-50'>
                                                                <SelectLabel className="text-xs">Enrollment Status</SelectLabel>
                                                                <SelectItem value="enrolled" className="pl-7 hover:bg-slate-200">Enrolled</SelectItem>
                                                                <SelectItem value="not_enrolled" className="pl-7 hover:bg-slate-200">Not Enrolled</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                    )}
                                                />
                                                {errors.enrollmentStatus && <span className="text-red-500 text-xs">{errors.enrollmentStatus.message}</span>}
                                            </FormItem>
                                        <Label htmlFor="scholarshipStatus" className="text-black text-xs">Scholarship Status</Label>
                                            <FormItem label="scholarshipStatus" className="w-3/5">
                                                <Controller
                                                    name="scholarshipStatus"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Select {...field} onValueChange={(value) => field.onChange(value)}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Scholarship Status" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                                <SelectGroup className='bg-slate-50'>
                                                                    <SelectLabel className="text-xs">Scholarship Status</SelectLabel>
                                                                    <SelectItem value="active" className="pl-7 hover:bg-slate-200">Active</SelectItem>
                                                                    <SelectItem value="inactive" className="pl-7 hover:bg-slate-200">Inactive</SelectItem>
                                                                </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                    )}
                                                />
                                                {errors.scholarshipStatus && <span className="text-red-500 text-xs">{errors.scholarshipStatus.message}</span>}
                                            </FormItem>
                                        </div>
                                    </div>
                            </div>
                    </div>
                </div>
                {/* Contact Info  */}
                    <div className="contact-info border pt-8 hover:border-blue-200">
                        <h1 className='text-stone-600 text-sm font-semibold'>Contact Information</h1>
                        <div className='pl-5 pt-5'>
                            <div>
                                <Label htmlFor="telNumber" className="text-black text-xs">Telephone Number</Label>
                                <FormItem label="telNumber">
                                    <Input ref={mobileNumRef} type="tel" placeholder="0XX-XXX-YYYY" className="w-11/12 mb-3" {...register('telNumber')} />
                                    {errors.telNumber && <span className="text-red-500 text-xs">{errors.telNumber.message}</span>}
                                </FormItem>
                                <Label htmlFor="contactNumber" className="text-black text-xs">Phone Number</Label>
                                <FormItem label="contactNumber">
                                    <Input type="tel" placeholder="09123456789" className="w-11/12 mb-3" {...register('contactNumber')} />
                                    {errors.contactNumber && <span className="text-red-500 text-xs">{errors.contactNumber.message}</span>}
                                </FormItem>
                            </div>
                            <div>
                                <Label htmlFor="personalEmail" className="text-black text-xs">Personal Email Address</Label>
                                <FormItem label="personalEmail">
                                    <Input  ref={personalEmailRef} type="email" placeholder="student@gmail.com" className="w-11/12 mb-3" {...register('personalEmail')} />
                                    {errors.personalEmail && <span className="text-red-500 text-xs">{errors.personalEmail.message}</span>}
                                </FormItem>
                                <Label htmlFor="schoolEmail" className="text-black text-xs">School Email Address</Label>
                                <FormItem label="schoolEmail">
                                    <Input ref={emailRef} type="email" placeholder="student@mcm.edu.ph" className="w-11/12 mb-3" {...register('schoolEmail')} />
                                    {errors.schoolEmail && <span className="text-red-500 text-xs">{errors.schoolEmail.message}</span>}
                                </FormItem>
                            </div>
                        </div>
                    </div>
                    {/* Address Info  */}
                        <div className="contact-info border hover:border-blue-200">
                            <div className='grid-cols-2'>
                                <div className='text-stone-600 text-sm font-semibold'>Permanent Address</div>
                                <div className='text-stone-600 text-sm font-semibold'>Mailing Address</div>
                                    
                            </div>
                            <div className='pl-5 pt-5'>
                                <div>
                                    <Label htmlFor="BlockUnitNo" className="text-black text-xs">House / Block / Unit No.</Label>
                                    <FormItem label="houseBlockUnitNo">
                                        <Input ref={houseBlockUnitNoRef} id="HouseBlockUnitNo" type="text" placeholder="" className="w-11/12" {...register('houseBlockUnitNo')} />
                                        {errors.houseBlockUnitNo && <span className="text-red-500 text-xs">{errors.houseBlockUnitNo.message}</span>}
                                    </FormItem>
                                    <Label htmlFor="Street" className="text-black text-xs">Street Name</Label>
                                    <FormItem label="street">
                                        <Input ref={streetRef} id="Street" type="text" placeholder="" className="w-11/12" {...register('street')} />
                                        {errors.street && <span className="text-red-500 text-xs">{errors.street.message}</span>}
                                    </FormItem>
                                    <Label htmlFor="Barangay" className="text-black text-xs">Barangay</Label>
                                    <FormItem label="barangay">
                                        <Input ref={barangayRef} id="Barangay" type="text" placeholder="" className="w-11/12" {...register('barangay')} />
                                        {errors.barangay && <span className="text-red-500 text-xs">{errors.barangay.message}</span>}
                                    </FormItem>
                                    <Label htmlFor="City" className="text-black text-xs">City</Label>
                                    <FormItem label="city">
                                        <Input ref={cityRef} id="City" type="text" placeholder="" className="w-11/12" {...register('city')} />
                                        {errors.city && <span className="text-red-500 text-xs">{errors.city.message}</span>}
                                    </FormItem>
                                    <Label htmlFor="Municipality" className="text-black text-xs">Municipality</Label>
                                    <FormItem label="municipality">
                                        <Input ref={municipalityRef} id="Municipality" type="text" placeholder="" className="w-11/12" {...register('municipality')} />
                                        {errors.municipality && <span className="text-red-500 text-xs">{errors.municipality.message}</span>}
                                    </FormItem>
                                    <Label htmlFor="ZipCode" className="text-black text-xs">ZipCode</Label>
                                    <FormItem label="zipCode">
                                        <Input ref={zipCodeRef} id="ZipCode" type="text" placeholder="" className="w-11/12 mb-3" {...register('zipCode')} />
                                        {errors.zipCode && <span className="text-red-500 text-xs">{errors.zipCode.message}</span>}
                                    </FormItem>
                                </div>
                                
                                <div className="mailing-address">
                                    <Label htmlFor="mailingHouseBlockUnitNo" className="text-black text-xs">House / Block / Unit No.</Label>
                                    <FormItem label="houseBlockUnitNo">
                                        <Input id="mailingHouseBlockUnitNo" type="text" placeholder="" className="w-11/12" {...register('mailingHouseBlockUnitNo')} />
                                        {errors.mailingHouseBlockUnitNo && <span className="text-red-500 text-xs">{errors.mailingHouseBlockUnitNo.message}</span>}
                                    </FormItem>
                                    <Label htmlFor="mailingStreet" className="text-black text-xs">Street Name</Label>
                                    <FormItem label="street">
                                        <Input id="mailingStreet" type="text" placeholder="" className="w-11/12" {...register('mailingStreet')} />
                                        {errors.mailingStreet && <span className="text-red-500 text-xs">{errors.mailingStreet.message}</span>}
                                    </FormItem>
                                    <Label htmlFor="mailingBarangay" className="text-black text-xs">Barangay</Label>
                                    <FormItem label="barangay">
                                        <Input id="mailingBarangay" type="text" placeholder="" className="w-11/12" {...register('mailingBarangay')} />
                                        {errors.mailingBarangay && <span className="text-red-500 text-xs">{errors.mailingBarangay.message}</span>}
                                    </FormItem>
                                    <Label htmlFor="mailingCity" className="text-black text-xs">City</Label>
                                    <FormItem label="city">
                                        <Input id="mailingCity" type="text" placeholder="" className="w-11/12" {...register('mailingCity')} />
                                        {errors.mailingCity && <span className="text-red-500 text-xs">{errors.mailingCity.message}</span>}
                                    </FormItem>
                                    <Label htmlFor="mailingMunicipality" className="text-black text-xs">Municipality</Label>
                                    <FormItem label="municipality">
                                        <Input id="mailingMunicipality" type="text" placeholder="" className="w-11/12" {...register('mailingMunicipality')} />
                                        {errors.mailingMunicipality && <span className="text-red-500 text-xs">{errors.mailingMunicipality.message}</span>}
                                    </FormItem>
                                    <Label htmlFor="mailingZipCode" className="text-black text-xs">ZipCode</Label>
                                    <FormItem label="zipCode">
                                        <Input id="mailingZipCode" type="text" placeholder="" className="w-11/12 mb-3" {...register('mailingZipCode')} />
                                        {errors.mailingZipCode && <span className="text-red-500 text-xs">{errors.mailingZipCode.message}</span>}
                                    </FormItem>
                                    <div className="grid grid-cols-2">
                                                <div className='flex-auto'>
                                                <FormItem label="sameAsPermanent">
                                                    <Input id="sameAsPermanent" type="checkbox" className="mb-3 w-3 h-3 mr-2 " onChange={(e) => handleSameAsPermanent(e)} />
                                                </FormItem>
                                            </div>
                                            <div className="text-black text-xs translate-x-8 ml-3- -pl-1 -mt-9">
                                                    <h1>Same as Permanent Address</h1>
                                                </div>
                                    </div>
                                </div>
                            </div>
                        </div>       
                        <div>
            <div className="add-student-toolbar">
                <Button 
                    type="button" 
                    className="bg-blue-950 text-white hover:bg-blue-800 hover:border-blue-400 hover:text-teal-50 font-sans text-xs" 
                    onClick={() => setIsModalOpen(true)}
                >
                    Review Information
                </Button>
                
            </div>
            {isModalOpen && 
            <ReviewModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            data={watch()} 
            onSubmit={handleReviewSubmit}
            navigate={navigate} 
            />}
        </div>         
            </Form>
            
    </div>
    );
}