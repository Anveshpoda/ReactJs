/* eslint-disable */
import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import clone from 'clone';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router';
import Dashboard from '../Dashboard/Dashboard';
import { Col, Form, Icon, Input, Button, Checkbox, Tabs, Select, Card, message, Alert, Spin, Pagination } from 'antd';
import amitabh from '../images/amitabh.jpg';
import amitabh1 from '../images/amitabh1.jpg';
import amitabh2 from '../images/amitabh2.jpg';
import amitabh3 from '../images/amitabh3.jpg';
import fanclubusergroup from '../images/fanclubusergroup.png';
import mul2 from '../images/mul2.png';
import fanclubs from './fanclubs.css';
const Option = Select.Option;
const Search = Input.Search;
function handleChange(value) {
  console.log(`selected ${value}`);
}
function callback(key) {

}
class FanClubs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      subCategories: [],
      allfanclubs: [],
      currentPage: 1,
      todosPerPage: 20,
      celebrities: [],
      subCategoryId: '',
      catId: '',
      subId: '',
      search: '',
      numOfPages: '',
      celebrityName: '',
      pagenumber: 1,
      role: ''
    }
    //this.handleOk = this.handleOk.bind(this);
    this.bindSubCategories = this.bindSubCategories.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onsubCategoryChange = this.onsubCategoryChange.bind(this);
    this.onCelebrityChange = this.onCelebrityChange.bind(this);
  }

  componentWillMount() {
    var user = JSON.parse(sessionStorage.getItem('user'));

    if (user.permissions !== '') {

      this.setState({ role: user.permissions.fanClubs })
    }
  }
  componentDidMount() {
    this.getFanclubs();
    this.getCategories();
  }


  getCategories = () => {
    var instance = axios.create({
      headers: { 'x-access-token': sessionStorage.getItem('token') }
    });
    instance.get('/categories').then((response) => {
      this.setState({ categories: response.data.data });
    });
  }

  getFanclubs = () => {
    var _this = this;
    axios.get('/fclubs/' + this.state.pagenumber, {
      headers: {
        "x-access-token": sessionStorage.getItem('token'),
      },

    })
      .then(function (response) {
        _this.setState({ allfanclubs: response.data.data, numOfPages: response.data.numofPages, loading: false });

        // $("#pagenumberLi li:first-child").addClass("activeLi");
      }.bind(this))
      .catch(function (error) {
      });
  }

  onCategoryChange(e, category) {
    var catid = e;
    this.setState({ catId: catid })
    this.getCategorieswise(e);
    this.getCelebrities(catid);
    // this.bindSubCategories(e);
  }



  getCategorieswise = (e) => {
    var instance = axios.create({
      headers: { 'x-access-token': sessionStorage.getItem('token') }
    });
    instance.get('/fanclubs/category/' + e + '/' + this.state.pagenumber).then((response) => {
      this.setState({ allfanclubs: response.data.data, numOfPages: response.data.numofPages });

    });
  }

  bindSubCategories(category) {
    var a = this.state.categories.map((categorydata) => {
      if (category === categorydata._id) {
        this.setState({
          subCategories: categorydata.subCategories
        })
      }
    })
  }

  onsubCategoryChange = (value, category) => {
    var subid = value;
    this.setState({ subId: value });
    this.getCelebrities(subid);
    this.getSubCategoriesWise(subid);
  }


  getSubCategoriesWise = (subid) => {
    var instance = axios.create({
      headers: { 'x-access-token': sessionStorage.getItem('token') }
    });
    var url = this.state.catId + '/' + subid;
    instance.get('/fanclubs/catsubcat/' + url).then((response) => {
      this.setState({ allfanclubs: response.data.data });
    });

  }

  getCelebrities = (catid) => {
    var _this = this;
    // this.setState({ subId: subid });
    // var data = { subCategoryIds: [subid] }
    // const url = process.env.REACT_APP_API_HOST + '/rest/getCelebrityNames?categoryId=' + catid + '&limit=20&offset=10';
    const url = '/celebrity-by-category/' + catid;
    var request = new Request(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "x-access-token": sessionStorage.getItem('token')
      }
    });

    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        if (response.status === 200) {
          _this.setState({ celebrities: response.data });
        }
        else {
        }
      })
  }



  onCelebrityChange(value, category) {
    var celname = value;
    this.setState({ celebrityName: celname });
    var instance = axios.create({
      headers: { 'x-access-token': sessionStorage.getItem('token') }
    });
    var url = this.state.catId + '/' + celname + '/' + 1;
    instance.get('/fanclubs/catsubcatceleb/' + url).then((response) => {
      this.setState({ allfanclubs: response.data.data, numOfPages: response.data.numofPages });
    });
  }

  handleClick = (event) => {
    var num2 = Number(event.target.id)
    $("li").removeClass("activeLi");
    $("#" + num2).addClass("activeLi");
    this.setState({
      currentPage: Number(event.target.id)
    });
  }
  searchFanclub = (e) => {
    if (e.target.value === '') {
      this.getFanclubs();
      document.getElementById('mobile').innerHTML = ("");
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
  fanclubsPagination = (page, pageSize) => {
    this.setState({ pagenumber: page });
    var _this = this;
    var url;
    if ((this.state.catId != '') && (this.state.celebrityName == '')) {
      url = '/fanclubs/category/' + this.state.catId + '/' + page;
    }
    else if (this.state.celebrityName != '') {
      url = '/fanclubs/catsubcatceleb/' + this.state.catId + '/' + this.state.celebrityName + '/' + page;
    }
    else {
      url = '/fclubs/' + page
    }
    axios.get(url, {
      headers: {
        "x-access-token": sessionStorage.getItem('token'),
      },

    })
      .then(function (response) {

        this.setState({ allfanclubs: response.data.data });

        // $("#pagenumberLi li:first-child").addClass("activeLi");
      }.bind(this))
      .catch(function (error) {
      });
  }
  saveCelebrity = (celebrityName) => {
    sessionStorage.setItem("celebrityname", celebrityName);
  }

  render() {
    const mapCategories = this.state.categories.map((category) => <Option value={category._id}>{category.name}</Option>);
    const mapSubCategories = this.state.subCategories.map((subCategory) => <Option value={subCategory._id}>{subCategory.name}</Option>);
    const mapCelebrities = this.state.celebrities.map((celebrity) => <Option value={celebrity.celebrityName}>{celebrity.celebrityName}</Option>);
    const { todos, currentPage, todosPerPage } = this.state;
    let filteredContacts = this.state.allfanclubs.filter(
      (contest) => {

        return contest.celebrityName.toLowerCase().includes(this.state.search.toLowerCase());
      }
    );
    this.state.allfanclubs.length === 0 ? null : filteredContacts.map((item, index) => {
      this.state.allfanclubs = filteredContacts;
    });
    // const data = clone(this.state.allfanclubs);
    // const indexOfLastTodo = currentPage * todosPerPage;
    // const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    // const currentTodos = data.slice(indexOfFirstTodo, indexOfLastTodo);


    if (this.state.allfanclubs.length === 0) {
      var container = (
        <Alert
          message="No Fanclubs"
          description="There are no Fan Clubs to display."
          type="info"
          />
      )
    }
    var renderTodos = [];
    for (let key in this.state.allfanclubs) {
      var fanclub = this.state.allfanclubs[key];
      if (fanclub.clubImageUrls !== undefined) {

        var userImage;
        var userimg1 = '';
        var userimg2 = '';
        var userimg3 = '';


        if (fanclub.clubImageUrls[0] === '') {
          userimg1 = null;
        } else {
          userimg3 = fanclub.clubImageUrls[0];
        }

        if (fanclub.clubImageUrls[1] === '') {
          userimg2 = null;
        } else {
          userimg2 = fanclub.clubImageUrls[1];
        }

        if (fanclub.clubImageUrls[2] === '') {
          userimg3 = null;
        } else {
          userimg1 = fanclub.clubImageUrls[2];
        }
        if (fanclub.clubImageUrls.length === 1) {
          userImage = <div>
            <ul className="list-inline">
              <li className="FansClubsSmallMembersImgs"><img src={userimg3} alt="contestmember" className="img-responsive FansClubsSmallinnerMembersImgs" /></li>
              <li> </li>
              <li className="FanClubsCotestNumbers">
                <ul className="list-inline">
                  <li>
                    <span className="Fanccounttext">+{fanclub.fanClubsCount} </span> <span>FanClubs</span>
                  </li>
                {/* <li className="Fanccountimgs">

                  <span><img src={mul2} alt="contest-cover" className="Fanclubsmemic" /></span>
                  </li>*/}
                </ul>

              </li>
            </ul>
          </div>
        } else if (fanclub.clubImageUrls.length === 2) {
          userImage = <div>
            <ul className="list-inline">
              <li className="FansClubsSmallMembersImgs"><img src={userimg2} alt="contestmember" className="img-responsive FansClubsSmallinnerMembersImgs" /></li>
              <li className="FansClubsSmallMembersImgs"><img src={userimg3} alt="contestmember" className="img-responsive FansClubsSmallinnerMembersImgs" /></li>
              <li> </li>
              <li>
                <ul className="list-inline">
                  <li>
                    <span className="Fanccounttext">+{fanclub.fanClubsCount} </span> <span>FanClubs</span>
                  </li>
      {/* <li className="Fanccountimgs">

                  <span><img src={mul2} alt="contest-cover" className="Fanclubsmemic" /></span>
                  </li>*/}
                </ul>
              </li>
            </ul>
          </div>
        } else if (fanclub.clubImageUrls.length === 3) {
          userImage = <div>
            <ul className="list-inline">
              <li className="FansClubsSmallMembersImgs"><img src={userimg1} alt="contestmember" className="img-responsive FansClubsSmallinnerMembersImgs" /></li>
              <li className="FansClubsSmallMembersImgs"><img src={userimg2} alt="contestmember" className="img-responsive FansClubsSmallinnerMembersImgs" /></li>
              <li className="FansClubsSmallMembersImgs"><img src={userimg3} alt="contestmember" className="img-responsive FansClubsSmallinnerMembersImgs" /></li>
              <li> </li>
              <li className="FanClubsCotestNumbers">
                <ul className="list-inline">
                  <li>
                    <span className="Fanccounttext">+{fanclub.fanClubsCount} </span> <span>FanClubs</span>
                  </li>
                 {/* <li className="Fanccountimgs">

                  <span><img src={mul2} alt="contest-cover" className="Fanclubsmemic" /></span>
                  </li>*/}
                </ul>
              </li>
            </ul>
          </div>
        }
      } else {
        userImage = <li className="FanClubsCotestNumbers"> 0 FanClubs</li>
      }
      renderTodos.push(
        <li key={key}> <div className="ui card">
          <Col span={6} xs={12} sm={12} xl={4} lg={6} md={6}>
            <Link to={fanclub.clubImageUrls ? `/fan-clubs/${fanclub.celebrityName}` : `/fan-clubs`} onClick={this.saveCelebrity.bind(this, fanclub.celebrityName)}>
              <Card className="FanclubsCardHeight">
                <div className="image FanclubsCardCContent">
                  <img src={fanclub.celebrityImageUrl} alt="contestmember" className="FanClubsCardsmainImgs" />
                  <ul>
                    <li className="FanClubsListofcontests">
                      <h4 className="FanClubsCardContestTitle">{fanclub.celebrityName}</h4>
                      <p className="FanClubsCardContestsubTitle">{fanclub.categoryName}</p>
                    </li>
                    <li className="FanClubsListofcontests1">
                      <ul className="list-inline">

                        <li className="FanClubsCardContestMembers">{fanclub.membersCount ? fanclub.membersCount : '0'} </li><li className="Fancmemberuseric"><span className="Fanccountimgs"><img src={mul2} alt="contest-cover" className="Fanclubsmemic" /></span></li></ul>
                      {/* <ul className="list-inline">
            <li style={{ padding: 10 }}><Icon type="heart-o" /><br /><span>23K</span></li>
            <li style={{ padding: 10 }}><Icon type="message" /><br /><span>43K</span></li>
            <li style={{ padding: 10 }}><Icon type="share-alt" /><br /><span>123K</span></li>
          </ul> */}

                      {userImage}
                      {/* <li><img src={amitabh1} style={{ 'borderRadius': '100%', width: '30px', height: '30px', border: '1px solid #f0f0f0' }} /></li> */}
                    </li>
                  </ul>
                </div>
                <div className="FanClubsDashboardFooter">
                  <ul className="list-inline buttonslist">

                    {fanclub.clubImageUrls ? <li className="FanClubsviewFanClubs"> <Link to={`/fan-clubs/${fanclub.celebrityName}`} onClick={this.saveCelebrity.bind(this, fanclub.celebrityName)}>View Fan Clubs</Link></li> :
                      <li className="FanClubsviewFanClubs">No Fan Clubs</li>}
                    <li className="FanClubsCardSendMessage">Send Message</li>
                  </ul>
                </div>
              </Card>
            </Link>
          </Col>
        </div>
        </li>
      )
    }

    return (
      <Dashboard>
        <div className="Funclubdasboard">
          <Col span={24} className="FanclubsdashboardHeader">
            <div className="FanClubsdashboardnavSubMenu">
              <Col span={3}>
                <h2 className="fanclubpagetitle">Fan Clubs</h2>
              </Col>
              <Col span={17} className="Fanclubsdashboardsubmenu">
                <Col span={7} className="fanclubhomeselectcat">
                  <Select getPopupContainer={triggerNode => triggerNode.parentNode} placeholder="Select Category" style={{ width: '100%' }} onChange={this.onCategoryChange}>
                    {mapCategories}
                  </Select>
                </Col>
                <Col span={7} className="fanclubhomeselectcat">
                  <Select placeholder="Select SubCategory" style={{ width: '100%' }}
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    onChange={handleChange}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled">Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                </Col>
                <Col span={7} className="fanclubhomeselectcat">
                  <Select
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    placeholder="Select Celebrity" style={{ width: '100%' }}
                    onChange={this.onCelebrityChange} showSearch={true}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                    {mapCelebrities}
                  </Select>

                </Col>
              </Col>
              {/*<Col span={6}>
                <div className="fanhomesearch">
              <Search
                placeholder="Search Celebrity Name"
                onChange={this.searchFanclub}
                value={this.state.search}
                style={{ width: 200 }}
                onKeyPress={this.onKeyPress}
              />
              <p id="mobile" className="mobile"></p>
            </div> 
              </Col>*/}
              {this.state.role.create === true ?
                <Col span={4} className="fanClubssBtn">
                  <Link to="/fan-clubs/CreateFanClub"> <Button type="primary" className='createBtn'>Create Fan Club</Button></Link>
                </Col>
                : null}
            </div>
          </Col>
          <Col span={24} className="fanclubsssubmenu">
            <Col span={2}>
              <Select placeholder="Order By"
                getPopupContainer={triggerNode => triggerNode.parentNode}
                style={{ width: 150 }} onChange={handleChange}>
                <Option value="jack">Date</Option>
                <Option value="lucy">Location</Option>
              </Select>

            </Col>
          </Col>

          <Col span={24}>
            <Col span={12}>

            </Col>
            <Col span={7}>

            </Col>


          </Col>

          <Col span={24} className="fanClubsCardsTop  funClubsDashboard">
            <ul>
              {renderTodos}
              <div className="fancall fanshloadssh">
                <div className="funSpin">
                  {container}
                </div>
              </div>
            </ul>
            <div className="clear"></div>
            <ul id="pagenumberLiFanclubs" className="list-inline">
              {/* {renderPageNumbers}  */}
              <Pagination onChange={this.fanclubsPagination.bind(this)} total={this.state.numOfPages * 10} />
            </ul>
          </Col>
        </div>
      </Dashboard>
    );
  };
}


export default FanClubs;
/* eslint-disable */