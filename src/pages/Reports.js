import React, { useEffect, useState } from 'react';

function Reports() {
  const [users, setUsers] = useState([]);

  // Define the function to fetch users
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/v1/mock/users-auth');
      const data = await response.json();
      const userNames = Object.keys(data.payload);
      setUsers(userNames);
    } catch (error) {
      // Handle errors if needed
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Display users
  return (
    <div>
      <h1>User Reports</h1>
      <ul>
        {users.map((userName, index) => (
          <li key={index}>{userName}</li>
        ))}
      </ul>
    </div>
  );
}

export default Reports;
