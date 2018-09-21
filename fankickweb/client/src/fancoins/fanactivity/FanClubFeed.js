/* eslint-disable */
import React from 'react';
import axios from 'axios';
import clone from 'clone';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import moment from 'moment';
import $ from "jquery";
import { Layout, Menu, Breadcrumb, Icon, Col, Row, Card, Button, Radio, Select, Switch, Input, Tabs, Form, InputNumber, DatePicker, Checkbox, message } from 'antd';

const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

function onChange(value) {
    //console.log('changed', value);
}
const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
function handleChange(value) {
    //console.log(`selected ${value}`);
}
const plainOptions = ['Facebook', 'Twitter', 'Instagram', 'Share Message'];
const format = 'h:mm a';
const dateFormat = 'YYYY-MM-DD';
const { MonthPicker, RangePicker } = DatePicker;

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

class FanClubFeed extends React.Component {
    state = {
        size: 'large',
        questionModel: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            coins: {},
            errors: {},
            event: '',
            id: '',
            endDateTime: '',
            fanActivity: '',
            fanClubs: '',
            alerttime: '',
            commentPoints: '',
            commentLevel: '',
            likePoints: '',
            likeLevel: '',
            share: '',
            expireDate: '',
            isSelected: '',
            facebook: '',
            instagram: '',
            sharelevel: '',
            twitter: ''
        }
        this.baseState = this.state;
        this.handleChange = this.handleChange.bind(this);
        this.expireDateChange = this.expireDateChange.bind(this);
        this.handleSizeChange = this.handleSizeChange.bind(this);
        this.likePointsChange = this.likePointsChange.bind(this);
        this.likeLevelChange = this.likeLevelChange.bind(this);
        this.commentPointsChange = this.commentPointsChange.bind(this);
        this.commentLevelChange = this.commentLevelChange.bind(this);
        // this.onChange = this.onChange.bind(this);
        this.checkboxChange = this.checkboxChange.bind(this);

    }
    componentWillMount() {
        var user = JSON.parse(sessionStorage.getItem('user'));
       
        if (user.permissions !== '') {
          
          this.setState({ role: user.permissions.fanCoins })
        }
      }
    componentDidMount() {
        this.getCoins();
    }

    getCoins = () => {
        var _this = this;
        axios.get('/coins/fanclubs', {
            headers: {
                "x-access-token": sessionStorage.token,
            },

        })
            .then(function (response) {
                //console.log("get view resposne in all-->>>", response.data);
                const getdata = response.data.data;
                // console.log("get view resposne in all############", getdata);
                // console.log("get view resposne in all############2", getdata.createEvent);
                // console.log("get view resposne in all############3", getdata.noftifyBeforeExpire);
                _this.setState({ coins: getdata });
                _this.setState({ id: _this.state.coins.id });
                _this.setState({ fanClubs: _this.state.coins.fanClubs });
                //_this.setState({ share: _this.state.coins.fanClubs.share });
                _this.setState({ isSelected: _this.state.coins.fanClubs.share.isSelected });
                _this.setState({ commentPoints: _this.state.coins.fanClubs.comment.points });
                _this.setState({ commentLevel: _this.state.coins.fanClubs.comment.level });
                _this.setState({ likePoints: _this.state.coins.fanClubs.like.points });
                _this.setState({ likeLevel: _this.state.coins.fanClubs.like.level });
                _this.setState({ twitter: _this.state.coins.fanClubs.share.twitter });
                _this.setState({ facebook: _this.state.coins.fanClubs.share.facebook });
                _this.setState({ instagram: _this.state.coins.fanClubs.share.instagram });
                _this.setState({ sharelevel: _this.state.coins.fanClubs.share.level });
                _this.setState({ alerttime: _this.state.coins.fanClubs.noftifyBeforeExpire });
                _this.setState({ expireDate: _this.state.coins.fanClubs.expireDate });
                //console.log("social sel",_this.state.isSelected);

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    handleSubmit = (e) => {
        var _this = this;
        //console.log('state data-------->', this.state);
        // console.log('state data-------->', this.state.coins.id);
        // this.props.form.validateFields((err, values) => {
        //   if (!err) {
        // console.log('Received values of form: ', values);
        //console.log('state data', this.state);
        message.destroy();
        let errors = {};
        if (this.state.likePoints === undefined) errors.mess = "Please Enter like Points";
        if (this.state.likeLevel === undefined) errors.mess = "Please Enter like Level";
        if (this.state.commentPoints === undefined) errors.mess = "Please Enter comment Points";
        if (this.state.commentLevel === undefined) errors.mess = "Please Enter comment Level";
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            var data = {
                "id": this.state.coins.id,
                "fanClubs": {
                    comment: {
                        id: "FCFC",
                        points: this.state.commentPoints,
                        level: this.state.commentLevel
                    },
                    like: {
                        id: "FCFL",
                        points: this.state.likePoints,
                        level: this.state.likeLevel
                    },
                    share: {
                        id: "FCFS",
                        facebook: this.state.facebook,
                        instagram: this.state.instagram,
                        twitter: this.state.twitter,
                        level: this.state.sharelevel,
                        isSelected: this.state.isSelected
                    },
                    "noftifyBeforeExpire": this.state.alerttime,
                    "expireDate": this.state.expireDate
                }
            }
            //console.log("handleSubmit data--->", data);
            this.updatefanclubsCoins(data);
        }
    }
    // });
    //}

    updatefanclubsCoins = (data) => {
        //console.log("User", sessionStorage.getItem('token'))
        const url = '/coins/fanclubs';
        var request = new Request(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                'x-access-token': sessionStorage.getItem('token')
            }
        });
        fetch(request)
            //.then(response => response.json())
            .then(function (response) {
                if (response.status === 200) {
                    //console.log("dataresponse", response.data);
                    message.success('FanClub coins updated successfully!');
                    //console.log(response, 'Service Response');
                    //   browserHistory.push("/fun2win");
                    //this.getCoins();
                }
                else {
                    message.error(`unable to update user refer coins.`, 5);
                    //console.log("dataresponse", response);
                }
            })
    }

    handleSizeChange = (e) => {
        //console.log("###################-->", e.target.value)
        this.setState({ [e.target.name]: e.target.value });
    }

    handleChange(e) {
        //e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    expireDateChange(value) {
        var value = moment(value).format('YYYY-MM-DD');
        //console.log('expireDateChange-', value);
        this.setState({
            expireDate: value
        });
    }
    likePointsChange(value) {
        //e.preventDefault();
        if (this.props.resetData) {
            this.props.resetData.like.points = value;
        }
        //console.log('likeChange-', value);
        this.setState({
            likePoints: value
        })
    }
    likeLevelChange(value) {
        //console.log('commentChange-', value);
        this.setState({
            likeLevel: value
        })
    }
    commentPointsChange(value) {
        if (this.props.resetData) {
            this.props.resetData.comment.points = value;
        }
        //console.log('participationChange-', value);
        //e.preventDefault();
        this.setState({
            commentPoints: value
        })
    }
    commentLevelChange(value) {
        this.setState({
            commentLevel: value
        })

    }
    checkboxChange(value) {
        ////console.log(`checked = ${e.target.checked}`);
        //console.log('checked =------------------- ', value);
        this.setState({
            isSelected: value
        })
    }

    render() {
        const size = this.state.size;
        const data = clone(this.state.coins);
        const fanClubs = clone(this.state.fanClubs);
        const comment = clone(this.state.comment);
        const like = clone(this.state.like);
        const share = clone(this.state.share);
        const time = clone(this.state.alerttime);
        return (
            <div>
                <div className="fancoinsrferfriend" title="FanClub Feed">
                    <Col>
                        {/*<h3 className="HeadingsTabFancoins">FanClub Feed</h3>*/}
                        <span id="points" style={{ color: "red", height: "40px" }}>{this.state.errors.mess}</span>
                        <div className="marginLeft30 fancoinscardbody2">

                            <Row>
                                <Col span={24}>
                                    <Col span={24}>
                                        <FormItem label="Like" className="ant-col-md-4 ant-col-smResolution768 fontWeightBold">
                                            <InputNumber className="" min={1} max={1000} defaultValue='' value={this.state.resetData ? this.state.resetData.like.points : this.state.likePoints} onChange={this.likePointsChange} />
                                            {/* <span id="points" style={{color:"red"}}>{this.state.errors.likePoints}</span> */}
                                        </FormItem>
                                        <FormItem label="Level Bar" className="ant-col-md-4 fontWeightBold">
                                            <InputNumber className="" min={1} max={1000} defaultValue='' value={this.state.likeLevel} onChange={this.likeLevelChange} />
                                            {/* <span id="points" style={{color:"red"}}>{this.state.errors.likeLevel}</span> */}
                                        </FormItem>
                                    </Col>
                                </Col>
                            </Row>

                            <Row>
                                <h3 className="SubHeadingsTabText"> Social Share</h3>
                                <Col span={24}>
                                    <FormItem label="Comment" className="ant-col-md-4 ant-col-smResolution768 fontWeightBold">
                                        <InputNumber className="" min={1} max={1000} defaultValue='' value={this.state.resetData ? this.state.resetData.comment.points : this.state.commentPoints} onChange={this.commentPointsChange} />
                                    </FormItem>
                                    {/* <span id="points" style={{color:"red"}}>{this.state.errors.commentPoints}</span> */}
                                    <FormItem label="Level Bar" className="ant-col-md-4 fontWeightBold">
                                        <InputNumber className="" min={1} max={1000} defaultValue='' value={this.state.commentLevel} onChange={this.commentLevelChange} />
                                        {/* <span id="points" style={{color:"red"}}>{this.state.errors.commentLevel}</span> */}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <h3 className="SubHeadingsTabText mrgnBottom15"> Share</h3>
                                <Col span={24}>
                                    <CheckboxGroup className="chckBOXSharePadding" options={plainOptions} value={this.state.isSelected} onChange={this.checkboxChange.bind(this)} />
                                </Col>
                            </Row>
                            <Row>
                                <div className="MarginTopBtm12">
                                    <FormItem label="Valid Upto" className="ant-col-md-7 fontWeightBoldBlack">
                                        <DatePicker value={moment(this.state.expireDate, dateFormat)} disabledDate={disabledDate} onChange={this.expireDateChange} />
                                    </FormItem>
                                </div>
                            </Row>
                            <Row>
                                <div className="">
                                    <FormItem label="Expiry Notification Alert before" className="ant-col-md-16 fontWeightBoldExpry">
                                        <Radio.Group name="alerttime" value={this.state.alerttime} onChange={this.handleSizeChange}>
                                            <Radio.Button value="12:00">12 Hours</Radio.Button>
                                            <Radio.Button value="24:00">24 Hours</Radio.Button>
                                            <Radio.Button value="48:00">2 Days</Radio.Button>
                                        </Radio.Group>
                                    </FormItem>
                                </div>
                            </Row>
                            {this.state.role.create === true ?
                              <Button type="primary" className='updaterefraFrndButn' onClick={this.handleSubmit.bind(this)}>Update</Button>
                           :null} {/* 
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
                    </Row> */}
                        </div>
                        {/* <Button type="primary" className='updateBtn'>Update</Button> */}
                      
                    </Col>
                </div>
            </div>
        );
    };
}


export default FanClubFeed;
/* eslint-disable */