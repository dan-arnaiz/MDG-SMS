import { useState, useEffect } from 'react';
import { Form, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form'; // Import useForm
import { zodResolver } from '@hookform/resolvers/zod'; // Import zodResolver
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
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

const formSchema = z.object({
    firstName: z.string().min(1, { message: "First Name is required" }),
    middleName: z.string().optional(),
    lastName: z.string().min(1, { message: "Last Name is required" }),
    dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
    age: z.number().optional(),
    studentNumber: z.string().min(1, { message: "Student Number is required" }),
    yearLevel: z.string().min(1, { message: "Year Level is required" }),
    program: z.string().min(1, { message: "Program is required" }),
    previousSchool: z.string().optional(),
    scholarship: z.string().optional(),
    telNumber: z.string().optional(),
    contactNumber: z.string().optional(),
    personalEmail: z.string().email({ message: "Invalid email address" }).optional(),
    schoolEmail: z.string().email({ message: "Invalid email address" }).optional(),
    houseBlockUnitNo: z.string().optional(),
    street: z.string().optional(),
    barangay: z.string().optional(),
    city: z.string().optional(),
    municipality: z.string().optional(),
    zipCode: z.string().optional(),
    parentFirstName: z.string().min(1, { message: "First Name is required" }),
    parentMiddleName: z.string().optional(),
    parentLastName: z.string().min(1, { message: "Last Name is required" }),
    parentSuffix: z.string().optional(),
    relationship: z.string().min(1, { message: "Relationship is required" }),
    occupation: z.string().optional(),
    officeNo: z.string().optional(),
    mobileNo: z.string().optional(),
    parentEmail: z.string().email({ message: "Invalid email address" }).optional(),
    siblingFirstName: z.string().optional(),
    siblingMiddleName: z.string().optional(),
    siblingLastName: z.string().optional(),
    siblingSuffix: z.string().optional(),
    siblingDateOfBirth: z.string().optional(),
    siblingAge: z.number().optional(),
    siblingPersonalEmail: z.string().email({ message: "Invalid email address" }).optional(),
    siblingSchoolEmail: z.string().email({ message: "Invalid email address" }).optional(),
    form137: z.any().optional(),
    form138: z.any().optional(),
    goodMoral: z.any().optional(),
    nso: z.any().optional(),
    others: z.any().optional(),
    profilePic: z.any().optional(),
});

export default function AddStudent() {
    const [currentTab, setCurrentTab] = useState(0);
    const [age, setAge] = useState('');

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        showTab(0); // Show Tab 1 when the component mounts
    }, []);

    const showTab = (n) => {
        const tabs = document.querySelectorAll(".tab");
        tabs.forEach((tab, index) => {
            tab.style.display = index === n ? "flex" : "none";
        });
        document.getElementById("prevBtn").style.display = n === 0 ? "none" : "flex";
        document.getElementById("nextBtn").innerHTML = n === tabs.length - 1 ? "Submit" : "Next";
        fixStepIndicator(n);
    };

    const nextPrev = (n) => {
        const tabs = document.querySelectorAll(".tab");
        tabs[currentTab].style.display = "none";
        const newTab = currentTab + n;
        if (newTab >= tabs.length) {
            document.getElementById("regForm").submit();
            return false;
        }

        // Update the step indicator for the completed tab
        if (n === 1) {
            const steps = document.getElementsByClassName("step");
            steps[currentTab].classList.add("finish"); // Mark current as finished
        }

        setCurrentTab(newTab);
        showTab(newTab);
    };

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

    const fixStepIndicator = (n) => {
        const steps = document.getElementsByClassName("step");
        Array.from(steps).forEach((step, index) => {
            step.classList.remove("active");  // Remove 'active' from all steps
            if (index === n) {
                step.classList.add("active");  // Add 'active' to the current step
            }
        });
    };

    const handleDateChange = (event) => {
        const birthDate = new Date(event.target.value);
        if (isNaN(birthDate.getTime())) {
            setAge(''); // Set age to an empty string if the date is invalid
            setValue('age', ''); // Update the form value
            return;
        }
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        setAge(age);
        setValue('age', age); // Update the form value
    };

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            Object.keys(data).forEach(key => {
                if (data[key] instanceof FileList) {
                    Array.from(data[key]).forEach(file => {
                        formData.append(key, file);
                    });
                } else {
                    formData.append(key, data[key]);
                }
            });

            const response = await axiosClient.post('/api/students', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Form submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="main">
            <div className="header-toolbar">
                <h1 className="text-black font-bold font-sans text-lg">Add Student</h1>
            </div>
            <Form id="regForm" onSubmit={handleSubmit(onSubmit)}>
                <div className="tab mt-3">
                    {/* Personal Info  */}
                        <div className="grid grid-cols-2 gap-5">
                            <div className="personal-info">
                                <h1 className='text-stone-600 text-sm'>Personal Information</h1>
                                <div className='pl-5 pt-5'>
                                    <Label htmlFor="firstname" className="text-black text-xs">First Name</Label>
                                    <FormItem label="first-name">
                                        <Input type="text" placeholder="First Name" className="w-11/12 mb-3" {...register('firstName')} />
                                        {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName.message}</span>}
                                    </FormItem>
                                    <Label htmlFor="middlename" className="text-black text-xs">Middle Name</Label>
                                    <FormItem label="middle-name">
                                        <Input type="text" placeholder="Middle Name" className="w-11/12 mb-3" {...register('middleName')} />
                                    </FormItem>
                                    <Label htmlFor="lastname" className="text-black text-xs">Last Name</Label>
                                    <FormItem label="last-name">
                                        <Input type="text" placeholder="Last Name" className="w-11/12 mb-3" {...register('lastName')} />
                                        {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName.message}</span>}
                                    </FormItem>
                                    <Label htmlFor="suffix" className="text-black text-xs">Suffix</Label>
                                    <FormItem label="Suffix">
                                        <Select>
                                            <SelectTrigger className="w-auto mb-3" defaultValue="blank">
                                                <SelectValue placeholder="Suffix" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup className="bg-slate-50">
                                                    <SelectLabel>Select Suffix</SelectLabel>
                                                    <SelectItem value="blank" className="mb-3"></SelectItem>
                                                    <SelectItem value="jr" className="mb-2">Jr.</SelectItem>
                                                    <SelectItem value="sr" className="mb-2">Sr.</SelectItem>
                                                    <SelectItem value="ii" className="mb-2">II</SelectItem>
                                                    <SelectItem value="iii" className="mb-2">III</SelectItem>
                                                    <SelectItem value="iv" className="mb-2">IV</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                    <Label htmlFor="dateofbirth" className="text-black text-xs">Date of Birth</Label>
                                    <FormItem label="dateofbirth">
                                        <Input type="date" className="w-35 mb-3 text-xs" onChange={handleDateChange} {...register('dateOfBirth')} />
                                        {errors.dateOfBirth && <span className="text-red-500 text-xs">{errors.dateOfBirth.message}</span>}
                                    </FormItem>
                                    <Label htmlFor="age" className="text-black text-xs">Age</Label>
                                    <FormItem label="age">
                                        <Input type="text" className="w-24 mb-3 text-xs" value={age} readOnly {...register('age')} />
                                    </FormItem>
                                </div>
                            </div>
                            {/* Org Info  */}
                            <div className="org-info">
                                <h1 className='text-stone-600 text-sm'>Student Information</h1>
                                <div className='pl-5 pt-5'>
                                    <div>
                                        <Label htmlFor="MMCM Student Number" className="text-black text-xs mt-1">Student Number</Label>
                                        <FormItem label="student-number">
                                            <Input type="text" placeholder="Student Number" className="w-11/12 mb-3" {...register('studentNumber')} />
                                            {errors.studentNumber && <span className="text-red-500 text-xs">{errors.studentNumber.message}</span>}
                                        </FormItem>
                                        <Label htmlFor="yearlevel" className="text-black text-xs mt-2">Year Level</Label>
                                        <FormItem label="Current Year" className="w-3/5 mb-5">
                                            <Select {...register('yearLevel')}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Year" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup className='bg-slate-50'>
                                                        <SelectLabel className="text-xs">Junior High School</SelectLabel>
                                                        <SelectItem value="jhs_grade_7" className="pl-7">Grade 7</SelectItem>
                                                        <SelectLabel className="text-xs">Senior High School</SelectLabel>
                                                        <SelectItem value="shs_grade_11" className="pl-7">Grade 11</SelectItem>
                                                        <SelectItem value="shs_grade_12" className="pl-7">Grade 12</SelectItem>
                                                        <SelectLabel className="text-xs">College</SelectLabel>
                                                        <SelectItem value="college_1st_year" className="pl-7">1st Year</SelectItem>
                                                        <SelectItem value="college_2nd_year" className="pl-7">2nd Year</SelectItem>
                                                        <SelectItem value="college_3rd_year" className="pl-7">3rd Year</SelectItem>
                                                        <SelectItem value="college_4th_year" className="pl-7">4th Year</SelectItem>
                                                        <SelectItem value="college_5th_year" className="pl-7">5th Year</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            {errors.yearLevel && <span className="text-red-500 text-xs">{errors.yearLevel.message}</span>}
                                        </FormItem>
                                        <Label htmlFor="program" className="text-black text-xs">Program</Label>
                                        <FormItem label="Program/Strand" className="w-3/5 mb-5">
                                            <Select className="z-auto" {...register('program')}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Program/Strand" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup className='bg-slate-50'>
                                                        <SelectLabel className="text-xs">Senior High School</SelectLabel>
                                                        <SelectItem value="abm" className="pl-10">ABM</SelectItem>
                                                        <SelectItem value="humss" className="pl-10">HUMSS</SelectItem>
                                                        <SelectItem value="stem" className="pl-10">STEM</SelectItem>
                                                        <SelectItem value="arts_design" className="pl-10">Arts and Design</SelectItem>
                                                        <SelectItem value="tvl_ict" className="pl-10">TVL-ICT</SelectItem>
                                                    </SelectGroup>
                                                    <SelectGroup className='bg-slate-50'>
                                                        <SelectLabel className="text-xs">College</SelectLabel>
                                                        <SelectLabel className="text-black pl-5">ATYCB</SelectLabel>
                                                        <SelectItem value="bs_entrepreneurship" className="pl-10">BS Entrepreneurship</SelectItem>
                                                        <SelectItem value="bs_management_accounting" className="pl-10">BS Management Accounting</SelectItem>
                                                        <SelectItem value="bs_real_estate_management" className="pl-10">BS Real Estate Management</SelectItem>
                                                        <SelectItem value="bs_tourism_management" className="pl-10">BS Tourism Management</SelectItem>
                                                        <SelectItem value="bs_accountancy" className="pl-10">BS Accountancy</SelectItem>
                                                        <SelectLabel className="text-black pl-5">CAS</SelectLabel>
                                                        <SelectItem value="bs_communication" className="pl-10">BS Communication</SelectItem>
                                                        <SelectItem value="bs_multimedia_arts" className="pl-10">BS Multimedia Arts</SelectItem>
                                                        <SelectLabel className="text-black pl-5">CCIS</SelectLabel>
                                                        <SelectItem value="bs_computer_science" className="pl-10">BS Computer Science</SelectItem>
                                                        <SelectItem value="bs_entertainment_multimedia_computing" className="pl-10">BS Entertainment and Multimedia Computing</SelectItem>
                                                        <SelectItem value="bs_information_systems" className="pl-10">BS Information Systems</SelectItem>
                                                        <SelectLabel className="text-black pl-5">CEA</SelectLabel>
                                                        <SelectItem value="bs_architecture" className="pl-10">BS Architecture</SelectItem>
                                                        <SelectItem value="bs_chemical_engineering" className="pl-10">BS Chemical Engineering</SelectItem>
                                                        <SelectItem value="bs_civil_engineering" className="pl-10">BS Civil Engineering</SelectItem>
                                                        <SelectItem value="bs_computer_engineering" className="pl-10">BS Computer Engineering</SelectItem>
                                                        <SelectItem value="bs_electrical_engineering" className="pl-10">BS Electrical Engineering</SelectItem>
                                                        <SelectItem value="bs_electronics_engineering" className="pl-10">BS Electronics Engineering</SelectItem>
                                                        <SelectItem value="bs_industrial_engineering" className="pl-10">BS Industrial Engineering</SelectItem>
                                                        <SelectItem value="bs_mechanical_engineering" className="pl-10">BS Mechanical Engineering</SelectItem>
                                                        <SelectLabel className="text-black pl-5">CHS</SelectLabel>
                                                        <SelectItem value="bs_biology" className="pl-10">BS Biology</SelectItem>
                                                        <SelectItem value="bs_psychology" className="pl-10">BS Psychology</SelectItem>
                                                        <SelectItem value="bs_pharmacy" className="pl-10">BS Pharmacy</SelectItem>
                                                        <SelectItem value="bs_physical_therapy" className="pl-10">BS Physical Therapy</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            {errors.program && <span className="text-red-500 text-xs">{errors.program.message}</span>}
                                        </FormItem>
                                        <Label htmlFor="recentschoolyear" className="text-black text-xs">Previous School Attended</Label>
                                        <FormItem label="Previous School">
                                            <Input type="text" className="w-11/12 mb-5" {...register('previousSchool')} />
                                            {errors.previousSchool && <span className="text-red-500 text-xs">{errors.previousSchool.message}</span>}
                                        </FormItem>
                                        <Label htmlFor="scholarship" className="text-black text-xs mt-2">Scholarship</Label>
                                        <FormItem label="scholarship" className="w-11/12 mb-5">
                                            <Select {...register('scholarship')}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Scholarship" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup className='bg-slate-50'>
                                                        <SelectLabel className="text-xs">Scholarship</SelectLabel>
                                                        <SelectItem value="academic_honoree_g11" className="pl-7">Academic Honoree - G11</SelectItem>
                                                        <SelectItem value="academic_honoree_grade_7" className="pl-7">Academic Honoree - Grade 7</SelectItem>
                                                        <SelectItem value="academic_honoree_rank_1_and_2" className="pl-7">Academic Honoree - Rank 1 and 2</SelectItem>
                                                        <SelectItem value="academic_excellence_axa" className="pl-7">Academic Excellence (AXA)</SelectItem>
                                                        <SelectItem value="academic_achiever_grade_11_top_20" className="pl-7">Academic Achiever - Grade 11 - Top 20</SelectItem>
                                                        <SelectItem value="academic_honoree_grade_12_top_20" className="pl-7">Academic Honoree - Grade 12 - Top 20</SelectItem>
                                                        <SelectItem value="presidents_list" className="pl-7">President&lsquo;s List</SelectItem>
                                                        <SelectItem value="et_yuchengco" className="pl-7">E.T. Yuchengco</SelectItem>
                                                        <SelectItem value="jose_rizal" className="pl-7">Jose Rizal Scholarship</SelectItem>
                                                        <SelectItem value="mcm_cup" className="pl-7">MCM Cup</SelectItem>
                                                        <SelectItem value="hyperlink" className="pl-7">Hyperlink</SelectItem>
                                                        <SelectItem value="st_scholarship" className="pl-7">S&T Scholarship</SelectItem>
                                                    </SelectGroup>
                                                    <SelectGroup className='bg-slate-50'>
                                                        <SelectLabel className="text-xs">Financial Assistance</SelectLabel>
                                                        <SelectItem value="paid_fund" className="pl-7">PAID Fund</SelectItem>
                                                        <SelectItem value="bukas_ph" className="pl-7">Bukas.ph</SelectItem>
                                                    </SelectGroup>
                                                    <SelectGroup className='bg-slate-50'>
                                                        <SelectLabel className="text-xs">Discounts</SelectLabel>
                                                        <SelectItem value="early_bird" className="pl-7">Early Bird</SelectItem>
                                                        <SelectItem value="referral" className="pl-7">Referral</SelectItem>
                                                        <SelectItem value="sibling" className="pl-7">Sibling</SelectItem>
                                                        <SelectItem value="ygc" className="pl-7">YGC</SelectItem>
                                                        <SelectItem value="study_aid" className="pl-7">Study Aid</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            {errors.scholarship && <span className="text-red-500 text-xs">{errors.scholarship.message}</span>}
                                        </FormItem>
                                    </div>
                                </div>
                            </div>
                        </div>
            
                </div>
                <div className="tab">
                    <div className="contact-info">
                        <h1 className='text-stone-600 text-sm'>Contact Information</h1>
                        <div className='pl-5 pt-5'>
                            <div>
                                <Label htmlFor="telNumber" className="text-black text-xs">Telephone Number</Label>
                                <FormItem label="telNumber">
                                    <Input type="tel" placeholder="09123456789" className="w-11/12 mb-3" {...register('telNumber')} />
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
                                    <Input type="email" placeholder="student@gmail.com" className="w-11/12 mb-3" {...register('personalEmail')} />
                                    {errors.personalEmail && <span className="text-red-500 text-xs">{errors.personalEmail.message}</span>}
                                </FormItem>
                                <Label htmlFor="schoolEmail" className="text-black text-xs">School Email Address</Label>
                                <FormItem label="schoolEmail">
                                    <Input type="email" placeholder="student@mcm.edu.ph" className="w-11/12 mb-3" {...register('schoolEmail')} />
                                    {errors.schoolEmail && <span className="text-red-500 text-xs">{errors.schoolEmail.message}</span>}
                                </FormItem>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab">
                    {/* Address Info  */}
                        <div className="contact-info">
                            <div className='grid-cols-2'>
                                <div className='text-stone-600 text-sm'>Permanent Address</div>
                                <div className='text-stone-600 text-sm'>Mailing Address</div>
                                    
                            </div>
                            <div className='pl-5 pt-5'>
                                <div>
                                    <Label htmlFor="BlockUnitNo" className="text-black text-xs">House / Block / Unit No.</Label>
                                    <FormItem label="houseBlockUnitNo">
                                        <Input id="HouseBlockUnitNo" type="text" placeholder="" className="w-11/12" {...register('houseBlockUnitNo')} />
                                        {errors.houseBlockUnitNo && <span className="text-red-500 text-xs">{errors.houseBlockUnitNo.message}</span>}
                                    </FormItem>
                                    <Label htmlFor="Street" className="text-black text-xs">Street Name</Label>
                                    <FormItem label="street">
                                        <Input id="Street" type="text" placeholder="" className="w-11/12" {...register('street')} />
                                        {errors.street && <span className="text-red-500 text-xs">{errors.street.message}</span>}
                                    </FormItem>
                                    <Label htmlFor="Barangay" className="text-black text-xs">Barangay</Label>
                                    <FormItem label="barangay">
                                        <Input id="Barangay" type="text" placeholder="" className="w-11/12" {...register('barangay')} />
                                        {errors.barangay && <span className="text-red-500 text-xs">{errors.barangay.message}</span>}
                                    </FormItem>
                                    <Label htmlFor="City" className="text-black text-xs">City</Label>
                                    <FormItem label="city">
                                        <Input id="City" type="text" placeholder="" className="w-11/12" {...register('city')} />
                                        {errors.city && <span className="text-red-500 text-xs">{errors.city.message}</span>}
                                    </FormItem>
                                    <Label htmlFor="Municipality" className="text-black text-xs">Municipality</Label>
                                    <FormItem label="municipality">
                                        <Input id="Municipality" type="text" placeholder="" className="w-11/12" {...register('municipality')} />
                                        {errors.municipality && <span className="text-red-500 text-xs">{errors.municipality.message}</span>}
                                    </FormItem>
                                    <Label htmlFor="ZipCode" className="text-black text-xs">ZipCode</Label>
                                    <FormItem label="zipCode">
                                        <Input id="ZipCode" type="text" placeholder="" className="w-11/12 mb-3" {...register('zipCode')} />
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
                                    <div className="flex items-center">
                                    <FormItem label="sameAsPermanent">
                                        <Input id="sameAsPermanent" type="checkbox" className="mb-3 w-3 h-3 mr-2" onChange={(e) => handleSameAsPermanent(e)} />
                                    </FormItem>
                                    <div className="text-black text-xs">Same as Permanent Address</div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <div className="tab">
                    {/* Parent/Guardian Info  */}
                    <div className="grid grid-cols-2 gap-5">
                        <div className="personal-info">
                            <h1 className='text-stone-600 text-sm'>Parent/Guardian Information</h1>
                            <div className='pl-5 pt-5'>
                                <Label htmlFor="parentFirstName" className="text-black text-xs">First Name</Label>
                                <FormItem label="parentFirstName">
                                    <Input type="text" placeholder="First Name" className="w-11/12 mb-3" {...register('parentFirstName')} />
                                    {errors.parentFirstName && <span className="text-red-500 text-xs">{errors.parentFirstName.message}</span>}
                                </FormItem>
                                <Label htmlFor="parentMiddleName" className="text-black text-xs">Middle Name</Label>
                                <FormItem label="parentMiddleName">
                                    <Input type="text" placeholder="Middle Name" className="w-11/12 mb-3" {...register('parentMiddleName')} />
                                </FormItem>
                                <Label htmlFor="parentLastName" className="text-black text-xs">Last Name</Label>
                                <FormItem label="parentLastName">
                                    <Input type="text" placeholder="Last Name" className="w-11/12 mb-3" {...register('parentLastName')} />
                                    {errors.parentLastName && <span className="text-red-500 text-xs">{errors.parentLastName.message}</span>}
                                </FormItem>
                                <Label htmlFor="parentSuffix" className="text-black text-xs">Suffix</Label>
                                <FormItem label="parentSuffix">
                                    <Select {...register('parentSuffix')}>
                                        <SelectTrigger className="w-auto mb-3" defaultValue="blank">
                                            <SelectValue placeholder="Suffix" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup className="bg-slate-50">
                                                <SelectLabel>Select Suffix</SelectLabel>
                                                <SelectItem value="blank" className="mb-3"></SelectItem>
                                                <SelectItem value="jr" className="mb-2">Jr.</SelectItem>
                                                <SelectItem value="sr" className="mb-2">Sr.</SelectItem>
                                                <SelectItem value="ii" className="mb-2">II</SelectItem>
                                                <SelectItem value="iii" className="mb-2">III</SelectItem>
                                                <SelectItem value="iv" className="mb-2">IV</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                                <Label htmlFor="relationship" className="text-black text-xs">Relationship</Label>
                                <FormItem label="relationship">
                                    <Input type="text" placeholder="Relationship" className="w-11/12 mb-3" {...register('relationship')} />
                                    {errors.relationship && <span className="text-red-500 text-xs">{errors.relationship.message}</span>}
                                </FormItem>
                                <Label htmlFor="occupation" className="text-black text-xs">Occupation</Label>
                                <FormItem label="occupation">
                                    <Input type="text" placeholder="Occupation" className="w-11/12 mb-3" {...register('occupation')} />
                                </FormItem>
                                <Label htmlFor="officeNo" className="text-black text-xs">Office/Work Number</Label>
                                <FormItem label="officeNo">
                                    <Input type="tel" placeholder="09123456789" className="w-11/12 mb-3" {...register('officeNo')} />
                                </FormItem>
                                <Label htmlFor="mobileNo" className="text-black text-xs">Mobile Number</Label>
                                <FormItem label="mobileNo">
                                    <Input type="tel" placeholder="09123456789" className="w-11/12 mb-3" {...register('mobileNo')} />
                                </FormItem>
                                <Label htmlFor="parentEmail" className="text-black text-xs">Personal Email Address</Label>
                                <FormItem label="parentEmail">
                                    <Input type="email" placeholder="personal@gmail.com" className="w-11/12 mb-3" {...register('parentEmail')} />
                                    {errors.parentEmail && <span className="text-red-500 text-xs">{errors.parentEmail.message}</span>}
                                </FormItem>
                            </div>   
                        </div>
                        <div className="personal-info">
                            <h1 className='text-stone-600 text-sm'>Parent/Guardian Information</h1>
                            <div className='pl-5 pt-5'>
                                <Label htmlFor="parentFirstName" className="text-black text-xs">First Name</Label>
                                <FormItem label="parentFirstName">
                                    <Input type="text" placeholder="First Name" className="w-11/12 mb-3" {...register('parentFirstName')} />
                                    {errors.parentFirstName && <span className="text-red-500 text-xs">{errors.parentFirstName.message}</span>}
                                </FormItem>
                                <Label htmlFor="parentMiddleName" className="text-black text-xs">Middle Name</Label>
                                <FormItem label="parentMiddleName">
                                    <Input type="text" placeholder="Middle Name" className="w-11/12 mb-3" {...register('parentMiddleName')} />
                                </FormItem>
                                <Label htmlFor="parentLastName" className="text-black text-xs">Last Name</Label>
                                <FormItem label="parentLastName">
                                    <Input type="text" placeholder="Last Name" className="w-11/12 mb-3" {...register('parentLastName')} />
                                    {errors.parentLastName && <span className="text-red-500 text-xs">{errors.parentLastName.message}</span>}
                                </FormItem>
                                <Label htmlFor="parentSuffix" className="text-black text-xs">Suffix</Label>
                                <FormItem label="parentSuffix">
                                    <Select {...register('parentSuffix')}>
                                        <SelectTrigger className="w-auto mb-3" defaultValue="blank">
                                            <SelectValue placeholder="Suffix" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup className="bg-slate-50">
                                                <SelectLabel>Select Suffix</SelectLabel>
                                                <SelectItem value="blank" className="mb-3"></SelectItem>
                                                <SelectItem value="jr" className="mb-2">Jr.</SelectItem>
                                                <SelectItem value="sr" className="mb-2">Sr.</SelectItem>
                                                <SelectItem value="ii" className="mb-2">II</SelectItem>
                                                <SelectItem value="iii" className="mb-2">III</SelectItem>
                                                <SelectItem value="iv" className="mb-2">IV</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                                <Label htmlFor="relationship" className="text-black text-xs">Relationship</Label>
                                <FormItem label="relationship">
                                    <Input type="text" placeholder="Relationship" className="w-11/12 mb-3" {...register('relationship')} />
                                    {errors.relationship && <span className="text-red-500 text-xs">{errors.relationship.message}</span>}
                                </FormItem>
                                <Label htmlFor="occupation" className="text-black text-xs">Occupation</Label>
                                <FormItem label="occupation">
                                    <Input type="text" placeholder="Occupation" className="w-11/12 mb-3" {...register('occupation')} />
                                </FormItem>
                                <Label htmlFor="officeNo" className="text-black text-xs">Office/Work Number</Label>
                                <FormItem label="officeNo">
                                    <Input type="tel" placeholder="09123456789" className="w-11/12 mb-3" {...register('officeNo')} />
                                </FormItem>
                                <Label htmlFor="mobileNo" className="text-black text-xs">Mobile Number</Label>
                                <FormItem label="mobileNo">
                                    <Input type="tel" placeholder="09123456789" className="w-11/12 mb-3" {...register('mobileNo')} />
                                </FormItem>
                                <Label htmlFor="parentEmail" className="text-black text-xs">Personal Email Address</Label>
                                <FormItem label="parentEmail">
                                    <Input type="email" placeholder="personal@gmail.com" className="w-11/12 mb-3" {...register('parentEmail')} />
                                    {errors.parentEmail && <span className="text-red-500 text-xs">{errors.parentEmail.message}</span>}
                                </FormItem>
                            </div>   
                        </div>
                    </div>
                    {/* Sibling Info  */}
                    <div className="contact-info">
                        <h1 className='text-stone-600 text-sm'>Sibling Information</h1>
                        <div className='pl-5 pt-5'>
                            <div>
                                <Label htmlFor="siblingFirstName" className="text-black text-xs">First Name</Label>
                                <FormItem label="siblingFirstName">
                                    <Input type="text" placeholder="First Name" className="w-11/12 mb-3" {...register('siblingFirstName')} />
                                    {errors.siblingFirstName && <span className="text-red-500 text-xs">{errors.siblingFirstName.message}</span>}
                                </FormItem>
                                <Label htmlFor="siblingMiddleName" className="text-black text-xs">Middle Name</Label>
                                <FormItem label="siblingMiddleName">
                                    <Input type="text" placeholder="Middle Name" className="w-11/12 mb-3" {...register('siblingMiddleName')} />
                                </FormItem>
                                <Label htmlFor="siblingLastName" className="text-black text-xs">Last Name</Label>
                                <FormItem label="siblingLastName">
                                    <Input type="text" placeholder="Last Name" className="w-11/12 mb-3" {...register('siblingLastName')} />
                                    {errors.siblingLastName && <span className="text-red-500 text-xs">{errors.siblingLastName.message}</span>}
                                </FormItem>
                                <Label htmlFor="siblingSuffix" className="text-black text-xs">Suffix</Label>
                                <FormItem label="siblingSuffix">
                                    <Select {...register('siblingSuffix')}>
                                        <SelectTrigger className="w-40 mb-3" defaultValue="blank">
                                            <SelectValue placeholder="Suffix" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup className="bg-slate-50">
                                                <SelectLabel>Select Suffix</SelectLabel>
                                                <SelectItem value="blank" className="mb-3"></SelectItem>
                                                <SelectItem value="jr" className="mb-2">Jr.</SelectItem>
                                                <SelectItem value="sr" className="mb-2">Sr.</SelectItem>
                                                <SelectItem value="ii" className="mb-2">II</SelectItem>
                                                <SelectItem value="iii" className="mb-2">III</SelectItem>
                                                <SelectItem value="iv" className="mb-2">IV</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                                <Label htmlFor="siblingDateOfBirth" className="text-black text-xs">Date of Birth</Label>
                                <FormItem label="siblingDateOfBirth">
                                    <Input type="date" className="w-40 mb-3" {...register('siblingDateOfBirth')} onChange={(e) => handleDateChange(e, 'siblingAge')} />
                                    {errors.siblingDateOfBirth && <span className="text-red-500 text-xs">{errors.siblingDateOfBirth.message}</span>}
                                </FormItem>
                                <Label htmlFor="siblingAge" className="text-black text-xs">Age</Label>
                                <FormItem label="siblingAge">
                                    <Input type="text" className="w-40 mb-3" value={age} readOnly {...register('siblingAge')} />
                                    {errors.siblingAge && <span className="text-red-500 text-xs">{errors.siblingAge.message}</span>}
                                </FormItem>
                            </div>
                            <div>
                                <Label htmlFor="siblingPersonalEmail" className="text-black text-xs">Personal Email Address</Label>
                                <FormItem label="siblingPersonalEmail">
                                    <Input type="email" placeholder="student@gmail.com" className="w-11/12 mb-3" {...register('siblingPersonalEmail')} />
                                    {errors.siblingPersonalEmail && <span className="text-red-500 text-xs">{errors.siblingPersonalEmail.message}</span>}
                                </FormItem>
                                <Label htmlFor="siblingSchoolEmail" className="text-black text-xs">School Email Address</Label>
                                <FormItem label="siblingSchoolEmail">
                                    <Input type="email" placeholder="student@mcm.edu.ph" className="w-11/12 mb-3" {...register('siblingSchoolEmail')} />
                                    {errors.siblingSchoolEmail && <span className="text-red-500 text-xs">{errors.siblingSchoolEmail.message}</span>}
                                </FormItem>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab">
                    {/* Upload Documents & Picture / Submit Page */}
                    <div className="grid grid-cols-2 gap-5">
                        <div className="upload-files">
                            <h1 className='text-stone-600 text-sm'>Upload Documents</h1>
                            <div className='pl-5 pt-5'>
                                <Label htmlFor="form137" className="text-black text-xs">Form 137</Label>
                                <FormItem label="form137">
                                    <Input type="file" className="w-11/12 mb-3" {...register('form137')} />
                                    {errors.form137 && <span className="text-red-500 text-xs">{errors.form137.message}</span>}
                                </FormItem>
                                <Label htmlFor="form138" className="text-black text-xs">Form 138</Label>
                                <FormItem label="form138">
                                    <Input type="file" className="w-11/12 mb-3" {...register('form138')} />
                                    {errors.form138 && <span className="text-red-500 text-xs">{errors.form138.message}</span>}
                                </FormItem>
                                <Label htmlFor="goodMoral" className="text-black text-xs">Good Moral</Label>
                                <FormItem label="goodMoral">
                                    <Input type="file" className="w-11/12 mb-3" {...register('goodMoral')} />
                                    {errors.goodMoral && <span className="text-red-500 text-xs">{errors.goodMoral.message}</span>}
                                </FormItem>
                                <Label htmlFor="nso" className="text-black text-xs">NSO/PSA</Label>
                                <FormItem label="nso">
                                    <Input type="file" className="w-11/12 mb-3" {...register('nso')} />
                                    {errors.nso && <span className="text-red-500 text-xs">{errors.nso.message}</span>}
                                </FormItem>
                                <Label htmlFor="others" className="text-black text-xs">Others</Label>
                                <FormItem label="others">
                                    <Input type="file" className="w-11/12 mb-3" {...register('others')} />
                                    {errors.others && <span className="text-red-500 text-xs">{errors.others.message}</span>}
                                </FormItem>
                            </div>
                        </div>
                        <div className="upload-picture">
                            <h1 className='text-stone-600 text-sm'>Upload Picture</h1>
                            <div className='pl-5 pt-5'>
                                <Label htmlFor="profilePic" className="text-black text-xs">Profile Picture</Label>
                                <FormItem label="profilePic">
                                    <Input type="file" className="w-11/12 mb-3" {...register('profilePic')} />
                                    {errors.profilePic && <span className="text-red-500 text-xs">{errors.profilePic.message}</span>}
                                </FormItem>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab">
                    {/* Preview & Submit Page */}
                    <h1 className='text-stone-600 text-sm'>Review Your Information</h1>
                    <div className='pl-5 pt-5'>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="personal-info">
                                <h2 className='text-stone-600 text-sm'>Personal Information</h2>
                                <p><strong>First Name:</strong> {watch('firstName')}</p>
                                <p><strong>Middle Name:</strong> {watch('middleName')}</p>
                                <p><strong>Last Name:</strong> {watch('lastName')}</p>
                                <p><strong>Suffix:</strong> {watch('suffix')}</p>
                                <p><strong>Date of Birth:</strong> {watch('dateOfBirth')}</p>
                                <p><strong>Age:</strong> {watch('age')}</p>
                            </div>
                            <div className="org-info">
                                <h2 className='text-stone-600 text-sm'>Student Information</h2>
                                <p><strong>Student Number:</strong> {watch('studentNumber')}</p>
                                <p><strong>Year Level:</strong> {watch('yearLevel')}</p>
                                <p><strong>Program:</strong> {watch('program')}</p>
                                <p><strong>Previous School:</strong> {watch('previousSchool')}</p>
                                <p><strong>Scholarship:</strong> {watch('scholarship')}</p>
                            </div>
                            <div className="contact-info">
                                <h2 className='text-stone-600 text-sm'>Contact Information</h2>
                                <p><strong>Telephone Number:</strong> {watch('telNumber')}</p>
                                <p><strong>Phone Number:</strong> {watch('contactNumber')}</p>
                                <p><strong>Personal Email:</strong> {watch('personalEmail')}</p>
                                <p><strong>School Email:</strong> {watch('schoolEmail')}</p>
                            </div>
                            <div className="address-info">
                                <h2 className='text-stone-600 text-sm'>Permanent Address</h2>
                                <p><strong>House / Block / Unit No.:</strong> {watch('houseBlockUnitNo')}</p>
                                <p><strong>Street Name:</strong> {watch('street')}</p>
                                <p><strong>Barangay:</strong> {watch('barangay')}</p>
                                <p><strong>City:</strong> {watch('city')}</p>
                                <p><strong>Municipality:</strong> {watch('municipality')}</p>
                                <p><strong>ZipCode:</strong> {watch('zipCode')}</p>
                            </div>
                            <div className="parent-info">
                                <h2 className='text-stone-600 text-sm'>Parent/Guardian Information</h2>
                                <p><strong>First Name:</strong> {watch('parentFirstName')}</p>
                                <p><strong>Middle Name:</strong> {watch('parentMiddleName')}</p>
                                <p><strong>Last Name:</strong> {watch('parentLastName')}</p>
                                <p><strong>Suffix:</strong> {watch('parentSuffix')}</p>
                                <p><strong>Relationship:</strong> {watch('relationship')}</p>
                                <p><strong>Occupation:</strong> {watch('occupation')}</p>
                                <p><strong>Office/Work Number:</strong> {watch('officeNo')}</p>
                                <p><strong>Mobile Number:</strong> {watch('mobileNo')}</p>
                                <p><strong>Personal Email:</strong> {watch('parentEmail')}</p>
                            </div>
                            <div className="sibling-info">
                                <h2 className='text-stone-600 text-sm'>Sibling Information</h2>
                                <p><strong>First Name:</strong> {watch('siblingFirstName')}</p>
                                <p><strong>Middle Name:</strong> {watch('siblingMiddleName')}</p>
                                <p><strong>Last Name:</strong> {watch('siblingLastName')}</p>
                                <p><strong>Suffix:</strong> {watch('siblingSuffix')}</p>
                                <p><strong>Date of Birth:</strong> {watch('siblingDateOfBirth')}</p>
                                <p><strong>Age:</strong> {watch('siblingAge')}</p>
                                <p><strong>Personal Email:</strong> {watch('siblingPersonalEmail')}</p>
                                <p><strong>School Email:</strong> {watch('siblingSchoolEmail')}</p>
                            </div>
                            <div className="upload-files">
                                <h2 className='text-stone-600 text-sm'>Uploaded Documents</h2>
                                <p><strong>Form 137:</strong> {watch('form137') ? 'Uploaded' : 'Not Uploaded'}</p>
                                <p><strong>Form 138:</strong> {watch('form138') ? 'Uploaded' : 'Not Uploaded'}</p>
                                <p><strong>Good Moral:</strong> {watch('goodMoral') ? 'Uploaded' : 'Not Uploaded'}</p>
                                <p><strong>NSO/PSA:</strong> {watch('nso') ? 'Uploaded' : 'Not Uploaded'}</p>
                                <p><strong>Others:</strong> {watch('others') ? 'Uploaded' : 'Not Uploaded'}</p>
                            </div>
                            <div className="upload-picture">
                                <h2 className='text-stone-600 text-sm'>Uploaded Picture</h2>
                                <p><strong>Profile Picture:</strong> {watch('profilePic') ? 'Uploaded' : 'Not Uploaded'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
            <div className="add-student-toolbar">
                <div>
                    <span className="step"></span>
                    <span className="step"></span>
                    <span className="step"></span>
                    <span className="step"></span>
                    <span className="step"></span>
                </div>
                <div className="add-students-btns">
                    <Button type="button" id="prevBtn" className="hover:bg-blue-800 hover:text-teal-50 font-sans text-xs" onClick={() => nextPrev(-1)}>Back</Button>
                    <Button type="button" id="nextBtn" className="hover:bg-blue-800 hover:text-teal-50 font-sans text-xs" onClick={() => nextPrev(1)}>Next</Button>
                </div>
            </div>
        </div>
    );
}