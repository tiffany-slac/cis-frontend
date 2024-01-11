import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import LocationHistForm from "./LocationHistForm";
import { fetchElement, fetchPath } from "../../services/api";
import "./ItemDetails.css";

const ItemDetails = () => {
  const { id } = useParams(); // Get the asset ID from the URL params
  const [elementDetails, setElementDetails] = useState(null);
  const [inventoryDetails, setInventoryDetails] = useState(null); // State to hold the asset details
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Jobs");
  const [elementPath, setElementPath] = useState(null);
  const [expandedRows, setExpandedRows] = useState([]);
  const [showLocationHistForm, setShowLocationHistForm] = useState(false);

  const handleButtonClick = () => {
    setShowLocationHistForm(true); // Show the form when the button is clicked
  };

  const data = {
    errorCode: 0,
    payload: [
      {
        id: "65984fe6240bb01eefb78f12",
        name: "Building 34",
        domainId: "65984fe6240bb01eefb78f11",
        classId: "65984fe6240bb01eefb78f08",
        tags: [],
        createdDate: "2024-01-05T18:52:22.679",
        lastModifiedDate: "2024-01-05T18:52:22.679",
      },
      {
        id: "659883a3240bb01eefb78f18",
        name: "b34-197-bpm-lab",
        domainId: "65984fe6240bb01eefb78f11",
        parentId: "65984fe6240bb01eefb78f12",
        classId: "659880a6240bb01eefb78f17",
        tags: [],
        createdDate: "2024-01-05T22:33:07.872",
        createdBy: "user1@slac.stanford.edu",
        lastModifiedDate: "2024-01-05T22:33:07.872",
        lastModifiedBy: "user1@slac.stanford.edu",
      },
      {
        id: "659884bd240bb01eefb78f1b",
        name: "hps-test-stand-2",
        domainId: "65984fe6240bb01eefb78f11",
        parentId: "659883a3240bb01eefb78f18",
        classId: "659880a6240bb01eefb78f17",
        tags: [],
        createdDate: "2024-01-05T22:37:49.869",
        createdBy: "user1@slac.stanford.edu",
        lastModifiedDate: "2024-01-05T22:37:49.869",
        lastModifiedBy: "user1@slac.stanford.edu",
      },
      {
        id: "659884ed240bb01eefb78f1c",
        name: "cpu-b34-sp06",
        domainId: "65984fe6240bb01eefb78f11",
        parentId: "659884bd240bb01eefb78f1b",
        classId: "659880a6240bb01eefb78f17",
        tags: [],
        createdDate: "2024-01-05T22:38:37.103",
        createdBy: "user1@slac.stanford.edu",
        lastModifiedDate: "2024-01-05T22:38:37.103",
        lastModifiedBy: "user1@slac.stanford.edu",
      },
      {
        id: "65988a39240bb01eefb78f1d",
        name: "shm-b34-sp06",
        domainId: "65984fe6240bb01eefb78f11",
        parentId: "659884bd240bb01eefb78f1b",
        classId: "659880a6240bb01eefb78f17",
        tags: [],
        createdDate: "2024-01-05T23:01:13.421",
        createdBy: "user1@slac.stanford.edu",
        lastModifiedDate: "2024-01-05T23:01:13.421",
        lastModifiedBy: "user1@slac.stanford.edu",
      },
      {
        id: "65988aa5240bb01eefb78f1f",
        name: "cswh-b34-sp06",
        domainId: "65984fe6240bb01eefb78f11",
        parentId: "65988a39240bb01eefb78f1d",
        classId: "659880a6240bb01eefb78f17",
        tags: [],
        createdDate: "2024-01-05T23:03:01.853",
        createdBy: "user1@slac.stanford.edu",
        lastModifiedDate: "2024-01-05T23:03:01.853",
        lastModifiedBy: "user1@slac.stanford.edu",
      },
    ],
  };

  const toggleRow = (id) => {
    const newExpandedRows = expandedRows.includes(id)
      ? expandedRows.filter((rowId) => rowId !== id)
      : [...expandedRows, id];
    setExpandedRows(newExpandedRows);
  };

  const renderTable = (items, level = 0) => {
    if (!items || !Array.isArray(items.payload)) {
      return null;
    }

    return items.payload.map((item) => (
      <React.Fragment key={item.id}>
        <tr>
          <td>
            <span
              className={`expand-button ${
                item.children && item.children.length > 0 ? "clickable" : ""
              } ${expandedRows.includes(item.id) ? "expanded" : ""}`}
              onClick={() =>
                item.children && item.children.length > 0 && toggleRow(item.id)
              }
              style={{ marginLeft: level * 20 }}
            ></span>
          </td>
          <td>{item.name}</td>
          <td>{item.domainId}</td>
          <td>{item.classId}</td>
          <td>{item.tags.join(", ")}</td>
          <td>{item.createdDate}</td>
          <td>{item.lastModifiedDate}</td>
        </tr>
        {expandedRows.includes(item.id) &&
          item.children &&
          item.children.length > 0 && (
            <tr key={`children-${item.id}`}>
              <td></td>
              <td colSpan="6">
                {renderTable({ payload: item.children }, level + 1)}
              </td>
            </tr>
          )}
      </React.Fragment>
    ));
  };

  useEffect(() => {
    const fetchPathData = async () => {
      try {
        const pathData = await fetchPath(id, "Full");
        setElementPath(pathData.payload);
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

    fetchData();
  }, [id]);

  const buildTree = (items, parentId = null) => {
    const filteredItems = items.filter((item) => item.parentId === parentId);

    if (filteredItems.length === 0) {
      return null;
    }

    const ul = document.createElement("ul");
    filteredItems.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.name;
      const subTree = buildTree(items, item.id);
      if (subTree) {
        li.appendChild(subTree);
      }
      ul.appendChild(li);
    });

    return ul;
  };

  const renderTree = (items) => {
    return (
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <span>{item.name}</span>
            {item.children &&
              item.children.length > 0 &&
              renderTree(item.children)}
          </li>
        ))}
      </ul>
    );
  };

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
        <h1 style={{ textAlign: "left" }}>
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
          <span className="name">Product Name</span>
          <span className="description">Description of the product</span>
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
                    <p>{elementDetails.payload.name.toUpperCase()}</p>
                    <p>Serial: {elementDetails.payload.description}</p>
                    {/* Display other details here */}
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
                  <div>
                    <p>ID: {elementDetails.payload.id}</p>
                    <p>{elementDetails.payload.name.toUpperCase()}</p>
                    <p>Serial: {elementDetails.payload.description}</p>
                  </div>
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

            {/* Maintenance section */}
            <div className="item-card">
              <div className="card-header">Maintenance</div>
              <div className="card-body">
                {loading ? (
                  <p>Loading...</p>
                ) : elementDetails ? (
                  <div>
                    <p>ID: {elementDetails.payload.id}</p>
                    <p>{elementDetails.payload.name.toUpperCase()}</p>
                    <p>Serial: {elementDetails.payload.description}</p>
                  </div>
                ) : (
                  <p>No details available</p>
                )}
              </div>
            </div>
          </>
        )}
        {!elementDetails && <p>No details available</p>}

        <div className="tree-table">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Domain ID</th>
                <th>Class ID</th>
                <th>Tags</th>
                <th>Created Date</th>
                <th>Last Modified Date</th>
              </tr>
            </thead>
            <tbody>{renderTable(data)}</tbody>
          </table>
        </div>

        <div className="item-details-content">
          {/* Existing JSX */}
          {elementDetails && (
            <>
              {/* Existing JSX */}
              <h2>Element Tree</h2>
              <div id="elementTree" className="tree-container">
                {elementPath ? (
                  <ul className="tree">
                    {elementPath.map((item) => (
                      <li key={item.id}>
                        <span className="tree-node">{item.name}</span>
                        {item.children && item.children.length > 0 && (
                          <ul className="sub-tree">
                            {/* Render child nodes recursively */}
                            {renderSubTree(item.children)}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No element path available</p>
                )}
              </div>
            </>
          )}
          {/* Existing JSX */}
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
