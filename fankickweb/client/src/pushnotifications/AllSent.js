/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router';
import Dashboard from '../Dashboard/Dashboard';
import $ from "jquery";
import { Form, Icon, Input, Button, Checkbox, Tabs, Col, Row } from 'antd';
import NotificationsListTableAllSent from './AllSent/NotificationsListTableAllSent';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

function callback(key) {
}
class AllsentNotifications extends React.Component {
  state={
    custom:'',
    scheduled:'',
    predefined:'',
    allSent:''
  }
  componentWillMount() {
    var user = JSON.parse(sessionStorage.getItem('user'));
   
    if (user.permissions !== '') {
      
      this.setState({ custom: user.permissions.notifications.custom,allSent:user.permissions.notifications.allSent,
        scheduled: user.permissions.notifications.scheduled,predefined: user.permissions.notifications.predefined })
    }
  }
  render() {
    return (
      <Dashboard>
        <div className="hiddnScroll">
          <Row>
            <Col span={24} className='MarginTop20'>
             <div className="SubMenuPushNotifications">
              <Col span={10}>
                <h3 className="marginTop14 pageTitle">Push Notifications</h3>
              </Col>
              <Col span={14}>
                <nav className='pushNotifnavigation' role="navigation" style={{ float: 'right' }}>
                  <Link to="/push-notifications" className='item' activeClassName='active'>Sent History</Link>
                {this.state.custom.view === true?
                  <Link to="/push-notifications/custom-notifications" className='item' activeClassName='active'>Custom</Link>
                  :null}
                  {this.state.predefined.view === true?
                  <Link to="/push-notifications/predefined-notifications" className='item' activeClassName='active'>Predefined</Link>
                  :null}
                  {this.state.scheduled.view === true?
                  <Link to="/push-notifications/scheduled-notifications" className='item' activeClassName='active'>Scheduled</Link>
                  :null}
                  
                  {this.state.custom.create===true||this.state.predefined.create===true||this.state.scheduled.create===true?<Link to="/push-notifications/create"> <Button type="primary" className='createBtn'>Create</Button></Link>:''}
          
                </nav>

              </Col>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24} className=''>

              <NotificationsListTableAllSent role={this.state.allSent}/>
            </Col>
          </Row>
        </div>
      </Dashboard>
    );
  };
}


export default AllsentNotifications;
/* eslint-disable */