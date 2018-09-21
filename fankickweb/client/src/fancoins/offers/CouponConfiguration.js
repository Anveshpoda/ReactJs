/* eslint-disable */
import React, { Children } from 'react';
import $ from 'jquery';
import { Layout, Menu, Breadcrumb, Icon, Col, Row, Card, Button, Radio, Select, Switch, Input, Tabs, Form, InputNumber, DatePicker, Checkbox } from 'antd';
import { Link } from 'react-router';
import css from '../fancoins.css';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;


function callback(key) {
    console.log(key);
}


const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

function onChange(checked) {
    console.log(`switch to ${checked}`);
}

function onChange(date, dateString) {
    console.log(date, dateString);
}

function onChange(value) {
    console.log('changed', value);
}

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleBlur() {
    console.log('blur');
}

function handleFocus() {
    console.log('focus');
}

function handleChange(value) {
    console.log(`selected ${value}`);
}


function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
}

const plainOptions = ['Facebook', 'Twitter', 'Instagram', 'Share Message'];
const options = [
    { label: 'Facebook', value: 'Facebook' },
    { label: 'Twitter', value: 'Twitter' },
    { label: 'Instagram', value: 'Instagram' },
    { label: 'Share Message', value: 'Share Message' },
];

const promtecheckBox = [
    { label: 'FanClubs', value: 'FanClubs' },
    { label: 'Fun2Win', value: 'Fun2Win' },
];

const promteCheckBx = [
    { label: 'FanClubs', value: 'FanClubs' },
    { label: 'All', value: 'All' },
];




class OffersCoupons extends React.Component {
    state = {
        size: 'large',
    };

    handleSizeChange = (e) => {
        this.setState({ size: e.target.value });
    }



    render() {
        const size = this.state.size;
        return (
            <Col span={20}>
                <h3 className="HeadingsTab">Coupoun Configuration</h3>
                <div className="marginLeft30">
                    <Row className="marginBottom20">
                        <Col span={18}>
                            <Input placeholder="Coupoun Form" />
                        </Col>
                    </Row>
                    <Row className="marginBottom20">
                        <Col span={18}>
                            <TextArea placeholder="Coupoun Discription" />
                        </Col>
                    </Row>
                    <Row className="marginBottom20">
                        <Col span={18}>
                            <Input placeholder="Coupoun Form" />
                        </Col>
                    </Row>
                    <Row className="marginBottom20">
                        {/* <Col span={18}>
                            <TextArea rows={3} placeholder="Valid Upto" />
                        </Col> */}

                        <FormItem label="Valid Upto" className="ant-col-md-8 fontWeightBold" >
                            <DatePicker value="" onChange={onChange} />
                        </FormItem>
                    </Row>
                    <Row className="marginBottom20">
                        <Col span={18}>
                            <Input placeholder="Email ID" />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>

                            <Col span={12}>
                                <Col span={9}>  <label className="FanCoinsLabel">FanCoins Limit</label>
                                </Col>
                                <Col span={3}>
                                    <InputNumber className="Marginleft15" min={1} max={10} defaultValue={250} onChange={onChange} />
                                </Col>
                            </Col>
                        </Col>
                    </Row>
                </div>
                <Button type="primary" className='updateBtn'>Update</Button>
            </Col>
        );
    }
}
export default OffersCoupons;
/* eslint-disable */