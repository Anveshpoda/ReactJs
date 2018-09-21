/* eslint-disable */
import React from 'react';
import { Link } from 'react-router';
import css from './challenge.css';
import $ from "jquery";
import { Col, Button, Select } from 'antd';
import ContestPage from './ContestPage';
const Option = Select.Option;

function handleChange(value) {
    console.log(`selected ${value}`);
}



class Challenges extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            totalcontests: [],
            role: []
        }
    }
    componentDidMount() {
        $(".localIdentName-layout__leftMenu").show();
        $(".localIdentName-layout__rightMenu").show();
        $(".ant-layout-header").show();
        $(".ant-layout-footer").show();
    }
    componentWillMount() {

        var user = JSON.parse(sessionStorage.getItem('user'));

        if (user.permissions !== '') {

            this.setState({
                role: user.permissions.challenges
            })
        }

    }
    render() {
        return (
            <div>
                <Col span={24} className='challengesmenu'>
                    <div className="SubMenu">
                        <div className="challengessubconmenu">
                            <Col span={3} sm={{span:4}} lg={{span:3}} xl={{ span: 2 }}><h2 className="chalngpageTitle">MC Challenges</h2>
                            </Col>
                            <Col span={3} sm={{ span: 3 }} className="PollSeleccat">
                                <Select className="PollingSeleccat" placeholder="Select Category" style={{ width: '100% ' }}
                                    getPopupContainer={triggerNode => triggerNode.parentNode}
                                    onChange={handleChange}>
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="disabled" disabled>Disabled</Option>
                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>

                            </Col>
                            <Col span={3} sm={{ span: 3 }} className="PollSeleccat">
                                <Select className="PollingSeleccat" placeholder="Select SubCategory" style={{ width: '100% ' }}
                                    getPopupContainer={triggerNode => triggerNode.parentNode}
                                    onChange={handleChange}>
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="disabled" disabled>Disabled</Option>
                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>

                            </Col>
                            <Col span={3} sm={{ span: 3 }} className="PollSeleccat">
                                <Select className="PollingSeleccat" placeholder="Select Celebrity" style={{ width: '100% ' }}
                                    getPopupContainer={triggerNode => triggerNode.parentNode}
                                    onChange={handleChange}>
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="disabled" disabled>Disabled</Option>
                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>

                            </Col>


                        </div>
                        <Col span={9} lg={{ span: 9 }} sm={{ span: 10 }} xs={{ span: 10 }} className="challengessubnavcon">
                            <nav className='challengesnavigation12 RghtAlign' role="navigation">
                                <Link to="/fankick" className='item challengenav' activeClassName='active'>All</Link>
                                <Link to="/fankick/Running-challenge" className='item challengenav' activeClassName='active'>Live</Link>
                                <Link to="/fankick/Queued-challenge" className='item challengenav' activeClassName='active'>Upcoming</Link>
                                <Link to="/fankick/closed-challenge" type="primary" className='item challengenav' activeClassName='active'>Closed</Link>
                                {this.state.role.create === true ?
                                    <Link to="/fankick/create-challenge"> <Button type="primary" className='createBtnchalleng mrgLeft30'>Create New Challenge</Button></Link>
                                    : null}</nav>
                        </Col>

                    </div>
                </Col>
                <Col span={24} className="chlngssecondsubmenu">
                    <Col span={3} className="PollSeleccat">
                        <Select className="PollingSeleccat" placeholder="Order By" style={{ width: '100% ' }}
                            getPopupContainer={triggerNode => triggerNode.parentNode}
                            onChange={handleChange}>
                            <Option value="jack">Date</Option>
                            <Option value="lucy">Location</Option>
                        </Select>

                    </Col>

                </Col>
                <div>
                    <ContestPage />
                </div>
            </div>

        );

    }
}
export default (Challenges);
/* eslint-disable */