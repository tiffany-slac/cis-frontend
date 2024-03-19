import React, { useState, useEffect } from "react";
import { createInventoryElement, fetchAllClass } from "../../services/api";

function NicknameForm({ showNicknameForm, setShowNicknameForm }) {
  const [itemName, setItemName] = useState("");
  const [maker, setMaker] = useState('');
  const [model, setModel] = useState('');
  const [cueCategory, setCueCategory] = useState('');
  const [revision, setRevision] = useState('');
  const [attributes, setAttributes] = useState([]);
  const [classId, setClassId] = useState('');

  useEffect(() => {
    const fetchNicknameClassId = async () => {
      try {
        const classResponse = await fetchAllClass();
        if (classResponse.payload) {
          // Find the class with name "nickname"
          const nicknameClass = classResponse.payload.find(classItem => {
            return classItem.name === "nickname";
          });
  
          if (nicknameClass) {
            // If the class is found, you can access its ID
            setClassId(nicknameClass.id);
          } else {
            window.alert("Class 'nickname' not found. Please create the class before creating elements.");
            console.error("Class 'nickname' not found.");
          }
        } else {
          console.error("Error in API response. No payload found.");
        }
      } catch (error) {
        console.error('Error fetching class types:', error.message);
      }
    };
  
    fetchNicknameClassId();
  }, []);
  
  const InputField = ({ label, value, onChange }) => (
    <div>
      <label htmlFor={label}>{label}:</label>
      <input
        type="text"
        id={label}
        name={label}
        value={value}
        onChange={onChange}
      />
    </div>
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const classData = {
        name: itemName,
        description: "A nickname",
        classId: classId,
        parentId: null,
        tags: [],
        attributes: [
          { name: "maker-name", description: maker },
          { name: "model", description: model },
          { name: "cue-category", description: cueCategory },
          { name: "revision", description: revision },
          ...attributes, // Add dynamic attributes
        ],
      };

      const response = await createInventoryElement(classData);
      console.log("API Response:", response); // Log the API response

      alert("Item created successfully!");
      setShowNicknameForm(false); // Close the form after submission
    } catch (error) {
      console.error("Error during item creation:", error);
      alert("Failed to create item. Please check your connection or try again later.");
    }
  };

  const handleAttributeChange = (index, key, value) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index][key] = value;
    setAttributes(updatedAttributes);
  };

  return (
    <div className="admin-container">
      <div className={`modal ${showNicknameForm ? "show" : "hide"}`}>
        <div className="form-content">
          <span className="close" onClick={() => setShowNicknameForm(false)}>
            &times;
          </span>
          <form className="class-form" onSubmit={handleSubmit}>
            <InputField label="itemName" value={itemName} onChange={(event) => setItemName(event.target.value)} />
            <InputField label="maker" value={maker} onChange={(event) => setMaker(event.target.value)} />
            <InputField label="model" value={model} onChange={(event) => setModel(event.target.value)} />
            <InputField label="cueCategory" value={cueCategory} onChange={(event) => setCueCategory(event.target.value)} />
            <InputField label="revision" value={revision} onChange={(event) => setRevision(event.target.value)} />

            <label>Attributes:</label>
            {attributes.map((attribute, index) => (
              <div key={index}>
                <InputField label={`attrName${index}`} value={attribute.name} onChange={(event) => handleAttributeChange(index, "name", event.target.value)} />
                <InputField label={`attrValue${index}`} value={attribute.description} onChange={(event) => handleAttributeChange(index, "description", event.target.value)} />
              </div>
            ))}

            <input type="submit" value="Create Item" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default NicknameForm;
