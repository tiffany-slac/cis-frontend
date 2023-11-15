import React from 'react';
import Profile from '../pages/Profile/Profile';
// import './App.css'; // Make sure to import your CSS

function Header() {
  return (
    <div className="Header">
      <div className='header-picture'>
        <img src="src\components\Logo.svg" alt="SLAC Logo" />
      </div>
      <div>
        {/* Add the Profile component at the top of the sidebar */}
        <Profile />
      </div>
    </div>
  );
}

export default Header;
