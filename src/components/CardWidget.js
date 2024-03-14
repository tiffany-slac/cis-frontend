import React, { useEffect, useState } from 'react';
import './CardWidget.css';

function CardWidget() {
  // State to hold the assets data
  const [assets, setAssets] = useState([]);

  return (
    // Main container for the card widget
    <div className='home-page'>
      {/* Card container */}
      <div className="card">
        <h3>Problems Assigned to Me</h3>
        {/* Table container within the card */}
        <div className="card-table">
          {/* Table header */}
          <div className="table-header">
            <div>ID</div>
            <div>Name</div>
            <div>Type</div>
            <div>Metadata</div>
          </div>
          {/* Check if assets data is available and render accordingly */}
          {assets && assets.length > 0 ? (
            // Map through assets to create table rows
            assets.map(asset => (
              <div className="table-row" key={asset.id}>
                {/* Display asset properties in each column */}
                <div>{asset.id}</div>
                <div>{asset.name}</div>
                <div>{asset.type}</div>
                <div>
                  {/* Map through metadata and display key-value pairs */}
                  {Object.entries(asset.metadata).map(([key, value]) => (
                    <p key={key}>
                      <span className="metadata-key">{key}: </span>
                      <span>{value}</span>
                    </p>
                  ))}
                </div>
              </div>
            ))
          ) : (
            // Display a loading message if assets data is not available
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardWidget;
