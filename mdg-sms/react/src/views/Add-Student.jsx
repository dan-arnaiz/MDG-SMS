import { useState, useEffect } from 'react';
import { Form, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
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
            return;
        }
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        setAge(age);
    };

    return (
        <div className="main">
            <div className="header-toolbar">
                <h1 className="text-black font-bold font-sans text-lg">Add Student</h1>
            </div>
            <Form id="regForm" action="">
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
                                    <Input type="date" className="w-35 mb-3 text-xs" onChange={handleDateChange} /> 
                                </FormItem>
                                <Label htmlFor="age" className="text-black text-xs">Age</Label>
                                <FormItem label="age">
                                    <Input type="text" className="w-24 mb-3 text-xs" value={age}/> 
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
                                    <Input type="text" placeholder="Student Number" className="w-11/12 mb-3" /> 
                                </FormItem>
                            <Label htmlFor="yearlevel" className="text-black text-xs mt-2">Year Level</Label>
                                <FormItem label="Current Year" className="w-3/5 mb-5">
                                    <Select>
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
                                </FormItem>
                                <Label htmlFor="lastname" className="text-black text-xs">Program</Label>
                                <FormItem label="Program/Strand" className="w-3/5 mb-5">
                                    <Select className="z-auto">
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
                                </FormItem>
                                <Label htmlFor="recentschoolyear" className="text-black text-xs">Previous School Attended</Label>
                                <FormItem label="Previous School">
                                    <Input type="text" className="w-11/12 mb-5" /> 
                                </FormItem>
                                <Label htmlFor="scholarship" className="text-black text-xs mt-2">Scholarship</Label>
                                <FormItem label="scholarship" className="w-11/12 mb-5">
                                    <Select>
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
                                                <SelectItem value="presidents_list" className="pl-7">President&apos;s List</SelectItem>
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
                            <Label htmlFor="TelNumber" className="text-black text-xs">Telephone Number</Label>
                                <FormItem label="telnumber">
                                    <Input type="tel" placeholder="09123456789" className="w-11/12 mb-3" /> 
                                </FormItem>
                            <Label htmlFor="ContactNumber" className="text-black text-xs">Phone Number</Label>
                                <FormItem label="contactnumber">
                                    <Input type="tel" placeholder="09123456789" className="w-11/12 mb-3" /> 
                                </FormItem>
                            </div>
                            <div>
                            <Label htmlFor="personalemail" className="text-black text-xs">Personal Email Address</Label>
                                <FormItem label="personalemailaddress">
                                    <Input type="email" placeholder="student@gmail.com" className="w-11/12 mb-3" /> 
                                </FormItem>
                            <Label htmlFor="personalemail" className="text-black text-xs">School Email Address</Label>
                                <FormItem label="personalemailaddress">
                                    <Input type="email" placeholder="student@mcm.edu.ph" className="w-11/12 mb-3" /> 
                                </FormItem>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab">
                <div className="contact-info">
                        <h1 className='text-stone-600 text-sm'>Permanent Address</h1>
                        <div className='pl-5 pt-5'>
                            <div>
                            <Label htmlFor="houseblockunitno" className="text-black text-xs">House / Block / Unit No.</Label>
                                <FormItem label="houseblockunitno">
                                    <Input type="text" placeholder="" className="w-11/12"/> 
                                </FormItem>
                            <Label htmlFor="Street" className="text-black text-xs">Street Name</Label>
                                <FormItem label="street">
                                    <Input type="text" placeholder="" className="w-11/12"/> 
                                </FormItem>
                            <Label htmlFor="Barangay" className="text-black text-xs">Barangay</Label>
                                <FormItem label="barangay">
                                    <Input type="text" placeholder="" className="w-11/12"/> 
                                </FormItem>
                            <Label htmlFor="City" className="text-black text-xs">City</Label>
                                <FormItem label="City">
                                    <Input type="text" placeholder="" className="w-11/12" /> 
                                </FormItem>
                            <Label htmlFor="Municipality" className="text-black text-xs">Municipality</Label>
                                <FormItem label="Municipality">
                                <Input type="text" placeholder="" className="w-11/12" /> 
                                </FormItem>
                            <Label htmlFor="ZipCode" className="text-black text-xs">ZipCode</Label>
                                <FormItem label="ZipCode">
                                <Input type="text" placeholder="" className="w-11/12 mb-3" /> 
                                </FormItem>

                            
                            </div>
                            
                            <div className="mailing-address">
                            <Label htmlFor="houseblockunitno" className="text-black text-xs">House / Block / Unit No.</Label>
                                <FormItem label="houseblockunitno">
                                    <Input type="text" placeholder="" className="w-11/12"/> 
                                </FormItem>
                            <Label htmlFor="Street" className="text-black text-xs">Street Name</Label>
                                <FormItem label="street">
                                    <Input type="text" placeholder="" className="w-11/12"/> 
                                </FormItem>
                            <Label htmlFor="Barangay" className="text-black text-xs">Barangay</Label>
                                <FormItem label="barangay">
                                    <Input type="text" placeholder="" className="w-11/12"/> 
                                </FormItem>
                            <Label htmlFor="City" className="text-black text-xs">City</Label>
                                <FormItem label="City">
                                    <Input type="text" placeholder="" className="w-11/12" /> 
                                </FormItem>
                            <Label htmlFor="Municipality" className="text-black text-xs">Municipality</Label>
                                <FormItem label="Municipality">
                                <Input type="text" placeholder="" className="w-11/12" /> 
                                </FormItem>
                            <Label htmlFor="ZipCode" className="text-black text-xs">ZipCode</Label>
                                <FormItem label="ZipCode">
                                <Input type="text" placeholder="" className="w-11/12 mb-3" /> 
                                </FormItem>
                            
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
                                <Label htmlFor="firstname" className="text-black text-xs">First Name</Label>
                                <FormItem label="first-name">
                                    <Input type="text" placeholder="First Name" className="w-11/12 mb-3" /> 
                                </FormItem>
                                <Label htmlFor="middlename" className="text-black text-xs">Middle Name</Label>
                                <FormItem label="middle-name">
                                    <Input type="text" placeholder="Middle Name" className="w-11/12 mb-3" /> 
                                </FormItem>
                                <Label htmlFor="lastname" className="text-black text-xs">Last Name</Label>
                                <FormItem label="last-name">
                                    <Input type="text" placeholder="Last Name" className="w-11/12 mb-3" /> 
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
                                <Label htmlFor="relationship" className="text-black text-xs">Relationship</Label>
                                <FormItem label="relationship">
                                    <Input type="text" placeholder="Relationship" className="w-11/12 mb-3" /> 
                                </FormItem>
                                <Label htmlFor="occupation" className="text-black text-xs">Occupation</Label>
                                <FormItem label="occupation">
                                    <Input type="text" placeholder="Occupation" className="w-11/12 mb-3" /> 
                                </FormItem>
                                <Label htmlFor="officeno" className="text-black text-xs">Office/Work Number</Label>
                                <FormItem label="officeno">
                                    <Input type="tel" placeholder="09123456789" className="w-11/12 mb-3" /> 
                                </FormItem>
                                <Label htmlFor="mobileno" className="text-black text-xs">Mobile Number</Label>
                                <FormItem label="mobileno">
                                    <Input type="tel" placeholder="09123456789" className="w-11/12 mb-3" /> 
                                </FormItem>
                                <Label htmlFor="email" className="text-black text-xs">Personal Email Address</Label>
                                <FormItem label="email">
                                    <Input type="email" placeholder="personal@gmail.com" className="w-11/12 mb-3" /> 
                                </FormItem>
                            </div>   
                        </div>
                        <div className="personal-info">
                            <h1 className='text-stone-600 text-sm'>Parent/Guardian Information</h1>
                            <div className='pl-5 pt-5'>
                                <Label htmlFor="firstname" className="text-black text-xs">First Name</Label>
                                <FormItem label="first-name">
                                    <Input type="text" placeholder="First Name" className="w-11/12 mb-3" /> 
                                </FormItem>
                                <Label htmlFor="middlename" className="text-black text-xs">Middle Name</Label>
                                <FormItem label="middle-name">
                                    <Input type="text" placeholder="Middle Name" className="w-11/12 mb-3" /> 
                                </FormItem>
                                <Label htmlFor="lastname" className="text-black text-xs">Last Name</Label>
                                <FormItem label="last-name">
                                    <Input type="text" placeholder="Last Name" className="w-11/12 mb-3" /> 
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
                                <Label htmlFor="relationship" className="text-black text-xs">Relationship</Label>
                                <FormItem label="relationship">
                                    <Input type="text" placeholder="Relationship" className="w-11/12 mb-3" /> 
                                </FormItem>
                                <Label htmlFor="occupation" className="text-black text-xs">Occupation</Label>
                                <FormItem label="occupation">
                                    <Input type="text" placeholder="Occupation" className="w-11/12 mb-3" /> 
                                </FormItem>
                                <Label htmlFor="officeno" className="text-black text-xs">Office/Work Number</Label>
                                <FormItem label="officeno">
                                    <Input type="tel" placeholder="09123456789" className="w-11/12 mb-3" /> 
                                </FormItem>
                                <Label htmlFor="mobileno" className="text-black text-xs">Mobile Number</Label>
                                <FormItem label="mobileno">
                                    <Input type="tel" placeholder="09123456789" className="w-11/12 mb-3" /> 
                                </FormItem>
                                <Label htmlFor="email" className="text-black text-xs">Personal Email Address</Label>
                                <FormItem label="email">
                                    <Input type="email" placeholder="personal@gmail.com" className="w-11/12 mb-3" /> 
                                </FormItem>
                            </div>   
                        </div>
                    </div>
                    { /* Sibling Info  */}
                    <div className="contact-info">
                        <h1 className='text-stone-600 text-sm'>Sibling Information</h1>
                        <div className='pl-5 pt-5'>
                            <div>
                            <Label htmlFor="firstname" className="text-black text-xs">First Name</Label>
                                <FormItem label="first-name">
                                    <Input type="text" placeholder="First Name" className="w-11/12 mb-3" /> 
                                </FormItem>
                                <Label htmlFor="middlename" className="text-black text-xs">Middle Name</Label>
                                <FormItem label="middle-name">
                                    <Input type="text" placeholder="Middle Name" className="w-11/12 mb-3" /> 
                                </FormItem>
                                <Label htmlFor="lastname" className="text-black text-xs">Last Name</Label>
                                <FormItem label="last-name">
                                    <Input type="text" placeholder="Last Name" className="w-11/12 mb-3" /> 
                                </FormItem>
                                <Label htmlFor="suffix" className="text-black text-xs">Suffix</Label>
                                <FormItem label="Suffix">
                                    <Select>
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
                                <Label htmlFor="dateofbirth" className="text-black text-xs">Date of Birth</Label>
                                <FormItem label="dateofbirth">
                                    <Input type="text" className="w-11/12 mb-3" /> 
                                </FormItem>
                                <Label htmlFor="age" className="text-black text-xs">Age</Label>
                                <FormItem label="Age">
                                    <Input type="text" className="w-11/12 mb-3" /> 
                                </FormItem>
                            </div>
                            <div>
                            <Label htmlFor="personalemail" className="text-black text-xs">Personal Email Address</Label>
                                <FormItem label="personalemailaddress">
                                    <Input type="email" placeholder="student@gmail.com" className="w-11/12 mb-3" /> 
                                </FormItem>
                            <Label htmlFor="personalemail" className="text-black text-xs">School Email Address</Label>
                                <FormItem label="personalemailaddress">
                                    <Input type="email" placeholder="student@mcm.edu.ph" className="w-11/12 mb-3" /> 
                                </FormItem>
                            </div>
                        </div>
                    </div>  
                <div>
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
                                    <Input type="file" className="w-11/12 mb-3" /> 
                                </FormItem>
                                <Label htmlFor="form138" className="text-black text-xs">Form 138</Label>
                                <FormItem label="form138">
                                    <Input type="file" className="w-11/12 mb-3" /> 
                                </FormItem>
                                <Label htmlFor="goodmoral" className="text-black text-xs">Good Moral</Label>
                                <FormItem label="goodmoral">
                                    <Input type="file" className="w-11/12 mb-3" /> 
                                </FormItem>
                                <Label htmlFor="nso" className="text-black text-xs">NSO/PSA</Label>
                                <FormItem label="nso">
                                    <Input type="file" className="w-11/12 mb-3" /> 
                                </FormItem>
                                <Label htmlFor="others" className="text-black text-xs">Others</Label>
                                <FormItem label="others">
                                    <Input type="file" className="w-11/12 mb-3" /> 
                                </FormItem>
                            </div>
                        </div>
                        <div className="upload-picture">
                            <h1 className='text-stone-600 text-sm'>Upload Picture</h1>
                            <div className='pl-5 pt-5'>
                                <Label htmlFor="profilepic" className="text-black text-xs">Profile Picture</Label>
                                <FormItem label="profilepic">
                                    <Input type="file" className="w-11/12 mb-3" /> 
                                </FormItem>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab">
                    {/* Preview & Submit Page */}
                    This is the final review page
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