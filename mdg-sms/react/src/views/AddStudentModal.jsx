import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// Modal.setAppElement('#root'); // Set the root element for accessibility

const AddStudentModal = ({ isOpen, onRequestClose, onSubmit, student }) => {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [suffix, setSuffix] = useState('');
  const [studentId, setStudentId] = useState('');
  const [scholarship, setScholarship] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [program, setProgram] = useState('');
  const [status, setStatus] = useState('');
  const [picture, setPicture] = useState(null);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const programs = [
    'Computer Science',
    'Information Technology',
    'Software Engineering',
    'Data Science',
    'Cyber Security'
  ];

  const scholarships = [
    'Acad Honoree (ACAD HON) G11',
    'Acad Honoree (ACAD HON) G7',
    'Acad Honoree (Rank 1 and 2)',
    'Acad Excellence (AXA)',
    'Acad Achiever (G11) Top 20',
    'Academic Honoree(ACAD Hon) Top 20 G12',
    "President's List",
    'ETY',
    'Jose Rizal',
    'MCM Cup',
    'Hyperlink',
    'S&T Scholarship',
    'Financial Assistance',
    'PAID Fund',
    'Bukas.ph',
    'Discounts',
    'Early Bird',
    'Referral',
    'Sibling',
    'YGC',
    'Study Aid'
  ];

  const suffixes = [
    '',
    'Jr',
    'Sr',
    'II',
    'III',
    'IV',
    'V'
  ];

  const statuses = [
    'Active Scholar',
    'Enrolled',
    'Not Enrolled'
  ];

  useEffect(() => {
    if (student) {
      setLastName(student.last_name);
      setFirstName(student.first_name);
      setMiddleName(student.middle_name || '');
      setSuffix(student.suffix || '');
      setStudentId(student.studentId);
      setScholarship(student.scholarship || '');
      setEmailAddress(student.emailaddress);
      setProgram(student.program);
      setStatus(student.status);
      setPicture(null); // Reset picture for editing
    } else {
      setLastName('');
      setFirstName('');
      setMiddleName('');
      setSuffix('');
      setStudentId('');
      setScholarship('');
      setEmailAddress('');
      setProgram('');
      setStatus('');
      setPicture(null);
    }
    setErrors(null); // Reset errors when modal is opened
  }, [student]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const studentData = new FormData();
    studentData.append('last_name', lastName);
    studentData.append('first_name', firstName);
    studentData.append('middle_name', middleName);
    studentData.append('suffix', suffix);
    studentData.append('studentId', studentId);
    studentData.append('scholarship', scholarship);
    studentData.append('emailaddress', emailAddress);
    studentData.append('program', program);
    studentData.append('status', status);
    if (picture) {
      studentData.append('picture', picture);
    }
    onSubmit(studentData)
      .then(() => {
        toast.success('Student successfully added!');
        setTimeout(() => {
          navigate('/student-list');
        }, 2000); // Navigate after 2 seconds
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          setErrors({ general: ['An unexpected error occurred.'] });
        }
      });
  };

  const handleFileChange = (e) => {
    setPicture(e.target.files[0]);
  };

  return (
    <>
      <ToastContainer />
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Add Student Modal"
        className="ReactModal__Content"
        overlayClassName="ReactModal__Overlay"
        bodyOpenClassName="ReactModal__Body--open"
        closeTimeoutMS={300} // Match the duration of the flyOut animation
      >
        <h2>{student ? 'Edit Student' : 'Add New Student'}</h2>
        <form onSubmit={handleSubmit}>
          {errors && <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>}
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Middle Name:</label>
            <input
              type="text"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
            />
          </div>
          <div>
            <label>Suffix:</label>
            <select
              value={suffix}
              onChange={(e) => setSuffix(e.target.value)}
            >
              {suffixes.map((suffix) => (
                <option key={suffix} value={suffix}>
                  {suffix}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Student ID:</label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Scholarship:</label>
            <select
              value={scholarship}
              onChange={(e) => setScholarship(e.target.value)}
            >
              <option value="" disabled>Select a scholarship</option>
              {scholarships.map((scholarship) => (
                <option key={scholarship} value={scholarship}>
                  {scholarship}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Email Address:</label>
            <input
              type="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Program:</label>
            <select
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              required
            >
              <option value="" disabled>Select a program</option>
              {programs.map((prog) => (
                <option key={prog} value={prog}>
                  {prog}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="" disabled>Select a status</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Picture:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit">{student ? 'Update Student' : 'Add Student'}</button>
          <button type="button" onClick={onRequestClose}>Cancel</button>
        </form>
      </Modal>
    </>
  );
};

AddStudentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  student: PropTypes.object
};

export default AddStudentModal;