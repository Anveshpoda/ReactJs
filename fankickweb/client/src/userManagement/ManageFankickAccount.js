/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from './user.css';
import $ from "jquery";
import { Layout, Menu, Breadcrumb, Icon, Form, Input, Col, Collapse, Switch, Tabs, Row, Avatar, Select, Table, Badge  } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const cx = classNames.bind(styles);
const FormItem = Form.Item;
const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const Option = Select.Option;
const Email = <span>gemini@fankick.io</span>;
const Username = <span><Avatar>N</Avatar><span style={{ position: 'absolute', padding: 8 }}>Narmadha</span></span>;
const permissions = <Select  getPopupContainer={triggerNode => triggerNode.parentNode} defaultValue="Pending" style={{ width: 120 }} onChange={handleChange}>
    <Option value="Pending">Pending</Option>
    <Option value="Approved">Approved</Option>
    <Option value="Rejected">Rejected</Option>
    <Option value="Delete">Delete</Option>
    <Option value="Delete from Thread">Delete from Thread</Option>
</Select>;
const columns = [{
    title: 'User Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
}, {
    title: 'Email',
    dataIndex: 'email',
    sorter: (a, b) => a.email - b.email,
}, {
    title: 'Description',
    dataIndex: 'permissions',
}];

const data = [{
    key: '1',
    name: Username,
    email: Email,
    permissions: permissions,
}, {
    key: '2',
    name: Username,
    email: Email,
    permissions: permissions,
}, {
    key: '3',
    name: Username,
    email: Email,
    permissions: permissions,
}];

