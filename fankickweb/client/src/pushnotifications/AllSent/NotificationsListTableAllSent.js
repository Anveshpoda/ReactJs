/* eslint-disable */
import React from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import Custom_icon from './Custom_icon.png';
import Scheduled_icon from '../Scheduled/Scheduled_icon.png';
import moment from 'moment-timezone';
import $ from "jquery";
import { Icon, Input, Button, Checkbox, Modal, Table, Switch, Row, Col, Select, message } from 'antd';
import '../pushNotifications.css';
const Search = Input.Search;
const Option = Select.Option;


class NotificationsListTableAllSent extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      visible: false,
      highLight: false,
      modalData: {},
      category: 'All',
      deletedArray: [],
      search: '',
      notificationCategory: '',
      notificationTypes: [
        {
          "_id": "5a28051b9f13aace6a02d48d",
          "name": "Scheduled Notifications"
        }, {
          "_id": "5a28052b9f13aace6a02d4ed",
          "name": "Custom Notifications"
        }],
      categories: [],
      nType: '',
      data2: []
    }
  }

  componentWillMount() {
    this.getData();
    // this.getNotificationTypes();
  }

  getNotificationTypes = () => {
    var _this = this;
    var fetchRequest = axios.create({
      headers: { 'Content-Type': 'application/json' }
    });
    fetchRequest.get('/notificationType').then((response) => {
      sessionStorage.setItem("notificationType", JSON.stringify(response.data.data));
      _this.setState({ notificationTypes: response.data.data });
    })
  }

  getData = () => {
    var allNotifications = axios.create({
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': sessionStorage.token
      }
    })
    allNotifications.get('/getAllNotifications').then((response) => {
      var notificationArray = response.data.data;
      this.setState({ data: notificationArray, data2: notificationArray, deletedArray: [] })
    })
  }

  onNotificationTypeChange = (e) => {
    var _this = this;
    if (e.key == "All") {
      this.setState({ category: e.label, notificationCategory: '', categories: [], data: _this.state.data2 })
    }
    else {
      this.state.notificationTypes.map((type) => {
        if (e.key === type._id) {
          _this.setState({ nType: type.name })
          var fetchReq = axios.create({
            params: { nTypeId: e.key },
            headers: { 'Content-Type': 'application/json' }
          });
          fetchReq.get('/notificationCategory').then((response) => {
            _this.setState({ categories: response.data.data, category: e.label, notificationCategory: '' })
          })
        }
      })
    }
  }

  onKeyPress = (e) => {
    var specialKeys = new Array();
    specialKeys.push(8); //Backspace
    e = (e) ? e : window.event;
    var charCode = (e.which) ? e.which : e.keyCode;
    if ((charCode >= 48 && charCode <= 57) || specialKeys.indexOf(charCode) != -1) {
      document.getElementById('mobile').innerHTML = ("Please enter only chars");
      e.preventDefault();
      return false;
    }
    document.getElementById('mobile').innerHTML = ("");
    return true;
  }

  handleDelete = () => {
    var { deletedArray } = this.state;
    if (Object.keys(this.state.deletedArray).length > 0) {
      var sids = this.state.deletedArray[0].scheduledArray
      var cids = this.state.deletedArray[0].customArray
      if (sids.length != 0) {
        var url = '/scheduledNotification';
        var request = new Request(url, {
          method: "DELETE",
          body: JSON.stringify(sids),
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': sessionStorage.token
          }
        })
        fetch(request)
          .then(function (response) {
            if (response.status === 200) {
              message.success(`Scheduled Notification deleted successfully`);
            } else {
              message.error(`Unable to Delete the Notification`);
            }
          })
      }
      if (cids.length != 0) {
        var url = '/customNotification';
        var request = new Request(url, {
          method: "DELETE",
          body: JSON.stringify(cids),
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': sessionStorage.token
          }
        })
        fetch(request)
          .then(function (response) {
            if (response.status === 200) {
              message.success(`Custom Notification deleted successfully`);
            } else {
              message.error(`Unable to Delete the Notification`);
            }
          })
      }
      this.getData()
    }

  }

  onCategoryChange = (value) => {
    var _this = this;
    if (value != "All") {
      var new4 = [];
      _this.state.data2.map((record) => {
        if (value === record.category && _this.state.category == record.type) {
          new4.push(record);
          _this.setState({ data: new4, notificationCategory: value });
        }
        else if (value === record.category && _this.state.category == record.type) {
          new4.push(record);
          _this.setState({ data: new4, notificationCategory: value });
        }
        _this.setState({ data: new4 });
      })

    } else {
      var newArr = []
      if (value == 'All' && _this.state.category == "Custom Notifications") {
        _this.state.data2.map((record) => {
          if (_this.state.category == record.type) {
            newArr.push(record);
          }
        })
        _this.setState({ data: newArr, notificationCategory: value })
      } else if (value == 'All' && _this.state.category == "Scheduled Notifications") {
        _this.state.data2.map((record) => {
          if (_this.state.category == record.type) {
            newArr.push(record);
          }
        })
        _this.setState({ data: newArr, notificationCategory: value })
      }
      else {
        _this.setState({ data: _this.state.data2, notificationCategory: value })
      }
    }
  }

  showModalData = (record, e) => {
    var _this = this;
    var serviceUrl;
    if (record.type == "Scheduled Notifications") {
      serviceUrl = '/scheduledNotification/'
    }
    else if (record.type == "Custom Notifications") {
      serviceUrl = '/customNotification/'
    }
    this.setState({
      visible: true
    });

    if (record._id != '') {
      var fetchData = axios.create({
        headers: {
          'x-access-token': sessionStorage.token,
          'Content-Type': 'application/json'
        }
      });
      fetchData.get(serviceUrl + record._id).then(function (response) {
        _this.setState({ modalData: response.data.data });
      })
    }
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
      modalData: {}
    });
  }

  handleSearch = (e) => {
    this.setState({
      search: e.target.value.substr(0, 20)
    });
  }

  render() {
    const columns = [
      {
        title: 'Type',
        dataIndex: 'type',
        render: text => <a href="#">{text}</a>,
      }, {
        title: 'Notification Title',
        dataIndex: 'notificationtitle',
      },
      {
        title: 'Scheduled Status',
        dataIndex: 'ScheduledStatus',
      },
      {
        title: 'Created on',
        dataIndex: 'createdOn',
      }, {
        title: 'Category',
        dataIndex: 'category',
      }, {
        title: 'Actions',
        dataIndex: 'actions',
      }];

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        var customArray = []
        var scheduledArray = []
        selectedRows.map((record) => {
          var ids = record.key.split(",");
          if (ids[1] == 'Scheduled Notifications') {
            scheduledArray.push(ids[0])
          }
          else if (ids[1] == 'Custom Notifications') {
            customArray.push(ids[0])
          }
        })
        var delArr = [{ 'scheduledArray': scheduledArray, 'customArray': customArray }]
        this.setState({ deletedArray: delArr, highLight: true })
        if (selectedRowKeys.length === 0) {
          this.setState({ highLight: false })
        }
      },
      getCheckboxProps: record => ({
        // disabled: record.name === 'Disabled User', // Column configuration not to be checked
      })
    };

    const data1 = [];
    let filteredRecords = this.state.data.filter(
      (record) => {
        return record.category.toLowerCase().includes(this.state.search.toLowerCase()) || record.title.toLowerCase().includes(this.state.search.toLowerCase());
      }
    );

    this.state.data.length === 0 ? null : filteredRecords.map((item, index) => {
      data1.push({
        key: item._id + ',' + item.type,
        type: item.type === "Custom Notifications" ? <img src={Custom_icon} alt="Custom icon" /> : <img src={Scheduled_icon} alt="Scheduled icon" />,
        notificationtitle: item.title,
        ScheduledStatus: <Button type="" className="greyButton">{item.schedule != undefined ? item.schedule != '' ? item.schedule : 'Immediate' : 'Custom'} </Button>,
        createdOn: moment(item.createdDate).format('YYYY-MM-DD'),
        category: item.category,
        actions: <div><Icon className="AllsentNotifieye" type="eye-o" onClick={this.showModalData.bind(this, item)} /></div>
      })
    })

    var notificationTypes = this.state.notificationTypes.map((item) => <Option value={item._id}>{item.name}</Option>)
    var categories = this.state.categories.map((item) => <Option value={item.name}>{item.name}</Option>)
    var { modalData } = this.state;
    if (Object.keys(modalData).length > 0) {
      modalData.locationTags = modalData.locationTags.join(',');
    }
    return (
      <div>
        <div className="SubMenuPushNotifi">
          <Row className="">

            <Col span={4}>

              <Select className="Pusingselects" getPopupContainer={triggerNode => triggerNode.parentNode}


                placeholder="Select Type"
                optionFilterProp="children"
                onChange={this.onNotificationTypeChange}
                value={{ key: this.state.category }}
                labelInValue
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                {notificationTypes}
                <Option value="All">All</Option>
              </Select>

            </Col>
            {/* </Col>
            <Col span={17} className='MarginTop20'> */}

            <Col span={4}>
              <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                showSearch className="mrgnLeft25 Pusingselects"

                placeholder="Select Notification Category"
                optionFilterProp="children"
                onChange={this.onCategoryChange}
                value={this.state.notificationCategory}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                {categories}
                <Option value="All">All</Option>
              </Select>


            </Col>
          </Row>
          <div>
            <Row>
              <Col span={24}>
                <ul className="list-inline allNotifiList" >
                  <li style={{ width: '70%' }}><h3 className="">All Notifications list</h3></li>
                  {this.props.role.delete === true ?
                    <li style={{ 'text-align': 'right', 'cursor': 'pointer', width: '10%', fontSize: 16, paddingTop: 5 }} className={this.state.highLight ? 'blue' : ''} ><span onClick={this.handleDelete}><Icon type="delete" title="Delete" /></span></li>
                    : ''}
                  <li className="search-custom MarginTop-20" style={{ width: '20%', float: 'right' }}> <Search value={this.state.search} onChange={this.handleSearch} onKeyPress={this.onKeyPress}
                    placeholder="Search Here"
                    style={{ width: '100%' }}
                    />
                    <p style={{ "color": "red", "text-align": "left" }} id="mobile" className="mobile"></p></li>
                </ul>
              </Col>
              <Col span={24}>
                <Table className="PushnotificationsTable tableBorder" rowSelection={rowSelection} columns={columns} dataSource={data1} />
              </Col>
            </Row>
          </div>


        </div>
        <Modal className="modalCustmNotif"
          title={modalData.type}
          style={{ width: "630" }}
          wrapClassName="vertical-center-modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          >
          <div className="">
            <p><b className="boldTxt">Notification Category:</b> {modalData.category}</p>
            <br />
            {modalData.category != "Miscellaneous" ? <div>
              <Row>
                <Col span={12}>
                  <p><b className="boldTxt">Target User Category:  </b> {modalData.targetUserCategory} </p>
                </Col>
                {modalData.category != "Challenges" ? <div>
                  <Col span={12}>
                    <p><b className="boldTxt"> Target User Sub-Category: </b> {modalData.targetUserSubcat} </p>
                  </Col>
                </div> : ''}
              </Row>
            </div> : ''}
            <br />
            <Row>
              <Col span={24}>
                <p><b className="boldTxt">Target Activity:</b> If - {modalData.targetActivity} - {modalData.performed ? modalData.performed : modalData.range} - {modalData.forCelebrity ? modalData.forCelebrity : modalData.likesCount} - {modalData.celebrityName || modalData.startLikesCount ? modalData.celebrityName || modalData.startLikesCount : modalData.startLikesCount} - {modalData.endLikesCount}
                  <br />
                  <span className="mrgnLeft90"> {modalData.within} - last - {modalData.days ? modalData.days : modalData.startDays} - to - {modalData.endDays ? modalData.endDays : 'null'}  - days  </span>  </p>
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={5}>
                <p> <img src={modalData.imageUrl} alt="image" className="imgpUSH" /> </p>
              </Col>
              <Col span={12}>
                <p>   <b className="boldTxt">{modalData.title}</b> </p>
                <br />
                <p>{modalData.description}</p>
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={24}>
                <p><b className="boldTxt"> Date: </b>{moment(modalData.createdDate).format("YYYY-MM-DD")}
                  <b className="boldTxt margleft20">Time:</b> {moment(modalData.createdDate).format("HH:mm a")}</p>
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={16}>
                <p><b className="boldTxt">Target Locations:</b> {modalData.locationTags ? modalData.locationTags : 'Global'} </p>
              </Col>
            </Row>
            <br />
          </div>
        </Modal>
      </div>
    );
  };
}

export default NotificationsListTableAllSent;
/* eslint-disable */