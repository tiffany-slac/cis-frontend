// Inventory.js
import React, { useState, useEffect } from "react";
import { fetchAllElements } from "../../services/api";
import { useHistory } from "react-router-dom";
import ItemForm from "../admin/ItemForm.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBarcode } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Inventory.css";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [showItemForm, setShowItemForm] = useState(false);
  const [searchInput, setSearchInput] = useState(""); // State to store the search input

  const handleItemClick = (classId) => {
    // Handle item click here (e.g., navigate to a specific form or perform an action)
    console.log(`Clicked ${classId}`);
  };

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const data = await fetchAllElements("6584ea2dca8f2363250a310a"); // Replace with your domain ID
        setInventory(data.payload);
      } catch (error) {
        console.error("Error fetching inventory elements:", error);
      }
    };

    fetchInventory();
  }, []);

  // Function to handle change in primary filter selection
  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedFilter(selectedValue);
  };

  const history = useHistory();
  // ... other state and useEffect code

  const handleCardClick = (id) => {
    history.push(`/inventory/${id}`); // Navigate to detail page with the item _id
  };

  return (
    <div className="search-page">
      <br></br>
      <div className="top-right">
        <div className="dropdown">
          <div className="item-form-wrapper">
            {showItemForm && (
              <div className={`item-form ${showItemForm ? "slide-in" : ""}`}>
                <ItemForm
                  showItemForm={showItemForm}
                  setShowItemForm={setShowItemForm}
                />
              </div>
            )}
          </div>
          <button
            onClick={() => setShowItemForm(!showItemForm)}
            className="dropbtn"
          >
            <span>+</span> New
          </button>
        </div>
      </div>
      <div className="search-bar">
        <div className="search-wrapper">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          {/* Search input field */}
          <input
            type="text"
            placeholder="Search..."
            value={searchInput} // Set the value of the input field
            onChange={(e) => setSearchInput(e.target.value)} // Handle input change
          />
        </div>
        {/* Dropdown for filters */}
        {/* <div className="primary-filter">
          <label htmlFor="primary-filter">Filter by: </label>
          <select id="primary-filter" onChange={handleFilterChange}>
            // Options for primary filter selection
          </select>
        </div> */}

        {/* Go button */}
        {/* <button onClick={() => fetchInventory()}>Go</button> */}
      </div>
      {/* <div className="row-pull-down">
        <label htmlFor="row-selection">Rows per page: </label>
        <select id="row-selection" onChange={handleRowChange}>
          <option value="15">15</option>
          <option value="30">30</option>
          <option value="45">45</option>
          <option value="60">60</option>
          <option value="100">100</option>
          <option value="all">All</option>
        </select>
      </div> */}
      <div className="advanced-filters">
        {/* Conditionally render advanced filter based on selected primary filter */}
        {selectedFilter === "Location" && (
          <div className="advanced-location-filter">
            <label htmlFor="location-filter">Select Location: </label>
            <select id="location-filter" onChange={handleAdvancedFilterChange}>
              {/* Options specific to the Location filter */}
            </select>
          </div>
        )}
      </div>
      <div className="assets-cards">
        {inventory && inventory.length > 0 ? (
          inventory.map((item) => (
            <div key={item.id} onClick={() => handleCardClick(item.id)}>
              <Link to={`/inventory/${item.id}`} style={{ textDecoration: 'none' }}></Link>
              <div className="card">
                <h3>ID: {item.id}</h3>
                <p>Name: {item.name}</p>
                <p>Class ID: {item.classId}</p>
                {/* Add other information here */}
              </div>
            </div>
          ))
        ) : (
          <div>No inventory items available</div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
