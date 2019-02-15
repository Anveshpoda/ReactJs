import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import LeftMenu from './LeftMenu';
import { Scrollbars } from 'react-custom-scrollbars';
import logo from '../logo.svg';
import NavBar from './NavBar'
import 'antd/dist/antd.css';
import '../App.css';
import './Layout.css';

const { Header, Footer, Sider, Content } = Layout;

class MainLayout extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }


  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{ left: 0 }}>
          <div className="logoSpace ant-menu-item">
          <div className="logoSpace">
            {/* <div className='logo'><img alt="example" width="100%" src={logo} /></div> */}
            <Icon
              className="trigger anticon"
              style={{ fontSize: '20px'}}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            </div>
          </div>
          <LeftMenu />
        </Sider>

        <Layout style={{}}>
          <Header style={{ border:'1px solid #ccc', background: '#fff', padding: 0 }}>
            <NavBar/>
          </Header>

          <Content>
            <Scrollbars style={{ height: '80vh', background: '#f5f5f5' }}>

              <div style={{ padding: '10px 10px 10px 10px' }} className="container">

                {this.props.children}
              </div>
            </Scrollbars>
          </Content>

          <Footer className="layoutFooter"> 
            <span> Copyright © 2019 NearX. All Rights Reserved. </span>
          </Footer>

        </Layout>

        {/* <div className='rightMenuView' id="rightMenuView" style={{ width: '300px', background: 'white', 'borderRight': '1px solid #f0f0f0' }}>
          <Icon type="close" id="closerightMenuView" className='closerightMenuViewIcon' />
          <Profile ttt={ttt} />
          <UserDirectory />
          <ToDo />
          <Chat />
        </div>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{ right: 0 }} className='rightMenu'>
          <RightMenu />
        </Sider> */}


      </Layout>
    );
  }
}

MainLayout.propTypes = {
  children: MainLayout.array
};

export default MainLayout;
