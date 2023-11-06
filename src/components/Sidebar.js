import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Profile from '../pages/Profile';
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog, faSearch, faBriefcase, faFile, faArrowRight} from '@fortawesome/free-solid-svg-icons';


function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`Sidebar ${isCollapsed ? 'collapsed' : ''}`}>

            {/* Add the Profile component at the top of the sidebar */}
            <Profile />

            <ul>
                
                <div><Link to="/home">
                    <button className='icon-button'>
                        <FontAwesomeIcon icon={faHome} className="icon" />
                        <span className="label">Home</span>
                    </button>
                </Link></div>

                <div><Link to="/search">
                    <button className="icon-button">
                        <FontAwesomeIcon icon={faSearch} className="icon" />
                        <span className="label">Search</span>
                    </button>
                </Link></div>
                
                <div><Link to="/jobs">
                    <button className='icon-button'>
                        <FontAwesomeIcon icon={faBriefcase} className="icon" />
                        <span className="label">Jobs</span>
                    </button>
                </Link></div>

                <div><Link to="/profile">
                    <button className='icon-button'>
                        <FontAwesomeIcon icon={faUser} className="icon" />
                        <span className="label">User</span>
                    </button>
                </Link></div>

                <div><Link to="/reports">
                    <button className='icon-button'>
                        <FontAwesomeIcon icon={faFile} className="icon" />
                        <span className="label">File</span>
                    </button>
                </Link></div>

                <div><Link to="/settings">
                    <button className='icon-button'>
                        <FontAwesomeIcon icon={faCog} className="icon" />
                        <span className="label">Settings</span>
                    </button>
                </Link></div>

            </ul>

            <button onClick={toggleSidebar} className="icon-button">
                <FontAwesomeIcon icon={faArrowRight} className="icon" />
            </button>
        </div>
    );
}

export default Sidebar;

