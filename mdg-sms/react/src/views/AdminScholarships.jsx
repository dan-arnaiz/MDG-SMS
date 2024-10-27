import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom"

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
                <div className="students-list">
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
                        <button><FontAwesomeIcon icon={Icons.faArrowLeft} size='lg'/></button>
                        {/* PAGINATION HERE */}
                        <button>1</button>
                        <button>2</button>
                        <button>3</button>
                        <button><FontAwesomeIcon icon={Icons.faArrowRight} size='lg'/></button>
                    </div>
                </div>
            </div>
        </div>
    )
}