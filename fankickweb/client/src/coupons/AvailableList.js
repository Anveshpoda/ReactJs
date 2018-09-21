/* eslint-disable */
import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import clone from 'clone';
import { Link, browserHistory } from 'react-router';
import css from './Coupons.css';
import Dashboard from '../Dashboard/Dashboard'
import moment from 'moment';
import viewMore from '../images/icons/view-more.png';
import { Table, Form, Input, Layout, Menu, Breadcrumb, Icon, Col, Alert, Card, Button, Pagination, Dropdown, message, Select, Modal, Spin, Row, DatePicker, Upload } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
const format = 'h:mm a';
const dateFormat = 'YYYY-MM-DD';
const { MonthPicker, RangePicker } = DatePicker;

function disabledDate(current) {

  if (!current) {
    return false;
  }
  const date = moment();
  date.hour(0);
  date.minute(0);
  date.second(0);
  return current.valueOf() < date.valueOf();
}

class OpendList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      couponTypes: [],
      contests: [],
      errors: {},
      visible: false,
      points: '',
      contentPackQuestions: [],
      createdDateTime: '',
      name: '',
      currentPage: 1,
      todosPerPage: 12,
      membersvisible: false,
      couponFrom: '',
      couponCode: '',
      pin: '',
      couponStatus: '',
      couponCodeStatus: false,
      couponBeginDate: '',
      couponEndDate: '',
      imageWithCode: '',
      couponId: '',
      numOfPages: '',
      pagenumber: 1,
      couponType: '',
      IconImage: '',
      couponCost: [],
      cost: '',
      fetchedData: []
    }
    this.handleOk = this.handleOk.bind(this);
    this.onCouponsTypeChange = this.onCouponsTypeChange.bind(this);
    //  this.changecouponEndDate = this.changecouponEndDate.bind(this);
    this.onCouponsCostChange = this.onCouponsCostChange.bind(this);
  }

  componentDidMount() {
    this.availableCouponsList();
    this.fetchCouponCost();
  }

  availableCouponsList() {
    var couponType = this.props.params.name;
    // const id = this.props.params._id;
    //console.log('couponType', couponType);
    this.setState({ couponType: couponType });
    this.fetchRequest(couponType);
  }
  fetchRequest = (couponType) => {
    var _this = this;
    //axios.get('/available-coupons/' + couponType + '/page/1', {
    axios.get('/available-coupons/' + couponType, {
      headers: {
        "x-access-token": sessionStorage.token,
      },
    }).then((response) => {
      //console.log("response data", response.data.data);
      this.setState({ numOfPages: response.data.numofPages });
      _this.setState({ contests: response.data.data, fetchedData: response.data.data });
      _this.setState({ IconImage: response.data.data[0].couponIcon });
    });
  }


  fetchCouponCost() {
    var couponType = this.props.params.name;
    console.log("couponType -----------", this.props.params.name);
    var instance = axios.create({
      headers: { 'x-access-token': sessionStorage.getItem('token') }
    });
    instance.get('/couponcost/' + couponType).then((response) => {
      //console.log("coupon cost------------------", response.data.data);
      this.setState({ couponCost: response.data.data });
    });
  }


  showModal = (e) => {
    var id = e.target.id;
    console.log("get modal id", id);
    var _self = this;
    var _this = this;
    this.setState({
      visible: true, coupons: ''
    });
    this.getCouponCodeData(id);

  }



  getCouponCodeData(id) {
    var tok = sessionStorage.getItem("token");
    var _this = this;
    axios.get('/coupon/' + id, {
      headers: {
        "x-access-token": sessionStorage.token,
      },

    })
      .then(function (response) {
        // console.log("get view resposne in all", response.data.data)
        const getdata = response.data.data
        _this.setState({
          coupons: getdata,
          name: getdata.couponFrom,
          couponCode: getdata.couponCode,
          couponCodeStatus: getdata.couponStatus,
          imageWithCode: getdata.imageWithCode,
          points: getdata.points,
          couponBeginDate: getdata.couponBeginDate,
          couponEndDate: getdata.couponEndDate,
          pin: getdata.pin
        })
        if (getdata.userId) {
          _this.setState({
            userId: getdata.userId.fullName,
            redemptionDate: getdata.redemptionDate
          })
        }
      })
      .catch(function (error) {
        //   console.log(error);
      });
  }

  handleOk = (e) => {
    this.setState({
      visible: false
    });
  }

  handleCancel = (e) => {
    this.setState({ visible: false, coupons: '' });
    this.setState({ membersvisible: false });
  }

  onCouponsTypeChange(e) {
    var couponType = e;
    this.fetchRequest(couponType);
  }



  onCouponsCostChange(e) {
    var couponCost = e;
    if (e !== "All") {
      console.log("Coupon Type--->", couponCost);
      this.filterCouponCost(couponCost);
    } else {
      this.setState({ contests: this.state.fetchedData })
    }
     this.setState({
        cost: couponCost
      })
  }



  filterCouponCost = (value) => {
    //var FanclubId = this.props.fanclubid;
    const id = this.props.params._id;
    var couponType = this.props.params.name;
    var _this = this;
    var typevale = value;
    //console.log("typevale -----------", typevale);
    //console.log("User -----------", sessionStorage.getItem('token'));
    var instance = axios.create({
      // timeout: 3000,
      headers: { 'x-access-token': sessionStorage.getItem('token') }
    });
    //  instance.get('/available-coupons/' + couponType + '/page/1').then((response) => {
    instance.get('/available-coupons/' + couponType).then((response) => {
      //console.log("club Feeds Result------------------", response.data.data);
      // this.setState({ clubFeeds: response.data.data });
      _this.setState({ cont: response.data.data });
      const render = [];
      for (let key in _this.state.cont) {
        var contest = _this.state.cont[key]
        if (contest.couponCost === typevale) {
          render.push(contest);
        }
        // console.log("comments", contest.comments)
      }
      _this.setState({ contests: render });
    });
  }

  render() {
    const { visible } = this.state;
    const { imageWithCode } = this.state;
    const mapCoupons = this.state.couponTypes.map((coupon) => <Option value={coupon.couponFrom}>{coupon.couponFrom}</Option>);
    const mapCoupon1 = this.state.couponTypes.map((coupon) => <Option value={coupon.couponFrom}>{coupon.couponFrom}</Option>);
    const currentTodos = clone(this.state.contests);
    const mapCouponCost = this.state.couponCost.map((coupon) => <Option value={coupon._id}>{coupon._id}</Option>);

    //console.log("------", currentTodos);
    var cstatus = '';
    if (this.state.couponCodeStatus) {
      cstatus = "Available"
    } else {
      cstatus = "Redeemed"
    }
    const menu = (
      <Menu>
        <Menu.Item>
          Action 1
        </Menu.Item>
        <Menu.Item>
          Action 2
        </Menu.Item>
      </Menu>
    );

    const data5 = [];
    let tabledata = currentTodos.map((item, index) => {
      data5.push({
        key: index,
        couponInfoId: item.couponInfoId,
        _id: item._id,
        couponFrom: item.couponFrom,
        couponType: item.couponType,
        fanCoins: item.fanCoins,
        couponCost: item.couponCost,
        couponBeginDate: moment(item.couponBeginDate).format('L'),
        couponEndDate: moment(item.couponEndDate).format('L'),
        couponStatus: item.couponStatus === true ? "Available" : "Redeemed",
        operation: <div>
          <Button id={item.couponInfoId + '/' + item._id} onClick={this.showModal} className="deleteBtn">
            <Icon type="eye-o" className="EyeFont16" />
          </Button>
        </div>
      })
    })



    const columns = [
      {
        title: 'Coupon Type',
        dataIndex: 'couponType',
        key: 'couponType'
      },
      {
        title: 'Coupon brand',
        dataIndex: 'couponFrom',
        key: 'couponFrom',

      },
      {
        title: 'Fan Coins',
        dataIndex: 'fanCoins',
        key: 'fanCoins',
      }, {
        title: 'Coupon Cost',
        dataIndex: 'couponCost',
        key: 'couponCost',
      },
       {
        title: 'Coupon Code',
        dataIndex: 'couponCost12',
        key: 'couponCost12',
      },
      {
        title: 'Begin Date',
        dataIndex: 'couponBeginDate',
        key: 'couponBeginDate',

      },
      {
        title: 'End Date',
        dataIndex: 'couponEndDate',
        key: 'couponEndDate',

      },
      {
        title: 'Status',
        dataIndex: 'couponStatus',
        key: 'couponStatus',

      }, {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',

      },
    ];

    const couponsData = currentTodos.map((contest, index) => {
      var couponStatus = '';
      if (contest.couponStatus) {
        couponStatus = <span className="AvlblTxT">Available</span>
      }
      else {
        couponStatus = <span className="AvlblTxT">Redeemed</span>
      }
      return <li key={index}> <div className="ui card">
        <Col span={6} xs={12} sm={12} xl={4} lg={6} md={6}>
          <Card>
            <div className="image hover01">
              <figure>
                <img id={contest.couponInfoId + '/' + contest._id} onClick={this.showModal} src={contest.couponIcon} alt="Contest Cover" width='100%' height='154px' style={{ 'border-bottom': '1px solid #eee' }} />
              </figure>
            </div>
            <div className="cardContent">

              <ul key={index}>
                <li style={{ marginBottom: 10 }}>
                  <div className="list-inline" title={contest.fanCoins}>
                    <p className="CouponsAvblFanCoins"><span> <span className="FancoinsTxt">Fancoins:</span> <span className="FancoinsTxt">{contest.fanCoins}</span></span> <span className="CouponsAvaillistcosts"><span className="CouponCostTxt">Coupon Cost:</span> <span className="CouponCostTxt">{contest.couponCost}</span> </span></p>

                  </div></li>
                <li><h4 className="contestCardTitle" style={{ marginTop: "-8px" }}    >{contest.couponFrom}</h4></li>
                <li style={{ marginBottom: 10 }}>Begin Date: {moment(contest.couponBeginDate).format('L')}</li>
                <li style={{ marginBottom: 10 }}>End Date: {moment(contest.couponEndDate).format('L')} </li>
              </ul>

            </div>
            <div className="cardFooter">
              <ul className="list-inline">
                <li><span>Status:{couponStatus}</span></li>
                <li className="floatRight">
                  <Dropdown getPopupContainer={triggerNode => triggerNode.parentNode} overlay={<Menu>
                    <Menu.Item key="4">
                      <span id={contest.couponInfoId + '/' + contest._id} name={contest._id + ',' + contest.couponInfoId} onClick={this.showModal}>View Details</span>
                    </Menu.Item>
                  </Menu>} trigger={['click']}>
                    <a className="ant-dropdown-link" href="#">
                      <img src={viewMore} style={{ width: 16 }} />
                    </a>
                  </Dropdown>
                </li>
              </ul>
            </div>
          </Card>
        </Col>
      </div>
      </li>;
    });

    if (currentTodos.length === 0) {
      var container = (
        <div className="example">
          {currentTodos.length === 0 ? <div id="noFunclubs">There are no Coupons to display</div> : ""}
        </div>
      );
      return (<Dashboard> <div> <div> <Col span={24} className='CouponsAvilableListsubMenu'>
        {/*    <Col span={2}><h2 style={{ fontSize: 16, marginTop: 5 }}></h2></Col> */}
        <Col span={10} className='fun2winSelect'>
          {/* <Select getPopupContainer={triggerNode => triggerNode.parentNode} defaultValue="Select Coupon" style={{ width: 150 }} onChange={this.onCouponsTypeChange}>
            {mapCoupons}
          </Select> */}

          <h2 className="SubTitleCoupons">{this.props.params.name} Coupons </h2>
        </Col>

        <Col span={14}>

          <Link to="/allcoupons" style={{ float: 'right' }}><Button type="primary" style={{ float: 'right' }}><Icon type="arrow-left" />Back to Coupons</Button></Link>
        </Col>
      </Col>
      </div>
        <div style={{ paddingTop: '20%' }}>
          {container}
        </div>
      </div>
      </Dashboard>
      )
    } else {
      return (
        <Dashboard>
          <div>
            <div>
              <Col span={24} className='CouponsAvilableListsubMenu'>
                {/*   <Col span={2}><h2 style={{ fontSize: 16, marginTop: 5 }}></h2></Col> */}
                <Col span={10} className='fun2winSelect'>
                  {/* <Select getPopupContainer={triggerNode => triggerNode.parentNode} defaultValue="Select Coupon" style={{ width: 150 }} onChange={this.onCouponsTypeChange}>
                    {mapCoupons}
                  </Select> */}
                  <h2 className="SubTitleCoupons">{this.props.params.name} Coupons </h2>

                </Col>

                <Col span={14}>

                  <Link to="/allcoupons" style={{ float: 'right' }}><Button type="primary" style={{ float: 'right' }}><Icon type="arrow-left" />Back to Coupons</Button></Link>
                </Col>
              </Col>
            </div>



            <div className="clear"></div>
            <ul id="pagenumberLiFun2win" className="list-inline">
              {/* <Pagination defaultCurrent={1} onChange={this.pageChange.bind(this)} total={this.state.numOfPages * 10} /> */}
            </ul>
            <div className="">
              <div className="CouponSubmenu">
                <ul>
                  {/* {couponsData} */}
                  <Row>
                    <Col span={4}>
                      <h6 className="AddCoupondashh6Fnt">Select Coupon Cost</h6>
                      <FormItem className="fontWeightBold">
                        <Select className="CouponsdashSelect1" getPopupContainer={triggerNode => triggerNode.parentNode}
                          value={this.state.cost}
                          onChange={this.onCouponsCostChange}>
                          {mapCouponCost}
                          <Option value="All">All</Option>
                        </Select>
                        {/* <p id="points" style={{ color: "red" }}>{this.state.errors.m3}</p> */}
                      </FormItem>
                    </Col>
                  </Row>
                </ul>


                <Table className="CoinsearnedReportstable ReedemCouponsreportsTableheading TableHeadingResponsive" dataSource={data5} columns={columns} pagination={{ pageSize: 20 }} />

              </div>  </div>


            <Modal
              title="Coupon Details"
              visible={visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={null}
              style={{ top: 20 }}
              >
              {this.state.coupons ? <div className="challengeDetails couponmodal">
                <img className="imgCpon" src={this.state.IconImage} alt="Contest Cover" width="100%" />
                <p className="mrgnTop20"><b className="GreyTxtCoupons">Coupon Begin Date & Time: </b> {moment(this.state.couponBeginDate).format('L')}</p>
                <p><b className="GreyTxtCoupons">Coupon End Date & Time: </b> {moment(this.state.couponEndDate).format('L')}</p>
                <p><b className="GreyTxtCoupons">Coupon Status:</b> {cstatus}</p>

                <Col span={24} style={{ float: 'right' }}>
                  <Button type="primary" className="rightAlignOkaybtn" onClick={this.handleCancel}> Ok</Button>
                </Col>
              </div> : (<h2>
                <div className="example">
                  <Spin tip="Loading...">
                  </Spin>
                </div>

              </h2>)}
            </Modal>
          </div>


        </Dashboard>
      );
    }
  }
}
export default (OpendList);
/* eslint-disable */