/* eslint-disable */
import React from 'react';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars';
import './crudstyles.css';
import Castandcrew from './Castandcrew'
import NewCreative from './NewCreative'
import classnames from 'classnames';
import moment from 'moment';
import ReactPlayer from 'react-player';
import facebook_logo from '../images/icons/right/facebook_logo.png';
import ReactAudioPlayer from 'react-audio-player';
import instagramNewlogo from '../images/icons/right/instagramNewlogo.png';
import { Icon, Button, Card,Popconfirm, Col, DatePicker, Row, Table, Modal, Form, Input, Select, Tag, Tooltip, Upload, message, Steps } from 'antd';
import { Link } from 'react-router';

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const Step = Steps.Step;

class Movies extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      movieCreatives: [],
      modalData: {},
      visible: false,
      editVisible: false,
      inputVisible: false,
      inputValue: '',
      creativeTags: [],
      current: 0,
      movieName: '',
      movieGenre: '',
      movieDescription: '',
      movieReleaseDate: '',
      trailerUrl: '',
      facebookLink: '',
      instagramLink: '',
      castAndCrew: [],
      creatives: [],
      errors: {},
      employees: [], numElems: 3, employees1: [], numElems1: 3,
      creativeName: '', creativeType: '', creativeDescription: '', creativeMediaUrl: '',
      fblink: '', youtubelink: '',
      instagramlink: '', contestDescription: '', stratdateandtime: '', stratdateandtime1: '',
    }
  }
  handleChange6 = (info, e) => {
    var _self = this;
    var imageex = "image/png", imageex1 = "image/jpg", imageex2 = "image/jpeg"
    var audioex = "audio/mp3", audioex1 = "audio/x-m4a"
    var videoex = "video/mp4", videoex1 = "video/mp3"
    var typecheck = _self.state.creativeType
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
    if (_self.state.creativeMediaUrl === '') {
      document.getElementById('creativeMediaUrl').innerHTML = (`${_self.state.creativeType} file only accepted.`)
    }


  }
  addEmployee = (e) => {
    e.preventDefault();
    const name = this._newText.refs.input.value
    const name1 = this._newText1.refs.input.value
    const img = this.state.contestIcon
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
  deleteEmployee = (empId) => {
    var newEmp = this.state.employees.filter((val) => { return val.id !== empId; });
    this.setState({ employees: newEmp });
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
    emp.object.imageUrl = employeeDetails2;
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

  componentDidMount() {
    this.getMovieCreatives()
  }
  addNewCreative = (e) => {
    e.preventDefault();
    let errors = {}
    if (this.state.creativeName === '') errors.creativeName = "Field is required"
    if (this.state.creativeType === '') errors.creativeType = "Field is required"
    if (this.state.creativeDescription === '') errors.creativeDescription = "Field is required"
    if (this.state.creativeMediaUrl === '') errors.creativeMediaUrl = "Field is required"
    if (this.state.creativeTags.length === 0) errors.creativeTags = "Field is required"
    this.setState({ errors })
    if (Object.keys(errors).length === 0) {
      const creativeName = this.state.creativeName
      const creativeType = this.state.creativeType
      const creativeDescription = this.state.creativeDescription
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
  handleClose1 = () => {
    this.setState({ creativeTags: [] });
  }
  deleteEmployee1(empId) {
    var newEmp = this.state.employees1.filter((val) => { return val.id !== empId; });
    this.setState({ employees1: newEmp });
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
  getMovieCreatives() {
    axios.get('/movie-creatives', {
      headers: {
        "x-access-token": sessionStorage.token,
      },
    })
      .then(function (response) {
        this.setState({
          movieCreatives: response.data.data
        })
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });

  }

  showModal = (e, modalType) => {
    axios.get('/movie-creative/' + e, {
      headers: {
        "x-access-token": sessionStorage.token,
      },
    })
      .then(function (response) {
        if (modalType === 'Edit') {
          this.setState({
            current: 0,
            id: response.data.data._id,
            modalData: response.data.data,
            editVisible: true,
            movieName: response.data.data.movieName,
            movieGenre: response.data.data.movieGenre,
            movieDescription: response.data.data.movieDescription,
            contestDescription: response.data.data.movieDescription,
            movieReleaseDate: response.data.data.movieReleaseDate,
            stratdateandtime: response.data.data.movieReleaseDate,
            trailerUrl: response.data.data.trailerUrl,
            facebookLink: response.data.data.facebookLink,
            instagramLink: response.data.data.instagramLink,
            fblink: response.data.data.facebookLink,
            youtubelink: response.data.data.trailerUrl,
            instagramlink: response.data.data.instagramLink

          })
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
        }
        else if (modalType === 'View') {
          this.setState({
            modalData: response.data.data,
            visible: true
          })
        }
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
  }
  handleChange5 = (info) => {
    if (info.file.status === 'done') {
      // getBase64(info.file.originFileObj, crewimageUrl => this.setState({ crewimageUrl }));
      message.success(`${info.file.name} file uploaded successfully`);

      this.setState({
        contestIcon: info.file.response.data
      })
    }
  }
  cancel = (e) => {
  }
  confirm = () => {
   
    var e = sessionStorage.getItem('creativedeleteid');
    console.log("e in confirm",e)
 var _this = this
    axios.delete('/movie-creative/' + e, {
      headers: {
        "x-access-token": sessionStorage.token,
      },
    })
      .then(function (response) {
        var clear = sessionStorage.removeItem('creativedeleteid');
        message.success(`Creative Deleted Successfully`)
        _this.getMovieCreatives()
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
  }
  handleDeleteCreative = (e) => {
    var id = e
   sessionStorage.setItem('creativedeleteid', id)
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  next() {
    if (this.state.current === 0) {
      let errors = {}
      if (this.state.movieName === '') errors.movieName = "Field id required";
      if (this.state.movieGenre === '') errors.movieGenre = "Field id required";
      if (this.state.contestDescription === '') errors.contestDescription = "Field id required";
      if (this.state.stratdateandtime === '') errors.stratdateandtime = "Field id required";
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
      if (this.state.fblink === '') errors.fblink = "Field id required";
      if (this.state.youtubelink === '') errors.youtubelink = "Field id required";
      if (this.state.instagramlink === '' || this.state.instagramlink === undefined) errors.instagramlink = "Field id required";
      this.setState({ errors })
      if (Object.keys(errors).length === 0) {
        const current = this.state.current + 1;
        this.setState({ current });
      }
    }
  }

  sendForApproval = (e) => {
    var _this = this;
    if (this.state.current === 3) {
      let errors = {}
      if (this.state.employees1.length === 0) errors.employees = "Please Provide Creative Details";
      this.setState({ errors });
      var data = {
        "movieName": this.state.movieName,
        "movieGenre": this.state.movieGenre,
        "movieDescription": this.state.contestDescription,
        "movieReleaseDate": this.state.stratdateandtime,
        "movieExpiryDate": this.state.stratdateandtime,
        "castAndCrew": this.state.employees,
        "facebookLink": this.state.fblink,
        "trailerUrl": this.state.youtubelink,
        "instagramLink": this.state.instagramlink,
        "creatives": this.state.employees1
      }
      if (Object.keys(errors).length === 0) {
        var request = new Request('/movie-creative/' + this.state.id, {
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
              message.success(`Creative Data Updated Successfully`)
              _this.setState({ editVisible: false })
              _this.getMovieCreatives()
            } else {
              message.error('Unable to update the Creative Data');
            }
          })
      }
    }
  }
  onMOvieGenre = (value) => {
    this.setState({ movieGenre: value })
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  onChangeDate = (value, dateString) => {
    if (dateString !== '') this.state.errors.stratdateandtime = '';
    var changeddate = new Date(dateString).toISOString()
    this.setState({ stratdateandtime: dateString })
    this.setState({ stratdateandtime1: changeddate })
  }
  onchangeLinks = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  onCreativename = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  onCreativetype = (value) => {
    this.setState({ creativeType: value })
  }
  handleClose = (removedTag) => {
    const creativeTags = this.state.creativeTags.filter(tag => tag !== removedTag);
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
    this.setState({
      creativeTags,
      inputVisible: false,
      inputValue: '',
    });
  }




  handleCancel = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  }


  saveInputRef = input => this.input = input
  render() {
    console.log("modal data",this.state);
    const { modalData } = this.state;
    const { creativeTags, inputVisible, inputValue } = this.state;
    const { current } = this.state;
    var lstComms = this.state.employees.map((cmt, idx) => {
      return (
        <Castandcrew key={cmt.id}
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
          empId={cmt.id}
          editable={cmt.editable}
          fnRemove={this.deleteEmployee1.bind(this, cmt.id)}
          fnEnableEdit={this.enableUpdateEmployee1.bind(this, cmt.id)}
          fnEdit={this.updateEmployee1.bind(this)}>
          {cmt.creativeName}{cmt.creativeType}{cmt.creativeDescription}{cmt.creativeTags}{cmt.creativeMediaUrl}</NewCreative>
      )
    });
    const columns = [
      { title: 'MOVIE', width: 100, dataIndex: 'MOVIE', key: 'MOVIE', fixed: 'left' },
      { title: 'CAST', width: 100, dataIndex: 'CAST', key: 'CAST', fixed: 'left' },
      { title: 'GENRE', dataIndex: 'GENRE', key: '1' },
      { title: 'FB LINK', dataIndex: 'FBLINK', key: '2' },
      { title: 'RELEASE DATE', dataIndex: 'RELEASEDATE', key: '3' },
      { title: 'EXPIRES ON', dataIndex: 'EXPIRESON', key: '4' },
      { title: 'ACTIONS', dataIndex: 'ACTIONS', key: '5' },
    ];

    var data = [];
    this.state.movieCreatives.length === 0 ? null : this.state.movieCreatives.map((item, index) => {
      data.push({
        key: item._id,
        MOVIE: item.movieName,
        CAST: item.castAndCrew.map(e => e.celebrityName).join(","),
        GENRE: item.movieGenre,
        FBLINK: <a href={item.facebookLink} className="themecolorLink" target="_blank">Click Me</a>,
        RELEASEDATE: new Date(item.movieReleaseDate).toLocaleDateString(),
        EXPIRESON: new Date(item.movieExpiryDate).toLocaleDateString(),
        ACTIONS: <div>
          <Button title=" " onClick={this.showModal.bind(this, item._id, 'View')} className="deleteBtn">
            <Icon type="eye-o" className="ViewGryIconDelet" />
          </Button>
          {/* <Button title=" " className="deleteBtn" onClick={this.showModal.bind(this, item._id, 'Edit')}>
            <Icon type="edit" className="GryIcon" />
          </Button> */}
          <Link to={`/crudDashboard/Editdata/movies/${item._id}`}>
            <Button title=" " className="deleteBtn" >
              <Icon type="edit" className="GryIcon" />
            </Button>
          </Link>
          <Popconfirm title="Are you sure delete this task?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
          <Button title=" " className="deleteBtn" onClick={this.handleDeleteCreative.bind(this, item._id)}>
            <Icon type="delete" className="GryIconDelet" />
          </Button>
    
  </Popconfirm>
          
        </div>
      })
    })
    const renderCrew = Object.keys(this.state.modalData).length > 0 ? this.state.modalData.castAndCrew.map((crewData) => {
      return (<Col span={6}>
        <Card className="MoviesModalBorder">
          <div>
            <img alt="example" height='170px' width="100%" src={crewData.celebrityImageUrl} />
          </div>
          <div className="custom-card">
            <h3>{crewData.celebrityName}</h3>
            <p>{crewData.occupation}</p>
          </div>
        </Card>
      </Col>)
    }) : null
    const renderCreatives = Object.keys(this.state.modalData).length > 0 ? this.state.modalData.creatives.map((creativeData) => {
      return (<Col span={10} className="MoviesPopuoImg">
        <Card className="MoviesModalBorder">
         
          <div className="custom-card">
            <h3>{creativeData.creativeName}</h3>
            <p> {creativeData.creativeDescription}</p>
          </div>
          {creativeData.creativeType === "image" ? <div>
            <img alt="example" height='170px' width="100%" src={creativeData.creativeMediaUrl} />
          </div>:null}
          {creativeData.creativeType ==="audio" ?<div>
          <ReactAudioPlayer className="creactplay"
                                    src={creativeData.creativeMediaUrl !== undefined ? creativeData.creativeMediaUrl : ''}
                                    autoPlay={false} ref={(ref) => { this.audioEl = ref; }}
                                    controls
                                  />
        </div>:null}</Card>
      </Col>)
    }) : null

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
      onRemove(info) {
        this.setState({ creativeMediaUrl: '' });
      }

    };

    const steps = [{
      title: 'Movie Details',
      content: <Col span={24} className="creativePagesContent">
        <Form>
          <Col span={24}>
            <Col span={13}>
              <FormItem className={classnames('movieName', { error: !!this.state.errors.movieName })}>
                <h6 className="h6Fnt">Enter Movie Name</h6>
                <Input placeholder="Movie Name" autoComplete={'off'}  name="movieName" value={this.state.movieName} onChange={this.onChange} />
                 <span className="CreateCrudErrors">{this.state.errors.movieName}</span>
              </FormItem>
            </Col>
            <Col span={6} xl={{ span: 4 }} offset={1}>
              <FormItem className={classnames('movieGenre', { error: !!this.state.errors.movieGenre })}>
                <h6 className="h6Fnt">Select Movie Genre</h6>
                <Select value={this.state.movieGenre} placeholder="Select one type" getPopupContainer={triggerNode => triggerNode.parentNode}
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
            <Col span={13}>
              <FormItem className={classnames('contestDescription', { error: !!this.state.errors.contestDescription })}>
                <h6 className="h6Fnt">Enter Description</h6>
                <TextArea rows={3} placeholder="I Describe The Movie  here"
                  value={this.state.contestDescription} onChange={this.onChange} name="contestDescription" />
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
                    showTime
                    value={this.state.stratdateandtime ? moment(this.state.stratdateandtime) : ''}
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
        </Form>
      </Col>,
    },
    {
      title: 'Cast And Crew',
      content: <Col span={24} className="creativePagesContent">
        <Form>
          <Col span={24}>
           <span className="CreateCrudErrors">{this.state.errors.employees}</span>
            <ul className="list-inline">
              <li>
                <FormItem className="celImage">
                  <Upload {...props} onChange={this.handleChange5}

                    accept=".png,.jpg,.jpeg">
                    {
                      this.state.contestIcon ?
                        <img src={this.state.contestIcon} ref={c => this._newText44 = c} name="contestIcon" alt="Contest Icon" className="avatar circleImg" style={{ width: 80, height: 80 }} /> :
                        <Icon type="plus" className="avatar-uploader-trigger circleImg" style={{ width: 80, height: 80, border: '1px solid #EBEAEA' }} />
                    }
                  </Upload>
                  <p className="RedTxtLeft" id="icon" className="icon"></p>
                 <span className="CreateCrudErrors">{this.state.errors.icon}</span>
                </FormItem>
                <p className="h6Fnt">Upload Photo</p>
              </li>
              <li>
              </li>
              <li className="CreateDataCelebrityinfo">
                <FormItem>
                  <Input type="text" className="" autoComplete={'off'}  placeholder="Name" name="name" className="ant-input"
                    ref={c => this._newText = c} className="form-control txt_field" />
                  <p className="RedTxtLeft" id="name" className="name"></p>
                </FormItem>
                <FormItem >
                  <Input type="text" placeholder="Role" autoComplete={'off'}  name="name1"
                    ref={c => this._newText1 = c} className="form-control txt_field" />
                  <p className="RedTxtLeft" id="name1" className="name1"></p>
                </FormItem>
              </li>
              <li className="CreateDataCelebrityBtn">
                <Button onClick={this.addEmployee} className="btn btn-success margin_btn center-block">ADD</Button>
              </li>
            </ul>
          </Col>
          <Col span={24} className="CreateCurdListimgsss">
            <Col span={24} xl={{ span: 24 }}>
              <ul className="list-inline CreateCurdListimgsmainh">

                {lstComms}

              </ul>
            </Col>
          </Col>
        </Form>
      </Col>
    },
    {
      title: 'Social Media Links',
      content: <Col span={24} className="creativePagesContent">
        <Form>
          <Col span={24}>
            <Col span={13}>
              <FormItem className={classnames('fblink', { error: !!this.state.errors.fblink })}>
                <h6 className="h6Fnt">Facebook Page Link</h6>
                <Input placeholder="Enter Link Here" value={this.state.fblink} name="fblink" onChange={this.onchangeLinks} />
               <span className="CreateCrudErrors">{this.state.errors.fblink}</span>
              </FormItem>
            </Col>
          </Col>
          <Col span={24}>
            <Col span={13}>
              <FormItem className={classnames('youtubelink', { error: !!this.state.errors.youtubelink })}>
                <h6 className="h6Fnt">Youtube Trailer Link</h6>
                <Input placeholder="Enter Link Here" name="youtubelink" value={this.state.youtubelink} onChange={this.onchangeLinks} />
                <span className="CreateCrudErrors">{this.state.errors.youtubelink}</span>
              </FormItem>
            </Col>
          </Col>
          <Col span={24}>
            <Col span={13}>
              <FormItem className={classnames('instagramlink', { error: !!this.state.errors.instagramlink })}>
                <h6 className="h6Fnt">Instagram Page Link</h6>
                <Input placeholder="Enter Link Here" name="instagramlink" value={this.state.instagramlink} onChange={this.onchangeLinks} />
                <span className="CreateCrudErrors">{this.state.errors.instagramlink}</span>
              </FormItem>
            </Col>
          </Col>
        </Form>
      </Col>,
    },
    {
      title: 'Creatives',
      content: <Col span={24} className="creativePagesContent">
        <Form>
          <Col span={24}>
            <Col span={13}>
              <FormItem className={classnames('creativeName', { error: !!this.state.errors.creativeName })}>
                <h6 className="h6Fnt">Creative Name</h6>
                <Input type="text" placeholder="Enter Title" autoComplete={'off'}  name="creativeName" value={this.state.creativeName} onChange={this.onCreativename} />
                 <span className="CreateCrudErrors">{this.state.errors.creativeName}</span>
              </FormItem>
            </Col>
            <Col span={6} xl={{ span: 4 }} offset={1}>
              <FormItem className={classnames('creativeType', { error: !!this.state.errors.creativeType })}>
                <h6 className="h6Fnt">Select Creative Type</h6>
                <Select defaultValue="Choose From List" getPopupContainer={triggerNode => triggerNode.parentNode}
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
            <Col span={13}>
              <FormItem className={classnames('creativeDescription', { error: !!this.state.errors.creativeDescription })}>
                <h6 className="h6Fnt">Creative description</h6>
                <TextArea rows={3} placeholder="Enter Description here" name="creativeDescription"
                  value={this.state.creativeDescription} onChange={this.onCreativename} />
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
                      style={{ width: '71%', height: '30px' }}
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
                accept=".png,.jpg,.jpeg" showUploadList={false}>
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
            </div>
          </Col>
        </Form>
        {lstComms1}
      </Col>,
    }
    ]
    return (
      <div className="widthresponsive">
        <div className="SubMenuCrud">
          <Row>
            <Col span={24}>
              <Table columns={columns} dataSource={data} scroll={{ x: 900 }} className="moviesTable" />
            </Col>
            <Modal className="MovieModal"
              title={modalData.movieName}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              footer={<Button style={{ marginRight: 8 }} type="primary" onClick={this.handleCancel}>Close</Button>}
              width='817'
            >
              <Scrollbars style={{ height: '75vh', padding: '0px 20px' }}>
                <Row>
                  <Col span={23} className="BordrBottomSubTitle">
                    <Col span={5}><span className="GreyTxt"> {modalData.movieGenre}</span></Col>
                    <Col span={6} className="RightElmnt"><span className="GreyTxt">RELEASE DATE:</span> {new Date(modalData.movieReleaseDate).toLocaleDateString()}</Col>
                  </Col>
                  <Col span={23} className="Mrgn4Youtube">
                    <ReactPlayer width="100%" url={'https://www.youtube.com/watch?v=' + modalData.trailerUrl} playing={false} />
                    <p className="VideoTxt">
                      {modalData.movieDescription}
                    </p>
                  </Col>

                  <Col span={23} className="CastCrewSubHeading">
                    <h3>CAST AND CREW</h3>
                    {renderCrew}
                  </Col>

                  <Col span={23} className="SocialMediaICons">
                    <h3 className="Padding20">FOLLOW US ON</h3>
                    <Col span={2}>
                      <a href={modalData.facebookLink} className="themecolorLink" target="_blank">
                        <img src={facebook_logo} style={{ 'vertical-align': 'middle' }} alt="" />
                      </a>
                    </Col>
                    <Col span={2}>
                      <a href={modalData.instagramLink} className="themecolorLink" target="_blank">
                        <img src={instagramNewlogo} style={{ 'vertical-align': 'middle' }} alt="" />
                      </a>
                    </Col>
                  </Col>
                  <Col span={23} className="MoviePopUpgalleryImgs">
                    {renderCreatives}
                  </Col>
                </Row>
              </Scrollbars>
            </Modal>

            <Modal className="MovieModal"
              title={modalData.movieName}
              visible={this.state.editVisible}
              onCancel={this.handleCancel}
              footer={<Button style={{ marginRight: 8 }} type="primary" onClick={this.handleCancel}>Close</Button>}
              width='817'
            >
              <Scrollbars style={{ height: '65vh', padding: '0px 20px' }}>
                <Row>
                  <Col span={24} className="CreateData">
                    <Col span={24} className="CreateDataHeader">
                      <Col span={8}>
                        <h4> <span>Edit  CreateData</span></h4>
                      </Col>
                      <Col span={6} className="CreateDataRight">

                        <h4 className="DatesOfcreateHead"> {new Date().toDateString()}</h4>
                      </Col>
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
                              <Button className="margnBottom20" type="primary" onClick={() => this.next()}>SAVE & NEXT</Button>
                            }
                            {
                              this.state.current === steps.length - 1
                              &&
                              <Button type="primary" onClick={this.sendForApproval}>SEND FOR APPROVAL</Button>
                            }
                          </div>
                        </Col>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Scrollbars>
            </Modal>
          </Row>
        </div>
      </div>
    );
  };
}


export default Movies;
/* eslint-disable */