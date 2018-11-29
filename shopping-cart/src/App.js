import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import data from './products.json'
import { Table, Divider, Tag ,Popover} from 'antd';

class App extends Component {
  render() {


    return (
      
      <div className="App">
        <header className="App-header">
        
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          
        </header>
        <p className="App-intro">
        
        {/* <Table columns={columns} pagination={{ pageSize: 30, defaultCurrent: 100 }} dataSource={items} /> */}

        </p>
      </div>

      
      
    );
    
  }
}


export default App;
