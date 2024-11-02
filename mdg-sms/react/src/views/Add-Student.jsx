import { useState } from 'react';
import { Form, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';

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

    return(
        <div className="main">
            <Form id="regForm" action="">
                <div className="tab">
                    <div className="personal-info">
                        <h1>PERSONAL INFO</h1>
                        <FormItem label="First Name">
                            <Input type="text" />
                        </FormItem>
                        <div className="student-info2">
                            <div className="student-info2-1">
                                <FormItem label="Last Name">
                                    <Input type="text" />
                                </FormItem>
                                <FormItem label="Suffix">
                                    <Select>
                                        <option>Jr.</option>
                                        <option>Sr.</option>
                                        <option>II</option>
                                        <option>III</option>
                                        <option>IV</option>
                                    </Select>
                                </FormItem>
                            </div>
                            <div className="student-info2-2">
                                <FormItem label="Middle Name">
                                    <Input type="text" />
                                </FormItem>
                                <div className="student-info3">
                                    <div>
                                        <FormItem label="Age">
                                            <Input type="number" className="age-input" min={0} />
                                        </FormItem>
                                    </div>
                                    <div>
                                        <FormItem label="Birth Date">
                                            <Input type="date" />
                                        </FormItem>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="org-info">
                        <h1>ORGANIZATIONAL INFO</h1>
                        <div>
                            <div>
                                <FormItem label="MMCM Student Number">
                                    <Input type="text" />
                                </FormItem>
                                <FormItem label="Current Year">
                                    <Select></Select>
                                </FormItem>
                            </div>
                            <div>
                                <FormItem label="Program/Strand">
                                    <Select></Select>
                                </FormItem>
                                <FormItem label="Previous School">
                                    <Input type="text" />
                                </FormItem>
                            </div>
                        </div>    
                    </div>
                    <div className="contact-info">
                        <h1>CONTACT INFO</h1>
                        <div>
                            <div>
                                <FormItem label="Landline Number">
                                    <Input type="text" />
                                </FormItem>
                                <FormItem label="Mobile Number">
                                    <Input type="text" />
                                </FormItem>
                            </div>
                            <div>
                                <FormItem label="Personal Email">
                                    <Input type="text" />
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
    )
}