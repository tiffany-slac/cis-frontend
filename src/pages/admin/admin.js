import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchPath, fetchAllClass, fetchAllDomain, countElementsByClassName, fetchAllElements, fetchElement, fetchImplementation, fetchClass } from "../../services/api";
import { faBox, faObjectGroup, faSquarePollVertical } from "@fortawesome/free-solid-svg-icons";
import ClassForm from "./ClassForm";
import NicknameForm from "./NicknameForm";
import LocationForm from "./LocationForm";
import ObjectForm from "./ObjectForm";
import ItemForm from "./ItemForm";
import UpdateElementForm from "./UpdateElementForm";
import "./admin.css";

function Admin() {
  const history = useHistory();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNicknameForm, setShowNicknameForm] = useState(false);
  const [showItemForm, setShowItemForm] = useState(false);
  const [showLocationForm, setShowLocationForm] = useState(false);
  const [showObjectForm, setShowObjectForm] = useState(false);
  const [showClassForm, setShowClassForm] = useState(false);
  const [showUpdateElementForm, setShowUpdateElementForm] = useState(false);
  const [classTypes, setClassTypes] = useState([]);

  const [domains, setDomains] = useState([]);
  const [classes, setClasses] = useState([]);
  const [elements, setElements] = useState([]);
  const [pathData, setPathData] = useState(null);
  const [allElements, setAllElements] = useState(null);

  const [nicknameCount, setNicknameCount] = useState(0);
  const [buildingCount, setBuildingCount] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    // Fetch and update the element counts when the component mounts
    const fetchElementCounts = async () => {
      try {
        const elementsResponse = await fetchAllElements();
        if (elementsResponse.payload) {
          // Filter elements with class name "building"
          const buildingElements = elementsResponse.payload.filter(element => {
            return element.classDTO && element.classDTO.name === "building";
          });

          // Count the number of building elements
          const buildingCount = buildingElements.length;
          setBuildingCount(buildingCount);

          // Filter elements with class name "nickname"
          const nicknameElements = elementsResponse.payload.filter(element => {
            return element.classDTO && element.classDTO.name === "nickname";
          });

          // Count the number of nickname elements
          const nicknameCount = nicknameElements.length;
          setNicknameCount(nicknameCount);

          // Filter elements with class name "nickname"
          const itemElements = elementsResponse.payload.filter(element => {
            return element.classDTO && element.classDTO.name === "depot";
          });

          // Count the number of nickname elements
          const itemCount = itemElements.length;
          setItemCount(itemCount);
        } else {
          console.error("Error in API response. No payload found.");
        }
      } catch (error) {
        console.error('Error fetching element counts:', error.message);
      }
    };

    fetchElementCounts();
  }, []);

  // useEffect(() => {

  //   const elementId = "65a020bca11a67235b702ed9";

  //   const fetchData = async () => {
  //     try {
  //       const pathResult = await fetchPath( elementId, 'Full');
  //       setPathData(pathResult);
  //     } catch (error) {
  //       console.error("Error fetching path:", error);
  //     }
  //   };

  //   fetchData(); 
  // }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleItemClick = (formType) => {
    // Handle item click here (e.g., navigate to a specific form or perform an action)
    console.log(`Clicked ${formType}`);
  };

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await fetchAllDomain();
        if (response.errorCode === 0) {
          setDomains(response.payload);
        } else {
          throw new Error("Error fetching classes");
        }
      } catch (error) {
        console.error("Error fetching class types:", error.message);
      }
    };

    fetchDomains(); // Call the function to fetch class types when the component mounts
  }, []);

  useEffect(() => {
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

  const handleRowClick = (classId) => {
    history.push(`/admin/${classId}`); // Navigate to detail page with the class_id
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const aChild = await fetchElementChildren();
        // console.log("CHILDREN: " + JSON.stringify(aChild));
        // const implementation = await fetchImplementation("659da090436dda6f355adc98");
        // console.log("IMPLEMENTATION: " + JSON.stringify(implementation));
        const allClass = await fetchAllClass();
        console.log("ALL CLASSES: " + JSON.stringify(allClass));
        // const path = await fetchPath();
        // console.log("A PATH: " + JSON.stringify(path));
        // const aclass = await fetchClass('659f31048a79764e92f1d0d5');
        // console.log("ONE CLASS: " + JSON.stringify(aclass));
        // const abclass = await fetchClass('65a022f8a11a67235b702edc');
        // console.log("ONE CLASS: " + JSON.stringify(abclass));
        // const abclass = await fetchClass('659f23ad8a79764e92f1d0cc');
        // console.log("ONE CLASS: " + JSON.stringify(abclass));
        const element = await fetchAllElements();
        console.log("ALL ELEMENTS: " + JSON.stringify(element));
        // const aelement = await fetchElement('659f37c68a79764e92f1d0d8');
        // console.log("ONE ELEMENT: " + JSON.stringify(aelement));
      } catch (error) {
        console.error("Error fetching class types:", error.message);
      }
    };

    fetchData(); // Call the function to fetch class types when the component mounts
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <div className="top-right">
        <div className="dropdown">
          <button onClick={toggleDropdown} className="dropbtn">
            <span>+</span> New
          </button>
          {showDropdown && (
            <div className="dropdown-content">
              
              {showClassForm && (
                <ClassForm
                  setShowClassForm={setShowClassForm}
                  classTypes={classTypes}
                />
              )}
              <button
                onClick={() => {
                  handleItemClick("Class");
                  setShowClassForm(true);
                }}
              >
                Class
              </button>

              {showLocationForm && (
                <LocationForm setShowLocationForm={setShowLocationForm} />
              )}
              <button
                onClick={(event) => {
                  handleItemClick(event);
                  setShowLocationForm(!showLocationForm);
                }}
              >
                Location
              </button>

              {showNicknameForm && (
                <NicknameForm setShowNicknameForm={setShowNicknameForm} />
              )}
              <button
                onClick={(event) => {
                  handleItemClick(event);
                  setShowNicknameForm(!showNicknameForm);
                }}
              >
                Nickname
              </button>

              {showItemForm && <ItemForm setShowItemForm={setShowItemForm} />}
              <button
                onClick={(event) => {
                  handleItemClick(event);
                  setShowItemForm(!showItemForm);
                }}
              >
                Item
              </button>

            </div>
          )}
        </div>
      </div>

      <div className="card-container">
        <div className="admin-card">
          <div className="card-content">
            <div>
              <h2>{buildingCount}</h2>
              <p>Buildings</p>
            </div>
            <div className="card-icon">
              <FontAwesomeIcon icon={faBox} title="Home" />
            </div>
          </div>
          <div className="card-action">
            <span className="card-add">+</span>
          </div>
        </div>

        <div className="admin-card">
          <div className="card-content">
            <div>
              <h2>{nicknameCount}</h2>
              <p>Nicknames</p>
            </div>
            <div className="card-icon">
              <FontAwesomeIcon icon={faObjectGroup} title="Home" />
            </div>
          </div>
          <div
            className="card-action"
            onClick={() => setShowObjectForm(!showObjectForm)}
          >
            <span className="card-add">+</span>
          </div>
          {showObjectForm && (
            <ObjectForm setShowObjectForm={setShowObjectForm} />
          )}
        </div>

        {showItemForm && <ItemForm setShowItemForm={setShowItemForm} />}

        <div className="admin-card">
          <div className="card-content">
            <div>
              <h2>{itemCount}</h2>
              <p>Items</p>
            </div>
            <div className="card-icon">
              <FontAwesomeIcon icon={faSquarePollVertical} title="Home" />
            </div>
          </div>
          <div
            className="card-action"
            onClick={() => setShowClassForm(!showClassForm)}
          >
            <span className="card-add">+</span>
          </div>
        </div>
      </div>

      {/* <div>
        <h3>Element Path</h3>
        {pathData ? (
          <div>
            <pre>{JSON.stringify(pathData, null, 2)}</pre>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div> */}

      <div className="admin-page">
        <div>
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
                <td>{classItem.name}</td>
                <td>{classItem.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div><br /><br />

      <div>
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
                <td>{classItem.name}</td>
                <td>{classItem.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div><br /><br />

      <div>
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
                <td>{classItem.name}</td>
                <td>{classItem.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div><br /><br /><br /><br /><br />

      {/* <button
        className="create-class-btn"
        onClick={() => setShowUpdateElementForm(!showUpdateElementForm)}
      >
        Update Object
      </button>
      {showUpdateElementForm && (
        <UpdateElementForm
          setShowUpdateElementForm={setShowUpdateElementForm}
        />
      )} */}
    </div>
    </div>
  );
}

export default Admin;
