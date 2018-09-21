/* eslint-disable */
import React, { Component } from 'react';
import classnames from 'classnames';
import $ from 'jquery';
import './App.css';
import fankickLogo from '../images/icons/left/fankickLogo.png';
import { Form, Icon, Input, Button, Checkbox, message, Row, Col } from 'antd';
import { Link, hashHistory, browserHistory } from 'react-router';
const FormItem = Form.Item;
class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.state = {
      data: '',
      email: '',
      password: '',
      disabled: false,
      errors: {},
      loading: false
    }
  };
  componentDidMount() {
    $(".leftMenuView").hide();
    $(".leftMenu").hide();
    $(".rightMenu").hide();
    $(".ant-layout-header").hide();
    $(".ant-layout-footer").hide();
    $(".rightMenuView").hide();
    $(".footerview").hide();
  }
  componentWillMount() {
    const authenticated = sessionStorage.getItem('isLogged');
    if (!authenticated) {
      browserHistory.push('/')
    } else if (authenticated) {
      browserHistory.push('/fankick')
    }
  }
  setPlanId() {
    hashHistory.push("/");
  }
  handleChange = (e) => {
    var value = e.target.value.trim();
    this.setState({ [e.target.name]: value, disabled: false })
    let errors = {};
    this.setState({ errors });
  }
  checkPassword(password) {
    var regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return regExp.test(password);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    var _this = this;
    this.setState({
      loading: true
    })
    message.destroy();
    var password = this.state.password;

    let errors = {};

    if (this.state.email.trim() === '') errors.email = "Please enter your email id";
    if (this.state.password.trim() === '') errors.password = "Please enter your password";
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ disabled: true })
      if (this.checkPassword(password)) {

        const url = '/login';
        let data = {
          username: this.state.email,
          password: this.state.password
        }
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
            if (response.status === 200) {
              console.log("dataresponse", response.data);
              if (response.data.email === "admin@fankick.io") {

                sessionStorage.setItem('isRole', "Admin")
              } else {
                sessionStorage.setItem('isRole', "Freelancer")
              }
              sessionStorage.setItem('isLogged', true);
              sessionStorage.setItem('user', JSON.stringify(response.data))
              sessionStorage.setItem('token', response.token)
          
              {
                response.data.username === "contentCurator@fankick.io" ? browserHistory.push("/Curation")
                : response.data.username === "freelancer@fankick.io" ? browserHistory.push("/fun2win/fun2Winpage") : browserHistory.push("/fankick")
              }
              setTimeout(_this.stopLoading, 2000);
            }


            else if (response.status === 404) {
              message.error(`INVALID EMAIL.`, 2);
              setTimeout(_this.stopLoading, 2000);
            }
            else if (response.status === 500) {
              message.error(`INVALID PASSWORD.`, 2);
              setTimeout(_this.stopLoading, 2000);
            } else {
              message.error(`INVALID CREDENTIALS.`, 2);
              setTimeout(_this.stopLoading, 2000);
            }
          })

      } else {
        message.error(`PASSWORD SHOULD CONTAIN ATLEAST ONE SPECIAL CHARACTER,ONE UPPERCASE,ONE LOWERCASE,ONE NUMBER`, 2);
        setTimeout(_this.stopLoading, 2000);
      }
    }
    setTimeout(_this.stopLoading, 2000);
  }
  stopLoading = () => {
    this.setState({
      loading: false
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div id="components-form-demo-normal-login">

        <Row>
          <Col span={6} offset={18} className="loginContainer">

            <Form onSubmit={this.handleSubmit} className="login-form" style={{ textAlign: 'center' }}>

              <img src={fankickLogo} className="" style={{ 'vertical-align': 'middle' }} alt="" />
              {/* <img src={fankickLogo} className="imgCenter" style={{ 'vertical-align': 'middle' }} alt="" /> */}

              <FormItem className={classnames('email', { error: !!this.state.errors.email })}>

                <Input maxLength={30} prefix={<Icon className="TpUser" type="user" style={{ fontSize: '13', top: '38%' }} />} name="email" type="text" value={this.state.email} onChange={this.handleChange} placeholder="Username" />
                <span id="email">{this.state.errors.email}</span>
              </FormItem>
              <FormItem className={classnames('email', { error: !!this.state.errors.password })}>

                <Input maxLength={10} prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
                <span id="password">{this.state.errors.password}</span>
              </FormItem>
              <FormItem>
                <ul className="list-inline">
                  <li style={{ float: 'left' }}> <Checkbox><span className="mrgLft12">Remember me</span></Checkbox></li>
                  <li style={{ float: 'right', color: '#783293' }}><p className="login-form-forgot"><Link to="/forgotpassword" onClick={() => this.setPlanId()}>Forgot Password?</Link></p>
                  </li>
                </ul>


              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" onClick={this.handleSubmit} loading={this.state.loading} className="login-form-button">
                  Log in
          </Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>

    );
  }
}

const LoginPage = Form.create()(Login);
export default LoginPage;
/* eslint-disable */