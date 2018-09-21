/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import axios from 'axios';
import moment from 'moment-timezone';
import { Link } from 'react-router';
import css from '../pushNotifications.css';
import Predefined_icon from './Predefined_icon.png';
import $ from "jquery";
import { Form, Icon, Input, Button, Checkbox, Tabs, Table, Switch, Modal, Select, Row, Col, message, Spin } from 'antd';
const Search = Input.Search;
const Option = Select.Option;






class NotificationsListTable extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      data: [],
      id: '',
      modalData: {},
      loading: true,
      deletedArray: [],
      highLight: false,
      selectinitialdata: [],
      data1: [],
      search: ''
    }

  }
  componentWillMount() {
    this.getData();
    this.getData1();
  }
  getData = () => {
    var _this = this;
    var fetchData = axios.create({
      'Content-Type': 'application/json'
    })
    fetchData.get('/predefinedNotification').then(function (response) {
      _this.setState({ data: response.data.data, data1: response.data.data,deletedArray:[], loading: false })
    })
  }
  getData1 = () => {
    var _this = this;
    var fetchReq = axios.create({
      params: { nTypeId: "5a2805069f13aace6a02d3f1" },
      headers: { 'Content-Type': 'application/json' }
    });
    fetchReq.get('/notificationCategory').then(function (response) {
      _this.setState({ selectinitialdata: response.data.data })
    })
  }
  showModalPredefinedView = (itemId) => {
    this.setState({
      visible: true,
      id: itemId
    });
    var _this = this;
    if (itemId != '') {
      var req = axios.create({
        'Content-Type': 'application/json'
      });
      req.get('/predefinedNotification/' + itemId).then(function (response) {
        _this.setState({ modalData: response.data.data });
      })
    }
  }
  handleOk = (e) => {
    this.setState({
      visible: false
    });
  }
  handleCancel = (e) => {

    this.setState({
      visible: false
    });
  }
  handleDelete = () => {
    var { deletedArray } = this.state;
    var self = this;
    if (this.state.deletedArray.length != 0) {
      var url = '/predefinedNotificationDelete';
      var request = new Request(url, {
        method: "POST",
        body: JSON.stringify(deletedArray),
        headers: {
          'Content-Type': 'application/json'
        }

      })
      fetch(request)
        .then(function (response) {
          if (response.status === 200) {
            message.success(`Data deleted successfully`, 2);
            self.getData();
          } else {
            message.error(`Data not deleted`, 2);
          }
        })
    }
  }
  handleChange = (value) => {
    if (value != "All") {
      this.setState({ data: '' });
      var new4 = [];
      this.state.data1.map((index) => {
        if (value === index.category) {
          new4.push(index);
        }
      })
      this.setState({ data: new4 });
    } else {
      var self = this;
      self.componentWillMount();
    }

  }
  updateSearch = (e) => {

    this.setState({
      // Limit to 10 characters only for search
      search: e.target.value.substr(0, 10)
    });
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
  render() {
    const data = this.state;
    //this.componentWillMount();
    const categories = this.state.selectinitialdata.map((cat) => <Option value={cat.name}>{cat.name}</Option>);
    const columns = [{
      title: 'Type',
      dataIndex: 'type',
      render: text => <a href="#">{text}</a>,
    }, {
      title: 'Notification Title',
      dataIndex: 'notificationtitle',
    }, {
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
    let filteredContacts = this.state.data.filter(
      (contact) => {

        return contact.category.toLowerCase().includes(this.state.search.toLowerCase()) || contact.title.toLowerCase().includes(this.state.search.toLowerCase());
      }
    );
    this.state.data.length === 0 ? null : filteredContacts.map((item, index) => {
      data1.push({
        key: item._id,
        type: <img src={Predefined_icon} alt="Predefined icon" />,
        notificationtitle: item.title,
        createdOn: moment(item.createdDate).format('YYYY-MM-DD'),
        category: item.category,
        status: <Switch checked={item.onOrOff} />,
        actions: <div><Icon  className="PredefinedsentNotifieye"  type="eye-o" onClick={this.showModalPredefinedView.bind(this, item._id)} /> | <Link to={`/push-notifications/${item._id}/type/${item.type}`}>
        <Icon type="edit" className="PredefinedsentNotifieye"/></Link></div>
      })
    })


    var { modalData } = this.state;
    return (
      <div>
        <Spin spinning={this.state.loading} tip="Loading Page... Please wait.">
          <div>
            <Row className="">
              <Col span={17} className=''>
                <div className="paddingDropdown">
                  <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                    showSearch
                    style={{ width: 300 }}
                    placeholder="Select Notification Category"
                    optionFilterProp="children"
                    onChange={this.handleChange}

                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                    {categories}
                    <Option value="All">All</Option>
                  </Select>
                </div>
              </Col>
              <div className="SubMenuPushNotifi">
                <ul className="list-inline allNotifiList">
                  <li style={{ width: '70%' }}><h3>Predefined Notifications list</h3></li>
                  {this.props.role.delete===true?
                  <li style={{ 'text-align': 'right', 'cursor': 'pointer', width: '10%', fontSize: 16 }} className={this.state.highLight ? 'blue' : ''} ><span onClick={this.handleDelete}><Icon type="delete" title="Delete" /></span></li>
                  :''}
                  <li className="search-custom MarginTop-20" style={{ width: '20%' }}> <Search value={this.state.search} onChange={this.updateSearch} onKeyPress={this.onKeyPress}
                    placeholder="Search Here"
                    style={{ width: '100%' }}
                    />
                    <p style={{ "color": "red", "text-align": "left" }} id="mobile" className="mobile"></p></li>
                </ul>
                <Table className="PushnotificationsTable tableBorder" rowSelection={rowSelection} columns={columns} dataSource={data1} pagination={{ pageSize: 5 }} />
              </div>
            </Row>
          </div>

          <Modal className="modalHeight"
            title={modalData.type}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={null}
            >
            <div className="">
              <p><b className="boldTxt">Notification Category:</b> {modalData.category}</p>
              <br />
              <p style={{ marginBottom: '40' }}><b className="boldTxt">Criteria to be followed:</b> {modalData.notification} </p>

              <Row>
                <Col span={6}>
                  <b className="boldTxt">Image:</b>
                  <img src={modalData.imageURL} style={{ width: 100, height: 100 }} alt="image" />
                </Col>
                <Col span={18}>
                  <p><b className="boldTxt">Notification Title:</b> {modalData.title}</p>
                  <p><b className="boldTxt">Notification Description:</b> {modalData.description}
                  </p>
                </Col>

              </Row>

            </div>

          </Modal>
        </Spin>
      </div>
    );
  };
}


export default NotificationsListTable;
/* eslint-disable */