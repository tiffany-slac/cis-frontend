import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { fetchShopGroups, fetchLocations } from "../../../services/api.js";
import "./../admin.css";
import ShopGroupForm from "./shopGroupForm.js";
import LocationForm from './locationForm.js';


function CWMadmin() {
  const history = useHistory();
  const [shopGroups, setShopGroups] = useState([]);
  const [error, setError] = useState(null);
  const [showShopGroupForm, setShowShopGroupForm] = useState(false);
  const [showLocationForm, setShowLocationForm] = useState(false);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    console.log("fetching locations...");
    const fetchAllLocations = async () => {
      const response = await fetchLocations();
      setLocations(response.payload);
    };
    fetchAllLocations();
  }, []);

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

  const handleRowClick = (classId) => {
    history.push(`/admin/${classId}`);
  };

  return (
    <div className="cwm-admin">
      <h3 style={{ textAlign: 'center' }}>CWM Administrator</h3>

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

      <div className="new-class-button">
        <button className="dropbtn" onClick={() => setShowLocationForm(!showLocationForm)}>
          {showLocationForm ? "Close Location Form" : "+ Location"}
        </button>
        {showLocationForm && (
          <LocationForm
            showLocationForm={showLocationForm}
            setShowLocationForm={setShowLocationForm}
          />
        )}
      </div>

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


      <div className="new-class-button">
        <button className="dropbtn" onClick={() => setShowShopGroupForm(!showShopGroupForm)}>
          {showShopGroupForm ? "Close Shop Group Form" : " + Shop Group"}
        </button>
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
