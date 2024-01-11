import React, { useState } from "react";
import { createInventoryElement } from "../../services/api";

function LocationForm({ showLocationForm, setShowLocationForm }) {
  const [className, setClassName] = useState("");
  const [classDescription, setClassDescription] = useState("");
  const [parentId, setParentId] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [extendsClass, setExtendsClass] = useState([]);
  const [permittedChildClass, setPermittedChildClass] = useState([]);

  const addAttribute = () => {
    setAttributes([
      ...attributes,
      {
        name: "",
        description: "",
        mandatory: true,
        type: "String",
        unit: "",
      },
    ]);
  };

  const handleAttributeChange = (index, key, value) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index][key] = value;
    setAttributes(updatedAttributes);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
try{
    const classData = {
      name: className,
      classId: '65a020bca11a67235b702ecf',
      parentId: parentId.trim() !== '' ? parentId.trim() : null,
      description: classDescription,
      tags: [],
      attributes: [
        { name: "Building-Number", value: "41" },
        { name: "Security-Level", description: "Green" },
      ],

      // attributes: attributes.map((attribute) => ({
      //   name: attribute.name,
      //   description: attribute.description,
      //   mandatory: attribute.mandatory,
      //   type: attribute.type,
      //   unit: attribute.unit,
      // })),
    };

    console.log(classData);
    const response = await createInventoryElement(classData);

     // Check if the response indicates success (assuming 200 is a success status code)
     if (response.status == 201) {
      console.log('Inventory element created successfully!');
      // Display a success message (e.g., a toast notification or an alert)
      alert('Inventory element created successfully!');
    } else {
      console.error('Failed to create inventory element:', response.statusText);
      // Handle other status codes or unexpected responses if needed
      alert('Failed to create inventory element. Please try again later.');
    }

    // Close the form after submission (regardless of success or failure)
    setShowLocationForm(false);
  } catch (error) {
    console.error('Error during inventory element creation:', error);
  
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  
    alert('Failed to create inventory element. Please check your connection or try again later.');
  }
  };

  return (
    <div className="admin-container">
      <div className={`modal ${showLocationForm ? "show" : "hide"}`}>
        <div className="modal-content">
          <span className="close" onClick={() => setShowLocationForm(false)}>
            &times;
          </span>
          
          <form className="class-form" onSubmit={handleSubmit}>
            <label htmlFor="className">Name:</label>
            <input
              type="text"
              id="className"
              name="className"
              value={className}
              onChange={(event) => setClassName(event.target.value)}
            />

            <label htmlFor="classDescription">Description:</label>
            <input
              type="text"
              id="classDescription"
              name="classDescription"
              value={classDescription}
              onChange={(event) => setClassDescription(event.target.value)}
            />

            <label htmlFor="parentId">Parent ID:</label>
            <input
              type="text"
              id="parentId"
              name="parentId"
              value={parentId}
              onChange={(event) => setParentId(event.target.value.trim() || null)}
            />


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
            </button>

            <br /><br />
            
            <input type="submit" value="Create Class" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default LocationForm;
