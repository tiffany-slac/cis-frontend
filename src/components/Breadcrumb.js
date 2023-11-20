// Breadcrumb.js
import React from 'react';

const Breadcrumb = ({ items }) => {
  return (
    <nav aria-label="breadcrumb">
      <p className="breadcrumb">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index !== items.length - 1 ? (
              <a href={item.link}>{item.label}</a>
            ) : (
              <span>{item.label}</span>
            )}
            {index !== items.length - 1 && <span> {'>'} </span>}
          </React.Fragment>
        ))}
      </p>
    </nav>
  );
};

export default Breadcrumb;
