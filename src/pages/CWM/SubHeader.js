import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import LocationForm from './LocationForm.js';
import WorkForm from './WorkForm.js';
import "./Cwm.css";

const SubHeader = ({ showLocationForm, setShowLocationForm, showWorkForm, setShowWorkForm, searchInput, setSearchInput, handleSearch }) => {
    const handleItemClick = (formType) => {
        // Handle item click here (e.g., navigate to a specific form or perform an action)
        console.log(`Clicked ${formType}`);
    };

    return (
        <div className="sticky-header">

            {/* Search Bar */}
            <div className="search-wrapper">
                {/* <FontAwesomeIcon icon={faSearch} className="search-icon" /> */}
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
                        handleItemClick("Work");
                        setShowWorkForm(true);
                    }}
                    className="dropbtn"
                >
                    <span>+ CATER</span>
                </button>
                {showWorkForm && (
                    <WorkForm
                        showWorkForm={showWorkForm}
                        setShowWorkForm={setShowWorkForm}
                    />
                )}
            </div>

        </div>
    );
}

export default SubHeader;
