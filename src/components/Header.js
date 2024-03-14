import React from 'react';
import logo from './Logo.png';

function Header() {
  return (
    // Main container for the header
    <div className="main-header">
      {/* Container for the logo */}
      <div className="logo-container">
        {/* Displaying the SLAC logo */}
        <img src={logo} alt="SLAC Logo" className="logo" />
      </div>
    </div>
  );
}

export default Header;
