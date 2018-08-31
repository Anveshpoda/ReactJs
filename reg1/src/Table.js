import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

export default class Table extends React.Component {
    constructor(props) {
      super(props);
    }
    redir(){
      return <Redirect Push to='/login'/>;
    }
    render() {
      // const items = this.props.items;
      const items1 = localStorage.getItem('Item');
      const items = JSON.parse(items1);
      console.log(items)
      return (
        <div id="Table">
          <table>
            <tbody>
              <tr>
                <th>Username</th>
                <th>Password</th>
                <th>Mobile</th>
              </tr>
              
              {items.map(item => {
                return (
                  <tr>
                    <td>{item.username}</td>
                    <td>{item.password}</td>
                    <td>{item.mobile}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Link to={'/login'}><button type="button" onClick={this.redir} value="BACK">Back</button></Link> 
          {/* <button type="button" onClick={this.redir} value="BACK">Back</button> */}
        </div>
      );
    }
  }


//   export default Table;
