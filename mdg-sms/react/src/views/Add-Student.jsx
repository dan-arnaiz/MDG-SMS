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
                <div className="tab">
                    <div className="personal-info">
                        <h1 className='text-stone-600 text-sm'>Personal Information</h1>
                        <div className='pl-5 pt-5'>
                            <Label htmlFor="firstname" className="text-black text-base mb-2">First Name</Label>
                            <FormItem label="first-name">
                                <Input type="text" className="w-1/2 mb-3 text-base" /> 
                            </FormItem>
                            <Label htmlFor="middlename" className="text-black text-base">Middle Name</Label>
                            <FormItem label="middle-name">
                                <Input type="text" className="w-1/2 mb-3 text-base" /> 
                            </FormItem>
                            <Label htmlFor="lastname" className="text-black text-base">Last Name</Label>
                            <FormItem label="last-name">
                                <Input type="text" className="w-1/2 mb-3 text-base" /> 
                            </FormItem>
                            <Label htmlFor="suffix" className="text-black text-base">Suffix</Label>
                            <FormItem label="Suffix">
                                <Select>
                                    <SelectTrigger className="w-35 mb-3 text-base">
                                        <SelectValue placeholder="Suffix" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Suffix</SelectLabel>
                                            <SelectItem value="blank"> </SelectItem>
                                            <SelectItem value="jr">Jr.</SelectItem>
                                            <SelectItem value="sr">Sr.</SelectItem>
                                            <SelectItem value="ii">II</SelectItem>
                                            <SelectItem value="iii">III</SelectItem>
                                            <SelectItem value="iv">IV</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                            <Label htmlFor="suffix" className="text-black text-base">Age</Label>
                            <FormItem label="Age">
                                <Input type="text" className="w-full" /> {/* Adjust width using Tailwind CSS */}
                            </FormItem>
                        </div>
                    </div>
                    <div className="org-info">
                        <h1>ORGANIZATIONAL INFO</h1>
                        <div>
                            <div>
                                <FormItem label="MMCM Student Number">
                                    <Input type="text" className="w-full" /> {/* Adjust width using Tailwind CSS */}
                                </FormItem>
                                <FormItem label="Current Year">
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Year" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Year</SelectLabel>
                                                <SelectItem value="1">1</SelectItem>
                                                <SelectItem value="2">2</SelectItem>
                                                <SelectItem value="3">3</SelectItem>
                                                <SelectItem value="4">4</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            </div>
                            <div>
                                <FormItem label="Program/Strand">
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Program/Strand" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Program/Strand</SelectLabel>
                                                <SelectItem value="cs">Computer Science</SelectItem>
                                                <SelectItem value="it">Information Technology</SelectItem>
                                                <SelectItem value="eng">Engineering</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                                <FormItem label="Previous School">
                                    <Input type="text" className="w-full" /> {/* Adjust width using Tailwind CSS */}
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