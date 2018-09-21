/* eslint-disable */
import React from 'react';
import axios, { post } from 'axios';
import classnames from 'classnames';
import Workbook from 'react-excel-workbook';
import reqwest from 'reqwest';
import clone from 'clone';
import $ from 'jquery';
import { Spin, Alert, Icon, Col, Button, Select, Input, Form, DatePicker, Table, Divider, message, Upload, Row, InputNumber, Avatar } from 'antd';
import reportsexcel from '../images/reportsexcel.png';
import css from './ComponentReports.css';
import { Scrollbars } from 'react-custom-scrollbars';
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


class UserWiseReports extends React.Component {
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
            fun2win: '',
            comment: '',
            like: '',
            expireDate: '',
            imageWithCode: '',
            couponBeginDate: new Date(),
            couponEndDate: '',
            couponStatus: 'True',
            couponCode: '',
            imageUrl: '',
            fileList: [],
            uploading: false,
            file: null,
            generatecouponBeginDate: '',
            generatecouponEndDate: '',
            userBeginDate: '',
            userEndDate: '',
            reportData: [],
            reportKeys: [],
            couponStartDate: '',
            couponEndDate: '',
            loading: false

        }
        this.baseState = this.state;
        this.generateuserReport = this.generateuserReport.bind(this);

    }

    componentWillMount() {
        //console.log("didmount")
        var date = new Date();
        date.setDate(date.getDate() - 30);
        var time = "5:30:00";
        var value1 = moment(date).format('YYYY-MM-DD');
        var datetime = value1 + " " + time;
        var startDate1 = new Date(datetime).toISOString();

        var time = "23:59:59"
        var value1 = moment(new Date()).format('YYYY-MM-DD');
        var datetime1 = value1 + " " + time;
        var endDate1 = new Date(datetime1).toISOString();
        this.setState({
            couponStartDate: startDate1,
            couponEndDate: endDate1,
            loading: true
        });
        var data = {
            fromDate: startDate1,
            toDate: endDate1
        }
        var _this = this;
        const url = '/couponsRedeemedUserwise';
        var request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'x-access-token': sessionStorage.getItem('token'),
                'Content-type': "application/json"
            }
        });
        fetch(request)
            .then(response => response.json())
            .then(function (response) {
                //  console.log("didmount response", response);
                if (response.message == "No users Found") {
                    _this.setState({
                        loading: false
                    })
                    // message.info("No users Found", 0.5);
                }
                else if (response.data.length > 0) {
                    for (var i = 0; i < response.data.length; i++) {
                        if (response.data[i].ipAddresses) {
                            response.data[i].ipAddresses = response.data[i].ipAddresses.join(',')
                        }
                    }
                    _this.setState({
                        reportData: response.data,
                        reportKeys: response.keys,
                        loading: false
                    });
                } else {
                    // message.error("error");
                    _this.setState({
                        loading: false
                    })
                }
            })

    }

    // --------------------- Generate User Details Report

    handleChange2 = (value) => {
        //  var value1 = new Date(value).toISOString()
        var time = "5:30:00"
        var value1 = moment(value).format('YYYY-MM-DD');
        var datetime = value1 + " " + time;
        var newdate2 = new Date(datetime).toISOString();
        this.setState({ couponStartDate: newdate2 });
    }
    handleChange3 = (value) => {
        // var value1 = new Date(value).toISOString()
        var time = "23:59:59"
        var value1 = moment(value).format('YYYY-MM-DD');
        var datetime = value1 + " " + time;
        var newdate2 = new Date(datetime).toISOString();
        this.setState({ couponEndDate: newdate2 });
    }

    generateuserReport() {
        let errors = {};
        if (this.state.couponStartDate === '') errors.couponStartDate = "* This field is mandatory";
        if (this.state.couponEndDate === '') errors.couponEndDate = "* This field is mandatory";
        if (this.state.couponEndDate <= this.state.couponStartDate) errors.couponEndDate = "* Enter Valid Date";
        if (moment(this.state.couponStartDate).format('YYYY-MM-DD') == moment(this.state.couponEndDate).format('YYYY-MM-DD')) errors.couponStartDate = "Please select a valid time period, at least one day";
        this.setState({ errors });
        this.setState({
            reportData: [],
            loading: true
        })
        if (Object.keys(errors).length === 0) {
            var data = {
                "fromDate": this.state.couponStartDate,
                "toDate": this.state.couponEndDate
            }
            this.generateReport(data);
        }
    }

    generateReport(data) {
        var _this = this;
        const url = '/couponsRedeemedUserwise';
        //console.log("data---->", data);
        var request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'x-access-token': sessionStorage.getItem('token'),
                'Content-type': "application/json"
            }
        });
        fetch(request)
            .then(response => response.json())
            .then(function (response) {
                //console.log("090909898989", response);
                if (response.message == "No users Found") {
                    _this.setState({
                        loading: false
                    })
                    // message.info("No users Found", 0.2);
                }
                else if (response.data.length > 0) {
                    for (var i = 0; i < response.data.length; i++) {

                        if (response.data[i].ipAddresses) {
                            response.data[i].ipAddresses = response.data[i].ipAddresses.join(',')
                        }
                    }
                    _this.setState({
                        reportData: response.data,
                        reportKeys: response.keys,
                        loading: false
                    });
                    // console.log("response", response.data);
                    // console.log("response", response.keys);
                } else {
                    //  message.error("error");
                    _this.setState({
                        loading: false
                    })
                }
            })
    }

    disabledDate(current) {
        if (!current) {
            return false;
        }
        const date = moment();
        date.hour(0);
        date.minute(0);
        date.second(0);
        return current.valueOf() > date.valueOf();
    }

    render() {
        var totalCount = 0;
        const reports = clone(this.state.reportData);
        const data1 = [];
        const data3 = [];
        console.log("----------------", reports);

        reports.map((item, index) => {
            console.log("----------------", item.fancoinsRedeemed);
            totalCount += item.fancoinsRedeemed;
        })
        console.log("----------------", totalCount);
        if (reports.length != 0) {
            let tabledata = reports.map((item, index) => {
                data1.push({
                    key: item._id,
                    date: item.date,
                    userId: item.userId,
                    couponType: item.couponType,
                    couponValue: item.couponValue,
                    currentFancoins: item.currentFancoins,
                    deviceId: item.deviceId,
                    fancoinsRedeemed: item.fancoinsRedeemed,
                    ipAddresses: item.ipAddresses,
                    mobileNumber: item.mobileNumber,
                    username: item.username,
                    location: item.location
                })
                data3.push({
                    date: item.date,
                    couponType: item.couponType,
                    couponValue: item.couponValue,
                    currentFancoins: item.currentFancoins,
                    deviceId: item.deviceId,
                    fancoinsRedeemed: item.fancoinsRedeemed,
                    ipAddresses: item.ipAddresses,
                    mobileNumber: item.mobileNumber,
                    username: item.username,
                    userId: item.userId,
                    location: item.location
                })
            })
        }
        const columns = [
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
                defaultSortOrder: 'descend',
                width: 100,
            },
            {
                title: 'User ID',
                dataIndex: 'userId',
                key: 'userId',
                width: 100,
            }, {
                title: 'User Name',
                dataIndex: 'username',
                key: 'username',
                width: 100,
            },
            {
                title: 'Mobile No.',
                dataIndex: 'mobileNumber',
                key: 'mobileNumber',
                width: 100,
            },
            {
                title: 'Coupon Name',
                dataIndex: 'couponType',
                key: 'couponType',
                width: 100,
            },
            {
                title: 'Coupon Cost',
                dataIndex: 'couponValue',
                key: 'couponValue',
                width: 100,
            },
            {
                title: 'Coins Redeemed',
                dataIndex: 'fancoinsRedeemed',
                key: 'fancoinsRedeemed',
                width: 100,
            },
            {
                title: 'Current Balance',
                dataIndex: 'currentFancoins',
                key: 'currentFancoins',
                width: 100,
            },
            {
                title: 'Device ID',
                dataIndex: 'deviceId',
                key: 'deviceId',
                width: 100,
            },
            {
                title: 'IP Address',
                dataIndex: 'ipAddresses',
                key: 'ipAddresses',
                width: 100,
            },
            {
                title: 'User Location',
                dataIndex: 'location',
                key: 'location',
                width: 100,
            }
        ];

        const example = (
            <div>
                <Col span={24}>
                    <Col span={12}>

                        <h3 className="ReddemedCouponsCountReports">Redeemed Fan Coins:  {totalCount}<span></span></h3>
                        <h3 className="ReddemedCouponsCountReports">No.of users redeemed: {this.state.reportData.length}<span></span></h3>

                        {/* <ul className="list-inline allNotifiList" >
                            <li><h3 className="">Earned Users</h3></li>
                            <li className="" ><span ><Icon type="filter" className="Redeemeduserreporticon"/></span> <span className="Redeemeduserreportfilter">Filter</span></li>
                            </ul> */}
                    </Col>
                    <Col span={12}>
                        <div className="text-center">
                            <Workbook filename="Redeemed_user_report.xlsx" element={<img src={reportsexcel} alt="contestcover" className="redeemedCouponspdfCoinsEarned" />}>
                                <Workbook.Sheet data={data3} name="Redeemed_User_Report">
                                    <Workbook.Column label="Date" value="date" />
                                    <Workbook.Column label="User Id" value="userId" />
                                    <Workbook.Column label="User Name" value="username" />
                                    <Workbook.Column label="Mobile Number" value="mobileNumber" />
                                    <Workbook.Column label="Coupon Type" value="couponType" />
                                    <Workbook.Column label="Coupon Value" value="couponValue" />
                                    <Workbook.Column label="Device Id" value="deviceId" />
                                    <Workbook.Column label="Ip Addresses" value="ipAddresses" />
                                    <Workbook.Column label="Current Fancoins" value="currentFancoins" />
                                    <Workbook.Column label="Fancoins Redeemed" value="fancoinsRedeemed" />
                                    <Workbook.Column label="Location" value="location" />
                                </Workbook.Sheet>

                            </Workbook>
                            <h4 className="downloadTxtCoinsErnd">DOWNLOAD</h4>
                        </div>
                    </Col>
                </Col>
            </div>
        )
        const { imageUrl } = this.state;
        const mapCoupon = this.state.couponTypes.map((coupon) => <Option value={coupon._id}>{coupon.couponFrom}</Option>);



        const container =
            <Table className="RedeemedUserReportable RedeemeduserscouponsReporttable ReedemCouponsreportsTableheading TableHeadingResponsive"
                dataSource={data1} columns={columns} pagination={{ pageSize: 10 }} scroll={{ x: 1658 }} />

        return (
            <div>
                <Row >

                    <Col span={24} className="" style={{ marginTop: 20 }}>
                        <Col span={24} className="Reports-coinsEarnedheader1">
                            <h3 className="RedeemedCouponsTitleReport">Redeemed Coupons - User Wise</h3>
                            <Col span={5} xs={12} sm={12} xl={4} lg={5} md={6} className="Reprotsmainheaderselect1">
                                <Col className="space">
                                    <FormItem label="From" className={classnames('couponStartDate', { error: !!this.state.errors.couponStartDate })}>
                                        <DatePicker getCalendarContainer={triggerNode => triggerNode.parentNode}
                                            onChange={this.handleChange2}
                                            value={this.state.couponStartDate ? moment(this.state.couponStartDate, dateFormat) : ''}
                                            format={dateFormat} disabledDate={this.disabledDate} name="couponStartDate"
                                            placeholder="Select Start Date" />

                                        <span>{this.state.errors.couponStartDate}</span>
                                    </FormItem>
                                </Col>
                            </Col>
                            <Col span={5} xs={12} sm={12} xl={4} lg={5} md={6}>
                                <Col className="space">
                                    <FormItem label="To" className={classnames('couponEndDate', { error: !!this.state.errors.couponEndDate })}>
                                        <DatePicker getCalendarContainer={triggerNode => triggerNode.parentNode}
                                            onChange={this.handleChange3}
                                            value={this.state.couponEndDate ? moment(this.state.couponEndDate, dateFormat) : ''}
                                            format={dateFormat} disabledDate={this.disabledDate} name="couponEndDate"
                                            placeholder="To" />
                                        <span>{this.state.errors.couponEndDate}</span>
                                    </FormItem>
                                </Col>
                            </Col>
                            <Col span={12}>
                                <FormItem className="mrgTop33">
                                    <Button className="ReportsSubmitbtn" type="primary" onClick={this.generateuserReport}>Submit</Button>
                                </FormItem>
                            </Col>
                        </Col>
                        <Col span={24} className="RedeemedUserReportsiconsimages">
                            <Col>
                                {example}
                            </Col>
                        </Col>
                        <Col span={24}>
                            {/* <ul className="list-inline allNotifiList" >
                                <li><h3 className="">Earned Users</h3></li>
                                <li className="" ><span ><Icon type="filter" /></span>Filter</li>
                                <li className="DownloadIcons"><Icon type="file-pdf" /></li>
                                <li className="DownloadIcons"><Icon type="file-excel" /></li>
                                <li className="search-custom MarginTop-20 DownloadIcons">
                                    Download Reports
                                        <p id="mobile" className="mobile"></p>
                                </li>
                                </ul>*/}
                            <Row className="funClubsRen">
                                <Spin spinning={this.state.loading}>
                                    {container}
                                </Spin>
                                {data1.length === 0 ? <div id="noFunclubs"></div> : ""}
                            </Row>

                            {/* {container} */}
                            {/* <Table className="RedeemeduserReportTable" dataSource={data1} columns={columns} pagination={{ pageSize: 5 }} /> */}

                        </Col>

                    </Col>
                </Row>
            </div >
        );
    }
}
export default UserWiseReports;
/* eslint-disable */