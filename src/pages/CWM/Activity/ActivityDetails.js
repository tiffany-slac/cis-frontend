import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link from react-router-dom
import { fetchAWork, fetchActivity, fetchAActivity } from "../../../services/api";
import EditActivityForm from './editActivityForm';
import Breadcrumb from '../../../components/Breadcrumb';
import './activityDetails.css';

const ActivityDetails = () => {
    const { workId, activityId } = useParams(); // Get the asset ID from the URL params
    const [loading, setLoading] = useState(true);
    const [showActivityForm, setShowActivityForm] = useState(false); // State to control the visibility of the activity form
    const [showEditActivityForm, setshowEditActivityForm] = useState(false);
    const [activities, setActivities] = useState([]);
    const [work, setWork] = useState(null);
    const [oneActivity, setOneActivity] = useState([]);

    const breadcrumbItems = [
        { label: 'Home', link: '/' },
        { label: 'Work', link: '/cwm/search' },
        { label: 'Work Details', link: `/work/${workId}` },
        { label: 'Activity Details', link: `/work/${workId}/${activityId}` },
    ];

    // Fetch element path data on component mount
    useEffect(() => {
        const fetchWorkDetails = async () => {
            try {
                const response = await fetchAWork(workId);
                setWork(response.payload);
                console.log("WORK", response.payload);
            } catch (error) {
                console.error("Error fetching work details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchWorkDetails();
    }, [workId]);

    useEffect(() => {
        const fetchOneActivity = async () => {
            try {
                const response = await fetchAActivity(workId, activityId);
                setOneActivity(response.payload);
                console.log(response.payload);
            } catch (error) {
                console.error("Error fetching activity:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOneActivity();
    }, [workId, activityId]);

    const toggleEditForm = () => {
        setshowEditActivityForm(prevState => !prevState);
    };


    return (
        <div className='activity-content-container'>

            <div className="activity-details-container">
                <Breadcrumb items={breadcrumbItems} style={{ marginLeft: '20px' }} />

                <div className="edit-button-container">
                    <button className="edit-button" onClick={toggleEditForm}>Edit</button>
                </div>

                {showEditActivityForm && <EditActivityForm showEditActivityForm={showEditActivityForm} setshowEditActivityForm={setshowEditActivityForm} />}

                {oneActivity && ( // Conditionally render EditActivityForm
                <EditActivityForm
                    showEditActivityForm={showEditActivityForm}
                    setshowEditActivityForm={setshowEditActivityForm}
                    workId={workId}
                    activityId={activityId}
                    activityData={oneActivity} // Pass the fetched activity data
                />
            )}

                <div className='work-card'>
                    {/* Asset Details */}
                    {work && (
                        <div>
                            <p>Activity Summary </p>
                            <hr className="line" />
                            <div>
                                <div className="container">
                                    <div className="column left-column">
                                        <p className="work-label">Status</p>
                                        <p className="work-label">Assigned To</p>
                                        <p className="work-label">Work Type</p>
                                        <p className="work-label">Scheduling Priority</p>
                                    </div>
                                    <div className="column right-column">
                                        <p>{work.title}</p>
                                        <p>{work.workType.title}</p>
                                        <p>{work.location.name}</p>
                                        <p>{work.shopGroup.name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className='work-card'>
                    {/* Asset Details */}
                    {work && (
                        <div>
                            <p>Work Release Conditions </p>
                            <hr className="line" />

                            <div className="container">
                                <div className="column left-column">
                                    <p className="work-label">Title</p>
                                    <p className="work-label">Description</p>
                                </div>
                                <div className="column right-column">
                                    <p>{work.title}</p>
                                    <p>{work.description}</p>
                                </div>
                            </div>
                            {/* <p>ID: {work.id}</p> */}
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
                                        <p>{work.title}</p>
                                        <p>{work.workType.title}</p>
                                        <p>{work.location.name}</p>
                                        <p>User1, User1 </p>
                                        <p>{work.shopGroup.name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <hr className="line" />
                </div>
            </div>
            

            {/* <div className="activity-details-container2">
                <div className="attachments-activity-container">

                    <div className='work-card'>
                        <div className="attachments-section">
                            {work && (
                                <div>
                                    <p>Project Details </p>
                                    <hr className="line" />
                                    <p>ID: {work.title}</p>
                                    <p>Title: {work.description}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='work-card'>
                        <div className="attachments-section">
                            <p id="attachments">Status: NEW</p>
                        </div>
                    </div>

                    <div className='work-card'>
                        <div className="attachments-section">
                            <p id="attachments">Attachments</p>
                            <div className="file-upload-container">
                                <input type="file" id="file-input" multiple />
                                <label htmlFor="file-input">Drag and drop files here or click to upload</label>
                                <div className="uploaded-files">
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div> */}

        </div>
    );
};

export default ActivityDetails;
