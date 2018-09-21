/* eslint-disable */
import React from 'react';
import classnames from 'classnames';
import axios, { post } from 'axios';
import Workbook from 'react-excel-workbook';
import reqwest from 'reqwest';
import clone from 'clone';
import $ from 'jquery';
import { Spin, Alert, Icon, Col, Button, Select, Input, Form, DatePicker, Table, Divider, Avatar, message, Upload, Row, InputNumber } from 'antd';
import css from './ComponentReports.css';
import { Scrollbars } from 'react-custom-scrollbars';
import reportsexcel from '../images/reportsexcel.png';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const dateFormat = 'YYYY/MM/DD';
const format = 'HH:mm';
class CoinsRedeemedReports extends React.Component {
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
            coinsStartDate: 0,
            coinsEndDate: '',
            data: '',
            loading: false

        }
        this.baseState = this.state;
        this.generateuserReport = this.generateuserReport.bind(this);
        this.onChangeCoinFrom = this.onChangeCoinFrom.bind(this);
        this.onChangeCoinTo = this.onChangeCoinTo.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
    }
    componentDidMount() {
        this.setState({ coinsStartDate: 100, loading: true });
        var data = {
            coinsCount: 100
        }
        var _this = this;
        const url = '/coinsRedeemedReport';
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
                //console.log("didmount response reddemed", response);
                _this.setState({ reportDefault: response });
                if (response.data.length < 0) {
                    // message.info("No Data Found");
                    _this.setState({
                        loading: false
                    })
                }
                else if (response.data.length > 0) {
                    _this.setState({
                        reportData: response.data,
                        loading: false
                    });
                    // console.log("this.ste", _this.state.data);
                    const data5 = [];

                    let tabledata = _this.state.reportData.map((item, index) => {
                        //  console.log("index", index);
                        data5.push({
                            key: index,
                            name: <div><ul className="list-inline"><li><Avatar src={item.imageUrl}>{item.username.charAt(0)}</Avatar></li><li className="FancoinsRedeemedReports">{item.username}</li></ul></div>,
                            FancoinsRedeemed: item.fancoinsRedeemed,
                            CurrentFancoins: item.currentFancoins,

                            PhoneNum: item.mobileNumber,
                            UserLoc: item.userLocation
                        })
                    })
                    _this.setState({ data: data5 });

                } else {
                    //message.error("error");
                    _this.setState({
                        loading: false
                    })
                }
            })
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
    generateuserReport() {
        let errors = {};
        if (this.state.coinsStartDate === '' || this.state.coinsStartDate === undefined) errors.coinsStartDate = "* This field is mandatory";
        // if (this.state.coinsEndDate === '') errors.coinsEndDate = "* This field is mandatory";
        // if (this.state.coinsEndDate <= this.state.coinsStartDate) errors.coinsEndDate = "* Enter Valid Date";
        // if (moment(this.state.coinsStartDate).format('YYYY-MM-DD') == moment(this.state.coinsEndDate).format('YYYY-MM-DD')) errors.coinsStartDate = "Please select a valid time period, at least one daye";
        this.setState({ errors });
        this.setState({
            reportData: [],
            loading: true,
           
        })
        if (Object.keys(errors).length === 0) {
            var data = {
                "coinsCount": Number(this.state.coinsStartDate)
            }
            this.generateReport(data);
        }
    }
    generateReport(data) {
        var _this = this;
        const url = '/coinsRedeemedReport';
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
                //console.log("submit",response);
                _this.setState({ reportDefault: response });
                if (response.data.length === 0) {
                   // message.info("No Data Found");
                    _this.setState({
                        loading: false,
                        data: []
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
                            FancoinsRedeemed: item.fancoinsRedeemed,
                            CurrentFancoins: item.currentFancoins,
                            PhoneNum: item.mobileNumber,
                            UserLoc: item.userLocation
                        })
                    })
                    _this.setState({ data: data5 });
                } else {
                    // message.error("Unable to get data");
                    _this.setState({
                        loading: false
                    })
                }
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
                    key: i,
                    name: <div><ul className="list-inline"><li><Avatar src={data[i].imageUrl}>{data[i].username.charAt(0)}</Avatar></li><li className="FancoinsRedeemedReports">{data[i].username}</li></ul></div>,
                    FancoinsRedeemed: data[i].fancoinsRedeemed,
                    CurrentFancoins: data[i].currentFancoins,
                    PhoneNum: data[i].mobileNumber,
                    UserLoc: data[i].userLocation
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
                FancoinsRedeemed: item.fancoinsRedeemed,
                CurrentFancoins: item.currentFancoins,
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

        const coinsDefault = this.state.reportDefault;
        const details = [this.state.reportDefault];
        // console.log("this.state in coins reddemed@@@@@@@@@@@@@@@@", details);
        const columns = [

            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                defaultSortOrder: 'descend',
            },
            {
                title: 'Fancoins Redeemed',
                dataIndex: 'FancoinsRedeemed',
                key: 'FancoinsRedeemed',
            },
            {
                title: 'Current Fancoins',
                dataIndex: 'CurrentFancoins',
                key: 'CurrentFancoins',

            },
            {
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

        var data4 = []
        if (details.length != 0) {
            let preparingdata = this.state.reportData.map((item, index) => {
                data4.push({
                    Name: item.username,
                    FancoinsRedeemed: item.fancoinsRedeemed,
                    CurrentFancoins: item.currentFancoins,
                    PhoneNum: item.mobileNumber,
                    UserLoc: item.userLocation,
                    ImageUrl: item.imageUrl
                })
            })
        }

        var data5 = []
        if (details.length != 0) {
            let preparingdata = details.map((item, index) => {
                data5.push({
                    totalRedeemed: item.totalRedeemed,
                })
            })
        }

        const example = (
            <div>
                <Col span={24}>
                    <Col span={12} className="CoinsEarnedReportSearch">
                    <h3 className="ReddemedCouponsCountReports">No.of users redeemed:  {this.state.reportData.length}<span></span></h3>
                    </Col>
                    <Col span={12}>

                        <div className="text-center">
                            <Workbook filename="Coin_redeemed_report.xlsx" element={<img src={reportsexcel} alt="contstCover" className="redeemedCouponspdfCoinsEarned" />}>
                                <Workbook.Sheet data={data4} name="Coins Redeemed Details">
                                    <Workbook.Column label="Name" value="Name" />
                                    <Workbook.Column label="FancoinsRedeemed" value="FancoinsRedeemed" />
                                    <Workbook.Column label="CurrentFancoins" value="CurrentFancoins" />
                                    <Workbook.Column label="PhoneNum" value="PhoneNum" />
                                    <Workbook.Column label="UserLoc" value="UserLoc" />
                                    <Workbook.Column label="ImageUrl" value="ImageUrl" />
                                </Workbook.Sheet>
                                <Workbook.Sheet data={data5} name="Total Coins Redeemed Details">
                                    {/* <Workbook.Column label="Total Number of Coins Redeemed by all users (Till Date)" value={row => coinsDefault.totalRedeemed} />                   */}
                                    <Workbook.Column label="Total Number of Coins Redeemed by all users (Till Date)" value="totalRedeemed" />
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


        const container = <Table className="CoinsearnedReportstable ReedemCouponsreportsTableheading TableHeadingResponsive" dataSource={this.state.data} columns={columns} pagination={{ pageSize: 10 }} />


        return (
            <div>
                <Row >


                    <Col span={24} className="" style={{ marginTop: 20 }}>

                        <Col span={24} className="Reports-coinsEarnedheader ">
                            <h3 className="RedeemedCouponsTitleReport">Redeemed Fan Coins - Detailed Report</h3>
                            <Col span={6} xs={12} sm={12} xl={4} lg={5} md={6} className="Reprotsmainheaderselect">
                                <Col className="space">

                                    <FormItem label="Fan Coins Range" className="">
                                        {/* <Input placeholder="Coupon Code" name="couponCode" maxLength="20" value={this.state.coinsStartDate} onChange={this.handleChange2} /> */}
                                        <InputNumber min={0} max={10000000000} name="couponCode" value={this.state.coinsStartDate} onChange={this.handleChange2} />
                                        
                                    </FormItem>
                                    <span id="points" style={{ color: "red" }}>{this.state.errors.coinsStartDate}</span>
                                </Col>
                            </Col>

                            <Col span={12}>
                                <FormItem className="mrgTop33">
                                    <Button className="ReportsSubmitbtn" type="primary" onClick={this.generateuserReport}>Submit</Button>
                                </FormItem>
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

                    </Col>
                </Row>
            </div >
        );
    }
}
export default CoinsRedeemedReports;
/* eslint-disable */