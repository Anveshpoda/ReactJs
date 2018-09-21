/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import $ from "jquery";
import css from './SocialmediaContest.css';
import { Link } from 'react-router';
import Dashboard from '../Dashboard/Dashboard';
import SocialMediaUpcoming from './SocialMediaUpcoming';
import SocialMediaRunning from './SocialMediaRunning';
import ReactPlayer from 'react-player';
import SocialMediaView from './SocialMediaViewModal';
import { Scrollbars } from 'react-custom-scrollbars';
import moment from 'moment';
import { Form, Icon, Input, Button, Select, Checkbox, Modal, Pagination, Table, Tabs, Col, Row } from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const Search = Input.Search;
const { TextArea } = Input;


function handleChange(value) {
  console.log(`selected ${value}`);
}

function handleBlur() {
  console.log('blur');
}

function handleFocus() {
  console.log('focus');
}




class SocialMediaDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DeclareWinnersModalvisible: false,
      ViewDetails: false,
      pagenumber: 1,
      categories: [],
      subCategories: [],
      celebrities: [],
      completedContests: [],
      numOfPages: 0,
      categoryId: "",
      subCategoryId: "",
      celName: ""
    }
  }
  componentWillMount = () => {
    this.getCategories();
    this.getCompletedContests(this.state.pagenumber)
  }
  getCompletedContests = (page) => {
    var _this = this;
    const url = '/Socialmediacontests/Completed/' + page;
    var request = new Request(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'x-access-token': sessionStorage.getItem('token')
      }
    });
    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        _this.setState({ completedContests: response.data, numOfPages: response.numofPages });
      })
  }
  recordsPaginationChange = (page) => {
    this.setState({ pagenumber: page });
    {
      this.state.subCategoryId ? this.getContestsBysubcategory(this.state.subCategoryId, page)
        : this.state.celName ? this.getContestsByCelebrity(this.state.celName, page) : this.getCompletedContests(page)
    };
  }
  getCategories = () => {
    var _this = this;
    const url = '/categories';
    var request = new Request(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'x-access-token': sessionStorage.getItem('token')
      }
    });
    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        _this.setState({ categories: response.data });
      })
  }
  onCategoryChange = (value) => {
    this.setState({ categoryId: value });
    this.bindSubCategories(value)
  }
  bindSubCategories(category) {
    var a = this.state.categories.map((categorydata) => {
      if (category === categorydata._id) {
        this.setState({
          subCategories: categorydata.subCategories, subCategoryId: ''
        })
      }
    })
  }
  onsubCategoryChange(value) {
    var subid = value;
    this.setState({
      subCategoryId: subid, celName: ''
    })
    this.getCelebrities(subid);
    this.getContestsBysubcategory(subid, this.state.pagenumber)
  }
  getContestsBysubcategory = (subid, page) => {
    var _this = this;
    const url = '/Socialmediacontests/contests-by-subcat/Completed/' + page + '?subCatId=' + subid;
    var request = new Request(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'x-access-token': sessionStorage.getItem('token')
      }
    });
    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        _this.setState({ completedContests: response.data, numOfPages: response.numofPages });
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
  onCelebrityChange = (value) => {
    var _this = this;
    var celname = value;
    this.setState({ celName: value });
    this.getContestsByCelebrity(value, this.state.pagenumber)
  }
  getContestsByCelebrity = (celebrity, page) => {
    var _this = this;
    const url = '/Socialmediacontests/contests-by-celName/Completed/' + page + '?celName=' + celebrity;
    var request = new Request(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'x-access-token': sessionStorage.getItem('token')
      }
    });
    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        _this.setState({ completedContests: response.data, numOfPages: response.numofPages });
      })
  }

  showModal = () => {
    this.setState({
      DeclareWinnersModalvisible: true,

    });
  }


  handleCancel = (e) => {

    this.setState({
      visible: false,
    });
  }

  handleCancelWinnersDeclare = (e) => {

    this.setState({
      DeclareWinnersModalvisible: false,
    });
  }


  handleCancelSMCompleted = (e) => {
    console.log(e);
    this.setState({
      SMCompletedModalvisible: false,
    });
  }




  ViewDetailsModal = () => {

    this.setState({
      SMCompletedModalvisible: true,

    });
  }

  triggerViewDetails = (id) => {
    this.refs.child.viewModal(id);
  }
  render() {
    const mapCategories = this.state.categories.map((category) => <Option value={category._id}>{category.name}</Option>);
    const mapSubCategories = this.state.subCategories.map((subCategory) => <Option value={subCategory._id}>{subCategory.name}</Option>);
    const mapCelebrities = this.state.celebrities.map((celebrity) => <Option value={celebrity.celebrityName}>{celebrity.celebrityName}</Option>);
    const config = {
      pagination: false
    }
    const columns = [{
      title: 'Start Date',
      dataIndex: 'StartDate',
      key: 'StartDate',

    }, {
      title: 'Social Media Channel',
      dataIndex: 'SocialMediaChannel',
      key: 'SocialMediaChannel',
    }, {
      title: 'Contest Type',
      dataIndex: 'ContestType',
      key: 'ContestType',
    },

    {
      title: 'Title',
      dataIndex: 'Title',
      key: 'Title',

    },

    {
      title: 'Participant Count',
      dataIndex: 'ParticipantCount',
      key: 'ParticipantCount',

    },

    {
      title: 'End Date',
      dataIndex: 'EndDate',
      key: 'EndDate',

    },

    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',

    },


    {
      title: 'Actions',
      dataIndex: 'Actions',
      key: 'Actions',

    },



    ];
    var data = [];
    for (let key in this.state.completedContests) {
      var completeObj = this.state.completedContests[key];
      data.push(
        {
          key: key,
          StartDate: moment(completeObj.contestStartDate).format('MM/DD/YYYY'),
          SocialMediaChannel: 'Facebook',
          ContestType: <span>{completeObj.title} </span>,
          Title: <span>{completeObj.fbContestName} </span>,
          ParticipantCount: <span>{completeObj.participantCount} </span>,
          EndDate: moment(completeObj.contestEndDate).format('MM/DD/YYYY'),
          Status: <div className="winningdeclaressocialcontest"><Button type="" className="Socialmediadecalrewinbtn">Winners Declared</Button> </div>,
          Actions: <div><a className='ViewDtlsLink' onClick={this.triggerViewDetails.bind(this,completeObj._id)}>View Details</a>
           </div>,
        }
      )
    }

    return (


      <Dashboard>
        <div classNames="container">
          <Row>
            <Col span={24} className="SocialMediamenu">
              <div className="SocialMediamenu">
                <div className="SocialMediaContestSubMenu">
                  <Col span={2} xl={{ span: 2 }} lg={{ span: 2 }} sm={{ span: 3 }} className="fbcontsetmaintitle">
                    <h2 className="smcontestpageTitle">SM Contest</h2>
                  </Col>
                  <div className="SelectorsFbContests">
                    <Col span={3} xl={{ span: 3 }} lg={{ span: 4 }} sm={{ span: 3 }}>
                      <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                        showSearch className="fun2winSelectcategry456"
                        style={{ width: '100%' }}
                        placeholder="Select Category"
                        value={this.state.categoryId || undefined}
                        optionFilterProp="children"
                        onChange={this.onCategoryChange.bind(this)}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                        {mapCategories}
                      </Select>
                    </Col>
                    <Col span={3} xl={{ span: 3 }} lg={{ span: 4 }} sm={{ span: 3 }}>
                      <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                        showSearch className="fun2winSelectcategry456"
                        style={{ width: '100%' }}
                        placeholder="Select Sub Category"
                        optionFilterProp="children"
                        value={this.state.subCategoryId || undefined}
                        onChange={this.onsubCategoryChange.bind(this)}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                        {mapSubCategories}
                      </Select>

                    </Col>
                    <Col span={3} xl={{ span: 3 }} lg={{ span: 4 }} sm={{ span: 3 }}>
                      <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                        showSearch className="fun2winSelectcategry456"
                        style={{ width: '100%' }}
                        placeholder="Select Celebrity"
                        optionFilterProp="children"
                        value={this.state.celName || undefined}
                        onChange={this.onCelebrityChange.bind(this)}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                        {mapCelebrities}
                      </Select>

                    </Col>
                  </div>
                  <Col span={10} xl={{ span: 10 }} lg={{ span: 10 }} sm={{ span: 11}} className="FbcontestTopsidebars">
                    <nav className='contestsocial RghtAlign' role="navigation">
                      <Link to="/SocialMediaDashboard" className='item challengenav' activeClassName='active'>Completed</Link>
                      <Link to="/SocialmediapostsContests/SocialMediaRunning" className='item challengenav' activeClassName='active'>Running</Link>
                      <Link to="/SocialmediapostsContests/SocialMediaUpcoming" className='item challengenav' activeClassName='active'>Upcoming</Link>
                      <Link to="/SocialmediapostsContests/SocialMediaCreateContest"><Button type="primary" className='createBtnchalleng  mrgLeft30 fbcontestcreatebtns'>Create Contest</Button></Link>             

                    </nav>

                  </Col>

                </div>
              </div>
            </Col>
          </Row>

            

          <div className="">
            <Row>
              <Col span={24} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <div className="SocialMediaContestThemeBg">
                  <Table className="SocialMediaContestsTable  SocialMediaContestsTable12" columns={columns} dataSource={data} {...config} />
                </div>
                <div className="socialmediacontestpagination">
                  <Pagination onChange={this.recordsPaginationChange.bind(this)} total={this.state.numOfPages * 10} />
                </div>
              </Col>

            </Row>
          </div>


          <Modal
            title="Social Media Contest Details"
            className="SocialMediaViewDetails"
            wrapClassName="vertical-center-modal"
            onCancel={this.handleCancelWinnersDeclare}
            visible={this.state.DeclareWinnersModalvisible}
            footer={<div><Button type="" className="" onClick={this.handleCancelWinnersDeclare}>Cancel</Button>,<Button type="primary" className='DeclareWinnersBtn mrgLeft30'>Declare Winners</Button> </div>}

            >

            <Row>
              <Col span={24}>
                <FormItem label="Goodies Type">
                  <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                    showSearch className="fun2winSelectcategry4"
                    style={{ width: 200 }}
                    placeholder="Fancoins"
                    optionFilterProp="children"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                    <Option value="Movies">Movies</Option>
                    <Option value="Sports">Sports</Option>
                    <Option value="Music">Music</Option>
                    <Option value="TV Shows">TV Shows</Option>
                    <Option value="All">All</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>


            <Row>
              <Col span={24}>
                <Col span={7}>
                  <FormItem label="Merchant Name">
                    <Search
                      placeholder="input search text"
                      onSearch={value => console.log(value)}

                      />

                  </FormItem>
                </Col>

                <Col span={4} className="MrgnLeft70">
                  <FormItem label="Enter Coupon Cost">
                    <Input autoComplete={'off'} placeholder="500" />

                  </FormItem>

                </Col>
              </Col>

            </Row>



            <Row>
              <Col span={24}>
                <Col span={4}>
                  <FormItem label="Enter Basic Fancoins">
                    <Input autoComplete={'off'} placeholder="500" />

                  </FormItem>

                </Col>
              </Col>
            </Row>


            <Row>
              <Col span={24}>
                <Col span={4}>
                  <FormItem label="Enter Winners Count">
                    <Input autoComplete={'off'} placeholder="500" />

                  </FormItem>

                </Col>
              </Col>
            </Row>

            <Row>
              <Col span={23}>

                <FormItem label="Winners Message">
                  <TextArea rows={5} placeholder='Message here' />
                </FormItem>


              </Col>
            </Row>



          </Modal>



          <SocialMediaView  ref="child" />

        </div>
      </Dashboard >
    );
  };
}


export default SocialMediaDashboard;
/* eslint-disable */