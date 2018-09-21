/* eslint-disable */
import React, { Children } from 'react';
import $ from 'jquery';
import { Layout, Menu, Breadcrumb, Icon, Col, Row, Card, Button, Radio, Select, Switch, Input, Form, InputNumber, DatePicker, Checkbox, Tabs } from 'antd';
import { Link } from 'react-router';
import css from './reports.css';
import Dashboard from '../Dashboard/Dashboard';
// import ChallengesContests from './ChallengesContests';
// import FanActivity from './FanActivity';
// import Coupons from './Coupons';
import axios from 'axios';
import ReportsMain from './ReportsMain';
import CoinsEarnedReport from './CoinsEarnedReport';
import CoinsRedeemedReport from './CoinsRedeemedReport';
import FeatureWiseCoinReports from './FeatureWiseCoins';
import ReportsMainPage from './ReportsMain';
import RedeemedCouponsReports from './RedeemedCouponsReports';
import RedeemedUserReports from './RedeemedUserReports';
import Fun2WinReports from './Fun2WinReport';
import Fun2WinCategoryWise from './Fun2WinReportCategoryWise';
import Fun2WinSubCategoryWsie from './Fun2WinReportSubCategoryWise';
import PollReport from './PollReport';
import FanclubsReports from './FanclubsReport';
import LoginReport from './LoginReport';
import MessageCenterReport from './MessageCenterReport';
const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;
const children = [];
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header, Content, Footer, Sider } = Layout;
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}


class ReportsDashBoard extends React.Component {
    state = {
        size: 'large',
        resetData: [],
        mode: 'left',
        item: '',
        reportsmain: true,
        role: ''
    };

