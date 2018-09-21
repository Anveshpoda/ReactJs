/* eslint-disable */
import React, { Component, PropTypes } from 'react';
import RichTextEditor from 'react-rte';
import Dashboard from '../Dashboard/Dashboard'
import classnames from 'classnames';
import { browserHistory } from 'react-router';
import { Col, Select, DatePicker, TimePicker, Tooltip, Upload,Checkbox, Radio, Switch, Modal, Form, Icon, Input, Button, Steps, message, Popconfirm } from 'antd'
import AddTag from './AddTag.js';
import Demo2 from './Demo2';
import MapWrapper2 from './MapWrapper2'
import axios from 'axios';
import moment from 'moment';
import ReactTooltip from 'react-tooltip'
import youtubeIcon from '../images/youtube.png';

const FormItem = Form.Item;
const Step = Steps.Step;
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const dateFormat = 'YYYY/MM/DD';
const format = 'HH:mm';
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
function handleChange(value) {
  console.log(`selected ${value}`);
}
const props = {
  name: 'file',
  action:  process.env.REACT_APP_API_HOST + '/rest/azureImageUploadWeb',
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
function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}
class EditContest extends React.Component {
  static propTypes = {
    onChange11: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.disabledDate = this.disabledDate.bind(this);
    this.disableEndDate = this.disableEndDate.bind(this);
    this.state = {
      current: 0,
      contestType: '',
      contestDescription: '',
      contestStartDate: '',
      contestEndDate: '',
      contestLocation: '',
      contestIcon: '',
      contestImageUrl: '',
      contestThumbnail: '',
      buttonText: '',
      contestPoints: '',
      contestVoucher: '',
      location2: '',
      locationr: 'Local Wise',
      locationr1: '',
      terms: '',
      contestTitle: '',
      errors: {},
      isCommercial: false,
      contestCaption: '',
      contestVideoUrl: '',
      dubSmashAudioUrl: '',
      dubSmashDescription: '',
      dubSmashTitle: '',
      dubsmashLids: '',
      offers: '',
      disabled: false,
      disabled1: false,
      disabled5: false,
      childdata: {},
      childdata1: '',
      childerr: '',
      childerr1: '',
      editdata: {},
      editaboutmovie: {},
      editId: '',
      isPublished: '',
      lat1: '',
      value: RichTextEditor.createEmptyValue()
    };
    this.handleChange = this.handleChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }
  onChange11 = (value) => {
    this.setState({ value });
    if (this.props.onChange) {
      this.props.onChange(
        value.toString('html')
      );
    }
  }
  confirm(e) {
    // console.log(e);
    browserHistory.push('/fankick');
    //message.success('Click on Yes');
  }
  cancel(e) {
    // console.log(e);
    //message.error('Click on No');
  }
  componentDidMount() {
    this.getContests();
  }
  getContests = () => {
    const id = this.props.params ? this.props.params._id : this.props.contestid;
    console.log("id", id)
    var instance = axios.create({
      timeout: 1000,
      headers: { 'x-access-token': sessionStorage.getItem('token') }
    });
    instance.get('/contest/' + id).then((response) => {
      const data = response.data.data;
      //  console.log("editdata",data);
      this.setState({ editdata: data });
      this.setState({ editId: id });
      this.setState({ buttonText: this.state.editdata.buttonText });
      this.setState({ contestDescription: this.state.editdata.contestDescription });
      this.setState({ contestTitle: this.state.editdata.contestTitle });
      sessionStorage.setItem('Title', this.state.editdata.contestTitle)
      this.setState({ contestCaption: this.state.editdata.contestCaption });
      this.setState({ isCommercial: this.state.editdata.isCommercial })
      this.setState({ isPublished: this.state.isPublished })
      this.setState({ contestStartDate: this.state.editdata.contestStartDate });
      this.setState({ contestEndDate: this.state.editdata.contestEndDate });
      this.setState({ contestIcon: this.state.editdata.contestIcon });
      this.setState({ contestImageUrl: this.state.editdata.contestImageUrl });
      this.setState({ contestThumbnail: this.state.editdata.contestThumbnail });
      this.setState({ contestVideoUrl: this.state.editdata.contestVideoUrl });
      this.setState({ contestPoints: this.state.editdata.contestPoints });
      this.setState({ offers: this.state.editdata.offers });
      this.setState({ value: RichTextEditor.createValueFromString(this.state.editdata.termsAndConditions, 'html') });
      this.setState({ terms: this.state.editdata.termsAndConditions });
      this.setState({ editaboutmovie: this.state.editdata.aboutMovie });
      this.setState({ locationr1: 'false' })

      const karoke = this.state.editdata.karoke;
      const dubshmash = this.state.editdata.dubshmash;

      if (karoke != undefined) {
        const data = karoke.locationIds
        if (data != '' && data != undefined) {

          // console.log("location is found at karoke local", data);
          this.setState({ locationr1: 'true', childdata1: data });
        } else {
          // console.log("location is not  found at karoke global", data);
          this.setState({ locationr1: 'false', childdata1: '' });
        }
      }
      if (dubshmash != undefined) {
        const data = dubshmash.locationIds
        if (data != '' && data != undefined) {
          //  console.log("location is found at dubshmash local", data);
          this.setState({ locationr1: 'true', childdata1: data });
        } else {
          //console.log("location is not  found at dubshmash global", data);
          this.setState({ locationr1: 'false', childdata1: '' });
        }
      }

    });
  }

