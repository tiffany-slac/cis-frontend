import React, { useState, useEffect } from 'react';
import { createLocation, fetchUsers, fetchShopGroups, fetchAllElements } from '../../services/api'; // Import the createLocation API function
import Select from 'react-select';
import './LocationForm.css'; // Import the CSS file for styling

function LocationForm({ showLocationForm, setShowLocationForm }) {
  // State to manage form input values
  const [locationData, setLocationData] = useState({
    parentId: null,
    name: '',
    description: '',
    externalLocationIdentifier: '',
    locationManagerUserId: '', // Initialize locationManagerUserId state
    locationShopGroupId: '' // Initialize locationShopGroupId state
  });
  const [users, setUsers] = useState([]);
  const [shopGroups, setShopGroups] = useState([]);
  const [depotItems, setDepotItems] = useState([]);


  useEffect(() => {
    const fetchShopGroupsData = async () => {
      try {
        const data = await fetchShopGroups();
        // Assuming fetchShopGroups() returns the data directly
        setShopGroups(data);
      } catch (error) {
        console.error('Error fetching shop groups:', error.message);
        setError('Error fetching shop groups. Please try again.');
      }
    };

    fetchShopGroupsData(); // Call the function to fetch shop groups when the component mounts
  }, []);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response.payload);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsersData();
  }, []);

  useEffect(() => {
    const fetchElements = async () => {
      try {
        const response = await fetchAllElements(20);
        if (response.errorCode === 0) {
          setDepotItems(response.payload);
        } else {
          throw new Error("Error fetching classes");
        }
      } catch (error) {
        console.error("Error fetching class types:", error.message);
      }
    };

    fetchElements(); // Call the function to fetch class types when the component mounts
  }, []);

  // Function to handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const selectedUser = users.find(user => user.uid === value);
    if (name === 'locationManagerUserId') {
      // If the input is for locationManagerUserId, set it to the user's UID for display
      setLocationData((prevData) => ({
        ...prevData,
        locationManagerUserId: value
      }));
    } else if (name === 'externalLocationIdentifier') {
      // If the input is for externalLocationIdentifier, set it to the value directly
      setLocationData((prevData) => ({
        ...prevData,
        externalLocationIdentifier: value
      }));
    } else {
      // For other inputs, update the locationData normally
      setLocationData((prevData) => ({
        ...prevData,
        [name]: value.trim() === '' ? null : value // Set parentId to null if the trimmed value is empty
      }));
    }
  };

  const handleShopGroupSelectChange = (event) => {
    const { value } = event.target;
    setLocationData((prevData) => ({
      ...prevData,
      locationShopGroupId: value
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const locationDataWithExternalIdentifier = {
        ...locationData,
        externalLocationIdentifier: locationData.externalLocationIdentifier
      };
      await createLocation(locationDataWithExternalIdentifier);
      alert("Location created successfully!");
    } catch (error) {
      console.error('Error creating location:', error);
      alert("Error creating location. Please try again.");
    }
  };

// Function to format the item name
const formatItemName = (name) => {
  // Split the name by '-' and capitalize the first letter of each word
  return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
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
            // required
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Name<span className="required">*</span></label>
            <input
              type="text"
              id="name"
              name="name"
              value={locationData.name}
              onChange={handleInputChange}
            // required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description<span className="required">*</span></label>
            <input
              type="text"
              id="description"
              name="description"
              value={locationData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="externalLocationIdentifier">Add DEPOT Item</label>
            <select
              id="externalLocationIdentifier"
              name="externalLocationIdentifier"
              value={locationData.externalLocationIdentifier}
              onChange={handleInputChange}
              className="select-input"
            >
              <option value="">Select Item</option>
              {depotItems.map(item => (
                <option key={item.id} value={`${item.domainDTO.id}/${item.id}`}>
                  {formatItemName(item.name)}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="locationManagerUserId">Manager<span className="required">*</span></label>
            <select
              id="locationManagerUserId"
              name="locationManagerUserId"
              value={locationData.locationManagerUserId}
              onChange={handleInputChange}
              className="select-input" // Apply the select-input class here
            >
              <option value="">Select Manager</option>
              {users.map(user => (
                <option key={user.uid} value={user.mail}>{user.commonName + " " + user.surname}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="locationShopGroupId">Shop Group<span className="required">*</span></label>
            <select
              id="locationShopGroupId"
              name="locationShopGroupId"
              value={locationData.locationShopGroupId}
              onChange={handleShopGroupSelectChange}
              className="select-input" // Apply the select-input class here
              required
            >
              <option value="">Select Shop Group</option>
              {shopGroups.map(group => (
                <option key={group.id} value={group.id}>{group.name}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="form-button">Create Location</button>
        </form>
      </div>
    </div>
  );
}

export default LocationForm;
