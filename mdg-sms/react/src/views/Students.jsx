import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

export default function Students() {
    
    return(
        <div>
            <div className="students-main">
                <div className="students-title">
                    <h1>Students</h1>             
                </div>
                <div className="students-toolbar">
                    <div className="students-searchbox">
                        <div>
                            <FontAwesomeIcon icon={Icons.faMagnifyingGlass} size='lg'/>
                        </div>
                        <input type="text"  placeholder="Search Student"/>
                    </div>                    
                    <div className="students-toolbar-btns">
                        <button>Filter</button>
                        <button>Import</button>
                        <button>Export</button>
                        <button className='addstudent-btn'>Add Student</button>
                    </div>                          
                </div>
                {/* table */}
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
                        <button>1</button>
                        <button>2</button>
                        <button>3</button>
                    </div>
                </div>
            </div>
        </div>
    )
}