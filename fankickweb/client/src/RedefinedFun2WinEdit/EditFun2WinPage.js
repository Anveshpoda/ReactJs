import React from 'react';
import axios from "axios";
import { Link } from 'react-router';
import Dashboard from '../Dashboard/Dashboard';
import './editFun2Win.css';
import Questions from './Questions';
import ReactTooltip from 'react-tooltip';
import { browserHistory } from 'react-router';
import { Col, Checkbox, Row, Form, Icon, Input, Button, InputNumber, Select, message, Upload, Tabs } from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;


function callback(key) {
  console.log(key);
}


class EditFun2WinPage extends React.Component {

  constructor(props) {
    super(props);
    // this.newTabIndex = 4;
    const panes = [
      {
        title: 'Q.1',
        key: 'Question1'
      }
    ];
    this.state = {
      activeKey: panes[0].key,
      panes,
      packId: '',
      categories: [],
      subCategories: [],
      celebrities: [],
      celebrity: '',
      subCategoryId: '',
      errors: {},
      difficultyLevel: '',
      hasGoodies: false,
      title: '',
      fancoins: '',
      duration: '',
      bonuscoins: '',
      Fun2WinImageUrl: '',
      newTabIndex: 1,
      // fileList: [{
      //   uid: -1,
      //   name: "https://fankickdev.blob.core.windows.net/images/3HlrM94x61.m4a",
      //   status: 'done',
      //   url: "https://fankickdev.blob.core.windows.net/images/3HlrM94x61.m4a"
      // }]
      fileList: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }


  componentWillMount() {
    // console.log(this.props.params.id, '<----')
    const user = JSON.parse(sessionStorage.getItem('user'));
    this.setState({ usercredentials: user })
    var name = user.role.name;
    if (name === 'Freelancer') {
      var frelancerid = user._id
      this.setState({ freelancerId: frelancerid })
    }
    this.getcategories()
    this.getPackDetails(this.props.params.id)
  }
  componentWillUpdate() {
    console.log("updated ...?")
  }
  getcategories = () => {
    var instance = axios.create({
      headers: { 'x-access-token': sessionStorage.token }
    });
    instance.get('/categories').then((response) => {
      this.setState({ categories: response.data.data });
    });
  }
  getPackDetails = (id) => {
    var _this = this;
    var instance = axios.create({
      headers: { 'x-access-token': sessionStorage.token }
    });
    instance.get('/get-pack/' + id).then((response) => {
      this.bindSubCategories(response.data.data.categoryId)
      this.getCelebrities(response.data.data.subCategoryId)

      ///
      response.data.data.contentPackQuestions.map((element, index) => {
        let tempArray = [];
        if (element.video != undefined) {
          this.setState({
            ['playerStartTimeQuestion' + (index + 1)]: element.video.startTime,
            ['playerStopTimeQuestion' + (index + 1)]: element.video.endTime
          })
        }
        if (element.mediaType == "audio") {
          this.setState({
            ["fileListQuestion"+(index + 1)]: [{
              uid: -1,
              name: element.mediaURL,
              status: 'done',
              url: element.mediaURL
            }]
          })
        }
        element.subQuestions.map((record, index) => {
          let obj = {
            "name": record.name,
            "answerType": record.answerType,
            "correctAnswer": record.correctAnswer,
            "optionMediaType": record.optionMediaType,
            "options": record.options,
            "optionsType": record.optionsType,
            "_id": record._id
          };
          tempArray.push(obj)
        })
        if (element.subQuestions.length === tempArray.length) {
          this.setState({
            ['Question' + (index + 1)]: tempArray,
          })
        }
      })

      this.setState({
        packId: response.data.data._id,
        createdDateTime: response.data.data.createdDateTime,
        difficultyLevel: response.data.data.level,
        categoryId: response.data.data.categoryId,
        // subCategoryId: response.data.data.subCategoryId,
        title: response.data.data.name,
        duration: response.data.data.duration,
        fancoins: response.data.data.points,
        Fun2WinImageUrl: response.data.data.imageURL,
        hasGoodies: response.data.data.hasGoodies,
        bonuscoins: response.data.data.hasGoodies ? response.data.data.goodieCoins : '',
        newTabIndex: response.data.data.contentPackQuestions.length,
        panes: response.data.data.contentPackQuestions.map((element, index) => {
          this.setState({
            ['questionMediaTypeQuestion' + (index + 1)]: element.mediaType,
            ["mediaURLQuestion" + (index + 1)]: element.mediaURL,
          })
          if (element.mediaType === "video") {

            return ({
              key: "Question" + (index + 1),
              mediaURL: element.mediaURL,
              subQuestions: element.subQuestions
            })
          } else {
            return ({
              key: "Question" + (index + 1),
              subQuestions: element.subQuestions
            })
          }
        })

      })
      return response.data.data;
    }).then(function(result){
      _this.setState({
        subCategoryId: result.subCategoryId,
        celebrity: result.celebrityName,
      })
    });
  }

  onTabChange = (activeKey) => {
    this.setState({
      activeKey,
      panes: this.state.panes
    });
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }
  add = () => {
    const panes = this.state.panes;
    const activeKey = `Question${++this.state.newTabIndex}`;
    panes.push({ title: `Q.${this.state.panes.length + 1}`, key: activeKey });
    this.setState({ panes, activeKey });
  }
  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
    console.log(this.state)
  }


