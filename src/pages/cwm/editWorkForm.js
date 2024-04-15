import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAWork, fetchWorkType, fetchLocations, fetchShopGroups, fetchUsers, updateWork } from '../../services/api';
import './workForm.css';

function EditWorkForm({ showEditWorkForm, setshowEditWorkForm }) {
    // State to manage form input values
    const { workId } = useParams();
    const [workData, setWorkData] = useState({
        title: '',
        description: '',
        workTypeId: '',
        locationId: '',
        shopGroupId: '',
        assignedTo: [],
        customFieldValues: {},
    });
    const [workTypes, setWorkTypes] = useState([]);
    const [locations, setLocations] = useState([]);
    const [shopGroups, setShopGroups] = useState([]);
    const [customFields, setCustomFields] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const workResponse = await fetchAWork(workId);
                const { title, description, location, shopGroup, workType, assignedTo } = workResponse.payload;

                // Extract custom fields from work type
                const customFieldsFromWorkType = workType.customFields || [];

                // Create an object to store all the custom field values
                const customFieldValues = {};
                customFieldsFromWorkType.forEach(field => {
                    // Initialize each custom field value to an empty string
                    customFieldValues[field.name] = '';
                });
                // Set the IDs in workData
                setWorkData({
                    title,
                    description,
                    workTypeId: workType.id, // Set workType ID
                    locationId: location.id, // Set location ID
                    shopGroupId: shopGroup.id, // Set shopGroup ID
                    assignedTo,
                    ...customFieldValues // Include custom fields in workData
                });

                const typesResponse = await fetchWorkType();
                setWorkTypes(typesResponse || []);

                const locationsResponse = await fetchLocations();
                setLocations(locationsResponse.payload || []);

                const shopGroupsResponse = await fetchShopGroups();
                setShopGroups(shopGroupsResponse || []);

                const usersResponse = await fetchUsers();
                setUsers(usersResponse.payload || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [workId]);

    useEffect(() => {
        const selectedType = workTypes.find(type => type.id === workData.workTypeId);
        if (selectedType) {
            setCustomFields(selectedType.customFields || []);
        }
    }, [workData.workTypeId, workTypes]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Construct customFieldValues array with correct format
            const customFieldValues = customFields.map(field => {
                let fieldType = field.valueType || 'String';
                let fieldValue = workData[field.name] || '';

                // Check if fieldValue is an empty string or not
                if (fieldValue === '') {
                    fieldValue = null; // Set fieldValue to null if it's empty
                }

                return {
                    id: field.id,
                    value: {
                        type: fieldType,
                        value: fieldValue
                    }
                };
            });

            // Create updatedWorkData object with only the necessary fields
            const updatedWorkData = {
                title: workData.title,
                description: workData.description,
                assignedTo: workData.assignedTo,
                locationId: workData.locationId,
                shopGroupId: workData.shopGroupId,
                customFieldValues: customFieldValues
            };

            console.log(updatedWorkData);
            await updateWork(workId, updatedWorkData);
            alert("Work updated successfully!");
            setshowEditWorkForm(false); // Close the form
            window.location.reload(); // Reload the page
        } catch (error) {
            console.error('Error updating work:', error);
            alert("Error updating work. Please try again.");
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
        <div className={`modal ${showEditWorkForm ? "show" : "hide"}`}>
            <div className="form-content">
                <span className="close" onClick={() => setshowEditWorkForm(false)}>
                    &times;
                </span>

                <h1 className="form-title">Edit Work</h1> {/* Title for the form */}

                <form onSubmit={handleSubmit} className="work-form">
                    <div className="form-group">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={workData.title}
                            onChange={handleInputChange}
                            className="form-input"

                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={workData.description}
                            onChange={handleInputChange}
                            className="form-textarea"

                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="workTypeId" className="form-label">Work Type</label>
                        <select
                            id="workTypeId"
                            name="workTypeId"
                            value={workData.workTypeId}
                            onChange={handleInputChange}
                            className="form-select"

                        >
                            {workTypes.map(type => (
                                <option
                                    key={type.id}
                                    value={type.id}
                                // selected={type.title === workData.workTypeTitle} // Set selected attribute based on condition
                                >
                                    {type.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="locationId" className="form-label">Location</label>
                        <select
                            id="locationId"
                            name="locationId"
                            value={workData.locationId}
                            onChange={handleInputChange}
                            className="form-select"

                        >
                            {locations.map(location => (
                                <option
                                    key={location.id}
                                    value={location.id}
                                    selected={location.id === workData.locationId} // Set selected attribute based on condition
                                >
                                    {location.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="shopGroupId" className="form-label">Shop Group</label>
                        <select
                            id="shopGroupId"
                            name="shopGroupId"
                            value={workData.shopGroupId}
                            onChange={handleInputChange}
                            className="form-select"
                        >
                            {shopGroups.map(group => (
                                <option
                                    key={group.id}
                                    value={group.id}
                                    selected={group.id === workData.shopGroupId} // Set selected attribute based on condition
                                >
                                    {group.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
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
                    </div>

                    {customFields.map(field => (
                        <div key={field.id} className="form-group">
                            <label htmlFor={field.id} className="form-label">{field.label}</label>
                            <input type="text" id={field.id} name={field.name} value={workData[field.name] || ''} onChange={handleInputChange} className="form-input" />
                        </div>
                    ))}

                    <button type="submit" className="form-button">Update Work</button>
                </form>

            </div>
        </div>
    );
}

export default EditWorkForm;
