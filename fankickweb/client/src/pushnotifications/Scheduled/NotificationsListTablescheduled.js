/* eslint-disable */
import React from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import moment from 'moment-timezone';
import Scheduled_icon from './Scheduled_icon.png';
import $ from "jquery";
import css from '../../pushnotifications/pushNotifications.css';
import { Link } from 'react-router';
import { Icon, Input, Button, Checkbox, Table, Switch, Select, Modal, Row, Col, message, Spin } from 'antd';
const Search = Input.Search;
const Option = Select.Option;
const dateFormat = 'YYYY/MM/DD';
const format = 'h:mm:ss';


// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
  },
  getCheckboxProps: record => ({
    // disabled: record.name === 'Disabled User', // Column configuration not to be checked
  }),
};

class NotificationsListTableSchd extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      search: '',
      modalData: {},
      highLight: false,
      loading: true,
      category: '',
      notificationCategories: [],
      data: [],
      data1: [],
      data2: [],
      deletedArray:[]
    }
  }

  componentWillMount() {
    this.getNotificationCategory();
    this.getData();
  }

  getNotificationCategory = () => {
    var _this = this;
    var fetchData = axios.create({
      params: { nTypeId: '5a28051b9f13aace6a02d48d' },
      headers: { 'Content-Type': 'application/json' }
    })
    fetchData.get('/notificationCategory').then(function (response) {
      _this.setState({ notificationCategories: response.data.data })
    })
  }
  getData = () => {
    var _this = this;
    var fetchData = axios.create({
      headers: {
        'x-access-token': sessionStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    })
    fetchData.get('/scheduledNotification').then(function (response) {
      _this.setState({ data: response.data.data, data2: response.data.data,deletedArray:[], loading: false, category: 'All' })
    })
  }

  showModalScheduleView = (rowId) => {
    this.setState({
      visible: true,
      id: rowId
    });
    var _this = this;
    if (rowId != '') {
      var fetchData = axios.create({
        headers: {
          'x-access-token': sessionStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      });
      fetchData.get('/scheduledNotification/' + rowId).then(function (response) {
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

  handleDelete = () => {
    var { deletedArray } = this.state;
    var self = this;
    if (this.state.deletedArray.length != 0) {
      var url = '/scheduledNotification';
      var request = new Request(url, {
        method: "DELETE",
        body: JSON.stringify(deletedArray),
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': sessionStorage.getItem("token")
        }
      })
      fetch(request)
        .then(function (response) {
          if (response.status === 200) {
            message.success(`Notification deleted successfully`);
            self.getData();
            self.state.deletedArray = [];
          } else {
            message.error(`Unable to Delete the Notification`);
          }
        })
    }
  }

  handleCategoryChange = (value) => {
    var _this = this;
    if (value != "All") {
      var new4 = [];
      _this.state.data2.map((record) => {
        if (value === record.category) {
          new4.push(record);
        }
      })
      _this.setState({ data: new4, category: value });
    } else {
      _this.setState({ data: _this.state.data2, category: value })
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

  onSwitchChange = (record, e) => {
    // this.setState({})
    var _this = this;
    record.status = !record.status
    var url = '/scheduledNotification/' + record._id;
    var request = new Request(url, {
      method: "PUT",
      body: JSON.stringify(record),
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': sessionStorage.getItem("token")
      }
    })
    fetch(request)
      .then(function (response) {
        if (response.status === 200) {
          message.success(`Notification Updated successfully`);
          _this.getData()
          _this.setState({ category: 'All' })
        } else {
          message.error(`Cannot Update Notification`);
        }
      })

  }

  render() {
    const columns = [{
      title: 'Type',
      dataIndex: 'type',
      render: text => <a href="#">{text}</a>,
    }, {
      title: 'Notification Title',
      dataIndex: 'notificationtitle',
    },
    {
      title: 'Schedule',
      dataIndex: 'ScheduledStatus',
    },
    {
      title: 'Created on',
      dataIndex: 'createdOn',
    }, {
      title: 'Category',
      dataIndex: 'category',
    }, {
      title: 'Status',
      dataIndex: 'status',
    }, {
      title: 'Actions',
      dataIndex: 'actions',
    }];

    // rowSelection object indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ deletedArray: selectedRowKeys, highLight: true })
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
        key: item._id,
        type: <img src={Scheduled_icon} alt="Scheduled icon" />,
        notificationtitle: item.title,
        ScheduledStatus: <Button type="" className="greyButton"> {item.schedule != '' ? item.schedule : 'Immediate'}</Button>,
        createdOn: moment(item.createdDate).format('YYYY-MM-DD'),
        category: item.category,
        status: <Switch checked={item.status} onChange={this.onSwitchChange.bind(this, item)} />,
        actions: <div><Icon type="eye-o"className="PredefinedsentNotifieye" onClick={this.showModalScheduleView.bind(this, item._id)} /> |<Link to={`/push-notifications/${item._id}/type/${item.type}`}>
        <Icon type="edit" className="PredefinedsentNotifieye"/></Link></div>
      })
    })

    const mapCategories = this.state.notificationCategories.map((category) => <Option value={category.name}>{category.name}</Option>)
    var { modalData } = this.state;
    if (Object.keys(modalData).length > 0) {
      modalData.locationTags = modalData.locationTags.join(',');
    }
    return (
      <div>
        <Spin spinning={this.state.loading} tip="Loading Page... Please Wait">
          <div>
            <Row className="">
              <Col span={17} className=''>
                <div className="paddingDropdown">
                  <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                    showSearch
                    style={{ width: 300 }}
                    placeholder="Select Notification Category"
                    optionFilterProp="children"
                    onChange={this.handleCategoryChange}
                    value={this.state.category}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                    {mapCategories}
                    <Option value='All'>All</Option>
                  </Select>
                </div>
              </Col>


              <div className="SubMenuPushNotifi">
                <ul className="list-inline allNotifiList">
                  <li style={{ width: '70%' }}><h3>Scheduled Notifications list</h3></li>
                  {this.props.role.delete===true?
                  <li style={{ 'text-align': 'right', 'cursor': 'pointer', width: '10%', fontSize: 16, }} className={this.state.highLight ? 'blue' : ''} ><span onClick={this.handleDelete}>
                  <Icon type="delete" title="Delete" /></span></li>:''}
                  <li className="search-custom" style={{ width: '20%' }}> <Search value={this.state.search} onChange={this.handleSearch} onKeyPress={this.onKeyPress}
                    placeholder="Search Here"
                    style={{ width: '100%' }}
                    />
                    <p style={{ "color": "red", "text-align": "left" }} id="mobile" className="mobile"></p></li>
                </ul>
                <Table className="PushnotificationsTable tableBorder" rowSelection={rowSelection} columns={columns} dataSource={data1} pagination={{ pageSize: 5 }} />
              </div>
            </Row>
          </div>
          <Modal className="modalHeight modalCustmNotif"
            style={{ width: "630" }}
            wrapClassName="vertical-center-modal"
            title={modalData.type}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={null}
            >
            <div className="">
              <p><b className="boldTxt">Notification Category:</b> {modalData.category}</p>
              <br />
              {modalData.category!=="Miscellaneous"?
              <Row>
                <Col span={12}>
                  <p><b className="boldTxt">Target User Category:</b>  {modalData.targetUserCategory} </p>
                </Col>
                <Col span={12}>
                  <p><b className="boldTxt">Target User sub-Category:</b> {modalData.targetUserSubcat}  </p>
                </Col>
              </Row>:''}
              <br />
              <Row>
                <Col span={24}>
                  <p><b className="boldTxt">Target Activity:</b> If - {modalData.targetActivity} - {modalData.performed ? modalData.performed : modalData.range} - {modalData.forCelebrity ? modalData.forCelebrity : modalData.likesCount} - {modalData.celebrityName || modalData.startLikesCount ? modalData.celebrityName || modalData.startLikesCount : modalData.startLikesCount} - {modalData.endLikesCount}
                    <br />
                    {modalData.category!=="Miscellaneous"?<span className="mrgnLeft90"> {modalData.within} - last - {modalData.days ? modalData.days : modalData.startDays} - to - {modalData.endDays ? modalData.endDays : ''}  - days  </span>:""}  </p>
                </Col>
              </Row>
              <Row>
                <Col span={4}>
                  <img src={modalData.imageUrl} className="imgpUSH" alt="image" />
                </Col>
                <Col span={20}>
                  <h4 className="ScheduledModaldatatitle">{modalData.title}</h4>
                  <p className="Scheduledmodaldatadsec"><span>{modalData.description}</span>
                  </p>
                </Col>
              </Row>
              <br />
              <Row>
                <Col span={8}>
                  <p><b className="boldTxt">Scheduled:</b> {modalData.schedule} </p>
                </Col>
                <Col span={8}>
                  <p><b className="boldTxt">Date:</b>{moment(modalData.scheduledDate, dateFormat).format('DD/MM/YYYY')}</p>
                </Col>
                <Col span={8}>
                  <p><b className="boldTxt">Time:</b>{moment(modalData.scheduledDate).format('HH:mm:ss')} </p>
                </Col>
              </Row>
              <br />
              <Row>
                <Col span={16}>
                  <p><b className="boldTxt">Target Locations:</b> {modalData.locationTags ? modalData.locationTags : 'Global'} </p>
                </Col>
              </Row>
            </div>
          </Modal>
        </Spin>
      </div>
    );
  };
}

export default NotificationsListTableSchd;
/* eslint-disable */