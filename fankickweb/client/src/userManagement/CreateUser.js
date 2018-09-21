/* eslint-disable */
import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Form, Input, Col, Checkbox, Button, Switch, Radio, Tabs, Select, Dropdown, Row } from 'antd';
import { connect } from 'react-redux';
import clone from 'clone';
const Option = Select.Option;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;


class CreateUserForm extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    mobileNumber: '',
    'appContext': 'Fankick Network',
    'appId': 'FankickWeb',
    'createdBy': this.props.userData.createdBy._id,
    organization: this.props.userData.organization._id,
    email: '',
    password: '',
    setActiveTab: 'user',
    "permissions": {
      campaignManagement: 'false',
      funToWin: 'false',
      fanCoins: 'false',
      fanClubs: 'false',
      fanOfTheMonth: 'false'
    },
  }

  constructor(props) {
    super(props);
    // this.state({
    //   firstName: ''
    // })
    this.onHandleChange = this.onHandleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmitContinue = this.handleSubmitContinue.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.validateFormContinueErrors = this.validateFormContinueErrors.bind(this);
    this.campaignManagementChange = this.campaignManagementChange.bind(this);
    this.func2WinChange = this.func2WinChange.bind(this);
    this.fanCoinsConfigurationChange = this.fanCoinsConfigurationChange.bind(this);
    this.fanClubMaintenanceChange = this.fanClubMaintenanceChange.bind(this);
    this.fanOfTheMonthChange = this.fanOfTheMonthChange.bind(this);
    this.baseState = this.state;

  }

  onHandleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state, 'ap')
  }

  handleSelectChange(label) {
    console.log(`selected ${label.key}`, label.label);
    this.setState({
      role: label.key
    })
  }


  handleSubmitContinue(e, props) {

    // this.setState(this.baseState);
    console.log(this.state, 'all');
    console.log(this.props, 'Props from parent')
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({
          setActiveTab: 'permission',
          'createdBy': this.props.createdBy._id
        })
      }
    });


  }
  validateFormContinueErrors() {
    console.log('Validation Passed');
  }
  campaignManagementChange(checked) {
    this.setState({
      'permissions': { campaignManagement: checked }
    })
  }

  func2WinChange(checked) {
    this.setState({
      'permissions': { funToWin: checked }
    })
  }

  fanCoinsConfigurationChange(checked) {
    this.setState({
      'permissions': { fanCoins: checked }
    })
  }

  fanClubMaintenanceChange(checked) {
    this.setState({
      'permissions': { fanClubs: checked }

    })
  }

  fanOfTheMonthChange(checked) {
    this.setState({
      'permissions': { fanOfTheMonth: checked }
    })
  }

  handleFormSubmit(e) {
    console.log(this.state, 'In form submit');
    this.props.signUp(this.state);
  }

  render() {

    function onChange(checked) {
      console.log(`switch to ${checked}`);
    }
    function callback(key) {
      console.log(key);
    }
    const { getFieldDecorator } = this.props.form;
    const roles = clone(this.props.roles);
    const mapRoles = roles.map((role) => {
      return (
        <Option value={role._id}>{role.roleName}</Option>
      )
    });
    const emailCheck = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const passCheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return (
      <div>
        <Form >
          <Tabs activeKey={this.state.setActiveTab} onChange={callback} >
            <TabPane tab="USER DETAILS" key="user">

              <FormItem style={{ padding: '15px 0px' }}>
                <Select
                  showSearch
                  placeholder="User Role"
                  optionFilterProp="children"
                  labelInValue onChange={this.handleSelectChange}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                  {mapRoles}
                </Select>
              </FormItem>

              <FormItem className="colpadding ant-col-lg-12">
                {getFieldDecorator('firstName', {
                  rules: [{ required: true, message: 'Please enter your firstName!' }, { min: 1, max: 10, message: 'Enter firstName between 1 and 10 characters' }],
                })(
                  <Input placeholder="First Name" name="firstName" setFieldsValue={this.state.firstName} onChange={this.onHandleChange} />
                  )}
              </FormItem>

              <FormItem className="colpadding ant-col-lg-12">
                {getFieldDecorator('lastName', {
                  rules: [{ required: true, message: 'Please enter your lastName!' }, { min: 1, max: 10, message: 'Enter lastName between 1 and 10 characters' }],
                })(
                  <Input placeholder="Last Name" name="lastName" setFieldsValue={this.state.lastName} onChange={this.onHandleChange} />
                  )}
              </FormItem>
              <FormItem className="colpadding ant-col-lg-12">
                {getFieldDecorator('mobileNumber', {
                  rules: [{ required: true, message: 'Please enter your mobileNumber!' }],
                })(
                  <Input placeholder="Phone Number" name="mobileNumber" setFieldsValue={this.state.mobileNumber} onChange={this.onHandleChange} />
                  )}
              </FormItem>
              <FormItem className="colpadding ant-col-lg-12">
                <Input placeholder="Organization" name="organization" value={this.props.userData.organization._id} disabled />
              </FormItem>
              <FormItem className="colpadding ant-col-lg-12">
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Please enter your email!' }, { pattern: emailCheck, message: 'Enter a valid email address' }],
                })(
                  <Input placeholder="E-mail ID" name="email" setFieldsValue={this.state.email} onChange={this.onHandleChange} />
                  )}
              </FormItem>
              <FormItem className="colpadding ant-col-lg-12">
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please enter the password!' },
                  { min: 6, max: 16, message: 'Enter password between 6 and 16 characters' },
                  { pattern: passCheck, message: 'Enter a valid email address' }],
                })(
                  <Input placeholder="Password" type="password" name="password" setFieldsValue={this.state.password} onChange={this.onHandleChange} />
                  )}
              </FormItem>
              <FormItem className="colpadding floatRight"  >
                <Button type="primary" onClick={this.handleSubmitContinue.bind(this)}>Save and Next</Button>
              </FormItem>
            </TabPane>

            <TabPane tab="PERMISSION" key="permission">
              <div style={{ marginTop: 20 }}>
                <Col span={24} className="borderBottom">
                  <span className="ant-col-lg-16">
                    <h6><b>Campaign Management</b></h6>
                    <span>Lorem Ipsum is simple dummy text of the printing Lorem Ipsum is simple dummy text of the prin.</span>
                  </span>
                  <span className="ant-col-lg-8">
                    <Switch defaultChecked={false} onChange={this.campaignManagementChange} className="ant-switch-user floatRight" />
                  </span>
                </Col>
                <Col span={24} className="borderBottom">
                  <span className="ant-col-lg-16">
                    <h6 style={{ marginTop: 10 }}><b>Fun 2 Win Challenges</b></h6>
                    <span>Lorem Ipsum is simple dummy Lorem Ipsum is simple dummy text.</span></span>
                  <span className="ant-col-lg-8">
                    <Switch defaultChecked={false} onChange={this.func2WinChange} className="ant-switch-user floatRight" />
                  </span>
                </Col>
                <Col span={24} className="borderBottom">
                  <span className="ant-col-lg-16">
                    <h6 style={{ marginTop: 10 }}><b>FanCoins Configuration</b></h6>
                    <span>Lorem Ipsum is simple dummy text of the Lorem Ipsum is simple dummy text.</span></span>
                  <span className="ant-col-lg-8">
                    <Switch defaultChecked={false} onChange={this.fanCoinsConfigurationChange} className="ant-switch-user floatRight" />
                  </span>
                </Col>
                <Col span={24} className="borderBottom">
                  <span className="ant-col-lg-16">

                    <h6 style={{ marginTop: 10 }}><b>FabClubs Maintainence</b></h6>
                    <span>Lore m Ipsum is simple dummy text of the printing.</span>
                  </span>
                  <span className="ant-col-lg-8">
                    <Switch defaultChecked={false} onChange={this.fanClubMaintenanceChange} className="ant-switch-user floatRight" />
                  </span>
                </Col>
                <Col span={24} className="borderBottom">
                  <span className="ant-col-lg-16">
                    <h6 style={{ marginTop: 10 }}><b>Fan of the Month</b></h6>
                    <span>Lorem Ipsum is simple dummy text of the printing Lorem Ipsum is simple dummy Lorem Ipsum is simple dummy text of the prin.</span>
                  </span>
                  <span className="ant-col-lg-8">
                    <Switch defaultChecked={false} onChange={this.fanOfTheMonthChange} className="ant-switch-user floatRight" />
                  </span>
                </Col>
                <FormItem className="colpadding floatRight"  >
                  <Button type="primary" onClick={this.handleFormSubmit.bind(this)}>Save User</Button>
                </FormItem>
              </div>
            </TabPane>
          </Tabs>
        </Form>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    roles: state.roles,
    userData: state.user.response.data
  }
}

// export default CreateUser;
const CreateUser = Form.create()(CreateUserForm);
export default connect(mapStateToProps)(CreateUser);
/* eslint-disable */