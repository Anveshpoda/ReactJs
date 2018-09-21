/* eslint-disable */
import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Button} from 'antd';
import classnames from 'classnames';
import Dashboard from '../Dashboard/Dashboard';
import UpComingElectionDashboard from './UpComingElectionDashboard';

class UpComingElection extends React.Component {
    render() {
        return (
            <Dashboard>
                <div>
                    <Row>
                        <Col span={24} className='challengesmenu'>
                            <div className="SubMenu">
                                <Col span={10}><h2 className="pageTitle">Polling</h2></Col>
                                <Col span={14}>
                                    <nav className='challengesnavigation' role="navigation" className="RghtAlign">
                                        <Link to="/ElectioMain" className='item challengenav' activeClassName='active'>Completed</Link>
                                          <Link to="/ElectioMain/RunningElection" className='item challengenav' activeClassName='active'>Running</Link>
                            <Link to="/ElectioMain/UpComingElection" className='item challengenav' activeClassName='active'>UpComing</Link>
                            <Link to="/ElectioMain/NewCreateElection"> <Button type="primary" className='createBtn mrgLeft30'>Create New Poll</Button></Link>       

                                        {/* <Link to="/ElectioMain/elections"> <Button type="primary" className='createBtn mrgLeft30'>Create New Poll</Button></Link> */}
                                    </nav>
                                </Col>
                            </div>
                        </Col>
                    </Row>
                    <Row>

                        <UpComingElectionDashboard/>

                    </Row>
                </div>
            </Dashboard>

        );
    }
}

export default UpComingElection;
/* eslint-disable */