  handleMediaChange = (mediaURL, info) => {
    /**For Audio Type Media Change */
    if (info.file.type === "audio/mp3" || info.file.type === "audio/x-m4a") {
      let filesListName = mediaURL.substring(8, mediaURL.length)
      console.log(filesListName, 'filesListName')
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
      this.setState({ ['fileList'+filesListName]: fileList });
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        if (info.file.response.data !== '') this.state.errors[mediaURL] = '';
        this.setState({
          [mediaURL]: info.file.response.data,
          ['fileList'+filesListName]: [{
            uid: -1,
            name: info.file.response.data,
            status: 'done',
            url: info.file.response.data
          }],

        })
      }
    }

    /**For Image Type Media Change */
    if (info.file.type === "image/png" || info.file.type === "image/jpeg" || info.file.type === "image/jpg") {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        if (info.file.response.data !== '') this.state.errors[mediaURL] = '';
        this.setState({
          [mediaURL]: info.file.response.data
        })
      }
    }

  }


  onCategoryChange = (catId) => {
    if (catId) this.state.errors['categoryId'] = ''
    if (catId) this.state.errors['subCategoryId'] = ''
    this.setState({
      categoryId: catId
    })
    this.bindSubCategories(catId);
  }

  bindSubCategories(category) {
    this.state.categories.map((categorydata) => {
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

  onSubCategoryChange = (e) => {
    this.setState({
      subCategoryId: e,
      celebrity: ''
    });
    this.getCelebrities(e)
  }

  getCelebrities = (subid) => {
    var _this = this;
    const url = '/celebrity-by-subcategory/' + subid;
    var request = new Request(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'x-access-token': sessionStorage.token
      }
    });
    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        if (response.status === 200) {
          _this.setState({ celebrities: response.data });
        }
        else {

        }
      })
  }

  onCelbrityChange = (e) => {
    if (e && this.state.errors['celebrity']) this.state.errors['celebrity'] = ''
    this.setState({
      celebrity: e
    })
    console.log(this.state, 'State Value', e)
  }

  onDropDownChange = (key, e) => {
    if (e && this.state.errors['difficultyLevel']) this.state.errors['difficultyLevel'] = ''
    this.setState({
      [key]: e
    })
  }

  handleInputChange(e) {
    if (this.state[e.target.name] && this.state.errors[e.target.name]) this.state.errors[e.target.name] = ''
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onPlayerDurationChange = (time, e) => {
    if (time) this.state.errors[time] = ''
    this.setState({
      [time]: e
    })
  }

  handleFanCoinsChange = (coins) => {
    if (this.state.fancoins !== '') this.state.errors.fancoins = ''
    this.setState({
      fancoins: coins
    })
  }

  handleDurationChange = (time) => {
    if (this.state.duration !== '') this.state.errors.duration = ''
    this.setState({
      duration: time
    })
  }
  handleBonusFanCoins = (coins) => {
    if (this.state.bonuscoins !== '') this.state.errors.bonuscoins = ''
    this.setState({
      bonuscoins: coins
    })
  }

  onCheckBoxChange = (e) => {
    if (e && this.state.difficultyLevel === 'RAPID-FIRE') {
      this.setState({
        [e.target.name]: e.target.checked
      })
    }
  }
  saveSubQuestionPacks = (packs, packnumber) => {
    let errors = {}
    // console.log(packs, '1542', '---', packnumber)
    if (this.state['questionMediaType' + packnumber] === "video") {
      if (this.state['mediaURL' + packnumber] === '' || this.state['mediaURL' + packnumber] === undefined) errors['mediaURL' + packnumber] = "URL Field Cannot Be empty"
      if (this.state['playerStartTime' + packnumber] === '' || this.state['playerStartTime' + packnumber] === undefined) errors['playerStartTime' + packnumber] = "Start Time Cannot Be Empty"
      if (this.state['playerStopTime' + packnumber] === '' || this.state['playerStopTime' + packnumber] === undefined) errors['playerStopTime' + packnumber] = "Stop Time Cannot Be Empty"
    }
    else if (this.state['questionMediaType' + packnumber] === "image") {
      if (this.state['mediaURL' + packnumber] === '' || this.state['mediaURL' + packnumber] === undefined) errors['mediaURL' + packnumber] = "Image Cannot be left Empty"
    }
    else if (this.state['questionMediaType' + packnumber] === "audio") {
      if (this.state['mediaURL' + packnumber] === '' || this.state['mediaURL' + packnumber] === undefined) errors['mediaURL' + packnumber] = "Audio File Cannot Be empty"
    } else if (this.state['questionMediaType' + packnumber] === "text") {
      if (packs[0].mediaURL) {
        this.setState({
          ['mediaURL' + packnumber]: packs[0].mediaURL
        })
        delete packs[0].mediaURL
      }

    }
    this.setState({ errors })
    if (Object.keys(errors).length === 0) {
      message.success(`Question Saved Successfully`)
      this.setState({
        [packnumber]: packs
      })

    }
  }

  saveContentPack = (e) => {
    let errors = {}
    let contentPackQuestions = []
    if (this.state.difficultyLevel === '' || this.state.difficultyLevel === undefined) {
      errors['difficultyleveL'] = "Select Difficulty level"
      message.info(`Select Difficulty level`)
    }
    if (this.state.celebrity.trim() === '' || this.state.celebrity === undefined) errors['celebrity'] = 'Select Celebrity'
    if (this.state.categoryId === '' || this.state.categoryId === undefined) errors['categoryId'] = 'Select Category'
    if (this.state.subCategoryId === '' || this.state.subCategoryId === undefined) errors['subCategoryId'] = 'Select SubCategory'
    if (this.state.title.trim() === '' || this.state.title === undefined) errors['title'] = 'Select Title'
    if (this.state.duration === '' || this.state.duration === undefined) errors['duration'] = 'Select duration'
    if (this.state.fancoins === '' || this.state.fancoins === undefined) errors['fancoins'] = 'Select fancoins'
    if (this.state.Fun2WinImageUrl === '' || this.state.Fun2WinImageUrl === undefined) errors['Fun2WinImageUrl'] = 'Upload Banner Image'
    if (this.state.panes.length === 0) errors['Questions'] = 'Minimum No of Questions Needed to create a pack'
    if (this.state.panes.map((element) => {
      if (this.state[element.key] === '' || this.state[element.key] === undefined) errors['ques'] = 'Need atleast minimum no. of questions to create a pack '
      // if (this.state[element.mediaURL] === '') errors['mediaURL' + element.key] = "URL Field Cannot Be empty"
    }))
      this.setState({ errors })
    if (Object.keys(errors).length === 0) {
      this.state.panes.map((element) => {
        if (this.state[element.key]) {
          let video = {}
          if (this.state['questionMediaType' + element.key] === "video") {
            video.startTime = this.state['playerStartTime' + element.key]
            video.endTime = this.state['playerStopTime' + element.key]
          }
          // console.log(video, 'VideoObject')
          let packs = {
            mediaType: this.state['questionMediaType' + element.key],
            mediaURL: this.state['mediaURL' + element.key],
            video: video,
            subQuestions: this.state[element.key]
          }
          contentPackQuestions.push(packs)
        }
        // console.log(contentPackQuestions, 'conteaskjdjsakdsajdhsadhsajdsajdsahjdsahjdsajdhsdhsajd')
      })
      let contentPack = {
        'name': this.state.title.trim(),
        'celebrityName': this.state.celebrity,
        'imageURL': this.state.Fun2WinImageUrl,
        'description': '',
        'duration': this.state.duration,
        'points': this.state.fancoins,
        'createdDateTime': this.state.createdDateTime,
        'modifiedDateTime': new Date().toISOString(),
        'categoryId': this.state.categoryId,
        'subCategoryId': this.state.subCategoryId,
        'isPublished': false,
        'isDeleted': false,
        'contentPackQuestions': contentPackQuestions,
        'isBranded': false,
        "createdBy": this.state.usercredentials._id,
        'level': this.state.difficultyLevel,
        'brandText': "",
        'brandName': "",
        'brandAndroidUrl': "",
        'brandIosUrl': "",
        'brandWebUrl': "",
        'brandIconUrl': "",
        'isRapidFire': this.state.difficultyLevel === 'RAPID-FIRE' ? true : false,
        'hasGoodies': this.state.hasGoodies || false,
        "goodieCoins": this.state.hasGoodies ? this.state.bonuscoins : 0
      }
      // console.log(contentPack)
      this.createContentPack(contentPack)
    }
    else{
      message.info(`You have unsaved items, unable to create content pack`)
    }

  }
  createContentPack = (data) => {
    var _this = this;
    const url = '/update-pack/' + this.state.packId;
    var request = new Request(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        'x-access-token': sessionStorage.token
      }
    });
    // console.log("dataaaaaaaaa", data)
    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        if (response.status === 200) {
          message.success('Content Pack Updated successfully!');
          //_this.refs.childss.approvalModal();
          browserHistory.push("/fun2WinRedefinedpage");
          _this.setState({ contentpacklength: 0, createdPackId: response.data._id });
        }
        else if (response.status === 404) {
          message.error(`Please change fun2win title.`);
        } else {
          message.error(`Unable to Edit Fun2win.`);
        }
      })
  }
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} className="IconPlusTheme" />
        <div className="ant-upload-text">Add Image</div>
      </div>
    );

    const Fun2WinImageUrl = this.state.Fun2WinImageUrl;
    // console.log(this.state.panes, '<--Panes')

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

    var mapCategories = this.state.categories.map((category) => <Option value={category._id}>{category.name}</Option>);
    var mapsubCategories = this.state.subCategories.map((subcategory) => <Option value={subcategory._id}>{subcategory.name}</Option>);
    var mapCelebrities = this.state.celebrities.map((celebrity) => <Option value={celebrity.celebrityName}>{celebrity.celebrityName}</Option>);


    return (
      <Dashboard>
        <div className="paddingLeft20">
          <Row className="">
            <Col span={24} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} className='challengesmenu'>
              <div className="fun2winSubMenu redfun2winsubmenu">
                <Col span={2} sm={{span:4}} lg={{span:3}} xl={{span:2}}><h2 className="fun2winpageTitle">Edit Fun2Win</h2></Col>
                <Col span={4} className='fun2winSelect fun2winSelectcategry4'>
                  <Select
                    showSearch getPopupContainer={triggerNode => triggerNode.parentNode}
                    style={{ width: '100%' }}
                    placeholder="Select Category"
                    value={this.state.categoryId || undefined}
                    optionFilterProp="children"
                    onChange={this.onCategoryChange.bind(this)}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {mapCategories}
                  </Select>
                  <p style={{ color: "red" }} className="Error">{this.state.errors['categoryId']}</p>

                </Col>
                <Col span={4} className='fun2winSelect fun2winSelectcategry1'>

                  <Select
                    showSearch getPopupContainer={triggerNode => triggerNode.parentNode}
                    style={{ width: '100%' }}
                    placeholder="Select Sub-Category"
                    optionFilterProp="children"
                    value={this.state.subCategoryId || undefined}
                    onChange={this.onSubCategoryChange.bind(this)}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {mapsubCategories}
                  </Select>
                  <p style={{ color: "red" }} className="Error">{this.state.errors['subCategoryId']}</p>

                </Col>
                <Col span={4} className='fun2winSelect fun2winSelectcategry2'>

                  <Select
                    showSearch getPopupContainer={triggerNode => triggerNode.parentNode}
                    style={{ width: '100%' }}
                    placeholder="Select Celebrity"
                    optionFilterProp="children"
                    onChange={this.onCelbrityChange.bind(this)}
                    value={this.state.celebrity || undefined}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {mapCelebrities}
                  </Select>
                  <p style={{ color: "red" }} className="Error">{this.state.errors['celebrity']}</p>
                </Col>
                <Col span={5} className="fun2winmainheader redfun2winmainheader">
                       <nav className='createfun2winNavigations' role="navigation">
           {/*         <Link to="/fun2WinRedefinedpage" className='item' activeClassName='active'>All</Link>
                    <Link to="/fun2WinRedefinedpage/RunningRedefinedFun2Win" className='item' activeClassName='active'>Live</Link>
                    <Link to="/fun2WinRedefinedpage/QueuedRedefinedFun2Win" className='item' activeClassName='active'>Queued</Link>
                    <Link to="/fun2WinRedefinedpage/ClosedRedefinedFun2Win" className='item' activeClassName='active'>Closed</Link>*/}
                    <Link to="/fun2WinRedefinedpage"> <Button type="primary" className='createFun2WinBtn mrgLeft30'>Back To dashboard</Button></Link>
                  </nav>
                </Col>
              </div>
            </Col>
          </Row>
        </div>
        <div>

        </div>

        <div>

          <Row>
            <Col span={16} sm={{ span: 22 }} xs={{ span: 20 }} lg={{ span: 19 }} xl={{ span: 16 }}>
              <div className="CreatefunwinBlock">

                <Tabs defaultActiveKey="1" onChange={callback} className="QuestionTab">
                  <TabPane tab="Add Questions" key="1">
                    <Row>
                      <Col span={24}>
                        <Col span={6}>
                          <FormItem label="Set Difficulty Type">
                            <Select
                              showSearch getPopupContainer={triggerNode => triggerNode.parentNode}
                              style={{ width: '160' }}
                              placeholder="Difficulty Level"
                              optionFilterProp="children"
                              onChange={this.onDropDownChange.bind(this, "difficultyLevel")}
                              value={this.state.difficultyLevel || undefined}
                              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                              <Option value="EASY">Easy</Option>
                              <Option value="MEDIUM">Medium</Option>
                              <Option value="HARD">Hard</Option>
                              <Option value="RAPID-FIRE">Rapid Fire</Option>
                            </Select>
                            <p style={{ color: "red" }} className="Error">{this.state.errors['difficultyLevel']}</p>
                          </FormItem>
                        </Col>
                      </Col>
                    </Row>

                    <div className="Redfunmainadd">
                      <ul className="list-inline">
                        <li className="ant-col-18">
                          <p> Main Questions Added - {this.state.panes.length}</p>
                        </li>
                        <li className="ant-col-6">
                          <div>
                            <Button className="RightAlignButn AddmoreBtn" onClick={this.add.bind(this)}>Add New Question</Button>
                          </div>
                        </li>
                      </ul>
                      <Col span={24} >
                        <Tabs className="QuestionTab"
                          hideAdd
                          onChange={this.onTabChange}
                          activeKey={this.state.activeKey}
                          type="editable-card"
                          onEdit={this.onEdit}
                        >

                          {this.state.panes.map((pane, index) => <TabPane tab={"Q." + (index + 1)} key={pane.key}>
                            <Row>
                              <Col span={24}>
                                <div className="Redfun2winQuestionTypeedit">
                                  <Col xs={12} sm={12} xl={4} lg={6} md={4}>
                                    <FormItem label="Select Question Type">
                                      <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                        showSearch
                                        style={{ width: '100%' }}
                                        placeholder="Select"
                                        optionFilterProp="children"
                                        onChange={this.onDropDownChange.bind(this, "questionMediaType" + pane.key)}
                                        value={this.state["questionMediaType" + pane.key] || undefined}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                      >
                                        <Option value="image">Image</Option>
                                        <Option value="video">Video</Option>
                                        <Option value="audio">Audio</Option>
                                        <Option value="text">Text</Option>
                                      </Select>
                                    </FormItem>
                                  </Col>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              {this.state["questionMediaType" + pane.key] ? (<div>
                                {this.state["questionMediaType" + pane.key] === 'image' ? (<div>
                                  <Row>
                                    <Col span={24} className="Redfun2winquestionsmedas">
                                      <Col xs={12} sm={12} xl={4} lg={6} md={4}>
                                        <FormItem>
                                          <h6 className='h6Fnt'><span className="RedStar">*</span>  Add Banner Image</h6>
                                          <Upload {...props}
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            onChange={this.handleMediaChange.bind(this, "mediaURL" + pane.key)}
                                            accept=".png,.jpg,.jpeg"
                                          >
                                            {
                                              this.state["mediaURL" + pane.key] ?
                                                <img src={this.state["mediaURL" + pane.key]} alt="" className="avatar" /> :
                                                <Icon type="picture" className="avatar-uploader-trigger" />
                                            }
                                          </Upload>
                                          <p style={{ color: "red" }} className="Error">{this.state.errors['mediaURL' + pane.key]}</p>
                                        </FormItem>
                                      </Col>
                                    </Col>

                                  </Row>
                                  <Row>
                                    {/* <Questions questionCategory={'image'} questionId={pane.key} subQuestions={pane.subQuestions} saveSubQuestionPacks={this.saveSubQuestionPacks.bind(this)} /> */}
                                    <Questions questionCategory={'image'} questionId={pane.key} subQuestions={this.state[pane.key]} saveSubQuestionPacks={this.saveSubQuestionPacks.bind(this)} />
                                  </Row>
                                </div>) : null}
                                {this.state["questionMediaType" + pane.key] === 'video' ? (<div>
                                  <Row>
                                    <Col span={24} className="Redfun2winquestionsmedas">
                                      <Col span={7}>
                                        <FormItem label="Enter Youtube Video URL">
                                          <Input name={"mediaURL" + pane.key} value={this.state['mediaURL' + pane.key]} onChange={this.handleInputChange} />
                                        </FormItem>
                                        <p style={{ color: "red" }} className="Error">{this.state.errors['mediaURL' + pane.key]}</p>
                                      </Col>
                                      <Col span={2}>
                                      </Col>
                                      <Col span={14}>
                                        <FormItem label="Player start and End time">
                                          <InputNumber min={0} max={200000} value={this.state['playerStartTime' + pane.key]} onChange={this.onPlayerDurationChange.bind(this, "playerStartTime" + pane.key)} />  <span className="paddingLftRht15"> To  </span> <InputNumber min={0} max={200000} value={this.state['playerStopTime' + pane.key]} onChange={this.onPlayerDurationChange.bind(this, "playerStopTime" + pane.key)} />
                                          <span className="paddingLftRht15"> Seconds</span>
                                          <p style={{ color: "red" }} className="Error">{this.state.errors['playerStartTime' + pane.key]}</p>
                                          <p style={{ color: "red" }} className="Error">{this.state.errors['playerStopTime' + pane.key]}</p>
                                        </FormItem>
                                      </Col>
                                    </Col>
                                  </Row>
                                  <Row>
                                    {/* <Questions questionCategory={'video'} questionId={pane.key} subQuestions={pane.subQuestions} saveSubQuestionPacks={this.saveSubQuestionPacks.bind(this)} /> */}
                                    <Questions questionCategory={'video'} questionId={pane.key} subQuestions={this.state[pane.key]} saveSubQuestionPacks={this.saveSubQuestionPacks.bind(this)} />

                                  </Row>
                                </div>) : null}
                                {this.state["questionMediaType" + pane.key] === 'audio' ? (<div>
                                  <Row>
                                    <Col span={24} className="Redfun2winquestionsmedas">
                                      <Col span={6}>
                                        <FormItem label="Upload Audio File">
                                          <Upload {...props}
                                            // fileList={this.state.fileList}  
                                            fileList={this.state["fileList"+ pane.key] || []}
                                            onChange={this.handleMediaChange.bind(this, "mediaURL" + pane.key)}
                                            accept=".mp3,.m4a, .mp4">
                                            <Button>
                                              <Icon type="upload" /> Click to Upload
                                    </Button>
                                          </Upload>
                                          <p style={{ color: "red" }} className="Error">{this.state.errors['mediaURL' + pane.key]}</p>
                                        </FormItem>
                                      </Col>
                                    </Col>
                                  </Row>
                                  <Row>
                                    {/* <Questions questionCategory={'audio'} questionId={pane.key} subQuestions={pane.subQuestions} saveSubQuestionPacks={this.saveSubQuestionPacks.bind(this)} /> */}
                                    <Questions questionCategory={'audio'} questionId={pane.key} subQuestions={this.state[pane.key]} saveSubQuestionPacks={this.saveSubQuestionPacks.bind(this)} />
                                  </Row>
                                </div>) : null}
                                {this.state["questionMediaType" + pane.key] === 'text' ? (<div className="Redfun2winquestionsmedas">

                                  <Row>
                                    {/* <Questions questionCategory={'text'} questionId={pane.key} mediaUrl={pane.mediaURL} subQuestions={pane.subQuestions} saveSubQuestionPacks={this.saveSubQuestionPacks.bind(this)} /> */}
                                    <Questions questionCategory={'text'} questionId={pane.key} mediaUrl={this.state['mediaURL' + pane.key]} subQuestions={this.state[pane.key]} saveSubQuestionPacks={this.saveSubQuestionPacks.bind(this)} />
                                  </Row>
                                </div>) : null}
                              </div>) : null}
                            </Row>
                          </TabPane>)}
                        </Tabs>
                      </Col>
                    </div>
                  </TabPane>
                  <TabPane tab="FUN2WIN DETAILS & MEDIA" key="2">
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
                      {/* <Row>
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
                  </Row> */}
                      <Row>
                        <Col span={24} className="Refinedfun2winfancoinss">
                          <Col span={3} lx={{ span: 3 }} lg={{ span: 6 }} sm={{ span: 6 }} className="">
                            <FormItem>
                              <h6 className='h6Fnt'>Fan Coins</h6>
                              <InputNumber min={1} max={1000} placeholder="FanCoins Awarded" name="fancoins" value={this.state.fancoins} onChange={this.handleFanCoinsChange} />
                              <p style={{ color: "red" }} className="Error">{this.state.errors['fancoins']}</p>
                            </FormItem>
                          </Col>
                          <Col span={3} lx={{ span: 3 }} lg={{ span: 6 }} sm={{ span: 6 }} className="">
                            <FormItem>
                              <h6 className='h6Fnt'>Duration <span>(Sec)</span></h6>
                              <InputNumber min={1} max={1000} placeholder="Duration" name="duration" value={this.state.duration} onChange={this.handleDurationChange} />
                              <p style={{ color: "red" }} className="Error">{this.state.errors['duration']}</p>
                            </FormItem>
                          </Col>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24} className="Refinedfun2winBonuscoinss">
                          <Col span={3} lx={{ span: 3 }} lg={{ span: 6 }} sm={{ span: 6 }} className="">
                            <FormItem>
                              <h6 className='h6Fnt'>Bonus Coins</h6>
                              <Checkbox onChange={this.onCheckBoxChange} name='hasGoodies' checked={this.state.hasGoodies}
                              >
                              </Checkbox>
                              <p style={{ color: "red" }} className="Error">{this.state.errors['bonuscoins']}</p>
                            </FormItem>
                          </Col>
                          <Col span={3} lx={{ span: 3 }} lg={{ span: 6 }} sm={{ span: 6 }} className="">
                            <FormItem>
                              <h6 className='h6Fnt'>Bonus Coins</h6>
                              <InputNumber min={1} max={1000} placeholder="Bonus FanCoins" name="bonuscoins" value={this.state.bonuscoins} disabled={this.state.difficultyLevel!=="RAPID-FIRE" ? true : false} onChange={this.handleBonusFanCoins} />
                              <p style={{ color: "red" }} className="Error">{this.state.errors['bonuscoins']}</p>
                            </FormItem>
                          </Col>
                        </Col>

                      </Row>
                      <Row>
                        <Col span={5} className="">
                          <FormItem>
                            <h6 className='h6Fnt'>Add Banner Image</h6>
                            <Upload {...props}
                              className="avatar-uploader"
                              showUploadList={false}
                              onChange={this.handleMediaChange.bind(this, 'Fun2WinImageUrl')}
                              accept=".png,.jpg,.jpeg"
                            >
                              {
                                Fun2WinImageUrl ?
                                  <img src={Fun2WinImageUrl} alt="" className="avatar" /> :
                                  <Icon type="picture" className="avatar-uploader-trigger" />
                              }
                            </Upload>
                            <p style={{ color: "red" }} className="Error">{this.state.errors['Fun2WinImageUrl']}</p>
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={5} className="btnRight">
                          <Button type="primary" className='createFun2Win' onClick={this.saveContentPack.bind(this)}>Update Pack</Button>
                        </Col>
                      </Row>
                    </Form>
                  </TabPane>
                </Tabs>
              </div>
            </Col>
          </Row>
        </div>
      </Dashboard >
    );
  };
}

export default EditFun2WinPage;