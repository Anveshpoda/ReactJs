/* eslint-disable */
import React from 'react';
import Dashboard from '../Dashboard/Dashboard';
import { Link, browserHistory } from 'react-router';
import { Form, Icon, Input, Button, Select, Col, Tag, Tooltip, Upload, Row, Steps, message, DatePicker, Modal } from 'antd';
import './approvalCycle.css';
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

class SendForApproval extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            usersList: [],
            message: "",
            users: [],
            masterReviewer: "",
            userObjectArray : []
        }
    }
    userListChange = (value) => {
        this.setState({ users: value });
        var obj = {};
        obj = {
            "toWhom": value.slice(-1)[0],
            "approveStatus": false ,
            "readOrUnread": false
        }
        this.state.userObjectArray.push(obj)

    }
    sendforApproval = () => {
        var _this = this;
        var user = JSON.parse(sessionStorage.getItem('user'));
        var data = {
            sentBy: user.firstname + " " + user.lastname,
            imageUrl: user.profileImage,
            senderUserId: user._id,
            MessageToWhom: this.state.userObjectArray,
            module: this.props.module,
            createdPackId: this.props.packId,
            comments: this.state.message ? [{
                commentedBy: user._id,
                commentedUsername: user.firstname + " " + user.lastname,
                imageUrl: user.profileImage,
                role: user.role.name,
                message: this.state.message
            }] : [],
            review: true,
            messages: [{
                message:"Request to Review -" + this.props.module + " module - " + this.props.packName ,
                createdDate:new Date().toISOString()
            }],
            
        }
        const url = '/approvalCycle/messages';
        var request = new Request(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'x-access-token': sessionStorage.getItem('token')
            },
            body: JSON.stringify(data),
        });
        fetch(request)
            .then(response => response.json())
            .then(function (response) {
                if (response.status === 200 && response.message === "Success") {
                    _this.setState({ visible: false });
                    { _this.props.module === "Challenges" ? browserHistory.push('/fankick') : 
                    _this.props.module ===  "MetaData" ? browserHistory.push('/crudDashboard') : '' }
                    message.success("SuccessFully send for Approval Process");
                }
                else {
                }
            })
    }
    getUsersList = () => {
        var _this = this;
        var userObject = JSON.parse(sessionStorage.getItem('user'));
        var data = {
            groupId: userObject.groupId._id ,
            userId : userObject._id
        }
        const url = '/approvalCycle/usersList';
        var request = new Request(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'x-access-token': sessionStorage.getItem('token')
            },
            body: JSON.stringify(data),
        });
        fetch(request)
            .then(response => response.json())
            .then(function (response) {
                if (response.status === 200 && response.message === "Success") {
                    var uu = [];
                    var obj = {};
                    var uid = []
                    _this.setState({ usersList: response.data, masterReviewer: userObject.masterReviewer });
                    _this.state.usersList.map((user) => {
                        if (userObject.masterReviewer._id === user._id) {
                            obj = {
                                "toWhom": user._id,
                                "approveStatus": true ,
                                "readOrUnread" : false
                            }
                            uu.push(obj);
                            uid.push(user._id)
                        }
                    })
                    _this.setState({ userObjectArray: uu });
                    _this.setState({ users: uid })

                }
                else {
                }
            })
    }
    approvalModal = () => {
        this.setState({ visible: true });
        this.getUsersList();
    }
    handleCancel = () => {
        this.setState({ visible: false })
    }
    messageChange = (e) => {
        this.setState({ message: e.target.value })
    }
    render() {
        console.log("this", this.state)
        var users = this.state.usersList.map((user) =>
            <Option value={user._id}>{user.firstname + " " + user.lastname}({user.role.name})</Option>)
        return (
            <div>
                <Modal
                    title="Send For Approval To"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={<Button onClick={this.sendforApproval.bind(this)}>Send </Button>}
                >
                    <div>
                        <Col span={24}>
                            <Col span={12} className="MessageApprovalselectmem">
                                <FormItem>
                                    <h6 className="h6Fnt">Add Members</h6>
                                    <Select
                                        showSearch
                                        getPopupContainer={triggerNode => triggerNode.parentNode}
                                        mode="multiple"
                                        value={this.state.users || undefined}
                                        optionFilterProp="children"
                                        onChange={this.userListChange.bind(this)}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        className="SelectMovieGenreDrop"
                                    >
                                        {users}
                                    </Select>

                                </FormItem>
                            </Col>
                        </Col>
                        <Col span={24}>
                            <Col span={16}>
                                <FormItem>
                                    <h6 className="h6Fnt">Add Note Or Description</h6>
                                    <TextArea rows={3} placeholder="Add Note Or Description"
                                        name="contestDescription"
                                        value={this.state.message}
                                        onChange={this.messageChange.bind(this)} />
                                </FormItem>
                            </Col>

                        </Col>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default SendForApproval;
/* eslint-disable */