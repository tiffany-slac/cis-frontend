import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAWork, fetchWorkType, fetchLocations, fetchShopGroups, fetchUsers, updateWork } from '../../../services/api';
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
    });
    const [workTypes, setWorkTypes] = useState([]);
    const [locations, setLocations] = useState([]);
    const [shopGroups, setShopGroups] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const workResponse = await fetchAWork(workId);
                const { title, description, workTypeId, locationId, shopGroupId, assignedTo } = workResponse.payload;
                setWorkData({ title, description, workTypeId, locationId, shopGroupId, assignedTo });

                const typesResponse = await fetchWorkType();
                setWorkTypes(typesResponse || []);

                const locationsResponse = await fetchLocations();
                setLocations(locationsResponse.payload || []);

                const shopGroupsResponse = await fetchShopGroups();
                setShopGroups(shopGroupsResponse || []);

                const usersResponse = await fetchUsers();
                setUsers(usersResponse.payload || []);

                console.log(workData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [workId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(workData);
            await updateWork(workId, workData);
            alert("Work updated successfully!");
            setshowEditWorkForm(false); // Close the form
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
                            <option value="">Select Work Type</option>
                            {workTypes.map(type => (
                                <option key={type.id} value={type.id}>{type.title}</option>
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
                            <option value="">Select Location</option>
                            {locations.map(location => (
                                <option key={location.id} value={location.id}>{location.name}</option>
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
                            <option value="">Select Shop Group</option>
                            {shopGroups.map(group => (
                                <option key={group.id} value={group.id}>{group.name}</option>
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

                    <button type="submit" className="form-button">Update Work</button>
                </form>

            </div>
        </div>
    );
}

export default EditWorkForm;
