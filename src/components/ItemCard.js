// ItemCard.js
import React from 'react';

const ItemCard = ({ title, loading, details, isEditing, handleAttributeChange, editedAttributes, isCardExpanded, toggleCard }) => (
  <div className="item-card">
    <h3
      onClick={toggleCard}
      style={{
        cursor: "pointer",
        fontWeight: "normal",
        fontSize: "1em",
        color: "rgba(144, 21, 21, 0.8)",
      }}
    >
      {title}
      <span
        style={{
          float: "right",
          transform: `rotate(${isCardExpanded ? 0 : -180}deg)`,
          transition: "transform 0.3s ease-in-out",
          marginLeft: "5px",
        }}
      >
        ▼
      </span>
    </h3>
    <div className="card-body">
      {loading ? (
        <p>Loading...</p>
      ) : details ? (
        <div className="spec-container">
          {/* Combine class attributes with normal attributes and filter out those displayed in Manufacturer Specifications */}
          {details.map((attribute, index) => (
            <div className={`spec-row`} key={index}>
              <div className="spec-item">
                <label className="spec-label">{attribute.label}</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedAttributes[attribute.name] || ""}
                    onChange={(e) =>
                      handleAttributeChange(attribute.name, e.target.value)
                    }
                  />
                ) : (
                  <span className="spec-value">
                    {attribute.value || attribute.description || "N/A"}
                  </span>
                )}
              </div>
            </div>
          ))}
          {isCardExpanded && (
            <div className="expanded-details">
              {/* Additional expanded details */}
            </div>
          )}
        </div>
      ) : (
        <p>No details available</p>
      )}
    </div>
  </div>
);

export default ItemCard;
