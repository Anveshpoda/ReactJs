/* eslint-disable */
import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import clone from 'clone';
import { Link } from 'react-router';
import css from './FuntoWinmain.css';
import Placeholder from '../images/placeholder.png';
import moment from 'moment';
import { Scrollbars } from 'react-custom-scrollbars';
import viewMore from '../images/icons/view-more.png';
import { Layout, Menu, Row, Breadcrumb, Pagination, DatePicker, Form, Icon, Col, Card, Button, Dropdown, message, Select, Modal, Spin, Alert } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
const dateFormat = 'YYYY/MM/DD';
function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}
class Fun2WinPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      subCategories: [],
      contests: [],
      celebrities: [],
      packs: {},
      visible: false,
      description: '',
      commentsCount: '',
      playedCount: '',
      likesCount: '',
      viewsCount: '',
      celebrityName: '',
      imageURL: '',
      points: '',
      contentPackQuestions: [],
      createdDateTime: '',
      name: '',
      currentPage: 1,
      todosPerPage: 12,
      subCategoryId: '',
      deleteid: '',
      deletevisible: false,
      numOfPages: '',
      pagenumber: 1,
      celName: '',
      usercredentials: '',
      reschedulevisible: false,
      resheduleid: '',
      createDate: '',
      categoryId: '',
      freelancerId: ''

    }
    this.handleOk = this.handleOk.bind(this);
    this.bindSubCategories = this.bindSubCategories.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onsubCategoryChange = this.onsubCategoryChange.bind(this);
    this.onCelebrityChange = this.onCelebrityChange.bind(this);
    this.fetchRequest = this.fetchRequest.bind(this);

  }
  componentDidMount() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    this.setState({ usercredentials: user })
    var name = user.role.name;
    
    if (name == "Freelancer") {
      var frelancerid = user._id
      this.setState({ freelancerId: frelancerid })
      this.getContests(frelancerid);
    } else {
      var frelancerid = "notFreelancer"
      this.setState({ freelancerId: "notFreelancer" })
      this.getContests(frelancerid);
    }
    
    this.getcategories();
  }

  getcategories = () => {
    // console.log("User -----------", sessionStorage.getItem('token'))
    var instance = axios.create({
      headers: { 'x-access-token': sessionStorage.getItem('token') }
    });
    instance.get('/categories').then((response) => {
      //  console.log("Data categories------------------", response.data.data);
      this.setState({ categories: response.data.data });
    });
  }

  getContests = (id) => {
    this.setState({ loading: true })
    axios.get('/all/' + this.state.pagenumber + '/' + id, {
      headers: {
        "x-access-token": sessionStorage.getItem('token'),
      },

    })
      .then(function (response) {
        const hhh = response.data.data;
        this.setState({ contests: hhh, loading: false, numOfPages: response.data.numofPages });
        // $("#pagenumberLi li:first-child").addClass("activeLi");
      }.bind(this))
      .catch(function (error) {
        // console.log(error);
      });

  }
  deleteModal = (e) => {
    // this.setState({ deletevisible: true, deleteid: e.target.id })
    var _this = this;
    var con = this;
    var subCategoryId = this.state.subCategoryId;
    var id = e.target.id;
    var data = {
      'isDeleted': true,
      'isPublished': false
    }
    const url = '/pack/' + id;
    var request = new Request(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        'x-access-token': sessionStorage.getItem('token')
      }
    });
    fetch(request)
      .then(function (response) {
        if (response.status === 200) {

          if (subCategoryId) {
            con.fetchRequest(subCategoryId);
          } else {
            con.getContests(con.state.freelancerId);
          }
          // con.setState({deletevisible : false});
          message.success("Pack is deleted successfully");
        }
      })
      .catch(function (error) {
        // console.log(error);
      });
  }

  handledeleteCancel = (e) => {
    this.setState({ deletevisible: false })
  }

  deletePack = (e) => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    this.setState({ usercredentials: user })
    var name = user.role.name;
    var frelancerid;
    if (name == "Freelancer") {
     frelancerid = user._id
      this.setState({ freelancerId: frelancerid })
    } else {
     frelancerid = "notFreelancer"
      this.setState({ freelancerId: "notFreelancer" })
    }
    var id = this.state.deleteid;
    var con = this;
    var subCategoryId = this.state.subCategoryId;
    axios.delete('/pack/' + id, {
      headers: {
        "x-access-token": sessionStorage.token,
      },

    })
      .then(function (response) {
        if ((response.data.status === 200) && (response.data.message === "Pack successfully deleted.")) {

          if (subCategoryId) {
            con.fetchRequest(subCategoryId);
          } else {
            con.getContests(con.state.freelancerId);
          }
          con.setState({ deletevisible: false });
          message.success("Pack is deleted successfully");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  ApproveModal = (e) => {
  
    var _this = this;
    var subCategoryId = this.state.subCategoryId;
    var id = e.target.id;
    var data = {
      'isPublished': true,
      'isDeleted': false
    }
    const url = '/pack/' + id;
    var request = new Request(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        'x-access-token': sessionStorage.getItem('token')
      }
    });
    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        if (response.status === 200) {
          if (subCategoryId) {
            _this.fetchRequest(subCategoryId);
          } else {
            _this.getContests(_this.state.freelancerId);
          }
          message.success(' Fun2Win has been approved');

        }
        else {
          message.error(`unable to Updated challenge.`);
          console.log('Error Occured', response);
        }
      })
  }

  createDateChange = (value) => {
    var time = "5:30:00"
    var value1 = moment(value).format('YYYY-MM-DD');
    var datetime = value1 + " " + time;
    var newdate2 = new Date(datetime).toISOString();
    this.setState({ createDate: newdate2 });

  }
  rescheduleModal = (e) => {
    this.setState({ reschedulevisible: true, resheduleid: e.target.id })
    var id = e.target.id;
    var instance = axios.create({
      headers: { 'x-access-token': sessionStorage.getItem('token') }
    });
    instance.get('/pack/' + id).then((response) => {
      this.setState({ createDate: response.data.data.createdDateTime });
    });

  }
  handleresCancel = () => {
    this.setState({ reschedulevisible: false });
  }
  resheduleContentPack = (e) => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    this.setState({ usercredentials: user })
    var name = user.role.name;
    var frelancerid;
    if (name == "Freelancer") {
     frelancerid = user._id
      this.setState({ freelancerId: frelancerid })
    } else {
     frelancerid = "notFreelancer"
      this.setState({ freelancerId: "notFreelancer" })
    }
    var _this = this;
    var subCategoryId = this.state.subCategoryId;
    var id = this.state.resheduleid;
    var data = {
      "createdDateTime": this.state.createDate,
      'isPublished': false,
      'isDeleted': false
    }
    const url = '/pack/' + id;
    var request = new Request(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        'x-access-token': sessionStorage.getItem('token')
      }
    });
    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        if (response.status === 200) {
          if (subCategoryId) {
            _this.fetchRequest(subCategoryId);
            _this.setState({ reschedulevisible: false });
          } else {
            _this.getContests(frelancerid);
            _this.setState({ reschedulevisible: false });
          }
          message.success('Fun2Win has been rescheduled');

        }
        else {
          message.error(`unable to Updated challenge.`);
          //   console.log('Error Occured', response);
        }
      })
  }
  showModal = (e) => {

    var id = e.target.id;
    console.log("get modal id", id);
    var _self = this;
    var _this = this;
    axios.get('/pack/' + id, {
      headers: {
        "x-access-token": sessionStorage.token,
      },

    })
      .then(function (response) {
        //  console.log("get view resposne in all", response.data.data)
        const getdata = response.data.data
        _this.setState({ packs: getdata });
        _this.setState({ name: _this.state.packs.name });
        _this.setState({ celebrityName: _this.state.packs.celebrityName });
        _this.setState({ description: _this.state.packs.description });
        _this.setState({ commentsCount: _this.state.packs.commentsCount >= 1000 ? (_this.state.packs.commentsCount / 1000).toFixed(1) + ' K' : _this.state.packs.commentsCount });
        _this.setState({ likesCount: _this.state.packs.likesCount >= 1000 ? (_this.state.packs.likesCount / 1000).toFixed(1) + ' K' : _this.state.packs.likesCount });
        _this.setState({ viewsCount: _this.state.packs.viewsCount >= 1000 ? (_this.state.packs.viewsCount / 1000).toFixed(1) + ' K' : _this.state.packs.viewsCount });
        _this.setState({ playedCount: _this.state.packs.playedCount >= 1000 ? (_this.state.packs.playedCount / 1000).toFixed(1) + ' K' : _this.state.packs.playedCount });
        _this.setState({ celebrityName: _this.state.packs.celebrityName });
        _this.setState({ imageURL: _this.state.packs.imageURL });
        _this.setState({ points: _this.state.packs.points });
        _this.setState({ contentPackQuestions: _this.state.packs.contentPackQuestions });
        _this.setState({ createdDateTime: _this.state.packs.createdDateTime });
      })
      .catch(function (error) {
        //   console.log(error);
      });
    this.setState({
      visible: true
    });
  }


  handleOk = (e) => {
    // console.log("visible", e);

    this.setState({
      visible: false, packs: {}, name: '', celebrityName: '', description: '', commentsCount: '', likesCount: '', viewsCount: '',
      playedCount: '', imageURL: '', points: '', contentPackQuestions: [], createdDateTime: ''
    });
  }
  handleCancel = (e) => {
    // console.log(e);
    this.setState({
      visible: false, packs: {}, name: '', celebrityName: '', description: '', commentsCount: '', likesCount: '', viewsCount: '',
      playedCount: '', imageURL: '', points: '', contentPackQuestions: [], createdDateTime: ''
    });
  }


  onCategoryChange(e, category) {
    //  console.log(e, 'was changed');
    this.setState({ categoryId: e, celName: '' })
    this.bindSubCategories(e);
  }

  bindSubCategories(category) {
    var a = this.state.categories.map((categorydata) => {
      if (category === categorydata._id) {
        this.setState({
          subCategories: categorydata.subCategories, subCategoryId: ''
        })
      }
    })
  }

  fetchRequest = (subid) => {
    var _this = this;
    console.log("fetch subcategory", this.state.freelancerId);
    axios.get('/pack-by-subcategory/All/' + this.state.pagenumber + '/' + this.state.freelancerId, {
      params: {
        subCatId: subid
      },
      headers: {
        "x-access-token": sessionStorage.token,
      },

    }).then((response) => {
      //  console.log("response data", response.data.data);

      _this.setState({ contests: response.data.data, numOfPages: response.data.numofPages });
    });
  }

  onsubCategoryChange(e) {
    var subid = e;
    this.setState({
      subCategoryId: subid, celName: ''
    })
    this.getCelebrities(subid);
    // console.log("subcategory", this.state.subCategoryId);
    this.fetchRequest(subid);
  }

  getCelebrities = (subid) => {
    //  console.log("User", sessionStorage.getItem('token'));
    //  console.log("get sub cat", [subid]);
    var _this = this;
    this.setState({ subId: subid });
    const url = process.env.REACT_APP_API_HOST + '/rest/getContentPacksCelebName?subCategoryId=' + subid;
    var request = new Request(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
      //subCategoryIds: [subid]
    });
    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        //  console.log(response)
        if (response.statusCode === 1) {
          // console.log("dataresponse***********", response.data);
          _this.setState({ celebrities: response.data });
          //  console.log(response, 'Service Response');
        }
        else {
          //   console.log("dataresponse", response);
        }
      })
  }

  onCelebrityChange(value) {
    var _this = this;
    var celname = value;
    this.setState({ celName: value })
    axios.get('/pack-by-celebrityname/All/' + this.state.pagenumber + '/' + this.state.freelancerId, {
      params: {
        celName: celname
      },
      headers: {
        "x-access-token": sessionStorage.token,
      },
    }).then(function (response) {
      _this.setState({ contests: response.data.data, numOfPages: response.data.numofPages });
      //   console.log("Celebrity Name response data---->", _this.state.contests);    
    });
  }

  handleClick = (event) => {
    //  console.log("Number(event.target.id)", Number(event.target.id))
    var num2 = Number(event.target.id)
    $("li").removeClass("activeLi");
    $("#" + num2).addClass("activeLi");
    this.setState({
      currentPage: Number(event.target.id)
    });
  }
  pageChange = (page, pageSize) => {
    this.setState({ pagenumber: page })
    if (this.state.subCategoryId != '') {
      var url = '/pack-by-subcategory/All/' + page + '/' + this.state.freelancerId + '?subCatId=' + this.state.subCategoryId + '';
    }
    else if (this.state.celebrityName != '') {
      var url = '/pack-by-celebrityname/All/' + page + '/' + this.state.freelancerId + '?celName=' + this.state.celName + '';
    }
    else {
      var url = '/all/' + page + '/' + this.state.freelancerId
    }
    axios.get(url, {
      headers: {
        "x-access-token": sessionStorage.getItem('token'),
      },

    })
      .then(function (response) {
        console.log("Fun2Win responce data", response.data.data)
        const hhh = response.data.data;
        this.setState({ contests: hhh });
        // $("#pagenumberLi li:first-child").addClass("activeLi");
      }.bind(this))
      .catch(function (error) {
        // console.log(error);
      });
  }

  render() {
    console.log("this.state in fun2win page", this.state);
    // const logincheck=this.state.usercredentials._id
    // console.log("logincheck",logincheck)
    var myObj = this.state.usercredentials
    var closed = []
    var queued = []
    var running = []
    var create;
    if (isEmpty(myObj)) {

    } else {
      if (this.state.usercredentials.permissions !== '') {
        var permissions = this.state.usercredentials.permissions.fun2win
        closed = permissions.closed;
        queued = permissions.queued;
        running = permissions.running;
        create = permissions.create;
      }
    }
    console.log("closed", closed, "queued", queued, "running", running, "create", create);
    const { visible } = this.state;
    var totalpages = this.state.numOfPages * 10;
    // const data = this.state.contests;
    const mapCategories = this.state.categories.map((category) => <Option value={category._id}>{category.name}</Option>);
    const mapSubCategories = this.state.subCategories.map((subCategory) => <Option value={subCategory._id}>{subCategory.name}</Option>);
    const mapCelebrities = this.state.celebrities.map((celebrity) => <Option value={celebrity.celebrityName}>{celebrity.celebrityName}</Option>);
    // const { currentPage, todosPerPage } = this.state;
    // const data = clone(this.state.contests);
    // const indexOfLastTodo = currentPage * todosPerPage;
    // const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    // const currentTodos = data.slice(indexOfFirstTodo, indexOfLastTodo);
    const renderTodos = this.state.contests.map((contest, index) => {
      if (contest.playedCount >= 1000) {
        var playcount = (contest.playedCount / 1000).toFixed(1) + "K";
      } else {
        var playcount = contest.playedCount;
      }

      if (contest.likesCount >= 1000) {
        var lcount = (contest.likesCount / 1000).toFixed(1) + "K";
      } else {
        var lcount = contest.likesCount;
      }

      if (contest.commentsCount >= 1000) {
        var ccount = (contest.commentsCount / 1000).toFixed(1) + "K";
      } else {
        var ccount = contest.commentsCount;
      }

      if (contest.viewsCount >= 1000) {
        var vcount = (contest.viewsCount / 1000).toFixed(1) + "K";
      } else {
        var vcount = contest.viewsCount;
      }

      return <li key={index}>
       <div className="ui card">

        <Col span={6} xs={12} sm={12} xl={4} lg={6} md={6}>

          <Card>
            <div className="image hover01">
              <figure>
                <img className="fun2winbannerimage fun2WinMainCardImages" id={contest._id} onClick={this.showModal} src={contest.imageURL} alt="Contest Cover" width='100%' height='154px' />
              </figure>
            </div>
            <div className="cardContent">

              <ul key={index} className="cardContentDetails">
                {/* <li style={{ marginBottom: 10 }}> <ul className="list-inline">
                   <li><b>Id:</b>: 12345</li> 
                  <li style={{ float: 'right' }}><b>Fancoins:</b>  {contest.points}</li>
                </ul></li> */}

                <li><h4 className="contestCardTitle" >{contest.name}</h4></li>
                <li><span className="cardSubText">Fan Coins:  {contest.points}</span></li>
              </ul>
              <ul className="list-inline fun2winicons">
                <li><Icon type="heart-o" /><span> {lcount}</span></li>
                {/* <li><Icon type="message" /><span> {ccount}</span></li> */}
                <li><Icon type="eye-o" /><span> {vcount}</span></li>
              </ul>
            </div>
            <div className="cardFooter">
              <ul className="list-inline">
                {/* {contest.isPublished === true ? <li><b>Participants: {contest.playedCount}</b></li> :  <li><b style={{ color: "orange" }}>Queued to Approval</b></li> } */}
                {contest.isDeleted === true ? <li><b>Closed</b></li> : contest.isPublished === true ?
                  <li><b style={{ color: '#783293' }}>Participants: {playcount}</b></li> : <li><b style={{ color: "orange" }}
                  >Queued to Approval</b></li>}
                <li className="floatRight">
                  <Dropdown getPopupContainer={triggerNode => triggerNode.parentNode} overlay={<Menu>

                    {(contest.isPublished === false && contest.isDeleted === false && queued.approve === true) ? <Menu.Item key="0">
                      <a href="#" ><span id={contest._id} onClick={this.ApproveModal.bind(this)}>Approve</span></a>
                    </Menu.Item> : null}
                    {(contest.isPublished === false && contest.isDeleted === false) && (queued.edit === true) ? <Menu.Item key="1">
                      <Link to={`/fun2win/${contest._id}`}><a href="#" style={{ color: 'rgba(0, 0, 0, 0.65)' }}>Edit</a></Link>
                    </Menu.Item> : null}
                    {(contest.isDeleted === false || running.delete === true) &&
                      ((contest.isPublished === false || running.delete === true)
                        && (contest.isPublished === true)) ? <Menu.Item key="2">
                        <a href="#"><span id={contest._id} onClick={this.deleteModal.bind(this)}>Delete</span></a>
                      </Menu.Item> : null}
                    {
                      (contest.isPublished === false && contest.isDeleted === false && queued.delete === true) ? <Menu.Item key="3">
                        <a href="#"><span id={contest._id} onClick={this.deleteModal.bind(this)}>Delete</span></a>
                      </Menu.Item> : null
                    }
                    {(contest.isDeleted === true && contest.isPublished === false) && (closed.reschedule === true) ? <Menu.Item key="4">
                      <a href="#"><span id={contest._id} onClick={this.rescheduleModal.bind(this)}>Reschedule</span></a>
                    </Menu.Item> : null}
                    {closed.view === true || queued.view === true || running.view === true?
                    <Menu.Item key="5">
                      <span id={contest._id} onClick={this.showModal}>View Details</span>
                    </Menu.Item>:null}
                  </Menu>} trigger={['click']}>
                    <a className="ant-dropdown-link" href="#">
                      <span className="viewMore"><Icon type="ellipsis" /></span>
                    </a>
                  </Dropdown>
                </li>
              </ul>
            </div>
          </Card>


        </Col>
      </div>
      </li>;
    });

    if (this.state.contests.length === 0) {
      var container = (
        <Alert
          message="Loading Fun2Win.. Please Wait.."
          type="info"
        />
      );
      return (
        <div>
          <div>
            <Col span={24} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} className='challengesmenu'>
              <div className="fun2winSubMenu">
                <Col span={2}><h2 className="pageTitle">Fun2Win</h2></Col>
                <Col span={4} className='fun2winSelect fun2winSelectcategry4'>
                  <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                    value={this.state.categoryId || undefined}
                    placeholder="Select Category" style={{ width: '100%' }} onChange={this.onCategoryChange}>
                    {mapCategories}
                  </Select>
                </Col>
                <Col span={4} className='fun2winSelect fun2winSelectcategry1'><Select id="subcat"
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                  value={this.state.subCategoryId || undefined}
                  placeholder="Select Sub-category"
                  style={{ width: '100%' }} onChange={this.onsubCategoryChange}>
                  {/* {this.state.subCategories.length < 0? <h1>No SubCategories available</h1>:{mapSubCategories}}  */}
                  {mapSubCategories}
                </Select>
                </Col>
                <Col span={4} className='fun2winSelect fun2winSelectcategry2'> <Select
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                  value={this.state.celName || undefined}
                  placeholder="Select Celebrity"
                  style={{ width: '100%' }}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}

                  onChange={this.onCelebrityChange}>
                  {/* {this.state.subCategories.length < 0? <h1>No SubCategories available</h1>:{mapSubCategories}}  */}
                  {mapCelebrities}
                </Select></Col>
                <Col span={9} className="fun2winmainheader">
                  <nav className='challengesnavigation fun2winNavigations' role="navigation">
                    <Link to="/fun2win/fun2Winpage" className='item' activeClassName='active'>All</Link>
                    <Link to="/fun2win/running-fun2win" className='item' activeClassName='active'>Live</Link>
                    <Link to="/fun2win/queued-fun2win" className='item' activeClassName='active'>Queued</Link>
                    <Link to="/fun2win/closed-fun2win" className='item' activeClassName='active'>Closed</Link>
{create === true ?
                    <Link to="/fun2win/create-fun2win"> <Button type="primary" className='createBtn mrgLeft30'>Create Fun2Win</Button></Link>
                 
                 :null}   </nav>
                </Col>
              </div>
            </Col>
          </div>
          <div>
            <div style={{ paddingLeft: 15 }} className="placeholderImages">
              <Col span={6}><img src={Placeholder} alt="placeholder" /></Col>
              <Col span={6}><img src={Placeholder} alt="placeholder" /></Col>
              <Col span={6}><img src={Placeholder} alt="placeholder" /></Col>
              <Col span={6}><img src={Placeholder} alt="placeholder" /></Col>
              <Col span={6}><img src={Placeholder} alt="placeholder" /></Col>
              <Col span={6}><img src={Placeholder} alt="placeholder" /></Col>
              <Col span={6}><img src={Placeholder} alt="placeholder" /></Col>
              <Col span={6}><img src={Placeholder} alt="placeholder" /></Col>
              <Col span={6}><img src={Placeholder} alt="placeholder" /></Col>
              <Col span={6}><img src={Placeholder} alt="placeholder" /></Col>
              <Col span={6}><img src={Placeholder} alt="placeholder" /></Col>
              <Col span={6}><img src={Placeholder} alt="placeholder" /></Col>

            </div>

            {/* <Spin style={{ paddingTop:'20%' }} className="funSpin" size="large" spinning={this.state.loading} ></Spin>    {container} */}
            <ul id="pagenumberLiFun2win" className="list-inline">
              {/* {renderPageNumbers} */}
              <Pagination onChange={this.pageChange.bind(this)} total={totalpages} />
            </ul>

          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div>
            <Col span={24} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} className='challengesmenu'>
              <div className="fun2winSubMenu">
                <Col span={2}><h2 className="pageTitle">Fun2Win</h2></Col>
                <Col span={4} className='fun2winSelect fun2winSelectcategry4'>
                  <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                    value={this.state.categoryId || undefined}
                    placeholder="Select Category"
                    style={{ width: '100%' }} onChange={this.onCategoryChange}>
                    {mapCategories}
                  </Select>
                </Col>
                <Col span={4} className='fun2winSelect fun2winSelectcategry1'><Select
                  id="subcat" getPopupContainer={triggerNode => triggerNode.parentNode}
                  value={this.state.subCategoryId || undefined}
                  placeholder="Select Sub-category" style={{ width: '100%' }}
                  onChange={this.onsubCategoryChange}>
                  {/* {this.state.subCategories.length < 0? <h1>No SubCategories available</h1>:{mapSubCategories}}  */}
                  {mapSubCategories}
                </Select>
                </Col>
                <Col span={4} className='fun2winSelect fun2winSelectcategry2'> <Select
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                  value={this.state.celName || undefined}
                  placeholder="Select Celebrity" style={{ width: '100%' }}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  onChange={this.onCelebrityChange}>
                  {/* {this.state.subCategories.length < 0? <h1>No SubCategories available</h1>:{mapSubCategories}}  */}
                  {mapCelebrities}
                </Select></Col>
                <Col span={9} className="fun2winmainheader">
                  <nav className='challengesnavigation fun2winNavigations' role="navigation">
                    <Link to="/fun2win/fun2Winpage" className='item' activeClassName='active'>All</Link>
                    <Link to="/fun2win/running-fun2win" className='item' activeClassName='active'>Live</Link>
                    <Link to="/fun2win/queued-fun2win" className='item' activeClassName='active'>Queued</Link>
                    <Link to="/fun2win/closed-fun2win" className='item' activeClassName='active'>Closed</Link>
                    {create === true ?
                      <Link to="/fun2win/create-fun2win"> <Button type="primary" className='createBtn mrgLeft30'>Create Fun2Win</Button></Link>
                      : null}</nav>
                </Col>
              </div>
            </Col>
          </div>
          <div>
            <ul>
              {renderTodos}
            </ul>
            <div className="clear"></div>
            <ul id="pagenumberLiFun2win" className="list-inline">
              {/* {renderPageNumbers} */}
              <Pagination onChange={this.pageChange.bind(this)} total={totalpages} />
            </ul>
          </div>
          {/* {data.length ? (
          <div>
            {data.map((contest, index) =>

             

            )}</div>) : (
            <h2><Spin tip="Loading..."></Spin></h2>
          )} */}
          <Modal className="runningmodal"
            title={this.state.name}
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={<Button className="footbtn" style={{ marginRight: 8 }} type="primary" onClick={this.handleCancel}>Close</Button>}
            style={{ top: 20 }}
          >
            <Scrollbars style={{ height: '59vh', padding: '0px 10px' }}>
              <div className="challengeDetails" style={{ marginLeft: '10px' }}>
                {this.state.contentPackQuestions.length > 0 ? (
                  <div className="challengeDetails">

                    <Row>
                      <Col span={12} className="fun2winviewImg">

                        <img src={this.state.imageURL} alt="Contest Cover" width="100%" />
                      </Col>

                      <Col span={12} className="funtopercent">
                        <div className="fun2winAnalytics">
                          <div className="fun2winAnalyticsDivh2">
                            <h2> Post Analytics</h2>
                          </div>
                          <div className="fun2winAnalyticsDiv">
                            <ul className="list-inline">
                              <li>Total Views: {this.state.viewsCount}</li>
                              <li>Participated : {this.state.playedCount}</li>
                            </ul>
                          </div>
                          <div className="fun2winAnalyticslikes">
                            <ul className="list-inline">
                              <li><span>
                                <Icon type="heart-o" />
                              </span>
                                Total likes: {this.state.likesCount}</li>
                              {/* <li> <span>
                                <Icon type="message" />
                              </span>

                                Comments : {this.state.commentsCount}</li> */}
                            </ul>

                          </div>
                        </div>


                      </Col>
                    </Row>
                    <Row className="fun2winmfancoinsandCreatedDate">
                      <Col className="fun2winmfancoinsandCreatedDatesub" span={24}>
                        <Col span={12} className="fun2winmfancoins">
                          <h4 className="funwinfanc">FanCoins:{this.state.points}</h4>
                        </Col>
                        <Col span={12} className="fun2winmCreateddate">
                          <h4 className="funwinfanc">Created Date & Time:{this.state.createdDateTime} </h4>


                        </Col>
                      </Col>

                    </Row>



                    <Row>
                      <Col span={18} className="rheader">
                        <h2>Questions</h2>
                      </Col>
                      <Col style={{ paddingLeft: '28px' }} span={6}>
                        <div className="rheader">
                          <h2>Answers</h2>
                        </div>
                      </Col>
                    </Row>
                    {this.state.contentPackQuestions.length > 0 ? (
                      <div class="ant-col-24">
                        {this.state.contentPackQuestions.map((contest, index) => {
                          var type = contest.questionCategory;
                          var correctAnswer;
                          if (type.trim() === "Grid") {
                            if (contest.questionType.trim() === 'Question') {
                              correctAnswer = <li className="funtowingridAnswr">
                                <p className="grdiansImg"> {contest.correctAnswer === 1 ? <img src={contest.option1} alt="Contest Cover" width="100%" height='130px' />
                                  : contest.correctAnswer === 2 ? <img src={contest.option2} alt="Contest Cover" width="100%" height='130px' />
                                    : contest.correctAnswer === 3 ? <img src={contest.option3} alt="Contest Cover" width="100%" height='130px' />
                                      : contest.correctAnswer === 4 ? <img src={contest.option4} alt="Contest Cover" width="100%" height='130px' /> : ''}</p></li>
                            } else if (contest.questionType.trim() === 'Opinion') {
                              correctAnswer = '';
                            }
                            return (<div className="cardContentQuestion">
                              <ul key={index}>

                                <Row>
                                  <Col span={24}>
                                    <p className="funtowinqu"><span>{parseInt(index) + 1}</span>)<span className="GridQuestionNamemain"> {contest.name}</span></p>
                                  </Col>
                                  <Col span={18} className="fun2Wingridquestions">
                                    <Col span={6} className="fun2wingridoptions"><img src={contest.option1} alt="Contest Cover" width="100%" height='130px' /></Col>
                                    <Col span={6} className="fun2wingridoptions"><img src={contest.option2} alt="Contest Cover" width="100%" height='130px' /></Col>
                                    <Col span={6} className="fun2wingridoptions"><img src={contest.option3} alt="Contest Cover" width="100%" height='130px' /></Col>
                                    <Col span={6} className="fun2wingridoptions"><img src={contest.option4} alt="Contest Cover" width="100%" height='130px' /></Col>
                                  </Col>
                                  {/*
                              <li style={{ margin: '5px auto' }}><p><b>Question Category:  </b> {contest.questionCategory}</p></li>
                              <li style={{ margin: '5px auto' }}><p><b>Question Type:  </b> {contest.questionType}</p></li>*/}
                                  <Col span={6}>
                                    <Row className="fun2WinGridanswer">
                                      <p>
                                        {correctAnswer}
                                      </p>
                                    </Row>
                                  </Col>
                                </Row>

                              </ul>
                              <br />
                              <br />
                            </div>)
                          } else if (type.trim() === "Poll") {
                            return (<div className="cardContentQuestion">
                              <ul key={index}>
                                <Row>
                                  <Col span={24} className="fun2Winpollquestions">
                                    <li><p className="funtowinqu"><span>{parseInt(index) + 1}</span>) {contest.name}</p></li>
                                    {/*
                              <li style={{ margin: '5px auto' }}><p><b>Question Category: </b>{contest.questionCategory}</p></li>
                              <li style={{ margin: '5px auto' }}><p><b>Question Type: </b>{contest.questionType}</p></li>*/}
                                  </Col>
                                  <Col span={18} className="fun2Winpollquestions">
                                    <Col span={8} className="fun2winpolloptions">
                                      <div className="image">
                                        <img src={contest.imageURL} alt="Contest Cover" width='100%' height='130px' style={{ 'border-bottom': '1px solid #eee' }} />
                                      </div>
                                    </Col>
                                    <Col span={8} className="fun2winpolloptions"><img src={contest.option1} alt="Contest Cover" width="100%" height='130px' /></Col>
                                    <Col span={8} className="fun2winpolloptions"><img src={contest.option2} alt="Contest Cover" width="100%" height='130px' /></Col>
                                  </Col>
                                  <Col span={6}>

                                  </Col>
                                </Row>
                              </ul>
                              <br />
                              <br />
                            </div>)
                          } else if (type.trim() === "Combination") {
                            if (contest.questionType.trim() === 'Question') {
                              correctAnswer = <li className="fun2winCombinationAnswr">
                                <p className="combinationImg"> {contest.correctAnswer === 1 ?
                                  <img src={contest.option1} alt="Contest Cover" width="100%" height='130px' />
                                  : contest.correctAnswer === 2 ?
                                    <img src={contest.option2} alt="Contest Cover" width="100%" height='130px' /> :
                                    contest.correctAnswer === 3 ?
                                      <img src={contest.option3} alt="Contest Cover" width="100%" height='130px' /> : ''}</p></li>
                            } else if (contest.questionType.trim() === 'Opinion') {
                              correctAnswer = '';
                            }
                            return (<div className="cardContentQuestion">
                              <ul key={index}>
                                <Row>
                                  <Col span={24} className="fun2winCombinationQuestions">
                                    <li><p className="funtowinqu"><span>{parseInt(index) + 1}</span>) {contest.name}</p></li>
                                    {/*
                              <li style={{ margin: '5px auto' }}><p><b>Question Category: </b>{contest.questionCategory}</p></li>
                              <li style={{ margin: '5px auto' }}><p><b>Question Type: </b>{contest.questionType}</p></li>*/}

                                    {/* <img src={contest.imageURL} alt="Contest Cover" width="100%" /> */}
                                  </Col>
                                  <Col span={18} className="fun2winCombinationQuestions">
                                    <Col span={6} className="fun2winCombinationoptions">
                                      <div className="image">
                                        <img src={contest.imageURL} alt="Contest Cover" width='100%' height='130px' style={{ 'border-bottom': '1px solid #eee' }} />
                                      </div>
                                    </Col>
                                    <Col span={6} className="fun2winCombinationoptions"><img src={contest.option1} alt="Contest Cover" width="100%" height='130px' /></Col>
                                    <Col span={6} className="fun2winCombinationoptions"><img src={contest.option2} alt="Contest Cover" width="100%" height='130px' /></Col>
                                    <Col span={6} className="fun2winCombinationoptions"><img src={contest.option3} alt="Contest Cover" width="100%" height='130px' /></Col>
                                  </Col>
                                  <Col span={6}>
                                    <Row className="fun2WinCombinationanswer">
                                      <p>
                                        {correctAnswer}
                                      </p>
                                    </Row>
                                  </Col>
                                </Row>
                              </ul>
                              <br />
                              <br />
                            </div>)
                          } else if (type.trim() === "Multiple") {
                            if (contest.questionType.trim() === 'Question') {

                              correctAnswer = <li className="fun2winMultiplAnswers">
                                <p className="fun2winmulans listoffuns1">{contest.correctAnswer === 1 ?
                                  contest.option1 : contest.correctAnswer === 2 ?
                                    contest.option2 : contest.correctAnswer === 3 ?
                                      contest.option3 : contest.correctAnswer === 4 ?
                                        contest.option4 : ''}</p></li>
                            } else if (contest.questionType.trim() === 'Opinion') {
                              correctAnswer = '';
                            }
                            return (<div className="cardContentQuestion">
                              <ul key={index}>
                                <Row>
                                  <Col span={24} className="fun2winMultiplequestions">
                                    <li><p className="funtowinqu"><span>{parseInt(index) + 1}</span>) <span className="Fun2WinpageQuestionmain" title={contest.name}> {contest.name}</span></p></li>
                                    {/*
                              <li style={{ margin: '5px auto' }}><p><b>Question Category: </b>{contest.questionCategory}</p></li>
                              <li style={{ margin: '5px auto' }}><p><b>Question Type: </b>{contest.questionType}</p></li>*/}
                                  </Col>
                                  <Col span={18} className="fun2winMultiplequestions">

                                    <Col span={12}>
                                      <ul>
                                        <li className="ant-col-2 listoffuns">1</li><li className="ant-col-20 listoffuns1" title={contest.option1}> {contest.option1}</li>
                                      </ul>
                                    </Col>
                                    <Col span={12}>
                                      <ul>
                                        <li className="ant-col-2 listoffuns">2</li><li className="ant-col-20 listoffuns1" title={contest.option2}> {contest.option2}</li>
                                      </ul>
                                    </Col>
                                    <Col span={12}>
                                      <ul>
                                        <li className="ant-col-2 listoffuns">3</li><li className="ant-col-20 listoffuns1" title={contest.option3}> {contest.option3}</li>
                                      </ul>
                                    </Col>
                                    <Col span={12}>
                                      <ul>
                                        <li className="ant-col-2 listoffuns">4</li><li className="ant-col-20 listoffuns1" title={contest.option4}> {contest.option4}</li>
                                      </ul>
                                    </Col>

                                  </Col>
                                  <Col span={6}>
                                    <div className="fun2winMultipleanswr muesque">

                                      <p> {correctAnswer}</p>
                                    </div>
                                  </Col>

                                </Row>
                              </ul>
                              <br />
                              <br />
                            </div>
                            )
                          } else if (type.trim() === "Image") {
                            if (contest.questionType.trim() === 'Question') {
                              correctAnswer = <li style={{ margin: '5px auto' }}>
                                <p style={{ border: '1px solid #f0f0f0', textAlign: 'center', padding: '5px' }} className="listoffuns1img">{contest.correctAnswer === 1 ? contest.option1
                                  : contest.correctAnswer === 2 ? contest.option2
                                    : contest.correctAnswer === 3 ? contest.option3 : ''}</p></li>
                            } else if (contest.questionType.trim() === 'Opinion') {
                              correctAnswer = '';
                            }
                            return (<div className="cardContentQuestion">
                              <ul key={index}>
                                <Row>
                                  <Col span={24} className="fun2winimagequestions">

                                    <li><p className="funtowinqu"><span>{parseInt(index) + 1}</span>) {contest.name}</p></li>

                                    {/*
                              <li style={{ margin: '5px auto' }}><p><b>Question Category:</b>{contest.questionCategory}</p></li>
                              <li style={{ margin: '5px auto' }}><p><b>Question Type:</b>{contest.questionType}</p></li>*/}
                                  </Col>
                                  <Col span={18} className="fun2winimagequestions">

                                    <Col span={12}>
                                      <div className="imageImg">
                                        <img src={contest.imageURL} alt="Contest Cover" width='100%' height='130px' />
                                      </div>
                                    </Col>
                                    <Col span={12} className="funqimages">
                                      <ul className="">
                                        <li className="ant-col-2 listoffun">1</li><li className="ant-col-20 listoffun listoffuns1img" title={contest.option1}> {contest.option1}</li>

                                      </ul>
                                      <ul className="">
                                        <li className="ant-col-2 listoffun">2</li><li className="ant-col-20 listoffun listoffuns1img" title={contest.option2}> {contest.option2}</li>

                                      </ul>
                                      <ul className="">
                                        <li className="ant-col-2 listoffun">3</li><li className="ant-col-20 listoffun listoffuns1img" title={contest.option3}> {contest.option3}</li>

                                      </ul>
                                    </Col>

                                  </Col>
                                  <Col span={6}>
                                    <div className="fun2winImageanswr">
                                      <p>
                                        {correctAnswer}
                                      </p>
                                    </div>
                                  </Col>
                                </Row>
                              </ul>
                              <br />
                              <br />
                            </div>
                            )
                          }
                        }
                        )} </div>) : (
                        <h2><Spin tip="Loading..."></Spin></h2>
                      )}

                  </div>) : (
                    <h2><Spin tip="Loading..."></Spin></h2>
                  )}

              </div>
            </Scrollbars>
            {/*<Col className="modalFootersh">
              <div className="textRightr">
                    <Button type="primary" onClick={this.handleCancel}> Cancel</Button>
                    </div>
                  </Col>*/}
          </Modal>
          <Modal
            className="deleteFun2win"
            title="Delete Fun2win"
            visible={this.state.deletevisible}
            onCancel={this.handledeleteCancel}
            footer={null}
          >

            <p className="margnBtm20">Are you sure you want to delete this Fun2win?</p>


            <FormItem >
              <Button onClick={this.deletePack}>Delete </Button>
              <Button onClick={this.handledeleteCancel} className="margnLeft20">Cancel </Button>

            </FormItem>
          </Modal>
          <Modal
            className="fun2winResched"
            title="Reschedule Fun2win"
            visible={this.state.reschedulevisible}
            onCancel={this.handleresCancel}
            footer={<Button onClick={this.resheduleContentPack}>Reschedule</Button>}
          >

            <Form className="txtLeft">
              <ul className="list-inline">
                <li>
                  <FormItem >
                    <DatePicker getCalendarContainer={triggerNode => triggerNode.parentNode}
                      onChange={this.createDateChange.bind(this)}
                      value={this.state.createDate ? moment(this.state.createDate, dateFormat) : ''}
                      placeholder="Select Date" />

                  </FormItem>
                </li>

              </ul>
            </Form>

          </Modal>
        </div>
      );
    }
  }
}

export default (Fun2WinPage);
/* eslint-disable */
