import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"

export default function AdminScholarships() {
    
    return(
        <div>
            <div className="students-main">
                <div className="students-title">
                    <h1>Scholarships</h1>             
                </div>
                <div className="students-toolbar">
                    <div className="students-searchbox">
                        <div>
                            <FontAwesomeIcon icon={Icons.faMagnifyingGlass} size='lg'/>
                        </div>
                        <input type="text"  placeholder="Search Scholarship"/>
                    </div>                    
                    <div className="students-toolbar-btns">
                        <button>Filter</button>
                        <Link className='addstudent-btn' to="">Add Scholarship</Link>
                    </div>                          
                </div>
                <div>
                    <div className="cards-container-scholarships">
                    <div className="card-scholarships">
                            <h2>Scholarship 1</h2>
                            <p>Description of Scholarship 1.</p>
                        </div>
                        <div className="card-scholarships">
                            <h2>Scholarship 2</h2>
                            <p>Description of Scholarship 2.</p>
                        </div>
                        <div className="card-scholarships">
                            <h2>Scholarship 3</h2>
                            <p>Description of Scholarship 3.</p>
                        </div>
                        <div className="card-scholarships">
                            <h2>Scholarship 4</h2>
                            <p>Description of Scholarship 4.</p>
                        </div>
                        <div className="card-scholarships">
                            <h2>Scholarship 5</h2>
                            <p>Description of Scholarship 5.</p>
                        </div>
                        <div className="card-scholarships">
                            <h2>Scholarship 6</h2>
                            <p>Description of Scholarship 6.</p>
                        </div>
                        <div className="card-scholarships">
                            <h2>Scholarship 7</h2>
                            <p>Description of Scholarship 7.</p>
                        </div>
                        <div className="card-scholarships">
                            <h2>Scholarship 8</h2>
                            <p>Description of Scholarship 8.</p>
                        </div>
                        <div className="card-scholarships">
                            <h2>Scholarship 9</h2>
                            <p>Description of Scholarship 9.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}