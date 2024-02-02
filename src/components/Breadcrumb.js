// Breadcrumb.js
import React from 'react';

// Breadcrumb component receives an 'items' prop
const Breadcrumb = ({ items }) => {
  return (
    // Navigation with ARIA label for accessibility
    <nav aria-label="breadcrumb">
      {/* Breadcrumb items displayed as paragraphs */}
      <p className="breadcrumb">
        {/* Map through the items to create breadcrumb links */}
        {items.map((item, index) => (
          // Use React.Fragment to group elements without adding extra nodes to the DOM
          <React.Fragment key={index}>
            {/* Render link for all items except the last one */}
            {index !== items.length - 1 ? (
              <a href={item.link}>{item.label}</a>
            ) : (
              // Render span for the last item (no link)
              <span>{item.label}</span>
            )}
            {/* Add a separator '>' between items (except for the last one) */}
            {index !== items.length - 1 && <span> {'>'} </span>}
          </React.Fragment>
        ))}
      </p>
    </nav>
  );
};

export default Breadcrumb;
