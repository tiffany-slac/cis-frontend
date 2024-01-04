import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faNewspaper,
  faUser,
  faCog,
  faBox,
  faTicket,
  faLock,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeButton, setActiveButton] = useState('home');

  const handleClick = (buttonName) => {
    if (activeButton === buttonName) {
      setActiveButton(null); // Toggle off active state if same button clicked
    } else {
      setActiveButton(buttonName); // Set the active button
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const handleResize = () => {
      const sidebar = document.querySelector(".Sidebar");
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    // Remove the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures it only runs once on mount

  return (
    <div className={`Sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <ul>
        {/* <div>
          <button onClick={toggleSidebar} className="icon-button">
            <FontAwesomeIcon icon={faBars} className="icon" title="Menu" />
          </button>
        </div> */}

        <br></br>

        <div>
          <Link to="/home">
            <button 
            onClick={() => handleClick('home')}
            className={`icon-button ${activeButton === 'home' ? 'active-button' : ''}`}> 
              <div className="button-label">
                <FontAwesomeIcon icon={faHome} className="icon" title="Home" />
                <div className="small-label">Home</div>
              </div>
              <span className="label">Home</span>
            </button>
          </Link>
        </div>

        <div>
          <Link to="/inventory">
            <button onClick={() => handleClick('inventory')}
            className={`icon-button ${activeButton === 'inventory' ? 'active-button' : ''}`}>
              <div className="button-label">
                <FontAwesomeIcon
                  icon={faBox}
                  className="icon"
                  title="Inventory"
                />
                <span className="small-label">Inventory</span>
                <span className="label">Inventory</span>
              </div>
            </button>
          </Link>
        </div>

        <div>
          <Link to="/jobs">
            <button onClick={() => handleClick('cater')}
            className={`icon-button ${activeButton === 'cater' ? 'active-button' : ''}`}>
              <div className="button-label">
                <FontAwesomeIcon
                  icon={faTicket}
                  className="icon"
                  title="Jobs"
                />
                <div className="small-label">CATER</div>
                <span className="label">Jobs</span>
              </div>
            </button>
          </Link>
        </div>

        <div>
          <Link to="/profile">
            <button onClick={() => handleClick('elogs')}
            className={`icon-button ${activeButton === 'elogs' ? 'active-button' : ''}`}>
              <div className="button-label">
                <FontAwesomeIcon icon={faNewspaper} className="icon" title="User" />
                <div className="small-label">eLogs</div>
                <span className="label">User</span>
              </div>
            </button>
          </Link>
        </div>

        <div>
          <Link to="/admin">
            <button onClick={() => handleClick('admin')}
            className={`icon-button ${activeButton === 'admin' ? 'active-button' : ''}`}>
              <div className="button-label">
                <FontAwesomeIcon icon={faLock} className="icon" title="Admin" />
                <div className="small-label">Admin</div>
                <span className="label">Admin</span>
              </div>
            </button>
          </Link>
        </div>

        <div>
          <Link to="/settings">
            <button onClick={() => handleClick('settings')}
            className={`icon-button ${activeButton === 'settings' ? 'active-button' : ''}`}>
              <div className="button-label">
                <FontAwesomeIcon
                  icon={faCog}
                  className="icon"
                  title="Settings"
                />
                <span className="small-label">Settings</span>
                <span className="label">Settings</span>
              </div>
            </button>
          </Link>
        </div>
      </ul>
    </div>
  );
}

export default Sidebar;
