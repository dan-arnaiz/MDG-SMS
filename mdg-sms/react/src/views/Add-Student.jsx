import React, { useState } from 'react';

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

    React.useEffect(() => {
        showTab(currentTab);
    }, [currentTab]);

    return(
        <div>
            <form id="regForm" action="">
                <div className="tab">
                    <div className="personal-info">
                        <h1>PERSONAL INFO</h1>
                        <p>First Name</p>
                        <input type="text"></input>
                        <div className="student-info2">
                            <div className="student-info2-1">
                                <p>Last Name</p>
                                <input type="text"></input>
                                <p>Suffix</p>
                                <select>
                                    <option>Jr.</option>
                                    <option>Sr.</option>
                                    <option>II</option>
                                    <option>III</option>
                                    <option>IV</option>
                                </select>
                            </div>
                            <div className="student-info2-2">
                                <p>Middle Name</p>
                                <input type="text"></input>
                                <div className="student-info3">
                                    <div>
                                        <p>Age</p>
                                        <input type="number" className="age-input" min={0}></input>
                                    </div>
                                    <div>
                                        <p>Birth Date</p>
                                        <input type="Date"></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="org-info">
                        <h1>ORGANIZATIONAL INFO</h1>
                        <div>
                            <div>
                                <p>MMCM Student Number</p>
                                <input type="text"></input>
                                <p>Current Year</p>
                                <select></select>
                            </div>
                            <div>
                                <p>Program/Strand</p>
                                <select></select>
                                <p>Previous School</p>
                                <input type="text"></input>
                            </div>
                        </div>    
                    </div>
                    <div className="contact-info">
                        <h1>CONTACT INFO</h1>
                        <div>
                            <div>
                                <p>Landline Number</p>
                                <input type="text"></input>
                                <p>Mobile Number</p>
                                <input type="text"></input>
                            </div>
                            <div>
                                <p>Personal Email</p>
                                <input type="text"></input>
                            </div>
                        </div>    
                    </div>
                </div>
                <div className="tab">
                    <div className='personal-info'>
                        <div className='address-header'>
                            <h1>PERMANENT ADDRESS</h1>
                            <button>Use an Existing Address</button>
                        </div>
                        <p>House/Block/Unit No.</p>
                        <input type='text'></input>
                        <p>Street Name</p>
                        <input type='text'></input>
                        <div className="address-select">
                            <div>
                                <p>Barangay</p>
                                <select></select>
                            </div>
                            <div>
                                <p>Province</p>
                                <select></select>
                            </div>
                            <div>
                                <p>City/Municipality</p>
                                <select></select>
                            </div>
                        </div>
                    </div>
                    <div className='personal-info'>
                        <div className='address-header'>
                            <h1>MAILING ADDRESS</h1>
                            <div>
                                <input type="checkbox"/> 
                                <p>Use permanent address as mailing address</p>
                            </div>
                        </div>
                        <p>House/Block/Unit No.</p>
                        <input type='text'></input>
                        <p>Street Name</p>
                        <input type='text'></input>
                        <div className="address-select">
                            <div>
                                <p>Barangay</p>
                                <select></select>
                            </div>
                            <div>
                                <p>Province</p>
                                <select></select>
                            </div>
                            <div>
                                <p>City/Municipality</p>
                                <select></select>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="tab">

                </div>
                <div className="tab">

                </div>
                <div className="tab">

                </div>
            </form>
            <div className="add-student-toolbar">
                <div>
                    <span className="step"></span>
                    <span className="step"></span>
                    <span className="step"></span>
                    <span className="step"></span>
                    <span className="step"></span>
                </div>
                <div className="add-students-btns">
                    <button type="button" id="prevBtn" onClick={() => nextPrev(-1)}>Back</button>
                    <button type="button" id="nextBtn" onClick={() => nextPrev(1)}>Next</button>
                </div>
            </div>             
        </div>
    )
}