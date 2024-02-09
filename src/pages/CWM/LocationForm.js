import React, { useState } from 'react';
import { createLocation } from '../../services/api'; // Import the createLocation API function

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

        <form onSubmit={handleSubmit} className="location-form">
          <label htmlFor="parentId">Parent ID:</label>
          <input
            type="text"
            id="parentId"
            name="parentId"
            value={locationData.parentId}
            onChange={handleInputChange}
            required
          />
          <br /><br />

          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={locationData.name}
            onChange={handleInputChange}
            required
          />
          <br /><br />

          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={locationData.description}
            onChange={handleInputChange}
          />
          <br /><br />

          <label htmlFor="externalLocationIdentifier">External Location Identifier:</label>
          <input
            type="text"
            id="externalLocationIdentifier"
            name="externalLocationIdentifier"
            value={locationData.externalLocationIdentifier}
            onChange={handleInputChange}
          />
          <br /><br />

          <label htmlFor="locationManagerUserId">Location Manager User ID:</label>
          <input
            type="text"
            id="locationManagerUserId"
            name="locationManagerUserId"
            value={locationData.locationManagerUserId}
            onChange={handleInputChange}
          />
          <br /><br />

          <label htmlFor="locationShopGroupId">Location Shop Group ID:</label>
          <input
            type="text"
            id="locationShopGroupId"
            name="locationShopGroupId"
            value={locationData.locationShopGroupId}
            onChange={handleInputChange}
          />
          <br /><br />

          <input type="submit" value="Create Location" />
        </form>
      </div>
    </div>
  );
}

export default LocationForm;
