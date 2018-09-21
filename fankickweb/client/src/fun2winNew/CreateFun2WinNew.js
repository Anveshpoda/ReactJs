/* eslint-disable */
import React from 'react';
import { browserHistory } from 'react-router';
import ReactTooltip from 'react-tooltip';
import $ from "jquery";
import axios from 'axios';
import css from './CreateFun2Win.css';
import Questions from './Question';
import { Form, Icon, Input, InputNumber, Button, Modal, Tabs, Select, Col, Row, Upload, message } from 'antd';
import Dashboard from '../Dashboard/Dashboard';
import SendForApproval from '../ApprovalCycle/sendforApproval';
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const { TextArea } = Input;
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
const dummyImageUrl = 'https://fankickdev.blob.core.windows.net/images/FSf1kFWw0Z.png';

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
let i = 0;
let uuid = 0;
var questions = [];
class CreateFun2WinNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      categories: [],
      subCategories: [],
      celebrities: [],
      celebrityName: '',
      categoryId: '',
      subCategoryId: '',
      title: '',
      fancoins: '',
      celebrity: '',
      description: '',
      duration: '',
      keyactive: '1',
      errors: {},
      editfun2win: {},
      contentPackQuestions: [],
      answer1: false,
      answer2: false,
      answer3: false,
      answer4: false,
      questiontype: '',
      editfunid: '',
      category: '',
      commentsCount: '',
      playedCount: '',
      viewsCount: '',
      likesCount: '',
      warningvisible: false,
      contentpacklength: 0,
      hideForm: true,
      hidenum: 1,
      disabled: false,
      freelancerId: null,
      createdPackId: ""
    }
    this.getcategories = this.getcategories.bind(this);
    this.bindSubCategories = this.bindSubCategories.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onsubCategoryChange = this.onsubCategoryChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleQuestionsChangeMulti = this.handleQuestionsChangeMulti.bind(this);
    this.handleQuestionsChangeGrid = this.handleQuestionsChangeGrid.bind(this);
    this.handleQuestionsChangePoll = this.handleQuestionsChangePoll.bind(this);
    this.handleQuestionsChangeComb = this.handleQuestionsChangeComb.bind(this);
    this.handleQuestionsChangeImage = this.handleQuestionsChangeImage.bind(this);
    this.handleSubmitContinue = this.handleSubmitContinue.bind(this);
    this.submitContentPack = this.submitContentPack.bind(this);
    this.back = this.back.bind(this);
    this.warningModal = this.warningModal.bind(this);
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    this.setState({ keyactive: '1' })
  }
  handleSubmitContinue(e, props) {
    e.preventDefault();
    let errors = {}
    // if (this.state.imageUrl === '' || this.state.imageUrl === undefined) errors.imageUrl = 'Image is Required'
    if (this.state.subCategoryId === '' || this.state.subCategoryId === undefined) errors.subCategoryId = "SubCategory is Required"
    if (this.state.categoryId === '') errors.category = "Category is Required"
    if (this.state.title.trim() === '' || this.state.title === undefined) errors.title = "Title is Required"
    if (this.state.celebrity.trim() === '' || this.state.celebrity === undefined) errors.celebrity = "Celebrity is Required"
    if (this.state.fancoins === '' || this.state.fancoins === undefined) errors.fancoins = "Enter Fan Coins"
    if (this.state.duration === '' || this.state.duration === undefined) errors.duration = "Enter Duration"
    this.setState({ errors });
    if (Object.keys(errors).length == 0) {
      this.setState({
        keyactive: '2'
      })
    }
  }
  warningModal = () => {
    this.setState({ warningvisible: true });
  }
  handleCancel = () => {
    this.setState({ warningvisible: false });
  }
  back = () => {
    browserHistory.push('/fun2win/fun2Winpage');
  }
  componentWillMount() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    this.setState({ usercredentials: user })
    var name = user.role.name;
    if (name === 'Freelancer') {
      var frelancerid = user._id
      this.setState({ freelancerId: frelancerid })

    }
    this.getcategories()
  }

  getcategories = () => {
    var instance = axios.create({
      headers: { 'x-access-token': sessionStorage.getItem('token') }
    });
    instance.get('/categories').then((response) => {
      this.setState({ categories: response.data.data });
    });
  }
  onCategoryChange(catId, event) {
    this.setState({
      categoryId: catId
    });
    this.bindSubCategories(catId);
  }
  bindSubCategories(category) {
    if (category) {
      this.state.errors.category = '';
      this.state.errors.subCategoryId = ''
    }
    var a = this.state.categories.map((categorydata) => {
      if (category === categorydata._id) {
        this.getCelebrities(categorydata.subCategories[0]._id);
        this.setState({
          subCategories: categorydata.subCategories,
          subCategoryId: categorydata.subCategories[0]._id,
          celebrity: ''
        })

      }
    })
  }
  getCelebrities = (subid) => {
    var _this = this;
    this.setState({ subId: subid });
    const url = process.env.REACT_APP_API_HOST + '/rest/getContentPacksCelebName?subCategoryId=' + subid;
    var request = new Request(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    });
    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        if (response.statusCode === 1) {
          _this.setState({ celebrities: response.data });
        }
        else {

        }
      })
  }
  onsubCategoryChange(value, event) {
    this.setState({
      subCategoryId: value,
      celebrity: ''
    });
    this.getCelebrities(value)
  }
  onCelebrityChange(value, event) {
    if (value) {
      this.state.errors.celebrity = ''
    }
    var _this = this;
    var celname = value;
    _this.setState({ celebrity: value });
  }

  add = (generatedkey) => {
    uuid++;
    i++;
    this.setState({
      divId: i
    })
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    form.setFieldsValue({
      keys: nextKeys,
    });
    $('#hidenum' + generatedkey).hide();
    $("#addQuestionblock").hide();
    $(".questionblock").show();
  }
  handleDurationChange = (time) => {
    if (this.state.duration !== '') this.state.errors.duration = ''
    this.setState({
      duration: time
    })
  }
  handleFanCoinsChange = (coins) => {
    if (this.state.fancoins !== '') this.state.errors.fancoins = ''
    this.setState({
      fancoins: coins
    })
  }
  handleChange = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      if (info.file.response.data !== '') this.state.errors.imageUrl = '';
      this.setState({
        imageUrl: info.file.response.data
      })
    }
  }
  handleInputChange(e) {
    if (this.state[e.target.name] === '') this.state.errors[e.target.name] = ''
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }
  remove = (k) => {
    i--;
    this.setState({
      divId: i
    })
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
    $("#addQuestionblock").show();
  }
  questionCategoryChange = (value) => {
    this.setState({ questiontype: value })
  }
  submitContentPack(e, props) {
    e.preventDefault();
    let errors = {}
    if (this.state.subCategoryId === '' || this.state.subCategoryId === undefined) errors.subCategoryId = "SubCategory is Required"
    if (this.state.categoryId === '') errors.category = "Category is Required"
    if (this.state.celebrity.trim() === '' || this.state.celebrity === undefined) errors.celebrity = "Celebrity is Required";
    this.setState({ errors });
    this.props.form.validateFields((err, values) => {
      if (!err && Object.keys(errors).length == 0) {
        if (this.state.contentPackQuestions.length > 0) {
          var message1 = false;
          for (let i = 0; i < this.state.contentPackQuestions.length; i++) {
            if (this.state.contentPackQuestions[i].editable === true) {
              message1 = true;
              message.info('Please save question');
              e.preventDefault();
            }
          }
          if (message1 === false) {
            let contentPack = {
              'name': this.state.title.trim(),
              'celebrityName': this.state.celebrity,
              'imageURL': this.state.imageUrl || dummyImageUrl,
              'description': this.state.description,
              'duration': this.state.duration,
              'points': this.state.fancoins,
              'createdDateTime': new Date().toISOString(),
              'modifiedDateTime': new Date().toISOString(),
              'categoryId': this.state.categoryId,
              'subCategoryId': this.state.subCategoryId,
              'isPublished': false,
              'isDeleted': false,
              'contentPackQuestions': this.state.contentPackQuestions,
              'isBranded': false,
              "createdBy": this.state.freelancerId,
              'brandText': "",
              'brandName': "",
              'brandAndroidUrl': "",
              'brandIosUrl': "",
              'brandWebUrl': "",
              'brandIconUrl': "",
            }
            this.saveContentPacks(contentPack);
          }
        }
        else {
          message.info('Publish Atleast One Content Pack');
          this.setState({ disabled: true })
        }
      }
    });
  }
  saveContentPacks = (data) => {
    var _this = this;
    const url = '/pack';
    var request = new Request(url, {
      method: 'Post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        'x-access-token': sessionStorage.token
      }
    });
    console.log("dataaaaaaaaa", data)
    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        if (response.status === 200) {
          message.success('Content Pack Created successfully!');
          //_this.refs.childss.approvalModal();
          browserHistory.push("/fun2win/fun2Winpage");
          questions = [];
          _this.setState({ contentpacklength: 0, createdPackId: response.data._id });
        }
        else if (response.status === 404) {
          message.error(`Please change fun2win title.`);
        } else {
          message.error(`Unable to Create Fun2win.`);
        }
      })
  }
  deletePack(packId, questionCategory) {
    var newPack = this.state.contentPackQuestions.filter((val) => { return val.id !== packId });
    var arr = [];
    for (let i = 0; i < newPack.length; i++) {
      var x = newPack[i];
      x.numElems = i;
      x.id = i;
      x.editable = false;
      x.dropdownshow = false;
      arr.push(x);
    }
    this.setState({ contentPackQuestions: arr })
  }
  retrievePack(packId) {
    var pack = this.state.contentPackQuestions.find(obj => { return obj.id === packId; });
    var idx = this.state.contentPackQuestions.indexOf(pack);
    return { "packId": idx, "object": pack };
  }
  updatemultiPack(packId, multiid, multiquestion, multioption1, multioption2, multioption3, multioption4, multiquestionType, multicorrectAnswer) {
    var pack = this.retrievePack(packId);
    pack.object.editable = false;
    pack.object._id = multiid;
    pack.object.name = multiquestion;
    pack.object.questionCategory = "Multiple",
      pack.object.option1 = multioption1;
    pack.object.option2 = multioption2;
    pack.object.option3 = multioption3;
    pack.object.option4 = multioption4;
    pack.object.questionType = multiquestionType;
    if (pack.object.questionType === 'Question') {
      pack.object.correctAnswer = multicorrectAnswer;
    } else if (pack.object.questionType === 'Opinion') {
      delete pack.object.correctAnswer;
    }
    pack.object.optionId1 = 1;
    pack.object.optionId2 = 2;
    pack.object.optionId3 = 3;
    pack.object.optionId4 = 4;
    pack.object.createdDateTime = new Date().toISOString();
    pack.object.modifiedDateTime = new Date().toISOString();

    var _packs = this.state.contentPackQuestions.slice();
    _packs[pack.packId] = pack.object;
    this.setState({ contentPackQuestions: _packs });
  }
  enableUpdatePack(packId) {
    var pack = this.retrievePack(packId);
    pack.object.editable = true;
    var _packs = this.state.contentPackQuestions.slice();
    _packs[pack.packId] = pack.object;
    this.setState({ contentPackQuestions: _packs });
  }
  updategridPack(packId, gridid, gridquestion, gridoption1, gridoption2, gridoption3, gridoption4, gridquestionType, gridcorrectAnswer) {
    var pack = this.retrievePack(packId);
    pack.object.editable = false;
    pack.object._id = gridid;
    pack.object.name = gridquestion;
    pack.object.questionCategory = "Grid",
      pack.object.option1 = gridoption1;
    pack.object.option2 = gridoption2;
    pack.object.option3 = gridoption3;
    pack.object.option4 = gridoption4;
    pack.object.questionType = gridquestionType;
    if (pack.object.questionType === 'Question') {
      pack.object.correctAnswer = gridcorrectAnswer;
    } else if (pack.object.questionType === 'Opinion') {
      delete pack.object.correctAnswer;
    }
    pack.object.optionId1 = 1;
    pack.object.optionId2 = 2;
    pack.object.optionId3 = 3;
    pack.object.optionId4 = 4;
    pack.object.createdDateTime = new Date().toISOString();
    pack.object.modifiedDateTime = new Date().toISOString();
    var _packs = this.state.contentPackQuestions.slice();
    _packs[pack.packId] = pack.object;
    this.setState({ contentPackQuestions: _packs });
  }
  updatepollPack(packId, pollid, pollquestion, pollimage, polloption1, polloption2) {
    var pack = this.retrievePack(packId);
    pack.object.editable = false;
    pack.object._id = pollid;
    pack.object.name = pollquestion;
    pack.object.imageUrl = pollimage
    pack.object.questionCategory = "Poll",
      pack.object.option1 = polloption1;
    pack.object.option2 = polloption2;
    pack.object.questionType = "Opinion";
    pack.object.optionId1 = 1;
    pack.object.optionId2 = 2;
    pack.object.createdDateTime = new Date().toISOString();
    pack.object.modifiedDateTime = new Date().toISOString();
    var _packs = this.state.contentPackQuestions.slice();
    _packs[pack.packId] = pack.object;
    this.setState({ contentPackQuestions: _packs });
  }
  updatecombiPack(packId, combinationid, combinationquestion, combinationimage, combinationoption1, combinationoption2, combinationoption3, combinationquestionType, combinationcorrectAnswer) {
    var pack = this.retrievePack(packId);
    pack.object.editable = false;
    pack.object._id = combinationid;
    pack.object.name = combinationquestion;
    pack.object.imageURL = combinationimage
    pack.object.questionCategory = "Combination",
      pack.object.option1 = combinationoption1;
    pack.object.option2 = combinationoption2;
    pack.object.option3 = combinationoption3;

    pack.object.questionType = combinationquestionType;
    if (pack.object.questionType === 'Question') {
      pack.object.correctAnswer = combinationcorrectAnswer;
    } else if (pack.object.questionType === 'Opinion') {
      delete pack.object.correctAnswer;
    }
    pack.object.optionId1 = 1;
    pack.object.optionId2 = 2;
    pack.object.optionId3 = 3;
    pack.object.createdDateTime = new Date().toISOString();
    pack.object.modifiedDateTime = new Date().toISOString();
    var _packs = this.state.contentPackQuestions.slice();
    _packs[pack.packId] = pack.object;
    this.setState({ contentPackQuestions: _packs });
  }
  updateimagePack(packId, imageid, imagequestion, imageimage, imageoption1, imageoption2, imageoption3, imagecorrectAnswer) {
    var pack = this.retrievePack(packId);
    pack.object.editable = false;
    pack.object._id = imageid;
    pack.object.name = imagequestion;
    pack.object.imageURL = imageimage
    pack.object.questionCategory = "Image",
      pack.object.option1 = imageoption1;
    pack.object.option2 = imageoption2;
    pack.object.option3 = imageoption3;
    pack.object.questionType = "Question";
    pack.object.correctAnswer = imagecorrectAnswer;
    pack.object.optionId1 = 1;
    pack.object.optionId2 = 2;
    pack.object.optionId3 = 3;
    pack.object.createdDateTime = new Date().toISOString();
    pack.object.modifiedDateTime = new Date().toISOString();
    var _packs = this.state.contentPackQuestions.slice();
    _packs[pack.packId] = pack.object;
    this.setState({ contentPackQuestions: _packs });
  }
  handleQuestionsChangeMulti = (multiquestionType1, multicorrectAnswer1, multiquestion1, multioption11, multioption22, multioption33, multioption44) => {
    var length = this.state.contentPackQuestions.length
    var numElems = length
    if (multiquestionType1 === "Question") {
      this.setState({
        contentPackQuestions:
        this.state.contentPackQuestions.concat(
          {
            "numElems": numElems, "id": numElems,
            "name": multiquestion1, "questionCategory": "Multiple",
            "option1": multioption11, "option2": multioption22,
            "option3": multioption33, "option4": multioption44,
            "questionType": multiquestionType1,
            "correctAnswer": multicorrectAnswer1,
            "optionId1": 1,
            "optionId2": 2,
            "optionId3": 3,
            "optionId4": 4,
            "createdDateTime": new Date().toISOString(),
            "modifiedDateTime": new Date().toISOString(),
            "editable": false
          })
      })

    } else if (multiquestionType1 === "Opinion") {
      this.setState({
        contentPackQuestions:
        this.state.contentPackQuestions.concat(
          {
            "numElems": numElems, "id": numElems,
            "name": multiquestion1, "questionCategory": "Multiple",
            "option1": multioption11, "option2": multioption22,
            "option3": multioption33, "option4": multioption44,
            "questionType": multiquestionType1,
            "optionId1": 1,
            "optionId2": 2,
            "optionId3": 3,
            "optionId4": 4,
            "createdDateTime": new Date().toISOString(),
            "modifiedDateTime": new Date().toISOString(),
            "editable": false
          })
      })

    }
    this.setState({ disabled: false })
    $(".questionblock").hide();
    $("#addQuestionblock").show();
  }
  handleQuestionsChangeGrid = (gridquestionType1, gridquestion1, gridoption11, gridoption22, gridoption33, gridoption44, gridcorrectAnswer1) => {
    var length = this.state.contentPackQuestions.length
    var numElems = length
    if (gridquestionType1 === "Question") {
      this.setState({
        contentPackQuestions:
        this.state.contentPackQuestions.concat(
          {
            "numElems": numElems, "id": numElems,
            "name": gridquestion1, "questionCategory": "Grid",
            "option1": gridoption11, "option2": gridoption22,
            "option3": gridoption33, "option4": gridoption44,
            "questionType": gridquestionType1,
            "correctAnswer": gridcorrectAnswer1,
            "optionId1": 1,
            "optionId2": 2,
            "optionId3": 3,
            "optionId4": 4,
            "createdDateTime": new Date().toISOString(),
            "modifiedDateTime": new Date().toISOString(),
            "editable": false
          })
      })

    } else if (gridquestionType1 === "Opinion") {
      this.setState({
        contentPackQuestions:
        this.state.contentPackQuestions.concat(
          {
            "numElems": numElems, "id": numElems,
            "name": gridquestion1, "questionCategory": "Grid",
            "option1": gridoption11, "option2": gridoption22,
            "option3": gridoption33, "option4": gridoption44,
            "questionType": gridquestionType1,
            "optionId1": 1,
            "optionId2": 2,
            "optionId3": 3,
            "optionId4": 4,
            "createdDateTime": new Date().toISOString(),
            "modifiedDateTime": new Date().toISOString(),
            "editable": false
          })
      })


    }
    this.setState({ disabled: false })
    $(".questionblock").hide();
    $("#addQuestionblock").show();
  }
  handleQuestionsChangePoll = (pollquestion1, pollimage1, polloption11, polloption22) => {
    var length = this.state.contentPackQuestions.length
    var numElems = length
    this.setState({
      contentPackQuestions:
      this.state.contentPackQuestions.concat(
        {
          "numElems": numElems, "id": numElems,
          "name": pollquestion1, "questionCategory": "Poll",
          'imageURL': pollimage1,
          "option1": polloption11, "option2": polloption22,
          "questionType": "Opinion",
          "optionId1": 1,
          "optionId2": 2,
          "createdDateTime": new Date().toISOString(),
          "modifiedDateTime": new Date().toISOString(),
          "editable": false
        })
    })
    this.setState({ disabled: false })
    $(".questionblock").hide();
    $("#addQuestionblock").show();
  }
  handleQuestionsChangeComb = (combinationquestion1, combinationimage1, combinationoption11, combinationoption22, combinationoption33, combinationquestionType1, combinationcorrectAnswer1) => {
    var length = this.state.contentPackQuestions.length
    var numElems = length
    if (combinationquestionType1 === "Question") {
      this.setState({
        contentPackQuestions:
        this.state.contentPackQuestions.concat(
          {
            "numElems": numElems, "id": numElems,
            "name": combinationquestion1, "questionCategory": "Combination",
            "option1": combinationoption11, "option2": combinationoption22,
            "option3": combinationoption33, "imageURL": combinationimage1,
            "questionType": combinationquestionType1,
            "correctAnswer": combinationcorrectAnswer1,
            "optionId1": 1,
            "optionId2": 2,
            "optionId3": 3,
            "createdDateTime": new Date().toISOString(),
            "modifiedDateTime": new Date().toISOString(),
            "editable": false
          })
      })

    } else if (combinationquestionType1 === "Opinion") {
      this.setState({
        contentPackQuestions:
        this.state.contentPackQuestions.concat(
          {
            "numElems": numElems, "id": numElems,
            "name": combinationquestion1, "questionCategory": "Combination",
            "option1": combinationoption11, "option2": combinationoption22,
            "option3": combinationoption33, "imageURL": combinationimage1,
            "questionType": combinationquestionType1,
            "optionId1": 1,
            "optionId2": 2,
            "optionId3": 3,
            "createdDateTime": new Date().toISOString(),
            "modifiedDateTime": new Date().toISOString(),
            "editable": false
          })
      })

    }
    this.setState({ disabled: false })
    $(".questionblock").hide();
    $("#addQuestionblock").show();
  }
  handleQuestionsChangeImage = (imagequestion1, imageimage1, imageoption11, imageoption22, imageoption33, imagecorrectAnswer1) => {
    var length = this.state.contentPackQuestions.length
    var numElems = length
    this.setState({
      contentPackQuestions:
      this.state.contentPackQuestions.concat(
        {
          "numElems": numElems, "id": numElems,
          "name": imagequestion1, "questionCategory": "Image",
          'imageURL': imageimage1,
          "option1": imageoption11, "option2": imageoption22,
          "option3": imageoption33,
          "correctAnswer": imagecorrectAnswer1,
          "questionType": "Question",
          "optionId1": 1,
          "optionId2": 2,
          "optionId3": 3,
          "createdDateTime": new Date().toISOString(),
          "modifiedDateTime": new Date().toISOString(),
          "editable": false
        })
    })
    this.setState({ disabled: false })
    $(".questionblock").hide();
    $("#addQuestionblock").show();
  }
  render() {
    console.log("this.state in crate fun2 win", this.state);
    const imageUrl = this.state.imageUrl;
    var contentPack = [];
    if (this.state.contentPackQuestions.length === 0) {
    } else {
      for (let key in this.state.contentPackQuestions) {
        var keyObj = this.state.contentPackQuestions[key];
        if (keyObj.questionCategory.trim() === "Multiple") {
          contentPack.push(<div>
            <Questions queueId={keyObj.id}
              counterid={key}
              dropdownshow={keyObj.dropdownshow}
              multiid={keyObj._id}
              questionCategory={keyObj.questionCategory}
              multiquestion={keyObj.name}
              multioption1={keyObj.option1}
              multioption2={keyObj.option2}
              multioption3={keyObj.option3}
              multioption4={keyObj.option4}
              multiquestionType={keyObj.questionType}
              multicorrectAnswer={keyObj.correctAnswer}
              onQuestionChange={this.handleQuestionsChangeMulti.bind(this)}
              onQuestionChange1={this.handleQuestionsChangeGrid.bind(this)}
              onQuestionChange2={this.handleQuestionsChangePoll.bind(this)}
              onQuestionChange3={this.handleQuestionsChangeComb.bind(this)}
              onQuestionChange4={this.handleQuestionsChangeImage.bind(this)}
              editable={keyObj.editable}
              fnRemove={this.deletePack.bind(this, keyObj.id)}
              fnEnableEdit={this.enableUpdatePack.bind(this, keyObj.id)}
              fnmultiEdit={this.updatemultiPack.bind(this)}
              />
          </div>);
        } else if (keyObj.questionCategory.trim() === "Grid") {
          contentPack.push(<div>
            <Questions queueId={keyObj.id}
              counterid={key}
              gridid={keyObj._id}
              dropdownshow={keyObj.dropdownshow}
              questionCategory={keyObj.questionCategory}
              gridquestion={keyObj.name}
              gridoption1={keyObj.option1}
              gridoption2={keyObj.option2}
              gridoption3={keyObj.option3}
              gridoption4={keyObj.option4}
              gridquestionType={keyObj.questionType}
              gridcorrectAnswer={keyObj.correctAnswer}
              onQuestionChange={this.handleQuestionsChangeMulti.bind(this)}
              onQuestionChange1={this.handleQuestionsChangeGrid.bind(this)}
              onQuestionChange2={this.handleQuestionsChangePoll.bind(this)}
              onQuestionChange3={this.handleQuestionsChangeComb.bind(this)}
              onQuestionChange4={this.handleQuestionsChangeImage.bind(this)}
              editable={keyObj.editable}
              fnRemove={this.deletePack.bind(this, keyObj.id)}
              fnEnableEdit={this.enableUpdatePack.bind(this, keyObj.id)}
              fngridEdit={this.updategridPack.bind(this)} />
          </div>);
        } else if (keyObj.questionCategory.trim() === "Poll") {
          contentPack.push(<div>
            <Questions queueId={keyObj.id}
              counterid={key}
              pollid={keyObj._id}
              dropdownshow={keyObj.dropdownshow}
              questionCategory={keyObj.questionCategory}
              pollquestion={keyObj.name}
              pollimage={keyObj.imageURL}
              polloption1={keyObj.option1}
              polloption2={keyObj.option2}
              pollquestionType={keyObj.questionType}
              onQuestionChange={this.handleQuestionsChangeMulti.bind(this)}
              onQuestionChange1={this.handleQuestionsChangeGrid.bind(this)}
              onQuestionChange2={this.handleQuestionsChangePoll.bind(this)}
              onQuestionChange3={this.handleQuestionsChangeComb.bind(this)}
              onQuestionChange4={this.handleQuestionsChangeImage.bind(this)}
              editable={keyObj.editable}
              fnRemove={this.deletePack.bind(this, keyObj.id)}
              fnEnableEdit={this.enableUpdatePack.bind(this, keyObj.id)}
              fnpollEdit={this.updatepollPack.bind(this)}
              />
          </div>);
        } else if (keyObj.questionCategory.trim() === "Combination") {
          contentPack.push(<div>
            <Questions queueId={keyObj.id}
              counterid={key}
              combinationid={keyObj._id}
              dropdownshow={keyObj.dropdownshow}
              questionCategory={keyObj.questionCategory}
              combinationquestion={keyObj.name}
              combinationimage={keyObj.imageURL}
              combinationoption1={keyObj.option1}
              combinationoption2={keyObj.option2}
              combinationoption3={keyObj.option3}
              combinationquestionType={keyObj.questionType}
              combinationcorrectAnswer={keyObj.correctAnswer}
              onQuestionChange={this.handleQuestionsChangeMulti.bind(this)}
              onQuestionChange1={this.handleQuestionsChangeGrid.bind(this)}
              onQuestionChange2={this.handleQuestionsChangePoll.bind(this)}
              onQuestionChange3={this.handleQuestionsChangeComb.bind(this)}
              onQuestionChange4={this.handleQuestionsChangeImage.bind(this)}
              editable={keyObj.editable}
              fnRemove={this.deletePack.bind(this, keyObj.id)}
              fnEnableEdit={this.enableUpdatePack.bind(this, keyObj.id)}
              fncombiEdit={this.updatecombiPack.bind(this)}
              />
          </div>);
        } else if (keyObj.questionCategory.trim() === "Image") {
          contentPack.push(<div>
            <Questions queueId={keyObj.id}
              counterid={key}
              imageid={keyObj._id}
              dropdownshow={keyObj.dropdownshow}
              questionCategory={keyObj.questionCategory}
              imagequestion={keyObj.name}
              imageimage={keyObj.imageURL}
              imageoption1={keyObj.option1}
              imageoption2={keyObj.option2}
              imageoption3={keyObj.option3}
              imagequestionType={keyObj.questionType}
              imagecorrectAnswer={keyObj.correctAnswer}
              onQuestionChange={this.handleQuestionsChangeMulti.bind(this)}
              onQuestionChange1={this.handleQuestionsChangeGrid.bind(this)}
              onQuestionChange2={this.handleQuestionsChangePoll.bind(this)}
              onQuestionChange3={this.handleQuestionsChangeComb.bind(this)}
              onQuestionChange4={this.handleQuestionsChangeImage.bind(this)}
              editable={keyObj.editable}
              fnRemove={this.deletePack.bind(this, keyObj.id)}
              fnEnableEdit={this.enableUpdatePack.bind(this, keyObj.id)}
              fnimageEdit={this.updateimagePack.bind(this)}
              />
          </div>);
        }
      }
    }
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    const mapCategories = this.state.categories.map((category) => <Option value={category._id}>{category.name}</Option>);
    for (let key in this.state.categories) {
      var categorydata = this.state.categories[key];
      if (categorydata._id === this.state.categoryId) {
        this.state.subCategories = categorydata.subCategories
      }
    }
    const mapSubCategories = this.state.subCategories.map((subCategory) => <Option value={subCategory._id}>{subCategory.name}</Option>);
    const mapCelebrities = this.state.celebrities.map((celebrity) => <Option value={celebrity.celebrityName}>{celebrity.celebrityName}</Option>);
    var generatedkey = 0;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      generatedkey = k;
      return (
        <div id={"hidenum" + generatedkey}>

          <Form className="QuestionsFormheight"
            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel) }
            label={index === 0 ? 'Questions' : ''}
            required={false}
            key={k}
            style={{ border: '1px solid #f0f0f0', padding: 10, margin: 10 }} handleQuestionsChangePoll
            >
            <Questions dropdownshow={false}
              queueId={k} questionCategory={this.state.category}
              onQuestionChange={this.handleQuestionsChangeMulti.bind(this)}
              onQuestionChange1={this.handleQuestionsChangeGrid.bind(this)}
              onQuestionChange2={this.handleQuestionsChangePoll.bind(this)}
              onQuestionChange3={this.handleQuestionsChangeComb.bind(this)}
              onQuestionChange4={this.handleQuestionsChangeImage.bind(this)}>
            </Questions>
            <div>
              <span className="optionBlock">
              </span>
            </div>
          </Form>
        </div>
      );
    });
    return (
      <Dashboard>
        <div>
          <Row className="Createfun2winsubmenu">
            <Col span={4} className="margincatgry1">
              <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                showSearch
                style={{ width: "100%" }}
                placeholder="Select Category"
                value={this.state.categoryId || undefined}
                onChange={(value, event) => this.onCategoryChange(value, event)}
                >
                {mapCategories}
              </Select>
              <p className="createerror">{this.state.errors.category}</p>
            </Col>
            <Col span={4} className="margincatgry1">
              <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                showSearch
                style={{ width: "100%" }}
                placeholder="Select Sub-category"
                value={this.state.subCategoryId || undefined}
                onSelect={(value, event) => this.onsubCategoryChange(value, event)}
                >
                {mapSubCategories}
              </Select>
              <p className="createerror">{this.state.errors.subCategoryId}</p>
            </Col>
            <Col span={4} className="margincatgry1">
              <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                showSearch
                placeholder="Select Celebrity"
                style={{ width: "100%" }}
                value={this.state.celebrity || undefined}
                onChange={(value, event) => this.onCelebrityChange(value, event)}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                {mapCelebrities}
              </Select>
              <p className="createerror">{this.state.errors.celebrity}</p>
            </Col>
            <Col span={8} className="margincatgrybtn funeditbtnu">
              <Button type="primary" className='createFun2Win' onClick={() => this.warningModal()}> <Icon type="arrow-left" />Back to Fun2Win</Button>
            </Col>
          </Row>

          <Row>
            <Col span={24} className="CreatefunwinBodycard">
              <Tabs defaultActiveKey="1" onChange={this.callback} activeKey={this.state.keyactive} >
                <TabPane tab="FUN2WIN DETAILS & MEDIA" key="1">
                  <Form>
                    <Row>
                      <Col span={14} className="">
                        <FormItem>
                          <h6 className='h6Fnt'><span className="RedStar">*</span>Fun2Win Title    </h6>
                          <Input placeholder="Enter contestTitle" autoComplete={'off'} maxLength={70} name="title" value={this.state.title} onChange={this.handleInputChange} />
                          <span className="createerror">{this.state.errors.title}</span>
                        </FormItem>
                      </Col>
                      <Col span={1}>
                        <span>
                          <a data-tip data-for='global'>  <Icon className="mrgnIconleft468" type="exclamation-circle-o" /> </a>
                          <ReactTooltip id='global' aria-haspopup='true' role='example'>
                            <ol>
                              <li>  1. This will appear as a heading for your Fun2Win challenge</li>
                              <li>2. Length should not exceed 70 characters (With spaces)</li>
                            </ol>
                          </ReactTooltip>

                        </span>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={14} className="">
                        <FormItem>
                          <h6 className='h6Fnt'>Description (optional)</h6>
                          <TextArea rows={3} value={this.state.description} maxLength={150} name="description" placeholder="Challenge Description" onChange={this.handleInputChange} />
                        </FormItem>
                      </Col>
                      <Col>
                        <span>
                          <a data-tip data-for='global'>  <Icon className="mrgnIconleft468" type="exclamation-circle-o" /> </a>
                          <ReactTooltip id='global' aria-haspopup='true' role='example'>
                            <ol>
                              <li>  1. Description is optional for any Fun2Win</li>
                              <li>2. Length should not exceed 150 characters (With spaces)</li>
                            </ol>
                          </ReactTooltip>
                        </span>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={3} className="">
                        <FormItem>
                          <h6 className='h6Fnt'><span className="RedStar">*</span> Fan Coins</h6>
                          <InputNumber min={1} max={1000} placeholder="FanCoins Awarded" name="fancoins" value={this.state.fancoins} onChange={this.handleFanCoinsChange} />
                          <p className="createerror">{this.state.errors.fancoins}</p>
                        </FormItem>
                      </Col>
                      <Col span={3} className="marginLeft20">
                        <FormItem>
                          <h6 className='h6Fnt'><span className="RedStar">*</span> Duration <span>(Sec)</span></h6>
                          <InputNumber min={1} max={1000} placeholder="Duration" name="duration" value={this.state.duration} onChange={this.handleDurationChange} />
                          <p className="createerror">{this.state.errors.duration}</p>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={5} className="">
                        <FormItem>
                          <h6 className='h6Fnt'><span className="RedStar">*</span>  Add Banner Image</h6>
                          <Upload {...props}
                            className="avatar-uploader"
                            showUploadList={false}
                            onChange={this.handleChange}
                            accept=".png,.jpg,.jpeg"
                            >
                            {
                              imageUrl ?
                                <img src={imageUrl} alt="" className="avatar" /> :
                                <Icon type="picture" className="avatar-uploader-trigger" />
                            }
                          </Upload>
                          <span className="createerror">{this.state.errors.imageUrl}</span>
                        </FormItem>
                      </Col>

                    </Row>
                    <Row>
                      <Col span={5} className="btnRight">
                        <Button type="primary" className='createFun2Win' onClick={this.handleSubmitContinue.bind(this)}>Save and Next</Button>
                      </Col>
                    </Row>
                  </Form>

                </TabPane>
                <TabPane tab="ADD QUESTIONS" key="2">
                  {contentPack}
                  <Row>
                    <Form className="QuestionMainForm">
                      <span className="questionblock">
                        {formItems}
                      </span>
                      <Button type="primary" onClick={this.add.bind(this, generatedkey)} id='addQuestionblock'>
                        <Icon type="plus-circle" /> Add New</Button>
                      <Row>
                        <Col span={5} className="btnRight">
                          <Button type="primary" className='createFun2Win' onClick={this.submitContentPack.bind(this)} disabled={this.state.disabled} >Create Fun2 Win</Button>
                          <SendForApproval ref="childss" module="ContentPack" packId={this.state.createdPackId} packName={this.state.title} />
                        </Col>
                      </Row>
                    </Form>
                  </Row>
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </div>
        <div>
          <Modal
            className="editFun2winModal"
            title="Warning"
            visible={this.state.warningvisible}
            onCancel={this.handleCancel}
            footer={null}
            >
            <p className="margnBottom20">Are you sure you want to leave this page?</p>
            <FormItem>
              <Button onClick={this.back}>Yes </Button>
              <Button onClick={this.handleCancel} className="margnLeft20">No </Button>
            </FormItem>
          </Modal>
        </div>
      </Dashboard>
    );
  };
}


const CreateFun2Win = Form.create()(CreateFun2WinNew);
export default CreateFun2Win;
/* eslint-disable */