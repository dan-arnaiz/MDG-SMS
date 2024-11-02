import { useState } from 'react';
import { Form, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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

export default function AddStudent() {
    const [currentTab, setCurrentTab] = useState(0);

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
                                <Label htmlFor="dateofbirth" className="text-black text-xs">Date of Birth</Label>
                                <FormItem label="dateofbirth">
                                    <Input type="text" className="w-35 mb-3 text-base" /> 
                                </FormItem>
                                <Label htmlFor="age" className="text-black text-xs">Age</Label>
                                <FormItem label="Age">
                                    <Input type="text" className="w-35 mb-3 text-base" /> 
                                </FormItem>
                            </div>
                        </div>
                        <div className="personal-info">
                            <h1 className='text-stone-600 text-sm'>Upload Photo</h1>

                        </div>
                    </div>
                    {/* Org Info  */}
                    <div className="org-info">
                        <h1 className='text-stone-600 text-sm'>Program Information</h1>
                        <div className='pl-5 pt-5'>
                            <div>
                            <Label htmlFor="lastname" className="text-black text-sm">MMCM Student Number</Label>
                                <FormItem label="MMCM Student Number">
                                    <Input type="text" className="w-35 mb-3 text-base" />
                                </FormItem>
                            <Label htmlFor="lastname" className="text-black text-sm">Year Level</Label>
                                <FormItem label="Current Year">
                                    <Select>
                                        <SelectTrigger className="w-full">
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
                            </div>
                            <div>
                            <Label htmlFor="lastname" className="text-black text-sm">Program</Label>
                                <FormItem label="Program/Strand" className="w-35 mb-3 text-base">
                                    <Select>
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
                                <Label htmlFor="recentschoolyear" className="text-black text-sm">Most Recent School Year</Label>
                                <FormItem label="Previous School">
                                    <Input type="text" className="w-35 mb-3 text-base" /> 
                                </FormItem>
                            </div>
                        </div>
                    </div>
                    <div className="contact-info">
                        <h1>CONTACT INFO</h1>
                        <div>
                            <div>
                                <FormItem label="Landline Number">
                                    <Input type="text" className="w-full" /> {/* Adjust width using Tailwind CSS */}
                                </FormItem>
                                <FormItem label="Mobile Number">
                                    <Input type="text" className="w-full" /> {/* Adjust width using Tailwind CSS */}
                                </FormItem>
                            </div>
                            <div>
                                <FormItem label="Personal Email">
                                    <Input type="text" className="w-full" /> {/* Adjust width using Tailwind CSS */}
                                </FormItem>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab">
                    {/* Additional tabs content */}
                </div>
                <div className="tab">
                    {/* Additional tabs content */}
                </div>
                <div className="tab">
                    {/* Additional tabs content */}
                </div>
                <div className="tab">
                    {/* Additional tabs content */}
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
                    <Button type="button" id="prevBtn" onClick={() => nextPrev(-1)}>Back</Button>
                    <Button type="button" id="nextBtn" onClick={() => nextPrev(1)}>Next</Button>
                </div>
            </div>
        </div>
    );
}