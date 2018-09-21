/* eslint-disable */
import React from 'react';
import Dashboard from '../Dashboard/Dashboard'
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link, browserHistory } from 'react-router';
import axios from 'axios';
import classnames from 'classnames';
import AddTag from './AddTag';
import $ from "jquery";
import css from './pushNotifications.css';
import { Switch } from 'antd';
import AllSent from './AllSent';
import moment from 'moment';
import moments from 'moment-timezone';
import CustomNotifications from './CustomNotifications';
import PredefinedNotifications from './PredefinedNotifications';
import ScheduledNotifications from './ScheduledNotifications';
import CustomFanclub from './Custom/CustomFanclub';
import Fun2WinCustomNotifications from './Custom/Fun2WinCustomNotifications';
import CustomChallenges from './Custom/CustomChallenges';
import CustomMislenious from './Custom/CustomMislenious';
import ScheduledFanclubs from './Scheduled/ScheduledFanclubs';
import ScheduledFun2Win from './Scheduled/ScheduledFun2Win';
import ScheduledChallenges from './Scheduled/ScheduledChallenges';
import ScheduledMisc from './Scheduled/ScheduledMisc';

import {
  Form, Icon, Input, Button, Checkbox, TimePicker, Radio, DatePicker, Tabs, Select, Col, Row,
  Steps, Upload, message
} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;
const Option = Select.Option;


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

function onChange(time, timeString) {
}


function callback(key) {
}






function onChange(date, dateString) {
}

const Step = Steps.Step;
//const Step1 = Steps.Step;

const RadioGroup = Radio.Group;

