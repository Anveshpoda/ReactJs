/* eslint-disable */
import React from 'react';
import Dashboard from '../Dashboard/Dashboard';
import { Link } from 'react-router';
import axios from 'axios';
import './Newcontentcurator.css';
import amitabh1 from '../images/amitabh1.jpg';
import filteroptions2 from '../images/filteroptions2.png';
import moment from 'moment';
import { Col, Form, Radio, Tabs, Icon, Avatar, Row, Input, Modal, message, DatePicker, Table, Checkbox, Alert, Dropdown, Button, Card, Select, Pagination } from 'antd';
import ReactPlayer from 'react-player';
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
function handleChange(value) {
    console.log(`selected ${value}`);
}
function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
}

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const children12 = [];
for (let i = 10; i < 36; i++) {
    children12.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}<span className="contnetcuratfeaturediconsselect" ><Icon type="star" /></span> </Option>);
}

function handleChange(value) {
    console.log(`selected ${value}`);
}


const children13 = [];
for (let i = 10; i < 36; i++) {
    children13.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
    console.log(`selected ${value}`);
}


function callback(key) {
    console.log(key);
}

function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
}

function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
}

function disabledDateTime() {
    return {
        disabledHours: () => range(0, 24).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56],
    };
}


var container = (
    <Alert className="ContneChallengeAlert"
        message="No Challenges"
        description="There are no challenges to display."
        type="info"
        />
)

