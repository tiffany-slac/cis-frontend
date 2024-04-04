import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools, faCog, faPenClip } from '@fortawesome/free-solid-svg-icons';
import { fetchWork } from "../../services/api.js";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import SubHeader from './subHeader.js';
import "./searchPage.css";

const SearchPage = () => {
  const [showLocationForm, setShowLocationForm] = useState(false);
  const [showWorkForm, setShowWorkForm] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchInput, setSearchInput] = useState(""); // State to store the search input
  const [currentPage, setCurrentPage] = useState(1); // New state for current page
  const [lastItemId, setLastItemId] = useState(null); // New state to keep track of the last item's ID
  const [work, setWork] = useState([]);
  const itemsPerPage = 5;
  const history = useHistory();

  // Fetch all work when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchWork();
        if (response && response.payload) {
          setWork(response.payload);
        } else {
          console.error("Error fetching work:", response.errorCode);
        }
      } catch (error) {
        console.error("Error fetching work:", error);
      }
    };
    fetchData();
  }, []);

  const handleCardClick = (workId) => {
    history.push(`/work/${workId}`); // Navigate to the work details page with the work ID
    window.location.reload();
  };

  // Function to handle search based on user input
  const handleSearch = async () => {
    try {
      // Reset currentPage and lastItemId when initiating a new search
      setCurrentPage(1);
      setLastItemId(null);

      const searchData = await fetchWork(5, 1, null, searchInput); // Assuming default values for limit, page, and anchorId

      setWork(searchData.payload);
      setLastItemId(searchData.payload[searchData.payload.length - 1]?.id || null);
    } catch (error) {
      console.error("Error fetching work:", error);
    }
  };

  // Function to load more inventory items
  const handleLoadMore = async () => {
    try {
      const nextPageData = await fetchWork(itemsPerPage, currentPage + 1, lastItemId);

      if (nextPageData.payload.length > 0) {
        setWork((prevWork) => [...prevWork, ...nextPageData.payload]);
        setCurrentPage((prevPage) => prevPage + 1);
        setLastItemId(nextPageData.payload[nextPageData.payload.length - 1].id);
      }
    } catch (error) {
      console.error("Error fetching work:", error);
    }
  };

  // Function to handle change in primary filter selection
  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedFilter(selectedValue);
  };

  // Function to capitalize the first letter and replace dashes with spaces in item names
  function formatItemName(name) {
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
    const finalName = formattedName.replace(/-/g, ' ');
    return finalName;
  }

  return (
    <div>

      {/* Sticky Header */}
      <SubHeader
        showLocationForm={showLocationForm}
        setShowLocationForm={setShowLocationForm}
        showWorkForm={showWorkForm} // Pass the showWorkForm state
        setShowWorkForm={setShowWorkForm} // Pass the setShowWorkForm function
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
      />
      <div className="cwm-search-page">
        <br></br>

        {/* Advanced Filters */}
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
          {work && work.length > 0 ? (
            work.map((item) => {
              // Calculate isNew for each item
              const createdDate = new Date(item.createdDate);
              const currentTime = new Date();
              const timeDifference = currentTime - createdDate;
              const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

              // Check if the time difference is less than 24 hours
              const isNew = timeDifference < twentyFourHours;

              return (
                <div key={item.id} onClick={() => handleCardClick(item.id)}>
                  <Link to={`/work/${item.id}`} style={{ textDecoration: 'none', display: 'block', width: '100%' }}>
                    <div className="work-cards">
                      {/* Hardware Icon */}
                      {/* <div className="hardware-icon">
                        {item.workType.title && item.workType.title.startsWith('sw') && <FontAwesomeIcon icon={faCog} className="software" />}
                        {item.workType.title && item.workType.title.startsWith('hw') && <FontAwesomeIcon icon={faTools} className="hardware" />}
                        {(!item.workType.title || !item.workType.title.startsWith('sw')) && (!item.workType.title || !item.workType.title.startsWith('hw')) && <FontAwesomeIcon icon={faPenClip} className="request" />}
                      </div> */}

                      {/* First Column */}
                      <div className="first-column">
                        {/* Colored Tags */}
                        <div className="colored-tags">
                          {item.currentStatus.status && <span className="colored-tag">{item.currentStatus.status}</span>}
                          {item.workType.title && item.workType.title.startsWith('So') && (
                            <span className="colored-tag blue">{item.workType.title}</span>
                          )}
                          {item.workType.title && item.workType.title.startsWith('Ha') && (
                            <span className="colored-tag brown">{item.workType.title}</span>
                          )}
                          {(!item.workType.title || !item.workType.title.startsWith('So')) && (!item.workType.title || !item.workType.title.startsWith('Ha')) && (
                            <span className="colored-tag purple">{item.workType.title || 'Unknown'}</span>
                          )}
                        </div>


                        {/* Description */}
                        <p className="description">{item.description}</p>

                        {/* Additional Information */}
                        <div className="additional-info">
                          <p>
                            {`# ${item.workNumber}`} &bull; {`Created By: ${item.createdBy}`} &bull; {`Assigned To: ${item.assignedTo}`}
                          </p>
                        </div>
                      </div>

                      {/* Second Column */}
                      <div className="second-column">
                        <div className="row">
                          <p className="cwm-content"><span className="cwm-label">SHOP </span>{item.shopGroup.name}</p>
                        </div>
                        <div className="row">
                          <p className="cwm-content"><span className="cwm-label">AREA </span>{item.location.name}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            <div>No CATERs available</div>
          )}

          {/* Load More Button */}
          <div className="load-more-button">
            <button onClick={handleLoadMore}>Load More</button>
          </div><br></br><br></br>
        </div>


      </div>
    </div>
  );
};

export default SearchPage; // Export the Dashboard component as the default export
