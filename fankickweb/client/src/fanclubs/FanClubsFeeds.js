/* eslint-disable */
import React from 'react';
import axios from 'axios';
import clone from 'clone';
import moment from 'moment';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import $ from "jquery";
import { Link } from 'react-router';
import viewMore from '../images/icons/view-more.png';
import Dashboard from '../Dashboard/Dashboard';
import ReactPlayer from 'react-player';
import { Col, Form, Icon, Input, Button, Checkbox, Tabs, Select, Card, Avatar, Menu, Dropdown, Alert, Spin, message, Modal } from 'antd';
import fanclubs from './fanclubs.css';
import Agnathavasi from './Agnathavasi.jpg';
import Comment from './Comment.js';
const Option = Select.Option;
const Search = Input.Search;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

class FanClubsFeeds extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      subCategories: [],
      allfanclubs: [],
      clubFeeds: [],
      subCategoryId: '',
      fanclubid: '',
      comments: '',
      visible: false,
      fanclubid: '',
      replymodelvisible: false,
      commentfeedid: '',
      comment: '',
      errors: {},
      role:'',
      cont:[]
    }
    this.callback = this.callback.bind(this);
    this.getFanclubFeeds = this.getFanclubFeeds.bind(this);
  }


  componentWillMount() {
    var user = JSON.parse(sessionStorage.getItem('user'));
    
     if (user.permissions !== '') {
       
       this.setState({ role: user.permissions.fanClubs })
     }
    this.setState({ fanclubid: this.props.fanclubid });
    this.setState({ clubFeeds: this.props.feedList });
    this.getFanclubFeeds(this.props.fanclubid);
  }

  getFanclubFeeds = (FanclubId) => {
    //var FanclubId = this.props.fanclubid;
    var _this = this;
    var instance = axios.create({
      // timeout: 3000,
      headers: { 'x-access-token': sessionStorage.getItem('token') }
    });
    instance.get('/feeds/' + FanclubId).then((response) => {
      // this.setState({ clubFeeds: response.data.data });
      _this.setState({ cont: response.data.data });
     
    });
  }

  onChange(e) {
  }

  callback(id) {
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ fanclubid: nextProps.fanclubid });
    this.getFanclubFeeds(nextProps.fanclubid);
    this.setState({ clubFeeds: nextProps.feedList });
  }

  deleteFeed = (feed, e) => {
    var _this = this;
    var feedId = feed._id;
    var userId = feed.createdUser._id;
    var fanclubId = feed.fanClubId._id;
    let data = {
      feedId: feed._id,
      userId: feed.createdUser._id,
      fanClubId: feed.fanClubId._id
    }


    axios.post(process.env.REACT_APP_API_HOST + '/rest/deleteFcNewsFeed', data).then(function (response) {
      if (response.status === 200) {
        message.success('Feed deleted successfully', 2);
        _this.getFanclubFeeds(feed.fanClubId._id);
      } else {
        message.error(`Feed not deleted`, 2);
      }
    })
  }

  replyModal = (e) => {
    var id = e.target.id;
    var _this = this;
    this.setState({ replymodelvisible: true, commentfeedid: id });
    _this.setState({ errors: {} })
  }

  handlereplyCancel = (e) => {
    var _this = this;
    this.setState({ replymodelvisible: false });
    _this.setState({ errors: {} });
  }
  replyFeed = () => {
    let errors = {};
    if (this.state.comment === '') errors.comment = 'Comment is Required';
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      var _this = this;
      var fanclubid = this.state.fanclubid
      var data = {
        userId: "999999999999999999999999",
        feedId: this.state.commentfeedid,
        comment: this.state.comment,
        parentId: "000000000000000000000000"
      }
      const url = process.env.REACT_APP_API_HOST + '/rest/commentFeed';
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
          if (response.statusCode === 1) {
            _this.getFanclubFeeds(fanclubid);
            message.success("comment posted")
            _this.setState({ replymodelvisible: false, comment: '' });
          }
          else if ((response.statusCode === 0) && (response.statusMessage === "No User found")) {
            message.error("You must join this Fan Club")
            _this.setState({ replymodelvisible: false, comment: '' });

          }
        });
    }
  }
  commentChange = (e) => {
    if (this.state[e.target.name]=== '') this.state.errors.comment = ''
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    var fanclubid = this.state.fanclubid;
    const data = clone(this.state.cont);
    if (data.length === 0) {
      var container = (
        <Alert
          message="No Feeds"
          description="There are no Feeds to display."
          type="info"
        />
      )
    }
    var feed = this.state.cont;
    var arr = [];
    var count = []
    for (var i = 0; i < feed.length; i++) {
        for (var j = 0; j < feed[i].comments.length; j++) {
          if (feed[i].isDeleted === false && feed[i].comments[j].isDeleted === false) {
            arr.push(feed[i].comments[j]);
        }
      }
      count.push(arr.length);
      arr = [];
    }
    const renderTodos = data.map((contest, index) => {
      var likes;
      
      if (contest.likes.length == 0) {
        likes = 0;
      } else {
        likes = contest.likes.length;
      }

      if (contest.type === "text" && contest.isDeleted === false) {
        return (<div className="ui card card FanclubsFeedsmain">

          <Col span={22} className="FanclubsFeedsmain1">
            <Col span={1}>
              <Avatar src={contest.createdUser.profileImage}>{contest.createdUser.fullName.charAt(0)}</Avatar>
            </Col>
            <Col span={9} className="FanClubsFeedsNameDate">
              <h4 className="FanClubsFeedsUser">{contest.createdUser.fullName}</h4>
              <p className="FanClubsFeedsCreateDate">{moment(contest.createdDateTime).format('DD-MM-YYYY HH:mm a')}</p>
            </Col>

          </Col>

          <Col span={22} className="FanClubsFeedsDescription">
            <h4 className="FanClubsFeedsDescriptiontitle">{contest.description}</h4>
          </Col>

          {/* <Col span={20} style={{ padding: 10 }}>
          <Col span={12} style={{ padding: 10 }}>
            <img src={Agnathavasi} className="img-responsive" />
          </Col>
        </Col> */}
          <Col span={20}>
            <Col span={10} className="FanclubsFeedIcons">
              <ul className="list-inline rates">
                <li className="FanclubsFeedIconsh"><Icon type="heart-o" /><span>  {likes}</span></li>
                <li className="FanclubsFeedIconsh FanclubsFeedIconshs"><Icon type="message" /><span className="FanclubsFeedMessageCount">{count[index]}</span></li>
                {/*  <li style={{ padding: 10, color: "orange", fontWeight: "bold", fontSize: 15 }}><Icon type="share-alt" /><span> {likes}</span></li>
                <li style={{ padding: 10 }}><Icon type="share-alt" /><br /><span>123K</span></li> */}
              </ul>

            </Col>
          </Col>


          {/* <Col span={22} style={{ margin: '5px auto', padding: 10, borderBottom: '1px solid #f0f0f0' }}>
          <ul className="list-inline">
            <li><Avatar src={contest.userId.profileImage}>U</Avatar></li>
            <li>{contest.userId.fullName} <span style={{ color: 'red' }}>({contest.type})</span></li>
          </ul>
        </Col> */}
          <div className="borderTOPNone">
            <ul className="list-inline">
              {/* <li><b>Status: {couponStatus}</b></li> */}
              <li className="floatRight">
              {this.state.role.feedDelete === true || this.state.role.feedReply === true
              ?   <Dropdown getPopupContainer={triggerNode => triggerNode.parentNode} overlay={<Menu>
                  {this.state.role.feedDelete === true ?
                  <Menu.Item key="1">
                    <span id={contest._id} onClick={this.deleteFeed.bind(this, contest)} >Delete</span>
                  </Menu.Item>:null}
                  {this.state.role.feedReply === true ?
                  <Menu.Item key="2">
                    <span id={contest._id} onClick={this.replyModal.bind(this)}>Comment</span>
                  </Menu.Item>
                  :null}
                  {/* <Menu.Item key="3">
                    <span id={contest._id} name={contest._id} onClick={this.showModal}>Report Spam</span>
                  </Menu.Item> */}
                </Menu>} trigger={['click']}>
                  <a className="ant-dropdown-link" href="#">
                    <img src={viewMore} alt="Contestcover" style={{ width: 16 }} />
                  </a>
                </Dropdown> : null}    
              </li>
            </ul>
          </div>

          <Col span={24} style={{ padding: 5 }}>
            <hr className="hrcolor" />
          </Col>
        </div>)
      }
      else if (contest.type === "image"  && contest.isDeleted === false) {
        return (<div className="ui card FanclubsFeedsmain">

          <Col span={22} className="FanclubsFeedsmain1">
            <Col span={1}>
              <Avatar src={contest.createdUser.profileImage}>{contest.createdUser.fullName.charAt(0)}</Avatar>
            </Col>
            <Col span={9} className="FanClubsFeedsNameDate">
              <h4 className="FanClubsFeedsUser">{contest.createdUser.fullName}</h4>
              <p className="FanClubsFeedsCreateDate">{moment(contest.createdDateTime).format('DD-MM-YYYY HH:mm a')}</p>
            </Col>
          </Col>

          {/* <Col span={22} style={{ padding: 10 }}>
            <h4>{contest.feedUrl}</h4>
          </Col> */}

          <Col span={20} className="FanClubsFeedsDescription">
            {/* <Col span={12} style={{ padding: 10 }}>
              <img src={contest.thumbnail} className="img-responsive" />
            </Col> */}
            {contest.description ? <h4 className="margnBtm10 FanClubsFeedsDescriptiontitle">{contest.description}</h4> : null}
            <Col span={6}>
              <img src={contest.feedUrl} alt="contestfeedcover" className="img-responsive" className="img-responsive" style={{ height: '120px', width: ' 100%' }} />
            </Col>
            {/* <Col span={12} style={{ padding: 10 }}>
              <img src={contest.feedUrl} className="img-responsive" />
            </Col> */}
          </Col>
          <Col span={20}>
            <Col span={10} className="FanclubsFeedIcons">
              <ul className="list-inline rates">
                <li className="FanclubsFeedIconsh"><Icon type="heart-o" /><span>  {likes}</span></li>
                <li className="FanclubsFeedIconsh FanclubsFeedIconshs"><Icon type="message" /><span className="FanclubsFeedMessageCount">{count[index]}</span></li>
                {/* <li style={{ padding: 10, color: "orange", fontWeight: "bold", fontSize: 15 }}><Icon type="share-alt" /><span>{likes}</span></li>
               <li style={{ padding: 10 }}><Icon type="share-alt" /><br /><span>123K</span></li> */}
              </ul>

            </Col>
          </Col>

          <div className="borderTOPNone">
            <ul className="list-inline">
              {/* <li><b>Status: {couponStatus}</b></li> */}
              <li className="floatRight">
              {this.state.role.feedDelete === true || this.state.role.feedReply === true
              ?     <Dropdown getPopupContainer={triggerNode => triggerNode.parentNode} overlay={<Menu>
                  {this.state.role.feedDelete === true ?
                  <Menu.Item key="1">
                    {/* <span id={contest._id+','+contest.createdUser._id+','+contest.fanClubId._id} name={contest.createdUser._id} value={contest.fanClubId._id}  onClick={this.deleteFeed.bind(this)} >Delete</span> */}
                    <span id={contest._id} onClick={this.deleteFeed.bind(this, contest)} >Delete</span>
                  </Menu.Item>:null}
                  {this.state.role.feedReply === true ?
                  <Menu.Item key="2">
                    <span id={contest._id} onClick={this.replyModal.bind(this)}>Comment</span>
                  </Menu.Item>:null}
                  {/* <Menu.Item key="3">
                    <span id={contest._id} name={contest._id} onClick={this.showModal}>Report Spam</span>
                  </Menu.Item> */}
                </Menu>} trigger={['click']}>
                  <a className="ant-dropdown-link" href="#">
                    <img src={viewMore} style={{ width: 16 }} />
                  </a>
                </Dropdown> : null}
              </li>
            </ul>

          </div>

          <Col span={24} style={{ padding: 5 }}>
            <hr className="hrcolor" />
          </Col>

        </div>)
      } else if (contest.type === "video"  && contest.isDeleted === false) {
        return (<div className="ui card FanclubsFeedsmain">

          <Col span={22} className="FanclubsFeedsmain1">
            <Col span={1}>
              <Avatar src={contest.createdUser.profileImage}>{contest.createdUser.fullName.charAt(0)}</Avatar>
            </Col>
            <Col span={9} className="FanClubsFeedsNameDate">
              <h4 className="FanClubsFeedsUser">{contest.createdUser.fullName}</h4>
              <p className="FanClubsFeedsCreateDate">{moment(contest.createdDateTime).format('DD-MM-YYYY HH:mm a')}</p>
            </Col>
          </Col>

          {/* <Col span={22} style={{ padding: 10 }}>
            <h4>{contest.feedUrl}</h4>
          </Col> */}

          <Col span={20} className="FanClubsFeedsDescription">
            {/* <Col span={12} style={{ padding: 10 }}>
              <img src={contest.thumbnail} className="img-responsive" />
            </Col> */}
            {contest.description ? <h4 className="margnBtm10 FanClubsFeedsDescriptiontitle">{contest.description}</h4> : null}
            <Col span={6}>
              <ReactPlayer width="100%" height="150px" config={{ youtube: { playerVars: { showinfo: 1 } } }} url={'https://www.youtube.com/watch?v=' + contest.feedUrl}
                playing={false} controls />
            </Col>
            {/* <Col span={12} style={{ padding: 10 }}>
              <img src={contest.feedUrl} className="img-responsive" />
            </Col> */}
          </Col>
          <Col span={20}>
            <Col span={10} className="FanclubsFeedIcons">
              <ul className="list-inline rates">
                <li className="FanclubsFeedIconsh"><Icon type="heart-o" /><span>  {likes}</span></li>
                <li className="FanclubsFeedIconsh FanclubsFeedIconshs"><Icon type="message" /><span className="FanclubsFeedMessageCount">{count[index]}</span></li>
                {/* <li style={{ padding: 10, color: "orange", fontWeight: "bold", fontSize: 15 }}><Icon type="share-alt" /><span>{likes}</span></li>
               <li style={{ padding: 10 }}><Icon type="share-alt" /><br /><span>123K</span></li> */}
              </ul>

            </Col>
          </Col>

          <div className="borderTOPNone">
            <ul className="list-inline">
              {/* <li><b>Status: {couponStatus}</b></li> */}
              <li className="floatRight">
              {this.state.role.feedDelete === true || this.state.role.feedReply === true
              ?     <Dropdown getPopupContainer={triggerNode => triggerNode.parentNode} overlay={<Menu>
                  {this.state.role.feedDelete === true ?
                  <Menu.Item key="1">
                    {/* <span id={contest._id+','+contest.createdUser._id+','+contest.fanClubId._id} name={contest.createdUser._id} value={contest.fanClubId._id}  onClick={this.deleteFeed.bind(this)} >Delete</span> */}
                    <span id={contest._id} onClick={this.deleteFeed.bind(this, contest)} >Delete</span>
                  </Menu.Item>:null}
                  {this.state.role.feedReply === true ?
                  <Menu.Item key="2">
                    <span id={contest._id} onClick={this.replyModal.bind(this)}>Comment</span>
                  </Menu.Item>:null}
                  {/* <Menu.Item key="3">
                    <span id={contest._id} name={contest._id} onClick={this.showModal}>Report Spam</span>
                  </Menu.Item> */}
                </Menu>} trigger={['click']}>
                  <a className="ant-dropdown-link" href="#">
                    <img src={viewMore} style={{ width: 16 }} />
                  </a>
                </Dropdown> : null}
              </li>
            </ul>

          </div>

          <Col span={24} style={{ padding: 5 }}>
            <hr className="hrcolor" />
          </Col>

        </div>)
      }


    });

    return (
      <div>
        <div>
          {renderTodos}
        </div>

        <div className="fancfeed fanclubfeedspins">
          <div style={{ paddingTop: '20%' }} className="fanclubfeedspinfunSpin">
            {container}
          </div>
        </div>
        <Modal
          className="replyFeed"
          title="Comment for Feed"
          visible={this.state.replymodelvisible}
          onCancel={this.handlereplyCancel}
          footer={null}
        >
          <Col>
            <FormItem>
              <Input type="text" value={this.state.comment} name="comment" onChange={this.commentChange.bind(this)} />
              <span style={{ color: "red" }}>{this.state.errors.comment}</span>
            </FormItem>
          </Col>
          <FormItem >
            <Button onClick={this.replyFeed.bind(this)}>Post </Button>
            <Button onClick={this.handlereplyCancel} className="margnLeft20">Cancel </Button>

          </FormItem>
        </Modal>
      </div>
    );
  };
}


export default FanClubsFeeds;
/* eslint-disable */