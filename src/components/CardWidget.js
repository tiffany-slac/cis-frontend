import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/CardWidget.css'; // Import your CSS file

function CardWidget() {
  const history = useHistory();

  const handleRowClick = () => {
    // Navigate to the Cater details page when a table row is clicked
    history.push('/cater-details'); // Replace with the appropriate route
  };

  return (
    <div className="card">
      <div className="card-table">
        <div className="table-header">
          <div>CATER ID</div>
          <div>Details</div>
          <div>Date Modified</div>
          <div>Status</div>
        </div>
        <div className="table-row" onClick={handleRowClick}>
          <div>123</div>
          <div>Some Details</div>
          <div>2023-11-14</div>
          <div>Active</div>
        </div>
        <div className="table-row" onClick={handleRowClick}>
          <div>123</div>
          <div>Some Details</div>
          <div>2023-11-14</div>
          <div>Active</div>
        </div>
        <div className="table-row" onClick={handleRowClick}>
          <div>123</div>
          <div>Some Details</div>
          <div>2023-11-14</div>
          <div>Active</div>
        </div>
        <div className="table-row" onClick={handleRowClick}>
          <div>123</div>
          <div>Some Details</div>
          <div>2023-11-14</div>
          <div>Active</div>
        </div>
      </div>
    </div>
  );
}

export default CardWidget;
