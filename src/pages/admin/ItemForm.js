import React, { useState } from "react";
import { createInventoryElement } from "../../services/api";

function ItemForm({ showItemForm, setShowItemForm }) {
  const [itemName, setItemName] = useState("");
//   const [classDescription, setClassDescription] = useState("");
  const [serialNumber, setSerialNumber] = useState([]);
  const [parentId, setParentId] = useState([]);
  const [attributes, setAttributes] = useState([]);

//   const addAttribute = () => {
//     setAttributes([
//       ...attributes,
//       {
//         name: "",
//         description: "",
//         mandatory: true,
//         type: "String",
//         unit: "",
//       },
//     ]);
//   };

//   const handleAttributeChange = (index, key, value) => {
//     const updatedAttributes = [...attributes];
//     updatedAttributes[index][key] = value;
//     setAttributes(updatedAttributes);
//   };

  const handleSubmit = async (event) => {
    event.preventDefault();
try{
    const classData = {
      name: itemName,
      classId: "6584ea2dca8f2363250a3108",
      parentId: null,
      description: serialNumber,
      tags: [],
    //   attributes: [{"name": "string", "value": "string"}],
      attributes: attributes.map((attribute) => ({
        name: attribute.name,
        description: attribute.description,
        mandatory: attribute.mandatory,
        type: attribute.type,
        unit: attribute.unit,
      })),
    };

    console.log(classData);
    const response = await createInventoryElement(classData);
    console.log("API Response:", response); // Log the API response

    // Display a success message or take further action based on the response
    alert('Item created successfully!');

    // Close the form after submission
    setShowItemForm(false);
} catch (error) {
    console.error("Error during item creation:", error);
    alert('Failed to create item. Please check your connection or try again later.');
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

            <label htmlFor="itemName">Name:</label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={itemName}
              onChange={(event) => setItemName(event.target.value)}
            />

            {/* <label htmlFor="classDescription">Description:</label>
            <input
              type="text"
              id="classDescription"
              name="classDescription"
              value={classDescription}
              onChange={(event) => setClassDescription(event.target.value)}
            /> */}

            {/* <label htmlFor="classId">Class:</label>
            <input
              type="text"
              id="classId"
              name="classId"
              value={classId}
              onChange={(event) => setClassId(event.target.value)}
            /> */}

            <label htmlFor="serialNumber">Serial:</label>
            <input
              type="text"
              id="serialNumber"
              name="serialNumber"
              value={serialNumber}
              onChange={(event) => setSerialNumber(event.target.value)}
            />

            <label htmlFor="parentId">Parent:</label>
            <input
              type="text"
              id="parentId"
              name="parentId"
              value={parentId}
              onChange={(event) => setParentId(event.target.value)}
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

            <br /><br />
            
            <input type="submit" value="Create Item" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ItemForm;
