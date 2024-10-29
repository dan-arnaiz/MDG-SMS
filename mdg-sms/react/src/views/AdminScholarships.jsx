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
                            <h2>E.T. Yuchengco Institutional Scholarship</h2>
                            <hr />
                            <div className="card-stats">
                                <div>
                                    <p className="number">16</p>
                                    <p className="label">Active</p>
                                </div>
                                <div>
                                    <p className="number">37</p>
                                    <p className="label">Inactive</p>
                                </div>
                                <div>
                                    <p className="number">10</p>
                                    <p className="label">Available</p>
                                </div>
                            </div>
                        </div>
                        <div className="card-scholarships">
                            <h2>Academic Excellence Award Scholarship</h2>
                            <hr />
                            <div className="card-stats">
                                <div>
                                    <p className="number">36</p>
                                    <p className="label">Active</p>
                                </div>
                                <div>
                                    <p className="number">15</p>
                                    <p className="label">Inactive</p>
                                </div>
                                <div>
                                    <p className="number">2</p>
                                    <p className="label">Available</p>
                                </div>
                            </div>
                        </div>
                        <div className="card-scholarships">
                            <h2>Academic Honoree Scholarship</h2>
                            <hr />
                            <div className="card-stats">
                                <div>
                                    <p className="number">40</p>
                                    <p className="label">Active</p>
                                </div>
                                <div>
                                    <p className="number">5</p>
                                    <p className="label">Inactive</p>
                                </div>
                                <div>
                                    <p className="number">0</p>
                                    <p className="label">Available</p>
                                </div>
                            </div>
                        </div>
                        <div className="card-scholarships">
                            <h2>YGC & Ayala Promotional Discount</h2>
                            <hr />
                            <div className="card-stats">
                                <div>
                                    <p className="number">21</p>
                                    <p className="label">Active</p>
                                </div>
                                <div>
                                    <p className="number">11</p>
                                    <p className="label">Inactive</p>
                                </div>
                                <div>
                                    <p className="number">9</p>
                                    <p className="label">Available</p>
                                </div>
                            </div>
                        </div>
                        <div className="card-scholarships">
                            <h2>Mapua MCM Cup</h2>
                            <hr />
                            <div className="card-stats">
                                <div>
                                    <p className="number">5</p>
                                    <p className="label">Active</p>
                                </div>
                                <div>
                                    <p className="number">2</p>
                                    <p className="label">Inactive</p>
                                </div>
                                <div>
                                    <p className="number">10</p>
                                    <p className="label">Available</p>
                                </div>
                            </div>
                        </div>
                        <div className="card-scholarships">
                            <h2>President's List</h2>
                            <hr />
                            <div className="card-stats">
                                <div>
                                    <p className="number">27</p>
                                    <p className="label">Active</p>
                                </div>
                                <div>
                                    <p className="number">11</p>
                                    <p className="label">Inactive</p>
                                </div>
                                <div>
                                    <p className="number">8</p>
                                    <p className="label">Available</p>
                                </div>
                            </div>
                        </div>
                        <div className="card-scholarships">
                            <h2>Academic Achiever Incentives</h2>
                            <hr />
                            <div className="card-stats">
                                <div>
                                    <p className="number">8</p>
                                    <p className="label">Active</p>
                                </div>
                                <div>
                                    <p className="number">12</p>
                                    <p className="label">Inactive</p>
                                </div>
                                <div>
                                    <p className="number">21</p>
                                    <p className="label">Available</p>
                                </div>
                            </div>
                        </div>
                        <div className="card-scholarships">
                            <h2>Sibling Discount</h2>
                            <hr />
                            <div className="card-stats">
                                <div>
                                    <p className="number">29</p>
                                    <p className="label">Active</p>
                                </div>
                                <div>
                                    <p className="number">17</p>
                                    <p className="label">Inactive</p>
                                </div>
                                <div>
                                    <p className="number">19</p>
                                    <p className="label">Available</p>
                                </div>
                            </div>
                        </div>
                        <div className="card-scholarships">
                            <h2>Jose Rizal Scholarship</h2>
                            <hr />
                            <div className="card-stats">
                                <div>
                                    <p className="number">16</p>
                                    <p className="label">Active</p>
                                </div>
                                <div>
                                    <p className="number">37</p>
                                    <p className="label">Inactive</p>
                                </div>
                                <div>
                                    <p className="number">10</p>
                                    <p className="label">Available</p>
                                </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    );
}