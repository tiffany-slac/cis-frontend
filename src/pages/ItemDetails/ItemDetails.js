import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import { fetchElement } from "../../services/api";
import "./ItemDetails.css";

const ItemDetails = () => {
  const { id } = useParams(); // Get the asset ID from the URL params
  const [elementDetails, setElementDetails] = useState(null);
  const [inventoryDetails, setInventoryDetails] = useState(null); // State to hold the asset details
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Jobs");

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
        console.log(id);
        const data = await fetchElement(id);
        setElementDetails(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching element details:", error);
        setLoading(false);
      }
    };

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

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />

      <div className="item-details-content">
        {elementDetails && (
          <>
            <h1 style={{ textAlign: "left", paddingLeft: "5px" }}>
              {elementDetails.payload.name.toUpperCase()}
            </h1>

            <br />
            <div class="line"></div><br />

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
              <div className="card-header">Location History</div>
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
      </div>
    </div>
  );
};

export default ItemDetails;
