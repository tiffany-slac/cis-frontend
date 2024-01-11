// Inventory.js
import React, { useState, useEffect } from "react";
import { fetchAllElements, searchElements } from "../../services/api";
import { useHistory } from "react-router-dom";
import ItemForm from "../admin/ItemForm.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBarcode } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Inventory.css";

function formatItemName(name) {
  // Capitalize the first letter
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

  // Replace dashes "-" with spaces " "
  const finalName = formattedName.replace(/-/g, ' ');

  return finalName;
}

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [showItemForm, setShowItemForm] = useState(false);
  const [searchInput, setSearchInput] = useState(""); // State to store the search input
  const [currentPage, setCurrentPage] = useState(1); // New state for current page
  const [lastItemId, setLastItemId] = useState(null); // New state to keep track of the last item's ID
  const itemsPerPage = 5; 

  const handleItemClick = (classId) => {
    // Handle item click here (e.g., navigate to a specific form or perform an action)
    console.log(`Clicked ${classId}`);
  };

  const handleSearch = async () => {
    try {
      // Reset currentPage and lastItemId when initiating a new search
      setCurrentPage(1);
      setLastItemId(null);

      const searchData = await searchElements(searchInput);

      setInventory(searchData.payload);
      setLastItemId(searchData.payload[searchData.payload.length - 1]?.id || null);
    } catch (error) {
      console.error("Error fetching inventory elements:", error);
    }
  };

  const handleLoadMore = async () => {
    try {
      const nextPageData = await fetchAllElements(itemsPerPage, currentPage + 1, lastItemId);
  
      if (nextPageData.payload.length > 0) {
        setInventory((prevInventory) => [...prevInventory, ...nextPageData.payload]);
        setCurrentPage((prevPage) => prevPage + 1);
        setLastItemId(nextPageData.payload[nextPageData.payload.length - 1].id);
      }
    } catch (error) {
      console.error("Error fetching more inventory elements:", error);
    }
  };
  

  useEffect(() => {
    const fetchInitialInventory = async () => {
      try {
        const initialData = await fetchAllElements(itemsPerPage, currentPage, lastItemId);

        setInventory(initialData.payload);
        setLastItemId(initialData.payload[initialData.payload.length - 1]?.id || null);
      } catch (error) {
        console.error("Error fetching initial inventory elements:", error);
      }
    };

    fetchInitialInventory();
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
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        
      </div>

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
      <div className="assets-cards-container">
        <div className="assets-cards">
          {inventory && inventory.length > 0 ? (
            inventory.map((item) => (
              <div key={item.id} onClick={() => handleCardClick(item.id)}>
              
                <Link to={`/inventory/${item.id}`} style={{ textDecoration: 'none' }}></Link>
                <div className="card">
                  <h2>{formatItemName(item.name)}</h2>
                  <p>ID: {item.id}</p>
                  <p>Class ID: {item.classId}</p>
                  {/* Add other information here */}
                </div>
                </div>
            ))
          ) : (
            <div>No inventory items available</div>
          )}
        </div>
        <div className="load-more-button">
          <button onClick={handleLoadMore}>Load More</button>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
