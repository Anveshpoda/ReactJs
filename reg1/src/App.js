import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import Table from './Table';
import Form from './form';
import editTable from './editTable';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router >
          <Switch>
            <Route path="/form" component={Form} />
            <Route path="/login" component={Login} />
            <Route path="/table" component={Table} />
            <Route path="/edittable" component={editTable} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
