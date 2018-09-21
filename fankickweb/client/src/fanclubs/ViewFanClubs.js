/* eslint-disable */
import React from 'react';
import axios from 'axios';
import clone from 'clone';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import moment from 'moment';
import $ from "jquery";
import { Link } from 'react-router';
import Dashboard from '../Dashboard/Dashboard';
import { Col, Form, Icon, Dropdown, Menu, Slider, Input, Button, Checkbox, Tabs, Select, Card, Avatar, Alert, Popover } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import amitabh from '../images/amitabh.jpg';
import amitabh1 from '../images/amitabh1.jpg';
import amitabh2 from '../images/amitabh2.jpg';
import amitabh3 from '../images/amitabh3.jpg';
import fanclubs from './fanclubs.css';
import FanClubsMembers from './FanClubsMembers';
import FanClubsFeeds from './FanClubsFeeds';
import FanClubsEvents from './FanClubsEvents';
import FanClubsInfo from './FanClubsInfo';
import LeaderBoard from './LeaderBoard';
import FanOfMonth from './FanOfMonth';
import Comment from './Comment.js';
import Fanmembers from './Fanmembers.js';

const Option = Select.Option;
const Search = Input.Search;
const TabPane = Tabs.TabPane;
function callback(key) {

}
function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}
function onChange(value) {
  console.log('onChange: ', value);
}

