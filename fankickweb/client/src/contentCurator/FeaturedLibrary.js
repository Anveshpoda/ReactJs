
/* eslint-disable */
import React from 'react';
import { Link } from 'react-router';
import { Col, Button, Avatar, Icon, Card, Input, Modal, Select, Checkbox, Alert, Row, Pagination, message } from 'antd';
import curation from './curation.css';
import ReactPlayer from 'react-player';
import Dashboard from '../Dashboard/Dashboard';
import ReactDOM from 'react-dom';

class FeaturedLibrary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            module: '',
            ///challenges//
            challengestypes: '',
            feedpage1: 1,
            feedpage2: 1,
            challenges: [],
            //fanclub feeds//
            feedtype: '',
            fanclubFeeds: [],
            pagenumber: 1,
            numofPages: 0,
            selectall: false,
            feedcheckbox: "-1",
            feedcheckboxall: false,
            feedkey: 0,
            feedidArray: [],
            allfeedArray: [],
            ///fanclub feed comments//
            fanclubComments: [],
            feedcommentcheckbox: false,
            feedcommentcheckboxall: false,
            feedcommentidArray: [],
            allfeedcommentidArray: [],
            feedcommentkey: 0,
            ///mc junk//
            mcdeletevisible: false,
            mccheckboxall: false,
            mccheckbox: false,
            mcfeedidArray: [],
            allmcfeedidArray: [],
            mccontestkey: 0,
            //
            Feedid: '',
            contestTitles: [],
            contestTitle: [],
            chall: []

        }
    }

    moduleChange = (value) => {
        this.setState({
            module: value, challengestypes: '', feedidArray: [],
            allfeedArray: [], feedidArray: [],
            allfeedArray: [], mcfeedidArray: [],
            allmcfeedidArray: []
        });
        var pagenumber = this.state.pagenumber;
        { value == "FanclubfeedComments" ? this.getfanclubComments(pagenumber) : '' }
    }
    challengeTypeChange = (value) => {
        this.setState({ challengestypes: value, contestTitle: '' });
        this.getMcContestTitles(value);
    }
    getMcContestTitles = (challengesType) => {
        var _this = this;
        const url = '/contests/curation/contestTitle/' + challengesType + '/featured' ;
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
              _this.setState({ contestTitles: response.data })
            }
         
            else {
            }
          })
      }
    feedTypeChange = (value) => {
        this.setState({ feedtype: value });
        this.getfanclubFeeds(value, this.state.pagenumber)
    }
    contestTitleChange = (value) => {
        this.setState({ contestTitle: value });
        { value.length > 0 ? this.getChallengeType(this.state.pagenumber, value) : this.setState({ challenges: [] }) }
    }
    getChallengeType = (contestpagenumber,contestIds) => {
        var _this = this;
        var data ={
          "feedType": this.state.challengestypes,
          "contestIds": contestIds
        }
        const url = '/contests/curation/featured/' + contestpagenumber;
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
              _this.setState({ challenges: response.data.feedDetails , chall : response.data.feedDetails, numofPages: response.noOfPages })
            }
            else {
            }
          })
      }
    feedandCommentPagination = (page) => {
        this.setState({ pagenumber: page, feedcheckbox: "-1", selectall: false, feedcheckboxall: false });
        {
            (this.state.module === "Challenges") ? this.getChallengeType(page, this.state.contestTitle) :
                this.state.module === "FanclubFeeds" ? this.getfanclubFeeds(this.state.feedtype, page) :
                    this.state.module === "FanclubfeedComments" ? this.getfanclubComments(page) : ''
        }
    }
    getfanclubFeeds = (feedtype, pagenumber) => {
        var _this = this;
        const url = '/fanclubs/feed/curation/' + feedtype + '/featured/' + pagenumber;
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
                    _this.setState({ fanclubFeeds: response.data, numofPages: response.numofPages, mcdeletevisible: false });
                }
                else {
                }
            })
    }
    getfanclubComments = (pagenumber) => {
        var _this = this;
        const url = '/fanclubs/comments/curation/featured/' + pagenumber;
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
                    _this.setState({ fanclubComments: response.data.comments, numofPages: response.data.noOfPages, mcdeletevisible: false })
                }
                else {
                }
            })
    }

    render() {
        var contestTitle = this.state.contestTitles.map((contest) =>
        <Option value={contest._id}>{contest.contestTitle}</Option>);
        var challengesData = [];
        for (let key in this.state.challenges) {
          var challengeFeed = this.state.challenges[key];
          challengesData.push(
            <div>
              <Col xs={12} sm={12} xl={4} lg={6} md={6}>
                <Card>
                  {challengeFeed.feedType === "wallpost" ?
                    <div><p className="ccCuratorWallpost"><span className="maintextcuratorfeed">{challengeFeed.feedData}</span></p>
                      <ul className="list-inline">
                        <li className="NewContent-CuratorCheck">
                          {/* {this.state.selectall === true ?
                            <Checkbox className="Curatorcheckbox1" onChange={this.mccontestCheckboxallChange.bind(this)}
                              checked={this.state.mccheckboxall}></Checkbox>
                            : <Checkbox className="Curatorcheckbox1"
                              onChange={this.mccontestCheckboxChange.bind(this, key, challengeFeed._id)}
                              value={this.state.mccheckbox + key}></Checkbox>} */}
                        </li>
                     
                      </ul> </div> :
                    <div className="image">
    
                      <ReactPlayer width="100%" height="160px" url={'https://www.youtube.com/watch?v=' + challengeFeed.feedData} playing={false} />
                      <ul className="list-inline">
                        <li className="NewContent-CuratorCheck120">
                       
                          {/* {this.state.selectall === true ?
                            <Checkbox className="Curatorcheckbox" onChange={this.mccontestCheckboxallChange.bind(this)} checked={this.state.mccheckboxall}></Checkbox>
                            : <Checkbox className="Curatorcheckbox" onChange={this.mccontestCheckboxChange.bind(this, key, challengeFeed._id)} value={this.state.mccheckbox + key}></Checkbox>} */}
                        </li>
                      
                      </ul>
                    </div>}
                  <div className="NewContentCuratorContent">
                <ul className="list-inline">
                  <li>
                  <Avatar src={challengeFeed.userData[0].profileImage}>{challengeFeed.userData[0].fullName.charAt(0)}</Avatar> 
                    {/* <img className="Contentuserprofile" src={challengeFeed.userData[0].profileImage ? challengeFeed.userData[0].profileImage : amitabh1} alt="contest cover" /> */}
                  </li>
                  <li className="Content-curat-chlngdesc">
                    <h5 className="NewContent-userName">{challengeFeed.userData[0].fullName}</h5>
               
                  </li>
                </ul>
              </div>
                  <div className="newContentCuratorFooter">
                    <h4 className="newContest-CuratorsDetails">{challengeFeed.contestTitle}</h4>
                    {/* <h4 className="newContest-CuratorsDetails">Name / Details</h4> */}
                  </div>
                </Card>
    
              </Col>
    
            </div>
          )
        }
        var feedData = [];
        for (let key in this.state.fanclubFeeds) {
            var feed = this.state.fanclubFeeds[key];
            this.state.feedcheckbox = key;
            feedData.push(
                <div>{feed.type === "image" ?
                    <div><Col span={6} xs={12} sm={12} xl={4} lg={6} md={6} className="Content-videos">
                        <Card className="Curationfanclubimagecard">
                            <div clssName="curatorCArdImages">

                                <img className="Curationfanclubimage" src={feed.feedUrl} />
                            </div>

                            <div className="cardFooter">
                                <ul className="list-inline">
                                    <li className="CurationfanClubImagedesc" title={feed.description}>
                                        {feed.description ? <p className="CurationfanClubImagedescpara"> {feed.description} </p> : ''}
                                    </li>

                                </ul>

                            </div>

                        </Card></Col></div> :
                    feed.type === "text" ? <Col span={12} xs={12} sm={12} xl={8} lg={12} md={12} >
                        <div className="fanClubCuratortextfeed">
                            <ul className="list-inline">
                                <li>

                                    <p className="ContentCuratFanCFeedPost"><span className="maintextcuratorfeed"> {feed.description} </span></p>
                                    
                                </li>

                            </ul>
                        </div></Col> :

                        feed.type === "video" ?
                            <div><Col span={6} xs={12} sm={12} xl={4} lg={6} md={6} className="Content-videos">

                                <Card><ReactPlayer width="100%" height="150px" config={{ youtube: { playerVars: { showinfo: 1 } } }}
                                    url={'https://www.youtube.com/watch?v=' + feed.feedUrl} playing={false} controls />

                                    <div className="cardFooter">
                                        <ul className="list-inline">
                                            <li title={feed.description} >
                                                <p className="curatorfanClubvideodescpara"> {feed.description} </p>
                                            </li>

                                        </ul>

                                    </div>
                                </Card></Col> </div> : ''} </div>
            )
        }
        var commentData = [];
        for (let key in this.state.fanclubComments) {
            var commentdata = this.state.fanclubComments[key];
            commentData.push(
                <div><Col span={12} xs={12} sm={12} xl={8} lg={12} md={12} >
                    <div className="fanClubCuratortextfeed">
                        <ul className="list-inline">
                            <li>
                                <p className="fancCommentscurator">
                                    <span className="maintextcuratorfeed">{commentdata.comment}</span></p>
                            </li>
                        </ul>
                    </div>
                </Col>
                </div>
            )
        }
        var container = (
            <div className="FeaturedFilesAAlerts">
            <Alert
                message="No Challenges"
                description="There are no challenges to display."
                type="info"
            />
            </div>
        )
        var feedAlert = (
               <div className="FeaturedFilesAAlerts">
            <Alert
                message="No Feeds"
                description="There are no Feeds to display."
                type="info"
            />
            </div>
        )
        var commentAlert = (
               <div className="FeaturedFilesAAlerts">
            <Alert
                message="No Feed Comments"
                description="There are no Feed Comments to display."
                type="info"
            />
            </div>
        )
        return (
            <Dashboard>
                <div className="ContentCuration-New">
                    <div>
                        <Row>
                            <Col span={24} className="HeaderNewContnetc">
                                <Col span={4}>
                                    <h3 className="ContentCurationNavmainHeader"><Link to="/Curation"><span><Icon type="arrow-left" /></span></Link> <span>Featured Library</span></h3>
                                </Col>
                                <Col span={4} className="Curatormenuselects12">
                                    <Select className="Curatormenuselects"
                                        getPopupContainer={triggerNode => triggerNode.parentNode}
                                        showSearch
                                        placeholder="Select Module"

                                        value={this.state.module || undefined}
                                        optionFilterProp="children"
                                        placeholder="Select Module"
                                        onChange={this.moduleChange.bind(this)}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                        <Option value="Challenges">Challenges</Option>
                                        {/* <Option value="ChallengesComments">Challenges Comments</Option>
                      <Option value="Fanclubs">Fanclubs</Option> */}
                                        <Option value="FanclubFeeds">Fanclub Feeds</Option>
                                        <Option value="FanclubfeedComments">Fanclub Feed Comments</Option>
                                    </Select>
                                </Col>
                                {this.state.module === "Challenges" ?
                                    <Col span={4} className="Curatormenuselects12">
                                        <Select className="Curatormenuselects"
                                            getPopupContainer={triggerNode => triggerNode.parentNode}
                                            showSearch

                                            placeholder="Select Challenge Type"
                                            value={this.state.challengestypes || undefined}
                                            optionFilterProp="children"
                                            onChange={this.challengeTypeChange.bind(this)}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Option value="dubshmash">Dub 2 Win</Option>
                                            <Option value="karoke">Karoke</Option>
                                            <Option value="wallpost">Wall Post</Option>
                                        </Select> </Col> : this.state.module === "Fanclubs" ?
                                        <div>
                                            <Col span={4} className="Curatormenuselects12">
                                                <Select className="Curatormenuselects"
                                                    getPopupContainer={triggerNode => triggerNode.parentNode}
                                                    showSearch

                                                    placeholder="Select Duration"
                                                    optionFilterProp="children"
                                                    value={this.state.fanclubduration || undefined}
                                                    onChange={this.durationChange.bind(this)}
                                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                >
                                                    <Option value="3Months">3 Months</Option>
                                                    <Option value="6Months">6 Months</Option>
                                                    <Option value="12Months">12 Months</Option>
                                                </Select>  </Col>
                                            {this.state.fanclubduration ? <Col span={4} className="Curatormenuselects12">
                                                <Select className="Curatormenuselects"
                                                    getPopupContainer={triggerNode => triggerNode.parentNode}
                                                    showSearch

                                                    value={this.state.fanclubsdetails || undefined}
                                                    onChange={this.fanclubDetailChange.bind(this)}
                                                    placeholder="Select"
                                                    optionFilterProp="children"
                                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                >
                                                    <Option value="NoMembers">No Members</Option>
                                                    <Option value="NoEvents">No Events</Option>
                                                    <Option value="NoFeeds">No Feeds</Option>
                                                </Select>  </Col> : ''}
                                        </div>
                                        :
                                        this.state.module === "ChallengesComments" ?
                                            <div>
                                                <Col span={4}>
                                                    <Input type="text" placeholder="Search Comment" /> </Col></div> :

                                            this.state.module === "FanclubFeeds" ?
                                                <Col span={4} className="Curatormenuselects12">
                                                    <Select className="Curatormenuselects"
                                                        getPopupContainer={triggerNode => triggerNode.parentNode}
                                                        showSearch

                                                        placeholder="Select Feed Type"
                                                        optionFilterProp="children"
                                                        value={this.state.feedtype || undefined}
                                                        onChange={this.feedTypeChange.bind(this)}
                                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                    >
                                                        <Option value="image">Image</Option>
                                                        <Option value="text">Text</Option>
                                                        <Option value="video">Video</Option>
                                                    </Select>  </Col> : ''}
                                {this.state.challengestypes ? <Col span={4} className="Curatormenuselects12">
                                    <Select className="Curatormenuselects curatormultiselects"
                                        getPopupContainer={triggerNode => triggerNode.parentNode}
                                        showSearch
                                        mode="multiple"
                                        placeholder="Select contestTitle"
                                        value={this.state.contestTitle || undefined}
                                        optionFilterProp="children"
                                        onChange={this.contestTitleChange.bind(this)}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                        {contestTitle}
                                    </Select>
                                </Col> : null}

                            </Col>


                        </Row>
                    </div>
                    <div  className="FeaturedDepth">
                        {(this.state.module === "Challenges" && this.state.challengestypes) ?
                            <Row className="CuratorRoeshFeatured">{challengesData.length > 0 ? challengesData : <h1>{container}</h1>} </Row> :
                            (this.state.module === "FanclubFeeds" && this.state.feedtype)
                                ? <div><Row className="CuratorRoeshFeatured"> {feedData.length > 0 ? feedData : <h1>{feedAlert}</h1>}</Row></div> :
                                this.state.module === "FanclubfeedComments" ? <div><Row>{commentData.length > 0 ?
                                    commentData : <h1>{commentAlert}</h1>} </Row></div> : ''}

                    </div>
                    <div>
                        <Row>
                            {(this.state.module === "Challenges" && this.state.challengestypes) || (this.state.module === "FanclubFeeds" && this.state.feedtype) || this.state.module === "FanclubfeedComments"
                                ? <Col span={24}><Pagination className="FanClubpageintion" onChange={this.feedandCommentPagination.bind(this)} total={this.state.numofPages * 10} /></Col> : ''}
                        </Row>
                    </div>
                </div>
            </Dashboard>
        )
    }
}
export default FeaturedLibrary;
/* eslint-disable */