import React from 'react';
import CardWidget from '../components/CardWidget';
import SLACImage from '../assets/slacCampus.jpg';

function Home() {
  // Define a style object for the heading
  // const headingStyle = {
    
  //   height: '275px',
  //   backgroundImage: `url(${SLACImage})`,
  //   backgroundSize: '100% auto', // Stretch image to 100% width and auto height
  //   backgroundRepeat: 'no-repeat', 
  //   backgroundPositionX: 'center',
  //   backgroundPositionY: '10%',
  //   width:'100%',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   color: 'white', // Set text color for better visibility
  // };
  
  return (
    <div>
      {/* Render the heading with the specified style */}
      <h1>Dashboard</h1>
      <CardWidget />
    </div>
  );
}

export default Home;
