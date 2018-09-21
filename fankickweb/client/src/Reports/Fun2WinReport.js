/* eslint-disable */
import React from 'react';
import axios, { post } from 'axios';
import classnames from 'classnames';
import Workbook from 'react-excel-workbook';
import reqwest from 'reqwest';
import clone from 'clone';
import $ from 'jquery';
import { Scrollbars } from 'react-custom-scrollbars';
import { Icon, Col, Button, Select, Input, Form, DatePicker, Table, Divider, message, Upload, Row, InputNumber, Avatar } from 'antd';
import reportsexcel from '../images/reportsexcel.png';
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
            categorydata: '',
            scategorydata: ''
        }
        this.baseState = this.state;
        this.generateuserReport = this.generateuserReport.bind(this);
        // this.generatecouponBeginDate = this.generatecouponBeginDate.bind(this);
        // this.generatecouponEndDate = this.generatecouponEndDate.bind(this);

    }

    componentWillMount() {
        this.getFun2WinDetails();
    }

    getFun2WinDetails = () => {
        //  console.log("User -----------", sessionStorage.getItem('token'))
        var instance = axios.create({
            headers: { 'x-access-token': sessionStorage.getItem('token') }
        });
        instance.get('/generateReport').then((response) => {
            console.log("generateReport------------------", response.data.data);
            console.log("generateReport-mostPlayedCWisePacks------------------", response.data.data.mostPlayedCWisePacks);
            console.log("generateReport-mostPlayedSWisePacks------------------", response.data.data.mostPlayedSWisePacks);
            this.setState({
                reportData: response.data.data,
                categorydata: response.data.data.mostPlayedCWisePacks,
                scategorydata: response.data.data.mostPlayedSWisePacks,
                fun2winreport:
                    [
                        { 'type': "Total no. of Content Packs available for the users", 'count': response.data.data.packsAvailable },
                        { 'type': "Number of Content Packs Viewed", 'count': response.data.data.viewedPacks },
                        { 'type': "Number of Content Packs completed", 'count': response.data.data.answeredPacks },
                        { 'type': "Number of users Completed content Packs", 'count': response.data.data.distinctUsers },
                    ]
            });
        });
    }

    handleChange2 = (value) => {
        var value1 = new Date(value).toISOString()
        this.setState({ coinsStartDate: value1 });
    }
    
    handleChange3 = (value) => {
        var value1 = new Date(value).toISOString()
        this.setState({ coinsEndDate: value1 });
    }

    generateuserReport() {
        let errors = {};
        if (this.state.coinsStartDate === '') errors.coinsStartDate = "* This field is mandatory";
        if (this.state.coinsEndDate === '') errors.coinsEndDate = "* This field is mandatory";
        if (this.state.coinsEndDate <= this.state.coinsStartDate) errors.coinsEndDate = "* Enter Valid Date";
        this.setState({ errors });
        this.setState({
            reportData: []
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
                    message.info("No Data Found");
                }
                else if (response.data.length > 0) {
                    _this.setState({
                        reportData: response.data,
                        //reportKeys: response.keys,
                    });
                } else {
                    message.error("error");
                }
            })
    }

    render() {
        const data1 = [];
        const data2 = [];
        const data4 = [];
        const fun2windata = clone(this.state.reportData);
        const reportData = [this.state.reportData];
        // const cData = [fun2windata.mostPlayedCWisePacks];
        // const sData = [fun2windata.mostPlayedSWisePacks];
        // console.log('-----<', reportData);
        // console.log('-----<-----', cData);
        // console.log('-----<-----', sData);
        if (this.state.categorydata.length != 0) {
            let tabledata = this.state.categorydata.map((item, index) => {
                data2.push({
                    Category :  item._id,
                    count   :  item.mostCompleted
                    //  subCategory: '-'
                })
            })
        }
        //  console.log('-----<-----', data2);

        if (this.state.scategorydata.length != 0) {
            let tabledata = this.state.scategorydata.map((item, index) => {
                data4.push({
                    // Category:'-',
                    subCategory: item._id , 
                    count   :  item.subCategoryIdCompleted
                })
            })
        }
        console.log('-----<-----', data4);

        const columns1 = [
            {
                title: 'F2W Engagement(Category Wise)',
                dataIndex: 'Category',
                key: 'Category',
            },
            {
                title: 'Count',
                dataIndex: 'count',
                key: 'count',
                sorter: (a, b) => a.count - b.count,
            }
                      
        ];
        const columns2 = [         
            {
                title: 'F2W Engagement (Sub-Category Wise)',
                dataIndex: 'subCategory',
                key: 'subCategory',
            },
            {
                title: 'Count',
                dataIndex: 'count',
                key: 'count',
                sorter: (a, b) => a.count - b.count,
            }
        ];
        const data3 = []
        if (reportData.length != 0) {
            let preparingdata = reportData.map((item, index) => {
                data3.push({
                    Date: item.date,
                    packsAvailable: item.packsAvailable,
                    viewedPacks: item.viewedPacks,
                    answeredPacks: item.answeredPacks,
                    distinctUsers: item.distinctUsers
                })
            })
        }
        const example = (
            <div>
                <Col span={24}>
                    <Col span={12}>
                        {/* <ul className="list-inline allNotifiList" >
                            <li><h3 className="">Earned Users</h3></li>
                            <li className="" ><span ><Icon type="filter" className="fun2winReportfiltericon"/></span> <span className="fun2winReportfilterName">Filter</span></li>
                        </ul> */}
                    </Col>
                    <Col span={12}>
                        <div className="text-center">

                            <Workbook filename="Fun2win_Report.xlsx" element={<img src={reportsexcel} alt="contstCover" className="fun2winReportpdf redeemedCouponspdf" />}>
                                <Workbook.Sheet data={data2} name="Fun2Win_Category_Wise">
                                    <Workbook.Column label="F2W Engagement(Category Wise)" value="Category" />
                                    <Workbook.Column label="Count" value="count" />
                                </Workbook.Sheet>
                                <Workbook.Sheet data={data4} name="Fun2Win_Sub-Category_Wise">
                                    <Workbook.Column label="F2W Engagement (Sub-Category Wise)" value="subCategory" />
                                    <Workbook.Column label="Count" value="count" />
                                </Workbook.Sheet>
                                <Workbook.Sheet data={this.state.fun2winreport} name="Fun2Win_Default_Report">
                                    {/* <Workbook.Column label="Total no. of Content Packs available for the users" value="packsAvailable" />
                                    <Workbook.Column label="Number of Content Packs Viewed" value="viewedPacks" />
                                    <Workbook.Column label="Number of Content Packs completed" value="answeredPacks" />
                                    <Workbook.Column label="Number of users Completed content Packs" value="distinctUsers" /> */}
                                    {/* <Workbook.Column label="" value="type" />
                                    <Workbook.Column label="" value="count" /> */}
                                    <Workbook.Column label="Default (Till Date)" value="type" />
                                        <Workbook.Column label="Result" value="count" />
                                </Workbook.Sheet>

                            </Workbook>
                            <h4 className="downloadTxtCoinsErnd">DOWNLOAD REPORTS</h4>
                        </div>
                    </Col>
                </Col>
            </div>
        )
        const { imageUrl } = this.state;
        const mapCoupon = this.state.couponTypes.map((coupon) => <Option value={coupon._id}>{coupon.couponFrom}</Option>);
        return (
            <div>
                <Row >

                    <Col span={24} className="" style={{ marginTop: 20 }}>
                        <Col span={24} className="Reports-coinsEarnedheader3">
                            <h3 className="RedeemedCouponsTitleReport">Fun2Win Report</h3>
                            {/* <Col span={6}>
                                <FormItem label="Start Date" className={classnames('coinsStartDate', { error: !!this.state.errors.coinsStartDate })}>
                                    <DatePicker getCalendarContainer={triggerNode => triggerNode.parentNode}
                                        onChange={this.handleChange2}
                                        value={this.state.coinsStartDate ? moment(this.state.coinsStartDate, dateFormat) : ''}
                                        format={dateFormat} disabledDate={this.disabledDate} name="coinsStartDate"
                                        placeholder="Select Start Date" />

                                    <span>{this.state.errors.coinsStartDate}</span>
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem label="End Date" className={classnames('coinsEndDate', { error: !!this.state.errors.coinsEndDate })}>
                                    <DatePicker getCalendarContainer={triggerNode => triggerNode.parentNode}
                                        onChange={this.handleChange3}
                                        value={this.state.coinsEndDate ? moment(this.state.coinsEndDate, dateFormat) : ''}
                                        format={dateFormat} disabledDate={this.disableEndDate} name="coinsEndDate"
                                        placeholder="Select End Date" />
                                    <span>{this.state.errors.coinsEndDate}</span>
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem className="mrgTop30">
                                    <Button type="primary" onClick={this.generateuserReport}>Submit</Button>
                                </FormItem>
                            </Col> */}
                        </Col>
                        <Col>
                            {example}
                        </Col>

                        <Col span={24}>
                            <Table className="fun2winReporttable ReedemCouponsreportsTableheading" dataSource={data2} columns={columns1} pagination={{ pageSize: 10 }} />
                            <Table className="fun2winReporttable ReedemCouponsreportsTableheading" dataSource={data4} columns={columns2} pagination={{ pageSize: 10 }} />
                        </Col>

                    </Col>
                </Row>
            </div >
        );
    }
}

export default Fun2WinReports;
/* eslint-disable */