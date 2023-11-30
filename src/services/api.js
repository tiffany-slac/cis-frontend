import axios from 'axios';

// GET request example
axios.get('http://localhost:3000/search?term=query')
  .then(response => {
    // Handle the response from the backend
    console.log(response.data);
  })
  .catch(error => {
    // Handle any errors that occurred
    console.error('Error fetching data:', error);
  });
