/* eslint-disable */
import React from 'react';
import axios, { post } from 'axios';
import classnames from 'classnames';
import Workbook from 'react-excel-workbook';
import reqwest from 'reqwest';
import clone from 'clone';
import $ from 'jquery';
import { Scrollbars } from 'react-custom-scrollbars';
import reportsexcel from '../images/reportsexcel.png';
import { Spin, Alert, Icon, Col, Button, Select, Input, Form, DatePicker, Table, Divider, message, Upload, Row, InputNumber, Avatar } from 'antd';
import css from './ComponentReports.css';
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
class Fun2WinReports extends React.Component {
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
        this.getTotalReports();

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
            coinsStartDate: startDate1,
            coinsEndDate: endDate1,
            loading: true
        });
        var data = {
            startDate: startDate1,
            endDate: endDate1
        }
        var _this = this;
        const url = '/messageCenterReport';
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
                if (response.data.length < 0) {
                    message.info("No Data Found");
                    _this.setState({
                        loading: false
                    });
                }
                else if (response.data.length > 0) {
                    _this.setState({
                        reportData: response.data,
                        reportKeys: response.keys,
                        dateReport: response,
                        dateReportexl:
                            [
                                { 'type': "Contests Created Total", 'count': response.contestsCreatedTotal },
                                { 'type': "Users Participated Total", 'count': response.usersParticipatedTotal },
                                { 'type': "Users Earned250Coins Total", 'count': response.usersEarned250CoinsTotal }
                            ],
                        loading: false
                    });
                } else {
                    message.error("error");
                }
            })

    }

    getTotalReports = () => {
        // console.log("User -----------", sessionStorage.getItem('token'))
        var instance = axios.create({
            headers: { 'x-access-token': sessionStorage.getItem('token') }
        });
        instance.get('/mcDefaultReport').then((response) => {
            //console.log("mcDefaultReport------------------", response.data.data);
            this.setState({
                defaultReport: response.data.data,
                mcreport:
                    [
                        { 'type': "Total no. of Contests pushed", 'count': response.data.data[0].noOfContestsPushed },
                        { 'type': "Number of users participated in the Contests", 'count': response.data.data[0].noOfParticipantsPlayed },
                        { 'type': "No. of users earned 250 coins", 'count': response.data.data[0].noOfUsersEarned250Coins }
                    ]
            });
        });
    }


    handleChange2 = (value) => {
        // var value1 = new Date(value).toISOString()
        var time = "5:30:00"
        var value1 = moment(value).format('YYYY-MM-DD');
        var datetime = value1 + " " + time;
        var newdate2 = new Date(datetime).toISOString();
        this.setState({ coinsStartDate: newdate2 });
    }
    handleChange3 = (value) => {
        //var value1 = new Date(value).toISOString()
        var time = "23:59:59"
        var value1 = moment(value).format('YYYY-MM-DD');
        var datetime = value1 + " " + time;
        var newdate2 = new Date(datetime).toISOString();
        //  console.log("timeeee", newdate2)
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
        const url = '/messageCenterReport';
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
                console.log(response);
                if (response.data.length < 0) {
                  //  message.info("No Data Found");
                    _this.setState({
                        loading: false,
                        reportData: []
                    });
                }
                else if (response.data.length > 0) {
                    _this.setState({
                        reportData: response.data,
                        reportKeys: response.keys,
                        dateReport: response,
                        dateReportexl:
                            [
                                { 'type': "Contests Created Total", 'count': response.contestsCreatedTotal },
                                { 'type': "Users Participated Total", 'count': response.usersParticipatedTotal },
                                { 'type': "Users Earned250Coins Total", 'count': response.usersEarned250CoinsTotal }
                            ],
                        loading: false
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
        if (this.state.defaultReport.length != 0) {
            let tabledata = this.state.defaultReport.map((item, index) => {
                defaultReport.push({
                    key: item._id,
                    noOfContestsPushed: item.noOfContestsPushed,
                    noOfParticipantsPlayed: item.noOfParticipantsPlayed,
                    noOfUsersEarned250Coins: item.noOfUsersEarned250Coins
                })
            })
        }
        const data1 = [];
        if (this.state.reportData.length != 0) {
            let tabledata = this.state.reportData.map((item, index) => {
                data1.push({
                    key: item._id,
                    date: item.date,
                    noOfContestsCreated: item.noOfContestsCreated,
                    noOfUsersParticipated: item.noOfUsersParticipated,
                    noOfUsersEarned250Coins: item.noOfUsersEarned250Coins
                })
            })
        }
        const columns = [

            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
                defaultSortOrder: 'descend',
                //  sorter: (a, b) => a.date - b.date,
            },
            {
                title: 'No. of Contests Created',
                dataIndex: 'noOfContestsCreated',
                key: 'noOfContestsCreated',
                // sorter: (a, b) => a.noOfContestsCreated - b.noOfContestsCreated,
            },
            {
                title: 'No. of Users Participated',
                dataIndex: 'noOfUsersParticipated',
                key: 'noOfUsersParticipated',
                // sorter: (a, b) => a.noOfUsersParticipated - b.noOfUsersParticipated,
            },
            {
                title: 'No. of Users Earned Coins/Goodies ',
                dataIndex: 'noOfUsersEarned250Coins',
                key: 'noOfUsersEarned250Coins',
                //  sorter: (a, b) => a.noOfUsersEarned250Coins - b.noOfUsersEarned250Coins,
            }
        ];
        const data3 = []
        if (this.state.reportData.length != 0) {
            let preparingdata = this.state.reportData.map((item, index) => {
                data3.push({
                    date: item.date,
                    noOfContestsCreated: item.noOfContestsCreated,
                    noOfUsersParticipated: item.noOfUsersParticipated,
                    noOfUsersEarned250Coins: item.noOfUsersEarned250Coins
                })
            })
        }
        const example = (
            <div>
                <Col span={24}>
                    <Col span={12}>
                        <h3 className="ReddemedCouponsCountReportsMsgCenter">Total No. of Contests Created:   {dateReport.contestsCreatedTotal}<span></span></h3>
                        <h3 className="ReddemedCouponsCountReportsMsgCenter">Total No. of Participants:   {dateReport.usersParticipatedTotal}<span></span></h3>
                         <h3 className="ReddemedCouponsCountReportsMsgCenter">  No. of users earned 250 coins:   {dateReport.usersEarned250CoinsTotal}<span></span></h3> 
                        {/* <h3 className="ReddemedCouponsCountReportsMsgCenter">  No. of users clicked on contest:   {dateReport.fanclubjoinedtotal}<span></span></h3> */}


                    </Col>
                    <Col span={12}>
                        <div className="text-center">
                            <Workbook filename="Message_center_reprt.xlsx" element={<img src={reportsexcel} alt="contstCover" className="redeemedCouponspdfCoinsEarned" />}>
                                <Workbook.Sheet data={data3} name="MC Report">
                                    <Workbook.Column label="Date" value="date" />
                                    <Workbook.Column label="No. of users participated in contest" value="noOfUsersParticipated" />
                                    <Workbook.Column label="No. of Contests created on Date" value="noOfContestsCreated" />
                                    <Workbook.Column label="No. of users earned 250 coins" value="noOfUsersEarned250Coins" />
                                </Workbook.Sheet>
                                <Workbook.Sheet data={this.state.dateReportexl} name="Default Report(Selected Dates)">
                                    <Workbook.Column label="Default (Till Date)" value="type" />
                                    <Workbook.Column label="Result" value="count" />
                                </Workbook.Sheet>
                                <Workbook.Sheet data={this.state.mcreport} name="Default (Till Date)">
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

        const container = <Table className="RedeemedcouponsReporttable messageCentresReportstable ReedemCouponsreportsTableheading TableHeadingResponsive"
            dataSource={data1} columns={columns} pagination={{ pageSize: 10 }} scroll={{ x: 900 }} />

        return (
            <div>
                <Row >

                    <Col span={24} className="" style={{ marginTop: 20 }}>
                        <Col span={24} className="Reports-coinsEarnedheader1 ">
                            <h3 className="RedeemedCouponsTitleReport">Message Center Challenges - Analytics</h3>
                            <Col span={6} xs={12} sm={12} xl={4} lg={5} md={6} className="Reprotsmainheaderselect1">
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
                        <Col span={24} className="MessageReportIconimage">
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

                        </Col>

                    </Col>
                </Row>
            </div >
        );
    }
}

export default Fun2WinReports;
/* eslint-disable */