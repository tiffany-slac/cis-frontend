// CustomSelectInput.js
import React from 'react';

function Select({ id, name, value, options, onChange }) {
    return (
        <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className="form-select"
        >
            {/* Render select options */}
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default Select;
