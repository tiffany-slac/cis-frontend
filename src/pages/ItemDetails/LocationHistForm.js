import React, { useState, useEffect } from "react";
import { createImplementation } from "../../services/api";
import "./ItemDetails.css";

function LocationHistForm({ showLocationHistForm, setShowLocationHistForm, itemId }) {
  const [state, setState] = useState("");
  const [date, setDate] = useState("");
  const [parent, setParent] = useState("");
  const [location, setLocation] = useState("");
  const [parentSlot, setParentSlot] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [classId, setClassId] = useState("659d97d8436dda6f355adc94");
  const [parentId, setParentId] = useState("");
  
  const handleSubmit = async ( event ) => {
    event.preventDefault();

    // try {
    //   const itemData = {
    //     name: itemId + date,
    //     description: 'DEPOT Item',
    //     classId: classId,
    //     parentId: null,
    //     tags: [],
    //     attributes: [
    //       { name: "State", value: state },
    //       { name: "Date", value: date },
    //       { name: "Parent", value: parent },
    //       { name: "Location", value: location },
    //       { name: "Parent-Slot", value: parentSlot },
    //       { name: "Assigned-To", value: assignedTo },
    //     ],
    //   }; 659f37718a79764e92f1d0d7

    try {
      const itemData = {
        name: 'locationhistory1',
        classId: '65a0234aa11a67235b702edd',
        parentId: '65a0237fa11a67235b702ede',
        description: 'DEPOT Item',
        tags: [],
        attributes: [
          { name: "State", value: state },
          { name: "Date", value: date },
          { name: "Parent", value: parent },
          { name: "Location", value: location },
          { name: "Parent-Slot", value: parentSlot },
          { name: "Assigned-To", value: assignedTo },
        ],
      };

      console.log(itemData);
      const result = await createImplementation( itemId, itemData);
      console.log("API Response:", result);

      alert("Item created successfully!");

      setShowLocationHistForm(false);
    } catch (error) {
      console.error("Error during item creation:", error);
      alert(
        "Failed to create item. Please check your connection or try again later."
      );
    }
  };

  return (
    <div className="admin-container">
      <div className={`modal ${showLocationHistForm ? "show" : "hide"}`}>
        <div className="location-content">
          <span className="close" onClick={() => setShowLocationHistForm(false)}>
            &times;
          </span>
          <form className="class-form" onSubmit={handleSubmit}>

            <label htmlFor="state">State:</label>
            <input
              type="text"
              id="state"
              name="state"
              value={state}
              onChange={(event) => setState(event.target.value)}
            />

            <label htmlFor="date">Date:</label>
            <input
              type="text"
              id="date"
              name="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />

            <label htmlFor="parent">Parent:</label>
            <input
              type="text"
              id="parent"
              name="parent"
              value={parent}
              onChange={(event) => setParent(event.target.value)}
            />

            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />

            <label htmlFor="parentSlot">Parent Slot:</label>
            <input
              type="text"
              id="parentSlot"
              name="parentSlot"
              value={parentSlot}
              onChange={(event) => setParentSlot(event.target.value)}
            />

            <label htmlFor="assignedTo">Assigned To:</label>
            <input
              type="text"
              id="assignedTo"
              name="assignedTo"
              value={assignedTo}
              onChange={(event) => setAssignedTo(event.target.value)}
            />

            <br />
            <br />

            <input type="submit" value="Create Item" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default LocationHistForm;
