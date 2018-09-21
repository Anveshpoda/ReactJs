/* eslint-disable */
import React from 'react';
import Dashboard from '../../Dashboard/Dashboard'
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link, browserHistory } from 'react-router';
import axios from 'axios';
import classnames from 'classnames';

import $ from "jquery";
import moment from 'moment';
import css from '../../pushnotifications/pushNotifications.css';
import { Switch } from 'antd';
import PlacesAutoComplete from './PlaceAutoComplete';
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

class CustomChallenges extends React.Component {
  constructor() {
    super();
    this.state = {
      current: 0,
      ChallengeCategory: '',
      category: '',
      nType: '',
      PartiCoun: '',
      Rangein: '',
      within: '',
      withinran1: '',
      withinran2: '',
      withinran3: '',
      withinran4: '',
      formovie: '',
      imageUrl1: '',
      title1: '',
      description1: '',
      location: '',
      city: '',
      movienames: '',
      ccc: '',
      datewithin1: '',
      newdatewithin1: '',
      newdatewithinran1: '',
      newdatewithinran2: '',
      Uw: '',
      errors: {},
      LikeAndDate: {},
      tags: [],
      locationArray: []

    }

  }
  componentDidMount() {
    if (this.props != undefined) {
      this.setState({ category: this.props.category, nType: this.props.nType })
    }
  }
  onChangelnam = (e) => {
    this.setState({ city: e.target.value });
    if (e.target.value !== '') this.state.errors.city = '';
    const string = e.target.value;
    const Uw1 = string.charAt(0).toUpperCase() + string.slice(1);
    this.setState({ Uw: Uw1 });
  }
  onChanRadio = (e) => {
    var self = this;
    this.setState({ location: e.target.value })
    if (e.target.value !== '') this.state.errors.location = '';
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
  onChangewithinran3 = (e) => {
    this.setState({ withinran3: e });
    if (e !== '') this.state.errors.withinran3 = '';
  }
  onChangewithinran4 = (e) => {
    this.setState({ withinran4: e });
    if (e !== '') this.state.errors.withinran4 = '';
  }
  onChangewithinran1 = (e) => {
    this.setState({ withinran1: e })
    if (e !== '') this.state.errors.withinran1 = '';
    const number = e;
    var date = new Date();
    date.setDate(date.getDate() - number);
    const newdate = moment(date).format();
    this.setState({ newdatewithinran1: newdate })
  }
  onChangewithinran2 = (e) => {
    this.setState({ withinran2: e })
    if (e !== '') this.state.errors.withinran2 = '';
    const number = e;
    var date = new Date();
    date.setDate(date.getDate() - number);
    const newdate = moment(date).format();
    this.setState({ newdatewithinran2: newdate })
  }
  onChangeDate = (e) => {
    this.setState({ datewithin1: e })
    if (e !== '') this.state.errors.datewithin1 = '';
    const number = e;
    var date = new Date();
    date.setDate(date.getDate() - number);
    const newdate = moment(date).format();
    this.setState({ newdatewithin1: newdate })
  }
  onChangeDes = (e) => {
    this.setState({ description1: e.target.value });
    if (e.target.value.trim() !== '') this.state.errors.description1 = '';
  }
  onChangeTitle = (e) => {
    this.setState({ title1: e.target.value })
    if (e.target.value.trim() !== '') this.state.errors.title1 = '';
  }
  onCusChalType = (value) => {
    this.setState({ ChallengeCategory: value })
    if (value !== '') this.state.errors.ChallengeCategory = '';
  }
  onChangeTargetActi = (value) => {
    this.setState({ PartiCoun: value });
    if (value !== '') this.state.errors.PartiCoun = '';
    this.state.Rangein = ''
  }
  onChangeRange = (value) => {
    this.setState({ Rangein: value })
    if (value !== '') this.state.errors.Rangein = '';
  }

  onChangeWithin = (e) => {
    this.setState({ within: e })
    if (e !== '') this.state.errors.within = '';
  }

  onCategoryChange1 = (value) => {
    this.setState({ ccc: value });
    if (value !== '') this.state.errors.ccc = '';
  }

  next() {
    if (this.state.current === 0) {
      let errors = {};
      if (this.state.ChallengeCategory === '') errors.ChallengeCategory = "*mandatory field";
      if (this.state.PartiCoun === '') errors.PartiCoun = "*mandatory field";
      if (this.state.ccc === '') errors.ccc = "*mandatory field";
      this.setState({ errors });
      if (Object.keys(errors).length === 0) {
        if (this.state.PartiCoun === "No. of Likes Received") {
          if (this.state.ccc === "withIn" || this.state.ccc === "Unspecified") {
            if (this.state.Rangein != "withinRange") {
              let errors = {};
              if (this.state.Rangein === '') errors.Rangein = "*mandatory field"
              if (this.state.ccc === "withIn") {
                if (this.state.datewithin1 === '') errors.datewithin1 = "*mandatory field"
                if (this.state.datewithin1.length >= 3) errors.datewithin1 = "*mandatory field"

              }

              if (this.state.Rangein != '') {
                if (this.state.within === '') errors.within = "*mandatory field"
                if (this.state.within.length >= 3) errors.within = "*mandatory field"
              }
              this.setState({ errors })
              if (Object.keys(errors).length === 0) {
                var _self = this;
                var newdate;
                if (this.state.datewithin1) {
                  const number = this.state.datewithin1;
                  var date = new Date();
                  date.setDate(date.getDate() - number);
                  var day = moment(date).format("YYYY-MM-DD")
                  var time = moment().startOf('day').format('HH:mm:ss');
                  var d = day + " " + time;
                  newdate = new Date(d).toISOString();
                }
                var data = {
                  "likes": this.state.within,
                  "date": newdate ? newdate : "",
                  "category": this.state.ChallengeCategory,
                  "range": this.state.Rangein
                }
                var url = "/likesCount";
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
                      _self.setState({ LikeAndDate: response.data })
                      //message.success('Notification Created successfully!');
                    } else {
                      message.error(`unable to create Notification.`);
                    }

                  })
                const current = this.state.current + 1;
                this.setState({ current });

              }
            }
            else if (this.state.Rangein === "withinRange") {
              let errors = {};
              if (this.state.Rangein === '') errors.Rangein = "*mandatory field"
              if (this.state.ccc === "withIn") {
                if (this.state.datewithin1 === '') errors.datewithin1 = "*mandatory field"
                if (this.state.datewithin1.length >= 3) errors.datewithin1 = "*mandatory field"
              }
              if (this.state.Rangein != '') {
                if (this.state.withinran3 === '') errors.withinran3 = "*mandatory field"
                if (this.state.withinran4 === '') errors.withinran4 = "*mandatory field"
                if (this.state.withinran3.length >= 3) errors.withinran3 = "*mandatory field"
                if (this.state.withinran4.length >= 3) errors.withinran4 = "*mandatory field"
              }
              this.setState({ errors })
              if (Object.keys(errors).length === 0) {
                var _self = this;
                var newdate;
                if (this.state.datewithin1) {
                  const number = this.state.datewithin1;
                  var date = new Date();
                  date.setDate(date.getDate() - number);
                  var day = moment(date).format("YYYY-MM-DD")
                  var time = moment().startOf('day').format('HH:mm:ss');
                  var d = day + " " + time;
                  newdate = new Date(d).toISOString();
                }
                var data = {
                  "category": this.state.ChallengeCategory,
                  "fromLikes": this.state.withinran3,
                  "date": newdate ? newdate : "",
                  "range": this.state.Rangein,
                  "toLikes": this.state.withinran4
                }
                var url = "/likesCount";
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
                      _self.setState({ LikeAndDate: response.data })
                      // message.success('Notification Created successfully!');
                    } else {
                      message.error(`unable to create Notification.`);
                    }
                  })
                const current = this.state.current + 1;
                this.setState({ current });
              }
            }
          }
          else if (this.state.ccc === "withinRange" || this.state.ccc === "Unspecified") {
            if (this.state.Rangein != "withinRange") {
              let errors = {};
              if (this.state.Rangein === '') errors.Rangein = "*mandatory field"
              if (this.state.ccc === "withinRange") {
                if (this.state.withinran1 === '') errors.withinran1 = "*mandatory field"
                if (this.state.withinran2 === '') errors.withinran2 = "*mandatory field"
                if (this.state.withinran1.length >= 3) errors.withinran1 = "*mandatory field"
                if (this.state.withinran2.length >= 3) errors.withinran2 = "*mandatory field"
              }
              if (this.state.Rangein != '') {
                if (this.state.within === '') errors.within = "*mandatory field"
                if (this.state.within.length >= 3) errors.within = "*mandatory field"
              }
              this.setState({ errors })
              if (Object.keys(errors).length === 0) {
                var _self = this;
                var newdate1, newdate2;
                if (this.state.withinran1) {
                  const number1 = this.state.withinran1;
                  var date1 = new Date();
                  date1.setDate(date1.getDate() - number1);
                  var day = moment(date1).format("YYYY-MM-DD")
                  var time = moment().endOf('day').format('HH:mm:ss');
                  var d = day + " " + time;
                  newdate1 = new Date(d).toISOString();
                  const number2 = this.state.withinran2;
                  var date2 = new Date();
                  date2.setDate(date2.getDate() - number2);
                  var day = moment(date2).format("YYYY-MM-DD")

                  var time = moment().startOf('day').format('HH:mm:ss');
                  var d = day + " " + time;
                  newdate2 = new Date(d).toISOString();
                }
                var data = {
                  "likes": this.state.within,
                  "startDate": newdate1 ? newdate1 : "",
                  "endDate": newdate2 ? newdate2 : "",
                  "category": this.state.ChallengeCategory,
                  "range": this.state.Rangein
                }
                const url = "/likesCountRange";
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
                      _self.setState({ LikeAndDate: response.data });
                      // message.success('Notification Created successfully!');
                    } else {
                      message.error(`unable to create Notification.`);
                    }
                  })
                const current = this.state.current + 1;
                this.setState({ current });
              }
            }
            else if (this.state.Rangein === "withinRange") {
              let errors = {};
              if (this.state.Rangein === '') errors.Rangein = "*mandatory field"
              if (this.state.ccc === "withinRange") {
                if (this.state.withinran1 === '') errors.withinran1 = "*mandatory field"
                if (this.state.withinran2 === '') errors.withinran2 = "*mandatory field"
                if (this.state.withinran1.length >= 3) errors.withinran1 = "*mandatory field"
                if (this.state.withinran2.length >= 3) errors.withinran2 = "*mandatory field"
              }
              if (this.state.Rangein != '') {
                if (this.state.withinran3 === '') errors.withinran3 = "*mandatory field"
                if (this.state.withinran4 === '') errors.withinran4 = "*mandatory field"
                if (this.state.withinran3.length >= 3) errors.withinran3 = "*mandatory fiel"
                if (this.state.withinran4.length >= 3) errors.withinran4 = "*mandatory field"
              }
              this.setState({ errors })
              if (Object.keys(errors).length === 0) {
                var _self = this;
                var newdate1, newdate2;
                if (this.state.withinran1) {
                  const number1 = this.state.withinran1;
                  var date1 = new Date();
                  date1.setDate(date1.getDate() - number1);
                  var day = moment(date1).format("YYYY-MM-DD")
                  var time = moment().endOf('day').format('HH:mm:ss');
                  var d = day + " " + time;
                  newdate1 = new Date(d).toISOString();
                  const number2 = this.state.withinran2;
                  var date2 = new Date();
                  date2.setDate(date2.getDate() - number2);
                  var day = moment(date2).format("YYYY-MM-DD")

                  var time = moment().startOf('day').format('HH:mm:ss');
                  var d = day + " " + time;
                  newdate2 = new Date(d).toISOString();
                }
                var data = {
                  "category": this.state.ChallengeCategory,
                  "fromLikes": this.state.withinran3,
                  "startDate": newdate1 ? newdate1 : "",
                  "endDate": newdate2 ? newdate2 : "",
                  "range": this.state.Rangein,
                  "toLikes": this.state.withinran4
                }
                const url = "/likesCountRange";
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
                      _self.setState({ LikeAndDate: response.data });
                      // message.success('Notification Created successfully!');
                    } else {
                      message.error(`unable to create Notification.`);
                    }
                  })
                const current = this.state.current + 1;
                this.setState({ current });
              }
            }
          }

        }
        else if (this.state.PartiCoun === "No. of Participations") {
          if (this.state.ccc === "withIn" || this.state.ccc === "Unspecified") {
            if (this.state.Rangein != "withinRange") {
              let errors = {};
              if (this.state.Rangein === '') errors.Rangein = "*mandatory field"
              if (this.state.ccc === "withIn") {
                if (this.state.datewithin1 === '') errors.datewithin1 = "*mandatory field"
                if (this.state.datewithin1.length >= 3) errors.datewithin1 = "*mandatory field"

              }

              if (this.state.Rangein != '') {
                if (this.state.within === '') errors.within = "*mandatory field"
                if (this.state.within.length >= 3) errors.within = "*mandatory field"
              }
              this.setState({ errors })
              if (Object.keys(errors).length === 0) {
                var _self = this;
                var newdate;
                if (this.state.datewithin1) {
                  const number = this.state.datewithin1;
                  var date = new Date();
                  date.setDate(date.getDate() - number);
                  var day = moment(date).format("YYYY-MM-DD")
                  var time = moment().startOf('day').format('HH:mm:ss');
                  var d = day + " " + time;
                  newdate = new Date(d).toISOString();
                }
                var data = {
                  "category": this.state.ChallengeCategory,
                  "count": this.state.within,
                  "date": newdate ? newdate : "",
                  "range": this.state.Rangein
                }
                var url = "/participatedCount";
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
                      _self.setState({ LikeAndDate: response.data });
                      // message.success('Notification Created successfully!');
                    } else {
                      message.error(`unable to create Notification.`);
                    }

                  })
                const current = this.state.current + 1;
                this.setState({ current });
              }
            } else if (this.state.Rangein === "withinRange") {
              let errors = {};
              if (this.state.Rangein === '') errors.Rangein = "*mandatory field"
              if (this.state.ccc === "withIn") {
                if (this.state.datewithin1 === '') errors.datewithin1 = "*mandatory field"
                if (this.state.datewithin1.length >= 3) errors.datewithin1 = "*mandatory field"
              }
              if (this.state.Rangein != '') {
                if (this.state.withinran3 === '') errors.withinran3 = "*mandatory field"
                if (this.state.withinran4 === '') errors.withinran4 = "*mandatory field"
                if (this.state.withinran3.length >= 3) errors.withinran3 = "*mandatory field "
                if (this.state.withinran4.length >= 3) errors.withinran4 = "*mandatory field "
              }
              this.setState({ errors })
              if (Object.keys(errors).length === 0) {
                var _self = this;
                var newdate;
                if (this.state.datewithin1) {
                  const number = this.state.datewithin1;
                  var date = new Date();
                  date.setDate(date.getDate() - number);
                  var day = moment(date).format("YYYY-MM-DD")
                  var time = moment().startOf('day').format('HH:mm:ss');
                  var d = day + " " + time;
                  newdate = new Date(d).toISOString();
                }
                var data = {
                  "category": this.state.ChallengeCategory,
                  "fromCount": this.state.withinran3,
                  "date": newdate ? newdate : "",
                  "range": this.state.Rangein,
                  "toCount": this.state.withinran4
                }
                var url = "/participatedCount";
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
                      _self.setState({ LikeAndDate: response.data });
                      // message.success('Notification Created successfully!');
                    } else {
                      message.error(`unable to create Notification.`);
                    }

                  })
                const current = this.state.current + 1;
                this.setState({ current });
              }
            }

          } else if (this.state.ccc === "withinRange" || this.state.ccc === "Unspecified") {

            if (this.state.Rangein != "withinRange") {
              let errors = {};
              if (this.state.Rangein === '') errors.Rangein = "*mandatory field"
              if (this.state.ccc === "withinRange") {
                if (this.state.withinran1 === '') errors.withinran1 = "*mandatory field"
                if (this.state.withinran2 === '') errors.withinran2 = "*mandatory field"
                if (this.state.withinran1.length >= 3) errors.withinran1 = "*mandatory field"
                if (this.state.withinran2.length >= 3) errors.withinran2 = "*mandatory field"
              }
              if (this.state.Rangein != '') {
                if (this.state.within === '') errors.within = "*mandatory field"
                if (this.state.within.length >= 3) errors.within = "*mandatory field"
              }
              this.setState({ errors })
              if (Object.keys(errors).length === 0) {
                var _self = this;
                var newdate1, newdate2;
                if (this.state.withinran1) {
                  const number1 = this.state.withinran1;
                  var date1 = new Date();
                  date1.setDate(date1.getDate() - number1);
                  var day = moment(date1).format("YYYY-MM-DD")
                  var time = moment().endOf('day').format('HH:mm:ss');
                  var d = day + " " + time;
                  newdate1 = new Date(d).toISOString();
                  const number2 = this.state.withinran2;
                  var date2 = new Date();
                  date2.setDate(date2.getDate() - number2);
                  var day = moment(date2).format("YYYY-MM-DD")

                  var time = moment().startOf('day').format('HH:mm:ss');
                  var d = day + " " + time;
                  newdate2 = new Date(d).toISOString();
                }
                var data = {
                  "category": this.state.ChallengeCategory,
                  "count": this.state.within,
                  "startDate": newdate1 ? newdate1 : "",
                  "endDate": newdate2 ? newdate2 : "",
                  "range": this.state.Rangein
                }
                const url = "/participatedCountRange";
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
                      _self.setState({ LikeAndDate: response.data });
                      // message.success('Notification Created successfully!');
                    } else {
                      message.error(`unable to create Notification.`);
                    }

                  })
                const current = this.state.current + 1;
                this.setState({ current });
              }

            } else if (this.state.Rangein === "withinRange") {
              let errors = {};
              if (this.state.Rangein === '') errors.Rangein = "*mandatory field"
              if (this.state.ccc === "withinRange") {
                if (this.state.withinran1 === '') errors.withinran1 = "*mandatory field"
                if (this.state.withinran2 === '') errors.withinran2 = "*mandatory field"
                if (this.state.withinran1.length >= 3) errors.withinran1 = "*mandatory field"
                if (this.state.withinran2.length >= 3) errors.withinran2 = "*mandatory field"
              }
              if (this.state.Rangein != '') {
                if (this.state.withinran3 === '') errors.withinran3 = "*mandatory field"
                if (this.state.withinran4 === '') errors.withinran4 = "*mandatory field"
                if (this.state.withinran3.length >= 3) errors.withinran3 = "*mandatory field"
                if (this.state.withinran4.length >= 3) errors.withinran4 = "*mandatory field"
              }
              this.setState({ errors })
              if (Object.keys(errors).length === 0) {
                var _self = this;
                var newdate1, newdate2;
                if (this.state.withinran1) {
                  const number1 = this.state.withinran1;
                  var date1 = new Date();
                  date1.setDate(date1.getDate() - number1);
                  var day = moment(date1).format("YYYY-MM-DD")
                  var time = moment().endOf('day').format('HH:mm:ss');
                  var d = day + " " + time;
                  newdate1 = new Date(d).toISOString();
                  const number2 = this.state.withinran2;
                  var date2 = new Date();
                  date2.setDate(date2.getDate() - number2);
                  var day = moment(date2).format("YYYY-MM-DD")

                  var time = moment().startOf('day').format('HH:mm:ss');
                  var d = day + " " + time;
                  newdate2 = new Date(d).toISOString();
                }
                var data = {
                  "category": this.state.ChallengeCategory,
                  "fromCount": this.state.withinran3,
                  "startDate": newdate1 ? newdate1 : "",
                  "endDate": newdate2 ? newdate2 : "",
                  "range": this.state.Rangein,
                  "toCount": this.state.withinran4
                }
                const url = "/participatedCountRange";
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
                      _self.setState({ LikeAndDate: response.data });
                      // message.success('Notification Created successfully!');
                    } else {
                      message.error(`unable to create Notification.`);
                    }
                  })
                const current = this.state.current + 1;
                this.setState({ current });
              }
            }
          }
        }
        else if (this.state.PartiCoun === "Participated") {
          if (this.state.ccc === "withIn" || this.state.ccc === "Unspecified") {
            let errors = {};
            if (this.state.ccc === "withIn") {
              if (this.state.datewithin1 === '') errors.datewithin1 = "*mandatory field"
              if (this.state.datewithin1.length >= 3) errors.datewithin1 = "*mandatory field"
            }
            this.setState({ errors })
            if (Object.keys(errors).length === 0) {

              var _self = this;
              var newdate;
              if (this.state.datewithin1) {
                const number = this.state.datewithin1;
                var date = new Date();
                date.setDate(date.getDate() - number);
                var day = moment(date).format("YYYY-MM-DD")
                var time = moment().startOf('day').format('HH:mm:ss');
                var d = day + " " + time;
                newdate = new Date(d).toISOString();
              }
              var data = {
                "category": this.state.ChallengeCategory,
                "date": newdate ? newdate : ""
              }
              const url = "/participated"
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
                    _self.setState({ LikeAndDate: response.data })
                    // message.success('Notification Created successfully!');
                  } else {
                    message.error(`unable to create Notification.`);
                  }

                })
              const current = this.state.current + 1;
              this.setState({ current });
            }

          }
          else if (this.state.ccc === "withinRange" || this.state.ccc === "Unspecified") {
            let errors = {};
            if (this.state.ccc === "withinRange") {
              if (this.state.withinran1 === '') errors.withinran1 = "*mandatory field"
              if (this.state.withinran2 === '') errors.withinran2 = "*mandatory field"
              if (this.state.withinran1.length >= 3) errors.withinran1 = "*mandatory field"
              if (this.state.withinran2.length >= 3) errors.withinran2 = "*mandatory field"
            }

            this.setState({ errors })
            if (Object.keys(errors).length === 0) {
              var _self = this;
              var newdate1, newdate2;
              if (this.state.withinran1) {
                const number1 = this.state.withinran1;
                var date1 = new Date();
                date1.setDate(date1.getDate() - number1);
                var day = moment(date1).format("YYYY-MM-DD")
                var time = moment().endOf('day').format('HH:mm:ss');
                var d = day + " " + time;
                newdate1 = new Date(d).toISOString();
                const number2 = this.state.withinran2;
                var date2 = new Date();
                date2.setDate(date2.getDate() - number2);
                var day = moment(date2).format("YYYY-MM-DD")

                var time = moment().startOf('day').format('HH:mm:ss');
                var d = day + " " + time;
                newdate2 = new Date(d).toISOString();
              }
              var data = {
                "category": this.state.ChallengeCategory,
                "startDate": newdate1 ? newdate1 : "",
                "endDate": newdate2 ? newdate2 : ""
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
                    _self.setState({ LikeAndDate: response.data })
                    // message.success('Notification Created successfully!');
                  } else {
                    message.error(`unable to create Notification.`);
                  }
                })
              const current = this.state.current + 1;
              this.setState({ current });
            }
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
  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    const locationArray = this.state.locationArray.filter(loc => loc.location !== removedTag)
    this.setState({ tags, locationArray });
  }


  handleMapData = (data, locationId) => {
    var res = data.split(',');
    var locationObj = {}
    if(!this.state.tags.includes(res[0])){
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
        var data = {
          "type": this.state.nType,
          "category": this.state.category,
          "users": this.state.LikeAndDate,
          "title": this.state.title1.trim(),
          "description": this.state.description1.trim(),
          "imageUrl": this.state.imageUrl1,
          "location": this.state.location == "Global" ? [this.state.location] : locations,
          "targetUserCategory": this.state.ChallengeCategory,
          "targetActivity": this.state.PartiCoun,
          "range": this.state.Rangein,
          "likesCount": this.state.within,
          "startLikesCount": this.state.withinran3,
          "endLikesCount": this.state.withinran4,
          "within": this.state.ccc,
          "days": this.state.datewithin1,
          "startDays": this.state.withinran1,
          "endDays": this.state.withinran2,
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
              _self.setState({ ParticipatedTwoDates: response.data })
              message.success('Notification Sent');
              browserHistory.push('/push-notifications/custom-notifications');
            } else {
              message.error(`Error! Unable to send Notification`);
            }
          })
      }
    }
  }
  // onKeypress = (e) => {
  //   e = (e) ? e : window.event;
  //   var charCode = (e.which) ? e.which : e.keyCode;
  //   if (charCode > 31 && (charCode < 48 || charCode > 57)) {
  //     document.getElementById('mobile').innerHTML = ("Please enter only numbers");
  //     e.preventDefault();
  //     return false;
  //   }
  //   document.getElementById('mobile').innerHTML = ("");
  //   return true;
  // }
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
    const steps = [{
      title: 'Select Target Users',
      content:
      <div id="CChallenges" className="">
        <Row className="MarginTop20">
          <Form>
            <Row>
              <Col span={18} className="">
                <FormItem label="Select Challenge Category" className={classnames('ChallengeCategory', { error: !!this.state.errors.ChallengeCategory })}>
                  <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                    showSearch
                    style={{ width: 250 }}
                    placeholder="Select Challenge Category"
                    optionFilterProp="children"
                    value={this.state.ChallengeCategory || undefined}
                    onChange={this.onCusChalType}
                    name="ChallengeCategory"
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                    <Option value="dubshmash">Dub2Win</Option>
                    <Option value="karoke">Karaoke</Option>
                    <Option value="wallpost">Wallpost</Option>
                    <Option value="poster">Poster</Option>
                    <Option value="All">All</Option>
                  </Select>
                  <span>{this.state.errors.ChallengeCategory}</span>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={18} className="">
                <ul className="list-inline">
                  <li>
                    <FormItem label="Criteria to be followed" className={classnames('PartiCoun', { error: !!this.state.errors.PartiCoun })}>

                      <Select className="LeftSpace" getPopupContainer={triggerNode => triggerNode.parentNode}
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Participated"
                        optionFilterProp="children"
                        value={this.state.PartiCoun || undefined}
                        onChange={this.onChangeTargetActi}
                        name="PartiCoun"
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                        {targetActivities}
                      </Select>
                      <span>{this.state.errors.PartiCoun}</span>
                    </FormItem></li>
                  <li className="CustomNotifiChallengesSelectLikeRange">
                    {this.state.PartiCoun === "No. of Likes Received" || this.state.PartiCoun === "No. of Participations" ?
                      <div>
                        <FormItem label="Select Comparision Value" className={classnames('Rangein', { error: !!this.state.errors.Rangein })}>
                          <Select className="LeftSpace"
                            showSearch
                            style={{ width: 200 }}
                            placeholder="select range"
                            optionFilterProp="children"
                            name="Rangein"
                            value={this.state.Rangein || undefined}
                            onChange={this.onChangeRange}
                            >
                            <Option value="Is less than">Is less than</Option>
                            <Option value="Is greater than">Is greater than</Option>
                            <Option value="Is equal to">Is equal to </Option>

                            <Option value="withinRange">With In Range</Option>
                          </Select>
                          <span>{this.state.errors.Rangein}</span>
                        </FormItem>
                      </div>
                      : null}</li>
                  <li className="CustomNotifiChallengesWithinRange">
                    {this.state.Rangein === "Is less than" || this.state.Rangein === "Is greater than" || this.state.Rangein === "Is equal to" ? <div>
                      <FormItem label="Enter Count" className={classnames('within', { error: !!this.state.errors.within })}>
                        <InputNumber min={1} placeholder="WithIn" name="within" value={this.state.within} onChange={this.onChangeWithin} style={{ width: 100 }} />
                        <p style={{ "color": "red", "text-align": "left" }} id="mobile" className="mobile"></p>
                        <span>{this.state.errors.within}</span>
                      </FormItem></div> : null}</li>
                  <li>
                    {this.state.Rangein === "withinRange" ? <div>
                      <FormItem>
                        <ul className="list-inline"><li className="">
                          <FormItem label="Start Count" className={classnames('withinran3', { error: !!this.state.errors.withinran3 })}>
                            <InputNumber min={1} placeholder="Likes" value={this.state.withinran3} name="withinran3" onChange={this.onChangewithinran3} />
                            <span>{this.state.errors.withinran3}</span>
                          </FormItem>
                        </li>  <li className="">
                            <FormItem label="End Count" className={classnames('withinran4', { error: !!this.state.errors.withinran4 })}>
                              <InputNumber min={1} value={this.state.withinran4} name="withinran4" placeholder="end" onChange={this.onChangewithinran4} />
                              <span>{this.state.errors.withinran4}</span>
                            </FormItem>
                          </li></ul>
                        {/* <span className="">  ---  </span> */}
                      </FormItem></div> : null}</li>
                </ul>
              </Col>


              <Col span={18} className="">
                <ul className="list-inline">
                  <li>
                    <FormItem label="Select Time Range" className={classnames('ccc', { error: !!this.state.errors.ccc })}>
                      <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                        showSearch
                        style={{ width: 200 }}
                        placeholder="within"
                        optionFilterProp="children"
                        value={this.state.ccc || undefined}
                        onChange={this.onCategoryChange1}
                        name="ccc"
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                        <Option value="withIn">withIn</Option>
                        <Option value="withinRange">withinRange</Option>
                        <Option value="Unspecified">Unspecified</Option>

                      </Select>
                      <span>{this.state.errors.ccc}</span>
                    </FormItem></li>
                  <li className="CustomChallengesWithinday">
                    {this.state.ccc === "withIn" ? <div>

                      <FormItem label="Enter Count" className={classnames('datewithin1', { error: !!this.state.errors.datewithin1 })}>
                        <InputNumber min={1} placeholder="15" style={{ width: 50 }} value={this.state.datewithin1} onChange={this.onChangeDate} />
                        <span>{this.state.errors.datewithin1}</span>
                      </FormItem>

                    </div> : null}</li>
                  <li>

                    {this.state.ccc === "withinRange" ? <div>
                      <ul className="list-inline"><li>
                        <FormItem label="Start Count" className={classnames('withinran1', { error: !!this.state.errors.withinran1 })}>
                          <InputNumber min={1} placeholder="start to" value={this.state.withinran1} onChange={this.onChangewithinran1} />
                          <span>{this.state.errors.withinran1}</span>
                        </FormItem>
                      </li> <li>
                          <FormItem label="End Count" className={classnames('withinran2', { error: !!this.state.errors.withinran2 })}>
                            <InputNumber min={1} value={this.state.withinran2} placeholder="end" onChange={this.onChangewithinran2} />
                            <span>{this.state.errors.withinran2}</span>
                          </FormItem>
                        </li></ul>
                      {/* <span className="">  ---  </span> */}
                    </div> : null}
                  </li>
                </ul>
                {/* {this.state.ccc === "Unspecified" ? null:null} */}
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
           <Row>
          <Col span={11}>
           <h4 className="CustomNotifiTitles">Notification Title</h4>
            <FormItem className={classnames('title1', { error: !!this.state.errors.title1 })}>
              <Input autoComplete={'off'} type="text" placeholder="Enter Title" value={this.state.title1} name="title1" name="title1" maxLength={50} onChange={this.onChangeTitle} />
              <span>{this.state.errors.title1}</span>
            </FormItem>
            </Col>
            </Row>
            <Row className="marginBottom20">
              <Col span={8} className="">
              <h4 className="CustomNotifiTitles">Notification Decription</h4>
                <FormItem className={classnames('description1', { error: !!this.state.errors.description1 })}>
                  <TextArea rows={3} maxLength={150} placeholder="Enter Description" name="description1" value={this.state.description1} onChange={this.onChangeDes} />
                  <span>{this.state.errors.description1}</span>
                </FormItem>
              </Col>
              <Col span={4} className="marginLeft20">
               <h4 className="CustomNotifiTitles">Image</h4>
                <FormItem className={classnames('imageUrl1', { error: !!this.state.errors.imageUrl1 })}>
                 <div className="CustomNotifiChallengesImagesUpload">
                  <Upload  {...props}
                    className="avatar-uploader"
                    showUploadList={false}
                    accept=".png,.jpg,.jpeg"
                    onChange={this.onChangeImg}
                    >
                    {
                      this.state.imageUrl1 ?
                        <img src={this.state.imageUrl1} alt="" className="avatar" /> :
                        <Icon type="plus" className="avatar-uploader-trigger" />
                    }
                  </Upload>
                  </div>
                  <span>{this.state.errors.imageUrl1}</span>
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
                  <span>{this.state.errors.location}</span>
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
      <div className="CChallengess">
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

    );

  }
}
export default CustomChallenges;
/* eslint-disable */