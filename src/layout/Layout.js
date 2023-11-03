// Layout.js
import React from 'react';
import Sidebar from '../components/Sidebar'; // Import your Sidebar component from the components directory


const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Layout;
