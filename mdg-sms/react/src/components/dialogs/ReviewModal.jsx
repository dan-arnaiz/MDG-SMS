import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

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

const ReviewModal = ({ isOpen, onClose, data = {} }) => {
    const {
        profilePic,
        defaultProfilePic,
        formattedDateOfBirth,
        firstName,
        middleName,
        lastName,
        suffix,
        studentNumber,
        yearLevel,
        program,
        age,
        enrollmentStatus,
        recentSchoolYear,
        scholarshipStatus,
        scholarship,
        schoolEmail,
        personalEmail,
        contactNumber,
        houseBlockUnitNo,
        street,
        barangay,
        city,
        municipality,
        zipCode,
    } = data;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[69%]">
                <DialogHeader>
                    <DialogTitle>Review Information</DialogTitle>
                    <DialogDescription>Review the information before submitting.</DialogDescription>
                </DialogHeader>
                
                
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
                                {`${firstName || ''} ${middleName || ''} ${lastName || ''} ${suffix || ''}`.trim()}
                            </p>
                        </div>
                        <div>
                            <p className='text-black text-sm font-semibold'>{studentNumber}</p>
                        </div>
                        <Separator className="my-2" />
                        <div>
                            <p className='text-black text-sm font-semibold'>{yearLevelMapping[yearLevel]}</p>
                        </div>
                        <div>
                            <p className='text-blue-800 text-xs font-semibold'>{programMapping[program]}</p>
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
                            <p className='text-black text-sm font-semibold mt-4'>{age}</p>
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
                                <p className='text-blue-950 text-2xl font-bold'>{enrollmentStatusMapping[enrollmentStatus]?.text}</p>
                                {enrollmentStatus && (
                                    <img src={enrollmentStatusMapping[enrollmentStatus]?.img} alt={enrollmentStatusMapping[enrollmentStatus]?.text} className="ml-2 w-9 h-9" />
                                )}
                            </div>
                            <Separator className="-mt-6 w-3/4" />
                            <div className='-mt-8'>
                                <p className='text-black text-xs font-semibold'>{recentSchoolYearMapping[recentSchoolYear]}</p>
                            </div>
                        </div>
                        <div id="col2row2" className="card-add-student-preview grid-rows-3 gap-2 place-items-center justify-center justify-items-center border hover:border-blue-900">
                            <div>
                                <h1 className='text-black text-lg font-bold pb-2'>Scholarship Status</h1>
                            </div>
                            <div className='flex items-center'>
                                <p className='text-blue-950 text-2xl font-bold'>{scholarshipStatusMapping[scholarshipStatus]?.text}</p>
                                {scholarshipStatus && (
                                    <img src={scholarshipStatusMapping[scholarshipStatus]?.img} alt={scholarshipStatusMapping[scholarshipStatus]?.text} className="ml-2 w-9 h-9" />
                                )}
                            </div>
                            <Separator className="-mt-6 w-3/4" />
                            <div className='-mt-8'>
                                <h1 className='text-black text-xs font-semibold'>{scholarshipMapping[scholarship]}</h1>
                            </div>
                        </div>

                        {/* Preview Contact Info */}
                        <div id="col2row3" className="card-add-student-preview grid-rows-3 gap-2 place-items-center justify-center justify-items-center border hover:border-blue-900">
                            <div>
                                <h1 className='text-black text-lg font-bold pb-2'>Contact Information</h1>
                            </div>
                            <div>
                                <p className='text-black text-sm font-semibold'>{schoolEmail}</p>
                                <p className='text-gray-500 text-xs mt-2 pl-2'>School Email Address</p>
                            </div>
                            <div>
                                <p className='text-black text-sm font-semibold'>{personalEmail}</p>
                                <p className='text-gray-500 text-xs mt-2'>Personal Email Address</p>
                            </div>
                            <div>
                                <p className='text-black text-sm font-semibold'>{contactNumber}</p>
                                <p className='text-gray-500 text-xs mt-2'>Phone Number</p>
                            </div>
                            <Separator className="my-2 w-3/4" />
                            <div>
                                <p className='text-black text-sm font-semibold'>{`${houseBlockUnitNo}, ${street}, ${barangay}, ${city}, ${municipality}, ${zipCode}`}</p>
                                <p className='text-gray-500 text-xs mt-2'>Address</p>
                            </div>
                        </div>
                    </div>

                    {/* Preview Scholarship Info */}
                    <div className='grid gap-3'>
                        <div id="col3row1" className="card-add-student-preview grid-rows-3 gap-2 place-items-center justify-center justify-items-center border hover:border-blue-900">
                            <div>
                                <h1 className='text-black text-lg font-bold pb-2'>Scholarship</h1>
                            </div>
                            <div>
                                <p className='text-black text-sm font-semibold'>{scholarshipMapping[scholarship]}</p>
                            </div>
                            <Separator className="my-2 w-3/4" />
                            <div>
                                <p className='text-gray-500 text-xs mt-2'>Benefits</p>
                                <p className='text-black text-sm font-semibold'>Benefits Here</p>
                            </div>
                            <div>
                                <p className='text-gray-500 text-xs mt-2'>Retention Policy</p>
                                <p className='text-black text-sm font-semibold'>RetentionPolicyHere</p>
                            </div>
                            <div className="border rounded-lg hover:bg-blue-900 hover:text-white">
                                <button className='text-xs mx-6 my-1 pb-1'>View Scholarship</button>
                            </div>
                        </div>
                        <div id="col3row2" className="card-add-student-preview grid-rows-3 gap-2 place-items-center justify-center justify-items-center border hover:border-blue-900">
                            <div>
                                <h1 className='text-black text-lg font-bold pb-2'>Documents</h1>
                            </div>
                            <div className="border rounded-lg hover:bg-blue-900 hover:text-white">
                                <button className='text-xs mx-6 my-1 pb-1 mt-2'>All Documents</button>
                            </div>
                        </div> 
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={onClose}>Back</Button>
                    <Button type="submit" onClick={onClose}>Add Student</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

ReviewModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    data: PropTypes.shape({
        profilePic: PropTypes.array,
        defaultProfilePic: PropTypes.string,
        formattedDateOfBirth: PropTypes.string,
        firstName: PropTypes.string,
        middleName: PropTypes.string,
        lastName: PropTypes.string,
        suffix: PropTypes.string,
        studentNumber: PropTypes.string,
        yearLevel: PropTypes.string,
        program: PropTypes.string,
        age: PropTypes.string,
        enrollmentStatus: PropTypes.string,
        recentSchoolYear: PropTypes.string,
        scholarshipStatus: PropTypes.string,
        scholarship: PropTypes.string,
        schoolEmail: PropTypes.string,
        personalEmail: PropTypes.string,
        contactNumber: PropTypes.string,
        houseBlockUnitNo: PropTypes.string,
        street: PropTypes.string,
        barangay: PropTypes.string,
        city: PropTypes.string,
        municipality: PropTypes.string,
        zipCode: PropTypes.string,
    }),
};

export default ReviewModal;