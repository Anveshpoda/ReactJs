/* eslint-disable */
import React from 'react';
import axios, { post } from 'axios';
import classnames from 'classnames';
import Workbook from 'react-excel-workbook';
import reqwest from 'reqwest';
import clone from 'clone';
import $ from 'jquery';
import { Scrollbars } from 'react-custom-scrollbars';
import { Spin, Alert, Icon, Col, Button, Select, Input, Form, DatePicker, Table, Divider, message, Upload, Row, InputNumber, Avatar } from 'antd';
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
class FeatureWiseReports extends React.Component {
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
            filterDropdownVisible: false,
            data: '',
            searchText: '',
            filtered: false,
            filteredInfo: null,
            sortedInfo: null,
            defaultReport: '',
            loading: false
        }
        this.baseState = this.state;
        this.generateuserReport = this.generateuserReport.bind(this);
        // this.generatecouponBeginDate = this.generatecouponBeginDate.bind(this);
        // this.generatecouponEndDate = this.generatecouponEndDate.bind(this);

    }

    componentWillMount() {
        //console.log("didmount")
        this.defaultReport();
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
        //const startDate1 = date.toISOString();
        console.log("ddddd", startDate1, "ttttt", endDate1)
        //const endDate1 = new Date();
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
        const url = '/featureWiseCoinsCount';
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
                //   console.log("didmount response", response);
                if (response.data.length < 0) {
                    //  message.info("No Data Found");
                    _this.setState({
                        loading: false
                    })
                }
                else if (response.data.length > 0) {
                    _this.setState({
                        reportData: response.data,
                        reportKeys: response.keys,
                        loading: false
                    });
                } else {
                    //message.error("error");
                    _this.setState({
                        loading: false
                    })
                }
            })

    }

    onInputChange = (e) => {
        this.setState({ searchText: e.target.value });
    }


    handleChange = (pagination, filters, sorter) => {
        // console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }
    clearFilters = () => {
        this.setState({ filteredInfo: null });
    }
    clearAll = () => {
        this.setState({
            filteredInfo: null,
            sortedInfo: null,
        });
    }
    setAgeSort = () => {
        this.setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'age',
            },
        });
    }

    defaultReport = () => {
        //console.log("User -----------", sessionStorage.getItem('token'))
        var instance = axios.create({
            headers: { 'x-access-token': sessionStorage.getItem('token') }
        });
        instance.get('/featureWiseDefaultReport').then((response) => {
            //  console.log("Data couponType------------------", response.data.data);
            this.setState({
                defaultReport: response.data.data,
                featureReport: [{ 'type': "contests", 'count': response.data.data[0].contests },
                { 'type': "fanclubs", 'count': response.data.data[0].fanclubs },
                { 'type': "fun2win", 'count': response.data.data[0].fun2win },
                { 'type': "profile", 'count': response.data.data[0].profile },
                { 'type': "referral", 'count': response.data.data[0].referral }
                ]
            });
        });
    }

    // --------------------- Generate Redeemed Coupons Report

    // generatecouponBeginDate(value) {
    //     var value = moment(value).format('YYYY-MM-DD');
    //     this.setState({
    //         generatecouponBeginDate: value
    //     });
    // }

    // generatecouponEndDate(value) {
    //     var value = moment(value).format('YYYY-MM-DD');
    //     this.setState({
    //         generatecouponEndDate: value
    //     });
    // }

    handleChange2 = (value) => {
        // var value1 = new Date(value).toISOString()
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
        this.setState({ reportData: [] })
        if (this.state.coinsStartDate === '') errors.coinsStartDate = "* This field is mandatory";
        if (this.state.coinsEndDate === '') errors.coinsEndDate = "* This field is mandatory";
        if (this.state.coinsEndDate <= this.state.coinsStartDate) errors.coinsEndDate = "* Enter Valid Date";
        if (moment(this.state.coinsStartDate).format('YYYY-MM-DD') == moment(this.state.coinsEndDate).format('YYYY-MM-DD')) errors.coinsStartDate = "Please select a valid time period, at least one day";
        this.setState({ errors });
        this.setState({
           // reportData: [],
            loading:true

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
        const url = '/featureWiseCoinsCount';
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
                // console.log(response);
                if (response.data.length < 0) {
                    // message.info("No Data Found");
                    _this.setState({
                        loading: false,
                        reportData: []
                    })
                }
                else if (response.data.length > 0) {
                    _this.setState({
                        reportData: response.data,
                        reportKeys: response.keys,
                        loading: false
                    });
                } else {
                    //message.error("error");
                    _this.setState({
                        loading: false
                    })
                }
            })
    }

    onSearch = () => {
        // console.log("------>------>", this.state.reportData);
        var data222 = this.state.reportData;
        const { searchText } = this.state;
        const reg = new RegExp(searchText, 'gi');
        //  console.log(typeof searchText, '1414')
        //const reg = this.state.searchText;
        //  console.log("------>------>", this.state.searchText);
        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText,
            data: data222.map((record) => {
                const match = record.referral.match(parseInt(reg));
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    referral: (
                        <span>
                            {record.referral.split(reg).map((text, i) => (
                                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                            ))}
                        </span>
                    ),
                };
            }).filter(record => !!record),
        });
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
        const defaultReport = [];
        // console.log('jjkfdhkjhdsafkjhfkjdsakfj--->',Object.keys(this.state.defaultReport[0]));
        // console.log();
        if (this.state.defaultReport.length != 0) {
            let tabledata = this.state.defaultReport.map((item, index) => {
                defaultReport.push({
                    key: item._id,
                    contests: item.contests,
                    fanclubs: item.fanclubs,
                    fun2win: item.fun2win,
                    profile: item.profile,
                    referral: item.referral,
                })
            })
        }
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const data1 = [];
        if (this.state.reportData.length != 0) {
            let tabledata = this.state.reportData.map((item, index) => {
                data1.push({
                    key: item._id,
                    date: item.date,
                    fun2win: item.fun2win,
                    referral: item.referral,
                    contests: item.contests,
                    fanclubs: item.fanclubs,
                    profile: item.profile
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
                title: 'FUN2WIN',
                dataIndex: 'fun2win',
                key: 'fun2win',
                //  sorter: (a, b) => a.fun2win - b.fun2win,
            },
            {
                title: 'REFERRAL',
                dataIndex: 'referral',
                key: 'referral',
                // sorter: (a, b) => a.referral - b.referral,
            },

            {
                title: 'CONTEST',
                dataIndex: 'contests',
                key: 'contests',
                //sorter: (a, b) => a.contests - b.contests,
            },

            {
                title: 'FanClubs',
                dataIndex: 'fanclubs',
                key: 'fanclubs',
                // sorter: (a, b) => a.contests - b.contests,
            },
            {
                title: 'PROFILE CREATION',
                dataIndex: 'profile',
                key: 'profile',
                defaultSortOrder: 'descend',
                // sorter: (a, b) => a.profile - b.profile,
            },
        ];
        const data3 = []
        if (this.state.reportData.length != 0) {
            let preparingdata = this.state.reportData.map((item, index) => {
                data3.push({
                    Date: item.date,
                    Fun2Win: item.fun2win,
                    Referral: item.referral,
                    Contests: item.contests,
                    fanclubs: item.fanclubs,
                    Profile: item.profile
                })
            })
        }
        const example = (
            <div>
                <Col span={24}>
                    <Col span={12}>

                        <h3 className="ReddemedCouponsCountReportsMsgCenter">Fun2Win:<span></span></h3>


                        
                        {/* <ul className="list-inline allNotifiList" >
                            <li><h3 className="">Earned Users</h3></li>
                            <li className="" ><span ><Icon type="filter" className="FancoinsFeaturefiltericon" /></span> <span className="FancoinsFeaturefilter">Filter</span></li>
                        </ul> */}
                    </Col>
                    <Col span={12}>
                        <div className="text-center">
                            <Workbook filename="Feature_Wise_Coin_Report.xlsx" element={<img src={reportsexcel} alt="contstCover" className="redeemedCouponspdfCoinsEarned" />}>
                                <Workbook.Sheet data={data3} name="Feature Wise Coin Report">
                                    <Workbook.Column label="Date" value="Date" />
                                    <Workbook.Column label="Fun2Win" value="Fun2Win" />
                                    <Workbook.Column label="Referral" value="Referral" />
                                    <Workbook.Column label="Contests" value="Contests" />
                                    <Workbook.Column label="Fanclubs" value="fanclubs" />
                                    <Workbook.Column label="Profile" value="Profile" />
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


        const container = <Table className="RedeemedcouponsReporttable ReedemCouponsreportsTableheading" dataSource={data1} columns={columns} pagination={{ pageSize: 10 }} />


        return (
            <div>
                <Row >

                    <Col span={24} className="" style={{ marginTop: 20 }}>
                        <Col span={24} className="Reports-coinsEarnedheader ">
                            <h3 className="RedeemedCouponsTitleReport">Fan Coins Earned Report - Feature Wise</h3>
                            <Col span={5} xs={12} sm={12} xl={4} lg={5} md={6} className="Reprotsmainheaderselect">
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
                            <Col span={5} xs={12} sm={12} xl={4} lg={5} md={6}>
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
                        <Col span={24} className="FeaturwiseReporticonimage">
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

export default FeatureWiseReports;
/* eslint-disable */