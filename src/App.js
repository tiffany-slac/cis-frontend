import './App.css';
import React from 'react';
import AppRouter from './AppRouter';
import Layout from './Layout';


function App() {
  return (
    <Layout>
      <header className="App-header">
        {/* Your header content can go here */}
      </header>
      <AppRouter />
      <footer>
        {/* Your footer content can go here */}
      </footer>
    </Layout>
  );
}

export default App;
