import React, { useState } from 'react';
import { createInventoryClass } from '../../services/api';

function ClassForm({ showClassForm, setShowClassForm, classTypes }) {
  const [className, setClassName] = useState('');
  const [classType, setClassType] = useState('');
  const [attributes, setAttributes] = useState([]);

  const addAttribute = () => {
    setAttributes([
      ...attributes,
      {
        name: '',
        description: '',
        mandatory: true,
        type: 'String',
        unit: '',
      },
    ]);
  };

  const handleAttributeChange = (index, key, value) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index][key] = value;
    setAttributes(updatedAttributes);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const classData = {
      name: className,
      type: classType,
      description: "description", // [newInventoryClassDTO] description: must not be empty
      attributes: attributes.map((attribute) => ({
        name: attribute.name,
        description: attribute.description,
        mandatory: attribute.mandatory,
        type: attribute.type,
        unit: attribute.unit,
      })),
    };

    console.log(classData);
    const response = await createInventoryClass(classData);

    // Close the form after submission
    setShowClassForm(false);
  };

  return (
    <div className='admin-container'>
      <div className={`modal ${showClassForm ? 'show' : 'hide'}`}>
        <div className="modal-content">
          <span className="close" onClick={() => setShowClassForm(false)}>&times;</span>
          <form className="class-form" onSubmit={handleSubmit}>
            <label htmlFor="className">Class Name:</label><br />
            <input
              type="text"
              id="className"
              name="className"
              value={className}
              onChange={(event) => setClassName(event.target.value)}
            /><br /><br />

            <label htmlFor="classType">Class Type:</label><br />
            <input
              type="text"
              id="classType"
              name="classType"
              value={classType}
              onChange={(event) => setClassType(event.target.value)}
            /><br /><br />

              <h3>Attributes:</h3>
              {attributes.map((attribute, index) => (
                <div key={index}>
                  <label htmlFor={`attrName${index}`}>Attribute Name:</label>
                  <input
                    type="text"
                    id={`attrName${index}`}
                    name={`attrName${index}`}
                    value={attribute.name}
                    onChange={(event) => handleAttributeChange(index, 'name', event.target.value)}
                  />
                  <br />

                  <label htmlFor={`attrDescription${index}`}>Attribute Description:</label>
                  <input
                    type="text"
                    id={`attrDescription${index}`}
                    name={`attrDescription${index}`}
                    value={attribute.description}
                    onChange={(event) => handleAttributeChange(index, 'description', event.target.value)}
                  />
                  <br />

                  <label htmlFor={`attrMandatory${index}`}>Mandatory:</label>
                  <input
                    type="checkbox"
                    id={`attrMandatory${index}`}
                    name={`attrMandatory${index}`}
                    checked={attribute.mandatory}
                    onChange={(event) => handleAttributeChange(index, 'mandatory', event.target.checked)}
                  />
                  <br />

                  <label htmlFor={`attrType${index}`}>Attribute Type:</label>
                  <input
                    type="text"
                    id={`attrType${index}`}
                    name={`attrType${index}`}
                    value={attribute.type}
                    onChange={(event) => handleAttributeChange(index, 'type', event.target.value)}
                  />
                  <br />

                  <label htmlFor={`attrUnit${index}`}>Attribute Unit:</label>
                  <input
                    type="text"
                    id={`attrUnit${index}`}
                    name={`attrUnit${index}`}
                    value={attribute.unit}
                    onChange={(event) => handleAttributeChange(index, 'unit', event.target.value)}
                  />
                  <br /><br />
                </div>
              ))}
              <button type="button" onClick={addAttribute}>
                Add Attribute
                </button>
                <br /><br />
                <input type="submit" value="Create Class" />
            </form>
            <h2>Class Types</h2>
            <ul>
                {classTypes.map((type, index) => (
                <li key={index}>{type}</li>
                ))}
              </ul>
          </div>
        </div>
    </div>
  );
}

export default ClassForm;
