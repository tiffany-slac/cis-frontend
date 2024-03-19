import React, { useState, useEffect } from 'react';
import { createShopGroup, fetchUsers } from '../../../services/api';
import { MultiSelect } from 'react-multi-select-component';

function ShopGroupForm({ showShopGroupForm, setShowShopGroupForm }) {
  const [shopGroupData, setShopGroupData] = useState({
    name: '',
    description: '',
    userEmails: []
  });
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    console.log("fetching users...");
    const fetchTheUsers = async () => {
      const response = await fetchUsers();
      setUsers(response.payload);
      console.log(response.payload);
    };
    fetchTheUsers(); // Call the function to fetch class types when the component mounts
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setShopGroupData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleUserChange = (selectedOptions) => {
    const formattedUsers = selectedOptions.map((option) => ({
      userId: option.value,
      isLeader: false  // Assuming all users are not leaders initially
    }));
    setShopGroupData((prevData) => ({
      ...prevData,
      users: formattedUsers
    }));
    setSelectedUsers(selectedOptions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(shopGroupData);
      await createShopGroup(shopGroupData);
      alert("Shop group created successfully!");
      setShowShopGroupForm(false); // Close the form
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error('Error creating shop group:', error);
      alert("Error creating shop group. Please try again.");
    }
  };

  const options = users.map((user) => ({
    value: user.mail,
    label: `${user.commonName} (${user.mail})`
  }));

  return (
    <div className={`modal ${showShopGroupForm ? "show" : "hide"}`}>
      <div className="form-content">
        <span className="close" onClick={() => setShowShopGroupForm(false)}>
          &times;
        </span>

        <h1 className="form-title">NEW SHOP GROUP</h1>

        <form onSubmit={handleSubmit} className="shop-group-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={shopGroupData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={shopGroupData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group" style={{ width: '100%' }}>
            <label htmlFor="userEmails">User Emails</label>
            <MultiSelect
              options={options}
              value={selectedUsers}
              onChange={handleUserChange}
              labelledBy={"Select"}
              style={{ width: '100%' }} // Apply inline style for width
            />
          </div>

          <button type="submit" className="form-button">Create Shop Group</button>
        </form>
      </div>
    </div>
  );
}

export default ShopGroupForm;
