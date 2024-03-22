import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom'; // Import Link from react-router-dom
import { fetchAWork, fetchActivity, fetchAActivity } from "../../../services/api";
import ActivityForm from '../activity/activityForm';
import EditWorkForm from './editWorkForm';
import Breadcrumb from '../../../components/Breadcrumb';
import EditActivityForm from '../activity/editActivityForm';
import './workDetails.css';
import '../activity/activityForm.css';

const WorkDetails = () => {
    const { workId, activityId } = useParams(); // Get the asset ID from the URL params
    const [workDetails, setWorkDetails] = useState(null); // State to hold the asset details
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Jobs');
    const [showActivityForm, setShowActivityForm] = useState(false); // State to control the visibility of the activity form
    const [showEditForm, setShowEditForm] = useState(false);
    const [activities, setActivities] = useState([]);
    const [activeStep, setActiveStep] = useState(0); // Initialize activeStep state
    const [showJobDetails, setShowJobDetails] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef(null); // Ref for the sidebar panel
    const [showEditActivityForm, setShowEditActivityForm] = useState(false);
    const [oneActivity, setOneActivity] = useState([]);
    const history = useHistory();

    const breadcrumbItems = [
        { label: 'Home', link: '/' },
        { label: 'Work', link: '/cwm' },
        { label: 'Work Details', link: `/work/${workId}` },
    ];

    const menuItems = ['Created', 'Opened', 'Approved', 'In Progress', 'Closed'];
    const completedSteps = ['Created']; // Add completed steps here

    // Fetch element path data on component mount
    useEffect(() => {
        const fetchWorkDetails = async () => {
            try {
                const response = await fetchAWork(workId);
                setWorkDetails(response.payload);
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
            } catch (error) {
                console.error("Error fetching activities:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchActivities();
    }, [workId]);

    // useEffect(() => {
    //     const fetchOneActivity = async () => {
    //         try {
    //             const response = await fetchAActivity(workId, activityId);
    //             setOneActivity(response.payload);
    //         } catch (error) {
    //             console.error("Error fetching activity:", error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchOneActivity();
    // }, [workId, activityId]);

    const toggleEditActivityForm = () => {
        setshowEditActivityForm(prevState => !prevState);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                // Click occurred outside of the sidebar panel, close it
                setShowJobDetails(false);
            }
        };

        // Add event listener to listen for clicks on the document
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const scrollToContent = (item) => {
        const contentElement = document.getElementById(item.toLowerCase());
        if (contentElement) {
            contentElement.scrollIntoView({ behavior: 'smooth' });
        }
        setActiveTab(item);
    };

    const toggleEditForm = () => {
        setShowEditForm(prevState => !prevState);
    };

    const toggleEditSidebarForm = () => {
        setShowEditActivityForm(prevState => !prevState);
    };

    const handleActivityClick = (activity) => {
        setSelectedActivity(activity);
        setShowJobDetails(true);
        history.push(`/work/${workId}/${activity.id}`);
    };

    return (
        <div className='work-content-container'>
            {/* <div className="work-statusmenu">
                <ul className="vertical-progress-bar">
                    {menuItems.map((item, index) => (
                        <li
                            key={item}
                            className={`progress-item ${activeTab === item ? 'active' : ''} ${completedSteps.includes(item) ? 'completed' : ''}`}
                            onClick={() => scrollToContent(item)}
                        >
                            <span className="progress-circle"></span>
                            {item}
                        </li>
                    ))}
                </ul>
            </div> */}

            <div className={`work-details-container ${showJobDetails ? 'small-width' : ''}`}>
                <Breadcrumb items={breadcrumbItems} style={{ marginLeft: '20px' }} />

                <div className="edit-button-container">
                    <button className="edit-button" onClick={toggleEditForm}>Edit</button>
                </div>

                {showEditForm && <EditWorkForm showEditWorkForm={showEditForm} setshowEditWorkForm={setShowEditForm} />}

                <div className='work-card'>
                    {/* Asset Details */}
                    {workDetails ? (
                        <div>
                            <p>CATER ID: {workDetails.title} (TEC) </p>
                            <hr className="line" />

                            <div className="container">
                                <div className="column left-column">
                                    <p className="work-label">Title</p>
                                    <p className="work-label">Description</p>
                                </div>
                                <div className="column right-column">
                                    <p>{workDetails.title}</p>
                                    <p>{workDetails.description}</p>
                                </div>
                            </div>
                            {/* <p>ID: {workDetails.id}</p> */}
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
                                        <p>{workDetails.title}</p>
                                        <p>{workDetails.workType.title}</p>
                                        <p>{workDetails.location.name}</p>
                                        <p>User1, User1 </p>
                                        <p>{workDetails.shopGroup.name}</p>
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
                                <th>Type</th>
                                <th>Subtype</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activities.map(activity => (
                                <tr key={activity.id} onClick={() => handleActivityClick(activity)}>
                                    <td>{activity.title}</td>
                                    <td>{activity.description}</td>
                                    <td>{activity.activityType.title}</td>
                                    <td>{activity.activityTypeSubtype}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table><br />

                    {showJobDetails && (
                        <div ref={sidebarRef} className={`sidebar-panel ${showJobDetails ? 'open' : ''}`}>
                            {/* Display job details here */}
                            <h1>Job Details</h1>
                            {selectedActivity && (
                                <>
                                    <div className='activity-card'>
                                        <div className="edit-button-container">
                                            <button className="edit-button" onClick={toggleEditSidebarForm}>Edit</button>
                                        </div>

                                        {showEditActivityForm && <EditActivityForm showEditActivityForm={showEditActivityForm} setShowEditActivityForm={setShowEditActivityForm} />}

                                        {oneActivity && ( // Conditionally render EditActivityForm
                                            <EditActivityForm
                                                showEditActivityForm={showEditActivityForm}
                                                setShowEditActivityForm={setShowEditActivityForm}
                                                workId={workId}
                                                activityId={activityId}
                                                activityData={oneActivity} // Pass the fetched activity data
                                            />
                                        )}
                                        {/* Asset Details */}
                                        {workDetails && (
                                            <div>
                                                <p>Activity Summary </p>
                                                <hr className="line" />
                                                <div>
                                                    <div className="container">
                                                        <div className="column left-column">
                                                            <p className="work-label">Status</p>
                                                            <p className="work-label">Title</p>
                                                            <p className="work-label">Description</p>                                                        </div>
                                                        <div className="column right-column">
                                                            <p>{selectedActivity.currentStatus.status}</p>
                                                            <p>{selectedActivity.title}</p>
                                                            <p>{selectedActivity.description}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className='activity-card'>
                                        {/* Asset Details */}
                                        {selectedActivity && (
                                            <div>
                                                <p>Work Release Conditions </p>
                                                <hr className="line" />

                                                <div className="container">
                                                    <div className="column left-column">
                                                        <p className="work-label">Title</p>
                                                        <p className="work-label">Description</p>
                                                    </div>
                                                    <div className="column right-column">
                                                        <p>{selectedActivity.title}</p>
                                                        <p>{selectedActivity.description}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <hr className="line" />
                                                    <div className="container">
                                                        <div className="column left-column">
                                                            <p className="work-label">Test Plan</p>
                                                            <p className="work-label">Backout Plan</p>
                                                            <p className="work-label">System Required</p>
                                                            <p className="work-label">Risk Benefit</p>
                                                            <p className="work-label">Dependencies</p>
                                                        </div>
                                                        <div className="column right-column">
                                                            <p>{selectedActivity.testPlanDescription}</p>
                                                            <p>{selectedActivity.backoutPlanDescription}</p>
                                                            <p>{selectedActivity.systemRequiredDescription}</p>
                                                            <p>{selectedActivity.riskBenefitDescription}</p>
                                                            <p>{selectedActivity.dependenciesDescription}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <hr className="line" />
                                    </div>

                                </>
                            )}
                        </div>
                    )}


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
                            {selectedActivity && (
                                <p id="attachments">Status: {selectedActivity.currentStatus.status}</p>
                            )}
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
