/* eslint-disable */
import React from 'react';
import Dashboard from '../Dashboard/Dashboard';
import { Link } from 'react-router';
import { Form, Icon, Input, Button, Select, Col, Tag, Tooltip, Upload, Row, Steps, message, DatePicker, Modal } from 'antd';
import './crudstyles.css';
import classnames from 'classnames';
import amitabh1 from '../images/amitabh1.jpg';
import moment from 'moment';
import $ from "jquery";
import { browserHistory } from 'react-router';
import SendForApproval from '../ApprovalCycle/sendforApproval.js'
import Castandcrew from './Castandcrew'
import NewCreative from './NewCreative'
import axios from 'axios';
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const Step = Steps.Step;
function handleChange(value) {
  console.log(`selected ${value}`);
}

//

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}



//
function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf('day');
}

function disabledDateTime() {
  return {
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  };
}



//
const props = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};


class Createdata extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      loading: false,
      creativeTags: [],id:'',errors:{},contestIcon:'',
      inputVisible: false,disabled:false,creativeMediaUrl1:'',
      inputValue: '', movieName: '', movieGenre: '', contestDescription: '', stratdateandtime: '', stratdateandtime1: '',
      employees: [], length: 1, numElems: 3, datatype: '', fblink: '', youtubelink: '', instagramlink: '', errors: {},
      creativeName: '', creativeType: '', creativeDescription: '', creativeMediaUrl: '', employees1: [], numElems1: 3 ,
      metaData: {}
    };
  }
  componentWillMount = () => {
    console.log("createdata",this.props.params.id)
    const id = this.props.params ? this.props.params.id : this.props.contestid;
    // const id = this.props.params.id;
    if(id != undefined){
    axios.get('/movie-creative/' + id, {
      headers: {
        "x-access-token": sessionStorage.token,
      },
    })
      .then(function (response) {
        console.log("response in will mou nt",response)
        this.setState({
          current: 0,
          id: response.data.data._id,
          datatype:'Movie',
          movieName: response.data.data.movieName,
          movieGenre: response.data.data.movieGenre,
          contestDescription: response.data.data.movieDescription,
          stratdateandtime: response.data.data.movieReleaseDate,
          fblink: response.data.data.facebookLink,
          youtubelink: response.data.data.trailerUrl,
          instagramlink: response.data.data.instagramLink,
          disabled:true
        })
        sessionStorage.setItem('Title', response.data.data.movieName)
        const data4 = response.data.data.castAndCrew
        var arr = [];
        for (let i = 0; i < data4.length; i++) {
          var x = data4[i];
          x.numElems = i;
          x.id = i;
          x.editable = false;
          arr.push(x);
        }
        this.setState({ employees: arr })
        const data5 = response.data.data.creatives
        var arr1 = [];
        for (let i = 0; i < data5.length; i++) {
          var x = data5[i];
          x.numElems = i;
          x.id = i;
          x.editable = false;
          arr1.push(x);
        }
        this.setState({ employees1: arr1 })
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
    }
  }
  next() {
    if (this.state.current === 0) {
      let errors = {}
      if (this.state.datatype === '') errors.datatype = "Field id required";
      if (this.state.datatype != '') {
        if (this.state.movieName.trim() === '') errors.movieName = "Field id required";
        if (this.state.movieGenre === '') errors.movieGenre = "Field id required";
        if (this.state.contestDescription.trim() === '') errors.contestDescription = "Field id required";
        if (this.state.stratdateandtime === '') errors.stratdateandtime = "Field id required";
      }
      this.setState({ errors })
      if (Object.keys(errors).length === 0) {
        const current = this.state.current + 1;
        this.setState({ current });
      }
    } else if (this.state.current === 1) {
      let errors = {}
      if (this.state.employees.length === 0) errors.employees = "Please give cast and crew details";
      this.setState({ errors })
      if (Object.keys(errors).length === 0) {
        const current = this.state.current + 1;
        this.setState({ current });
      }
    } else if (this.state.current === 2) {
      let errors = {}
      if (this.state.fblink.trim() === '') errors.fblink = "Field id required";
      if (this.state.youtubelink.trim() === '') errors.youtubelink = "Field id required";
      if (this.state.instagramlink.trim() === '') errors.instagramlink = "Field id required";
      this.setState({ errors })
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
  onDatatype = (value) => {
    this.setState({ datatype: value });
  }
  //
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }
  handleClose1 = () => {

    this.setState({ creativeTags: [] });
  }
  handleClose = (removedTag) => {
    const creativeTags = this.state.creativeTags.filter(tag => tag !== removedTag);
    console.log(creativeTags);
    this.setState({ creativeTags });
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
    let creativeTags = state.creativeTags;
    if (inputValue && creativeTags.indexOf(inputValue) === -1) {
      creativeTags = [...creativeTags, inputValue];
    }
    console.log(creativeTags);
    this.setState({
      creativeTags,
      inputVisible: false,
      inputValue: '',
    });
  }

  saveInputRef = input => this.input = input


  showModal = () => {
    var _this = this ;
    let errors={}
    // if(this.state.typecheck === "audio") {
    //   if(this.state.creativeMediaUrl.includes(".mp3,.mp4"))errors.creativeMediaUrl
    // }
    if(_this.state.employees1.length === 0) errors.creativeMediaUrl1="Please give atleeast one creative" 
    _this.setState({ errors });
    if (Object.keys(errors).length === 0) {
    const url = '/movie-creative';
    var data = {
      "movieName": this.state.movieName.trim(),
      "movieGenre": this.state.movieGenre,
      "movieDescription": this.state.contestDescription.trim(),
      "movieReleaseDate": this.state.stratdateandtime,
      "movieExpiryDate": this.state.stratdateandtime,
      "facebookLink": this.state.fblink.trim(),
      "trailerUrl": this.state.youtubelink.trim(),
      "instagramLink": this.state.instagramlink.trim(),
      "creatives": this.state.employees1,
      "castAndCrew": this.state.employees
    }
    var self=this;
    if(self.state.id === ''){
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
          console.log("response meta data", response)
          message.success('Movie Created successfully!');
         // browserHistory.push("/crudDashboard");
         _this.setState({metaData : response.data})
          _this.refs.child.approvalModal();

        }
        else {
          message.error(`Unable to create Movie.`, 5);
        }
      })
    }else{
      var request = new Request('/movie-creative/' + self.state.id, {
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
          if (response.status === 200 && response.message === "Success") {
            self.setState({id:''})
            message.success(`Creative Data Updated Successfully`)     
            browserHistory.push("/crudDashboard");
          } else {
            message.error('Unable to update the Creative Data');
          }
        })
    }
  
    self.setState({
      visible: false,
    });
  }
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  onChange = (e) => {
    if (this.state.movieName !== '') this.state.errors.movieName = '';
    this.setState({ movieName: e.target.value })
  }
  onChangeDescription = (e) =>{
    if (this.state.contestDescription !== '') this.state.errors.contestDescription = '';
    this.setState({contestDescription:e.target.value})
  }
  onChangeDate = (value, dateString) => {
    if (dateString !== '') this.state.errors.stratdateandtime = '';
    var changeddate = new Date(dateString).toISOString()
    this.setState({ stratdateandtime: dateString })
    this.setState({ stratdateandtime1: changeddate })
  }
  onMOvieGenre = (value) => {
    this.setState({ movieGenre: value })
  }
  handleChange5 = (info) => {
    if (info.file.type === "image/png" || info.file.type === "image/jpg" || info.file.type === "image/jpeg") {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        if (info.file.response.data !== '') this.state.errors.contestIcon = '';
        this.setState({
          contestIcon: info.file.response.data
        })
      }
    } else {
      var self=this;
      let errors = {};
      if (self.state.contestIcon === '') errors.contestIcon = "Only Image is required."
      self.setState({ errors });
      if (Object.keys(errors).length === 0) {
        // console.log("super");
      }
    }
  }
  handleChange6 = (info, e) => {
    var _self = this;
    var imageex = "image/png", imageex1 = "image/jpg", imageex2 = "image/jpeg"
    var audioex = "audio/mp3", audioex1 = "audio/x-m4a"
    var videoex = "video/mp4", videoex1 = "video/mp3"
    var typecheck = _self.state.creativeType
    if(typecheck === ''){
      document.getElementById('creativeMediaUrl').innerHTML = (`${_self.state.creativeType} Please select Creative type.`)
    }else{
    if (typecheck == "image") {
      if (imageex === info.file.type || imageex1 === info.file.type || imageex2 === info.file.type) {
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
          document.getElementById('creativeMediaUrl').innerHTML = (``);
          _self.setState({
            creativeMediaUrl: info.file.response.data
          })
        }
        else if (info.file.status !== 'uploading') {
          message.warning(`${_self.state.creativeType} file only accepted.`);
        }
      }


    } else if (typecheck == "audio") {
      if (audioex === info.file.type || audioex1 === info.file.type) {
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
          document.getElementById('creativeMediaUrl').innerHTML = (``);
          _self.setState({
            creativeMediaUrl: info.file.response.data
          })
        }
        else if (info.file.status !== 'uploading') {
          message.warning(`${_self.state.creativeType} file only accepted.`);
        }
      }


    }
    else if (typecheck == "video") {
      if (videoex === info.file.type || videoex1 === info.file.type) {
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
          document.getElementById('creativeMediaUrl').innerHTML = (``);
          _self.setState({
            creativeMediaUrl: info.file.response.data
          })
        }
        else if (info.file.status !== 'uploading') {
          message.warning(`${_self.state.creativeType} file only accepted.`);
        }
      }

    }
  }
    if (_self.state.creativeMediaUrl === '') {
      document.getElementById('creativeMediaUrl').innerHTML = (`${_self.state.creativeType} Please select Creative type.`)
    }


  }
  addNewCreative = (e) => {
    e.preventDefault();
    let errors = {}
    if (this.state.creativeName.trim() === '') errors.creativeName = "Field is required"
    if (this.state.creativeType === '') errors.creativeType = "Field is required"
    if (this.state.creativeDescription.trim() === '') errors.creativeDescription = "Field is required"
    if (this.state.creativeMediaUrl === '') errors.creativeMediaUrl = "Field is required"
    if (this.state.creativeTags.length === 0) errors.creativeTags = "Field is required"
    this.setState({ errors })
    if (Object.keys(errors).length === 0) {
      const creativeName = this.state.creativeName.trim()
      const creativeType = this.state.creativeType
      const creativeDescription = this.state.creativeDescription.trim()
      const creativeMediaUrl = this.state.creativeMediaUrl
      const creativeTags = this.state.creativeTags
      var numElems1 = this.state.numElems1++;
      this.setState({
        employees1:
          this.state.employees1.concat(
            {
              "numElems1": numElems1, "id": numElems1,
              "creativeName": creativeName,
              "creativeType": creativeType,
              "creativeDescription": creativeDescription,
              "creativeMediaUrl": creativeMediaUrl,
              "creativeTags": creativeTags
            }
          )
      })
      this.state.creativeName = ''
      this.state.creativeType = ''
      this.state.creativeDescription = ''
      this.state.creativeMediaUrl = ''
      var self = this;
      self.handleClose1();

    }

  }
  addEmployee = (e) => {
    e.preventDefault();
    const name = this._newText.refs.input.value
    const name1 = this._newText1.refs.input.value
    const img = this.state.contestIcon
    console.log("img", img);
    if (img === '' || img === undefined) {
      document.getElementById('icon').innerHTML = ("Please give image");
    }
    else if (name.trim() === '') {
      document.getElementById('name').innerHTML = ("Please give name");
    }
    else if (name.length >= 21) {
      document.getElementById('name').innerHTML = ("Name should be 20 characters");
    }
    else if (name1.trim() === '') {
      document.getElementById('name1').innerHTML = ("Please give role");
    }
    else if (name1.length >= 21) {
      document.getElementById('name1').innerHTML = ("Role should be 20 characters");
    }
    else if (img === '') {
      document.getElementById('icon').innerHTML = ("Please give image");
    }
    else if (name.trim() !== '' && name1.trim() !== '' && img !== '' && name.length <= 20 && name1.length <= 20) {

      var numElems = this.state.numElems++;
      this.setState({
        employees:
          this.state.employees.concat(
            { "numElems": numElems, "id": numElems, "celebrityName": this._newText.refs.input.value.trim(), "occupation": this._newText1.refs.input.value.trim(), "celebrityImageUrl": this.state.contestIcon, "editable": false }
          )
      });
      // console.log("this.state.contestIcon", this.state.contestIcon);
      // sessionStorage.setItem('locationkey1',this.state.contestIcon);
      // var self = this;
      // self.clearData();
      this.state.contestIcon = ''
      this._newText.refs.input.value = ''
      this._newText1.refs.input.value = ''
      document.getElementById('name').innerHTML = ("");
      document.getElementById('name1').innerHTML = ("");
      document.getElementById('icon').innerHTML = ("");

    }

  }
  clearData() {
    $(document).ready(function () {
      $('input').val('');

    });
  }
  deleteEmployee = (empId) => {
    var newEmp = this.state.employees.filter((val) => { return val.id !== empId; });
    this.setState({ employees: newEmp });
    //console.log(this.state.employees)
  }

  retrieveEmployee = (empId) => {

    var emp = this.state.employees.find(obj => { return obj.id === empId; });
    var idx = this.state.employees.indexOf(emp);
    return { "empId": idx, "object": emp };
  }

  updateEmployee = (empId, employeeDetails, employeeDetails1, employeeDetails2) => {
    var emp = this.retrieveEmployee(empId);
    emp.object.editable = false;
    emp.object.celebrityName = employeeDetails;
    emp.object.occupation = employeeDetails1;
    emp.object.celebrityImageUrl = employeeDetails2;
    var _employees = this.state.employees.slice();
    _employees[emp.empId] = emp.object;
    this.setState({ employees: _employees });
  }

  enableUpdateEmployee = (empId) => {
    var emp = this.retrieveEmployee(empId);
    emp.object.editable = true;
    var _employees = this.state.employees.slice();
    _employees[emp.empId] = emp.object;
    this.setState({ employees: _employees });
  }

  deleteEmployee1(empId) {
    var newEmp = this.state.employees1.filter((val) => { return val.id !== empId; });
    this.setState({ employees1: newEmp });
    //console.log(this.state.employees1)
  }

  retrieveEmployee1(empId) {

    var emp = this.state.employees1.find(obj => { return obj.id === empId; });
    var idx = this.state.employees1.indexOf(emp);
    return { "empId": idx, "object": emp };
  }

  updateEmployee1(empId, creativeName, creativeType, creativeDescription, creativeMediaUrl, creativeTags) {
    var emp = this.retrieveEmployee1(empId);
    emp.object.editable = false;
    emp.object.creativeName = creativeName;
    emp.object.creativeType = creativeType;
    emp.object.creativeDescription = creativeDescription;
    emp.object.creativeMediaUrl = creativeMediaUrl;
    emp.object.creativeTags = creativeTags;
    var _employees = this.state.employees1.slice();
    _employees[emp.empId] = emp.object;
    this.setState({ employees1: _employees });
  }

  enableUpdateEmployee1(empId) {
    var emp = this.retrieveEmployee1(empId);
    emp.object.editable = true;
    var _employees = this.state.employees1.slice();
    _employees[emp.empId] = emp.object;
    this.setState({ employees1: _employees });
  }

  onchangeFbLinks = (e) => {
    if (this.state.fblink !== '') this.state.errors.fblink = '';
    this.setState({fblink: e.target.value })
  }
  onchangeYoutubeLinks = (e) => {
    if (this.state.youtubelink !== '') this.state.errors.youtubelink = '';
    this.setState({ youtubelink: e.target.value })
  }
  onchangeInstgramLinks = (e) => {
    if (this.state.instagramlink !== '') this.state.errors.instagramlink = '';
    this.setState({ instagramlink: e.target.value })
  }
  onCreativeDescription = (e) => {
    if (this.state.creativeDescription !== '') this.state.errors.creativeDescription = '';
    this.setState({creativeDescription:e.target.value})
  }
  onCreativename = (e) => {
    if (this.state.creativeName !== '') this.state.errors.creativeName = '';
    this.setState({ creativeName: e.target.value })
  }
  onCreativetype = (value) => {
    this.setState({ creativeType: value,creativeMediaUrl:'' })
  }
  render() {
    var date=new Date().toLocaleString('en-GB')
    var read = this.props.params ? '' : "readOnly";
    var disable = this.props.params ? false : true;
    console.log("this.state crate data", this.state)
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
          this.setState({ creativeMediaUrl: '' });
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
      onRemove(info) {
        this.setState({ creativeMediaUrl: '' });
      }
    };
    var lstComms = this.state.employees.map((cmt, idx) => {
      return (
        <Castandcrew key={cmt.id}
        read={read}
        disable={disable}
          empId={cmt.id}
          editable={cmt.editable}
          fnRemove={this.deleteEmployee.bind(this, cmt.id)}
          fnEnableEdit={this.enableUpdateEmployee.bind(this, cmt.id)}
          fnEdit={this.updateEmployee.bind(this)}>
          {cmt.celebrityName}{cmt.occupation}{cmt.celebrityImageUrl}</Castandcrew>
      )
    });
    var lstComms1 = this.state.employees1.map((cmt, idx) => {
      return (
        <NewCreative key={cmt.id}
         read={read}
        disable={disable}
          empId={cmt.id}
          editable={cmt.editable}
          fnRemove={this.deleteEmployee1.bind(this, cmt.id)}
          fnEnableEdit={this.enableUpdateEmployee1.bind(this, cmt.id)}
          fnEdit={this.updateEmployee1.bind(this)}>
          {cmt.creativeName}{cmt.creativeType}{cmt.creativeDescription}{cmt.creativeTags}{cmt.creativeMediaUrl}</NewCreative>
      )
    });
    const { creativeTags, inputVisible, inputValue } = this.state;
    console.log("creativeTags", creativeTags);
    const contestIcon = this.state.contestIcon;
    const { current } = this.state;
    const steps = [{
      title: 'Movie Details',
      content: <Col span={24} className="creativePagesContent">
        {this.state.datatype === "Movie" ?
          <Form>
            <Col span={24}>
              <Col span={13} xl={{span:8}}>
                <FormItem className={classnames('movieName', { error: !!this.state.errors.movieName })}>
                  <h6 className="h6Fnt">Enter Movie Name</h6>
                  <Input placeholder="Movie Name"    readOnly={read} autoComplete={'off'}  name="movieName" value={this.state.movieName} onChange={this.onChange} />
               <span className="CreateCrudErrors">{this.state.errors.movieName}</span>
                </FormItem>
              </Col>
              <Col span={6} xl={{ span: 4 }} offset={1}>
                <FormItem className={classnames('movieGenre', { error: !!this.state.errors.movieGenre })}>
                  <h6 className="h6Fnt">Select Movie Genre</h6>
                  <Select disabled={disable} value={this.state.movieGenre || undefined} placeholder="Select one type" getPopupContainer={triggerNode => triggerNode.parentNode}
                    className="SelectMovieGenreDrop"
                    onChange={this.onMOvieGenre}>
                    <Option value="Comedy">Comedy</Option>
                    <Option value="Drama">Drama</Option>
                    <Option value="Adventure">Adventure</Option>
                    <Option value="Crime">Crime</Option>
                    <Option value="Romance">Romance</Option>
                  </Select>
                   <span className="CreateCrudErrors">{this.state.errors.movieGenre}</span>
                </FormItem>
              </Col>
            </Col>
            <Col span={24}>
              <Col span={13} xl={{span:8}}>
                <FormItem className={classnames('contestDescription', { error: !!this.state.errors.contestDescription })}>
                  <h6 className="h6Fnt">Enter Description</h6>
                  <TextArea readOnly={read} rows={3} placeholder="I Describe The Movie  here"
                    value={this.state.contestDescription} onChange={this.onChangeDescription} name="contestDescription" />
                  <span className="CreateCrudErrors">{this.state.errors.contestDescription}</span>
                </FormItem>
              </Col>
            </Col>
            <Col span={24}>
              <ul className="list-inline">
                <li>
                  <h6 className="h6Fnt CreatedataMovieRealse">Movie Relase Date</h6>
                </li>
                <li>
                  <FormItem className={classnames('stratdateandtime', { error: !!this.state.errors.stratdateandtime })}>

                    <DatePicker getCalendarContainer={triggerNode => triggerNode.parentNode}
                    disabled={disable}
                      showTime
                      value={this.state.stratdateandtime ? moment(this.state.stratdateandtime, dateFormat) : ''}
                      format="YYYY-MM-DD HH:mm:ss"
                      placeholder="Starts At"
                      onChange={this.onChangeDate}
                      onOk={this.onOk}
                    />
                    <p className="CreateCrudErrors">{this.state.errors.stratdateandtime}</p>
                  </FormItem>
                </li>
              </ul>
            </Col>
          </Form> : null}
      </Col>,
    }, {
      title: 'Cast And Crew',
      content: <Col span={24} className="creativePagesContent  CreateDataCastCrewData">
        <Form>
          <Col span={24}>
            <ul className="list-inline">
              <li className="AddCastCrewimgs">
                <FormItem className="celImage">
                  <Upload {...props} onChange={this.handleChange5}
                  disabled={disable}
                    accept=".png,.jpg,.jpeg">
                    {
                      this.state.contestIcon ?
                        <img src={this.state.contestIcon} ref={c => this._newText44 = c} name="contestIcon" alt="Contest Icon" className="avatar circleImg" style={{ width: 80, height: 80 }} /> :
                        <Icon type="plus" className="avatar-uploader-trigger circleImg" style={{ width: 80, height: 80, border: '1px solid #EBEAEA' }} />
                    }
                  </Upload>
                

                   <span className="CreateCrudErrors">{this.state.errors.icon}</span>
                   <span className="CreateCrudErrors">{this.state.errors.contestIcon}</span>
                </FormItem>

                <p className="h6Fnt">Upload Photo</p>
                  <p className="RedTxtLeft CreateCrudErrors icon" id="icon"></p>
              </li>
              <li>

              </li>
              <li className="CreateDataCelebrityinfo">
                <FormItem>
                  <Input readOnly={read} type="text" autoComplete={'off'}  className="" placeholder="Name" name="name" className="ant-input"
                    ref={c => this._newText = c} className="form-control txt_field" />
                  <p className="RedTxtLeft" id="name" className="name"></p>
                </FormItem>
                <FormItem >
                  <Input readOnly={read} type="text" autoComplete={'off'}  placeholder="Role" name="name1"
                    ref={c => this._newText1 = c} className="form-control txt_field" />
                  <p className="RedTxtLeft" id="name1" className="name1"></p>
                </FormItem>
              </li>
              <li className="CreateDataCelebrityBtn">
                
                <Button onClick={this.addEmployee} className="btn btn-success margin_btn center-block">ADD</Button>
              </li>
            </ul>
            <p style={{float:'right'}}>  <span className="CreateCrudErrors">{this.state.errors.employees}</span></p>
          </Col>
          <Col span={24} className="CreateCurdListimgsss">
            <Col span={24} xl={{ span: 24 }}>
              <ul className="list-inline CreateCurdListimgsmain">

                {lstComms}
              </ul>
            </Col>

          </Col>

        </Form>
      </Col>,
    }, {
      title: 'Social Media Links',
      content: <Col span={24} className="creativePagesContent">
        <Form>
          <Col span={24}>
            <Col span={13} xl={{span:8}}>
              <FormItem className={classnames('fblink', { error: !!this.state.errors.fblink })}>
                <h6 className="h6Fnt">Facebook Page Link</h6>
                <Input readOnly={read} placeholder="Enter Link Here" value={this.state.fblink} name="fblink" onChange={this.onchangeFbLinks} />
                <span className="CreateCrudErrors">{this.state.errors.fblink}</span>
              </FormItem>
            </Col>
          </Col>
          <Col span={24}>
            <Col span={13} xl={{span:8}}>
              <FormItem className={classnames('youtubelink', { error: !!this.state.errors.youtubelink })}>
                <h6 className="h6Fnt">Youtube Trailer Link</h6>
                <Input   readOnly={read} placeholder="Enter Link Here" name="youtubelink" value={this.state.youtubelink} onChange={this.onchangeYoutubeLinks} />
                <span className="CreateCrudErrors">{this.state.errors.youtubelink}</span>
              </FormItem>
            </Col>
          </Col>
          <Col span={24}>
            <Col span={13} xl={{span:8}}>
              <FormItem className={classnames('instagramlink', { error: !!this.state.errors.instagramlink })}>
                <h6 className="h6Fnt">Instagram Page Link</h6>
                <Input  readOnly={read} placeholder="Enter Link Here" name="instagramlink" value={this.state.instagramlink} onChange={this.onchangeInstgramLinks} />
                 <span className="CreateCrudErrors">{this.state.errors.instagramlink}</span>
              </FormItem>
            </Col>
          </Col>
        </Form>
      </Col>,
    }, {
      title: 'Creatives',
      content: <Col span={24} className="creativePagesContent">
        <Form>
          <Col span={24}>
          <Col span={13} xl={{span:8}}>
              <FormItem className={classnames('creativeName', { error: !!this.state.errors.creativeName })}>
                <h6 className="h6Fnt">Creative Name</h6>
                <Input type="text"  readOnly={read} placeholder="Enter Title" name="creativeName" autoComplete={'off'}  value={this.state.creativeName} onChange={this.onCreativename} />
                <span>{this.state.errors.creativeName}</span>
              </FormItem>
            </Col>
            <Col span={6} xl={{ span: 4 }} offset={1}>
              <FormItem className={classnames('creativeType', { error: !!this.state.errors.creativeType })}>
                <h6 className="h6Fnt">Select Creative Type</h6>
                <Select defaultValue="Choose From List" getPopupContainer={triggerNode => triggerNode.parentNode}
                disabled={disable}
                  className="CreateDataCreativeType" value={this.state.creativeType || undefined} onChange={this.onCreativetype}>
                  <Option value="audio">Audio</Option>
                  <Option value="video">Video</Option>
                  <Option value="image">Image</Option>

                </Select>
                 <span className="CreateCrudErrors">{this.state.errors.creativeType}</span>
              </FormItem>
            </Col>
          </Col>
          <Col span={24}>
            <Col span={13} xl={{span:8}}>
              <FormItem className={classnames('creativeDescription', { error: !!this.state.errors.creativeDescription })}>
                <h6 className="h6Fnt">Creative description</h6>
                <TextArea readOnly={read} rows={3} placeholder="Enter Description here" name="creativeDescription"
                  value={this.state.creativeDescription} onChange={this.onCreativeDescription} />
                <span className="CreateCrudErrors">{this.state.errors.creativeDescription}</span>
              </FormItem>
            </Col>
          </Col>

          <Col span={24} className="CreateDatacreativeTagsCreativie">
            <FormItem className={classnames('creativeTags', { error: !!this.state.errors.creativeTags })}>
              <h6 className="h6Fnt">Creative creativeTags</h6>
              <div>
              <div className="CreateDataTypeTagWords45 ant-col-10 ant-col-xl-7">

                {inputVisible && (
                  <Input className="balckpather"
                    ref={this.saveInputRef}
                    type="text"
                    size="small"
                    style={{ width: '71%', height: '29px' ,margin:'0px' }}
                    value={inputValue}
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputConfirm}
                    onPressEnter={this.handleInputConfirm}
                  />
                )}
               
                {!inputVisible && (
     
                  <Tag className="CreateDataTypeTagWords"
                    onClick={this.showInput} >

                  </Tag>)}
                <Button className="CreateCrudtaddAddbtn" type="primary">ADD </Button>
                  </div>
                <div className="Creativebaby">
               
                {creativeTags === undefined ? null : creativeTags.map((tag, index) => {
                  const isLongTag = tag.length > 10;
                  const tagElem = (
                    <Tag className="creativeTagsCreadDtas" key={tag} closable={index !== -1} afterClose={() => this.handleClose(tag)}>
                      {isLongTag ? `${tag.slice(0, 10)}...` : tag}
                    </Tag>
               
                  );
                  return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                })}
                </div>
                 </div>
             
              <span className="CreateCrudErrors">{this.state.errors.creativeTags}</span>
            
            </FormItem>
          </Col>
          <Col span={24} className="CreateDataBtnUploadFiles">
            <FormItem className={classnames("creativeMediaUrl", { error: !!this.state.errors.creativeMediaUrl })} className="CreateDataAllfilesUpload">
              <Upload {...props} onChange={this.handleChange6}
              disabled={disable}
                accept=".png,.jpg,.jpeg,.mp3,.m4a" showUploadList={false}>
                <Button>
                  <Icon type="upload" /> Click to Upload
                </Button>
              </Upload>
              <span className="CreateCrudErrors">{this.state.errors.creativeMediaUrl}</span>
              <h4>{this.state.creativeMediaUrl}</h4>
              <p style={{ "color": "red", "text-align": "left" }} id="creativeMediaUrl" className="creativeMediaUrl"></p>
            </FormItem>
            <div className="CreateDataAddUploadBtn">
              <Button onClick={this.addNewCreative} className="CreateDataAddFiles" type="primary"><Icon type="plus-circle-o" /> Add New Creatives</Button>
            <p style={{ "color": "red", "text-align": "left" }} id="creativeMediaUrl" className="creativeMediaUrl">{this.state.errors.creativeMediaUrl1}</p>
            </div>

          </Col>
        </Form>
        {lstComms1}
      </Col>,
    }];