  onChange5 = (e) => {
    if (this.state.isCommercial !== false) this.state.errors.isCommercial = '';
    this.setState({ isCommercial: e.target.checked })
  }
  onChange6 = (e) => {
    if (this.state.contestCaption !== '') this.state.errors.contestCaption = '';
    this.setState({ contestCaption: e.target.value })
  }
  onChange7 = (e) => {
    if (this.state.contestVideoUrl !== '') this.state.errors.contestVideoUrl = '';
    this.setState({ contestVideoUrl: e.target.value });
  }
  handleChange13 = (e) => {
    //console.log('radio checked', e.target.value);
    this.setState({
      locationr: e.target.value,
    });
  }
  handleChange14 = (value, e) => {
    if (this.state.locationr1 !== '') this.state.errors.locationr1 = '';
    this.setState({ locationr1: value });
  }
  onChange14 = (e) => {
    if (this.state.offers !== '') this.state.errors.offers = '';
    this.setState({ offers: e.target.value });
  }
  handleChange = (value, e) => {
    this.setState({ contestType: value, disabled1: true });
  }
  onKeyPress = (e) => {

    e = (e) ? e : window.event;
    var charCode = (e.which) ? e.which : e.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      document.getElementById('mobile').innerHTML = ("Please enter only numbers");
      e.preventDefault();
      return false;
    }
    document.getElementById('mobile').innerHTML = ("");
    return true;
  }
  onKeyDown = (e) => {
    let charCode = String.fromCharCode(e.which).toLowerCase();
    if (e.ctrlKey && charCode === 'c') {
      e.preventDefault();

    } else if (e.ctrlKey && charCode === 'v') {
      e.preventDefault();

    } else if (e.ctrlKey && charCode === 's') {
      e.preventDefault();
    }
  }
  handleChange24 = (e) => {
    const value = e.target.value;
    if (this.state.contestTitle !== '') this.state.errors.contestTitle = '';
    this.setState({ contestTitle: value });
  }
  handleChange1 = (e, value) => {
    if (this.state.contestDescription !== '') this.state.errors.contestDescription = '';
    this.setState({ [e.target.name]: e.target.value });
  }
  handleChange2 = (value) => {
    var time = "5:30:00"
    var value1 = moment(value).format('YYYY-MM-DD');
    var d = value1 + " " + time;
    var newdate1 = new Date(d).toISOString();
    // console.log("newd edit ",newdate1)
    this.setState({ contestStartDate: newdate1, contestEndDate: '' });
  }
  handleChange3 = (value) => {
    var time = "5:30:00"
    var value1 = moment(value).format('YYYY-MM-DD');
    var d = value1 + " " + time;
    var newdate2 = new Date(d).toISOString();
    //  console.log("newd",newdate2)
    this.setState({ contestEndDate: newdate2 });
  }
  handleChange4 = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleChange5 = (info) => {
    // console.log("info.file.status", info.file.type);
    if (info.file.type === "image/png" || info.file.type === "image/jpg" || info.file.type === "image/jpeg") {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        if (info.file.response.data !== '') this.state.errors.contestIcon = '';
        this.setState({
          contestIcon: info.file.response.data
        })
      }
    } else {
      let errors = {};
      if (this.state.contestIcon === '') errors.contestIcon = "Only Image is required."
      this.setState({ errors });
      if (Object.keys(errors).length === 0) {
        //  console.log("super");
      }
    }
  }
  handleChange6 = (info) => {
    if (info.file.type === "image/png" || info.file.type === "image/jpg" || info.file.type === "image/jpeg") {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        if (info.file.response.data !== '') this.state.errors.contestImageUrl = '';
        this.setState({
          contestImageUrl: info.file.response.data
        })
      }
    } else {
      let errors = {};
      if (this.state.contestImageUrl === '') errors.contestImageUrl = "Only Image is required."
      this.setState({ errors });
      if (Object.keys(errors).length === 0) {
        // console.log("super");

      }
    }
  }
  handleChange7 = (info) => {
    if (info.file.type === "image/png" || info.file.type === "image/jpg" || info.file.type === "image/jpeg") {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        if (info.file.response.data !== '') this.state.errors.contestThumbnail = '';
        this.setState({
          contestThumbnail: info.file.response.data
        })
      }
    } else {
      let errors = {};
      if (this.state.contestThumbnail === '') errors.contestThumbnail = "Only Image is required."
      this.setState({ errors });
      if (Object.keys(errors).length === 0) {
        // console.log("super");
      }
    }
  }
  handleChange10 = (e) => {
    if (this.state.buttonText !== '') this.state.errors.buttonText = '';
    this.setState({ [e.target.name]: e.target.value });
  }
  handleChange11 = (e) => {
    e.preventDefault()
    if (this.state.contestPoints !== '') this.state.errors.contestPoints = '';
    this.setState({ [e.target.name]: e.target.value });
  }
  handleChange12 = (value) => {
    this.setState({ contestVoucher: value });
  }
  handleChange23 = (e) => {
    if (this.state.terms !== '') this.state.errors.terms = '';
    this.setState({ [e.target.name]: e.target.value });
  }
  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }
  disabledDate(current) {
    if (!current) {
      return false;
    }
    const date = moment();
    date.hour(0);
    date.minute(0);
    date.second(0);
    return current.valueOf() < date.valueOf();
  }
  disableEndDate(current) {
    if (!current) {
      return false;
    }
    const date = moment(this.state.contestStartDate).add(1, 'day');
    date.hour(0);
    date.minute(0);
    date.second(0);
    return current.valueOf() <= date.valueOf();
    //return current && current < moment().endOf('day');;
  }
  submit1 = (data, check) => {
    //console.log("this.props for kara and dub and am", data);
    if (data !== '') this.state.errors.childerr = '';
    var ttt = data.karaokeTitle
    //console.log("tttkaroketitle", ttt)
    if (this.state.childdata != '') this.state.errors.childdata = '';
    this.setState({ childerr: ttt, childdata: data, postercheck: check });
  }
  submit44 = (data, data1) => {
    //console.log("this.props for map in edit", data);
    //console.log("this.props for map in edit1", data1);
    if (data !== '') this.state.errors.childerr1 = '';
    this.setState({ childerr1: data, childdata1: data, childdata1: data1, lat1: data.lat1 });
  }
  next() {
    const current = this.state.current;
    if (current === 0) {
      let errors = {};
      if (this.state.buttonText.trim() === '') errors.buttonText = "* This field is mandatory";
      if (this.state.buttonText.length >= 21) errors.buttonText = "buttonText should be 20 chars ";
      if (this.state.contestCaption.trim() === '') errors.contestCaption = "* This field is mandatory";
      if (this.state.contestCaption.length >= 91) errors.contestCaption = "Catchy  Caption should be 90 chars"
      // if (this.state.isCommercial === '') errors.isCommercial = "commercial is required";
      // if (this.state.isCommercial === false) errors.isCommercial = "commercial is required";
      if (this.state.contestDescription.trim() === '') errors.contestDescription = "* This field is mandatory";
      if (this.state.contestDescription.length >= 121) errors.contestDescription = "Description should be 120 chars"
      if (this.state.contestTitle.trim() === '') errors.contestTitle = "* This field is mandatory";
      if (this.state.contestTitle.length >= 36) errors.contestTitle = "contestTitle should be 35 chars ";
      if (this.state.contestStartDate === '') errors.contestStartDate = "contestStartDate is required";
      if (this.state.contestEndDate === '') errors.contestEndDate = "contestEndDate is required";
      this.setState({ errors });
      if (Object.keys(errors).length === 0) {
        const current = this.state.current + 1;
        this.setState({ current });
      }
    } else if (current === 1) {
      let errors = {};
      if (this.state.contestIcon === '') errors.contestIcon = "contestIcon is required";
      if (this.state.contestImageUrl === '') errors.contestImageUrl = "contestImageUrl is required";
      if (this.state.contestThumbnail === '') errors.contestThumbnail = "contestThumbnail is required";
      if (this.state.contestVideoUrl === '') errors.contestVideoUrl = "* This field is mandatory";
      if (this.state.contestVideoUrl === undefined) errors.contestVideoUrl = "contest video Url is required"
      if (this.state.contestPoints === '') errors.contestPoints = "* This field is mandatory";
      if (this.state.contestPoints != '') {
        if (isNaN(this.state.contestPoints)) {

          document.getElementById('mobile').innerHTML = ("only numbers are required.");
        } else {
          //  console.log("its a number")
        }
      }
      if (this.state.contestPoints.length >= 7) errors.contestPoints = "contestPoints should be 6 numbers";
      this.setState({ errors });
      if (Object.keys(errors).length === 0) {
        const current = this.state.current + 1;
        this.setState({ current });
      }
    }
    else if (current === 2) {
      let errors = {};

      if (this.state.locationr1 === "true") {
        if (this.state.childdata1 === "false") errors.childdata1 = "Location is required";
        // if (this.state.childdata1 === '') errors.childdata1 = "Location is required";
        if (this.state.childdata1 === 'true') {
          if (this.state.childdata1 === undefined) errors.childdata1 = "Location is required";
          if (this.state.childerr1 === "") errors.childerr1 = "location is required"
        }
        if (this.state.childerr1 != '') {
          if (this.state.lat1 === '') errors.lat1 = "give valid location";
        }
      }
      // if (this.state.childdata.length === undefined) errors.childdata = "select one challenge";
      if (this.state.aboutMovie != undefined) {
        if (this.state.locationr1 === '') errors.locationr1 = "please give one location";
      }
      var myObj = this.state.childdata
      if (isEmpty(myObj)) {

      } else {
        if (this.state.childdata.employees.length != 0) {
          if (this.state.childdata.karaokeAudioUrl == '' && this.state.childdata.dubSmashAudioUrl == '' && this.state.childdata.fileList.length == 0) errors.childdata = "Please add either Dub2Win, Karaoke, Frame";

        }
      }
      this.setState({ errors })
      if (Object.keys(errors).length === 0) {
        const current = this.state.current + 1;
        this.setState({ current });
        //console.log("this.state", this.state);
      }
    }
  }
  prev(e) {
    const current = this.state.current - 1;
    this.setState({ current });
    // if (this.state.current != 3) {
    //   const current = this.state.current - 1;
    //   this.setState({ current });
    // } else {
    //   message.error(`your changes are saved you cant go previous screen.`, 1);
    //   this.setState({ disabled5: true })
    // }
  }
  done() {
    const current = this.state.current;
    if (current === 3) {
      var htmjj = this.state.value.toString('html')
      var bb = "<html><head><link href='https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i' rel='stylesheet'></head><body><ul style='font-family:roboto;margin-Left:-60px;color:#929292'><ul>" + htmjj + "</ul><body></htm>"
      this.state.terms = bb;
      let errors = {};
      if (this.state.offers != '') {
        if (this.state.offers.length >= 301) errors.offers = "offers should be 300 chars";
      }

      // if (this.state.terms.trim() === '') errors.terms = "terms is required";
      // if (this.state.terms.length >= 301) errors.terms = "terms should be 300 chars ";
      //  if (this.state.offers === '') errors.offers = "offers is required";
      // if (this.state.offers.length >= 101) errors.offers = "offers should be 100 chars";
      this.setState({ errors });
      if (Object.keys(errors).length === 0) {
        this.setState({ disabled: true })
        var data = {};
        var karoke = ''
        var dubSmash = ''
        var aboutMovie = ''
        var Frame = ''
        var poster = ''
        var wallpost = ''
        // console.log("this.state.childdata.postercheck", this.state.childdata.postercheck);
        karoke = this.state.childdata.karaokeTitle && this.state.childdata.karaokeDescription && this.state.childdata.karaokeAudioUrl || '';
        dubSmash = this.state.childdata.dubSmashTitle && this.state.childdata.dubSmashDescription && this.state.childdata.dubSmashAudioUrl || '';
        if (this.state.childdata.fileList.length !== 0) {
          if (this.state.childdata.fileList[0].url != undefined) {
            Frame = this.state.childdata.fileList[0].url
          } else {
            Frame = this.state.childdata.fileList[0].response.data || ''
          }
          //Frame = this.state.childdata.fileList[0].url || this.state.childdata.fileList[0].response.data || ''
        }
        // Frame = this.state.childdata.contestIcon11 || '';
        if (this.state.childdata.postercheck === true) {
          poster = true;
        } else if (this.state.childdata.postercheck === false) {
          poster = '';
        }
        if (this.state.childdata.postercheckwall === true) {
          wallpost = true;
        }
        else if (this.state.childdata.postercheckwall === false) {
          wallpost = '';
        }
        if (this.state.childdata.employees.length != 0) {
          aboutMovie = this.state.childdata.employees[0].actorName;
        }
        let locationid = "";
        if (this.state.locationr1 === "true") {
          locationid = sessionStorage.getItem('locationkey') || ""
          if (locationid === "") {
            if (this.state.editdata.karoke != undefined) {
              if (this.state.editdata.karoke.locationIds[0] != undefined) {
                locationid = this.state.editdata.karoke.locationIds[0]._id || undefined
              }
            } else if (this.state.editdata.dubSmash != undefined) {
              if (this.state.editdata.dubSmash.locationIds[0] != undefined) {
                locationid = this.state.editdata.dubSmash.locationIds[0]._id || undefined
              }
            }
          }
        }
        var frameimages = []
        if (this.state.childdata.fileList.length !== 0) {
          var icon44 = ''
          var icon45 = ''
          var icon46 = ''
          var icon47 = ''
          var icon48 = ''
          if (this.state.childdata.fileList[0] != undefined) {
            if (this.state.childdata.fileList[0].url != undefined) {
              icon44 = this.state.childdata.fileList[0].url
            } else {
              icon44 = this.state.childdata.fileList[0].response.data || ''
            }
          }
          if (this.state.childdata.fileList[1] != undefined) {
            //icon45 =  this.state.childdata.fileList[1].url || this.state.childdata.fileList[1].response.data || ''
            if (this.state.childdata.fileList[1].url != undefined) {
              icon45 = this.state.childdata.fileList[1].url
            } else {
              icon45 = this.state.childdata.fileList[1].response.data || ''
            }
          }
          if (this.state.childdata.fileList[2] != undefined) {
            // icon46 = this.state.childdata.fileList[2].url ||  this.state.childdata.fileList[2].response.data || ''
            if (this.state.childdata.fileList[2].url != undefined) {
              icon46 = this.state.childdata.fileList[2].url
            } else {
              icon46 = this.state.childdata.fileList[2].response.data || ''
            }
          }
          if (this.state.childdata.fileList[3] != undefined) {
            //icon47 = this.state.childdata.fileList[3].url || this.state.childdata.fileList[3].response.data || ''
            if (this.state.childdata.fileList[3].url != undefined) {
              icon47 = this.state.childdata.fileList[3].url
            } else {
              icon47 = this.state.childdata.fileList[3].response.data || ''
            }
          }
          if (this.state.childdata.fileList[4] != undefined) {
            // icon48 = this.state.childdata.fileList[4].url || this.state.childdata.fileList[4].response.data || ''
            if (this.state.childdata.fileList[4].url != undefined) {
              icon48 = this.state.childdata.fileList[4].url
            } else {
              icon48 = this.state.childdata.fileList[4].response.data || ''
            }
          }
          for (let i = 0; i < 1; i++) {
            if (icon44 !== '') {
              frameimages.push(icon44);
            }
            if (icon45 !== '') {
              frameimages.push(icon45);
            }
            if (icon46 !== '') {
              frameimages.push(icon46);
            }
            if (icon47 !== '') {
              frameimages.push(icon47);
            }
            if (icon48 !== '') {
              frameimages.push(icon48);
            }
          }
        }
        console.log("frame images in edit", frameimages);
        data = {
          "buttonText": this.state.buttonText.trim(),
          "contestDescription": this.state.contestDescription.trim(),
          "contestIcon": this.state.contestIcon,
          "contestImageUrl": this.state.contestImageUrl,
          "contestThumbnail": this.state.contestThumbnail,
          "contestPoints": this.state.contestPoints,
          "contestTitle": this.state.contestTitle.trim(),
          "isCommercial": this.state.isCommercial,
          "contestCaption": this.state.contestCaption.trim(),
          "contestVideoUrl": this.state.contestVideoUrl.trim(),
          "termsAndConditions": this.state.terms.trim(),
          "contestStartDate": this.state.contestStartDate,
          "contestEndDate": this.state.contestEndDate,
          "offers": this.state.offers.trim(),
          "isDeleted": false,
          "order": [],
          "isMoviePromotion": true,
          "isPublished": this.state.isPublished
        }
        if (karoke != '') {
          data.karoke = {
            "isLocationBased": this.state.locationr1,
            "audioUrl": this.state.childdata.karaokeAudioUrl,
            "title": this.state.childdata.karaokeTitle.trim(),
            "description": this.state.childdata.karaokeDescription.trim(),
            "locationIds": [locationid != "" ? locationid : null]
          }
          data.order.push("karoke");
        }
        if (dubSmash != '') {
          data.dubshmash = {
            "isLocationBased": this.state.locationr1,
            "audioUrl": this.state.childdata.dubSmashAudioUrl,
            "title": this.state.childdata.dubSmashTitle.trim(),
            "description": this.state.childdata.dubSmashDescription.trim(),
            "locationIds": [locationid != "" ? locationid : null]
          }
          data.order.push("dubshmash");
        }
        if (Frame != '') {
          data.frame = {
            "isLocationBased": this.state.locationr1,
            "frames": frameimages
          }
          data.order.push("frame");
        }
        if (poster === true) {
          data.poster = {
            "isLocationBased": this.state.locationr1,
            "locationIds": []
          }
          data.order.push("poster");
        }
        if (wallpost === true) {
          data.order.push("wallpost");
        }
        if (aboutMovie != '') {
          data.aboutMovie = {
            "tags": this.state.childdata.tag,
            "releaseDate": this.state.childdata.releaseDate,
            "movieDuration": this.state.childdata.time,
            "synopsis": this.state.childdata.synopsis.trim(),
            "crew": this.state.childdata.employees,
            "cast": this.state.childdata.employees1
          }
          data.order.push("aboutMovie");
        }

        // console.log("preloaddataedit", data);
        const id = this.state.editId;
        //  console.log("edit id from state",id)
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
              //    console.log("dataresponse", response.data);
              message.success('Challenge Edited successfully!', 5);
              var clear = sessionStorage.removeItem('locationkey');
              var clear = sessionStorage.removeItem('karokeLatest')
              var clear = sessionStorage.removeItem('dubshmashLatest')
              var clear = sessionStorage.removeItem('aboutMovie')
              //   console.log("clearlocation id", clear)
              browserHistory.push("/fankick");
            }
            else {
              message.error(`Unable to create challenge.`, 5);
            }
          })

      }
    }

  }
 

  render() {
    console.log("this.state in edit contest", this.state);
    var read = this.props.params ? '' : "readOnly";
    var disable = this.props.params ? false : true;
    const { current } = this.state;
    const { getFieldDecorator } = this.props.form;
    const steps = [{
      title: 'Challenge Details',
      content: <Col span={20}><Form>
        <Col span={16} className="mrgnTop20">
          <FormItem className={classnames('contestTitle', { error: !!this.state.errors.contestTitle })}>
            <h6 className='h6Fnt'>Contest Title
            <span>

                <a data-tip data-for='global'>  <Icon className="mrgleft10" type="exclamation-circle-o" /> </a>
                <ReactTooltip id='global' aria-haspopup='true' role='example'>
                  <ol>
                    <li>  1. This will appear as a heading for your challenge</li>
                    <li>2. Length should not exceed 35 characters (With spaces)</li>
                  </ol>
                </ReactTooltip>
              </span>
            </h6>
            <Input placeholder="Enter contestTitle " 
            readOnly={read} name="contestTitle" value={this.state.contestTitle} onChange={this.handleChange24} />
            <span>{this.state.errors.contestTitle}</span>
          </FormItem></Col>
        <Col span={16}>
          <FormItem className={classnames('contestDescription', { error: !!this.state.errors.contestDescription })}>
            <h6 className='h6Fnt'>Contest Description
              <span>
                <a data-tip data-for='global2'>  <Icon className="mrgleft10" type="exclamation-circle-o" /> </a>
                <ReactTooltip id='global2' aria-haspopup='true' role='example'>
                  <ol>
                    <li>  1. Length should not exceed 120 characters (With spaces)</li>
                    <li>2. Target - Explain challenge & induce audience to partake</li>
                  </ol>
                </ReactTooltip>
              </span>
            </h6>
            <TextArea readOnly={read} rows={3} placeholder="Enter Description here" name="contestDescription" value={this.state.contestDescription}
              onChange={this.handleChange1} />
            <span>{this.state.errors.contestDescription}</span>
          </FormItem></Col>
        <Col span={16}>
          <FormItem className={classnames('buttonText', { error: !!this.state.errors.buttonText })}>
            <h6 className='h6Fnt'>Call to Action (CTA) Button Text
               <span>
                <a data-tip data-for='global3'>  <Icon className="mrgleft10" type="exclamation-circle-o" /> </a>
                <ReactTooltip id='global3' aria-haspopup='true' role='example'>
                  <ol>
                    <li> 1. Length should not exceed 20 characters</li>
                    <li>2. Should synch with the type and context of the challenge</li>
                  </ol>
                </ReactTooltip>
              </span>
            </h6>

            <Input readOnly={read} placeholder="Enter Button Text" name="buttonText" value={this.state.buttonText} onChange={this.handleChange10} />

            <span>{this.state.errors.buttonText}</span>
          </FormItem>
        </Col>
        <Col span={16}>
          <ul className="list-inline">
            <li>
              <FormItem label="Contest Start Date" className={classnames('contestStartDate', { error: !!this.state.errors.contestStartDate })}>
                <DatePicker disabled={disable} getCalendarContainer={triggerNode => triggerNode.parentNode}
                  onChange={this.handleChange2}
                  value={this.state.contestStartDate ? moment(this.state.contestStartDate, dateFormat) : ''} format={dateFormat}
                  disabledDate={this.disabledDate} name="contestStartDate" placeholder="Select Start Date" />
                <p>{this.state.errors.contestStartDate}</p>
              </FormItem></li>
            <li>
              <FormItem label="Contest End Date" className={classnames('contestEndDate', { error: !!this.state.errors.contestEndDate })}>

                <DatePicker disabled={disable} getCalendarContainer={triggerNode => triggerNode.parentNode}
                  onChange={this.handleChange3}
                  value={this.state.contestEndDate ? moment(this.state.contestEndDate, dateFormat) : ''} format={dateFormat}
                  disabledDate={this.disableEndDate} name="contestEndDate" placeholder="Select End Date" />

                <p>{this.state.errors.contestEndDate}</p>
              </FormItem></li>

          </ul>
        </Col>

        <Col span={16}>
          <FormItem label="" className={classnames('isCommercial', { error: !!this.state.errors.isCommercial })}>
            <Checkbox disabled={disable} onChange={this.onChange5} name="isCommercial" checked={this.state.isCommercial}></Checkbox><span className="mrgleft10"> Is Commercial?</span>
            <p>{this.state.errors.isCommercial}</p>
          </FormItem>
        </Col>
        <Col span={16}>
          <FormItem className={classnames('contestCaption', { error: !!this.state.errors.contestCaption })} >
            <h6 className='h6Fnt'>Catchy Caption
       <span>
                <a data-tip data-for='global4'>  <Icon className="mrgleft10" type="exclamation-circle-o" /> </a>
                <ReactTooltip id='global4' aria-haspopup='true' role='example'>

                  <ol>
                    <li>1. Should be very catchy</li>
                    <li>2. Length should not exceed 90 characters (With spaces)</li>
                  </ol>
                </ReactTooltip>
              </span>
            </h6>

            <Input readOnly={read} placeholder="Enter Catchy caption" value={this.state.contestCaption} name="contestCaption" onChange={this.onChange6} />
            <span>{this.state.errors.contestCaption}</span>
          </FormItem></Col>

      </Form>
      </Col>,
    }, {
      title: 'Add Media',
      content: <div className="mrgnTop20"><ul className='list-inline'>
        <li className='antColLg-14  challwenges'>
          <FormItem className={classnames('contestIcon', { error: !!this.state.errors.contestIcon })}>
            <ul className='list-inline'>
              <li>   <h6 className='h6Fnt'>
                Add Banner Image</h6></li>
              <li className="LiRgt">
                <h6 className='h6Fnt rhtTxt'><Icon type="download" className="blueIcon" /> PSD Template
            </h6>
              </li>
            </ul>

            <div className="EditChallengesaboutmovie">
              <Upload {...props}
                className="avatar-uploader uploaderchlbanner"
                showUploadList={false}
                onChange={this.handleChange5}
                disabled={disable}
                accept=".png,.jpg,.jpeg"
              >
                {
                  this.state.contestIcon ?
                    <img src={this.state.contestIcon} name="contestIcon" alt="Contest Icon" className="avatar" style={{ width: 320, height: 170 }} /> :
                    <Icon type="plus" className="avatar-uploader-trigger" style={{ width: 320, height: 170 }} />
                }
              </Upload>
            </div>

            <span>{this.state.errors.contestIcon}</span>
          </FormItem>
        </li>
        <li className='antColLg-14 challwenges'>
          <FormItem className={classnames('contestImageUrl', { error: !!this.state.errors.contestImageUrl })}>
            <h6 className='h6Fnt'>Add Inner Image</h6>
            <div className="AddbannerEditchalng">
              <Upload {...props}
                className="avatar-uploader uploaderchlbanner"
                showUploadList={false}
                onChange={this.handleChange6}
                accept=".png,.jpg,.jpeg"
                disabled={disable}
              >
                {
                  this.state.contestImageUrl ?
                    <img src={this.state.contestImageUrl} name="contestImageUrl" alt="Contest Image" className="avatar" style={{ width: 320, height: 170 }} /> :
                    <Icon type="plus" className="avatar-uploader-trigger" style={{ width: 320, height: 170 }} />
                }
              </Upload>
            </div>
            <span>{this.state.errors.contestImageUrl}</span>
          </FormItem>
        </li>
        <li className='uploadimg170 challwenges'>
          <FormItem className={classnames('contestThumbnail', { error: !!this.state.errors.contestThumbnail })}>
            <h6 className='h6Fnt'>Add thumbnail Image</h6>
            <div className="uploadimg170 ">
              <Upload {...props}
                className="avatar-uploader uploadimg170 BorderNone"
                showUploadList={false}
                onChange={this.handleChange7}
                accept=".png,.jpg,.jpeg"
                disabled={disable}
              >
                {
                  this.state.contestThumbnail ?
                    <img src={this.state.contestThumbnail} name="contestThumbnail" alt="Contest Thumbnail" className="avatar" style={{ width: 170, height: 170 }} /> :
                    <Icon type="plus" className="avatar-uploader-trigger uploadimg170" style={{ width: 170, height: 170 }} />
                }
              </Upload>
            </div>
            <span>{this.state.errors.contestThumbnail}</span>
          </FormItem>
        </li>
      </ul>
        <ul className='list-inline antColLg-24 mrgnTop25'>
          <li className='antColLg-14'>
            <Col span={24}>
              <FormItem className={classnames('contestVideoUrl', { error: !!this.state.errors.contestVideoUrl })}>
                <h6 className='h6Fnt'>Contest Video ID   <span>

                </span> </h6>
                <Col span={24}>

                  <Input readOnly={read} value={this.state.contestVideoUrl} placeholder="Contest Video ID" name="contestVideoUrl" onChange={this.onChange7} />
                  <span>{this.state.errors.contestVideoUrl}</span>
                </Col>
                <a href="https://www.youtube.com/" target="_blank">
                  <Icon> <img src={youtubeIcon} className="mrgnTop15 ImgCenter" alt="Youtube Icon" /></Icon>
                </a>
                {/*  <a href="https://vimeo.com/" target="_blank">
                  <Icon> <img src={vimeoIcon} className="mrgn15 ImgCenter"  alt="Vimeo Icon" /></Icon>
                </a>*/}
              </FormItem>


            </Col>
          </li>
          <li className='antColLg-14'>
            <Col span={24}>
              <FormItem className={classnames('contestPoints', { error: !!this.state.errors.contestPoints })}>
                <h6 className='h6Fnt'>Define Fan Coins <span>

                </span></h6>
                <Input readOnly={read}  placeholder="Add FanCoins" value={this.state.contestPoints} name="contestPoints" onChange={this.handleChange11} onKeyPress={this.onKeyPress} onKeyDown={this.onKeyDown} />
                <p className="RedTxtLeft" id="mobile" className="mobile"></p>
                <span>{this.state.errors.contestPoints}</span>
              </FormItem>
            </Col>
          </li>

        </ul>
        <Col span={24}>
          <Col span={6}>
            <FormItem label="Movie Name">
              <Input placeholder="Movie Name" />
            </FormItem>
          </Col>
          <Col span={6} offset={1}>
            <FormItem label="Author Name">
              <Input placeholder="Author Name" />
            </FormItem>
          </Col>
        </Col>
     {/*   <Col span={24}>
          <FormItem label="Major Keywords">

            <div>
              {tags.map((tag, index) => {
                const isLongTag = tag.length > 20;
                const tagElem = (
                  <Tag key={tag} closable={index !== -1} afterClose={() => this.handleClose(tag)}>
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                  </Tag>
                );
                return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
              })}
              {inputVisible && (
                <Input
                  ref={this.saveInputRef}
                  type="text"
                  size="small"
                  style={{ width: 78 }}
                  value={inputValue}
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputConfirm}
                  onPressEnter={this.handleInputConfirm}
                  />
              )}
              {!inputVisible && (
                <Tag
                  onClick={this.showInput}
                  style={{ background: '#fff', borderStyle: 'dashed' }}
                  >
                  <Icon type="plus" /> New Tag
                </Tag>
              )}
            </div>
          </FormItem>
        </Col>

        <Col span={24}>
          <Col span={24}>
            <FormItem label="Minor Keywords">

              <div>
                {tags.map((tag, index) => {
                  const isLongTag = tag.length > 20;
                  const tagElem = (
                    <Tag key={tag} closable={index !== -1} afterClose={() => this.handleClose(tag)}>
                      {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                    </Tag>
                  );
                  return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                })}
                {inputVisible && (
                  <Input
                    ref={this.saveInputRef}
                    type="text"
                    size="small"
                    style={{ width: 78 }}
                    value={inputValue}
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputConfirm}
                    onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && (
                  <Tag
                    onClick={this.showInput}
                    style={{ background: '#fff', borderStyle: 'dashed' }}
                    >
                    <Icon type="plus" /> New Tag
                </Tag>
                )}
              </div>
            </FormItem>
          </Col>

        </Col>*/}

        
        
  
        </div>,
    }, {
      title: 'Location',
      content: <div>

        {/* <FormItem label="Contest Location" className={classnames('locationr', { error: !!this.state.errors.locationr })}>

          <RadioGroup onChange={this.handleChange13} name="location2" value={this.state.locationr}>
            <Radio value={'Global Wise'}>Global Wise</Radio>
            <Radio value={'Local Wise'}>Local Wise</Radio>
          </RadioGroup>
          <span>{this.state.errors.locationr}</span>
          <MapWrapper2 submit44={this.submit44} editdata={this.state.editdata}/>
          <span className="error">{this.state.errors.childerr1}</span>
        </FormItem> */}

        <FormItem label="Contest Location" className={classnames('locationr1', { error: !!this.state.errors.locationr1 })}>
          <h6 className='h6Fnt'>Select Location
          <span>
              <a data-tip data-for='global5'>  <Icon className="mrgleft10" type="exclamation-circle-o" /> </a>
              <ReactTooltip id='global5' aria-haspopup='true' role='example'>
                <ol>
                  <li>1. Specify the location you want to publish this challenge</li>
                  <li>2. You can select multiple locations</li>
                  <li>3. If the challenge has an universal appeal, select Global</li>
                </ol>
              </ReactTooltip>
            </span>
          </h6>
          <Select className="mrgnBottom20 width200" getPopupContainer={triggerNode => triggerNode.parentNode}
            showSearch
            placeholder="Challenge Type"
            optionFilterProp="children"
            value={this.state.locationr1 || undefined}
            onChange={this.handleChange14}
            onSelect={this.onKeyPress1}
            name="locationr1"
            disabled={disable}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="false">Global</Option>
            <Option value="true">Local</Option>
          </Select>
          <span>{this.state.errors.locationr1}</span>
        </FormItem>

        {this.state.locationr1 === "true" ?
          <FormItem>
            <MapWrapper2 disabled={disable} readOnly={read} submit44={this.submit44} editdata={this.state.editdata} childerr1={this.state.childerr1} />
            <span className="error">{this.state.errors.childdata1}</span>
            <span className="error">{this.state.errors.childerr1}</span>
            <span className="error">{this.state.errors.lat1}</span>
            <p className="RedTxtLeft" id="locationr1" className="locationr1"></p>
          </FormItem>
          : null}
        <div>

          <Demo2 disabled={disable} readOnly={read} editdata={this.state.editdata} submit1={this.submit1} />
          <span className="error">{this.state.errors.childerr}</span>
          <span className="error">{this.state.errors.childdata}</span>
        </div>

      </div>,
    }, {
      title: 'Terms & Conditions',
      content: <div>
        <Col span={16} className="">
          <FormItem className={classnames('offers', { error: !!this.state.errors.offers })}>
            <h6 className='h6Fnt'>Define Offers
            <span>
                <a data-tip data-for='global11'>  <Icon className="mrgleft10" type="exclamation-circle-o" /> </a>
                <ReactTooltip id='global11' aria-haspopup='true' role='example'>
                  <ol>
                    <li>1. Length should not exceed 300 characters (With spaces)</li>
                    <li>2. Explain the benefits and offers in brief</li>
                  </ol>
                </ReactTooltip>
              </span>
            </h6>
            <Input readOnly={read} placeholder="Define Offers" name="offers" value={this.state.offers} onChange={this.onChange14} />
            <span>{this.state.errors.offers}</span>
            <Col span={1}>

            </Col>
          </FormItem></Col>
        <Col span={16} className="CreateChallengsRich">
          <h6 className="h6Fnt mrgnBottom10">Terms & Conditions
           <span>
              <a data-tip data-for='global12'>  <Icon className="mrgleft10" type="exclamation-circle-o" /> </a>
              <ReactTooltip id='global12' aria-haspopup='true' role='example'>
                <ol>
                  <li>1. Specify the Terms & Conditions for participating in your challenge</li>
                  <li>2. Length cannot be defined (Recommended not to exceed 300 characters)</li>
                </ol>
              </ReactTooltip>
            </span>
          </h6>
          <RichTextEditor
            readOnly={read}
            value={this.state.value}
            onChange={this.onChange11}
          />
        </Col>
      </div>,
    }];

    var ui = <div> <div className="dashbrdBack">
    <div className="EditchlngSubMenu">
       <Col span={20}>
                <Col span={5} lg={{span:4}} sm={{span:5}} xl={{span:3}}><h2  className="chalngpageTitle">Edit Challenges</h2></Col>

          <Col span={5} lg={{span:4}} sm={{span:5}} xl={{span:3}}  className="PollSeleccat">
                <Select className="PollingSeleccat" placeholder="Select Category" style={{ width: '100% ' }}
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                  onChange={handleChange}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>Disabled</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>

              </Col>
              <Col span={5} lg={{span:4}} sm={{span:5}} xl={{span:3}} className="PollSeleccat">
                <Select className="PollingSeleccat" placeholder="Select SubCategory" style={{ width: '100% ' }}
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                  onChange={handleChange}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>Disabled</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>

              </Col>
              <Col span={5} lg={{span:4}} sm={{span:5}} xl={{span:3}} className="PollSeleccat">
                <Select className="PollingSeleccat" placeholder="Select Celebrity" style={{ width: '100% ' }}
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                  onChange={handleChange}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>Disabled</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Col>

            </Col>
      <Col span={4} className="txtpadding10">
        <Popconfirm title="your changes will not save if you click yes?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
          <Button type="primary" className='EditChallengebackbtn'> <Icon type="arrow-left" />Back to Dashboard</Button>
        </Popconfirm>
      </Col>
    </div>
  </div>

  <div className="EditchlngSubMenuChallengesSteps">
    <Col span={20}>
      <Steps current={current} className="">
        {steps.map(item => <Step key={item.title} title={item.title} />)}
      </Steps>
    </Col>

    <div className="steps-content">{steps[this.state.current].content}</div>
    <Col span={24} className="marginTop20">
      <div className="steps-action floatRight">
        {
          this.state.current > 0
          &&
          <Button className="mrgnRight8" onClick={() => this.prev()} disabled={this.state.disabled5}>
            Previous
       </Button>
        }
        {
          this.state.current < steps.length - 1
          &&
          <Button type="primary" className="mrgnBtm20" disabled={this.state.disabled1} onClick={() => this.next()}>
           {disable === false ? <span> Save and Next </span> : <span>Next </span> }</Button>
        }
        {
          this.state.current === steps.length - 1
            &&
            disable === false ? <Button type="primary" onClick={() => this.done()} disabled={this.state.disabled}>
              Done</Button> : ''
        }

      </div>
    </Col>
  </div>
    </div>
    return (
      <div>
        {this.props.params ? <Dashboard>
          {ui}
        </Dashboard> : ui}
      </div>
    );
  };
}

const EditEvent = Form.create()(EditContest);
export default EditEvent;
/* eslint-disable */