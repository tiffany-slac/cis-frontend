import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home'; 
import Profile from './pages/Profile/Profile';
import Cwm from './pages/CWM/Cwm';
import ItemDetails from './pages/ItemDetails/ItemDetails';
import ActivityDetails from './pages/CWM/Activity/ActivityDetails';
import Settings from './pages/Settings/Settings';
import Admin from './pages/admin/admin';
import Inventory from './pages/Inventory/Inventory';
import ClassDetails from './pages/admin/ClassDetails';
import WorkDetails from './pages/CWM/WorkDetails';
import Elog from './pages/Elog/elog';

function AppRouter() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/inventory/:id" component={ItemDetails} />
          <Route path="/work/:workId/:activityId" component={ActivityDetails} />
          <Route path="/work/:workId" component={WorkDetails} />
          <Route path="/inventory" component={Inventory} />
          <Route path="/home" component={Home} />
          <Route path="/admin" component={Admin} />
          <Route path="/admin/:classId" component={ClassDetails} />
          <Route path="/cwm" component={Cwm} />
          <Route path="/elog" component={Elog} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default AppRouter;

