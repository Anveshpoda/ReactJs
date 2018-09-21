/* eslint-disable */
import React from 'react';
import axios from 'axios';
import clone from 'clone';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import $ from "jquery";
import { Link } from 'react-router';
import Dashboard from '../Dashboard/Dashboard';
import { Col, Form, Icon, Input, Button, Checkbox, Tabs, Select, Card, Avatar, Alert, Spin } from 'antd';
import amitabh from '../images/amitabh.jpg';
import amitabh1 from '../images/amitabh1.jpg';
import amitabh2 from '../images/amitabh2.jpg';
import amitabh3 from '../images/amitabh3.jpg';
import fanclubs from './fanclubs.css';
import moment from 'moment';
import { Scrollbars } from 'react-custom-scrollbars';

const Option = Select.Option;
const Search = Input.Search;
const TabPane = Tabs.TabPane;

class FanClubsEvents extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      subCategories: [],
      allfanclubs: [],
      currentPage: 1,
      todosPerPage: 20,
      clubEvents: [],
      subCategoryId: ''
    }
    //this.handleOk = this.handleOk.bind(this);
    // this.bindSubCategories = this.bindSubCategories.bind(this);
    // this.onCategoryChange = this.onCategoryChange.bind(this);
    // this.onsubCategoryChange = this.onsubCategoryChange.bind(this);
    this.callback = this.callback.bind(this);
  }


  componentWillMount() {
    this.getFanclubEvents(this.props.fanclubid);
  }
  componentWillReceiveProps(nextProps) {
    this.getFanclubEvents(nextProps.fanclubid);
  }
  getFanclubEvents = (FanclubId) => {
    var instance = axios.create({
      // timeout: 3000,
      headers: { 'x-access-token': sessionStorage.getItem('token') }
    });
    instance.get('/events/' + FanclubId).then((response) => {
      this.setState({ clubEvents: response.data.data });
    });
  }

  onChange(e) {
  }

  callback(id) {
  }

  render() {
    const data = clone(this.state.clubEvents);
    if (data.length === 0) {
      var container = (
        <Alert
          message="No Events"
          description="There are no Events to display."
          type="info"
        />
      )
    }
    const renderTodos = data.map((contest, index) => {
      return (<div className="ui card">
        <Col span={24} className="borderBox" style={{}}>

          <Col span={3}>
            <img src={contest.eventImageUrl} alt="contestcover"  className="FanclubEvent-image"/>
          </Col>
          <Col span={15} className="fanclubEventsDetailsh">
            <h3 className="mrgnBottom12" >{contest.eventTitle}</h3>
            <p className="mrgnBottom12"><span><Icon type="clock-circle" /></span> :-{moment(contest.eventStartDateTime).format('DD/MM/YYYY hh:mm a')} - {moment(contest.eventEndDateTime).format('DD/MM/YYYY hh:mm a')}</p>
            <p><span><Icon type="environment" /></span> :{contest.eventLocation}</p>
          </Col>
          <Col span={5} className="rightBlock">
            <h3 className="FanClubEventCreate">Created By</h3>
            <ul className="list-inline">
              <li><Avatar src={contest.userId.profileImage}>{contest.userId.fullName.charAt(0)}</Avatar></li>

              <li>{contest.userId.fullName}</li>
            </ul>
          </Col>
        </Col>



      </div>)
    });

    return (
      <div>
        {renderTodos}
        <div className="faneventspin">
        <div  className="fanclunbeventfunspin">
          {container}
          </div>

        </div>
      </div>

    );
  };
}


export default FanClubsEvents;
/* eslint-disable */