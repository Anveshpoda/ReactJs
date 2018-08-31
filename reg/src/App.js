import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import Table from './Table';
import { browserHistory } from 'react-router'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={browserHistory}>
          <Switch>
            <Route path="/" component={Login} />
            <Route path="/table1" component={Table} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
