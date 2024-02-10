import React, { useState, useEffect } from "react";
import { fetchShopGroups, fetchUsers } from "../../services/api";
import "./admin.css";
import ShopGroupForm from "./ShopGroupForm.js"; // Import the ShopGroupForm component

function CWMadmin() {
    const [shopGroups, setShopGroups] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [showShopGroupForm, setShowShopGroupForm] = useState(false); // State to control the visibility of the form

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
        const fetchUser = async () => {
          try {
            const data = await fetchUsers();
            // Assuming fetchShopGroups() returns the data directly
            setUsers(data);
          } catch (error) {
            console.error('Error fetching shop groups:', error.message);
            setError('Error fetching shop groups. Please try again.');
          }
        };
    
        fetchUser(); // Call the function to fetch shop groups when the component mounts
      }, []);
  
    return (
      <div>
        <h2>Shop Groups</h2>
        {error && <div>Error: {error}</div>}
        <ul>
          {shopGroups.map((group) => (
            <li key={group.id}>
              <div>ID: {group.id}</div>
              <div>Name: {group.name}</div>
              <div>Description: {group.description}</div>
              {/* Add more details as needed */}
            </li>
          ))}
        </ul>

        <h2>Users</h2>
        {error && <div>Error: {error}</div>}
        <ul>
          {users.map((group) => (
            <li key={group.id}>
              <div>uid: {group.uid}</div>
              <div>Name: {group.commonName}</div>
              <div>Description: {group.surname}</div>
              {/* Add more details as needed */}
            </li>
          ))}
        </ul>

        {/* Button to toggle the visibility of the ShopGroupForm */}
        <button onClick={() => setShowShopGroupForm(!showShopGroupForm)}>
          {showShopGroupForm ? "Close Shop Group Form" : "Open Shop Group Form"}
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
