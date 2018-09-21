/*eslint-disable*/
import React from 'react';
import './Composemessage.css';
import moment from "moment";
import Dashboard from '../Dashboard/Dashboard';
import { Link } from 'react-router';
import { Icon, Button, Input, Col, Row, Table, Pagination } from 'antd';

const Search = Input.Search;




class MessageCentre extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      notifications: [],
      pageNumber: 1,
      numOfPages: 0,
      messageType: "All",
      reviewCount: 0
    }
  }
  getnotificationDetails = (page) => {
    this.setState({ messageType: "All" })
    var _this = this;
    var userObject = JSON.parse(sessionStorage.getItem('user'));
    const url = '/approvalCycle/messagesList/' + userObject._id + '/' + page;
    var request = new Request(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'x-access-token': sessionStorage.getItem('token')
      }
    });
    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        if (response.status === 200 && response.message === "Success") {
          //console.log("response", response.data,"resonse",response.numofPages)
          _this.setState({ notifications: response.data, numOfPages: response.numofPages })
        }
        else {
        }
      })
  }
  getreviewCount = () => {
    var _this = this;
    var userObject = JSON.parse(sessionStorage.getItem('user'));
    const url = '/approvalCycle/reviewCount/' + userObject._id;
    var request = new Request(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'x-access-token': sessionStorage.getItem('token')
      }
    });
    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        if (response.status === 200 && response.message === "Success") {
          _this.setState({ reviewCount: response.data })
        }
        else {
        }
      })
  }
  getreadMessages = (page) => {
    this.setState({ messageType: "Read" })
    var _this = this;
    var userObject = JSON.parse(sessionStorage.getItem('user'));
    const url = '/approvalCycle/readMessages/' + userObject._id + '/' + page;
    var request = new Request(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'x-access-token': sessionStorage.getItem('token')
      }
    });
    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        if (response.status === 200 && response.message === "Success") {
          _this.setState({ notifications: response.data, numOfPages: response.numofPages })
        }
        else {
        }
      })
  }


  getunreadMessages = (page) => {
    this.setState({ messageType: "unRead" })
    var _this = this;
    var userObject = JSON.parse(sessionStorage.getItem('user'));
    const url = '/approvalCycle/unreadMessages/' + userObject._id + '/' + page;
    var request = new Request(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'x-access-token': sessionStorage.getItem('token')
      }
    });
    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        if (response.status === 200 && response.message === "Success") {
          _this.setState({ notifications: response.data, numOfPages: response.numofPages })
        }
        else {
        }
      })
  }
  getsentMessages = (page) => {
    this.setState({ messageType: "Sent" })
    var _this = this;
    var userObject = JSON.parse(sessionStorage.getItem('user'));
    const url = '/approvalCycle/sentMessages/' + userObject._id + '/' + page;
    var request = new Request(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'x-access-token': sessionStorage.getItem('token')
      }
    });
    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        if (response.status === 200 && response.message === "Success") {
          _this.setState({ notifications: response.data, numOfPages: response.numofPages })
        }
        else {
        }
      })
  }
  componentDidMount = () => {
    this.getnotificationDetails(this.state.pageNumber);
    this.getreviewCount();
  }
  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  reviewButton = (messageid, packid, comments) => {
    sessionStorage.setItem("messageid", messageid);
    sessionStorage.setItem("packid", packid);
    sessionStorage.setItem("comments", JSON.stringify(comments));
  }
  changePages = (page) => {
    this.setState({ pageNumber: page });
    {
      this.state.messageType === "All" ? this.getnotificationDetails(page) :
        this.state.messageType === "Read" ? this.getreadMessages(page) :
          this.state.messageType === "unRead" ? this.getunreadMessages(page) :
            this.state.messageType === "Sent" ? this.getsentMessages(page) : ''
    }
  }
  readMessage = (messageid) => {
    var _this = this;
    var userObject = JSON.parse(sessionStorage.getItem('user'));
    const url = '/approvalCycle/readStatus/' + messageid + "/" + userObject._id;
    var request = new Request(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'x-access-token': sessionStorage.getItem('token')
      }
    });
    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        if (response.status === 200 && response.message === "Success") {

        }
        else {
        }
      })
  }
  render() {

    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const columns = [{
      title: 'Sender',
      dataIndex: 'Sender',
    }, {
      title: 'Message',
      dataIndex: 'Message',
    }, {
      title: 'Date',
      dataIndex: 'Date',
    }];
    const data = [];
    var userObject = JSON.parse(sessionStorage.getItem('user'));
    for (let key in this.state.notifications) {
      var notifiObj = this.state.notifications[key];
      var message;
      for (var i = 0; i < notifiObj.MessageToWhom.length; i++) {
        if (notifiObj.MessageToWhom[i].toWhom === userObject._id) {
          if (notifiObj.MessageToWhom[i].readOrUnread === false) {
            message = <ul className="list-inline"><li className="ant-col-18"><Link to={`/mailPage/${notifiObj._id}`} onClick={this.readMessage.bind(this, notifiObj._id)}>
              <p className="textLength read">{notifiObj.messages[notifiObj.messages.length - 1].message}</p></Link></li>
              {notifiObj.review ? <li className="ant-col-6"> <Link to={`/MessageCenterReview/${notifiObj.module}/${notifiObj.createdPackId}`} className="reviewButton">
                <Button className="reviewButton" onClick={this.reviewButton.bind(this, notifiObj._id, notifiObj.createdPackId, notifiObj.comments)}>Review</Button>
              </Link></li> : ''}</ul>
          }
        } else {
          message = <ul className="list-inline"><li className="ant-col-18"><Link to={`/mailPage/${notifiObj._id}`}>
            <p className="textLength unRead">{notifiObj.messages[notifiObj.messages.length - 1].message}</p></Link></li>
            {notifiObj.review ? <li className="ant-col-6"> <Link to={`/MessageCenterReview/${notifiObj.module}/${notifiObj.createdPackId}`} className="reviewButton">
              <Button className="reviewButton" onClick={this.reviewButton.bind(this, notifiObj._id, notifiObj.createdPackId, notifiObj.comments)}>Review</Button>
            </Link></li> : ''}</ul>
        }
      }
      data.push({
        key: key,
        Sender: <ul className="list-inline"><li> <img className="CircleimgMsgCenter" src={notifiObj.imageUrl} alt="message center" /></li>
          <li className="pdngTop8">{notifiObj.sentBy}</li></ul>,
        Message: <div>{message}</div>,
        Date: moment(notifiObj.sentDate).format('DD/MM/YYYY'),
      });
    }

    var tableConfig = {
      pagination: false
    }

    return (
      <Dashboard>
        <div classNames="container">

          <Row>
            <Col span={24} className="Crudmenu">
              <div className="MsgCentreSubMenu">
                <div className="SubMenu">
                  <Col span={5}><h2 className="pageTitle">Messages/Notifications</h2>
                  </Col>

                  <Col span={8}>

                    <nav className='challengesnavigation RghtAlign'>
                      <Button onClick={this.getnotificationDetails.bind(this, this.state.pageNumber)} className="ComposemsgBtn">All</Button>
                      <Button onClick={this.getreadMessages.bind(this, this.state.pageNumber)} className="ComposemsgBtn">Read</Button>
                      <Button onClick={this.getunreadMessages.bind(this, this.state.pageNumber)} className="ComposemsgBtn">Unread</Button>
                      <Button onClick={this.getsentMessages.bind(this, this.state.pageNumber)} className="ComposemsgBtn">Sent</Button>
                    </nav>
                  </Col>
                  {/*   <Col span={6} className="messageCenterSearches">
                    <Search className="SearchHistryTxt"
                      placeholder="Search my History"
                      onSearch={value => console.log(value)}
                      style={{ width: 200 }}
                      />


                  </Col>
                 <Col span={4}>
                    <Link to="/MessageCenterReview"><Button type="primary" className='createBtn mrgLeft30'>Compose Message</Button></Link>
                  </Col> */}
                </div>
              </div>
            </Col>
          </Row>
          <div className="widthresponsive">
            <div className="MessageCentresubmenu">
              <Row className="mrgBottom20">
                <Col span={24}>
                  <Col span={4}>
                    <h3 className="MsgsTxt">  All Messages</h3>
                  </Col>

                  <Col span={15}>

                    <nav className='challengesnavigation'>
                      <Link className="mrgRight20"><Button className="ComposemsgButn">Reviews</Button><span className="circlevthTxt">{this.state.reviewCount}</span></Link>
                      {/* <Link className="mrgRight20"><Button className="ComposemsgButn">Notifications</Button><span className="circlevthTxt">2</span></Link>
                      <Link><Button className="ComposemsgButn">Messages</Button><span className="circlevthTxt">121</span></Link> */}
                    </nav>
                  </Col>

                  {/*   <Col span={1} className="RightAlgn">
                    <Icon type="delete" className="DeltFont" />
                  </Col> */}
                </Col>

              </Row>
              <Row>
                <Col span={24}>
                  <Table rowSelection={rowSelection} columns={columns} {...tableConfig} dataSource={data} scroll={{ x: 900 }} className="ComposemgsCentreTable" />
                  <Pagination className="FanClubpageintion" onChange={this.changePages} total={this.state.numOfPages * 10} />
                </Col>
              </Row>
            </div>

          </div>



        </div>
      </Dashboard>
    );
  };
}


export default MessageCentre;
/*eslint-disable*/