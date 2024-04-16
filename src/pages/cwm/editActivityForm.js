import React, { useState, useEffect } from 'react';
import { fetchActivityType, fetchActivitySubtype, fetchAActivity, updateActivity, fetchLovValuesForField } from '../../services/api';
import { useParams } from 'react-router-dom';
import './activityForm.css';

function EditActivityForm({ showEditActivityForm, setShowEditActivityForm }) {
    const { workId, activityId } = useParams();
    const [activityData, setActivityData] = useState({
        title: '',
        description: '',
        activityTypeId: '',
        activityTypeSubtype: '',
    });
    const [activityTypes, setActivityTypes] = useState([]);
    const [activityType, setActivityType] = useState(null);
    const [activitySubtypes, setActivitySubtypes] = useState([]);
    const [customFields, setCustomFields] = useState([]);
    const [renderedComponents, setRenderedComponents] = useState({});

    // prefills form with current data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const workResponse = await fetchAActivity(workId, activityId);
                const { title, description, activityType, activityTypeSubtype, customFields } = workResponse.payload;
                const activityTypeId = activityType ? activityType.id : ''; // Grab activityType title
                setActivityData({ title, description, activityTypeId, activityTypeSubtype });

                const customFieldsData = {};
                customFields.forEach(field => {
                    customFieldsData[field.name] = field.value.value;
                });
                setActivityData(prevActivityData => ({ ...prevActivityData, ...customFieldsData }));
                setActivityType(activityType);

                // Check if activityType and customFields exist, and if so, extract isLov values
                const isLovValues = activityType?.customFields.map(field => field.isLov) || [];
                console.log("isLov values:", isLovValues);

                setCustomFields(customFields);
                const typeResponse = await fetchActivityType();
                setActivityTypes(typeResponse || []);

                const subtypeResponse = await fetchActivitySubtype();
                setActivitySubtypes(subtypeResponse || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [workId, activityId]);

    const getLovValues = async (fieldName) => {
        try {
            const lovValuesResponse = await fetchLovValuesForField("Activity", activityData.activityTypeId, fieldName);
            if (lovValuesResponse.errorCode === 0) {
                console.log(lovValuesResponse.payload);
                return lovValuesResponse.payload.map(value => ({ id: value.id, value: value.value }));
            } else {
                console.error('Error fetching LOV values for field:', fieldName, lovValuesResponse.errorMessage);
                return [];
            }
        } catch (error) {
            console.error('Error fetching LOV values for field:', fieldName, error);
            return [];
        }
    };

    // Function to fetch LOV values for the current field
    const fetchLovValuesAndRender = async (fieldName, isLov, isBoolean) => {
        try {
            if (isLov) {
                const lovValues = await getLovValues(fieldName);
                // Render the component based on LOV values
                return lovValues.length > 0 ? (
                    <select
                        id={fieldName}
                        name={fieldName}
                        value={activityData[fieldName] || ''}
                        onChange={(e) => handleCustomFieldChange(fieldName, e.target.value)}
                        className="form-select"
                    >

                        {/* Render select options based on LOV values */}
                        {lovValues.map((lovItem, index) => (
                            <option key={index} value={lovItem.id}>
                                {lovItem.value}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        type="text"
                        id={fieldName}
                        name={fieldName}
                        value={activityData[fieldName] || ''}
                        onChange={(e) => handleCustomFieldChange(fieldName, e.target.value)} // Pass fieldName to the handler
                        className="form-input"
                    />
                );
            } else if (isBoolean) {
                // Render a select input for boolean fields
                return (
                    <select
                        id={fieldName}
                        name={fieldName}
                        value={activityData[fieldName] || ''}
                        onChange={(e) => handleCustomFieldChange(fieldName, e.target.value)} // Pass fieldName to the handler
                        className="form-select"
                    >
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                );
            } else {
                // If isLov is false and it's not a boolean field, render a simple text input
                return (
                    <input
                        type="text"
                        id={fieldName}
                        name={fieldName}
                        value={activityData[fieldName] || ''}
                        onChange={handleInputChange} // Use handleInputChange for non-LOV fields
                        className="form-input"
                    />
                );
            }
        } catch (error) {
            console.error('Error fetching LOV values for field:', fieldName, error);
            // Handle the error if necessary
            return null;
        }
    };

    // Asynchronously render components for custom fields
    const renderCustomFields = async () => {
        const components = {};
        const isLovValues = activityType?.customFields.map(field => field.isLov) || [];
        const valueTypes = activityType?.customFields.map(field => field.valueType) || [];

        for (let i = 0; i < customFields.length; i++) {
            const field = customFields[i];
            const isLov = isLovValues[i] || false; // Default to false if isLov is not defined
            const isBoolean = valueTypes[i] === 'Boolean'; // Check if the valueType is boolean
            const component = await fetchLovValuesAndRender(field.name, isLov, isBoolean);
            components[field.name] = component;
        }
        setRenderedComponents(components);
    };

    useEffect(() => {
        renderCustomFields();
    }, [customFields]); // Run the effect whenever customFields change

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const updatedActivityData = {
                title: activityData.title,
                description: activityData.description,
                activityType: {
                    id: activityData.activityTypeId, // Assuming you have activityType data elsewhere
                },
                activityTypeSubtype: activityData.activityTypeSubtype,
                assignedTo: activityData.assignedTo,
                locationId: activityData.locationId,
                shopGroupId: activityData.shopGroupId,
                customAttributeValues: customFields.map(field => ({
                    id: field.id,
                    value: {
                        type: 'String',
                        value: activityData[field.name] || ''
                    }
                }))
            };

            await updateActivity(workId, activityId, updatedActivityData);
            console.log(updatedActivityData);
            alert("Activity updated successfully!");
            setShowEditActivityForm(false); // Close the form
            window.location.reload(); // Reload the page
        } catch (error) {
            console.error('Error updating activity:', error);
            alert("Error updating activity. Please try again.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Update the value in the state
        setActivityData((prevActivityData) => ({
            ...prevActivityData,
            [name]: value,
        }));
    };
    
    const handleCustomFieldChange = (fieldName, selectedValue) => {
        setActivityData((prevActivityData) => ({
            ...prevActivityData,
            [fieldName]: selectedValue,
        }));
    };

    // Utility function to convert camelCase to normal casing
    const camelToNormalCase = (camelCase) => {
        const words = camelCase.split(/(?=[A-Z])/); // Split camelCase string into words
        return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <div className={`modal ${showEditActivityForm ? "show" : "hide"}`}>
            <div className="form-content">
                <span className="close" onClick={() => setShowEditActivityForm(false)}>
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
                            {/* Render the default option */}
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

                    {/* Mapping over customFields to render fields */}
                    {customFields.map((field) => (
                        <div key={field.id} className="form-group">
                            <label htmlFor={field.name} className="form-label">{camelToNormalCase(field.name)}</label>
                            {/* Render the component stored in renderedComponents */}
                            {renderedComponents[field.name]}
                        </div>
                    ))}

                    <button type="submit" className="form-button">Update Activity</button>
                </form>
            </div>
        </div>
    );
}

export default EditActivityForm;
