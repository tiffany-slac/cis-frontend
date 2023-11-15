import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './layout/Layout'; // Import your Layout component
import Home from './pages/Home'; 
import Search from './pages/Search';
import Profile from './pages/Profile/Profile';
import Jobs from './pages/Jobs';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function AppRouter() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/search" component={Search} />
          <Route path="/home" component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/jobs" component={Jobs} />
          <Route path="/profile" component={Reports} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default AppRouter;
