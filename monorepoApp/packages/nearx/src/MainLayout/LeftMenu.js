import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';


const SubMenu = Menu.SubMenu;

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
    // var user = JSON.parse(sessionStorage.getItem('user'));
    // if (user.permissions !== '') {
    //   this.setState({ role: user.permissions })
    // }
  }



  render() {
    //  console.log("this.state in left menu",this.state);
    let href = window.location.href.split('/')
    href = href[3]
    return (
      <div>


        <Menu theme="dark" mode="inline" onClick={this.handleClick} defaultSelectedKeys={['/' + href]} selectedKeys={['/' + href]}>

          <Menu.Item key="/home">
            <Icon type="home" />
            <span>Home</span>
            <Link to="/home" className='item' activeClassName='active'> </Link>
          </Menu.Item>
          <SubMenu key="giofence"
            title={<span>   <Icon type="setting" />  <span>Giofence</span>  <i className="icon icon-dasbhoard" /> </span>}>
            <Menu.Item key="/storegiofence">
              <Link to="/storegiofence" className='item' activeClassName='active'>
              <span>Store Giofence</span>

              </Link>
            </Menu.Item>
            <Menu.Item key="geo">
              <Link to="/geo">
              <span>Giofence</span>

              </Link>
            </Menu.Item>
            <Menu.Item key="main/dashboard/listing">
              <Link to="/main/dashboard/listing">
              <span>Beacons</span>

              </Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="analytis"
            title={<span>   <Icon type="appstore" />  <span>Analytis</span>  <i className="icon icon-dasbhoard" /> </span>}>
            <Menu.Item key="main/dashboard/crm">
              <Link to="/main/dashboard/crm">
              <span>Store Giofence</span>

              </Link>
            </Menu.Item>
            <Menu.Item key="main/dashboard/listing">
              <Link to="/main/dashboard/listing">
              <span>Giofence</span>

              </Link>
            </Menu.Item>
            <Menu.Item key="main/dashboard/listing">
              <Link to="/main/dashboard/listing">
              <span>Beacons</span>

              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="dashboard"
            title={<span>   <Icon type="setting" />  <span>settings</span>  <i className="icon icon-dasbhoard" /> </span>}>
            <Menu.Item key="main/dashboard/crm">
              <Link to="/main/dashboard/crm">
              <span>Store Giofence</span>

              </Link>
            </Menu.Item>
            <Menu.Item key="main/dashboard/listing">
              <Link to="/main/dashboard/listing">
              <span>Giofence</span>

              </Link>
            </Menu.Item>
            <Menu.Item key="main/dashboard/listing">
              <Link to="/main/dashboard/listing">
              <span>Beacons</span>

              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="/home1">
            <Icon type="video-camera" />
            <span>nav 2</span>
            <Link to="/home1" className='item' activeClassName='active'></Link>
          </Menu.Item>
        </Menu>





        {/* {this.state.role.challenges.status === true ?
                  <Menu.Item key="/fankick">
                    <Icon> <img src={campaigns} style={{ 'vertical-align': 'middle' }} className="iconInactive" />
                      <img src={campaigns1} style={{ 'vertical-align': 'middle' }} className="iconActive" />
                    </Icon>
                    <span>Challenges</span>
                    <Link to="/fankick" className='item' activeClassName='active'>
                    </Link>
                  </Menu.Item>
                  : null} */}


        {/* </Scrollbars> */}


      </div>
    );
  }

};


export default LeftMenu;