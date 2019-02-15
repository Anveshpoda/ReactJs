import React, { Component } from 'react'
import { Menu, Dropdown, Icon, Form, Upload, Input, Button, Modal, message, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import './NavBar.css'
export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state =
          {
            role: '',
            emailId: '',
            mobileNumber: '',
            firstName: '',
            lastName: '',
            userid: '',
            userData: {},
            errors: {},
            role1: '',
            permissions: '',
            polling: Boolean,
            blog: Boolean,
            loading: false,
            imageUrl: '' ,
            notificationCount : 1
    
          }
    
      }

    render() {

        const menu1 = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">Edit Profil</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">Logout</a>
                </Menu.Item>
                {/* <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
          </Menu.Item> */}
            </Menu>
        );

        const menu = (
            <Menu className="MenuBg">
                <Menu.Item key="0" className="">
                    <Link onClick={this.showModal} className="menuNav paddingNav">
                        Edit Profile </Link>
                </Menu.Item>
                <Menu.Item key="1" className="">
                    <Link onClick={this.logout} className="menuNav txtLeft paddingNav">
                        Logout</Link>
                </Menu.Item>

            </Menu>
        )

        return (
            <div>
                <div className="NavRight">

                    <Avatar className="ProfileBgColor" src=''> <p style={{ marginLeft: 0 , fontSize:18, fontWeight: "bold"}}>A</p> </Avatar>

                    <Dropdown overlay={menu1} trigger={['click']}>

                        <a className="ant-dropdown-link" href="#">
                            <span style={{ marginRight: 5 , marginLeft: 10 , fontSize: 15}}>Anvesh</span>
                            {/* <Icon> <img src={userConfiguration} style={{ 'vertical-align': 'middle' }} alt="" /></Icon> <Icon type="down" /> */}
                            <Icon type="down" />
                        </a>
                    </Dropdown>
                </div>

                <div className="NavRight">
                    <span style={{ marginRight: -18 }}><Link to="" className='Couponsitem' activeClassName='active'>
                        <Icon type="bell" className="NavareaChart" title="Notifications" style={{ marginRight: 10 }} /></Link></span>
                    <span className={this.state.notificationCount > 0 ? "notCount" : ''}>{this.state.notificationCount}</span>

                </div>

                <div className="NavRight">
                <Button style={{ marginRight: 20 }} type="primary" ghost>Create / Add</Button>
                </div>
            </div>
        )
    }
}
