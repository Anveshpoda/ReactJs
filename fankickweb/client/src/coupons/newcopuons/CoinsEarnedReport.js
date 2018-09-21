/* eslint-disable */
import React from 'react';
import axios, { post } from 'axios';
import Workbook from 'react-excel-workbook';
import reqwest from 'reqwest';
import clone from 'clone';
import $ from 'jquery';
import { Icon, Col, Button, Select, Input, Form, DatePicker, message, Upload, Row, InputNumber } from 'antd';
import css from '../Coupons.css';
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
            reportDefault: ''

        }
        this.baseState = this.state;
        this.generateuserReport = this.generateuserReport.bind(this);
        this.onChangeCoinFrom = this.onChangeCoinFrom.bind(this);
        this.onChangeCoinTo = this.onChangeCoinTo.bind(this);
    }

    componentWillMount() {
        this.getcouponType();
        this.getcoupontotlacoinsdetails();
    }

    getcouponType = () => {
        console.log("User -----------", sessionStorage.getItem('token'))
        var instance = axios.create({
            headers: { 'x-access-token': sessionStorage.getItem('token') }
        });
        instance.get('/coupon-types').then((response) => {
            console.log("Data couponType------------------", response.data.data);
            this.setState({ couponTypes: response.data.data });
        });
    }

    getcoupontotlacoinsdetails = () => {
        console.log("User -----------", sessionStorage.getItem('token'))
        var instance = axios.create({
            headers: { 'x-access-token': sessionStorage.getItem('token') }
        });
        instance.get('/coupon-types').then((response) => {
            console.log("Data couponType------------------", response.data.data);
            this.setState({ couponTypes: response.data.data });
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

    generateuserReport() {
        message.destroy();
        let errors = {};
        if (this.state.coinFrom === undefined || this.state.coinFrom === '') {
            errors.m1 = "Please Enter From Coins";
        } else if (this.state.coinTo === undefined || this.state.coinTo === '') {
            errors.m2 = "Please Enter To Coins";
        } else if (this.state.coinFrom > this.state.coinTo) {
            errors.m2 = "Please Enter Valid Coins Count";
        }


        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            var cid = this.state.couponId;
            var data = {
                "startCoins": this.state.coinFrom,
                "endCoins": this.state.coinTo
            }
            this.generateReport(data);
        }
    }


    generateReport(data) {
        var _this = this;
        const url = '/coinsEarnedReport';
        console.log("data---->", data);
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
                    message.info("No Data Found");
                }
                else if (response.data.length > 0) {
                    // for (var i = 0; i < response.data.length; i++) {
                    //     response.data[i].ipAddresses = response.data[i].ipAddresses.join(',')
                    // }
                    // response.data[0].ipAddresses = response.data[0].ipAddresses.join(',')
                    _this.setState({
                        reportData: response.data,
                        reportKeys: response.keys,
                        reportDefault: response.default,
                        coinFrom: '',
                        coinTo: ''
                    });
                    // console.log("response", response.data);
                    // console.log("response", response.keys);
                } else {
                    message.error("error");
                }
            })
    }

    render() {
        const couponData = clone(this.state.reportData);
        const couponKeys = clone(this.state.reportKeys);
        const coinsDefault = clone([this.state.reportDefault]);
        const coinDefaultKeys = Object.keys(this.state.reportDefault);
        const renderSheet1 = coinDefaultKeys.map((record) => {
            return (<Workbook.Column label={record} value={record} />)
        })

        const reportSheet = (
            <div className="row text-center" >
                <Workbook filename={"Coin-report.xlsx"} element={<Button type="primary" onClick={this.generateuserReport}>Download Report!</Button>}>
                    <Workbook.Sheet data={couponData} name="Coin Details">
                        {/* {renderSheet} */}
                        <Workbook.Column label="User Name" value={row => row.username} />
                        <Workbook.Column label="Mobile Number" value={row => row.mobileNumber} />
                        <Workbook.Column label="User Location" value={row => row.userLocation} />
                        <Workbook.Column label="Current Fancoins" value={row => row.currentFancoins} />
                        <Workbook.Column label="Fancoins Earned" value={row => row.fancoinsEarned} />
                    </Workbook.Sheet>
                    <Workbook.Sheet data={coinsDefault} name="Total Coin Details">
                        {renderSheet1}
                        {/* <Workbook.Column label="UsersWith2500" value={row => row.UsersWith2500} />
                        <Workbook.Column label="UsersWith5000" value={row => row.UsersWith5000} />
                        <Workbook.Column label="UsersWith7500" value={row => row.UsersWith7500} />
                        <Workbook.Column label="UsersWith10000" value={row => row.UsersWith10000} />
                        <Workbook.Column label="UsersWith15000" value={row => row.UsersWith15000} />
                        <Workbook.Column label="UsersWith50000" value={row => row.UsersWith50000} />
                        <Workbook.Column label="totalCoinsEarned" value={row => row.totalCoinsEarned} /> */}
                    </Workbook.Sheet>
                </Workbook>
            </div>
        )
        const { imageUrl } = this.state;
        const mapCoupon = this.state.couponTypes.map((coupon) => <Option value={coupon._id}>{coupon.couponFrom}</Option>);
        return (

            <div>
                <Row >
                    <p>List of Earned Coins Report</p>
                    <Col span={24} className="" style={{ marginTop: 20 }}>

                        <Col span={24}>
                            <Col span={12}>
                                <FormItem>
                                    <h6 className='AddCoupnh6Fnt'><span className="RedStar">*</span>Coins From</h6>
                                    <InputNumber min={1} max={100000} name="couponFrom" value={this.state.coinFrom} onChange={this.onChangeCoinFrom} />
                                    <span id="points" style={{ color: "red" }}>{this.state.errors.m1}</span>
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem>
                                    <h6 className='AddCoupnh6Fnt'><span className="RedStar">*</span>Coins To</h6>
                                    <InputNumber min={1} max={100000} name="couponFrom" value={this.state.coinTo} onChange={this.onChangeCoinTo} />
                                    <span id="points" style={{ color: "red" }}>{this.state.errors.m2}</span>
                                </FormItem>
                            </Col>
                        </Col>
                        <Col span={24}>
                            <Col span={12}>
                                <FormItem className="fontWeightBold">
                                    <Button type="primary" onClick={this.generateuserReport} >Generate Report</Button>
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                {
                                    couponData.length > 0 ? reportSheet : null
                                }

                                {/* {reportSheet} */}
                            </Col>
                        </Col>

                    </Col>

                </Row>
            </div>
        );

    }
}
export default CoinsEarnedReports;
/* eslint-disable */