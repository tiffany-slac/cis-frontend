import React, { useState, useEffect } from "react";
import {
  createInventoryClass,
  fetchAllClass,
  fetchClass,
} from "../../services/api";

function ClassForm({ showClassForm, setShowClassForm, classTypes }) {
  const [className, setClassName] = useState("");
  const [classDescription, setClassDescription] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [extendsClass, setExtendsClass] = useState("");
  const [permittedChildClass, setPermittedChildClass] = useState("");
  const [implementedByClass, setImplementedByClass] = useState("");
  const [selectedClassName, setSelectedClassName] = useState("");
  const [classesName, setClassesName] = useState([]);
  const [extendsClassAttributes, setExtendsClassAttributes] = useState([]);
  const [selectedExtendsClass, setSelectedExtendsClass] = useState("");

  useEffect(() => {
    const fetchExtendsClassAttributes = async () => {
      try {
        if (selectedExtendsClass) {
          const extendsClassDetails = await fetchClass(selectedExtendsClass);

          if (extendsClassDetails.errorCode === 0) {
            const extendsClassAttributes =
              extendsClassDetails.payload.attributes || [];
            setExtendsClassAttributes(extendsClassAttributes);
          } else {
            throw new Error("Error fetching extendsClass details");
          }
        }
      } catch (error) {
        console.error("Error fetching extendsClass details:", error.message);
      }
    };

    fetchExtendsClassAttributes();
  }, [selectedExtendsClass]);

  const handleChange = (event) => {
    const selectedClassId = event.target.value;
    setSelectedExtendsClass(selectedClassId);
    // Set extendsClass based on the selected class name
    const selectedClass = classesName.find(
      (classes) => classes.id === selectedClassId
    );
    setExtendsClass(selectedClass ? selectedClass.id : "");
  };
  

  // Utility function to capitalize the first letter and replace "-" with a space
  const formatAttributeName = (name) => {
    if (typeof name === 'string') {
      return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " ");
    } else {
      return ''; // or handle it based on your requirements
    }
  };
  

  // Inside your handleAttributeChange function
  const handleAttributeChange = (index, key, value) => {
    if (key === "extendsClassAttribute") {
      // Handle extendsClassAttributes separately
      const updatedExtendsClassAttributes = [...extendsClassAttributes];
      updatedExtendsClassAttributes[index] = {
        ...updatedExtendsClassAttributes[index],
        description: formatAttributeName(value),
      };
      setExtendsClassAttributes(updatedExtendsClassAttributes);
    } else {
      // Handle other attributes
      const updatedAttributes = [...attributes];
      updatedAttributes[index][key] = formatAttributeName(value);
      setAttributes(updatedAttributes);
  
      // Log the attributes state
      console.log("Attributes state:", updatedAttributes);
    }
  };
  

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetchAllClass();
        if (response.errorCode === 0) {
          const classesDetails = response.payload.map((classes) => ({
            id: classes.id,
            name: classes.name,
          }));
          setClassesName(classesDetails);
        } else {
          throw new Error("Error fetching elements");
        }
      } catch (error) {
        console.error("Error fetching elements:", error.message);
      }
    };

    fetchClasses();
  }, []);

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

  // const handleAttributeChange = (index, key, value) => {
  //   const updatedAttributes = [...attributes];
  //   updatedAttributes[index][key] = value;
  //   setAttributes(updatedAttributes);
  // };

  // const handleChange = (event) => {
  //   const selectedClassName = event.target.value;
  //   setSelectedClassName(selectedClassName);
  //   // Set classId based on the selected class name
  //   const selectedClass = classesName.find(
  //     (classes) => classes.name === selectedClassName
  //   );
  //   setExtendsClass(selectedClass ? selectedClass.id : "");
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Create an array of attribute objects based on user input and extendsClassAttributes
    const formattedAttributes = [
      ...extendsClassAttributes.map((attribute) => ({
        name: attribute.name,
        description: attribute.description,
        mandatory: attribute.mandatory,
        type: attribute.type,
        unit: attribute.unit,
      })),
      ...attributes.map((attribute) => ({
        name: attribute.name,
        description: attribute.description,
        mandatory: attribute.mandatory,
        type: attribute.type,
        unit: attribute.unit,
      })),
    ];
  
    // Create the class data with the desired structure
    const classData = {
      name: className,
      description: classDescription,
      extendsClass: extendsClass ? [extendsClass] : [],
      permittedChildClass: permittedChildClass ? [permittedChildClass] : [],
      implementedByClass: implementedByClass ? [implementedByClass] : [],
      attributes: formattedAttributes,
    };
  
    console.log(classData);
    const response = await createInventoryClass(classData);
  
    // Close the form after submission
    setShowClassForm(false);
    window.location.reload();
  };
  
  

  return (
    <div className="admin-container">
      <div className={`modal ${showClassForm ? "show" : "hide"}`}>
        <div className="form-content">
          <span className="close" onClick={() => setShowClassForm(false)}>
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

            <label htmlFor="extendsClass">Extends Class:</label>
            <select
              id="extendsClass"
              name="extendsClass"
              value={selectedExtendsClass}
              onChange={handleChange}
            >
              <option value="">Select a type</option>
              {classesName.map((classes) => (
                <option key={classes.id} value={classes.id}>
                  {classes.name}
                </option>
              ))}
            </select>
            <br />

            {/* Display input fields for extendsClassAttributes */}
            {extendsClassAttributes.map((attribute, index) => (
              <div key={index}>
                <label htmlFor={`extendsAttr${index}`}>
                  {formatAttributeName(attribute.name)}:
                </label>
                <input
                  type="text"
                  id={`extendsAttr${index}`}
                  name={`extendsAttr${index}`}
                  value={
                    extendsClassAttributes[index]
                      ? extendsClassAttributes[index].description
                      : ""
                  }
                  onChange={(event) =>
                    handleAttributeChange(
                      index,
                      "extendsClassAttribute",
                      event.target.value
                    )
                  }
                />
                <br />
                {/* Add additional input fields as needed for other attributes */}
              </div>
            ))}

            {/* <label htmlFor="permittedChildClass">Child Class:</label>
            <input
              type="text"
              id="permittedChildClass"
              name="permittedChildClass"
              value={permittedChildClass}
              onChange={(event) =>
                setPermittedChildClass(
                  event.target.value.trim() === "" ? null : event.target.value
                )
              }
            />
            <br /> */}

            {/* <label htmlFor="implementedByClass">Implemented By Class:</label>
            <input
              type="text"
              id="implementedByClass"
              name="implementedByClass"
              value={implementedByClass}
              onChange={(event) => setImplementedByClass(event.target.value)}
            />
            <br /> */}

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

            <br />
            <br />

            <input type="submit" value="Create Class" />
            <br />
            <br />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ClassForm;
