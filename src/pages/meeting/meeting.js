import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools } from '@fortawesome/free-solid-svg-icons';

const Meeting = () => {
    const iconStyle = { color: '#444' };

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <FontAwesomeIcon icon={faTools} size="4x" style={iconStyle} />
            <h2 style={{ marginTop: '50px', color: '#444' }}>This page is under construction</h2>
            <p style={{ color: '#444' }}>We're sorry for the inconvenience. Please check back later.</p>
        </div>
    );
};

export default Meeting;
