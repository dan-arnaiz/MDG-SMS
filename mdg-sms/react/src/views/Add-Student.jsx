import { useState, useEffect } from 'react';
import { Form, FormItem, FormLabel } from '@/components/ui/form';
import { useForm, Controller } from 'react-hook-form'; // Import useForm
import { zodResolver } from '@hookform/resolvers/zod'; // Import zodResolver
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
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

const yearLevelMapping = {
    jhs_grade_7: "Grade 7",
    shs_grade_11: "Grade 11",
    shs_grade_12: "Grade 12",
    college_first_year: "First Year",
    college_second_year: "Second Year",
    college_third_year: "Third Year",
    college_fourth_year: "Fourth Year",
    college_fifth_year: "Fifth Year",
};

const programMapping = {
    abm: "ABM",
    humss: "HUMSS",
    stem: "STEM",
    arts_design: "Arts and Design",
    tvl_ict: "TVL-ICT",
    bs_entrepreneurship: "Bachelor of Science in Entrepreneurship",
    bs_management_accounting: "Bachelor of Science in Management Accounting",
    bs_real_estate_management: "Bachelor of Science in Real Estate Management",
    bs_tourism_management: "Bachelor of Science in Tourism Management",
    bs_accountancy: "Bachelor of Science in Accountancy",
    bs_communication: "Bachelor of Science in Communication",
    bs_multimedia_arts: "Bachelor of Science in Multimedia Arts",
    bs_computer_science: "Bachelor of Science in Computer Science",
    bs_entertainment_multimedia_computing: "Bachelor of Science in Entertainment and Multimedia Computing",
    bs_information_systems: "Bachelor of Science in Information Systems",
    bs_architecture: "Bachelor of Science in Architecture",
    bs_chemical_engineering: "Bachelor of Science in Chemical Engineering",
    bs_civil_engineering: "Bachelor of Science in Civil Engineering",
    bs_computer_engineering: "Bachelor of Science in Computer Engineering",
    bs_electrical_engineering: "Bachelor of Science in Electrical Engineering",
    bs_electronics_engineering: "Bachelor of Science in Electronics Engineering",
    bs_industrial_engineering: "Bachelor of Science in Industrial Engineering",
    bs_mechanical_engineering: "Bachelor of Science in Mechanical Engineering",
    bs_biology: "Bachelor of Science in Biology",
    bs_psychology: "Bachelor of Science in Psychology",
    bs_pharmacy: "Bachelor of Science in Pharmacy",
    bs_physical_therapy: "Bachelor of Science in Physical Therapy",
};

const enrollmentStatusMapping = {
    enrolled: { text: "Enrolled", img: "images/check.png" },
    not_enrolled: { text: "Not Enrolled", img: "images/xmark.png" },
};

const scholarshipStatusMapping = {
    active: { text: "Active", img: "images/check.png" },
    inactive: { text: "Inactive", img: "images/xmark.png" },
};

const recentSchoolYearMapping = {
    ay_2019_2020_1st_term: "AY 2019-2020 | 1st Term",
    ay_2019_2020_2nd_term: "AY 2019-2020 | 2nd Term",
    ay_2019_2020_3rd_term: "AY 2019-2020 | 3rd Term",
    ay_2020_2021_1st_term: "AY 2020-2021 | 1st Term",
    ay_2020_2021_2nd_term: "AY 2020-2021 | 2nd Term",
    ay_2020_2021_3rd_term: "AY 2020-2021 | 3rd Term",
    ay_2021_2022_1st_term: "AY 2021-2022 | 1st Term",
    ay_2021_2022_2nd_term: "AY 2021-2022 | 2nd Term",
    ay_2021_2022_3rd_term: "AY 2021-2022 | 3rd Term",
    ay_2022_2023_1st_term: "AY 2022-2023 | 1st Term",
    ay_2022_2023_2nd_term: "AY 2022-2023 | 2nd Term",
    ay_2022_2023_3rd_term: "AY 2022-2023 | 3rd Term",
    ay_2023_2024_1st_term: "AY 2023-2024 | 1st Term",
    ay_2023_2024_2nd_term: "AY 2023-2024 | 2nd Term",
    ay_2023_2024_3rd_term: "AY 2023-2024 | 3rd Term",
    ay_2024_2025_1st_term: "AY 2024-2025 | 1st Term",
    ay_2024_2025_2nd_term: "AY 2024-2025 | 2nd Term",
};

