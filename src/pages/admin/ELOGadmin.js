import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { fetchAllClass, fetchAllDomain, fetchAllElements } from "../../services/api";
import "./admin.css";

function ELOGadmin() {
  const history = useHistory();
  const [showDropdown, setShowDropdown] = useState(false);
  const [domains, setDomains] = useState([]);
  const [classes, setClasses] = useState([]);
  const [classDetails, setClassDetails] = useState([]);
  const [elements, setElements] = useState([]);
  const [expandedClasses, setExpandedClasses] = useState([]);


  // Fetch domains when the component mounts
  useEffect(() => {
    fetchAllDomain().then(response => setDomains(response.payload));
    fetchAllClass().then(response => setClasses(response.payload));
    fetchAllElements().then(response => setElements(response.payload));
  }, []);

  // Handle row click to navigate to detail page
  const handleRowClick = (classId) => {
    history.push(`/admin/${classId}`); // Navigate to detail page with the class_id
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
            {/* <td>{parentClass.extendsClass && parentClass.extendsClass.length > 0 ? parentClass.extendsClass.join(', ') : 'None'}</td> */}
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
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');
  };

  return (
    <div className="elog-admin">
      <h3 style={{ textAlign: "center" }}>eLog Administrator</h3>

      {/* Display domains in a table */}
      <div className="card-container">
        <div className="card-display">
          <h2>In Progress...</h2>
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
      </div><br /><br />
    </div>
  );
}

export default ELOGadmin;
