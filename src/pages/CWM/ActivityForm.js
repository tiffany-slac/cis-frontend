import React, { useState } from 'react';
import { createActivity } from '../../services/api';
import { useParams } from 'react-router-dom';
import './ActivityForm.css';

function ActivityForm({ showActivityForm, setShowActivityForm }) {
    // State to manage form input values
    const { workId } = useParams(); 
    const [activityData, setactivityData] = useState({
        title: '',
        description: '',
        activityTypeId: '',
        activityTypeSubtype: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createActivity(workId, activityData);
            alert("Activity created successfully!");
            setShowActivityForm(false); // Close the form
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
({ ...activityData
    , [name]: value });
    };

    return (
        <div className={`modal ${showActivityForm ? "show" : "hide"}`}>
            <div className="form-content">
                <span className="close" onClick={() => setShowActivityForm(false)}>
                    &times;
                </span>

                <h1 className="form-title">NEW ACTIVITY FORM</h1>

                <form onSubmit={handleSubmit} className="work-form">
                    <div className="form-group">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={activityData
                        .title}
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
                            value={activityData
                        .description}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="activityTypeId" className="form-label">Activity Type ID</label>
                        <input
                            type="text"
                            id="activityTypeId"
                            name="activityTypeId"
                            value={activityData
                        .activityTypeId}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="activityTypeSubtype" className="form-label">Activity Type Subtype</label>
                        <input
                            type="text"
                            id="activityTypeSubtype"
                            name="activityTypeSubtype"
                            value={activityData
                        .activityTypeSubtype}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                    </div>

                    <button type="submit" className="form-button">Create Work</button>
                </form>
            </div>
        </div>
    );
}

export default ActivityForm;
