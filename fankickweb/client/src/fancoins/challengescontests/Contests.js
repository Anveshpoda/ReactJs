/* eslint-disable */
import React from 'react';
import axios from 'axios';
import { Col, Row, Card, Button, Radio, Select, Input, Form, InputNumber, DatePicker, message } from 'antd';
import { Link } from 'react-router';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
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
const { MonthPicker, RangePicker } = DatePicker;

class Contests extends React.Component {
    state = {
        size: 'large',
    };

    constructor(props) {
        super(props);
        this.state = {
            contests: [],
            errors: {},
            coins: {},
            event: '',
            id: '',
            endDateTime: '',
            fanActivity: '',
            alerttime: '',
            comment: '',
            like: '',
            share: '',
            participation: '',
            expireDate: '',
            facebook: '',
            instagram: '',
            level: '',
            twitter: '',role:''
        }
        this.baseState = this.state;
        this.handleChange = this.handleChange.bind(this);
        this.expireDateChange = this.expireDateChange.bind(this);
        this.handleSizeChange = this.handleSizeChange.bind(this);
        this.likeChange = this.likeChange.bind(this);
        this.commentChange = this.commentChange.bind(this);
        this.participationChange = this.participationChange.bind(this);
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
        axios.get('/coins/contests', {
            headers: {
                "x-access-token": sessionStorage.token,
            },

        })
            .then(function (response) {
                //    console.log("get view resposne in all", response.data.data);
                const getdata = response.data.data;
                _this.setState({ coins: getdata });
                _this.setState({ id: _this.state.coins.id });
                _this.setState({ fun2win: _this.state.coins.contests });
                _this.setState({ share: _this.state.coins.contests.share });
                _this.setState({ facebook: _this.state.coins.contests.share.facebook });
                _this.setState({ instagram: _this.state.coins.contests.share.instagram });
                _this.setState({ twitter: _this.state.coins.contests.share.twitter });
                _this.setState({ level: _this.state.coins.contests.share.level });
                _this.setState({ comment: _this.state.coins.contests.comment.points });
                _this.setState({ like: _this.state.coins.contests.like.points });
                _this.setState({ participation: _this.state.coins.contests.participation.points });
                _this.setState({ alerttime: _this.state.coins.contests.noftifyBeforeExpire });
                _this.setState({ expireDate: _this.state.coins.contests.expireDate });

            })
            .catch(function (error) {
                console.log(error);
            });
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
    likeChange(value) {
        if (this.props.resetData) {
            this.props.resetData.like.points = value;
        }
        //e.preventDefault();
        //  console.log('likeChange-', value);
        this.setState({
            like: value
        })
    }
    commentChange(value) {
        if (this.props.resetData) {
            this.props.resetData.comment.points = value;
        }
        //  console.log('commentChange-', value);
        this.setState({
            comment: value
        })
    }
    participationChange(value) {
        if (this.props.resetData) {
            this.props.resetData.participation.points = value;
        }
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

    expireDateChange(value) {
        var value = moment(value).format('YYYY-MM-DD');
        this.setState({
            expireDate: value
        });

    }

    handleSubmit = (e) => {
        e.preventDefault();
        //var _this = this;
        //   console.log('state data-------->', this.state);
        message.destroy();
        let errors = {};
        if (this.state.participation === undefined) errors.mess = "Please Enter participation Points";
        if (this.state.comment === undefined) errors.mess = "Please Enter comment Level";
        if (this.state.like === undefined) errors.mess = "Please Enter like Points";
        if (this.state.facebook === undefined) errors.mess = "Please Enter facebook Level";
        if (this.state.instagram === undefined) errors.mess = "Please Enter instagram Level";
        if (this.state.twitter === undefined) errors.mess = "Please Enter twitter Level";
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            var data = {
                "id": this.state.coins.id,
                "contests": {
                    comment: {
                        id: "MCFC",
                        level: 10,
                        points: this.state.comment
                    },
                    like: {
                        id: "MCFL",
                        level: 10,
                        points: this.state.like
                    },
                    share: {
                        id: "MCS",
                        level: 10,
                        facebook: this.state.facebook,
                        instagram: this.state.instagram,
                        twitter: this.state.twitter
                    },
                    participation: {
                        id: "MCP",
                        points: this.state.participation
                    },
                    "noftifyBeforeExpire": this.state.alerttime,
                    "expireDate": this.state.expireDate
                },

            }
            // console.log("handleSubmit data--->", data);
            this.updateContestsCoins(data);
        }
    }

    updateContestsCoins = (data) => {
        //   console.log("User", sessionStorage.getItem('token'))
        const url = '/coins/contests';
        var request = new Request(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                'x-access-token': sessionStorage.getItem('token')
            }
        });
        fetch(request)