const props1 = {
  name: 'file',
  action: process.env.REACT_APP_API_HOST + '/rest/azureImageUploadWeb',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
    }
    if (info.file.status === 'done') {
      message.success(`Image uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`Image upload failed`);
    }
  },
};

class PushNotifications extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      imageUrl1: '',
      imageUrl2: '',
      imageUrl3: '',
      scheduleValue: '',
      notificationTypes: [],
      categories: [],
      subCategories: [],
      ntype: '',
      category: '',
      subCat: '',
      title: '',
      desc: '',
      errors: [],
      rendering: [],
      switch: '',
      _id: '',
      editData: {},
      data: [],
      imageUrl: '',
      editSwitch: '',
      loading: false,
      inAppCheck: false,
      cusFanclubSubCat: [],
      cusFanclubCat: [],
      role: ''
    };
    this.baseState = this.state;
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  reset() {
    this.setState(this.baseState);
  }

  onChange = (e) => {
    this.setState({
      scheduleValue: e.target.value,
    });
  }

  imageChange2 = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      this.setState({
        imageUrl2: info.file.response.data
      })
    }

  }

  imageChange3 = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      this.setState({
        imageUrl3: info.file.response.data
      })
    }

  }

  imageChange4 = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      this.setState({
        imageUrl4: info.file.response.data
      })
    }

  }

  imageChange4 = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      this.setState({
        imageUrl4: info.file.response.data
      })
    }
  }


  imageChange5 = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      this.setState({
        imageUrl5: info.file.response.data
      })
    }

  }

  imageChange6 = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      this.setState({
        imageUrl6: info.file.response.data
      })
    }

  }


  imageChange7 = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      this.setState({
        imageUrl7: info.file.response.data
      })
    }

  }




  beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }

  componentWillMount() {
    var _this = this;
    var { nType, category, nTypeid, notificationTypes } = this.state;
    // this.getNotificationTypes();
    var user = JSON.parse(sessionStorage.getItem('user'));
    console.log("userdata in contest page menu", user.permissions.notifications);
    var fetchRequest = axios.create({
      headers: { 'Content-Type': 'application/json' }
    });
    fetchRequest.get('/notificationType').then((response) => {
      sessionStorage.setItem("notificationType", JSON.stringify(response.data.data));
      if (user.permissions.notifications.predefined.create !== true) delete response.data.data[0];
      if (user.permissions.notifications.scheduled.create !== true) delete response.data.data[1];
      if (user.permissions.notifications.custom.create !== true) delete response.data.data[2];
      _this.setState({ notificationTypes: response.data.data });
    })
    if (user.permissions !== '') {

      this.setState({
        role: user.permissions.notifications
      })
    }


    this.setState({ _id: this.props.params._id });
    var req = axios.create({
      'Content-type': 'application/json'
    });
    req.get('/predefinedNotification').then((response) => {
      _this.setState({ data: response.data.data });
    });
    if (this.props.params._id != undefined && this.props.params.type === "Predefined Notifications") {
      var fetchData = axios.create({
        'Content-Type': 'application/json'
      });
      fetchData.get('/predefinedNotification/' + this.props.params._id).then(function (response) {
        sessionStorage.setItem("notificationName", response.data.data.type);
        //sessionStorage.setItem("notificationSubcat",response.data.data.category);
        _this.setState({ editData: response.data.data });
      });
      setTimeout(() => {
        var cat1 = sessionStorage.getItem("notificationType");
        var cat = JSON.parse(cat1);
        cat.map((type) => {
          if (type.name === sessionStorage.getItem("notificationName")) {
            var fetchReq = axios.create({
              params: { nTypeId: type._id },
              headers: { 'Content-Type': 'application/json' }
            });
            fetchReq.get('/notificationCategory').then((response) => {
              sessionStorage.setItem("notificationCat", JSON.stringify(response.data.data));
              _this.setState({ categories: response.data.data })
            });
          }
        })
      }, 500);
    } else if (this.props.params._id != undefined && this.props.params.type === "Scheduled Notifications") {
      var fetchData = axios.create({
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': sessionStorage.getItem("token")
        }
      })
      fetchData.get('/scheduledNotification/' + this.props.params._id).then(function (response) {
        _this.setState({ editData: response.data.data });
      })
    }
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
  onNotificationTypeChange = (e) => {
    var _this = this;
    var { editData } = this.state;
    var req = this.state.notificationTypes.map((type) => {
      if (e === type._id) {
        if (this.props.params._id != undefined) {
          _this.setState({ user: type.name });
          editData.type = _this.state.user;
        } else {
          _this.setState({ nType: type.name, category: '' });
        }

        var fetchReq = axios.create({
          params: { nTypeId: e },
          headers: { 'Content-Type': 'application/json' }
        });
        fetchReq.get('/notificationCategory').then((response) => {
          _this.setState({ categories: response.data.data })
        })
      }
    })
  }

  onCategoryChange = (e) => {
    var _this = this;
    var { nType, category } = this.state;
    if (e !== '') this.state.errors.category = '';
    var req = this.state.categories.map((cat) => {
      if (e === cat._id) {
        _this.setState({ category: cat.name, subCat: '' });
        if (nType === "Predefined Notifications") {
          var fetchReq = axios.create({
            params: { sTypeId: e },
            headers: { 'Content-Type': 'application/json' }
          });
          fetchReq.get('/notificationSubCategory').then((response) => {
            _this.setState({ subCategories: response.data.data })
          })
        } else if (nType === "Custom Notifications") {
          if (cat.name === "Fan Clubs" || cat.name === "Fun2Win") {
            var fetchCateg = axios.create({
              headers: { 'x-access-token': sessionStorage.getItem('token') }
            });
            fetchCateg.get('/categories').then(function (response) {
              _this.setState({ cusFanclubCat: response.data.data });
            })
          }
          var fetchTarget = axios.create({
            params: { sTypeId: e },
            headers: { 'Content-Type': 'application/json' }
          });
          fetchTarget.get('/notificationSubCategory').then(function (response) {
            _this.setState({ subCategories: response.data.data })
          })
        } else if (nType === "Scheduled Notifications") {
          if (cat.name === "Fan Clubs" || cat.name === "Fun2Win") {
            var fetchCateg = axios.create({
              headers: { 'x-access-token': sessionStorage.getItem('token') }
            });
            fetchCateg.get('/categories').then(function (response) {
              _this.setState({ cusFanclubCat: response.data.data });
            })
          }
          var fetchTarget = axios.create({
            params: { cTypeId: e },
            headers: { 'Content-Type': 'application/json' }
          });
          fetchTarget.get('/notificationSubCategory').then(function (response) {
            _this.setState({ subCategories: response.data.data })
          })
        }
      }
    })
  }

  onSubCategoryChange = (e) => {
    var _this = this;
    if (e !== '') this.state.errors.subCat = '';
    this.state.subCategories.map((subCat) => {
      if (e === subCat._id) {
        _this.setState({ subCat: subCat.name });
      }
    })
  }
  handleChange = (e) => {
    $("Input").on("keydown", function (e) {
      if (e.which === 32 && !this.value.length)
        e.preventDefault();
    });
    $("TextArea").on("keydown", function (e) {
      if (e.which === 32 && !this.value.length)
        e.preventDefault();
    });
    var { editData } = this.state;
    if (this.props.params._id !== undefined) {
      if (e.target.name === 'title') {
        if (this.state.editData.title !== '') this.state.errors.title = '';
        this.setState({
          editData: { ...editData, title: e.target.value }
        })
      } else if (e.target.name === 'desc') {
        if (this.state.editData.description !== '') this.state.errors.desc = '';
        this.setState({
          editData: { ...editData, description: e.target.value }
        })
      }
    } else {
      if (e.target.name === 'title') {
        if (this.state.title !== '') this.state.errors.title = '';
      } else if (e.target.name === 'desc') {
        if (this.state.desc !== '') this.state.errors.desc = '';
      }
    }
    this.setState({ [e.target.name]: e.target.value })
  }
  handleImage = (info) => {
    if (info.file.status === 'done') {
      // getBase64(info.file.originFileObj, Iconbannerimagename => this.setState({ Iconbannerimagename }));
      message.success(`Image uploaded successfully`);
      if (info.file.response.data !== '') this.state.errors.image = '';
      if (this.props.params._id != undefined) {
        this.setState({ imageUrl: info.file.response.data })
        this.state.editData.imageURL = this.state.imageUrl;
      }
      this.setState({ imageUrl2: info.file.response.data })
    }
  }
  handleSubmit = () => {
    let errors = [];
    this.setState({ loading: true })
    var _this = this;
    if (this.props.params._id === undefined) {
      if (this.state.nType === '') errors.nType = "*mandatory field";
      if (this.state.category === '') errors.category = "*mandatory field";
      if (this.state.subCat === '') errors.subCat = "*mandatory field";
    }
    if (this.props.params._id !== undefined) {
      if (this.state.editData.title.trim() === '') errors.title = "*mandatory field";
      if (this.state.editData.description.trim() === '') errors.desc = "*mandatory field";
      if (this.state.editData.imageURL === '') errors.image = "*mandatory field";

    } else {
      if (this.state.title.trim() === '') errors.title = "*mandatory field";
      if (this.state.desc.trim() === '') errors.desc = "*mandatory field";
      if (this.state.imageUrl2 === '') errors.image = "*mandatory field";
    }

    this.setState({ errors: errors });
    //  var today = moments.tz(new Date(), 'YYYY-MM-DD hh:mm:ss A', "asia/kolkata").format('YYYY-MM-DD hh:mm:ss A');
    if (Object.keys(errors).length === 0) {
      let data = {
        type: this.state.nType,
        category: this.state.category,
        notification: this.state.subCat,
        title: this.state.title.trim(),
        description: this.state.desc.trim(),
        imageURL: this.state.imageUrl2,
        onOrOff: this.state.switch,
        inApp: this.state.inAppCheck
      }
      this.state.data.map((item) => {
        if (item.notification === this.state.subCat) {
          sessionStorage.setItem("isTrue", true);
        }
      })
      var isTrue = sessionStorage.getItem('isTrue');
      if (this.props.params._id !== undefined) {
        let data1 = {
          type: this.state.editData.type,
          category: this.state.editData.category,
          notification: this.state.editData.notification,
          title: this.state.editData.title.trim(),
          description: this.state.editData.description.trim(),
          imageURL: this.state.editData.imageURL,
          onOrOff: this.state.editData.onOrOff,
          inApp: this.state.editData.inApp
        }
        axios.put('/predefinedNotification/' + this.props.params._id, data1).then(function (response) {
          if (response.status === 200) {
            message.success('Data updated successfully', 2);
            browserHistory.push('/push-notifications/predefined-notifications');
          } else {
            message.error(`Data not updated`, 2);
          }
        })
      } else {
        if (isTrue != "true") {
          axios.post('/predefinedNotification', data).then(function (response) {
            if (response.status === 200) {
              message.success('Notification saved successfully', 2);
              browserHistory.push('/push-notifications');
            } else {
              message.error(`Error! Please save again`, 2);
            }
          })
          this.reset();
        } else {
          message.error(`This type of Notification was already created`, 2);
          setTimeout(_this.stopLoading, 2000);
        }

        // window.location.reload();
      }
      sessionStorage.removeItem("isTrue");
      sessionStorage.removeItem("notificationName");
      sessionStorage.removeItem("notificationType");
      sessionStorage.removeItem("notificationCat");
      sessionStorage.removeItem("notificationSubcat");
    } else {
      setTimeout(_this.stopLoading, 2000);
    }

  }
  handleSwitch = (e) => {
    if (this.props.params._id != undefined) {
      this.setState({ editSwitch: e });
      this.state.editData.onOrOff = this.state.editSwitch;
    }
    this.setState({ switch: e })
  }
  handleCheck = (e) => {
    var { editData } = this.state;
    if (this.props.params._id !== undefined) {
      this.setState({
        editData: {
          ...editData, inApp: e.target.checked
        }
      })
    }
    this.setState({ inAppCheck: e.target.checked })
  }
  stopLoading = () => {
    this.setState({
      loading: false
    })
  }

  bindPredefinedView = () => {
    var { nType, category } = this.state;
    const subCategories = this.state.subCategories.map((subCat) => <Option value={subCat._id}>{subCat.name}</Option>)
    if (nType === "Predefined Notifications" || this.state.editData.type === "Predefined Notifications") {
      return (
        <div id="predefined" className="MarginTop20">
          <Row>
            <Col className=''>
              <p className="subPara"> Compose Message</p>
            </Col>

            <Col className='MarginTop10'>
              <FormItem label="Criteria to be followed">
                <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                  showSearch className=''
                  style={{ width: '50%' }}
                  placeholder="Select Criteria"
                  optionFilterProp="children"
                  value={this.state.subCat || this.state.editData.notification}
                  onChange={this.onSubCategoryChange}
                  disabled={this.props.params._id ? 'disabled' : ''}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                  {subCategories}

                </Select>
              </FormItem>
              <p className="editError">{this.state.errors.subCat}</p>

            </Col>
            <Col span={24}>
              <Col span={12} className=''>
                <FormItem label="Notification Title">
                  <Input autoComplete={'off'} type="" placeholder="Enter Title" name="title" maxLength={50} defaultValue={this.state.editData.title} onChange={this.handleChange} />
                  <p className="editError">{this.state.errors.title}</p>
                </FormItem>
              </Col>
            </Col>
            <Col span={24}>
              <Col span={10} className="">
                <FormItem label="Notification Description">
                  <TextArea rows={3} placeholder="Enter Description" name="desc" maxLength={150} defaultValue={this.state.editData.description} onChange={this.handleChange} />
                  <p className="editError">{this.state.errors.desc}</p>
                </FormItem>
              </Col>

              <Col span={2} className="pussNotImg PredfUploadimglabelfancLub ">
                <FormItem label="Image">
                  <div className="pussNotImg">
                    <Upload {...props1} style={{ width: 80, height: 80 }}
                      className="avatar-uploader marginLeft20 pussNotImg"
                      showUploadList={false}
                      onChange={this.handleImage}
                      accept=".png,.jpg,.jpeg"
                      >
                      {
                        this.state.imageUrl2 || this.state.editData.imageURL ?
                          <img src={this.state.editData.imageURL ? this.state.editData.imageURL : this.state.imageUrl2} style={{ width: 80, height: 80 }} name="contestIcon" alt="" className="avatar" /> :
                          <Icon type="plus" className="avatar-uploader-trigger" style={{ width: 80, height: 80 }} />
                      }
                    </Upload>
                  </div>
                  <p className="editError">{this.state.errors.image}</p>
                </FormItem>
              </Col> </Col>
            <Col span="16" className='MarginTop20'>
              <Col span="8" className=""> <Switch checked={this.props.params._id ? this.state.editData.onOrOff : this.state.switch} onChange={(e) => this.handleSwitch(e)} />
                <span className="marginLeft10">Publish </span>
              </Col>
              <Col span="8"><Checkbox onChange={this.handleCheck} checked={this.state.editData.inApp ? this.state.editData.inApp : this.state.inAppCheck}>
                <span className="">Send in App message</span></Checkbox>
              </Col></Col>
            <Col span="3" offset={11} className='MarginTop20'> <Button type="primary" className='createBtn' loading={this.state.loading}
              onClick={this.handleSubmit}>Save</Button>
            </Col>
          </Row>

        </div>
      )
    }
  }
  bindScheduledView = () => {
    var { nType, category } = this.state;
    const {imageUrl1, imageUrl2, imageUrl3, imageUrl4, imageUrl5, imageUrl6 } = this.state;
    const { current } = this.state;
    if ((nType === "Scheduled Notifications" || this.state.editData.type === "Scheduled Notifications")) {
      var categories = this.state.cusFanclubCat.map((subCat) => <Option value={subCat._id}>{subCat.name}</Option>);
      var subCategories = this.state.cusFanclubSubCat.map((subcat) => <Option value={subcat._id}>{subcat.name}</Option>);
      var targetActivities = this.state.subCategories.map((subcat) => <Option value={subcat._id}>{subcat.name}</Option>);
      if (category === 'Fan Clubs' || this.state.editData.category === "Fan Clubs") {
        return (
          <ScheduledFanclubs imageProps={props1} editData={this.state.editData} cusFanclubCat={this.state.cusFanclubCat} categories={categories} category={this.state.category} subCategories={this.state.subCategories} targetActivities={targetActivities} nType={this.state.nType} />
        )
      }
      if (category === 'Fun2Win' || this.state.editData.category === "Fun2Win") {
        return (
          <ScheduledFun2Win imageProps={props1} editData={this.state.editData} subCategories={this.state.subCategories} cusFanclubCat={this.state.cusFanclubCat} cusFanclubSubCat={this.state.cusFanclubSubCat} />
        )
      }
      if (category === 'Challenges' || this.state.editData.category === "Challenges") {
        return (
          <ScheduledChallenges imageProps={props1} editData={this.state.editData} subCategories={this.state.subCategories} category={this.state.category} nType={this.state.nType} />
        )
      }
      if (category === 'Miscellaneous' || this.state.editData.category === "Miscellaneous") {
        return (
          <ScheduledMisc imageProps={props1} editData={this.state.editData} subCategories={this.state.subCategories} category={this.state.category} nType={this.state.nType} />
        )
      }
    }
  }

  bindCustomView = () => {
    var { nType, category, imageUrl1, current } = this.state;
    if ((nType === "Custom Notifications")) {
      var categories = this.state.cusFanclubCat.map((subCat) => <Option value={subCat._id}>{subCat.name}</Option>);
      var subCategories = this.state.cusFanclubSubCat.map((subcat) => <Option value={subcat._id}>{subcat.name}</Option>);
      var targetActivities = this.state.subCategories.map((subcat) => <Option value={subcat._id}>{subcat.name}</Option>);
      if (category === 'Fan Clubs') {
        return (
          <CustomFanclub imageProps={props1} editData={this.state.editData} cusFanclubCat={this.state.cusFanclubCat} categories={categories} category={this.state.category} subCategories={this.state.subCategories} targetActivities={targetActivities} nType={this.state.nType} />
        )
      }
      if (category === 'Fun2Win') {
        return (
          <Fun2WinCustomNotifications imageProps={props1} editData={this.state.editData} subCategories={this.state.subCategories} cusFanclubCat={this.state.cusFanclubCat} cusFanclubSubCat={this.state.cusFanclubSubCat} />
        )
      }
      if (category === 'Challenges') {
        return (
          <CustomChallenges imageProps={props1} editData={this.state.editData} subCategories={this.state.subCategories} category={this.state.category} nType={this.state.nType} />
        )
      }
      if (category === 'Miscellaneous') {
        return (
          <CustomMislenious imageProps={props1} editData={this.state.editData} subCategories={this.state.subCategories} category={this.state.category} nType={this.state.nType} />
        )
      }
    }
  }

  handleReload = () => {
    window.location.reload();
    this.reset();
    //this.componentWillMount();
  }
  render() {
    const { editData } = this.state;
    const { current } = this.state;
    const {imageUrl1, imageUrl2, imageUrl3, imageUrl4, imageUrl5, imageUrl6 } = this.state;
    const notificationTypes = this.state.notificationTypes.map((type) => <Option value={type._id} >{type.name}</Option>);
    const categories = this.state.categories.map((cat) => <Option value={cat._id}>{cat.name}</Option>);
    return (
      <Dashboard>
        <div className="">
          <div>
            <Row>
              <Col span={24} className='MarginTop20'>
                <div className="SubMenuPushNotifications">
                  <Col span={10}>
                    <h3 className="marginTop14 pageTitle">Push Notifications</h3>
                  </Col>
                  <Col span={14}>
                    <nav className='pushNotifnavigation' role="navigation" style={{ float: 'right' }}>
                      <Link to="/push-notifications" className='item' activeClassName='active'>Sent History</Link>
                      <Link to="/push-notifications/custom-notifications" className='item' activeClassName='active'>Custom</Link>
                      <Link to="/push-notifications/predefined-notifications" className='item' activeClassName='active'>Predefined</Link>
                      <Link to="/push-notifications/scheduled-notifications" className='item' activeClassName='active'>Scheduled</Link>
                     {this.state.role.custom.create===true||this.state.role.predefined.create===true||this.state.role.scheduled.create===true?<Link to="/push-notifications/create"> <Button type="primary" onClick={this.handleReload} className='createBtn'>Create</Button></Link>:''} 
                    </nav>
                  </Col>
                </div>
              </Col>
            </Row>
            <div>
            </div>
          </div>
          <div>
            <Row className="Pushnotificationmainheader">
              <Col span={17} className=''>
                <ul className="list-inline">
                  <li>
                    <FormItem label="Select Notification Type">
                      <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                        showSearch
                        style={{ width: 300 }}
                        placeholder="Select Notification Type"
                        optionFilterProp="children"
                        value={this.state.nType || editData.type}
                        onChange={this.onNotificationTypeChange}
                        disabled={this.props.params._id ? 'disabled' : ''}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                        {notificationTypes}
                      </Select>
                    </FormItem>
                    <p className="editError">{this.state.errors.nType}</p>
                    {/* </Col>
              <Col span={17} className='MarginTop20'> */}
                  </li>
                  <li>
                    <FormItem label="Select Notification Category">
                      <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                        showSearch
                        style={{ width: 300 }}
                        placeholder="Select Notification Category"
                        optionFilterProp="children"
                        value={this.state.category || editData.category}
                        onChange={this.onCategoryChange}
                        disabled={this.props.params._id ? 'disabled' : ''}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                        {categories}
                      </Select>
                      <p className="editError">{this.state.errors.category}</p>
                    </FormItem>
                  </li>
                </ul>
              </Col>
            </Row>
          </div>
          <Row className=" ">
            <Col span={24} className=''>
              {this.bindPredefinedView()}
              {this.bindScheduledView()}
              {this.bindCustomView()}
            </Col>
          </Row>
        </div>
      </Dashboard>
    );
  };
}

export default PushNotifications;
/* eslint-disable */