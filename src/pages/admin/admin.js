import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { fetchUsers } from '../../services/api'
import './admin.css';
import CISadmin from "./CISadmin.js";
import CWMadmin from "./CWMadmin.js";
import ELOGadmin from "./ELOGadmin.js";
import { GridRowModes, GridRowEditStopReasons } from '@mui/x-data-grid';

function Admin() {
  // const [activeTab, setActiveTab] = useState(null);
  // const [users, setUsers] = useState([]);
  // const [rows, setRows] = useState([]);
  // const [rowModesModel, setRowModesModel] = useState({});
  // const history = useHistory();
  const location = useLocation();

  return (
    <Router>
      <div>
        <div className="tab-bar">
          <NavLink to="/admin/CISadmin">CIS</NavLink>
          <NavLink to="/admin/CWMadmin">CWM</NavLink>
          <NavLink to="/admin/ELOGadmin">ELOG</NavLink>
        </div>
        <Switch>
          <Route path="/admin/CISadmin">
            <CISadmin />
          </Route>
          <Route path="/admin/CWMadmin">
            <CWMadmin />
          </Route>
          <Route path="/admin/ELOGadmin">
            <ELOGadmin />
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

