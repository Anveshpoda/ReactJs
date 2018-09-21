/* eslint-disable */
import React from 'react';
import Dashboard from '../Dashboard/Dashboard';
import { Col, Button, Avatar, Icon, Card, Table, Input, Modal, Select, Checkbox, Alert, Row, Pagination, message } from 'antd';
import { Link } from 'react-router';
import ReactPlayer from 'react-player';
import moment from 'moment';
import curation from './curation.css';
import amitabh1 from '../images/amitabh1.jpg';
const Option = Select.Option;
const Search = Input.Search;

class Curation extends React.Component {
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
      chall: [],
      //fanclubs
      Fanclubs: [],
      fanclubduration: ''

    }
  }
  fanclubDetailChange = (value) => {
    this.setState({ fanclubsdetails: value, challengestypes: '' })
  }
  durationChange = (value) => {
    this.setState({ fanclubduration: value, challengestypes: '', pagenumber: 1 })
    this.getFanclubs(value, 1)
  }
  getFanclubs = (criteria, page) => {
    var _this = this;
    const url = '/fanClubs/curation/' + criteria + '/' + page;
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
          _this.setState({ Fanclubs: response.data, numofPages: response.noOfPages })
        }
        else {
        }
      })
  }
  unSelectcheckboxes = () => {
    var select_all = document.getElementById("select_all");
    var checkboxes = document.getElementsByClassName("checkbox");
    select_all.checked = false;
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
  }
  deleteModal = (feedid) => {
    this.setState({ mcdeletevisible: true, Feedid: feedid });
  }
  handleCancel = () => {
    this.setState({ mcdeletevisible: false });
  }
  moduleChange = (value) => {
    this.setState({
      module: value, challengestypes: '', feedidArray: [], fanclubduration: '', feedtype: '',
      allfeedArray: [], feedidArray: [],
      allfeedArray: [], mcfeedidArray: [],
      allmcfeedidArray: []
    });
    var pagenumber = this.state.pagenumber;
    { value == "FanclubfeedComments" ? this.getfanclubComments(pagenumber) : '' }
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
  contestTitleChange = (value) => {
    this.setState({ contestTitle: value });
    { value.length > 0 ? this.getChallengeType(this.state.pagenumber, value) : this.setState({ challenges: [] }) }
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

        }
        else {
        }
      })
  }

  // ttt = () => {
  //   var arr=[];
  //   this.state.chall.map((item)=>{
  //      if(!arr.includes(item.contestId)){
  //        arr.push({
  //          _id:item.contestId,
  //          contestTitle:item.contestTitle
  //         });
  //      }
  //    })
  //    this.setState({contestTitles:arr});
  //    console.log("arr",arr);
  // }
  ///////Message centre feed ///

  mccontestCheckboxChange = (key, mcfeedid) => {
    var select_all = document.getElementById("select_all"); //select all checkbox
    var checkboxes = document.getElementsByClassName("checkbox"); //checkbox items
    select_all.checked = false;
    if (select_all.checked === false) {
      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked === false) {
          for (var j of this.state.allmcfeedidArray) {
            if (mcfeedid === j) {
              this.state.allmcfeedidArray.splice(this.state.allmcfeedidArray.indexOf(j), 1)
            }
          }
        }
      }
      console.log("allmcfeedidArray",this.state.allmcfeedidArray)
    } else {
      const state = this.state;
      let mcfeedidArray = state.mcfeedidArray;
      if (mcfeedid && mcfeedidArray.indexOf(mcfeedid) === -1) {
        mcfeedidArray = [...mcfeedidArray, mcfeedid]
      } else {
        mcfeedidArray = mcfeedidArray.filter((mid) => mid !== mcfeedid)
      }
      console.log("mcfeedidArray",mcfeedidArray)
      this.setState({ mcfeedidArray });
    }
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
    var _this = this;
    this.setState({
      selectall: !(this.state.selectall), feedcheckboxall: !(this.state.feedcheckboxall), feedcheckbox: "-1"
      , feedcommentcheckboxall: !(this.state.feedcommentcheckboxall), mccheckboxall: !(this.state.mccheckboxall)
    });

    var select_all = document.getElementById("select_all"); //select all checkbox
    var checkboxes = document.getElementsByClassName("checkbox"); //checkbox items

    //select all checkboxes
    select_all.addEventListener("change", function (e) {
      for (i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = select_all.checked;
        if (_this.state.module === "Challenges") {
          var allmcfeedidArray = []
          for (let key in _this.state.challenges) {
            var challengeFeed = _this.state.challenges[key];
            allmcfeedidArray.push(challengeFeed._id);

          }
          _this.setState({ allmcfeedidArray: allmcfeedidArray });
        } else if (_this.state.module === "FanclubFeeds") {
          var allfeedArray = []
          for (let key in _this.state.fanclubFeeds) {
            var feed = _this.state.fanclubFeeds[key];
            allfeedArray.push(feed._id);
          }
          _this.setState({ allfeedArray: allfeedArray })
        } else if (this.state.module === "FanclubfeedComments") {
          var allfeedcommentidArray = [];
          for (let key in _this.state.fanclubComments) {
            var commentData = _this.state.fanclubComments[key];
            allfeedcommentidArray.push(commentData._id)
          }
          _this.setState({ allfeedcommentidArray: allfeedcommentidArray })
        }
      }
    });


    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].addEventListener('change', function (e) { //".checkbox" change 
        //uncheck "select all", if one of the listed checkbox item is unchecked
        if (this.checked == false) {
          select_all.checked = false;
        }
        //check "select all" if all checkbox items are checked
        if (document.querySelectorAll('.checkbox:checked').length == checkboxes.length) {
          select_all.checked = true;

        }
      });
    }
  }
  addfeatureFanclubFeed = (feedid) => {
    var _this = this;
    const url = '/fanclubs/feeds/curation/addFeature/' + feedid;
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
          _this.setState({ mcdeletevisible: false });
          message.success("The post has been Featured");
        }
        else {
        }
      })
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
      "ids": this.state.allfeedArray.length > 0 ? this.state.allfeedArray : this.state.feedidArray.length > 0 ?
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
        if (response.status === 200 && response.message === "Success") {
          _this.getfanclubFeeds(_this.state.feedtype, _this.state.pagenumber)
          _this.setState({
            feedidArray: [], allfeedArray: [],
            feedcheckbox: !(_this.state.feedcheckbox + _this.state.feedkey),
            selectall: false, feedcheckboxall: false, mcdeletevisible: false
          });

        }
        else {
        }
      })
  }
  addjunkFanclubFeed = (fanfeedid) => {
    var _this = this;
    const url = '/fanclubs/feeds/curation/addJunk/' + fanfeedid;
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
          _this.setState({ mcdeletevisible: false });
          _this.unSelectcheckboxes();
        }
        else {
        }
      })
  }
  deleteandaddJunkfanfeed = () => {
    this.addjunkFanclubFeed(this.state.Feedid);
    this.deleteFeed(this.state.Feedid);
  }
  ///
  deleteandaddJunkfanfeedcomment = () => {
    this.addjunkFanclubFeedComment(this.state.Feedid);
    this.deletefeedComment(this.state.Feedid);
  }
  addjunkFanclubFeedComment = (feedcommentid) => {
    var _this = this;
    const url = '/fanclubs/feeds/comments/curation/addJunk/' + feedcommentid;
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
          _this.setState({ mcdeletevisible: false })
        }
        else {
        }
      })
  }
  addfeatureFanclubFeedComment = (feedcommentid) => {
    var _this = this;
    const url = '/fanclubs/feeds/comments/curation/addFeature/' + feedcommentid;
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
          _this.setState({ mcdeletevisible: false });
          message.success("The post has been Featured");
          _this.unSelectcheckboxes();
        }
        else {
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
      "ids": this.state.allfeedcommentidArray.length > 0 ? this.state.allfeedcommentidArray : this.state.feedcommentidArray.length > 0 ?
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

        if (response.status === 200 && response.message === "Success") {
          _this.getfanclubComments(_this.state.pagenumber)
          _this.setState({
            feedcommentidArray: [], allfeedcommentidArray: [],
            feedcheckbox: !(_this.state.feedcommentcheckbox + _this.state.feedkey),
            selectall: false, feedcommentcheckboxall: false, mcdeletevisible: false
          });
          _this.unSelectcheckboxes();
        }
        else {
        }
      })
  }
  addmcfeedFeatured = (mcfeedid) => {
    var _this = this;
    const url = '/curation/contests/addFeature/' + mcfeedid;
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
        console.log("response", response)
        if (response.status === 200 && response.message === "Success") {
          _this.setState({ mcdeletevisible: false });
          message.success("The post has been Featured");
          _this.unSelectcheckboxes();
        }
        else {
        }
      })
  }
  deleteandaddJunkMcfeed = () => {
    this.addmcFeedtoJunk(this.state.Feedid);
    this.deletemcFeed(this.state.Feedid);
  }
  addmcFeedtoJunk = (mcfeedid) => {
    var _this = this;
    const url = '/curation/contests/addJunk/' + mcfeedid;
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
          _this.setState({ mcdeletevisible: false });
          _this.unSelectcheckboxes();
        }
        else {
        }
      })
  }
  deletemcFeed = (mcfeedid) => {
    var allmcfeedidArray = [];
    var mcfeedids = [];
    if (mcfeedid === "Delete" && this.state.mcfeedidArray.length === 0) {
      message.info("Please select any post to delete");
    } else if (mcfeedid === "Deleteall") {
      for (let key in this.state.challenges) {
        var challengeFeed = this.state.challenges[key];
        allmcfeedidArray.push(challengeFeed._id)
      }
    } else if (mcfeedid.length > 0) {
      mcfeedids.push(mcfeedid);
    }
    var _this = this;
    var data = {
      "ids": this.state.allmcfeedidArray.length > 0 ? this.state.allmcfeedidArray : this.state.mcfeedidArray.length > 0 ?
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
        if (response.status === 200 && response.message === "Success") {
          // if(_this.state.challenges.length )
          _this.getMcContestTitles(_this.state.challengestypes)


          // _this.ttt();

          _this.setState({
            mcfeedidArray: [], allmcfeedidArray: [],
            mccheckbox: !(_this.state.mccheckbox + _this.state.mccontestkey),
            selectall: false, mccheckbox: false, mcdeletevisible: false
          });
          _this.unSelectcheckboxes();
        }
        else {
        }
      })
  }
  feedTypeChange = (value) => {
    var select_all = document.getElementById("select_all");
    { (this.state.module === "FanclubFeeds" && this.state.fanclubFeeds.length !== 0 && select_all) ? select_all.checked = false : '' }
    this.setState({ feedtype: value });
    this.getfanclubFeeds(value, this.state.pagenumber)
  }
  getfanclubComments = (pagenumber) => {
    var _this = this;
    const url = '/fanclubs/comments/curation/dashboard/' + pagenumber;
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
  getfanclubFeeds = (feedtype, pagenumber) => {
    var _this = this;
    const url = '/fanclubs/feed/curation/' + feedtype + '/dashboard/' + pagenumber;
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
  feedandCommentPagination = (page) => {
    this.setState({ pagenumber: page, feedcheckbox: "-1", selectall: false, feedcheckboxall: false });
    var select_all = document.getElementById("select_all");
    var checkboxes = document.getElementsByClassName("checkbox");
    {
      this.state.module === "Fanclubs" ? '' :
        select_all.checked = false;
      for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
      }
    }

    {
      (this.state.module === "Challenges") ? this.getChallengeType(page, this.state.contestTitle) :
        this.state.module === "FanclubFeeds" ? this.getfanclubFeeds(this.state.feedtype, page) :
          this.state.module === "FanclubfeedComments" ? this.getfanclubComments(page) :
            this.state.module === "Fanclubs" ? this.getFanclubs(this.state.fanclubduration, page) : ''
    }
  }
  deleteJunkFanclub = (fanclubid) => {
    var _this = this;
    const url = '/curation/junkFan/' + fanclubid;
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
          _this.getFanclubs(_this.state.fanclubduration, _this.state.pagenumber);
          _this.setState({ mcdeletevisible: false });
        }
        else {
        }
      })
  }
  render() {
    console.log("this", this.state)
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
                <div className="ChalngsWallPosts">
                  <div className="newContentCuratorFooter">
                    <ul className="list-inline">
                      <li className="ContentCuratTitless">
                        <h4 className="newContest-CuratorsDetails">{challengeFeed.contestTitle}</h4>
                        {/* <h4 className="newContest-CuratorsDetails">Name / Details</h4> */}
                      </li>
                      <li className="NewContent-Curatoriconspost">
                        <p>
                          {/*<span onClick={this.addmcfeedFeatured.bind(this, challengeFeed._id)}> 
                        <Icon className="NewContentcuratoriconsh3" type="star-o" /></span>*/}

                          <span onClick={this.deleteModal.bind(this, challengeFeed._id)}><Icon className="NewContentcuratoriconsh3" type="delete" /></span></p>
                      </li>
                    </ul>
                  </div>
                  <div className="NewContentCuratorContent">
                    <ul className="list-inline">
                      <li className="ContentCuratorsWallpostsavt">
                        <Avatar src={challengeFeed.userData[0].profileImage}>{challengeFeed.userData[0].fullName.charAt(0)}</Avatar>
                        {/* <img className="Contentuserprofile" src={challengeFeed.userData[0].profileImage ? challengeFeed.userData[0].profileImage : amitabh1} alt="contest cover" /> */}
                      </li>
                      <li className="Content-curat-chlngdesc">
                        <h5 className="NewContent-userName">{challengeFeed.userData[0].fullName}</h5>

                      </li>

                    </ul>
                  </div>

                  <div><p className="ccCuratorWallpost"><span className="maintextcuratorfeed">{challengeFeed.feedData}</span></p>
                    <ul className="list-inline">
                      <li className="NewContent-CuratorCheck">
                        <span>  <input className="checkbox" onClick={this.mccontestCheckboxChange.bind(this, key, challengeFeed._id)} type="checkbox" name="check[]" /></span>
                        {/* {this.state.selectall === true ?
                        <Checkbox className="Curatorcheckbox1" onChange={this.mccontestCheckboxallChange.bind(this)}
                          checked={this.state.mccheckboxall}></Checkbox>
                        : <Checkbox className="Curatorcheckbox1"
                          onChange={this.mccontestCheckboxChange.bind(this, key, challengeFeed._id)}
                          value={this.state.mccheckbox + key}></Checkbox>} */}
                      </li>

                    </ul> </div> </div> :

                <div>
                  <div className="image">

                    <ReactPlayer width="100%" height="160px"
                      url={'https://www.youtube.com/watch?v=' + challengeFeed.feedData} playing={false}
                      controls />
                    <ul className="list-inline">
                      <li className="NewContent-CuratorCheck120">
                        <span>  <input className="checkbox" type="checkbox" name="check[]" onClick={this.mccontestCheckboxChange.bind(this, key, challengeFeed._id)} /></span>
                        {/* {this.state.selectall === true ?
                        <Checkbox className="Curatorcheckbox" onChange={this.mccontestCheckboxallChange.bind(this)} checked={this.state.mccheckboxall}></Checkbox>
                        : <Checkbox className="Curatorcheckbox" onChange={this.mccontestCheckboxChange.bind(this, key, challengeFeed._id)} value={this.state.mccheckbox + key}></Checkbox>} */}
                      </li>
                      <li className="NewContent-Curatoricons">
                        {/*<p>  
                           <span onClick={this.addmcfeedFeatured.bind(this, challengeFeed._id)}>
                        <Icon className="NewContentcuratoriconsh1" type="star-o" /></span></p>*/}

                        <p><span onClick={this.deleteModal.bind(this, challengeFeed._id)}><Icon className="NewContentcuratoriconsh1" type="delete" /></span></p>
                      </li>
                    </ul>
                  </div>
                  <div className="ContentCuratchlngmainlog">
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
                    <div className="newContentchlngCuratorFooter">
                      <h4 className="newContest-CuratorsDetails">{challengeFeed.contestTitle}</h4>
                      {/* <h4 className="newContest-CuratorsDetails">Name / Details</h4> */}
                    </div>
                  </div>
                </div>
              }
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
            <p className="FanClubFeedContentCheck">  <span>  <input className="checkbox" onClick={this.feedCheckboxChange.bind(this, key, feed._id)} type="checkbox" name="check[]" /></span></p>
            {/* {this.state.selectall === true ?
              <Checkbox className="Curatorcheckbox" onChange={this.feedCheckboxallChange.bind(this)} checked={this.state.feedcheckboxall}></Checkbox> :
              <Checkbox className="Curatorcheckbox" onChange={this.feedCheckboxChange.bind(this, key, feed._id)} value={this.state.feedcheckbox}></Checkbox>} */}
            <Card className="Curationfanclubimagecard">
              <div clssName="curatorCArdImages">

                <img className="Curationfanclubimage" src={feed.feedUrl} />
              </div>

              <div className="cardFooter">
                <ul className="list-inline">
                  <li className="CurationfanClubImagedesc" title={feed.description}>
                    {feed.description ? <p className="CurationfanClubImagedescpara"> {feed.description} </p> : ''}
                  </li>
                  <li className="floatRight">
                    <p> <span onClick={this.addfeatureFanclubFeed.bind(this, feed._id)} > <Icon className="NewContentcuratoriconsh2" type="star-o" /></span>


                      <span> <Icon type="delete" className="curtatorfeedicon" onClick={this.deleteModal.bind(this, feed._id)} /> </span></p>
                  </li>

                </ul>

              </div>

            </Card></Col></div> :
          feed.type === "text" ? <Col span={12} xs={12} sm={12} xl={8} lg={12} md={12} >
            <div className="fanClubCuratortextfeed">
              <ul className="list-inline">
                <li>

                  <p className="FanclubsTextContentCheck"><span>
                    <input className="checkbox" type="checkbox" onClick={this.feedCheckboxChange.bind(this, key, feed._id)} name="check[]" />
                    { /* {this.state.selectall === true ?
              <Checkbox className="Curatorcheckbox1" onChange={this.feedCheckboxallChange.bind(this)} checked={this.state.feedcheckboxall}></Checkbox> :
           <Checkbox className="Curatorcheckbox1" onChange={this.feedCheckboxChange.bind(this, key, feed._id)} value={this.state.feedcheckbox}></Checkbox>} */}
                  </span></p>
                </li>
                <li>

                  <p className="ContentCuratFanCFeedPost"><span className="maintextcuratorfeed"> {feed.description} </span></p>
                  <p>  <span className="fanClubcuratortxticon" onClick={this.deleteFeed.bind(this, feed._id)}></span></p>
                </li>
                <li className="curtaotrfeedsiocni">
                  <div className="CuratorFeedTextss">
                    <p> <span onClick={this.addfeatureFanclubFeed.bind(this, feed._id)}> <Icon className="NewContentcuratoriconsh2" type="star-o" /></span>
                      <span onClick={this.deleteModal.bind(this, feed._id)}> <Icon type="delete" className="curtatorfeedicon" /></span></p>
                  </div>
                </li>
              </ul>
            </div></Col> :

            feed.type === "video" ?
              <div><Col span={6} xs={12} sm={12} xl={4} lg={6} md={6} className="Content-videos">
                <p className="FanClubFeedContentCheck"><span>  <input className="checkbox" type="checkbox" onClick={this.feedCheckboxChange.bind(this, key, feed._id)} name="check[]" /></span></p>
                {/* {this.state.selectall === true ?
                  <Checkbox className="Curatorcheckbox" onChange={this.feedCheckboxallChange.bind(this)} checked={this.state.feedcheckboxall}></Checkbox> :
                  <Checkbox className="Curatorcheckbox" onChange={this.feedCheckboxChange.bind(this, key, feed._id)} value={this.state.feedcheckbox}></Checkbox>} */}
                <Card><ReactPlayer width="100%" height="150px" config={{ youtube: { playerVars: { showinfo: 1 } } }}
                  url={'https://www.youtube.com/watch?v=' + feed.feedUrl} playing={false} controls />

                  <div className="cardFooter">
                    <ul className="list-inline">
                      <li title={feed.description} >
                        <p className="curatorfanClubvideodescpara"> {feed.description} </p>
                      </li>
                      <li className="floatRight">
                        <p><span onClick={this.addfeatureFanclubFeed.bind(this, feed._id)}> <Icon className="NewContentcuratoriconsh2" type="star-o" /></span>


                          <span><Icon type="delete" className="curtatorfeedicon" onClick={this.deleteModal.bind(this, feed._id)} /></span></p>
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
          <div className="fanClubCuratortextfeedcomment">
            <ul className="list-inline">
              <li>
                <p className="ContentCuFanClubCmnt"><span>
                  <input className="checkbox" type="checkbox" name="check[]" onClick={this.feedcommentCheckboxChange.bind(this, key, commentdata._id)} />
                  {/* {this.state.selectall === true ?
            <Checkbox onChange={this.feedcommentCheckboxallChange.bind(this)} checked={this.state.feedcommentcheckboxall}></Checkbox> :
            <Checkbox onChange={this.feedcommentCheckboxChange.bind(this, key, commentdata._id)} value={this.state.feedcommentcheckbox + key}></Checkbox>} */}
                </span></p></li>
              <li>
                <p className="fancCommentscurator">
                  <span className="maintextcuratorfeed">{commentdata.comment}</span></p>
              </li>
              <li className="FanCCFeedCratoCmnt">
                <div className="ContentFanClubComment">
                  <p>
                    <span onClick={this.addfeatureFanclubFeedComment.bind(this, commentdata._id)}> <Icon className="NewContentcuratoriconsh2" type="star-o" /></span>
                    <span className="fanClubcuratortxticon" onClick={this.deleteModal.bind(this, commentdata._id)}><Icon type="delete" className="curtatorfeedicon" /></span> </p>
                </div>
              </li>
            </ul>
          </div>
        </Col>
        </div>
      )
    }
    var container = (
      <Alert className="ContneChallengeAlert"
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
        description="There are no Feed Comments to display."
        type="info"
        />
    )
    const columns = [{
      title: 'Fanclub Name',
      dataIndex: 'fanclubname',

    }, {
      title: 'Created By',
      dataIndex: 'createdby',

    },
    {
      title: 'Created Date',
      dataIndex: 'createddate',

    }, {
      title: 'No of Members Joined',
      dataIndex: 'memebersjoined',

    }, {
      title: 'Celebrity Name',
      dataIndex: 'celebrityname',

    },
    {
      title: this.state.fanclubduration === "noFeeds" || this.state.fanclubduration === "noMembersFeeds" ? 'Last Feed Date' : null,
      dataIndex: this.state.fanclubduration === "noFeeds" || this.state.fanclubduration === "noMembersFeeds" ? 'lastfeeddate' : null,

    },
    {
      title: this.state.fanclubduration === "noMembers" || this.state.fanclubduration === "noMembersFeeds" ? 'Last Member Joined Date' : null,
      dataIndex: this.state.fanclubduration === "noMembers" || this.state.fanclubduration === "noMembersFeeds" ? 'lastmemberjoineddate' : null,

    },
    {
      title: 'Actions',
      dataIndex: 'actions',

    }
    ];

    var data = [];
    for (let i in this.state.Fanclubs) {
      var obj = this.state.Fanclubs[i];
      data.push({
        key: parseInt(i) + 1,
        fanclubname: obj.name,
        createdby: obj.creatorName,
        createddate: moment(obj.createdDate).format("DD/MM/YYYY"),
        memebersjoined: obj.userCount,
        celebrityname: obj.celebrityName,
        lastfeeddate: moment(obj.lastFeedDate).format("DD/MM/YYYY"),
        lastmemberjoineddate: moment(obj.lastMemberDate).format("DD/MM/YYYY"),
        actions: <div onClick={this.deleteModal.bind(this, obj._id)}> <Icon className="Conntfancdeliconmem" type="delete" /></div>
      })
    }
    const tableConfig = {
      pagination: false
    }
    return (
      <Dashboard>
        <div className="ContentCuration-New">

          <div>
            <Row>
              <Col span={24} className="HeaderNewContnetc">
                <Col span={4}>
                  <h3 className="ContentCurationNavmainHeader">Content Curation</h3>
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
                    <Option value="Fanclubs">Fanclubs</Option>
                    {/* <Option value="ChallengesComments">Challenges Comments</Option>*/}

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
                      <Option value="karoke">Karaoke</Option>
                      <Option value="wallpost">Wall Post</Option>
                    </Select> </Col> : this.state.module === "Fanclubs" ?
                    <div>
                      <Col span={4} className="Curatormenuselects12">
                        <Select className="Curatormenuselects"
                          getPopupContainer={triggerNode => triggerNode.parentNode}
                          showSearch

                          placeholder="Select Criteria"
                          optionFilterProp="children"
                          value={this.state.fanclubduration || undefined}
                          onChange={this.durationChange.bind(this)}
                          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                          >
                          <Option value="noMembers">No Members</Option>
                          <Option value="noFeeds">No Feeds</Option>
                          <Option value="noMembersFeeds">No Members and Feeds</Option>
                        </Select>  </Col>
                      {/* {this.state.fanclubduration ? <Col span={4} className="Curatormenuselects12">
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
                        </Select>  </Col> : ''} */}
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
                <div className="SubnavNewContentc">
                  <ul className="list-inline SubnavNewContentculs">
                    <li>
                      <Link to="/Curation/JunkLibrary" ><span>  <Icon className="NewContentcuratormenuicons" type="delete" /></span><span className="Menutitles"> Junk Library</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/Curation/FeaturedLibrary" >
                        <span><Icon className="NewContentcuratormenuicons" type="star-o" /></span> <span className="Menutitles">  Featured Posts</span>
                      </Link>
                    </li>

                  </ul>
                </div>
              </Col>

              <Col span={24} className="NewContentCurator-minimenu">
                <Col span={4}>
                  {this.state.module === "Fanclubs" ? '' : (this.state.module === "Challenges" && this.state.challengestypes && this.state.contestTitle.length !== 0) || (this.state.module === "FanclubFeeds" && this.state.feedtype) || (this.state.module === "FanclubfeedComments") ?
                    <div className="ContentCuratorSelecTall"> <input type="checkbox" id="select_all" onClick={this.selectAllChange.bind(this)} /><span> Select All</span> </div> : ''}
                </Col>
                {/* <Checkbox className="NewContent-curatorSelectAll"
                    onChange={this.selectAllChange.bind(this)} value={this.state.selectall}>Select all</Checkbox> 
               
                {/* <Col span={4} className="CurationSearengine">
                  <Search className="CurationSearches"
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                  
                  />
                </Col> */}
                <Col span={8}>
                  {this.state.module === "Fanclubs" ? '' : <Button type="primary" onClick={this.state.module === "Challenges" ? this.deletemcFeed.bind(this, this.state.Feedid)
                    : this.state.module === "FanclubFeeds" ? this.deleteFeed.bind(this, this.state.Feedid) :
                      this.state.module === "FanclubfeedComments" ? this.deletefeedComment.bind(this, this.state.Feedid) : null}>Delete Junk</Button>}

                  <Button type="primary">Feature Post</Button>

                </Col>

              </Col>

            </Row>
          </div>

          <div>
            {(this.state.module === "Challenges" && this.state.challengestypes && this.state.contestTitle) ?
              <Row className="CuratorRoes">{challengesData.length > 0 ? challengesData : <h1>{container}</h1>} </Row> :
              (this.state.module === "FanclubFeeds" && this.state.feedtype)
                ? <div><Row className="CuratorRoes"> {feedData.length > 0 ? feedData : <h1>{feedAlert}</h1>}</Row></div> :
                this.state.module === "FanclubfeedComments" ? <div><Row>{commentData.length > 0 ?
                  commentData : <h1>{commentAlert}</h1>} </Row></div> : (this.state.module === "Fanclubs" && this.state.fanclubduration) ? <div className="contentCuratorFanClubTable12">
                    <Table className="contentCuratorFanClubTable" columns={columns} dataSource={data} {...tableConfig} /></div> : ''}

          </div>
          <div>
            <Row>
              {(this.state.module === "Challenges" && this.state.challengestypes && this.state.contestTitle.length !== 0) || (this.state.module === "FanclubFeeds" && this.state.feedtype) || (this.state.module === "FanclubfeedComments") ||
                (this.state.module === "Fanclubs" && this.state.fanclubduration)
                ? <Col span={24}><Pagination className="FanClubpageintion" current={this.state.pagenumber} onChange={this.feedandCommentPagination.bind(this)} total={this.state.numofPages * 10} /></Col> : ''}
            </Row>
          </div>
          <Modal
            title="Confirm Deletion"
            visible={this.state.mcdeletevisible}

            onCancel={this.handleCancel}
            footer={
              this.state.module === "Fanclubs" ? <div><Button onClick={this.deleteJunkFanclub.bind(this, this.state.Feedid)}>Delete Fanclub</Button> </div> :
                <div>
                  {this.state.module === "Challenges" && this.state.challengestypes === "wallpost" ? <Button onClick={this.state.module === "Challenges"
                    ? this.deleteandaddJunkMcfeed.bind(this) : this.state.module === "FanclubFeeds" ? this.deleteandaddJunkfanfeed.bind(this)
                      : this.state.module === "FanclubfeedComments" ? this.deleteandaddJunkfanfeedcomment.bind(this) : null}>Add to Junk Library</Button> : ''}

                  <Button onClick={this.state.module === "Challenges" ? this.deletemcFeed.bind(this, this.state.Feedid)
                    : this.state.module === "FanclubFeeds" ? this.deleteFeed.bind(this, this.state.Feedid) :
                      this.state.module === "FanclubfeedComments" ? this.deletefeedComment.bind(this, this.state.Feedid) : null}>Delete anyway</Button></div>}
            >
            <p>{this.state.module === "Fanclubs" ? <span>Do you Want Delete The Fanclub </span> :
              <span>Do you Want Delete The Post </span>}</p>

          </Modal>
        </div>

      </Dashboard>
    );
  };
}

export default Curation;
/* eslint-disable */