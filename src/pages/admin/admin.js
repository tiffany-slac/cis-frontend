import React, { useState, useEffect } from 'react';
import { fetchClassTypes } from '../../services/api';
import ClassForm from './ClassForm';
import ElementForm from './ElementForm';
import './admin.css';

function Admin() {
  const [showElementForm, setShowElementForm] = useState(false);
  const [showClassForm, setShowClassForm] = useState(false);
  const [classTypes, setClassTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchClassTypes(); // Call the imported function
        if (data && data.payload && Array.isArray(data.payload)) {
          setClassTypes(data.payload); // Set state with the payload array
        } else {
          throw new Error('Invalid data structure received');
        }
      } catch (error) {
        console.error('Error fetching class types:', error.message);
      }
    };

    fetchData(); // Call the function to fetch class types when the component mounts
  }, []);


  return (
    <div>

      <h1>Admin Dashboard</h1>

      <button className="create-class-btn" onClick={() => setShowElementForm(!showElementForm)}>
        Create New Inventory Element
      </button>
      {showElementForm && <ElementForm setShowElementForm={setShowElementForm} />}

      <button className="create-class-btn" onClick={() => setShowClassForm(!showClassForm)}>
        Create New Inventory Class
      </button>
      {showClassForm && <ClassForm setShowClassForm={setShowClassForm} classTypes={classTypes} />}

      {/* Displaying the fetched class types as a list */}
      <div>
        <h2>Available Class Types</h2>
        <ul>
          {classTypes.map((classType, index) => (
            <li key={index}>{classType}</li>
          ))}
        </ul>
      </div>

   </div>
  );
}

export default Admin;
