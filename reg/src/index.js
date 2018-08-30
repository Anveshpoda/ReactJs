import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import {Router,browserHistory} from 'react-router';
// import { BrowserRouter as Router } from 'react-router-dom';
import routes from './App'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Router history={browserHistory} routes={routes} />, document.getElementById('root'));
registerServiceWorker();
