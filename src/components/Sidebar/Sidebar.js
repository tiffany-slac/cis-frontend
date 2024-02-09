import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import { faHome, faNewspaper, faCog, faBox, faTicket, faLock } from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

function Sidebar() {
  // Use the current location to determine the active button
  const location = useLocation();
  // State to manage the collapsed/expanded state of the sidebar
  const [isCollapsed, setIsCollapsed] = useState(true);
  // State to keep track of the active button
  const [activeButton, setActiveButton] = useState(
    localStorage.getItem("activeButton") || location.pathname
  );

  // Handle button clicks and update the active button
  const handleClick = (buttonName, path) => {
    if (activeButton !== path) {
      setActiveButton(path);
      localStorage.setItem("activeButton", path);
    }
  };

  // Use useEffect to add a resize event listener and handle collapsing the sidebar on small screens
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
        {/* Sidebar buttons with links */}

        <br></br>

        <div>
          <Link to="/home">
            <button
              onClick={() => handleClick("home", "/home")}
              className={`icon-button ${
                activeButton === "/home" ? "active-button" : ""
              }`}
            >
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
            <button
              onClick={() => handleClick("inventory", "/inventory")}
              className={`icon-button ${
                activeButton === "/inventory" ? "active-button" : ""
              }`}
            >
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
          <Link to="/cwm">
            <button
              onClick={() => handleClick("cwm", "/cwm")}
              className={`icon-button ${
                activeButton === "/cwm" ? "active-button" : ""
              }`}
            >
              <div className="button-label">
                <FontAwesomeIcon
                  icon={faTicket}
                  className="icon"
                  title="CWM"
                />
                <div className="small-label">CWM</div>
                <span className="label">CWM</span>
              </div>
            </button>
          </Link>
        </div>

        <div>
          <Link to="/profile">
            <button
              onClick={() => handleClick("elogs", "/elogs")}
              className={`icon-button ${
                activeButton === "/elogs" ? "active-button" : ""
              }`}
            >
              <div className="button-label">
                <FontAwesomeIcon
                  icon={faNewspaper}
                  className="icon"
                  title="User"
                />
                <div className="small-label">eLogs</div>
                <span className="label">User</span>
              </div>
            </button>
          </Link>
        </div>

        <div>
          <Link to="/admin">
            <button
              onClick={() => handleClick("admin", "/admin")}
              className={`icon-button ${
                activeButton === "/admin" ? "active-button" : ""
              }`}
            >
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
            <button
              onClick={() => handleClick("settings", "/settings")}
              className={`icon-button ${
                activeButton === "/settings" ? "active-button" : ""
              }`}
            >
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
