import React from 'react';
import './App.css';
import Home from './pages/Home/home'
import Login from './pages/Login/login'
import User from './pages/User/user'
import Add from './pages/Add/add'
import Manager from './pages/Manager/manager'
import Admin from './pages/Admin/admin'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const NoMatchPage = () => {
    return (
      <h3>404 - Not found</h3>
    );
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/manager" component={Manager} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/user" component={User} />
          <Route exact path="/add" component={Add} />
          <Route exact path="/admin" component={Admin} />
          <Route component={NoMatchPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
