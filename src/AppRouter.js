import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home'; 
import Profile from './pages/Profile/Profile';
import Jobs from './pages/Jobs';
import ItemDetails from './pages/ItemDetails/ItemDetails';
import Reports from './pages/Reports';
import Settings from './pages/Settings/Settings';
import Admin from './pages/admin/admin';
import Inventory from './pages/Inventory/Inventory';
import ClassDetails from './pages/admin/ClassDetails';

function AppRouter() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/inventory/:id" component={ItemDetails} />
          <Route path="/inventory" component={Inventory} />
          <Route path="/home" component={Home} />
          <Route path="/elogs" component={Reports} />
          <Route path="/admin" component={Admin} />
          <Route path="/admin/:classId" component={ClassDetails} />
          <Route path="/profile" component={Reports} />
          <Route path="/settings" component={Profile} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default AppRouter;
