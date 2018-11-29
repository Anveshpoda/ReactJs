import React, { Component } from 'react';
import './App.css';
import Table1 from './Table';
import { browserHistory } from 'react-router'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={browserHistory}>
          <Switch>
            <Route path="/" component={Table1} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
