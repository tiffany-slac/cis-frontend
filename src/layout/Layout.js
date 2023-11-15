import React from 'react';
import Sidebar from '../components/Sidebar';
import '../App.css';

function Layout({ children }) {
  return (
    <div className="Layout">
      <Sidebar />
      <main className="Main">
        <main className="header">
        </main>
        {children}
      </main>
    </div>
  );
}

export default Layout;
