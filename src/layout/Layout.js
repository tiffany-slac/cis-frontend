import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header'; // Import your Header component
import '../App.css';

function Layout({ children }) {
  return (
    <div className="Layout">
      <Sidebar />
      <Header /> {/* Render the Header component here */}
      <main className="Main">
        {children}
      </main>
    </div>
  );
}

export default Layout;
