// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './layout/Layout'; // Import your Layout component
import Home from './pages/Home'; // Import your Home component
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Jobs from './pages/Jobs';
import Settings from './pages/Settings';

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Layout>
              <Home />
            </Layout>
          )}
        />
        <Route
          path="/dashboard"
          render={() => (
            <Layout>
              <Dashboard />
            </Layout>
          )}
        />
        <Route
          path="/reports"
          render={() => (
            <Layout>
              <Reports />
            </Layout>
          )}
        />
        <Route
          path="/jobs"
          render={() => (
            <Layout>
              <Jobs />
            </Layout>
          )}
        />
        <Route
          path="/settings"
          render={() => (
            <Layout>
              <Settings />
            </Layout>
          )}
        />
        {/* Add more routes for other pages */}
      </Switch>
    </Router>
  );
}

export default AppRouter;
