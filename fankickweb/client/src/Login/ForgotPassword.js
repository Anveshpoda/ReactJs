/* eslint-disable */
import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import fankickLogo from '../images/icons/left/fankickLogo.png';
import { Form, Icon, Input, Button,message, Row, Col } from 'antd';
import { Link, hashHistory,browserHistory } from 'react-router';
import $ from 'jquery';
const FormItem = Form.Item;

// function hasErrors(fieldsError) {
//   return Object.keys(fieldsError).some(field => fieldsError[field]);
// }

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.handleUsername=this.handleUsername.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.state = {
      username: '',
      loading:false
    }
  };
  setPlanId() {
    hashHistory.push("/");
  }
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
  handleUsername(e){
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    var _this=this;
    this.setState({
      loading:true
    })
    message.destroy();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const url="/forgotpassword";
        let data={
          username:this.state.username
        }
        var request=new Request(url,{
          method:"POST",
          body:JSON.stringify(data),
          headers:{
            "Content-Type":"application/json"
          }
        })
        fetch(request)
          .then(response=>response.json())
          .then((response)=>{
              if(response.status===200){
                message.success(`MAIL SENT`,2);
                browserHistory.push("/");
                setTimeout(_this.stopLoading,2000);
              }else{
                message.error(`Please Enter Registered Email ID`,2);
                setTimeout(_this.stopLoading,2000);
              }
          })
      }
    });
    setTimeout(_this.stopLoading,2000);
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
           <img className="" src={fankickLogo} style={{ 'vertical-align': 'middle' }} alt="fankick-logo" />
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please enter your email id' }],
            })(
              <Input maxLength={30} prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" name="username" onChange={this.handleUsername}/>
              )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit"  loading={this.state.loading} className="login-form-button" onClick={this.handleSubmit}>
              Reset
          </Button>
           <p className="txtCenter"><Link className="txtCenter" to="/" onClick={() => this.setPlanId()}>Back to Login</Link></p>
          </FormItem>
        </Form>
        </Col>
        </Row>
      </div>
    );
  }
}

const ForgotPasswordPage = Form.create()(ForgotPassword);
export default ForgotPasswordPage;
/* eslint-disable */