import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import Table from './Table';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router >
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/table" component={Table} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
