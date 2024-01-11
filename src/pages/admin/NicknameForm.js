import React, { useState } from "react";
import { createInventoryElement } from "../../services/api";

function NicknameForm({ showNicknameForm, setShowNicknameForm }) {
  const [itemName, setItemName] = useState("");
  //   const [classDescription, setClassDescription] = useState("");
  const [maker, setMaker] = useState('');
  const [model, setModel] = useState('');
  const [cueCategory, setCueCategory] = useState('');
  const [revision, setRevision] = useState('');
  const [parentId, setParentId] = useState('');
  const [attributes, setAttributes] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const classData = {
        name: itemName,
        description: "A nickname",
        classId: "65a022f8a11a67235b702edc", // nickname classId
        parentId: null,
        tags: [],
        attributes: [
          { name: "maker-name", description: maker },
          { name: "model", description: model },
          { name: "cue-category", description: cueCategory },
          { name: "revision", description: revision },
        ],
      };

      console.log(classData);
      const response = await createInventoryElement(classData);
      console.log("API Response:", response); // Log the API response

      // Display a success message or take further action based on the response
      alert("Item created successfully!");

      // Close the form after submission
      setShowNicknameForm(false);
    } catch (error) {
      console.error("Error during item creation:", error);
      alert(
        "Failed to create item. Please check your connection or try again later."
      );
    }
  };

  return (
    <div className="admin-container">
      <div className={`modal ${showNicknameForm ? "show" : "hide"}`}>
        <div className="modal-content">
          <span className="close" onClick={() => setShowNicknameForm(false)}>
            &times;
          </span>
          <form className="class-form" onSubmit={handleSubmit}>
            <label htmlFor="itemName">Name:</label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={itemName}
              onChange={(event) => setItemName(event.target.value)}
            />

            <label htmlFor="maker">Maker:</label>
            <input
              type="text"
              id="maker"
              name="maker"
              value={maker}
              onChange={(event) => setMaker(event.target.value)}
            />

            <label htmlFor="model">Model:</label>
            <input
              type="text"
              id="model"
              name="model"
              value={model}
              onChange={(event) => setModel(event.target.value)}
            />

            <label htmlFor="cueCategory">CUE Category:</label>
            <input
              type="text"
              id="cueCategory"
              name="cueCategory"
              value={cueCategory}
              onChange={(event) => setCueCategory(event.target.value)}
            />

            <label htmlFor="revision">Revision:</label>
            <input
              type="text"
              id="revision"
              name="revision"
              value={revision}
              onChange={(event) => setRevision(event.target.value)}
            />

            <br />

            <label>Attributes:</label>
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

                {/* Add input field for attribute value */}
                <label htmlFor={`attrValue${index}`}>Attribute Value:</label>
                <input
                  type="text"
                  id={`attrValue${index}`}
                  name={`attrValue${index}`}
                  value={attribute.value}
                  onChange={(event) =>
                    handleAttributeChange(index, "value", event.target.value)
                  }
                />
                <br />
                <br />
              </div>
            ))}

            <br />
            <br />

            <input type="submit" value="Create Item" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default NicknameForm;
