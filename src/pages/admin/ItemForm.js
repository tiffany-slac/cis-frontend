import React, { useState, useEffect } from "react";
import { createInventoryElement, fetchElementNicknames } from "../../services/api";

function ItemForm({ showItemForm, setShowItemForm }) {
  const [slacId, setSlacId] = useState("");
  const [serial, setSerial] = useState("");
  const [nickname, setNickname] = useState("");
  const [location, setLocation] = useState("");
  const [chargeCode, setChargeCode] = useState("");
  const [parentId, setParentId] = useState('');
  const [tags, setTags] = useState([]);
  const [elementNames, setElementNames] = useState([]);
  const [classId, setClassId] = useState("");
  const [attributes, setAttributes] = useState([]);

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
    const fetchItemClassId = async () => {
      try {
        const classResponse = await fetchAllClass();
        if (classResponse.payload) {
          // Find the class with name "nickname"
          const itemClass = classResponse.payload.find(classItem => {
            return classItem.name === "depot";
          });
  
          if (itemClass) {
            // If the class is found, you can access its ID
            setClassId(itemClass.id);
          } else {
            window.alert("Class 'Item' not found. Please create the class before creating elements.");
            console.error("Class 'Item' not found.");
          }
        } else {
          console.error("Error in API response. No payload found.");
        }
      } catch (error) {
        console.error('Error fetching class types:', error.message);
      }
    };
  
    fetchItemClassId();
  }, []);
  

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submitting");
    try {
      const itemData = {
        name: slacId,
        classId: classId,
        parentId: parentId.trim() !== '' ? parentId.trim() : null,
        description: 'DEPOT Item',
        tags: [],
        attributes: [
          { name: "Slac-Id", value: slacId },
          { name: "Serial", value: serial },
          { name: "Nickname", value: nickname },
          { name: "Location", value: location },
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
    <div className="admin-container">
      <div className={`modal ${showItemForm ? "show" : "hide"}`}>
        <div className="modal-content">
          <span className="close" onClick={() => setShowItemForm(false)}>
            &times;
          </span>
          <form className="class-form" onSubmit={handleSubmit}>

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
              name="seźial"
              value={serial}
              onChange={(event) => setSerial(event.target.value)}
            />

<label htmlFor="nickname">Nickname:</label>
          <select
            id="nickname"
            name="nickname"
            value={nickname}
            onChange={handleNicknameChange}
          >
            <option value="">Select a nickname</option>
            {elementNames.map((elementName, index) => (
              <option key={index} value={elementName}>
                {elementName}
              </option>
            ))}
          </select>

<label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />

<label htmlFor="chargeCode">Charge Code:</label>
            <input
              type="text"
              id="chargeCode"
              name="chargeCode"
              value={chargeCode}
              onChange={(event) => setChargeCode(event.target.value)}
            />


            <label htmlFor="parentId">Parent ID:</label>
            <input
              type="text"
              id="parentId"
              name="parentId"
              value={parentId}
              onChange={(event) => setParentId(event.target.value.trim() || null)}
            />

            <br />

            {/* <label>Attributes:</label>
            {attributes.map((attribute, index) => (
              <div key={index}>
                <label htmlFor={`attrName${index}`}>Attribute Name:</label>
                <input
                  type="text"
                  id={`attrName${index}`}
                  name={`attrName${index}`}
                  value={attribute.name}
                  onChange={(event) =>
                    handleAttributeChange(index, "name", event.target.value)
                  }
                />
                <br />

                <label htmlFor={`attrDescription${index}`}>
                  Attribute Description:
                </label>
                <input
                  type="text"
                  id={`attrDescription${index}`}
                  name={`attrDescription${index}`}
                  value={attribute.description}
                  onChange={(event) =>
                    handleAttributeChange(
                      index,
                      "description",
                      event.target.value
                    )
                  }
                />
                <br />

                <label htmlFor={`attrMandatory${index}`}>Mandatory:</label>
                <input
                  type="checkbox"
                  id={`attrMandatory${index}`}
                  name={`attrMandatory${index}`}
                  checked={attribute.mandatory}
                  onChange={(event) =>
                    handleAttributeChange(
                      index,
                      "mandatory",
                      event.target.checked
                    )
                  }
                />
                <br />

                <label htmlFor={`attrType${index}`}>Attribute Type:</label>
                <input
                  type="text"
                  id={`attrType${index}`}
                  name={`attrType${index}`}
                  value={attribute.type}
                  onChange={(event) =>
                    handleAttributeChange(index, "type", event.target.value)
                  }
                />
                <br />

                <label htmlFor={`attrUnit${index}`}>Attribute Unit:</label>
                <input
                  type="text"
                  id={`attrUnit${index}`}
                  name={`attrUnit${index}`}
                  value={attribute.unit}
                  onChange={(event) =>
                    handleAttributeChange(index, "unit", event.target.value)
                  }
                />
                <br />
                <br />
              </div>
            ))}

            <button type="button" onClick={addAttribute}>
              Add Attribute
            </button> */}

            <br />
            <br />

            <input type="submit" value="Create Item" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ItemForm;
