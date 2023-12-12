import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBarcode } from '@fortawesome/free-solid-svg-icons';
import { fetchInventoryData } from '../../services/api'; 
import './Settings.css';

function Settings() {
  // State to hold inventory data fetched from the API
  const [inventoryData, setInventoryData] = useState([]);

  // Fetch inventory data from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch inventory data from the API
        const data = await fetchInventoryData();
        console.log(data);
        setInventoryData(data); // Update the state with fetched data
      } catch (error) {
        // Handle errors if any
        console.error('Error fetching inventory data:', error);
      }
    };

    fetchData(); 
  }, []);

  // Hardcoded inventory data for testing
  // const hardcodedData = [
  //   {
  //     "_id": "server001",
  //     "name": "Main Server",
  //     "type": "Server",
  //     "classType": "serverClass",
  //     "parent_id": "dataCenter1",
  //     "attributes": {
  //       "CPU": "Intel Xeon E5",
  //       "RAM": "64GB",
  //       "Storage": "4TB",
  //       "NetworkPorts": 4
  //     },
  //     "connector_class": [
  //       {
  //         "count": 1,
  //         "type": "powerSupplyConnectorClass"
  //       },
  //       {
  //         "count": 4,
  //         "type": "rj45FemaleConnectorClass"
  //       }
  //     ],
  //     "history": [
  //       {
  //         "date": "2023-04-10",
  //         "action": "Installed",
  //         "description": "Server installed in Data Center 1."
  //       }
  //     ]
  //   },
  //   {
  //     "_id": "powerSupply001",
  //     "name": "Server Power Supply",
  //     "type": "PowerSupply",
  //     "classType": "powerSupplyClass",
  //     "parent_id": "server001",
  //     "attributes": {
  //       "Wattage": 800,
  //       "EfficiencyRating": "Gold"
  //     },
  //     "connectors": [
  //       {
  //         "count": 1,
  //         "type": "powerSupplyMaleConnectorClass"
  //       }
  //     ],
  //     "history": [
  //       {
  //         "date": "2023-04-12",
  //         "action": "Added",
  //         "description": "Power supply added to Main Server."
  //       }
  //     ]
  //   }
  // ];

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

  return (
    <div className="inventory-page">
      <div className="search-container">
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
        </select>
        <div>
          {/* <span>
            {((currentPage - 1) * itemsPerPage) + 1}-
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
          </span> */}
          <span>
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
      </div>
    </div>
  );
}

export default Settings;
