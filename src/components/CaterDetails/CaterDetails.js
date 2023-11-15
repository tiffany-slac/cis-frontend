// CaterDetails.js
import React, { useState } from 'react';
import './CaterDetails.css'; // Import your CSS file for styling

const CaterDetails = () => {
  const [detailsExpanded, setDetailsExpanded] = useState(false);

  return (
    <div>
      <div className="progress-bar">
        {/* Your progress bar here */}
        <div className="progress-fill" style={{ width: '50%' }}></div>
      </div>
      <div className="details-section">
        <h3 onClick={() => setDetailsExpanded(!detailsExpanded)}>
          Details Section
          {detailsExpanded ? '-' : '+'}
        </h3>
        {detailsExpanded && (
          <div>
            {/* Your expanded details */}
            {/* Description, Attachments, Activity Sections */}
          </div>
        )}
      </div>
      {/* Other sections */}
    </div>
  );
};

export default CaterDetails;
