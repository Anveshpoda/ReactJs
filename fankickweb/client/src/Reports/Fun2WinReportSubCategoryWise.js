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
            scategorydata: '',
            loading: false,
            pagination: {}


        }
        this.baseState = this.state;
        this.generateuserReport = this.generateuserReport.bind(this);


    }

    componentWillMount() {
        this.getFun2WinDetails();
        this.generateuserReport();
    }

    generateuserReport = () => {
        var _this= this;
        var data = {
            "fromDate":this.state.coinsStartDate,
            "toDate":this.state.coinsEndDate
        }
        console.log("data",data)
        const url = '/datewiseReportSubcategory';
        var request = new Request(url, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": sessionStorage.getItem('token')
          }
        });
  
        fetch(request)
          .then(response => response.json())
          .then(function (response) {
              
            if (response.message == "Success" && response.status == 200) {
             _this.setState({scategorydata:response.data.mostPlayedSWisePacks})
            }
          }
          );
    }


    getFun2WinDetails = () => {
        //  console.log("User -----------", sessionStorage.getItem('token'))
        this.setState({
            loading: true
        })
        var instance = axios.create({
            headers: { 'x-access-token': sessionStorage.getItem('token') }
        });
        instance.get('/generateReport').then((response) => {
            this.setState({
                reportData: response.data.data,
                categorydata: response.data.data.mostPlayedCWisePacks,
                scategorydata: response.data.data.mostPlayedSWisePacks,
                loading: false,
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

    handleTableChange = (pagination, filters, sorter) => {
        console.log("Pagination-->", pagination);
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        // this.fetch({
        //   results: pagination.pageSize,
        //   page: pagination.current,
        //   sortField: sorter.field,
        //   sortOrder: sorter.order,
        //   ...filters,
        // });
    }


    generateuserReport() {
        let errors = {};
        if (this.state.coinsStartDate === '') errors.coinsStartDate = "* This field is mandatory";
        if (this.state.coinsEndDate === '') errors.coinsEndDate = "* This field is mandatory";
        if (this.state.coinsEndDate <= this.state.coinsStartDate) errors.coinsEndDate = "* Enter Valid Date";
        this.setState({ errors });
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
                    _this.setState({
                        loading: false
                    });
                }
                else if (response.data.length > 0) {
                    _this.setState({
                        reportData: response.data,
                        loading: false
                    });
                } else {
                    message.error("error");
                }
            })
    }

    onDateStartChange = (value) => {
        var value1 = new Date(value).toISOString()
        this.setState({ coinsStartDate: value1 });
    }

    onDateEndChange = (value) => {
        var value1 = new Date(value).toISOString()
        this.setState({ coinsEndDate: value1 });
    }

    render() {
        const data1 = [];
        const data2 = [];
        const data4 = [];
        var totalcompleateReport = 0;
        const fun2windata = clone(this.state.reportData);
        const reportData = [this.state.reportData];
        if (this.state.categorydata.length != 0) {
            let tabledata = this.state.categorydata.map((item, index) => {
                data2.push({
                    Category: item._id,
                    count: item.mostCompleted
                    //  subCategory: '-'
                })
            })
        }
        //  console.log('-----<-----', data2);

        if (this.state.scategorydata.length != 0) {
            let tabledata = this.state.scategorydata.map((item, index) => {
                totalcompleateReport += item.subCategoryIdCompleted
                data4.push({
                    // Category:'-',
                    subCategory: item._id,
                    count: item.subCategoryIdCompleted,
                    count1:item.publishedCount,
                    count13:item.viewsCount,
                    count12:item.viewersCount
                })
            })
        }

        const columns2 = [
            {
                title: 'Sub-Categories',
                dataIndex: 'subCategory',
                key: 'subCategory',
            },
            {
                title: 'Fun2Win Completed Count',
                dataIndex: 'count',
                key: 'count',
                sorter: (a, b) => a.count - b.count,
            },
            {
                title: 'Published',
                dataIndex: 'count1',
                key: 'count1',
                sorter: (a, b) => a.count - b.count,

            },
            {
                title: 'Views',
                dataIndex: 'count13',
                key: 'count13',
                sorter: (a, b) => a.count - b.count,

            },
            {
                title: 'Viewers',
                dataIndex: 'count12',
                key: 'count12',
                sorter: (a, b) => a.count - b.count,

            }
        ];


        const container = <Table className="RedeemedcouponsReportCatgrytable ReedemCouponsreportsTableheadingCatgry" dataSource={data4} columns={columns2} pagination={this.state.pagination}
            loading={this.state.loading}
            onChange={this.handleTableChange} />


        // loading: false
        const example = (
            <div>
                <Col span={24}>
                    <Col span={12}>
                        <h3 class="ReddemedCouponsCountReports"> Fun2Win Engagement - Sub-Category Wise:  {totalcompleateReport}</h3><span></span>
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
        return (
            <div>
                <Row >

                    <Col span={24} className="" style={{ marginTop: 20 }}>
                        <Col span={24} className="Reports-coinsEarnedheader1">
                            <h3 className="RedeemedCouponsTitleReport">Fun2Win Analytics - Sub Category Wise</h3>
                            <Col span={5} xs={12} sm={12} xl={4} lg={5} md={6} className="Reprotsmainheaderselect1">
                                <Col className="space">
                                    <FormItem label="From">



                                        <DatePicker getCalendarContainer={triggerNode => triggerNode.parentNode}
                                            onChange = {this.onDateStartChange}
                                            format={dateFormat} name="coinsStartDate"
                                            placeholder="Select Start Date" />

                                    </FormItem>
                                </Col>
                            </Col>
                            <Col span={5} xs={12} sm={12} xl={4} lg={5} md={6}>
                                <Col className="space">
                                    <FormItem label="To">

                                        <DatePicker getCalendarContainer={triggerNode => triggerNode.parentNode}
                                            onChange = {this.onDateEndChange}
                                            format={dateFormat} name="coinsEndDate"
                                            placeholder="Select End Date" />

                                    </FormItem>
                                </Col>
                            </Col>
                            <Col span={3}>
                                <FormItem className="mrgTop33">
                                    <Button className="ReportsSubmitbtn" type="primary" onClick={this.generateuserReport}>Submit</Button>
                                </FormItem>
                            </Col>
                        </Col>
                        <Col span={24} className="" style={{ marginTop: 20 }}>

                            <Col>
                                {example}
                            </Col>

                            <Col span={24}>
                                {/* <Table className="fun2winReporttable ReedemCouponsreportsTableheading" dataSource={data2} columns={columns1} pagination={{ pageSize: 10 }} /> */}
                                {/* <Table className="fun2winReporttable ReedemCouponsreportsTableheading" dataSource={data4} columns={columns2} pagination={{ pageSize: 10 }} /> */}
                                {/* {container} */}
                                <Col span={24} className="funClubsRen">
                                    <Spin spinning={this.state.loading}>
                                        {container}
                                    </Spin>
                                    {/* {data4.length === 0 ? <div id="noFunclubs"></div> : ""} */}
                                </Col>
                            </Col>
                        </Col>
                    </Col>
                </Row>
            </div >
        );
    }
}

export default Fun2WinReports;
/* eslint-disable */