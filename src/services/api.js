// src/services/api.js

// Example responseJSON with mock user data and JWTs
const responseJSON = {
  "errorCode":0,"payload":{"Name1 Surname1":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InVzZXIxQHNsYWMuc3RhbmZvcmQuZWR1IiwiaWF0IjoxNzA0NDAyNzU3LCJleHAiOjE3MDQ0MDYzNTd9.aXN3-uxrSl3yh62NHhMQKOElr_Pt6gfi3jwIbUorCqU","Name3 Surname3":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InVzZXIzQHNsYWMuc3RhbmZvcmQuZWR1IiwiaWF0IjoxNzA0NDAyNzU3LCJleHAiOjE3MDQ0MDYzNTd9.CAH2B4oHLn7yG3y1hq-40Dgy2fR6ON4lxWrYcisc4kE","Name2 Surname2":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InVzZXIyQHNsYWMuc3RhbmZvcmQuZWR1IiwiaWF0IjoxNzA0NDAyNzU3LCJleHAiOjE3MDQ0MDYzNTd9.4VNxLtyhasZ_rrLxzjcZLfVxLccyjTulk4goXTshtpk"}};
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
export const searchInventory = async (anchorId, contextSize, limit, search = '', tags, requireAllTags) => {
  try {
    const token = extractJWT();

    const queryParams = new URLSearchParams({
      anchorId,
      contextSize,
      limit,
      search,
      tags: Array.isArray(tags) ? tags.join(',') : '',
      requireAllTags,
    });

    const url = `/v1/inventory/domain/6584ea2dca8f2363250a310a/element?${queryParams}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-vouch-idp-accesstoken': token,
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Received unexpected content type:', contentType);
      return null; // Return null or handle accordingly based on your logic for non-JSON content
    }

    const data = await response.json();
    if (data === null || data.payload === undefined) {
      console.error('Received unexpected response data:', data);
      return null; // Return null or handle empty response based on your requirements
    }

    return data;
  } catch (error) {
    console.error('Error fetching inventory:', error);
    throw error;
  }
};




export const createInventoryClass = async (classData) => {
  try {
    const token = extractJWT(); // Example: Extract JWT token

    const response = await fetch(`http://localhost:3000/api/v1/inventory/class`, {
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

export const fetchClass = async () => {
  try {
    const token = extractJWT();
    const response = await fetch(`http://localhost:3000/api/v1/inventory/class/6584ea2dca8f2363250a3108`, {
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

export const fetchClassTypes = async () => {
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

export const fetchAllClass = async () => {
  try {
    const token = extractJWT();
    const response = await fetch('http://localhost:3000/api/v1/inventory/class', {
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


{/* ----------------------------------------- INVENTORY ELEMENT CONTROLLER ----------------------------------------- */}

export const fetchAllDomain = async () => {
  try {
    const token = extractJWT();
    const response = await fetch('http://localhost:3000/api/v1/inventory/domain', {
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

export const fetchAllElements = async (domainId) => {
  try {
    const token = extractJWT(); // Assuming extractJWT() is a function that retrieves the JWT token
    const response = await fetch(`http://localhost:3000/api/v1/inventory/domain/${domainId}/element`, {
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
      throw new Error('Failed to fetch elements');
    }
  } catch (error) {
    throw new Error(`Error fetching elements: ${error.message}`);
  }
};


// export const fetchAllElements = async () => {
//   try {
//     const token = extractJWT();
//     const response = await fetch('http://localhost:3000/api/v1/inventory/domain/6577481d1f936c48a322725a/element', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'x-vouch-idp-accesstoken': token,
//       },
//     });

//     if (response.ok) {
//       const data = await response.json();
//       return data;
//     } else {
//       throw new Error('Failed to fetch class types');
//     }
//   } catch (error) {
//     throw new Error('Error fetching class types:', error.message);
//   }
// };

export const fetchDomain = async () => {
  try {
    const token = extractJWT();
    const response = await fetch('http://localhost:3000/api/v1/inventory/domain/6577481d1f936c48a322725a', {
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

export const createInventoryElement = async (elementData) => {
  try {
    const token = extractJWT();

    const response = await fetch('http://localhost:3000/api/v1/inventory/domain/6584ea2dca8f2363250a310a/element', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-vouch-idp-accesstoken': token,
      },
      body: JSON.stringify(elementData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API: Error creating Inventory Element:', errorData);

      let errorMessage = 'Unknown error';
      if (response.status === 400) {
        errorMessage = errorData.errorMessage || 'Bad Request';
      } else if (response.status === 401) {
        errorMessage = 'Unauthorized - Please check your credentials';
      } else if (response.status === 403) {
        errorMessage = 'Forbidden - Access denied';
      } else if (response.status === 404) {
        errorMessage = 'Not Found - Endpoint or resource not found';
      } else {
        errorMessage = `Server Error - ${response.status}`;
      }

      throw new Error(`API: Error creating Inventory Element: ${errorMessage}`);
    }

    const responseData = await response.json();
    // Handle responseData for further actions if needed

    return responseData;
  } catch (error) {
    console.error('API: Error creating Inventory Element:', error.message);
    alert('API: Network error. Please check your connection.');
    throw new Error(`API: Error creating Inventory Element: ${error.message}`);
  }
};

export const fetchElement = async (elementId) => {
  try {
    const token = extractJWT();
    const response = await fetch(`http://localhost:3000/api/v1/inventory/domain/6584ea2dca8f2363250a310a/element/${elementId}`, {
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


// Function to update an inventory element
export const updateElement = async (domainId, elementId, updatedElementData) => {
  try {
    const token = extractJWT(); // Assuming you have a function to extract the JWT token

    const response = await fetch(`http://localhost:3000/api/v1/inventory/domain/${domainId}/element/${elementId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-vouch-idp-accesstoken': token,
      },
      body: JSON.stringify(updatedElementData), // Pass updated data in the request body
    });

    if (!response.ok) {
      // Handle non-successful status codes
      const errorData = await response.json();
      throw new Error(`Failed to update element: ${errorData.errorMessage || 'Unknown error'}`);
    }

    // Successful request
    const responseData = await response.json();
    alert('Updated Element successfully!');
    console.log(response);
    return responseData;
  } catch (error) {
    throw new Error(`Error updating element: ${error.message}`);
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
        method: 'GET',
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
