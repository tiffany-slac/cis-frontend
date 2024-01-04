import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchClassTypes, updateElement, fetchClass, fetchAllClass, fetchAllDomain, fetchDomain, fetchAllElements, fetchElement } from '../../services/api';
import { faBox, faObjectGroup, faSquarePollVertical} from '@fortawesome/free-solid-svg-icons';
import ClassForm from './ClassForm';
import ElementForm from './ElementForm';
import ObjectForm from './ObjectForm';
import ItemForm from './ItemForm';
import UpdateElementForm from './UpdateElementForm';
import './Admin.css';

function Admin() {
  const history = useHistory();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showElementForm, setShowElementForm] = useState(false);
  const [showItemForm, setShowItemForm] = useState(false);
  const [showObjectForm, setShowObjectForm] = useState(false);
  const [showClassForm, setShowClassForm] = useState(false);
  const [showUpdateElementForm, setShowUpdateElementForm] = useState(false);
  const [classTypes, setClassTypes] = useState([]);

  const [classes, setClasses] = useState([]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleItemClick = (classId) => {
    // Handle item click here (e.g., navigate to a specific form or perform an action)
    console.log(`Clicked ${classId}`);
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetchAllClass(); 
        if (response.errorCode === 0) {
          setClasses(response.payload);
        } else {
          throw new Error('Error fetching classes');
        }
      } catch (error) {
        console.error('Error fetching class types:', error.message);
      }
    };

    fetchClasses(); // Call the function to fetch class types when the component mounts
  }, []);


  const handleRowClick = (classId) => {
    history.push(`/admin/${classId}`); // Navigate to detail page with the class_id
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const alldomain = await fetchAllDomain();
        // console.log("ALL DOMAIN: " + JSON.stringify(alldomain));
        // const adomain = await fetchAllDomain();
        // console.log("ONE DOMAIN: " + JSON.stringify(adomain));
        const allClass = await fetchAllClass();
        console.log("ALL CLASSES: " + JSON.stringify(allClass));
        const aclass = await fetchClass();
        console.log("ONE CLASS: " + JSON.stringify(aclass));
        // const element = await fetchAllElements();
        // console.log("ALL ELEMENTS: " + JSON.stringify(element));
        const aelement = await fetchElement();
        console.log("ONE ELEMENT: " + JSON.stringify(aelement));
    //     const data = await fetchClassTypes(); 
    //     if (data && data.payload && Array.isArray(data.payload)) {
    //       setClassTypes(data.payload); // Set state with the payload array
    //     } else {
    //       throw new Error('Invalid data structure received');
    //     }
      } catch (error) {
        console.error('Error fetching class types:', error.message);
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
              <button onClick={(event) => {
                  handleItemClick(event); 
                  setShowClassForm(!showClassForm); 
                }}>Class</button>
              {/* <button onClick={() => handleItemClick('Building')}>Building</button>
              <button onClick={() => handleItemClick('Floor')}>Floor</button>
              <button onClick={() => handleItemClick('Room')}>Room</button> */}
              <button onClick={(event) => {
                  handleItemClick(event); 
                  setShowObjectForm(!showObjectForm); 
                }}>Nickname</button>
              <button onClick={(event) => {
                handleItemClick(event);
                setShowItemForm(!showItemForm); 
                }}>Item</button>
              {/* <button onClick={() => handleItemClick('Cable')}>Cable</button> */}
            </div>
          )}
        </div>
      </div>

      <div className="card-container">

        <div className="admin-card">
          <div className="card-content">
            <div>
              <h2>67</h2>
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
              <h2>12</h2>
              <p>Nicknames</p>
            </div>
            <div className="card-icon">
            <FontAwesomeIcon icon={faObjectGroup} title="Home" />
          </div>
          </div>
          <div className="card-action" onClick={() => setShowObjectForm(!showObjectForm)}>
              <span className="card-add">+</span>
          </div>
          {showObjectForm && <ObjectForm setShowObjectForm={setShowObjectForm} />}
        </div>

        {showItemForm && <ItemForm setShowItemForm={setShowItemForm} />}

        <div className="admin-card">
          <div className="card-content">
            <div>
              <h2>3</h2>
              <p>Items</p>
            </div>
            <div className="card-icon">
            <FontAwesomeIcon icon={faSquarePollVertical} title="Home" />
          </div>
          </div>
          <div className="card-action" onClick={() => setShowClassForm(!showClassForm)}>
              <span className="card-add">+</span>
          </div>
          {showClassForm && <ClassForm setShowClassForm={setShowClassForm} classTypes={classTypes} />}
        </div>

      </div>

      <div>
      <h2>Classes</h2>
      <table className='class-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classItem, index) => (
            <tr key={index} onClick={() => handleRowClick(classItem.id)} className="class-item">
              <td>{classItem.name}</td>
              <td>{classItem.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

      <button className="create-class-btn" onClick={() => setShowUpdateElementForm(!showUpdateElementForm)}>
        Update Object
      </button>
      {showUpdateElementForm && <UpdateElementForm setShowUpdateElementForm={setShowUpdateElementForm} />}
   </div>
  );
}

export default Admin;
