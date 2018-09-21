/* eslint-disable */
import React, { Children } from 'react';
import axios from 'axios';
import clone from 'clone';
import { Col, Row, Card, Button, Radio, Select, Input, Tabs, Form, InputNumber, DatePicker, Checkbox, message } from 'antd';
import '../fancoins.css';
//import { Link } from 'react-router';
//import css from '../fancoins.css';
import moment from 'moment';

//const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
//const CheckboxGroup = Checkbox.Group;
//const { TextArea } = Input;
const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
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

//const format = 'h:mm a';
const dateFormat = 'YYYY-MM-DD';
//const { MonthPicker, RangePicker } = DatePicker;

class Fun2WinChallenges extends React.Component {
    state = {
        size: 'large',
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
            fun2win: '',
            alerttime: '',
            comment: '',
            like: '',
            share: '',
            expireDate: '',
            facebook: '',
            instagram: '',
            twitter: '',
            role:''
        }
        this.baseState = this.state;
        this.handleChange = this.handleChange.bind(this);
        this.expireDateChange = this.expireDateChange.bind(this);
        this.handleSizeChange = this.handleSizeChange.bind(this);
        this.likeChange = this.likeChange.bind(this);
        this.commentChange = this.commentChange.bind(this);
        this.twitterChange = this.twitterChange.bind(this);
        this.facebookChange = this.facebookChange.bind(this);
        this.instagramChange = this.instagramChange.bind(this);
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
        axios.get('/coins/fun2win', {
            headers: {
                "x-access-token": sessionStorage.token,
            },

        })
            .then(function (response) {
                //  console.log("get view resposne in all", response.data.data);
                // console.log(typeof response.data.data.refer.expireDate, '47457');
                const getdata = response.data.data;
                // console.log("get view resposne in all############", getdata);
                // console.log("get view resposne in all############2", getdata.createEvent);
                // console.log("get view resposne in all############3", getdata.noftifyBeforeExpire);
                _this.setState({ coins: getdata });
                _this.setState({ id: _this.state.coins.id });
                // console.log("expire date", _this.state.coins.id)
                _this.setState({ fun2win: _this.state.coins.fun2win });
                _this.setState({ share: _this.state.coins.fun2win.share.points });
                _this.setState({ comment: _this.state.coins.fun2win.comment.points });
                _this.setState({ like: _this.state.coins.fun2win.like.points });
                _this.setState({ alerttime: _this.state.coins.fun2win.noftifyBeforeExpire });
                _this.setState({ expireDate: _this.state.coins.fun2win.expireDate });
                // console.log("expire date", _this.state.expireDate)
                _this.setState({ facebook: _this.state.coins.fun2win.share.facebook });
                _this.setState({ instagram: _this.state.coins.fun2win.share.instagram });
                _this.setState({ twitter: _this.state.coins.fun2win.share.twitter });

            })
            .catch(function (error) {
                console.log(error);
            });
    }



    // handleSizeChange = (e) => {
    //     console.log(e.target.value);
    //     this.setState({ [e.target.name]: e.target.value });
    // }


    // expireDateChange(value) {
    //     var value = moment(value).format('MM-DD-YYYY');
    //     this.setState({
    //         expireDate: value
    //     });

    // }

    handleSubmit = (e) => {
        e.preventDefault();
        //var _this = this;
        // console.log('state data-------->', this.state);
        // console.log('state data-------->', this.state.coins.id);
        // this.props.form.validateFields((err, values) => {
        //   if (!err) {
        // console.log('Received values of form: ', values);
        //  console.log('state data', this.state);
        message.destroy();
        let errors = {};
        if (this.state.comment === undefined) errors.mess = "Please Enter comment Level";
        if (this.state.like === undefined) errors.mess = "Please Enter like Points";
        if (this.state.facebook === undefined) errors.mess = "Please Enter facebook Level";
        if (this.state.instagram === undefined) errors.mess = "Please Enter instagram Level";
        if (this.state.twitter === undefined) errors.mess = "Please Enter twitter Level";
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            var data = {
                "id": this.state.coins.id,
                "fun2win": {
                    comment: {
                        id: "F2WC",
                        points: this.state.comment
                    },
                    like: {
                        id: "F2WL",
                        points: this.state.like
                    },
                    share: {
                        id: "F2WS",
                        facebook: this.state.facebook,
                        instagram: this.state.instagram,
                        twitter: this.state.instagram
                    },
                    "noftifyBeforeExpire": this.state.alerttime,
                    "expireDate": this.state.expireDate
                }

            }
            console.log("handleSubmit data--->", data);
            this.updateFun2WinCoins(data);
        }
    }
    // });
    //}

    updateFun2WinCoins = (data) => {
        // console.log("User", sessionStorage.getItem('token'))
        const url = '/coins/fun2win';
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
                    //   console.log("dataresponse", response.data);
                    message.success('Fun2Win Coins Updated successfully!');
                    //  console.log(response, 'Service Response');
                    //   browserHistory.push("/fun2win");
                    //this.getCoins();
                }
                else {
                    message.error(`unable to update user refer coins.`, 5);
                    //   console.log("dataresponse", response);
                }
            })
    }

    handleSizeChange = (e) => {
        //  console.log("###################-->", e.target.value)
        this.setState({ [e.target.name]: e.target.value });
    }

    handleChange(e) {
        //e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    expireDateChange(value) {
        var value1 = moment(value).format('YYYY-MM-DD');
        //   console.log("expireDate--->", value1)
        this.setState({
            expireDate: value1
        });
    }
    likeChange(value) {
        //e.preventDefault();
        if (this.props.resetData) {
            this.props.resetData.like.points = value;
        }
        //   console.log('likeChange-', value);
        this.setState({
            like: value
        })
    }
    commentChange(value) {
        if (this.props.resetData) {
            this.props.resetData.comment.points = value;
        }
        console.log('commentChange-', value);
        this.setState({
            comment: value
        })
    }
    participationChange(value) {
        //  console.log('participationChange-', value);
        //e.preventDefault();
        this.setState({
            participation: value
        })
    }
    twitterChange(value) {
        if (this.props.resetData) {
            this.props.resetData.share.twitter = value;
        }
        this.setState({
            twitter: value
        })

    }
    facebookChange(value) {
        if (this.props.resetData) {
            this.props.resetData.share.facebook = value;
        }
        this.setState({
            facebook: value
        })

    }
    instagramChange(value) {
        if (this.props.resetData) {
            this.props.resetData.share.instagram = value;
        }
        this.setState({
            instagram: value
        })

    }



    render() {
        //const size = this.state.size;
        //const data = clone(this.state.coins);
        // const fun2win = clone(this.state.fun2win);
        //const comment = clone(this.state.comment);
        //const like = clone(this.state.like);
        //const share = clone(this.state.share);
        //const time = clone(this.state.alerttime);
        // const expireDate = clone(this.state.expireDate);
        // console.log("data",this.props);
        return (
            <div className="">
                <div className="marginLeft0" title=" Fun 2 win challenges">
                    <span id="points" style={{ color: "red" }}>{this.state.errors.mess}</span>
                    <div className="marginLeft30">
                        <Row>
                            <Col span={24} className="">

                                <FormItem label="Like" className="ant-col-md-4 ant-col-smResolution768 fontWeightBold">
                                    <InputNumber name="Like" className="" min={1} max={1000} defaultValue='' value={this.props.resetData ? this.props.resetData.like.points : this.state.like} onChange={this.likeChange} />
                                </FormItem>
                                <FormItem label="Comment" className="ant-col-md-4 fontWeightBold">
                                    <InputNumber name="comment" className="" min={1} max={1000} defaultValue='' value={this.props.resetData ? this.props.resetData.comment.points : this.state.comment} onChange={this.commentChange} />
                                </FormItem>
                            </Col>
                        </Row>
                        <Row className="">
                            <h3 className="SubHeadingsTabText"> Social Share</h3>
                            <Col span={24}>
                                <FormItem label="Facebook" className="ant-col-md-4 ant-col-smResolution768 fontWeightBold">
                                    <InputNumber name="facebook" className="" min={1} max={1000} defaultValue='' value={this.props.resetData ? this.props.resetData.share.facebook : this.state.facebook} onChange={this.facebookChange} />
                                </FormItem>
                                <FormItem label="Twitter" className="ant-col-md-4 ant-col-smResolution768 fontWeightBold">
                                    <InputNumber name="Twitter" className="" min={1} max={1000} defaultValue='' value={this.props.resetData ? this.props.resetData.share.instagram : this.state.instagram} onChange={this.instagramChange} />
                                </FormItem>
                                <FormItem label="Linked In" className="ant-col-md-4 fontWeightBold">
                                    <InputNumber name="Linked In" className="" min={1} max={1000} defaultValue='' value={this.props.resetData ? this.props.resetData.share.twitter : this.state.twitter} onChange={this.twitterChange} />
                                </FormItem>
                            </Col>
                        </Row>
                        <Row className="mrgTop10">
                            <FormItem label="Valid Upto" className="ant-col-md-7 fontWeightBoldBlack" >
                                <DatePicker getCalendarContainer={triggerNode => triggerNode.parentNode}
                                    value={moment(this.state.expireDate, dateFormat)} disabledDate={disabledDate} onChange={this.expireDateChange} />
                            </FormItem>
                        </Row>
                        <Row className="">
                            <div className="">
                                <FormItem label="Expiry Notification Alert before" className="ant-col-md-16 fontWeightBoldExpry" >
                                    <Radio.Group name="alerttime" value={this.state.alerttime} onChange={this.handleSizeChange}>
                                        <Radio.Button value="12:00" className="paddingRadioBtn">12 Hours</Radio.Button>
                                        <Radio.Button value="24:00" className="paddingRadioBtn">24 Hours</Radio.Button>
                                        <Radio.Button value="48:00" className="paddingRadioBtn">2 Days</Radio.Button>
                                    </Radio.Group>
                                </FormItem>
                            </div>
                        </Row>
{this.state.role.create === true ?
                        <Button type="primary" className='updateButnFun2winChallanges' onClick={this.handleSubmit.bind(this)} >Update</Button>
                    :null}</div>

                </div>
            </div>
        );
    }
}
export default Fun2WinChallenges;
/* eslint-disable */