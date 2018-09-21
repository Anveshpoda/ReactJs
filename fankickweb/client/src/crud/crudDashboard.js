import React from 'react';
import Dashboard from '../Dashboard/Dashboard';
import  './crudstyles.css';
import Movies from './Movies';
import SportsMatch from './SportsMatch';
import Event from './Event';
import Brand from './Brand';

import { Link } from 'react-router';
import { Button, Tabs, Col, Row } from 'antd';
const TabPane = Tabs.TabPane;


function callback(key) {
  console.log(key);
}
class crudDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
     this.disableTab = this.disableTab.bind(this);
  }



    disableTab(event){  
    if(event.keyCode === 0 || event.keyCode === 9) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  componentDidMount(){
    document.addEventListener("keydown", this.disableTab, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.disableTab, false);
  }




  render() {

    return (
      <Dashboard>
        <div classNames="container">
          <Row>
            <Col span={24} className="Crudmenu">
              <div className="ElectionsSubMenu">
                <div className="SubMenu">
                  <Col span={10}><h2 className="pageTitle">Manage Data Items</h2></Col>
                  <Col span={14}>
                    <Link to="/crudDashboard/Createdata"><Button type="primary" className='createBtn mrgLeft30'>Create Data Item</Button></Link>
                  </Col>
                </div>
              </div>
            </Col>
          </Row>


          <div className="Crudsubmenu">
            <Row>
              <Col span={24} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <Tabs defaultActiveKey="1" onChange={callback} className="ThemeBgTabs">
                  <TabPane tab="Movies" key="1"><Movies /></TabPane>
                  <TabPane tab="Sports Match" key="2"><SportsMatch /></TabPane>
                  <TabPane tab="Event" key="3"><Event /></TabPane>
                  <TabPane tab="Brand" key="4"><Brand /></TabPane>
                </Tabs>

              </Col>

            </Row>
          </div>


        </div>
      </Dashboard>
    );
  };
}


export default crudDashboard;