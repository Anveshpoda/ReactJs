import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import Login, { Form } from './Login1';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


export default class Table extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      mobile: '',
      noRows: 10,
      show: false,
      row: {},
      errors: {},
      items: JSON.parse(localStorage.getItem('Item'))
    };
  }

  edit = (rowId) => {
    // const arrayCopy = this.state.items.filter((row) => row.id !== rowId.id);
    //   this.setState({items: arrayCopy});
    //   localStorage.setItem('Item',JSON.stringify(arrayCopy));  
    this.setState({
      username: rowId.username,
      password: rowId.password,
      mobile: rowId.mobile,
      show: true,
      row: rowId
    });
  };

  remove = (rowId) => {
    const arrayCopy = this.state.items.filter((row) => row.id !== rowId);
    this.setState({ items: arrayCopy });
    localStorage.setItem('Item', JSON.stringify(arrayCopy));
    console.log(rowId)
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    if (this.state.username <= 0 || this.state.password <= 0 || this.state.mobile <= 0) return
    const arrayCopy = this.state.items.filter((row) => {
      if (row.id !== this.state.row.id) return row
      else {
        row.username = this.state.username,
          row.password = this.state.password,
          row.mobile = this.state.mobile
        return row
      }
    });

    this.setState({
      items: arrayCopy,
      username: '',
      password: '',
      mobile: '',
      show: false
    })
    localStorage.setItem('Item', JSON.stringify(arrayCopy));
  };

  handleInputChange = (e) => {
    let errors = { ...this.state.errors };
    if (!e.target.value.trim()) {
      errors[e.target.name] = e.target.name + " cannot be empty";
    } else errors[e.target.name] = ''

    return this.setState({
      [e.target.name]: e.target.value,
      errors
    })
  };

  render() {
    // const items=JSON.parse(localStorage.getItem('Item'));
    var items = this.state.items;
    let form;
    if (this.state.show) form = <Form handleFormSubmit={this.handleFormSubmit} handleInputChange={this.handleInputChange} newUsername={this.state.username} newMobile={this.state.mobile} newPassword={this.state.password} errors={this.state.errors} />
    else form = [];


    console.log(items)
    return (
      <div id="Table" >
       <DefaultPaginationTable/>
        <label>
          No of Rows :-  &nbsp;
            <select id="noRows" value={this.state.selectValue} onChange={this.handleChange} >
            <option value="2" >2</option>
            <option value="4" >4</option>
            <option value="6" >6</option>
            <option value="8" >8</option>
            <option value="10" >10</option>
            <option value="12" >12</option>
            <option value="14" >14</option>
            <option value="16" >16</option>
            <option value="18" >18</option>
            <option value="20" >20</option>
          </select>
        </label>

        <table CELLSPACING="2px" className="table table-bordered">
          <thead>
            <tr>
              <th>Username</th>
              <th>Password</th>
              <th>Mobile</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => {
              return (
                <tr border-spacing="10px">
                  <td>{item.username}</td>
                  <td>{item.password}</td>
                  <td>{item.mobile}</td>
                  <td className="button"><input type="button" value="Delete" onClick={() => this.remove(item.id)} className="del-btn" /></td>
                  <td className="button1"><input type="button" value="Edit" onClick={() => this.edit(item)} className="del-btn" /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <center> <Link to={'/login1'}><button type="button" value="BACK">ADD</button></Link>
          {/* <button type="button" onClick={this.redir} value="BACK">Back</button> */}
        
          {form} </center>
        {/* <Form handleFormSubmit={this.handleFormSubmit} handleInputChange={this.handleInputChange} newUsername={this.state.username} newMobile={this.state.mobile} newPassword={this.state.password} /> */}

        <br /><br /><br />

      </div>
    );
  }
}

class DefaultPaginationTable extends React.Component {
  render() {
    
    const items = JSON.parse(localStorage.getItem('Item'))
    return (
      <div> 
      
        <BootstrapTable
          data={ items }
          pagination>
          {/* <TableHeaderColumn dataField='id' isKey>ID</TableHeaderColumn> */}
          <TableHeaderColumn dataField='username' isKey>User Name</TableHeaderColumn>
          <TableHeaderColumn dataField='password'>Password</TableHeaderColumn>
          <TableHeaderColumn dataField='mobile'>Mobile</TableHeaderColumn>
          
        </BootstrapTable>
        
        
      </div>
    );
  }
}

// class Form extends React.Component {
//   constructor(props) {
//       super(props);
//   }

//   render() {     
//       return (

//           <div id="Form"><br></br><br></br><br></br><br></br><br></br>
//               <form onSubmit={this.props.handleFormSubmit}>
//                   <label htmlFor="username">
//                       Username:
//           <input id="username" value={this.props.newUsername} type="text" name="username" onChange={this.props.handleInputChange} />
//                   </label>
//                   <label for="password">
//                       Password:
//           <input id="password" value={this.props.newPassword} type="password" name="password" onChange={this.props.handleInputChange} />
//                   </label>
//                   <label for="mobile">
//                       Mobile:
//           <input id="mobile" value={this.props.newMobile} type="number" name="mobile" onChange={this.props.handleInputChange} />
//                   </label>
//                  <button type="submit" value="Submit">Add Item</button>
//                   {/* <Link to={'/table'}><button type="submit" value="Submit">Add Item</button></Link>  */}
//               </form>
//           </div>
//       );
//   }
// }

//   export default Table;
