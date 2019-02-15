import React, { Component } from 'react';
import logo from './logo.svg';
import { Layout, Menu, Icon } from 'antd';
import MainLayout from './MainLayout/MainLayout'
import './App.css';

const { Header, Sider, Content } = Layout;

class Home1 extends Component {



  render() {
    return (

      <MainLayout>
        <Content className="content" style={{
          margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280, height: '100%',
        }} >
          Content
          </Content>


      </MainLayout>
    );
  }
}


export default Home1;
