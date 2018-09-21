/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
//import classNames from 'classnames/bind';
import css from './layout.css';
import $ from "jquery";
import { Layout,  Icon } from 'antd';
 import { Link, hashHistory, browserHistory } from 'react-router';
import LeftMenu from '../layout/LeftMenu';
import RightMenu from '../layout/RightMenu';
import Profile from '../rightMenu/Profile';
import UserDirectory from '../rightMenu/UserDirectory';
import ToDo from '../rightMenu/ToDo';
import Chat from '../rightMenu/Chat';
import Navigation from './Navigation';
// import App from '../App.js';
import { Scrollbars } from 'react-custom-scrollbars';
const { Header, Content, Footer, Sider } = Layout;
// const cx = classNames.bind(styles);
// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

/*
 * React-router's <Router> component renders <Route>'s
 * and replaces `this.props.children` with the proper React Component.
 *
 * Please refer to `routes.jsx` for the route config.
 *
 * A better explanation of react-router is available here:
 * https://github.com/rackt/react-router/blob/latest/docs/Introduction.md
 */
class Dashboard extends React.Component {
constructor(props){
    super(props)
    this.state = {
        collapsed: true,
        current: 'mail',
        ttt:[]
    }
}
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }
    componentWillMount() {
      
        var _this = this;
        const authenticated = sessionStorage.getItem('isLogged')
        if(authenticated){
        var tok = sessionStorage.getItem('token');
        var user = JSON.parse( sessionStorage.getItem('user'));
      
        var id = user._id;
        const url = '/user/'+id;
        var request = new Request(url, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "x-access-token":tok
          }
        });
        fetch(request)
          .then(response => response.json())
          .then(function (response) {
            if (response.status === 200) {
            // console.log("response in dash",response.data);
             _this.setState({ttt:response.data})
            //  _this.setState({userData : response.data});
            //  _this.setState({firstName : _this.state.userData.firstname});
            //  _this.setState({lastName : _this.state.userData.lastname});
            //  _this.setState({ username : _this.state.firstName + _this.state.lastName});
            //  _this.setState({emailid : _this.state.userData.email});
            //  _this.setState({role : _this.state.userData.role});
            //  _this.setState({mobileNumber : _this.state.userData.phonenumber});
            }
        })
    
    }
    
    }
    componentDidMount(e) {
      
            $("#rightMenuView").hide();
            $(".rightMenu li").click(function () {
                $("#rightMenuView").show();

            });

            $("#closerightMenuView").click(function () {
                $("#rightMenuView").hide();
            });
            $('.ant-menu-item.profile').click(function () {
                $('.rightMenubg').show();
                $('.userDirectoryView, .toDoView, .chatView').hide();
            });
            $('.ant-menu-item.userDirectory').click(function () {
                $('.rightMenubg, .toDoView, .chatView').hide();
                $('.userDirectoryView').show();
            });
            $('.ant-menu-item.toDoMenu').click(function () {
                $('.rightMenubg, .userDirectoryView, .chatView').hide();
                $('.toDoView').show();
            });
            $('.ant-menu-item.chatMenu').click(function () {
                $('.rightMenubg, .toDoView, .userDirectoryView').hide();
                $('.chatView').show();
            });
        
    }
    render() {
const ttt=this.state;
var year = new Date().getFullYear();
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{ left: 0 }} className='leftMenu' id="leftMenuView">
                    <LeftMenu />

                </Sider>
                <Layout style={{}}>
                    <Header className="topHeader">
                        <Navigation />
                    </Header>
                    <Content>
                        <Scrollbars style={{ height: '81.5vh', background: '#f5f5f5' }}>
                      
                            <div className="container">
                            {/* <div style={{ padding: '0px 15px 15px 15px' }} className="container"> */}
                          
                                {this.props.children}
                            </div>
                        </Scrollbars>
                    </Content>
                    <div className="footerview" id="footerview">
                    <Footer className="layoutFooter">
 
                        <span> Copyright © {year} FanKick. All Rights Reserved.
</span>
                    </Footer>
                    </div>
                </Layout>
                <div className='rightMenuView' id="rightMenuView" style={{ width: '300px', background: 'white', 'borderRight': '1px solid #f0f0f0' }}>
                    <Icon type="close" id="closerightMenuView" className='closerightMenuViewIcon' />
                    <Profile ttt={ttt}/>
                    <UserDirectory />
                    <ToDo />
                    <Chat />
                </div>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{ right: 0 }} className='rightMenu'>
                    <RightMenu />
                </Sider>
            </Layout>
        );
    };
}
Dashboard.propTypes = {
    children: PropTypes.array
};

export default Dashboard;
/* eslint-disable */