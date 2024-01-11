import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBarcode } from '@fortawesome/free-solid-svg-icons';
import { fetchInventoryData, fetchAllElements } from '../../services/api';
import './Settings.css';

function Settings() {
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchInventoryData();
        console.log(data);
        setInventoryData(data); // Update the state with fetched data
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      }
    };

    fetchData();
  }, []);

  // State for search query, sorting, filtering, etc.
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    const filtered = hardcodedData.filter(item =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleSortChange = (e) => {
    // Implement your sorting logic here
    setSortBy(e.target.value);
    // Sort filtered items based on selected option
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10)); // Convert value to integer
  };

  const getPageRange = () => {
    const from = ((currentPage - 1) * itemsPerPage) + 1;
    const to = Math.min(currentPage * itemsPerPage, totalItems);
    return `${from}-${to} of ${totalItems}`;
  };

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllElements();
        setInventoryData(data.payload); // Update inventoryData with API response data
      } catch (error) {
        console.error('Error fetching inventory elements:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="inventory-page">
      {/* <div className="search-container">
      <div className="search-wrapper">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <FontAwesomeIcon icon={faBarcode} className="barcode-icon" />
      </div>
       <button>Filter</button>
        <select onChange={handleSortChange}>
          <option value="">Sort By</option>
          <option value="price">Price</option>
          {/* Add other sorting options */}
        {/* </select>
        <div>  */}
          {/* <span>
            {((currentPage - 1) * itemsPerPage) + 1}-
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
          </span> */}
          {/* <span>
            Show:
            <select onChange={handleItemsPerPageChange}>
              <option value="10">10</option>
              <option value="30">30</option>
              <option value="60">60</option>
              <option value="100">100</option>
              <option value="all">All</option>
            </select>
          </span>
        </div>
      </div> */}

      {/* <div className="inventory-cards">
      {inventoryData.map((item, index) => (
        <div className="inventory-card" key={index}>
          <div className="card-details">
            <img src={item.imageUrl} alt={item.name} className="card-image" />
            <div>
              <span className="card-id">{item.id}</span>
              <h3 className="card-name">{item.name}</h3>
              <span className="card-classid">{item.classId}</span>
            </div>
          </div>
        </div>
      ))}
    </div> */}
    </div>
  );
}

export default Settings;
