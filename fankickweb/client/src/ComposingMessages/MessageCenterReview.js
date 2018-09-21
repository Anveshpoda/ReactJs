/* eslint-disable*/
import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import axios from 'axios';
import './Composemessage.css';
import Dashboard from '../Dashboard/Dashboard';
import expandIcon from '../images/expandIcon.png';
import { Icon, Button, Row, Input, Col, message } from 'antd';
import CreatedataItem from './CreatedataItem';
import { Scrollbars } from 'react-custom-scrollbars';
import EditContest from '../challenges/EditContest';
import CreateData from '../crud/Createdata'
import EditFun2Win from '../editfun2winNew/EditFun2WinNew';
const { TextArea } = Input;

class MessageCenterReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      comment: "",
      commentedon : "",
      module : ""
    }
  }
  componentDidMount = () => {
    this.setState({
      comments: JSON.parse(sessionStorage.getItem('comments'))
    });
    this.setState({module : this.props.params.module})
  }
  commentChange = (e) => {
    this.setState({ comment: e.target.value })
  }
  comment = () => {
   
    var _this = this;
    var userObject = JSON.parse(sessionStorage.getItem('user'));
    var data = {
      commentedBy: userObject._id,
      commentedUsername: userObject.firstname + " " + userObject.lastname,
      imageUrl: userObject.profileImage,
      role: userObject.role.name,
      message: this.state.comment
    }
    const url = '/approvalCycle/comments/' + sessionStorage.getItem('messageid');
    var request = new Request(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'x-access-token': sessionStorage.getItem('token')
      },
      body: JSON.stringify(data)
    });
    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        if (response.status === 200 && response.message === "Success") {
          _this.setState({ comment: '' });
          _this.getComments();
          if (_this.state.comments.length === 1) {
            _this.setState({ commentedon: true ,module : ''})
            _this.approvePacks();
          }
        }
        else {
        }
      })  
  }

  getComments = () => {
    var _this = this;
    const url = '/approvalCycle/displayComments/' + sessionStorage.getItem('messageid');
    var request = new Request(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'x-access-token': sessionStorage.getItem('token')
      },
    });
    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        if (response.status === 200 && response.message === "Success") {
          _this.setState({ comments: response.data })
        }
        else {
        }
      })  
  }
  rejectPacks = () => {
    var _this = this;
    var userObject = JSON.parse(sessionStorage.getItem('user'));
    var data = {
      message: this.state.module === "Challenges" || this.state.module === "MetaData" ?
        "Challenge " + sessionStorage.getItem('Title') + " has been Rejected by" + " " + userObject.firstname + " " + userObject.lastname + ". We appreciate your efforts!" 
        :  "",
      createdDate: new Date().toISOString()
    }
    const url = '/approvalCycle/storeMessages/' + sessionStorage.getItem('messageid');
    var request = new Request(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'x-access-token': sessionStorage.getItem('token')
      },
      body: JSON.stringify(data)
    });
    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        if (response.status === 200 && response.message === "Success") {
        message.success("Rejected");
        }
        else {
        }
      }) 
  }
  approvePacks = () => {
    var _this = this;
    var userObject = JSON.parse(sessionStorage.getItem('user'));
    var data = {
      message:this.state.commentedon === true ? "Comments has been initiated" : this.state.module === "Challenges" || this.state.module === "MetaData" ?
        "Challenge " + sessionStorage.getItem('Title') + " has been Approved by" + " " + userObject.firstname + " " + userObject.lastname + ". We appreciate your efforts!" 
        : '',
      createdDate: new Date().toISOString()
    }
    const url = '/approvalCycle/storeMessages/' + sessionStorage.getItem('messageid');
    var request = new Request(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'x-access-token': sessionStorage.getItem('token')
      },
      body: JSON.stringify(data)
    });
    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        if (response.status === 200 && response.message === "Success") {
        message.success("Successfully approved");
      { _this.state.module === "Challenges" ?  _this.approveChallengetoMobile() : _this.state.module === "MetaData" ?
    _this.approvemetaData() : ''}
        }
        else {
        }
      }) 
  }

  approvemetaData = () => {
    var con = this;
    var id = sessionStorage.getItem('packid');
    var data = {
      "isPublished": true
    }
    const url1 = '/movie-creative/' + id;
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
          message.success('Challenge approved successfully!');
        }
        else {
          message.error(`unable to approve challenge.`);
        }
      })
  }
  approveChallengetoMobile = () => {
    
        var con = this;
        var id = sessionStorage.getItem('packid');
        var data = {
          "isPublished": true ,
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
                  "contestStartDate" : new Date(response.data.data.contestStartDate).toISOString().replace(/T/, ' ').replace(/\..+/, '')  , 
                  "contestEndDate" : new Date(response.data.data.contestEndDate).toISOString().replace(/T/, ' ').replace(/\..+/, '') ,
                  "isDeleted" : response.data.data.isDeleted ,
                  "isPublished" : response.data.data.isPublished
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
  render() {
    var comment = []
    for (let key in this.state.comments) {
      var commentObj = this.state.comments[key];
      comment.push(
        <div>
          <Row className="CommentsRowBorder">
            <Col span={24}>
              <Col span={6} xs={12} sm={12} xl={17} lg={17} md={17}>
                <ul className="list-inline"><li> <img className="CircleimgMsgCenterCommentImg" src={commentObj.imageUrl} alt="messagecenter" /></li>
                  <li className=""><h2 className="imgTxt comntimgtxt">{commentObj.commentedUsername}</h2><br /><h4 className="mailtxt">{commentObj.role}</h4></li>
                </ul>
              </Col>
            </Col>
          </Row>

          <Row className="">

            <Col span={18} xs={12} sm={12} xl={16} lg={16} md={16} className="marginTop6">
              <p className="textLengthComments">{commentObj.message}</p>
            </Col>
            {/* <Col span={5} xs={12} sm={12} xl={7} lg={8} md={8} className="alignRightReplyIcon">
              <Button type="button" className="ReplyCommentBtn">Reply</Button>
            </Col> */}
          </Row>
        </div>
      )
    }
    return (
      <Dashboard>
        <div classNames="container">
          <Row>
            <Col span={24} className="Crudmenu">
              <div className="MsgCentreSubMenu">
                <div className="SubMenu">
                  <Col span={10}><h2 className="pageTitle"><Icon type="arrow-left" className="ArrowLeftReviewScreen" /> Review / CRUD Module/ Rangasthalam Movie</h2>
                  </Col>

                  <Col span={7} className="RightAlgn">
                    <Button type="primary" className='createBtn mrgLeft30' onClick={this.approvePacks.bind(this)}>Approve</Button>
                    <span onClick={this.rejectPacks.bind(this)} className="MailAttachmentRejectTxt">Reject</span>


                  </Col>

                  <Col span={7} className="RightAlgn">
                    <img src={expandIcon} alt="expand Icon" className="MailAttachmentImag" />
                    <Link to="/MessageCenterReview" className="MailAttachmentCmntTxt">Comment </Link>
                  </Col>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24} className="DataitemComponent">
              <Col span={16} className="mainFormContentmessagecen">
               <Scrollbars style={{ height: '63vh', padding: '0px 10px' }}>
              <div>
                {this.state.module === "Challenges" ? <EditContest contestid={this.props.params.id} /> : 
                this.state.module === "MetaData" ?  <CreateData contestid={this.props.params.id}/>: this.props.params.module === "ContentPack" ?
                 <EditFun2Win packId={this.props.params.id} /> : ''}
                 </div>
                    </Scrollbars>
              </Col>
              <Col span={7} className="mrgnLeft35 CommentMessagefull">
                <div className="CommentsBox">

                  <Row>
                    <Col span={24} className="commentHeader">
                      <Col span={8}>
                        <h3>Comments</h3>
                      </Col>
                      <Col span={6} className="CreateDataRight">

                        <img src={expandIcon} alt="expand Icon" className="MailAttachmentImage" />
                      </Col>
                    </Col>
                  </Row>
                  <div className="CommentsMessage">
                   <Scrollbars style={{ height: '39vh', padding: '0px 10px' }}>
                  <div>
                   {comment}
                   </div>
                      </Scrollbars>
                  </div>

                </div>



                {/* <div className="CommentBoxAlternateColor">
                  <Row className="CommentsRowBorder">
                    <Col span={24}>
                      <Col span={6} xs={12} sm={12} xl={17} lg={17} md={17}>
                        <ul className="list-inline"><li> <img className="CircleimgMsgCenterCommentImg" src="https://i.ndtvimg.com/i/2016-08/pawan-kalyan_650x400_71472348551.jpg" alt="messagecenter" /></li>
                          <li className=""><h2 className="imgTxt">Elivintho</h2><br /><h4 className="mailtxt">Moderator</h4></li>
                        </ul>
                      </Col>
                    </Col>
                  </Row>

                  <Row className="">

                    <Col span={18} xs={12} sm={12} xl={16} lg={16} md={16} className="marginTop13">
                      <p className="textLengthComments">It is a long established fact that a reader will be when looking at its layout.</p>
                    </Col>
                    <Col span={5} xs={12} sm={12} xl={7} lg={8} md={8} className="alignRightReplyIcon">
                      <Button type="button" className="ReplyCommentBtn">Reply</Button>
                    </Col>
                  </Row>
                </div> */}





                <div className="CommentBoxAlternateColor">
                  <Row className="">

                    <Col span={6} xs={12} sm={12} xl={24} lg={24} md={24}>
                      <TextArea className="textAreaCommentBox" 
                      value={this.state.comment}  onChange={this.commentChange.bind(this)} rows={3} placeholder='Type your Comment here' />
                    </Col>
                  </Row>

                  <Row className="">
                    <Col span={5} xs={12} sm={12} xl={7} lg={8} md={8} className="alignRightReplyIcon">
                      <Button type="button" onClick={this.comment.bind(this)} className="ReplyCommentBtn">Reply</Button>
                    </Col>
                  </Row>
                </div>






              </Col>

            </Col>
          </Row>

        </div>



      </Dashboard>
    );
  };
}


export default MessageCenterReview;
/* eslint-disable*/