import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { fetchAllClass, fetchUsers } from "../../services/api";
import "./admin.css";

function generalAdmin() {
    const history = useHistory();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log("fetching users...");
        const fetchTheUsers = async () => {
            const response = await fetchUsers();
            setUsers(response.payload);
        };
        fetchTheUsers(); // Call the function to fetch class types when the component mounts
    }, []);

    // Fetch data for testing purposes
    useEffect(() => {
        const fetchData = async () => {
            try {
                const allClass = await fetchAllClass();
                // console.log("ALL CLASSES: " + JSON.stringify(allClass));

            } catch (error) {
                console.error("Error fetching class types:", error.message);
            }
        };
        fetchData(); // Call the function to fetch class types when the component mounts
    }, []);

    // Handle row click to navigate to detail page
    const handleRowClick = (classId) => {
        history.push(`/admin/${classId}`); // Navigate to detail page with the class_id
    };

    return (
        <div className="general-admin">
            <h3 style={{ textAlign: 'center' }}>ADMINISTRATOR</h3>

            {/* Display classes in a table */}
            <div className="card-display">
                <h3>User Management</h3>
                <table className="class-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Roles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((classItem, index) => (
                            <tr
                                key={index}
                                onClick={() => handleRowClick(classItem.uid)}
                                className="class-item"
                            >
                                <td>{classItem.uid}</td>
                                <td>{classItem.commonName}</td>
                                <td>CIS admin</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default generalAdmin;
