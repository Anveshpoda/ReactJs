import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import Table from './Table';
import { browserHistory, IndexRoute, Route } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom';
export default (
  <Route path="/" component={Login}>
    <IndexRoute component={Login} />
    <Route path="/table" component={Table} />
  </Route>
)
// class App extends Component {


//   render() {
//     return (
//       <div className="App">
//         <Router history={browserHistory}>

//         </Router>
//       </div>
//     );
//   }
// }

// export default App;
