/* eslint-disable */
import React, { Children } from 'react';
import $ from 'jquery';
import { Layout, Menu, Breadcrumb, Icon, Col, Row, Card, Button, Radio, Select, Switch, Input, Form, InputNumber, DatePicker, Checkbox, Tabs } from 'antd';
import { Link } from 'react-router';
import css from './fancoins.css';
import Dashboard from '../Dashboard/Dashboard';
import ChallengesContests from './ChallengesContests';
import FanActivity from './FanActivity';
import Coupons from './Coupons';
import axios from 'axios';
import Offers from './Offers';
import Contests from './challengescontests/Contests';
import Fun2WinChallenges from './challengescontests/Fun2WinChallenges';
import CreateEvent from './fanactivity/CreateEvent';
import FanClubFeed from './fanactivity/FanClubFeed';
import ReferFriend from './fanactivity/ReferFriend';
import CreateProfile from './fanactivity/CreateProfile';
const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;
const children = [];
const TabPane = Tabs.TabPane;
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}


class fanCoins extends React.Component {
    state = {
        size: 'large',
        resetData: [],
        mode: 'left',
        role:''
    };

    componentDidMount() {
        var user = JSON.parse(sessionStorage.getItem('user'));
         if (user.permissions !== '') {
           this.setState({ role: user.permissions.fanCoins })
         }
        $(function () {
            // Then hide the second div
            $("#div2").hide();
            $("#div3").hide();

            // Then add a click handlers to the buttons
            $("#fancoinstab1").click(function () {
                $("#div1").show();
                $("#div2").hide();
                $("#div3").hide();
                $(this).addClass('addbuttonColor');
                $('#fancoinstab2').removeClass('addbuttonColor');
                $('#fancoinstab3').removeClass('addbuttonColor');
            });
            $("#fancoinstab2").click(function () {
                $(this).addClass('addbuttonColor');
                $('#fancoinstab1').removeClass('addbuttonColor');
                $('#fancoinstab3').removeClass('addbuttonColor');
                $("#div1").hide();
                $("#div2").show();
                $("#div3").hide();
            });

            //      $("#fancoinstab3").click(function () {
            //         $(this).addClass('addbuttonColor');
            //         $('#fancoinstab1').removeClass('addbuttonColor');
            //          $('#fancoinstab2').removeClass('addbuttonColor');
            //         $("#div1").hide();
            //          $("#div2").hide();
            //         $("#div3").show();
            //     });
        })
    };
    handleSizeChange = (e) => {
        this.setState({ size: e.target.value });
    }
    handleSubmit = () => {
        var req = axios.create({
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': sessionStorage.getItem('token')
            }
        })
        req.get('/resetCoinConfig').then((res) => {
            this.setState({ resetData: res.data.data })
            //console.log("data",res.data.data)
        })
    }

    render() {
        const size = this.state.size;
        const { mode } = this.state;
        const {role}=this.state;
        return (
            <Dashboard>
                <div className="paddingLeft20">
                    <div>
                        <div className="SubMenuFanCoinss">
                            <Row>
                                <Col span={12}>
                                    <h2 className="pageTitlefancoin"><b>FanCoin Configuration</b></h2>
                                </Col>
                                {role.resetconfig === true ?
                                <Col span={12}>
                                    <Button type="primary" className='fanCoinsResetConifg' onClick={this.handleSubmit}>Reset Configuration</Button>
                                </Col>:null}
                            </Row>
                        </div>
                    </div>
                    {/* <div className="fansCoinsConfigtabs">
                        <Row>
                            <Col span={24} style={{ borderBottom: '1px solid #f0f0f0', margin: '20px auto' }}>
                                <Col span={4} >
                                    <p id="fancoinstab1" className="addbuttonColor" >CHALLENGES & CONTESTS</p>
                                </Col>
                                <Col span={3}>
                                    <p id="fancoinstab2" >FAN ACTIVITY</p>
                                </Col>
                                <Col span={4}>
                                    <p className="TabsTxtOffers txtCenter" id="fancoinstab3" >OFFERS</p>
                                </Col>
                            </Col>
                        </Row>
                    </div>
                    <div id="div1">
                        <ChallengesContests resetData={this.state.resetData} />
                    </div>
                    <div id="div2">

                        <FanActivity resetData={this.state.resetData} />
                    </div>
                    <div id="div3">

                        <Offers resetData={this.state.resetData} />
                    </div> */}

                </div>

                <div className="SubMenufanCOINSStepshs">
                    <Tabs className="fancoinsborderColorTabs"
                        defaultActiveKey="1"
                        tabPosition={mode}
                        style={{ height: "auto" }}
                        >
                        <TabPane tab="Fun2Win challenges" key="1"><Fun2WinChallenges resetData={this.state.resetData.fun2win} /></TabPane>
                        <TabPane tab="Contests" key="2"> <Contests resetData={this.state.resetData.contests} /></TabPane>
                        <TabPane tab="Refer Friend" key="3"> <ReferFriend resetData={this.state.resetData.fanActivity} /></TabPane>
                        <TabPane tab="Create Profile" key="4"><CreateProfile resetData={this.state.resetData.fanActivity} /></TabPane>
                        <TabPane tab="Create Event" key="5"> <CreateEvent resetData={this.state.resetData.fanActivity} /></TabPane>
                        <TabPane tab="Fan Club Feeds" key="6"> <FanClubFeed resetData={this.state.resetData.fanClubs} /></TabPane>
                    </Tabs>
                </div>
            </Dashboard>
        );
    }
}
export default fanCoins;
/* eslint-disable */