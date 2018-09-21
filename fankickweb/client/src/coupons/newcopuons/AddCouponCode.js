/* eslint-disable */
import React from 'react';
import axios, { post } from 'axios';
import Workbook from 'react-excel-workbook';
import reqwest from 'reqwest';
import clone from 'clone';
import $ from 'jquery';
import { Icon, Col, Button, Select, Input, Form, DatePicker, message, Upload, Row, Modal } from 'antd';
import css from '../Coupons.css';
import BulkUpload from './BulkUpload';
//import RedeemedReports from './RedeemedReports';
//import UserWiseReports from './UserWiseReports';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;

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
//const format = 'h:mm a';
const dateFormat = 'YYYY-MM-DD';
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

class addCoupon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 'large',
            couponTypes: [],
            coins: {},
            errors: {},
            event: '',
            id: '',
            couponId: '',
            imageWithCode: '',
            couponBeginDate: new Date(),
            couponEndDate: '',
            couponStatus: 'True',
            couponCode: '',
            imageUrl: '',
            uploading: false,
            file: null,
            userBeginDate: '',
            userEndDate: '',
            reportData: [],
            reportKeys: [],
            visible: false

        }
        this.baseState = this.state;
        this.handleChange = this.handleChange.bind(this);
        this.changecouponBeginDate = this.changecouponBeginDate.bind(this);
        this.changecouponEndDate = this.changecouponEndDate.bind(this);
        this.handleSizeChange = this.handleSizeChange.bind(this);
        this.onCouponsTypeChange = this.onCouponsTypeChange.bind(this);
        this.changeCouponStatus = this.changeCouponStatus.bind(this);
    }

    componentWillMount() {
        this.getcouponType();
    }
    getAlert() {
        alert('clicked bjknkn');
    }
    getcouponType = () => {
        //  console.log("User -----------", sessionStorage.getItem('token'))
        var instance = axios.create({
            headers: { 'x-access-token': sessionStorage.getItem('token') }
        });
        instance.get('/coupon-types').then((response) => {
            //  console.log("Data couponType------------------", response.data.data);
            this.setState({ couponTypes: response.data.data });
        });
    }


    showModal = (e) => {
        //console.log('coupon code')
        // var id = this.props.id
        var self = this;
        self.setState({
            visible: true,
        });
    }

    handleChange(e) {
        //e.preventDefault();
        $("Input").on("keydown", function (e) {
            if (e.which === 32 && !this.value.length)
                e.preventDefault();
        });
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    changecouponBeginDate(value) {
        var value = moment(value).format('YYYY-MM-DD');
        this.setState({
            couponBeginDate: value
        });
    }

    changecouponEndDate(value) {
        var value = moment(value).format('YYYY-MM-DD');
        this.setState({
            couponEndDate: value
        });
    }

    onCouponsTypeChange(e) {
        var couponType = e;
        this.setState({
            couponId: couponType
        })
        //console.log("Coupon Type--->", couponType);
        //this.fetchRequest(couponType);
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
            errors.m1 = "Please select coupon";
        }
        else if (this.state.couponStatus === undefined || this.state.couponStatus === '') {
            errors.m3 = "Please Enter coupon status";
        }
        else if (this.state.couponCode === undefined || this.state.couponCode === '') {
            errors.m2 = "Please Enter coupon code";
        }
        else if (this.state.couponBeginDate === undefined || this.state.couponBeginDate === '') {
            errors.m4 = "Please Enter Coupon begin date";
        }
        else if (this.state.couponEndDate === undefined || this.state.couponEndDate === '') {
            errors.m5 = "Please Enter Coupon end date";
        }
        else if (this.state.couponBeginDate > this.state.couponEndDate) {
            errors.m6 = "Please Enter Valid Coupon end date";
        }
        // else if (this.state.imageUrl === undefined || this.state.imageUrl === '') {
        //     errors.m7 = "Please upload image";
        // }

        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            var cid = this.state.couponId;
            var data = {
                "cardData": {
                    "couponCode": this.state.couponCode.trim(),
                    "couponStatus": this.state.couponStatus,
                    "couponBeginDate": this.state.couponBeginDate,
                    "couponEndDate": this.state.couponEndDate,
                    // "imageWithCode": this.state.imageUrl
                }
            }
            this.addCouponCode(data, cid);
        }
    }

    addCouponCode = (data, cid) => {
        var _this = this;
        const url = '/couponCard/' + cid;
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
                        // imageUrl: '',
                        couponEndDate: '',
                        couponId: '',
                        visible: false
                    })
                }
                else {
                    message.error(`unable to add new coupon please check all mandatory fields.`, 5);
                    // console.log("dataresponse", response);
                }
            })
    }

    handleReset = () => {
        this.setState(this.baseState);
    }

    uploadCouponImage = (info) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            this.setState({
                imageWithCode: info.file.response.data
            })
        }
    }

    handleSizeChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }



    participationChange(value) {
        this.setState({
            participation: value
        })
    }
    handleAudioChange = (info) => {
        var _this = this;
        //console.log("------------>", info);
        if (info.file.type === "audio/mp3" || info.file.type === "audio/x-m4a") {
            {
                message.success(`Audio file uploaded successfully`);
                // if (info.file.response.data !== '') this.state.errors.jokeUrl = '';
                var audioUrl = info.file.response;
            }
            //   console.log("super---->1111", _this.state.jokeUrl);
        } else {
            //   let errors = {};
            //   if (this.state.jokeUrl === '') errors.jokeUrl = "Only audio is required."
            //   this.setState({ errors });
            //   if (Object.keys(errors).length === 0) {
            // console.log("super");
            // }
        }
        // this.getAuidUrl(audioUrl);
    }


    handleOk = (e) => {
        //console.log(e);
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

    render() {

        const { imageUrl } = this.state;
        const mapCoupon = this.state.couponTypes.map((coupon) => <Option value={coupon._id}>{coupon.couponFrom}</Option>);
        return (
            <div>

                <Modal
                    className="couponsmodalB"
                    title="Upload Stock/Coupons"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={<Button className="mrgnRight8" type="primary" onClick={this.handleSubmit.bind(this)}>Submit</Button>}
                >
                    <Row >
                        <Col span={24} >
                            <Col span={24} className="">
                                <Col span={12}>
                                    <FormItem className="fontWeightBold">
                                        <h6 className="AddCoupnh6Fnt"><span className="RedStar">*</span>Select Coupon</h6>
                                        <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                            value={this.state.couponId} style={{ width: 210 }}
                                            onChange={this.onCouponsTypeChange}>
                                            {mapCoupon}
                                        </Select>
                                        <span id="points" style={{ color: "red" }}>{this.state.errors.m1}</span>
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem className="fontWeightBold">
                                        <h6 className="AddCoupnh6Fnt">Select Coupon Status</h6>
                                        <Select
                                            showSearch
                                            getPopupContainer={triggerNode => triggerNode.parentNode}
                                            style={{ width: 210 }}
                                            defaultValue="True"
                                            placeholder="Select Coupon Status"
                                            onChange={this.changeCouponStatus} allowClear disabled>
                                            <Option value="True">True</Option>
                                            <Option value="False">False</Option>
                                        </Select>
                                        <span id="points" style={{ color: "red" }}>{this.state.errors.m3}</span>
                                    </FormItem>
                                </Col>
                            </Col>
                            <Col span={12}>
                                <FormItem className="fontWeightBold">
                                    <h6 className="AddCoupnh6Fnt"><span className="RedStar">*</span>Coupon Code</h6>
                                    <Input placeholder="Coupon Code" name="couponCode" maxLength="20" value={this.state.couponCode} onChange={this.handleChange} />
                                    <span id="points" style={{ color: "red" }}>{this.state.errors.m2}</span>
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <Col span={12}>
                                    <FormItem className="fontWeightBold">
                                        <h6 className="AddCoupnh6Fnt"><span className="RedStar">*</span>Coupon Begin Date</h6>
                                        <DatePicker getCalendarContainer={triggerNode => triggerNode.parentNode} format={dateFormat} defaultValue={this.state.couponBeginDate ? moment(this.state.couponBeginDate, dateFormat) : ''}
                                            disabledDate={disabledDate} onChange={this.changecouponBeginDate} disabled />
                                        <span id="points" style={{ color: "red" }}>{this.state.errors.m4}</span>
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem className="fontWeightBold" >
                                        <h6 className="AddCoupnh6Fnt"><span className="RedStar">*</span>Coupon End Date</h6>
                                        <DatePicker getCalendarContainer={triggerNode => triggerNode.parentNode} format={dateFormat} disabledDate={disabledDate} defaultValue={this.state.couponEndDate ? moment(this.state.couponEndDate, dateFormat) : ''} onChange={this.changecouponEndDate} />
                                        <span id="points" style={{ color: "red" }}>{this.state.errors.m5}</span>
                                        <span id="points" style={{ color: "red" }}>{this.state.errors.m6}</span>
                                    </FormItem>
                                </Col>
                            </Col>
                            {/* <Col span={24}>
                                <Col span={12}>
                                    <FormItem>
                                        <Col span={8} className="">
                                            <h6 className="AddCoupnh6Fnt"><span className="RedStar">*</span>Add Coupon code Image</h6>
                                            <div className="AddCouponsUploadImage">
                                                <Upload {...props}
                                                    className="avatar-uploader"
                                                    showUploadList={false}
                                                    onChange={this.uploadBannerImage}
                                                    accept=".png,.jpg,.jpeg">
                                                    {
                                                        imageUrl ?
                                                            <img src={this.state.imageUrl} alt="" className="avatar" /> :
                                                            <Icon type="plus" className="avatar-uploader-trigger" />
                                                    }
                                                </Upload>
                                            </div>
                                        </Col>
                                        <span id="points" style={{ color: "red" }}>{this.state.errors.m7}</span>
                                    </FormItem>
                                </Col>
                            </Col> */}

                            {/* <Col span={5} className="couponsbtn">
                            <Button type="primary" className='couponssaveBtn' onClick={this.handleSubmit.bind(this)} >Save</Button>
                        </Col> */}
                        </Col>
                    </Row>
                </Modal>
            </div>

        );

    }
}
const addCouponCode = Form.create()(addCoupon);

export default addCouponCode;
/* eslint-disable */