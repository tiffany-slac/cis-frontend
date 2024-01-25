import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import LocationHistForm from "./LocationHistForm";
import { fetchElement, fetchPath } from "../../services/api";
import "./ItemDetails.css";

const ItemDetails = () => {
  const { id } = useParams(); // Get the asset ID from the URL params
  const [elementDetails, setElementDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Jobs");
  const [elementPath, setElementPath] = useState(null);
  const [expandedRows, setExpandedRows] = useState([]);
  const [showLocationHistForm, setShowLocationHistForm] = useState(false);

  const TreeView = ({ items, parentId = null, level = 0 }) => {
    if (!items) {
      return null; // Return early if items is falsy
    }
  
    const childItems = items.filter(
      (item) =>
        (parentId === null ? item.parentId === undefined : item.parentId === parentId)
    );
  
    if (childItems.length === 0) {
      return null;
    }
  
    return (
      <>
        {childItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <tr>
              <td colSpan="3">
                <div
                  style={{
                    position: "relative",
                    padding: "10px",
                    marginLeft: `${level * 20 + 10}px`,
                    borderRadius: "5px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-10px",  // Updated to bottom
                      left: "-10px",
                      width: "10px",
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        bottom: "0",  // Updated to bottom
                        left: "0",
                        width: "100%",
                        height: "10px",
                        borderBottom: "1px solid #ddd",
                      }}
                    ></div>
                    <div
                      style={{
                        position: "absolute",
                        top: "0",  // Updated to top
                        left: "0",
                        width: "10px",
                        height: "100%",
                        borderLeft: "1px solid #ddd",
                      }}
                    ></div>
                  </div>
                  <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                    {item.name}
                  </div>
                  {/* <div style={{ fontSize: "14px", color: "#888" }}>
                    Serial:{" "}
                    {item.attributes && item.attributes.serial
                      ? item.attributes.serial.join(", ")
                      : ""}
                  </div>
                  <div style={{ fontSize: "14px", color: "#888" }}>
                    ID: {item.id || ""}
                  </div> */}
                  <div style={{ fontSize: "14px", color: "#888" }}>
                    Type: {item.classDTO.name}
                  </div>
                </div>
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
  
  
  
  

  const handleButtonClick = () => {
    setShowLocationHistForm(true); // Show the form when the button is clicked
  };

  const toggleRow = (id) => {
    const newExpandedRows = expandedRows.includes(id)
      ? expandedRows.filter((rowId) => rowId !== id)
      : [...expandedRows, id];
    setExpandedRows(newExpandedRows);
  };

  useEffect(() => {
    const fetchPathData = async () => {
      try {
        const pathData = await fetchPath(id, "Full");
        setElementPath(pathData.payload);
        console.log(pathData);
      } catch (error) {
        console.error("Error fetching element path:", error);
      }
    };

    fetchPathData();
  }, [id]);

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Inventory", link: "/inventory" },
    { label: "Item Details", link: "/inventory/asset-details" },
  ];

  const menuItems = ["Details", "Description", "Attachments", "Activity"];

  // Make an API request to fetch asset details by ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchElement(id);
        setElementDetails(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching element details:", error);
        setLoading(false);
      }
    };
    console.log("elementDetails: " + elementDetails);

    fetchData();
  }, [id]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const scrollToContent = (item) => {
    const contentElement = document.getElementById(item.toLowerCase());
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: "smooth" });
    }
    setActiveTab(item);
  };

  function formatName(name) {
    if (!name) return "";
    const capitalizedFirstLetter = name.charAt(0).toUpperCase();
    const formattedName = name.slice(1).replace(/-/g, " ");
    return capitalizedFirstLetter + formattedName;
  }

  return (
    <div>

      <div
        style={{
          position: "fixed",
          top: "60px",
          left: "80px",
          width: "100%",
          zIndex: "1",
          backgroundColor: "white",
        }}
      >
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <br />
      <br />
      <div className="item-details-header">
        <h1 style={{ textAlign: "left", marginLeft: "50px" }}>
          {elementDetails &&
          elementDetails.payload &&
          elementDetails.payload.name
            ? formatName(elementDetails.payload.name)
            : ""}
        </h1>
        <br />

        <div className="line"></div>

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

      <div className="item-details-content">
        {elementDetails && (
          <>
            <div className="item-card">
              <div className="card-header">Details</div>
              <div className="card-body">
                {loading ? (
                  <p>Loading...</p>
                ) : elementDetails ? (
                  <div>
                    <p>ID: {elementDetails.payload.id}</p>
                    {/* <p>{elementDetails.payload.name.toUpperCase()}</p> */}
                    <p>Serial: {elementDetails.payload.attributes[0].value}</p>
                  </div>
                ) : (
                  <p>No details available</p>
                )}
              </div>
            </div>

            {/* Location section */}
            <div className="item-card">
              <div className="card-header">
                Location History{" "}
                <button className="add-button" onClick={handleButtonClick}>
                  +
                </button>
              </div>
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

            <div>
              <h2>Hierarchy Tree</h2>
              <div className="tree">
                <TreeView items={elementPath} />
              </div>
            </div>
          </>
        )}
      </div>


    </div>
  );
};

export default ItemDetails;
