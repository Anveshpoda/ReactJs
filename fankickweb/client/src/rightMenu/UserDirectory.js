/* eslint-disable */
import React from 'react';
import { Link } from 'react-router';
import css from '../index.css';
// import { connect } from 'react-redux';
//import PropTypes from 'prop-types';
//import classNames from 'classnames/bind';
// import profile from './css/profile'
//import $ from "jquery";
//import clone from 'clone';
import { Menu,  Icon, Tabs,  Avatar } from 'antd';
// const { Header, Content, Footer, Sider } = Layout;
// const cx = classNames.bind(styles);
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;

function callback(key) {
  console.log(key);
}

class UserDirectory extends React.Component {
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
        <div className='userDirectoryView'>
          <h6>Directory</h6>
          <Tabs defaultActiveKey="1" onChange={callback} size="small">
            <TabPane tab="FanKick" key="1">
              <Menu mode="inline" openKeys={this.state.openKeys} onOpenChange={this.onOpenChange}>

                <Link to="#"><span className='addSuperUser'><Icon type="plus" />Add</span></Link>
                <SubMenu key="sub1" title={<span><span className='menuBold'>Super Admin</span></span>}>
                  <Menu.Item key="2"><Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png">B</Avatar>Your name</Menu.Item>
                </SubMenu>
                <Link to="#"><span className='addSuperUser'><Icon type="plus" />Add</span></Link>
                <SubMenu key="sub2" title={<span className='menuBold'>Master Admin</span>}>
                  <Menu.Item key="5"><Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png">A</Avatar>Your name 5</Menu.Item>
                </SubMenu>
                <Link to="#"><span className='addSuperUser'><Icon type="plus" />Add</span></Link>
                <SubMenu key="sub3" title={<span className='menuBold'>Admin</span>}>
                  <Menu.Item key="6"><Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png">A</Avatar>Your name 6</Menu.Item>
                </SubMenu>
              </Menu>
            </TabPane>
            <TabPane tab="Agent" key="2">
              <Menu mode="inline" openKeys={this.state.openKeys} onOpenChange={this.onOpenChange}>
                <Link to="#"><span className='addSuperUser'><Icon type="plus" />Add</span></Link>
                <SubMenu key="sub1" title={<span><span className='menuBold'>Super Admin</span></span>}>
                  <Menu.Item key="1"><Avatar src="">A</Avatar>Your name 1</Menu.Item>
                  <Menu.Item key="2"><Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png">B</Avatar>Your name 2</Menu.Item>
                </SubMenu>
                <Link to="#"><span className='addSuperUser'><Icon type="plus" />Add</span></Link>
                <SubMenu key="sub2" title={<span className='menuBold'>Master Admin</span>}>
                  <Menu.Item key="5"><Avatar src="">A</Avatar>Your name 5</Menu.Item>
                  <Menu.Item key="6"><Avatar src="">A</Avatar>Your name 6</Menu.Item>
                </SubMenu>
                <Link to="#"><span className='addSuperUser'><Icon type="plus" />Add</span></Link>
                <SubMenu key="sub3" title={<span className='menuBold'>Admin</span>}>
                  <Menu.Item key="7"><Avatar src="">A</Avatar>Your name 7</Menu.Item>
                  <Menu.Item key="8"><Avatar src="">A</Avatar>Your name 8</Menu.Item>
                  <Menu.Item key="9"><Avatar src="">A</Avatar>Your name 9</Menu.Item>
                </SubMenu>
              </Menu>
            </TabPane>
            <TabPane tab="Pro. House" key="3">
              <Menu mode="inline" openKeys={this.state.openKeys} onOpenChange={this.onOpenChange}>
                <Link to="#"><span className='addSuperUser'><Icon type="plus" />Add</span></Link>
                <SubMenu key="sub1" title={<span><span className='menuBold'>Super Admin</span></span>}>
                  <Menu.Item key="1"><Avatar src="">A</Avatar>Your name</Menu.Item>
                  <Menu.Item key="2"><Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png">B</Avatar>Your name</Menu.Item>
                  <Menu.Item key="3"><Avatar src="">A</Avatar>Your name 3</Menu.Item>
                  <Menu.Item key="4"><Avatar src="">A</Avatar>Your name 4</Menu.Item>
                </SubMenu>
                <Link to="#"><span className='addSuperUser'><Icon type="plus" />Add</span></Link>
                <SubMenu key="sub2" title={<span className='menuBold'>Master Admin</span>}>
                  <Menu.Item key="5"><Avatar src="">A</Avatar>Your name 5</Menu.Item>
                  <Menu.Item key="6"><Avatar src="">A</Avatar>Your name 6</Menu.Item>
                </SubMenu>
                <Link to="#"><span className='addSuperUser'><Icon type="plus" />Add</span></Link>
                <SubMenu key="sub3" title={<span className='menuBold'>Admin</span>}>
                  <Menu.Item key="7"><Avatar src="">A</Avatar>Your name 7</Menu.Item>
                  <Menu.Item key="8"><Avatar src="">A</Avatar>Your name 8</Menu.Item>
                  <Menu.Item key="9"><Avatar src="">A</Avatar>Your name 9</Menu.Item>
                </SubMenu>
              </Menu>
            </TabPane>
          </Tabs>
        </div>
      );
    }
  };



export default (UserDirectory);
// export default UserDirectory;
/* eslint-disable */