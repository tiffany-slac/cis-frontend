import React, { useState, useEffect } from 'react';
import { createWork } from '../../services/api';
import './WorkForm.css';

function WorkForm({ showWorkForm, setShowWorkForm }) {
    // State to manage form input values
    const [workData, setWorkData] = useState({
        title: '',
        description: '',
        workTypeId: '',
        locationId: '',
        assignedTo: [],
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
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
    const { name, value } = e.target;
    if (name === 'assignedTo') {
        // Split the input value by comma to get an array of assigned users
        const assignedToList = value.split(',');
        // Update the workData state with the new array of assigned users
        setWorkData({ ...workData, [name]: assignedToList });
    } else {
        // For other input fields, update the workData state normally
        setWorkData({ ...workData, [name]: value });
    }
};

    return (
        <div className={`modal ${showWorkForm ? "show" : "hide"}`}>
            <div className="form-content">
                <span className="close" onClick={() => setShowWorkForm(false)}>
                    &times;
                </span>

                <h1 className="form-title">NEW WORK FORM</h1> {/* Title for the form */}

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
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="workTypeId" className="form-label">Work Type ID</label>
                        <input
                            type="text"
                            id="workTypeId"
                            name="workTypeId"
                            value={workData.workTypeId}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="locationId" className="form-label">Location ID</label>
                        <input
                            type="text"
                            id="locationId"
                            name="locationId"
                            value={workData.locationId}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="assignedTo" className="form-label">Assigned To</label>
                        <input
                            type="text"
                            id="assignedTo"
                            name="assignedTo"
                            value={workData.assignedTo}
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

export default WorkForm;
