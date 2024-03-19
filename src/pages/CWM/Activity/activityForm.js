import React, { useState, useEffect } from 'react';
import { createActivity, fetchActivityType, fetchActivitySubtype } from '../../../services/api';
import { useParams } from 'react-router-dom';
import './activityForm.css';

function ActivityForm({ showActivityForm, setShowActivityForm }) {
    // State to manage form input values
    const { workId } = useParams();
    const [activityData, setactivityData] = useState({
        title: '',
        description: '',
        activityTypeId: '',
        activityTypeSubtype: '',
    });
    const [activityTypes, setActivityTypes] = useState([]);
    const [activitySubtypes, setActivitySubtypes] = useState([]);

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
            ({
                ...activityData
                , [name]: value
            });
    };

    // Define descriptions with their labels and corresponding keys
    const swDescriptions = [
        { key: 'testPlanDescription', label: 'Test Plan Description' },
        { key: 'backoutPlanDescription', label: 'Backout Plan Description' },
        { key: 'systemRequiredDescription', label: 'System Required Description' },
        { key: 'systemEffectedDescription', label: 'System Effected Description' },
        { key: 'riskBenefitDescription', label: 'Risk Benefit Description' },
        { key: 'dependenciesDescription', label: 'Dependencies Description' },
    ];

    // Render descriptions based on activityTypeId
    const renderSwDescriptions = () => {
        if (activityData.activityTypeId !== '65e9067f84ed927a7cbc0e66') return null;

        return swDescriptions.map(({ key, label }) => (
            <div key={key} className="form-group">
                <label htmlFor={key} className="form-label">
                    {label}<span className="required">*</span>
                </label>
                <textarea
                    id={key}
                    name={key}
                    value={activityData[key]}
                    onChange={handleInputChange}
                    className="form-textarea"
                    required
                />
            </div>
        ));
    };

    return (
        <div className={`modal ${showActivityForm ? "show" : "hide"}`}>
            <div className="activityform-content">
                <span className="close" onClick={() => setShowActivityForm(false)}>
                    &times;
                </span>

                <p className="activityform-title">Task</p>
                <hr className="line" /><br></br>

                <form onSubmit={handleSubmit} className="work-form">

                    <div className="form-group">
                        <label className="form-label">Activity Type<span className="required">*</span></label>
                        <div className="button-group">
                            {activityTypes.map(type => (
                                <button
                                    key={type.id}
                                    type="button" // Add type="button" to prevent form submission
                                    className={`activity-type-button ${activityData.activityTypeId === type.id ? 'selected' : ''}`}
                                    onClick={() => setactivityData({ ...activityData, activityTypeId: type.id })}
                                >
                                    {type.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="title" className="form-label">Title<span className="required">*</span></label>
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
                        <label htmlFor="description" className="form-label">Description<span className="required">*</span></label>
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

                    {renderSwDescriptions()}

                    <button type="submit" className="activityform-button">Create Task</button>
                </form>
            </div>
        </div>
    );
}

export default ActivityForm;
