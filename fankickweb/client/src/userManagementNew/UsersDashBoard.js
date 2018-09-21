/* eslint-disable */
import React, { Children } from 'react';
import $ from 'jquery';
import { Layout, Menu, Breadcrumb, Icon, Col, Row, Card, Button, Radio, Select, Switch, Input, Form, InputNumber, DatePicker, Checkbox, Tabs } from 'antd';
import { Link } from 'react-router';
import css from './user.css';
import Dashboard from '../Dashboard/Dashboard';
import CreateUser from './CreateUser';
import UserManagement from './UserManagement';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header, Content, Footer, Sider } = Layout;


class UsersDashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Challenges: false,
            userManagement: true,
        }
    }
    userManagement= ()=>{
        this.setState({ userManagement:true, CreateUser: false});
    }
    CreateUser = () => {
        this.setState({ CreateUser: true, userManagement:false });
    }
    render() {

        return (
            <Dashboard>

                {/* <Col span={24}>
<div className="SubMenu">
User Management
</div>
</Col> */}
                <Col span={24} className="bodyBgWhite">

                    <Col span={19}>
                    {this.state.userManagement ? 
                        <UserManagement />
                        :null}
                        {this.state.CreateUser ?
                            <CreateUser />
                            : null}
                    </Col>
                    <Col span={5} className="SideMenu">
                        <div className="btnGroup">
                            <Button onClick={this.userManagement.bind(this)}>User Management</Button>
                            <Button type="primary" onClick={this.CreateUser.bind(this)}>Create New User</Button>
                        </div>
                        <Menu
                            onClick={this.handleClick}
                            defaultSelectedKeys={['0']}
                            defaultOpenKeys={['0']}
                            mode="inline"
                        >

                            <SubMenu key="0" title={<span><span>User Roles & Permissions</span></span>}>
                                <Menu.Item key="RedeemedCoupons">Challenges</Menu.Item>
                                <Menu.Item key="RedeemedUsers">Fun2Win</Menu.Item>
                                <Menu.Item key="CoinsEarnedReport">Reports</Menu.Item>
                                <Menu.Item key="CoinsRedeemedReport">FanCoins</Menu.Item>
                                <Menu.Item key="FeatureWiseReports">Coupons</Menu.Item>
                            </SubMenu>

                        </Menu>

                    </Col>
                </Col>


            </Dashboard>
        );
    }
}
export default UsersDashBoard;
/* eslint-disable */