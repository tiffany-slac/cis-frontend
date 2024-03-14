import React, { useState, useEffect } from 'react';
import { fetchProfile } from "../../services/api.js"
import profileImage from '../../assets/profile.jpg';
import './settings.css';

function Settings() {
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('history'); // State to manage active tab

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const data = await fetchProfile();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching shop groups:', error);
      }
    };

    fetchMe(); // Call the function to fetch shop groups when the component mounts
  }, []);

  return (
    <div className="profile">
      <div className="user-card">
        <div className="user-info">
          <div className="user-picture-container">
            <img src={profileImage} alt="User" className="user-picture" />
          </div>
          <div className="user-details">
            {/* Render profile data if available */}
            {profile && (
              <>
                <h2>{profile.commonName} {profile.surname}</h2>
                <p>{profile.mail}</p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="tabs">
        {/* Tabs for menu selection */}
        <button onClick={() => handleTabChange('history')} className={activeTab === 'history' ? 'active' : ''}>
          History
        </button>
        <button onClick={() => handleTabChange('notifications')} className={activeTab === 'notifications' ? 'active' : ''}>
          Notifications
        </button>
      </div>
      <div className="content">
        {/* Content based on the active tab */}
        {activeTab === 'history' && (
          <div className="menu">
            <p>History Content</p>
          </div>
        )}
        {activeTab === 'notifications' && (
          <div className="menu">
            <p>Notifications Content</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;
