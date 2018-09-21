/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import $ from "jquery";
import Dashboard from '../Dashboard/Dashboard';
import { Link } from 'react-router';
import ReactPlayer from 'react-player';
import { Scrollbars } from 'react-custom-scrollbars';
import moment from 'moment';
import { Form, Icon, Input, Button, Modal, Checkbox, Pagination, Col, Table, Row, Select, Tabs } from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const confirm = Modal.confirm;


class SocialMediaView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            viewData: {},
            bannerImagewithText: "",
            bannerImagewithoutText: "",
            contestStartDate: "",
            contestEndDate: "",
            termsAndConditions: "",
            caption: "",
            fbContestName: "",
            title: "",
            description: "",
            isYoutubeVideo: false,
            fbContestVideoUrl: "",
            contestType: ""
        }
    }
    getContestById = (id) => {
        var _this = this;
        const url = '/Socialmediacontest/' + id;
        var request = new Request(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": sessionStorage.getItem('token')
            }

        })
        fetch(request)
            .then(response => response.json())
            .then(function (response) {
                if (response.message == "Success" && response.status == 200) {
                    _this.setState({ viewData: response.data })
                    _this.setState({
                        bannerImagewithText   : _this.state.viewData.contestUrl,
                        bannerImagewithoutText: _this.state.viewData.fbContestThumbnail,
                        contestStartDate: _this.state.viewData.contestStartDate,
                        contestEndDate: _this.state.viewData.contestEndDate,
                        termsAndConditions: _this.state.viewData.termsAndConditions,
                        caption: _this.state.viewData.caption,
                        fbContestName: _this.state.viewData.fbContestName,
                        title: _this.state.viewData.title,
                        description: _this.state.viewData.description,
                        isYoutubeVideo: _this.state.viewData.isYoutubeVideo,
                        fbContestVideoUrl: _this.state.viewData.fbContestVideoUrl,
                        contestType: _this.state.viewData.contestType
                    });

                }
            })
    }
    viewModal = (id) => {
        this.setState({ visible: true })
        this.getContestById(id);
    }
    handleCancel = () => {
        this.setState({ visible: false })
    }
    render() {
        return (
            <div>
                <Modal
                    title="SocialMediaContest ViewDetails"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={<Button className="footbtn" style={{ marginRight: 8 }} type="primary" onClick={this.handleCancel}>Close</Button>}
                    width='700'
                    >
                    <Scrollbars style={{ height: '62vh', padding: '0px 10px' }}>
                      <div className="fbcontestviewbody">
                        <Row>
                            <Col span={24}>
                                <FormItem label="Banner Image with text">
                                    <img src={this.state.bannerImagewithText} width="484px" height="252px" alt="" />
                                </FormItem>

                            </Col>

                            <Col span={24}>
                                {this.state.isYoutubeVideo === true && this.state.contestType === "video" ?
                                    <ReactPlayer width="100%" height="150px" config={{ youtube: { playerVars: { showinfo: 1 } } }} url={'https://www.youtube.com/watch?v=' + this.state.fbContestVideoUrl} playing={false} controls /> :
                                    this.state.isYoutubeVideo === false && this.state.contestType === "video" ?
                                    <ReactPlayer width="100%" height="150px" config={{ youtube: { playerVars: { showinfo: 1 } } }} url={this.state.fbContestVideoUrl} playing={false} controls /> :
                                    this.state.contestType === "image" ? <FormItem label="Banner Image without text">
                                        <img src={this.state.bannerImagewithoutText} width="320px" height="170px" alt="" />
                                    </FormItem> : '' }

                            </Col>

                        </Row>

                        <Row>
                            <Col span={24} className="contestfbviewchanneltype">
                                <Col span={12}>
                                    <p className="BlackTxt">Social Media Channel Type : <span className="GreyTxt">Facebook</span></p>
                                </Col>
                                <Col span={12}>
                                    <p className="BlackTxt">Contest Type : <span className="GreyTxt">{this.state.title}</span></p>
                                </Col>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24} className="contestfbviewstartenddate">
                                <Col span={12}>
                                    <p className="BlackTxt">Start Date : <span className="GreyTxt">{moment(this.state.contestStartDate).format('MM/DD/YYYY')}</span></p>
                                </Col>
                                <Col span={12}>
                                    <p className="BlackTxt">End Date : <span className="GreyTxt">{moment(this.state.contestEndDate).format('MM/DD/YYYY')}</span></p>
                                </Col>
                            </Col>
                        </Row>


                        <Row>
                            <Col span={24}>
                                <Col span={24} className="fbcontestviewcaptionid">
                                    <p className="contestfbtermsandhead">Contest Caption :</p>
                                    <p className="contestcaptiontext"> <span className="GreyTxt">{this.state.caption}</span></p>
                                </Col>

                            </Col>
                        </Row>


                        {/*    <Row>
                    <Col span={24}>
                      <p className="BlackTxt">Contest Id : <span className="GreyTxt">http://www.facebook.com/watch?4535  </span></p>
                    </Col>
                    <Col span={24}>
                      <p className="BlackTxt">Post Redirect Url : <span className="GreyTxt">http://www.facebook.com/watch?4535  </span></p>
                    </Col>
                  </Row>*/}

                        <Row>
                            <Col span={24} className="contestfbviewdecription">
                                <p className="contestfbtermsandhead">Content Description :</p>
                                <p className="ContestViewdesct">{this.state.description}</p>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24} className="contestfbviewdecription">
                                <p className="contestfbtermsandhead">Terms & Conditions :</p>
                                <p className="termsandcondifbcontestview">{this.state.termsAndConditions}</p>


                            </Col>
                        </Row>
                        </div>
                    </Scrollbars>


                </Modal>
            </div>
        )
    }
}
//     render() {
//         return
//         (
//             <div>
//                 <Modal
//                     title="Sanju - Biopic of Sanjay Dutt"
//                     width='700'
//                     visible={this.state.visible}
//                     onCancel={this.handleCancel}
//                     footer={null}
//                 >

//                 </Modal>
//             </div>
//         )

//     }
// }
export default SocialMediaView;
