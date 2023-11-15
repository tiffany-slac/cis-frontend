import React, { useState } from 'react';
import axios from 'axios';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/search?term=${searchTerm}`);

      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div>
      <br></br><br></br>
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <button onClick={handleSearch}>Search</button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((result) => (
            <tr key={result.id}>
              <td>{result.name}</td>
              <td>{result.age}</td>
              <td>{result.email}</td>
              <td>{result.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Search;
