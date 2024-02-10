import React, { useState } from "react";
import CISadmin from "./CISadmin.js";
import CWMadmin from "./CWMadmin.js";
import ELOGadmin from "./ELOGadmin.js";
import "./admin.css"; // Import CSS file for styling

function Admin() {
  const [activeTab, setActiveTab] = useState(null);

  const renderPage = () => {
    switch (activeTab) {
      case "CISadmin":
        return <CISadmin />;
      case "CWMadmin":
        return <CWMadmin />;
      case "ELOGadmin":
        return <ELOGadmin />;
      default:
        return <div className="welcome-message">Welcome to the Admin Page!</div>;
    }
  };

  return (
    <div>
      {/* Dropdown button positioned next to the heading text */}
      <div className="dropdown">
        <button className="admin-dropbtn">Select Admin</button>
        <div className="admin-dropdown">
          <button onClick={() => setActiveTab("CISadmin")}>CIS</button>
          <button onClick={() => setActiveTab("CWMadmin")}>CWM</button>
          <button onClick={() => setActiveTab("ELOGadmin")}>ELOG</button>
        </div>
      </div>

      <h1>Admin Dashboard</h1>
  
      {/* Render the selected page or welcome message */}
      {renderPage()}
    </div>
  );
}

export default Admin;
