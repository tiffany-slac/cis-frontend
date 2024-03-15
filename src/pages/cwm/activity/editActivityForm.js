import React, { useState, useEffect } from 'react';
import { fetchActivityType, fetchActivitySubtype, fetchAActivity, updateActivity } from '../../../services/api';
import { useParams } from 'react-router-dom';
import './activityForm.css';

function EditActivityForm({ showEditActivityForm, setshowEditActivityForm }) {
    // State to manage form input values
    const { workId, activityId } = useParams();
    const [activityData, setactivityData] = useState({
        title: '',
        description: '',
        activityTypeId: '',
        activityTypeSubtype: '',
    });
    const [activityTypes, setActivityTypes] = useState([]);
    const [activitySubtypes, setActivitySubtypes] = useState([]);

    // prefills form with current data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const workResponse = await fetchAActivity(workId, activityId);
                const { title, description, activityType, activityTypeSubtype } = workResponse.payload;
                const activityTypeId = activityType ? activityType.title : ''; // Grab activityType title
                setactivityData({ title, description, activityTypeId, activityTypeSubtype });
                console.log(activityData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [workId, activityId]);

    // gets data to populate dropdown menus
    useEffect(() => {
        const fetchActivityData = async () => {
            try {
                const typeResponse = await fetchActivityType();
                setActivityTypes(typeResponse || []);
                console.log(typeResponse);

                const subtypeResponse = await fetchActivitySubtype();
                setActivitySubtypes(subtypeResponse || []);
                console.log(subtypeResponse);
            } catch (error) {
                console.error('Error fetching activity data:', error);
            }
        };

        fetchActivityData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateActivity(workId, activityId, activityData);
            alert("Activity updated successfully!");
            setshowEditActivityForm(false); // Close the form
            window.location.reload(); // Reload the page
        } catch (error) {
            console.error('Error creating activity:', error);
            alert("Error creating activity. Please try again.");
        }
    };

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setactivityData
            ({
                ...activityData
                , [name]: value
            });
    };

    return (
        <div className={`modal ${showEditActivityForm ? "show" : "hide"}`}>
            <div className="form-content">
                <span className="close" onClick={() => setshowEditActivityForm(false)}>
                    &times;
                </span>

                <h1 className="form-title">UPDATE ACTIVITY</h1>

                <form onSubmit={handleSubmit} className="work-form">
                    <div className="form-group">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={activityData.title}
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
                            value={activityData.description}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="activityTypeId" className="form-label">Activity Type</label>
                        <select
                            id="activityTypeId"
                            name="activityTypeId"
                            value={activityData.activityTypeId}
                            onChange={handleInputChange}
                            className="form-select"
                        >
                            <option value="">Select Activity Type</option>
                            {activityTypes.map(type => (
                                <option key={type.id} value={type.id}>
                                    {type.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="activityTypeSubtype" className="form-label">Activity Subtype</label>
                        <select
                            id="activityTypeSubtype"
                            name="activityTypeSubtype"
                            value={activityData.activityTypeSubtype}
                            onChange={handleInputChange}
                            className="form-select"
                        >
                            <option value="">Select Activity Subtype</option>
                            {activitySubtypes.map((subtype, index) => (
                                <option key={index} value={subtype}>{subtype}</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="form-button">Update Activity</button>
                </form>
            </div>
        </div>
    );
}

export default EditActivityForm;
