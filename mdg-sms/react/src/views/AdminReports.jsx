import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import {Link, useNavigate} from "react-router-dom"
import { Separator } from '@/components/ui/separator';
// import { Link } from "react-router-dom"



export default function AdminDash() {

    const navigate = useNavigate();


    return (
        <div>
            <div className="main">
                <div className="header-toolbar">
                    <h1 className='text-black font-bold font-sans text-lg'>Reports</h1>
                      
                </div>
                <div className="students-toolbar">
                    <div className="students-searchbox">
                        <div>
                            <FontAwesomeIcon icon={Icons.faMagnifyingGlass} size='lg'/>
                        </div>
                        <input type="text"  placeholder="Search Reports"/>
                    </div>                    
                    <div className="students-toolbar-btns">
                        <button className='addstudent-btn' onClick={() => navigate('/add-student')}>Create Report</button>
                    </div>                              
                </div>
                
            <div className="admin-dash h-40">
                <div className="grid grid-cols-2 gap-4 h-96" style={{ gridTemplateColumns: '40% 58%' }}>
                <div className="bg-white border rounded-lg mb-9">
                    <div className="flex justify-start space-x-4 p-4 border-b">
                    <div className="text-black text-sm font-semibold cursor-pointer hover:text-blue-900 relative">
                    Drafts
                    <div className="absolute w-full h-1 bg-blue-900 hover:translate-y-1"></div>
                    </div>
                        <div className="text-black text-sm font-semibold cursor-pointer hover:text-blue-900">Saved</div>
                    </div>
                    <div className='grid grid-rows-5 gap-2 px-7 pt-7'>
                        <div className='bg-blue-900 border rounded-md h-18 flex items-center p-2 hover:scale-105 border-blue-900'>
                            <img src="/images/pdf-logo.png" alt="PDF Logo" className="w-8 h-8 mr-2" />
                            <div>
                                <p className='text-white text-sm font-semibold'>Scholarship Report.pdf</p>
                                <p className='text-gray-400 text-xs'>Last Modified: September 9, 2024, 10:43 PM</p>
                            </div>
                        </div>
                        <div className='bg-slate-200 border rounded-md h-20 flex items-center p-2 hover:scale-105'>
                            <img src="/images/pdf-logo.png" alt="PDF Logo" className="w-8 h-8 mr-2" />
                            <div>
                                <p className='text-black font-semibold text-sm'>Sample-Document.pdf</p>
                                <p className='text-gray-500 text-xs'>Last Modified: September 9, 2024, 10:43 PM</p>
                            </div>
                        </div>
                        <div className='bg-slate-200 border rounded-md h-20 flex items-center p-2 hover:scale-105'>
                            <img src="/images/pdf-logo.png" alt="PDF Logo" className="w-8 h-8 mr-2" />
                            <div>
                                <p className='text-black font-semibold text-sm'>Sample-Document.pdf</p>
                                <p className='text-gray-500 text-xs'>Last Modified: September 9, 2024, 10:43 PM</p>
                            </div>
                        </div>
                        <div className='bg-slate-200 border rounded-md h-20 flex items-center p-2  hover:scale-105'>
                            <img src="/images/xls-logo.png" alt="XLS Logo" className="w-8 h-8 mr-2" />
                            <div>
                                <p className='text-black font-semibold text-sm'>Scholarship-Report2022.xlsx</p>
                                <p className='text-gray-500 text-xs'>Last Modified: September 9, 2024, 10:43 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
                    <div className="bg-white w-auto border rounded-lg flex flex-col items-center justify-center mb-9">
                    <h1 className='text-black text-lg font-bold pt-2 mt-10'>Scholarship Report.pdf</h1>
                    <Separator className=" w-3/4" />
                    <img src="/images/draft-template.jpg" alt="Draft Template" className="w-3/5 h-auto mt-4 pb-12"/>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}