    componentDidMount() {
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
    componentWillMount() {
        var user = JSON.parse(sessionStorage.getItem('user'));
        if (user.permissions !== '') {
            this.setState({ role: user.permissions.reports })
        }
    }
    handleClick = (e) => {
       // console.log('click---- ', e);
       // console.log('click ', e.key);
        this.setState({ item: e.key });
    }
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
        //console.log("this.state", this.state.role);
        const size = this.state.size;
        const { mode } = this.state;
        const menuitem = this.state.item;
        if (menuitem === "CoinsEarnedReport") {
            var items = <div style={{ padding: '0px 24px 24px', background: '#fff', minHeight: 360 }}> <CoinsEarnedReport />  </div>;
        } else if (menuitem === "CoinsRedeemedReport") {
            var items = <div style={{ padding: '0px 24px 24px', background: '#fff', minHeight: 360 }}> <CoinsRedeemedReport />   </div>;
        } else if (menuitem === "FeatureWiseReports") {
            var items = <div style={{ padding: '0px 24px 24px', background: '#fff', minHeight: 360 }}> <FeatureWiseCoinReports />   </div>;
        } else if (menuitem === "RedeemedCoupons") {
            var items = <div style={{ padding: '0px 24px 24px', background: '#fff', minHeight: 360 }}> <RedeemedCouponsReports />   </div>;
        } else if (menuitem === "RedeemedUsers") {
            var items = <div style={{ padding: '0px 24px 24px', background: '#fff', minHeight: 360 }}> <RedeemedUserReports />   </div>;
        } else if (menuitem === "FanclubsReports") {
            var items = <div style={{ padding: '0px 24px 24px', background: '#fff', minHeight: 360 }}> <FanclubsReports />   </div>;
        } else if (menuitem === "Fun2WinReports") {
            var items = <div style={{ padding: '0px 24px 24px', background: '#fff', minHeight: 360 }}> <Fun2WinReports />   </div>;
        } else if (menuitem === "Categorywise") {
            var items = <div style={{ padding: '0px 24px 24px', background: '#fff', minHeight: 360 }}> <Fun2WinCategoryWise />   </div>;
        }else if (menuitem === "Subcategorywise") {
            var items = <div style={{ padding: '0px 24px 24px', background: '#fff', minHeight: 360 }}> <Fun2WinSubCategoryWsie />   </div>;
        } else if (menuitem === "Pollwise") {
            var items = <div style={{ padding: '0px 24px 24px', background: '#fff', minHeight: 360 }}> <PollReport/>   </div>;
        }  else if (menuitem === "LoginReports") {
            var items = <div style={{ padding: '0px 24px 24px', background: '#fff', minHeight: 360 }}> <LoginReport />   </div>;
        } else if (menuitem === "MessageCenterReport") {
            var items = <div style={{ padding: '0px 24px 24px', background: '#fff', minHeight: 360 }}> <MessageCenterReport />   </div>;
        }
        else if (menuitem === "Reports") {
            var items = <div style={{ padding: '0px 24px 24px', background: '#fff', minHeight: 360 }}> <ReportsMain />   </div>;
        }
        else {
            var items = <div style={{ padding: '0px 24px 24px', background: '#fff', minHeight: 360 }}> <ReportsMainPage />   </div>;

        }


        return (
            <Dashboard>


                <div className="paddingLeft20">
                    <div className="SubMenufanCOINSStepshsand">

                        <Layout>
                            {/* <Col span={24}>
                                <Button type="primary" className='createBtn btnRight' onClick={this.handleSubmit}>Reset Configuration</Button>
                            </Col> */}
                            <Col span={20}>
                                <Layout>
                                    {/* <Header style={{ background: '#fff', padding: 0 }} />*/}
                                    <Content >

                                        {items}
                                    </Content>
                                </Layout>
                            </Col>
                            <Col span={4} className="reportsMenu">

                                {/* <Button type="primary" className='createBtn btnRight' onClick={this.handleSubmit}>Reset Configuration</Button>*/}
                                <Sider className="Reportssidernav" style={{ background: '#fff' }}>

                                    <Menu
                                        onClick={this.handleClick}
                                        defaultSelectedKeys={['1']}
                                        defaultOpenKeys={['sub1']}
                                        mode="inline"
                                        >
                                        <Menu.Item key="Reports" className="Reportsnavview"><p className="ReportsView">Reports</p></Menu.Item>
                                        {this.state.role.coupons === true ?
                                            <SubMenu key="Coupons" className="Reportssubmenumenu" title={<span><span>Coupons</span></span>}>
                                                <Menu.Item className="Reportsnavvview" key="RedeemedCoupons" >Coupon Wise</Menu.Item>
                                                <Menu.Item className="Reportsnavvview" key="RedeemedUsers">User Wise</Menu.Item>
                                            </SubMenu> : null}
                                        {this.state.role.fanCoins === true ?
                                            <SubMenu className="Reportssubmenumenu" key="Fancoins" title={<span><span>Fan Coins</span></span>}>
                                                <Menu.Item className="Reportsnavvview" key="CoinsEarnedReport">Fan Coins Earned</Menu.Item>
                                                <Menu.Item className="Reportsnavvview" key="CoinsRedeemedReport">Fan Coins Redeemed</Menu.Item>
                                                <Menu.Item className="Reportsnavvview" key="FeatureWiseReports">Feature Wise</Menu.Item>
                                            </SubMenu>
                                            : null}
                                        {this.state.role.messageCenter === true ?

                                            <Menu.Item className="Reportsnavview" key="MessageCenterReport">Message Center Challenges</Menu.Item>

                                            : null}
                                        {this.state.role.fanClubs === true ?

                                            <Menu.Item className="Reportsnavview" key="FanclubsReports">Fan Clubs</Menu.Item>

                                            : null}
                                        {this.state.role.fun2win === true ?
                                            <SubMenu className="Reportssubmenumenu" key="Fun2WinReports" title={<span><span>Fun2Win</span></span>}>
                                                <Menu.Item className="Reportsnavview" key="Categorywise">Category Wise</Menu.Item>
                                                <Menu.Item className="Reportsnavview" key="Subcategorywise">Sub-category Wise</Menu.Item>
                                                  <Menu.Item className="Reportsnavview" key="Pollwise">Poll Wise</Menu.Item>
                                            </SubMenu>
                                            : null}
                                        {this.state.role.login === true ?

                                            <Menu.Item className="Reportsnavview" key="LoginReports">New Logins & Profile Creations</Menu.Item>


                                            : null}
                                    </Menu>
                                </Sider>
                            </Col>

                        </Layout>
                    </div>
                </div>

            </Dashboard>
        );
    }
}
export default ReportsDashBoard;
/* eslint-disable */