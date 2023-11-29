import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/CardWidget.css';

function CardWidget() {
  const [assets, setAssets] = useState([]);

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


  return (
    <div className='home-page'>
    <div className="card">
      <h3>Problems Assigned to Me</h3>
      <div className="card-table">
        <div className="table-header">
          <div>ID</div>
          <div>Name</div>
          <div>Type</div>
          <div>Metadata</div>
        </div>
        {assets && assets.length > 0 ? (
          assets.map(asset => (
            <div className="table-row" key={asset.id}>
              <div>{asset.id}</div>
              <div>{asset.name}</div>
              <div>{asset.type}</div>
              <div>
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
          <p>Loading...</p>
        )}
      </div>
    </div>
    </div>
  );
}

export default CardWidget;