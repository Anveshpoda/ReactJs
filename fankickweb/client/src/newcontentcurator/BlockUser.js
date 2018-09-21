import React from 'react';
import Dashboard from '../Dashboard/Dashboard';
import { Link } from 'react-router';
import { Col, Row, Button, Modal, Icon, Tabs, Select, Table, Input, Upload, message } from 'antd';
import './Newcontentcurator.css';
import amitabh1 from '../images/amitabh1.jpg';
const TabPane = Tabs.TabPane;
function callback(key) {
    console.log(key);
}

class BlockUser extends React.Component {
    state = {
        visible: false,
        disable: true

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


        showModal14 = () => {
        this.setState({
            visible14: true,
        });
    }

    handleOk14 = (e) => {
        console.log(e);
        this.setState({
            visible14: false,
        });
    }

    handleCancel14 = (e) => {
        console.log(e);
        this.setState({
            visible14: false,
        });
    }





    render() {
        const columns = [{
            title: 'User',
            dataIndex: 'user',
            key: 'user',
            render: text => <div>
                <ul className="list-inline">
                    <li>
                        <span><img src={amitabh1} alt="contest-cover" className="BlockUserProfile" /> </span>
                    </li>
                    <li className="BlockuserprofName">
                        <span>Harshavardan</span>
                    </li>
                </ul>
            </div>,
        }, {
            title: 'Junk',
            dataIndex: 'junk',
            key: 'junk',
        }, {
            title: 'Spam',
            dataIndex: 'spam',
            key: 'spam',
        }, {
            title: 'Abusive',
            key: 'abusive',
            dataIndex: 'abusive',
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button type="primary" onClick={this.showModal}>Block</Button>
                </span>
            ),
        }];

        const data = [{
            key: '1',
            user: 'John Brown',
            junk: 32,
            spam: 20,
            abusive: 10,
        }, {
            key: '2',
            user: 'Jim Green',
            junk: 32,
            spam: 20,
            abusive: 10,
        }, {
            key: '3',
            user: 'Joe Black',
            junk: 32,
            spam: 20,
            abusive: 10,
        }];

        const columns14 = [{
            title: 'User',
            dataIndex: 'user',
            key: 'user',
            render: text => <div>
                <ul className="list-inline">
                    <li>
                        <span><img src={amitabh1} alt="contest-cover" className="BlockUserProfile" /> </span>
                    </li>
                    <li className="BlockuserprofName">
                        <span>Harshavardan</span>
                    </li>
                </ul>
            </div>,
        }, {
            title: 'Junk',
            dataIndex: 'junk',
            key: 'junk',
        }, {
            title: 'Spam',
            dataIndex: 'spam',
            key: 'spam',
        }, {
            title: 'Abusive',
            key: 'abusive',
            dataIndex: 'abusive',
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button type="primary" onClick={this.showModal14}>UN Block</Button>
                </span>
            ),
        }];

        const data14 = [{
            key: '1',
            user: 'John Brown',
            junk: 32,
            spam: 20,
            abusive: 10,
        }, {
            key: '2',
            user: 'Jim Green',
            junk: 32,
            spam: 20,
            abusive: 10,
        }, {
            key: '3',
            user: 'Joe Black',
            junk: 32,
            spam: 20,
            abusive: 10,
        }];



        return (
            <Dashboard>
                <div className="Block-user">
                    <Col span={24}>
                        <div className="topmenucontnet">
                            <Col span={3}>
                                <h2>Content Curator</h2>
                            </Col>
                            <Col span={8} className="curatorlibsubmenu">
                                <ul className="list-inline curatorlibray">
                                    <li>
                                        <div className="Contentlibbtn">
                                            <Link to="/newcontentcurator" ><Button type="primary">Back To Dashboard</Button></Link>
                                        </div>

                                    </li>

                                </ul>
                            </Col>
                        </div>
                    </Col>


                    <Col span={24}>
                        <div className="Curatorlibrarybody">
                            <Tabs defaultActiveKey="1" onChange={callback}>
                                <TabPane tab="User List" key="1">

                                    <Table columns={columns} dataSource={data} />
                                </TabPane>
                                <TabPane tab="Blocked Users List" key="2">
                                    <Table columns={columns14} dataSource={data14} />

                                </TabPane>
                            </Tabs>
                        </div>
                    </Col>


                    <div>

                        <Modal
                            title="Basic Modal"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            >
                            <p>Users Post Will be deleted permanently</p>
                          
                        </Modal>

                    </div>

                         <div>

                        <Modal
                            title="Basic Modal14"
                            visible={this.state.visible14}
                            onOk={this.handleOk14}
                            onCancel={this.handleCancel14}
                            >
                            <p>Do You Want to Un Block Users Posts?</p>
                           
                        </Modal>

                    </div>


                </div>
            </Dashboard>
        );
    }
}
export default BlockUser;
