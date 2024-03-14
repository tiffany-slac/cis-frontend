import React from 'react';
import Sidebar from '../components/sidebar/sidebar';
import Header from '../components/header'; // Import your Header component
import '../app.css';

function Layout({ children }) {
  return (
    // Main container for the layout
    <div className="Layout">
      {/* Sidebar component for navigation */}
      <Sidebar />
      
      {/* Header component for displaying the header */}
      <Header /> {/* Render the Header component here */}
      
      {/* Main content container */}
      <main className="Main">
        {/* Render the child components passed to Layout */}
        {children}
      </main>
    </div>
  );
}

export default Layout;
