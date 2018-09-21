/* eslint-disable */
import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Button, Select } from 'antd';
import classnames from 'classnames';
import Dashboard from '../Dashboard/Dashboard';
//import ElectionDashboard from './ElectionDashboard';
import NewElectiondashboard from './NewElectiondashboard';
const Option = Select.Option;

function handleChange(value) {
    console.log(`selected ${value}`);
}


class Polling extends React.Component {
    render() {
        return (
            <Dashboard>
                <div>
                    <Row>
                        <Col span={24} className='challengesmenu'>
                            <div className="SubMenu">
                                <Col span={2}><h2 className="pollingpageTitle">Polling</h2></Col>
                                <Col span={3} lg={{span:4}} xl={{span:3}}  className="PollSeleccat">
                                    <Select className="PollingSeleccat" placeholder="Select Category" style={{ width: '100% ' }}
                                        getPopupContainer={triggerNode => triggerNode.parentNode}
                                        onChange={handleChange}>
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="disabled" disabled>Disabled</Option>
                                        <Option value="Yiminghe">yiminghe</Option>
                                    </Select>

                                </Col>
                                <Col span={3} lg={{span:4}} xl={{span:3}}  className="PollSeleccat">
                                    <Select className="PollingSeleccat" placeholder="Select SubCategory" style={{ width: '100% ' }}
                                        getPopupContainer={triggerNode => triggerNode.parentNode}
                                        onChange={handleChange}>
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="disabled" disabled>Disabled</Option>
                                        <Option value="Yiminghe">yiminghe</Option>
                                    </Select>

                                </Col>
                                <Col span={3} lg={{span:4}} xl={{span:3}}  className="PollSeleccat">
                                    <Select className="PollingSeleccat" placeholder="Select Celebrity" style={{ width: '100% ' }}
                                        getPopupContainer={triggerNode => triggerNode.parentNode}
                                        onChange={handleChange}>
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="disabled" disabled>Disabled</Option>
                                        <Option value="Yiminghe">yiminghe</Option>
                                    </Select>

                                </Col>
                                <Col span={11} lg={{span:9}} xl={{span:11}}  className="pollssubmainnav">
                                    <nav className='pollingnav RghtAlign' role="navigation" >
                                        {/* <Link to="/ElectioMain" className='item challengenav' activeClassName='active'>Completed</Link> */}
                                        <Link to="/Polling" className='item challengenav' activeClassName='active'>Completed</Link>
                                        <Link to="/Polling/RunningElection" className='item challengenav' activeClassName='active'>Running</Link>
                                        <Link to="/Polling/UpComingElection" className='item challengenav' activeClassName='active'>UpComing</Link>

                                        <Link to="/Polling/CreateNewElection"> <Button type="primary" className='createBtnchalleng mrgLeft30'>Create Poll</Button></Link>
                                        {/* <Link to="/ElectioMain/NewCreateElection"> <Button type="primary" className='createBtn mrgLeft30'>Create New Poll</Button></Link> */}
                                        {/* <Link to="/ElectioMain/elections"> <Button type="primary" className='createBtn mrgLeft30'>Create New Poll</Button></Link> */}
                                    </nav>
                                </Col>
                            </div>
                        </Col>
                        <Col span={24} className="Pollingsecmenu">
                            <Col span={3} className="PollSeleccat">
                                <Select className="PollingSeleccat" placeholder="Order By" style={{ width: '100% ' }}
                                    getPopupContainer={triggerNode => triggerNode.parentNode}
                                    onChange={handleChange}>
                                    <Option value="jack">Date</Option>
                                    <Option value="lucy">Location</Option>
                                </Select>

                            </Col>
                        </Col>
                    </Row>
                    <Row>

                        <NewElectiondashboard />

                    </Row>
                </div>
            </Dashboard>

        );
    }
}

export default Polling;
/* eslint-disable */