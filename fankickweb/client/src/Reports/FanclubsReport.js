/* eslint-disable */
import React from 'react';
import axios, { post } from 'axios';
import classnames from 'classnames';
import Workbook from 'react-excel-workbook';
import reqwest from 'reqwest';
import clone from 'clone';
import $ from 'jquery';
import { Spin, Alert, Icon, Col, Button, Select, Input, Form, DatePicker, Table, Divider, message, Upload, Row, InputNumber, Avatar } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import css from './ComponentReports.css';
import reportsexcel from '../images/reportsexcel.png';

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
class FanclubsReports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            couponTypes: [],
            errors: {},
            id: '',
            couponId: '',
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
            coinsStartDate: '',
            coinsEndDate: '',
            defaultReport: '',
            loading: false,
            dateReport: '',
            dateReportexl: ''
        }
        this.baseState = this.state;
        this.generateuserReport = this.generateuserReport.bind(this);
        // this.generatecouponBeginDate = this.generatecouponBeginDate.bind(this);
        // this.generatecouponEndDate = this.generatecouponEndDate.bind(this);

    }

    componentWillMount() {
        //console.log("didmount")
        this.getTotalFanclubs()
        var date = new Date();
        date.setDate(date.getDate() - 7);
        var time = "5:30:00";
        var value1 = moment(date).format('YYYY-MM-DD');
        var datetime = value1 + " " + time;
        var startDate1 = new Date(datetime).toISOString();

        var time = "23:59:59"
        var value1 = moment(new Date()).format('YYYY-MM-DD');
        var datetime1 = value1 + " " + time;
        var endDate1 = new Date(datetime1).toISOString();
        this.setState({
            coinsStartDate: startDate1,
            coinsEndDate: endDate1
        });
        this.setState({
            loading: true
        })
        var data = {
            startDate: startDate1,
            endDate: endDate1
        }
        var _this = this;
        const url = '/fanclubReport';
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
                console.log("didmount response", response);

                if (response.data.length === 0) {
                    // message.info("No Data Found");
                    _this.setState({
                        loading: false
                    })
                }
                else if (response.data.length > 0) {
                    _this.setState({
                        reportData: response.data,
                        reportKeys: response.keys,
                        dateReport: response,
                        dateReportexl:
                        [
                            { 'type': "Total No. of Users Joined Fan Clubs", 'count': response.fanclubjoinedtotal },
                            { 'type': "Total No. of Fan Clubs Created", 'count': response.fanclubCreatedtotal },
                            { 'type': "Total No. of Fan Club Invitations", 'count': response.fanclubinvitestotal }
                        ],
                        loading: false
                        //  defaultReport: response.default
                    });
                } else {
                    // message.error("error");
                    _this.setState({
                        loading: false
                    })
                }
            })

    }

    getTotalFanclubs = () => {
        //  console.log("User -----------", sessionStorage.getItem('token'))
        var instance = axios.create({
            headers: { 'x-access-token': sessionStorage.getItem('token') }
        });
        instance.get('/fanclubDefaultReport').then((response) => {
            // console.log("totalFanclubCount------------------", response.data.default[0]);
            this.setState({
                defaultReport: response.data.default,
                // defaultReport: response.default

                featureReport: [{ 'type': "Total no. of Fanclubs created by Users", 'count': response.data.default[0].totalFanclubsCreated },
                { 'type': "Number of users joined the FanClubs", 'count': response.data.default[0].totalJoinedNumber },
                { 'type': "Number of Fanclubs above 5000 members", 'count': response.data.default[0].FanclubCountAbove5000 },
                { 'type': "Number of Fanclubs above 3000 members", 'count': response.data.default[0].FanclubCountAbove3000 },
                { 'type': "Number of Fanclubs above 1000 members", 'count': response.data.default[0].FanclubCountAbove1000 },
                { 'type': "Number of Fanclubs 100 to 499 members", 'count': response.data.default[0].FanclubLessThan500 },
                { 'type': "Number of Fanclubs 50 to 99 members", 'count': response.data.default[0].FanclubLessThan100 },
                { 'type': "Number of Fanclubs 0 to 49 members", 'count': response.data.default[0].FanclubLessThan50 },
                { 'type': "Top 5 active fanclubs w.r.t Feed posts", 'count': response.data.default[0].top5Fanclubs.toString() }
                ]
            });
            // this.setState({ totalRedeemedCoupons: response.data.data });
            // this.setState({ totalCouponsCount: response.data.data.couponsCount });
        });
    }

    handleChange2 = (value) => {
        //  var value1 = new Date(value).toISOString()
        var time = "5:30:00"
        var value1 = moment(value).format('YYYY-MM-DD');
        var datetime = value1 + " " + time;
        var newdate2 = new Date(datetime).toISOString();
        this.setState({ coinsStartDate: newdate2 });
    }
    handleChange3 = (value) => {
        // var value1 = new Date(value).toISOString()
        var time = "23:59:59"
        var value1 = moment(value).format('YYYY-MM-DD');
        var datetime = value1 + " " + time;
        var newdate2 = new Date(datetime).toISOString();
        this.setState({ coinsEndDate: newdate2 });
    }

    generateuserReport() {
        let errors = {};
        if (this.state.coinsStartDate === '') errors.coinsStartDate = "* This field is mandatory";
        if (this.state.coinsEndDate === '') errors.coinsEndDate = "* This field is mandatory";
        if (this.state.coinsEndDate <= this.state.coinsStartDate) errors.coinsEndDate = "* Enter Valid Date";
        if (moment(this.state.coinsStartDate).format('YYYY-MM-DD') == moment(this.state.coinsEndDate).format('YYYY-MM-DD')) errors.coinsStartDate = "Please select a valid time period, at least one day";
        this.setState({ errors });
        this.setState({
            //reportData: [],
            loading: true
        })
        if (Object.keys(errors).length === 0) {
            var data = {
                "startDate": this.state.coinsStartDate,
                "endDate": this.state.coinsEndDate
            }
            this.generateReport(data);
        }
    }
    generateReport(data) {
        var _this = this;
        const url = '/fanclubReport';
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
                //   console.log(response);
                if (response.data.length === 0) {
                    message.info("No Data Found");
                    _this.setState({
                        loading: false
                    })
                }
                else if (response.data.length > 0) {
                    _this.setState({
                        reportData: response.data,
                        reportKeys: response.keys,
                        dateReport: response,
                        dateReportexl:
                        [
                            { 'type': "Total No. of Users Joined Fan Clubs", 'count': response.fanclubjoinedtotal },
                            { 'type': "Total No. of Fan Clubs Created", 'count': response.fanclubCreatedtotal },
                            { 'type': "Total No. of Fan Club Invitations", 'count': response.fanclubinvitestotal }
                        ],
                        loading: false
                        // defaultReport: response.default
                    });
                } else {
                    message.error("error");
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
        const dateReport = clone(this.state.dateReport);
        const defaultReport = [];
        const reportsDetails = clone(this.state.reportData);
        // console.log('jjkfdhkjhdsafkjhfkjdsakfj--->',Object.keys(this.state.defaultReport[0]));
        // console.log();
        if (this.state.defaultReport.length != 0) {
            let tabledata = this.state.defaultReport.map((item, index) => {
                defaultReport.push({
                    key: item._id,
                    FanclubCountAbove1000: item.FanclubCountAbove1000,
                    FanclubCountAbove3000: item.FanclubCountAbove3000,
                    FanclubCountAbove5000: item.FanclubCountAbove5000,
                    FanclubLessThan50: item.FanclubLessThan50,
                    FanclubLessThan100: item.FanclubLessThan100,
                    FanclubLessThan500: item.FanclubLessThan500,
                    top5Fanclubs: item.top5Fanclubs.toString(),
                    totalFanclubsCreated: item.totalFanclubsCreated,
                    totalJoinedNumber: item.totalJoinedNumber,
                })
            })
        }
        const data1 = [];
        if (reportsDetails.length != 0) {
            let tabledata = reportsDetails.map((item, index) => {
                data1.push({
                    key: item._id,
                    date: item.date,
                    createdNumber: item.createdNumber,
                    invitesNumber: item.invitesNumber,
                    joinedNumber: item.joinedNumber
                })
            })
        }
        const columns = [
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
                defaultSortOrder: 'descend',
                // sorter: (a, b) => a.date - b.date,
            },

            {
                title: 'Total No. of Fan Clubs Created',
                dataIndex: 'createdNumber',
                key: 'createdNumber',
                // sorter: (a, b) => a.createdNumber - b.createdNumber,
            },
            {
                title: 'Total No. of Fan Club Invitations',
                dataIndex: 'invitesNumber',
                key: 'invitesNumber',
                // sorter: (a, b) => a.invitesNumber - b.invitesNumber,
            },
            {
                title: 'Total No. of Users Joined Fan Clubs',
                dataIndex: 'joinedNumber',
                key: 'joinedNumber',
                //  sorter: (a, b) => a.joinedNumber - b.joinedNumber,
            }

        ];
        const data3 = []
        if (reportsDetails.length != 0) {
            let preparingdata = reportsDetails.map((item, index) => {
                data3.push({
                    Date: item.date,
                    createdNumber: item.createdNumber,
                    invitesNumber: item.invitesNumber,
                    joinedNumber: item.joinedNumber
                })
            })
        }
        const example = (
            <div>
                <Col span={24}>
                    <Col span={12}>
                        <h3 className="ReddemedCouponsCountReportsMsgCenter">Total No. of Users Joined Fan Clubs:  {dateReport.fanclubjoinedtotal}<span></span></h3>
                        <h3 className="ReddemedCouponsCountReportsMsgCenter">Total No. of Fan Clubs Created:  {dateReport.fanclubCreatedtotal}<span></span></h3>
                        <h3 className="ReddemedCouponsCountReportsMsgCenter">Total No. of Fan Club Invitations:  {dateReport.fanclubinvitestotal}<span></span></h3>

                        {/* <ul className="list-inline allNotifiList" >
                            <li><h3 className="">Earned Users</h3></li>
                            <li className="" ><span ><Icon type="filter" className="FanclubsReportfiltericon" /></span> <span className="FanclubsReportfilterName">Filter</span></li>
                        </ul> */}
                    </Col>
                    <Col span={12}>
                        <div className="text-center">
                            <Workbook filename="Fanclub_Report.xlsx" element={<img src={reportsexcel} alt="contstCover" className="redeemedCouponspdfCoinsEarned" />}>
                                <Workbook.Sheet data={data3} name="Funclub Report">
                                    <Workbook.Column label="Date" value="Date" />
                                    <Workbook.Column label="No. of users joined a fanclub on Date" value="joinedNumber" />
                                    <Workbook.Column label="No. of fanclubs created on Date" value="createdNumber" />
                                    <Workbook.Column label="No. of new invites to Fanclubs on Date" value="invitesNumber" />
                                </Workbook.Sheet>
                                <Workbook.Sheet data={this.state.dateReportexl} name="Default Report(Selected Dates)">
                                    <Workbook.Column label="Default (Selected Dates)" value="type" />
                                    <Workbook.Column label="Result" value="count" />
                                </Workbook.Sheet>
                                <Workbook.Sheet data={this.state.featureReport} name="Default (Till Date)">
                                    <Workbook.Column label="Default (Till Date)" value="type" />
                                    <Workbook.Column label="Result" value="count" />
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
            <Table className="RedeemedcouponsReporttable fanClubsReportsTable ReedemCouponsreportsTableheading TableHeadingResponsive"
                dataSource={data1} columns={columns} pagination={{ pageSize: 10 }} scroll={{ x: 900 }} />

        return (
            <div>
                <Row >

                    <Col span={24} className="" style={{ marginTop: 20 }}>
                        <Col span={24} className="Reports-coinsEarnedheader1 ">
                            <h3 className="RedeemedCouponsTitleReport">Fan Clubs - Analytics</h3>
                            <Col span={6} xs={12} sm={12} xl={4} lg={5} md={6} className="Reprotsmainheaderselect">
                                <Col className="space">
                                    <FormItem label="From" className={classnames('coinsStartDate', { error: !!this.state.errors.coinsStartDate })}>
                                        <DatePicker getCalendarContainer={triggerNode => triggerNode.parentNode}
                                            onChange={this.handleChange2}
                                            value={this.state.coinsStartDate ? moment(this.state.coinsStartDate, dateFormat) : ''}
                                            format={dateFormat} disabledDate={this.disabledDate} name="coinsStartDate"
                                            placeholder="Select Start Date" />

                                        <span>{this.state.errors.coinsStartDate}</span>
                                    </FormItem>
                                </Col>
                            </Col>
                            <Col span={6} xs={12} sm={12} xl={4} lg={5} md={6}>
                                <Col className="space">
                                    <FormItem label="To" className={classnames('coinsEndDate', { error: !!this.state.errors.coinsEndDate })}>
                                        <DatePicker getCalendarContainer={triggerNode => triggerNode.parentNode}
                                            onChange={this.handleChange3}
                                            value={this.state.coinsEndDate ? moment(this.state.coinsEndDate, dateFormat) : ''}
                                            format={dateFormat} disabledDate={this.disabledDate} name="coinsEndDate"
                                            placeholder="Select End Date" />
                                        <span>{this.state.errors.coinsEndDate}</span>
                                    </FormItem>
                                </Col>
                            </Col>
                            <Col span={12}>
                                <FormItem className="mrgTop33">
                                    <Button className="ReportsSubmitbtn" type="primary" onClick={this.generateuserReport}>Submit</Button>
                                </FormItem>
                            </Col>
                        </Col>
                        <Col span={24} className="FanClubReporticonImg">
                            <Col>
                                {example}
                            </Col>
                        </Col>
                        <Col span={24}>
                            <Row className="funClubsRen">
                                <Spin spinning={this.state.loading}>
                                    {container}
                                </Spin>
                                {/* {data1.length === 0 ? <div id="noFunclubs">No Data Available</div> : ""} */}
                            </Row>

                            {/* {container} */}
                        </Col>

                    </Col>
                </Row>
            </div >
        );
    }
}

export default FanclubsReports;
/* eslint-disable */