            .then(function (response) {
                if (response.status === 200) {
                    //      console.log("dataresponse", response.data);
                    message.success('Contents coins updated successfully!');
                    //      console.log(response, 'Service Response');
                }
                else {
                    message.error(`unable to update user refer coins.`, 5);
                    console.log("dataresponse", response);
                }
            })
    }


    render() {
        // const size = this.state.size;
        return (
            <div className="">
                <div className="" title="Contests">

                    <span id="points" style={{ color: "red" }}>{this.state.errors.mess}</span>
                    <div className="marginLeft30">

                        <Row>
                            <Col span={24}>
                                <Col span={24} className="">
                                    <FormItem label="Participation" className="ant-col-md-4 ant-col-smResolution768 fontWeightBold">
                                        <InputNumber name="participation" className="" min={1} max={1000} defaultValue='' value={this.props.resetData ? this.props.resetData.participation.points : this.state.participation} onChange={this.participationChange} />
                                    </FormItem>
                                    <FormItem label="Like" className="ant-col-md-4 ant-col-smResolution768 fontWeightBold">
                                        <InputNumber name="Like" className="" min={1} max={1000} defaultValue='' value={this.props.resetData ? this.props.resetData.like.points : this.state.like} onChange={this.likeChange} />
                                    </FormItem>
                                    <FormItem label="Comment" className="ant-col-md-4 fontWeightBold">
                                        <InputNumber name="comment" className="" min={1} max={1000} defaultValue='' value={this.props.resetData ? this.props.resetData.comment.points : this.state.comment} onChange={this.commentChange} />
                                    </FormItem>
                                </Col>
                            </Col>
                        </Row>
                        <Row className="">
                            <h3 className="SubHeadingsTabText"> Social Share</h3>
                            <Col span={24}>
                                <FormItem label="Facebook" className="ant-col-md-4 ant-col-smResolution768 fontWeightBold">
                                    <InputNumber name="facebook" className="" min={1} max={1000} defaultValue='' value={this.props.resetData ? this.props.resetData.share.facebook : this.state.facebook} onChange={this.facebookChange} />
                                </FormItem>
                                <FormItem label="Instagram" className="ant-col-md-4 ant-col-smResolution768 fontWeightBold">
                                    <InputNumber name="instagram" className="" min={1} max={1000} defaultValue='' value={this.props.resetData ? this.props.resetData.share.instagram : this.state.instagram} onChange={this.instagramChange} />
                                </FormItem>
                                <FormItem label="Twitter" className="ant-col-md-4 fontWeightBold">

                                    <InputNumber name="twitter" className="" min={1} max={1000} defaultValue='' value={this.props.resetData ? this.props.resetData.share.twitter : this.state.twitter} onChange={this.twitterChange} />
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <div className="mrgTop10">
                                <FormItem label="Valid Upto" className="ant-col-md-7 fontWeightBoldBlack" >
                                    <DatePicker getCalendarContainer={triggerNode => triggerNode.parentNode} value={moment(this.state.expireDate, dateFormat)} disabledDate={disabledDate} onChange={this.expireDateChange} />
                                </FormItem>

                            </div>
                        </Row>
                        <Row>
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
                        <Button type="primary" className='updateButnFun2winChallanges' onClick={this.handleSubmit.bind(this)}>Update</Button>
                   :null} </div>
                </div>
            </div>
        );
    }
}
export default Contests;
/* eslint-disable */