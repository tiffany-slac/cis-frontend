// src/services/api.js

// Set Auth TokenresponseJSON with mock user data and JWTs
const extractJWT = async () => {
  const responseJSON = await window.fetch("http://localhost:3000/api/v1/mock/users-auth");
  const json = await responseJSON.json();
  const token = json.payload["Name1 Surname1"];
  return token;
};

export const setDomainId = async () => {
  try {
    const domainData = await fetchAllDomain();
    const domain_id = domainData.payload[0].id;
    return domain_id;
  } catch (error) {
    console.error('Error setting domain_id:', error.message);
    throw new Error('Unable to determine domain_id');
  }
};

/* ----------------------------------------- ADVANCED ----------------------------------------- */

export const fetchElementNicknames = async () => {
  try {
    const data = await fetchAllElements(); // Ensure this function fetches elements
    const filteredNames = data.payload
      .filter(element => element.classDTO.id === '65a022f8a11a67235b702edc')
      .map(element => element.name);
    return filteredNames;
  } catch (error) {
    throw new Error('Error fetching element nicknames:', error.message);
  }
};


export const searchInventory = async (anchorId, options) => {
  try {
    const token = await extractJWT();
    const domain_id = await setDomainId();
    const queryParams = new URLSearchParams(options).toString();

    const response = await fetch(`http://localhost:3000/api/v1/inventory/domain/${domain_id}/element?${queryParams}`, 
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-vouch-idp-accesstoken': token,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status}: ${errorData.message}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error; // Re-throw the error for additional handling if needed
  }
};


export const fetchElementChildren = async () => {
  try {
    const token = await extractJWT();
    const domain_id = await setDomainId();
    // const token = await retrieveToken();
    const response = await fetch(
      `http://localhost:3000/api/v1/inventory/domain/${domain_id}/element/659833aa40949c037977ec08/children`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-vouch-idp-accesstoken": token,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch element children");
    }
  } catch (error) {
    throw new Error("Error fetching element children:", error.message);
  }
};


export const fetchPath = async ( elementId, pathType) => {
  try {
    const token = await extractJWT();
    const domain_id = await setDomainId();

    const queryParams = new URLSearchParams({
      pathType: pathType 
    });

    const response = await fetch(
      `http://localhost:3000/api/v1/inventory/domain/${domain_id}/element/${elementId}/path?${queryParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-vouch-idp-accesstoken": token,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API: Error fetching path:", errorData);

      let errorMessage = "Unknown error";
      if (response.status === 400) {
        errorMessage = errorData.errorMessage || "Bad Request";
      } else if (response.status === 401) {
        errorMessage = "Unauthorized - Please check your credentials";
      } else if (response.status === 403) {
        errorMessage = "Forbidden - Access denied";
      } else if (response.status === 404) {
        errorMessage = "Not Found - Endpoint or resource not found";
      } else {
        errorMessage = `Server Error - ${response.status}`;
      }

      throw new Error(`API: Error fetching path: ${errorMessage}`);
    }

    const responseData = await response.json();
    // Handle responseData for further actions if needed

    return responseData;
  } catch (error) {
    console.error("API: Error fetching path:", error.message);
    alert("API: Network error. Please check your connection.");
    throw new Error(`API: Error fetching path: ${error.message}`);
  }
};


export const createImplementation = async ( elementId, implementationData) => {
  try {
    const token = await extractJWT(); // Retrieve your token here
    const domain_id = await setDomainId();

    const response = await fetch(
      `http://localhost:3000/api/v1/inventory/domain/${domain_id}/element/${elementId}/implementation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-vouch-idp-accesstoken": token,
        },
        body: JSON.stringify(implementationData),
      }
    );
    console.log(JSON.stringify(implementationData));

    if (response.status === 201) {
      const data = await response.json();
      console.log("API.js Class created successfully:", data);
      alert("Class created successfully!"); 

    // if (response.ok) {
    //   const data = await response.json();
    //   return data;
    } else {
      const errorData = await response.json(); // Retrieve error details
      const errorMessage = errorData.message || 'Failed to create element implementation';
      const error = new Error(errorMessage);
      error.response = errorData; // Attach the response details to the error object
      throw error;
    }
  } catch (error) {
    // Log the error details for better visibility
    console.error('Error creating element implementation:', error.message);
    if (error.response) {
      console.error('Response details:', error.response);
    }
    throw error; // Rethrow the error for further handling if needed
  }
};


