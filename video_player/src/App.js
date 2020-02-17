import React, { Component } from 'react'
import "node_modules/video-react/dist/video-react.css"; 
import './css/App.css';
import Hedder from './Components/Hedder';
import { Row, Col, Tabs } from 'antd';
import { Player } from 'video-react';

const { TabPane } = Tabs;

const App = () => {
  return (
    <div>
      <Hedder />
      <div style={{ marginTop: 95 }}>
        <Row>
          <Col>
            <Player
              playsInline
              poster="/assets/poster.png"
              src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
            />
          </Col>
        </Row>
        {/* <Tabs tabBarStyle={{ textAlign: 'center' }} defaultActiveKey="1">
          <TabPane tab="List of Images" key="1">

            <List saveBtn={true} data={images} />
          </TabPane>
          <TabPane tab="My Images" key="2">
            <List saveBtn={false} data={savedImages} />
          </TabPane>
        </Tabs> */}
      </div>
    </div>
  )
}
export default App;