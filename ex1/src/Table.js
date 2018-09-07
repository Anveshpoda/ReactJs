import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import Login, { Form } from './Login1';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Table, Divider, Tag } from 'antd';

import ReactTable from "react-table";
import "react-table/react-table.css";
// import { Button } from 'antd/lib/radio';

export default class Table1 extends React.Component {
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
       <DefaultPaginationTable edit={this.edit} remove={this.remove}/>  <br /><br />
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








function activeFormatter(cell, row) {
  return (
    <ActiveFormatter active={ cell } />
  );
}

class ActiveFormatter extends React.Component {
  render() {
    return (

      <input type='checkbox' checked={ this.props.active }/>
      // <input type="button" value="Edit" onClick={() => this.edit( this.props.active )} className="del-btn" />
    );
  }
}

function onAfterInsertRow(row) {
  let newRowStr = '';

  for (const prop in row) {
    newRowStr += prop + ': ' + row[prop] + ' \n';
  }
  alert('The new row is:\n ' + newRowStr);
}








class DefaultPaginationTable extends React.Component {
  render() {
    const items = JSON.parse(localStorage.getItem('Item'))
    

  
const columns = [{
  title: 'User Name',
  dataIndex: 'username',
  key: 'username',
  // render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'Password',
  dataIndex: 'password',
  key: 'password',
}, {
  title: 'Mobile',
  dataIndex: 'mobile',
  key: 'mobile',
}, {
//   title: 'Tags',
//   key: 'tags',
//   dataIndex: 'tags',
//   render: tags => (
//     <span>
//       {/* {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)} */}
//     </span>
//   ),
// }, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
   <div>
      <input type="button" value="Delete" onClick={() => this.props.remove(record.id)} className="del-btn" />
      {/* <a href="javascript:;">Invite {record.name}</a> */}
      <Divider type="vertical" />
      <input type="button" value="Edit" onClick={() => this.props.edit(record)} className="del-btn" />
      {/* <a href="javascript:;">Delete</a> */}
   </div>
  ),
}];


    const options = {
      afterInsertRow: onAfterInsertRow,
      defaultSortName: 'mobile',  // default sort column name
      defaultSortOrder: 'desc',  // default sort order
      page: 1,  // which page you want to show as default
      sizePerPageList: [ 
         { text: '2', value: 2 },  { text: '4', value: 4 },  { text: '6', value: 6 },  { text: '8', value: 8 },
         { text: '10', value: 10 },  { text: '12', value: 12 }, { text: '14', value: 14 }, 
         { text: 'All', value: items.length } ], // you can change the dropdown list for size per page
       sizePerPage: 6,  // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 3,  // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      firstPage: 'First', // First page button text
      lastPage: 'Last', // Last page button text
      paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
      //paginationPosition: 'top'  // default is bottom, top and both is all available
       //hideSizePerPage: true, //> You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
    };
  


    return (
      <div> 
       <div>
        <BootstrapTable
          data={ items } insertRow={ true }
          options={ options }
          pagination>
          {/* <TableHeaderColumn dataField='id' isKey>ID</TableHeaderColumn> */}
          <TableHeaderColumn dataField='username'  isKey>User Name</TableHeaderColumn>
          <TableHeaderColumn dataField='password'>Password</TableHeaderColumn>
          <TableHeaderColumn dataField='mobile'>Mobile</TableHeaderColumn>
          <TableHeaderColumn dataField='active' dataFormat={ activeFormatter }>Active</TableHeaderColumn>
        </BootstrapTable>
        </div>

       <br/><br/><br/><br/>

         <div>
        <ReactTable
            data={items}
            columns={[
              {
                Header: "User Name",
                accessor: "username",
                Cell: this.renderEditable
              },
              {
                Header: "Password",
                accessor: "password",
                Cell: this.renderEditable
              },
              {
                Header: "Mobile",
                accessor: "mobile",
                Cell: this.renderEditable
              },
              {
                Header: "Full Name",
                id: "full",
                accessor: d => (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: d.username + " " + d.password
                    }}
                  />
                )
              }
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
           </div>


            <br/><br/><br/><br/>

            <Table columns={columns} pagination={{ pageSizeOptions: ['10', '20', '30', '40'] }} dataSource={items} />


      </div>
    );
  }
}



