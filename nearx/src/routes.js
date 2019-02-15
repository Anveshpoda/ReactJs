
import React from 'react';
import { Router, Route, Switch } from 'react-router';
import Home2 from './MainLayout/MainLayout';
import HomeNew from './HomeNew';
import Home from './Home';

const Routes = (props) => (
    
    <Router {...props}>
       <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/home" component={Home}/>
            <Route path="/home1" component={HomeNew}/>
            <Route path="/nav1" component={Home2}/>
            <Route path="/*" component={Home}  />
        </Switch>
    </Router>
);
export default Routes;