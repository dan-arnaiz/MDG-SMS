import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider'; // Ensure the correct path to ContextProvider
import AddStudentModal from './AddStudentModal'; 

export default function Students() {
    const { students, loading, getStudents, addStudent, updateStudent, deleteStudent } = useStateContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getStudents();
    }, []);

    const openModal = (student = null) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedStudent(null);
        setIsModalOpen(false);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredStudents = students.filter(student =>
        student.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <div className="students-main">
                <div className="students-title">
                    <h1>Students</h1>
                </div>
                <div className="students-toolbar">
                    <div className="students-searchbox">
                        <div>
                            <FontAwesomeIcon icon={Icons.faMagnifyingGlass} size='lg' />
                        </div>
                        <input
                            type="text"
                            placeholder="Search Student"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="students-toolbar-btns">
                        <button>Filter</button>
                        <button>Import</button>
                        <button>Export</button>
                        <button className='addstudent-btn' onClick={() => openModal()}>Add Student</button>
                    </div>
                </div>

                <div className="students-list">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Student ID</th>
                                    <th>Scholarship</th>
                                    <th>Email Address</th>
                                    <th>Program</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map(s => (
                                    <tr key={s.id}>
                                        <td>
                                            <img src={`/storage/${s.picture}`} alt={`${s.last_name} ${s.first_name}`} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                                        </td>
                                        <td>{`${s.last_name}, ${s.first_name} ${s.suffix ? s.suffix + ' ' : ''}(${s.middle_name})`}</td>
                                        <td>{s.studentId}</td>
                                        <td>{s.scholarship}</td>
                                        <td>{s.emailaddress}</td>
                                        <td>{s.program}</td>
                                        <td>{s.status}</td>
                                        <td>
                                            <button onClick={() => openModal(s)}>Edit</button>
                                            <button onClick={() => deleteStudent(s.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="students-search-tools">
                    <div className="students-list-numdisplay">
                        <p>Display</p>
                        <select>
                            <option>10</option>
                            <option>15</option>
                            <option>20</option>
                        </select>
                        <p>Entries</p>
                    </div>
                    <p>Showing n of n of n entries</p>
                    <div className='search-tools-btns'>
                        <button><FontAwesomeIcon icon={Icons.faArrowLeft} size='lg' /></button>
                        {/* PAGINATION HERE */}
                        <button>1</button>
                        <button>2</button>
                        <button>3</button>
                        <button><FontAwesomeIcon icon={Icons.faArrowRight} size='lg' /></button>
                    </div>
                </div>
            </div>
            <AddStudentModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                onSubmit={selectedStudent ? (data) => updateStudent(selectedStudent.id, data) : addStudent}
                student={selectedStudent}
            />
        </div>
    );
}