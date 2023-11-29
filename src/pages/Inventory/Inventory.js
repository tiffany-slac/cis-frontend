// Inventory.js
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Inventory.css';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('');
  

  useEffect(() => {
    axios.get('http://localhost:3000/api/inventory')
      .then(response => {
        setInventory(response.data); // Assuming response.data is an array of inventory items
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  

  console.log('Inventory state:', inventory);

  // Function to handle change in primary filter selection
  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedFilter(selectedValue);
    // Reset the advanced filter options based on the selected primary filter
    // Perform actions to fetch specific advanced filter options based on the selected primary filter
  };

  // Function to handle change in advanced filter selection
  const handleAdvancedFilterChange = (event) => {
    const selectedAdvancedValue = event.target.value;
    // Perform actions based on the selected advanced filter value
  };

  const handleRowChange = (event) => {
    const selectedValue = event.target.value;
    // Perform actions based on the selected value (e.g., update table rows)
  };

  const history = useHistory();
  // ... other state and useEffect code
  
  const handleRowClick = (item) => {
    history.push(`/inventory/${item}`); // Navigate to detail page with the item _id
  };

  return (
    <div className="search-page">
      <br></br><br></br>
      <div className="search-bar">
        {/* Search input field */}
        <input type="text" placeholder="Search..." />

        {/* Dropdown for filters */}
        <div className="primary-filter">
        <label htmlFor="primary-filter">Filter by: </label>
        <select id="primary-filter" onChange={handleFilterChange}>
          {/* Options for primary filter selection */}
        </select>
      </div>

        {/* Go button */}
        <button>Go</button>
      </div>
      <div className="row-pull-down">
        <label htmlFor="row-selection">Rows per page: </label>
        <select id="row-selection" onChange={handleRowChange}>
          <option value="15">15</option>
          <option value="30">30</option>
          <option value="45">45</option>
          <option value="60">60</option>
          <option value="100">100</option>
          <option value="all">All</option>
        </select>
      </div>
      <div className="advanced-filters">
        {/* Conditionally render advanced filter based on selected primary filter */}
        {selectedFilter === 'Location' && (
          <div className="advanced-location-filter">
            <label htmlFor="location-filter">Select Location: </label>
            <select id="location-filter" onChange={handleAdvancedFilterChange}>
              {/* Options specific to the Location filter */}
            </select>
          </div>
        )}
      </div>
      <div className="buttons">
        {/* New Item button */}
        {/* Reports button */}
      </div>
      <div className="assets-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              {/* Add other table headers based on schema */}
            </tr>
          </thead>
          <tbody>
            {inventory && inventory.length > 0 ? (
              inventory.map(item => (
                <tr key={item._id} onClick={() => handleRowClick(item._id)}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  {/* Add other table data based on schema */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No inventory items available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;