import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link from react-router-dom
import { fetchAWork, fetchActivity } from "../../services/api";
import ActivityForm from './ActivityForm';
import Breadcrumb from '../../components/Breadcrumb';

import './WorkDetails.css';

const WorkDetails = () => {
    const { workId } = useParams(); // Get the asset ID from the URL params
    const [inventoryDetails, setInventoryDetails] = useState(null); // State to hold the asset details
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Jobs');
    const [showActivityForm, setShowActivityForm] = useState(false); // State to control the visibility of the activity form
    const [activities, setActivities] = useState([]);

    const breadcrumbItems = [
        { label: 'Home', link: '/' },
        { label: 'Work', link: '/cwm' },
        { label: 'Work Details', link: '/work/65e908f7708a4b739302ef55' },
    ];

    const menuItems = ['Created', 'Opened', 'Approved', 'In Progress', 'Closed'];

    // Fetch element path data on component mount
    useEffect(() => {
        const fetchWorkDetails = async () => {
            try {
                const response = await fetchAWork(workId);
                setInventoryDetails(response.payload);
                console.log(response.payload);
            } catch (error) {
                console.error("Error fetching work details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchWorkDetails();
    }, [workId]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetchActivity(workId);
                setActivities(response.payload);
                console.log(response.payload);
            } catch (error) {
                console.error("Error fetching activities:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchActivities();
    }, [workId]);

    const scrollToContent = (item) => {
        const contentElement = document.getElementById(item.toLowerCase());
        if (contentElement) {
            contentElement.scrollIntoView({ behavior: 'smooth' });
        }
        setActiveTab(item);
    };

    return (
        <div className='work-content-container'>
            <div className="statusmenu">
                <ul>
                    {menuItems.map(item => (
                        <li key={item}>
                            <button
                                className={activeTab === item ? 'active' : ''}
                                onClick={() => scrollToContent(item)}
                            >
                                {item}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="work-details-container">
                <Breadcrumb items={breadcrumbItems} style={{ marginLeft: '20px' }} />

                <div className='work-card'>
                    {/* Asset Details */}
                    {inventoryDetails ? (
                        <div>
                            <p>CATER ID: {inventoryDetails.title} (TEC) </p>
                            <hr className="line" />

                            <div className="container">
                                <div className="column left-column">
                                    <p className="work-label">Title</p>
                                    <p className="work-label">Description</p>
                                </div>
                                <div className="column right-column">
                                    <p>{inventoryDetails.title}</p>
                                    <p>{inventoryDetails.description}</p>
                                </div>
                            </div>
                            {/* <p>ID: {inventoryDetails.id}</p> */}
                            <div>
                                <hr className="line" />
                                <div className="container">
                                    <div className="column left-column">
                                        <p className="work-label">Type</p>
                                        <p className="work-label">Subtype</p>
                                        <p className="work-label">Area</p>
                                        <p className="work-label">Area Manager</p>
                                        <p className="work-label">Shop</p>
                                    </div>
                                    <div className="column right-column">
                                        <p>{inventoryDetails.title}</p>
                                        <p>{inventoryDetails.workType.title}</p>
                                        <p>{inventoryDetails.location.name}</p>
                                        <p>User1, User1 </p>
                                        <p>{inventoryDetails.shopGroup.name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                    <hr className="line" />
                    {/* Table to display activities */}
                    <table className="activity-table">
                        <thead>
                            <tr>
                                <th>Job</th>
                                <th>Description</th>
                                <th>Subtype</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activities.map(activity => (
                                <tr key={activity._id}>
                                    <td>
                                        <Link to={`/work/65e908f7708a4b739302ef55/${activity.id}`}>
                                            {activity.title}
                                        </Link>
                                    </td>
                                    <td>{activity.description}</td>
                                    <td>{activity.activityTypeSubtype}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table><br />

                    <div className="new-class-button">
                        <button className="dropbtn" onClick={() => setShowActivityForm(!showActivityForm)}>
                            {showActivityForm ? "Close Activity Form" : "+ Activity"}
                        </button>
                        {showActivityForm && (
                            <ActivityForm
                                showActivityForm={showActivityForm}
                                setShowActivityForm={setShowActivityForm}
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className="work-details-container2">
                {/* Attachments and Activity section */}
                <div className="attachments-activity-container">


                    <div className='work-card'>
                        <div className="attachments-section">
                            <p id="attachments">Status: NEW</p>
                        </div>
                    </div>

                    <div className='work-card'>
                        <div className="attachments-section">
                            <p id="attachments">Solution</p>
                            <hr className="line" />
                            <p>Title:</p>
                            <p>Description: </p>
                        </div>
                    </div>

                    <div className='work-card'>
                        <div className="attachments-section">
                            <p id="attachments">Attachments</p>
                            <div className="file-upload-container">
                                <input type="file" id="file-input" multiple />
                                <label htmlFor="file-input">Drag and drop files here or click to upload</label>
                                <div className="uploaded-files">
                                    {/* Display uploaded files here */}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default WorkDetails;
