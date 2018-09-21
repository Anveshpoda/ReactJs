/* eslint-disable */
import React from 'react';
import $ from "jquery";
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import css from './Menu.css';
import { Link } from 'react-router';
import fkLogo from '../images/logo.png';
import campaigns from '../images/icons/left/campaigns.png';
import fun2win from '../images/icons/left/fun2win.png';

import { Scrollbars } from 'react-custom-scrollbars';
import fun2winNew from '../images/icons/left/fun2winNew.png';

import fancoins from '../images/icons/left/fancoins.png';
import fanclubs from '../images/icons/left/fanclubs.png';
import ContentCur from '../images/icons/left/ContentCur.png';
import Crudicon from '../images/icons/left/Crudicon.png';
import Celebrity from '../images/icons/left/Celebrity.png';
import funclubs from '../images/icons/left/funclubs.png';
import fom from '../images/icons/left/fom.png';
import notifications from '../images/icons/left/notifications.png';
import coupons from '../images/icons/left/coupons.png';
import campaigns1 from '../images/icons/left/campaigns-color.png';
import fun2win1 from '../images/icons/left/fun2win-color.png';
import fun2win2 from '../images/icons/left/fun2winNewColor.png';

import fancoins1 from '../images/icons/left/fancoins-color.png';
import fanclubs1 from '../images/icons/left/fanclubs-color.png';
import Celebrity1 from '../images/icons/left/Celebrity-color.png';
import notifications1 from '../images/icons/left/notifications-color.png';
import coupons1 from '../images/icons/left/coupons-color.png';
import funclubs1 from '../images/icons/left/funclubs-color.png';
import Content1 from '../images/icons/left/Content-color.png';
import CrudColor from '../images/icons/left/Crud-color.png';

import Socialmedia from '../images/icons/left/Socialmediapost.png';
import SocialmediaColor from '../images/icons/left/Socialmediapost-color.png';

import FacebookContests from '../images/icons/left/FacebookContests.png';
import FacebookContestsColor from '../images/icons/left/FacebookContests-color.png';




const { Header, Content, Footer, Sider } = Layout;



class LeftMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      role: "",
      collapsed: true,
      current: '1'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({
      current: e.key
    });
  }

  componentWillMount() {
    // var user ={}
    // user =  {
    //   permissions:{ 
    //     challenges:{
    //       status:true
    //     },
    //     fun2win:{
    //       status:true
    //     },
    //     fanClubs:{
    //       status:true
    //     },
    //     coupons:{status:true},
    //     notifications: {status:true},
    //     curator:{status:true},
    //     pinCeleb:{status:true}
    //   }
    // }
    var user = JSON.parse(sessionStorage.getItem('user'));
    console.log("userdata in left menu",user);
    if (user.permissions !== '') {
      //var key = user.role
      this.setState({ role: user.permissions })
    }  
  }



  render() {
    //  console.log("this.state in left menu",this.state);
    let href = window.location.href.split('/')
    href = href[3]
    const { sysReducer, dataReducer, dispatch } = this.props
    return (
      <div>
        <div className='logo'><img alt="example" width="100%" src={fkLogo} /></div>
        <Scrollbars style={{ height: '65vh', padding: '0px 10px' }}>
          <div className="scrollHidden12" style={{ padding: '0px 0px' }}>
            <Menu theme="dark" mode="inline" onClick={this.handleClick} defaultSelectedKeys={['/' + href]} selectedKeys={['/' + href]}>
              {this.state.role.challenges.status === true ?
                <Menu.Item key="/fankick">
                  <Icon> <img src={campaigns} style={{ 'vertical-align': 'middle' }} className="iconInactive" />
                    <img src={campaigns1} style={{ 'vertical-align': 'middle' }} className="iconActive" />
                  </Icon>
                  <span>Challenges</span>
                  <Link to="/fankick" className='item' activeClassName='active'>
                  </Link>
                </Menu.Item>
                : null}
              {this.state.role.fun2win.status === true ? <Menu.Item key="/fun2WinRedefinedpage">
                <Icon> <img src={fun2winNew} style={{ 'vertical-align': 'middle' }} className="iconInactive" /><img src={fun2win2} className="iconActive" style={{ 'vertical-align': 'middle' }} /></Icon>
                <span>Fun2Win</span>
                <Link to="/fun2WinRedefinedpage" className='item' activeClassName='active'> </Link>
              </Menu.Item> : null}
              {/* {this.state.role.fun2win.status === true ?
              <Menu.Item key="/fun2win">
                <Icon> <img src={fun2win} style={{ 'vertical-align': 'middle' }} className="iconInactive" /><img src={fun2win1} className="iconActive" style={{ 'vertical-align': 'middle' }} /></Icon>
                <span>Fun 2 Win</span>
                <Link to="/fun2win/fun2Winpage" className='item' activeClassName='active'> </Link>
              </Menu.Item>
              : null} */}
              {/* {this.state.role.fanCoins.status === true ?
              <Menu.Item key="/fancoins">
                <Icon> <img src={fancoins} style={{ 'vertical-align': 'middle' }} className="iconInactive" /><img src={fancoins1} className="iconActive" style={{ 'vertical-align': 'middle' }} /></Icon>
                <span>Fan Coins</span>
                <Link to="/fancoins" className='item' activeClassName='active'></Link>
              </Menu.Item>
  : null}  */}
              {this.state.role.fanClubs.status === true ?
                <Menu.Item key="/fan-clubs">
                  <Icon> <img src={fanclubs} style={{ 'vertical-align': 'middle' }} className="iconInactive" />
                    <img src={fanclubs1} style={{ 'vertical-align': 'middle' }} className="iconActive" /></Icon>
                  <span>Fan Clubs</span>
                  <Link to="/fan-clubs" className='item' activeClassName='active'></Link>
                </Menu.Item>
                : null}
              {/* <Menu.Item key="5">
            <Icon> <img src={fom} style={{ 'vertical-align': 'middle' }} /></Icon>
            <span>Fan Of The Month</span>
          </Menu.Item> */}
              {this.state.role.coupons.status === true ?
                <Menu.Item key="/allcoupons">
                  <Icon> <img src={coupons} style={{ 'vertical-align': 'middle' }} className="iconInactive" />
                    <img src={coupons1} style={{ 'vertical-align': 'middle' }} className="iconActive" /></Icon>
                  <span>Coupons</span>
                  <Link to="/allcoupons" className='item' activeClassName='active'></Link>
                </Menu.Item>
                : null}
              {this.state.role.notifications.status === true ?
                <Menu.Item key="/push-notifications">
                  <Icon> <img src={notifications} style={{ 'vertical-align': 'middle' }} className="iconInactive" />
                    <img src={notifications1} style={{ 'vertical-align': 'middle' }} className="iconActive" /></Icon>
                  <span>Notifications</span>
                  <Link to="/push-notifications" className='item' activeClassName='active'></Link>
                </Menu.Item>
                : null}
              {/* {this.state.role.funClubs.status === true ?
                <Menu.Item key="/fun-clubs">
                  <Icon> <img src={funclubs} style={{ 'vertical-align': 'middle' }} className="iconInactive" />
                    <img src={funclubs1} style={{ 'vertical-align': 'middle' }} className="iconActive" /></Icon>
                  <span>Fun clubs</span>
                  <Link to="/fun-clubs" className='item' activeClassName='active'></Link>
                </Menu.Item>
                : null} */}
              {this.state.role.pinCeleb.status === true ?
                <Menu.Item key="/celebritydata">
                  <Icon> <img src={Celebrity} className="iconInactive IconMiddle" />
                    <img src={Celebrity1} className="iconActive IconMiddle" /></Icon>
                  <span>Celebrity</span>
                  <Link to="/celebritydata" className='item' activeClassName='active'></Link>
                </Menu.Item>
                : null}
              {/* <Menu.Item key="/crudDashboard">
                <Icon> <img src={Crudicon} className="iconInactive IconMiddle" />
                  <img src={CrudColor} className="iconActive IconMiddle" /></Icon>
                <span>CRUD </span>
                <Link to="/crudDashboard" className='item' activeClassName='active'></Link>
              </Menu.Item> */}

              {/*  {this.state.role.pinCeleb.status === true ? 
              <Menu.Item key="/WebliveChallenge">
              <Icon> <img src={Celebrity}  className="iconInactive IconMiddle" />
                <img src={Celebrity1}  className="iconActive IconMiddle" /></Icon>
              <span>Livechallenge</span>
              <Link to="/WebliveChallenge" className='item' activeClassName='active'></Link>
            </Menu.Item>
            :null} */}

              <Menu.Item key="/SocialMedia">
                <Icon> <img src={Socialmedia} style={{ 'vertical-align': 'middle' }} className="iconInactive" /><img src={SocialmediaColor} className="iconActive" style={{ 'vertical-align': 'middle' }} /></Icon>
                <span>SocialPosts</span>
                <Link to="/SocialMedia" className='item' activeClassName='active'> </Link>
              </Menu.Item>





              <Menu.Item key="/SocialMediaDashboard">
                <Icon> <img src={FacebookContests} style={{ 'vertical-align': 'middle' }} className="iconInactive" /><img src={FacebookContestsColor} className="iconActive" style={{ 'vertical-align': 'middle' }} /></Icon>
                <span>SocialMedia</span>
                <Link to="/SocialMediaDashboard" className='item' activeClassName='active'> </Link>
              </Menu.Item>



              {this.state.role.curator === true ?
                <Menu.Item key="/Curation">
                  <Icon> <img src={ContentCur} className="iconInactive IconMiddle" />
                    <img src={Content1} className="iconActive IconMiddle" /></Icon>
                  <span>Curator</span>
                  <Link to="/Curation" className='item' activeClassName='active'></Link>
                </Menu.Item> : null}

              {this.state.role.curator === true ?
                <Menu.Item key="/newcontentcurator">
                  <Icon> <img src={ContentCur} className="iconInactive IconMiddle" />
                    <img src={Content1} className="iconActive IconMiddle" /></Icon>
                  <span>NewCurator</span>
                  <Link to="/newcontentcurator" className='item' activeClassName='active'></Link>
                </Menu.Item>
                : null}

            </Menu>
          </div>
        </Scrollbars>


      </div>
    );
  }

};


export default LeftMenu;
/* eslint-disable */