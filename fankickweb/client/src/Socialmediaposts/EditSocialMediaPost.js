/* eslint-disable */
import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import classNames from 'classnames/bind';
import { Link } from 'react-router';
import Dashboard from '../Dashboard/Dashboard';
import { Col, Row, Tabs, Table, Icon, Form, Button, Select, Input, DatePicker ,Tag,Tooltip} from 'antd';
import css from './Socialmedia.css';
const Option = Select.Option;
const FormItem = Form.Item;

function handleChange(value) {
    console.log(`selected ${value}`);
}

function onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
}

function onOk(value) {
    console.log('onOk: ', value);
}


class EditSocialMediaPost extends React.Component {
    state = {
        tags: [ ],
        inputVisible: false,
        inputValue: '',
    };

    handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });
    }

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    }

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }

    handleInputConfirm = () => {
        const state = this.state;
        const inputValue = state.inputValue;
        let tags = state.tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        console.log(tags);
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
    }

    saveInputRef = input => this.input = input

    render() {
        const { tags, inputVisible, inputValue } = this.state;
        return (
            <Dashboard>
                <div className="CreateSocialmPostsmain">
                    <Col span={24} className="SocialMTopbars">
                        <div className="SocialmediaHeader">
                            <Col span={16}>
                                <Col span={4}>
                                    <h5>Create Social Media Posts</h5>
                                </Col>
                                <Col span={4} className="SocialmSelectcols">
                                    <Select defaultValue="lucy" className="SocialmSelect"  onChange={handleChange}>
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="disabled">Disabled</Option>
                                        <Option value="Yiminghe">yiminghe</Option>
                                    </Select>
                                </Col>
                                <Col span={4} className="SocialmSelectcols">
                                    <Select defaultValue="lucy" className="SocialmSelect"  onChange={handleChange}>
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="disabled">Disabled</Option>
                                        <Option value="Yiminghe">yiminghe</Option>
                                    </Select>
                                </Col>
                                <Col span={4} className="SocialmSelectcols">
                                    <Select defaultValue="lucy" className="SocialmSelect"  onChange={handleChange}>
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="disabled">Disabled</Option>
                                        <Option value="Yiminghe">yiminghe</Option>
                                    </Select>
                                </Col>
                            </Col>
                            <Col span={8}>
                                <Link to="/SocialMedia"> <Button className="Socialpostcbtn" type="primary">Back To Dasnboard</Button></Link>
                            </Col>
                        </div>
                    </Col>
                    <Col span={16} className="CreateSocialpobody">
                        <div>
                            <Form>
                                <Col span={24}>
                                    <Col span={5}>
                                        <h6 className="h6Fnt">Select social Channel</h6>
                                        <FormItem>
                                            <Select defaultValue="lucy" className="SocialMSelectChannel"  onChange={handleChange}>
                                                <Option value="jack">Jack</Option>
                                                <Option value="lucy">Lucy</Option>
                                                <Option value="disabled" disabled>Disabled</Option>
                                                <Option value="Yiminghe">yiminghe</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Col>
                                <Col span={24}>
                                    <Col span={11}>
                                     <h6 className="h6Fnt">Enter Post Id</h6>
                                        <FormItem>
                                            <Input placeholder="Basic usage" />
                                        </FormItem>
                                    </Col>
                                </Col>
                                <Col span={24}>
                                    <Col span={11}>
                                     <h6 className="h6Fnt">Enter Title</h6>
                                        <FormItem>
                                            <Input placeholder="Basic usage" />
                                        </FormItem>
                                    </Col>
                                </Col>
                                <Col span={24}>
                                    <Col span={10}>
                                     <h6 className="h6Fnt">Set Expiry Date</h6>
                                        <FormItem>
                                            <DatePicker
                                                showTime
                                                format="YYYY-MM-DD HH:mm:ss"
                                                placeholder="Select Time"
                                                onChange={onChange}
                                                onOk={onOk}
                                                />
                                        </FormItem>
                                    </Col>
                                </Col>
                                <Col span={24} className="CreateSocialmpostysTag">
                                   <h6 className="h6Fnt">Select Location</h6>
                                        <FormItem>
                                            <div>
                                                {inputVisible && (
                                                    <Input className="Socialmedporefinput"
                                                        ref={this.saveInputRef}
                                                        type="text"
                                                        size="small"
                                                         
                                                        value={inputValue}
                                                        onChange={this.handleInputChange}
                                                        onBlur={this.handleInputConfirm}
                                                        onPressEnter={this.handleInputConfirm}
                                                        />
                                                )}
                                                {!inputVisible && <Button size="small" type="dashed" className="CreateDataTypeTagWords" onClick={this.showInput}>Location</Button>}
                                                 <div>
                                                 {tags.map((tag, index) => {
                                                    const isLongTag = tag.length > 20;
                                                    const tagElem = (
                                                        <Tag key={tag} closable={index !== -1} afterClose={() => this.handleClose(tag)}>
                                                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                                        </Tag>
                                                    );
                                                    return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                                                })}
                                            </div>
                                            </div>
                                        </FormItem>
                                   
                                </Col>
                                <Col span={24}>
                                <div>
                                <Button type="primary">See Preview</Button>


                                </div>
                                </Col>
                                <Col span={24}>
                                 <Button style={{float:'right',marginRight:'25px'}} type="primary">Save</Button>
                                </Col>
                            </Form>
                        </div>
                    </Col>
                </div>
            </Dashboard>
        );
    }
}

export default EditSocialMediaPost;