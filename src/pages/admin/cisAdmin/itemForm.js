import React, { useState, useEffect } from "react";
import {
  createInventoryElement,
  fetchElementNicknames,
  fetchAllElements
} from "../../../services/api";

function ItemForm({ showItemForm, setShowItemForm }) {
  const [slacId, setSlacId] = useState("");
  const [serial, setSerial] = useState("");
  const [chargeCode, setChargeCode] = useState("");
  const [parents, setParents] = useState([]);
  const [elementNames, setElementNames] = useState([]);
  const [classId, setClassId] = useState("");
  const [parentId, setParentId] = useState("");

  useEffect(() => {
    const fetchFilteredNames = async () => {
      try {
        const filteredNames = await fetchElementNicknames();
        setElementNames(filteredNames);
      } catch (error) {
        console.error("Error fetching element names:", error);
      }
    };

    fetchFilteredNames();
  }, []);

  useEffect(() => {
    const fetchParents = async () => {
      try {
        const response = await fetchAllElements();
        if (response.errorCode === 0) {
          // Extract names and ids from the payload and set in the parents list
          const elementDetails = response.payload.map((element) => ({
            id: element.id,
            name: element.name,
          }));
          setParentId(elementDetails);
        } else {
          throw new Error("Error fetching elements");
        }
      } catch (error) {
        console.error("Error fetching elements:", error.message);
      }
    };

    fetchParents(); // Call the function to fetch elements when the component mounts
  }, []);

  console.log(parents);

  const handleRowClick = (classId) => {
    history.push(`/admin/${classId}`); // Navigate to detail page with the class_id
  };

  const handleParentChange = (event) => {
    setParentId(event.target.value);
    console
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submitting");
    try {
      const itemData = {
        name: slacId,
        classId: classId,
        parentId: parentId.trim() !== "" ? parentId.trim() : null,
        description: "DEPOT Item",
        tags: [],
        attributes: [
          { name: "Slac-Id", value: slacId },
          { name: "Serial", value: serial },
          { name: "Location", value: parentId },
          { name: "Charge-Code", value: chargeCode },
        ],
      };

      console.log(itemData);
      const response = await createInventoryElement(itemData);
      console.log("API Response:", response); // Log the API response

      // Display a success message or take further action based on the response
      alert("Item created successfully!");

      // Close the form after submission
      setShowItemForm(false);
    } catch (error) {
      console.error("Error during item creation:", error);
      alert(
        "Failed to create item. Please check your connection or try again later."
      );
    }
  };

  return (
    <div>
      <div className={`item-form-format ${showItemForm ? "show" : "hide"}`}>
        <div className="modal-content">
          <span className="close" onClick={() => setShowItemForm(false)}>
            &times;
          </span>
          <form className="class-form" onSubmit={handleSubmit}>

            <label htmlFor="parents">Parent:</label>
            <select
              id="parents"
              name="parents"
              value={parentId}
              onChange={(event) => setParentId(event.target.value)}
            >
              <option value="">Select a parent</option>
              {parents.map((parent, index) => (
                <option key={index} value={parent.id}>
                  {parent.name}
                </option>
              ))}
            </select><br />

            <label htmlFor="slacId">SLAC ID:</label>
            <input
              type="text"
              id="slacId"
              name="slacId"
              value={slacId}
              onChange={(event) => setSlacId(event.target.value)}
            />

            <label htmlFor="serial">Serial:</label>
            <input
              type="text"
              id="serial"
              name="serial"
              value={serial}
              onChange={(event) => setSerial(event.target.value)}
            />

            <label htmlFor="chargeCode">Charge Code:</label>
            <input
              type="text"
              id="chargeCode"
              name="chargeCode"
              value={chargeCode}
              onChange={(event) => setChargeCode(event.target.value)}
            />

            <br /><br /><br />
            <input type="submit" value="Create Item" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ItemForm;
