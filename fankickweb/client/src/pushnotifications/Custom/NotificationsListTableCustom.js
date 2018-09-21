/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import axios from 'axios';
import moment from 'moment-timezone';
import { Link } from 'react-router';
import Custom_icon from './Custom_icon.png';
import css from './Custom.css';

import { Icon, Input, Checkbox, Table, Modal, Select, Row, Col, message, Spin } from 'antd';
const Search = Input.Search;
const Option = Select.Option;
function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

class NotificationsListTableCustom extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      search: '',
      modalData: {},
      highLight: false,
      loading: true,
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
      params: { nTypeId: '5a28052b9f13aace6a02d4ed' },
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
    fetchData.get('/customNotification').then(function (response) {
      _this.setState({ data: response.data.data, data2: response.data.data,deletedArray:[], loading: false })
    })
  }

  showModalcustomView = (rowId) => {
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
      fetchData.get('/customNotification/' + rowId).then(function (response) {
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
      var url = '/customNotification';
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
          } else {
            message.error(`Error! Unable to delete Notification`);
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
      _this.setState({ data: new4 });
    } else {
      _this.setState({ data: _this.state.data2 })
    }
  }

  render() {
    //console.log("modaldata", this.state);
    const columns = [{
      title: 'Type',
      dataIndex: 'type',
      render: text => <a href="#">{text}</a>,
    }, {
      title: 'Notification Title',
      dataIndex: 'notificationtitle',
    },
    {
      title: 'Created on',
      dataIndex: 'createdOn',
    }, {
      title: 'Category',
      dataIndex: 'category',
    },
    {
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
        type: <img src={Custom_icon} alt="Custom icon" />,
        notificationtitle: item.title,
        createdOn: moment(item.createdDate).format('YYYY-MM-DD'),
        category: item.category,
        actions: <div><Icon type="eye-o" className="AllsentNotifieye"  onClick={this.showModalcustomView.bind(this, item._id)} /></div>
      })
    })

    const mapCategories = this.state.notificationCategories.map((category) => <Option value={category.name}>{category.name}</Option>)
    var { modalData } = this.state;
    if (Object.keys(modalData).length > 0) {
      modalData.locationTags = modalData.locationTags.join(',');
    }
    var myObj = modalData;
    var t = ''
    if (isEmpty(myObj)) {
    } else {
      t = modalData.locationTags
    }
    return (
      <div>
        <Spin spinning={this.state.loading} tip="Loading Page.. Please Wait">
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
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {mapCategories}
                    <Option value='All'>All</Option>
                  </Select>
                </div>
              </Col>
              <div className="SubMenuPushNotifi">
                <ul className="list-inline allNotifiList">
                  <li style={{ width: '70%' }}><h3>Custom Notifications list</h3></li>
                  {this.props.role.delete===true?
                  <li style={{ 'text-align': 'right', 'cursor': 'pointer', width: '10%', fontSize: 16 }} className={this.state.highLight ? 'blue' : ''} ><span onClick={this.handleDelete}><Icon type="delete" title="Delete" /></span></li>
                  :''}
                  <li className="search-custom" style={{ width: '20%' }}> <Search value={this.state.search} onChange={this.handleSearch}
                    placeholder="Search Here"
                    style={{ width: '100%' }}
                  /></li>
                </ul>
                <Table  className="PushnotificationsTable tableBorder"  rowSelection={rowSelection} columns={columns} dataSource={data1} pagination={{ pageSize: 5 }} />
              </div>
            </Row>
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
                  <p><b className="boldTxt">Criteria to be followed:</b>
                    {modalData.targetActivity} - {modalData.performed ?
                      modalData.performed : modalData.range} - {modalData.forCelebrity ?
                        modalData.forCelebrity : modalData.likesCount} - {modalData.celebrityName ||
                          modalData.startLikesCount ? modalData.celebrityName ||
                          modalData.startLikesCount : modalData.startLikesCount} - {modalData.endLikesCount}
                    <br />
                    {modalData.category !== "Miscellaneous" ? <span className="mrgnLeft90">
                      {modalData.within != '' ? modalData.within : ''}
                      - last -
                     {modalData.days != '' ? modalData.days : ''}
                      {modalData.startDays != '' ? modalData.startDays : ''}
                      - to -
                     {modalData.endDays != '' ? modalData.endDays : ''}
                      - days  </span> : ""}   </p>
                </Col>
              </Row>
              <br />
              <Row>
                <Col span={5}>
                  <p> <img src={modalData.imageUrl} alt="image" className="imgpUSH" /> </p>
                </Col>
                <Col span={12}>
                 <h4 className="ScheduledModaldatatitle"> <b className="boldTxt">Notification Title:</b>  {modalData.title} </h4>
                  <br />
                  <p className="Scheduledmodaldatadsec"><b className="boldTxt">Notification Description:</b> {modalData.description}</p>
                </Col>


              </Row>
              <br />
              <Row>
                <Col span={24}>
                  <p><b className="boldTxt"> Date: </b>{moment(modalData.createdDate).format("YYYY-MM-DD")}
                    <b className="boldTxt margleft20">Time:</b> {moment(modalData.createdDate).format("HH:mm A")}</p>

                </Col>
              </Row>
              <br />
              <Row>
                <Col span={16}>
                  <p><b className="boldTxt">  Target Location: </b>{modalData.locationTags != undefined ? modalData.locationTags : ''}{t === '' ? modalData.location : ''} </p>
                </Col>
              </Row>
              <br />
            </div>
          </Modal>
        </Spin>
      </div>
    );
  };
}

export default NotificationsListTableCustom;
/* eslint-disable */