/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router';
import Dashboard from '../Dashboard/Dashboard';
import $ from "jquery";
import { Form, Icon, Input, Button, Checkbox, Tabs, Col, Row } from 'antd';
import NotificationsListTable from './predefined/NotificationsListTable';

class PredefinedNotifications extends React.Component {
  constructor() {
    super();
    this.state = {
      role: ''
    }
  }
  componentWillMount() {
    var user = JSON.parse(sessionStorage.getItem('user'));
    console.log("userdata in contest page menu", user.permissions.notifications);
    this.setState({ role: user.permissions.notifications })
  }
  handleSubmit = () => {
    window.location.reload();
  }
  render() {

    return (
      <Dashboard>

        <div>
          <Col span={24} className='MarginTop20'>
            <div className="SubMenuPushNotifications">
              <Col span={10}>
                <h3 className="marginTop14 pageTitle">Predefined Notifications</h3>
              </Col>
              <Col span={14}>
                <nav className='pushNotifnavigation' role="navigation" style={{ float: 'right' }}>
                  <Link to="/push-notifications" className='item' activeClassName='active'>Sent History</Link>
                  {this.state.role.custom.view === true ?
                    <Link to="/push-notifications/custom-notifications" className='item' activeClassName='active'>Custom</Link>
                    : null}
                  {this.state.role.predefined.view === true ?
                    <Link to="/push-notifications/predefined-notifications" className='item' activeClassName='active'>Predefined</Link>
                    : null}
                  {this.state.role.scheduled.view === true ?
                    <Link to="/push-notifications/scheduled-notifications" className='item' activeClassName='active'>Scheduled</Link>
                    : null}
                  {this.state.role.custom.create === true || this.state.role.predefined.create === true || this.state.role.scheduled.create === true ? <Link to="/push-notifications/create"> <Button type="primary" className='createBtn'>Create</Button></Link> : ''}
                </nav>
              </Col>
            </div>
          </Col>
          <Col span={24} className=''>

            <NotificationsListTable role={this.state.role.predefined} />
          </Col>
        </div>


      </Dashboard>
    );
  };
}


export default PredefinedNotifications;
/* eslint-disable */