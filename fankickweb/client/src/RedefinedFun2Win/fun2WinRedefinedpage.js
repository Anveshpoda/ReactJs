import React from 'react';
import { Link } from 'react-router';
import Dashboard from '../Dashboard/Dashboard';
import ReactPlayer from 'react-player';
import axios from "axios";
import RedefinedFun2Win from './newFun2Win.css';
import moment from 'moment';
import { Scrollbars } from 'react-custom-scrollbars';
import { browserHistory } from 'react-router';
import ReactAudioPlayer from 'react-audio-player';
import { Col, Row, Icon, Button, Modal,Input, Dropdown, Menu, Card, Select, AutoComplete, Pagination, message } from 'antd';
import participantscount12 from '../images/participantscount12.png';
import fancoincount12 from '../images/fancoincount12.png';
const Search = Input.Search;
const Option = Select.Option;
const Options = AutoComplete.Option;
function handleChange(value) {
  console.log(`selected ${value}`);
}
class fun2WinRedefinedpage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loginId: '',
      categories: [],
      subCategories: [],
      subCategoryId: '',
      celebrities: [],
      celebrity: '',
      searchresult: [],
      numOfPages: '',
      numOfPagesdup: '',
      contentpacks: [],
      contentpacksdup: [],
      modalData: [],
      title: ''
    }
  }

  componentWillMount() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    // this.setState({ usercredentials: user })
    let name = user.role.name;
    if (name === 'Freelancer') {
      var loginId = user._id
      this.setState({ loginId })
      let url = '/content-packs/all/' + loginId + '/1'
      this.getAllContentPacks(url)
    } else {
      this.setState({
        loginId: 'notFreelancer'
      })
      let url = '/content-packs/all/notFreelancer/1'
      this.getAllContentPacks(url)
    }
    this.getcategories()
  }
  getAllContentPacks = (url) => {
    var instance = axios.create({
      headers: { 'x-access-token': sessionStorage.token }
    });
    instance.get(url).then((response) => {
      // console.log(response.data.data, 'jee')
      this.setState({
        contentpacks: response.data.data,
        contentpacksdup: response.data.data,
        numOfPages: response.data.numofPages,
        numOfPagesdup: response.data.numofPages
      });
    });
  }

  getcategories = () => {
    var instance = axios.create({
      headers: { 'x-access-token': sessionStorage.token }
    });
    instance.get('/categories').then((response) => {
      console.log(response.data.data)
      this.setState({ categories: response.data.data });
    });
  }

  onCategoryChange = (catId) => {
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
        let url = '/packs-by-subcategory/All/1/' + this.state.loginId + '?subCatId=' + categorydata.subCategories[0]._id
        this.getAllContentPacks(url)
      }
    })
  }

  onSubCategoryChange = (e) => {
    this.setState({
      subCategoryId: e,
      celebrity: ''
    });
    let url = '/packs-by-subcategory/All/1/' + this.state.loginId + '?subCatId=' + e
    this.getAllContentPacks(url)
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
          console.log('Errorr')
        }
      })
  }

  onCelbrityChange = (e) => {
    this.setState({
      celebrity: e
    })
    let url = '/packs-by-celebrityname/All/1/' + this.state.loginId + '?celName=' + e
    this.getAllContentPacks(url)
    console.log(this.state, '1111111')
  }

  onDropDownChange = (key, e) => {
    this.setState({
      [key]: e
    })
  }

  handleSearch = (value) => {
    let searchresult;
    if (!value.trim()) {
      searchresult = [];
      this.setState({
        contentpacks: this.state.contentpacksdup,
        numOfPages: this.state.numOfPagesdup,
        searchresult
      });
    } else if (value.trim().length > 1) {
      var instance = axios.create({
        headers: { 'x-access-token': sessionStorage.token }
      });
      instance.get('/content-pack/search/' + value.trim()).then((response) => {
        searchresult = response.data.data
        this.setState({ searchresult });
      });
    }
  }

  onSelect = (val, option) => {
    let searchresult;
    let contentpack = [];
    if (val) {
      var instance = axios.create({
        headers: { 'x-access-token': sessionStorage.token }
      });
      instance.get('/get-pack/' + val).then((response) => {
        contentpack.push(response.data.data)
        this.setState({
          contentpacks: contentpack,
          numOfPages: response.data.numofPages || 1
        });
      });
    }
  }

  onPaginationChange = (page, pageSize) => {
    var url;
    if ((this.state.subCategoryId !== '') && (this.state.celebrity === '')) {
      url = '/packs-by-subcategory/All/' + page + '/' + this.state.loginId + '?subCatId=' + this.state.subCategoryId;
    }
    else if (this.state.celebrity !== '') {
      url = '/packs-by-celebrityname/All/' + page + '/' + this.state.loginId + '?celName=' + this.state.celebrity;
    }
    else {
      url = '/content-packs/all/' + this.state.loginId + '/' + page
    }
    axios.get(url, {
      headers: {
        "x-access-token": sessionStorage.getItem('token'),
      },
    })
      .then(function (response) {
        this.setState({
          contentpacks: response.data.data,
          numOfPages: response.data.numofPages
        });
      }.bind(this))
      .catch(function (error) {
        console.log(error)
      });
  }

  showModal = (e) => {
    let val = e.target.id
    var instance = axios.create({
      headers: { 'x-access-token': sessionStorage.token }
    });
    instance.get('/get-pack/' + val).then((response) => {
      this.setState({
        modalData: response.data.data,
        title: response.data.data.name,
        visible: true
      });
    })
  }

  changePackState = (name, e) => {
    let id = e.target.id;
    let data, statusMessage, navigationUrl;
    if (name === "approve") {
      data = {
        'isPublished': true,
        'isDeleted': false
      }
      navigationUrl = '/fun2WinRedefinedpage/RunningRedefinedFun2Win';
      statusMessage = 'Fun2Win has been approved.'
    } else if (name === 'delete') {
      data = {
        'isPublished': false,
        'isDeleted': true
      }
      navigationUrl = '/fun2WinRedefinedpage/ClosedRedefinedFun2Win';
      statusMessage = 'Fun2Win has been closed.'
    }
    let url = '/update-pack/' + id;
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
          message.success(statusMessage);
          browserHistory.push(navigationUrl);
        }
        else {
          message.error(`Unable to approve Fun2Win.`);
        }
      })
  }


  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  render() {
    var { modalData } = this.state;
    var mapCategories = this.state.categories.map((category) => <Option value={category._id}>{category.name}</Option>);
    var mapsubCategories = this.state.subCategories.map((subcategory) => <Option value={subcategory._id}>{subcategory.name}</Option>);
    var mapCelebrities = this.state.celebrities.map((celebrity) => <Option value={celebrity.celebrityName}>{celebrity.celebrityName}</Option>);
    const { searchresult } = this.state;
    const children = searchresult.map((email) => {
      return <Options key={email._id}>{email.name}</Options>;
    });
    return (
      <Dashboard>
        <div className="">
          <Row className="">
            <Col span={24} className='challengesmenu'>
              <div className="fun2winSubMenu">
                <Col span={2}><h2 className="fun2winpageTitle">Fun2Win</h2></Col>
                <Col span={3} sm={{ span: 4 }} lg={{ span: 3 }} xl={{ span: 3 }} className="redfinedfundashselects redefineddshfirstselec">
                  <Select className="Redfun2winTopselects"
                    showSearch getPopupContainer={triggerNode => triggerNode.parentNode}
                    style={{ width: '100%' }}
                    placeholder="Select Category"
                    optionFilterProp="children"
                    onChange={this.onCategoryChange.bind(this)}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                    {mapCategories}
                  </Select>

                </Col>
                <Col span={3} sm={{ span: 4 }} lg={{ span: 3 }} xl={{ span: 3 }} className="redfinedfundashselects">
                  <Select className="Redfun2winTopselects"
                    showSearch getPopupContainer={triggerNode => triggerNode.parentNode}
                    style={{ width: '100%' }}
                    placeholder="Select Sub Category"
                    optionFilterProp="children"
                    value={this.state.subCategoryId || undefined}
                    onChange={this.onSubCategoryChange.bind(this)}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                    {mapsubCategories}
                  </Select>

                </Col>
                <Col span={3} sm={{ span: 4 }} lg={{ span: 3 }} xl={{ span: 3 }} className="redfinedfundashselects">
                  <Select className="Redfun2winTopselects"
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

                </Col>


                <Col span={9} sm={{ span: 8 }} lg={{ span: 9 }} xl={{ span: 8 }} className="fun2winmainheader">
                  <nav className='challengesnavigation fun2winNavigations' role="navigation">
                    <Link to="/fun2WinRedefinedpage" className='item' activeClassName='active'>All</Link>
                    <Link to="/fun2WinRedefinedpage/RunningRedefinedFun2Win" className='item' activeClassName='active'>Live</Link>
                    <Link to="/fun2WinRedefinedpage/QueuedRedefinedFun2Win" className='item' activeClassName='active'>Queued</Link>
                    <Link to="/fun2WinRedefinedpage/ClosedRedefinedFun2Win" className='item' activeClassName='active'>Closed</Link>
                    <Link to="/fun2WinRedefinedpage/createFun2WinNewPage"> <Button type="primary" className='createFun2WinBtn redfinedcreatebtnss'>Create Fun2Win</Button></Link>
                  </nav>
                </Col>

              </div>
            </Col>
            <Col span={24} className="fun2winSubmenus">

              <Col span={3} className="redfinedfundashselects">
                <Select className="Redfun2winTopselects"
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                  placeholder="Sort By" style={{ width: '100%' }} onChange={handleChange}>
                  <Option value="Easy">Easy</Option>
                  <Option value="Medium">Medium</Option>
                  <Option value="Hard">Hard</Option>
                  <Option value="RapidFire">RapidFire</Option>
                  <Option value="AuthorName">AuthorName</Option>

                </Select>
              </Col>

              <Col span={4} sm={{ span: 6 }} lg={{ span: 5 }} xl={{ span: 3 }} className="fun2winsearchfilmain">
                <AutoComplete className="searchFun2win"
                  style={{ width: '100%' }}
                  onSearch={this.handleSearch}
                  onSelect={this.onSelect}
                  placeholder={<div><span>Search Here</span> <span style={{float:'right'}}><Icon type="search" theme="outlined" /> </span></div>}
                  >
                  {children}
                </AutoComplete>
              </Col>
            </Col>

          </Row>

          <Row className="">
            <Col span={24} className='mrgLeft12'>

              {/* <Col span={3} className="MrgnLeft40">
                <Select
                  showSearch getPopupContainer={triggerNode => triggerNode.parentNode}
                  style={{ width: 130 }}
                  placeholder="Difficulty Level"
                  optionFilterProp="children"
                  onChange={this.onDropDownChange.bind(this, "difficultyLevel")}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option value="EASY">Easy</Option>
                  <Option value="MEDIUM">Medium</Option>
                  <Option value="HARD">Hard</Option>
                  <Option value="RAPID-FIRE">Rapid Fire</Option>
                </Select>
              </Col> */}

            </Col>

          </Row>
        </div>
        <div>
        </div>

        <div className="ui card">
          <Row>

            {this.state.contentpacks.map((element) => {
              return (<Col span={6} xs={12} sm={12} xl={4} lg={6} md={6}>     <Card className="margintop20">
                <div className="image hover01">
                  <figure>
                    <img className="fun2winbannerimage fun2WinMainCardImages" src={element.imageURL} id={element._id} onClick={this.showModal} alt={element.imageURL}
                      width='100%' height='154px' />
                  </figure>
                </div>
                <div className="cardContent">

                  <ul className="cardContentDetails">
                    {/* <li style={{ marginBottom: 10 }}> <ul className="list-inline">
                 <li><b>Id:</b>: 12345</li> 
                <li style={{ float: 'right' }}><b>Fancoins:</b>  {contest.points}</li>
              </ul></li> */}
                    <li> <h4 className="contestCardAuthor"><span className="messageCentauthorn">Author Name :</span><span>Ishak</span></h4></li>
                    <li className="cardSubText" style={{}}>Date: <span className="colorBlack"> {moment(modalData.createdDateTime).format('YYYY-MM-DD')} </span></li>
                    <li><h4 className="contestCardTitle" >{element.name}</h4></li>
                    {/*    <li><span className="cardSubText">Fancoins :  {element.points}</span></li>*/}

                  </ul>
                  <ul className="list-inline fun2winicons">
                    {/*  <li>
                      <Icon type="heart-o" /> <span> {element.likesCount}</span>

                    </li>
                    <li>
                      <Icon type="eye-o"  /> <span> {element.totalViewsCount}</span>
                    </li>
                  </ul>
                  <ul className="fun2winiconsstatuscount">

                    <li><Icon type="message" /><span> {ccount}</span></li> */}

                  </ul>
                </div>
                <div className="cardFooter">
                  <ul className="list-inline">
                    {/*  <li>
                      {!element.isPublished && !element.isDeleted ? <p style={{ color: "orange" }}>Queued to Approval</p> : null}
                    </li>
                    <li>
                      {element.isDeleted ? <p style={{ color: "orange" }}>Closed</p> : null}
                    </li>
                    <li>
                      {element.isPublished && !element.isDeleted ? <p style={{ color: '#783293' }}>Participants : {element.answeredCount}</p> : null}
                    </li>*/}
                    <li className="Fun2winiconmain"><Icon type="eye" theme="filled" className="funwincounticonss" /> <span>  {element.totalViewsCount}</span></li>
                    <li className="Fun2winiconmain"><Icon type="heart-o"  className="funwincounticonss" /> <span>{element.likesCount}</span></li>
                    {/* <li><b style={{ color: '#783293' }}>Participants: {element.playedCount}</b></li> */}
                    <li className="Fun2winiconmain">
                      {element.isPublished && !element.isDeleted ? <b style={{ color: '#783293' }}><img src={participantscount12} alt="contest-cover" className="fun2winpartcount" /> <span>{element.answeredCount}</span></b> : null}


                    </li>
                    <li className="Fun2winiconmain">
                      <ul className="list-inline">
                        <li>
                          <span className="cardSubText"><img src={fancoincount12} alt="contest-cover" className="fun2winpartcount" /></span>
                        </li>
                        <li className="fun2winfanccountli">
                          <span>{element.points}</span></li>
                      </ul>
                    </li>
                    <li className="floatRight">
                      {element.isPublished && !element.isDeleted ? <Dropdown getPopupContainer={triggerNode => triggerNode.parentNode}
                        overlay={<Menu>
                          <Menu.Item key="1">
                            <a id={element._id} onClick={this.changePackState.bind(this, 'delete')}>Delete</a>
                          </Menu.Item>
                          <Menu.Item key="2">
                            <a id={element._id} onClick={this.showModal}>View Details</a>
                          </Menu.Item>
                          <Menu.Item key="3">
                            <a><span>Create Hook</span></a>
                          </Menu.Item>
                        </Menu>} trigger={['click']}>
                        <a className="ant-dropdown-link" href="">
                          <span className="viewMore"><Icon type="ellipsis" /></span>
                        </a>
                      </Dropdown> : null}

                      {!element.isPublished && !element.isDeleted ? <Dropdown getPopupContainer={triggerNode => triggerNode.parentNode}
                        overlay={<Menu>
                          <Menu.Item key="1">
                            <a id={element._id} onClick={this.changePackState.bind(this, 'approve')}>Approve</a>
                          </Menu.Item>
                          <Menu.Item key="2">
                            <Link to={`/fun2WinRedefinedpage/editFun2WinNewPage/${element._id}`}><a href="#" style={{ color: 'rgba(0, 0, 0, 0.65)' }}>Edit</a></Link>
                          </Menu.Item>
                          <Menu.Item key="3">
                            <a id={element._id} onClick={this.changePackState.bind(this, 'delete')}>Delete</a>
                          </Menu.Item>
                          <Menu.Item key="4">
                            <a id={element._id} onClick={this.showModal}>View Details</a>
                          </Menu.Item>
                        </Menu>} trigger={['click']}>
                        <a className="ant-dropdown-link" href="">
                          <span className="viewMore"><Icon type="ellipsis" /></span>
                        </a>
                      </Dropdown> : null}

                      {element.isDeleted ? <Dropdown getPopupContainer={triggerNode => triggerNode.parentNode}
                        overlay={<Menu>
                          <Menu.Item key="1">
                            <a><span>Reschedule</span></a>
                          </Menu.Item>
                          <Menu.Item key="2">
                            <a id={element._id} onClick={this.showModal}>View Details</a>
                          </Menu.Item>
                        </Menu>} trigger={['click']}>
                        <a className="ant-dropdown-link" href="">
                          <span className="viewMore"><Icon type="ellipsis" /></span>
                        </a>
                      </Dropdown> : null}

                    </li>
                  </ul>
                </div>
              </Card></Col>)
            })}
          </Row>
          <ul id="pagenumberLiFanclubs" className="list-inline">
            <Pagination onChange={this.onPaginationChange.bind(this)} total={this.state.numOfPages * 10} />
          </ul>
        </div>
        <Modal className="runningmodal"
          title={this.state.title}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={<Button className="footbtn" style={{ marginRight: 8 }} type="primary" onClick={this.handleCancel}>Close</Button>}
          style={{ top: 20 }}
          >
          {modalData.length !== 0 ?
            <Scrollbars style={{ height: '59vh', padding: '0px 10px' }}>
              <div className="challengeDetails" style={{ marginLeft: '10px' }}>
                <div className="challengeDetails">
                  <Row>
                    <Col span={12} className="fun2winviewImg">
                      <img src={modalData.imageURL} alt={modalData.imageURL} width="100%" />
                    </Col>
                    <Col span={12} className="funtopercent">
                      <div className="fun2winAnalytics">
                        <div className="fun2winAnalyticsDivh2">
                          <h2> Post Analytics</h2>
                        </div>
                        <div className="fun2winAnalyticsDiv">
                          <ul className="list-inline">
                            <li>Total Views: <span>{modalData.totalViewsCount}</span></li>
                            <li>Participated : <span>{modalData.answeredCount}</span></li>
                          </ul>
                        </div>
                        <div className="fun2winAnalyticslikes">
                          <ul className="list-inline">
                            <li><span>
                              <Icon type="heart-o" />
                            </span>
                              Total likes: <span>{modalData.likesCount}</span>
                            </li>
                            <li>
                              Total Dislikes: <span>{modalData.dislikesCount}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row className="fun2winmfancoinsandCreatedDate">
                    <Col className="" span={24}>
                      <Col span={12} className="fun2winmfancoins">
                        <h4 className="MrgnBottom10">Created Date:</h4>
                        <p className="ViewDetailsBorderBox">{moment(modalData.createdDateTime).format('YYYY-MM-DD')}</p>
                      </Col>
                      <Col span={12} className="fun2winmfancoins">
                        <h4 className="MrgnBottom10">Difficulty level:</h4>
                        <p className="ViewDetailsBorderBox">{modalData.level}</p>
                      </Col>
                    </Col>

                    <Col className="" span={24}>
                      <Col span={12} className="fun2winmfancoins">
                        <h4 className="MrgnBottom10">Fancoins:</h4>
                        <p className="ViewDetailsBorderBox">{modalData.points}</p>
                      </Col>
                      <Col span={12} className="fun2winmfancoins">
                        <h4 className="MrgnBottom10">Bonus Fancoins:</h4>
                        <p className="ViewDetailsBorderBox">{modalData.goodieCoins}</p>
                      </Col>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={18} className="rheader">
                      <h2>Questions</h2>
                    </Col>
                    <Col style={{ paddingLeft: '28px' }} span={6}>
                      <div className="rheader">
                        <h2>Answers</h2>
                      </div>
                    </Col>
                  </Row>

                  {modalData.contentPackQuestions.map((elem, index) => {
                    return (<Row><Col span={24} className="">
                      <h2>Question: {index + 1}</h2>
                    </Col>
                      <Row>
                        <Col span={24} className="">
                          {elem.mediaType === "video" ? <ReactPlayer width="75%" height="250px" url={'https://www.youtube.com/watch?v=' + elem.mediaURL} playing={false} controls /> : null}
                          {elem.mediaType === "audio" ? <ReactAudioPlayer src={elem.mediaURL} autoPlay={false} controls /> : null}
                          {elem.mediaType === "image" ? <img src={elem.mediaURL} alt={elem.mediaURL} width="75%" height="250px" /> : null}
                        </Col>
                      </Row>
                      {elem.subQuestions.length > 0 ? elem.subQuestions.map((record, index) => {
                        return (<div className="cardContentQuestion">
                          <br />
                          <Col span={24} className="redfnContentpackquestionsss">
                            <Col span={18}>
                              <p className="questionpackfun2inofs">{'S.Q.' + (index + 1)}) {record.name}</p>
                            </Col>
                            <Col span={6}>
                              <p className="floatRight refnquestionanswertype"> {record.answerType}</p>
                            </Col>
                          </Col>
                          <Row>
                            <Col span={24} className="fun2winMultiplequestions mrgnBottom25">
                              <Col span={16}>
                                {record.options.map((opt, ind) => {
                                  if (record.optionMediaType === "text") {
                                    return (

                                      <Col span={12}>
                                        <ul className="Redfunviewotions">
                                          <li className="ant-col-2 listoffuns">{opt.optionId}</li><li className="ant-col-20 listoffuns1" >{opt.option} </li>
                                        </ul>
                                      </Col>)
                                  } else if (record.optionMediaType === "image") {
                                    return (
                                      <Col span={6} className="fun2winCombinationoptions"><img src={opt.option} alt={opt.option} width="100%" height='130px' /></Col>
                                    )
                                  }
                                })}

                              </Col>
                              <Col span={8}>
                                {record.correctAnswer ? <div>
                                  {record.optionMediaType === "text" ?
                                    <Col span={24} className="redfinedRightQstn">
                                      <ul className="Redfunviewotionsanswer">
                                        <li className="ant-col-2 listoffuns">{record.correctAnswer}</li><li className="ant-col-20 listoffuns1"> {record.options[(record.correctAnswer - 1)]['option']}</li>
                                      </ul>
                                    </Col>
                                    : null}
                                  {record.optionMediaType === "image" ?
                                    <Col span={24}>
                                      <Row className="fun2WinCombinationanswer">
                                        <div className="fun2win-imganswer">
                                          <img className="img-responsive" src={record.options[(record.correctAnswer - 1)]['option']} alt="Contest Cover" width='100%' height='130px' style={{ 'border-bottom': '1px solid #eee' }} />
                                        </div>
                                      </Row>
                                    </Col>
                                    : null}
                                </div> : null}
                              </Col>
                            </Col>
                          </Row>
                        </div>)
                      }) : null}
                    </Row>)
                  })}
                </div>
              </div>
            </Scrollbars> : null}
          {/*<Col className="modalFootersh">
              <div className="textRightr">
                    <Button type="primary" onClick={this.handleCancel}> Cancel</Button>
                    </div>
                  </Col>*/}
        </Modal>

      </Dashboard>
    );
  };
}


export default fun2WinRedefinedpage;