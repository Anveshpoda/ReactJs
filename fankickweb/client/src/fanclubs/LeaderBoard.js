/* eslint-disable */
import React from 'react';
import axios from 'axios';
import clone from 'clone';
import moment from 'moment';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import $ from "jquery";
import { Link } from 'react-router';
import Dashboard from '../Dashboard/Dashboard';
import { Col, Form, Icon, Input, Button, Checkbox, Tabs, Select, Card, Avatar } from 'antd';
import fanclubs from './fanclubs.css';
import Agnathavasi from './Agnathavasi.jpg';


import { Scrollbars } from 'react-custom-scrollbars';

const Option = Select.Option;
const Search = Input.Search;
const TabPane = Tabs.TabPane;


class LeaderBoard extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      subCategories: [],
      allfanclubs: [],
      currentPage: 1,
      todosPerPage: 20,
      leaderBoardList: [],
      subCategoryId: '',
      clubAdminId: ''
    }
    //this.handleOk = this.handleOk.bind(this);
    // this.bindSubCategories = this.bindSubCategories.bind(this);
    // this.onCategoryChange = this.onCategoryChange.bind(this);
    // this.onsubCategoryChange = this.onsubCategoryChange.bind(this);
    this.callback = this.callback.bind(this);
  }


  componentDidMount() {
    this.getFanclubMember(this.props.fanclubid);
  }

  componentWillReceiveProps(nextProps) {
    this.getFanclubMember(nextProps.fanclubid);
  }
  getFanclubMember = (FanclubId) => {
    var memberId = '';
    var instance = axios.create({
      // timeout: 3000,
      headers: { 'x-access-token': sessionStorage.getItem('token') }
    });
    instance.get('/members/' + FanclubId).then((response) => {
      // this.setState({ leaderBoardList: response.data.data.users });
      this.setState({ clubAdminId: response.data.data.users[0].userId._id });
      memberId = response.data.data.users[0].userId._id;
      this.getLeaderBoard(FanclubId, memberId);
    });

  }


  getLeaderBoard = (FanclubId, memberId) => {

    //const memberId = this.state.clubAdminId;
    var instance = axios.create({
      // timeout: 3000,
      headers: { 'x-access-token': sessionStorage.getItem('token') }
    });
    var url = process.env.REACT_APP_API_HOST + '/rest/getLeaderBoardDetails?fanClubId=' + FanclubId + '&userId=' + memberId + '&offset=0&limit=10';
    instance.get(url).then((response) => {
      this.setState({ leaderBoardList: response.data.data });

    });



  }

  onChange(e) {

  }

  callback(id) {

  }

  render() {
    const data = clone(this.state.leaderBoardList);
    const renderTodos = data.map((contest, index) => {
      return <div className="ui card">
        <Col span={24} className="fanClubsLeaderboard">
          <Col span={1} >
            {/* <Avatar src={contest.userImageUrl}>U</Avatar> */}
            <Avatar src={contest.userImageUrl}>{contest.userName.charAt(0)}</Avatar>
          </Col>
          <Col span={12} >
            <p className="fanClubsLeaderContestUserName"> {contest.userName} </p>
          </Col>
          <Col span={4} >
            <p className="fanClubsLeaderContestPoints"><span className="fanClubsLeaderContestPointsmain">{contest.points} </span><span className="FanclubsLeaderBoardCoins"> Coins</span></p>
          </Col>
          <Col span={4} >
            <p className="fanClubsLeaderContestCount">{index + 1}</p>
          </Col>

        </Col>
      </div>;
    });

    return (
      <div>

        {renderTodos}
      </div>
    );
  };
}


export default LeaderBoard;
/* eslint-disable */