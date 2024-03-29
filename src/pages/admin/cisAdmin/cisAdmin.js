import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchAllClass, fetchAllDomain, fetchAllElements } from "../../../services/api";
import { faAngleDown, faBox, faObjectGroup, faSquarePollVertical } from "@fortawesome/free-solid-svg-icons";
import ClassForm from "./classForm";
import ItemForm from "../ItemForm";
import ElementForm from "../../cis/elementForm";
import "../admin.css";

function CISadmin() {
  const history = useHistory();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showItemForm, setShowItemForm] = useState(false);
  const [showClassForm, setShowClassForm] = useState(false);
  const [showElementForm, setShowElementForm] = useState(false);
  const [classTypes, setClassTypes] = useState([]);
  const [domains, setDomains] = useState([]);
  const [classes, setClasses] = useState([]);
  const [classDetails, setClassDetails] = useState([]);
  const [elements, setElements] = useState([]);
  const [nicknameCount, setNicknameCount] = useState(0);
  const [buildingCount, setBuildingCount] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [expandedClasses, setExpandedClasses] = useState([]);

  useEffect(() => {
    console.log("fetching domain...");
    const fetchDomains = async () => {
      const response = await fetchAllDomain();
      setDomains(response.payload);
    };
    fetchDomains(); // Call the function to fetch class types when the component mounts
  }, []);

  // Fetch classes when the component mounts
  useEffect(() => {
    console.log("fetching classes...");
    const fetchClasses = async () => {
      try {
        const response = await fetchAllClass();
        if (response.errorCode === 0) {
          setClasses(response.payload);
        } else {
          throw new Error("Error fetching classes");
        }
      } catch (error) {
        console.error("Error fetching class types:", error.message);
      }
    };

    fetchClasses(); // Call the function to fetch class types when the component mounts
  }, []);

  // Fetch elements when the component mounts
  useEffect(() => {
    const fetchElements = async () => {
      try {
        const response = await fetchAllElements(20);
        if (response.errorCode === 0) {
          setElements(response.payload);
        } else {
          throw new Error("Error fetching classes");
        }
      } catch (error) {
        console.error("Error fetching class types:", error.message);
      }
    };

    fetchElements(); // Call the function to fetch class types when the component mounts
  }, []);

  // Log class details when classDetails state changes
  // useEffect(() => {
  //   console.log("Class Details:", classDetails);
  // }, [classDetails]);

  // Fetch data for testing purposes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allClass = await fetchAllClass();
        // console.log("ALL CLASSES: " + JSON.stringify(allClass));

      } catch (error) {
        console.error("Error fetching class types:", error.message);
      }
    };

    fetchData(); // Call the function to fetch class types when the component mounts
  }, []);

  // Handle row click to navigate to detail page
  const handleRowClick = (classId) => {
    history.push(`/admin/${classId}`); // Navigate to detail page with the class_id
  };

  const handleTabChange = (tab) => {
    history.push(`/${tab.toLowerCase()}`);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    if (!showDropdown) {
      // Redirect to the admin page when the dropdown is toggled to show
      history.push('/admin');
    }
  };

  const handleItemClick = (formType) => {
    // Handle item click here (e.g., navigate to a specific form or perform an action)
    console.log(`Clicked ${formType}`);
  };

  // Render class hierarchy
  const renderClassHierarchy = (classes) => {
    const filteredClasses = classes.filter(
      (classItem) =>
        !classItem.extendsClass || classItem.extendsClass.length === 0
    );

    const renderHierarchy = (parentClass, indentationLevel = 1) => {
      const isExpanded = expandedClasses.includes(parentClass.id);
      const children = classes.filter(
        (classItem) =>
          classItem.extendsClass &&
          classItem.extendsClass.includes(parentClass.id)
      );

      if (children.length === 0) {
        return (
          <tr
            key={parentClass.id}
            onClick={() => handleRowClick(parentClass.id)}
            className="class-item"
          >
            <td style={{ paddingLeft: `${indentationLevel * 20}px` }}>
              {formatClassName(parentClass.name)}
            </td>
            <td>{parentClass.id}</td>
          </tr>
        );
      }

      return (
        <>
          <tr
            key={parentClass.id}
            onClick={() => toggleClassExpansion(parentClass.id)}
            className="class-item"
          >
            <td style={{ paddingLeft: `${indentationLevel * 20}px` }}>
              <span>{isExpanded ? "[-] " : "[+] "}</span>
              {formatClassName(parentClass.name)}
            </td>
            <td>{parentClass.id}</td>
          </tr>
          {isExpanded &&
            children.map((child) =>
              renderHierarchy(child, indentationLevel + 1)
            )}
        </>
      );
    };
    return filteredClasses.map((parentClass) => renderHierarchy(parentClass));
  };

  // Toggle class expansion in the hierarchy
  const toggleClassExpansion = (classId) => {
    setExpandedClasses((prevExpandedClasses) =>
      prevExpandedClasses.includes(classId)
        ? prevExpandedClasses.filter((id) => id !== classId)
        : [...prevExpandedClasses, classId]
    );
  };

  // Format class name for display
  const formatClassName = (name) => {
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
    return capitalized.replace(/-/g, ' ');
  };

  return (
    <div className="cis-admin">
      <h3 style={{ textAlign: 'center' }}>CIS Administrator</h3>

      {/* Button to add a new class */}
      <div className="new-class-button">
        <button className="dropbtn" onClick={() => setShowClassForm(!showClassForm)}>
          {showClassForm ? "Close Class Form" : " + Class"}
        </button>
        {showClassForm && (
          <ClassForm
            showClassForm={showClassForm}
            setShowClassForm={setShowClassForm}
          />
        )}
      </div>

      {/* Display categories in a table */}
      <div className="categories-display">
        <div className="card-display">
          <h2>Class Hierarchy</h2>
          <table className="class-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>ID</th>
                {/* <th>Extended Classes</th> */}
              </tr>
            </thead>
            <tbody>{renderClassHierarchy(classes)}</tbody>
          </table>
        </div>
      </div>

      {/* Display domains in a table */}
      <div className="card-container">
        <div className="card-display">
          <h2>Domains</h2>
          <table className="class-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {domains.map((classItem, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(classItem.id)}
                  className="class-item"
                >
                  <td>{formatClassName(classItem.name)}</td>
                  <td>{classItem.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br />
        <br />

        {/* Display classes in a table */}
        <div className="card-display">
          <h2>Classes</h2>
          <table className="class-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((classItem, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(classItem.id)}
                  className="class-item"
                >
                  <td>{formatClassName(classItem.name)}</td>
                  <td>{classItem.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br />
        <br />

        {/* Display elements in a table */}
        <div className="card-display">
          <h2>Elements</h2>
          <table className="class-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {elements.map((classItem, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(classItem.id)}
                  className="class-item"
                >
                  <td>{formatClassName(classItem.name)}</td>
                  <td>{classItem.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div><br /><br /><br /><br /><br />
      </div><br /><br />
    </div>
  );
}

export default CISadmin;
