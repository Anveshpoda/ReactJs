/* eslint-disable */
import React from 'react';
import axios from 'axios';
import clone from 'clone';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import $ from "jquery";
import moment from 'moment';
import { Layout, Menu, Breadcrumb, Icon, Col, Row, Card, Button, Radio, Select, Switch, Input, Tabs, Form, InputNumber, DatePicker, Checkbox, message } from 'antd';

const RadioGroup = Radio.Group;
const Option = Select.Option;
const FormItem = Form.Item;
const format = 'h:mm a';
const dateFormat = 'YYYY-MM-DD';
const { MonthPicker, RangePicker } = DatePicker;

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
class CreateEvent extends React.Component {
    state = {
        size: 'large',
        questionModel: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            contests: [],
            coins: {},
            errors: {},
            event: '',
            id: '',
            endDateTime: '',
            fanActivity: '',
            points: '',
            alerttime: '',
            expireDate: '',
            role:''
        }
        this.baseState = this.state;
        this.handleChange = this.handleChange.bind(this);
        this.expireDateChange = this.expireDateChange.bind(this);
        this.createEventChange = this.createEventChange.bind(this);

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
        axios.get('/coins/fanactivity/createEvent', {
            headers: {
                "x-access-token": sessionStorage.token,
            },

        })
            .then(function (response) {
                //console.log("get view resposne in all-->", response.data.data);
                //console.log(typeof response.data.data.createEvent.expireDate, '47457')
                const getdata = response.data.data;
                // //console.log("get view resposne in all############", getdata);
                // //console.log("get view resposne in all############2", getdata.createEvent);
                // //console.log("get view resposne in all############3", getdata.noftifyBeforeExpire);
                _this.setState({ coins: getdata });
                _this.setState({ id: _this.state.coins.id });
                _this.setState({ points: _this.state.coins.createEvent.points });
                _this.setState({ alerttime: _this.state.coins.createEvent.noftifyBeforeExpire });
                _this.setState({ expireDate: _this.state.coins.createEvent.expireDate });

            })
            .catch(function (error) {
                //console.log(error);
            });
    }

    handleSubmit = (e) => {
        var _this = this;
        //console.log('state data-------->', this.state);
        // //console.log('state data-------->', this.state.coins.id);
        // this.props.form.validateFields((err, values) => {
        //   if (!err) {
        // //console.log('Received values of form: ', values);
        //console.log('state data', this.state);
        message.destroy();
        let errors = {};
        if (this.state.points === undefined) errors.points = "Please Enter Value";
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            var ed = new Date(this.state.expireDate).toISOString;
            var data = {
                "id": this.state.coins.id,
                "createEvent": {
                    id: "EVC",
                    points: this.state.points,
                    noftifyBeforeExpire: this.state.alerttime,
                    expireDate: this.state.expireDate
                },
                //   "noftifyBeforeExpire":this.state.alerttime,
                //   "expireDate":this.state.expireDate
            }
            //console.log("handleSubmit data--->", data);
            this.updateCreateEventCoins(data);
        }
    }
    // });
    //}

    updateCreateEventCoins = (data) => {
        //console.log("User", sessionStorage.getItem('token'))
        const url = '/coins/fanactivity/createEvent';
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
                    message.success('Create Event Coins updated successfully!');
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

    createEventChange(value) {
        //e.preventDefault();
        if (this.props.resetData) {
            this.props.resetData.createEvent.points = value;
        }
        //console.log('likeChange-', value);
        this.setState({
            points: value
        })
    }

    expireDateChange(value) {

        var value1 = moment(value).format('YYYY-MM-DD');
        //console.log("--------->", value1);
        this.setState({
            expireDate: value1
        });

    }
    render() {
        const size = this.state.size;
        const data = clone(this.state.coins);
        const createEvent = clone(this.state.createEvent);
        const time = clone(this.state.alerttime);
        // console.log("data############1------",data);
        // console.log("data############2--------",data2);
        // console.log("data############3----------",data3);
        return (

            <div className="">
                <div className="fancoinsrferfriend1" title="Create Event">

                    <span id="points" style={{ color: "red" }}>{this.state.errors.points}</span>
                    <div className="marginLeft30 fancoinscardbody2">
                        <Row>
                            <Col span={24} className="">
                                <FormItem label="FanCoins" className="ant-col-md-3 fontWeightBold">
                                    <InputNumber name="points" className="" min={1} max={1000} defaultValue='' value={this.props.resetData ? this.props.resetData.createEvent.points : this.state.points} onChange={this.createEventChange} />
                                </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <div className="mrgTop10">
                                <FormItem label="Valid Upto" className="ant-col-md-7 fontWeightBoldBlack" >
                                    <DatePicker value={moment(this.state.expireDate, dateFormat)} disabledDate={disabledDate} onChange={this.expireDateChange} />
                                </FormItem>
                            </div>
                        </Row>

                        <Row>
                            <div className="">
                                <FormItem label="Expiry Notification Alert before" className="ant-col-md-16 fontWeightBoldExpry" >
                                    <Radio.Group name="alerttime" value={this.state.alerttime} onChange={this.handleSizeChange}>
                                        <Radio.Button value="12:00">12 Hours</Radio.Button>
                                        <Radio.Button value="24:00">24 Hours</Radio.Button>
                                        <Radio.Button value="48:00">2 Days</Radio.Button>
                                    </Radio.Group>
                                </FormItem>
                            </div>
                        </Row>



                    </div>
                    {this.state.role.create === true ?
                    <Button type="primary" className='updaterefraFrndButn marginLeft30' onClick={this.handleSubmit.bind(this)}>Update</Button>
                :null}</div>
            </div>

        );
    };
}


export default CreateEvent;
/* eslint-disable */