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




class FestiveOffers extends React.Component {
    state = {
        size: 'large',
    };

    handleSizeChange = (e) => {
        this.setState({ size: e.target.value });
    }



    render() {
        const size = this.state.size;
        return (
            <div>

                <Col span={24}>

                    <Col span={20}>
                        <Row>
                            <Col span={24}>
                                <Col span={12}>
                                    <h3 className="HeadingsTab">Festival Offers</h3>      </Col>
                                <Col span={12}>
                                    <ul className="updateAlert">
                                        <li className="updateAlert"> Updated Alert</li>
                                        <li className="updateAlert"> <Switch defaultChecked={false} onChange={onChange} /></li>
                                    </ul>
                                </Col>
                            </Col>
                        </Row>
                        <div className="marginLeft30">
                            <Row className="marginBottom20">
                                <Col span={18}>
                                    <Select showSearch
                                     style={{ width: "100%" }}
                                        placeholder="Select Location"
                                        optionFilterProp="children"
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        <Option value="jack">Celebrity1</Option>
                                        <Option value="lucy">Celebrity2</Option>
                                        <Option value="tom">Celebrity3</Option>
                                    </Select>
                                </Col>
                            </Row>
                            <Row className="marginBottom20">
                                <Col span={18}>
                                    <Select showSearch
                                     style={{ width: "100%" }}
                                        placeholder="Select Festival"
                                        optionFilterProp="children"
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        <Option value="jack">Location1</Option>
                                        <Option value="lucy">Location2</Option>
                                        <Option value="tom">Location3</Option>
                                    </Select>
                                </Col>
                            </Row>
                            <Row>
                                <h3 className="SubHeadingsTabText"> Promote On</h3>
                                <Col span={6} className="marginBottom20">
                                    <CheckboxGroup options={promteCheckBx} defaultValue={['']} onChange={onChange} />
                                </Col>
                                <Col span={2}>Or
                                                        </Col>
                                <Col span={10}>
                                    <Select showSearch
                                     style={{ width: "100%" }}
                                        placeholder="Select Celebrity"
                                        optionFilterProp="children"
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        <Option value="jack">Celebrity1</Option>
                                        <Option value="lucy">Celebrity2</Option>
                                        <Option value="tom">Celebrity3</Option>
                                    </Select>
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

                            <Row>
                                <div className="MarginTop20">
                                    <FormItem label="Valid Upto" className="ant-col-md-8 fontWeightBold" >
                                        <DatePicker onChange={onChange} />
                                    </FormItem>

                                    <FormItem label="Expiry Notification Alert before" className="ant-col-md-12 fontWeightBold" >
                                        <Radio.Group value={size} onChange={this.handleSizeChange}>
                                            <Radio.Button value="large">12 Hours</Radio.Button>
                                            <Radio.Button value="default">24 Hours</Radio.Button>
                                            <Radio.Button value="small">2 Days</Radio.Button>
                                        </Radio.Group>
                                    </FormItem>
                                </div>
                            </Row>

                            <Row>
                                <div className="">
                                    <FormItem label="Send alert to members in your directory" className="ant-col-md-18 fontWeightBold" >
                                        <Select
                                            mode="multiple"
                                            style={{ width: '100%' }}
                                            placeholder="Add Members"
                                            defaultValue={['member1', 'member2']}
                                            onChange={handleChange}
                                        >
                                            {children}
                                        </Select>
                                    </FormItem>
                                </div>
                            </Row>
                        </div>
                         <Button type="primary" className='updateBtn'>Update</Button>
                    </Col>
                    
                </Col>



            </div>
        );
    }
}
export default FestiveOffers;
/* eslint-disable */