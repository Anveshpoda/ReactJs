/* eslint-disable */
import React from 'react';
import $ from "jquery";
import classnames from 'classnames';
import AddTag1 from './AddTag1.js';
import moment from 'moment';
import Comment from './Comment.js';
import ReactTooltip from 'react-tooltip'
import Comment1 from './Comment1.js';
import PropTypes from "prop-types";
import { Row, Col, Select, Tooltip, DatePicker, TimePicker, Upload, Checkbox, Radio, Switch, Modal, Form, Icon, Input, Button, Steps, message, Collapse } from 'antd'
import { EFAULT } from 'constants';
import ReactAudioPlayer from 'react-audio-player';
const Panel = Collapse.Panel;

const text1 = <p>collapes test 1</p>;
const text2 = <p>collapes test 2</p>;
const text3 = <p>collapes test 3</p>;
const text4 = <p>collapes test 4</p>;
const text5 = <p>collapes test 5</p>;
const FormItem = Form.Item;
const Step = Steps.Step;
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const dateFormat = 'YYYY/MM/DD';
const format = 'HH:mm:ss';
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
//image upload for frame
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}
function beforeUpload(file) {
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

//
//check box for frame

function onChange(e) {
  // console.log(`checked = ${e.target.checked}`);
}
//  


class Demo2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      karaokeAudioUrl: '',
      karaokeDescription: '',
      karaokeTitle: '',
      karaokeLids: '',
      dubSmashAudioUrl: '',
      dubSmashDescription: '',
      dubSmashTitle: '',
      contestIcon11: '',
      contestImageUrl1: '',
      contestThumbnail1: '',
      postercheck: false,
      postercheckwall: '',
      dubsmashLids1: '',
      releaseDate: '',
      time: '',
      synopsis: '',
      crewimageUrl: '',
      castimageUrl: '',
      crewname: '',
      crewrole: '',
      castname: '',
      castrole: '',
      visible: false,
      visible1: false,
      visible2: false,
      visible3: false,
      disabled: false,
      disabled2: false,
      disabled3: true,
      disabled4: false,
      keys: [],
      errors: {},
      editdata: {},
      karoke: {},
      dubshmash: {},
      aboutMovie: {},
      data: {},
      tag: '',
      employees: [

      ],
      contestIcon: '',
      name: '',
      name1: '',
      numElems: 3,
      employees1: [

      ],
      contestIcon1: '',
      name2: '',
      name3: '',
      numElems1: 3,
      Kaudio: '',
      Daudio: '',
      previewVisible: false,
      previewImage: '',
      fileList: [],
    }
    this.addEmployee = this.addEmployee.bind(this);
    this.retrieveEmployee = this.retrieveEmployee.bind(this);
    this.addEmployee1 = this.addEmployee1.bind(this);
    this.retrieveEmployee1 = this.retrieveEmployee1.bind(this);
  }

  handleCancelF = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChangeF = ({ fileList }) => {
    console.log("changeimag", fileList);
    for(let i=0;i<fileList.length;i++){
      console.log("fileList[i].type",fileList[i].type)
      if(fileList[i].type === "image/jpeg" || fileList[i].type === "image/jpg" || fileList[i].type === "image/png"){
        this.setState({ fileList })
      }else{
        let errors={}
        document.getElementById("mobile1").innerHTML="Only Image is accepted."
this.setState({previewVisible:false})
      }
    }
    
  }
  handleChange8 = (info) => {
    if (info.file.type === "audio/mp3" || info.file.type === "audio/x-m4a") {
      let fileList = info.fileList;
      fileList = fileList.slice(-1);
      fileList = fileList.map((file) => {
        if (file.response) {
          file.url = file.response.url;
        }
        return file;
      });
      fileList = fileList.filter((file) => {
        if (file.response) {
          return file.response.status === 'success';
        }
        return true;
      });
      this.setState({ fileList21: fileList });
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        if (info.file.response.data !== '') this.state.errors.karaokeAudioUrl = '';
        document.getElementById('mhhh').innerHTML = '';
        this.setState({ karaokeAudioUrl: info.file.response.data, fileList21: fileList, Kaudio: info.file.response.data });
      }
    }
    else {
      let errors = {};
      if (this.state.karaokeAudioUrl === '') errors.karaokeAudioUrl = "Supports only MP3 and M4A music files"

      this.setState({ errors });
      if (Object.keys(errors).length === 0) {
        // console.log("super");

        document.getElementById('mhhh').innerHTML = `Supports only MP3 and M4A music files .`

      }
    }
  }
  handleChange10 = (info) => {
    if (info.file.type === "audio/mp3" || info.file.type === "audio/x-m4a") {
      let fileList = info.fileList;
      fileList = fileList.slice(-1);
      fileList = fileList.map((file) => {
        if (file.response) {
          file.url = file.response.url;
        }
        return file;
      });
      fileList = fileList.filter((file) => {
        if (file.response) {
          return file.response.status === 'success';
        }
        return true;
      });
      this.setState({ fileList22: fileList });
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        if (info.file.response.data !== '') this.state.errors.dubSmashAudioUrl = '';
        document.getElementById('mhhh2').innerHTML = '';
        this.setState({ dubSmashAudioUrl: info.file.response.data, fileList22: fileList, Daudio: info.file.response.data });
      }
    } else {
      let errors = {};
      if (this.state.dubSmashAudioUrl === '') errors.dubSmashAudioUrl = "Supports only MP3 and M4A music files"

      this.setState({ errors });
      if (Object.keys(errors).length === 0) {
        // console.log("super");
        document.getElementById('mhhh2').innerHTML = `Supports only MP3 and M4A music files .`


      }
    }
  }
  handleChange51 = (info) => {
    //  console.log("info.file.status", info.file.type);
    if (info.file.type === "image/png" || info.file.type === "image/jpg" || info.file.type === "image/jpeg") {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        if (info.file.response.data !== '') this.state.errors.contestIcon11 = '';
        this.setState({
          contestIcon11: info.file.response.data
        })
      }
    } else {
      let errors = {};
      if (this.state.contestIcon11 === '') errors.contestIcon11 = "Only Image is required."
      this.setState({ errors });
      if (Object.keys(errors).length === 0) {
        // console.log("super");
      }
    }
  }
  handleChange61 = (info) => {
    if (info.file.type === "image/png" || info.file.type === "image/jpg" || info.file.type === "image/jpeg") {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        if (info.file.response.data !== '') this.state.errors.contestImageUrl1 = '';
        this.setState({
          contestImageUrl1: info.file.response.data
        })
      }
    } else {
      let errors = {};
      if (this.state.contestImageUrl1 === '') errors.contestImageUrl1 = "Only Image is required."
      this.setState({ errors });
      if (Object.keys(errors).length === 0) {
        //  console.log("super");

      }
    }
  }
  handleChange71 = (info) => {
    if (info.file.type === "image/png" || info.file.type === "image/jpg" || info.file.type === "image/jpeg") {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        if (info.file.response.data !== '') this.state.errors.contestThumbnail1 = '';
        this.setState({
          contestThumbnail1: info.file.response.data
        })
      }
    } else {
      let errors = {};
      if (this.state.contestThumbnail1 === '') errors.contestThumbnail1 = "Only Image is required."
      this.setState({ errors });
      if (Object.keys(errors).length === 0) {
        // console.log("super");
      }
    }
  }
  change1 = (e) => {
    if (this.state.karaokeDescription) {
      if (this.state.karaokeDescription.trim() != '') this.state.errors.karaokeDescription = '';
    }
    this.setState({ karaokeDescription: e.target.value });

  }
  change2 = (e) => {
    if (this.state.karaokeTitle) {
      if (this.state.karaokeTitle.trim() != '') this.state.errors.karaokeTitle = '';
    }
    this.setState({ karaokeTitle: e.target.value });
  }
  change3 = (e) => {
    if (this.state.dubSmashDescription) {
      if (this.state.dubSmashDescription.trim() != '') this.state.errors.dubSmashDescription = '';
    }
    this.setState({ dubSmashDescription: e.target.value });
  }
  change4 = (e) => {
    if (this.state.dubSmashTitle) {
      if (this.state.dubSmashTitle.trim() != '') this.state.errors.dubSmashTitle = '';
    }
    this.setState({ dubSmashTitle: e.target.value });
  }
  change5 = (e) => {
    if (this.state.castname.trim() != '') this.state.errors.castname = '';
    this.setState({ castname: e.target.value });
  }
  change8 = (e) => {
    if (this.state.crewrole.trim() != '') this.state.errors.crewrole = '';
    this.setState({ crewrole: e.target.value });
  }
  change7 = (e) => {
    if (this.state.crewname.trim() != '') this.state.errors.crewname = '';
    this.setState({ crewname: e.target.value });
  }
  change6 = (e) => {
    if (this.state.castrole.trim() != '') this.state.errors.castrole = '';
    this.setState({ castrole: e.target.value });
  }
  submit = () => {
    let errors = {};
    if (this.state.karaokeAudioUrl === '') errors.karaokeAudioUrl = "* This field is mandatory";
    if (this.state.karaokeTitle.trim() === '') errors.karaokeTitle = "* This field is mandatory";
    if (this.state.karaokeTitle.length >= 51) errors.karaokeTitle = "karako title should be 50 chars";
    if (this.state.karaokeDescription.trim() === '') errors.karaokeDescription = "* This field is mandatory";
    if (this.state.karaokeDescription.length >= 51) errors.karaokeDescription = "karako description should be 50 chars";
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      // console.log("this.state in submit child karako", this.state);
      // this.setState({ disabled: false });
      var obj = {
        "karaokeAudioUrl": this.state.karaokeAudioUrl,
        "karaokeTitle": this.state.karaokeTitle,
        "karaokeDescription": this.state.karaokeDescription
      }
      sessionStorage.setItem('karokeLatest', JSON.stringify(obj))
      this.props
        .submit1(this.state);
      message.success('Karaoke details saved successfully!');
    }
  }
  submit1 = () => {
    let errors = {};
    if (this.state.dubSmashAudioUrl === '') errors.dubSmashAudioUrl = "* This field is mandatory";
    if (this.state.dubSmashTitle.trim() === '') errors.dubSmashTitle = "* This field is mandatory";
    if (this.state.dubSmashTitle.length >= 51) errors.dubSmashTitle = "dubSmash title should be 50 chars";
    if (this.state.dubSmashDescription.trim() === '') errors.dubSmashDescription = "* This field is mandatory";
    if (this.state.dubSmashDescription.length >= 51) errors.dubSmashDescription = "dubSmash description should be 50 chars";
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      // this.setState({ disabled2: false });
      var obj = {
        "dubSmashAudioUrl": this.state.dubSmashAudioUrl,
        "dubSmashTitle": this.state.dubSmashTitle,
        "dubSmashDescription": this.state.dubSmashDescription
      }
      sessionStorage.setItem('dubshmashLatest', JSON.stringify(obj))
      this.props
        .submit1(this.state)
      message.success('Dub2Win details saved successfully!');
    }
  }
  submit2 = () => {


    let errors = {};
    // console.log("this.sate tag", this.state.tag);
    if (this.state.releaseDate === '') errors.releaseDate = "* This field is mandatory";
    if (this.state.time === '') errors.time = "* This field is mandatory";
    if (this.state.synopsis.trim() === '') errors.synopsis = "* This field is mandatory";
    if (this.state.synopsis.length >= 201) errors.synopsis = "synopsis should be 200 chars";
    if (this.state.tag === '') errors.tag = "* This field is mandatory";
    if (this.state.tag.length === 0) errors.tag = "* This field is mandatory";
    if (this.state.tag.length >= 6) errors.tag = "Tags should be 5";
    if (this.state.employees.length === 0) errors.employees = "* This field is mandatory"
    if (this.state.employees1.length === 0) errors.employees1 = "* This field is mandatory"
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      //  console.log("this.state in submit child about movie", this.state);
      // this.setState({ disabled4: false });
      var obj = {
        "releaseDate": this.state.releaseDate,
        "time": this.state.time,
        "synopsis": this.state.synopsis,
        "tags": this.state.tag,
        "employees": this.state.employees,
        "employees1": this.state.employees1,
      }
      sessionStorage.setItem('aboutMovie', JSON.stringify(obj))
      this.props
        .submit1(this.state);

      message.success('About Info details saved successfully!');
      console.log("this.state", this.state.synopsis)
    }
  }
  submitFrame = () => {
    let errors = {};
    if (this.state.fileList.length === 0) errors.contestIcon11 = "Images are required"
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props
        .submit1(this.state);
      message.success('Frame details saved successfully!');
    }
  }
  onChangePoster = (e) => {
    // console.log("chexcked", e.target.checked);
    this.setState({ postercheck: e.target.checked });
    this.props
      .submit1(this.state, e.target.checked);
  }
  onChangePosterWall = (e) => {
    // console.log("chexcked", e.target.checked);
    this.setState({ postercheckwall: e.target.checked });
    this.props
      .submit1(this.state, e.target.checked);
  }
  handleCancel = (e) => {
    // console.log(e);
    this.setState({
      visible: false, Kaudio: ''

    });
  }
  handleCancel1 = (e) => {
    // console.log(e);
    this.setState({
      visible1: false, Daudio: ''

    });
  }
  handleCancel2 = (e) => {
    //  console.log(e);
    this.state.errors.crewimageUrl = '',
      this.state.errors.crewname = '',
      this.state.errors.crewrole = ''
    this.setState({
      visible2: false,
      crewimageUrl: '',
      crewname: '',
      crewrole: '',


    });
  }
  handleCancel3 = (e) => {
    //  console.log(e);
    this.state.errors.castimageUrl = '',
      this.state.errors.castname = '',
      this.state.errors.castrole = ''
    this.setState({
      visible3: false,
      castimageUrl: '',
      castname: '',
      castrole: ''

    });
  }
  handleCancel4 = (e) => {
    //  console.log(e);
    this.setState({
      visible4: false,

    });
  }
  showModal = () => {
    this.setState({
      visible: true, Kaudio: this.state.karaokeAudioUrl
    });
  }
  showModal1 = () => {
    this.setState({
      visible1: true, Daudio: this.state.dubSmashAudioUrl
    });
  }
  showModal2 = () => {
    this.setState({
      visible2: true,
    });
  }
  showModal3 = () => {
    this.setState({
      visible3: true,
    });
  }
  showModal4 = () => {
    this.setState({
      visible4: true,
    });
  }
  handleOk = (e) => {
    //console.log(e);
    this.setState({
      visible: false, Kaudio: ''
    });
  }
  handleOk1 = (e) => {
    // console.log(e);
    this.setState({
      visible1: false, Daudio: ''
    });
  }
  handleOk2 = (e) => {
    // console.log(e);
    let errors = {}

    if (this.state.crewrole === '') errors.crewrole = "crew role is required";
    if (this.state.crewrole.length >= 101) errors.crewrole = "crew role should be 100 chars";
    if (this.state.crewname === '') errors.crewname = "crew name is required";
    if (this.state.crewname.length >= 101) errors.crewname = " crew name should be 100 chars";
    if (this.state.crewimageUrl === '') errors.crewimageUrl = "crew image is required";
    this.setState({ errors })
    if (Object.keys(errors).length === 0) {
      this.setState({
        visible2: false,
      });
    }
  }
  handleOk3 = (e) => {
    //console.log(e);
    let errors = {}
    if (this.state.castrole === '') errors.castrole = "cast role is required";
    if (this.state.castrole.length >= 101) errors.castrole = "cast role should be 100 chars";
    if (this.state.castname === '') errors.castname = "cast name is required";
    if (this.state.castname.length >= 101) errors.castname = "cast name should be 100 chars";
    if (this.state.castimageUrl === '') errors.castimageUrl = "cast image is required";
    this.setState({ errors })
    if (Object.keys(errors).length === 0) {
      this.setState({
        visible3: false,
      });
    }
  }
  handleOk4 = (e) => {
    //  console.log(e);

    this.setState({
      visible4: false,
    });
  }
  callback = (key) => {
    // console.log("key", key);
    const value = key
    this.setState({ keys: value });
  }
  handleChange14 = (value) => {
    var value = moment(value).format('YYYY-MM-DD');
    // console.log("contestrelease dtae ", value);
    this.setState({ releaseDate: value });
    if (value !== '') this.state.errors.releaseDate = '';
  }
  handleChange15 = (value) => {
    var value = moment(value).format('HH:mm:ss');

    // console.log("contest time ", value);
    this.setState({ time: value });
    if (value !== '') this.state.errors.time = '';
  }
  handleChange16 = (e) => {
    // console.log("contest synopsis ", e.target.value);
    if (this.state.synopsis.trim() !== '') this.state.errors.synopsis = ''
    this.setState({ synopsis: e.target.value });
  }
  handleChange20 = (info) => {
    if (info.file.status === 'done') {
      // getBase64(info.file.originFileObj, castimageUrl => this.setState({ castimageUrl }));
      message.success(`${info.file.name} file uploaded successfully`);
      this.setState({
        castimageUrl: info.file.response.data
      })
    }
  }
  handleChange17 = (info) => {
    if (info.file.status === 'done') {
      // getBase64(info.file.originFileObj, crewimageUrl => this.setState({ crewimageUrl }));
      message.success(`${info.file.name} file uploaded successfully`);
      this.setState({
        crewimageUrl: info.file.response.data
      })
    }
  }
  componentWillUnmount() {
    // console.log("called un mount")
    this.props
      .submit1(this.state)
  }
  componentDidMount(e) {
    const data = this.state.editdata.karoke
    const data1 = this.state.editdata.dubshmash
    const data2 = this.state.editdata.aboutMovie
    const data99 = this.state.editdata.frame
    const data90 = this.state.editdata.order
    var karoko = JSON.parse(sessionStorage.getItem('karokeLatest'));
    var dubshmash = JSON.parse(sessionStorage.getItem('dubshmashLatest'));
    var aboutmovie = JSON.parse(sessionStorage.getItem('aboutMovie'));
    var checkkaro;
    if (isEmpty(karoko)) {
      checkkaro = ''
    } else {
      checkkaro = karoko.karaokeAudioUrl;
    }
    var checkdubs;
    if (isEmpty(dubshmash)) {
      checkdubs = ''
    } else {
      checkdubs = dubshmash.dubSmashAudioUrl;
    }
    var checkabout;
    if (isEmpty(aboutmovie)) {
      checkabout = ''
    } else {
      checkabout = aboutmovie.synopsis;
    }



    if (data99 === undefined) {

    } else if (data99.frames != '' || data99.frames != undefined) {
      const jj = data99.frames;
      var arr8 = [];
      for (let i = 0; i < jj.length; i++) {
        var y = {};
        y.url = jj[i];
        y.status = "done";
        y.uid = i;
        arr8.push(y);
      }
      this.setState({ fileList: arr8 })
    }
    var value = "poster"
    var new4 = [];
    data90.map((record) => {
      if (value === record) {
        new4.push(record);
      }
    })
    //console.log("new4", new4);
    if (new4.length === 1) {
      this.setState({ postercheck: true });
    } else {
      this.setState({ postercheck: false });
    }

    var valueforwallpost = "wallpost"
    var new5 = [];
    data90.map((record) => {
      if (valueforwallpost === record) {
        new5.push(record);
      }
    })
    // console.log("new5", new5);
    if (new5.length === 1) {
      this.setState({ postercheckwall: true });
    } else {
      this.setState({ postercheckwall: false });
    }

    //_this.setState({ postercheck: new4 });
    if (data === undefined) {
      // console.log("undefinde i am karoke ", data)
    }
    else if ((data.audioUrl != '' || data.audioUrl != undefined) && checkkaro == '') {
      // console.log("have some data karoke", data);
      this.setState({ karaokeAudioUrl: data.audioUrl });
      this.setState({ Kaudio: data.audioUrl });
      this.setState({ karaokeDescription: data.description });
      this.setState({ karaokeTitle: data.title });
    }
    else {
      this.setState({ karaokeAudioUrl: karoko.karaokeAudioUrl });
      this.setState({ Kaudio: karoko.karaokeAudioUrl });
      this.setState({ karaokeDescription: karoko.karaokeDescription });
      this.setState({ karaokeTitle: karoko.karaokeTitle });
    }

    //  console.log("data1", data1)
    if (data1 === undefined) {
      //  console.log("undefinde i am dunsmash ", data1)
    }
    else if ((data1.audioUrl != '' || data1.audioUrl != undefined) && checkdubs == '') {
      // console.log("have some data dubsmash", data1);
      this.setState({ dubSmashAudioUrl: data1.audioUrl });
      this.setState({ Daudio: data1.audioUrl });
      this.setState({ dubSmashDescription: data1.description });
      this.setState({ dubSmashTitle: data1.title });

    }
    else {
      this.setState({ dubSmashAudioUrl: dubshmash.dubSmashAudioUrl });
      this.setState({ Daudio: dubshmash.dubSmashAudioUrl });
      this.setState({ dubSmashDescription: dubshmash.dubSmashDescription });
      this.setState({ dubSmashTitle: dubshmash.dubSmashTitle });
    }

    if (data2 === undefined) {
      //console.log("undefinde i am aboutmovie", data2)
    }
    else if (data2.cast.length != 0 && checkabout == '') {
      //console.log("have some data about movie ", data2);
      this.setState({ synopsis: data2.synopsis })
      this.setState({ tag: data2.tags })
      const rdate = moment(data2.releaseDate).format('YYYY-MM-DD');
      this.setState({ releaseDate: rdate })
      const tdate = data2.movieDuration

      console.log("time", tdate)
      this.setState({ time: tdate });

      const data3 = this.state.editdata.aboutMovie.crew
      const data4 = this.state.editdata.aboutMovie.cast
      var arr = [];
      for (let i = 0; i < data3.length; i++) {
        var x = data3[i];
        x.numElems = i;
        x.id = i;
        x.editable = false;
        arr.push(x);
      }
      this.setState({ employees: arr })
      console.log("arr", arr)

      var arr2 = [];
      for (let i = 0; i < data4.length; i++) {
        var y = data4[i];
        y.numElems = i
        y.id = i;
        y.editable = false;
        arr2.push(y)
      }
      this.setState({ employees1: arr2 })
      console.log("arr2", arr2);
    }
    else {
      this.setState({ synopsis: aboutmovie.synopsis })
      this.setState({ tag: aboutmovie.tags })
      const rdate = moment(aboutmovie.releaseDate).format('YYYY-MM-DD');
      this.setState({ releaseDate: rdate })
      const tdate = aboutmovie.time

      console.log("time", tdate)
      this.setState({ time: tdate });

      const data3 = aboutmovie.employees
      const data4 = aboutmovie.employees1
      var arr = [];
      for (let i = 0; i < data3.length; i++) {
        var x = data3[i];
        x.numElems = i;
        x.id = i;
        x.editable = false;
        arr.push(x);
      }
      this.setState({ employees: arr })
      console.log("arr", arr)

      var arr2 = [];
      for (let i = 0; i < data4.length; i++) {
        var y = data4[i];
        y.numElems = i
        y.id = i;
        y.editable = false;
        arr2.push(y)
      }
      this.setState({ employees1: arr2 })
      console.log("arr2", arr2);
    }
  }
  componentWillMount() {
    // console.log("this.props from edit", this.props);
    this.setState({ editdata: this.props.editdata });
    this.setState({
      karoke: this.props.editdata.karoke,
      dubshmash: this.props.editdata.dubshmash
    })
    this.setState({ aboutMovie: this.props.editdata.aboutMovie })
  }
  handleTag = (data) => {
    // console.log("tag data in demo2",data);
    if (data !== '') this.state.errors.tag = '';
    this.setState({ tag: data })
  }
  addEmployee(e) {
    e.preventDefault();
    const name = this._newText.refs.input.value
    const name1 = this._newText1.refs.input.value
    const img = this.state.contestIcon
    if (name.trim() === '') {
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
    } else if (name.trim() != '' && name1.trim() != '' && img != '' && name.length <= 20 && name1.length <= 20) {
      var numElems = this.state.numElems++;
      this.setState({
        employees:
          this.state.employees.concat(
            { "numElems": numElems, "id": numElems, "actorName": this._newText.refs.input.value.trim(), "dept": this._newText1.refs.input.value.trim(), "imageUrl": this.state.contestIcon, "editable": false }
          )
      });
      // console.log("this.state.contestIcon",this.state.contestIcon);
      // sessionStorage.setItem('locationkey1',this.state.contestIcon);
      // var self = this;
      // self.clearData();
      this._newText.refs.input.value = ''
      this._newText1.refs.input.value = ''
      this.state.contestIcon = ''
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
  deleteEmployee(empId) {
    var newEmp = this.state.employees.filter((val) => { return val.id !== empId; });
    this.setState({ employees: newEmp });
    // console.log(this.state.employees)
  }

  retrieveEmployee(empId) {

    var emp = this.state.employees.find(obj => { return obj.id === empId; });
    var idx = this.state.employees.indexOf(emp);
    return { "empId": idx, "object": emp };
  }

  updateEmployee(empId, employeeDetails, employeeDetails1, employeeDetails2) {
    var emp = this.retrieveEmployee(empId);
    emp.object.editable = false;
    emp.object.actorName = employeeDetails;
    emp.object.dept = employeeDetails1;
    emp.object.imageUrl = employeeDetails2;
    var _employees = this.state.employees.slice();
    _employees[emp.empId] = emp.object;
    this.setState({ employees: _employees });
  }

  enableUpdateEmployee(empId) {
    var emp = this.retrieveEmployee(empId);
    emp.object.editable = true;
    var _employees = this.state.employees.slice();
    _employees[emp.empId] = emp.object;
    this.setState({ employees: _employees });
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
  addEmployee1(e) {
    e.preventDefault();
    const name = this._newText2.refs.input.value
    const name1 = this._newText3.refs.input.value

    if (name.trim() === '') {
      document.getElementById('name2').innerHTML = ("Please give name");
    }
    else if (name.length >= 21) {
      document.getElementById('name2').innerHTML = ("Name should be 20 characters");
    }
    else if (name1.trim() === '') {
      document.getElementById('name3').innerHTML = ("Please give role");
    }
    else if (name1.length >= 21) {
      document.getElementById('name3').innerHTML = ("Role should be 20 characters");
    }
    else if (this.state.contestIcon1 === '') {
      document.getElementById('icon2').innerHTML = ("Please give image");
    }
    else if (name.trim() != '' && name1.trim() != '' && this.state.contestIcon1 != '' && name.length <= 20 && name1.length <= 20) {
      var numElems1 = this.state.numElems1++;
      this.setState({
        employees1:
          this.state.employees1.concat(
            { "numElems1": numElems1, "id": numElems1, "actorName": this._newText2.refs.input.value.trim(), "dept": this._newText3.refs.input.value.trim(), "imageUrl": this.state.contestIcon1, "editable": false }
          )
      });
      //sessionStorage.setItem('locationkey2',this.state.contestIcon1);
      //var self = this;
      // self.clearData1();
      this._newText2.refs.input.value = ''
      this._newText3.refs.input.value = ''
      this.state.contestIcon1 = ''
      document.getElementById('name2').innerHTML = ("");
      document.getElementById('name3').innerHTML = ("");
      document.getElementById('icon2').innerHTML = ("");

    }

  }
  clearData1() {
    $(document).ready(function () {
      $('input').val('');

    });
  }
  deleteEmployee1(empId) {
    var newEmp = this.state.employees1.filter((val) => { return val.id !== empId; });
    this.setState({ employees1: newEmp });
    // console.log(this.state.employees1)
  }

  retrieveEmployee1(empId) {

    var emp = this.state.employees1.find(obj => { return obj.id === empId; });
    var idx = this.state.employees1.indexOf(emp);
    return { "empId": idx, "object": emp };
  }

  updateEmployee1(empId, employeeDetails, employeeDetails1, employeeDetails2) {
    var emp = this.retrieveEmployee1(empId);
    emp.object.editable = false;
    emp.object.actorName = employeeDetails;
    emp.object.dept = employeeDetails1;
    emp.object.imageUrl = employeeDetails2;
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

  handleChange6 = (info) => {
    if (info.file.status === 'done') {
      // getBase64(info.file.originFileObj, crewimageUrl => this.setState({ crewimageUrl }));
      message.success(`${info.file.name} file uploaded successfully`);

      this.setState({
        contestIcon1: info.file.response.data
      })
    }
  }
  render() {
    console.log("this.state in demo2", this.state);
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />

      </div>
    );
    const imageUrl = this.state.imageUrl;
    var _this = this;
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
      onRemove(info) {
        _this.setState({ karaokeAudioUrl: '' });
      }

    };
    const props1 = {
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
      onRemove(info) {
        _this.setState({ dubSmashAudioUrl: '' });
      }

    };
    var lstComms = this.state.employees.map((cmt, idx) => {
      return (
        <Comment key={cmt.id}
          empId={cmt.id}
          editable={cmt.editable}
          fnRemove={this.deleteEmployee.bind(this, cmt.id)}
          disabled={this.props.disabled}
          readOnly={this.props.readOnly}
          fnEnableEdit={this.enableUpdateEmployee.bind(this, cmt.id)}
          fnEdit={this.updateEmployee.bind(this)}>
          {cmt.actorName}{cmt.dept}{cmt.imageUrl}</Comment>
      )
    });
    var lstComms1 = this.state.employees1.map((cmt, idx) => {
      return (
        <Comment1 key={cmt.id}
          editable={cmt.editable}
          empId={cmt.id}
          disabled={this.props.disabled}
          readOnly={this.props.readOnly}
          fnRemove={this.deleteEmployee1.bind(this, cmt.id)}
          fnEnableEdit={this.enableUpdateEmployee1.bind(this, cmt.id)}
          fnEdit={this.updateEmployee1.bind(this)}>
          {cmt.actorName}{cmt.dept}{cmt.imageUrl}</Comment1>
      )
    });
    return (
      <div>
        <Row>
          <Col className="">
            <Collapse defaultActiveKey={['1']} onChange={this.callback}>
              <Panel header="Add Karaoke Challenge" key="1" >
                <div>
                  <Col span={16}>
                    <FormItem className={classnames('karaokeAudioUrl', { error: !!this.state.errors.karaokeAudioUrl })}>
                      <h6 className='h6Font'>Upload Music File

                      </h6>
                      <Upload {...props}
                        accept=".mp3,.m4a"
                        onChange={this.handleChange8}
                        fileList={this.state.fileList21}
                        disabled={this.props.disabled}>
                        <Button>
                          <Icon type="upload" /> upload
             </Button>

                      </Upload>
                      {this.state.karaokeAudioUrl != undefined ? this.state.karaokeAudioUrl : null}
                      <span>{this.state.errors.karaokeAudioUrl}</span>
                      <p id="mhhh" className="error"></p>
                    </FormItem></Col>
                  <Col span={16}>
                    <FormItem className={classnames('karaokeDescription', { error: !!this.state.errors.karaokeDescription })}>
                      <h6 className='h6Font'>Instructions
                               <span>
                          <a data-tip data-for='global7'>  <Icon className="mrgleft10" type="exclamation-circle-o" /> </a>
                          <ReactTooltip id='global7' aria-haspopup='true' role='example'>

                            <ol>
                              <li>1. Explain how to participate in challenge (Touch, record and sing)</li>
                              <li>2. Length should not exceed 50 characters (With spaces)</li>

                            </ol>
                          </ReactTooltip>
                        </span>
                      </h6>
                      <Input readOnly={this.props.readOnly} placeholder="Enter Instructions" name="karaokeDescription" value={this.state.karaokeDescription} onChange={this.change1} />

                      <span>{this.state.errors.karaokeDescription}</span>

                    </FormItem></Col>
                  <Col span={16}>
                    <FormItem className={classnames('karaokeTitle', { error: !!this.state.errors.karaokeTitle })}>
                      <h6 className='h6Font'>Karaoke Title:
                 <span>
                          <a data-tip data-for='global6'>  <Icon className="mrgleft10" type="exclamation-circle-o" /> </a>
                          <ReactTooltip id='global6' aria-haspopup='true' role='example'>

                            <ol>
                              <li>1. Specify the song in a sentence format (Croon to ""Munna"" Song)</li>
                              <li>2. Length should not exceed 50 characters (With spaces)</li>

                            </ol>
                          </ReactTooltip>
                        </span>
                      </h6>
                      <Input readOnly={this.props.readOnly} placeholder="Enter Karaoke Title" name="karaokeTitle" value={this.state.karaokeTitle} onChange={this.change2} />

                      <span>{this.state.errors.karaokeTitle}</span>

                    </FormItem></Col>
                  <Col span={16}>
                    {/* <FormItem className={classnames('karaokeLids', { error: !!this.state.errors.karaokeLids })} >
                <Input placeholder="Location ids" name="karaokeLids" value={this.state.karaokeLids} onChange={this.handleChange9} />
                <span>{this.state.errors.karaokeLids}</span>
              </FormItem> */}
                    <ul className="list-inline"><li>
                      <FormItem>
                        {this.props.disabled === false ? <Button type="primary" onClick={this.submit}>Save</Button> : ''}
                      </FormItem></li>
                      <li>
                        <FormItem>
                          {this.props.disabled === false ? <Button onClick={this.showModal} disabled={this.state.disabled}>Karaoke  Preview</Button> : ''}
                        </FormItem></li>
                    </ul>
                  </Col>
                </div>
              </Panel>
              <Panel header="Add Dub2Win Challenge" key="2" >
                <div>
                  <Col span={16}>
                    <FormItem className={classnames('dubSmashAudioUrl', { error: !!this.state.errors.dubSmashAudioUrl })}>
                      <h6 className='h6Fnt'>Upload Dialogue File</h6>
                      <Upload {...props1}
                        accept=".mp3,.m4a"
                        onChange={this.handleChange10}
                        fileList={this.state.fileList22}
                        disabled={this.props.disabled}>
                        <Button>
                          <Icon type="upload" /> upload
             </Button>

                      </Upload>
                      {this.state.dubSmashAudioUrl != undefined ? this.state.dubSmashAudioUrl : null}
                      <span>{this.state.errors.dubSmashAudioUrl}</span>
                      <p id="mhhh2" className="error"></p>
                    </FormItem>
                  </Col>
                  <Col span={16}>
                    <FormItem className={classnames('dubSmashDescription', { error: !!this.state.errors.dubSmashDescription })}>
                      <h6 className='h6Font'>Instructions
                     <span>
                          <a data-tip data-for='global9'>  <Icon className="mrgleft10" type="exclamation-circle-o" /> </a>
                          <ReactTooltip id='global9' aria-haspopup='true' role='example'>

                            <ol>
                              <li>1. Explain how to participate in challenge (Touch, record and sing)</li>
                              <li>2. Length should not exceed 50 characters (With spaces)</li>

                            </ol>
                          </ReactTooltip>
                        </span>
                      </h6>
                      <Input readOnly={this.props.readOnly} placeholder="Enter Instructions" name="dubSmashDescription" value={this.state.dubSmashDescription} onChange={this.change3} />

                      <span>{this.state.errors.dubSmashDescription}</span>

                    </FormItem>
                  </Col>
                  <Col span={16}>
                    <FormItem className={classnames('dubSmashTitle', { error: !!this.state.errors.dubSmashTitle })}>
                      <h6 className='h6Font'>Dub2Win Title
                                 <span>
                          <a data-tip data-for='global8'>  <Icon className="mrgleft10" type="exclamation-circle-o" /> </a>
                          <ReactTooltip id='global8' aria-haspopup='true' role='example'>

                            <ol>
                              <li>1. Specify the dialogue in a sentence format (Reprise ""Dilwale"" dialogue)</li>
                              <li>2. Length should not exceed 50 characters (With spaces)</li>
                            </ol>
                          </ReactTooltip>
                        </span>
                      </h6>
                      <Input readOnly={this.props.readOnly} placeholder="Enter Dub2Win Title" name="dubSmashTitle" value={this.state.dubSmashTitle} onChange={this.change4} />
                      <span>{this.state.errors.dubSmashTitle}</span>

                      <Col span={1}>

                      </Col>

                    </FormItem>
                  </Col>
                  <Col span={16}>
                    {/* <FormItem className={classnames('dubSmashLids1', { error: !!this.state.errors.dubSmashLids1 })} >
                <h6 className='h6Font'>Add locations</h6>
                <Input placeholder="Location ids" name="dubSmashLids1" value={this.state.dubsmashLids1} onChange={this.handleChange9} />
                <span>{this.state.errors.dubSmashLids1}</span>
              </FormItem> */}
                    <ul className="list-inline"><li>
                      <FormItem>
                        {this.props.disabled === false ? <Button type="primary" onClick={this.submit1}>Save</Button> : ''}
                      </FormItem></li>
                      <li>
                        <FormItem>
                          {this.props.disabled === false ? <Button onClick={this.showModal1} disabled={this.state.disabled2}> Dub2Win Preview</Button> : ''}
                        </FormItem>
                      </li>
                    </ul>
                  </Col>
                </div>
              </Panel>
              <Panel header="Add Movie Info" key="3" className="aboutMoviedata">
                <div>
                  <Col span={16}>
                    <FormItem>
                      <h6 className='h6Font'>Genre</h6>


                      <AddTag1 disabled={this.props.disabled} readOnly={this.props.readOnly} tags={this.state.tag} handleTag={this.handleTag} />
                      <span className="error">{this.state.errors.tag}</span>

                    </FormItem></Col>
                  <Col span={16}>
                    <ul className="list-inline"><li>
                      <FormItem className={classnames('releaseDate', { error: !!this.state.errors.releaseDate })}>
                        <h6 className='h6Fnt'>Movie Release Date</h6>
                        <DatePicker
                        disabled={this.props.disabled}
                         getCalendarContainer={triggerNode => triggerNode.parentNode} onChange={this.handleChange14} className="width200"
                          value={this.state.releaseDate ? moment(this.state.releaseDate, dateFormat) : ''} format={dateFormat}
                          placeholder="Movie Release Date" />

                        <span>{this.state.errors.releaseDate}</span>
                      </FormItem></li>
                      <li><FormItem className={classnames('time', { error: !!this.state.errors.time })}>
                        <h6 className='h6Fnt'>Movie Duration</h6>
                        <TimePicker 
                        disabled={this.props.disabled}
                        getPopupContainer={triggerNode => triggerNode.parentNode} onChange={this.handleChange15}
                          className="width200" placeholder="Movie Duration"
                          value={this.state.time ? moment(this.state.time, format) : ''} format={format}
                        />

                        <span>{this.state.errors.time}</span>
                      </FormItem></li></ul></Col>
                  <Col span={16}>
                    <FormItem className={classnames('synopsis', { error: !!this.state.errors.synopsis })} >
                      <h6 className='h6Font'>Synopsis
                 <span>
                          <a data-tip data-for='global10'>  <Icon className="mrgleft10" type="exclamation-circle-o" /> </a>
                          <ReactTooltip id='global10' aria-haspopup='true' role='example'>

                            <ol>
                              <li>      1. Length should not exceed 200 characters (With spaces)</li>

                            </ol>
                          </ReactTooltip>
                        </span>
                      </h6>
                      <TextArea disabled={this.props.disabled} rows={3} placeholder="Enter Synopsis here" value={this.state.synopsis} onChange={this.handleChange16} />

                      <span>{this.state.errors.synopsis}</span>
                    </FormItem></Col>
                  <Col span={16}>
                    {/* <FormItem >
                <Button onClick={this.showModal2}>Add Crew</Button>
              
              </FormItem> */}
                    <div className="mainsCastChalleng1">

                      <div>
                      <h3 className="h6Fnt">Crew Details</h3>
                      {this.props.disabled ? null :
                        <Form>
                          <ul className="list-inline">
                           
                            <li>
                              <FormItem  >
                                <Upload  
                                disabled={this.props.disabled}
                                {...props} onChange={this.handleChange5}
                                  accept=".png,.jpg,.jpeg">
                                  {
                                    this.state.contestIcon ?
                                      <img src={this.state.contestIcon} ref={c => this._newText44 = c} name="contestIcon" alt="Contest Icon" className="avatar circleImg" style={{ width: 80, height: 80 }} /> :
                                      <Icon type="plus" className="avatar-uploader-trigger circleImg" style={{ width: 80, height: 80, border: '1px solid #EBEAEA' }} />
                                  }
                                </Upload>
                                <p className="RedTxtLeft" id="icon" className="icon"></p>
                              </FormItem>  </li>
                            <li>
                              <FormItem >
                                <Input readOnly={this.props.readOnly} type="text" placeholder="Name" name="name" className="ant-input"
                                  ref={c => this._newText = c} className="form-control txt_field" />
                                <p className="RedTxtLeft" id="name" className="name"></p>
                              </FormItem>
                              <FormItem >
                                <Input readOnly={this.props.readOnly} type="text" placeholder="Role" name="name1"
                                  ref={c => this._newText1 = c} className="form-control txt_field" />
                                <p className="RedTxtLeft" id="name1" className="name1"></p>
                              </FormItem>
                            </li>
                            <li>
                              {this.props.disabled ? <Button onClick={this.addEmployee} className="btn btn-success margin_btn center-block">Save</Button> : ''}
                              <span className="error">{this.state.errors.employees}</span>
                            </li>
                          </ul>
                        </Form>}
                        <br />

                        {lstComms} <br />

                      </div>
                    </div></Col>
                  <Col span={16}>
                    {/* <FormItem >

                <Button onClick={this.showModal3}>Add Cast</Button>
              
              </FormItem> */}
                    <div className="mainsCastChalleng1">
                      <div>
                      <h3 className="h6Fnt">Cast Details</h3>
                      {this.props.disabled ? null :
                        <Form>
                          <ul className="list-inline">
                            
                            <li>
                              <FormItem><Upload 
                              disabled={this.props.disabled} {...props} onChange={this.handleChange6}

                                accept=".png,.jpg,.jpeg">
                                {
                                  this.state.contestIcon1 ?
                                    <img src={this.state.contestIcon1} ref={node => this._newText5 = node} name="contestIcon" alt="Contest Icon" className="avatar circleImg" style={{ width: 80, height: 80 }} /> :
                                    <Icon type="plus" className="avatar-uploader-trigger circleImg" style={{ width: 80, height: 80, border: '1px solid #EBEAEA' }} />
                                }
                              </Upload>
                                <p className="RedTxtLeft" id="icon2" className="icon2"></p>
                              </FormItem>
                            </li>
                            <li>
                              <FormItem>
                                <Input readOnly={this.props.readOnly} type="text" placeholder="Name"
                                  ref={node => this._newText2 = node} name="name2" />
                                <p className="RedTxtLeft" id="name2" className="name2"></p>
                              </FormItem>

                              <FormItem>
                                <Input readOnly={this.props.readOnly} type="text" placeholder="Role"
                                  ref={node => this._newText3 = node} name="name3" />
                                <p className="RedTxtLeft" id="name3" className="name3"></p>
                              </FormItem>
                            </li>
                            <li>
                              {this.props.disabled === false ? <Button onClick={this.addEmployee1} className="btn btn-success margin_btn center-block">Save</Button> : ''}
                              <span className="error">{this.state.errors.employees1}</span>
                            </li></ul>
                        </Form>}
                        {lstComms1}
                      </div>
                    </div></Col>
                  <Col span={16}>
                    <ul className="list-inline">
                      {this.props.disabled === false ? <li>
                        <FormItem>
                          <Button type="primary" onClick={this.submit2}>Save</Button>
                        </FormItem></li> : ''}
                      {this.props.disabled === false ? <li>
                        <FormItem>
                          <Button onClick={this.showModal4} disabled={this.state.disabled4}> Movie Info Preview</Button>
                        </FormItem></li> : ''}
                    </ul>
                  </Col>
                </div>
              </Panel>
              <Panel header="This is Frame" key="5" >
               { this.props.disabled === false ? <div className="CchallengeFrame">
                  <Upload
                    action={process.env.REACT_APP_API_HOST + '/rest/azureImageUploadWeb'}
                    listType="picture-card"
                    fileList={fileList}
                    accept=".png,.jpg,.jpeg"
                    onPreview={this.handlePreview}
                    onChange={this.handleChangeF}
                  >
                    {fileList.length >= 5 ? null : uploadButton}
                  </Upload>
                  <span className="error" >{this.state.errors.contestIcon11}</span>
                  <p className="RedTxtLeft" id="mobile1" className="mobile1"></p>
                  <Modal visible={previewVisible} footer={null} onCancel={this.handleCancelF}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                  <ul>
                    <li>
                      <FormItem>
                        <Button type="primary" onClick={this.submitFrame} >Save</Button>
                      </FormItem></li>

                  </ul>
                </div> : ''}
              </Panel>
              <Panel header="This is Poster" key="6" >
                <div className="Cchallengeposter">
                  <Form>
                    <ul>
                      <li>
                        <Checkbox disabled={this.props.disabled} onChange={this.onChangePoster} checked={this.state.postercheck}>
                          <span className="mrgnLeft15">Add</span></Checkbox>
                      </li>

                    </ul>
                  </Form>
                </div>
              </Panel>

              <Panel header="This is Wallpost" key="7" >
                <div className="Cchallengeposter">
                  <Form>
                    <ul>
                      <li>
                        <Checkbox disabled={this.props.disabled} onChange={this.onChangePosterWall} checked={this.state.postercheckwall}>
                          <span className="mrgnLeft15">Add</span></Checkbox>
                      </li>

                    </ul>
                  </Form>
                </div>
              </Panel>

            </Collapse>
          </Col>
        </Row>
        <div>
          <Modal className="mrgLeft10"
            title="Karaoke Preview"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={null}
          >
            <div>

              <p className="boldFont">Karaoke Title: <span className="boldNorml"> {this.state.karaokeTitle}</span></p>
              <p className="boldFont mrgTop2">Karaoke Description:<span className="boldNorml">{this.state.karaokeDescription} </span></p>

              <ul className="list-inline">
                <li>
                  <p className="boldFont ChallengesKarokeDemo2">
                    Music File:
                </p>

                </li>
                <li className="audioBLOCK">

                  <ReactAudioPlayer className="creactplay"
                    src={this.state.Kaudio != undefined ? this.state.Kaudio : ''}
                    autoPlay={false} ref={(ref) => { this.audioEl = ref; }}
                    controls
                  /></li>
              </ul>

              <p className="mrgn16">
                <hr />
              </p>

              <Button onClick={this.handleOk} className="okBtn">OK</Button>
            </div>
          </Modal>
        </div>
        <div>
          <Modal className="modalHeight170"
            title="Dub2Win Details"
            visible={this.state.visible1}
            onOk={this.handleOk1}
            onCancel={this.handleCancel1}
            footer={null}
          >
            <div className="txtLeft">

              <p className="boldFont">Dub2Win Title:
             <span className="boldNorml">   {this.state.dubSmashTitle}</span>
              </p>
              <p className="boldFont">Dub2Win Description :
               <span className="boldNorml"> {this.state.dubSmashDescription}</span>
              </p>
              <ul className="list-inline">
                <li>
                  <p className="boldFont ChallengesKarokeDemo2">
                    Music File:
                </p>
                </li>
                <li className="audioBLOCK">
                  <ReactAudioPlayer className="creactplay"
                    src={this.state.Daudio != undefined ? this.state.Daudio : ''}
                    autoPlay={false} ref={(ref) => { this.audioEl = ref; }}
                    controls
                  />
                </li>
              </ul>

              <p className="mrgn16">
                <hr />
              </p>
              <Button onClick={this.handleOk1} className="okBtn">Ok</Button>
            </div>
          </Modal>
        </div>
        <div>
          <div>
            <Modal className="modalHeight250 MoviePrvmodalHeight"
              title="Movie Info Preview"
              visible={this.state.visible4}
              onOk={this.handleOk4}
              onCancel={this.handleCancel4}
              footer={null}
            >

              <p className="boldFontPrvw">Duration: <span className="boldNorml">{this.state.time}</span></p>
              <p className="boldFontPrvw">Release Date: <span className="boldNorml">{this.state.releaseDate}</span></p>
              <p className="boldFontPrvw">Synopsis: <span className="boldNorml">{this.state.synopsis}</span></p>
              <p className="boldFontPrvw">Tags: <span className="boldNorml">{this.state.tag}</span></p>

              <Row>
                <ul className="list-inline">
                  <li className='antColLg-12'>
                    <h1>Crew Details</h1>
                    {this.state.employees.map((cast, index) => {
                      return (
                        <div>
                          <Col span={24}>

                            <Row>
                              <Col span={9}>
                                <img src={cast.imageUrl} width="80px" height="80px" />
                              </Col>
                              <Col span={13}>
                                <h3>Name: </h3>
                                <p>{cast.actorName}</p>
                                <h3>Role: </h3>
                                <p>{cast.dept}</p>
                              </Col>
                            </Row>
                          </Col>
                        </div>
                      );
                    }

                    )}
                  </li>
                  <li className='antColLg-12'>
                    <h1>Cast Details</h1>
                    {this.state.employees1.map((cast, index) => {
                      return (
                        <div>
                          <Col span={24}>

                            <Row>
                              <Col span={9}>
                                <img src={cast.imageUrl} width="80px" height="80px" />
                              </Col>
                              <Col span={13}>
                                <h3>Name: </h3>
                                <p>{cast.actorName}</p>
                                <h3>Role: </h3>
                                <p>{cast.dept}</p>
                              </Col>
                            </Row>
                          </Col>
                        </div>
                      );
                    }

                    )}
                  </li>
                </ul>
              </Row>
              <Button className="marginTop20" onClick={this.handleOk4} >OK</Button>
            </Modal>
          </div>
          <Modal
            title="cast Details"
            visible={this.state.visible3}
            onOk={this.handleOk3}
            onCancel={this.handleCancel3}
            footer={null}
          >
            <div className="txtCenter">

              <FormItem className={classnames('castimageUrl', { error: !!this.state.errors.castimageUrl })}>
                <div className='castImg'>

                  <Upload {...props}
                    className="avatar-uploader"
                    showUploadList={false}
                    onChange={this.handleChange20}
                    accept=".png,.jpg,.jpeg"
                  >
                    {
                      this.state.castimageUrl ?
                        <img src={this.state.castimageUrl} name="castimageUrl" alt="Cast Image" className="avatar" /> :
                        <Icon type="plus" className="avatar-uploader-trigger" />
                    }
                  </Upload>

                  <span>{this.state.errors.castimageUrl}</span>
                </div>
              </FormItem>
              <FormItem className={classnames('castname', { error: !!this.state.errors.castname })}>

                <Input placeholder="Cast Name " value={this.state.castname} name="castname" onChange={this.change5} />

                <span>{this.state.errors.castname}</span>
              </FormItem>
              <FormItem className={classnames('castrole', { error: !!this.state.errors.castrole })}>

                <Input placeholder=" Cast Role/ Designation" value={this.state.castrole} name="castrole" onChange={this.change6} />

                <span>{this.state.errors.castrole}</span>
              </FormItem>
              <Button onClick={this.handleOk3} >Ok</Button>
            </div>
          </Modal>
        </div>
        <div>
          <Modal
            title="crew Details"
            visible={this.state.visible2}
            onOk={this.handleOk2}
            onCancel={this.handleCancel2}
            footer={null}
          >
            <div className="txtCenter">

              <FormItem className={classnames('crewimageUrl', { error: !!this.state.errors.crewimageUrl })}>
                <div className='castImg'>

                  <Upload {...props}
                    className="avatar-uploader"
                    showUploadList={false}
                    onChange={this.handleChange17}
                    accept=".png,.jpg,.jpeg"
                  >
                    {
                      this.state.crewimageUrl ?
                        <img src={this.state.crewimageUrl} name="crewimageUrl" alt="Crew Image" className="avatar" /> :
                        <Icon type="plus" className="avatar-uploader-trigger" />
                    }
                  </Upload>

                  <span>{this.state.errors.crewimageUrl}</span>
                </div>
              </FormItem>
              <FormItem className={classnames('crewname', { error: !!this.state.errors.crewname })}>

                <Input placeholder=" Crew Name" value={this.state.crewname} name="crewname" onChange={this.change7} />

                <span>{this.state.errors.crewname}</span>
              </FormItem>
              <FormItem className={classnames('crewrole', { error: !!this.state.errors.crewrole })}>

                <Input placeholder=" Crew Role/ Designation" value={this.state.crewrole} name="crewrole" onChange={this.change8} />

                <span>{this.state.errors.crewrole}</span>
              </FormItem>
              <Button onClick={this.handleOk2} >Ok</Button>
            </div>
          </Modal>
        </div>
      </div>
    );
  };
}


export default Demo2;
/* eslint-disable */