import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Table from './Table';
import Login1 , {Form} from './Login1';
import Hedder from './components/Hedder';
//import { Button , ButtonGroup , Navbar,Nav,MenuItem,NavItem,NavDropdown } from 'react-bootstrap';

class App extends Component {
   render() {  
      return (        
         <Router>
            <div>               
             <Hedder/> 
               <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/Login' component={Login} />
                  <Route exact path='/Login1' component={Login1} />
                  <Route exact path='/Table' component={Table} /> 
               </Switch>
            </div>
         </Router>
      );
   }
}

export default App;



