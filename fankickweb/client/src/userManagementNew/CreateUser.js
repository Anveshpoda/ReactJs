/* eslint-disable */
import React, { Children } from 'react';
import axios from 'axios';
import $ from 'jquery';
import { Layout, Menu, Breadcrumb, Icon, Col, Row, Select, Switch, Input, Form, Checkbox, Steps, Button, message } from 'antd';
import { Link } from 'react-router';
import css from './user.css';

const Step = Steps.Step;
const FormItem = Form.Item;
const Option = Select.Option;

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      Challenges: false,
      Fun2Win: false,
      coupons: false,
      fanCoins: false,
      groups: [],
      username: '',
      usersurname: '',
      useremail: '',
      rolltype: '',
      groupname: '',
      fun2winstatus: '',
      challengesstatus: '',
      couponstatus: '',
      fanclubstatus: '',
      funclubstatus: '',
      fancoinsstatus: '',
      notificationsstatus: '',
      pinCelebstatus: '',

    };
    this.onChangegroup = this.onChangegroup.bind(this);
    this.submitUserDetails = this.submitUserDetails.bind(this);
  }
  componentDidMount() {
    // this.getFunClubsName();
    this.getGroups();
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
    var data = {
      "username": this.state.username,
      "Surname": this.state.usersurname,
      "emailId": this.state.useremail,
      'roll': this.state.rolltype,
      'group': this.state.groupname
    }
    if (this.state.username == "") {
      console.log("Please enter User Name");
    }
    console.log("User Details", data);
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  challenges = () => {
    this.setState({ Challenges: !(this.state.Challenges) });
    console.log('statusjhkjhkjhkjhkjhkj', this.state.Challenges);
  }
  fun2win = () => {
    this.setState({ Fun2Win: !(this.state.Fun2Win) });
  }
  coupons = () => {
    this.setState({ coupons: !(this.state.coupons) });
  }
  fancoins = () => {
    this.setState({ fanCoins: !(this.state.fanCoins) });
  }
  getGroups = () => {
    // console.log("User -----------", sessionStorage.getItem('token'))
    var instance = axios.create({
      headers: { 'x-access-token': sessionStorage.getItem('token') }
    });
    instance.get('/categories').then((response) => {
      //    console.log("Data categories------------------", response.data.data);
      this.setState({ groups: response.data.data });
    });
  }

  onChangeUserName = (e) => {
    this.setState({ username: e.target.value });
  }
  onChangeUsersureName = (e) => {
    this.setState({ usersurname: e.target.value });
  }
  onChangeUserUserMailId = (e) => {
    this.setState({ useremail: e.target.value });
  }
  onChangegroup = (e) => {
    this.setState({ groupname: e });
  }
  selectrolltype = (e) => {
    //  console.log("selectrolltype------------------------", e);
    //if (e != '') this.state.errors.m7 = '';
    this.setState({ rolltype: e });

  }

  submitUserDetails = () => {

    var data = {
      "username": this.state.username,
      "Surname": this.state.usersurname,
      "emailId": this.state.useremail,
      'roll': this.state.rolltype,
      'group': this.state.groupname,
      //  "groupId": ObjectId("5a8e9b528bb38c1a438e8b6a"),
      "permissions": {
        "fun2win": {
          "status": true,
          "running": {
            "delete": true,
            "view": true
          },
          "queued": {
            "delete": true,
            "view": true,
            "approve": true,
            "edit": true
          },
          "closed": {
            "reschedule": true,
            "view": true
          }
        },
        "challenges": {
          "status": true,
          "running": {
            "delete": true,
            "view": true
          },
          "queued": {
            "delete": true,
            "view": true,
            "approve": true,
            "edit": true
          },
          "closed": {
            "reschedule": true,
            "view": true
          }
        },
        "coupons": {
          "status": true,
          "view": true,
          "delete": true,
          "approve": true,
          "edit": true
        },
        "fanClubs": {
          "status": true,
          "view": true,
          "delete": true,
          "approve": true,
          "edit": true
        },
        "fanCoins": {
          "status": true,
          "view": true,
          "delete": true,
          "approve": true,
          "edit": true
        },
        "funClubs": {
          "status": true,
          "view": true,
          "delete": true,
          "approve": true,
          "edit": true
        },
        "notifications": {
          "status": true,
          "view": true,
          "delete": true,
          "approve": true,
          "edit": true
        },
        "pinCeleb": {
          "status": true,
          "view": true,
          "delete": true,
          "approve": true,
          "edit": true
        }
      }
    }

  }

  render() {
    const mapCategories = this.state.groups.map((category) => <Option value={category._id}>{category.name}</Option>);
    const steps = [{
      title: 'User Details',
      content: <div className="marginTop20">
        <Form>
          <Col span="12">
            <FormItem label="Name" className="marginRight10">
              {/* <Input placeholder="Enter Name" /> */}
              <Input placeholder="Enter Name" maxLength="20" value={this.state.username} onChange={this.onChangeUserName} />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="Surname" className="marginLeft10">
              {/* <Input placeholder="Enter Last Name" /> */}
              <Input placeholder="Enter Surname" maxLength="20" value={this.state.usersurname} onChange={this.onChangeUsersureName} />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="Enter Email">
              {/* <Input placeholder="Enter Email" /> */}
              <Input placeholder="Enter Surname" maxLength="20" value={this.state.useremail} onChange={this.onChangeUserUserMailId} />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="User Group / Network">
              {/* <Select
                showSearch
                placeholder="Select a Group"
                optionFilterProp="children"
              >
                <Option value="jack">Group 1</Option>
                <Option value="lucy">Group 2</Option>
                <Option value="tom">Group 3</Option>
              </Select> */}
              <Select getPopupContainer={triggerNode => triggerNode.parentNode} defaultValue="Select a Group" style={{ width: 220 }} onChange={this.onChangegroup}>
                {mapCategories}
              </Select>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="Select user Roll">
              {/* <Select
                showSearch
                placeholder="Select a Role"
                optionFilterProp="children"
              >
                <Option value="">Master Admin</Option>
                <Option value="">Super Admin</Option>
                <Option value="">Admin</Option>
                <Option value="">User</Option>
              </Select> */}
              <Select placeholder="Select a Role" style={{ width: "100%" }} onChange={this.selectrolltype}>
                <Option value="Super Admin">Super Admin</Option>
                <Option value="Master Admin">Master Admin</Option>
                <Option value="Admin">Admin</Option>
                <Option value="User">User</Option>
              </Select>
            </FormItem>
          </Col>
        </Form>
      </div>,
    }, {
      title: 'Roles & Permissions',
      content: <div className="marginTop20">
        <Row>
          <Col span={24} className="modulePermissions">
            <Col span={18}>
              <p className="moduleTypes">Message Center Challenges</p>
            </Col>
            <Col span={6}>
              <FormItem className="CheckboxAllowAccess">
                <Checkbox onClick={this.challenges.bind(this)}>Allow Access</Checkbox>
              </FormItem>
            </Col>
          </Col>
          {this.state.Challenges ?
            <Col span={24} className="paddingLeft20">

              <FormItem>
                <Checkbox>Create</Checkbox>
              </FormItem>
              <FormItem>
                <Checkbox>Edit</Checkbox>
              </FormItem>
              <FormItem>
                <Checkbox>Delete</Checkbox>
              </FormItem>
              <FormItem>
                <Checkbox>Reschedule</Checkbox>
              </FormItem>
              <FormItem>
                <Checkbox>Approve</Checkbox>
              </FormItem>


            </Col> : null}
        </Row>
        <Row>
          <Col span={24} className="modulePermissions">
            <Col span={18}>
              <p className="moduleTypes">Fun2Win</p>
            </Col>
            <Col span={6}>
              <FormItem className="CheckboxAllowAccess">
                <Checkbox onClick={this.fun2win.bind(this)}>Allow Access</Checkbox>
              </FormItem>
            </Col>
          </Col>
          {this.state.Fun2Win ?
            <Col span={24} className="paddingLeft20">

              <FormItem>
                <Checkbox>Create</Checkbox>
              </FormItem>
              <FormItem>
                <Checkbox>Edit</Checkbox>
              </FormItem>
              <FormItem>
                <Checkbox>Delete</Checkbox>
              </FormItem>
              <FormItem>
                <Checkbox>Reschedule</Checkbox>
              </FormItem>
              <FormItem>
                <Checkbox>Approve</Checkbox>
              </FormItem>

            </Col> : null}
        </Row>
        <Row>
          <Col span={24} className="modulePermissions">
            <Col span={18}>
              <p className="moduleTypes">Coupons</p>
            </Col>
            <Col span={6}>
              <FormItem className="CheckboxAllowAccess">
                <Checkbox onClick={this.coupons.bind(this)}>Allow Access</Checkbox>
              </FormItem>
            </Col>
          </Col>
          {this.state.coupons ?
            <Col span={24} className="paddingLeft20">

              <FormItem>
                <Checkbox>Create / Edit / Delete</Checkbox>
              </FormItem>
              <FormItem>
                <Checkbox>Send For Approval</Checkbox>
              </FormItem>
              <FormItem>
                <Checkbox>Publish</Checkbox>
              </FormItem>
              <FormItem>
                <Checkbox>Allow Access</Checkbox>
              </FormItem>
            </Col> : null}
        </Row>
        <Row>
          <Col span={24} className="modulePermissions">
            <Col span={18}>
              <p className="moduleTypes">FanCoins</p>
            </Col>
            <Col span={6}>
              <FormItem className="CheckboxAllowAccess">
                <Checkbox onClick={this.fancoins.bind(this)}>Allow Access</Checkbox>
              </FormItem>
            </Col>
          </Col>
          {this.state.fanCoins ?
            <Col span={24} className="paddingLeft20">

              <FormItem>
                <Checkbox>Create / Edit / Delete</Checkbox>
              </FormItem>
              <FormItem>
                <Checkbox>Send For Approval</Checkbox>
              </FormItem>
              <FormItem>
                <Checkbox>Publish</Checkbox>
              </FormItem>
              <FormItem>
                <Checkbox>Allow Access</Checkbox>
              </FormItem>
            </Col> : null}
        </Row>
      </div>,
    }];
    const { current } = this.state;
    return (
      <div>
        <Col span={18}>
          <Steps current={current}>

            {steps.map(item => <Step key={item.title} title={item.title} />)}
          </Steps>
          <div className="steps-content">{steps[this.state.current].content}</div>
          <div className="steps-action floatRight">
            {
              this.state.current < steps.length - 1
              &&
              <Button type="primary" onClick={() => this.next()}>Next</Button>
            }
            {
              this.state.current > 0
              &&
              <Button onClick={() => this.prev()}>
                Previous
              </Button>
            }
            {
              this.state.current === steps.length - 1
              &&
              // <Button type="primary" style={{ marginLeft: 8 }} onClick={() => message.success('Processing complete!')}>Create</Button>
              <Button type="primary" style={{ marginLeft: 8 }} onClick={this.submitUserDetails.bind(this)}>Create</Button>

            }

          </div>
        </Col>
      </div>
    );
  }
}
export default CreateUser;
/* eslint-disable */