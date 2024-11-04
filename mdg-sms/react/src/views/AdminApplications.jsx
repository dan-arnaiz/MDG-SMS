import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"
import { Separator } from '@/components/ui/separator'

export default function AdminApplications() {





    return (
        <div>
            <div className="main">
                <div className="header-toolbar">
                    <h1 className='text-black font-bold font-sans text-lg'>Applications</h1>
                </div>
                <div className="students-toolbar">
                    <div className="students-searchbox">
                        <div>
                            <FontAwesomeIcon icon={Icons.faMagnifyingGlass} size='lg' />
                        </div>
                        <input type="text" placeholder="Search Applications" />
                    </div>
                    <div className="students-toolbar-btns">
                        <button className='text-sm border hover:to-blue-500'>Filter</button>
                        <Link className='addstudent-btn' to="/scholarships">Manage Scholarships</Link>
                    </div>
                </div>
                <div className="admin-dash h-40">
                    <div className="grid grid-cols-2 gap-4 h-96" style={{ gridTemplateColumns: '40% 58%' }}>
                        <div className="bg-white border rounded-lg mb-9">
                            <div className="flex justify-start space-x-4 p-4 border-b">
                                <div className="text-black text-sm font-semibold cursor-pointer hover:text-blue-900 relative">
                                    Pending
                                    <div className="absolute w-full h-1 bg-blue-900 hover:translate-y-1"></div>
                                </div>
                                <div className="text-black text-sm font-semibold cursor-pointer hover:text-blue-900">Approved</div>
                            </div>
                            <div className='grid grid-rows-5 gap-2 px-7 pt-7'>
                                    <div className='bg-slate-200 border border-blue-400 rounded-md h-20 flex items-center p-2 hover:scale-105'>
                                            <img src="/images/default-profile.png" alt="Profile" className="w-10 h-10 mr-2 rounded-full" />
                                            <div>
                                                <p className='text-black font-semibold text-sm'>Martin Bernard F. Bondoc</p>
                                                <p className='text-gray-500 text-xs'>Requested: October 29, 2024</p>
                                            </div>
                                            <div className="ml-auto flex space-x-2 mr-4">
                                                <button className='text-blue-500 hover:text-blue-700 text-xs'>View</button>
                                                <button className='text-red-400 hover:text-blue-700 text-xs'>Delete</button>
                                            </div>
                                        </div>
                                    <div className='bg-slate-200 border border-blue-400 rounded-md h-20 flex items-center p-2 hover:scale-105'>
                                        <img src="/images/default-profile.png" alt="Profile" className="w-10 h-10 mr-2 rounded-full" />
                                        <div>
                                            <p className='text-black font-semibold text-sm'>Dan Floyd L. Arnaiz</p>
                                            <p className='text-gray-500 text-xs'>Requested: October 29, 2024</p>
                                        </div>
                                        <div className="ml-auto flex space-x-2 mr-4">
                                            <button className='text-blue-500 hover:text-blue-700 text-xs'>View</button>
                                            <button className='text-red-400 hover:text-blue-700 text-xs'>Delete</button>
                                        </div>
                                    </div>
                                    <div className='bg-slate-200 border border-blue-400 rounded-md h-20 flex items-center p-2 hover:scale-105'>
                                        <img src="/images/default-profile.png" alt="Profile" className="w-10 h-10 mr-2 rounded-full" />
                                        <div>
                                            <p className='text-black font-semibold text-sm'>George R. Bustamante III</p>
                                            <p className='text-gray-500 text-xs'>Requested: October 29, 2024</p>
                                        </div>
                                        <div className="ml-auto flex space-x-2 mr-4">
                                            <button className='text-blue-500 hover:text-blue-700 text-xs'>View</button>
                                            <button className='text-red-400 hover:text-blue-700 text-xs'>Delete</button>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div className="bg-white w-auto border rounded-lg flex flex-col items-center justify-center mb-9">
                            <h1 className='text-black text-lg font-bold pt-2 mt-10'>Application Details</h1>
                            <Separator className="w-3/4" />
                            <img src="/images/default-application-form.jpeg" alt="Application Form" className="w-3/5 h-auto mt-4 pb-12 border border-black" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}