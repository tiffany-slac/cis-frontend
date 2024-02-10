// LocationForm.js

import React, { useState } from 'react';
import { createLocation } from '../../services/api'; // Import the createLocation API function
import './LocationForm.css'; // Import the CSS file for styling

function LocationForm({ showLocationForm, setShowLocationForm }) {
  // State to manage form input values
  const [locationData, setLocationData] = useState({
    parentId: '',
    name: '',
    description: '',
    externalLocationIdentifier: '',
    locationManagerUserId: '',
    locationShopGroupId: ''
  });

  // Function to handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLocationData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createLocation(locationData);
      alert("Location created successfully!");
      // Clear form after successful submission if needed
      // setLocationData({
      //   parentId: '',
      //   name: '',
      //   description: '',
      //   externalLocationIdentifier: '',
      //   locationManagerUserId: '',
      //   locationShopGroupId: ''
      // });
    } catch (error) {
      console.error('Error creating location:', error);
      alert("Error creating location. Please try again.");
    }
  };

  // JSX for the component
  return (
    <div className={`modal ${showLocationForm ? "show" : "hide"}`}>
      <div className="form-content">
        <span className="close" onClick={() => setShowLocationForm(false)}>
          &times;
        </span>

        <h1 className="form-title">NEW LOCATION</h1> {/* Title for the form */}

        <form onSubmit={handleSubmit} className="location-form">
          <div className="form-group">
            <label htmlFor="parentId">Parent ID</label>
            <input
              type="text"
              id="parentId"
              name="parentId"
              value={locationData.parentId}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={locationData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={locationData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="externalLocationIdentifier">External Location Identifier</label>
            <input
              type="text"
              id="externalLocationIdentifier"
              name="externalLocationIdentifier"
              value={locationData.externalLocationIdentifier}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="locationManagerUserId">Location Manager User ID</label>
            <input
              type="text"
              id="locationManagerUserId"
              name="locationManagerUserId"
              value={locationData.locationManagerUserId}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="locationShopGroupId">Location Shop Group ID</label>
            <input
              type="text"
              id="locationShopGroupId"
              name="locationShopGroupId"
              value={locationData.locationShopGroupId}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="form-button">Create Location</button>
        </form>
      </div>
    </div>
  );
}

export default LocationForm;
