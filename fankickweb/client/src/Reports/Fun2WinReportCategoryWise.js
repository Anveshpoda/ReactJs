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
            loading: false
        }
        this.baseState = this.state;


    }

    componentWillMount() {
        this.getFun2WinDetails();
        this.generateuserReport();
    }

  ///
    generateuserReport = () => {
        var _this= this;
        var data = {
            "fromDate":this.state.coinsStartDate,
            "toDate":this.state.coinsEndDate
        }
        console.log("data",data)
        const url = '/datewiseReportCategory';
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
             _this.setState({categorydata:response.data.mostPlayedCWisePacks})
            }
          }
          );
    }

    getFun2WinDetails = () => {
        this.setState({
            loading: true
        })
        //  console.log("User -----------", sessionStorage.getItem('token'))
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
                totalcompleateReport += item.mostCompleted

                data2.push({
                    Category: item._id,
                    count: item.mostCompleted,
                    count1:item.publishedCount,
                    count13:item.viewsCount,
                    count12:item.viewersCount
                    //  subCategory: '-'
                })
            })
        }
        //  console.log('-----<-----', data2);

        if (this.state.scategorydata.length != 0) {
            let tabledata = this.state.scategorydata.map((item, index) => {
                data4.push({
                    // Category:'-',
                    subCategory: item._id,
                    count: item.subCategoryIdCompleted
                })
            })
        }
        //  console.log('-----<-----', data4);

        const columns1 = [
            {
                title: 'Categories',
                dataIndex: 'Category',
                key: 'Category',
            },
            {
                title: 'Fun2Win Completed Count',
                dataIndex: 'count',
                key: 'count',
                sorter: (a, b) => a.count - b.count,
            }, {
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

        const container = <Table className="RedeemedcouponsReportCatgrytable ReedemCouponsreportsTableheadingCatgry" dataSource={data2} columns={columns1} pagination={{ pageSize: 10 }} />

        const example = (
            <div>
                <Col span={24}>
                    <Col span={12}>
                        <h3 className="ReddemedCouponsCountReports">Fun2Win Engagement - Category Wise:  {totalcompleateReport}<span></span></h3>

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
                <Row>


                    <Col span={24} className="" style={{ marginTop: 20 }}>
                        <Col span={24} className="Reports-coinsEarnedheader1">
                            <h3 className="RedeemedCouponsTitleReport">Fun2Win Analytics - Category Wise</h3>
                            <Col span={5} xs={12} sm={12} xl={4} lg={5} md={6} className="Reprotsmainheaderselect1">
                                <Col className="space">
                                    <FormItem label="From">



                                        <DatePicker getCalendarContainer={triggerNode => triggerNode.parentNode}

                                            format={dateFormat} name="coinsStartDate"
                                            onChange={this.onDateStartChange}
                                            placeholder="Select Start Date" />

                                    </FormItem>
                                </Col>
                            </Col>
                            <Col span={5} xs={12} sm={12} xl={4} lg={5} md={6}>
                                <Col className="space">
                                    <FormItem label="To">

                                        <DatePicker getCalendarContainer={triggerNode => triggerNode.parentNode}
                                            onChange={this.onDateEndChange}
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

                                <Col span={24} className="funClubsRen">
                                    <Spin spinning={this.state.loading}>
                                        {container}
                                    </Spin>
                                    {/* {data2.length === 0 ? <div id="noFunclubs"></div> : ""} */}
                                </Col>

                            </Col> </Col>

                    </Col>
                </Row>
            </div>
        );
    }
}

export default Fun2WinReports;
/* eslint-disable */