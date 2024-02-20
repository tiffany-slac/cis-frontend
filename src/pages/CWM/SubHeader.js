import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import LocationForm from './LocationForm.js';
import "./Cwm.css";

const SubHeader = ({ showLocationForm, setShowLocationForm, searchInput, setSearchInput, handleSearch }) => {
    const handleItemClick = (formType) => {
        // Handle item click here (e.g., navigate to a specific form or perform an action)
        console.log(`Clicked ${formType}`);
    };

    return (
        <div className="sticky-header">
            {/* Header: WORK PLANS */}
            {/* <div className="header-left">
                <p>WORK PLANS</p>
            </div> */}

            {/* Search Bar */}
            <div className="cwm-searchbar">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {/* New Location Button */}
            <div className="new-class-button">
                <button
                    onClick={() => {
                        handleItemClick("Location");
                        setShowLocationForm(true);
                    }}
                    className="dropbtn"
                >
                    <span>+ Location</span>
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

export default SubHeader;
