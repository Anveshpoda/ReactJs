/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import $ from "jquery";
import Dashboard from '../Dashboard/Dashboard';
import { Link } from 'react-router';
import { Scrollbars } from 'react-custom-scrollbars';
import SocialMediaView from './SocialMediaViewModal';
import moment from 'moment';
import { Form, Icon, Input, Button, Modal, message, Checkbox, Pagination, Col, Table, Row, Select, Tabs } from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const confirm = Modal.confirm;


function callback(key) {
  // console.log(key);
}



function handleChange(value) {
  //  console.log(`selected ${value}`);
}

function handleBlur() {
  // console.log('blur');
}

function handleFocus() {
  // console.log('focus');
}

class SocialMediaUpcoming extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      SMCUpcomingModalvisible: false,
      ViewDetails: false,
      pagenumber: 1,
      categories: [],
      subCategories: [],
      celebrities: [],
      upcomingContests: [],
      numOfPages: 0,
      categoryId: "",
      subCategoryId: "",
      celName: ""
    }
  }
  showDeleteConfirm = (id) => {
    var _this = this;
    var deleteid = id;
    confirm({
      title: 'Are you sure delete this Contest?',
      content: '',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        _this.deleteContest(deleteid);
      },
      onCancel() {
        //   console.log('Cancel');
      },
    });
  }
  deleteContest = (deleteid) => {
    var _this = this;
    const url = '/deleteSocialmediaContest/' + deleteid;
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
        if (response.message === "Success" && response.status === 200) {
          message.success("Contest Deleted successfully");
          _this.getUpcomingContests(_this.state.pagenumber);
        }
      })
  }
  componentWillMount = () => {
    this.getCategories();
    this.getUpcomingContests(this.state.pagenumber)
  }
  getUpcomingContests = (page) => {
    var _this = this;
    const url = '/Socialmediacontests/Upcoming/' + page;
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
        _this.setState({ upcomingContests: response.data, numOfPages: response.numofPages });
      })
  }
  recordsPaginationChange = (page) => {
    this.setState({ pagenumber: page });
    {
      this.state.subCategoryId ? this.getContestsBysubcategory(this.state.subCategoryId, page)
        : this.state.celName ? this.getContestsByCelebrity(this.state.celName, page) : this.getUpcomingContests(page)
    }

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
    const url = '/Socialmediacontests/contests-by-subcat/Upcoming/' + page + '?subCatId=' + subid;
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
        _this.setState({ upcomingContests: response.data, numOfPages: response.numofPages });
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
    const url = '/Socialmediacontests/contests-by-celName/Upcoming/' + page + '?celName=' + celebrity;
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
        _this.setState({ upcomingContests: response.data, numOfPages: response.numofPages });
      })
  }
  handleCancelSMUpcoming = (e) => {
    this.setState({
      SMUpcomingModalvisible: false,
    });
  }




  ViewDetailsModal = () => {

    this.setState({
      SMCUpcomingModalvisible: true,

    });
  }



  handleCancelSMUpcoming = (e) => {
    this.setState({
      SMCUpcomingModalvisible: false,
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
      title: 'Actions',
      dataIndex: 'Actions',
      key: 'Actions',

    },



    ];

    var data = [];
    for (let key in this.state.upcomingContests) {
      var upcomingObj = this.state.upcomingContests[key];
      data.push(
        {
          key: key,
          StartDate: moment(upcomingObj.contestStartDate).format('MM/DD/YYYY'),
          SocialMediaChannel: 'Facebook',
          ContestType: <span>{upcomingObj.title} </span>,
          Title: <span>{upcomingObj.fbContestName} </span>,
          ParticipantCount: <span>{upcomingObj.participantCount} </span>,
          EndDate: moment(upcomingObj.contestEndDate).format('MM/DD/YYYY'),
          Actions: <div>
            <ul className="list-inline">
              <li onClick={this.triggerViewDetails.bind(this, upcomingObj._id)}><Icon className="SocialMediaIcon" type="eye-o" />
              </li>
              <li><Link to={`/SocialmediapostsContests/SocialMediaEditContest/${upcomingObj._id}`} className=''><Icon className="SocialMediaIcon" type="edit" /></Link></li>
              <li><Icon className="SocialMediaIcon" onClick={this.showDeleteConfirm.bind(this, upcomingObj._id)} type="delete" /></li>
            </ul>
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
                  <Table className="SocialMediaContestsTable  SocialMediaContestsTable14" columns={columns} dataSource={data} {...config} />
                </div>
                <div className="socialmediacontestpagination">
                  <Pagination onChange={this.recordsPaginationChange.bind(this)} total={this.state.numOfPages * 10} />
                </div>
              </Col>

            </Row>
          </div>
          <SocialMediaView ref="child" />
        </div>
      </Dashboard>
    );
  };
}


export default SocialMediaUpcoming;
/* eslint-disable */