/* eslint-disable */
import React, { Component } from 'react';
//import logo from './logo.svg';
import fankickLogo from '../images/icons/left/fankickLogo.png';
import './App.css';
import { Form, Icon, Input, Button,message, Row, Col } from 'antd';
import { Link, hashHistory,browserHistory } from 'react-router';
import $ from 'jquery';

const FormItem = Form.Item;

// function hasErrors(fieldsError) {
//   return Object.keys(fieldsError).some(field => fieldsError[field]);
// }

class ResettPassword extends Component {
    constructor(props) {
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.state = {
            password: '',
            cpassword: '',
            loading:false
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
   // window.backAvoid();
  }
  setPlanId() {
    hashHistory.push("/");
  }
  handleChange(e){
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  checkPassword=(password)=>{
    var regExp=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return regExp.test(password);
  }
  handleSubmit = (e) => {
    console.log("handle submit");
    message.destroy();
    var _this=this;
    this.setState({loading:true})
    e.preventDefault();
    var { password,cpassword }=this.state;
    if(password===cpassword){
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          const userId=this.props.params.userId;
          if (this.checkPassword(password)) {
            const url = "/reset/" + userId;
            let data = {
              password: password
            }
            var req = new Request(url, {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json"
              }
            })
            fetch(req)
              .then(res => res.json())
              .then((res) => {
                if (res.status === 200) {
                  message.success(`PASSWORD RESET SUCCESSFUL`, 2);
                  browserHistory.push("/");
                } else {
                  message.error(`PASSWORD RESET UNSUCCESSFUL`, 2);
                }
              })
          } else {
            message.error(`PASSWORD SHOULD CONTAIN ATLEAST ONE SPECIAL CHARACTER,ONE UPPERCASE,ONE LOWERCASE,ONE NUMBER`, 2);
            setTimeout(_this.stopLoading(),2000);
          }
        }
      });
    }else{
      message.error(`Password does not match`,2);
      setTimeout(_this.stopLoading(),2000);
    }
  }
   stopLoading=()=>{
    this.setState({
      loading:false
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div id="components-form-demo-normal-login">
       <Row>
      <Col span={6} offset={18} className="loginContainer">
        <Form onSubmit={this.handleSubmit} className="login-form" style={{textAlign:'center'}}>
        <img src={fankickLogo} className="" style={{ 'vertical-align': 'middle' }} alt="" />
         
        <FormItem>
            {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your New Password!' }],
            })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" name="password" maxLength={10} onChange={this.handleChange} placeholder="New Password" />
            )}
        </FormItem>
        <FormItem>
                {getFieldDecorator('cpassword', {
                rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" name="cpassword" maxLength={10} onChange={this.handleChange} placeholder="Confirm Password" />
                )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleSubmit}>
              Reset
          </Button>
           <p className="login-form-forgot"><Link to="/" onClick={() => this.setPlanId()}>Back to Login</Link></p>
          </FormItem>
        </Form>
        </Col>
        </Row>
      </div>
    );
  }
}

const ResetPasswordPage = Form.create()(ResettPassword);
export default ResetPasswordPage;
/* eslint-disable */