class Newcontentcurator extends React.Component {
    constructor() {
        super();
        this.state = {
            category: '',
            contestTitles: [],
            pagenumber: 1,
            contestTitle: '',
            challenges: [],
            chall: [],
            numofPages: 1,
            tabPane: '',
            value1: 0,
            value2: 0,
            visible: false,
            disable: true,
            visible12: false,
            disable12: true,
            visible13: false,
            disable13: true,
            radioValue: 0,
            challengestypes: "",
            allmcfeedidArray: [],
            selectall: false,
            mcfeedidArray: [],
            mccontestkey: ""
        }
    }
    onCatChange = (e) => {
        this.setState({ category: e });
        var _this = this;
        var request = axios.create({
            headers: { 'x-access-token': sessionStorage.token }
        });
        if (e === "Challenges") {
            const url = '/contests/curation/contestTitle/wallpost/dashboard';
            request.get(url).then((response) => {
                _this.setState({ contestTitles: response.data.data })
            })
        } else if (e === "FanClub Feeds") {
            request.get('/feedCategories').then((response) => {
                if (response.data.status === 200) {
                    _this.setState({ challenges: response.data.data })
                }
            })
        }
    }
    contestTitleChange = (value) => {
        this.setState({ contestTitle: value });
        { value.length > 0 ? this.getChallengeType(this.state.pagenumber, value) : this.setState({ challenges: [] }) }
    }
    getChallengeType = (contestpagenumber, contestIds) => {
        var _this = this;
        var data = {
            "feedType": this.state.challengestypes,
            "contestIds": contestIds
        }
        const url = '/contests/curation/dashboard/' + contestpagenumber;
        var request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                'x-access-token': sessionStorage.getItem('token')
            }
        });
        fetch(request)
            .then(response => response.json())
            .then(function (response) {
                if (response.status === 200 && response.message === "Success") {
                    _this.setState({ challenges: response.data.feedDetails, chall: response.data.feedDetails, numofPages: response.noOfPages })
                    // let allmcfeedidArray = [];
                    // for (let i in response.data.feedDetails) {
                    //     allmcfeedidArray.push(response.data.feedDetails[i]._id)
                    // }
                    // _this.setState({ allmcfeedidArray })
                }
                else {
                }
            })
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
    showModal12 = () => {
        this.setState({
            visible12: true,
        });
    }

    handleOk12 = (e) => {
        console.log(e);
        this.setState({
            visible12: false,
        });
    }

    handleCancel12 = (e) => {
        console.log(e);
        this.setState({
            visible12: false,
        });
    }

    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }
    showModal13 = () => {
        this.setState({
            visible13: true,
        });
    }

    handleOk13 = (e) => {
        console.log(e);
        this.setState({
            visible13: false,
        });
    }

    handleCancel13 = (e) => {
        console.log(e);
        this.setState({
            visible13: false,
        });
    }

    onRadioChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            radioValue: e.target.value,
        });
    }

    challengeTypeChange = (value) => {
        var select_all = document.getElementById("select_all");
        {
            this.state.contestTitle.length !== 0 ?
                select_all.checked = false : ''
        }
        this.setState({ challengestypes: value, contestTitle: '', challenges: [] });
        this.getMcContestTitles(value);
    }

    getMcContestTitles = (challengesType) => {
        var _this = this;
        const url = '/contests/curation/contestTitle/' + challengesType + '/dashboard';
        var request = new Request(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'x-access-token': sessionStorage.getItem('token')
            }
        });
        fetch(request)
            .then(response => response.json())
            .then(function (response) {
                if (response.status === 200 && response.message === "Success") {
                    _this.setState({ contestTitles: response.data });
                    var arr = [];
                    for (var j = 0; j < response.data.length; j++) {
                        arr.push(response.data[j]._id);
                    }
                    var titles = _this.state.contestTitle;
                    for (let i = 0; i < titles.length; i++) {
                        if (!arr.includes(titles[i])) {
                            _this.state.contestTitle.splice(i, 1);
                        }
                    }
                    if (_this.state.contestTitle.length != 0) {
                        _this.getChallengeType(_this.state.pagenumber, _this.state.contestTitle);
                    } else {
                        _this.setState({ challenges: [] })
                    }

                }

                else {
                }
            })
    }


    feedandCommentPagination = (page) => {
        this.setState({ pagenumber: page, selectall: false });
        var select_all = document.getElementById("select_all");
        var checkboxes = document.getElementsByClassName("checkbox");

        select_all.checked = false;
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
        }

        this.getChallengeType(page, this.state.contestTitle)
    }

    mccontestCheckboxChange = (key, mcfeedid) => {
        var select_all = document.getElementById("select_all"); //select all checkbox
        var checkboxes = document.getElementsByClassName("checkbox"); //checkbox items
        select_all.checked = false;
        console.log("checkboxes len", checkboxes[0].checked)
        if (select_all.checked !== false) {
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked === false) {
                    if (this.state.allmcfeedidArray.length != 0) {
                        for (var j of this.state.allmcfeedidArray) {
                            if (mcfeedid === j) {
                                this.state.allmcfeedidArray.splice(this.state.allmcfeedidArray.indexOf(j), 1)
                            }
                        }
                    } else {
                        this.state.allmcfeedidArray.push(mcfeedid)
                    }
                }
            }
            console.log("allmcfeedidArray", this.state.allmcfeedidArray)
        } else {
            const state = this.state;
            let mcfeedidArray = state.mcfeedidArray;
            if (mcfeedid && mcfeedidArray.indexOf(mcfeedid) === -1) {
                mcfeedidArray = [...mcfeedidArray, mcfeedid]
            } else {
                mcfeedidArray = mcfeedidArray.filter((mid) => mid !== mcfeedid)
            }
            console.log("mcfeedidArray", mcfeedidArray)
            this.setState({ mcfeedidArray });
        }
        this.setState({ mccheckbox: !(this.state.mccheckbox + key), mccontestkey: key })
    }

    deletemcFeed = () => {
        var allmcfeedidArray = [];
        var mcfeedids = [];
        if (this.state.selectall === false) {
            this.state.allmcfeedidArray = []
        }
        console.log("delete array", this.state.allmcfeedidArray, "mddd", this.state.mcfeedidArray)
        // if (mcfeedid === "Delete" && this.state.mcfeedidArray.length === 0) {
        //     message.info("Please select any post to delete");
        // } else if (mcfeedid === "Deleteall") {
        //     for (let key in this.state.challenges) {
        //         var challengeFeed = this.state.challenges[key];
        //         allmcfeedidArray.push(challengeFeed._id)
        //     }
        // } else if (mcfeedid.length > 0) {
        //     mcfeedids.push(mcfeedid);
        // }
        var _this = this;
        var data = {
            "ids": this.state.allmcfeedidArray.length > 0 ? this.state.allmcfeedidArray : this.state.mcfeedidArray.length > 0 ?
                this.state.mcfeedidArray : mcfeedids
        }
        const url='/curation/contests/addJunk/:junkPriority';
        // const url = '/mc/curation/delete/mcFeed';
        // var request = new Request(url, {
        //     method: 'PUT',
        //     body: JSON.stringify(data),
        //     headers: {
        //         "Content-Type": "application/json",
        //         'x-access-token': sessionStorage.getItem('token')
        //     }
        // });
        // fetch(request)
        //     .then(response => response.json())
        //     .then(function (response) {
        //         if (response.status === 200 && response.message === "Success") {
        //             // if(_this.state.challenges.length )
        //             _this.getMcContestTitles(_this.state.challengestypes)


        //             // _this.ttt();

        //             _this.setState({
        //                 mcfeedidArray: [], allmcfeedidArray: [],
        //                 mccheckbox: !(_this.state.mccheckbox + _this.state.mccontestkey),
        //                 selectall: false, mccheckbox: false, mcdeletevisible: false
        //             });
        //             _this.unSelectcheckboxes();
        //         }
        //         else {
        //         }
        //     })
    }

    unSelectcheckboxes = () => {
        var select_all = document.getElementById("select_all");
        var checkboxes = document.getElementsByClassName("checkbox");
        select_all.checked = false;
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
        }
    }

    onfeatureSelect = (e) => {
        if (this.state.selectall === false) {
            this.state.allmcfeedidArray = []
        }
        var _this = this;
        console.log("feature", e);
        var priority = 0;
        if (e == "High Priority") priority = 1;
        if (e == "Medium Priority") priority = 2;
        if (e == "Low Priority") priority = 3;
        var url = "/curation/contests/addFeature/" + priority;
        var data = {
            ids: this.state.selectall ? this.state.allmcfeedidArray : this.state.mcfeedidArray
        }
        var req = axios.create({
            headers: {
                "x-access-token": sessionStorage.token
            }
        })
        req.put(url, data).then((response) => {
            if (response.data.status === 200) {
                message.success(`Feed featured successfully`);
                _this.getChallengeType(_this.state.pagenumber, _this.state.contestTitle);
                _this.unSelectcheckboxes();
                _this.setState({ allmcfeedidArray: [], mcfeedidArray: [] })
            } else {
                message.error(`Feed is unable to featured`)
            }
        })

    }

    onFeatureDisplaySelect = (e) => {
        var priority = 0;
        var _this = this;
        if (e == "High Priority") priority = 1;
        if (e == "Medium Priority") priority = 2;
        if (e == "Low Priority") priority = 3;
        if (e != "All") {
            var url = "/curation/contests/featuredType/" + this.state.pagenumber + "/" + priority;
            var data = {
                contestIds: this.state.contestTitle,
                feedType: this.state.challengestypes
            };
            var req = axios.create({
                headers: {
                    "x-access-token": sessionStorage.token
                }
            })
            req.post(url, data).then((response) => {
                if (response.data.status === 200) {
                    _this.setState({ challenges: response.data.data.feedDetails, numofPages: response.data.noOfPages })
                } else if (response.data.status === 400) {
                    _this.setState({ challenges: [], pagenumber: 1 })
                }
            })
        } else {
            _this.setState({ challenges: this.state.chall })
        }
    }

    selectAllChange = (checked) => {
        var _this = this;
        console.log("checked", checked)
        this.setState({
            selectall: !(this.state.selectall)
        });
        var select_all = document.getElementById("select_all");
        var checkboxes = document.getElementsByClassName("checkbox");
        var allmcfeedidArray = [];
        console.log("select_all", select_all.checked)
        if (select_all.checked) {
            select_all.addEventListener("change", function (e) {
                for (i = 0; i < checkboxes.length; i++) {
                    checkboxes[i].checked = select_all.checked;
                    for (let key in _this.state.challenges) {
                        var challengeFeed = _this.state.challenges[key];
                        if (!_this.state.allmcfeedidArray.includes(challengeFeed._id)) {
                            allmcfeedidArray.push(challengeFeed._id);
                        }
                    }
                    _this.setState({ allmcfeedidArray: allmcfeedidArray, mcfeedidArray: [] });
                }
            })
        } else {
            _this.setState({ allmcfeedidArray: [] })
        }

        // console.log("before",this.state.allmcfeedidArray);
        // console.log("mdd",this.state.mcfeedidArray)
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].addEventListener('change', function (e) { //".checkbox" change 
                //uncheck "select all", if one of the listed checkbox item is unchecked
                if (this.checked == false) {
                    select_all.checked = false;
                    _this.setState({ selectall: false })
                }
                //check "select all" if all checkbox items are checked
                if (document.querySelectorAll('.checkbox:checked').length == checkboxes.length) {
                    select_all.checked = true;
                    _this.setState({ selectall: true })
                }
            });
        }
        // console.log("after",this.state.allmcfeedidArray)
    }

    render() {
        console.log("this state  content", this.state.selectall)
        console.log("this.state.challenges", this.state.challenges)
        var contestTitle = this.state.contestTitles.map((contest) =>
            <Option value={contest._id}>{contest.contestTitle}</Option>);
        const columns = [
            {
                title: this.state.category === "FanClub Feeds" ? 'FanClub Name' : '',
                key: 'fanClubName',
                dataIndex: 'fanClubName',
            },
            {
                title: 'Username',
                key: 'username',
                dataIndex: 'username',
            },
            {
                title: 'Created Date',
                dataIndex: 'createddate',
                key: 'createddate',
            }, {
                title: 'Location',
                dataIndex: 'location',
                key: 'location',
            }, {
                title: this.state.category === "FanClub Feeds" ? 'Text Feeds' : 'Wallpost',
                dataIndex: 'wallpost',
                key: 'wallpost',
            }];
        var data = []; var data1 = []; var data2 = []; var data3 = [];
        this.state.challenges.map((item) => {
            var obj = {
                key: item._id,
                username: item.userData[0].fullName,
                createddate: item.createdDate,
                location: item.userData[0].location,
                wallpost: item.feedData,
                fanClubName: item.fanClubName ? item.fanClubName : ''
            }
            if (this.state.category === "Challenges") {
                data.push(obj);
            }
            if (this.state.category === "FanClub Feeds") {
                data.push(obj);
            }
        });


        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            // getCheckboxProps: record => ({
            //     disabled: record.name === 'Disabled User', // Column configuration not to be checked
            //     name: record.name,
            // }),
        }
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        console.log("challenges", this.state.challenges)
        var challengesData = [];
        for (let i in this.state.challenges) {
            var contest = this.state.challenges[i];
            console.log("contest", contest)
            challengesData.push(
                <div>
                    <Col xs={12} sm={12} xl={4} lg={6} md={6} >
                        <Card>
                            <div className="Checkcontnetnewcurat">
                                <input className="checkbox" type="checkbox" name="check[]" onClick={this.mccontestCheckboxChange.bind(this, i, contest._id)} />
                                {/*<Checkbox className="checkbox" onChange={this.mccontestCheckboxChange.bind(this, i, contest._id)}></Checkbox>*/}
                            </div>
                            <div className="Contnetcuratvideo">
                                <ReactPlayer width="100%" height="150px" config={{ youtube: { playerVars: { showinfo: 1 } } }}
                                    url={'https://www.youtube.com/watch?v=' + contest.feedData} playing={false} controls />
                            </div>
                            <div className="Contentcuratnewfoothead">
                                <ul className="list-inline">
                                    <li> <Avatar className="contentuserprofile" src={contest.userData[0].profileImage} alt="contest-cover">{contest.userData[0].fullName.charAt(0)}</Avatar>
                                    </li>
                                    <li><h4 className="contentuserName">{contest.userData[0].fullName}</h4>
                                        <h4 className="contentuserpackdate">{moment(contest.createdDate).format("YYYY-MM-DD HH:mm A")}</h4>
                                        <h4 className="contentuserLocation">{contest.userData[0].location || "Hyderabad"}</h4>
                                    </li>
                                    {contest.featuredPost ? contest.priority === 1 ? <li><span className="contnetcuratfeaturediconsselectHigh" ><Icon type="star" /></span> </li>
                                        : contest.priority === 2 ? <li><span className="contnetcuratfeaturediconsselectMedium" ><Icon type="star" /></span> </li>
                                            : contest.priority === 3 ? <li><span className="contnetcuratfeaturediconsselectLow" ><Icon type="star" /></span> </li> : "" : ""}
                                </ul>
                                <div>
                                    <h3 className="Contentpackssstitle">{contest.contestTitle}</h3>
                                </div>
                            </div>
                            <div className="Contentcuratnewfootmain">
                                <ul className="list-inline">
                                    <li className="NesContentFootmain"><h4><span><Icon type="eye-o" /></span><span>{contest.viewsCount ? contest.viewsCount : 0}</span></h4></li>
                                    <li className="NesContentFootmain"><h4><span><Icon type="heart-o" /></span><span>{contest.likes.length}</span></h4></li>
                                    <li className="NesContentFootmain"><h4><span><Icon type="message" /></span><span>{contest.comments.length}</span></h4></li>
                                    {/* <li className="NesContentFootmain"><h4><span><Icon type="team" /></span><span>40</span></h4></li>*/}
                                </ul>
                            </div>
                        </Card>
                    </Col>
                </div>
            )
        }

        return (
            <Dashboard>
                <div className="Newfilecontnetcurator">
                    <div>
                        <Col span={24}>
                            <div className="topmenucontnet">
                                <Col span={3}>
                                    <h2>Content Curator</h2>
                                </Col>
                                <Col span={4} className="NewCuratorselects">
                                    <Select
                                        placeholder="Select One"
                                        style={{ width: '100%' }}
                                        onChange={this.onCatChange}>
                                        <Option value="Challenges">Challenges</Option>
                                        <Option value="FanClub Feeds">FanClub Feeds</Option>
                                        <Option value="FanClub Feed Comments">FanClub Feed Comments</Option>
                                    </Select>
                                </Col>

                                {this.state.category === "Challenges" ? <Col span={4} className="NewCuratorselects">
                                    <Select
                                        placeholder="Select One"
                                        style={{ width: '100%' }}
                                        onChange={this.challengeTypeChange}>
                                        <Option value="dubshmash">Dub2Win</Option>
                                        <Option value="karoke">Karoake</Option>
                                        <Option value="wallpost">WallPost</Option>
                                    </Select>
                                </Col> : ""}

                                {this.state.category === "Challenges" ? <Col span={4} className="NewCuratorselects">
                                    <Select
                                        getPopupContainer={triggerNode => triggerNode.parentNode}
                                        showSearch
                                        mode="multiple"
                                        style={{ width: '100%' }}
                                        placeholder="Select contestTitle"
                                        value={this.state.contestTitle || undefined}
                                        optionFilterProp="children"
                                        onChange={this.contestTitleChange.bind(this)}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                        {contestTitle}
                                    </Select>
                                </Col> : null}
                                <Col span={9} className="Toplibardbtn">
                                    <div className="Contentlibbtn">
                                        <Link to="/newcontentcurator/CuratorLibrary" ><Button type="primary">Curator Library</Button></Link>
                                    </div>
                                </Col>
                            </div>
                        </Col>
                        <Col span={24}>
                            <div className="secondnavcontent">
                                <Col span={2}>
                                    <div className="selectallCheck12" onClick={this.showModal}>
                                        <h4><span>Filter </span><span><img src={filteroptions2} alt="contest-cover" height="15px" width="15px" /></span></h4>
                                    </div>
                                </Col>
                                <Col span={3}>
                                    <div className="selectallCheck131">
                                        <Select defaultValue="Select All" style={{ width: '100%' }}
                                            getPopupContainer={triggerNode => triggerNode.parentNode}
                                            onChange={this.onFeatureDisplaySelect}>
                                            <Option value="High Priority">High Priority</Option>
                                            <Option value="Medium Priority">Medium Priority</Option>
                                            <Option value="Low Priority">Low Priority</Option>
                                            <Option value="All">All</Option>
                                        </Select>
                                    </div>
                                </Col>
                                <Col span={2}>
                                    <div className="selectallCheck">
                                        <input type="checkbox" id="select_all" onClick={this.selectAllChange} /><span> Select All</span>
                                        {/*} <Checkbox id="select_all" onChange={this.selectAllChange}>
                                        </Checkbox>*/}
                                    </div>
                                </Col>
                                <Col span={3}>
                                    <div className="selectallCheck13">
                                        <Select
                                            getPopupContainer={triggerNode => triggerNode.parentNode}
                                            mode="tags"
                                            style={{ width: '100%' }}
                                            placeholder="Sort By"
                                            onChange={handleChange}
                                            >

                                            {children13}
                                        </Select>
                                    </div>
                                </Col>
                                <Col span={4}>
                                    <div className="selectallCheck14">
                                        <Select
                                            getPopupContainer={triggerNode => triggerNode.parentNode}
                                            //s mode="tags"
                                            style={{ width: '100%' }}
                                            placeholder="Featured"
                                            onChange={this.onfeatureSelect}
                                            >
                                            <Option value="High Priority">High Priority<span className="contnetcuratfeaturediconsselectHigh" ><Icon type="star" /></span></Option>
                                            <Option value="Medium Priority">Medium Priority<span className="contnetcuratfeaturediconsselectMedium" ><Icon type="star" /></span></Option>
                                            <Option value="Low Priority">Low Priority<span className="contnetcuratfeaturediconsselectLow" ><Icon type="star" /></span></Option>

                                        </Select>
                                    </div>
                                </Col>
                                <Col span={2}>
                                    <div className="selectallCheck" onClick={this.showModal12}>
                                        <h4><span><Icon type="delete" /></span> <span onClick={this.deletemcFeed}>Delete</span></h4>
                                    </div>
                                </Col>
                            </div>
                        </Col>

                        {this.state.challengestypes === "wallpost" || this.state.category === "FanClub Feeds" || this.state.category === "FanClub Feed Comments" ? <Col span={24}>
                            <div className="ContentCuratornbody">
                                <Tabs defaultActiveKey="1" onChange={callback}>
                                    <TabPane tab="Junk" key="1">
                                        <Table className="" rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false} />
                                    </TabPane>
                                    <TabPane tab="Spam" key="2">
                                        <Table className="" rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false} />
                                    </TabPane>
                                    <TabPane tab="Abusive" key="3">
                                        <Table className="" rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false} />
                                    </TabPane>
                                    <TabPane tab="Normal" key="4">
                                        <Table className="" rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false} />
                                    </TabPane>
                                </Tabs>
                            </div>
                        </Col> : ""}
                    </div>
                </div>

                {this.state.challengestypes === "dubshmash" || this.state.challengestypes === "karoke" ? <div className="contentcurtation-imagevideo">

                    <Row className="CuratorRoes"> {challengesData.length > 0 ? challengesData : <h1>{container}</h1>}</Row>

                </div> : ""}

                <Pagination className="FanClubpageintion" current={this.state.pagenumber} onChange={this.feedandCommentPagination.bind(this)} total={this.state.numofPages * 10} />
                {/* <div>
            <Row>
             <Col><Pagination className="FanClubpageintion" current={this.state.pagenumber} onChange={this.feedandCommentPagination.bind(this)} total={this.state.numofPages * 10} /></Col>
            </Row>
          </div>*/}
                {this.state.category === "FanClubs" ? <div className="contentcurtation-fanclubd">
                    <Col span={24}>
                        <Col span={8} xs={12} sm={12} xl={6} lg={8} md={8}>
                            <Card>
                                <ul className="list-inline">
                                    <li className="ant-col-7 contentcuartfanc-clubimgli">
                                        <img src={amitabh1} alt="contest-cover" width="100px" height="100px" />
                                    </li>
                                    <li className="ant-col-17 contentcuartfanc-clublis">
                                        <div>
                                            <ul className="list-inline">
                                                <li>
                                                    <h4 className="curatorfancusername">amitab bachan</h4>
                                                </li>
                                                <li className="contentcurat-fanclubcheck">
                                                    <Checkbox onChange={onChange}></Checkbox>
                                                </li>
                                            </ul>
                                        </div>
                                        <h4 className="createdbyuserfancc">By Gokul Teja , 05-09-2017</h4>
                                        <div>
                                            <ul className="list-inline">
                                                <li>
                                                    <h4 className="contencuratfanc-members">Hyderabad</h4>
                                                </li>
                                                <li className="Contentfanclub-category">
                                                    <h4>Movies</h4>
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <ul className="list-inline">
                                                <li>
                                                    <h4 className="contencuratfanc-members">508 Members</h4>
                                                </li>
                                                <li className="Contentfanclub-category">
                                                    <ul className="list-inline">
                                                        <li>
                                                            <h4><span><Icon type="wifi" /></span><span> </span></h4>
                                                        </li>
                                                        <li>
                                                            <h4><span> </span><span> </span></h4>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </Card>
                        </Col>
                    </Col>
                </div> : ""}
                <div>
                    <Modal
                        title="filter By"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={<div>
                            <Button className="footbtn" style={{ marginRight: 8 }} type="primary" onClick={this.handleOk1}>Clear All</Button> <Button className="footbtn" style={{ marginRight: 8 }} type="primary" onClick={this.handleOk1}>Apply</Button></div>}
                        width='600'
                        >
                        <div className="contentcuratfiltermodal">
                            <Col span={24}>
                                <ul className="list-inline">
                                    <li>
                                        <div>
                                            <DatePicker
                                                getCalendarContainer={triggerNode => triggerNode.parentNode}
                                                format="YYYY-MM-DD"
                                                disabledDate={disabledDate}

                                                />
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <DatePicker
                                                getCalendarContainer={triggerNode => triggerNode.parentNode}
                                                format="YYYY-MM-DD"
                                                disabledDate={disabledDate}

                                                />
                                        </div>
                                    </li>
                                </ul>
                            </Col>
                            <Col span={24}>
                                <Col span={12}>
                                    <Select
                                        mode="multiple"
                                        style={{ width: '100%' }}
                                        placeholder="Please select"
                                        defaultValue={['a10', 'c12']}
                                        onChange={handleChange}
                                        >
                                        {children}
                                    </Select>
                                </Col>
                            </Col>
                            <Col span={24}>
                                <ul className="list-inline">
                                    <li>
                                        <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="disabled" disabled>Disabled</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>
                                    </li>
                                    <li>
                                        <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="disabled" disabled>Disabled</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>
                                    </li>
                                    <li>
                                        <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="disabled" disabled>Disabled</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>
                                    </li>
                                    <li>
                                        <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="disabled" disabled>Disabled</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>
                                    </li>
                                </ul>
                            </Col>
                        </div>
                    </Modal>
                    <Modal
                        title="filter By"
                        visible={this.state.visible12}
                        onOk={this.deletemcFeed}
                        onCancel={this.handleCancel12}>
                        <div className="contentcuratdeletemodal">
                            <h4>Why are you deleting this Challenge ?</h4>
                            <div>
                                <RadioGroup onChange={this.onRadioChange} value={this.state.radioValue}>
                                    <Radio style={radioStyle} value={1}>It's junk content</Radio>
                                    <Radio style={radioStyle} value={2}>It's spam content</Radio>
                                    <Radio style={radioStyle} value={3}>It's Abusive content</Radio>
                                    <Radio style={radioStyle} value={4}>It's Copyright content</Radio>
                                </RadioGroup>
                            </div>
                        </div>
                    </Modal>

                    <Modal
                        title="filter By"
                        visible={this.state.visible13}
                        onOk={this.handleOk13}
                        onCancel={this.handleCancel13}>
                        <div className="contentfanclubdeletion">
                            <p>Do you want to delete this fanclub ? </p>
                        </div>
                    </Modal>
                </div>
            </Dashboard>
        );
    }
}

export default Newcontentcurator;

/* eslint-disable */