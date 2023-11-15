import React, { useState } from 'react';
import profileImage from '../../components/profile.jpg';
import './Profile.css';


const Profile = () => {
  const [activeTab, setActiveTab] = useState('tab1'); // State to manage active tab

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const user = {
    firstName: 'John',
    lastName: 'Doe',
    // Include other user details here
  };

  return (
    <div className="profile">
      <div className="user-card">
        <div className="user-info">
          <img src={profileImage} alt="User" className="user-picture" />
          <h2>{`${user.firstName} ${user.lastName}`}</h2>
          {/* Add other user details here */}
          <p>Email: johndoe@example.com</p>
          <p>Location: New York</p>
        </div>
      </div>
      <div className="tabs">
        {/* Tabs for menu selection */}
        <button onClick={() => handleTabChange('tab1')} className={activeTab === 'tab1' ? 'active' : ''}>
          History
        </button>
        <button onClick={() => handleTabChange('tab2')} className={activeTab === 'tab2' ? 'active' : ''}>
          Preferences
        </button>
      </div>
      <div className="content">
        {/* Content based on the active tab */}
        {activeTab === 'history' && (
          <div className="menu">
            <p>My Caters</p>
            <p>My Jobs</p>
            <p>My RSWCF</p>
            <p>My Tasks</p>
            <p>Open Solutions</p>
            <p>My Watchlist</p>
          </div>
        )}
        {activeTab === 'preferences' && (
          <div className="menu">
            <p>Email Notifications</p>
            <p>Access Privileges</p>
          </div>
        )}
        <div className="body-content">
          <p>This will have details about the history.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
