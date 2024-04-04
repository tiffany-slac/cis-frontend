import React, { useState, useEffect } from 'react';
import { createWork, fetchWorkType, fetchLocations, fetchShopGroups, fetchUsers } from '../../../services/api';
import './workForm.css';

function WorkForm({ showWorkForm, setShowWorkForm }) {
    // State to manage form input values
    const [workData, setWorkData] = useState({
        title: '',
        description: '',
        workTypeId: '',
        locationId: '',
        shopGroupId: '',
        assignedTo: [],
    });
    const [workTypes, setWorkTypes] = useState([]);
    const [locations, setLocations] = useState([]);
    const [shopGroups, setShopGroups] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchWorkTypes = async () => {
            try {
                const typesResponse = await fetchWorkType();
                setWorkTypes(typesResponse || []);
            } catch (error) {
                console.error('Error fetching work types:', error);
            }
        };

        const fetchWorkLocations = async () => {
            try {
                const locationsResponse = await fetchLocations();
                setLocations(locationsResponse.payload || []);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        const fetchWorkShopGroups = async () => {
            try {
                const shopGroupsResponse = await fetchShopGroups();
                setShopGroups(shopGroupsResponse || []);
            } catch (error) {
                console.error('Error fetching shop groups:', error);
            }
        };

        const fetchWorkUsers = async () => {
            try {
                const usersResponse = await fetchUsers();
                setUsers(usersResponse.payload || []);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchWorkTypes();
        fetchWorkLocations();
        fetchWorkShopGroups();
        fetchWorkUsers();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(workData);
            await createWork(workData);
            alert("Work created successfully!");
            setShowWorkForm(false); // Close the form
            window.location.reload(); // Reload the page
        } catch (error) {
            console.error('Error creating shop group:', error);
            alert("Error creating shop group. Please try again.");
        }
    };

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value, type } = e.target;

        // Check if the input field is a select element with multiple options
        if (type === 'select-multiple') {
            // Get an array of selected option values
            const selectedValues = Array.from(e.target.selectedOptions).map(option => option.value);
            setWorkData({ ...workData, [name]: selectedValues });
        } else {
            // For other input types, simply update the value in the state
            setWorkData({ ...workData, [name]: value });
        }
    };


    return (
        <div className={`modal ${showWorkForm ? "show" : "hide"}`}>
            <div className="form-content">
                <span className="close" onClick={() => setShowWorkForm(false)}>
                    &times;
                </span>

                <h1 className="workform-title">New Problem Ticket</h1> {/* Title for the form */}
                <p className="form-subtitle">Please provide the details of the problem</p>
                <hr className="line" /><br></br>

                <form onSubmit={handleSubmit} className="work-form">

                    <div className="form-group">
                        <label htmlFor="workTypeId" className="form-label">Type<span className="required">*</span></label>
                        <select
                            id="workTypeId"
                            name="workTypeId"
                            value={workData.workTypeId}
                            onChange={handleInputChange}
                            className="form-select"
                            required
                        >
                            <option value="">Select Work Type</option>
                            {workTypes.map(type => (
                                <option key={type.id} value={type.id}>{type.title}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="title" className="form-label">Title<span className="required">*</span></label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={workData.title}
                            onChange={handleInputChange}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description" className="form-label">Description<span className="required">*</span></label>
                        <input
                            // type="text"
                            id="description"
                            name="description"
                            value={workData.description}
                            onChange={handleInputChange}
                            className="workform-textarea"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="locationId" className="form-label">Location<span className="required">*</span></label>
                        <select
                            id="locationId"
                            name="locationId"
                            value={workData.locationId}
                            onChange={handleInputChange}
                            className="form-select"
                            required
                        >
                            <option value="">Select Location</option>
                            {locations.map(location => (
                                <option key={location.id} value={location.id}>{location.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="shopGroupId" className="form-label">Shop Group<span className="required">*</span></label>
                        <select
                            id="shopGroupId"
                            name="shopGroupId"
                            value={workData.shopGroupId}
                            onChange={handleInputChange}
                            className="form-select"
                        >
                            <option value="">Select Shop Group</option>
                            {shopGroups.map(group => (
                                <option key={group.id} value={group.id}>{group.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* <div className="form-group">
                        <label htmlFor="assignedTo" className="form-label">Assign To</label>
                        <select
                            id="assignedTo"
                            name="assignedTo"
                            value={workData.assignedTo}
                            onChange={handleInputChange}
                            className="form-select"
                            multiple={true}
                        >
                            {users.map(user => (
                                <option key={user.uid} value={user.mail}>
                                    {`${user.commonName} ${user.surname}`}
                                </option>
                            ))}
                        </select>
                    </div> */}

                    <button type="submit" className="form-button">Create Work</button>
                </form>

            </div>
        </div>
    );
}

export default WorkForm;
