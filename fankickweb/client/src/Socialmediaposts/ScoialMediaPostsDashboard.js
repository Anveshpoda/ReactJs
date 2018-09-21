/* eslint-disable */
import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import ReactPlayer from 'react-player';
import Tweet from 'react-tweet';
import moment from 'moment';
import classNames from 'classnames/bind';
import sachinbeta from '../images/sachinbeta.png';
import { Link } from 'react-router';
import Dashboard from '../Dashboard/Dashboard';
import { Col, Row, Tabs, Table, Input, Icon, Form, Button, Select, Modal, DatePicker, message } from 'antd';
import css from './Socialmedia.css';
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
function callback(key) {
  console.log(key);
}
function handleChange(value) {
  console.log(`selected ${value}`);
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

function disabledRangeTime(_, type) {
  if (type === 'start') {
    return {
      disabledHours: () => range(0, 60).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  return {
    disabledHours: () => range(0, 60).splice(20, 4),
    disabledMinutes: () => range(0, 31),
    disabledSeconds: () => [55, 56],
  };
}

const format = "YYYY-MM-DD"

class ScoialMediaPostsDashboard extends React.Component {
  state = {
    visible: false,
    disable: true,
    visible1: false,
    disable1: true,
    visible2: false,
    disable2: true,
    dataList: [],
    dataList2: [],
    categories: [],
    catId: "",
    subCatId: "",
    subCategories: [],
    celebNames: [],
    celebrityName: '',
    disabled1: false,
    disabled2: false,
    catFilter: [],
    singleData: {},
    expiryDate: "",
    title: "",
    errors: {},
    index: "",
    tweetData: {}
  }
  componentWillMount() {
    this.getAllPosts();
    var req = axios.create({
      headers: {
        "x-access-token": sessionStorage.getItem('token'),
        "Content-Type": "application/json"
      }
    })
    // req.get('/trendingPosts').then((response) => {
    //   if (response.data.status === 200) {
    //     this.setState({ dataList: response.data.data, dataList2: response.data.data });
    //   }
    // })
    req.get('/categories').then((response) => {
      this.setState({ categories: response.data.data });
    })
  }
  getAllPosts = () => {
    var req = axios.create({
      headers: {
        "x-access-token": sessionStorage.getItem('token'),
        "Content-Type": "application/json"
      }
    })
    req.get('/trendingPosts').then((response) => {
      if (response.data.status === 200) {
        this.setState({ dataList: response.data.data, dataList2: response.data.data });
      }
    })
  }
  onCategoryChange = (e) => {
    this.state.dataList = this.state.dataList2;
    if (e !== "All") {
      this.setState({ catId: e });
      this.state.categories.map((item) => {
        if (item._id === e) {
          var data = [];
          data = this.state.dataList.filter((item) => {
            return item.categoryId == e;
          })
          this.setState({ subCategories: item.subCategories, disabled1: false, disabled2: false, dataList: data, catFilter: data });
        }
      })
    } else {
      this.setState({ disabled1: true, disabled2: true, dataList: this.state.dataList2, subCatId: "", celebrityName: "" })
    }
  }
  onSubCatChange = (e) => {
    this.state.dataList = this.state.catFilter;
    var _this = this;
    if (e !== "All") {
      this.setState({ subCatId: e });
      var data = [];
      data = this.state.dataList.filter((item) => {
        return item.subCategoryId == e;
      })
      this.setState({ dataList: data, disabled2: false, subCatFilter: data })
      var getData = axios.create({
        params: {
          subCatId: e
        }, headers: { 'Content-Type': 'application/json' }
      })
      getData.get('/celebrityNames').then(function (response) {
        _this.setState({ celebNames: response.data.data });
      })
    } else {
      this.setState({ disabled2: true, dataList: this.state.catFilter, celebrityName: "" })
    }
  }
  onCelebChange = (e) => {
    this.state.dataList = this.state.subCatFilter
    if (e !== "All") {
      var data = [];
      data = this.state.dataList.filter((item) => {
        return item.celebrityName == e;
      })
      this.setState({ celebrityName: e, dataList: data });
    } else {
      this.setState({ dataList: this.state.subCatFilter })
    }
  }
  showModal = (index, feedType, feedId) => {
    this.setState({ singleData: {} })
    var _this = this;
    var getData = axios.create({
      headers: { 'Content-Type': 'application/json', "x-access-token": sessionStorage.token }
    })
    if (feedType === "Twitter" && feedId) {
      getData.get('/posts/' + feedId).then((response) => {
        _this.setState({ tweetData: response.data.data, visible: true })
        getData.get('/trendingPosts/' + index).then(function (response) {
          console.log("res", response.data.data)
          _this.setState({ singleData: response.data.data, visible: true });
        })
      })
    } else {
      getData.get('/trendingPosts/' + index).then(function (response) {
        console.log("res", response.data.data)
        _this.setState({ singleData: response.data.data, visible: true });
      })
    }
    // this.setState({
    //   visible: true,
    // });
  }
  onExpiryDateChange = (e) => {
    // if (Object.keys(this.state.singleData).length != 0) {
    //   this.setState({ singleData: { ...this.state.singleData, expiryDate: "" } })
    // }
    if (e != "") this.state.errors.expiryDate = "";
    var date = moment(e).toISOString();
    this.setState({ expiryDate: date })
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

  showModal1 = (index) => {
    var _this = this;
    this.setState({ index: index })
    var getData = axios.create({
      headers: { 'Content-Type': 'application/json', "x-access-token": sessionStorage.token }
    })
    getData.get('/trendingPosts/' + index).then(function (response) {
      console.log("res", response.data.data)
      _this.setState({
        singleData: response.data.data, visible1: true, expiryDate: response.data.data.expiryDate,
        title: response.data.data.text
      });
    })
    // this.setState({
    //   visible1: true,
    // });
  }
  onTitleChange = (e) => {
    // if (Object.keys(this.state.singleData).length != 0) {
    //   this.setState({ singleData: { ...this.state.singleData, text: "" } })
    // }
    if (e.target.value != "") this.state.errors.title = "";
    this.setState({ title: e.target.value })
  }
  handleOk1 = (e) => {
    let errors = {};
    if (this.state.title === "" && this.state.singleData.text === "") errors.title = "*mandatory field";
    if (this.state.expiryDate === "" && this.state.singleData.expiryDate === "") errors.expiryDate = "*mandatory field";
    this.setState({ errors: errors });
    if (Object.keys(errors).length === 0) {
      var data = {
        expiryDate: this.state.expiryDate,
        text: this.state.title
      }
      var req = axios.create({
        headers: { "x-access-token": sessionStorage.token, "Content-Type": "application/json" }
      })
      req.put('/trendingPosts/' + this.state.index, data).then((response) => {
        if (response.data.status === 200) {
          message.success(`Data updated successfully`);
          this.getAllPosts();
          this.setState({
            visible1: false,
          });
        } else {
          message.error(`Data is not updated`)
        }
      })
    }
  }
  handleCancel1 = (e) => {
    console.log(e);
    this.setState({
      visible1: false,
    });
  }

  disabledDate = (current) => {
    if (!current) {
      return false;
    }
    const date = moment();
    // date.hour(0);
    // date.minute(0);
    // date.second(0);
    return current.valueOf() < date.valueOf();
  }

  showModal2 = (index) => {

    this.setState({
      visible2: true, index: index
    });
  }
  handleOk2 = (e) => {
    console.log(e);
    var _this = this;
    var req = axios.create({
      headers: { "x-access-token": sessionStorage.token, "Content-Type": "application/json" }
    })
    req.put('/trendingPosts/' + this.state.index, { isDeleted: true }).then((response) => {
      if (response.data.status === 200) {
        message.success(response.data.message);
        this.getAllPosts();
      } else {
        message.error(`Post was not deleted`);
      }
    })
    this.setState({
      visible2: false,
    });
  }
  handleCancel2 = (e) => {
    console.log(e);
    this.setState({
      visible2: false,
    });
  }

  render() {
    var modalData = this.state.singleData;
    const linkProps = { target: '_blank', rel: 'noreferrer' }
    console.log("modalData", modalData)
    const columns = [{
      title: 'Posted Date',
      dataIndex: 'Date',

    }, {
      title: 'Post Channel',
      dataIndex: 'PostChannel',
    }, {
      title: 'Title',
      dataIndex: 'Title',
    }, {
      title: 'Location',
      dataIndex: 'Location',
    }, {
      title: 'Expiry Date',
      dataIndex: 'ExpiryDate',
    }, {
      title: 'Action',
      dataIndex: 'action'
      // render: (text, record) => (
      //   <span className="SocialmediaViewpop">
      //     <a href="#" className="SocialmediaViewpop1" onClick={this.showModal}>View Details</a>
      //   </span>
      // ),
    }];
    var data = []; var data1 = []; var data2 = []; var data3 = [];
    this.state.dataList.map((item) => {
      var obj = {
        key: item._id,
        Date: moment(item.createdDate).format('YYYY-MM-DD'),
        PostChannel: item.type,
        Title: item.text,
        Location: String(item.locationTags),
        ExpiryDate: item.expiryDate ? moment(item.expiryDate).format('YYYY-MM-DD') : "",
        action:
        <p>
          <span className="SocialmediaViewpop">
            <a className="SocialmediaViewpop1" onClick={this.showModal.bind(this, item._id, item.type, item.feedId)}><Icon className="socialpostsviewi" type="eye-o" /></a>
          </span>

          <span className="SocialmediaViewpop">
            <a onClick={this.showModal1.bind(this, item._id)}>
              <Icon className="socialpostsediti" type="edit" /> </a>
          </span>
          <span className="SocialmediaViewpop">
            <a onClick={this.showModal2.bind(this, item._id)}>   <Icon className="socialpostsdeli" type="delete" /> </a>
          </span>
        </p>
      }
      if (item.type === "Facebook") data.push(obj);
      if (item.type === "Twitter") data1.push(obj)
      if (item.type === "Instagram") data2.push(obj)
      if (item.type === "Youtube") data3.push(obj)

    })
    var categories = this.state.categories.map((cat) => <Option value={cat._id}>{cat.name}</Option>)
    var subCategories = this.state.subCategories.map((cat) => <Option value={cat._id}>{cat.name}</Option>)
    var celebNames = this.state.celebNames.map((celeb) => <Option value={celeb}>{celeb}</Option>)
    return (
      <Dashboard>

        <div className="SocialMediaPosts">
          <Col span={24} className="SocialMTopbars">
            <div className="SocialmediaHeader">
              <Col span={16} xl={{ span: 16 }} lg={{ span: 20 }} sm={{ span: 20 }}>
                <Col span={5} xl={{ span: 5 }} lg={{ span: 5 }} sm={{ span: 7 }}>
                  <h5>Social Media Posts</h5>
                </Col>
                <Col span={4} className="SocialmSelectcols">
                  <Select className="SocialmSelect" placeholder="Select Category"
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    onChange={this.onCategoryChange}>
                    {categories}
                    <Option value="All">All</Option>
                  </Select>
                  {/*<span style={{ 'color': "red" }}>{this.state.errors.catId}</span>*/}
                </Col>
                <Col span={4} className="SocialmSelectcols">
                  <Select placeholder="Select SubCategory"
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    disabled={this.state.disabled1} className="SocialmSelect" onChange={this.onSubCatChange}>
                    {subCategories}
                    <Option value="All">All</Option>
                  </Select>
                  {/*<span style={{ 'color': "red" }}>{this.state.errors.subCatId}</span>*/}
                </Col>
                <Col span={4} className="SocialmSelectcols">
                  <Select placeholder="Select Celebrity"
                    className="SocialmSelect"
                    showSearch
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    disabled={this.state.disabled2}
                    onChange={this.onCelebChange}>
                    <Option value="All">All</Option>
                    {celebNames}
                  </Select>
                </Col>
               {/*} <Col span={2} className="SocialmSelectcols">
                  <Select className="SocialmSelect"
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    defaultValue="Order By" style={{ width: '100% ' }} onChange={handleChange}>
                    <Option value="jack">Date</Option>
                    <Option value="lucy">Location</Option>
                  </Select>

                </Col>*/}
              </Col>
              <Col span={8} xl={{ span: 8 }} lg={{ span: 4 }} sm={{ span: 4 }}>
                <Link to="/SocialMedia/EditSocialMediaPost"> <Button className="Socialpostcbtn" type="primary">Create Post</Button></Link>
              </Col>
            </div>
          </Col>
          <Col span={24}>
            <div className="SocialTabs">
              <Tabs className="SocialMediaTabss" defaultActiveKey="1" onChange={callback}>

                <TabPane className="SocialMediaTabsh" tab="Facebook" key="1">
                  <Table className="SocialMpostsTable" columns={columns} dataSource={data} />
                </TabPane>

                <TabPane className="SocialMediaTabsh" tab="Twitter" key="2">
                  <Table className="SocialMpostsTable" columns={columns} dataSource={data1} />
                </TabPane>

                <TabPane className="SocialMediaTabsh" tab="Instagram" key="3">
                  <Table className="SocialMpostsTable" columns={columns} dataSource={data2} />

                </TabPane>

                <TabPane className="SocialMediaTabsh" tab="Youtube" key="4">
                  <Table className="SocialMpostsTable" columns={columns} dataSource={data3} />

                </TabPane>

              </Tabs>
            </div>
          </Col>
          <Modal
            title="Social Channel"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={<Button className="footbtn" style={{ marginRight: 8 }} type="primary" onClick={this.handleCancel}>Close</Button>}
            >

            <div className="SocialmediaPostsViewDetails">
              {modalData.type === "Facebook" || modalData.type === "Instagram" ?
                <img src={modalData.imageUrl} alt="contestCover" width="484px" height="252px" /> :
                ""}
              {modalData.type === "Youtube" ? <ReactPlayer
                config={{ youtube: { playerVars: { showinfo: 1 } } }}
                url={"https://www.youtube.com/watch?v=" + modalData.videoUrl}
                className="allblogVideo"
                controls
                /> : ""}
              {modalData.type === "Twitter" ? <Tweet data={this.state.tweetData} linkProps={linkProps} /> : ""}
              <div>
                <p className="SocialmPostsViewtitlemain"><span>Title : </span> <span className="Socialmediaposstsviewtitle">{modalData.text}</span> </p>
                
                <Col span={24}>
                  <Col span={8}>
                    <p><span>Category :</span> <span> Movies </span></p>
                  </Col>
                  <Col span={8}>
                    <p><span>Sub Category :</span> <span> Tollywood </span></p>
                  </Col>
                  <Col span={8}>
                    <p><span>Celebrity :</span> <span> Some one</span></p>
                  </Col>
                </Col>
                <Col span={24}>
                  <Col span={12}>
                    <p><span>Author : </span> <span>Kumar</span></p>
                  </Col>
                  <Col span={12}>
                    <p><span>Editor: </span> <span>Ishahak</span></p>
                  </Col>
                </Col>

                <p className="SocialmPostsViewExpiryDmain"><span>Expiry Date :</span><span className="SocialmediaposstsviewExDate">{modalData.expiryDate ? moment(modalData.expiryDate).format("YYYY-MM-DD") : ""}</span></p>

                <p className="SocialmPostsViewLocationmain"><span>Location :</span> <span className="SocialmediaposstsviewLocation">{String(modalData.locationTags)}</span></p>

              </div>

              <div>
                <Col span={24}>
                  <p><span>Major KeyWords :</span> <span>  </span></p>
                </Col>
                <Col span={24}>
                  <p><span>Minor KeyWords :</span> <span>  </span></p>
                </Col>
                <Col span={24}>
                  <p><span>Fb Hashtags :</span> <span>  </span></p>
                </Col>
              </div>
            </div>
          </Modal>

          <Modal
            title="EDIT SOCIAL MEDIA POST"
            visible={this.state.visible1}
            onOk={this.handleOk1}
            onCancel={this.handleCancel1}
            footer={<Button className="footbtn" style={{ marginRight: 8 }} type="primary" onClick={this.handleOk1}>Edit</Button>}
            >
            <div className="Editmodals">
              <Form>
                <Col span={24}>
                  <Col span={8}>
                    <div>
                      <FormItem label="Edit Expiry Date">
                        <DatePicker
                          getCalendarContainer={triggerNode => triggerNode.parentNode}
                          // showTime
                          // format="YYYY-MM-DD"
                          disabledDate={this.disabledDate}
                          placeholder="Select Date"
                          value={this.state.expiryDate ? moment(this.state.expiryDate) : ""}
                          format={format}
                          onChange={this.onExpiryDateChange}
                          //onOk={onOk}
                          />
                        <span style={{ 'color': "red" }}>{this.state.errors.expiryDate}</span>
                      </FormItem>
                    </div>
                  </Col>
                </Col>
                <Col span={24}>
                  <Col span={8}>
                    <div>
                      <FormItem label="Enter Title">
                        <Input placeholder="Enter Text" value={this.state.title} onChange={this.onTitleChange} />
                        <span style={{ 'color': "red" }}>{this.state.errors.title}</span>
                      </FormItem>
                    </div>
                  </Col>
                </Col>
              </Form>
            </div>
          </Modal>

          <Modal
            title="Basic Modal"
            visible={this.state.visible2}
            onOk={this.handleOk2}
            onCancel={this.handleCancel2}
            footer={<Button className="footbtn" style={{ marginRight: 8 }} type="primary" onClick={this.handleOk2}>Delete</Button>}
            >
            <div>
              <h4>Are you sure You want to delete this post?</h4>
            </div>
          </Modal>
        </div>
      </Dashboard>
    );
  }
}

export default ScoialMediaPostsDashboard;