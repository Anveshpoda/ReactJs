/* eslint-disable */
import React from 'react';
// import $ from "jquery";
import {Menu,  Icon } from 'antd';
import fkLogo from '../images/logo.png';
import userConfiguration from '../images/icons/right/user_configuration.png';
import todos from '../images/icons/right/todos.png';
import chat from '../images/icons/right/chat.png';
import notes from '../images/icons/right/notes.png';
import notifications from '../images/icons/right/notifications.png';
// const { Header, Content, Footer, Sider } = Layout;



/*
 * React-router's <Router> component renders <Route>'s
 * and replaces `this.props.children` with the proper React Component.
 *
 * Please refer to `routes.jsx` for the route config.
 *
 * A better explanation of react-router is available here:
 * https://github.com/rackt/react-router/blob/latest/docs/Introduction.md
 */
class RightMenu extends React.Component {
   state = {
    collapsed: true,
  };

  render() {
    return (
      <div>
  <Menu theme="dark" mode="inline" defaultSelectedKeys={[]}>
    <Menu.Item key="1" className={('profile')}>
    <Icon> <img src={userConfiguration} style={{'vertical-align': 'middle'}} alt=""/></Icon>
      <span>Profile</span>
    </Menu.Item>
    <Menu.Item key="2" className={('userDirectory')}>
    <Icon> <img src={notes} style={{'vertical-align': 'middle'}} alt=""/></Icon>
      <span>User Directory</span>
    </Menu.Item>
     <Menu.Item key="3" className={('toDoMenu')}>
     <Icon> <img src={todos} style={{'vertical-align': 'middle'}} alt=""/></Icon>
      <span>ToDo</span>
    </Menu.Item>
    <Menu.Item key="4" className={('chatMenu')}>
    <Icon> <img src={chat} style={{'vertical-align': 'middle'}} alt=""/></Icon>
      <span>Chat</span>
    </Menu.Item>    
    <Menu.Item key="5">
    <Icon> <img src={notifications} style={{'vertical-align': 'middle'}} alt=""/></Icon>
      <span>Notifications</span>
    </Menu.Item>    
  </Menu>
</div>
   
  );
};
}


export default RightMenu;
/* eslint-disable */