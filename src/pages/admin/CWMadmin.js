import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { fetchShopGroups } from "../../services/api";
import "./admin.css";
import ShopGroupForm from "./ShopGroupForm.js"; // Import the ShopGroupForm component

function CWMadmin() {
  const [shopGroups, setShopGroups] = useState([]);
  const [error, setError] = useState(null);
  const [showShopGroupForm, setShowShopGroupForm] = useState(false); // State to control the visibility of the form
  const history = useHistory();
  const [showDropdown, setShowDropdown] = useState(false);

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

  // Handle row click to navigate to detail page
  const handleRowClick = (classId) => {
    history.push(`/admin/${classId}`); // Navigate to detail page with the class_id
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
      {/* Button to toggle the visibility of the ShopGroupForm */}
      <button className="dropbtn" onClick={() => setShowShopGroupForm(!showShopGroupForm)}>
        {showShopGroupForm ? "Close Shop Group Form" : " + Shop Group"}
      </button>

      {/* Render the ShopGroupForm conditionally */}
      {showShopGroupForm && (
        <ShopGroupForm
          showShopGroupForm={showShopGroupForm}
          setShowShopGroupForm={setShowShopGroupForm}
        />
      )}
    </div>
  );
};

export default CWMadmin;
