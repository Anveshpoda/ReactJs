import React, { PropTypes } from 'react';
import Workbook from 'react-excel-workbook';
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


class PollReport extends React.Component {
    render() {
        const data4 = [];
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
        const container = <Table columns={columns2} dataSource={data4} />

        const example = (
            <div>

                <Col span={24}>
                    <Col span={12}>
                        <h3 class="ReddemedCouponsCountReports"> Fun2Win Engagement - Sub-Category Wise</h3><span></span>
                    </Col>
                    <Col span={12}>
                        <div className="text-center">

                            <Workbook filename="Fun2win_Report.xlsx" element={<img src={reportsexcel} alt="contstCover" className="fun2winReportpdf redeemedCouponspdf" />}>
                                <Workbook.Sheet data={data4} name="Fun2Win_Category_Wise">
                                    <Workbook.Column label="F2W Engagement(Category Wise)" value="Category" />
                                    <Workbook.Column label="Count" value="count" />
                                </Workbook.Sheet>
                                <Workbook.Sheet data={data4} name="Fun2Win_Sub-Category_Wise">
                                    <Workbook.Column label="F2W Engagement (Sub-Category Wise)" value="subCategory" />
                                    <Workbook.Column label="Count" value="count" />
                                </Workbook.Sheet>
                                <Workbook.Sheet name="Fun2Win_Default_Report">
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

        return (
            <div className="PollReportWise">
                <Row>
                    <Col span={24} className="" style={{ marginTop: 20 }}>
                        <Col span={24} className="Reports-coinsEarnedheader1">
                            <h3 className="RedeemedCouponsTitleReport">Fun2Win Analytics - Category Wise</h3>
                            <Col span={5} xs={12} sm={12} xl={4} lg={5} md={6} className="Reprotsmainheaderselect1">
                                <Col className="space">
                                    <FormItem label="From">



                                        <DatePicker getCalendarContainer={triggerNode => triggerNode.parentNode}

                                            format={dateFormat} name="coinsStartDate"
                                            placeholder="Select Start Date" />

                                    </FormItem>
                                </Col>
                            </Col>
                            <Col span={5} xs={12} sm={12} xl={4} lg={5} md={6}>
                                <Col className="space">
                                    <FormItem label="To">

                                        <DatePicker getCalendarContainer={triggerNode => triggerNode.parentNode}

                                            format={dateFormat} name="coinsStartDate"
                                            placeholder="Select Start Date" />

                                    </FormItem>
                                </Col>
                            </Col>
                            <Col span={3}>
                                <FormItem className="mrgTop33">
                                    <Button className="ReportsSubmitbtn" type="primary" onClick={this.generateuserReport}>Submit</Button>
                                </FormItem>
                            </Col>
                        </Col>
                    </Col>
                </Row>
                <Row>




                    <Col span={24}>
                        {example}
                    </Col>
                    <Col span={24}>
                        {container}
                    </Col>
                </Row>

            </div>
        );
    }
}

export default PollReport;