import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useLocation, Redirect } from "react-router-dom";
import './admin.css';
import CISadmin from "./cisAdmin.js";
import CWMadmin from "./cwmAdmin.js";
import ELOGadmin from "./elogAdmin.js";
import GeneralAdmin from "./generalAdmin.js";

function Admin() {
  const location = useLocation();

  return (
    <Router>
      <div>
        <div className="admin-tab-extension">
        <div className="tab-bar">
          <NavLink to="/admin/generalAdmin">Admin</NavLink>
          <NavLink to="/admin/CISadmin">CIS</NavLink>
          <NavLink to="/admin/CWMadmin">CWM</NavLink>
          <NavLink to="/admin/ELOGadmin">ELOG</NavLink>
        </div>
        </div>
        <Switch>
          <Route exact path="/">
            <Redirect to="/admin/generalAdmin" /> {/* Redirect the default route to generalAdmin */}
          </Route>
          <Route path="/admin/CISadmin">
            <CISadmin />
          </Route>
          <Route path="/admin/CWMadmin">
            <CWMadmin />
          </Route>
          <Route path="/admin/ELOGadmin">
            <ELOGadmin />
          </Route>
          <Route path="/admin/generalAdmin"> {/* Define a new route for generalAdmin */}
            <GeneralAdmin />
          </Route>
        </Switch>
      </div>
    </Router>
      );
    }
    
    // Custom NavLink component to handle active styling
    function NavLink({ to, children }) {
      const location = useLocation(); // Hook from react-router-dom to get the current location
      const isActive = location.pathname === to || (location.pathname === "/admin" && to === "/admin/CISadmin"); // Check if current location is root path and target is "Search"
      
      return (
        <Link to={to} className={`cwm-tab ${isActive ? 'active' : ''}`}>
          {children}
        </Link>
      );
    }

export default Admin;

