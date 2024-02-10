import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from "react-router-dom";
import SearchPage from "./SearchPage";
import ReportsPage from "./ReportsPage";
import CalendarPage from "./CalendarPage.js";
import SubHeader from './SubHeader.js';
import "./Cwm.css";

function Cwm() {
  const location = useLocation(); // Hook from react-router-dom to get the current location
  
  return (
<Router>
  <div>
    <div className="tab-bar">
      <NavLink to="/cwm/search">Search</NavLink>
      <NavLink to="/cwm/reports">Reports</NavLink>
      <NavLink to="/cwm/calendar">Calendar</NavLink>
    </div>
    <Switch>
      <Route path="/cwm/reports">
        <ReportsPage />
      </Route>
      <Route path="/cwm/calendar">
        <CalendarPage />
      </Route>
      <Route path="/cwm/search">
        <SearchPage />
      </Route>
      <Route path="/cwm"> {/* Render SearchPage when root path is matched */}
        <SearchPage />
      </Route>
    </Switch>
  </div>
</Router>

  );
}

// Custom NavLink component to handle active styling
function NavLink({ to, children }) {
  const location = useLocation(); // Hook from react-router-dom to get the current location
  const isActive = location.pathname === to || (location.pathname === "/cwm" && to === "/cwm/search"); // Check if current location is root path and target is "Search"
  
  return (
    <Link to={to} className={`cwm-tab ${isActive ? 'active' : ''}`}>
      {children}
    </Link>
  );
}


export default Cwm;
