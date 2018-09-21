/* eslint-disable */
import React from 'react';
import Dashboard from '../Dashboard/Dashboard';
import { Col, Table, Icon, Form, Modal, Input, Pagination, Switch, Select, Tooltip, Button } from 'antd';
import ReactTooltip from 'react-tooltip'
import { Link } from 'react-router';
import moment from 'moment';
import classnames from 'classnames';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars';
import picture from '../images/picture.png';
import amitabh15 from '../images/amitabh15.jpg';
import css from './electionPolling.css';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
function handleChange(value) {
    console.log(`selected ${value}`);
}
class NewRunningElectionDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            disable: true,
            visible01: false,
            disable01: true,
            value: 1,
            offset: 0,
            limit: 10,
            completeddata: [],
            numOfPages: '',
            contentoptions: [],
            optionsarray: [],
            viewdata: [],
            typepollcheck: ''

        }
    }
    componentWillMount() {
        //  console.log("completed called srvice")
        this.getContests();
    }
    getContests = () => {
        var offset = this.state.offset;
        var limit = this.state.limit;
        axios.get(process.env.REACT_APP_API_HOST + '/rest/optionPollsWeb?' + 'type' + '=' + 'running' + '&' + "offset=" + offset + '&' + "limit=" + limit, {
            headers: {
                "x-access-token": sessionStorage.token,
            },
        })
            .then(function (response) {
                console.log("reposne in dash completed", response.data.data);
                console.log("pollcount", response.data.pollCount)
                if (response.data.data === undefined) {
                    this.setState({ numOfPages: '' });
                } else {
                    var responsenew = response.data.data
                    this.setState({ completeddata: responsenew, numOfPages: response.data.pollCount })
                }

            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });

    }
    showModal = (e) => {
        var id = e
        console.log("target id", id)
        axios.get(process.env.REACT_APP_API_HOST + '/rest/optionPollingById?pollId=' + id, {
            headers: {
                "x-access-token": sessionStorage.token,
            },
        })
            .then(function (response) {
                console.log("data for show modal running view", response.data.data)
                this.setState({ viewdata: response.data.data });
                this.setState({ contentoptions: response.data.data.contentOptions })
                this.setState({ optionsarray: response.data.data.options })
                this.setState({ typepollcheck: response.data.data.type })

            }.bind(this))
            .catch(function (error) {
                // console.log(error);
            });
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

    //------ Radios--------------//


    pageChange = (page, pageSize) => {
        console.log('page number', page);
        console.log('pageSize', pageSize);
        this.setState({ pagenumber: page })
        var offset = 0;
        var limit = 0;
        for (let i = 0; i <= page; i++) {
            console.log("i value", i);
            if (page === i) {
                offset = (i - 1) * 10;
                limit = (i - 1) * 10;
            }
        }
        var newoffset = offset + this.state.offset
        var newlimit = limit + this.state.limit
        console.log("after seting limit and offset", newoffset, newlimit);
        axios.get(process.env.REACT_APP_API_HOST + '/rest/optionPollsWeb?' + 'type' + '=' + 'running' + '&' + "offset=" + newoffset + '&' + "limit=" + newlimit, {
            headers: {
                "x-access-token": sessionStorage.token,
            },
        })

            .then(function (response) {
                console.log("Fun2Win responce data on pagination", response.data.data)
                const hhh = response.data.data;
                this.setState({ completeddata: hhh });

            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        const { completeddata, viewdata, contentoptions, optionsarray } = this.state;
        var totalpages = this.state.numOfPages * 10;
        const columns = [{
            title: 'Date',
            dataIndex: 'Date',
            key: 'Date',
        }, {
            title: 'Poll Type',
            dataIndex: 'PollType',
            key: 'PollType',

        }, {
            title: 'Option Count',
            dataIndex: 'OptionCount',
            key: 'OptionCount',
        },
        {
            title: 'Title',
            dataIndex: 'PollTitle',
            key: 'PollTitle',
        },
        {
            title: 'Location',
            dataIndex: 'Location',
            key: 'Location',
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            key: 'action',

        }];


        const data = [];
        completeddata.length === 0 ? null : completeddata.map((item, index) => {
            data.push({
                key: item.pollId,
                Date: moment(item.pollCreatedDate).format('YYYY-MM-DD'),
                PollType: item.type,
                OptionCount: item.options.length,
                PollTitle: item.pollTitle,

                Location: item.location,
                Action: <div><span className="PolliunderViewrunn">
                    <a onClick={this.showModal.bind(this, item.pollId)}>ViewDetails</a>
                </span></div>
            })

        })

        var myObj = viewdata;
        var tags = ''
        var loclist = ''
        if (isEmpty(myObj)) {
        } else {
            tags = viewdata.pollTags.join(',');
            loclist = viewdata.location.join(',');
        }



        var pairnames = ''
        if (this.state.typepollcheck === "pair") {
            pairnames = optionsarray[0].option.split(',')
        }
        console.log("pairnames running", pairnames)
        var pairnameslist = ''
        if (this.state.typepollcheck === "pair") {
            pairnameslist = optionsarray[1].option.split(',')
        }
        console.log("pairnameslist running", pairnameslist)
        var startd;
        var endtd;
        if (isEmpty(this.state.viewdata)) {
        } else {
            startd = new Date(this.state.viewdata.pollStartDateTime).toLocaleString('en-GB');
            endtd = new Date(this.state.viewdata.pollEndDateTime).toLocaleString('en-GB');
        }
        var showd;
        var hided;
        if (isEmpty(this.state.viewdata)) {
        } else {
            showd = new Date(this.state.viewdata.pollShowTime).toLocaleString('en-GB');
            hided = new Date(this.state.viewdata.pollHideTime).toLocaleString('en-GB');
        }
        const text = <span>Declare Winners From all Participants</span>;
        return (

            <div>
                <div>
                    <div className="ElecTionNewDash">
                        {/* <div className="ElectionsSubMenu">
                        <div className="SubMenu">
                            <Col span={20}><h2 className="pageTitle">Polling</h2></Col>
                            <Col span={4}>
                                <Link to="/ElectioMain"><Button type="primary" className="pollBackBtn">Back to Dash Board</Button></Link>
                            </Col>
                        </div>
                    </div>*/}

                    </div>

                    <div className="ElecTionNewDashbody">
                        <Table className="electionPollingDashtable12" columns={columns} dataSource={data} pagination={false} />
                    </div>
                    <div className="electionPagination">
                        <Pagination onChange={this.pageChange.bind(this)} total={totalpages} />
                    </div>
                </div>

                {this.state.viewdata === undefined ? null :
                    <Modal
                        title={this.state.typepollcheck === "imageWithOutTimer" ? <p>Image With Out Timjer</p> : this.state.typepollcheck
                            === "pair" ? <p>Pair</p> : this.state.typepollcheck === "textWithEmoji" ? <p>Text With Emoji</p> : this.state.typepollcheck
                                === "textWithTimer" ? <p>Text With Timer</p> : this.state.typepollcheck === "imageWithTimer"
                                    ? <p>Image With Timer</p> : this.state.typepollcheck === "textWithOutTimer" ? <p>Text With Out Timer</p> : null}
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        width='600'
                        >
                        <Scrollbars style={{ height: '50vh', padding: '0px 10px' }}>
                            <div className="ElectiondashView">
                                <div>
                                    {this.state.typepollcheck === "imageWithOutTimer" ? null :
                                        <div className="TimerWithdifferentContextes">
                                            <Col span={24}>
                                                <img src={this.state.viewdata.pollImageUrl === undefined ? null : this.state.viewdata.pollImageUrl} alt="contestcover" height="200px" width="100%" />

                                            </Col>
                                            {this.state.viewdata.pollType == "image" ? <div className="OpitonsintimerPolling">
                                                <ul className="list-inline">
                                                    <li>
                                                        <img className="polloption2timerimage" src={optionsarray[0] === undefined ? null : optionsarray[0].optionTypeValue} alt="contestcover" />
                                                    </li>
                                                    <li style={{ padding: '0px 15px', marginTop: '-5px' }}>
                                                        <h4> vs</h4>
                                                    </li>
                                                    <li>
                                                        <img className="polloption2timerimage" src={optionsarray[1] === undefined ? null : optionsarray[1].optionTypeValue} alt="contestcover" />
                                                    </li>
                                                </ul>
                                            </div> : null}
                                            {this.state.typepollcheck === "pair" ? <div className="OpitonsinPolling">
                                                <ul className="list-inline pairmodeloptionimages">
                                                    <li>
                                                        <img className="polloptionpairimage" src={optionsarray[0] === undefined ? null : optionsarray[0].optionTypeValue} alt="contestcover" />
                                                    </li>
                                                    <li style={{ padding: '0px 15px', marginTop: '-5px' }}>
                                                        {/*<h4> vs</h4>*/}
                                                    </li>
                                                    <li>
                                                        <img className="polloptionpairimage" src={optionsarray[1] === undefined ? null : optionsarray[1].optionTypeValue} style={{ marginLeft: '50px' }} alt="contestcover" />
                                                    </li>
                                                </ul>
                                            </div> : null}
                                        </div>}



                                    <Col span={24}>
                                        {this.state.viewdata.pollType === "text" ?
                                            <div>
                                                {/*  <p className="ElecnDashQuestion">Do you agree KIXP should exclude Yuvraj Singh ?</p>*/}

                                            </div> : null}
                                    </Col>
                                    <Col span={24}>
                                        {this.state.viewdata.pollType != "image" ?
                                            <div>
                                                <p className="ElecnDashQuestion">{this.state.viewdata.pollTitle}</p>

                                            </div> : null}
                                    </Col>
                                    <Col span={24}>
                                        {this.state.typepollcheck === "imageWithOutTimer" ?
                                            <div className="imageWithouttimer">
                                                {this.state.optionsarray === undefined ? null : <div>
                                                    <Col span={7}>
                                                        <img src={this.state.optionsarray[0] === undefined ? null : this.state.optionsarray[0].optionTypeValue} alt="contestcover" height="85px" width="85px" />
                                                        <p> {this.state.optionsarray[0] === undefined ? null : this.state.optionsarray[0].option}</p>
                                                    </Col>
                                                    <Col span={7}>
                                                        <img src={this.state.optionsarray[1] === undefined ? null : this.state.optionsarray[1].optionTypeValue} alt="contestcover" height="85px" width="85px" />
                                                        <p> {this.state.optionsarray[1] === undefined ? null : this.state.optionsarray[1].option}</p>
                                                    </Col></div>}
                                                {this.state.optionsarray.length === 3 ?
                                                    <Col span={7}>
                                                        <img src={this.state.optionsarray[2] != undefined ? this.state.optionsarray[2].optionTypeValue : null} alt="contestcover" height="85px" width="85px" />
                                                        <p> {this.state.optionsarray[2] != undefined ? this.state.optionsarray[2].option : null}</p>
                                                    </Col> : null}
                                            </div> : null}
                                    </Col>
                                    <Col span={24}>
                                        {this.state.typepollcheck === "textWithEmoji" ?
                                            <div className="TextWithEmojis imageWithouttimer1">
                                                {this.state.optionsarray.length === 2 ?
                                                    <ul className="list-inline">
                                                        <li className="ant-col-7">
                                                            <img src={this.state.optionsarray[0] === undefined ? null : this.state.optionsarray[0].optionTypeValue} alt="contestcover" height="50px" width="50px" />
                                                            <p className="Textwithemojioption"> {this.state.optionsarray[0] === undefined ? null : this.state.optionsarray[0].option}</p>
                                                        </li>
                                                        <li className="ant-col-7">
                                                            <img src={this.state.optionsarray[1] === undefined ? null : this.state.optionsarray[1].optionTypeValue} alt="contestcover" height="50px" width="50px" />
                                                            <p className="Textwithemojioption"> {this.state.optionsarray[1] === undefined ? null : this.state.optionsarray[1].option}</p>
                                                        </li></ul> : null}
                                                {this.state.optionsarray.length === 3 ?
                                                    <ul className="list-inline">
                                                        <li className="ant-col-7">
                                                            <img src={this.state.optionsarray[0] === undefined ? null : this.state.optionsarray[0].optionTypeValue} alt="contestcover" height="50px" width="50px" />
                                                            <p className="Textwithemojioption"> {this.state.optionsarray[0] === undefined ? null : this.state.optionsarray[0].option}</p>
                                                        </li>
                                                        <li className="ant-col-7">
                                                            <img src={this.state.optionsarray[1] === undefined ? null : this.state.optionsarray[1].optionTypeValue} alt="contestcover" height="50px" width="50px" />
                                                            <p className="Textwithemojioption"> {this.state.optionsarray[1] === undefined ? null : this.state.optionsarray[1].option}</p>
                                                        </li>
                                                        <li className="ant-col-7">
                                                            <img src={this.state.optionsarray[2] === undefined ? null : this.state.optionsarray[2].optionTypeValue} alt="contestcover" height="50px" width="50px" />
                                                            <p className="Textwithemojioption"> {this.state.optionsarray[2] === undefined ? null : this.state.optionsarray[2].option}</p>
                                                        </li>
                                                    </ul> : null}
                                            </div>
                                            : null}
                                    </Col>
                                    {this.state.typepollcheck === "pair" ? <div>
                                        <Col span={24}>

                                            <div className="viewdashPairModels">
                                                <ul className="list-inline viewdashPairModel">
                                                    <li className="ant-col-12">
                                                        <span className="pollviewpairmodels">  pair 1 </span>
                                                    </li>
                                                    <li className="ant-col-12">
                                                        <span className="pollviewpairmodels">   pair 2 </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </Col>
                                        <Col span={24}>

                                            <div className="viewdashPairModels">
                                                <ul className="list-inline viewdashPairModel11">
                                                    <li className="ant-col-12">
                                                        {this.state.optionsarray[0] === undefined ? null : <p>Pair 1 First Name :<span className="pairpollviewoptns">{pairnames[0] === undefined ? null : pairnames[0]}</span></p>}
                                                        {this.state.optionsarray[0] === undefined ? null : <p>Pair 1 Second Name :<span className="pairpollviewoptns">{pairnames[0] === undefined ? null : pairnames[1]}</span> </p>}
                                                    </li>
                                                    <li className="ant-col-12">
                                                        {this.state.optionsarray[1] === undefined ? null : <p>Pair 2 First Name :<span className="pairpollviewoptns">{pairnameslist[1] === undefined ? null : pairnameslist[0]}</span></p>}
                                                        {this.state.optionsarray[1] === undefined ? null : <p>Pair 2 Second Name : <span className="pairpollviewoptns">{pairnameslist[1] === undefined ? null : pairnameslist[1]}</span> </p>}
                                                    </li>
                                                </ul>
                                            </div>
                                        </Col>

                                    </div> : null}
                                    <Col span={24}>
                                        {this.state.viewdata.pollType === "text" ?
                                            <div className="ElecViewDashNewOpts">
                                                <ul className="list-inline ElecViewDashNewOpts11">
                                                    <li className="ant-col-12">
                                                        <span> Option 1: </span> <span className="pollviewdiffentcontextsoptns">{this.state.optionsarray[0] === undefined ? null : this.state.optionsarray[0].option}</span>
                                                    </li>
                                                    <li className="ant-col-12">
                                                        <span> Option 2: </span> <span className="pollviewdiffentcontextsoptns">{this.state.optionsarray[1] === undefined ? null : this.state.optionsarray[1].option}</span>
                                                    </li>
                                                </ul>
                                            </div> : null}

                                    </Col>
                                    <Col span={24}>
                                        {this.state.typepollcheck === "textWithOutTimer" ?
                                            <div className="ElecViewDashNewOpts">
                                                <ul className="list-inline ElecViewDashNewOpts11">
                                                    <li className="ant-col-12">
                                                        <span className="Text-withoptnsone"> Option 1: </span> <span className="pollviewotions">{this.state.optionsarray[0] === undefined ? null : this.state.optionsarray[0].option}</span>
                                                    </li>
                                                    <li className="ant-col-12">
                                                        <span> Option 2: </span> <span className="pollviewotions">{this.state.optionsarray[1] === undefined ? null : this.state.optionsarray[1].option}</span>
                                                    </li>
                                                </ul>
                                            </div> : null}

                                    </Col>

                                    <Col span={24} className="ViewDashTagsDetail">
                                        <Col span={12}>
                                            <p><span>Tags : </span> <span className="Tagsprofile">{tags === undefined || tags.length === 0 ? "" : tags} </span></p>
                                        </Col>
                                        {this.state.viewdata.pollDetails === '' ? null :
                                            <Col span={12}>
                                                <p>Poll Details:<span className="polldeatilsviews"> {this.state.viewdata.pollDetails === '' ? null : this.state.viewdata.pollDetails}</span></p>
                                            </Col>}
                                    </Col>
                                    
                                    <Col span={24} className="ViewDashStartTimeEndTime">
                                        <Col span={12}>
                                            <p><span>Start Time : </span>  <span className="StartTimessspollView">{startd}</span></p>
                                        </Col>
                                        <Col span={12}>
                                            <p><span>End Time : </span>  <span className="StartTimessspollView">{endtd}</span></p>
                                        </Col>
                                    </Col>
                                    <Col span={24} className="ViewDashStartTimeEndTime">
                                    <Col span={12}>
                                        <p><span>Show Time : </span>  <span className="StartTimessspollView">{showd}</span></p>
                                    </Col>
                                    <Col span={12}>
                                        <p><span>Hide Time : </span>  <span className="StartTimessspollView">{hided}</span></p>
                                    </Col>
                                </Col>
                                    <Col span={24} className="Dispalymobilesectionviewmain">
                                        <Col span={12}>
                                            <p><span>Display Mobile Section :</span> <span className="DisplayMobileSectionview" >
                                                {this.state.viewdata.pollSection === '' ? null : this.state.viewdata.pollSection}</span> </p>
                                        </Col>
                                    </Col>
                                    <Col span={24} className="PolviewLocations">
                                        <p><span>Location : </span><span className="PolllviewMainLocats">{loclist === undefined || loclist.length === 0 ? "" : loclist}</span></p>
                                    </Col>
                                    <Col span={24}>
                                        <div className="ViewDashParticipantsCount">
                                            <ul>

                                                <li><span>No of Participants opt for option A:</span>
                                                    <span className="PollCountA">{this.state.optionsarray[0] === undefined ? null : this.state.optionsarray[0].votersCount} </span> </li>

                                                <li><span>No Of Participants opt for option B:</span>
                                                    <span className="PollCountB"> {this.state.optionsarray[1] === undefined ? null : this.state.optionsarray[1].votersCount} </span> </li>
                                                {this.state.optionsarray.length === 3 ?
                                                    <li><span>No Of Participants opt for option C:</span>
                                                        <span className="PollCountC"> {this.state.optionsarray[2] === undefined ? null : this.state.optionsarray[2].votersCount} </span> </li>
                                                    : null} </ul>
                                        </div>
                                    </Col>
                                    <Col span={24}>
                                        <Col span={24} className="BackgroundImageUrlDeclaredviewmain">
                                            <p><span>Background Image Url for Declared winners :</span> <span className="backgrndimgurlsdeclarewinn">
                                                {this.state.viewdata.pollBackground === '' ? null : this.state.viewdata.pollBackground}</span> </p>
                                        </Col>
                                    </Col>
                                    {this.state.typepollcheck === "imageWithTimer" || this.state.typepollcheck === "textWithTimer" ?
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
                                                    {contentoptions.toStart.pTitle}
                                                </li>
                                                <li className="ant-col-9">
                                                    {contentoptions.toStart.pCaption}
                                                </li>
                                            </ul>
                                            <ul className="list-inline viewPolldatatable">
                                                <li className="ant-col-7">
                                                    Poll Started participated
                                     </li>
                                                <li className="ant-col-8">
                                                    {contentoptions.startedNparticipated.pTitle}
                                                </li>
                                                <li className="ant-col-9">
                                                    {contentoptions.startedNparticipated.pCaption}
                                                </li>
                                            </ul>
                                            <ul className="list-inline viewPolldatatable">
                                                <li className="ant-col-7">
                                                    Poll Started Not participated
                                     </li>
                                                <li className="ant-col-8">
                                                    {contentoptions.startedNotParticipated.pTitle}
                                                </li>
                                                <li className="ant-col-9">
                                                    {contentoptions.startedNotParticipated.pCaption}
                                                </li>
                                            </ul>
                                            <ul className="list-inline viewPolldatatable">
                                                <li className="ant-col-7">
                                                    Poll Ended after participating
                                     </li>
                                                <li className="ant-col-8">
                                                    {contentoptions.endedNparticipated.pTitle}
                                                </li>
                                                <li className="ant-col-9">
                                                    {contentoptions.endedNparticipated.pCaption}
                                                </li>
                                            </ul>
                                            <ul className="list-inline viewPolldatatable">
                                                <li className="ant-col-7">
                                                    Poll Ended Without Participating
                                     </li>
                                                <li className="ant-col-8">
                                                    {contentoptions.endedNotParticipated.pTitle}
                                                </li>
                                                <li className="ant-col-9">
                                                    {contentoptions.endedNotParticipated.pCaption}
                                                </li>
                                            </ul>
                                            <ul className="list-inline viewPolldatatable">
                                                <li className="ant-col-7">
                                                    Poll Winners Declared
                                     </li>
                                                <li className="ant-col-8">
                                                    {contentoptions.winnersDeclared.pTitle}
                                                </li>
                                                <li className="ant-col-9">
                                                    {contentoptions.winnersDeclared.pCaption}
                                                </li>
                                            </ul>


                                        </Col>
                                        : null}

                                </div>

                            </div>
                        </Scrollbars>
                    </Modal>
                }

                {/*     <Modal
                    title="Declare Winners"
                    visible={this.state.visible01}
                    onOk={this.handleOk01}
                    onCancel={this.handleCancel01}
                    width='700'
                >
                    <div>
                        <Form>
                            <Col span={24}>
                                <ul className="list-inline">
                                    <li>
                                        <FormItem>
                                            <h6 className='h6Fnt'>Winning Criteria</h6>
                                            <Select defaultValue="Opinion" style={{ width: 120 }} onChange={handleChange}>
                                                <Option value="Opinion"> opinion</Option>
                                                <Option value="Results">Results</Option>
                                            </Select>
                                        </FormItem>
                                    </li>
                                    <li>
                                        <a data-tip data-for='global'>  <Icon className="mrgleft10" type="exclamation-circle-o" /> </a>
                                        <ReactTooltip place="right" id='global' aria-haspopup='true' role='example'>
                                            <ol>
                                                <li>Opinion based will have winners from all participants</li>
                                                <li>Result based will have winners from selected option participants</li>
                                            </ol>
                                        </ReactTooltip>
                                    </li>
                                </ul>

                            </Col>
                            <Col span={24}>
                                <Col span={8}>
                                    <FormItem>
                                        <h6 className='h6Fnt'>Winning Options</h6>
                                        <Select className="ElectnDashWinningOptions" defaultValue="Opinion" onChange={handleChange}>
                                            <Option value="participants who opted for Option A"> participants who opted for Option A</Option>
                                            <Option value="participants who opted for Option B"> participants who opted for Option B</Option>
                                            <Option value="participants who opted for Option C"> participants who opted for Option C</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Col>
                            <Col span={24}>
                                <FormItem>
                                    <h6 className='h6Fnt'>Rewards</h6>
                                    <Select defaultValue="Goodies" style={{ width: 120 }} onChange={handleChange}>
                                        <Option value="Goodies">Goodies</Option>
                                        <Option value="Fan Coins"> Fan Coins</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <Col span={13}>
                                    <FormItem>
                                        <h6 className='h6Fnt'>Enter Goodies</h6>
                                        <Input placeholder="Basic usage" />
                                    </FormItem>
                                </Col>
                            </Col>

                            <Col span={24}>
                                <ul className="list-inline">
                                    <li className="ant-col-4">
                                        Enter Fancoins
                             </li>
                                    <li className="ant-col-2">
                                        <Input />
                                    </li>
                                </ul>
                            </Col>


                            <Col span={24}>
                                <Col span={13}>
                                    <FormItem>
                                        <h6 className='h6Fnt'>Enter Image url</h6>
                                        <Input placeholder="Basic usage" />
                                    </FormItem>
                                </Col>
                            </Col>

                            <Col span={24}>
                                <ul className="list-inline">
                                    <li className="ant-col-4">
                                        Winners Count
                             </li>
                                    <li className="ant-col-2">
                                        <Input />
                                    </li>
                                </ul>
                            </Col>

                            <Col span={24}>
                                <Col span={13}>
                                    <FormItem>
                                        <h6 className='h6Fnt'>Winners Message</h6>
                                        <TextArea rows={4} placeholder="Basic usage" />
                                    </FormItem>
                                </Col>
                            </Col>

                        </Form>

                    </div>
                </Modal>*/}
            </div>

        );
    }
}

export default NewRunningElectionDashboard;
/* eslint-disable */