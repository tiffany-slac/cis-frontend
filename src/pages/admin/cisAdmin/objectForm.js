import React, { useState, useEffect } from "react";
import { fetchClass, fetchAllClass } from "../../../services/api";

function ObjectForm({ showObjectForm, setShowObjectForm }) {
  const [classTypes, setClassTypes] = useState([]);
  const [selectedClassType, setSelectedClassType] = useState("");
  const [classData, setClassData] = useState(null);
  const [formFields, setFormFields] = useState([]);

  const getClassIdByName = async (className) => {
    try {
      // Fetch all classes
      const classes = await fetchAllClass();
      // Find the class with the matching name
      const foundClass = classes.find((classItem) => classItem.name === className);
      if (foundClass) {
        return foundClass.id; // Return the ID of the found class
      } else {
        throw new Error('Class not found');
      }
    } catch (error) {
      throw new Error('Error fetching class by name:', error.message);
    }
  };


  const handleClassTypeChange = async (e) => {
    const selectedType = e.target.value;
    setSelectedClassType(selectedType);

    try {
      const classId = await getClassIdByName(selectedType); // Retrieve the ID based on the name

      // Use the retrieved class ID (classId) for further actions (e.g., fetching class data)
      const classData = await fetchClass(classId);
      console.log('Fetched Class Data:', classData);

      // Other handling with the class data...
    } catch (error) {
      console.error('Error handling form submission:', error);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      // Prepare form data for submission
      const newObject = {
        name: e.target.elements.name.value,
        description: e.target.elements.description.value,
        type: classData.name,
        // Access other form values based on the class data schema
      };
      console.log("Submitted Data:", newObject);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  useEffect(() => {
    if (classData && classData.payload && classData.payload.attributes) {
      const fields = classData.payload.attributes.map((attribute) => ({
        name: attribute.name,
        type: attribute.type,
        mandatory: attribute.mandatory,
      }));
      setFormFields(fields);
    } else {
      setFormFields([]); // Reset form fields if no class data available
    }
  }, [classData]);



  const renderFormFields = () => {
    return formFields.map((field) => {
      return (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.name}:</label>
          {renderField(field)}
        </div>
      );
    });
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'String':
        return (
          <input
            type="text"
            id={field.name}
            placeholder={field.mandatory ? 'Required' : 'Optional'}
            required={field.mandatory}
          />
        );
      case 'SecurityLevel':
        return (
          <select id={field.name} required={field.mandatory}>
            <option value="">Select {field.name}</option>
            <option value="Green">Green</option>
            <option value="Yellow">Yellow</option>
            <option value="Red">Red</option>
          </select>
        );
      // Add cases for other field types as needed
      default:
        return null;
    }
  };

  return (
    <div className="admin-container">
      <div className={`modal ${showObjectForm ? "show" : "hide"}`}>
        <div className="modal-content">
          <span className="close" onClick={() => setShowObjectForm(false)}>
            &times;
          </span>
          <form className="class-form" onSubmit={handleSubmit}>
            <label htmlFor="classType">Select Class Type:</label>
            <select
              id="classType"
              value={selectedClassType}
              onChange={handleClassTypeChange}
            >
              <option value="">Select Class Type</option>
              {classTypes.map((classType, index) => (
                <option key={index} value={classType}>
                  {classType}
                </option>
              ))}
            </select>

            {classData && (
              <div>
                <h2>{classData.name} Class</h2>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" required />
                <label htmlFor="description">Description:</label>
                <input type="text" id="description" required />
                {renderFormFields()}
                <button type="submit">Create Object</button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ObjectForm;
