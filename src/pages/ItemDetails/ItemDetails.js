import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import './ItemDetails.css';

const ItemDetails = () => {
  const { id } = useParams(); // Get the asset ID from the URL params
  const [assetDetails, setAssetDetails] = useState(null); // State to hold the asset details
  const [activeTab, setActiveTab] = useState('Jobs');

  const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: 'Inventory', link: '/search' },
    { label: 'Item Details', link: '/search/asset-details' },
  ];

  const menuItems = ['Details', 'Description', 'Attachments', 'Activity'];

  // Make an API request to fetch asset details by ID
  useEffect(() => {
    const fetchAssetDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/assets/${id}`);
          
          const { name, type, metadata } = response.data;
          console.log('Asset details:', name, type, metadata);

          if (response.data) {
            // Assuming the data is received as expected
            setAssetDetails(response.data);
          }
        } catch (error) {
          console.error('Error fetching asset details:', error);
          // Handle error scenarios here
        }
      };
  
      fetchAssetDetails(); // Fetch asset details when the component mounts
    }, [id]); // Include 'id' in the dependency array to fetch data when the ID changes
  

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const scrollToContent = (item) => {
    const contentElement = document.getElementById(item.toLowerCase());
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveTab(item);
  };

  const renderTabContent = () => {
    // Render content based on the active tab
    switch (activeTab) {
      case 'Jobs':
        return <div><br></br>Jobs Content</div>;
      case 'Approvals':
        return <div><br></br>Approvals Content</div>;
      case 'Solutions':
        return <div><br></br>Solutions Content</div>;
      case 'Comments':
        return <div><br></br>Comments Content</div>;
      case 'Emails Sent':
        return <div><br></br>Emails Sent Content</div>;
      default:
        return null;
    }
  };

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />

      <h1 id="details">Item Details</h1>
      {/* Other content */}

<div className='content-container'>
      {/* Menu/Table of Contents */}
      <div className="statusmenu">
          <ul>
            {menuItems.map(item => (
              <li key={item}>
                <button
                  className={activeTab === item ? 'active' : ''}
                  onClick={() => scrollToContent(item)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

<div className='centered-container'>
      <div className="item-details-container">
        {/* Asset Details */}
        {assetDetails ? (
          <div>
            <h2>Asset Details</h2>
            <p>ID: {assetDetails.id}</p>
            <p>Name: {assetDetails.name}</p>
            <p>Type: {assetDetails.type}</p>
            <div>
              <h3>Metadata:</h3>
              <ul>
                {Object.entries(assetDetails.metadata).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}

        {/* Description section */}
        <div className="description-section">
          <h2 id="description">Description</h2>
          <textarea
            className="description-textarea"
            placeholder="Write a description..."
            rows="4"
            cols="50"
          ></textarea>
        </div>


        {/* Attachments section */}
        <div className="attachments-section">
          <h2 id="attachments">Attachments</h2>
          <div className="file-upload-container">
            <input type="file" id="file-input" multiple />
            <label htmlFor="file-input">Drag and drop files here or click to upload</label>
            <div className="uploaded-files">
              {/* Display uploaded files here */}
            </div>
          </div>
        </div>

        <div>
          <h2 id="activity">Activity</h2>
          <div className="activity-tabs">
          <div className={`tab ${activeTab === 'Jobs' ? 'active' : ''}`} onClick={() => handleTabClick('Jobs')}>
            Jobs
          </div>
          <div className={`tab ${activeTab === 'Approvals' ? 'active' : ''}`} onClick={() => handleTabClick('Approvals')}>
            Approvals
          </div>
          <div className={`tab ${activeTab === 'Solutions' ? 'active' : ''}`} onClick={() => handleTabClick('Solutions')}>
            Solutions
          </div>
          <div className={`tab ${activeTab === 'Comments' ? 'active' : ''}`} onClick={() => handleTabClick('Comments')}>
            Comments
          </div>
          <div className={`tab ${activeTab === 'Emails' ? 'active' : ''}`} onClick={() => handleTabClick('Emails Sent')}>
            Emails
          </div>
        </div>
        <div className="tab-content">{renderTabContent()}</div>
      </div>

      </div>
    </div>
    </div>
    </div>
  );
};

export default ItemDetails;
