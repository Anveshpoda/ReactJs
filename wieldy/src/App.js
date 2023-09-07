import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "styles/wieldy.less";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import App from "./containers/App/index";


//export const store = configureStore();

const NextApp = () =>
  // <Provider store={store}>
  //   <ConnectedRouter history={history}>
  <Router>
    <Route path="/" component={App} />
  </Router>
//   </ConnectedRouter>
// </Provider>;


export default NextApp;
