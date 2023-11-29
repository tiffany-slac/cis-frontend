import React from 'react';
import logo from './Logo.png';

function Header() {
  return (
    <div className="main-header">
      <div className="logo-container">
        <img src={logo} alt="SLAC Logo" className="logo" />
      </div>
    </div>
  );
}

export default Header;
