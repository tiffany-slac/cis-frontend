import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { fetchShopGroups, fetchLocations } from "../../services/api.js";
import ShopGroupForm from "./shopGroupForm.js";
import LocationForm from '../cwm/locationForm.js';
import "./admin.css";


function CWMadmin() {
  const history = useHistory();
  const [locations, setLocations] = useState([]);
  const [shopGroups, setShopGroups] = useState([]);
  const [showShopGroupForm, setShowShopGroupForm] = useState(false);
  const [showLocationForm, setShowLocationForm] = useState(false);

  // Fetch shop groups and locations data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const shopGroupsData = await fetchShopGroups();
        setShopGroups(shopGroupsData);
      } catch (error) {
        console.error('Error fetching shop groups:', error.message);
      }

      try {
        const locationsData = await fetchLocations();
        setLocations(locationsData.payload);
      } catch (error) {
        console.error('Error fetching locations:', error.message);
      }
    };

    fetchData();
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
        {showLocationForm && <LocationForm showLocationForm={showLocationForm} setShowLocationForm={setShowLocationForm} />}
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
            {shopGroups.map(shopGroup => (
              <tr key={shopGroup.id} onClick={() => handleRowClick(shopGroup.id)} className="class-item">
                <td>{shopGroup.name}</td>
                <td>{shopGroup.description}</td>
                <td>{shopGroup.users.map(user => user.user.mail).join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Button to toggle shop group form visibility */}
      <div className="new-class-button">
        <button className="dropbtn" onClick={() => setShowShopGroupForm(!showShopGroupForm)}>
          {showShopGroupForm ? "Close Shop Group Form" : " + Shop Group"}
        </button>
        {/* Render shop group form when showShopGroupForm is true */}
        {showShopGroupForm && <ShopGroupForm showShopGroupForm={showShopGroupForm} setShowShopGroupForm={setShowShopGroupForm} />}
      </div>
    </div>
  );
}

export default CWMadmin;
