/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../rightMenu/css/profile';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import $ from "jquery";
import { Scrollbars } from 'react-custom-scrollbars';
import { Layout, Menu, Breadcrumb, Icon, Card, Form, Input, Button, Checkbox, Modal, Row, Col, DatePicker, Upload } from 'antd';
import UploadImage from '../challenges/UploadImage';
import UploadFile from '../challenges/UploadFile';
import { userDetails } from '../../actions/users';
const { Header, Content, Footer, Sider } = Layout;
const cx = classNames.bind(styles);
const SubMenu = Menu.SubMenu;
const FormItem = Form.Item;
const { TextArea } = Input;
const props = {

  name: 'file',
  action: 'http://dev.fankick.io/rest/azureImageUpload',
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

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // firstName: this.props.mydata.firstName,
      _id: this.props.mydata ? this.props.mydata._id : null,
      imageUrl: "https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png",
      firstName: this.props.mydata ? this.props.mydata.firstName : '',
      lastName: this.props.mydata ? this.props.mydata.lastName : '',
      email: this.props.mydata ? this.props.mydata.email : '',
      mobileNumber: this.props.mydata ? this.props.mydata.mobileNumber : '',
      network: this.props.mydata ? this.props.mydata.appId : '',
      owner: this.props.mydata ? this.props.mydata.role : ''
    }
    this.baseState = this.state
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeimage = this.handleChangeimage.bind(this);
  }

  state = { visible: false }
  showModal = () => {
    // this.setState({
    //   firstName:'nafsdmfasdm',
    //   visible: true,
    // });

  }

  handleChange(e) {
    // e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleChangeimage = (info) => {
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
      message.success(`${info.file.name} file uploaded successfully`);
      this.setState({
        imagename2: info.file.response.data.filename
      })
    }
  }

  // handleSubmit = (e) => {
  //   console.log(this.state, 'all');
  //   var userdata = this.state;
  //   console.log(this.props, 'obtained props value')
  //   //console.log('fdsjhfjkhjksh', userdata);
  //   const { editedBy } = this.props;
  //   console.log(editedBy, 'in value')
  //    this.props.userDetails(userdata)
  // }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log('state data', this.state);
        var data = {
          "_id": this.props.mydata._id,
          "email": this.state.email,
          "firstName": this.state.firstName,
          "lastName": this.state.lastName,
          "mobileNumber": this.state.mobileNumber,
          "imageUrl":this.state.imageUrl,          
          "isDeleted": false
        }
        console.log("state data", data)
        this.props.userDetails({ data });
       
          
      // $(".ant-modal-wrap").hide();
      // $(".ant-modal-mask").hide();
      
      $(".ant-modal-content").hide();
      //  <Link to="/fankick"></Link>
    // $("#rightMenuView").hide();
        //this.handleReset();
        // message.success(`You have successfully created the challange`);
      }
    });
  }


  componentDidMount() {
    $("#closerightMenuView").click(function () {
      $("#rightMenuView").hide();
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={cx('textCenter')}>
        <Form style={{ padding: '0px 20px' }} onSubmit={this.handleSubmit}>
          <FormItem>
            <div>
              {/* <img alt="example" width="25%" src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png" /> */}
              <div >
              
              <Upload {...props}
                      className="avatar-uploader"
                      showUploadList={false}
                      onChange={this.handleChangeimage}
                      accept=".png,.jpg,.jpeg"
                      >
                      {
                        this.state.imageUrl ?
                          <img width="25%" style={{ border: '0px black' }} src={this.state.imageUrl} alt="" className="avatar" /> :
                          <Icon type="camera-o" className="avatar-uploader-trigger" />
                      }
                    </Upload> 
                    </div>
            {/* <Icon type="camera-o" /> */}
            
          </div>
          </FormItem>
          <FormItem >
            {/* {getFieldDecorator('firstName', {
              rules: [{ required: true, message: 'Please input your firstname!' }],
            })(
              <Input placeholder="First name" name="firstName" value={this.state.firstName} onChange={this.handleChange} />
              )} */}
              <Input placeholder="First name" name="firstName" value={this.state.firstName} onChange={this.handleChange} />

          </FormItem>
          <FormItem >
            {/* {getFieldDecorator('lastName', {
              rules: [{ required: true, message: 'Please input your lastName!' }],
            })(
              <Input placeholder="Last Name" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
              )} */}
              <Input placeholder="Last Name" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
          </FormItem>



          <FormItem>
            <Input placeholder="email@fankick.io" name="email" value={this.state.email} onChange={this.handleChange} />
          </FormItem>
          <FormItem>
            <Input placeholder="Product owner" name="owner" value={this.state.owner} onChange={this.handleChange} />
          </FormItem>
          <FormItem>
            <Input placeholder="Fankick Network" name="network" value={this.state.network} onChange={this.handleChange} />
          </FormItem>
          <FormItem>
            <Input placeholder="+44 (0) 7887 665 588" name="mobileNumber" value={this.state.mobileNumber} onChange={this.handleChange} />
          </FormItem>
          {/* <Button type="primary" size="large" onClick={this.handleSubmit.bind(this)}>Save</Button>   */}
          <Button className="test" type="primary" size="large" htmlType="submit">Save</Button>
        </Form>
      </div>
    );
  };
}


// function mapStateToProps(state, props) {
//   if (props.params._id) {
//     return {
//       contest: state.contests.find(item => item._id === props.params._id)
//     }
//   }

//   return { contest: null };
// }
const Edituserdata = Form.create()(EditProfile);
export default connect(null, { userDetails })(Edituserdata);
/* eslint-disable */