var ui =<div>

          <Form>
            <Row>
              <Col span={16} className="CreateData">

                <Col span={24} className="CreateDataHeader">
                {this.state.id === '' ? <Col span={8}>
                    <h4><span><Link to="/crudDashboard"><Icon type="arrow-left" /></Link></span><span> CreateData</span> </h4></Col>:
                 <Col span={8}><h4><span><Link to="/crudDashboard"><Icon type="arrow-left" /></Link></span><span> EditData</span> </h4></Col>
                }
            
                  <Col span={6} className="CreateDataRight">

                    <h4 className="DatesOfcreateHead">{date}</h4>
                  </Col>
                </Col>


                <Col span={24} className="CreateCrudSelect">
                  <div className="SelectDataTypedrop1">
                    <Col span={6}>
                      <FormItem className={classnames("datatype", { error: !!this.state.errors.datatype })}>
                        <h6 className="h6Fnt">Select Data Type</h6>
                        <Select placeholder="Select Data Type" onChange={this.onDatatype}
                          value={this.state.datatype || undefined} disabled={this.state.disabled}>
                          <Option value="Movie">Movie</Option>
                          <Option value="Sports">Sports</Option>
                          <Option value="Events">Events</Option>
                          <Option value="Brand">Brand</Option>
                        </Select>
                        <span className="CreateCrudErrors">{this.state.errors.datatype}</span>
                      </FormItem>
                    </Col>
                  </div>
                </Col>

                <div>
                  <div>
                    <Steps className="CreateCrudsmainSteps" current={current}>
                      {steps.map(item => <Step className="CrudStepings" key={item.title} title={item.title} />)}
                    </Steps>
                    <div className="steps-content">{steps[this.state.current].content}</div>
                    <Col span={24} className="ChallengesPrevNextbtns">
                      <div className="steps-action  floatRight">
                        {
                          this.state.current > 0
                          &&
                          <Button className="mrgnRight8" style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                            BACK
            </Button>
                        }
                        {
                          this.state.current < steps.length - 1
                          &&
                          <Button className="margnBottom20" type="primary" onClick={() => this.next()}> 
                           {disable === false ? <span> Save and Next </span> : <span>Next </span> }</Button>

                        }
                        {
                          this.state.current === steps.length - 1
                          &&
                     <span>
                    {  disable === false ?  
                       <Button type="primary" onClick={this.showModal}>SEND FOR APPROVAL</Button>  : ''}
                          <SendForApproval ref="child" module="MetaData" packId={this.state.metaData._id} packName={this.state.metaData.movieName}/> </span>
                        }

                      </div>
                    </Col>
                  </div>
                </div>
              </Col>


            </Row>
          </Form>

        </div>
    return (
     
       <div>
       {this.props.params ? <Dashboard>
         {ui}
       </Dashboard> : ui}
     </div>
    );
  }
}

export default Createdata;
/* eslint-disable */