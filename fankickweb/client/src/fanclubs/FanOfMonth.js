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

class FanOfMonth extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      subCategories: [],
      allfanclubs: [],
      currentPage: 1,
      todosPerPage: 20,
      fanofmonth: [],
      subCategoryId: '',
      clubAdminId:''
    }
    //this.handleOk = this.handleOk.bind(this);
    // this.bindSubCategories = this.bindSubCategories.bind(this);
    // this.onCategoryChange = this.onCategoryChange.bind(this);
    // this.onsubCategoryChange = this.onsubCategoryChange.bind(this);
    this.callback = this.callback.bind(this);
  }


  componentDidMount() {
    this.getFanOfMonth(this.props.fanclubid);
  }


  getFanOfMonth = (FanclubId) => {
    
   //const memberId = this.state.clubAdminId;
    var instance = axios.create({
      // timeout: 3000,
      headers: { 'x-access-token': sessionStorage.getItem('token') }
    });
    var url = process.env.REACT_APP_API_HOST+'/rest/getfanOfTheMonth?&offset=0&limit=2';
    instance.get(url).then((response) => {    
      this.setState({ fanofmonth: response.data.data });
      
    });

  }
  componentWillReceiveProps(nextProps) {
    this.getFanOfMonth(nextProps.fanclubid);
  }

  onChange(e) {
  
  }

  callback(id) {
  
  }

  render() {
    const data = clone(this.state.fanofmonth);
    const renderTodos = data.map((contest, index) => {
      return <div className="ui card">
         <Col span={24} style={{ margin: '5px auto', padding: 10, borderBottom: '1px solid #f0f0f0' }}>
          <ul className="list-inline">
            <li><Avatar src={contest.userId.profileImage}>U</Avatar></li>
            <li>{contest.userId.fullName} <span style={{ color: 'red' }}>({contest.type})</span></li>
          </ul>
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


export default FanOfMonth;
/* eslint-disable */