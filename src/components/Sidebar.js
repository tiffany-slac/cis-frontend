import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog, faSearch, faBriefcase, faFile, faBars} from '@fortawesome/free-solid-svg-icons';


function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    useEffect(() => {
        const handleResize = () => {
            const sidebar = document.querySelector('.Sidebar');
            if (window.innerWidth < 768) {
                setIsCollapsed(true);
            }
        };

        window.addEventListener('resize', handleResize);
        // Remove the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array ensures it only runs once on mount


    return (
        <div className={`Sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            
            <button onClick={toggleSidebar} className="icon-button">
                <FontAwesomeIcon icon={faBars} className="icon" />
            </button>

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
        </div>
    );
}

export default Sidebar;

