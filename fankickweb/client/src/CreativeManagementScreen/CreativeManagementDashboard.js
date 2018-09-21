import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import './CreativeManagement.css';
import NBKSrinu from '../images/NBKSrinu.jpg';
import Balayya from '../images/Balayya.jpg';
import kirti from '../images/kirti.jpg';
import kirti2 from '../images/kirti2.jpg';
import dhanya from '../images/dhanya.jpg';
import Dashboard from '../Dashboard/Dashboard';
import UploadCreative from './UploadCreative.js';
import CreateChannel from './CreateChannel.js';

import { Icon, Card, Button, Modal, Col, Row, Dropdown,Menu } from 'antd';




const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="">Edit</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="">Delete</a>
    </Menu.Item>
  </Menu>
);

class CreativeManagementDashboard extends React.Component {
  state = {
    disable: true,
    visible: false,
    disable01: true,
    visible01: false

  }
  showModal01 = () => {
    this.setState({
      visible01: true,
    });
  }
  handleOk01 = (e) => {
    console.log(e);
    this.setState({
      visible01: false,
    });
  }
  handleCancel01 = (e) => {
    console.log(e);
    this.setState({
      visible01: false,
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }






  render() {

    return (

      <Dashboard>

        <div classNames="container">
        <Row>
            <Col span={24} className='CreativeManagementmenu'>
              <div className="SubMenuCreativeManagement">
                <Col span={10}><h2 className="pageTitle">Creatives Management</h2></Col>
                <Col span={14}>
                  <nav className='challengesnavigation RghtAlign'>


                    <Button type="primary" onClick={this.showModal} className='createBtn mrgLeft30'>Upload Creative</Button>
                  </nav>
                </Col>
              </div>
            </Col>
          </Row>


          <div className="">
            <div className="SubMenuCreativeManagementTab">
              <Row>
                <Col span={6} xl={{ span: 4 }}>
                  <ul>
                    <li className="CreativemSidechannelbar">
                      <div>
                        <ul className="list-inline">
                          <li>Top Channels</li>
                          <li> <Icon className="CreateiveAddplusicon" onClick={this.showModal01} type="plus" /><span className="NoChannelsCreativeM">6 </span></li>
                        </ul>

                      </div>
                    </li>
                    <li className="CreativemSidechannelbar">
                      <div>
                        <h4><span className="ChannelTitle">Amithab</span> <span className="creativeSideDrop"><Dropdown getPopupContainer={triggerNode => triggerNode.parentNode} overlay={menu} trigger={['click']}>
                          <a className="ant-dropdown-link" href="">
                            <span className="CreativeChannelEditDel"><Icon type="ellipsis" /></span>
                          </a>
                        </Dropdown></span></h4>
                      </div>
                    </li>
                    <li className="CreativemSidechannelbar">
                      <div>

                        <h4><span className="ChannelTitle">Sharuk </span>  <span className="creativeSideDrop"><Dropdown getPopupContainer={triggerNode => triggerNode.parentNode} overlay={menu} trigger={['click']}>
                          <a className="ant-dropdown-link" href="">
                            <span className="CreativeChannelEditDel"><Icon type="ellipsis" /></span>
                          </a>
                        </Dropdown></span></h4>
                      </div>
                    </li>
                    <li className="CreativemSidechannelbar">
                      <div>
                        <h4><span className="ChannelTitle">BalaKrishna</span>  <span className="creativeSideDrop"><Dropdown getPopupContainer={triggerNode => triggerNode.parentNode} overlay={menu} trigger={['click']}>
                          <a className="ant-dropdown-link" href="">
                            <span className="CreativeChannelEditDel"><Icon type="ellipsis" /></span>
                          </a>
                        </Dropdown></span></h4>
                      </div>
                    </li>
                    <li className="CreativemSidechannelbar">
                      <div>
                        <h4><span className="ChannelTitle">N.T.R</span> <span className="creativeSideDrop"><Dropdown getPopupContainer={triggerNode => triggerNode.parentNode} overlay={menu} trigger={['click']}>
                          <a className="ant-dropdown-link" href="">
                            <span className="CreativeChannelEditDel"><Icon type="ellipsis" /></span>
                          </a>
                        </Dropdown></span></h4>
                      </div>
                    </li>
                    <li className="CreativemSidechannelbar creativesidebarseemore">
                      <div>
                        <h4><span>See More </span></h4>
                      </div>
                    </li>
                  </ul>
                </Col>

                <Col span={18} xl={{ span: 19 }}>

                  <Col span={8} xl={{ span: 4 }}>
                    <Card bodyStyle={{ padding: 0 }} className="MainCardCmanagement">
                      <div className="contai">
                        <div className="">
                          <figure>
                            <img alt="example" className="CreativeManagDashimag" width="100%" height="230px" src={dhanya} />
                          </figure>
                          <div className="text">
                            <h4>Dhanya</h4>
                            <p><span>Tags :</span><span>Nenu sailaja , </span></p>

                          </div>
                        </div>
                        <div className="overlay">

                          <div className="CreativemEditDel">
                            <p className="CreativemanageIcons"><span>Edit</span><span><Icon className="CreativeMangaeEditIcon" type="edit" /></span></p>
                            <p className="CreativemanageIcons"><span>Delete</span><span><Icon type="delete" /></span></p>
                          </div>
                        </div>
                      </div>
                    </Card>

                  </Col>
                  <Col span={8} xl={{ span: 4 }}>
                    <Card bodyStyle={{ padding: 0 }} className="MainCardCmanagement">
                      <div className="contai">
                        <div className="">
                          <figure>
                            <img alt="example" className="CreativeManagDashimag" width="100%" height="230px" src={NBKSrinu} />
                          </figure>
                          <div className="text">
                            <h4>BalaKrishna</h4>
                            <p><span>Tags :</span><span>Legend , Simha</span></p>
                          </div>
                        </div>
                        <div className="overlay">

                          <div className="CreativemEditDel">
                            <p className="CreativemanageIcons"><span>Edit</span><span><Icon className="CreativeMangaeEditIcon" type="edit" /></span></p>
                            <p className="CreativemanageIcons"><span>Delete</span><span><Icon type="delete" /></span></p>
                          </div>
                        </div>
                      </div>
                    </Card>

                  </Col>
                  <Col span={8} xl={{ span: 4 }}>
                    <Card bodyStyle={{ padding: 0 }} className="MainCardCmanagement">
                      <div className="contai">
                        <div className="">
                          <figure>
                            <img alt="example" className="CreativeManagDashimag" width="100%" height="230px" src={Balayya} />
                          </figure>
                          <div className="text">
                            <h4>BalaKrishna</h4>
                            <p><span>Tags :</span><span>Legend , Simha </span></p>
                          </div>

                        </div>
                        <div className="overlay">

                          <div className="CreativemEditDel">
                            <p className="CreativemanageIcons"><span>Edit</span><span><Icon className="CreativeMangaeEditIcon" type="edit" /></span></p>
                            <p className="CreativemanageIcons"><span>Delete</span><span><Icon type="delete" /></span></p>
                          </div>
                        </div>
                      </div>
                    </Card>

                  </Col>

                  <Col span={8} xl={{ span: 4 }}>
                    <Card bodyStyle={{ padding: 0 }} className="MainCardCmanagement">
                      <div className="contai">
                        <div className="">
                          <figure>
                            <img alt="example" className="CreativeManagDashimag" width="100%" height="230px" src={kirti} />
                          </figure>
                          <div className="text">
                            <h4>Kirti Sanon</h4>
                            <p><span>Tags :</span><span>Dochaye </span></p>
                          </div>
                        </div>
                        <div className="overlay">

                          <div className="CreativemEditDel">
                            <p className="CreativemanageIcons"><span>Edit</span><span><Icon className="CreativeMangaeEditIcon" type="edit" /></span></p>
                            <p className="CreativemanageIcons"><span>Delete</span><span><Icon type="delete" /></span></p>
                          </div>
                        </div>
                      </div>
                    </Card>

                  </Col>

                  <Col span={8} xl={{ span: 4 }}>
                    <Card bodyStyle={{ padding: 0 }} className="MainCardCmanagement">
                      <div className="contai">
                        <div className="">
                          <figure>
                            <img alt="example" className="CreativeManagDashimag" width="100%" height="230px" src={kirti2} />
                          </figure>
                          <div className="text">
                            <h4>Kirti Sanon </h4>
                            <p><span>Tags :</span><span>Dochaye </span></p>
                          </div>
                        </div>
                        <div className="overlay">

                          <div className="CreativemEditDel">
                            <p className="CreativemanageIcons"><span>Edit</span><span><Icon className="CreativeMangaeEditIcon" type="edit" /></span></p>
                            <p className="CreativemanageIcons"><span>Delete</span><span><Icon type="delete" /></span></p>
                          </div>
                        </div>
                      </div>
                    </Card>

                  </Col>


                  {/*<Col span={24}>
         <h4>Seemore</h4>

           </Col>*/}

                </Col>

  </Row>
            </div>
          </div>
          <Modal className="UploadCreativeModal"

            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="back" type="primary" className="createBtn">Upload</Button>,
            ]}
            width='817'
            >
            <Scrollbars style={{ height: '65vh', padding: '0px 10px' }}>
              <div>
                <UploadCreative />
              </div>
            </Scrollbars>
          </Modal>

          <Modal className="UploadCreativeModal"
            visible={this.state.visible01}
            onOk={this.handleOk01}
            onCancel={this.handleCancel01}
            footer={<Button className="footbtn" style={{ marginRight: 8 }} type="primary" onClick={this.handleCancel}>CREATE</Button>}
            width='775px'
            >
            <div className="CrerateChannlmainmodal">
              <Scrollbars style={{ height: '35vh', padding: '0px 10px' }}>
                <div>
                  <CreateChannel />
                </div>
              </Scrollbars>
            </div>
          </Modal>
        </div>
      </Dashboard>

    );
  };
}


export default CreativeManagementDashboard;