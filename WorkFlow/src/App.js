import React, { Component } from 'react'
import './css/App.css';
import Hedder from './Components/Hedder';

export default class App extends Component {
  render() {
    return (
      <div>

      <div className='divCenter'>
            Hello HI
      </div>


      <Hedder />
      <div style={{ marginTop: 95 }}>
        
         <div style={{ height: '100vh' }}>
          <div className='divCenter'>
            Hello HI
          </div>
        </div>

      </div>
    </div>
    )
  }
}
