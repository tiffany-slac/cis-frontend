import React from 'react';
import { Link } from 'react-router-dom';


function Sidebar() {
  return (
    <div className="bg-gray-800 text-white h-screen w-64 flex-shrink-0 hidden sm:block">
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/reports">Reports</Link>
        </li>
        <li>
          <Link to="/jobs">Jobs</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

