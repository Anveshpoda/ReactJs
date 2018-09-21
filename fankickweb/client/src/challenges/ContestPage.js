/* eslint-disable */
import React, { PropTypes } from 'react';
import RichTextEditor from 'react-rte';
import $ from 'jquery';
import moment from 'moment';
import axios from 'axios';
import { Link } from 'react-router';

import css from './challenge.css';
import Reschedule from './modals/Reschedule';
import Upgrade from './modals/Upgrade';
import Analytics from './modals/Analytics';
import { Menu, Row, Col, Card, Button, Icon, Dropdown, message, Modal, Popconfirm, Spin } from 'antd';
import clone from 'clone';
import { Scrollbars } from 'react-custom-scrollbars';
// import viewMore from '../images/icons/view-more.png';
import ReactPlayer from 'react-player'
import ReactAudioPlayer from 'react-audio-player';
import Placeholder from '../images/placeholder.png';
import participantscount12 from '../images/participantscount12.png';
import fancoincount12 from '../images/fancoincount12.png';
const dateFormat = 'YYYY/MM/DD';

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}
class ContestsPage extends React.Component {
  static propTypes = {
    onChange11: PropTypes.func
  }; constructor(props) {
    super(props);
    this.state = {
      order1: [],
      contests: {}, viewdata: {},
      viewdata0: {},
      viewdata1: {},
      viewdata2: {},
      viewdata3: [],
      viewdata31: [],
      viewdata32: [],
      viewdata33: [],
      viewdata4: [],
      viewdata41: [],
      viewdata42: [],
      viewdata43: [],
      cast: {},
      aboutMovie: {},
      data: [],
      currentPage: 1,
      todosPerPage: 12,
      visible: false,
      visible1: false,
      visible2: false,
      loading: false,
      approve: {},
      contestStartDate: '',
      contestEndDate: '',
      value: RichTextEditor.createEmptyValue(),
      readOnly: true,
      modalloading: true,
      role: ""
    }

  }
  onChange11 = (value) => {
    this.setState({ value });
    if (this.props.onChange) {
      this.props.onChange(
        value.toString('html')
      );
    }

  }
  confirm = (e) => {
    var con = this;
    var id = sessionStorage.getItem('deleteuserinchallenges');
    var data = {
      "isDeleted": true
    }
    const url = '/contest/' + id;
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
          con.getContests();
          var clear = sessionStorage.removeItem('deleteuserinchallenges');
          message.success("contest is deleted successfully");

        }
        else {

          message.error("Unable to delete the contest.");
        }
      })
  }

  cancel = (e) => {
    console.log(e);
    //message.error('Click on No');
  }
  componentWillMount() {
    //console.log("called ")
    var user = JSON.parse(sessionStorage.getItem('user'));
    //console.log("userdata in contest page menu",user.permissions.challenges);
    if (user.permissions !== '') {

      this.setState({
        role: user.permissions.challenges
      })
    }
    this.setState({ loading: true })
    this.getContests();
  }
  getContests = () => {
    axios.get('/contest/', {
      headers: {
        "x-access-token": sessionStorage.token,
      },
    })
      .then(function (response) {
        if (response.status === 200) {
          const hhh = response.data.data;
          this.setState({ data: hhh, loading: false });
          $("#pagenumberLi li:first-child").addClass("activeLi");
        }
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });

  }
  approveUser = (e) => {

    var con = this;
    var id = e.target.id;
    var data = {
      "isPublished": true,
      "isDeleted": false,
    }
    const url1 = '/contest/' + id;
    var request = new Request(url1, {
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
          con.getContests();
          message.success('Challenge approved successfully!');
        }
        else {
          message.error(`unable to approve challenge.`);
        }
      })
    axios.get('/contest/' + id, {
      headers: {
        "x-access-token": sessionStorage.token,
      },
    })
      .then(function (response) {
        if (response.status === 200) {
          var start = response.data.data.contestStartDate;
          if (moment(start).format('MM/DD/YYYY') === moment(new Date()).format('MM/DD/YYYY')) {

            var oo = response.data.data.createdDate
            var event = new Date(oo);
            var createdDate77 = event.toISOString().replace(/T/, ' ').replace(/\..+/, '')
            console.log("777", createdDate77);
            var data = {
              "buttonText": response.data.data.buttonText,
              "contestDescription": response.data.data.contestDescription,
              "contestImageUrl": response.data.data.contestImageUrl,
              "contestTitle": response.data.data.contestTitle,
              "inAppType": 1,
              "createdDate": createdDate77,
              "contestId": response.data.data._id,
              "contestStartDate": new Date(response.data.data.contestStartDate).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
              "contestEndDate": new Date(response.data.data.contestEndDate).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
              "isDeleted": false,
              "isPublished": true
            }
            const url = process.env.REACT_APP_API_HOST + '/rest/publicInApp';
            var request = new Request(url, {
              method: 'POST',
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json",
                'x-access-token': sessionStorage.getItem('token')
              }
            });
            fetch(request)
              .then(response => response.json())
              .then(function (response) {
                if (response.statusMessage === "success") {
                  console.log("response.data in service", response);
                  message.success('Challenge posted in mobile successfully!');
                } else {
                  message.error(`Unable to post Challenge in mobile.`);
                }
              })
          } else {
            message.success(`Your contest is approved to publish`);
          }

        }
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });

  }
  closeUser = (e) => {

    var con = this;
    var id = e.target.id;
    var data = {
      "isDeleted": true,
      "isPublished": false
    }
    const url = '/contest/' + id;
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
          con.getContests();
          message.success('Challenge closed successfully!');
        }
        else {
          message.error(`unable to close challenge.`);
        }
      })
  }

  deleteUser = (e) => {
    var id = e.target.id;

    sessionStorage.setItem('deleteuserinchallenges', id)
  }
  showModal = (e) => {
    var id = e.target.id;
    var _this = this;
    axios.get('/contest/' + id, {
      headers: {
        "x-access-token": sessionStorage.token,
      },
    })
      .then(function (response) {
        if (response.status === 200) {
          //console.log("trmes", response.data.data.termsAndConditions)

          _this.setState({ value: RichTextEditor.createValueFromString(response.data.data.termsAndConditions, 'html') });
          var myObj = response.data.data.karoke
          if (isEmpty(myObj)) {
            $(".karokedetail444").hide();
          } else {
            $(".karokedetail444").show();
          }
          var myObj1 = response.data.data.dubshmash
          if (isEmpty(myObj1)) {
            $(".dub444").hide();
          } else {
            $(".dub444").show();
          }
          var myObj2 = response.data.data.aboutMovie
          if (isEmpty(myObj2)) {
            $(".hidecrewcast").hide();
            $(".hidesyrele").hide();
          } else {
            $(".hidecrewcast").show();
            $(".hidesyrele").show();
          }
          var myObj3 = response.data.data.frame
          if (isEmpty(myObj3)) {
            $(".selfiwithframe").hide();
          } else {
            $(".selfiwithframe").show();
            var frame = response.data.data.frame.frames;
            console.log("frane", frame[1]);
            if (frame[1] === undefined || frame[1] === '') {
              $(".frame1").hide();

            } else {
              $(".frame1").show();
            }
            if (frame[2] === undefined || frame[2] === '') {
              $(".frame2").hide();

            } else {
              $(".frame2").show();
            }
          }
          //const getdata = response.data.data
          _this.setState({ viewdata: response.data.data, modalloading: false });
          _this.setState({ order1: _this.state.viewdata.order.join(",") });
          console.log("order", _this.state.order1)
          if (isEmpty(response.data.data.dubshmash)) {
          } else {
            _this.setState({ viewdata0: response.data.data.dubshmash });
          }
          if (isEmpty(response.data.data.karoke)) {
          } else {
            _this.setState({ viewdata1: response.data.data.karoke });
          }
          if (isEmpty(response.data.data.aboutMovie)) {
          } else {
            _this.setState({ viewdata2: response.data.data.aboutMovie });
          }
          if (isEmpty(response.data.data.aboutMovie.cast[0])) {
          } else {
            _this.setState({ viewdata3: response.data.data.aboutMovie.cast[0] });
          }
          if (isEmpty(response.data.data.aboutMovie.cast[1])) {
          } else {
            _this.setState({ viewdata31: response.data.data.aboutMovie.cast[1] });
          }
          if (isEmpty(response.data.data.aboutMovie.cast[2])) {
          } else {
            _this.setState({ viewdata32: response.data.data.aboutMovie.cast[2] });
          }
          if (isEmpty(response.data.data.aboutMovie.cast[3])) {
          } else {
            _this.setState({ viewdata33: response.data.data.aboutMovie.cast[3] });
          }
          if (isEmpty(response.data.data.aboutMovie.crew[0])) {
          } else {
            _this.setState({ viewdata4: response.data.data.aboutMovie.crew[0] });
          }
          if (isEmpty(response.data.data.aboutMovie.crew[1])) {
          } else {
            _this.setState({ viewdata41: response.data.data.aboutMovie.crew[1] });
          }
          if (isEmpty(response.data.data.aboutMovie.crew[2])) {
          } else {
            _this.setState({ viewdata42: response.data.data.aboutMovie.crew[2] });
          }
          if (isEmpty(response.data.data.aboutMovie.crew[3])) {
          } else {
            _this.setState({ viewdata43: response.data.data.aboutMovie.crew[3] });
          }
        } else {
          // console.log("getting modal data not getting");
        }
      })
      .catch(function (error) {
        //console.log(error);
      });
    _this.setState({
      visible: true
    });


  }
  handleOk = (e) => {
    this.setState({
      visible: false, viewdata33: [], viewdata43: [], viewdata3: [], viewdata4: [], viewdata31: [], viewdata32: [], viewdata41: [], viewdata42: [], viewdata: {}, viewdata0: {}, viewdata1: {}, viewdata2: {}, modalloading: true

    });
  }
  //  sleep = (milliseconds) => {
  //   var start = new Date().getTime();
  //   for (var i = 0; i < 1e7; i++) {
  //     if ((new Date().getTime() - start) > milliseconds){
  //       break;
  //     }
  //   }
  //   this.setState({})
  // }
  handleCancel = (e) => {
    this.setState({
      visible: false, viewdata33: [], viewdata43: [], viewdata3: [], viewdata4: [], viewdata31: [], viewdata32: [], viewdata41: [], viewdata42: [], viewdata: {}, viewdata0: {}, viewdata1: {}, viewdata2: {}, modalloading: true
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

  handleCancel = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  }


  render() {

    //console.log("this.state in contest page", this.state.viewdata)
    var titlecheck = "";
    var myObj5 = this.state.viewdata
    if (isEmpty(myObj5)) {
    } else {
      var str = this.state.viewdata.contestTitle;
      var n = str.includes("Challenge");
      if (n === false) {
        titlecheck = (`${this.state.viewdata.contestTitle} Movie Challange `);
      } else {
        titlecheck = this.state.viewdata.contestTitle;
      }
    }
    // var arr9=[];
    // const myObj6=this.state.viewdata
    // if(isEmpty (myObj6)){
    // }else{
    //     var ff=this.state.viewdata.frame.frames
    //     if(ff === undefined){

    //     }else{
    //       console.log("else ocndition",ff);  
    //     }

    // }
    const { currentPage, todosPerPage } = this.state;
    const data = clone(this.state.data);
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = data.slice(indexOfFirstTodo, indexOfLastTodo);
    const renderTodos = currentTodos.map((contest, index) => {

      return <li key={index}><div className="ui card">
        <Col span={6} xs={12} sm={12} xl={4} lg={6} md={6}>
          <Card className="hover02">
            <div className="image  hover01">
              <figure>
                <img className="Boximage challengesmaincardImage" id={contest._id} onClick={this.showModal} src={contest.contestIcon} alt="Contest Cover" width='100%' max-width='400px' height='175px' />
              </figure>
            </div>
            <div className="cardContent">
              <ul key={index}>
                <li> <h4 className="contestCardAuthor"><span className="messageCentauthorn">Author Name :</span><span>Ishak</span></h4></li>

                <li className="cardSubText" style={{}}>Date: <span className="colorBlack">{moment(contest.contestStartDate, dateFormat).format('DD-MM-YYYY')} to {moment(contest.contestEndDate, dateFormat).format('DD-MM-YYYY')}</span></li>
                <li><h4 className="contestCardTitle" >{contest.contestTitle}</h4></li>
                {/*  <li>Challenge Date</li>*/}

              </ul>
            </div>


            <div>
              {contest.isQueued === true ?
                <div>
                  <div>
                    <ul className="list-inline messagecentcountul">
                      <li style={{ color: 'orange' }}><b>Queued to Approval</b></li>
                    </ul>
                  </div>

                  <div className="cardFooter">
                    <ul className="list-inline">

                      <li className="MessageCentcount1">
                        <h4><span><Icon type="eye" theme="outlined" className="messagecentcounticonh" /></span> <span>20</span></h4>
                      </li>
                      <li className="MessageCentcount1">
                        <h4><span><Icon type="heart-o"  className="messagecentcounticonh" /></span> <span>20</span></h4>
                      </li>
                      <li className="MessageCentcount1">
                        <h4 className="partcicountmcimghead"><span><img src={participantscount12} alt="contest-cover" className="particountimgmessge" /></span> <span>{contest.pCount}</span></h4>
                      </li>
                      <li className="MessageCentcount1">
                        <ul className="list-inline">
                          <li className="partcicountmcimghead">
                            <span> <img src={fancoincount12} alt="contest-cover" className="particountimgmessge" /></span></li><li className="Fancoinsmesacountm"> <span>20</span>
                          </li>
                        </ul>
                      </li>
                      <li className="floatRight">
                        <Dropdown getPopupContainer={triggerNode => triggerNode.parentNode} overlay={<Menu>
                          {this.state.role.queued.approve === true ?
                            <Menu.Item key="0">
                              <a id={contest._id} onClick={this.approveUser.bind(this)}>Approve</a>
                            </Menu.Item>
                            : null}
                          {this.state.role.queued.edit === true ?
                            <Menu.Item key="1">
                              <Link to={`/fankick/${contest._id}`} style={{ color: 'rgba(0, 0, 0, 0.65)' }}>Edit</Link>
                            </Menu.Item>
                            : null}
                          {this.state.role.queued.delete === true ?
                            <Menu.Item key="2">
                              <Popconfirm title="Are you sure delete this task?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
                                <a ><span id={contest._id} onClick={this.deleteUser.bind(this)}>Delete</span></a>
                              </Popconfirm>
                            </Menu.Item>
                            : null}
                          {this.state.role.queued.view === true ?
                            <Menu.Item key="4">
                              <a id={contest._id} onClick={this.showModal}>View Details</a>
                            </Menu.Item>
                            : null}
                        </Menu>} trigger={['click']}>
                          <a className="ant-dropdown-link" href="">
                            <span className="viewMore"><Icon type="ellipsis" /></span>
                          </a>
                        </Dropdown>
                      </li>
                    </ul>
                  </div> </div> : null}
            </div>
            {contest.isClosed === true ?

              <div>
                <div>
                  <ul className="list-inline messagecentcountul">
                    <li style={{ color: 'red' }}><b>Closed</b></li>
                  </ul>
                </div>

                <div className="cardFooter">
                  <ul className="list-inline">

                    <li className="MessageCentcount1">
                      <h4><span><Icon type="eye" theme="outlined" className="messagecentcounticonh" /></span> <span>20</span></h4>
                    </li>
                    <li className="MessageCentcount1">
                      <h4><span><Icon type="heart-o"  className="messagecentcounticonh" /></span> <span>20</span></h4>
                    </li>
                    <li className="MessageCentcount1">
                      <h4 className="partcicountmcimghead"><span><img src={participantscount12} alt="contest-cover" className="particountimgmessge" /></span> <span>{contest.pCount}</span></h4>
                    </li>
                    <li className="MessageCentcount1">
                      <ul className="list-inline">
                        <li className="partcicountmcimghead">
                          <span> <img src={fancoincount12} alt="contest-cover" className="particountimgmessge" /></span></li><li className="Fancoinsmesacountm"> <span>20</span>
                        </li>
                      </ul>
                    </li>

                    <li className="floatRight">
                      <Dropdown getPopupContainer={triggerNode => triggerNode.parentNode} overlay={<Menu>
                        {this.state.role.closed.reschedule === true ?
                          <Menu.Item key="0">
                            <a onClick={() => this.refs.child.showModal()}>Reschedule</a>
                            <Reschedule id={contest._id} getContests={this.getContests} ref="child" />
                          </Menu.Item>
                          : null}
                        {/* <Menu.Item key="1">
                          <Link to={`/contest/${contest._id}`} style={{color:'rgba(0, 0, 0, 0.65)'}}>Edit</Link>
                        </Menu.Item> */}
                        {/* <Menu.Item key="2">
                      <Popconfirm title="Are you sure delete this task?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
                      <a ><span id={contest._id} onClick={this.deleteUser.bind(this)}>Delete</span></a>
                      </Popconfirm>
                      </Menu.Item> */}
                        {this.state.role.closed.view === true ?
                          <Menu.Item key="4">
                            <a id={contest._id} onClick={this.showModal}>View Details</a>
                          </Menu.Item>
                          : null}
                        {this.state.role.closed.analytics === true ?
                          <Menu.Item key="5">
                            <a onClick={() => this.refs.child2.showModal()}>Analytics</a>
                            <Analytics id={contest._id} ref="child2" />
                          </Menu.Item>
                          : null}
                      </Menu>} trigger={['click']}>
                        <a className="ant-dropdown-link" href="">
                          <span className="viewMore"><Icon type="ellipsis" /></span>
                        </a>
                      </Dropdown>
                    </li>
                  </ul>

                </div></div> : null}
            {contest.isRunning === true ?
              <div>
                <div>
                  <ul className="list-inline messagecentcountul">
                    <li style={{ color: '#783293 ' }}><b>{/*:{contest.pCount}*/}</b></li>
                  </ul>
                </div>

                <div className="cardFooter">
                  <ul className="list-inline">

                    <li className="MessageCentcount1">
                      <h4><span><Icon type="eye" theme="outlined" className="messagecentcounticonh" /></span> <span>20</span></h4>
                    </li>
                    <li className="MessageCentcount1">
                      <h4><span><Icon type="heart-o"  className="messagecentcounticonh" /></span> <span>20</span></h4>
                    </li>
                    <li className="MessageCentcount1">
                      <h4 className="partcicountmcimghead"><span><img src={participantscount12} alt="contest-cover" className="particountimgmessge" /></span> <span>{contest.pCount}</span></h4>
                    </li>
                    <li className="MessageCentcount1">
                      <ul className="list-inline">
                        <li className="partcicountmcimghead">
                          <span> <img src={fancoincount12} alt="contest-cover" className="particountimgmessge" /></span></li><li className="Fancoinsmesacountm"> <span>20</span>
                        </li>
                      </ul>
                    </li>
                    <li className="floatRight">
                      <Dropdown getPopupContainer={triggerNode => triggerNode.parentNode} overlay={<Menu>
                        {this.state.role.running.view === true ?
                          <Menu.Item key="4">
                            <a id={contest._id} onClick={this.showModal}>View Details</a>
                          </Menu.Item>
                          : null}
                        {this.state.role.running.extendDuration === true ?
                          <Menu.Item key="0">
                            <a onClick={() => this.refs.child1.showModal()}>Extend Duration</a>
                            <Upgrade id={contest._id} getContests={this.getContests} ref="child1" />
                          </Menu.Item>
                          : null}

                        <Menu.Item key="5">
                          <a onClick={() => this.refs.child2.showModal()}>Analytics</a>
                          <Analytics id={contest._id} ref="child2" />
                        </Menu.Item>

                        {/* <Menu.Item key="1">
                   <Link to={`/contest/${contest._id}`} style={{color:'rgba(0, 0, 0, 0.65)'}}>Edit</Link>
                   </Menu.Item> */}
                        {this.state.role.running.close === true ?
                          <Menu.Item key="2">
                            {/* <a href="#"><span id={contest._id} onClick={this.deleteUser.bind(this)} >Delete</span></a> */}
                            <a id={contest._id} onClick={this.closeUser.bind(this)}>Close Challenge</a>
                          </Menu.Item>
                          : null}
                      </Menu>} trigger={['click']}>
                        <a className="ant-dropdown-link" href="">
                          <span className="viewMore"><Icon type="ellipsis" /></span>
                        </a>
                      </Dropdown>
                    </li>
                  </ul>

                </div>
              </div> : null}
          </Card>
        </Col>
      </div>
      </li>;
    });

    const pageNumbers = [];
    if (data.length > 12) {
      for (let i = 1; i <= Math.ceil(data.length / todosPerPage); i++) {
        pageNumbers.push(i);
      }
    }
    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          onChange={this.Change}
          key={number}
          id={number}
          onClick={this.handleClick}

          >
          {number}
        </li>
      );
    });
    if (currentTodos.length === 0) {

      return (
        <div >
          <div style={{ paddingLeft: 15 }} className="placeholderImages">
            <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
            <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
            <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
            <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
            <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
            <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
            <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
            <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
            <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
            <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
            <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
            <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
          </div>
        </div>
      )
    } else {

      return (
        <div>
          <div>
            <ul>
              {renderTodos}
            </ul>
            <div className="clear"></div>
            <ul id="pagenumberLi" className="list-inline">
              {renderPageNumbers}
            </ul>

            <Modal className="cmodalB"
              title={titlecheck}
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              width='817'
              style={{ top: 20 }}
              footer={<Button style={{ marginRight: 8 }} type="primary" onClick={this.handleCancel}>Close</Button>}
              >
              <Spin spinning={this.state.modalloading}>
                <Scrollbars style={{ height: '75vh', padding: '0px 10px' }}>
                  <div className="challengeDetails">
                    <Row className="challnegemainimages">
                      <div className="Cimagesviewdetails">
                        <Col span={8}>
                          <h3>Banner Image</h3>
                          <img src={this.state.viewdata.contestIcon} alt="Banner" width='100%' height='190px' /></Col>
                        <Col className="challengebanimage1" span={8}>
                          <h3>Inner Image</h3>
                          <img src={this.state.viewdata.contestImageUrl} alt="Inner" width='100%' height='190px' /></Col>


                        <Col className="challengebanimage2" span={8}>
                          <h3>Thumbnail Image</h3>
                          <img alt="Thumbnail" src={this.state.viewdata.contestThumbnail} width='100%' height='190px' /></Col>
                        {/*<Col span={12} style={{ float: 'right' }}>
                      <div className="dates" style={{ float: 'right' }}>
                        {/* <p><b>Created Date</b>  {moment(this.state.viewdata.createdDate).format('D MMM YYYY')}</p> 
    <p><b>ContestCaption</b><br /> {this.state.viewdata.contestCaption}</p
                      </div>
                    </Col>*/}
                      </div>
                    </Row>

                    <div className="clear"></div>
                    <Row>
                      <Col span={23}>
                        <h3>Description the Challenge</h3>
                        <p className="WrdBrk ChallengeViewdescription"> {this.state.viewdata.contestDescription}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={5} className="CViewdetails">
                        <h3>Created Date</h3>
                        <p className="ContestDuration"><span className="cdurationf">{moment(this.state.viewdata.createdDate).format('YYYY-MM-DD')}</span></p>
                      </Col>
                      <Col span={5} className="CViewdetails">
                        <h3>Updated Date</h3>
                        <p className="ContestDuration"><span className="cdurationf">{moment(this.state.viewdata.updatedDate).format('YYYY-MM-DD')}</span></p>
                      </Col>
                      <Col span={10} className="CViewdetails">
                        <h3>Duration of the challenge</h3>
                        <p className="ContestDuration"><span className="cdurationfh">{moment(this.state.viewdata.contestStartDate).format('YYYY-MM-DD')}</span> to <span className="cdurations">{moment(this.state.viewdata.contestEndDate).format('YYYY-MM-DD')}</span></p></Col>

                    </Row>

                    <Row>

                      <div className="clear"></div>
                      <Col span={5} className="challengesviewdetailsfancoins"><h3 >Number of Fan Coins</h3><p> {this.state.viewdata.contestPoints}</p>
                      </Col>

                      {/*<Col span={17} style={{paddingTop:'48px',marginLeft:'-25px'}}  className=" CViewdetailh">
                      <p className="WrdBrk" style={{ border: '1px solid #f0f0f0',height:'44px',  padding: '5px' }}> {this.state.viewdata.contestDescription}</p>
                    </Col>*/}
                    </Row>
                    <Row>
                      <Col span={10} className="CViewdetails">
                        <div className="dates">
                          {/* <p><b>Created Date</b>  {moment(this.state.viewdata.createdDate).format('D MMM YYYY')}</p> */}
                          <h3>Catchy Caption</h3>
                          <p className="challengesCatchyCaptionp">{this.state.viewdata.contestCaption}</p>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10} className="CViewdetails">
                        <h3>Coupons</h3>
                        <p className="challengesCoupons">No Coupon</p>

                      </Col>

                    </Row>
                    <div className="karokedetail444">
                      <Row>

                        <Col span={11} className="karokedetail444 CViewdetails">
                          <div className="karokedetail">
                            {this.state.viewdata1 !== undefined ?
                              <div><h2>Karoke Details</h2>
                                <p><span clasName="musicefilesChallenges">Title:</span>  {this.state.viewdata1.title !== undefined ? this.state.viewdata1.title : null}</p>
                                <p><span clasName="musicefilesChallenges">Description:</span> {this.state.viewdata1.description !== undefined ? this.state.viewdata1.description : null}</p>
                                <p>
                                  <div className="players">
                                    <ReactAudioPlayer className="creactplay"
                                      src={this.state.viewdata1.audioUrl !== undefined ? this.state.viewdata1.audioUrl : ''}
                                      autoPlay={false} ref={(ref) => { this.audioEl = ref; } }
                                      controls
                                      />


                                  </div>
                                </p>
                              </div> : ''}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={21} className="CViewdetails">
                          <h3>Lyrics</h3>
                          <p className="challenegsLyrics">simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>

                        </Col>

                      </Row>
                    </div>
                    <div className="dub444">
                      <Row>

                        <Col span={11} className="dub444 CViewdetails">
                          <div className="dubsmashdetail">
                            {this.state.viewdata0 !== undefined ?
                              <div><h2>Dub2Win Details</h2>
                                <p><span clasName="musicefilesChallenges">Title:</span>  {this.state.viewdata0.title}</p>
                                <p><span clasName="musicefilesChallenges">Description:</span> {this.state.viewdata0.description}</p>
                                <p>
                                  <div className="players">
                                    <ReactAudioPlayer className="creactplay"
                                      src={this.state.viewdata0.audioUrl !== undefined ? this.state.viewdata0.audioUrl : ''}
                                      autoPlay={false}
                                      controls
                                      ref={(ref) => { this.audioEl = ref; } }
                                      />
                                  </div>
                                </p>
                              </div> : ''}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={21} className="CViewdetails">
                          <h3>Lyrics</h3>
                          <p className="challenegsLyrics1">simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                        </Col>
                      </Row>
                    </div>
                    <div className="selfiwithframe">
                      <Row>
                        <Col span={24} className="CViewdetails">
                          <h2>Selfie With Frame</h2 >
                          {this.state.viewdata.frame !== undefined ? this.state.viewdata.frame.frames.map((ff, index) => {

                            return (<div>
                              <Col span={8}>
                                <div className="chanllengesefileviewdetails">
                                  <img src={ff} alt="Inner" width='100%' height='190px' />
                                </div>
                              </Col>
                            </div>
                            );
                          }) : ''}
                        </Col>
                      </Row>
                    </div>
                    <Row>
                      <Col span={11} className="CViewdetails">
                        <h3>Call to Action (CTA) Button Text</h3>
                        <p className="challengesViewdetailsCtabtn"> {this.state.viewdata.buttonText}</p>
                      </Col>
                      <Col span={11} className="marginLeft30">

                      </Col>

                    </Row>
                    <Row>
                      <Col span={11}>
                        <div className="aboutMovie CViewdetails">
                          <h2>Movie Info</h2>
                          <p>
                            <ReactPlayer width="100%" height="150px" config={{ youtube: { playerVars: { showinfo: 1 } } }} url={'https://www.youtube.com/watch?v=' + this.state.viewdata.contestVideoUrl} playing={false} controls />
                          </p>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={11} className="CViewdetails">
                        <h3>Tags</h3>

                        <span >
                          {this.state.order1}</span>

                      </Col>
                    </Row>
                    {this.state.viewdata3 !== 0 || this.state.viewdata2 !== undefined ? <div>
                      <Row className="hidesyrele">

                        <Col span={24} className="hidesyrele">

                          <ul>

                            <Col span={11} className="hidesyrele CViewdetails">

                              <h3 className="hidesyrele">synopsis</h3>
                              <p className="hidesyrele challengesViewSynopsis">{this.state.viewdata2.synopsis === undefined ? '' : this.state.viewdata2.synopsis}</p>
                            </Col>
                          </ul>
                        </Col>
                      </Row>
                      <Row className="hidesyrele">
                        <Col span={24} className="hidesyrele CViewdetails">

                          <ul>
                            <Col span={11} className="marginLeft20" className="hidesyrele">
                              <h3 className="hidesyrele">Release Date</h3>
                              <p className="hidesyrele challengesViewreleasedatep"><span> {this.state.viewdata2.releaseDate} </span>
                                <span>  {this.state.viewdata2.movieDuration}</span></p>
                            </Col>
                          </ul>
                        </Col>
                      </Row>
                    </div> : ''}
                  </div>
                  <div className="contestBelow">
                    <Row>
                      <div className="hidecrewcast CViewdetails">
                        <h3 className="hidecrewcast">Cast Details</h3>
                        {this.state.viewdata2.cast !== undefined ? this.state.viewdata2.cast.map((cast, index) => {
                          return (<div>
                            <Col span={8}>
                              <ul className="list-inline">
                                <li className="ant-col-lg-6"> <p><img src={cast.imageUrl} alt='' className="ccelebrityImg" /></p> </li> <li className="ant-col-lg-18"> <div className="castDetails">
                                  <h4>{cast.actorName}</h4> <p>{cast.dept}</p> </div>
                                </li>
                              </ul>
                            </Col>
                          </div>
                          );
                        }) : ''}

                      </div>
                    </Row>
                    <Row>
                      <div className="hidecrewcast CViewdetails">
                        <h3 className="hidecrewcast">Crew Details</h3>
                        {this.state.viewdata2.crew !== undefined ? this.state.viewdata2.crew.map((crew, index) => {
                          return (
                            <div>
                              <Col span={8}>
                                <ul className="list-inline">

                                  <li className="ant-col-lg-6"> <p><img src={crew.imageUrl} alt='' className="ccelebrityImg" /></p> </li> <li className="ant-col-lg-18"> <div className="castDetails">
                                    <h4>{crew.actorName}</h4> <p>{crew.dept}</p> </div>
                                  </li>
                                </ul>
                              </Col>
                            </div>

                          );
                        }) : ''
                        }
                      </div>
                    </Row>
                    <Col span={21} className="Terms">
                      <h3>Terms & Conditions</h3>
                      <RichTextEditor
                        value={this.state.value}
                        readOnly={this.state.readOnly}
                        />
                      <div className="offers">
                        <h3>Define Offers</h3>
                        {this.state.viewdata.offers}
                      </div>
                    </Col>

                    <br />
                  </div>
                </Scrollbars>
                <Col className="modalFooter">
                  <div className="textRight">
                    {/*   <Button type="primary" onClick={this.handleCancel}> Cancel</Button> */}
                  </div>
                </Col>
              </Spin>
            </Modal>
          </div>

        </div>
      );

    }
  }
}

export default (ContestsPage);
/* eslint-disable */