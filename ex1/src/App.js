import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import Login from './Login';

class App extends Component {
   render() {
      return (       
         <Router>
            <div>
                <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                 <h1 className="App-title">Anvesh Annu</h1>
                </header>
            
               <ul>
                  <li><Link to={'/'}>Home</Link></li>
                  <li><Link to={'/Login'}>Login</Link></li>
               </ul>
               <hr />
               
               <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/Login' component={Login} />
               </Switch>
            </div>
         </Router>
      );
   }
}

export default App;



