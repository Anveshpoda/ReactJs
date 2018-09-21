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
import amitabh from '../images/amitabh.jpg';
import amitabh1 from '../images/amitabh1.jpg';
import amitabh2 from '../images/amitabh2.jpg';
import amitabh3 from '../images/amitabh3.jpg';
import fanclubs from './fanclubs.css';
import { Scrollbars } from 'react-custom-scrollbars';

const Option = Select.Option;
const Search = Input.Search;
const TabPane = Tabs.TabPane;


class FanClubsInfo extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      subCategories: [],
      allfanclubs: [],
      currentPage: 1,
      todosPerPage: 20,
      clubInfo: [],
      subCategoryId: '',
      clubid: ''
    }
    //this.handleOk = this.handleOk.bind(this);
    // this.bindSubCategories = this.bindSubCategories.bind(this);
    // this.onCategoryChange = this.onCategoryChange.bind(this);
    // this.onsubCategoryChange = this.onsubCategoryChange.bind(this);
    this.callback = this.callback.bind(this);
  }


  componentDidMount() {
   
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ clubid: nextProps.fanclubid });
  this.getFanclubinfo(nextProps.fanclubid);
  }  
getFanclubinfo = (fanclubid) => {
  if (this.state.clubid != '') {
    var instance = axios.create({
      // timeout: 3000,
      headers: { 'x-access-token': sessionStorage.getItem('token') }
    });
    instance.get('/info/' + fanclubid).then((response) => {
      this.setState({ clubInfo: response.data.data });
    });
  }
}
  onChange(e) {
   
  }

  callback(id) {
   
  }

  render() {
    const data = clone(this.state.clubInfo);
    const renderTodos = data.map((contest, index) => { 
      return <div className="ui card">
        <Col span={24} className="FanClubsInfos">
          <Col span={4}>
            <img src={contest.imageUrl} alt="Contestcover" className="img-responsive" style={{ height: '100px', width: ' 100%' }} />
          </Col>
          <Col span={11} className="FanClubsInfoDetails">
          <p className="FanClubsViewDetailsInfosubtitle1"><span>{moment(contest.datetime).format('DD-MM-YYYY @hh:mm a')}</span></p>
            {/* <p><span>{contest.datetime}</span></p> */}
            <h4 className="FanClubsViewDetailsInfotitle">{contest.fanclubName.toUpperCase()}</h4>
            <p className="FanClubsViewDetailsInfosubtitlel">{contest.locationName.toUpperCase()}</p>
            <p className="FanClubsViewDetailsInfosubtitlem">{contest.membersCount} Members</p>
            
          </Col>
          <Col span={8}>
            {/* <ul className="list-inline" style={{ float: 'right' }}>
              <li style={{ paddingLeft: 20 }}><Icon type="heart-o" /> <span>23K</span></li>
              <li style={{ paddingLeft: 20 }}><Icon type="message" /> <span>43K</span></li>
              <li style={{ paddingLeft: 20, color:"orange", fontWeight:"bold", fontSize:15  }}><Icon type="share-alt" /> </li>              
            </ul>        
            */}
          </Col>
        <h4 className="FanClubsInfoDetailName">{contest.category.categoryName}</h4>
        </Col>
        <Col span={24} className="FanClubsInfoDetailDescription">
          <h4 className="FanClubsViewDetailsInfotitle2">Description</h4>
          
          <p className="FanClubsViewDetailsInfosubtitle2">{contest.description}</p>
        
        </Col>
        <Col span={24} className="FanClubsInfoDetailCreatedBy">
         <h4 className="FanClubsViewDetailsInfotitle2">Created By</h4>
          <ul className="list-inline">
           
            <li><Avatar src={contest.userImageUrl}>{contest.createdBy.charAt(0)}</Avatar></li>
           <li className="FanClubsViewDetailsInfoCreatedBy">{contest.createdBy}</li>
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


export default FanClubsInfo;
/* eslint-disable */