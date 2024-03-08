import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAWork } from "../../../services/api";
import ActivityForm from './../ActivityForm';
import Breadcrumb from '../../../components/Breadcrumb';


const ActivityDetails = () => {
    const { id } = useParams(); 
    const [inventoryDetails, setInventoryDetails] = useState(null); // State to hold the asset details
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Jobs');
    const [showActivityForm, setShowActivityForm] = useState(false); // State to control the visibility of the activity form

    const breadcrumbItems = [
        { label: 'Home', link: '/' },
        { label: 'Work', link: '/cwm' },
        { label: 'Work Details', link: '/work/:workId' },
        { label: 'Activity Details', link: '/work/:workId/:activityId' },
    ];

    const menuItems = ['Created', 'Opened', 'Approved', 'In Progress', 'Closed'];

    // Fetch element path data on component mount
    useEffect(() => {
        const fetchWorkDetails = async () => {
            try {
                const response = await fetchAWork('65e908f7708a4b739302ef55');
                setInventoryDetails(response.payload);
                console.log(response.payload);
            } catch (error) {
                console.error("Error fetching work details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchWorkDetails();
    }, [id]);

    return (
        <div className='work-content-container'>

            <div className="work-details-container">
                <Breadcrumb items={breadcrumbItems} style={{ marginLeft: '20px' }} />

                <div className='work-card'>
                    {/* Asset Details */}
                    {inventoryDetails ? (
                        <div>
                            <p>ACTIVITY</p>
                            <hr className="line" />
                            <p>Title: {inventoryDetails.title}</p>
                            <p>Assigned to: {inventoryDetails.assignedTo}</p>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                    <hr className="line" />
                    <p id="description">Description</p>
                    <textarea
                        className="description-textarea"
                        placeholder="Write a description..."
                        rows="4"
                        cols="50"
                    ></textarea>
                </div>
            </div>

            <div className="work-details-container2">
                {/* Attachments and Activity section */}
                <div className="attachments-activity-container">

                    <div className='work-card'>
                        <div className="attachments-section">
                            <p id="attachments">Solution</p>
                            <hr className="line" />
                            <p>Title:</p>
                            <p>Description: </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ActivityDetails;
