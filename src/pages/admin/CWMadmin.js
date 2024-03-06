import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { fetchShopGroups, fetchLocations, fetchWork } from "../../services/api";
import "./admin.css";
import ShopGroupForm from "./ShopGroupForm.js";
import LocationForm from './../CWM/LocationForm.js';


function CWMadmin( ) {
  const [shopGroups, setShopGroups] = useState([]);
  const [error, setError] = useState(null);
  const [showShopGroupForm, setShowShopGroupForm] = useState(false);
  const [showLocationForm, setShowLocationForm] = useState(false);
  const history = useHistory();
  const [locations, setLocations] = useState([]);
  const [work, setWork] = useState([]);

  useEffect(() => {
    console.log("fetching locations...");
    const fetchAllLocations = async () => {
      const response = await fetchLocations();
      setLocations(response.payload);
    };
    fetchAllLocations();
  }, []);

  // useEffect(() => {
  //   console.log("fetching all work...");
  //   const fetchAllWork = async () => {
  //     const response = await fetchWork();
  //     setWork(response.payload);
  //   };
  //   fetchAllWork();
  // }, []);

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
        <h2>Shop Groups</h2>
        <table className="class-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {shopGroups.map((classItem, index) => (
              <tr
                key={index}
                onClick={() => handleRowClick(classItem.id)}
                className="class-item"
              >
                <td>{classItem.id}</td>
                <td>{classItem.name}</td>
                <td>{classItem.description}</td>
              </tr>
            ))}
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
      <div className="card-display">
        <h2>Locations</h2>
        <table className="class-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location) => (
              <tr
                key={location.id}
                onClick={() => handleRowClick(location.id)}
                className="class-item"
              >
                <td>{location.id}</td>
                <td>{location.name}</td>
                <td>{location.description}</td>
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
    </div>
  );
}

export default CWMadmin;
