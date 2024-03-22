import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { fetchShopGroups, fetchLocations } from "../../../services/api.js";
import ShopGroupForm from "./shopGroupForm.js";
import LocationForm from '../../CWM/locationForm.js';
import "../admin.css";


function CWMadmin() {
  const [shopGroups, setShopGroups] = useState([]);
  const [error, setError] = useState(null);
  const [showShopGroupForm, setShowShopGroupForm] = useState(false);
  const [showLocationForm, setShowLocationForm] = useState(false);
  const history = useHistory();
  const [locations, setLocations] = useState([]);

  // Fetch locations data when the component mounts
  useEffect(() => {
    console.log("fetching locations...");
    const fetchAllLocations = async () => {
      const response = await fetchLocations();
      setLocations(response.payload);
    };
    fetchAllLocations();
  }, []);

  // Fetch shop groups data when the component mounts
  useEffect(() => {
    const fetchShopGroupsData = async () => {
      try {
        const data = await fetchShopGroups();
        setShopGroups(data);
      } catch (error) {
        console.error('Error fetching shop groups:', error.message);
        setError('Error fetching shop groups. Please try again.');
      }
    };

    fetchShopGroupsData();
  }, []);

  // Handle click event on table row, navigate to the specific class page
  const handleRowClick = (classId) => {
    history.push(`/admin/${classId}`);
  };

  return (
    <div className="cwm-admin">
      <h3 style={{ textAlign: 'center' }}>CWM Administrator</h3>

      {/* Display locations */}
      <div className="card-display">
        <h2>Locations</h2>
        <table className="class-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Location Manager</th>
            </tr>
          </thead>
          <tbody>
            {/* Map over locations data and render rows */}
            {locations.map((location) => (
              <tr
                key={location.id}
                onClick={() => handleRowClick(location.id)}
                className="class-item"
              >
                <td>{location.name}</td>
                <td>{location.description}</td>
                <td>{location.locationManagerUserId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Button to toggle location form visibility */}
      <div className="new-class-button">
        <button className="dropbtn" onClick={() => setShowLocationForm(!showLocationForm)}>
          {showLocationForm ? "Close Location Form" : "+ Location"}
        </button>
        {/* Render location form when showLocationForm is true */}
        {showLocationForm && (
          <LocationForm
            showLocationForm={showLocationForm}
            setShowLocationForm={setShowLocationForm}
          />
        )}
      </div>

      {/* Display shop groups */}
      <div className="card-display">
        <h2>Shop Groups</h2>
        <table className="class-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Users</th>
            </tr>
          </thead>
          <tbody>
            {/* Map over shop groups data and render rows */}
            {shopGroups.map((shopGroupItem, index) => {
              const userEmails = shopGroupItem.users.map(userItem => userItem.user.mail).join(", ");

              return (
                <tr
                  key={index}
                  onClick={() => handleRowClick(shopGroupItem.id)}
                  className="class-item"
                >
                  <td>{shopGroupItem.name}</td>
                  <td>{shopGroupItem.description}</td>
                  <td>{userEmails}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Button to toggle shop group form visibility */}
      <div className="new-class-button">
        <button className="dropbtn" onClick={() => setShowShopGroupForm(!showShopGroupForm)}>
          {showShopGroupForm ? "Close Shop Group Form" : " + Shop Group"}
        </button>
        {/* Render shop group form when showShopGroupForm is true */}
        {showShopGroupForm && (
          <ShopGroupForm
            showShopGroupForm={showShopGroupForm}
            setShowShopGroupForm={setShowShopGroupForm}
          />
        )}
      </div>

    </div>
  );
}

export default CWMadmin;
