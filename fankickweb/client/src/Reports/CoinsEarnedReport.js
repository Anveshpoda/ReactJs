/* eslint-disable */
import React from 'react';
import classnames from 'classnames';
import axios, { post } from 'axios';
import Workbook from 'react-excel-workbook';
import reqwest from 'reqwest';
import clone from 'clone';
import $ from 'jquery';
import { Scrollbars } from 'react-custom-scrollbars';
import { Spin, Alert, Icon, Col, Button, Select, Input, Form, DatePicker, Table, Divider, Avatar, message, Upload, Row, InputNumber } from 'antd';
import reportsexcel from '../images/reportsexcel.png';
import css from './ComponentReports.css';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const dateFormat = 'YYYY/MM/DD';
const format = 'HH:mm';
function disabledDate(current) {
    if (current) {
        return false;
    }
    const date = moment();
    date.hour(0);
    date.minute(0);
    date.second(0);
    return current.valueOf() >= date.valueOf();
}

//   function disabledDate(current) {
//     // Can not select days before today and today
//     return current && current <= moment().endOf('day');
//   }

class CoinsEarnedReports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            couponTypes: [],
            coins: {},
            errors: {},
            id: '',
            couponId: '',
            coinFrom: '',
            coinTo: '',
            reportData: [],
            reportKeys: [],
            reportDefault: '',
            coinsStartDate: '',
            coinsEndDate: '',
            data: '',
            loading: false

        }
        this.baseState = this.state;
        this.generateuserReport = this.generateuserReport.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
    }
    componentDidMount() {
        this.getcoupontotlacoinsdetails();
        this.setState({ coinsStartDate: 500, coinsEndDate: 1000, loading: true });
        var data = {
            startCoins: 500,
            endCoins: 1000
        }
        var _this = this;
        const url = '/coinsEarnedReport';
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
                //console.log("didmount response", response);
                if (response.data.length === 0) {
                    // message.info("No Data Found");
                    _this.setState({
                        loading: false
                    })
                }
                else if (response.data.length > 0) {
                    _this.setState({
                        reportData: response.data,
                        data: response.data,
                        loading: false
                    });
                    //   console.log("this.ste", _this.state.data);
                    const data5 = [];
                    let tabledata = _this.state.reportData.map((item, index) => {
                        //  console.log("index", index);
                        data5.push({
                            key: index,
                            name: <div><ul className="list-inline"><li><Avatar src={item.imageUrl}>{item.username.charAt(0)}</Avatar></li><li className="FancoinsRedeemedReports">{item.username}</li></ul></div>,
                            CurrentFancoins: item.currentFancoins,
                            TotalEarned: item.fancoinsEarned,
                            PhoneNum: item.mobileNumber,
                            UserLoc: item.userLocation
                        })
                    })
                    _this.setState({ data: data5 });

                } else {
                    //  message.error("error");
                    _this.setState({
                        loading: false
                    })
                }
            })
    }

    getcoupontotlacoinsdetails = () => {
        //  console.log("User -----------", sessionStorage.getItem('token'))
        var instance = axios.create({
            headers: { 'x-access-token': sessionStorage.getItem('token') }
        });
        instance.get('/coinsEarnedDefaultReport').then((response) => {
            // console.log("coinsEarnedDefaultReport------------------", response.data.default);
            //  this.setState({ couponTypes: response.data.default });
            this.setState({
                couponTypes: [{ 'type': "Total Number of Coins Earned by all users (Till Date)", 'count': response.data.default.totalCoinsEarned },
                { 'type': "Number of users with in fancoins 2500 to 4999", 'count': response.data.default.UsersWith2500 },
                { 'type': "Number of users with in fancoins 5000 to 7499", 'count': response.data.default.UsersWith5000 },
                { 'type': "Number of users with in fancoins 7500 to 9999", 'count': response.data.default.UsersWith7500 },
                { 'type': "Number of users with in fancoins 10000 to 14999", 'count': response.data.default.UsersWith10000 },
                { 'type': "Number of users with in fancoins 15000 to 49999", 'count': response.data.default.UsersWith15000 },
                { 'type': "Number of users with in fancoins 50000 and above", 'count': response.data.default.UsersWith50000 }
                ]
            });
        });
    }

    onChangeCoinFrom(value) {
        this.setState({
            coinFrom: value
        })
    }
    onChangeCoinTo(value) {
        this.setState({
            coinTo: value
        })
    }

    handleChange2(value) {
        if (value) {
            this.state.errors.coinsStartDate = ''
        }
        this.setState({
            coinsStartDate: value
        })

    }

    handleChange3(value) {
        if (value) {
            this.state.errors.coinsEndDate = ''
        }
        this.setState({
            coinsEndDate: value
        })

    }
    generateuserReport() {
        let errors = {};
        if (this.state.coinsStartDate === '' || this.state.coinsStartDate === undefined) errors.coinsStartDate = "* This field is mandatory";
        if (this.state.coinsEndDate === '' || this.state.coinsEndDate === undefined) errors.coinsEndDate = "* This field is mandatory";
        if (this.state.coinsEndDate < this.state.coinsStartDate) errors.coinsEndDate = "* Enter Valid Number";
        // if (moment(this.state.coinsStartDate).format('YYYY-MM-DD') == moment(this.state.coinsEndDate).format('YYYY-MM-DD')) errors.coinsStartDate = "Please select a valid time period, at least one day";
        this.setState({ errors });
        this.setState({
            reportData: [],
            loading: true,
            //data: []
        })
        if (Object.keys(errors).length === 0) {
            var data = {
                "startCoins": Number(this.state.coinsStartDate),
                "endCoins": Number(this.state.coinsEndDate)
            }
            this.generateReport(data);
        }
    }
    generateReport(data) {
        var _this = this;
        const url = '/coinsEarnedReport';
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
                //console.log("submit############33", response);
                if (response.data.length < 0) {
                    message.info("No Data Found");
                    _this.setState({
                        loading: false
                    })
                }
                else if (response.data.length > 0) {
                    _this.setState({
                        reportData: response.data,
                        loading: false
                    });
                    const data5 = [];
                    let tabledata = response.data.map((item, index) => {
                        //console.log("sumbmir", index);
                        data5.push({
                            key: index,
                            name: <div><ul className="list-inline"><li><Avatar src={item.imageUrl}>{item.username.charAt(0)}</Avatar></li><li className="FancoinsRedeemedReports">{item.username}</li></ul></div>,
                            CurrentFancoins: item.currentFancoins,
                            TotalEarned: item.fancoinsEarned,
                            PhoneNum: item.mobileNumber,
                            UserLoc: item.userLocation
                        })
                    })
                    _this.setState({ data: data5 });
                } else {
                    //message.error("Unable to get data");
                    _this.setState({
                        loading: false
                    })
                }
            })

    }


    onInputChange = (e) => {
        this.setState({ searchText: e.target.value });
    }
    onSearch44 = () => {
        var input = document.getElementById("myInput");
        var searchInput5 = input.value;
        var filterdata = [];
        var data = this.state.reportData
        for (var i = 0; i < data.length; i++) {
            if (searchInput5 >= data[i].currentFancoins) {
                filterdata.push({
                    name: <div><ul className="list-inline"><li><Avatar src={data[i].imageUrl}>{data[i].username.charAt(0)}</Avatar></li><li className="FancoinsRedeemedReports">{data[i].username}</li></ul></div>,
                    CurrentFancoins: data[i].currentFancoins,
                    TotalEarned: data[i].fancoinsEarned,
                    PhoneNum: data[i].mobileNumber,
                    UserLoc: data[i].userLocation,
                    ImageUrl: data[i].imageUrl
                })
            }
        }
        this.setState({ data: filterdata });
    }
    onKeyDown = () => {
        var _this = this;
        const data5 = [];
        let tabledata = _this.state.reportData.map((item, index) => {
            data5.push({
                key: index,
                name: <div><ul className="list-inline"><li><Avatar src={item.imageUrl}>{item.username.charAt(0)}</Avatar></li><li className="FancoinsRedeemedReports">{item.username}</li></ul></div>,
                CurrentFancoins: item.currentFancoins,
                TotalEarned: item.fancoinsEarned,
                PhoneNum: item.mobileNumber,
                UserLoc: item.userLocation
            })
        })
        _this.setState({ data: data5 });
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
        const defaultReport = clone(this.state.couponTypes);
        //  console.log("defaultReport-------------", defaultReport)
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                defaultSortOrder: 'descend',
            },
            {
                title: 'Current Fancoins',
                dataIndex: 'CurrentFancoins',
                key: 'CurrentFancoins',

            },
            {
                title: 'Total Earned',
                dataIndex: 'TotalEarned',
                key: 'TotalEarned',
            }, {
                title: 'Phone Number',
                dataIndex: 'PhoneNum',
                key: 'PhoneNum',
            },
            {
                title: 'User Location',
                dataIndex: 'UserLoc',
                key: 'UserLoc',

            }
        ];
        var data3 = []
        if (this.state.data.length != 0) {
            let preparingdata = this.state.reportData.map((item, index) => {
                data3.push({
                    Name: item.username,
                    CurrentFancoins: item.currentFancoins,
                    TotalEarned: item.fancoinsEarned,
                    PhoneNum: item.mobileNumber,
                    UserLoc: item.userLocation,
                    ImageUrl: item.imageUrl
                })
            })
        }


        const example = (
            <div>
                <Row>
                    <Col span={24}>
                        <Col span={12} className="CoinsEarnedReportSearch">
                            <h3 className="ReddemedCouponsCountReports">No.of users earned:  {this.state.reportData.length}<span></span></h3>

                            {/*  <Input className="SearchBoxCoinsEarnd" type="text" id="myInput" onKeyDown={this.onKeyDown.bind(this)}
                                onChange={this.onSearch44.bind(this)} placeholder="Fan Coins Search" title="Type in a name" />
                            <Icon type="search" className="SearchIconCoinsEarned" />*/}
                        </Col>

                        <Col span={12}>

                            <div className="text-center">
                                <Workbook filename="Coin_earned_report.xlsx" element={<img src={reportsexcel} alt="contstCover" className="redeemedCouponspdfCoinsEarned" />}>
                                    <Workbook.Sheet data={data3} name="Coin Earned Report">
                                        <Workbook.Column label="Name" value="Name" />
                                        <Workbook.Column label="CurrentFancoins" value="CurrentFancoins" />
                                        <Workbook.Column label="TotalEarned" value="TotalEarned" />
                                        <Workbook.Column label="PhoneNum" value="PhoneNum" />
                                        <Workbook.Column label="UserLoc" value="UserLoc" />
                                        {/* <Workbook.Column label="ImageUrl" value="ImageUrl" /> */}
                                    </Workbook.Sheet>
                                    <Workbook.Sheet data={defaultReport} name="Total Coin Details">
                                        <Workbook.Column label="Default (Till Date)" value="type" />
                                        <Workbook.Column label="Result" value="count" />

                                    </Workbook.Sheet>

                                </Workbook>
                                <h4 className="downloadTxtCoinsErnd">DOWNLOAD</h4>
                            </div>
                        </Col>
                    </Col>
                </Row>
            </div >
        )

        const { imageUrl } = this.state;
        const container = <Table className="CoinsearnedReportstable ReedemCouponsreportsTableheading TableHeadingResponsive" dataSource={this.state.data} columns={columns} pagination={{ pageSize: 10 }} />


        return (
            <div>
                <Row >

                    <Col span={24} className="" style={{ marginTop: 20 }}>
                        <Col span={24} className="Reports-coinsEarnedheader1">
                            <h3 className="RedeemedCouponsTitleReport">Fan Coins Earned - Detailed Report</h3>
                            <Col span={6} xs={12} sm={12} xl={4} lg={5} md={6} className="Reprotsmainheaderselect">
                                <Col className="space">
                                    <FormItem className="" label="Fan Coins Start Range">
                                        {/* <Input placeholder="Coupon Code" name="couponCode" maxLength="20" value={this.state.coinsStartDate} onChange={this.handleChange2} /> */}
                                        <InputNumber min={0} max={1000000000} name="couponCode" value={this.state.coinsStartDate} onChange={this.handleChange2} />
                                        <p id="points" style={{ color: "red" }}>{this.state.errors.coinsStartDate}</p>
                                    </FormItem>
                                </Col>
                            </Col>
                            <Col span={6} xs={12} sm={12} xl={4} lg={5} md={6}>
                                <Col className="space">
                                    <FormItem label="Fan Coins End Range" className="">
                                        {/* <Input placeholder="Coupon Code" name="couponCode" maxLength="20" value={this.state.coinsEndDate} onChange={this.handleChange3} /> */}
                                        <InputNumber min={0} max={1000000000} name="couponCode" value={this.state.coinsEndDate} onChange={this.handleChange3} />
                                        <p id="points" style={{ color: "red" }}>{this.state.errors.coinsEndDate}</p>
                                    </FormItem>
                                </Col>
                            </Col>
                            <Col span={12}>
                                <FormItem className="mrgTop33">
                                    <Button className="ReportsSubmitbtn" type="primary" onClick={this.generateuserReport}>Submit</Button>
                                </FormItem>
                            </Col>
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col>
                            {example}
                        </Col>
                    </Col>


                    <Col span={24}>
                        <Row className="funClubsRen">
                            <Spin spinning={this.state.loading}>
                                {container}
                            </Spin>
                            {/* {this.state.data.length === 0 ? <div id="noFunclubs">No Data Available</div> : ""} */}
                        </Row>
                    </Col>


                </Row>
            </div >
        );
    }
}
export default CoinsEarnedReports;
     /* eslint-disable */