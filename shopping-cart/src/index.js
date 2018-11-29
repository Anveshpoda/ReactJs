import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
<div id="app"></div>
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
