import React from 'react';
import AppRouter from './appRouter';
import Layout from './layout';
import Sidebar from './Sidebar'; // Import your Sidebar component here
import Header from './Header'; // Import your Header component here
import './App.css';

function App() {
  return (
    <div className="App">
      <Header /> {/* Render the Header component here */}
      <div style={{ display: 'flex' }}>
        <Sidebar /> {/* Render the Sidebar component here */}
        <Layout>
          <main className="Main">
            <AppRouter /> {/* Render your router content here */}
          </main>
        </Layout>
      </div>
      <footer>
        {/* Your footer content can go here */}
      </footer>
    </div>
  );
}

export default App;
