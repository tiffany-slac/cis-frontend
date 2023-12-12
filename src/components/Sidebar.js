import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog, faBox, faBriefcase, faLock, faBars} from '@fortawesome/free-solid-svg-icons';


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
                <FontAwesomeIcon icon={faBars} className="icon" title="Menu"/>
            </button>

            <ul>
                
                <div><Link to="/home">
                    <button className='icon-button'>
                        <FontAwesomeIcon icon={faHome} className="icon" title="Home" />
                        <span className="label">Home</span>
                    </button>
                </Link></div>

                <div><Link to="/inventory">
                    <button className="icon-button">
                        <FontAwesomeIcon icon={faBox} className="icon" title="Inventory" />
                        <span className="label">Inventory</span>
                    </button>
                </Link></div>
                
                <div><Link to="/jobs">
                    <button className='icon-button'>
                        <FontAwesomeIcon icon={faBriefcase} className="icon" title="Jobs" />
                        <span className="label">Jobs</span>
                    </button>
                </Link></div>

                <div><Link to="/profile">
                    <button className='icon-button'>
                        <FontAwesomeIcon icon={faUser} className="icon" title="User" />
                        <span className="label">User</span>
                    </button>
                </Link></div>

                <div><Link to="/admin">
                    <button className='icon-button'>
                        <FontAwesomeIcon icon={faLock} className="icon" title="Admin" />
                        <span className="label">Admin</span>
                    </button>
                </Link></div>

                <div><Link to="/settings">
                    <button className='icon-button'>
                        <FontAwesomeIcon icon={faCog} className="icon" title="Settings"/>
                        <span className="label">Settings</span>
                    </button>
                </Link></div>

            </ul>
        </div>
    );
}

export default Sidebar;

