/* eslint-disable */
import React from 'react';
import classNames from 'classnames/bind';
import { Col, Button, Icon, Dropdown, Menu, Input, Modal, Select, Upload, message, Tooltip, Popover } from 'antd';
import fanclubs from './fanclubs.css';
import happy from '../images/happy.png';
import axios from 'axios';
import cool from '../images/cool.png';
import crying from '../images/crying.png';
import friendly from '../images/friendly.png';
import attachgallery from '../images/attachgallery.png';
import feedpicture from '../images/feedpicture.png';
import uploadfeedvideo from '../images/uploadfeedvideo.png';
import ReactTooltip from 'react-tooltip';
import ReactEmojiSelector from 'react-emoji-selector';
import 'react-emoji-selector/lib/react-emoji-selector.css';
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}







class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedtext: '',
      fanclubid: '',
      thumbnailUrl: '',
      feedUrl: '',
      type: '',
      errors: {},
      selectedEmoji: { emoji: '', key: '' },
      emojiPick: false,
      visible435: false,
      disable435: true,
      visible: false,
      disable: true,
      role: '',
      virtualUsers: [],
      clubMembers: [],
      virUser: "",
      feedUrl: "",
      disabled: false
    }
    this.baseState = this.state;
    this.fanid = this.props.fanclubid;
  }
  handleReset = (fanclubid) => {
    this.setState(this.baseState);
    this.getVirtualUsers();
    this.getFanclubMember(fanclubid)
  }
  feedComment = (e) => {
    this.setState({
      feedtext: e.target.value
    });
    if (this.state.feedtext === '') this.state.errors.feedtext = ''
  }
  componentDidMount() {
    console.log("Did mount");
    this.setState({ fanclubid: sessionStorage.fanClubId })

  }
  componentWillMount() {
    console.log("will mount");
    var user = JSON.parse(sessionStorage.getItem('user'));

    if (user.permissions !== '') {

      this.setState({ role: user.permissions.fanClubs })
    }
    this.getVirtualUsers();
    this.getFanclubMember(this.props.fanclubid);
  }

  getVirtualUsers = () => {
    var req = axios.create({
      headers: {
        'x-access-token': sessionStorage.token
      }
    });
    req.get('/virtualUsers').then((response) => {
      this.setState({ virtualUsers: response.data.data })
      console.log("response virtual", response.data.data)
    })
  }
  componentWillReceiveProps(nextProps) {
    console.log("recieve mount");
    this.setState({ fanclubid: nextProps.fanclubid });
    this.setState({ feedtext: '' })
    // this.getFanclubMember(nextProps.fanclubid)
  }

  // shouldComponentUpdate(nextProps) {
  //   if (String(this.state.fanclubid) === String(nextProps.fanclubid)) {
  //     return false;
  //   }
  //   return true;
  // }
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("should mount");
  //   console.log(this.state.fanclubid,sessionStorage.fanClubId)
  //   if (String(this.state.fanclubid) != String(sessionStorage.fanClubId)) {
  //     return true;
  //   }
  //   return false;
  // }
  // componentWillUpdate() {
  //   // var a = this.state.clubMembers;
  //   // var b = this.state.virtualUsers;
  //   // console.log("clubMembers",a);
  //   // console.log("virtualUsers",b)
  //   // var c = [];
  //   // a.map((item) => {
  //   //   var b = this.state.virtualUsers;
  //   //   b.filter((i) => i === item.userId);
  //   //   c.concat(b[0]);
  //   // })
  //   // console.log("c array", c)
  // }
  getFanclubMember = (FanclubId) => {
    var _this = this;
    var instance = axios.create({
      // timeout: 3000,
      headers: { 'x-access-token': sessionStorage.getItem('token') }
    });
    instance.get('/members/' + FanclubId).then((response) => {
      this.setState({ clubMembers: response.data.data.users });
      // this.setState({ inviteMember: response.data.data.inviteMember });
    });

  }

  onUserChange = (e) => {
    this.setState({ virUser: e });
    if (e != "") this.state.errors.virUser = "";
  }

  imageChange = (info) => {
    this.setState({ type: info.file.type.split("/")[0] });

    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      this.setState({
        feedUrl: info.file.response.data
      });
      var feedUrl = info.file.response.data;
      // this.postFeed(feedUrl)
    }
  }
  musicChange = (info) => {
    this.setState({ type: info.file.type.split("/")[0] });

    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      this.setState({
        feedUrl: info.file.response.data
      })
    }
  }
  postFeed = (feedUrl) => {
    let errors = {};
    console.log("this type", this.state.type)
    if (this.state.feedtext.trim() === '' && feedUrl === '') errors.feedtext = 'Description is Required';
    if (this.state.virUser === "") errors.virUser = "*mandatory field";
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      var _this = this;
      _this.setState({ disabled: true })
      var fanclubid = this.fanid;
      if (feedUrl === '') {
        this.state.type = "text";
      }
      var data = {
        "description": this.state.feedtext.trim(),
        "fanClubId": fanclubid,
        "feedUrl": feedUrl,
        "thumbnailUrl": this.state.thumbnailUrl,
        "type": this.state.type,
        "userId": this.state.virUser
      }
      const url = process.env.REACT_APP_API_HOST + '/rest/createNewsFeed';
      var request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });

      fetch(request)
        .then(response => response.json())
        .then(function (response) {
          if (response.statusCode === 1) {
            _this.handleReset(fanclubid);
            // _this.getVirtualUsers();
            
            _this.props.updateFeed(fanclubid);
            message.success("feed posted");
          }
          else if (response.statusCode === 0 && response.statusMessage === "you must join this fanclub") {
            _this.handleReset(fanclubid);
            _this.setState({ fanclubid: fanclubid, disabled: true });
            message.error("You must join this Fan Club");
          }
        });
    }
  }
  // componentWillUpdate() {
  //   this.getVirtualUsers();
  // }
  selectEmoji(e) {
    this.setState({ selectedEmoji: e })
    var emojitext = this.state.feedtext.concat(e.emoji);
    this.setState({ feedtext: emojitext })
  }
  emojiPicker = (e) => {
    this.setState({ emojiPick: !(this.state.emojiPick) })
  }




  showModal435 = () => {
    this.setState({
      visible435: true,
    });
  }
  handleOk435 = (e) => {
    this.setState({
      visible435: false,
    });
  }
  handleCancel435 = (e) => {
    this.setState({
      visible435: false,
    });
  }


  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  onenterFeedreply = (e) => {
    var feedUrl = ""
    { e.key === 'Enter' ? this.postFeed(feedUrl) : '' }
  }





  render() {
    console.log("render")
    console.log("clubMembers", this.state.clubMembers);
    console.log("virtualUsers", this.state.virtualUsers);
    var a = this.state.clubMembers;
    var b = this.state.virtualUsers;
    var c = [];
    if (a.length != 0 && b.length != 0) {
      a.forEach((i) => b.forEach((j) => {
        if (i.userId) {
          if (String(i.userId._id) === String(j._id)) {
            c.push(j);
          }
        }
      }))
      console.log("c", c)
    }
    var post = this.state.role.feedPost
    const image = {
      name: 'file',
      multiple: true,
      action: process.env.REACT_APP_API_HOST + '/rest/azureImageUploadWeb',
      onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    var virtualUsers = c.map((item) => <Option value={item._id}>{item.fullName}</Option>)



    const content = (
      <div className="FanClubUploadFeed">
        <ul className="list-inline">
          {/* <li className="Uploadfeedvideos">
<img src={uploadfeedvideo} alt="contestcover" onClick={this.showModal435} />
  </li> */}

          <li className="Uploadfeedimages">
            <img src={feedpicture} alt="contestcover" onClick={this.showModal} />
          </li>


        </ul>


      </div>
    );

    const fileList = [{
      uid: 0,
      name: ' ',
      status: ' ',
      url: ' ',
      thumbUrl: ' ',
    }];
    const props = {
      action: ' ',
      listType: ' ',
      defaultFileList: [...fileList],
    };

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const feedUrl = this.state.feedUrl;


    return (
      <div className="Coment">
        <ul className="list-inline" >
          <li className="ant-col-16 emojiInput">

            <Input type="text" className="commentInput" value={this.state.feedtext}
              onKeyPress={this.onenterFeedreply.bind(this)} onChange={this.feedComment.bind(this)} />
            <p style={{ color: "red" }}>{this.state.errors.feedtext}</p>
            {/* <a data-tip data-for='globalMultiple'>  <Icon type="smile" className="smilyIcon" onClick={this.emojiPicker.bind(this)} /> </a> */}
            <Popover className="ComentPopOver"
              content={<ReactEmojiSelector
                visibleAmount={10}
                searchPlaceholder='Search emoji'
                // showMoreButtonText='More'
                showMore={false}
                onSelect={(e) => this.selectEmoji(e)} />}
              trigger="hover"

              >
              <Icon type="smile" className="smilyIcon" onClick={this.emojiPicker.bind(this)} />
            </Popover>


            <Upload {...image}
              accept=".png,.jpg,.jpeg"
              showUploadList={false}
              onChange={this.imageChange.bind(this)}
              >
              <img className="Attachurls" src={attachgallery} alt="contestcover" width="16px" height="16px" />

            </Upload>

          </li>
          <li>
            <Select getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="Select One"
              style={{ width: 100 }}
              value={this.state.virUser || undefined}
              onChange={this.onUserChange}>
              {virtualUsers}
            </Select>
            <p style={{ color: "red" }}>{this.state.errors.virUser}</p>
            {/*  <Dropdown getPopupContainer={triggerNode => triggerNode.parentNode} overlay={<Menu>

                  {/* <Menu.Item key="0">
                    <a href="#">Video</a>
                  </Menu.Item> */}
            {/* <Menu.Item key="1">
                  <Upload {...music}
                      accept=".mp3,.m4a" showUploadList={false} onChange={this.musicChange.bind(this)}>
                       <a href="#" style={{ color: 'rgba(0, 0, 0, 0.65)' }}>Music</a>
                       </Upload>
                  </Menu.Item> 
                  <Menu.Item key="2">
                    <Upload {...image}
                      accept=".png,.jpg,.jpeg" showUploadList={false} onChange={this.imageChange.bind(this)}>  <span>Image</span></Upload>
                  </Menu.Item>

                </Menu>} trigger={['click']} placement="topLeft">
                  <span>Attach<Icon type="down" /></span>
                </Dropdown> */}
          </li>
          <li>

            <Button type="primary" className="comment-btn" disabled={this.state.disabled} onClick={this.postFeed.bind(this, feedUrl)}>Send</Button>

          </li>
        </ul>
        <ul className="list-inline" >


          <li >
            <ul className="list-inline emojis">
              <li className="floatRight" style={{ padding: 10 }}>

              </li>
            </ul>
          </li>

        </ul>



        <Modal
          title="Image Upload"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          >
          <div className="FanClubfeedUploadImagemodal">

            <Upload {...image}
              accept=".png,.jpg,.jpeg"
              showUploadList={false}
              listType="picture-card"
              className="avatar-uploader"
              onChange={this.imageChange.bind(this)}
              >
              {feedUrl ? <img src={feedUrl} alt="" /> : uploadButton}
            </Upload>
          </div>
        </Modal>



        <Modal
          title="Basic Modal"
          visible={this.state.visible435}
          onOk={this.handleOk435}
          onCancel={this.handleCancel435}
          >
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> upload
      </Button>
          </Upload>


        </Modal>


      </div>
    );
  }
}
export default Comment;

/* eslint-disable */