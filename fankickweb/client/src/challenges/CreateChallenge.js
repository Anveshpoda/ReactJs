/* eslint-disable */
import React, { PropTypes } from 'react';
import RichTextEditor from 'react-rte';
import Dashboard from '../Dashboard/Dashboard'
import classnames from 'classnames';
import { browserHistory } from 'react-router';
import { Col, Select, DatePicker, Tooltip, Upload, Checkbox, Radio, Tag, Form, Icon, Input, Button, Steps, message, Popconfirm } from 'antd'
import Demo from './demo';
import MapWrapper from './MapWrapper';
import SendForApproval from '../ApprovalCycle/sendforApproval.js'
import youtubeIcon from '../images/youtube.png';

import ReactTooltip from 'react-tooltip'
import moment from 'moment';
const FormItem = Form.Item;
const Step = Steps.Step;
const Option = Select.Option;
const { TextArea } = Input;
// const RadioGroup = Radio.Group;
const dateFormat = 'YYYY/MM/DD';
const format = 'HH:mm';
// function getBase64(img, callback) {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);
// }
function handleChange(value) {
  console.log(`selected ${value}`);
}

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}
const props = {
  name: 'file',
  action: process.env.REACT_APP_API_HOST + '/rest/azureImageUploadWeb',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    // console.log("info", info)
    if (info.file.status !== 'uploading') {
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
class CreateChallenge extends React.Component {
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
      categories: [],
      subCategories: [],
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
      locationr: false,
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
      mapdata: '',
      lat1: '',
      value: RichTextEditor.createEmptyValue(),
      tags: [],
      locationArray: [],
      challengeData: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onKeyPress1 = this.onKeyPress1.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
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
  onChange5 = (e) => {
    if (e.target.checked !== false) this.state.errors.isCommercial = '';
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
    this.setState({ locationr: e.target.checked })
  }
  handleChange14 = (value, e) => {
    if (this.state.locationr1 !== '') this.state.errors.locationr1 = '';
    this.setState({ locationr1: value, childdata1: value });
  }
  onKeyPress1 = (value) => {
    //console.log("keypress")
  }
  onChange14 = (e) => {
    if (this.state.offers !== '') this.state.errors.offers = '';
    this.setState({ offers: e.target.value });
  }
  handleChange = (value, e) => {
    this.setState({ contestType: value });
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
    if (this.state.contestTitle.trim() !== '') this.state.errors.contestTitle = '';
    this.setState({ contestTitle: value });
  }
  handleChange1 = (e, value) => {
    if (this.state.contestDescription.trim() !== '') this.state.errors.contestDescription = '';
    this.setState({ [e.target.name]: e.target.value });
  }
  handleChange2 = (value) => {
    var time = "5:30:00"
    var value1 = moment(value).format('YYYY-MM-DD');
    var d = value1 + " " + time;
    var newdate1 = new Date(d).toISOString();
    //console.log("newd",newdate1)
    this.setState({ contestStartDate: newdate1, contestEndDate: '' });
    if (newdate1 !== '') this.state.errors.contestStartDate = '';
  }
  handleChange3 = (value) => {
    var time = "5:30:00"
    var value1 = moment(value).format('YYYY-MM-DD');
    var d = value1 + " " + time;
    var newdate2 = new Date(d).toISOString();
    //console.log("newd",newdate2)
    this.setState({ contestEndDate: newdate2 });
    if (newdate2 !== '') this.state.errors.contestEndDate = '';
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
        // console.log("super");
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
    if (this.state.buttonText.trim() !== '') this.state.errors.buttonText = '';
    this.setState({ [e.target.name]: e.target.value });
  }
  handleChange11 = (e) => {
    if (this.state.contestPoints !== '') this.state.errors.contestPoints = '';
    this.setState({ [e.target.name]: e.target.value });
  }
  handleChange12 = (value) => {
    this.setState({ contestVoucher: value });
  }
  handleChange23 = (e) => {
    if (this.state.terms !== '') this.state.errors.terms = '';
    this.setState({ terms: e.target.value });
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
  }
  submit1 = (data) => {
    //console.log("this.props for kara and dub and am", data);
    const data1 = data
    if (this.state.childdata !== '') this.state.errors.childdata = '';
    this.setState({ childdata: data1 });
  }
  submit44 = (data, locationId) => {
    var res = data.split(',');
    var locationObj = {}
    locationObj.location = res[0];
    locationObj.locId = locationId;
    //console.log(locationObj)
    var locations = [...this.state.locationArray, locationObj]
    var tags = [...this.state.tags, res[0]];
    this.setState({
      tags: tags,
      locationArray: locations
    })
    if (data !== '') this.state.errors.lat1 = '';
    if (data !== '') this.state.errors.childdata1 = '';
    this.setState({ childdata1: data, mapdata: data, lat1: data.lat1 });
  }
  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    const locationArray = this.state.locationArray.filter(loc => loc.location !== removedTag)
    this.setState({ tags, locationArray });
  }
  next() {
    const current = this.state.current;
    if (current === 0) {
      let errors = {};
      if (this.state.buttonText.trim() === '') errors.buttonText = "* This field is mandatory";
      if (this.state.buttonText.length >= 21) errors.buttonText = "Button Text should be 20 chars ";
      if (this.state.contestCaption.trim() === '') errors.contestCaption = "* This field is mandatory";
      if (this.state.contestCaption.length >= 91) errors.contestCaption = "Catchy caption should be 90 chars"
      //if (this.state.isCommercial === false) errors.isCommercial = "commercial is required";
      if (this.state.contestDescription.trim() === '') errors.contestDescription = "* This field is mandatory";
      if (this.state.contestDescription.length >= 121) errors.contestDescription = "Description should be 120 chars"
      if (this.state.contestTitle.trim() === '') errors.contestTitle = "* This field is mandatory";
      if (this.state.contestTitle.length >= 36) errors.contestTitle = "Contest Title should be 35 chars ";
      if (this.state.contestStartDate === '') errors.contestStartDate = "* This field is mandatory";
      if (this.state.contestEndDate === '') errors.contestEndDate = "* This field is mandatory";
      this.setState({ errors });
      if (Object.keys(errors).length === 0) {
        const current = this.state.current + 1;
        this.setState({ current });
      }
    } else if (current === 1) {
      let errors = {};
      if (this.state.contestIcon === '') errors.contestIcon = "* This field is mandatory";
      if (this.state.contestImageUrl === '') errors.contestImageUrl = "* This field is mandatory";
      if (this.state.contestThumbnail === '') errors.contestThumbnail = "* This field is mandatory";
      if (this.state.contestVideoUrl.trim() === '') errors.contestVideoUrl = "* This field is mandatory";
      if (this.state.contestPoints === '') errors.contestPoints = "* This field is mandatory";
      if (isNaN(this.state.contestPoints)) {
        document.getElementById('mobile').innerHTML = ("Only numbers are required.");
      } else {
        if (this.state.contestPoints.length >= 7) errors.contestPoints = "ContestPoints should be 6 numbers";
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
          const current = this.state.current + 1;
          this.setState({ current });
        }
      }
    }
    else if (current === 2) {
      let errors = {};
      if (this.state.locationr1 === 'true') {
        // if (this.state.childdata1 === 'true') errors.childdata1 = "Location is required";
        if (this.state.childdata1 === 'true') {
          if (this.state.lat1 === '') errors.lat1 = "give valid location";
        }
      }
      if (this.state.childdata.length === undefined) errors.childdata = "select one challenge";
      if (this.state.locationr1 === '') errors.locationr1 = "Location is required";
      var myObj = this.state.childdata
      if (isEmpty(myObj)) {

      } else {
        if (this.state.childdata.employees.length !== 0) {

          if (this.state.childdata.karaokeAudioUrl == '' && this.state.childdata.dubSmashAudioUrl == '' && this.state.childdata.fileList.length == 0) errors.childdata = "Please add either Dub2Win, Karaoke, Frame";
        }
      }
      this.setState({ errors })
      if (Object.keys(errors).length === 0) {
        const current = this.state.current + 1;
        this.setState({ current });
      }
    }
  }
  prev(e) {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  done() {
    var _this = this;
    const current = this.state.current;
    if (current === 3) {
      var htmjj = this.state.value.toString('html')
      var bb = "<html><head><link href='https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i' rel='stylesheet'></head><body><ul style='font-family:roboto;margin-Left:-60px;color:#929292'><ul>" + htmjj + "</ul><body></htm>"
      this.state.terms = bb;
      let errors = {};
      // if (this.state.terms.trim() === '') errors.terms = "Terms required";
      // if (this.state.terms.length >= 301) errors.terms = "Terms should be 300 chars ";
      // if (this.state.offers.trim() === '') errors.offers = "offers is required";
      if (this.state.offers !== '') {
        if (this.state.offers.length >= 301) errors.offers = "offers should be 300 chars";
      }

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
          Frame = this.state.childdata.fileList[0].response.data || ''
        }
        //  Frame = this.state.childdata.contestIcon11 || '';
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

        if (this.state.childdata.employees.length !== 0) {
          aboutMovie = this.state.childdata.employees[0].actorName;
        }
        const tags = this.state.childdata.tag
        // const crewdata = this.state.childdata.employees
        // const castdata = this.state.childdata.employees1
        // console.log("crewdata", crewdata[0].name)
        // console.log("castdata", castdata[0].name)
        var locations = []
        for (let i = 0; i < this.state.locationArray.length; i++) {
          locations[i] = this.state.locationArray[i].locId
        }
        var frameimages = []
        if (this.state.childdata.fileList.length !== 0) {
          var icon44 = ''
          var icon45 = ''
          var icon46 = ''
          var icon47 = ''
          var icon48 = ''
          if (this.state.childdata.fileList[0] != undefined) {
            icon44 = this.state.childdata.fileList[0].response.data || ''
          }
          if (this.state.childdata.fileList[1] != undefined) {
            icon45 = this.state.childdata.fileList[1].response.data || ''
          }
          if (this.state.childdata.fileList[3] != undefined) {
            icon46 = this.state.childdata.fileList[2].response.data || ''
          }
          if (this.state.childdata.fileList[3] != undefined) {
            icon47 = this.state.childdata.fileList[3].response.data || ''
          }
          if (this.state.childdata.fileList[4] != undefined) {
            icon48 = this.state.childdata.fileList[4].response.data || ''
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
        console.log("frame images", frameimages);
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
          "isPublished": false,
          "inAppType": 1
        }
        if (karoke !== '') {
          data.karoke = {
            "isLocationBased": this.state.locationr1,
            "audioUrl": this.state.childdata.karaokeAudioUrl,
            "title": this.state.childdata.karaokeTitle.trim(),
            "description": this.state.childdata.karaokeDescription.trim(),
            "locationIds": this.state.locationr1 === "false" ? [] : locations
          }
          data.order.push("karoke");
        }
        if (dubSmash !== '') {
          data.dubshmash = {
            "isLocationBased": this.state.locationr1,
            "audioUrl": this.state.childdata.dubSmashAudioUrl,
            "title": this.state.childdata.dubSmashTitle.trim(),
            "description": this.state.childdata.dubSmashDescription.trim(),
            "locationIds": this.state.locationr1 === "false" ? [] : locations
          }
          data.order.push("dubshmash");
        }
        if (Frame !== '') {
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
        if (aboutMovie !== '') {
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

        //console.log("preloaddata", data);
        const url = '/contest';
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
              message.success('Challenge Created successfully!');
              browserHistory.push('/fankick')
              _this.setState({ challengeData: response.data });
              //  _this.refs.child.approvalModal();

            }
            else {
              message.error(`Unable to create challenge.`, 5);
            }
          })

      }
    }

  }
  //------new added tags ----//
  state = {
    tags: ['Unremovable', 'Tag 2', 'Tag 3'],
    inputVisible: false,
    inputValue: '',
  };

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  }

  saveInputRef = input => this.input = input

  //--------//


  render() {
    //console.log("this.state", this.state);
    const { current } = this.state;
    const { tags } = this.state;
    const { inputVisible, inputValue } = this.state;
    //const { getFieldDecorator } = this.props.form;
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

            <Input autoComplete={'off'} placeholder="Enter contest Title" name="contestTitle" value={this.state.contestTitle} onChange={this.handleChange24} />
            <span>{this.state.errors.contestTitle}</span>

          </FormItem>

        </Col>
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
            <TextArea rows={3} placeholder="Enter Description here" name="contestDescription" value={this.state.contestDescription}
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

            <Input autoComplete={'off'} placeholder="Enter Button Text" name="buttonText" value={this.state.buttonText} onChange={this.handleChange10} />
            <span>{this.state.errors.buttonText}</span>

          </FormItem>
        </Col>
        <Col span={16}>
          <ul className="list-inline">
            <li>
              <FormItem label="Contest Start Date" className={classnames('contestStartDate', { error: !!this.state.errors.contestStartDate })}>


                <DatePicker getCalendarContainer={triggerNode => triggerNode.parentNode}
                  onChange={this.handleChange2}
                  value={this.state.contestStartDate ? moment(this.state.contestStartDate, dateFormat) : ''} format={dateFormat} disabledDate={this.disabledDate} name="contestStartDate" placeholder="Select Start Date" />

                <p>{this.state.errors.contestStartDate}</p>
              </FormItem>
            </li><li>
              <FormItem label="Contest End Date" className={classnames('contestEndDate', { error: !!this.state.errors.contestEndDate })}>

                <DatePicker getCalendarContainer={triggerNode => triggerNode.parentNode} onChange={this.handleChange3}
                  value={this.state.contestEndDate ? moment(this.state.contestEndDate, dateFormat) : ''} format={dateFormat} disabledDate={this.disableEndDate} name="contestEndDate" placeholder="Select End Date" />

                <p>{this.state.errors.contestEndDate}</p>
              </FormItem>
            </li>
            <li>
            </li></ul>
        </Col>


        <Col span={16}>
          <FormItem label="" className={classnames('isCommercial', { error: !!this.state.errors.isCommercial })}>
            <Checkbox onChange={this.onChange5} name="isCommercial" checked={this.state.isCommercial}></Checkbox><span className="mrgleft10"> Is Commercial?</span>
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

            <Input autoComplete={'off'} placeholder="Enter Catchy caption" value={this.state.contestCaption} name="contestCaption" onChange={this.onChange6} />

            <span>{this.state.errors.contestCaption}</span>

          </FormItem></Col>
      </Form>
      </Col>,
    }, {
      title: 'Add Media',
      content: <div className="mrgnTop20"><ul className='list-inline'>
        <li className='antColLg-14 challwenges'>
          <FormItem className={classnames('contestIcon', { error: !!this.state.errors.contestIcon })}>
            <ul className='list-inline'>
              <li>   <h6 className='h6Fnt'>
                Add Banner Image</h6></li>
              <li className="LiRgt">
                <h6 className='h6Fnt rhtTxt'><Icon type="download" className="blueIcon" /> PSD Template
            </h6>
              </li>
            </ul>
            <Upload {...props}
              className="uploaderchlng avatar-uploader"
              showUploadList={false}
              onChange={this.handleChange5}

              accept=".png,.jpg,.jpeg"
              >
              {
                this.state.contestIcon ?
                  <img src={this.state.contestIcon} name="contestIcon" alt="contest Icon Img" className="avatar" style={{ width: 320, height: 170 }} /> :
                  <Icon type="plus" className="avatar-uploader-trigger" />
              }
            </Upload>

            <span>{this.state.errors.contestIcon}</span>
          </FormItem>
        </li>
        <li className='antColLg-14 challwenges'>
          <FormItem className={classnames('contestImageUrl', { error: !!this.state.errors.contestImageUrl })}>
            <h6 className='h6Fnt'>Add Inner Image</h6>
            <div className="uploaderchlng">
              <Upload {...props}
                className="avatar-uploader uploaderchlng"
                showUploadList={false}
                onChange={this.handleChange6}
                accept=".png,.jpg,.jpeg"

                >
                {
                  this.state.contestImageUrl ?
                    <img src={this.state.contestImageUrl} name="contestImageUrl" alt="Contest Image" className="avatar" style={{ width: 320, height: 170 }} /> :
                    <Icon type="plus" className="avatar-uploader-trigger uploaderchlng" />
                }
              </Upload>
            </div>
            <span>{this.state.errors.contestImageUrl}</span>
          </FormItem>
        </li>
        <li className='uploadimg170 challwenges'>
          <FormItem className={classnames('contestThumbnail', { error: !!this.state.errors.contestThumbnail })}>
            <h6 className='h6Fnt'>Add Thumbnail Image</h6>
            <div className="uploadimg170">
              <Upload {...props}
                className="avatar-uploader uploadimg170"
                showUploadList={false}
                onChange={this.handleChange7}
                accept=".png,.jpg,.jpeg"
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
        <ul className='list-inline mrgnTop10'>
          <li className='antColLg-14'>
            <Col span={24}>
              <FormItem className={classnames('contestVideoUrl', { error: !!this.state.errors.contestVideoUrl })}>

                <h6 className='h6Fnt'>Contest Video ID
                 <span>

                  </span>
                </h6>
                <Col span={24}>
                  <Col span={24}>
                    <Input placeholder="Contest Video ID" name="contestVideoUrl" value={this.state.contestVideoUrl} onChange={this.onChange7} />
                    <span>{this.state.errors.contestVideoUrl}</span>

                  </Col>

                  <a href="https://www.youtube.com/" target="_blank">
                    <Icon> <img src={youtubeIcon} className="mrgnTop15" style={{ 'vertical-align': 'middle' }} alt="Youtube Icon" /></Icon>
                    <Icon type="youtube" />
                    <Icon type="codepen" />
                  </a>
                  {/*}    <a href="https://vimeo.com/" target="_blank">
                    <Icon> <img src={vimeoIcon} className="mrgn15" style={{ 'vertical-align': 'middle' }} alt="Vimeo Icon" /></Icon>
                  </a> */}

                </Col>
              </FormItem>
            </Col>
          </li>
          <li className='antColLg-14'>
            <Col span={24}>
              <FormItem className={classnames('contestPoints', { error: !!this.state.errors.contestPoints })}>
                <h6 className='h6Fnt'>Define Fan Coins

                </h6>
                <Col span={24}>
                  <Col span={23}>
                    <Input placeholder="Define Fan Coins" value={this.state.contestPoints} name="contestPoints" onChange={this.handleChange11} onKeyPress={this.onKeyPress} onKeyDown={this.onKeyDown} />
                    <p className="RedTxtLeft" id="mobile" className="mobile"></p>
                    <p className="RedTxtLeft" id="myInput"> </p>
                    <span>{this.state.errors.contestPoints}</span>
                  </Col>

                </Col>
              </FormItem>
            </Col>
          </li>

        </ul>
        {/*  //----new enchancements by roop--//*/}
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
        <Col span={24}>
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

        </Col>

      </div>,
    }, {
      title: 'Location',
      content: <div className="mrgnTop20">
        <FormItem className={classnames('locationr1', { error: !!this.state.errors.locationr1 })}>

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

          <Select className="mrgnBottom20" getPopupContainer={triggerNode => triggerNode.parentNode}
            showSearch
            placeholder="Location"
            optionFilterProp="children"
            value={this.state.locationr1 || undefined}
            onChange={this.handleChange14}
            onSelect={this.onKeyPress1}
            name="locationr1"
            style={{ width: 200 }}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
            <Option value="false">Global</Option>
            <Option value="true">Local</Option>

          </Select>


          <p>{this.state.errors.locationr1}</p>

        </FormItem>

        {this.state.locationr1 === "true" ?
          <div>
            <FormItem>
              <MapWrapper submit44={this.submit44} mapdata={this.state.mapdata} className="ant-input" />
              <span className="error">{this.state.errors.childdata1}</span>
              <span className="error">{this.state.errors.lat1}</span>
              <p className="RedTxtLeft" id="locationr1" className="locationr1"></p>
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
            </FormItem></div> : null}
        <div>
          <FormItem>
            <Demo submit1={this.submit1} childdata={this.state.childdata} />
            <span className="error">{this.state.errors.childdata}</span>
          </FormItem>
        </div>
      </div>,
    }, {
      title: 'Terms & Conditions',
      content: <div>
        <Col span={16} className="marginTop20">
          <FormItem className={classnames('offers', { error: !!this.state.errors.offers })}>
            <h6 className="h6Fnt">Define Offers
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

            <Input placeholder="Define Offers" name="offers" className="pdngBottom0" value={this.state.offers} onChange={this.onChange14} />
            <span>{this.state.errors.offers}</span>

          </FormItem></Col>
        <Col span={16} className="CreateChallengsRich">
          <FormItem className={classnames('terms', { error: !!this.state.errors.terms })}>
            <h6 className="h6Fnt">Terms & Conditions
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
            <RichTextEditor className="laTOfONT"
              value={this.state.value}
              onChange={this.onChange11}
              />

          </FormItem>
          <p id="error" className="error" >{this.state.errors.terms}</p>
        </Col>
      </div>
    }];
    return (
      <Dashboard>
        <div className="dashbrdBack">
          <div className="CreatechallengeSubMenu">
            <Col span={20}>
              <Col span={5} lg={{ span: 4 }} sm={{ span: 5 }} xl={{ span: 3 }}><h2 className="chalngpageTitle">Create Challenges</h2></Col>

              <Col span={5} lg={{ span: 4 }} sm={{ span: 5 }} xl={{ span: 3 }} className="PollSeleccat">
                <Select className="PollingSeleccat" placeholder="Select Category" style={{ width: '100% ' }}
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                  onChange={handleChange}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>Disabled</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>

              </Col>
              <Col span={5} lg={{ span: 4 }} sm={{ span: 5 }} xl={{ span: 3 }} className="PollSeleccat">
                <Select className="PollingSeleccat" placeholder="Select SubCategory" style={{ width: '100% ' }}
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                  onChange={handleChange}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>Disabled</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>

              </Col>
              <Col span={5} lg={{ span: 4 }} sm={{ span: 5 }} xl={{ span: 3 }} className="PollSeleccat">
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
            <Col span={4} className="padding10TXTCenter">
              <Popconfirm title="Your changes will not be saved if you click yes" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
                <Button type="primary" className='createChallngBackBtn'> <Icon type="arrow-left" />Back to Dashboard</Button>
              </Popconfirm>
            </Col>
          </div>
        </div>

        <div className="SubMenuChallengesSteps">
          <Col span={20}>
            <Steps current={current} className="" >
              {steps.map(item => <Step key={item.title} title={item.title} />)}
            </Steps>
          </Col>
          <div className="steps-content">{steps[this.state.current].content}</div>
          <Col span={24} className="ChallengesPrevNextbtns">
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
                <Button className="margnBottom20" type="primary" disabled={this.state.disabled1} onClick={() => this.next()}> Save and Next</Button>
              }
              {
                this.state.current === steps.length - 1
                && <span>
                  <Button type="primary" onClick={() => this.done()} disabled={this.state.disabled}>Done</Button>
                  <SendForApproval ref="child" module="Challenges" packId={this.state.challengeData._id} packName={this.state.challengeData.contestTitle} /> </span>
              }
            </div>
          </Col>
        </div>
      </Dashboard>
    );
  };
}

const CreateEvent = Form.create()(CreateChallenge);
export default CreateEvent;
/* eslint-disable */