export const fetchImplementation = async (elementId) => {
  try {
    const token = await extractJWT();
    const domain_id = await setDomainId();

    const response = await fetch(
      `http://localhost:3000/api/v1/inventory/domain/${domain_id}/element/${elementId}/implementation`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-vouch-idp-accesstoken": token,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json(); 
      throw new Error(
        `Failed to fetch element implementation: ${errorData.message}`
      );
    }
  } catch (error) {
    throw new Error(`Error fetching element implementation: ${error.message}`);
  }
};


export const fetchInventoryData = async () => {
  try {
    // Simulating an API call with a JWT in headers (replace with actual API endpoint)
    const token = await extractJWT();
    const domain_id = await setDomainId();
    // const token = await retrieveToken();
    const response = await fetch(
      `http://localhost:3000/api/v1/inventory/domain/${domain_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-vouch-idp-accesstoken": token,
        },
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized: Please check your credentials");
        // Handle unauthorized access, e.g., redirect to login page
      } else {
        throw new Error("Network response was not ok");
      }
    }

    const inventoryData = await response.json();
    return inventoryData;
  } catch (error) {
    console.error("Error fetching inventory data:", error);
    throw error;
  }
};


/* ----------------------------------------- CREATION ----------------------------------------- */

export const createInventoryClass = async (classData) => {
  try {
    const token = await extractJWT();

    const response = await fetch(
      `http://localhost:3000/api/v1/inventory/class`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-vouch-idp-accesstoken": token, // Include the authorization token header
        },
        body: JSON.stringify(classData),
      }
    );

    console.log("api.js data: " + JSON.stringify(classData));

    if (response.status === 201) {
      const data = await response.json();
      console.log("API.js Class created successfully:", data);
      alert("Class created successfully!"); // Handle success: show a success message or perform any necessary action
      // You can also reset the form or close the modal here
    } else {
      const errorData = await response.json();
      console.error("Error creating class:", errorData);
      alert("Error creating class. Please try again.");
    }
  } catch (error) {
    console.error("Error creating class:", error);
    alert("Network error. Please check your connection.");
  }
};

export const createInventoryElement = async (elementData) => {
  try {
    const token = await extractJWT();
    const domain_id = await setDomainId();

    const response = await fetch(
      `http://localhost:3000/api/v1/inventory/domain/${domain_id}/element`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-vouch-idp-accesstoken": token,
        },
        body: JSON.stringify(elementData),
      }
    );

    if (response.status === 201) {
      const data = await response.json();
      console.log("API.js Element created successfully:", data);
      alert("Element created successfully!"); // Handle success: show a success message or perform any necessary action
      // You can also reset the form or close the modal here
    } else {
      const errorData = await response.json();
      console.error("Error creating element:", errorData);
      alert("Error creating element. Please try again.");
    }
  } catch (error) {
    console.error("Error creating element:", error);
    alert("Network error. Please check your connection.");
  }
};

/* ----------------------------------------- UPDATE ----------------------------------------- */

// Function to update an inventory element
export const updateElement = async (
  domainId,
  elementId,
  updatedElementData
) => {
  try {
    const token = await extractJWT();
    // const token = await retrieveToken();
    const response = await fetch(
      `http://localhost:3000/api/v1/inventory/domain/${domainId}/element/${elementId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-vouch-idp-accesstoken": token,
        },
        body: JSON.stringify(updatedElementData), // Pass updated data in the request body
      }
    );

    if (!response.ok) {
      // Handle non-successful status codes
      const errorData = await response.json();
      throw new Error(
        `Failed to update element: ${errorData.errorMessage || "Unknown error"}`
      );
    }

    // Successful request
    const responseData = await response.json();
    alert("Updated Element successfully!");
    console.log(response);
    return responseData;
  } catch (error) {
    throw new Error(`Error updating element: ${error.message}`);
  }
};

export const updateInventoryDomain = async (domainId, requestBody) => {
  const domain_id = await setDomainId();
  const url = `http://localhost:3000/api/v1/inventory/domain/${domain_id}`;

  try {
    const token = await extractJWT();
    // const token = await retrieveToken();
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-vouch-idp-accesstoken": token,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized: Please check your credentials");
        // Handle unauthorized access, e.g., redirect to login page
      } else {
        throw new Error("Network response was not ok");
      }
    }

    const inventoryData = await response.json();
    return inventoryData;
  } catch (error) {
    // Handle errors or log them
    console.error("Error fetching inventory data:", error);
    throw error;
  }
};

