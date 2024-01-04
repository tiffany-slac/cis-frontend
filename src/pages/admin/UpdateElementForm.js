import React, { useState } from "react";
import { updateElement } from "../../services/api"; // Replace with your API function

function UpdateElementForm({
  showElementForm,
  setShowUpdateElementForm,
}) {
  const [domainId, setDomainId] = useState("");
  const [elementId, setElementId] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [attributes, setAttributes] = useState([]);

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

  const handleUpdateElement = async (e) => {
    e.preventDefault(); 

    try {
      const updatedElementData = {
        description,
        // tags: tags.split(",").map((tag) => tag.trim()),
        // attributes: attributes.map((attribute) => ({
        //   name: attribute.name,
        //   description: attribute.description,
        //   mandatory: attribute.mandatory,
        //   type: attribute.type,
        //   unit: attribute.unit,
        // })),
      };

      await updateElement(domainId, elementId, updatedElementData);
      setShowUpdateElementForm(false);
      // Optionally, add logic to handle successful update
    } catch (error) {
      console.error("Error updating element:", error.message);
      // Handle error
    }
  };

  return (
    <div className="admin-container">
      <div className={`modal ${showElementForm ? "show" : "hide"}`}>
        <div className="modal-content">
          <span
            className="close"
            onClick={() => setShowUpdateElementForm(false)}
          >
            &times;
          </span>
          <form className="class-form" onSubmit={handleUpdateElement}>
            <h2>Update Element</h2>

            <label htmlFor="domainId">Domain ID:</label>
            <input
              type="text"
              id="domainId"
              value={domainId}
              onChange={(e) => setDomainId(e.target.value)}
            />

            <label htmlFor="elementId">Element ID:</label>
            <input
              type="text"
              id="elementId"
              value={elementId}
              onChange={(e) => setElementId(e.target.value)}
            />

            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {/* <label htmlFor="tags">Tags:</label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            /> */}

            {/* <h3>Attributes:</h3>
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
            ))} */}
            <button type="button" onClick={addAttribute}>
              Add Attribute
            </button>
            <input type="submit" value="Update Item" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateElementForm;