function onChange(pagination, sorter) {
    console.log('params', pagination, sorter);
}
function handleChange(value) {
    console.log(`selected ${value}`);
}
function callback(key) {
    console.log(key);
}
const text1 = `A dog is a type of domesticated animal.`;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
class ManageFankickAccount extends React.Component {
  rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4'];
  state = {
    openKeys: ['sub1'],
  };
  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }
    render() {
        return (
          <div>
           <h5>Manage Fankick Account</h5>
           <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </span>
           <Tabs defaultActiveKey="1">
              <TabPane tab="Fanclubs" key="1">
                 {/* Fan2win Section ***********************************************************************/}
                 <Menu  mode="inline" openKeys={this.state.openKeys} onOpenChange={this.onOpenChange}>
                    <SubMenu  style={{margin:10}} key="sub1" title={
                    <span>
                       <span style={{marginRight:"81%", fontWeight:"bolder"}} className={cx('menuBold')}>Super Admin</span>
                       <Link style={{marginRight:"0"}} to="/create-user" >
                       <span className={cx('addSuperUser')}>
                          <Icon type="plus" />
                          Add
                       </span>
                       </Link>
                    </span>
                    }>
                    <div style={{paddingLeft:15}}>
                    <Table columns={columns} dataSource={data} onChange={onChange} />
                    </div>
                    </SubMenu>
                    <SubMenu key="sub2" title={
                    <span>
                       <span style={{marginRight:"81%", fontWeight:"bolder"}} className={cx('menuBold')}>Master Admin</span>
                       <Link   to="/create-user" >
                       <span className={cx('addSuperUser')}>
                          <Icon type="plus" />
                          Add
                       </span>
                       </Link>
                    </span>
                    }>
                     <div style={{padding:15}}>
                    <Table columns={columns} dataSource={data} onChange={onChange} />
                    </div>
                    </SubMenu>
                    <SubMenu key="sub3" title={
                    <span>
                       <span style={{marginRight:"85%", fontWeight:"bolder"}} className={cx('menuBold')}>Admin</span>
                       <Link  to="/create-user" >
                       <span className={cx('addSuperUser')}>
                          <Icon type="plus" />
                          Add
                       </span>
                       </Link>
                    </span>
                    }>
                    <div style={{padding:15}}>
                    <Table columns={columns} dataSource={data} onChange={onChange} />
                    </div>
                    </SubMenu>
                 </Menu>
              </TabPane>
              {/* Fancoins Section ***********************************************************************/}
              <TabPane tab="Fancoins" key="2">
                 <Menu  mode="inline" openKeys={this.state.openKeys} onOpenChange={this.onOpenChange}>
                    <SubMenu  style={{margin:10}} key="sub1" title={
                    <span>
                       <span style={{marginRight:"80%"}} className={cx('menuBold')}>Super Admin</span>
                       <Link style={{marginRight:"0"}} to="/create-user" >
                       <span className={cx('addSuperUser')}>
                          <Icon type="plus" />
                          Add
                       </span>
                       </Link>
                    </span>
                    }>
                    <div style={{padding:15}}>
                    <Table columns={columns} dataSource={data} onChange={onChange} />
                    </div>
                    </SubMenu>
                    <SubMenu key="sub2" title={
                    <span>
                       <span style={{marginRight:"80%"}} className={cx('menuBold')}>Master Admin</span>
                       <Link   to="/create-user" >
                       <span className={cx('addSuperUser')}>
                          <Icon type="plus" />
                          Add
                       </span>
                       </Link>
                    </span>
                    }>
                     <div style={{padding:15}}>
                    <Table columns={columns} dataSource={data} onChange={onChange} />
                    </div>
                    </SubMenu>
                    <SubMenu key="sub3" title={
                    <span>
                       <span style={{marginRight:"85%"}} className={cx('menuBold')}>Admin</span>
                       <Link  to="/create-user" >
                       <span className={cx('addSuperUser')}>
                          <Icon type="plus" />
                          Add
                       </span>
                       </Link>
                    </span>
                    }>
                    <div style={{padding:15}}>
                    <Table columns={columns} dataSource={data} onChange={onChange} />
                    </div>
                    </SubMenu>
                 </Menu>
              </TabPane>
              {/* Fan2win Section ***********************************************************************/}
              <TabPane tab="Fan2win" key="3">
                 <Menu  mode="inline" openKeys={this.state.openKeys} onOpenChange={this.onOpenChange}>
                    <SubMenu  style={{margin:10}} key="sub1" title={
                    <span>
                       <span style={{marginRight:"80%",fontWeight:"bold"}} className={cx('menuBold')}>Super Admin</span>
                       <Link style={{marginRight:"0"}} to="/create-user" >
                       <span className={cx('addSuperUser')}>
                          <Icon type="plus" />
                          Add
                       </span>
                       </Link>
                    </span>
                    }>
                    <div style={{padding:15}}>
                    <Table columns={columns} dataSource={data} onChange={onChange} />
                    </div>
                    </SubMenu>
                    <SubMenu key="sub2" title={
                    <span>
                       <span style={{marginRight:"80%"}} className={cx('menuBold')}>Master Admin</span>
                       <Link   to="/create-user" >
                       <span className={cx('addSuperUser')}>
                          <Icon type="plus" />
                          Add
                       </span>
                       </Link>
                    </span>
                    }>
                     <div style={{padding:15}}>
                    <Table columns={columns} dataSource={data} onChange={onChange} />
                    </div>
                    </SubMenu>
                    <SubMenu key="sub3" title={
                    <span>
                       <span style={{marginRight:"85%"}} className={cx('menuBold')}>Admin</span>
                       <Link  to="/create-user" >
                       <span className={cx('addSuperUser')}>
                          <Icon type="plus" />
                          Add
                       </span>
                       </Link>
                    </span>
                    }>
                    <div style={{padding:15}}>
                    <Table columns={columns} dataSource={data} onChange={onChange} />
                    </div>
                    </SubMenu>
                 </Menu>
              </TabPane>
              {/* Coupons Section ***********************************************************************/}
              <TabPane tab="Coupons" key="4">
                 <Menu  mode="inline" openKeys={this.state.openKeys} onOpenChange={this.onOpenChange}>
                    <SubMenu  style={{margin:10}} key="sub1" title={
                    <span>
                       <span style={{marginRight:"80%"}} className={cx('menuBold')}>Super Admin</span>
                       <Link style={{marginRight:"0"}} to="/create-user" >
                       <span className={cx('addSuperUser')}>
                          <Icon type="plus" />
                          Add
                       </span>
                       </Link>
                    </span>
                    }>
                    <div style={{padding:15}}>
                    <Table columns={columns} dataSource={data} onChange={onChange} />
                    </div>
                    </SubMenu>
                    <SubMenu key="sub2" title={
                    <span>
                       <span style={{marginRight:"80%"}} className={cx('menuBold')}>Master Admin</span>
                       <Link   to="/create-user" >
                       <span className={cx('addSuperUser')}>
                          <Icon type="plus" />
                          Add
                       </span>
                       </Link>
                    </span>
                    }>
                     <div style={{padding:15}}>
                    <Table columns={columns} dataSource={data} onChange={onChange} />
                    </div>
                    </SubMenu>
                    <SubMenu key="sub3" title={
                    <span>
                       <span style={{marginRight:"85%"}} className={cx('menuBold')}>Admin</span>
                       <Link  to="/create-user" >
                       <span className={cx('addSuperUser')}>
                          <Icon type="plus" />
                          Add
                       </span>
                       </Link>
                    </span>
                    }>
                    <div style={{padding:15}}>
                    <Table columns={columns} dataSource={data} onChange={onChange} />
                    </div>
                    </SubMenu>
                 </Menu>
              </TabPane>
           </Tabs>
          </div>
        );
    };
}


export default ManageFankickAccount;
/* eslint-disable */