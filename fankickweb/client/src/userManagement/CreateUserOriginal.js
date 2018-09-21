/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './user.css';
import $ from "jquery";
import { Layout, Menu, Breadcrumb, Icon, Form, Input, Col, Checkbox, Button, Switch, Radio } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const cx = classNames.bind(styles);
const FormItem = Form.Item;
const ButtonGroup = Button.Group;

class CreateUser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: ' ',
      fullName: '',
      checkState: 'true',
      'Add & Edit Campaign':'false',
      'appContext': 'abc',
      'appId':'12345',
      'organization':"59edbff4b7d9d0ba7b70625c",
      'createdBy': this.props.createdBy._id
    }
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleChange(e) {
    // e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state)
  }
  onChange(e) {
    console.log(`radio checked:${e.target.value}`);//To get the checkbox checked value
    //  console.log(`switch to ${e}`);
    console.log(`radio name:${e.target.value}: ${e.target.checked}`);
    this.setState({
      [e.target.value]: e.target.checked
    });
    console.log(e.target.checked);//To get whether the checkbox is checked or not
  }

  handleSubmit(e, props) {
  console.log(this.state, 'all')
  var a = this.state;
  const { createdBy } = this.props;
  console.log(createdBy, 'in value')
    // saveUser(value);
    console.log(this.props, 'Twenty one');
  this.props.signUp(a)
  }
  
  render() {
    return (
      <div>
        <Col span={24}>
          <h5>create new user</h5>
          <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </span>
          <Form>
            <FormItem>
              <Radio.Group onChange={this.onChange}>
                <Radio.Button value="Super Admin">Super Admin</Radio.Button>
                <Radio.Button value="Master Admin">Master Admin</Radio.Button>
                <Radio.Button value="Admin">Admin</Radio.Button>
              </Radio.Group>
            </FormItem>
            <FormItem>
              <Col span={8}>
                <Input placeholder="Full Name" name="fullName" value={this.state.fullName} onChange={this.handleChange}/>
              </Col>
            </FormItem>
            <FormItem>
              <Col span={8}>
                <Input type="email" name="email" placeholder="Email id" value={this.state.email} onChange={this.handleChange} />
              </Col>
            </FormItem>
            <h6>Switch Role Permission <Switch defaultChecked={false} onChange={this.onChange}/></h6>
            <FormItem>
            <Radio.Group onChange={this.onChange}>
              <Radio value="Super Admin to Master Admin">Super Admin to Master Admin</Radio><br />
              <Radio value="Admin to Master Admin">Admin to Master Admin</Radio><br />
              <Radio value="Super Admin to Admin">Super Admin to Admin</Radio>
              </Radio.Group>
            </FormItem>
            <h6>Administration</h6>
            <FormItem>
              <Checkbox value="Manage projects and Users" onChange={this.onChange}>Manage projects and Users</Checkbox><br />
              <Checkbox value="Creation of Super Admin/ Master Admin" onChange={this.onChange}>Creation of Super Admin/ Master Admin</Checkbox>
            </FormItem>
            <h6>Application Development</h6>
            <FormItem>
              <Checkbox value="Manage Apps"onChange={this.onChange}>Manage Apps</Checkbox>
            </FormItem>
            <h6>Campaign Roles and  Responsibilities</h6>
            <FormItem>
              <Checkbox value="Approval Permission" onChange={this.onChange}>Approval Permission</Checkbox><br />
              <Checkbox value="Add & Edit Campaign" onChange={this.onChange}>Add & Edit Campaign</Checkbox><br />
              <Checkbox value="Delete Campaign" onChange={this.onChange}>Delete Campaign</Checkbox><br />
              <Checkbox value="Publish Campaign" onChange={this.onChange}>Publish Campaign</Checkbox>
            </FormItem>
            <h6>Fankick Content</h6>
            <FormItem>
              <Checkbox value="Create & Edit Fun2Win" onChange={this.onChange}>Create & Edit Fun2Win</Checkbox><br />
              <Checkbox value="Manage FanCoins" onChange={this.onChange}>Manage FanCoins</Checkbox><br />
              <Checkbox value="Add/Edit/Delete FanClubs" onChange={this.onChange}>Add/Edit/Delete FanClubs</Checkbox><br />
              <Checkbox value="Manage Fan of the Month" onChange={this.onChange}>Manage Fan of the Month</Checkbox><br />
              <Checkbox value="Manage Coupons" onChange={this.onChange}>Manage Coupons</Checkbox>
            </FormItem>
            <FormItem className="ant-col-lg-12">
              <Button type="primary" size="large" onClick={this.handleSubmit.bind(this)}>Create user</Button>
              <Button type="default" size="large">Cancel</Button>
            </FormItem>
          </Form>
        </Col>
      </div>
    );
  };
}


export default CreateUser;
/* eslint-disable */