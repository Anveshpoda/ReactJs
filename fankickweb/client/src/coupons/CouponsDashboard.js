/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router';
import RichTextEditor from 'react-rte';
import clone from 'clone';
import css from './Coupons.css';
import moment from 'moment';
import axios from 'axios';
import $ from 'jquery';
import { Scrollbars } from 'react-custom-scrollbars';
import coupons from './../images/coupons.PNG';
import AddNewCoupon from './newcopuons/AddNewCoupon';
import BulkUpload from './newcopuons/BulkUpload';
import SingleCoupon from './newcopuons/AddCouponCode';
import EditCouponBrand from './EditCouponBrand.js';
import voucher12 from './../images/voucher12.png';
// import coupontypes from './../images/coupontypes.png';
import AvailCouponcount123 from './../images/AvailCouponcount123.png';
import pvr from './../images/pvr.PNG';
import paytm from './../images/paytm.PNG';
import { Spin, Layout, Menu, Breadcrumb, Icon, Col, Card, Row, Button, Dropdown, Modal, Form, Select, Upload, Input, DatePicker, message } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const format = 'h:mm a';
const dateFormat = 'YYYY-MM-DD';
// const { MonthPicker, RangePicker } = DatePicker;
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
class CouponsDashboard extends React.Component {
    static propTypes = {
        onTermsChange: PropTypes.func
    };
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
            redirect: false,
            couponTypes: [],
            couponCode: '',
            couponStatus: 'True',
            couponBeginDate: new Date(),
            couponEndDate: '',
            imageUrl: '',
            couponCost: [],
            cost: '',
            couponPin: '',
            couponPrices: [],
            coins: [],
            couponTypeName: "",
            couponFromName: "",
            editCouponCost: "",
            editFanCoins: "",
            errors1: {},
            role: '',
            FunListloading: true,
            messageVisibility: false,
            visible1: false,
            loading: false,
            visible12: false,
            disable12: true,
            value: RichTextEditor.createEmptyValue(),
            editCouponImage: "",
            editCouponIcon: "",
            termsAndConditions: RichTextEditor.createEmptyValue(),
            editCoupons: {}
        }
        this.baseState = this.state;
        this.changecouponBeginDate = this.changecouponBeginDate.bind(this);
        this.changecouponEndDate = this.changecouponEndDate.bind(this);
        this.onCouponsTypeChange = this.onCouponsTypeChange.bind(this);
        this.redirectpage = this.redirectpage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.ChangeCouponPin = this.ChangeCouponPin.bind(this);
        this.onCouponsCostChange = this.onCouponsCostChange.bind(this);
    }
    static propTypes = {
        onTermsChange: PropTypes.func
    };

    state = {
        visible: false,
        disable: true,
        // value: RichTextEditor.createEmptyValue()
    }


    componentWillMount() {
        var user = JSON.parse(sessionStorage.getItem('user'));

        if (user.permissions !== '') {

            this.setState({ role: user.permissions.coupons })
        }
        this.getAllAvailCoupons();
        this.getcouponType();
    }

    getAllAvailCoupons = () => {
        /// console.log("User -----------", sessionStorage.getItem('token'))
        var instance = axios.create({
            headers: { 'x-access-token': sessionStorage.getItem('token') }
        });
        instance.get('/getAllAvailCoupons').then((response) => {
            // console.log("Data couponType------------------", response.data.data);
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
            //  console.log("Data couponType------------------", response.data.data);
            this.setState({ couponTypes: response.data.data });
        });
    }
    redirectpage = (e) => {
        //const from = { pathname: '/dashboard' };
        //  console.log(e.target.id, 'keysssssssssss')
        this.setState({
            redirect: true,
        });
        this.test(e.target.id)
    }

    test = (id) => {
        if (this.state.redirect === true) {
            return <Redirect to='/allcoupons/opend-coupons' />;
        }
    }

    showModal = (e) => {
        // var id = e.target.id;
        // var _this = this;   
        this.setState({
            visible: true,
        });
        this.getAllAvailCoupons();
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
        this.getAllAvailCoupons();
    }
    handleOk = (e) => {
        // console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        // console.log(e);
        this.setState({
            visible: false,
        });
    }
    showModal8 = () => {
        this.setState({
            visible8: true,
        });
    }
    handleOk8 = (e) => {
        //  console.log(e);
        // this.setState({
        //     visible8: false,
        // });
        this.setState({
            couponCode: '',
            imageUrl: '',
            couponId: '',
            visible8: false,
            couponPin: '',
            cost: '',
            //  couponBeginDate: '',
            couponEndDate: ''
        })
        this.getAllAvailCoupons();
    }
    handleCancel8 = (e) => {
        // console.log(e);
        // this.setState({
        //     visible8: false,
        // });
        this.setState({
            couponCode: '',
            imageUrl: '',
            couponId: '',
            visible8: false,
            couponPin: '',
            cost: '',
            //  couponBeginDate: '',
            couponEndDate: ''
        })
        this.getAllAvailCoupons();
    }

    //----- New modal----//
    showModal12 = (coupons) => {
        console.log("coupons", coupons);
        this.setState({
            visible12: true, editCouponImage: coupons.couponImageUrl, editCoupons: coupons
        });
    }

    handleOk12 = (e) => {
        console.log(e);
        var data = {
            couponImage: this.state.editCouponImage
        }
        var getData = axios.create({
            headers: { 'x-access-token': sessionStorage.token }
        })
        getData.put('/editCouponImage/' + this.state.editCoupons.type, data).then((response) => {
            if (response.data.status === 200) {
                message.success(`Brand Image Successfully Edited`);
                this.setState({
                    visible12: false,
                });
                this.getAllAvailCoupons()
            } else {
                message.error(`Brand Image Edit Failed`)
            }
        })

    }

    handleCancel12 = (e) => {
        console.log(e);
        this.setState({
            visible12: false,
        });
    }

    //-------//
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
            couponId: couponType, cost: "", couponCode: "", couponPin: ""
        })
        // console.log("Coupon Type--->", couponType);
        this.fetchCouponCost(couponType);
    }

    fetchCouponCost(couponType) {
        //  console.log("User -----------", sessionStorage.getItem('token'))
        var instance = axios.create({
            headers: { 'x-access-token': sessionStorage.getItem('token') }
        });
        instance.get('/couponcost/' + couponType).then((response) => {
            //  console.log("coupon cost------------------", response.data.data);
            this.setState({ couponCost: response.data.data });
        });


    }

    showModalEditCouponBrand = (couponCosts, voucher, type) => {
        // console.log("voucher", voucher)
        if (couponCosts) {
            var couponCost = Object.keys(couponCosts);
            var fanCoins = Object.keys(couponCosts).map(k => couponCosts[k])
        }
        this.setState({
            visible1: true,
            loading: false,
            couponPrices: couponCost, coins: fanCoins, couponTypeName: voucher.couponType,
            couponFromName: type
        });
    }
    onTermsChange = (value) => {
        this.setState({ value });
        if (this.props.onChange) {
            this.props.onChange(
                value.toString('html')
            );
        }
    }

    onEditCouponCostChange = (e) => {
        var {couponPrices, coins} = this.state;
        for (var i = 0; i < couponPrices.length; i++) {
            if (couponPrices[i] === e) {
                this.setState({ editFanCoins: coins[i] });
                var req = axios.create({
                    params: {
                        couponCost: e,
                        fanCoins: coins[i],
                        couponFrom: this.state.couponFromName
                    },
                    headers: {
                        "x-access-token": sessionStorage.token, "Content-Type": "application/json"
                    }
                })
                req.get('/editCouponBrand').then((response) => {
                    if (response.data.data.length !== 0) {
                        this.setState({ editData: response.data.data, editCouponImage: response.data.data[0].couponImageUrl, editCouponIcon: response.data.data[0].couponIcon })
                        this.setState({ value: RichTextEditor.createValueFromString(response.data.data[0].termsAndConditions, 'html') })
                        console.log("bvjhbvjhbvjhb", response.data.data.couponImageUrl, response.data.data.couponIcon)
                        console.log("editData", response.data.data)
                    } else {
                        message.error(`There is no coupon brand available with the given inputs`)
                    }
                })
            }
        }
        this.setState({ editCouponCost: e });
        if (e != "") this.state.errors1.editCouponCost = "";
    }
    handleOkEdit = (e) => {
        console.log(e);
        var errors = {};
        if (this.state.editCouponCost === "") errors.editCouponCost = "*mandatory field";
        // if (this.state.editFanCoins === "") errors.editFanCoins = "*mandatory field";
        if (this.state.value === RichTextEditor.createEmptyValue()) errors.terms = "*mandatory field";
        if (this.state.editCouponImage === "") errors.editCouponImage = "*mandatory field";
        if (this.state.editCouponIcon === "") errors.editCouponIcon = "*mandatory field";
        this.setState({ errors1: errors })
        if (Object.keys(errors).length === 0) {
            var htmlvalue = this.state.value.toString('html')
            var htmlcode = "<html><head><link href='https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i' rel='stylesheet'></head><body><ul style='font-family:roboto;margin-Left:-50px;color:#929292'>" + htmlvalue + "</ul><body></html>"
            this.state.termsAndConditions = htmlcode;
            delete this.state.editData[0].couponsData;
            console.log("this", this.state.editData);
            var data = {
                ...this.state.editData,
                termsAndConditions: this.state.termsAndConditions,
                couponImageUrl: this.state.editCouponImage,
                couponIcon: this.state.editCouponIcon,
                couponImage: this.state.editCouponIcon
            }
            var req = axios.create({
                headers: { "x-access-token": sessionStorage.token }
            })
            req.put('/coupon/' + this.state.editData[0]._id, data).then((response) => {
                if (response.data.status === 200) {
                    message.success(`Coupon Brand Updated Successfully`);
                    this.getAllAvailCoupons();
                    this.setState({
                        visible1: false, couponTypeName: "", couponFromName: "", editCouponCost: "", editFanCoins: "",
                        editCouponImage: "", editCouponIcon: "", value: RichTextEditor.createEmptyValue()
                    })
                } else {
                    message.error(`Failed to update coupon brand`);
                    this.setState({
                        visible1: false, couponTypeName: "", couponFromName: "", editCouponCost: "", editFanCoins: "",
                        editCouponImage: "", editCouponIcon: "", value: RichTextEditor.createEmptyValue()
                    })
                }
            })
        }
    }
    handleCancelEdit = (e) => {
        console.log(e);
        this.setState({
            visible1: false, couponTypeName: "", couponFromName: "", editCouponCost: "", editFanCoins: "",
            editCouponImage: "", editCouponIcon: "", value: RichTextEditor.createEmptyValue()
        })
    }
    onEditCouponImageChange = (info) => {
        if (info.file.status === 'done') {
            if (info.file.response.data != "") this.state.errors1.editCouponImage = "";
            message.success(`${info.file.name} file uploaded successfully`);
            this.setState({
                editCouponImage: info.file.response.data
            })
        }
    }
    onEditCouponIconChange = (info) => {
        if (info.file.status === 'done') {
            if (info.file.response.data != "") this.state.errors1.editCouponIcon = "";
            message.success(`${info.file.name} file uploaded successfully`);
            this.setState({
                editCouponIcon: info.file.response.data
            })
        }
    }
    onChange = (value) => {
        this.setState({ value });
        if (this.props.onChange) {
            // Send the changes up to the parent component as an HTML string.
            // This is here to demonstrate using `.toString()` but in a real app it
            // would be better to avoid generating a string on each change.
            this.props.onChange(
                value.toString('html')
            );
        }
    };


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
        if (this.state.cost === undefined || this.state.cost === '') {
            errors.m3 = "This field is mandatory";
        }
        if (this.state.couponCode === undefined || this.state.couponCode === '') {
            errors.m2 = "This field is mandatory";
        }
        // if (this.state.couponBeginDate === undefined || this.state.couponBeginDate === '') {
        //     errors.m4 = "Please select a date";
        // }
        if (this.state.couponEndDate === undefined || this.state.couponEndDate === '') {
            errors.m5 = "Please select a date";
        }
        if (this.state.couponEndDate) {
            if (this.state.couponBeginDate > this.state.couponEndDate) {
                errors.m6 = "Please enter a valid date";
            }
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
            // console.log('update coupon data', data);
            this.addCouponCode(data, cid, cCost);

        }
    }

    addCouponCode = (data, cid, cCost) => {
        var _this = this;
        const url = '/couponCard/' + cid + '/' + cCost;
        // console.log('URL-----', url);
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
                        visible8: false,
                        couponPin: '',
                        couponEndDate: '',
                        cost: ''
                    })
                    _this.getAllAvailCoupons();
                }
                else {
                    message.error(`unable to update user refer coins.`, 5);
                    //   console.log("dataresponse", response);
                }
            })
    }




    render() {
        console.log("this.state coupons dash", this.state);
        if (this.state.editCouponIcon != "") this.state.errors1.editCouponIcon = "";
        if (this.state.editCouponImage != "") this.state.errors1.editCouponImage = "";
        const { imageUrl, value } = this.state;
        const mapCoupon = this.state.couponTypes.map((coupon) => <Option value={coupon.couponFrom}>{coupon.couponFrom}</Option>);
        const mapCouponCost = this.state.couponCost.map((coupon) => <Option value={coupon._id}>{coupon._id}</Option>);
        var costs = this.state.couponPrices.map((item) => <Option value={item}>{item}</Option>);
        var coins = this.state.coins.map((item) => <Option value={item}>{item}</Option>)
        const couponslist = clone(this.state.availCoupons);
        const uploadButton = (
            <div>

                <div className="ant-upload-text">Upload</div>
            </div>
        );
        // const imageUrl = this.state.imageUrl;
        // console.log("couponslist**************8",couponslist)
        const menu = (
            <Menu>
                {this.state.role.addNewBrand === true ?
                    <Menu.Item key="1">
                        <a onClick={() => this.refs.child.showModal()}> Create Business</a>
                        <AddNewCoupon ref="child" />
                    </Menu.Item> : null}
                {this.state.role.addNewCoupon === true ?
                    <Menu.Item key="2">  <a onClick={this.showModal8} >
                        Individual Coupon</a></Menu.Item>
                    : null}
                {this.state.role.bulkUpload === true ?
                    <Menu.Item key="3">
                        <a onClick={() => this.refs.child1.showModal()}>Bulk Upload</a>
                        <BulkUpload ref="child1" getCoupons={this.getAllAvailCoupons} />
                    </Menu.Item>
                    : null}
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
                        console.log("coupon", voucher)
                        if (coupons.totalCoupons) {
                            var totalCoupons = coupons.totalCoupons;
                        } else {
                            var totalCoupons = 0;
                        }
                        return (<Col span={6} xs={12} sm={12} xl={4} lg={6} md={6}>
                            <Card>
                                {/* <Link to={`/allcoupons/opend-coupons${coupons.type}`}> */}
                                <div className="Couponspreuploadbtn">
                                    <span onClick={this.showModal12.bind(this, coupons)}> <Icon className="Couponspreuploadbtnicons" type="upload" /> </span>
                                </div>
                                <Link to={`/allcoupons/${coupons.type}`}>
                                    <div className="image hover01">
                                        <figure>
                                            <img src={coupons.couponImageUrl} alt="Contest Cover" width='100%' height='154px' style={{ 'border-bottom': '1px solid #eee' }} />
                                        </figure>
                                    </div>
                                </Link>
                                <div className="cardContent">
                                    <h3 className="couponCardTitle">{coupons.type ? coupons.type : 'UnDefined'}</h3>
                                    {/* <h4 className="couponSubText">{coupons.expiryStartDate} to {coupons.expiryEndDate}</h4> */}
                                    <h4 className="couponSubText"> <span> Expiry Date: </span><span className="CouponsDashtimes"> {moment(coupons.expiryStartDate).format('L')} To {moment(coupons.expiryEndDate).format('L')} </span></h4>

                                </div>
                                <div className="couponscardFooter">
                                    <ul className="list-inline">
                                        <li>
                                            <ul className="list-inline">
                                                <li>
                                                    <img src={voucher12} alt="contestcover" className="CouponsDashavimg" />  {/*<h3 className="couponCardFooterh3"> Total Available Coupons : </h3>*/}</li><li className="AvailCouponscount"> <span>: </span> <span>    {totalCoupons} </span> </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <h3 className="couponCardFooterh3">
                                                {/*<span> <EditCouponBrand  couponsInfo={coupons.couponCosts}/></span>*/}
                                                <span><Icon type="edit" onClick={this.showModalEditCouponBrand.bind(this, coupons.couponCosts, voucher, coupons.type)} className="EditCouponBrand" /></span>
                                            </h3>
                                        </li>
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
            <div>
                <Col span={24} className='challengesmenu'>
                    <div className="SubMenuCoupons">
                        <Col span={14}>
                            <Col span={8} xl={{ span: 4 }} lg={{ span: 6 }}><h2 className="couponspageTitle">Coupons & Vouchers</h2></Col>
                            {/* <Col span={2}><h2 style={{ fontSize: 16, marginTop: 5 }}>Online Shopping</h2></Col> */}
                            <Col span={7} className="CouponsdashSelect">
                                <Select className="CouponsdashmainSelects"
                                    getPopupContainer={triggerNode => triggerNode.parentNode}
                                    placeholder="Select Coupon Type" style={{ width: '100%' }} onChange={handleChange}>
                                    <Option value="jack">Gift Card</Option>
                                    <Option value="lucy">Movie Tickets</Option>
                                    <Option value="lucy1">Restaurant Coupons</Option>
                                </Select>
                            </Col>
                            <Col span={9}>
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
                                    <Button className="CouponsDashboardbtn" style={{ marginLeft: 8 }}>
                                        <Icon type="plus" /> Add Coupons
                                </Button>
                                </Dropdown> : ''}

                                {/* <Dropdown overlay={menu1}>
                                    <Button style={{ marginLeft: 8 }}>
                                        <Icon type="plus" /> Analytics
                                </Button>
                                </Dropdown> */}

                            </nav>
                        </Col>
                    </div>
                </Col>
                <Col span={24}>
                    {/* <h2 className="couponstype">Online Shopping</h2> */}

                    <Row className="funClubsRenss">
                        <Spin spinning={this.state.FunListloading}>
                            {renderTodos}
                        </Spin>
                        {this.state.messageVisibility ? <div id="noFunclubs">There are no Coupons to display</div> : ""}
                    </Row>
                    {/* {renderTodos} */}
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
                                            <Select className="CouponsdashSelect1" getPopupContainer={triggerNode => triggerNode.parentNode}
                                                value={this.state.couponId || undefined}
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
                                                value={this.state.cost || undefined}
                                                onChange={this.onCouponsCostChange}>
                                                {mapCouponCost}

                                            </Select>
                                            <p id="points" style={{ color: "red" }}>{this.state.errors.m3}</p>
                                        </FormItem>
                                    </Col>
                                    {/*    <Col span={7} offset={1} className="CouponsdashSelectmainh">
                                        <h6 className="AddCoupondashh6Fnt">Select Coupon Status</h6>
                                        <FormItem className="fontWeightBold">
                                            <Select className="CouponsdashSelect2"
                                                showSearch
                                                getPopupContainer={triggerNode => triggerNode.parentNode}

                                                defaultValue="True"
                                                placeholder="Select Coupon Status"
                                                onChange={this.changeCouponStatus} allowClear disabled>
                                                <Option value="True">True</Option>
                                                <Option value="False">False</Option>
                                            </Select>
                                            {/* <span id="points" style={{ color: "red" }}>{this.state.errors.m3}</span>
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
                                            <Input placeholder="Coupon Pin" name="couponCode" maxLength="20" value={this.state.couponPin} onChange={this.ChangeCouponPin} />
                                            {/* <span id="points" style={{ color: "red" }}>{this.state.errors.m2}</span> */}
                                        </FormItem>
                                    </Col>
                                </Col>
                                <Col span={24}>
                                    <Col span={11}>
                                        <h6 className="AddCoupondashh6Fnt">Valid From</h6>
                                        <FormItem className="fontWeightBold">
                                            <DatePicker className="BorderDisabledCouponsPopUp" getCalendarContainer={triggerNode => triggerNode.parentNode} format={dateFormat} defaultValue={this.state.couponBeginDate ? moment(this.state.couponBeginDate, dateFormat) : ''}
                                                disabledDate={disabledDate} onChange={this.changecouponBeginDate} disabled />
                                            <p id="points" style={{ color: "red" }}>{this.state.errors.m4}</p>
                                        </FormItem>
                                    </Col>
                                    <Col span={11}>
                                        <h6 className="AddCoupondashFont">Valid To</h6>
                                        <FormItem className="fontWeightBold" >
                                            <DatePicker className="BorderDisabledCouponsPopUp mrginLeft25" getCalendarContainer={triggerNode => triggerNode.parentNode} format={dateFormat} disabledDate={disabledDate} value={this.state.couponEndDate ? moment(this.state.couponEndDate, dateFormat) : ''} onChange={this.changecouponEndDate} />
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


                <Modal
                    title="Add New Brand/Merchant"
                    visible={this.state.visible1}
                    onOk={this.handleOkEdit}
                    onCancel={this.handleCancelEdit}
                    className="Addnew-coupmerchant"
                    footer={<Button className="SubmitBtn" type="primary" onClick={this.handleOkEdit}>Submit</Button>}
                    >
                    <Scrollbars style={{ height: '56vh', padding: '0px 10px' }}>
                        <div className="AddCouponMainBody">
                            <Row>
                                <Col span={24}>
                                    <Col span={11}>
                                        <FormItem>
                                            <h6 className='AddCoupnh6Fnt'>Coupon Type</h6>
                                            <Input placeholder="Specify Coupon Type" maxLength="20" name="couponType" value={this.state.couponTypeName} disabled onChange={this.onChangecouponType} />

                                        </FormItem>
                                    </Col>
                                    <Col span={11} offset={2}>
                                        <FormItem className="marginLft501" >
                                            <h6 className='AddCoupnh6Fnt paddingLft50'>Coupon From</h6>
                                            <Input placeholder="Specify Merchant" maxLength="20" name="couponFrom" value={this.state.couponFromName} disabled onChange={this.onChangecouponFrom} />
                                        </FormItem>
                                    </Col>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <FormItem>
                                        <h6 className='AddCoupnh6Fnt'>Coupon Description</h6>
                                        <TextArea rows={4} placeholder="Enter Coupon Description" disabled value={this.state.couponTypeName} />

                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Col span={11}>
                                        <FormItem>
                                            <h6 className='AddCoupnh6Fnt'>Coupon Cost (Rupees)</h6>
                                            {/*<Input placeholder="" maxLength="20" name="couponFrom" value={this.state.couponType} onChange={this.onChangecouponType} />*/}
                                            <Select placeholder="Select couponCost"
                                                style={{ width: '100%' }}
                                                value={this.state.editCouponCost}
                                                onChange={this.onEditCouponCostChange}>
                                                {costs}
                                            </Select>
                                        </FormItem>
                                        <p id="points" style={{ color: "red" }}>{this.state.errors1.editCouponCost}</p>
                                    </Col>
                                    <Col span={11} offset={2}>
                                        <FormItem className="marginLft50" >
                                            <h6 className='AddCoupnh6Fnt paddingLft50'>Fan Coins (Redemption Value)</h6>
                                            {/*<Input placeholder="" maxLength="20" name="couponFrom" value={this.state.couponFrom} onChange={this.onChangecouponFrom} />*/}
                                            {/*<Select placeholder="Select fanCoins"
                                                style={{ width: '100%' }}
                                                value={this.state.editFanCoins}
                                                onChange={this.onEditFanCoinsChange}>
                                                {coins}
                                            </Select>*/}
                                            <Input placeholder="FanCoins" maxLength="20" name="fancoins" value={this.state.editFanCoins} disabled />
                                        </FormItem>
                                        <p id="points" style={{ color: "red" }}>{this.state.errors1.editFanCoins}</p>
                                    </Col>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24} className="CouponsDashboardsRich">

                                    <FormItem>
                                        <h6 className='AddCoupnh6Fnt'>Terms & Conditions</h6>
                                        <RichTextEditor
                                            value={this.state.value}
                                            onChange={this.onTermsChange}
                                            />

                                    </FormItem>
                                    <p id="points" style={{ color: "red" }}>{this.state.errors1.terms}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    {/*<Col span={11} className="CouponsDashEditUpload">
                                        <FormItem>
                                            <h6 className='AddCoupnh6Fnt'>Add Coupon Image</h6>

                                            <Upload
                                                {...props}
                                                className="avatar-uploader"
                                                showUploadList={false}
                                                // beforeUpload={beforeUpload}
                                                onChange={this.onEditCouponImageChange}
                                                accept=".png,.jpg,.jpeg"
                                                >
                                                {this.state.editCouponImage ? <img src={this.state.editCouponImage} alt="avatar" /> :
                                                    <Icon type="plus" className="avatar-uploader-trigger" />}
                                            </Upload>
                                        </FormItem>
                                        <p id="points" style={{ color: "red" }}>{this.state.errors1.editCouponImage}</p>
                                    </Col>*/}

                                    <Col span={11} className="CouponsDashEditUpload">
                                        <FormItem className="marginLft50" >
                                            <h6 className='AddCoupnh6Fnt'>
                                                Add Coupon Icon</h6>
                                            <Upload
                                                {...props}
                                                className="avatar-uploader"
                                                showUploadList={false}
                                                // beforeUpload={beforeUpload}
                                                onChange={this.onEditCouponIconChange}
                                                accept=".png,.jpg,.jpeg"
                                                >
                                                {this.state.editCouponIcon ? <img src={this.state.editCouponIcon} alt="avatar" /> :
                                                    <Icon type="plus" className="avatar-uploader-trigger" />}
                                            </Upload>
                                        </FormItem>
                                        <p id="points" style={{ color: "red" }}>{this.state.errors1.editCouponIcon}</p>
                                    </Col>
                                </Col>
                            </Row>
                        </div>
                    </Scrollbars>

                </Modal>


                <div>
                    <Modal
                        title="Edit Brand Image"
                        visible={this.state.visible12}
                        onOk={this.handleOk12}
                        onCancel={this.handleCancel12}
                        footer={<Button className="footbtn" style={{ marginRight: 8 }} type="primary" onClick={this.handleOk12}>Submit</Button>}
                        >
                        <div className="CouponsEditmainbanneimg">
                            <Col span={24}>
                                <Col span={5} className="editainbannupimg">
                                    <FormItem label="Edit Banner Image">
                                        <Upload
                                            {...props}
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            // beforeUpload={beforeUpload}
                                            value={this.state.editCouponImage}
                                            onChange={this.onEditCouponImageChange}
                                            accept=".png,.jpg,.jpeg"
                                            >
                                            {this.state.editCouponImage ? <img src={this.state.editCouponImage} alt="avatar" /> :
                                                <Icon type="plus" className="avatar-uploader-trigger" />}
                                        </Upload>
                                    </FormItem>
                                </Col>
                            </Col>
                        </div>
                    </Modal>
                </div>


            </div>

        );

    }
}


export default (CouponsDashboard);
/* eslint-disable */