function onAfterChange(value) {
  console.log('onAfterChange: ', value);
}

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}
class ViewFanClubs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      subCategories: [],
      allfanclubs: [],
      currentPage: 1,
      todosPerPage: 20,
      club: [],
      subCategoryId: '',
      cel: '',
      clubId: '',
      clubinfo: '',
      clubinfoDate: '',
      clubinfoCel: '',
      clubinfoCategory: '',
      clubinfoCreatedBy: '',
      clubinfoCount: '',
      clubinfoImgUrl: '',
      clubinfoId: '',
      publicOrPrivate: '',
      keyactive: '1',
      clubs: [],
      publickey: "",
      search: '',
      clubFeeds: [],
      cont: [],
      role: '',
      activeItem: -1
    }
    this.getfanclubinfo = this.getfanclubinfo.bind(this);
    this.callback = this.callback.bind(this);
    this.publicFanclubs = this.publicFanclubs.bind(this);
    this.privateFanclubs = this.privateFanclubs.bind(this);
    this.publicprivateChange = this.publicprivateChange.bind(this);
    this.disableTab = this.disableTab.bind(this)
  }

  disableTab(event) {
    if (event.keyCode === 0 || event.keyCode === 9) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.disableTab, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.disableTab, false);
  }
  componentWillMount() {

    var user = JSON.parse(sessionStorage.getItem('user'));

    if (user.permissions !== '') {

      this.setState({ role: user.permissions.fanClubs })
    }
    this.getFanclub();
    this.getCategories();
  }
  publicprivateChange = (key) => {
    this.setState({ publickey: key });
    if (key === "Public") {
      this.publicFanclubs();
    } else if (key === "Private") {
      this.privateFanclubs();
    }
  }
  getCategories = () => {
    var instance = axios.create({
      headers: { 'x-access-token': sessionStorage.getItem('token') }
    });
    instance.get('/categories').then((response) => {
      this.setState({ categories: response.data.data });
    });
  }
  publicFanclubs = () => {
    var _this = this;
    var publicClub = [];
    for (let key in this.state.clubs) {
      var contest = this.state.clubs[key];
      var clubs = this.state.clubs;
      if (contest.publicOrPrivate == false) {
        publicClub.push(contest);
      }
    }
    this.setState({ club: '' });
    this.setState({ club: publicClub });
    if (isEmpty(publicClub)) {

    } else {
      this.setState({ clubinfoId: publicClub[0].fanclubId })
    }
  }
  privateFanclubs = () => {
    var _this = this;
    var privateClub = [];

    for (let key in this.state.clubs) {
      var contest = this.state.clubs[key];
      var clubs = this.state.clubs;
      if (contest.publicOrPrivate == true) {
        privateClub.push(contest);

      }
    }
    this.setState({ club: '' });
    this.setState({ club: privateClub })
    if (isEmpty(privateClub)) {

    } else {
      this.setState({ clubinfoId: privateClub[0].fanclubId })
    }
  }
  getFanclub = () => {
    var celebrityName = this.props.params.celebrityName;
    this.setState({ cel: celebrityName });
    var instance = axios.create({
      // timeout: 3000,
      headers: { 'x-access-token': sessionStorage.getItem('token') }
    });
    instance.get('/fanclubsByCeleb/' + celebrityName).then((response) => {
      this.setState({ club: response.data.data, clubs: response.data.data });
      this.setState({ clubId: response.data.data[0].fanclubId });
      //this.setState({ clubinfo: response.data.data[0] });
      this.getfanclubinfo(response.data.data[0].fanclubId);
    });
  }



  getfanclubinfo(clubId) {
    var instance = axios.create({
      headers: { 'x-access-token': sessionStorage.getItem('token') }
    });
    instance.get('/info/' + clubId).then((response) => {
      this.setState({ clubinfo: response.data.data });
      this.setState({ clubinfoDate: response.data.data[0].datetime });
      this.setState({ clubinfoCel: response.data.data[0].celebrityName });
      this.setState({ clubinfoId: response.data.data[0].fanclubId });
      this.setState({ clubinfoCreatedBy: response.data.data[0].createdBy });
      this.setState({ clubinfoCount: response.data.data[0].membersCount });
      this.setState({ clubinfoImgUrl: response.data.data[0].imageUrl });
    });
  }

  onclickChange = (fanid, key) => {
    var id = fanid;
    this.setState({
      clubinfo: '', clubinfoDate: '', clubinfoCel: '',
      clubinfoId: '', clubinfoCreatedBy: '', clubinfoCount: '', clubinfoImgUrl: ''
    });
    this.getfanclubinfo(id);
    this.setState({ clubinfoId: fanid, keyactive: '1', activeItem: key });
  }


  callback(key) {
    this.setState({ keyactive: key });
  }
  searchFanclub = (e) => {
    if (e.target.value === '') {
      {
        this.state.publickey === "Public" ?
        this.publicFanclubs() :
        this.state.publickey === "Private" ?
          this.privateFanclubs()
          : this.getFanclub()
      }
    }
    this.setState({
      search: e.target.value.substr(0, 10)
    });
  }
  onKeyPress = (e) => {
    var specialKeys = new Array();
    specialKeys.push(8); //Backspace
    e = (e) ? e : window.event;
    var charCode = (e.which) ? e.which : e.keyCode;
    if ((charCode >= 48 && charCode <= 57) || specialKeys.indexOf(charCode) != -1) {

      document.getElementById('mobile').innerHTML = ("Please enter only characters");
      e.preventDefault();
      return false;

    }
    document.getElementById('mobile').innerHTML = ("");

    return true;


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
      const render = [];
      for (let key in _this.state.cont) {
        var contest = _this.state.cont[key]
        if (contest.isDeleted === false) {
          render.push(contest);
        }
      }
      _this.setState({ clubFeeds: render });
    });
  }


  render() {


    const content = (
      <div className="filterSpan">
        <div className="TopFiltersspan">
          <h4 className="falnclubsfilterHeaders">Filter By</h4>
          <ul>
            <li>
              <Checkbox onChange={onChange}><span className="Filterfanclubstypes">Top FanClubs</span></Checkbox>
            </li>
            <li>
              <Checkbox onChange={onChange}><span className="Filterfanclubstypes">New FanClubs</span></Checkbox>
            </li>
            <li>
              <Checkbox onChange={onChange}><span className="Filterfanclubstypes">In Active FanClubs</span></Checkbox>
            </li>
          </ul>

        </div>
        <div className="FanClubsliderFilter1">
          <h4 className="falnclubsfilterHeaders">Duration</h4>
          <Slider range step={10} defaultValue={[0, 50]} onChange={onChange} onAfterChange={onAfterChange} />
        </div>
        <div className="FanClubsliderFilter2">
          <h4 className="falnclubsfilterHeaders">FanClubs Members</h4>
          <Slider range step={10} defaultValue={[0, 50]} onChange={onChange} onAfterChange={onAfterChange} />
        </div>
      </div>
    );

    const buttonWidth = 70;

    const datalength = this.state.club.length;
    var renderTodos = [];
    let filteredContacts = this.state.club.filter(
      (contest) => {

        return contest.fanclubName.toLowerCase().includes(this.state.search.toLowerCase());
      }
    );
    this.state.club.length === 0 ? null : filteredContacts.map((item, index) => {
      this.state.club = filteredContacts;
    });
    for (let key in this.state.club) {
      var contest = this.state.club[key];
      renderTodos.push(<div key={key} className={this.state.activeItem === key ? 'navigation--active' : ''} onClick={this.onclickChange.bind(this, contest.fanclubId, key)} style={{ cursor: "pointer" }}>
        {/* <Link to={`/editfanclub/${contest.fanclubId}`}> */}

        <Col className="viewfanc" span={24}>

          <Col span={5} className="ViewFanClubsPublicimage">
            <img src={contest.imageUrl} alt="ContestCover" className="img-responsive" style={{ cursor: "pointer" }} />
          </Col>
          <Col span={17} className="fanClubsViewFanclubsNamesdetails">
            {/* <p style={{ 'position': 'absolute', right: '-8px', top: '-10px' }}> <Checkbox value={contest.fanclubId} onChange={this.onclickChange.bind(this)}></Checkbox></p> */}
            <h3 className="FanclubsContestNames">{contest.fanclubName}</h3>

            <p className="CreatedDateinFanClubs">by <span className=" ">{contest.createdBy}</span>,<span className="FanClubsContestViewDate">{moment(contest.datetime).format('DD-MM-YYYY hh:mm a')}</span></p>

            <p className="FanClubsMembsNames"><span className="FanClubsPublicMembers">{contest.membersCount} Members</span> <span className="FanclubsCategoryNames">{contest.category.categoryName}</span></p>
            {/*  <Link to={`/editfanclub/${contest.fanclubId}`}><a href="#"  className="ui card margnLft"style={{ float: 'right', cursor: "pointer"}}><Icon type="edit" /></a></Link>
            {/* <span className="ui card" style={{ float: 'right', cursor: "pointer", color: "blue" }} id={contest.fanclubId} onClick={this.onclickChange.bind(this)}>Click for More</span> */}

          </Col>
          <Col span={1} className="FanClubsChecKfilter">

            {/* <Checkbox onChange={onChange}></Checkbox>*/}
          </Col>
          <Col span={1}>
            {this.state.role.edit === true ? <Dropdown getPopupContainer={triggerNode => triggerNode.parentNode} overlay={<Menu>

              <Menu.Item key="0">
                <a><Link to={`/fan-clubs/editfanclub/${contest.fanclubId}`}><a href="#" className="ui card FanClubEditEllipis" style={{ cursor: "pointer" }}>Edit Fanclub</a></Link></a>
              </Menu.Item>

              {/* <Menu.Item key="1">
                <span className="ui card" style={{ cursor: "pointer" }} id={contest.fanclubId} onClick={this.onclickChange.bind(this, contest.fanclubId)}>Click for More</span>
              </Menu.Item>
              <Menu.Item key="2">

              </Menu.Item> */}

            </Menu>} trigger={['click']}>
              <a className="ant-dropdown-link" href="">
                <span className="viewMoreIconfanclubs"><Icon type="ellipsis" /></span>
              </a>
            </Dropdown> : null}

          </Col>
        </Col>
        {/* </Link> */}
      </div>)
    }


    return (
      <Dashboard>
        <Col span={24} className="FanClubsViewMaincolum1">
          <Col span={20}>

          </Col>
          <Col span={4}>
            {/* <Button type="primary" className='createBtn' style={{ float: 'right' }}>Create FanClub</Button> */}
            <Link to="/fan-clubs"> <Button type="primary" className='createBtn viewfanClunsCreaBtn'><Icon type="arrow-left" />Back to Fan Clubs</Button></Link>
          </Col>
        </Col>
        <Col span={24}>
          <div className="FansTabsBody">
            <Col span={8} className="FanclubsViewFancsubColumn">


              <Tabs onChange={this.publicprivateChange} activeKey={this.state.publickey} className='FanClubsViewFansTabsPulic'>
                <TabPane tab="Public" key="Public" onClick={this.publicFanclubs}></TabPane>
                <TabPane tab="Private" key="Private" onClick={this.privateFanclubs}></TabPane>
                {/* <TabPane tab="Official" key="Official" onClick={this.privateFanclubs}></TabPane>     */}

              </Tabs>
              <Col span={24} className="FanclubsviewRemainingtabs">
                <Col span={10} className="FanClubsViewResults">{datalength}  Results</Col>
                {/* <Col span={12}><p style={{ float: 'right' }}>Select All <Checkbox ></Checkbox></p></Col> */}
                <Col span={11}> <div className="fanhomesearch">
                  <Search
                    className="FanClubsSearchfilter"
                    placeholder="Search Fan Club Name"
                    onChange={this.searchFanclub}
                    value={this.state.search}
                    style={{ width: "100%" }}
                    //    onKeyPress={this.onKeyPress}
                    />
                  <p id="mobile" className="mobile viewFanclubsMobile"></p>
                </div>
                </Col>
                <Col span={2}>

                  {/* <Popover placement="bottomRight" content={content} trigger="click">
                  <Button className="fanClubsFiltersBtns"><Icon className="fanClubsFiltericon" type="filter" /></Button>
                </Popover> */}
                </Col>
              </Col>



              <Scrollbars style={{ height: '53vh', padding: '0px 10px' }}>
                <div className="scrollHidden" style={{ padding: '0px 10px' }}>
                  {renderTodos}
                </div>
              </Scrollbars>
            </Col>
            <Col span={16} className="FanClubsRemainingtabsinview">
              <Tabs defaultActiveKey="1" onChange={this.callback} activeKey={this.state.keyactive} className="fanclubDetails">
                <TabPane tab="Info" key="1">
                  <Scrollbars style={{ height: '55vh', padding: '0px 10px' }}>
                    <FanClubsInfo fanclubid={this.state.clubinfoId} />
                  </Scrollbars>
                </TabPane>
                <TabPane tab="Feeds" key="2">
                  <Scrollbars style={{ height: '50vh', padding: '0px 10px' }}>
                    <div className="scrollHidden" style={{ height: 'auto', marginBottom: '50px' }} >
                      <FanClubsFeeds feedList={this.state.clubFeeds} fanclubid={this.state.clubinfoId} />
                    </div>
                  </Scrollbars>
                  <div className="feedscmntbox">
                    {this.state.role.feedPost === true ?
                      <Col span={24} style={{ marginTop: '34px' }}>
                        <Comment updateFeed={this.getFanclubFeeds} fanclubid={this.state.clubinfoId} />
                      </Col> : null}
                  </div>

                </TabPane>
                <TabPane tab="Members" key='3'>
                  <Scrollbars style={{ height: '55vh', padding: '0px 10px' }}>
                    <FanClubsMembers fanclubid={this.state.clubinfoId} />
                  </Scrollbars>
                  <div className="feedscmntbox">
                    <Fanmembers />
                  </div>
                </TabPane>
                <TabPane tab="Events" key="4">
                  <Scrollbars style={{ height: '55vh', padding: '0px 10px' }}>
                    <FanClubsEvents fanclubid={this.state.clubinfoId} />
                  </Scrollbars>
                </TabPane>
                <TabPane tab="Leader Board" key="5">
                  <Scrollbars style={{ height: '55vh', padding: '0px 10px' }}>
                    <LeaderBoard fanclubid={this.state.clubinfoId} />
                  </Scrollbars>
                </TabPane>
                {/* <TabPane tab="FOM" key="6">
                <Scrollbars style={{ height: '55vh', padding: '0px 10px' }}>
                 <FanOfMonth fanclubid={this.state.clubinfoId} />
                  <div style={{ textAlign: 'center', padding: '0px 10px' }}>
                    <Alert
                      message="Yet to Declare"
                      description="Fan of the Month will be declared soon."
                      type="info"
                      />
                  </div>
                </Scrollbars>

              </TabPane> */}
              </Tabs>
            </Col>
          </div>
        </Col>
      </Dashboard>
    );
  };
}
export default ViewFanClubs;
/* eslint-disable */