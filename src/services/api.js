// src/services/api.js

// Example responseJSON with mock user data and JWTs
const responseJSON = {
  "errorCode":0,"payload":{"Name1 Surname1":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InVzZXIxQHNsYWMuc3RhbmZvcmQuZWR1IiwiaWF0IjoxNzAyMzQwMzMyLCJleHAiOjE3MDIzNDM5MzJ9.G0vPyVcIyTH9_XWbMU9Bm7Po9j7iqYx6czuQDAHuSsg","Name3 Surname3":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InVzZXIzQHNsYWMuc3RhbmZvcmQuZWR1IiwiaWF0IjoxNzAyMzQwMzMyLCJleHAiOjE3MDIzNDM5MzJ9.KdZyQ-qJTFUKIKf_NFpa3YkcJM_T442BOs5vr4PkMoo","Name2 Surname2":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InVzZXIyQHNsYWMuc3RhbmZvcmQuZWR1IiwiaWF0IjoxNzAyMzQwMzMyLCJleHAiOjE3MDIzNDM5MzJ9.U3H8XPinyvndw09mnqv3WwmIstZxjaQeJcIvAm1_BT4"}};
let token;

const extractJWT = () => {
  return responseJSON.payload["Name1 Surname1"];
};

(async () => {
	const res = await window.fetch("api/v1/mock/users-auth");
	const json = await res.json();

	token = json.payload["Name1 Surname1"];
})();

{/* ----------------------------------------- INVENTORY CLASS CONTROLLER ----------------------------------------- */}
export const createInventoryClass = async (classData) => {
  try {
    const token = extractJWT(); // Example: Extract JWT token

    const response = await fetch('http://localhost:3000/api/v1/inventory/class', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-vouch-idp-accesstoken': token, // Include the authorization token header
      },
      body: JSON.stringify(classData),
    });

    console.log('api.js data: ' + JSON.stringify(classData));

    if (response.status === 201) {
      const data = await response.json();
      console.log('API.js Class created successfully:', data);
      alert('Class created successfully!'); // Handle success: show a success message or perform any necessary action
      // You can also reset the form or close the modal here
    } else {
      const errorData = await response.json();
      console.error('Error creating class:', errorData);
      // Handle error: display an error message to the user
      alert('Error creating class. Please try again.');
    }
  } catch (error) {
    console.error('Error creating class:', error);
    // Handle network errors or other issues
    alert('Network error. Please check your connection.');
  }
};

const fetchTypes = async () => {
  try {
    const token = extractJWT();
    const response = await fetch('http://localhost:3000/api/v1/inventory/class/types', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-vouch-idp-accesstoken': token,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to fetch class types');
    }
  } catch (error) {
    throw new Error('Error fetching class types:', error.message);
  }
};

// Export a function that can be called to fetch class types
export const fetchClassTypes = async () => {
  try {
    const types = await fetchTypes();
    return types;
  } catch (error) {
    throw new Error('Error fetching class types:', error.message);
  }
};

{/* ----------------------------------------- INVENTORY ELEMENT CONTROLLER ----------------------------------------- */}
export const createInventoryElement = async (elementData) => {
  try {
    const token = extractJWT(); 
    console.log("Element Data: " + JSON.stringify(elementData));
    const response = await fetch('http://localhost:3000/api/v1/inventory/domain/657255739020e27c45093338/element', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-vouch-idp-accesstoken': token,
      },
      body: JSON.stringify(elementData),
    });
    if (response.status === 201) {
      alert('Inventory Element created successfully!');
      // Additional actions after successful creation
    } else {
      alert('Error creating Inventory Element. Please try again.');
    }
    return response;
  } catch (error) {
  console.error('Error creating Inventory Element:', error);
  alert('Network error. Please check your connection.');
}
};

export const updateInventoryElement = async (domainId, elementId, elementData) => {
  try {
    const token = extractJWT();
    const url = `http://localhost:3000/api/v1/inventory/domain/${domainId}/element/${elementId}`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-vouch-idp-accesstoken': token,
      },
      body: JSON.stringify(elementData),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized: Please check your credentials');
        // Handle unauthorized access, e.g., redirect to login page
      } else {
        throw new Error('Network response was not ok');
      }
    }

    const updatedElement = await response.json();
    return updatedElement;
  } catch (error) {
    console.error('Error updating inventory element:', error);
    throw error;
  }
};

export const updateInventoryDomain = async (domainId, requestBody) => {
  const url = `http://localhost:3000/api/v1/inventory/domain/657255739020e27c45093338`;

  try {
    const token = extractJWT(); 
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-vouch-idp-accesstoken': token,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized: Please check your credentials');
        // Handle unauthorized access, e.g., redirect to login page
      } else {
        throw new Error('Network response was not ok');
      }
    }

    const inventoryData = await response.json();
    return inventoryData;
  } catch (error) {
    // Handle errors or log them
    console.error('Error fetching inventory data:', error);
    throw error;
  }
};


// Function to simulate an API call to fetch inventory data
export const fetchInventoryData = async () => {
  try {
    // Simulating an API call with a JWT in headers (replace with actual API endpoint)
    const token = extractJWT(); 
    const response = await fetch('http://localhost:3000/api/v1/inventory/domain/657255739020e27c45093338', {
      headers: {
        'Content-Type': 'application/json',
        'x-vouch-idp-accesstoken': token,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized: Please check your credentials');
        // Handle unauthorized access, e.g., redirect to login page
      } else {
        throw new Error('Network response was not ok');
      }
    }

    const inventoryData = await response.json();
    return inventoryData;
  } catch (error) {
    console.error('Error fetching inventory data:', error);
    throw error;
  }
};

export default {
  extractJWT,
  fetchInventoryData,
};
