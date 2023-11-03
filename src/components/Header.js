// Header.js
import React from 'react';

function Header() {
  return (
    <header>
      <nav>
        {/* Navigation links */}
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/profile">Profile</a></li>
          {/* Add more links as needed */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
