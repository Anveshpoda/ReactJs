/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import css from './Coupons.css';
import clone from 'clone';
import axios from 'axios';
import moment from 'moment';
import $ from 'jquery';
import Dashboard from '../Dashboard/Dashboard';
import { Scrollbars } from 'react-custom-scrollbars';
import coupons from './../images/coupons.PNG';
import AddNewCoupon from './newcopuons/AddNewCoupon';
import BulkUpload from './newcopuons/BulkUpload';
//import UserWiseReports from './newcopuons/UserWiseReports';
//import RedeemedReports from './newcopuons/RedeemedReports';
//import CoinsEarnedReport from './newcopuons/CoinsEarnedReport';
//import CoinsRedeemedReport from './newcopuons/CoinsRedeemedReport';
import SingleCoupon from './newcopuons/AddCouponCode';
import pvr from './../images/pvr.PNG';
import voucher123 from './../images/voucher123.png';
import paytm from './../images/paytm.PNG';
import { Spin, Layout, Menu, Breadcrumb, Icon, Col, Card, Row, Button, Dropdown, Modal, Form, Select, Upload, Input, DatePicker, message } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';
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
function handleChange(value) {
    console.log(`selected ${value}`);
}

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
class RedeemedDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contests: [],
            availCoupons: [],
            errors: {},
            id: '',
            couponFrom: '',
            couponDescription: '',
            couponCost: '',
            fanCoins: '',
            couponType: '',
            couponIcon: '',
            couponImageUrl: '',
            voucherTypes: [],
            couponTypes: [],
            couponCode: '',
            couponStatus: 'True',
            couponBeginDate: new Date(),
            couponEndDate: '',
            imageUrl: '',
            couponCost: [],
            cost: '',
            couponPin: '',
            FunListloading: true,
            messageVisibility: false,
            role: ''
        }
        this.baseState = this.state;
        this.changecouponBeginDate = this.changecouponBeginDate.bind(this);
        this.changecouponEndDate = this.changecouponEndDate.bind(this);
        this.onCouponsTypeChange = this.onCouponsTypeChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.ChangeCouponPin = this.ChangeCouponPin.bind(this);
        this.onCouponsCostChange = this.onCouponsCostChange.bind(this);
    }
    state = {
        visible: false,
        disable: true,
        visible8: false,
        disable8: true,

    }
    componentWillMount() {
        var user = JSON.parse(sessionStorage.getItem('user'));

        if (user.permissions !== '') {

            this.setState({ role: user.permissions.coupons })
        }
        this.getAllRedeemCoupons();
        this.getcouponType();
    }

    getAllRedeemCoupons = () => {
        // console.log("User -----------", sessionStorage.getItem('token'))
        var instance = axios.create({
            headers: { 'x-access-token': sessionStorage.getItem('token') }
        });
        instance.get('/getAllRedeemCoupons').then((response) => {
            //  console.log("Data couponType------------------", response.data.data);
            // var keys = Object.keys(response.data.data)
            // console.log(keys, 'keysssssssssss', keys.length, '1245')
            if (response.data.data.length === 0) {
                this.setState({ messageVisibility: true })
            }
            this.setState({
                availCoupons: response.data.data,
                voucherTypes: Object.keys(response.data.data),
                FunListloading: false
            });
        });
    }

    getcouponType = () => {
        // console.log("User -----------", sessionStorage.getItem('token'))
        var instance = axios.create({
            headers: { 'x-access-token': sessionStorage.getItem('token') }
        });
        instance.get('/coupon-types').then((response) => {
            // console.log("Data couponType------------------", response.data.data);
            this.setState({ couponTypes: response.data.data });
        });
    }

    showModal = (e) => {
        // var id = e.target.id;
        // var _this = this;   
        this.setState({
            visible: true,
        });
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        // console.log(e);
        this.setState({
            visible: false,
        });
        this.getAllRedeemCoupons();
    }
    handleCancel = (e) => {
        // console.log(e);
        this.setState({
            visible: false,
        });
        this.getAllRedeemCoupons();
    }


    showModal8 = () => {
        this.setState({
            visible8: true,
        });
    }
    handleOk8 = (e) => {
        // console.log(e);
        this.setState({
            visible8: false,
        });
        this.getAllRedeemCoupons();
    }
    handleCancel8 = (e) => {
        //  console.log(e);
        this.setState({
            visible8: false,
        });
        this.getAllRedeemCoupons();
    }

    //-------------------* Add One Coupon  *----


    handleChange(e) {
        if (e) {
            this.state.errors.m2 = ''
        }
        //e.preventDefault();
        $("Input").on("keydown", function (e) {
            if (e.which === 32 && !this.value.length)
                e.preventDefault();
        });
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    ChangeCouponPin(e) {

        //e.preventDefault();
        $("Input").on("keydown", function (e) {
            if (e.which === 32 && !this.value.length)
                e.preventDefault();
        });
        this.setState({
            couponPin: e.target.value
        })
    }

    changecouponBeginDate(value) {
        var value = moment(value).format('YYYY-MM-DD');
        this.setState({
            couponBeginDate: value
        });
    }

    changecouponEndDate(value) {
        if (value) {
            this.state.errors.m5 = '',
                this.state.errors.m6 = ''
        }
        var value = moment(value).format('YYYY-MM-DD');
        this.setState({
            couponEndDate: value
        });
    }

    onCouponsTypeChange(e) {
        if (e) {
            this.state.errors.m1 = ''
        }
        var couponType = e;
        this.setState({
            couponId: couponType
        })
        // console.log("Coupon Type--->", couponType);
        this.fetchCouponCost(couponType);
    }

    fetchCouponCost(couponType) {
        // console.log("User -----------", sessionStorage.getItem('token'))
        var instance = axios.create({
            headers: { 'x-access-token': sessionStorage.getItem('token') }
        });
        instance.get('/couponcost/' + couponType).then((response) => {
            //  console.log("coupon cost------------------", response.data.data);
            this.setState({ couponCost: response.data.data });
        });
    }

    onCouponsCostChange(e) {
        if (e) {
            this.state.errors.m3 = ''
        }
        var couponCost = e;
        this.setState({
            cost: couponCost
        })
        // console.log("Coupon Type--->", couponCost);
        //  this.fetchCouponCost(couponType);
    }

    changeCouponStatus(e) {
        // if (e) {            
        //     this.state.errors.m3 = ''
        //   }
        var couponStatus = e;
        this.setState({
            couponStatus: couponStatus
        })
        // console.log("Coupon Type--->", couponStatus);
        //this.fetchRequest(couponType);
    }

    uploadBannerImage = (info) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            this.setState({
                imageUrl: info.file.response.data
            })
        }
    }

    handleSubmit = (e) => {
        message.destroy();
        let errors = {};
        if (this.state.couponId === "" || this.state.couponId === undefined) {
            errors.m1 = "This field is mandatory";
        }
        else if (this.state.cost === undefined || this.state.cost === '') {
            errors.m3 = "This field is mandatory";
        }
        else if (this.state.couponCode === undefined || this.state.couponCode === '') {
            errors.m2 = "This field is mandatory";
        }
        else if (this.state.couponBeginDate === undefined || this.state.couponBeginDate === '') {
            errors.m4 = "Please select a date";
        }
        else if (this.state.couponEndDate === undefined || this.state.couponEndDate === '') {
            errors.m5 = "Please select a date";
        }
        else if (this.state.couponBeginDate > this.state.couponEndDate) {
            errors.m6 = "Please enter a valid date";
        }
        // else if (this.state.imageUrl === undefined || this.state.imageUrl === '') {
        //     errors.m7 = "Please upload image";
        // }

        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            var cid = this.state.couponId;
            var cCost = this.state.cost;
            var data = {
                "couponCode": this.state.couponCode.trim(),
                "couponStatus": this.state.couponStatus,
                "couponBeginDate": this.state.couponBeginDate,
                "couponEndDate": this.state.couponEndDate,
                // "imageWithCode": this.state.imageUrl,
                "pin": this.state.couponPin
            }
            this.addCouponCode(data, cid, cCost);
        }
    }

    addCouponCode = (data, cid, cCost) => {
        var _this = this;
        const url = '/couponCard/' + cid + '/' + cCost;
        //  console.log('URL-----', url);
        var request = new Request(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                'x-access-token': sessionStorage.getItem('token')
            }
        });
        fetch(request)
            //.then(response => response.json())
            .then(function (response) {
                if (response.status === 200) {
                    message.success('Coupon code added successfully!');
                    _this.setState({
                        couponCode: '',
                        imageUrl: '',
                        couponId: '',
                        couponEndDate: '',
                        cost: '',
                        visible8: false,
                        couponPin: ''
                    })
                    _this.getAllRedeemCoupons();
                }
                else {
                    message.error(`unable to update user refer coins.`, 5);
                    //  console.log("dataresponse", response);
                }
            })
    }



    render() {
        const { imageUrl } = this.state;
        const mapCoupon = this.state.couponTypes.map((coupon) => <Option value={coupon.couponFrom}>{coupon.couponFrom}</Option>);
        const mapCouponCost = this.state.couponCost.map((coupon) => <Option value={coupon._id}>{coupon._id}</Option>);

        const couponslist = clone(this.state.availCoupons);
        const menu = (
            <Menu>
                {this.state.role.addNewBrand === true ?
                    <Menu.Item key="1">
                        <a onClick={() => this.refs.child.showModal()}> Create Business</a>
                        <AddNewCoupon ref="child" />
                    </Menu.Item> : null}
                {this.state.role.addNewCoupon === true ?
                    <Menu.Item key="2">  <a onClick={this.showModal8} >
                        Individual Coupon</a></Menu.Item> : null}
                {this.state.role.bulkUpload === true ?
                    <Menu.Item key="3"> <a onClick={() => this.refs.child1.showModal()}>
                        Bulk Upload</a>
                        <BulkUpload ref="child1" getCoupons={this.getAllRedeemCoupons} />
                    </Menu.Item> : null}
            </Menu>
        );



        const renderTodos = couponslist.map((voucher, index) => {
            return (<div key={index}> <div className="Funclubshome">
                <Row>
                    <Col className="funclubhomeheader" span={24} style={{ marginBottom: '30', padding: '15px 0px', borderBottom: '1px solid #f0f0f0' }} >
                        <Col span={12}>
                            <h3>{voucher.couponType}</h3>
                        </Col>
                        <Col span={8}>
                        </Col>
                        <Col span={4}>
                            {/* <Link to={`${coupons.type}`}><h3 style={{ float: 'right' }}><a href=" ">View All<Icon type="double-right" /></a></h3></Link> */}
                        </Col>
                    </Col>
                </Row>
                <Row>
                    {voucher.coupons.map((coupons, index) => {
                        if (coupons.totalCoupons) {
                            var totalCoupons = coupons.totalCoupons;
                        } else {
                            var totalCoupons = 0;
                        }
                        return (<Col span={6} xs={12} sm={12} xl={4} lg={6} md={6}>
                            <Card>
                                <Link to={`/allcoupons/redeem-coupons/${coupons.type}`}>
                                    <div className="image hover01">
                                        <figure>
                                            <img src={coupons.couponImageUrl} alt="Contest Cover" width='100%' height='154px' style={{ 'border-bottom': '1px solid #eee' }} />
                                        </figure>
                                    </div>
                                </Link>
                                <div className="cardContent">
                                    <h3 className="couponCardTitle">{coupons.type ? coupons.type : 'UnDefined'}</h3>
                                    {/* <h4 className="couponSubText">{coupons.expiryStartDate} to {coupons.expiryEndDate}</h4> */}
                                </div>
                                <div className="cardFooter">
                                    <ul className="list-inline">
                                        <li>
                                            <img src={voucher123} alt="contestcover" className="CouponsDashavimg" />  {/*  <h3 className="couponCardFooterh3">Total Redeemed Coupons  </h3>*/} </li> <li className="AvailCouponscount"> : <span> {totalCoupons} </span></li>
                                    </ul>
                                </div>
                            </Card>
                        </Col>)

                    })}
                </Row>
            </div>
            </div>)
        }
        );

        return (
            <Dashboard>
                <div>
                    <Col span={24} className='challengesmenu'>
                        <div className="SubMenuCoupons">
                            <Col span={14}>
                                <Col span={7} xl={{ span: 4 }} lg={{ span: 6 }}><h2 className="couponspageTitle">Coupons & Vouchers</h2></Col>
                                {/* <Col span={2}><h2 style={{ fontSize: 16, marginTop: 5 }}>Online Shopping</h2></Col> */}
                                <Col span={7}>
                                    <Select
                                        className="CouponsdashmainSelects"
                                        getPopupContainer={triggerNode => triggerNode.parentNode}
                                        placeholder="Select Coupon Type" style={{ width: '100%' }} onChange={handleChange}>
                                        <Option value="jack">Gift Card</Option>
                                        <Option value="lucy">Movie Tickets</Option>
                                        <Option value="lucy1">Restaurant Coupons</Option>
                                    </Select>
                                </Col>
                                <Col span={10}>
                                    <RangePicker
                                        className="Couponsdashdate"
                                        getCalendarContainer={triggerNode => triggerNode.parentNode}
                                        dateRender={(current) => {
                                            const style = {};
                                            if (current.date() === 1) {
                                                style.border = '1px solid #1890ff';
                                                style.borderRadius = '50%';
                                            }
                                            return (
                                                <div className="ant-calendar-date" style={style}>
                                                    {current.date()}
                                                </div>
                                            );
                                        } }
                                        />
                                </Col>

                            </Col>

                            <Col span={10}>
                                <nav className='CouponsNavigations' role="navigation">
                                    <Link to="/allcoupons" className='Couponsitem' activeClassName='active'>Available</Link>
                                    <Link to="/allcoupons/redeemed" className='Couponsitem' activeClassName='active'>Redeemed</Link>
                                    {this.state.role.addNewBrand === true || this.state.role.addNewCoupon === true || this.state.role.bulkUpload === true ? <Dropdown getPopupContainer={triggerNode => triggerNode.parentNode} overlay={menu}>
                                        <Button className="ReedmedCouponsDashboardbtn" style={{ marginLeft: 8 }}>
                                            <Icon type="plus" /> Add Coupons
                                </Button>
                                    </Dropdown> : ''}
                                    {/* <Dropdown getPopupContainer={triggerNode => triggerNode.parentNode} overlay={menu1}>
                                        <Button style={{ marginLeft: 8 }}>
                                            <Icon type="plus" /> Analytics
                                </Button>
                                    </Dropdown> */}
                                </nav>
                            </Col>
                        </div>
                    </Col>
                    <Col span={24}>
                        {/* {renderTodos} */}

                        <Row className="funClubsRenss">
                            <Spin spinning={this.state.FunListloading}>
                                {renderTodos}
                            </Spin>
                            {this.state.messageVisibility ? <div id="noFunclubs">There are no Coupons to display</div> : ""}
                        </Row>

                    </Col>


                    <Modal className="dashcouponsmodal"
                        title="Add Coupon - Individual"
                        visible={this.state.visible8}
                        onOk={this.handleOk8}
                        onCancel={this.handleCancel8}
                        width='550'
                        style={{ top: 20 }}
                        footer={null}
                        >
                        <Scrollbars style={{ height: '65vh', padding: '0px 10px' }}>
                            <div>
                                <Col span={24} >
                                    <Col span={24} className="">
                                        <Col span={11}>
                                            <h6 className="AddCoupondashh6Fnt">Select Coupon</h6>
                                            <FormItem className="fontWeightBold">

                                                <Select className="ReddemedCoupnsdashselect"
                                                    getPopupContainer={triggerNode => triggerNode.parentNode}
                                                    value={this.state.couponId}
                                                    onChange={this.onCouponsTypeChange}>
                                                    {mapCoupon}
                                                </Select>
                                                <p id="points" style={{ color: "red" }}>{this.state.errors.m1}</p>
                                            </FormItem>
                                        </Col>
                                        <Col span={11} offset={1}>
                                            <h6 className="AddCoupondashh6Fnt">Select Coupon Cost</h6>
                                            <FormItem className="fontWeightBold">
                                                <Select className="CouponsdashSelect1" getPopupContainer={triggerNode => triggerNode.parentNode}
                                                    value={this.state.cost}
                                                    onChange={this.onCouponsCostChange}>
                                                    {mapCouponCost}
                                                </Select>
                                                <p id="points" style={{ color: "red" }}>{this.state.errors.m3}</p>
                                            </FormItem>
                                        </Col>
                                        {/*     <Col span={7} offset={1} >
                                            <h6 className="AddCoupondashh6Fnt">Select Coupon Status</h6>
                                            <FormItem className="fontWeightBold">

                                                <Select className="ReddemedCoupnsdashselect2"
                                                    showSearch
                                                    getPopupContainer={triggerNode => triggerNode.parentNode}

                                                    defaultValue="True"
                                                    placeholder="Select Coupon Status"
                                                    onChange={this.changeCouponStatus} allowClear disabled>
                                                    <Option value="True">True</Option>
                                                    <Option value="False">False</Option>
                                                </Select>
                                            <span id="points" style={{ color: "red" }}>{this.state.errors.m3}</span>
                                            </FormItem>
                                        </Col> */}
                                    </Col>
                                    <Col span={24}>
                                        <Col span={11}>
                                            <h6 className="AddCoupondashh6Fnt">Coupon Code</h6>
                                            <FormItem className="fontWeightBold">

                                                <Input placeholder="Coupon Code" name="couponCode" maxLength="20" value={this.state.couponCode} onChange={this.handleChange} />
                                                <p id="points" style={{ color: "red" }}>{this.state.errors.m2}</p>
                                            </FormItem>
                                        </Col>
                                        <Col span={11} offset={1}>
                                            <h6 className="AddCoupondashh6Fnt">Coupon Pin</h6>
                                            <FormItem className="fontWeightBold">
                                                <Input placeholder="Coupon Code" name="couponCode" maxLength="20" value={this.state.couponPin} onChange={this.ChangeCouponPin} />
                                                {/* <span id="points" style={{ color: "red" }}>{this.state.errors.m3}</span> */}
                                            </FormItem>
                                        </Col>
                                    </Col>
                                    <Col span={24}>
                                        <Col span={11}>
                                            <h6 className="AddCoupondashh6Fnt">Valid From</h6>
                                            <FormItem className="fontWeightBold">

                                                <DatePicker className="BorderDisabledCouponsPopUp CouponsPopupDtpckrWidth" getCalendarContainer={triggerNode => triggerNode.parentNode} format={dateFormat} defaultValue={this.state.couponBeginDate ? moment(this.state.couponBeginDate, dateFormat) : ''}
                                                    disabledDate={disabledDate} onChange={this.changecouponBeginDate} disabled />
                                                <p id="points" style={{ color: "red" }}>{this.state.errors.m4}</p>
                                            </FormItem>
                                        </Col>
                                        <Col span={12}>
                                            <h6 className="AddCoupondashh6Fnt paddingLft20">Valid To</h6>
                                            <FormItem className="fontWeightBold" >

                                                <DatePicker className="CouponsPopupDtpckrWidthRight" getCalendarContainer={triggerNode => triggerNode.parentNode} format={dateFormat} disabledDate={disabledDate} value={this.state.couponEndDate ? moment(this.state.couponEndDate, dateFormat) : ''} onChange={this.changecouponEndDate} />
                                                <p id="points" style={{ color: "red" }}>{this.state.errors.m5}</p>
                                                <p id="points" style={{ color: "red" }}>{this.state.errors.m6}</p>
                                            </FormItem>
                                        </Col>
                                    </Col>

                                    <Col span={5} className="couponsbtn">
                                        <Button type="primary" className='couponssaveBtn' onClick={this.handleSubmit.bind(this)} >Save</Button>
                                    </Col>
                                </Col>
                            </div>
                        </Scrollbars>
                    </Modal>



                    <Modal className="couponsmodalB"
                        title="Upload Stock/Coupons"
                        visible={this.state.visible9}
                        onOk={this.handleOk9}
                        onCancel={this.handleCancel9}
                        width='817'
                        style={{ top: 20 }}
                        footer={null}
                        >

                        <div>
                            <BulkUpload ref="child1" getCoupons={this.getAllRedeemCoupons} />
                        </div>

                    </Modal>
                </div>
            </Dashboard>

        );

    }
}


export default (RedeemedDashboard);
/* eslint-disable */