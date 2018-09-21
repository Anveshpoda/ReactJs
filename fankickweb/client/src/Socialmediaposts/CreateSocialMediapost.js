/* eslint-disable */
import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Tweet from 'react-tweet'
import ReactPlayer from 'react-player';
import $ from 'jquery';
import classNames from 'classnames/bind';
import { Link, browserHistory } from 'react-router';
import Dashboard from '../Dashboard/Dashboard';
import PlacesAutoComplete from '../pushnotifications/Custom/PlaceAutoComplete';
import { Col, Row, Tabs, Table, Card, Icon, Form, Button, Select, Input, DatePicker, Tag, Tooltip, message, Avatar } from 'antd';
import css from './Socialmedia.css';
import amitabh15 from '../images/amitabh15.jpg';
const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input;

function handleChange(value) {
    console.log(`selected ${value}`);
}

function onChange(dateString) {
    console.log(dateString);
}

function onOk(value) {
    console.log('onOk: ', value);
}

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}


class CreateSocialMediapost extends React.Component {
    state = {
        tags: [],
        inputVisible: false,
        inputValue: '',
        categories: [],
        subCategories: [],
        catId: "",
        subCatId: "",
        catName: '',
        subCatName: '',
        celebNames: [],
        celebrityName: "",
        postId: "",
        socialChannel: "",
        title: "",
        expiryDate: "",
        tags: [],
        locationArray: [],
        errors: {},
        previewData: {},
        profileId: "",
        locationNames: [],
        visible: false,
        tweetData: {},
        instaData: {}
    };

    componentWillMount() {
        var _this = this;
        var req = axios.create({
            headers: {
                "x-access-token": sessionStorage.getItem('token'),
                "Content-Type": "application/json"
            }
        })
        req.get('/categories').then((response) => {
            _this.setState({ categories: response.data.data });
        })
        req.get('/locationNames').then((response) => {
            _this.setState({ locationNames: ["SelectAll", ...response.data.data] })
        })
    }

    //--------- newley added tags by roop ------//

    handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });
    }

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    }

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }

    handleInputConfirm = () => {
        const state = this.state;
        const inputValue = state.inputValue;
        let tags = state.tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        console.log(tags);
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
    }

    saveInputRef = input => this.input = input












    //---------- end --------------///




    handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });
    }

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    }

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }

    handleInputConfirm = () => {
        const state = this.state;
        const inputValue = state.inputValue;
        let tags = state.tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        console.log(tags);
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
    }
    onCategoryChange = (e) => {
        this.setState({ catId: e, subCatId: "" });
        if (e != "") this.state.errors.catId = "";
        this.state.categories.map((item) => {
            if (item._id === e) {
                this.setState({ subCategories: item.subCategories, catName: item.name, subCatName: "", celebrityName: "" });
            }
        })
    }
    onSubCatChange = (e) => {
        var _this = this;
        this.setState({ subCatId: e });
        if (e != "") this.state.errors.subCatId = "";
        this.state.subCategories.map((item) => {
            if (item._id === e) {
                this.setState({ subCatName: item.name, celebrityName: '' });
            }
        })
        var getData = axios.create({
            params: {
                subCatId: e
            }, headers: { 'Content-Type': 'application/json' }
        })
        getData.get('/celebrityNames').then(function (response) {
            _this.setState({ celebNames: response.data.data });
        })
    }
    onCelebChange = (e) => {
        this.setState({ celebrityName: e });
    }

    onSocialChannelChange = (e) => {
        this.setState({ socialChannel: e, postId: "", profileId: "" });
        if (e != "") this.state.errors.socialChannel = "";
    }
    onPostIdChange = (e) => {
        this.setState({ postId: e.target.value });
        if (e.target.value != "") this.state.errors.postId = "";
    }
    onProfileIdChange = (e) => {
        this.setState({ profileId: e.target.value });
        if (e.target.value != "") this.state.errors.profileId = "";
    }
    onTitleChange = (e) => {
        this.setState({ title: e.target.value })
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
    onDateChange = (e) => {
        var date = moment(e).toISOString();
        this.setState({ expiryDate: date })
    }
    handleMapData = (data, locationId) => {
        var res = data.split(',');
        var locationObj = {};
        if (this.state.tags.length != 0) this.state.errors.location = "";
        if (!this.state.tags.includes(res[0])) {
            locationObj.location = res[0];
            locationObj.locId = locationId;
            var locations = [...this.state.locationArray, locationObj]
            var tags = [...this.state.tags, res[0]];
            this.setState({
                tags: tags,
                locationArray: locations
            })
        }
    }
    onPreviewClick = () => {
        if (this.state.socialChannel === "Facebook") {
            // var fbTokenUrl = process.env.REACT_APP_API_HOST + "/rest/appSettings?version=26&deviceType=andriod";
            // console.log('fbTokenUrl', fbTokenUrl);
            // var getData = axios.create({
            //     headers: { 'Content-Type': 'application/json' }
            // })
            // getData.get(fbTokenUrl).then((response) => {
            //     console.log("response", response.data.data.appSettings.fbAccessToken)
            //var url = "https://graph.facebook.com/v2.11/" + this.state.profileId + "_" + this.state.postId + "?fields=id,name,source,type,created_time,message,full_picture&access_token=" + response.data.data.appSettings.fbAccessToken;
            var url = "https://graph.facebook.com/v2.11/" + this.state.profileId + "_" + this.state.postId + "?fields=id,name,source,type,created_time,link,message,from,full_picture&access_token=1592699054124367|2xOa6F7h38Ag4I_3X1OmLEk-SMI";
            var getData = axios.create({
                headers: { 'Content-Type': 'application/json' }
            })
            getData.get(url).then((response) => {
                console.log("response", response.data.data);
                this.setState({ previewData: response.data, visible: true });
                var url1 = "https://graph.facebook.com/" + response.data.from.id + "/picture?type=normal&redirect=false&access_token=1592699054124367|2xOa6F7h38Ag4I_3X1OmLEk-SMI";
                getData.get(url1).then((res) => {
                    console.log("response picture", res.data.data.url);
                    this.setState({ profileImage: res.data.data.url })
                    // this.setState({ previewData: response.data, visible: true });
                })
            })

            //})
        } else if (this.state.socialChannel === "Youtube") {
            this.setState({ visible: true })
        } else if (this.state.socialChannel === "Twitter") {
            if (this.state.postId !== "") {
                var getData = axios.create({
                    headers: { 'x-access-token': sessionStorage.getItem('token') }
                })
                getData.get('/posts/' + this.state.postId).then((response) => {
                    if (response.data.status === 200) {
                        this.setState({ tweetData: response.data.data, visible: true })
                        console.log("response data", response.data.data)
                    }
                })
            } else {
                message.error(`Post Id is required`);
            }
        } else if (this.state.socialChannel === "Instagram") {
            if (this.state.postId !== "") {
                var getData = axios.create({
                    headers: { 'x-access-token': sessionStorage.getItem('token') }
                })
                getData.get('/instaPosts/' + this.state.postId).then((response) => {
                    if (response.data.status === 200) {
                        this.setState({ instaData: response.data.data, visible: true })
                        console.log("response data", response.data.data)
                    }
                })
            } else {
                message.error(`Post Id is required`);
            }
        }
    }


    onLocationChange = (value) => {
        console.log("value", value);
        if (value.length != 0) this.state.errors.location = "";
        if (value[0] !== "SelectAll" && value.includes("SelectAll")) {
            this.setState({ tags: [] })
        }
        else if (value[0] === "SelectAll") {
            this.setState({
                tags: this.state.locationNames.slice(1, this.state.locationNames.length)
            })
        }
        else {
            this.setState({ tags: value })
        }
    }


    handleSubmit = () => {
        let errors = {};
        if (this.state.catId === "") errors.catId = "*mandatory field";
        if (this.state.subCatId === "") errors.subCatId = "*mandatory field";
        if (this.state.socialChannel === "") errors.socialChannel = "*mandatory field";
        if (this.state.postId.trim() === "") errors.postId = "*mandatory field";
        if (this.state.socialChannel === "Facebook") {
            if (this.state.profileId === "") errors.profileId = "*mandatory field";
        }
        if (this.state.tags.length === 0) errors.location = "*mandatory field";
        this.setState({ errors: errors });
        var feedId = ""; var postedUrl = "";
        if (this.state.socialChannel === "Facebook") {
            feedId = this.state.profileId + "_" + this.state.postId
            postedUrl = this.state.previewData ? this.state.previewData.full_picture : ""
        } else if (this.state.socialChannel === "Youtube") {
            feedId = this.state.postId
            var videoUrl = "https://www.youtube.com/watch?v=" + this.state.postId;
        } else if (this.state.socialChannel === "Twitter") {
            feedId = this.state.postId
            postedUrl = this.state.tweetData.extended_entities ? this.state.tweetData.extended_entities.media[0].media_url_https : ""
        } else if (this.state.socialChannel === "Instagram") {
            feedId = this.state.postId
            postedUrl = this.state.instaData.graphql.shortcode_media.display_resources[0].src
        }
        var day = moment(this.state.expiryDate).format("YYYY-MM-DD");
        var time = moment().endOf('day').format('HH:mm:ss');
        var d = day + " " + time;
        var newdate = new Date(d).toISOString();
        if (Object.keys(errors).length === 0) {
            var data = {
                categoryId: this.state.catId,
                subCategoryId: this.state.subCatId,
                celebrityName: this.state.celebrityName,
                //socialChannel:this.state.socialChannel,
                feedId: feedId.trim(),
                type: this.state.socialChannel,
                text: this.state.title.trim(),
                expiryDate: newdate,
                //location: this.state.locationArray,
                locationTags: this.state.tags,
                imageUrl: postedUrl
            }
            if (this.state.socialChannel === "Youtube") {
                data.videoUrl = this.state.postId; data.feedType = "video"; data.description = ""
                data.ownerImageUrl = ""; data.ownerName = "";
            }
            if (this.state.socialChannel === "Facebook") {
                data.feedType = this.state.previewData.type
                //data.linkForVideo = this.state.previewData.link
                data.description = this.state.previewData.message
                data.ownerName = this.state.previewData.from.name
                data.ownerImageUrl = this.state.profileImage
                if (this.state.previewData.type === "video") {
                    data.videoUrl = this.state.previewData.source ? this.state.previewData.source : this.state.previewData.link
                } else {
                    data.videoUrl = ""
                }
            }
            if (this.state.socialChannel === "Twitter") {
                data.feedType = this.state.tweetData.extended_entities ? this.state.tweetData.extended_entities.media[0].type : "text"
                data.description = this.state.tweetData.full_text
                data.ownerName = this.state.tweetData.user.name
                data.ownerImageUrl = this.state.tweetData.user.profile_image_url
                if (this.state.tweetData.extended_entities) {
                    if (this.state.tweetData.extended_entities.media[0].type === "video") {
                        data.videoUrl = this.state.tweetData.extended_entities.media[0].video_info.variants[0].url
                    } else {
                        data.videoUrl = ""
                    }
                } else {
                    data.videoUrl = ""
                }
            }
            if (this.state.socialChannel === "Instagram") {
                if (this.state.instaData.graphql.shortcode_media.__typename === "GraphImage") {
                    data.feedType = "photo"
                    data.videoUrl = ""
                } else {
                    data.feedType = "video"
                    data.videoUrl = this.state.instaData.graphql.shortcode_media.video_url
                }
                data.description = this.state.instaData.graphql.shortcode_media.edge_media_to_caption.edges[0].node.text
                data.ownerName = this.state.instaData.graphql.shortcode_media.owner.full_name
                data.ownerImageUrl = this.state.instaData.graphql.shortcode_media.owner.profile_pic_url
            }
            var req = axios.create({
                headers: {
                    "x-access-token": sessionStorage.getItem("token"),
                    "Content-Type": "application/json"
                }
            })
            req.post('/trendingPosts', data).then((response) => {
                if (response.data.status === 200) {
                    message.success(`Post created successfully`);
                    browserHistory.push('/SocialMedia');
                } else {
                    message.error(`Post not created`);
                }
            })
        }
    }

    saveInputRef = input => this.input = input

    render() {
        const { tags, inputVisible, inputValue, previewData, tweetData, instaData } = this.state; console.log("preview", previewData);
        const linkProps = { target: '_blank', rel: 'noreferrer' }
        var categories = this.state.categories.map((cat) => <Option value={cat._id}>{cat.name}</Option>)
        var subCategories = this.state.subCategories.map((cat) => <Option value={cat._id}>{cat.name}</Option>)
        var celebNames = this.state.celebNames.map((celeb) => <Option value={celeb}>{celeb}</Option>)
        var locationNames = this.state.locationNames.map((loc) => <Option value={loc}>{loc}</Option>)
        var url = "";
        if (this.state.socialChannel === "Youtube") {
            var url = "https://www.youtube.com/watch?v=" + this.state.postId.trim();
            //this.setState({ postId: url });
        }
        // if (this.state.socialChannel === "Youtube") {
        //     var url = "https://scontent.xx.fbcdn.net/v/t15.0-10/38087826_446034495890186_3116916045118439424_n.jpg?_nc_cat=1&oh=a64223105b5474be9cd1bcbe1616307c&oe=5C31143D"
        // }
        return (
            <Dashboard>
                <div className="CreateSocialmPostsmain">
                    <Col span={24} className="SocialMTopbars">
                        <div className="SocialmediaHeader">
                            <Col span={16} xl={{ span: 16 }} lg={{ span: 16 }} sm={{ span: 20 }}>
                                <Col span={5} xl={{ span: 5 }} lg={{ span: 7 }} sm={{ span: 7 }}>
                                    <h5>Create Social Media Posts</h5>
                                </Col>
                                <Col span={4} className="SocialmSelectcols">
                                    <Select className="SocialmSelect" placeholder="Select Category" getPopupContainer={triggerNode => triggerNode.parentNode} value={this.state.catName || undefined} onChange={this.onCategoryChange}>
                                        {categories}
                                    </Select>
                                    <span style={{ 'color': "red" }}>{this.state.errors.catId}</span>
                                </Col>
                                <Col span={4} className="SocialmSelectcols">
                                    <Select getPopupContainer={triggerNode => triggerNode.parentNode} placeholder="Select SubCategory" value={this.state.subCatName || undefined} className="SocialmSelect" onChange={this.onSubCatChange}>
                                        {subCategories}
                                    </Select>
                                    <span style={{ 'color': "red" }}>{this.state.errors.subCatId}</span>
                                </Col>
                                <Col span={4} className="SocialmSelectcols">
                                    <Select placeholder="Select Celebrity"
                                        getPopupContainer={triggerNode => triggerNode.parentNode}
                                        value={this.state.celebrityName || undefined}
                                        className="SocialmSelect"
                                        showSearch
                                        optionFilterProp="children"
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        onChange={this.onCelebChange}>
                                        {celebNames}
                                    </Select>
                                </Col>
                            </Col>
                            <Col span={8} xl={{ span: 8 }} lg={{ span: 8 }} sm={{ span: 4 }}>
                                <Link to="/SocialMedia"> <Button className="Socialpostcbtn" type="primary">Back To Dashboard</Button></Link>
                            </Col>
                        </div>
                    </Col>
                    <Col span={16} className="CreateSocialpobody">
                        <div>
                            <Form>
                                <Col span={24} className="Slectssocialchannelmain1">
                                    <Col span={5} lg={{ span: 6 }} sm={{ span: 8 }}>
                                        <h6 className="h6Fnt">Select social Channel</h6>
                                        <FormItem>
                                            <Select placeholder="Select Social Channel" className="SocialMSelectChannel"
                                                getPopupContainer={triggerNode => triggerNode.parentNode}
                                                onChange={this.onSocialChannelChange}>
                                                <Option value="Facebook">Facebook</Option>
                                                <Option value="Youtube">Youtube</Option>
                                                <Option value="Instagram">Instagram</Option>
                                                <Option value="Twitter">Twitter</Option>
                                            </Select>
                                            <span style={{ 'color': "red" }}>{this.state.errors.socialChannel}</span>
                                        </FormItem>
                                    </Col>
                                </Col>
                                {this.state.socialChannel === "Facebook" ? <Col span={24}>
                                    <Col span={11} lg={{ span: 15 }} sm={{ span: 15 }}>
                                        <h6 className="h6Fnt">Enter Profile Id</h6>
                                        <FormItem>
                                            <Input placeholder="Enter Profile Id" value={this.state.profileId} onChange={this.onProfileIdChange} />
                                            <span style={{ 'color': "red" }}>{this.state.errors.profileId}</span>
                                        </FormItem>
                                    </Col>
                                </Col> : ""}
                                <Col span={24}>
                                    <Col span={11} lg={{ span: 15 }} sm={{ span: 15 }}>
                                        <h6 className="h6Fnt">Enter Post Id</h6>
                                        <FormItem>
                                            <Input placeholder="Enter Post Id" value={this.state.postId} onChange={this.onPostIdChange} />
                                            <span style={{ 'color': "red" }}>{this.state.errors.postId}</span>
                                        </FormItem>
                                    </Col>
                                </Col>
                                <Col span={24}>
                                    <Col span={11} lg={{ span: 15 }} sm={{ span: 15 }}>
                                        <h6 className="h6Fnt">Enter Title</h6>
                                        <FormItem>
                                            <Input placeholder="Enter Title" value={this.state.title} onChange={this.onTitleChange} />
                                        </FormItem>
                                    </Col>
                                    <Col span={24}>
                                        <Col span={11} lg={{ span: 15 }} sm={{ span: 15 }}>
                                            <h6 className="h6Fnt">Enter Post Story</h6>
                                            <FormItem>
                                                <TextArea rows={4} />
                                            </FormItem>

                                        </Col>
                                    </Col>
                                </Col>
                                <Col span={24}>
                                    <Col span={10}>
                                        <h6 className="h6Fnt">Set Expiry Date</h6>
                                        <FormItem>
                                            <DatePicker disabledDate={this.disabledDate}
                                                getCalendarContainer={triggerNode => triggerNode.parentNode}
                                                // showTime
                                                // format="YYYY-MM-DD"
                                                placeholder="Select Date"
                                                onChange={this.onDateChange}
                                                onOk={onOk}
                                                />
                                        </FormItem>
                                    </Col>
                                </Col>
                             <Col span={24}>
                                    <Col span={7}>
                                        <FormItem label="Author Name">
                                            <Input placeholder="Enter Author Name" />
                                        </FormItem>
                                    </Col>
                                    <Col span={7} offset={1}>
                                        <FormItem label="Editor Name">
                                            <Input placeholder="Enter Editor Name" />
                                        </FormItem>
                                    </Col>
                                </Col>
                                <Col span={24}>
                                    <FormItem label="Major Kewords">
                                        <div>
                                            {tags.map((tag, index) => {
                                                const isLongTag = tag.length > 20;
                                                const tagElem = (
                                                    <Tag key={tag} closable={index !== -1} afterClose={() => this.handleClose(tag)}>
                                                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                                    </Tag>
                                                );
                                                return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                                            })}
                                            {inputVisible && (
                                                <Input
                                                    ref={this.saveInputRef}
                                                    type="text"
                                                    size="small"
                                                    style={{ width: 78 }}
                                                    value={inputValue}
                                                    onChange={this.handleInputChange}
                                                    onBlur={this.handleInputConfirm}
                                                    onPressEnter={this.handleInputConfirm}
                                                    />
                                            )}
                                            {!inputVisible && (
                                                <Tag
                                                    onClick={this.showInput}
                                                    style={{ background: '#fff', borderStyle: 'dashed' }}
                                                    >
                                                    <Icon type="plus" /> New Tag
                                          </Tag>
                                            )}
                                        </div>
                                    </FormItem>
                                </Col>
                                <Col span={24}>
                                    <FormItem label="Minor Kewords">
                                        <div>
                                            {tags.map((tag, index) => {
                                                const isLongTag = tag.length > 20;
                                                const tagElem = (
                                                    <Tag key={tag} closable={index !== -1} afterClose={() => this.handleClose(tag)}>
                                                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                                    </Tag>
                                                );
                                                return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                                            })}
                                            {inputVisible && (
                                                <Input
                                                    ref={this.saveInputRef}
                                                    type="text"
                                                    size="small"
                                                    style={{ width: 78 }}
                                                    value={inputValue}
                                                    onChange={this.handleInputChange}
                                                    onBlur={this.handleInputConfirm}
                                                    onPressEnter={this.handleInputConfirm}
                                                    />
                                            )}
                                            {!inputVisible && (
                                                <Tag
                                                    onClick={this.showInput}
                                                    style={{ background: '#fff', borderStyle: 'dashed' }}
                                                    >
                                                    <Icon type="plus" /> New Tag
                                          </Tag>
                                            )}
                                        </div>
                                    </FormItem>
                                </Col>
                                <Col span={24}>
                                    <FormItem label="Hash Tags">
                                        <div>
                                            {tags.map((tag, index) => {
                                                const isLongTag = tag.length > 20;
                                                const tagElem = (
                                                    <Tag key={tag} closable={index !== -1} afterClose={() => this.handleClose(tag)}>
                                                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                                    </Tag>
                                                );
                                                return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                                            })}
                                            {inputVisible && (
                                                <Input
                                                    ref={this.saveInputRef}
                                                    type="text"
                                                    size="small"
                                                    style={{ width: 78 }}
                                                    value={inputValue}
                                                    onChange={this.handleInputChange}
                                                    onBlur={this.handleInputConfirm}
                                                    onPressEnter={this.handleInputConfirm}
                                                    />
                                            )}
                                            {!inputVisible && (
                                                <Tag
                                                    onClick={this.showInput}
                                                    style={{ background: '#fff', borderStyle: 'dashed' }}
                                                    >
                                                    <Icon type="plus" /> New Tag
                                          </Tag>
                                            )}
                                        </div>
                                    </FormItem>
                                </Col>
                                <Col span={24} className="CreateSocialmpostysTag">
                                    <Col span={11} lg={{ span: 15 }} sm={{ span: 15 }}>
                                        <h6 className="h6Fnt">Select Location</h6>
                                        <FormItem>
                                            <div>
                                                {/*<PlacesAutoComplete submit44={this.handleMapData} className="ant-input" />
                                            <div>
                                                {tags.map((tag, index) => {
                                                    const isLongTag = tag.length > 20;
                                                    const tagElem = (
                                                        <Tag key={tag} closable={index !== -1} afterClose={() => this.handleClose(tag)}>
                                                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                                        </Tag>
                                                    );
                                                    return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                                                })}
                                            </div>*/}
                                                <Select className="Seleclocationsocialposts"
                                                    getPopupContainer={triggerNode => triggerNode.parentNode}
                                                    mode="multiple"
                                                    showSearch
                                                    style={{ width: '100%' }}
                                                    placeholder="select location"
                                                    // onChange={handleChange}
                                                    optionFilterProp="children"
                                                    value={this.state.tags || undefined}
                                                    onChange={this.onLocationChange}
                                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                    >

                                                    {locationNames}
                                                </Select>

                                                <span style={{ 'color': "red" }}>{this.state.errors.location}</span>
                                            </div>
                                        </FormItem>
                                    </Col>
                                </Col>
                                <Col span={24}>
                                    <div>
                                        <Button type="primary" onClick={this.onPreviewClick}>See Preview</Button>
                                    </div>
                                    <Col span={24} className="SocialMeditasCreatPreview">
                                        <Col span={12}>
                                            {this.state.visible === true ? this.state.socialChannel === "Facebook" || this.state.socialChannel === "Twitter" || this.state.socialChannel === "Instagram" ?
                                                <div className="SocialPostsCreatepriew">
                                                    {this.state.socialChannel === "Twitter" ? <div>
                                                        {/*<ul className="list-inline"><li>
                                                            <Avatar src={tweetData.user.profile_image_url} /> </li>
                                                            <li>
                                                                <p className="twituseridss">{tweetData.user.name}</p> </li>
                                                        </ul>*/}
                                                        <Tweet data={tweetData} linkProps={linkProps} />
                                                    </div> : ""}
                                                    <div className="SocialPostsCreatepriewhead">
                                                        <p>{this.state.title}</p>
                                                    </div>
                                                    <div>
                                                        {/*this.state.socialChannel === "Facebook" ? <img src={previewData.full_picture} alt="contest-cover" width="300px" height="300px" />
                                                            : tweetData.entities.urls ? <img src={tweetData.entities.urls ? tweetData.entities.urls[0].expanded_url : tweetData.entities.urls[0].display_url} alt="contest-cover" width="300px" height="300px" />
                                                                : ""*/}
                                                        {this.state.socialChannel === "Facebook" ? <img src={previewData.full_picture} alt="contest-cover" width="300px" height="300px" /> : ""}
                                                        {this.state.socialChannel === "Instagram" ? <img src={instaData.graphql.shortcode_media.display_resources[0].src} alt="contest-cover" width="300px" height="300px" /> : ""}
                                                    </div>
                                                    <div className="SocialPostsCreatepriewfoot">
                                                        <p>{this.state.socialChannel === "Facebook" ? previewData.message : ""}</p>
                                                        <p>{this.state.socialChannel === "Instagram" ? instaData.graphql.shortcode_media.edge_media_to_caption.edges[0].node.text : ""}</p>
                                                    </div>
                                                    <div>

                                                    </div>
                                                </div> :
                                                <ReactPlayer
                                                    youtubeConfig={{ youtube: { playerVars: { showinfo: 1 } } }}
                                                    //facebookConfig={{ appId: this.state.profileId }}
                                                    url={url}
                                                    className="allblogVideo"
                                                    controls
                                                    /> : ""}

                                        </Col>
                                    </Col>

                                </Col>
                                <Col span={24}>
                                    <Button style={{ float: 'right', marginRight: '25px' }} type="primary" onClick={this.handleSubmit}>Save</Button>
                                </Col>
                            </Form>
                        </div>
                    </Col>
                </div>
            </Dashboard>
        );
    }
}

export default CreateSocialMediapost;