/* eslint-disable */
import React from 'react';
import Dashboard from '../../Dashboard/Dashboard'
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link, browserHistory } from 'react-router';
import axios from 'axios';
import classnames from 'classnames';
import PlacesAutoComplete from './PlaceAutoComplete';
import $ from "jquery";
import moment from 'moment';
import css from '../../pushnotifications/pushNotifications.css';
import { Switch } from 'antd';
import {
  Form, Icon, InputNumber, Input, Button, Checkbox, TimePicker, Radio, DatePicker, Tabs, Select, Col, Row, Tag, Tooltip,
  Steps, Upload, message
} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;
const Option = Select.Option;
const Step = Steps.Step;
const RadioGroup = Radio.Group;
class CustomMislenious extends React.Component {
  constructor() {
    super();
    this.state = {
      current: 0,
      catagiryname: '',
      Rangein: '',
      within: '',
      withinran3: '',
      withinran4: '',
      performed: '',
      MIsData: {},
      MIsData1: {},
      errors: {},
      title1: '',
      description1: '',
      imageUrl1: '',
      location: '',
      city: '',
      category: '',
      nType: '',
      locationArray: [],
      tags: [],
      userNames: [],
      userName: ''
    }
  }
  componentDidMount() {
    if (this.props != undefined) {
      this.setState({ category: this.props.category, nType: this.props.nType })
    }
  }
  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    const locationArray = this.state.locationArray.filter(loc => loc.location !== removedTag)
    this.setState({ tags, locationArray });
  }


  handleMapData = (data, locationId) => {
    var res = data.split(',');
    var locationObj = {}
    if (!this.state.tags.includes(res[0])) {
      locationObj.location = res[0];
      locationObj.locId = locationId;
      var locations = [...this.state.locationArray, locationObj]
      var tags = [...this.state.tags, res[0]];
      this.setState({
        tags: tags,
        locationArray: locations
      })
    }
  }
  next() {

    if (this.state.current === 0) {
      let errors = {};
      if (this.state.catagiryname === '') errors.catagiryname = "*mandatory field";
      this.setState({ errors });
      if (Object.keys(errors).length === 0) {
        if (this.state.catagiryname === "Refer Friend") {
          let errors = {};
          if (this.state.performed === '') errors.performed = "*mandatory field";
          this.setState({ errors });
          if (Object.keys(errors).length === 0) {
            axios.get('/notifications/referFriend', {
              headers: {
                "x-access-token": sessionStorage.token,
              },

            })
              .then(function (response) {

                this.setState({ MIsData: response.data.data });

              }.bind(this))
              .catch(function (error) {
              });
            const current = this.state.current + 1;
            this.setState({ current });
          }
        } else if (this.state.catagiryname === "Profile Creation") {
          let errors = {};
          if (this.state.performed === '') errors.performed = "*mandatory field";
          this.setState({ errors });
          if (Object.keys(errors).length === 0) {
            axios.get('/notifications/createProfile', {
              headers: {
                "x-access-token": sessionStorage.token,
              },

            })
              .then(function (response) {

                this.setState({ MIsData: response.data.data });

              }.bind(this))
              .catch(function (error) {
              });
            const current = this.state.current + 1;
            this.setState({ current });
          }
        }
        else if (this.state.catagiryname === "Add Profile Picture") {
          let errors = {};
          if (this.state.performed === '') errors.performed = "*mandatory field";
          this.setState({ errors });
          if (Object.keys(errors).length === 0) {
            axios.get('/notifications/createProfilePic', {
              headers: {
                "x-access-token": sessionStorage.token,
              },

            })
              .then(function (response) {

                this.setState({ MIsData: response.data.data });

              }.bind(this))
              .catch(function (error) {
              });
            const current = this.state.current + 1;
            this.setState({ current });
          }
        }
        else if (this.state.catagiryname === "No. of Fan Coins") {
          let errors = {};
          if (this.state.Rangein === '') errors.Rangein = "*mandatory field";
          if (this.state.Rangein != '') {
            if (this.state.Rangein != "withinRange") {
              if (this.state.within === '' || this.state.within === undefined) errors.within = "*mandatory field";
            }
            if (this.state.Rangein === "withinRange") {
              if (this.state.withinran3 === '' || this.state.withinran3 === undefined) errors.withinran3 = "*mandatory field";
              if (this.state.withinran4 === '' || this.state.withinran4 === undefined) errors.withinran4 = "*mandatory field";
            }
          }
          this.setState({ errors });
          if (Object.keys(errors).length === 0) {
            var _self = this;
            var data = {
              "range": this.state.Rangein,
              "count": this.state.within,
              "startCount": this.state.withinran3,
              "endCount": this.state.withinran4
            }

            var fetchReq = axios.create({
              headers: { 'Content-Type': 'application/json', 'x-access-token': sessionStorage.getItem('token') }
            })
            fetchReq.post('/notifications/fancoins', data).then(function (response) {
              _self.setState({ MIsData: response.data.data });
            })
            const current = this.state.current + 1;
            this.setState({ current });
          }
        } else if (this.state.catagiryname === "User Specific") {
          let errors = {};
          if (this.state.userName === "") errors.userName = "*mandatory field";
          this.setState({ errors })
          if (Object.keys(errors).length === 0) {
            const current = this.state.current + 1;
            this.setState({ current });
          }
        }
      }
    } else if (this.state.current === 1) {
      let errors = {};
      if (this.state.title1.trim() === '') errors.title1 = "*mandatory field";
      if (this.state.description1.trim() === '') errors.description1 = "*mandatory field";
      if (this.state.imageUrl1 === '') errors.imageUrl1 = "*mandatory field";
      this.setState({ errors });
      if (Object.keys(errors).length === 0) {
        const current = this.state.current + 1;
        this.setState({ current });
      }
    }
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  done() {

    if (this.state.current === 2) {
      let errors = {};
      if (this.state.location === '') errors.location = "*mandatory field";
      if (this.state.location === "Local" && this.state.locationArray.length == 0) errors.city = "*mandatory field"
      this.setState({ errors });
      if (Object.keys(errors).length === 0) {


        var _self = this;
        var locations = []
        for (let i = 0; i < this.state.locationArray.length; i++) {
          locations[i] = this.state.locationArray[i].locId
        }
        if (this.state.catagiryname !== "No. of Fan Coins") {
          var data = {

            "type": this.state.nType,
            "category": this.state.category,
            "users": this.state.MIsData,
            "title": this.state.title1.trim(),
            "description": this.state.description1.trim(),
            "imageUrl": this.state.imageUrl1,
            "location": this.state.location === "Global" ? [this.state.location] : locations,
            "targetActivity": this.state.catagiryname,
            "performed": this.state.performed,
            "locationTags": this.state.tags

          }
          console.log("data", data);
          const url = "/customNotification"
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
              if (response.status === 200) {
                //_self.setState({ParticipatedTwoDates:response.data})
                message.success('Notification Sent');
                browserHistory.push('/push-notifications/custom-notifications');
              } else {
                message.error(`Error! Unable to send Notification`);
              }
            })
        } else if (this.state.catagiryname === "No. of Fan Coins") {
          var data = {

            "type": this.state.nType,
            "category": this.state.category,
            "users": this.state.MIsData,
            "title": this.state.title1.trim(),
            "description": this.state.description1.trim(),
            "imageUrl": this.state.imageUrl1,
            "location": this.state.location === "Global" ? [this.state.location] : locations,
            "range": this.state.Rangein,
            "likesCount": this.state.within,
            "startLikesCount": this.state.withinran3,
            "endLikesCount": this.state.withinran4,
            "locationTags": this.state.tags

          }
          const url = "/customNotification"
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
              if (response.status === 200) {
                //_self.setState({ParticipatedTwoDates:response.data})
                message.success('Notification Sent');
                browserHistory.push('/push-notifications/custom-notifications');
              } else {
                message.error(`Error! Unable to send Notification`);
              }
            })
        }
      }
    }

  }
  onCategoryChange = (value) => {
    this.setState({ catagiryname: value, performed: '', Rangein: '', within: '', withinran4: '', withinran3: '' });
    var _this = this;
    if (value === "User Specific") {
      var instance = axios.create({
        headers: {
          "x-access-token": sessionStorage.token
        }
      })
      instance.get('/notifications/userSpecific').then((response) => {
        _this.setState({ userNames: response.data.data });
      })
    }
    if (value !== '') this.state.errors.catagiryname = '';
  }
  onCategoryChange1 = (value) => {
    this.setState({ performed: value });
    if (value !== '') this.state.errors.performed = '';
  }
  onChangeRange = (value) => {
    this.setState({ Rangein: value })
    if (value !== '') this.state.errors.Rangein = '';
  }
  onChangeWithin = (e) => {
    this.setState({ within: e })
    if (e !== '' || e !== undefined) this.state.errors.within = '';
  }
  onChangewithinran3 = (e) => {
    this.setState({ withinran3: e });
    if (e !== '' || e !== undefined) this.state.errors.withinran3 = '';
  }
  onChangewithinran4 = (e) => {
    this.setState({ withinran4: e });
    if (e !== '' || e !== undefined) this.state.errors.withinran4 = '';
  }
  onChangeTitle = (e) => {
    this.setState({ title1: e.target.value })
    if (e.target.value.trim() !== '') this.state.errors.title1 = '';
  }
  onChangeDes = (e) => {
    this.setState({ description1: e.target.value });
    if (e.target.value.trim() !== '') this.state.errors.description1 = '';
  }
  onChangeImg = (info) => {
    if (info.file.status === 'done') {
      message.success(`Image uploaded successfully`);
      if (info.file.response.data !== '') this.state.errors.imageUrl1 = '';
      this.setState({
        imageUrl1: info.file.response.data
      })
    }
  }
  onChanRadio = (e) => {
    var self = this;
    this.setState({ location: e.target.value })
    if (e.target.value !== '') this.state.errors.location = '';
  }
  onChangelnam = (e) => {
    this.setState({ city: e.target.value });
    if (e.target.value !== '') this.state.errors.city = '';
    const string = e.target.value;
    const Uw1 = string.charAt(0).toUpperCase() + string.slice(1);
    this.setState({ Uw: Uw1 });
  }
  onUserSelected = (e) => {
    if (e === "All") {
      var arr = [];
      this.state.userNames.map((item) => {
        arr.push(item._id);
      })
      this.setState({ MIsData: arr,userName:e });
    } else {
      this.setState({ MIsData: [e] });
      if (e != "") this.state.errors.userName = "";
      this.state.userNames.map((item) => {
        if (e === item._id) {
          this.setState({ userName: item.fullName });
        }
      })
    }
  }
  render() {
    var {tags} = this.state;
    const props = {
      name: 'file',
      action: process.env.REACT_APP_API_HOST + '/rest/azureImageUploadWeb',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    var targetActivities = this.props.subCategories.map((subCat) => <Option value={subCat.name}>{subCat.name}</Option>)
    var userNames = this.state.userNames.map((item) => <Option value={item._id}>{item.fullName}</Option>)
    const steps = [{
      title: 'Select Target Users',
      content:
      <div id="CMiscellaneous" className="">
        <Row className="MarginTop20">
          <Form>
            <Row>
              <Col span={14} className="">
                <FormItem>
                  <FormItem label="Criteria to be followed" className={classnames('catagiryname', { error: !!this.state.errors.catagiryname })}>
                    <Select className="LeftMoreSpace" getPopupContainer={triggerNode => triggerNode.parentNode}
                      showSearch
                      style={{ width: 250 }}
                      placeholder="Select Miscellaneous Category"
                      optionFilterProp="children"
                      value={this.state.catagiryname || undefined}
                      onChange={this.onCategoryChange}
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      >
                      {targetActivities}
                    </Select>
                    <p>{this.state.errors.catagiryname}</p>
                  </FormItem>
                  {this.state.catagiryname === "User Specific" ?
                    <div><FormItem label="To Whom" className={classnames('performed', { error: !!this.state.errors.performed })}>
                      <Select className="LeftMoreSpace" getPopupContainer={triggerNode => triggerNode.parentNode}
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Select One"
                        optionFilterProp="children"
                        onChange={this.onUserSelected}
                        value={this.state.userName || undefined}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                        {userNames}
                        <Option value="All">All</Option>
                      </Select>
                      <p>{this.state.errors.userName}</p>
                    </FormItem></div> : ""}

                  {this.state.catagiryname === "Refer Friend" || this.state.catagiryname === "Profile Creation" || this.state.catagiryname === "Add Profile Picture" ?
                    <div><FormItem label="To Whom" className={classnames('performed', { error: !!this.state.errors.performed })}>
                      <Select className="LeftMoreSpace" getPopupContainer={triggerNode => triggerNode.parentNode}
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Select One"
                        optionFilterProp="children"
                        onChange={this.onCategoryChange1}
                        value={this.state.performed || undefined}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                        <Option value="wasNotPerformed">People Who Did Not</Option>

                      </Select>
                      <p>{this.state.errors.performed}</p>
                    </FormItem></div>
                    : null}
                  <ul className="list-inline">
                    <li>
                      {this.state.catagiryname === "No. of Fan Coins" ?
                        <FormItem label="Select Comparision Value" className={classnames('Rangein', { error: !!this.state.errors.Rangein })}>
                          <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                            showSearch
                            style={{ width: 150 }}
                            placeholder="within"
                            optionFilterProp="children"
                            value={this.state.Rangein || undefined}
                            onChange={this.onChangeRange}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                            <Option value="Is less than">Is less than</Option>
                            <Option value="Is greater than">Is greater than</Option>
                            <Option value="Is equal to">Is equal to </Option>

                            <Option value="withinRange">With In Range</Option>
                          </Select>
                          <p>{this.state.errors.Rangein}</p>
                        </FormItem>

                        : null}</li>
                    <li className="CustomNotificationMisleniouswithin">
                      {this.state.Rangein === "Is less than" || this.state.Rangein === "Is greater than" || this.state.Rangein === "Is equal to" ? <div>
                        <FormItem label="Enter Count" className={classnames('within', { error: !!this.state.errors.within })}>
                          <InputNumber min={1} placeholder="WithIn" name="within" value={this.state.within} onChange={this.onChangeWithin} style={{ width: 100 }} />
                          <p>{this.state.errors.within}</p>
                        </FormItem>
                      </div> : null}</li>
                    <li>
                      {this.state.Rangein === "withinRange" ? <div>
                        <ul className="list-inline"><li><FormItem label="Start Count" className={classnames('withinran3', { error: !!this.state.errors.withinran3 })}>
                          <InputNumber min={1} placeholder="start to" value={this.state.withinran3} name="withinran3" onChange={this.onChangewithinran3} />
                          <p>{this.state.errors.withinran3}</p>
                        </FormItem></li>.
                        <li className="CustomNotificationMisleniouswithin">
                            <FormItem label="End Count" className={classnames('withinran4', { error: !!this.state.errors.withinran4 })}>
                              <InputNumber min={1} value={this.state.withinran4} name="withinran4" placeholder="end" onChange={this.onChangewithinran4} />
                              <p>{this.state.errors.withinran4}</p>
                            </FormItem></li>
                        </ul></div> : null}</li>
                  </ul>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Row>
      </div>
    },
    {
      title: 'Compose Message',
      content:
      <div>
        <Row className="MarginTop20">
          <Form>
            <Row className="marginBottom20">
              <h4 className="CustomNotifiTitles">Notification Title</h4>
              <Col span={10} className="">
                <FormItem className={classnames('title1', { error: !!this.state.errors.title1 })}>
                  <Input autoComplete={'off'} type="text" placeholder="Enter Title" value={this.state.title1} name="title1" name="title1" maxLength={50} onChange={this.onChangeTitle} />
                  <p>{this.state.errors.title1}</p>
                </FormItem>
              </Col>
            </Row>
            <Row className="marginBottom20">

              <Col span={8} className="">
                <h4 className="CustomNotifiTitles">Notification Decription</h4>
                <FormItem className={classnames('description1', { error: !!this.state.errors.description1 })}>
                  <TextArea rows={3} maxLength={150} placeholder="Enter Description" name="description1" value={this.state.description1} onChange={this.onChangeDes} />
                  <p>{this.state.errors.description1}</p>
                </FormItem>
              </Col>

              <Col span={2} className="smallUploader">
                <h4 className="CustomNotifiTitles1">Image</h4>
                <FormItem className={classnames('imageUrl1', { error: !!this.state.errors.imageUrl1 })} style={{ 'marginLeft': '20' }}>
                  <Upload  {...props}
                    className="avatar-uploader"

                    showUploadList={false}
                    accept=".png,.jpg,.jpeg"
                    onChange={this.onChangeImg}
                    style={{ width: 80, height: 80 }}
                    >
                    {
                      this.state.imageUrl1 ?
                        <img src={this.state.imageUrl1} alt="" className="avatar" style={{ width: 80, height: 80 }} /> :
                        <Icon type="plus" className="avatar-uploader-trigger" style={{ width: 75, height: 75 }} />
                    }
                  </Upload>
                  <p>{this.state.errors.imageUrl1}</p>
                </FormItem>
              </Col>
            </Row>

          </Form>
        </Row>
      </div>
    },
    {
      title: 'Select Location',
      content:
      <div>
        <Row className="MarginTop20">
          <Form>
            <Row>
              <Col span={14} className="">
                <FormItem className={classnames('location', { error: !!this.state.errors.location })}>
                  <RadioGroup onChange={this.onChanRadio} value={this.state.location}>
                    <Radio value="Global">Global</Radio>
                    <Radio value="Local">Local</Radio>
                  </RadioGroup>
                  <p>{this.state.errors.location}</p>
                </FormItem>
              </Col>
            </Row>
            {this.state.location === "Local" ?
              <Row>
                <Col span={14} className="">
                  <FormItem>
                    {/* <Input type="" placeholder="Enter Location" name="location" value={this.state.location} maxLength={50} onChange={this.onInputChange} /> */}
                    <PlacesAutoComplete submit44={this.handleMapData} className="ant-input" />
                    <p style={{ color: "red" }}>{this.state.errors.city}</p>
                  </FormItem>
                  <FormItem>
                    {tags.map((tag, index) => {
                      const isLongTag = tag.length > 20;
                      const tagElem = (
                        <Tag key={tag} closable afterClose={() => this.handleClose(tag)}>
                          {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                        </Tag>
                      );
                      return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                    })}
                  </FormItem>
                </Col>
              </Row>
              : null}
          </Form>
        </Row>
      </div>
    }];
    return (
      <div id="custom" className="MarginTop20">
        <Steps current={this.state.current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">{steps[this.state.current].content}</div>
        <div className="steps-action">
          {
            this.state.current < steps.length - 1
            &&
            <Button type="primary" onClick={() => this.next()}>Next</Button>
          }
          {
            this.state.current === steps.length - 1
            &&
            <Button type="primary" onClick={() => this.done()}>Done</Button>
          }
          {
            this.state.current > 0
            &&
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
        </Button>
          }
        </div>
      </div>
    )
  }
}
export default CustomMislenious;
/* eslint-disable */