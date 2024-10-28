import React from 'react';
import { useParams } from 'react-router-dom';

const StudentProfile = () => {
    const { studentId } = useParams();

    return (
        <div className="student-profile">
            <h1>Student Profile: {studentId}</h1>
            <div className="cards-container">
                <div className="card">
                    <h2>Card Title 1</h2>
                    <p>Card content goes here. This is a description of the card.</p>
                </div>
                <div className="card">
                    <h2>Card Title 2</h2>
                    <p>Card content goes here. This is a description of the card.</p>
                </div>
                <div className="card">
                    <h2>Card Title 3</h2>
                    <p>Card content goes here. This is a description of the card.</p>
                </div>
                <div className="card">
                    <h2>Card Title 4</h2>
                    <p>Card content goes here. This is a description of the card.</p>
                </div>
            </div>
        </div>
    );
};

export default StudentProfile;