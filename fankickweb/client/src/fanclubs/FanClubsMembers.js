/* eslint-disable */
import React from 'react';
import axios from 'axios';
import clone from 'clone';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import $ from "jquery";
import { Link } from 'react-router';
import Dashboard from '../Dashboard/Dashboard';
import { Col, Form, message, Menu, Dropdown, Icon, Input, Button, Checkbox, Tabs, Select, Card, Avatar } from 'antd';
import amitabh from '../images/amitabh.jpg';
import amitabh1 from '../images/amitabh1.jpg';
import amitabh2 from '../images/amitabh2.jpg';
import amitabh3 from '../images/amitabh3.jpg';
import fanclubs from './fanclubs.css';
import Fanmembers from './Fanmembers.js';
import { Scrollbars } from 'react-custom-scrollbars';

const Option = Select.Option;
const Search = Input.Search;
const TabPane = Tabs.TabPane;

class FanClubsMembers extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      subCategories: [],
      allfanclubs: [],
      currentPage: 1,
      todosPerPage: 20,
      clubMembers: [],
      subCategoryId: '',
      fanclubid: '',
      inviteMember: ''
    }
    this.callback = this.callback.bind(this);
  }


  componentWillMount() {
    var user = JSON.parse(sessionStorage.getItem('user'));
    if (user.permissions !== '') {
      this.setState({ role: user.permissions.fanClubs })
    }
    this.setState({ fanclubid: this.props.fanclubid })
    this.getFanclubMember(this.props.fanclubid);
  }


  componentWillReceiveProps(nextProps) {
    this.setState({ fanclubid: nextProps.fanclubid })
    this.getFanclubMember(nextProps.fanclubid);
  }

  getFanclubMember = (FanclubId) => {
    var _this = this;
    var instance = axios.create({
      // timeout: 3000,
      headers: { 'x-access-token': sessionStorage.getItem('token') }
    });
    instance.get('/members/' + FanclubId).then((response) => {
      this.setState({ clubMembers: response.data.data.users });
      this.setState({ inviteMember: response.data.data.inviteMember });
    });

  }

  onChange(e) {

  }

  callback(id) {

  }
  acceptInvitation = (membermobilenumber, userid, loginType, fbid) => {
    var user = userid;
    var mobilenumber = membermobilenumber;
    var fanid = this.state.fanclubid;
    var _this = this;
    var data = {
      "fanClubId": this.state.fanclubid,
      "memberMobileNo": mobilenumber,
      "updatedStatus": 2,
      "userId": "999999999999999999999999",
      "fbId": fbid,
      "loginType": loginType
    }
    const url = process.env.REACT_APP_API_HOST + '/rest/updateFcMemberStatus';
    var request = new Request(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });

    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        if (response.statusCode === 1 && response.statusMessage === "Successfully Joined the Requested Member.") {
          message.success('Member has been joined successfully')
          _this.getFanclubMember(fanid)
        }
        else if (response.statusCode === 1 && response.statusMessage === "Successfully Joined the Idle Member.") {
          message.success('Member has been joined successfully')
          _this.getFanclubMember(fanid)
        } else if (response.statusCode === 0 && response.statusMessage === "your are not Owner of Fc") {
          message.error('You are not the owner of this fanclub')
        }
      });

  }
  makeAdmin = (membermobilenumber, userid, loginType, fbid) => {
    var user = userid;
    var mobilenumber = membermobilenumber;
    var fanid = this.state.fanclubid;
    var _this = this;
    var data = {
      "fanClubId": this.state.fanclubid,
      "memberMobileNo": mobilenumber,
      "updatedStatus": 8,
      "userId": "999999999999999999999999",
      "fbId": fbid,
      "loginType": loginType
    }
    const url = process.env.REACT_APP_API_HOST + '/rest/updateFcMemberStatus';
    var request = new Request(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });

    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        if (response.statusCode === 1 && response.statusMessage === "Successfully Made Admin") {
          message.success('Made Admin successfully')
          _this.getFanclubMember(fanid);
        }
        else if (response.statusCode === 0 && response.statusMessage === "your are not Owner of Fc") {
          message.error('You are not the owner of this fanclub')
        } else {

        }


      });
  }
  removeAdmin = (membermobilenumber, userid, loginType, fbid) => {
    var user = userid;
    var mobilenumber = membermobilenumber;
    var fanid = this.state.fanclubid;
    var _this = this;
    var data = {
      "fanClubId": this.state.fanclubid,
      "memberMobileNo": mobilenumber,
      "updatedStatus": 9,
      "userId": "999999999999999999999999",
      "fbId": fbid,
      "loginType": loginType
    }
    const url = process.env.REACT_APP_API_HOST + '/rest/updateFcMemberStatus';
    var request = new Request(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });

    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        if (response.statusCode === 1 && response.statusMessage === "Successfully Removed Admin") {
          message.success('Made Admin successfully')
          _this.getFanclubMember(fanid);
        }
        else if (response.statusCode === 0 && response.statusMessage === "your are not Owner of Fc") {
          message.error('You are not the owner of this fanclub')
        } else {

        }


      });
  }
  deleteInvitation = (membermobilenumber, userid, loginType, fbid) => {
    var user = userid;
    var mobilenumber = membermobilenumber;
    var fanid = this.state.fanclubid;
    var _this = this;
    var data = {
      "fanClubId": this.state.fanclubid,
      "memberMobileNo": mobilenumber,
      "updatedStatus": 7,
      "userId": "999999999999999999999999",
      "fbId": fbid,
      "loginType": loginType
    }
    const url = process.env.REACT_APP_API_HOST + '/rest/updateFcMemberStatus';
    var request = new Request(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });

    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        if (response.statusCode === 1 && response.statusMessage === "Successfully deleted the Invited member.") {
          message.success('Member deleted successfully')
          _this.getFanclubMember(fanid);
        }
        else if (response.statusCode === 1 && response.statusMessage === "Successfully deleted the Joined member from the FanClub.") {
          message.success('Member deleted successfully')
          _this.getFanclubMember(fanid);
        } else if (response.statusCode === 0 && response.statusMessage === "your are not Owner of Fc") {
          message.error('You are not the owner of this fanclub')
        } else if (response.statusCode === 1 && response.statusMessage === "Successfully deleted the Idle member.") {
          message.success('Member deleted successfully')
          _this.getFanclubMember(fanid);
        }


      });
  }
  idleUser = (membermobilenumber, userid, loginType, fbid) => {
    var user = userid;
    var mobilenumber = membermobilenumber;
    var fanid = this.state.fanclubid;
    var _this = this;
    var data = {
      "fanClubId": this.state.fanclubid,
      "memberMobileNo": mobilenumber,
      "updatedStatus": 6,
      "userId": "999999999999999999999999",
      "fbId": fbid,
      "loginType": loginType
    }
    const url = process.env.REACT_APP_API_HOST + '/rest/updateFcMemberStatus';
    var request = new Request(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });

    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        if (response.statusCode === 1 && response.statusMessage === "Successfully updated the Joined member status to Idle.") {
          message.success('Joined member status changed to idle successfully')
          _this.getFanclubMember(fanid);
        }
        else if (response.statusCode === 0 && response.statusMessage === "your are not Owner of Fc") {
          message.error('You are not the owner of this fanclub')
        }


      });

  }
  rejectInvitation = (membermobilenumber, userid, loginType, fbid) => {
    var user = userid;
    var mobilenumber = membermobilenumber;
    var fanid = this.state.fanclubid;
    var _this = this;
    var data = {
      "fanClubId": this.state.fanclubid,
      "memberMobileNo": mobilenumber,
      "updatedStatus": 5,
      "userId": "999999999999999999999999",
      "fbId": fbid,
      "loginType": loginType
    }
    const url = process.env.REACT_APP_API_HOST + '/rest/updateFcMemberStatus';
    var request = new Request(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });

    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        if (response.statusCode === 1 && response.statusMessage === "Successfully deleted the Requested member.") {
          message.success('Requested member deleted successfully')
          _this.getFanclubMember(fanid);
        }
        else if (response.statusCode === 0 && response.statusMessage === "your are not Owner of Fc") {
          message.error('You are not the owner of this fanclub')
        }
      });

  }

  render() {

    var renderTodos = [];
    for (let key in this.state.clubMembers) {
      var contest = this.state.clubMembers[key];

      if (contest.userId !== null) {
        renderTodos.push(<div className="ui card">
          <Col span={24} className="FanClubsVieMembers">
            <ul className="list-inline">
              <li> <Avatar src={contest.userId.profileImage}>{contest.userId.fullName.charAt(0)}</Avatar> </li>
              <li className="FanClubsViewMembersList">{contest.userId.fullName}
                <span className="FanClubsviewMembersAdmin">({contest.type})</span></li>
              {contest.status == 1 ? <div className="memberstatusButton"><Button className="statusBar"> Invited </Button>
                {this.state.role.feedDelete === true ? <Dropdown getPopupContainer={triggerNode => triggerNode.parentNode} overlay={<Menu>
                  <Menu.Item key="1"><span onClick={this.deleteInvitation.bind(this, contest.mobileNumber, contest.userId._id, contest.loginType, contest.fbId)}>Delete</span></Menu.Item>
                </Menu>} trigger={['click']}>
                  <a className="ant-dropdown-link" href="">
                    <span className="viewMoreIconfanclubs"><Icon type="ellipsis" /></span>
                  </a>
                </Dropdown> : null}</div> :
                (contest.status == 2 && (contest.type === "user" || contest.type === "secondAdmin")) ? <div className="memberstatusButton"> <Button className="statusBar"> Joined</Button>
                  {this.state.role.feedDelete === true ? <Dropdown getPopupContainer={triggerNode => triggerNode.parentNode} overlay={<Menu>
                    {contest.type === "user" ? <Menu.Item key="1" ><span onClick={this.idleUser.bind(this, contest.mobileNumber, contest.userId._id, contest.loginType, contest.fbId)}>Idle</span></Menu.Item> : ''
                    }
                    {contest.type === "user" ? <Menu.Item key="2"><span onClick={this.deleteInvitation.bind(this, contest.mobileNumber, contest.userId._id, contest.loginType, contest.fbId)}>Delete</span></Menu.Item> : ''}
                    {(this.state.inviteMember === 2 && contest.type === "user") ?
                      <Menu.Item key="3"><span onClick={this.makeAdmin.bind(this, contest.mobileNumber, contest.userId._id, contest.loginType, contest.fbId)}>make Admin</span></Menu.Item>
                      : ''
                    }
                    {contest.type === "secondAdmin" ?
                      <Menu.Item key="4"><span onClick={this.removeAdmin.bind(this, contest.mobileNumber, contest.userId._id, contest.loginType, contest.fbId)}>remove Admin</span></Menu.Item>
                      : ''
                    }

                  </Menu>} trigger={['click']}>
                    <a className="ant-dropdown-link" href="">
                      <span className="viewMoreIconfanclubs"><Icon type="ellipsis" /></span>
                    </a>
                  </Dropdown> : null} </div> :
                  contest.status == 4 ? <div className="memberstatusButton"> <Button className="statusBar"> Requested </Button>
                    {this.state.role.feedDelete === true ? <Dropdown getPopupContainer={triggerNode => triggerNode.parentNode} overlay={<Menu>
                      <Menu.Item key="1" ><span onClick={this.acceptInvitation.bind(this, contest.mobileNumber, contest.userId._id, contest.loginType, contest.fbId)}>Accept</span></Menu.Item>
                      <Menu.Item key="2"><span onClick={this.rejectInvitation.bind(this, contest.mobileNumber, contest.userId._id, contest.loginType, contest.fbId)}>Reject</span></Menu.Item>
                    </Menu>} trigger={['click']}>
                      <a className="ant-dropdown-link" href="">
                        <span className="viewMoreIconfanclubs"><Icon type="ellipsis" /></span>
                      </a>
                    </Dropdown> : null} </div> :
                    contest.status == 5 ? <div className="memberstatusButton"><Button className="statusBar"> Rejected</Button>
                      {this.state.role.feedDelete === true ? <Dropdown getPopupContainer={triggerNode => triggerNode.parentNode} overlay={<Menu>
                        <Menu.Item key="1" ><span onClick={this.deleteInvitation.bind(this, contest.mobileNumber, contest.userId._id, contest.loginType, contest.fbId)}>Delete</span></Menu.Item>
                      </Menu>} trigger={['click']}>
                        <a className="ant-dropdown-link" href="">
                          <span className="viewMoreIconfanclubs"><Icon type="ellipsis" /></span>
                        </a>
                      </Dropdown> : null}</div> :
                      contest.status == 6 ? <div className="memberstatusButton"><Button > Idle </Button>
                        {this.state.role.feedDelete === true ? <Dropdown getPopupContainer={triggerNode => triggerNode.parentNode} overlay={<Menu>
                          <Menu.Item key="1" ><span onClick={this.deleteInvitation.bind(this, contest.mobileNumber, contest.userId._id, contest.loginType, contest.fbId)}>Delete</span></Menu.Item>
                          <Menu.Item key="2" ><span onClick={this.acceptInvitation.bind(this, contest.mobileNumber, contest.userId._id, contest.loginType, contest.fbId)}>Join</span></Menu.Item>
                        </Menu>} trigger={['click']}>
                          <a className="ant-dropdown-link" href="">
                            <span className="viewMoreIconfanclubs"><Icon type="ellipsis" /></span>
                          </a>
                        </Dropdown> : null}</div> : ''
              }
            </ul>
          </Col>
        </div>);
      }
    }
    return (
      <div>
        {renderTodos}
      </div>

    );
  };
}


export default FanClubsMembers;
/* eslint-disable */