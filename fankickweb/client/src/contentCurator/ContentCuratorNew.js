/* eslint-disable */
import React from 'react';
import Dashboard from '../Dashboard/Dashboard';
import { Link } from 'react-router';
import { Col, Form, Icon, Row, Input, Checkbox, Alert, message, Menu, Dropdown, Button, Card, Select, Pagination, Layout } from 'antd';
import ReactPlayer from 'react-player';
import curation from './curation.css';
const Search = Input.Search;
const Option = Select.Option;

class Curation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      module: '',
      fanclubduration: '',
      challengestypes: '',
      fanclubsdetails: '',
      challenges: [],
      pagenumber: 1,
      feedtype: '',
      fanclubFeeds: [],
      fanclubComments: [],
      numofPages: 0,
      selectall: false,
      feedcheckbox: false,
      feedcheckboxall: false,
      feedkey: 0,
      feedidArray: [],
      allfeedArray: [],
      ////feedcomment///
      feedcommentcheckbox: false,
      feedcommentcheckboxall: false,
      feedcommentidArray: [],
      allfeedcommentidArray: [],
      feedcommentkey: 0,
      ///mc posts//
      mccheckboxall: false,
      mccheckbox: false,
      mcfeedidArray: [],
      allmcfeedidArray: [],
      mccontestkey: 0

    }
  }
  ///////Message centre feed ///

  mccontestCheckboxChange = (key, mcfeedid) => {
    this.setState({ allmcfeedidArray: [] });
    const state = this.state;
    let mcfeedidArray = state.mcfeedidArray;
    if (mcfeedid && mcfeedidArray.indexOf(mcfeedid) === -1) {
      mcfeedidArray = [...mcfeedidArray, mcfeedid]
    } else {
      mcfeedidArray = mcfeedidArray.filter((mid) => mid !== mcfeedid)
    }
    this.setState({ mcfeedidArray });
    this.setState({ mccheckbox: !(this.state.mccheckbox + key), mccontestkey: key })
  }

  mccontestCheckboxallChange = (checked) => {
    this.setState({ mccheckboxall: !(this.state.mccheckboxall) });
  }
  /////message centre feed /////
  //fanclub feed///
  feedCheckboxChange = (key, feedids) => {
    this.setState({ allfeedArray: [] })
    const state = this.state;
    let feedidArray = state.feedidArray;
    if (feedids && feedidArray.indexOf(feedids) === -1) {
      feedidArray = [...feedidArray, feedids];
    } else {
      feedidArray = feedidArray.filter((id) => id !== feedids)
    }
    this.setState({ feedidArray });
    this.setState({ feedcheckbox: !(this.state.feedcheckbox + key), feedkey: key });
  }
  feedCheckboxallChange = (checked) => {
    this.setState({ feedcheckboxall: !(this.state.feedcheckboxall) })
  }
  //////fanclub feed end////
  ///fanclub feed comment ////
  feedcommentCheckboxChange = (key, feedcommentids) => {
    this.setState({ allfeedcommentidArray: [] })
    const state = this.state;
    let feedcommentidArray = state.feedcommentidArray;
    if (feedcommentids && feedcommentidArray.indexOf(feedcommentids) === -1) {
      feedcommentidArray = [...feedcommentidArray, feedcommentids];
    } else {
      feedcommentidArray = feedcommentidArray.filter((id) => id !== feedcommentids)
    }
    this.setState({ feedcommentidArray });
    this.setState({ feedcommentcheckbox: !(this.state.feedcommentcheckbox + key), feedcommentkey: key });
  }
  feedcommentCheckboxallChange = (checked) => {
    this.setState({ feedcommentcheckboxall: !(this.state.feedcommentcheckboxall) })
  }
  ///fanclunb feed comment end/////
  selectAllChange = (checked) => {
    this.setState({
      selectall: !(this.state.selectall), feedcheckboxall: !(this.state.feedcheckboxall)
      , feedcommentcheckboxall: !(this.state.feedcommentcheckboxall), mccheckboxall: !(this.state.mccheckboxall)
    });
  }
  feedTypeChange = (value) => {
    this.setState({ feedtype: value });
    this.getfanclubFeeds(value, this.state.pagenumber)
  }
  fanclubDetailChange = (value) => {
    this.setState({ fanclubsdetails: value, challengestypes: '' })
  }
  durationChange = (value) => {
    this.setState({ fanclubduration: value, challengestypes: '' })
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
    this.setState({ challengestypes: value });
    this.getChallengeType(value);
  }
  feedandCommentPagination = (page) => {
    this.setState({ pagenumber: page, feedcheckbox: !(this.state.feedcheckbox + this.state.feedkey), selectall: false, feedcheckboxall: false });
    {
      this.state.module === "FanclubFeeds" ? this.getfanclubFeeds(this.state.feedtype, page) :
        this.state.module === "FanclubfeedComments" ? this.getfanclubComments(page) : ''
    }
  }
  deleteFeed = (feedid) => {
    var allfeedArray = [];
    var feedids = [];
    if (feedid === "Delete" && this.state.feedidArray.length === 0) {
      message.info("Please select any feed to delete");
    } else if (feedid === "Deleteall") {
      for (let key in this.state.fanclubFeeds) {
        var feed = this.state.fanclubFeeds[key];
        allfeedArray.push(feed._id);
      }
    } else if (feedid.length > 0) {
      feedids.push(feedid);
    }
    var _this = this;
    var data = {
      "ids": allfeedArray.length > 0 ? allfeedArray : this.state.feedidArray.length > 0 ?
        this.state.feedidArray : feedids
    }
    const url = '/fanclubs/curation/delete/fcFeed';
    var request = new Request(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        'x-access-token': sessionStorage.getItem('token')
      }
    });
    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        {
          response.status === 200 && response.message === "Success" ?
            _this.getfanclubFeeds(_this.state.feedtype, _this.state.pagenumber)
            && _this.setState({
              feedidArray: [], allfeedArray: [],
              feedcheckbox: !(_this.state.feedcheckbox + _this.state.feedkey), selectall: false, feedcheckboxall: false
            })
            : ''
        }
      })
  }
  deletefeedComment = (feedcommentid) => {
    var allfeedcommentidArray = [];
    var feedcommentids = [];
    if (feedcommentid === "Delete" && this.state.feedcommentidArray.length === 0) {
      message.info("Please select any feed comment to delete");
    } else if (feedcommentid === "Deleteall") {
      for (let key in this.state.fanclubComments) {
        var feedcomment = this.state.fanclubComments[key];
        allfeedcommentidArray.push(feedcomment._id);
      }
    } else if (feedcommentid.length > 0) {
      feedcommentids.push(feedcommentid);
    }
    var _this = this;
    var data = {
      "ids": allfeedcommentidArray.length > 0 ? allfeedcommentidArray : this.state.feedcommentidArray.length > 0 ?
        this.state.feedcommentidArray : feedcommentids
    }
    const url = '/fanclubs/curation/delete/fcFeedComment';
    var request = new Request(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        'x-access-token': sessionStorage.getItem('token')
      }
    });
    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        {
          response.status === 200 && response.message === "Success" ?
            _this.getfanclubComments(_this.state.pagenumber)
            && _this.setState({
              feedcommentidArray: [], allfeedcommentidArray: [],
              feedcheckbox: !(_this.state.feedcommentcheckbox + _this.state.feedkey),
              selectall: false, feedcommentcheckboxall: false
            })
            : ''
        }
      })
  }
  deletemcFeed = (mcfeedid) => {
    var allmcfeedidArray = [];
    var mcfeedids = [];
    if (mcfeedid === "Delete" && this.state.mcfeedidArray.length === 0) {
      message.info("Please select any post to delete");
    } else if (mcfeedid === "Deleteall") {
      var chall = this.state.challenges;
      for (var i = 0; i < chall.length; i++) {
        for (var j = 0; j < chall[i].feedDetails.length; j++) {
          allmcfeedidArray.push(chall[i].feedDetails[j]._id);
        }
      }
    } else if (mcfeedid.length > 0) {
      mcfeedids.push(mcfeedid);
    }
    var _this = this;
    var data = {
      "ids": allmcfeedidArray.length > 0 ? allmcfeedidArray : this.state.mcfeedidArray.length > 0 ?
        this.state.mcfeedidArray : mcfeedids
    }
    const url = '/mc/curation/delete/mcFeed';
    var request = new Request(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        'x-access-token': sessionStorage.getItem('token')
      }
    });
    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        {
          response.status === 200 && response.message === "Success" ?
            _this.getChallengeType(_this.state.challengestypes)
            && _this.setState({
              mcfeedidArray: [], allmcfeedidArray: [],
              mccheckbox: !(_this.state.mccheckbox + _this.state.mccontestkey),
              selectall: false, mccheckbox: false
            })
            : ''
        }
      })
  }
  getfanclubComments = (pagenumber) => {
    var _this = this;
    const url = '/fanclubs/comments/curation/' + pagenumber;
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
          _this.setState({ fanclubComments: response.data.comments, numofPages: response.data.noOfPages })
        }
        else {
        }
      })
  }
  getfanclubFeeds = (feedtype, pagenumber) => {
    var _this = this;
    const url = '/fanclubs/feed/curation/' + feedtype + '/' + pagenumber;
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
          _this.setState({ fanclubFeeds: response.data, numofPages: response.numofPages });
        }
        else {
        }
      })
  }
  getChallengeType = (challengetype) => {
    var _this = this;
    const url = '/contests/curation/' + challengetype;
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
        if (response.statusCode === 1 && response.statusMessage === "Success") {
          _this.setState({ challenges: response.data })
        }
        else {
        }
      })
  }
  render() {
    var challengesData = [];
    var chall = this.state.challenges;
    for (var i = 0; i < chall.length; i++) {
      challengesData.push(<Col span={24}><h3 className="mainheader-Curation">{chall[i].contestTitle}</h3></Col>);
      for (var j = 0; j < chall[i].feedDetails.length; j++) {
        challengesData.push(<div>

          {chall[i].feedDetails[j].feedType === "wallpost" ? <div><Col span={12}><p className="fanClubCuratortextfeed"><span>
            {this.state.selectall === true ?
              <Checkbox className="Curatorcheckbox1" onChange={this.mccontestCheckboxallChange.bind(this)} checked={this.state.mccheckboxall}></Checkbox>
              : <Checkbox className="Curatorcheckbox1" onChange={this.mccontestCheckboxChange.bind(this, i, chall[i].feedDetails[j]._id)} value={this.state.mccheckbox + i}></Checkbox>}
          </span>
            <span className="maintextcuratorfeed">{chall[i].feedDetails[j].feedData}</span>
            <span className="fanClubcuratortxticon"><Icon type="delete" className="curtatorfeedicon" /></span>
          </p></Col></div> :


            <Col span={6} xs={12} sm={12} xl={4} lg={6} md={6} className="Content-videos">
              {this.state.selectall === true ?
                <Checkbox className="Curatorcheckbox" onChange={this.mccontestCheckboxallChange.bind(this)} checked={this.state.mccheckboxall}></Checkbox>
                : <Checkbox className="Curatorcheckbox" onChange={this.mccontestCheckboxChange.bind(this, i, chall[i].feedDetails[j]._id)} value={this.state.mccheckbox + i}></Checkbox>}

              <Card>
                <ReactPlayer width="100%" height="150px" className="width25Percnt" config={{ youtube: { playerVars: { showinfo: 1 } } }}
                  url={'https://www.youtube.com/watch?v=' + chall[i].feedDetails[j].feedData} playing={false} controls />


                <div className="cardFooter">
                  <ul className="list-inline">
                    <li className="floatRight">
                      <span onClick={this.deletemcFeed.bind(this, chall[i].feedDetails[j]._id)}>  <Icon type="delete" className="curtatorfeedicon" /> </span>
                    </li>
                  </ul>

                </div>

              </Card>
            </Col>
          }
        </div>)
      }
    }
    var feedData = [];
    for (let key in this.state.fanclubFeeds) {
      var feed = this.state.fanclubFeeds[key];
      feedData.push(
        <div>{feed.type === "image" ?
          <div><Col span={6} xs={12} sm={12} xl={4} lg={6} md={6} className="Content-videos">
            {this.state.selectall === true ?
              <Checkbox className="Curatorcheckbox" onChange={this.feedCheckboxallChange.bind(this)} checked={this.state.feedcheckboxall}></Checkbox> :
              <Checkbox className="Curatorcheckbox" onChange={this.feedCheckboxChange.bind(this, key, feed._id)} value={this.state.feedcheckbox + key}></Checkbox>}
            <Card className="Curationfanclubimagecard"><img className="Curationfanclubimage" src={feed.feedUrl} />

              <div className="cardFooter">
                <ul className="list-inline">
                  <li className="CurationfanClubImagedesc">
                    {feed.description ? <p className="CurationfanClubImagedescpara" title={feed.description}> {feed.description} </p> : ''}
                  </li>
                  <li className="floatRight">
                    <Icon type="delete" className="curtatorfeedicon" onClick={this.deleteFeed.bind(this, feed._id)} />
                  </li>
                </ul>

              </div>

            </Card></Col></div> :
          feed.type === "text" ? <Col span={12}><p className="fanClubCuratortextfeed"><span>
            {this.state.selectall === true ?
              <Checkbox className="Curatorcheckbox1" onChange={this.feedCheckboxallChange.bind(this)} checked={this.state.feedcheckboxall}></Checkbox> :
              <Checkbox className="Curatorcheckbox1" onChange={this.feedCheckboxChange.bind(this, key, feed._id)} value={this.state.feedcheckbox + key}></Checkbox>}

          </span>
            <span className="maintextcuratorfeed"> {feed.description} </span>
            <span className="fanClubcuratortxticon" onClick={this.deleteFeed.bind(this, feed._id)}><Icon type="delete" className="curtatorfeedicon" /></span></p></Col> :

            feed.type === "video" ?
              <div><Col span={6} xs={12} sm={12} xl={4} lg={6} md={6} className="Content-videos">
                {this.state.selectall === true ?
                  <Checkbox className="Curatorcheckbox" onChange={this.feedCheckboxallChange.bind(this)} checked={this.state.feedcheckboxall}></Checkbox> :
                  <Checkbox className="Curatorcheckbox" onChange={this.feedCheckboxChange.bind(this, key, feed._id)} value={this.state.feedcheckbox + key}></Checkbox>}
                <Card><ReactPlayer width="100%" height="150px" config={{ youtube: { playerVars: { showinfo: 1 } } }}
                  url={'https://www.youtube.com/watch?v=' + feed.feedUrl} playing={false} controls />

                  <div className="cardFooter">
                    <ul className="list-inline">
                      <li>
                        <p className="curatorfanClubvideodescpara"> {feed.description} </p>
                      </li>
                      <li className="floatRight">
                        <Icon type="delete" className="curtatorfeedicon" onClick={this.deleteFeed.bind(this, feed._id)} />
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
        <div><Col span={12}><p className="fanClubCuratortextfeed"><span>
          {this.state.selectall === true ?
            <Checkbox onChange={this.feedcommentCheckboxallChange.bind(this)} checked={this.state.feedcommentcheckboxall}></Checkbox> :
            <Checkbox onChange={this.feedcommentCheckboxChange.bind(this, key, commentdata._id)} value={this.state.feedcommentcheckbox + key}></Checkbox>}
        </span>
          <span className="maintextcuratorfeed">{commentdata.comment}</span>
          <span className="fanClubcuratortxticon" onClick={this.deletefeedComment.bind(this, commentdata._id)}><Icon type="delete" className="curtatorfeedicon" /></span></p>
        </Col></div>
      )
    }
    var container = (
      <Alert
        message="No Challenges"
        description="There are no challenges to display."
        type="info"
        />
    )
    var feedAlert = (
      <Alert
        message="No Feeds"
        description="There are no Feeds to display."
        type="info"
        />
    )
    var commentAlert = (
      <Alert
        message="No Feed Comments"
        description="There are no  Feed Comments to display."
        type="info"
        />
    )
    return (
      <Dashboard>
        <div className="">

          <div className="CurationdashboardnavSubMenu">
            <Row>
              <Col span={24} className="Curationsdashboardsubmenu">
                <Col span={4} className="Curatormenuselects12">
                  <Select className="Curatormenuselects"
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    showSearch
                    placeholder="Select Module"

                    value={this.state.module || undefined}
                    optionFilterProp="children"
                    placeholder="Select Module"
                    onChange={this.moduleChange.bind(this)}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
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
                          </Select>  </Col> : ''

                  // this.state.module === "FanclubFeeds" ?

                  //   <div>
                  //     <Col span={4}>
                  //       <Search type="text" value={this.state.feed} placeholder="Search Feed" 
                  //       onChange={this.fanclubFeedSearch.bind(this)}/></Col></div> :

                  //   this.state.module === "FanclubComments" ?

                  //     <div>
                  //       <Col span={4}> 
                  //         <Search type="text"
                  //        placeholder="Search Comment" 
                  //         />
                  //         </Col></div> :

                  //     ''
                }
                {/* {this.state.challengestypes === "WallPost" ?

               <div>   <Input type="text" placeholder="Search WallPost" />  </div> : ''} */}


                <Col span={5} className="Curatiormininav">
                  <ul className="list-inline curatormininavdelete">
                    <li>

                      <Checkbox onChange={this.selectAllChange.bind(this)} value={this.state.selectall}>Select</Checkbox>
                    </li>
                    <li>


                      <Dropdown getPopupContainer={triggerNode => triggerNode.parentNode} overlay={<Menu>

                        <Menu.Item key="0">
                          <a ><span onClick={this.state.module === "FanclubFeeds" ? this.deleteFeed.bind(this, "Delete") :
                            this.state.module === "FanclubfeedComments" ? this.deletefeedComment.bind(this, "Delete") :
                              this.state.module === "Challenges" ? this.deletemcFeed.bind(this, "Delete") : ''}>Delete</span></a>

                        </Menu.Item>
                        <Menu.Item key="1">
                          <a><span onClick={this.state.module === "FanclubFeeds" ? this.deleteFeed.bind(this, "Deleteall") :
                            this.state.module === "FanclubfeedComments" ? this.deletefeedComment.bind(this, "Deleteall")
                              : this.state.module === "Challenges" ? this.deletemcFeed.bind(this, "Deleteall") : ''} >Delete All</span></a>

                        </Menu.Item>

                      </Menu>} trigger={['click']} placement="bottomCenter">
                        <a className="ant-dropdown-link" href="">
                          <Button type="primary">Actions</Button>
                        </a>
                      </Dropdown>
                    </li>
                  </ul>
                </Col>
              </Col>

            </Row>

          </div>
          <div>
            <Row>
              <Link to="/Curation/ContentCuratorNew"><Button style={{ float: 'right', marginTop: '20px' }} type="primary">New Curation</Button></Link>
            </Row>
          </div>

          {(this.state.module === "Challenges" && this.state.challengestypes) ?
            <Row className="CuratorRoes">{challengesData.length > 0 ? challengesData : <h1>{container}</h1>} </Row> :
            (this.state.module === "FanclubFeeds" && this.state.feedtype)
              ? <div><Row className="CuratorRoes"> {feedData.length > 0 ? feedData : <h1>{feedAlert}</h1>}</Row></div> :
              this.state.module === "FanclubfeedComments" ? <div><Row>{commentData.length > 0 ?
                commentData : <h1>{commentAlert}</h1>} </Row></div> : ''}



          {(this.state.module === "FanclubFeeds" && this.state.feedtype) || this.state.module === "FanclubfeedComments"
            ? <Pagination className="FanClubpageintion" onChange={this.feedandCommentPagination.bind(this)} total={this.state.numofPages * 10} /> : ''}


        </div>
      </Dashboard>
    );
  }


}
export default Curation;
/* eslint-disable */