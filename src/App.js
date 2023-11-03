import './App.css';
import AppRouter from './AppRouter'; // Import your routing component
import Layout from './Layout'; // Import your layout component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Your header content can go here */}
      </header>
      <main>
        <Layout>
          <AppRouter /> {/* Render your routing component within the layout */}
        </Layout>
      </main>
      <footer>
        {/* Your footer content can go here */}
      </footer>
    </div>
  );
}

export default App;