const scholarshipMapping = {
    academic_honoree_g11: "Academic Honoree - G11",
    academic_honoree_grade_7: "Academic Honoree - Grade 7",
    academic_honoree_rank_1_and_2: "Academic Honoree - Rank 1 and 2",
    academic_excellence_axa: "Academic Excellence (AXA)",
    academic_achiever_grade_11_top_20: "Academic Achiever - Grade 11 - Top 20",
    academic_honoree_grade_12_top_20: "Academic Honoree - Grade 12 - Top 20",
    presidents_list: "President's List",
    et_yuchengco: "E.T. Yuchengco",
    jose_rizal: "Jose Rizal Scholarship",
    mcm_cup: "MCM Cup",
    hyperlink: "Hyperlink",
    st_scholarship: "S&T Scholarship",
    paid_fund: "PAID Fund",
    bukas_ph: "Bukas.ph",
    early_bird: "Early Bird",
    referral: "Referral",
    sibling: "Sibling",
    ygc: "YGC",
    study_aid: "Study Aid",
};


export default function AddStudent() {

    const [currentTab, setCurrentTab] = useState(0);
    const [age, setAge] = useState('');

    const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema),
    });

    const profilePic = watch('profilePic');
    const defaultProfilePic = '/images/default-profile.png';

    const dateOfBirth = watch('dateOfBirth');
    const formattedDateOfBirth = dateOfBirth ? new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(dateOfBirth)) : '';


    useEffect(() => {
        showTab(0); // Show Tab 1 when the component mounts
    }, []);

    const showTab = (n) => {
        const tabs = document.querySelectorAll(".tab");
        tabs.forEach((tab, index) => {
            tab.style.display = index === n ? "flex" : "none";
        });
        document.getElementById("prevBtn").style.display = n === 0 ? "none" : "flex";
        document.getElementById("nextBtn").innerHTML = n === tabs.length - 1 ? "Add Student" : "Next";
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

        // Scroll to the top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

    const handleDateChange = (event, field) => {
        const birthDate = new Date(event.target.value);
        if (isNaN(birthDate.getTime())) {
            setValue(field, ''); // Update the form value
            return;
        }
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        setValue(field, age); // Update the form value
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
                <h1 className="text-black font-bold font-sans text-lg pt-1">Add Student</h1>
                <Button className="hover:bg-slate-500 border hover:black hover:text-white" onClick={() => window.history.back()}>Cancel</Button>
            </div>
            <Form id="regForm" onSubmit={handleSubmit(onSubmit)}>
                <div className="tab mt-3">
                    {/* Personal Info  */}
                        <div className="grid grid-cols-2 gap-5">
                            <div className="card-add-student hover:border-blue-200">
                                <h1 className='text-stone-600 text-sm font-semibold'>Personal Information</h1>
                                <div className='pl-5 pt-5 '>
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
                                        <Input type="date" className="w-35 mb-3 text-xs" onChange={(e) => handleDateChange(e, 'age')} {...register('dateOfBirth')} />
                                    </FormItem>
                                    <Label htmlFor="age" className="text-black text-xs">Age</Label>
                                    <FormItem label="age">
                                        <Input type="text" className="w-40 mb-3" value={watch('age')} readOnly {...register('age')} />
                                        {errors.age && <span className="text-red-500 text-xs">{errors.age.message}</span>}
                                    </FormItem>
                                </div>
                            </div>
                            {/* Org Info  */}

                            <div className="grid gap-3 ">
                                <div className=''>
                                    <div className="card-add-student hover:border-blue-200">
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
                                                                    <SelectValue placeholder="Select Program/Strand" />
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
                                        <div className='card-add-student border hover:border-blue-200'> 
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
                                                                <SelectValue placeholder="Select Scholarship" />
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
                                                            <SelectValue placeholder="Select Enrollment Status" />
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
                <div className="tab">
                    <div className="contact-info border pt-8 hover:border-blue-200">
                        <h1 className='text-stone-600 text-sm font-semibold'>Contact Information</h1>
                        <div className='pl-5 pt-5'>
                            <div>
                                <Label htmlFor="telNumber" className="text-black text-xs">Telephone Number</Label>
                                <FormItem label="telNumber">
                                    <Input type="tel" placeholder="0XX-XXX-YYYY" className="w-11/12 mb-3" {...register('telNumber')} />
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
                <div className="tab ">
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
                                    <div className='flex border border-red-600'>
                                        <div className="flex-auto">
                                            <FormItem label="sameAsPermanent">
                                                <Input id="sameAsPermanent" type="checkbox" className="mb-3 w-3 h-3 mr-2" onChange={(e) => handleSameAsPermanent(e)} />
                                            </FormItem>
                                        </div>
                                        <div className="text-black text-xs border border-blue-600">Same as Permanent Address</div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <div className="tab">
                    {/* Parent/Guardian Info  */}
                    <div className="grid grid-cols-2 gap-5">
                        <div className="card-add-student border hover:border-blue-200">
                            <h1 className='text-stone-600 text-sm font-semibold'>Parent/Guardian Information</h1>
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
                        <div className="card-add-student border hover:border-blue-200">
                            <h1 className='text-stone-600 text-sm font-semibold'>Parent/Guardian Information</h1>
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
                    <div className="contact-info border hover:border-blue-200">
                        <h1 className='text-stone-600 text-sm font-semibold'>Sibling Information</h1>
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
                                </FormItem>
                                <Label htmlFor="siblingAge" className="text-black text-xs">Age</Label>
                                <FormItem label="siblingAge">
                                    <Input type="text" className="w-40 mb-3" value={watch('siblingAge')} readOnly {...register('siblingAge')} />
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
                    <div className="grid grid-cols-2 gap-5 ">
                        <div className="upload-files border hover:border-blue-200">
                            <h1 className='text-stone-600 text-sm font-semibold'>Upload Documents</h1>
                            <div className='pl-5 pt-5'>
                                <Label htmlFor="form137" className="text-black text-xs">Form 137</Label>
                                <FormItem label="form137">
                                    <Input type="file" className="w-11/12 mb-3 border hover:border-blue-500" {...register('form137')} />
                                    {errors.form137 && <span className="text-red-500 text-xs">{errors.form137.message}</span>}
                                </FormItem>
                                <Label htmlFor="form138" className="text-black text-xs">Form 138</Label>
                                <FormItem label="form138">
                                    <Input type="file" className="w-11/12 mb-3 border hover:border-blue-500" {...register('form138')} />
                                    {errors.form138 && <span className="text-red-500 text-xs">{errors.form138.message}</span>}
                                </FormItem>
                                <Label htmlFor="goodMoral" className="text-black text-xs">Good Moral</Label>
                                <FormItem label="goodMoral">
                                    <Input type="file" className="w-11/12 mb-3 border hover:border-blue-500" {...register('goodMoral')} />
                                    {errors.goodMoral && <span className="text-red-500 text-xs">{errors.goodMoral.message}</span>}
                                </FormItem>
                                <Label htmlFor="nso" className="text-black text-xs">NSO/PSA</Label>
                                <FormItem label="nso">
                                    <Input type="file" className="w-11/12 mb-3 border hover:border-blue-500" {...register('nso')} />
                                    {errors.nso && <span className="text-red-500 text-xs">{errors.nso.message}</span>}
                                </FormItem>
                                <Label htmlFor="others" className="text-black text-xs">Others</Label>
                                <FormItem label="others">
                                    <Input type="file" className="w-11/12 mb-3 border hover:border-blue-500" {...register('others')} />
                                    {errors.others && <span className="text-red-500 text-xs">{errors.others.message}</span>}
                                </FormItem>
                            </div>
                        </div>
                        <div className="upload-picture border hover:border-blue-200">
                            <h1 className='text-stone-600 text-sm font-semibold'>Upload Picture</h1>
                            <div className='pl-5 pt-5'>
                                <Label htmlFor="profilePic" className="text-black text-xs">Profile Picture</Label>
                                <FormItem label="profilePic">
                                    <Input type="file" className="w-11/12 mb-3 border hover:border-blue-500" {...register('profilePic')} />
                                    {errors.profilePic && <span className="text-red-500 text-xs">{errors.profilePic.message}</span>}
                                </FormItem>
                            </div>
                            <div className="place-items-center pt-10">
                                <img 
                                    src={profilePic && profilePic.length > 0 ? URL.createObjectURL(profilePic[0]) : defaultProfilePic} 
                                    alt='profile-pic' 
                                    className="w-32 h-32 object-cover border border-black justify-center"
                                />
                            </div>

                        </div>
                    </div>
                </div>
                <div className="tab">
                    {/* Preview & Submit Page */}
                    <div className="grid bg-white place-items-center pt-1 h-4">
                         <h1 className='text-stone-600 text-sm font-semibold pr-16'>Review Information</h1>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                        <div className="card-add-student-preview grid-cols-1 place-items-center justify-center justify-items-center border hover:border-blue-900">
                        {/* Preview Personal Info */}
                            <div>
                                <h1 className='text-black text-lg font-bold pb-4'>Profile</h1>
                            </div>
                            <div>
                                <img 
                                    src={profilePic && profilePic.length > 0 ? URL.createObjectURL(profilePic[0]) : defaultProfilePic} 
                                    alt='profile-pic' 
                                    className="w-32 h-32 object-cover border border-black justify-center"
                                />
                            </div>
                            <div className='pt-2'>
                                <p className='text-black text-lg font-semibold'>
                                    {`${watch('firstName') || ''} ${watch('middleName') || ''} ${watch('lastName') || ''} ${watch('suffix') || ''}`.trim()}
                                </p>
                            </div>
                            <div>
                                <p className='text-black text-sm font-semibold'>{watch('studentNumber')}</p>
                            </div>
                            <Separator className="my-2" />
                            <div>
                                <p className='text-black text-sm font-semibold'>{yearLevelMapping[watch('yearLevel')]}</p>
                            </div>
                            <div>
                                <p className='text-blue-800 text-xs font-semibold'>{programMapping[watch('program')]}</p>
                            </div>
                            <div>
                                <p className='text-gray-500 text-xs mt-2'>Program</p>
                            </div>
                            <div className="justify-center">
                                <p className='text-black text-sm font-semibold pt-4'>{formattedDateOfBirth}</p>
                            </div>
                            <div>
                                <p className='text-gray-500 text-xs'>Date of Birth</p>
                            </div>
                            <div>
                                <p className='text-black text-sm font-semibold mt-4'>{watch('age')}</p>
                            </div>
                            <div>
                                <p className='text-gray-500 text-xs mt-2'>Age</p>
                            </div>
                        </div>
                        {/* Preview Enrollment Info */}
                        
                        <div className='grid gap-3'>
                            <div id="col2row1" className="card-add-student-preview grid-rows-3 place-items-center justify-center justify-items-center border hover:border-blue-900">
                            <div>
                                    <h1 className='text-black text-lg font-bold pb-2'>Enrollment Status</h1>
                                    </div>
                                    <div className='flex items-center'>
                                        <p className='text-blue-950 text-2xl font-bold'>{enrollmentStatusMapping[watch('enrollmentStatus')]?.text}</p>
                                        {watch('enrollmentStatus') && (
                                            <img src={enrollmentStatusMapping[watch('enrollmentStatus')]?.img} alt={enrollmentStatusMapping[watch('enrollmentStatus')]?.text} className="ml-2 w-9 h-9" />
                                        )}
                                    </div>
                                    <Separator className="-mt-6 w-3/4" />
                                    <div className='-mt-8'>
                                        <p className='text-black text-xs font-semibold'>{recentSchoolYearMapping[watch('recentSchoolYear')]}</p>
                                    </div>
                            </div>
                            <div id="col2row2" className="card-add-student-preview grid-rows-3 gap-2 place-items-center justify-center justify-items-center border hover:border-blue-900">
                            <div>
                                    <h1 className='text-black text-lg font-bold pb-2'>Scholarship Status</h1>
                                </div>
                                <div className='flex items-center'>
                                    <p className='text-blue-950 text-2xl font-bold'>{scholarshipStatusMapping[watch('scholarshipStatus')]?.text}</p>
                                    {watch('scholarshipStatus') && (
                                        <img src={scholarshipStatusMapping[watch('scholarshipStatus')]?.img} alt={scholarshipStatusMapping[watch('scholarshipStatus')]?.text} className="ml-2 w-9 h-9" />
                                    )}
                                </div>
                                <Separator className="-mt-6 w-3/4" />
                                <div className='-mt-8'>
                                    <h1 className='text-black text-xs font-semibold'>{scholarshipMapping[watch('scholarship')]}</h1>
                                </div>
                            </div>
                            <div id="col2row3" className="card-add-student-preview grid-rows-3 gap-2 place-items-center justify-center justify-items-center border hover:border-blue-900">
                                <div>
                                    <h1 className='text-stone-600 text-sm font-semibold'>Column2 third row</h1>
                                </div>
                            </div>
                        </div>

                        <div className='grid gap-3'>
                            <div id="col3row1" className="card-add-student-preview grid-rows-3 gap-2 place-items-center justify-center justify-items-center border hover:border-blue-900">
                                <h1 className='text-stone-600 text-sm font-semibold'>Column3 row1</h1>
                            </div>
                            <div id="col3row2" className="card-add-student-preview grid-rows-3 gap-2 place-items-center justify-center justify-items-center border hover:border-blue-900">
                                <h1 className='text-stone-600 text-sm font-semibold'>Column3 row2</h1>
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