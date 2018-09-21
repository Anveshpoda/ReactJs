/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import moment from 'moment';
import { Col, Button, Card, Dropdown, Icon, Popconfirm, Menu, Modal } from 'antd';
import classnames from 'classnames';
import $ from 'jquery';
import axios from 'axios';
import clone from 'clone';
import RichTextEditor from 'react-rte';
import { Scrollbars } from 'react-custom-scrollbars';
import amitabh1 from '../images/amitabh1.jpg';
import Placeholder from '../images/placeholder.png';
const dateFormat = 'MMMM Do YYYY, h:mm:ss a';
class ElectionDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            currentPage: 1,
            todosPerPage: 12,
            loading: false,
            visible: false,
            disable: true,
            viewdata: {},
            contestoptions: {},
            value: RichTextEditor.createEmptyValue(),
            readOnly: true,
        }
    }
    componentDidMount() {
        //  console.log("completed called srvice")
        this.getContests();
    }
    getContests = () => {
        axios.get(process.env.REACT_APP_API_HOST + '/rest/optionPollsWeb', {
            headers: {
                "x-access-token": sessionStorage.token,
            },
        })
            .then(function (response) {
                // console.log("reposne in dash", response.data.data);
                var hhh = response.data.data
                var contentPack = [];
                // console.log("new Date().getTime()",new Date().getTime())
                for (let key in hhh) {
                    var keyObj = hhh[key];
                    //  console.log("new Date(keyObj.pollEndDateTime).getTime()",new Date(keyObj.pollEndDateTime).getTime())
                    if (new Date(keyObj.pollEndDateTime).getTime() < new Date().getTime()) {
                        contentPack.push(keyObj);
                    }
                }
                // console.log("content pack", contentPack);
                this.setState({ data: contentPack })
                $("#pagenumberLi li:first-child").addClass("activeLi");
            }.bind(this))
            .catch(function (error) {
                // console.log(error);
            });

    }
    handleClick = (event) => {
        var num2 = Number(event.target.id)
        $("li").removeClass("activeLi");
        $("#" + num2).addClass("activeLi");
        this.setState({
            currentPage: Number(event.target.id)
        });
    }
    showModal = (e) => {
        var id = e.target.id
        axios.get(process.env.REACT_APP_API_HOST + '/rest/optionPollingById?pollId=' + id, {
            headers: {
                "x-access-token": sessionStorage.token,
            },
        })
            .then(function (response) {
                //  console.log("data", response.data.data)
                this.setState({ viewdata: response.data.data });
                this.setState({ contestoptions: response.data.data.contentOptions })
            }.bind(this))
            .catch(function (error) {
                // console.log(error);
            });
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        //  console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        // console.log(e);
        this.setState({
            visible: false,
        });
    }
    render() {
        const viewdata = this.state.viewdata;
        const contestoptions = this.state.contestoptions;
        const { currentPage, todosPerPage } = this.state;
        const data = clone(this.state.data);
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = data.slice(indexOfFirstTodo, indexOfLastTodo);
        const renderTodos = currentTodos.map((contest, index) => {
            var d = contest.pollStartDateTime;
            var newd = new Date(d).toLocaleString();
            // var newd = moment.parseZone(d).format("MMMM Do YYYY hh-mm-ss a");
            var startdd = newd;
            var d1 = contest.pollEndDateTime;
            var newd1 = new Date(d1).toLocaleString()
            //var newd1 = moment.parseZone(d1).format("MMMM Do YYYY hh-mm-ss a");
            var enddd = newd1;
            return (
                <li key={index}>
                    <div>
                        <Col xs={12} sm={12} xl={4} lg={6} md={6}>
                            <Card>
                                <div className="image">
                                    <figure>
                                        <img  className="Boximage challengesmaincardImage" src={contest.pollImageUrl != '' ? contest.pollImageUrl : amitabh1} id={contest.pollId} onClick={this.showModal} alt="Contest Cover" width='100%' height='175px' />

                                    </figure>

                                    <h4 className="pollingMatchNo">Match No: {contest.pollDescription}</h4>
                                    {contest.type == "image" ? <div className="OpitonsinPolling">
                                        <ul className="list-inline">
                                            <li>
                                                <img className="polloption1image" src={contest.option1.optionImage} alt="contestcover" />
                                            </li>
                                            <li style={{ padding: '0px 15px', marginTop: '-5px' }}>
                                                <h4> vs</h4>
                                            </li>
                                            <li>
                                                <img className="polloption2image" src={contest.option2.optionImage} alt="contestcover" />
                                            </li>
                                        </ul>
                                    </div> : null}
                                </div>
                                <div className="cardContent">
                                    <ul>
                                        <li><h4 className="Polling-Title" >{contest.pollTitle}</h4></li>
                                        <li className="ElectionPollSubtext1">
                                            <h5><span className="ElectionPollSubtext">Start Time:</span> <span className="PollStartDate">{startdd}</span></h5>
                                            <h5><span className="ElectionPollSubtext">End Time:</span> <span className="PollStartDate">{enddd}</span></h5>
                                        </li>
                                        {/*li className="ElectionPollSubtext1">
                                            <h5><span className="ElectionPollSubtext">optionOne:</span> <span className="PollStartoption">{contest.option1.option}</span></h5>
                                            <h5><span className="ElectionPollSubtext">optionTwo:</span> <span className="PollStartoption">{contest.option2.option}</span></h5>

                                        </li>
                                        <li className="ElectionPollSubtext1" title={contest.pollId}>
                                            <h5 className="PolligUniquenumber"><span className="ElectionPollSubtext">UniqueNumber:</span> <span className="PollStartDate">{contest.pollId}</span></h5>
                                        </li>*/}
                                    </ul>
                                </div>
                                <div className="cardFooter">
                                    <ul className="list-inline">
                                        <li style={{ color: 'orange' }}><b>Completed</b></li>
                                        <li className="floatRight">
                                            <Dropdown getPopupContainer={triggerNode => triggerNode.parentNode} overlay={<Menu>
                                                <Menu.Item key="1">
                                                    <a id={contest.pollId} onClick={this.showModal}>View Details</a>
                                                </Menu.Item>

                                            </Menu>} trigger={['click']}>
                                                <a className="ant-dropdown-link" href="">
                                                    <span className="viewMore"><Icon type="ellipsis" /></span>
                                                </a>

                                            </Dropdown>

                                        </li>
                                    </ul>
                                </div>
                            </Card>
                        </Col>
                    </div>
                </li>)
        });
        const pageNumbers = [];
        if (data.length > 12) {
            for (let i = 1; i <= Math.ceil(data.length / todosPerPage); i++) {
                pageNumbers.push(i);
            }
        }
        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    onChange={this.Change}
                    key={number}
                    id={number}
                    onClick={this.handleClick}

                    >
                    {number}
                </li>
            );
        });
        if (currentTodos.length === 0) {
            return (
                <div >
                    <div style={{ paddingLeft: 15 }} className="placeholderImages">
                        <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
                        <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
                        <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
                        <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
                        <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
                        <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
                        <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
                        <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
                        <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
                        <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
                        <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
                        <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <ul>
                        {renderTodos}
                    </ul>
                    <div className="clear"></div>
                    <ul id="pagenumberLi" className="list-inline">
                        {renderPageNumbers}
                    </ul>
                    <div>
                        <Modal className="PollingModals"
                            title={viewdata.pollTitle}
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            >
                            <div>
                                <Scrollbars style={{ height: '60vh', padding: '0px 10px' }}>
                                    <div className="PollingsModalbody">
                                        <Col span={24}>

                                            <div className="PollBanner-image">
                                                <figure>
                                                    <img className="challengesmaincardImage" src={viewdata.pollImageUrl != '' ? viewdata.pollImageUrl : amitabh1} alt="Contest Cover" width='100%' height='250px' />
                                                </figure>
                                                {viewdata.type == "image" ? <div className="OpitonsinhsPolling">
                                                    <ul className="list-inline">
                                                        <li>
                                                            <img className="polloption1modalimage " src={viewdata.option1 != undefined ? viewdata.option1.optionImage : null} alt="contestcover" />
                                                        </li>
                                                        <li style={{ padding: '0px 15px', marginTop: '10px' }}>
                                                            <h2> vs</h2>
                                                        </li>
                                                        <li>
                                                            <img className="polloption2modalimage " src={viewdata.option2 != undefined ? viewdata.option2.optionImage : null} alt="contestcover" />
                                                        </li>
                                                    </ul>
                                                </div> : null}

                                                <h5 className="Pollingshmatchno"><span>Match No:</span> <span> {viewdata.pollDescription} </span></h5>
                                            </div>
                                        </Col>
                                        <Col span={24} className="pollmoadltype">
                                            <Col span={6}>
                                                <div>
                                                    <h4>Poll Type</h4>
                                                    <p> {viewdata.type != '' ? viewdata.type : null}</p>

                                                    {/*  <p><span>Poll Caption:</span> <span>{viewdata.pollCaption != '' ? viewdata.pollCaption : null}</span></p>*/}
                                                </div>
                                            </Col>
                                            <Col span={18}>
                                                <div className="PollMatchsUniqueno">
                                                    <h4>Unque No</h4>
                                                    <p>{viewdata._id}</p>

                                                </div>
                                            </Col>
                                        </Col>
                                        <Col span={24} className="pollmoadltype">
                                            <Col span={6}>
                                                <h4>Poll Contest</h4>
                                                <p>{viewdata.pollType != '' ? viewdata.pollType : null}</p>

                                            </Col>
                                        </Col>
                                        <Col span={24}>
                                            <div className="PollMatchstimming">
                                                <Col span={6}>
                                                    <h4>Start Time</h4>
                                                    <p> <span className="PollStartDate">{viewdata.pollStartDateTime != '' ? viewdata.pollStartDateTime : null}</span></p>

                                                </Col>
                                                <Col span={6} offset={2} className="PoolmodalEndsTime">
                                                    <h4>End Time</h4>
                                                    <p><span className="PollStartDate">{viewdata.pollEndDateTime != '' ? viewdata.pollEndDateTime : null}</span></p>
                                                </Col>
                                            </div>
                                        </Col>
                                        <Col span={24}>
                                            <Col span={6}>
                                                <div>
                                                    <h4>Winners Count</h4>
                                                    <p>{viewdata.winnersCount != '' ? viewdata.winnersCount : null}</p>

                                                </div>
                                            </Col>
                                        </Col>
                                        <Col span={24}>

                                            <div className="Pollmatchsoptns">

                                                <Col span={6} className="ViewDatapollOptionss">
                                                    <h4>Option 1</h4><p> {viewdata.option1 != undefined ? viewdata.option1.option : null}</p>
                                                </Col>

                                                <Col span={6} offset={2} className="ViewDatapollOptionss">
                                                    <h4>Option 2</h4>
                                                    <p>{viewdata.option2 != undefined ? viewdata.option2.option : null}</p>
                                                </Col>

                                            </div>
                                        </Col>

                                        <Col span={24} className="ViewCtable">

                                            <ul className="list-inline viewheaderPolltable">
                                                <li className="ant-col-7">
                                                    Status</li>
                                                <li className="ant-col-8">Title</li>
                                                <li className="ant-col-9">Caption</li>
                                            </ul>
                                            <ul className="list-inline viewPolldatatable">
                                                <li className="ant-col-7">
                                                    Poll Yet To Start
                                     </li>
                                                <li className="ant-col-8">
                                                    {contestoptions.toStart != undefined ? contestoptions.toStart.pTitle : null}
                                                </li>
                                                <li className="ant-col-9">
                                                    {contestoptions.toStart != undefined ? contestoptions.toStart.pCaption : null}
                                                </li>

                                            </ul>

                                            <ul className="list-inline viewPolldatatable">
                                                <li className="ant-col-7">
                                                    Poll Started participated
                                     </li>
                                                <li className="ant-col-8">
                                                    {contestoptions.startedNparticipated != undefined ? contestoptions.startedNparticipated.pTitle : null}
                                                </li>
                                                <li className="ant-col-9">
                                                    {contestoptions.startedNparticipated != undefined ? contestoptions.startedNparticipated.pCaption : null}
                                                </li>

                                            </ul>
                                            <ul className="list-inline viewPolldatatable">
                                                <li className="ant-col-7">
                                                    Poll Started Not participated
                                     </li>
                                                <li className="ant-col-8">
                                                    {contestoptions.startedNotParticipated != undefined ? contestoptions.startedNotParticipated.pTitle : null}
                                                </li>
                                                <li className="ant-col-9">
                                                    {contestoptions.startedNotParticipated != undefined ? contestoptions.startedNotParticipated.pCaption : null}
                                                </li>

                                            </ul>



                                            <ul className="list-inline viewPolldatatable">
                                                <li className="ant-col-7">
                                                    Poll Ended after participating
                                     </li>
                                                <li className="ant-col-8">
                                                    {contestoptions.endedNparticipated != undefined ? contestoptions.endedNparticipated.pTitle : null}
                                                </li>
                                                <li className="ant-col-9">
                                                    {contestoptions.endedNparticipated != undefined ? contestoptions.endedNparticipated.pCaption : null}
                                                </li>

                                            </ul>
                                            <ul className="list-inline viewPolldatatable">
                                                <li className="ant-col-7">
                                                    Poll Ended Without Participating
                                     </li>
                                                <li className="ant-col-8">
                                                    {contestoptions.endedNotParticipated != undefined ? contestoptions.endedNotParticipated.pTitle : null}
                                                </li>
                                                <li className="ant-col-9">
                                                    {contestoptions.endedNotParticipated != undefined ? contestoptions.endedNotParticipated.pCaption : null}
                                                </li>

                                            </ul>
                                            <ul className="list-inline viewPolldatatable">
                                                <li className="ant-col-7">
                                                    Poll Winners Declared
                                     </li>
                                                <li className="ant-col-8">
                                                    {contestoptions.winnersDeclared != undefined ? contestoptions.winnersDeclared.pTitle : null}
                                                </li>
                                                <li className="ant-col-9">
                                                    {contestoptions.winnersDeclared != undefined ? contestoptions.winnersDeclared.pCaption : null}
                                                </li>

                                            </ul>

                                        </Col>

                                        <Col span={24}>

                                        </Col>


                                        <Col span={24}>
                                            <div>
                                                <h3>Terms & Conditions</h3>
                                                <RichTextEditor
                                                    value={this.state.value}
                                                    readOnly={this.state.readOnly}
                                                    />

                                                {/*   <p>{viewdata.termsAndConditions != '' ? viewdata.termsAndConditions : null}</p>*/}
                                            </div>
                                        </Col>
                                    </div>
                                </Scrollbars>


                            </div>
                        </Modal>
                    </div>
                </div>
            );
        }
    }
}
export default ElectionDashboard;
/* eslint-disable */