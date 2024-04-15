import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import LocationHistForm from "./locationHistForm";
import { fetchElement, fetchPath, updateElement, fetchClass } from "../../services/api";
import "./itemDetails.css";

const ItemDetails = () => {
  // Destructuring values from React Router
  const { id } = useParams(); // Get the asset ID from the URL params

  // State variables to manage component state
  const [elementDetails, setElementDetails] = useState(null);
  const [manufacturerDetails, setManufacturerDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Jobs");
  const [elementPath, setElementPath] = useState(null);
  const [expandedRows, setExpandedRows] = useState([]);
  const [showLocationHistForm, setShowLocationHistForm] = useState(false);
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedAttributes, setEditedAttributes] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);

  // TreeView component for rendering nested items in a table
  const TreeView = ({ items, parentId = null, level = 0 }) => {
    // Get the current item id from the URL using React Router's useLocation
    const location = useLocation();
    const currentItemId = location.pathname.split("/").pop(); // Get the current item id from the URL

    // Return early if items is false
    if (!items) {
      return null;
    }

    // Filter child items based on parentId
    const childItems = items.filter((item) =>
      parentId === null
        ? item.parentId === undefined
        : item.parentId === parentId
    );

    if (childItems.length === 0) {
      return null;
    }

    return (
      <>
        {/* Map through childItems and render nested table rows */}
        {childItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <tr>
              <td colSpan="3">
                {/* Link to the detail page for each item */}
                <Link
                  to={`/inventory/${item.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {/* Styling for nested items */}
                  <div
                    style={{
                      position: "relative",
                      padding: "10px",
                      marginLeft: `${level * 20 + 10}px`,
                      borderRadius: "5px",
                      background: item.id === currentItemId ? "#ddd" : "none",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        bottom: "-2px", // Updated to bottom
                        left: "-10px",
                        width: "10px",
                        height: "100%",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          bottom: "0", // Updated to bottom
                          left: "0",
                          width: "100%",
                          height: "10px",
                          borderBottom: "1px solid #ddd",
                        }}
                      ></div>
                      <div
                        style={{
                          position: "absolute",
                          top: "0", // Updated to top
                          left: "0",
                          width: "10px",
                          height: "100%",
                          borderLeft: "1px solid #ddd",
                        }}
                      ></div>
                    </div>
                    <div style={{ fontSize: "14px", fontWeight: "normal" }}>
                      {item.name}
                    </div>
                    {/* 
                  <div style={{ fontSize: "14px", color: "#888" }}>
                    ID: {item.id || ""}
                  </div> */}
                    <div style={{ fontSize: "14px", color: "#888" }}>
                      {item.classDTO.name}
                    </div>
                    {/* <div style={{ fontSize: "14px", color: "#888" }}>
                      Serial:{" "}
                      {item.attributes && item.attributes.serial
                        ? item.attributes.serial.join(", ")
                        : ""}
                    </div> */}
                  </div>
                </Link>
              </td>
            </tr>
            <TreeView
              items={items}
              parentId={item.id}
              level={level + 1}
              key={index}
            />
          </React.Fragment>
        ))}
      </>
    );
  };

  // Function to toggle the card's expanded state
  const toggleCard = () => {
    setIsCardExpanded((prevIsCardExpanded) => !prevIsCardExpanded);
  };

  // Function to handle button click for showing location history form
  const handleButtonClick = () => {
    setShowLocationHistForm(true); // Show the form when the button is clicked
  };

  // Function to toggle expanded state of a row
  const toggleRow = (id) => {
    const newExpandedRows = expandedRows.includes(id)
      ? expandedRows.filter((rowId) => rowId !== id)
      : [...expandedRows, id];
    setExpandedRows(newExpandedRows);
  };

  // Fetch element path data on component mount
  useEffect(() => {
    const fetchPathData = async () => {
      try {
        const pathData = await fetchPath(id, "Full");
        setElementPath(pathData.payload);
        // console.log(pathData);
      } catch (error) {
        console.error("Error fetching element path:", error);
      }
    };

    fetchPathData();
  }, [id]);

  // Breadcrumb items for navigation
  const breadcrumbItems = [
    { label: "Home", link: "/home" },
    { label: "Inventory", link: "/inventory" },
    { label: "Item Details", link: "/inventory/asset-details" },
  ];

  // Menu items for different tabs
  const menuItems = ["Details", "Description", "Attachments", "Activity"];

  // Make an API request to fetch asset details by ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch element details
        const elementData = await fetchElement(id);
        setElementDetails(elementData);

        // Check if classDTO exists in elementData
        const classId = elementData.classDTO?.id;

        if (classId) {
          // Fetch details of the class using the classId
          const classDetails = await fetchClass(classId);
          setManufacturerDetails(classDetails);
          console.log("manufacturer details: " + manufacturerDetails);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching element details:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Scroll to content when a tab is clicked
  const scrollToContent = (item) => {
    const contentElement = document.getElementById(item.toLowerCase());
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: "smooth" });
    }
    setActiveTab(item);
  };

  // Format name function
  function formatName(name) {
    if (!name) return "";
    const capitalizedFirstLetter = name.charAt(0).toUpperCase();
    const formattedName = name.slice(1).replace(/-/g, " ");
    return capitalizedFirstLetter + formattedName;
  }

  // Truncate text function
  const truncateText = (text, minLines, maxLines) => {
    const splitText = text.split("\n");
    const truncatedLines = splitText.slice(0, 2, 3); // Keep the first two lines
    const remainingLines = splitText.slice(2, maxLines);
    const isTruncated = splitText.length > maxLines;

    return (
      <div>
        {truncatedLines.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
        {isTruncated && (
          <p
            style={{ margin: 0, color: "blue", cursor: "pointer" }}
            onClick={toggleCard}
          >
            {isCardExpanded ? "Read more..." : "Show less"}
          </p>
        )}
        {isCardExpanded && isTruncated && (
          <div>
            {remainingLines.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        )}
      </div>
    );
  };

  // handle editing
  const handleEditClick = () => {
    setShowDropdown(false);
    setIsEditing(true);
    setEditedAttributes({
      // Initialize editedAttributes with current attributes
      description: elementDetails.payload.description || "",
      tags: elementDetails.payload.tags
        ? elementDetails.payload.tags.join(", ")
        : "",
    });
  };

  // Handle save click function
  const handleSaveClick = async () => {
    try {
      // Call the API to update the element with editedAttributes
      await updateElement(id, {
        description: editedAttributes.description,
        tags: editedAttributes.tags.split(",").map((tag) => tag.trim()),
      });
      // After successful update, reset state
      setIsEditing(false);
      setEditedAttributes({});
      // Fetch updated element details
      const updatedElementData = await fetchElement(id);
      setElementDetails(updatedElementData);
    } catch (error) {
      console.error("Error updating element:", error);
    }
  };

  // Handle cancel click function
  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedAttributes({});
  };

  // Handle attribute change function
  const handleAttributeChange = (attribute, value) => {
    setEditedAttributes((prevEditedAttributes) => ({
      ...prevEditedAttributes,
      [attribute]: value,
    }));
  };

  // Handle dropdown click function
  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
    setIsEditing(false); 
  };

  // Toggle sidebar function
  function toggleSidebar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("collapsed");
  }

  return (
    <div className="item-details-container">
      
      {/* Sidebar component for displaying item hierarchy */}
      <div className="sidebar">
        <div className="collapse-button" onClick={toggleSidebar}>
          <div className="arrow-icon"></div>
        </div>
        <div className="tree">
          <table>
            <tbody>
              <TreeView items={elementPath} />
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Main content container for displaying item details */}
      <div className="item-details-content">
        {/* Item details header section */}
        <div className="item-details-header">
          {/* Render breadcrumb for navigation */}
          {isEditing && (
            <div
              style={{
                position: "fixed",
                top: "210px",
                right: "75px",
                alignItems: "center",
                margin: "10px",
              }}
            >
              <button
                onClick={handleSaveClick}
                style={{
                  marginRight: "10px",
                  padding: "12px 16px",
                  backgroundColor: "#4CAF50", // Green color (adjust as needed)
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  zIndex: "103",
                }}
              >
                Save
              </button>
              <button
                onClick={handleCancelClick}
                style={{
                  position: "fixed",
                  padding: "12px 16px",
                  backgroundColor: "#f44336", // Red color (adjust as needed)
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  zIndex: "103",
                }}
              >
                Cancel
              </button>
            </div>
          )}
          <div style={{ marginLeft: "20px", paddingTop: "20px" }}>
            {/* Render breadcrumb with specified items */}
            <Breadcrumb items={breadcrumbItems} />
          </div>
          <h1 style={{ textAlign: "left", marginLeft: "50px" }}>
            {elementDetails &&
            elementDetails.payload &&
            elementDetails.payload.name
              ? formatName(elementDetails.payload.name)
              : ""}
          </h1>

          {/* Dots button for dropdown menu */}
          <div className="dots-button-container">
            <button
              className="dots-button"
              style={{
                position: "fixed",
                backgroundColor: "#f9f9f9",
                padding: "12px 16px",
                border: "none",
                textAlign: "left",
                cursor: "pointer",
                top: "100px", // Adjust as needed
                right: "10px", // Adjust as needed
                fontSize: "16px",
                cursor: "pointer",
                zIndex: "1",
              }}
              onClick={handleDropdownClick}
            >
              ...
            </button>
            {showDropdown && (
              <div
                className="dropdown-menu"
                style={{
                  position: "fixed",
                  top: "150px", // Adjust this value to set the distance from the top
                  right: "10px", // Adjust as needed
                  backgroundColor: "#f9f9f9",
                  minWidth: "120px",
                  boxShadow: "0px 8px 16px 0px rgba(0, 0, 0, 0.3)",
                  zIndex: 1,
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              >
                <button
                  onClick={handleEditClick}
                  style={{
                    position: "fixed",
                    backgroundColor: "#f9f9f9",
                    color: "black",
                    padding: "12px 16px",
                    textDecoration: "none",
                    display: "block",
                    width: "100%",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
          <br />

          {/* Divider line */}
          <div className="line"></div>

          {/* Information section */}
          <div className="info">
            <span className="id">
              ID:{" "}
              {elementDetails && elementDetails.payload
                ? elementDetails.payload.id
                : ""}
            </span>
          </div>
          <br />
          <br />
        </div>

        {/* Item cards section */}
        <div className="item-cards">
          {elementDetails && (
            <>
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
                  Details
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
                  ) : elementDetails ? (
                    <div className="spec-container">
                      {/* Combine class attributes with normal attributes and filter out those displayed in Manufacturer Specifications */}
                      {[
                        ...elementDetails.payload.classDTO.attributes.map(
                          (classAttribute) => ({
                            name: classAttribute.name,
                            description: classAttribute.description,
                            value: elementDetails.payload.attributes.find(
                              (attribute) =>
                                attribute.name === classAttribute.name
                            )?.value,
                          })
                        ),
                        ...elementDetails.payload.attributes,
                      ]
                        .filter((attribute, index, self) => {
                          // Filter out Maker, Model, and Revision
                          return (
                            !["maker", "model", "revision"].includes(
                              attribute.name.toLowerCase()
                            ) &&
                            index ===
                              self.findIndex((a) => a.name === attribute.name)
                          );
                        })
                        .map((attribute, index) => {
                          const label = formatName(attribute.name);
                          // Determine the row index based on the current index
                          const rowIndex = Math.floor(index / 3);

                          return (
                            <div className={`spec-row`} key={index}>
                              <div className="spec-item">
                                <label className="spec-label">{label}</label>
                                {isEditing ? (
                                  <input
                                    type="text"
                                    value={
                                      editedAttributes[attribute.name] || ""
                                    }
                                    onChange={(e) =>
                                      handleAttributeChange(
                                        attribute.name,
                                        e.target.value
                                      )
                                    }
                                  />
                                ) : (
                                  <span className="spec-value">
                                    {attribute.value ||
                                      attribute.description ||
                                      "N/A"}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}

                      {isCardExpanded ? (
                        <div className="expanded-details">
                          <div className="spec-item">
                            <label className="spec-label">Cost</label>
                            {isEditing ? (
                              <input
                                type="text"
                                value={editedAttributes.cost || ""}
                                onChange={(e) =>
                                  handleAttributeChange("cost", e.target.value)
                                }
                              />
                            ) : (
                              <span className="spec-value">
                                {elementDetails.payload.cost}
                              </span>
                            )}
                          </div>
                          <div className="spec-item">
                            <label className="spec-label">Charge Code</label>
                            {isEditing ? (
                              <input
                                type="text"
                                value={editedAttributes.chargeCode || ""}
                                onChange={(e) =>
                                  handleAttributeChange(
                                    "chargeCode",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              <span className="spec-value">
                                {elementDetails.payload.classDTO.name}
                              </span>
                            )}
                          </div>
                          {/* Add other spec items for other attributes */}
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <p>No details available</p>
                  )}
                </div>
              </div>

              {/* Manufacturer Specifications section */}
              <div className="item-card">
                <h3
                  style={{
                    fontWeight: "normal",
                    fontSize: "1em",
                    color: "rgba(144, 21, 21, 0.8)",
                  }}
                >
                  Manufacturer Specifications
                </h3>
                <div className="card-body">
                  {loading ? (
                    <p>Loading...</p>
                  ) : elementDetails ? (
                    <div className="spec-container">
                      {["Maker", "Model", "Revision"].map(
                        (attributeName, index) => {
                          const attribute =
                            elementDetails.payload.classDTO.attributes.find(
                              (attr) =>
                                attr.name.toLowerCase() ===
                                attributeName.toLowerCase()
                            );
                          const value = attribute
                            ? elementDetails.payload.attributes.find(
                                (attr) => attr.name === attribute.name
                              )?.value || attribute.description
                            : "N/A";

                          return (
                            <div className="spec-column" key={index}>
                              <div className="spec-item">
                                <label className="spec-label">
                                  {attributeName}
                                </label>
                                <span className="spec-value">{value}</span>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  ) : (
                    <p>No details available</p>
                  )}
                </div>
              </div>

              {/* Location section */}
              <div className="item-card">
                <h3
                  style={{
                    fontWeight: "normal",
                    fontSize: "1em",
                    color: "rgba(144, 21, 21, 0.8)",
                  }}
                >
                  Location
                </h3>
                <div className="card-body">
                  {loading ? (
                    <p>Loading...</p>
                  ) : elementDetails ? (
                    <div></div>
                  ) : (
                    <p>No details available</p>
                  )}
                </div>
              </div>
              {showLocationHistForm && (
                <div className="form-popup">
                  <LocationHistForm
                    showLocationHistForm={showLocationHistForm}
                    setShowLocationHistForm={setShowLocationHistForm}
                    itemId={id} // Pass the id as a prop to LocationHistForm
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
