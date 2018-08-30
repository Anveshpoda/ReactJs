import React, { Component } from 'react';

export default class Table extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      //const items = this.props.items;
      return (
        <div id="Table">
          <table>
            <tbody>
              <tr>
                <th>Username</th>
                <th>Password</th>
                <th>Mobile</th>
              </tr>
              {/* {items.map(item => {
                return (
                  <tr>
                    <td>{item.username}</td>
                    <td>{item.password}</td>
                    <td>{item.mobile}</td>
                  </tr>
                );
              })} */}
            </tbody>
          </table>
        </div>
      );
    }
  }


//   export default Table;
