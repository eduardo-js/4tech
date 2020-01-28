import React from 'react';
import './App.css';
import Login from './containers/login/login';
import Timeline from './containers/timeline/Timeline';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/timeline" component={Timeline} />
        <Redirect to="/"/>
      </Switch>
    </Router>
  );
}

export default App;
