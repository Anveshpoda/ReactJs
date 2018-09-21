/* eslint-disable */
import React from 'react';
import axios, { post } from 'axios';
import classnames from 'classnames';
import Workbook from 'react-excel-workbook';
import reqwest from 'reqwest';
import clone from 'clone';
import $ from 'jquery';
import { Spin, Alert, Icon, Col, Button, Select, Input, Form, DatePicker, Table, Divider, message, Upload, Row, InputNumber, Avatar, Tag } from 'antd';
import css from './ComponentReports.css';
import reportsexcel from '../images/reportsexcel.png';
import moment from 'moment';
import { Scrollbars } from 'react-custom-scrollbars';
const FormItem = Form.Item;
const Option = Select.Option;

const dateFormat = 'YYYY-MM-DD';
class RedeemedReports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            couponTypes: [],
            errors: {},
            id: '',
            couponBeginDate: new Date(),
            couponEndDate: '',
            couponStatus: 'True',
            reportData: [],
            reportKeys: [],
            coinsStartDate: '',
            coinsEndDate: '',
            totalRedeemedCoupons: '',
            funclubsubCategoryId: [],
            couponFrom: [],
            totalCouponsCount: '',
            totalUsers: '',
            loading: false
        }
        this.baseState = this.state;
        this.generateuserReport = this.generateuserReport.bind(this);
    }

    componentWillMount() {
        this.getTotalRedeemedCoupons();
        this.getcouponType();
        var date = new Date();
        date.setDate(date.getDate() - 30);
        // const startDate1 = moment(date).format();
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
            couponFrom: [],
            loading: true
        });
        var data = {
            fromDate: startDate1,
            toDate: endDate1,
            coupontype: []
        }
        // console.log("didmount response-- data", data);
        var _this = this;
        const url = '/couponsRedeemed';
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
                console.log("didmount response", response.data);
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
                        loading: false
                    });
                } else {
                    message.error("error");
                }
                console.log("didmount response", _this.state.reportData);
            })

    }

    getTotalRedeemedCoupons = () => {
        //  console.log("User -----------", sessionStorage.getItem('token'))
        var instance = axios.create({
            headers: { 'x-access-token': sessionStorage.getItem('token') }
        });
        instance.get('/couponsRedeemedTillDate').then((response) => {
            console.log("totalCouponsCount------------------", response.data);
            this.setState({ totalRedeemedCoupons: response.data.data });
            this.setState({ totalCouponsCount: response.data.data.couponsCount });
            this.setState({ totalUsers: response.data.data.users });
        });
    }

    getcouponType = () => {
        //console.log("User -----------", sessionStorage.getItem('token'))
        var instance = axios.create({
            headers: { 'x-access-token': sessionStorage.getItem('token') }
        });
        instance.get('/getDistinctCoupons').then((response) => {
            console.log("Data couponType------------------", response.data.data);
            this.setState({ couponTypes: response.data.data });
        });
    }

    // --------------------- Generate Redeemed Coupons Report

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

    onChangemultiCoupons = (e) => {
        // console.log(e)
        this.setState({
            couponFrom: e
        })
    }

    generateuserReport() {
        let errors = {};
        if (this.state.coinsStartDate === '') errors.coinsStartDate = "* This field is mandatory";
        if (this.state.coinsEndDate === '') errors.coinsEndDate = "* This field is mandatory";
        if (this.state.coinsEndDate <= this.state.coinsStartDate) errors.coinsEndDate = "* Enter Valid Date";
        if (moment(this.state.coinsStartDate).format('YYYY-MM-DD') == moment(this.state.coinsEndDate).format('YYYY-MM-DD')) errors.coinsStartDate = "Please select a valid time period, at least one day";
        this.setState({ errors });
        this.setState({
            // reportData: [],
            loading: true
        })
        if (Object.keys(errors).length === 0) {
            var data = {
                "fromDate": this.state.coinsStartDate,
                "toDate": this.state.coinsEndDate,
                "coupontype": this.state.couponFrom
            }
            // console.log("00000000000", data);
            this.generateReport(data);
        }
    }

    generateReport(data) {
        var _this = this;
        const url = '/couponsRedeemed';
        //  console.log("data---->", data);
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
                //  console.log("99909090909990909", response);
                if (response) {

                    _this.setState({
                        reportData: response.data,
                        reportKeys: response.keys,
                        loading: false
                    });
                    // console.log("response", response.data);
                    // console.log("response", response.keys);
                } else {
                    message.error("error")
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
        const data1 = [];
        var totalCount = 0;
        const userdata = [{
            couponType: "Total Coupons Redeemed",
            coinsCount: this.state.totalRedeemedCoupons.totalCoupons
        }, {
            couponType: "No of Distinct Users who has redeemed Coupons",
            coinsCount: this.state.totalUsers

        }]
        const couponData = clone(this.state.reportData);
        const couponKeys = clone(this.state.reportKeys);
        const totalRedeemedCount = clone(this.state.totalRedeemedCoupons);
        //  const totalCouponsCount = clone([this.state.totalCouponsCount]);
        const totalCouponsCount = clone(this.state.totalCouponsCount);
        console.log("----------------", totalCouponsCount)


        const renderSheet = couponKeys.map((record) => {
            if (record == 'date')
                return (<Workbook.Column label={record} value={record} />)
            else
                return (<Workbook.Column label={record + 'redeemed'} value={record} />)
        })

        couponData.map((item, index) => {
            console.log("----------------", item.totalCoupons)
            totalCount = totalCount + parseInt(item.totalCoupons);
        })


        var data4 = []
        if (totalCouponsCount.length != 0) {
            let preparingdata = totalCouponsCount.map((item, index) => {
                data4.push({
                    couponType: ' No of ' + item.couponType + ' coupons redeemed',
                    coinsCount: item.coinsCount
                })
            })
        }


        const mainData = userdata.concat(data4);
        console.log("---------------------", mainData)
        const columns = []
        const data3 = []
        this.state.reportKeys.map((key, index) => {
            var obj = {
                title: key.toUpperCase(),
                dataIndex: key,
                key
            }
            //  console.log(key, 'key', this.state.reportData[0], 'value')
            columns.push(obj)
        })

        // const data3 = []
        //  console.log(data3)
        //   data3.push(this.state.reportData)
        if (couponData.length != 0) {
            let preparingdata = couponData.map((item, index) => {
                data1.push(item)
            })
        }
        const example = (
            <div>
                <Col span={24}>
                    <Col span={12}>
                        <ul className="list-inline">
                            <li><h3 className="ReddemedCouponsCountReports">Total Coupons Redeemed: {totalCount}</h3></li>
                            {/* <li className="" ><span ><Icon type="filter" className="redeemedCouponsfiltericon" /></span> <span className="redeemedCouponsfilter">Filter</span></li> */}
                        </ul>
                    </Col>
                    <Col span={12}>
                        <div className="row text-center">

                            <Workbook filename="redeemedcouponsreport.xlsx" element={<img src={reportsexcel} alt="contestcover" className="redeemedCouponspdfCoinsEarned" />}>
                                <Workbook.Sheet data={data1} name="redeemed_coupons">
                                    {renderSheet}
                                </Workbook.Sheet>
                                <Workbook.Sheet data={mainData} name="Total_Coupons_Count">
                                    {/* {renderSheet2} */}
                                    <Workbook.Column label="Default (Till Date)" value="couponType" />
                                    <Workbook.Column label="Result" value="coinsCount" />
                                </Workbook.Sheet>
                            </Workbook>
                            <h4 className="downloadTxtCoinsErnd">DOWNLOAD</h4>
                        </div>
                    </Col>
                </Col>
            </div>
        )




        const mapCoupon = this.state.couponTypes.map((coupon) => <Option value={coupon}>{coupon}</Option>);



        const container = <Table className="RedeemedcouponsReporttable ReedemCouponsreportsTableheading" dataSource={data1} columns={columns} pagination={{ pageSize: 10 }}  scroll={{ x: 1658 }} />




        return (
            <div>
                <Row >

                    <Col span={24} className="" style={{ marginTop: 20 }}>
                        <Col span={24} className="Reports-coinsEarnedheader1">
                            <h3 className="RedeemedCouponsTitleReport">Redeemed Coupons - Detailed Statement</h3>
                            <Col span={5} xs={12} sm={12} xl={4} lg={5} md={6} className="Reprotsmainheaderselect1">
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
                            <Col span={8}>
                                <FormItem label="Select Merchants" className={classnames('coinsEndDate', { error: !!this.state.errors.coinsEndDate })}>
                                    <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                        mode="multiple"
                                        showSearch
                                        optionFilterProp="children"
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        style={{ width: '260' }} className="SelctMerchants"
                                        placeholder="You can select multiple merchants"
                                        value={this.state.couponFrom}
                                        onChange={this.onChangemultiCoupons}
                                        >
                                        {mapCoupon}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span={3}>
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
                            {/* {container} */}
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

export default RedeemedReports;
/* eslint-disable */