/* ----------------------------------------- SINGLES ----------------------------------------- */

export const fetchDomain = async () => {
  try {
    const token = await extractJWT();
    const domain_id = await setDomainId();
    // const token = await retrieveToken();
    const response = await fetch(
      `http://localhost:3000/api/v1/inventory/domain/${domain_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-vouch-idp-accesstoken": token,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch class types");
    }
  } catch (error) {
    throw new Error("Error fetching class types:", error.message);
  }
};

export const fetchClass = async (classId) => {
  try {
    const token = await extractJWT();
    const domain_id = await setDomainId();
    // const token = await retrieveToken();
    const response = await fetch(
      `http://localhost:3000/api/v1/inventory/class/${classId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-vouch-idp-accesstoken": token,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch class types");
    }
  } catch (error) {
    throw new Error("Error fetching class types:", error.message);
  }
};

export const fetchElement = async (elementId) => {
  try {
    const token = await extractJWT();
    const domain_id = await setDomainId();
    // const token = await retrieveToken();
    const response = await fetch(
      `http://localhost:3000/api/v1/inventory/domain/${domain_id}/element/${elementId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-vouch-idp-accesstoken": token,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch class types");
    }
  } catch (error) {
    throw new Error("Error fetching class types:", error.message);
  }
};

/* ----------------------------------------- STARTERS ----------------------------------------- */


export const fetchAllDomain = async () => {
  try {
    // const token = await retrieveToken();
    const token = await extractJWT();
    const response = await fetch(
      "http://localhost:3000/api/v1/inventory/domain",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-vouch-idp-accesstoken": token,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch class types");
    }
  } catch (error) {
    throw new Error("Error fetching class types:", error.message);
  }
};

export const fetchAllClass = async () => {
  try {
    const token = await extractJWT();
    // const token = await retrieveToken();
    const response = await fetch(
      "http://localhost:3000/api/v1/inventory/class",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-vouch-idp-accesstoken": token,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch class types");
    }
  } catch (error) {
    throw new Error("Error fetching class types:", error.message);
  }
};

export const searchElements = async (searchQuery = "") => {
  try {
    const token = await extractJWT();
    const domain_id = await setDomainId();
    const searchParam = searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : "";

    const url = `http://localhost:3000/api/v1/inventory/domain/${domain_id}/element?${searchParam}`;

    const response = await fetch(url, {
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
      // Log details before throwing the error
      console.error(`Failed to fetch inventory elements. URL: ${url}, Status: ${response.status}, StatusText: ${response.statusText}`);

      // Include detailed error message
      const errorData = await response.json().catch(() => null); // Try to parse JSON error response
      const errorMessage = errorData?.message || 'Unknown error';
      
      throw new Error(`Error fetching inventory elements. Status: ${response.status}, Message: ${errorMessage}`);
    }
  } catch (error) {
    console.error('Error fetching inventory elements:', error.message);
    throw error; // Re-throw the original error for higher-level handling
  }
};

export const fetchAllElements = async (limit = 5, page = 1, anchorId = null, searchQuery = "") => {
  try {
    const token = await extractJWT();
    const domain_id = await setDomainId();

    const searchParam = searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : "";

    const url = `http://localhost:3000/api/v1/inventory/domain/${domain_id}/element?limit=${limit}&page=${page}${anchorId ? `&anchorId=${anchorId}` : ''}${searchParam}`;

    const response = await fetch(url, {
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
      // Log details before throwing the error
      console.error(`Failed to fetch inventory elements. URL: ${url}, Status: ${response.status}, StatusText: ${response.statusText}`);

      // Include detailed error message
      const errorData = await response.json().catch(() => null); // Try to parse JSON error response
      const errorMessage = errorData?.message || 'Unknown error';
      
      throw new Error(`Error fetching inventory elements. Status: ${response.status}, Message: ${errorMessage}`);
    }
  } catch (error) {
    console.error('Error fetching inventory elements:', error.message);
    throw error; // Re-throw the original error for higher-level handling
  }
};

export default {};
