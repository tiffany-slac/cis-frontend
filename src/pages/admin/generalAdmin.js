import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { fetchAllClass, fetchUsers } from "../../services/api";
import "./admin.css";

function generalAdmin() {
    const history = useHistory();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers().then(response => setUsers(response.payload));
        fetchAllClass().catch(error => console.error("Error fetching class types:", error.message));
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
