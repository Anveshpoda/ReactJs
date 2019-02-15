import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import history from './history'
import * as serviceWorker from './serviceWorker';
import { Router as browserHistory } from 'react-router';
import Routes from './routes'; 

ReactDOM.render(
    <Routes history={history}/>,
    document.getElementById('root')
   );
 

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
