// Search.js
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Search.css';

const Search = () => {
  const [assets, setAssets] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('');
  

  useEffect(() => {
    axios.get('http://localhost:3000/api/assets')
      .then(response => {
        // Assuming response.data is an array
        if (response.data.length > 0) {
          // Accessing the assets array inside the first object of the response array
          setAssets(response.data[0].assets);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  console.log('Assets state:', assets);

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
  
  const handleRowClick = (asset) => {
    history.push(`/details/${asset.id}`); // Navigate to detail page with the item _id
  };
  

  console.log('Assets state:', assets);

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
                <th>Metadata</th>
              </tr>
            </thead>
            <tbody>
            {assets && assets.length > 0 ? (
              assets.map((asset) => (
                <tr key={asset.id} onClick={() => handleRowClick(asset)}>
                  <td>{asset.id}</td>
                  <td>{asset.name}</td>
                  <td>{asset.type}</td>
                  <td>
                    {/* Render metadata properties */}
                    {Object.entries(asset.metadata).map(([key, value]) => (
                      <p key={key}>
                        <span>{key}: </span>
                        <span>{value}</span>
                      </p>
                    ))}
                  </td>
                </tr>
              ))
              ) : (
                <tr>
                  <td colSpan="4">No assets available</td>
                </tr>
              )}
            </tbody>
          </table>
      </div>
    </div>
  );
};

export default Search;


/*import React, { useState } from 'react';
import axios from 'axios';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/search?term=${searchTerm}`);

      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div>
      <br></br><br></br>
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <button onClick={handleSearch}>Search</button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((result) => (
            <tr key={result.id}>
              <td>{result.name}</td>
              <td>{result.age}</td>
              <td>{result.email}</td>
              <td>{result.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Search;
*/