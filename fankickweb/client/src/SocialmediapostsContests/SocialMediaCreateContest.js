/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import $ from "jquery";
import { browserHistory, Link } from 'react-router';
import css from './SocialmediaContest.css';
import Dashboard from '../Dashboard/Dashboard';
import moment from 'moment';

import { Form, Icon, Input, Button, Checkbox, Switch, InputNumber, DatePicker, TimePicker, Tabs, message, Upload, Col, Row, Select, Steps } from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const { TextArea } = Input;
const Step = Steps.Step;
const Search = Input.Search;

function callback(key) {
  //  console.log(key);
}

function handleChange(value) {
  // console.log(`selected ${value}`);
}

function handleBlur() {
  //console.log('blur');
}

function handleFocus() {
  // console.log('focus');
}



const props = {

  name: 'file',
  action: process.env.REACT_APP_API_HOST + '/rest/azureImageUploadWeb',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const props1 = {

  name: 'file',
  action: process.env.REACT_APP_API_HOST + '/rest/azureImageUploadWeb',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

//
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
function onChange(time, timeString) {
  // console.log(time, timeString);
}




const dateFormat = "MM/DD/YYYY"


class SocialMediaCreateContest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      BannercontestImageUrl: '',
      loading: false,
      categories: [],
      subCategories: [],
      celebrities: [],
      locationsList: [],
      categoryId: "",
      subCategoryId: "",
      celName: "",
      socialmediatype: "",
      contestTitle: "",
      contestDescription: "",
      contestsType: "",
      location: [],
      locationsList: [],
      contestCaption: "",
      ctaButtonText: "",
      userGuideText: "",
      startDate: "",
      endDate: "",
      mediaType: "",
      BannercontestwithoutTextImageUrl: "",
      youtubevideoid: "",
      couponsList: [],
      couponCostList: [],
      merchantName: "",
      goodieType: '',
      couponCost: '',
      bonusFancoins: '',
      basicFancoins: '',
      winnersCount: '',
      winnersMessage: "",
      termsandConditions: "",
      errors: {},
      bannerImagewithTextChange: '',
      bannerImagewithOutTextChange: '',
      coinsConfig: false,
      basiccoinsview: false
    };
  }
  couponCostChange = (value) => {
    this.setState({ couponCost: value })
  }
  bonusFancoinsChange = (number) => {
    this.setState({ bonusFancoins: number })
  }
  basicFancoinsChange = (number) => {
    this.setState({ basicFancoins: number })
  }
  winnersCountChange = (number) => {
    this.setState({ winnersCount: number })
  }
  winnersMessageChange = (e) => {
    this.setState({ winnersMessage: e.target.value })
  }
  termsandConditionChange = (e) => {
    this.setState({ termsandConditions: e.target.value })
  }
  socialmediaTypeChange = (value) => {
    this.setState({ socialmediatype: value });
  }
  contestTitleChange = (e) => {
    this.setState({ contestTitle: e.target.value });
  };
  contestDesciptionChange = (e) => {
    this.setState({ contestDescription: e.target.value });
  }
  contestTypeChange = (value) => {
    this.setState({ contestsType: value });
  }
  contestCaptionChange = (e) => {
    this.setState({ contestCaption: e.target.value });
  }
  ctaButtonChange = (e) => {
    this.setState({ ctaButtonText: e.target.value });
  }
  userGuideTextChange = (e) => {
    this.setState({ userGuideText: e.target.value })
  }
  startDateChange = (value) => {
    this.setState({ startDate: value })
  }
  endDateChange = (value) => {
    this.setState({ endDate: value })
  }
  mediaTypeChange = (value) => {
    this.setState({ mediaType: value })
  }
  youtubevideoidChange = (e) => {
    this.setState({ youtubevideoid: e.target.value })
  }
  couponsNameChange = (value) => {
    this.setState({ merchantName: value })
    this.getCouponCostList(value);
  }
  getCouponCostList = (merchantName) => {
    var _this = this;
    const url = '/commercialCost?brandName=' + merchantName;
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
        _this.setState({ couponCostList: response.data });
      })

  }

  goodieTypeChange = (value) => {
    this.setState({ goodieType: value })
  }
  coinsConfigChange = (checked) => {
    this.setState({ coinsConfig: checked });
    checked === true ? this.setState({ basiccoinsview: true }) : this.setState({ basiccoinsview: false })
  }
  locationChange = (value) => {

    if (value[0] !== "SelectAll" && value.includes("SelectAll")) {
      this.setState({ location: [] })
    }
    else if (value[0] === "SelectAll") {
      this.setState({
        location: this.state.locationsList.slice(1, this.state.locationsList.length)
      })
    }
    else {
      this.setState({ location: value })
    }
  }
  componentWillMount = () => {
    this.getCategories();
    this.getLocationCatagory();
    this.getCommercialCouponsList();
  }
  getLocationCatagory = () => {
    var _this = this;
    const url = "/locationNames";
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
        _this.setState({ locationsList: ["SelectAll", ...response.data] })
      })
  }
  getCategories = () => {
    var _this = this;
    const url = '/categories';
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
        _this.setState({ categories: response.data });
      })
  }
  getCommercialCouponsList = () => {
    var _this = this;
    const url = '/commercialCouponList';
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
        _this.setState({ couponsList: response.data });
      })

  }
  onCategoryChange = (value) => {
    this.setState({ categoryId: value });
    this.bindSubCategories(value)
  }
  bindSubCategories(category) {
    var a = this.state.categories.map((categorydata) => {
      if (category === categorydata._id) {
        this.setState({
          subCategories: categorydata.subCategories, subCategoryId: ''
        })
      }
    })
  }
  onsubCategoryChange(value) {
    var subid = value;
    this.setState({
      subCategoryId: subid, celName: ''
    })
    this.getCelebrities(subid);
  }
  getCelebrities = (subid) => {
    var _this = this;
    this.setState({ subId: subid });
    const url = process.env.REACT_APP_API_HOST + '/rest/getContentPacksCelebName?subCategoryId=' + subid;
    var request = new Request(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    });
    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        if (response.statusCode === 1) {
          _this.setState({ celebrities: response.data });
        }
        else {
        }
      })
  }
  onCelebrityChange = (value) => {
    var _this = this;
    var celname = value;
    this.setState({ celName: value });
  }
  bannerImagewithTextChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, BannercontestImageUrl => this.setState({
        BannercontestImageUrl: info.file.response.data,
        loading: false,
      }));
    }
  }
  bannerImagewithOutTextChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, BannercontestwithoutTextImageUrl => this.setState({
        BannercontestwithoutTextImageUrl: info.file.response.data,
        loading: false,
      }));
    }
  }


  createContest = () => {
    var _this = this;
    let errors = {};
    if (this.state.categoryId === '') errors.categoryId = "* This field is mandatory";
    if (this.state.subCategoryId === '') errors.subCategoryId = "* This field is mandatory";
    if (this.state.celName === '') errors.celName = "* This field is mandatory";
    if (this.state.termsandConditions.trim() === '') errors.termsandConditions = "* This field is mandatory";
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      var day = moment(this.state.startDate).format("YYYY-MM-DD");
      var time = moment().startOf('day').format('HH:mm:ss');
      var d = day + " " + time;
      var newdate = new Date(d).toISOString();
      var day1 = moment(this.state.endDate).format("YYYY-MM-DD");
      var time1 = moment().endOf('day').format('HH:mm:ss');
      var d1 = day1 + " " + time1;
      var newdate1 = new Date(d1).toISOString();
      var data = {
        fbContestName: this.state.contestTitle,
        title: this.state.contestsType,
        caption: this.state.contestCaption,
        description: this.state.contestDescription,
        categoryId: this.state.categoryId,
        subCategoryId: this.state.subCategoryId,
        celebrityName: this.state.celName,
        location: this.state.location,
        contestType: this.state.mediaType === "image" ? "image" : this.state.mediaType === "normalvideo" || this.state.mediaType === "youtubevideo" ? "video" : '',
        contestUrl: this.state.BannercontestImageUrl,
        fbContestThumbnail: this.state.BannercontestwithoutTextImageUrl,
        fbContestVideoUrl: this.state.youtubevideoid,
        isYoutubeVideo: this.state.mediaType === "youtubevideo" ? true : false,
        brandLogo: "https://fankickdev.blob.core.windows.net/images/fb_logo.png",
        buttonText: this.state.ctaButtonText,
        rewardLogo: "https://fankickdev.blob.core.windows.net/images/fb_troply.png",
        winningMessage: this.state.winnersMessage,
        contestStartDate: newdate,
        contestEndDate: newdate1,
        contestStatus: true,
        likes: [],
        comments: [],
        shares: [],
        goodieType: this.state.goodieType === "Coupons" ? 1 : this.state.goodieType === "Fancoins" ? 2 : this.state.goodieType === "Fancoins & Coupons" ? 3 : '',
        declareWinnersType: 1,
        winners: [],
        prizeCoins: this.state.bonusFancoins,
        winnersCount: this.state.winnersCount,
        couponFrom: this.state.merchantName,
        couponCost: this.state.couponCost,
        isDeleted: false,
        termsAndConditions: this.state.termsandConditions,
        userguideText: this.state.userGuideText,
        basicCoins: this.state.basicFancoins,
        coinsConfig: this.state.coinsConfig,
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString()
      }
      const url = '/Socialmediacontest';
      var request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "x-access-token": sessionStorage.getItem('token')
        }
      });

      fetch(request)
        .then(response => response.json())
        .then(function (response) {
          if (response.message == "Success" && response.status == 200) {
            if (new Date(_this.state.endDate).getTime() < new Date().getTime()) {
              browserHistory.push('/SocialMediaDashboard')
            } else if (new Date(_this.state.startDate).getTime() > new Date().getTime()) {
              browserHistory.push('/SocialmediapostsContests/SocialMediaUpcoming')
            } else if (new Date().getTime() >= new Date(_this.state.startDate).getTime() &&
              new Date().getTime() <= new Date(_this.state.endDate).getTime()) {
              browserHistory.push('/SocialmediapostsContests/SocialMediaRunning')
            }
            message.success("Facebook contest created successfully");
          }
        }
        );
    }
  }

  next() {

    const current = this.state.current;
    if (current === 0) {
      let errors = {};
      if (this.state.socialmediatype === '') errors.socialmediatype = "* This field is mandatory";
      if (this.state.contestsType === '') errors.contestsType = "* This field is mandatory";
      if (this.state.contestTitle.trim() === '') errors.contestTitle = "* This field is mandatory";
      if (this.state.location.length <= 0) errors.location = "* This field is mandatory";
      if (this.state.contestCaption.trim() === '' && this.state.contestsType === "Post & Win") errors.contestCaption = "* This field is mandatory";
      if (this.state.ctaButtonText.trim() === '') errors.ctaButtonText = "* This field is mandatory";
      if (this.state.contestDescription.trim() === '') errors.contestDescription = "* This field is mandatory";
      if (this.state.userGuideText.trim() === '' && this.state.contestsType === "Post & Win") errors.userGuideText = "* This field is mandatory";
      if (this.state.startDate === '') errors.startDate = "* This field is mandatory";
      if (this.state.startDate >= this.state.endDate) errors.startDate = "End Date must not be greater than Start Date";
      if (this.state.endDate === '') errors.endDate = "* This field is mandatory";
      this.setState({ errors });
      if (Object.keys(errors).length === 0) {
        const current = this.state.current + 1;
        this.setState({ current });
      }
    } else if (current === 1) {
      let errors = {};
      if (this.state.mediaType === '') errors.mediaType = "* This field is mandatory";
      if (this.state.BannercontestImageUrl === '') errors.BannercontestImageUrl = "* This field is mandatory";
      if (this.state.BannercontestwithoutTextImageUrl === '' && (this.state.mediaType === 'image' || this.state.mediaType === 'normalvideo')) errors.bannerImagewithOutTextChange = "* This field is mandatory";
      if (this.state.youtubevideoid.trim() === '' && this.state.mediaType === "youtubvideo") errors.BannercontestwithoutTextImageUrl = "* This field is mandatory";
      this.setState({ errors });
      if (Object.keys(errors).length === 0) {
        const current = this.state.current + 1;
        this.setState({ current });
      }

    }
    else if (current === 2) {
      let errors = {};
      if (this.state.goodieType === '') errors.goodieType = "* This field is mandatory";
      if ((this.state.basicFancoins === '' || this.state.basicFancoins === undefined || this.state.basicFancoins === null) && this.state.basiccoinsview === false) errors.basicFancoins = "* This field is mandatory";
      if (this.state.merchantName === '' && (this.state.goodieType === "Coupons" || this.state.goodieType === "Fancoins & Coupons")) errors.merchantName = "* This field is mandatory";
      if ((this.state.bonusFancoins === '' || this.state.bonusFancoins === undefined || this.state.bonusFancoins === null) && (this.state.goodieType === "Fancoins" || this.state.goodieType === "Fancoins & Coupons")) errors.bonusFancoins = "* This field is mandatory";
      if (this.state.winnersCount === '' || this.state.winnersCount === undefined || this.state.winnersCount === null) errors.winnersCount = "* This field is mandatory";
      if (this.state.couponCost === '' && (this.state.goodieType === "Coupons" || this.state.goodieType === "Fancoins & Coupons")) errors.couponCost = "* This field is mandatory";
      if (this.state.winnersMessage.trim() === '') errors.winnersMessage = "* This field is mandatory";
      this.setState({ errors })
      if (Object.keys(errors).length === 0) {
        const current = this.state.current + 1;
        this.setState({ current });
      }
    }

  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }



  render() {



    const BannercontestImageUrl = this.state.BannercontestImageUrl;
    const BannercontestwithoutTextImageUrl = this.state.BannercontestwithoutTextImageUrl;
    const mapCategories = this.state.categories.map((category) => <Option value={category._id}>{category.name}</Option>);
    const mapSubCategories = this.state.subCategories.map((subCategory) => <Option value={subCategory._id}>{subCategory.name}</Option>);
    const mapCelebrities = this.state.celebrities.map((celebrity) => <Option value={celebrity.celebrityName}>{celebrity.celebrityName}</Option>);
    const childrenlocations = this.state.locationsList.map((category) => <Option value={category}>{category}</Option>);
    const couponsList = this.state.couponsList.map((coupons) => <Option value={coupons}>{coupons}</Option>);
    const couponCostList = this.state.couponCostList.map((couponcost) => <Option value={couponcost}>{couponcost}</Option>)
    const steps = [{
      title: 'Contest Details',
      content: <Col span={24}>
        <Form>
          <Col span={24}>
            <Col span={10} xl={{ span: 7 }} lg={{ span: 7 }} sm={{ span: 9 }}>
              <FormItem label="Social Media Channel Type">

                <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                  showSearch className=""
                  style={{ width: '100%' }}
                  placeholder="Select Social Media Channel Type"
                  optionFilterProp="children"
                  onChange={this.socialmediaTypeChange.bind(this)}
                  value={this.state.socialmediatype || undefined}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                  <Option value="Facebook">Facebook</Option>
                  {/* <Option value="Sports">Instagram</Option>
                  <Option value="Music">Twitter</Option> */}

                </Select>
                <span style={{ "color": 'red' }}>{this.state.errors.socialmediatype}</span>
              </FormItem>
            </Col>

            <Col span={6} xl={{ span: 6 }} lg={{ span: 7 }} sm={{ span: 8 }} className="MrgnLeft701">
              <FormItem label="Contest Type">

                <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                  showSearch className=""
                  style={{ width: '100%' }}
                  placeholder="Select Contest Type"
                  optionFilterProp="children"
                  value={this.state.contestsType || undefined}
                  onChange={this.contestTypeChange.bind(this)}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                  {/* <Option value="Like & Win">Like & Win</Option> */}
                  <Option value="Post & Win">Post & Win</Option>
                  <Option value="Reshare & Win">Reshare & Win</Option>
                  {/*  <Option value="Comment& Win">Comment& Win</Option>
                  <Option value="All">All</Option> */}
                </Select>
                <span style={{ "color": 'red' }}>{this.state.errors.contestsType}</span>
              </FormItem>
            </Col>
          </Col>

          <Col span={24}>
            <Col span={24} className="">
              <Col span={10} xl={{ span: 10 }} lg={{ span: 11 }} sm={{ span: 12 }}>
                <FormItem label="Contest Title">
                  <Input type="text" value={this.state.contestTitle}

                    onChange={this.contestTitleChange.bind(this)} autoComplete={'off'}
                    placeholder="Enter Contest Title" name="" />
                  <span style={{ "color": 'red' }}>{this.state.errors.contestTitle}</span>

                </FormItem>
              </Col>
              <Col span={6} xl={{ span: 6 }} lg={{ span: 7 }} sm={{ span: 8 }} className="MrgnLeft701 fbcontestloctions">
                <FormItem label="Enter Location">

                  <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                    showSearch className=""
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Select Location"
                    optionFilterProp="children"
                    value={this.state.location || undefined}
                    onChange={this.locationChange.bind(this)}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                    {childrenlocations}
                  </Select>
                  <span style={{ "color": 'red' }}>{this.state.errors.location}</span>
                </FormItem>
              </Col>
            </Col>


          </Col>

          <Col span={24}>
            <Col span={24} className="">
              <Col span={10} xl={{ span: 10 }} lg={{ span: 11 }} sm={{ span: 12 }}>
                <FormItem label="Contest Description">
                  <TextArea
                    value={this.state.contestDescription}
                    onChange={this.contestDesciptionChange.bind(this)} rows={3} placeholder="Enter Contest Description" />
                  <span style={{ "color": 'red' }}>{this.state.errors.contestDescription}</span>
                </FormItem>
              </Col>

              <Col span={6} xl={{ span: 6 }} lg={{ span: 7 }} sm={{ span: 8 }} className="MrgnLeft701">
                <FormItem label="CTA Button Text">
                  <Input
                    type="text" value={this.state.ctaButtonText}
                    onChange={this.ctaButtonChange.bind(this)} autoComplete={'off'} placeholder="Enter CTA Button" />
                  <span style={{ "color": 'red' }}>{this.state.errors.ctaButtonText}</span>
                </FormItem>
              </Col>
            </Col>

            <Col span={24} className="">


              <Col span={10} xl={{ span: 10 }} lg={{ span: 11 }} sm={{ span: 12 }}>
                {this.state.contestsType === "Post & Win" ? <FormItem label="Contest Caption">
                  <Input
                    type="text" value={this.state.contestCaption}
                    onChange={this.contestCaptionChange.bind(this)} autoComplete={'off'} placeholder="About Contest" />
                  <span style={{ "color": 'red' }}>{this.state.errors.contestCaption}</span>
                </FormItem> : ''}
              </Col>

            </Col>

            <Col span={24} className="">
              <Col span={10} xl={{ span: 10 }} lg={{ span: 11 }} sm={{ span: 12 }}>
                {this.state.contestsType === "Post & Win" ? <FormItem label="User Guiding Text">
                  <TextArea
                    value={this.state.userGuideText}
                    onChange={this.userGuideTextChange.bind(this)}
                    rows={3} placeholder="Enter Text" />
                  <span style={{ "color": 'red' }}>{this.state.errors.userGuideText}</span>
                </FormItem> : ''}
              </Col>
            </Col>

          </Col>




          <Col span={24}>
            <Col span={24} className="fbconteststartdateenddatess">
              <Col span={3} xl={{ span: 5 }} lg={{ span: 5 }} sm={{ span: 5 }}>
                <FormItem label="Start Date">

                  <DatePicker onChange={this.startDateChange.bind(this)}
                    value={this.state.startDate} getCalendarContainer={triggerNode => triggerNode.parentNode}
                    format={dateFormat} />
                  <span style={{ "color": 'red' }}>{this.state.errors.startDate}</span>
                </FormItem>
              </Col>

              <Col span={3} xl={{ span: 5 }} lg={{ span: 5 }} sm={{ span: 5 }} offset={1} className="MrgnLeft702">
                <FormItem label="End Date">
                  <DatePicker onChange={this.endDateChange.bind(this)}
                    value={this.state.endDate} getCalendarContainer={triggerNode => triggerNode.parentNode}
                    format={dateFormat} />
                  <span style={{ "color": 'red' }}>{this.state.errors.endDate}</span>
                </FormItem>
              </Col>
            </Col>


          </Col>



        </Form>
      </Col>,
    },
    {
      title: 'Add Media',
      content: <Col span={24}>
        <Form>
          <div className="Postaddmedia">
            <Col span={24}>
              <Col span={6}>
                {this.state.contestsType === "Post & Win" ? <FormItem label="Post Type">

                  <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                    showSearch className=""
                    style={{ width: 220 }}
                    placeholder="Select Post Type"
                    optionFilterProp="children"
                    value={this.state.mediaType || undefined}
                    onChange={this.mediaTypeChange.bind(this)}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                    <Option value="image">Image</Option>
                    <Option value="normalvideo">Normal Video</Option>
                    <Option value="youtubevideo">Youtube Video</Option>

                  </Select>
                  <span style={{ "color": 'red' }}>{this.state.errors.mediaType}</span>
                </FormItem> : ''}
              </Col>
            </Col>

            {this.state.mediaType === "normalvideo" || this.state.mediaType === "youtubevideo" ? <Col span={24} className="">
              <Col span={10} xl={{ span: 10 }} lg={{ span: 10 }} sm={{ span: 12 }} className="">
                <FormItem label="Video Url">
                  <Input type="text" value={this.state.youtubevideoid}
                    onChange={this.youtubevideoidChange.bind(this)} autoComplete={'off'} placeholder={this.state.mediaType === "normalvideo" ? "Enter Video url" : "Enter Youtube Video ID"} />
                  <span style={{ "color": 'red' }}>{this.state.errors.youtubevideoid}</span>
                </FormItem>
              </Col>
            </Col> : ''}


            <Col span={24}>
              {this.state.mediaType ? <Col span={10} xl={{ span: 10 }} lg={{ span: 10 }} sm={{ span: 12 }}>
                <div className="Socialmediacontestbanimg12">
                  <FormItem label="Banner Image with Text">
                    <Upload {...props} className="Socialmediacontestbanimg"
                      listType="picture-card"
                      className="socialbanimgs avatar-uploader"
                      showUploadList={false}
                      accept=".png,.jpg,.jpeg"
                      onChange={this.bannerImagewithTextChange}
                      >
                      {BannercontestImageUrl ? <img src={BannercontestImageUrl} alt="avatar" /> :
                        <Icon type="plus" className="avatar-uploader-trigger" />}
                    </Upload>
                    <span style={{ "color": 'red' }}>{this.state.errors.BannercontestImageUrl}</span>
                  </FormItem>
                </div>
              </Col> : ''}
            </Col>


            <Col span={24}>
              {this.state.mediaType == "image" || this.state.mediaType == "normalvideo" ? <Col span={10} xl={{ span: 10 }} lg={{ span: 10 }} sm={{ span: 12 }}>
                <div className="Socialmediacontestbanimg12">
                  <FormItem label="Banner Image with out Text">
                    <Upload {...props1} className="Socialmediacontestbanimg"
                      listType="picture-card"
                      className="socialbanimgs avatar-uploader"
                      showUploadList={false}
                      accept=".png,.jpg,.jpeg"
                      onChange={this.bannerImagewithOutTextChange}
                      >
                      {BannercontestwithoutTextImageUrl ? <img src={BannercontestwithoutTextImageUrl} alt="avatar" /> :

                        <Icon type="plus" className="avatar-uploader-trigger" />}
                    </Upload>
                    <span style={{ "color": 'red' }}>{this.state.errors.BannercontestwithoutTextImageUrl}</span>
                  </FormItem>
                </div>
              </Col> : ''}
            </Col>
          </div>

          {this.state.contestsType === "Reshare & Win" ? <div className="ReshareAddmedia">
            <Col span={24}>
              <Col span={10} xl={{ span: 10 }} lg={{ span: 10 }} sm={{ span: 12 }}>
                <div className="Socialmediacontestbanimg12">
                  <FormItem label="Banner Image">
                    <Upload {...props1} className="Socialmediacontestbanimg"
                      listType="picture-card"
                      className="socialbanimgs avatar-uploader"
                      showUploadList={false}
                      accept=".png,.jpg,.jpeg"
                      onChange={this.bannerImagewithOutTextChange}
                      >
                      {BannercontestwithoutTextImageUrl ? <img src={BannercontestwithoutTextImageUrl} alt="avatar" /> :

                        <Icon type="plus" className="avatar-uploader-trigger" />}
                    </Upload>
                    <span style={{ "color": 'red' }}>{this.state.errors.BannercontestwithoutTextImageUrl}</span>
                  </FormItem>
                </div>
              </Col>
            </Col>

            <Col span={24}>
              <Col span={10} xl={{ span: 10 }} lg={{ span: 10 }} sm={{ span: 12 }} className="">
                <FormItem label="Profile Id">
                  <Input placeholder="Profile Id" />
                </FormItem>
              </Col>
            </Col>

            <Col span={24}>
              <Col span={10} xl={{ span: 10 }} lg={{ span: 10 }} sm={{ span: 12 }} className="">
                <FormItem label="Post Id">
                  <Input placeholder="Post Id" />
                </FormItem>
              </Col>
            </Col>

            <Col span={24}>
              <Col span={10} xl={{ span: 10 }} lg={{ span: 10 }} sm={{ span: 12 }} className="">
                <FormItem label="Post Url">
                  <Input placeholder="Post Url" />
                </FormItem>
              </Col>
            </Col>

          </div> : ''}


        </Form>
      </Col>,
    },
    {
      title: 'Winner Details',
      content: <Col span={24}>
        <Form>
          <Col span={24}>
            <Col span={24} className="">
              <Col span={6} xl={{ span: 6 }} lg={{ span: 9 }} sm={{ span: 11 }} className="">
                <FormItem label="Goodies Type">

                  <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                    showSearch className=""
                    style={{ width: '100%' }}
                    placeholder="Select Goodie Type"
                    optionFilterProp="children"
                    value={this.state.goodieType || undefined}
                    onChange={this.goodieTypeChange.bind(this)}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                    <Option value="Coupons">Coupons</Option>
                    <Option value="Fancoins">Fancoins</Option>
                    <Option value="Fancoins & Coupons">Fancoins & Coupons</Option>

                  </Select>
                  <span style={{ "color": 'red' }}>{this.state.errors.goodieType}</span>
                </FormItem>
              </Col></Col>

            {this.state.goodieType === "Coupons" || this.state.goodieType === "Fancoins & Coupons" ? <Col span={24} className="">
              <Col span={6} xl={{ span: 6 }} lg={{ span: 9 }} sm={{ span: 11 }} className="">
                <FormItem label="Merchant Name">
                  <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                    showSearch className=""
                    style={{ width: '100%' }}
                    placeholder="Select Merchant Name"
                    optionFilterProp="children"
                    value={this.state.merchantName || undefined}
                    onChange={this.couponsNameChange.bind(this)}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                    {couponsList}
                  </Select>
                  <span style={{ "color": 'red' }}>{this.state.errors.merchantName}</span>
                </FormItem>
              </Col>
              <Col span={6} xl={{ span: 6 }} lg={{ span: 6 }} sm={{ span: 8 }} offset={3} className="SocialmEntercouponCost">
                <FormItem label="Enter Coupon Cost">
                  <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                    showSearch className=""
                    style={{ width: '100%' }}
                    placeholder="Select Coupon Cost"
                    optionFilterProp="children"
                    value={this.state.couponCost || undefined}
                    onChange={this.couponCostChange.bind(this)}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                    {couponCostList}
                  </Select>
                  {/* <InputNumber
                    value={this.state.couponCost} min={10} max={5000}
                    onChange={this.couponCostChange.bind(this)} /> */}
                  <span style={{ "color": 'red' }}>{this.state.errors.couponCost}</span>
                </FormItem>
              </Col>
            </Col> : ''}

            <Col span={24} className="SocialMNumberscountss">
              {this.state.goodieType === "Fancoins" || this.state.goodieType === "Fancoins & Coupons" ? <Col span={6} xl={{ span: 6 }} lg={{ span: 9 }} sm={{ span: 11 }} className="">
                <FormItem label="Enter Bonus Fancoins">
                  <InputNumber min={0} max={5000}
                    value={this.state.bonusFancoins}
                    onChange={this.bonusFancoinsChange.bind(this)} />
                  <span style={{ "color": 'red' }}>{this.state.errors.bonusFancoins}</span>
                </FormItem>

              </Col> : ''}
            </Col>

            <Col span={24} className="SocialMNumberscountss">
              <Col span={6} xl={{ span: 6 }} lg={{ span: 9 }} sm={{ span: 11 }} className="">
                <FormItem>
                  <ul className="list-inline socialmElists">
                    <li>
                      <h6 className="FntssShortSocialm">Enable Default Basic fancoins</h6>
                    </li>
                    <li>
                      <Switch checked={this.state.coinsConfig} onChange={this.coinsConfigChange.bind(this)} />
                    </li>
                  </ul>
                  <h6 className="SocialMedLabels">Enter Basic Fancoins</h6>
                  <InputNumber
                    value={this.state.basicFancoins} min={0} max={5000}
                    onChange={this.basicFancoinsChange.bind(this)} disabled={this.state.basiccoinsview} />
                  <span style={{ "color": 'red' }}>{this.state.errors.basicFancoins}</span>
                </FormItem>
              </Col>
            </Col>

            <Col span={24} className="SocialMNumberscountss">
              <Col span={6} xl={{ span: 6 }} lg={{ span: 9 }} sm={{ span: 11 }} className="">
                <FormItem label="Enter Winners Count">
                  <InputNumber min={0} max={500} value={this.state.winnersCount}
                    onChange={this.winnersCountChange.bind(this)} />
                  <span style={{ "color": 'red' }}>{this.state.errors.winnersCount}</span>
                </FormItem>
              </Col>
            </Col>


            <Col span={24} className="">
              <Col span={10} xl={{ span: 10 }} lg={{ span: 9 }} sm={{ span: 11 }} className="">
                <FormItem label="Winners Message">
                  <TextArea
                    value={this.state.winnersMessage}
                    onChange={this.winnersMessageChange.bind(this)} rows={4} />
                  <span style={{ "color": 'red' }}>{this.state.errors.winnersMessage}</span>
                </FormItem>
              </Col>
            </Col>
          </Col>
        </Form>
      </Col>,

    },
    {
      title: 'Terms & Conditions',
      content: <Col span={24}>
        <Form>
          <Col span={24}>
            <Col span={24} className="">
              <Col span={10} xl={{ span: 10 }} lg={{ span: 16 }} sm={{ span: 16 }} className="">
                <FormItem label="Terms & Conditions">
                  <TextArea value={this.state.termsandConditions}
                    onChange={this.termsandConditionChange.bind(this)} rows={4} />
                  <span style={{ "color": 'red' }}>{this.state.errors.termsandConditions}</span>
                </FormItem>
              </Col>
            </Col>
          </Col>
        </Form>
      </Col>,


    }];

    const {current} = this.state;

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );



    return (



      <Dashboard>
        <Row>
          <Col span={24} className="SocialMediamenu">
            <div className="SocialMediamenu">
              <div className="SocialMediaContestSubMenu">
                <Col span={2} xl={{ span: 2 }} lg={{ span: 2 }} sm={{ span: 3 }} className="fbcontresttotitle">
                  <h2 className="smcontestpageTitle">Create SM Contest</h2>
                </Col>
                <div className="SelectorsFbContests">
                  <Col span={3} xl={{ span: 3 }} lg={{ span: 4 }} sm={{ span: 3 }}>
                    <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                      showSearch className="fun2winSelectcategry42"
                      style={{ width: '100%' }}
                      placeholder="Select Category"
                      value={this.state.categoryId || undefined}
                      optionFilterProp="children"
                      onChange={this.onCategoryChange.bind(this)}
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      >
                      {mapCategories}
                    </Select>
                    <span style={{ "color": 'red' }}>{this.state.errors.categoryId}</span>
                  </Col>
                  <Col span={3} xl={{ span: 3 }} lg={{ span: 4 }} sm={{ span: 3 }}>
                    <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                      showSearch className="fun2winSelectcategry42"
                      style={{ width: '100%' }}
                      placeholder="Select Sub Category"
                      optionFilterProp="children"
                      value={this.state.subCategoryId || undefined}
                      onChange={this.onsubCategoryChange.bind(this)}
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      >
                      {mapSubCategories}
                    </Select>
                    <span style={{ "color": 'red' }}>{this.state.errors.subCategoryId}</span>
                  </Col>
                  <Col span={3} xl={{ span: 3 }} lg={{ span: 4 }} sm={{ span: 3 }}>
                    <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                      showSearch className="fun2winSelectcategry42"
                      style={{ width: '100%' }}
                      placeholder="Select Celebrity"
                      optionFilterProp="children"
                      value={this.state.celName || undefined}
                      onChange={this.onCelebrityChange.bind(this)}
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      >
                      {mapCelebrities}
                    </Select>
                    <span style={{ "color": 'red' }}>{this.state.errors.celName}</span>
                  </Col>
                </div>
                <Col span={10} xl={{ span: 10 }} lg={{ span: 10 }} sm={{ span: 11 }} className="FbcontestTopsidebars">
                  <nav className='contestsocial RghtAlign' role="navigation">
                    <Link to="/SocialMediaDashboard" className='item challengenav' activeClassName='active'>Completed</Link>
                    <Link to="/SocialmediapostsContests/SocialMediaRunning" className='item challengenav' activeClassName='active'>Running</Link>
                    <Link to="/SocialmediapostsContests/SocialMediaUpcoming" className='item challengenav' activeClassName='active'>Upcoming</Link>
                    <Link to="/SocialMediaDashboard"><Button type="primary" className='createBtnchalleng mrgLeft30 fbcontestbacktodahbtn'>Back to Dashboard</Button></Link>

                  </nav>
                </Col>

              </div>
            </div>
          </Col>
        </Row>


        <Form>
          <div className="CreateData1">

            <Row>
              <Col span={16} xl={{ span: 16 }} lg={{ span: 18 }} sm={{ span: 20 }} className="Createsocialmcontests">
                <div className="CreateData2">
                  <Col span={24} className="CreateCrudSelect">
                    <div className="">
                      <h2 className="BorderBottomGrey"> Create Contest Details</h2>
                      <div className="StepsMargn25">

                        <Steps current={current} className="StepsMargnBtm20 SocialContestsSteps">
                          {steps.map(item => <Step key={item.title} title={item.title} />)}
                        </Steps>
                        <div className="steps-content">{steps[current].content}</div>
                        <div className="steps-action floatRight">
                          {
                            this.state.current > 0
                            &&
                            <Button className="mrgnRight8" onClick={() => this.prev()}>
                              Previous
                         </Button>
                          }
                          {
                            current < steps.length - 1
                            && <Button className="BtnRight" type="primary" onClick={() => this.next()}>Save & Next</Button>
                          }
                          {
                            current === steps.length - 1
                            && <Button type="primary" onClick={this.createContest.bind(this)}>Done</Button>
                          }

                        </div>
                      </div>
                    </div>

                  </Col>
                </div>
              </Col>

            </Row>




          </div>
        </Form>



      </Dashboard>
    );
  };
}


export default SocialMediaCreateContest;
/* eslint-disable */