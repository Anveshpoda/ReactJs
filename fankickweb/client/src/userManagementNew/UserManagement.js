/* eslint-disable */
import React, { Children } from 'react';
import $ from 'jquery';
import { Layout, Menu, Icon, Col, Row, Button, Table} from 'antd';
import { Link } from 'react-router';
import css from './user.css';


class UserManagement extends React.Component {
constructor(props){
  super(props);
  this.state={
    masterAdmins:true,
    superAdmins:false,
    Admins:false,
    Users:false
  }
}
getmasterAdmins=()=>{
  $(".usertypemenu li").removeClass("litabActive");
  $(".usertypemenu li:nth-child(1)").addClass("litabActive");
  this.setState({ masterAdmins:true, superAdmins:false, Admins:false, Users:false})
}
getSuperAdmins=()=>{
 
  $(".usertypemenu li").removeClass("litabActive");
  $(".usertypemenu li:nth-child(2)").addClass("litabActive");
  this.setState({masterAdmins:false, superAdmins:true, Admins:false, Users:false})
}
getAdmins=()=>{
  $(".usertypemenu li").removeClass("litabActive");
  $(".usertypemenu li:nth-child(3)").addClass("litabActive");
  this.setState({masterAdmins:false, superAdmins:false, Admins:true, Users:false})
}
getUsers=()=>{
  $(".usertypemenu li").removeClass("litabActive");
  $(".usertypemenu li:nth-child(4)").addClass("litabActive");
  this.setState({masterAdmins:false, superAdmins:false, Admins:false, Users:true})
}
  render() {
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
    }, {
      title: 'Network',
      dataIndex: 'network',
    }, {
      title: 'Role',
      dataIndex: 'role',
    }, {
      title:'Email',
      dataIndex:'email',
    }];
    const data = [{
      key: '1',
      name: 'John Brown',
      network: 'Fankick',
      role: 'Admin',
      email:'abc@fankick.io',
    }, {
      key: '2',
      name: 'Jim Green',
      network: 'Gemini',
      role: 'Admin',
      email:'def@fankick.io',
    }, {
      key: '3',
      name: 'Joe Black',
      network: 'GCS',
      role: 'Admin',
      email:'ghi@fankick.io',
    }];
const Usertable =[{}]
    return (
      <div>
        <div className="tabsection">
 <ul className="list-inline usertypemenu">
 <li onClick={this.getSuperAdmins.bind(this)}>Super Admins</li>
 <li onClick={this.getmasterAdmins.bind(this)}>Master Admins</li> 
 <li onClick={this.getAdmins.bind(this)}>Admins</li>
 <li onClick={this.getUsers.bind(this)}>Users</li>
 </ul>
 <div className="userdataTable">
 {
   this.state.masterAdmins ? 
   <Table columns={columns} dataSource={data} size="middle" />
   :null
 }
  {
   this.state.superAdmins ? 
   <Table columns={columns} dataSource={data} size="middle" />
   :null
 }
  {
   this.state.Admins ? 
   <Table columns={columns} dataSource={data} size="middle" />
   :null
 }
  {
   this.state.Users ? 
   <Table columns={columns} dataSource={data} size="middle" />
   :null
 }
 </div>
 </div>
      </div>
    );
  }
}
export default UserManagement;
/* eslint-disable */