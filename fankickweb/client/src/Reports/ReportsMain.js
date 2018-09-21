/* eslint-disable */
import React from 'react';
import axios, { post } from 'axios';
import Workbook from 'react-excel-workbook';
import { PieChart } from 'react-easy-chart';
import { HorizontalBar, Pie, Doughnut, Bar } from 'react-chartjs-2';
import reqwest from 'reqwest';
import clone from 'clone';
import reportsexcel from '../images/reportsexcel.png';
import $ from 'jquery';
import { Icon, Col, Button, Select, Input, Form, DatePicker, message, Upload, Row, Card } from 'antd';
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
class ReportsMain extends React.Component {
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
            coupons: '',
            couponsCount: [],
            featureReportValues: [],
            featureReportKeys: [],
            coinsEarnedReportKeys: [],
            coinsEarnedReportValues: [],
            totalUsers: ''
        }
        this.baseState = this.state;
        // this.generateRedeemedReport = this.generateRedeemedReport.bind(this);
        this.generatecouponBeginDate = this.generatecouponBeginDate.bind(this);
        this.generatecouponEndDate = this.generatecouponEndDate.bind(this);

    }

    componentWillMount() {
        this.coinsEarnedReport();
        this.featureWiseReports();
        this.couponsRedeemedTillDate();
    }


    featureWiseReports = () => {
        console.log("User -----------", sessionStorage.getItem('token'))
        var instance = axios.create({
            headers: { 'x-access-token': sessionStorage.getItem('token') }
        });
        instance.get('/featureWiseDefaultReport').then((response) => {
            console.log("featureWiseDefaultReport------------------", response.data.data[0]);
            console.log(`Values`, Object.values(response.data.data[0]));
            this.setState({
                featureReportValues: Object.values(response.data.data[0]),
                featureReportKeys: response.data.keys,
                featureReport: [{ 'type': "Contests", 'count': response.data.data[0].contests },
                { 'type': "Fanclubs", 'count': response.data.data[0].fanclubs },
                { 'type': "Fun2win", 'count': response.data.data[0].fun2win },
                { 'type': "Profile", 'count': response.data.data[0].profile },
                { 'type': "Referral", 'count': response.data.data[0].referral }
                ]
            });
        });
    }


    coinsEarnedReport = () => {
        console.log("User -----------", sessionStorage.getItem('token'))
        var instance = axios.create({
            headers: { 'x-access-token': sessionStorage.getItem('token') }
        });
        instance.get('/coinsEarnedDefaultReport').then((response) => {
            console.log("coinsEarnedDefaultReport------------------", response.data.default);
            console.log("coinsEarnedDefaultReport------------------", response.data.default.UsersWith2500);
            console.log("222222222222222", Object.values(response.data.default));
            this.setState({
                coinsEarnedReportValues: [response.data.default.UsersWith2500,
                response.data.default.UsersWith5000,
                response.data.default.UsersWith7500,
                response.data.default.UsersWith10000,
                response.data.default.UsersWith15000,
                response.data.default.UsersWith50000
                ],
                coinsEarnedReportKeys: Object.keys(response.data.default),
                couponTypes: [{ 'type': "Total Number of Coins Earned by all users (Till Date)", 'count': response.data.default.totalCoinsEarned },
                { 'type': "Number of users with in fancoins 2500", 'count': response.data.default.UsersWith2500 },
                { 'type': "Number of users with in fancoins 5000", 'count': response.data.default.UsersWith5000 },
                { 'type': "Number of users with in fancoins 7500", 'count': response.data.default.UsersWith7500 },
                { 'type': "Number of users with in fancoins 10000", 'count': response.data.default.UsersWith10000 },
                { 'type': "Number of users with in fancoins 15000", 'count': response.data.default.UsersWith15000 },
                { 'type': "Number of users with in fancoins 50000", 'count': response.data.default.UsersWith50000 }
                ]
            });
        });
    }


    couponsRedeemedTillDate = () => {
        console.log("User -----------", sessionStorage.getItem('token'))
        var instance = axios.create({
            headers: { 'x-access-token': sessionStorage.getItem('token') }
        });
        instance.get('/couponsRedeemedTillDate').then((response) => {
            console.log("couponsRedeemedTillDate------------------", response.data.data);
            this.setState({ coupons: response.data.data });
            this.setState({ couponsCount: response.data.data.couponsCount });
            this.setState({ totalCouponsCount: response.data.data.totalCoupons });
            this.setState({ totalUsers: response.data.data.users });
        });
    }

    // --------------------- Generate Redeemed Coupons Report

    generatecouponBeginDate(value) {
        var value = moment(value).format('YYYY-MM-DD');
        this.setState({
            generatecouponBeginDate: value
        });
    }

    generatecouponEndDate(value) {
        var value = moment(value).format('YYYY-MM-DD');
        this.setState({
            generatecouponEndDate: value
        });
    }


    render() {
        const totalCouponsCount = clone(this.state.totalCouponsCount);
        const totalRedeemedCount = clone(this.state.totalRedeemedCoupons);
        const featureReport = clone([this.state.featureReport]);
        const userdata = [{
            couponType: "Total Coupons Redeemed",
            coinsCount: this.state.totalCouponsCount
        }, {
            couponType: "No of Distinct Users who has redeemed Coupons",
            coinsCount: this.state.totalUsers

        }]
        const defaultearnReport = clone(this.state.couponTypes);
        const coupons = clone(this.state.coupons);
        const couponslist = clone(this.state.couponsCount);
        console.log("------------->", coupons);

        const couponcardList = couponslist.map((coupons, index) => {
            return (
                <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8} className="MarginTop20">
                    <Card>
                        <div className="image">
                           <figure>
                                <img src={coupons.imageUrl} alt="Contest Cover" width='100%' height='100px' style={{marginBottom:'-5px'}}  />
                            </figure>
                        </div>

                        <div className="cardFooter">
                            <h3 className="couponCardFooterh3">{coupons.coinsCount} Users</h3>
                        </div>
                    </Card> </Col>)
        }
        );

        var RedeemedReport = []
        if (this.state.couponsCount.length != 0) {
            let preparingdata = this.state.couponsCount.map((item, index) => {
                RedeemedReport.push({
                    couponType: ' No of ' + item.couponType + ' coupons redeemed',
                    coinsCount: item.coinsCount
                })
            })
        }
        const mainData = userdata.concat(RedeemedReport);


        const featuredata = {
            // labels: [
            //     'contests',
            //     'fanclubs',
            //     'fun2win',
            //     'profile',
            //     'referral'
            // ],
            labels: this.state.featureReportKeys,
            datasets: [{
                data: this.state.featureReportValues,
                // data: [300, 50, 100, 400, 10],
                backgroundColor: [
                    '#F8C239',
                    '#F7652B',
                    '#8B572A',
                    '#2FA2F4',
                    '#783293',
                    '#F7652B',
                    '#4F84C4',
                    '#9C9A40',
                    '#BFD641',
                    '#6B5B95'
                ],
                hoverBackgroundColor: [
                    '#F8C239',
                    '#F7652B',
                    '#8B572A',
                    '#2FA2F4',
                    '#783293',
                    '#F7652B',
                    '#4F84C4',
                    '#9C9A40',
                    '#BFD641',
                    '#6B5B95'
                ]
            }]
        };

        const dateto = new Date();
        const data2 = {
            //labels: this.state.coinsEarnedReportKeys,
            labels: [
                '2500',
                '5000',
                '7500',
                '10000',
                '15000',
                '50000'
            ],
            datasets: [{
                label: 'Total User Count',
                data: this.state.coinsEarnedReportValues,
                backgroundColor: [
                    '#783293',
                    '#783293',
                    '#783293',
                    '#783293',
                    '#783293',
                    '#783293',
                    '#783293',
                    '#783293',
                    '#783293'
                ],
                hoverBackgroundColor: [
                    '#783293'
                ]
            }]
        };
        var date = moment(new Date()).format('LL');
        return (
            <div>
                <Row className="noselect">
                    <Col span={24}>
                        <Col span={12}>
                            <div className="ReportsborderBox boxstyle">
                                <ul className="list-inline">
                                    <li className="TxtHeading">Total Fan Coins (Feature Wise) </li>
                                    <li className="reportsTitleRight">{date}</li>
                                </ul>
                                <hr className="light" />
                                <div className="graphblock">
                                    <Doughnut data={featuredata} />
                                    <hr className="HRlight" />
                                    <ul className="list-inline AlignRight">
                                        <li><div className="text-center">
                                            <Workbook filename="Feature_Wise_Coin_Report.xlsx" element={<img src={reportsexcel} alt="contstCover" className="redeemedCouponspdfCoinsEarned" />}>

                                                <Workbook.Sheet data={this.state.featureReport} name="Default (Till Date)">
                                                    {/* <Workbook.Column label="" value="type" />
                                                    <Workbook.Column label="" value="count" /> */}
                                                    <Workbook.Column label="Default (Till Date)" value="type" />
                                        <Workbook.Column label="Result" value="count" />
                                                </Workbook.Sheet>

                                            </Workbook>
                                            <h4 className="downloadTxtCoinsErnd">DOWNLOAD</h4>
                                        </div></li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="ReportsborderBox boxstyle">

                                <ul className="list-inline">
                                    <li className="TxtHeading">Total Fan Coins (User Count)</li>
                                    <li className="reportsTitleRight">{date}</li>
                                </ul>
                                <hr className="light" />
                                <div className="graphblock">
                                    <HorizontalBar data={data2} />
                                    <hr className="HRlight" />
                                    <ul className="list-inline AlignRight">
                                        <li><div className="text-center">
                                            <Workbook filename="Coin_earned_report.xlsx" element={<img src={reportsexcel} alt="contstCover" className="redeemedCouponspdfCoinsEarned" />}>

                                                <Workbook.Sheet data={defaultearnReport} name="Total Coin Details">
                                                    {/* <Workbook.Column label="" value="type" />
                                                    <Workbook.Column label="" value="count" /> */}
                                                    <Workbook.Column label="Default (Till Date)" value="type" />
                                        <Workbook.Column label="Result" value="count" />

                                                </Workbook.Sheet>

                                            </Workbook>
                                            <h4 className="downloadTxtCoinsErnd">DOWNLOAD</h4>
                                        </div></li>
                                    </ul>
                                </div>

                            </div>
                        </Col>
                    </Col>
                </Row>
                <Row className="Reportsdata">
                    <Col span={24}>
                        <Col span={12}>
                            <ul className="list-inline">
                                <li className="padding10 FontBold">Total Coupons Redeemed:<span className="BoldFont"> {coupons.totalCoupons}</span></li>
                            </ul>
                        </Col>
                        <Col span={12}>
                            <ul className="list-inline">
                                <li className="DistinctTxt">No. of Distinct Users Who Have Redeemed Coupons:<span className="BoldFntTxt"> {coupons.users} </span></li>
                            </ul>
                        </Col>

                    </Col>

                    <Col span={24}>
                        <hr className="light" />
                        {couponcardList}

                    </Col>
                    <Col>
                        <div>
                            <hr className="HRlight" />
                            <ul className="list-inline AlignRight">
                                <li>  <div className="row text-center">

                                    <Workbook filename="redeemedcouponsreport.xlsx" element={<img src={reportsexcel} alt="contestcover" className="redeemedCouponspdfCoinsEarned" />}>

                                        <Workbook.Sheet data={mainData} name="Total_Coupons_Count">
                                            <Workbook.Column label="Default (Till Date)" value="couponType" />
                                            <Workbook.Column label="Result" value="coinsCount" />
                                          
                                        </Workbook.Sheet>
                                    </Workbook>
                                    <h4 className="downloadTxtCoinsErnd">DOWNLOAD</h4>
                                </div></li>
                            </ul>
                        </div>
                    </Col>
                </Row>


            </div>
        );

    }
}

export default ReportsMain;
/* eslint-disable */