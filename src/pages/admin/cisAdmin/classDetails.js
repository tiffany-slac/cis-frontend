import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../../components/breadcrumb';

const ClassDetails = () => {
  const { id } = useParams(); // Get the asset ID from the URL params
  const [inventoryDetails, setInventoryDetails] = useState(null); // State to hold the asset details
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Jobs');

  // Breadcrumb items for navigation
  const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: 'Admin', link: '/admin' },
    { label: 'Class Details', link: '/admin/class-details' },
  ];

  // Menu items for different tabs
  const menuItems = ['Details', 'Description', 'Attachments', 'Activity'];

  // Make an API request to fetch asset details by ID  
  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        // Fetch class data based on the ID
        const classData = await fetchClass(id);
        console.log('Fetched class data:', classData);

        if (classData) {
          setInventoryDetails(classData);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching class:', error.message);
      }
    };

    fetchClassDetails();
  }, [id]);

  // Handle tab click to change the active tab
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  // Scroll to content when a menu item is clicked
  const scrollToContent = (item) => {
    const contentElement = document.getElementById(item.toLowerCase());
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveTab(item);
  };

  // Render content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Jobs':
        return <div><br />Jobs Content</div>;
      case 'Approvals':
        return <div><br />Approvals Content</div>;
      case 'Solutions':
        return <div><br />Solutions Content</div>;
      case 'Comments':
        return <div><br />Comments Content</div>;
      case 'Emails Sent':
        return <div><br />Emails Sent Content</div>;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Breadcrumb for navigation */}
      <Breadcrumb items={breadcrumbItems} />

      <h1 id="details">ID: { id }</h1>
      {/* Other content */}

      <div className='content-container'>
        {/* Menu/Table of Contents */}
        <div className="statusmenu">
          <ul>
            {/* Map through menu items and create buttons */}
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
            {/* Card for asset details */}
            <div className='card'>
              {/* Asset Details */}
              {inventoryDetails ? (
                <div>
                  <h2>Details</h2>
                  <p>ID: {inventoryDetails._id}</p>
                  <p>Name: {inventoryDetails.name}</p>
                  <p>Type: {inventoryDetails.type}</p>
                  <div>
                    <h3>Metadata:</h3>
                    <ul>
                      {/* Check if metadata exists and is an object before using Object.entries() */}
                      {inventoryDetails.metadata && typeof inventoryDetails.metadata === 'object' ? (
                        Object.entries(inventoryDetails.metadata).map(([key, value]) => (
                          <li key={key}>
                            <strong>{key}:</strong> {value}
                          </li>
                        ))
                      ) : (
                        <li>No metadata available</li>
                      )}
                    </ul>
                  </div>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>

            {/* Description section */}
            <div className='card'>
              <div className="description-section">
                <h2 id="description">Description</h2>
                <textarea
                  className="description-textarea"
                  placeholder="Write a description..."
                  rows="4"
                  cols="50"
                ></textarea>
              </div>
            </div>

            {/* Attachments section */}
            <div className='card'>
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
            </div>

            {/* Activity section */}
            <div className='card'>
              <h2 id="activity">Activity</h2>
              {/* Tabs for different activities */}
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
              {/* Content based on the active tab */}
              <div className="tab-content">{renderTabContent()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
