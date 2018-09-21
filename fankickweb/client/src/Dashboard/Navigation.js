/* eslint-disable */
import React from 'react';
import { Menu, Dropdown, Icon, Form, Upload, Input, Button, Modal, message, Avatar } from 'antd';
import { Link, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import userConfiguration from '../images/icons/right/user_configuration.png';
import elections from '../images/icons/right/elections.png';
import electionsColor from '../images/icons/right/electionsColor.png';

import $ from "jquery";
import css from '../css/components/navigation.css';
const FormItem = Form.Item;
// import classNames from 'classnames/bind';

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


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state =
      {
        username: '',
        role: '',
        emailId: '',
        mobileNumber: '',
        firstName: '',
        lastName: '',
        userid: '',
        visible: false,
        userData: {},
        isFilled: false,
        errors: {},
        userDetails: {},
        role1: '',
        permissions: '',
        polling: Boolean,
        blog: Boolean,
        loading: false,
        imageUrl: '' ,
        notificationCount : 0

      }
    this.baseState = this.state
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeimage = this.handleChangeimage.bind(this);
    this.editProfile = this.editProfile.bind(this);

  }


  // handleChange = (info) => {
  //   if (info.file.status === 'uploading') {
  //     this.setState({ loading: true });
  //     return;
  //   }
  //   if (info.file.status === 'done') {
  //     // Get this url from response in real world.
  //     getBase64(info.file.originFileObj, imageUrl => this.setState({
  //       imageUrl,
  //       loading: false,
  //     }));
  //   }
  // }

  handleChange(e) {
    $("Input").on("keydown", function (e) {
      if (e.which === 32 && !this.value.length)
        e.preventDefault();
    });
    if (e.target.name === 'firstName') {
      if (this.state.firstName !== '') this.state.errors.firstName = '';
      var val = e.target.value;
      // $("Input").on("keydown", function (e) {
      //   if (!val.match(/^[a-zA-Z]+$/)) {
      //     e.preventDefault();
      //   }
      // })
    }
    if (e.target.name === 'lastName') {
      if (this.state.lastName !== '') this.state.errors.lastName = '';
    }
    if (e.target.name === 'emailId') {
      if (this.state.emailId !== '') this.state.errors.emailId = '';
    }
    if (e.target.name === 'mobileNumber') {
      if (this.state.mobileNumber !== '') this.state.errors.mobileNumber = '';
      if (e.target.value.length < 12) {
        this.state.errors.mobileLength = "Mobile number should contain 12 numbers!";
      } else {
        this.state.errors.mobileLength = "";
      }
    }

    this.setState({
      [e.target.name]: e.target.value
    })
  }

  alphabetValidation = (e) => {
    const a = /^[a-zA-Z]+$/;
    if (!a.test(e.key)) {
      e.preventDefault();
    }
  }

  handleChangeimage = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      this.setState({
        imageUrl: info.file.response.data
      })
    }
  }

  userProfile = () => {
    // console.log("called user by get")
    if (sessionStorage.getItem('user') === null) {
      browserHistory.push("/");
    } else {
      var _this = this;
      var tok = sessionStorage.getItem('token');
      var user = JSON.parse(sessionStorage.getItem('user'));
      var id = user._id;
      this.setState({ userid: id });
      const url = '/user/' + id;

      var request = new Request(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "x-access-token": tok
        }
      });
      fetch(request)
        .then(response => response.json())
        .then(function (response) {
          if (response.status === 200) {

            _this.setState({ userData: response.data });
            _this.setState({ firstName: _this.state.userData.firstname });
            _this.setState({ lastName: _this.state.userData.lastname });
            _this.setState({ username: _this.state.firstName + _this.state.lastName });
            _this.setState({ emailid: _this.state.userData.email });
            _this.setState({ role: _this.state.userData.role });
            _this.setState({ mobileNumber: _this.state.userData.mobileNumber });


          }
          else {

          }
        })
    }
  }
  showModal = () => {
    this.setState({
      visible: true
    });
    this.userProfile();
    $("#em").addClass("eml");
  }
  handleOk = (e) => {
    //console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    //  console.log(e);
    if (Object.keys(this.state.errors).length !== 0) {
      this.state.errors.firstName = "";
      this.state.errors.lastName = "";
      this.state.errors.emailId = "";
      this.state.errors.mobileNumber = "";
      this.state.errors.mobileLength = "";
    }
    this.setState({
      visible: false,
    });
  }

  mobileNumberValidation = (e) => {
    const re = /^[0-9\b]+$/;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }
  checkEmail = (email) => {
    var regExp = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regExp.test(email);
  }

  editProfile = (e) => {
    e.preventDefault();
    var id = this.state.userid;
    let errors = {};
    var { emailId } = this.state;
    if (this.state.firstName != undefined) {
      if (this.state.firstName.trim() === '') errors.firstName = "* This field is mandatory";
    }
    if (this.state.lastName != undefined) {
      if (this.state.lastName.trim() === '') errors.lastName = "* This field is mandatory";
    }
    if (this.state.emailId != undefined) {
      if (this.state.emailId.trim() === '') errors.emailId = "* This field is mandatory";
    }
    if (this.state.mobileNumber != undefined) {
      if (this.state.mobileNumber.trim() === '') errors.mobileNumber = "* This field is mandatory";
    }
    if (this.state.mobileNumber.length < 12) {
      errors.mobileLength = "Mobile number should contain 12 numbers!"
    }

    this.setState({
      errors: errors
    });

    if (Object.keys(errors).length === 0) {
      if (this.checkEmail(emailId)) {
        //  console.log("id", id)
        var _this = this;
        var tok = sessionStorage.getItem('token');
        const url = '/user/' + id;
        let data = {
          email: this.state.emailId.trim(),
          firstname: this.state.firstName.trim(),
          lastname: this.state.lastName.trim(),
          mobileNumber: this.state.mobileNumber.trim(),
          profileImage: this.state.imageUrl
        }
        var request = new Request(url, {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": tok
          }
        });
        fetch(request)
          .then(response => response.json())
          .then(function (response) {
            if (response.status === 200) {
              _this.userProfile();
              // sessionStorage.setItem('user', JSON.stringify(response.data));
              // var userd = JSON.parse(sessionStorage.getItem('user'));
              // _this.setState({ emailId: userd.email });
              // _this.setState({ userName: userd.firstname + userd.lastname })
              // // _this.setState({Role  : userd.email})
              // _this.setState({ mobileNum: userd.phonenumber })
              _this.setState({
                visible: false,
              });
              message.success('Profile has been updated successfully');

            }
            else {
              message.error('Invalid Data');
            }
          })
      } else {
        $("#em").removeClass("eml");
      }
    }
  }

  componentDidMount() {
    // $(".localIdentName-profile__rightMenubg").show();
    var user = JSON.parse(sessionStorage.getItem('user'));
    this.setState({ permissions: user.permissions.reports })
    this.setState({ polling: user.permissions.polling })
    this.setState({ blog: user.permissions.blog })
    //this.setState({ role1: user.role.name })
    this.setState({ role1: user.firstname })
    this.setState({ emailId: user.email })
    this.setState({ userName: user.firstname + user.lastname })
    // this.setState({Role  : user.email})
    this.setState({ mobileNum: user.phonenumber })
    // var id = user
    $("#closerightMenuView").click(function () {
      $("#rightMenuView").hide();

    });
    this.getnotificationCount();
  }
  getnotificationCount  = () => {
    var _this = this;
    var userObject = JSON.parse(sessionStorage.getItem('user'));
    const url = '/approvalCycle/totalCount/' + userObject._id ;
    var request = new Request(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'x-access-token': sessionStorage.getItem('token')
      }
    });
    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        if (response.status === 200 && response.message === "Success") {
          console.log("response",response)
         _this.setState({notificationCount : response.data})
        }
        else {
        }
      })
  }
  logout() {
    sessionStorage.clear();
    browserHistory.push("/");
  }


  render() {
    const status = this.state.permissions.status;
    const polling = this.state.polling;
    const blog = this.state.blog;
    const menu = (
      <Menu className="MenuBg">
        <Menu.Item key="0" className="">
          <a onClick={this.showModal} className="menuNav paddingNav">
            Edit Profile </a>
        </Menu.Item>
        <Menu.Item key="1" className="">
          <a onClick={this.logout} className="menuNav txtLeft paddingNav">
            Logout</a>
        </Menu.Item>

      </Menu>
    );


    const menu1 = (
      <Menu className="MenuBg">
        <Menu.Item key="0" className="">
          <Link to="/blogPage" className="menuNav paddingNav">
            Blog Page</Link>
        </Menu.Item>
        <Menu.Item key="1" className="">
          <Link to="/createBlog" className="menuNav txtLeft paddingNav">
            Create Blog</Link>
        </Menu.Item>

      </Menu>
    );
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    const props = {
      name: 'file',
      action: process.env.REACT_APP_API_HOST + '/rest/azureImageUploadWeb',
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
    return (
      <div className="container">

        <div className="MenuBg NavRight">
          <span style={{ marginRight: 10 }}>{this.state.role1}</span>
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" href="#">
              {/* <Icon> <img src={userConfiguration} style={{ 'vertical-align': 'middle' }} alt="" /></Icon> <Icon type="down" /> */}

              <Icon> <Avatar className="ProfileBgColor" src=''>{this.state.role1.charAt(0)}</Avatar></Icon> <Icon type="down" />
            </a>
          </Dropdown>
        </div>

         <div className="MenuBg NavRight">

          <span style={{ marginRight: 10 }}><Link to="/Newcalendar" className='Couponsitem' activeClassName='active'>
            <Icon className="NavCalendarIcon" type="calendar" /></Link></span>

        </div> 
        {/* <div className="MenuBg NavRight">

          <span style={{ marginRight: 10 }}><Link to="/users" className='Couponsitem' activeClassName='active'>
            <Icon className="NavCalendarIcon" type="user-add" /></Link></span>

        </div>   */}
        {status === true ?
          <div className="MenuBg NavRight">

            <span style={{ marginRight: 10 }}><Link to="/reports" className='Couponsitem' activeClassName='active'>
              <Icon type="line-chart" title="Reports" className="NavareaChart" /></Link></span>

          </div> : ''}

     {polling.status === true ?
          <div className="MenuBg NavRight">
            <span style={{ marginRight: 10 }}>
              <Link to="/Polling/RunningElection" className='Couponsitem' activeClassName='activ'>
                <img src={elections} title="NewPolling" style={{ 'vertical-align': 'middle' }} alt="" className="imgactive" />
                <img src={electionsColor} title="NewPolling" style={{ 'vertical-align': 'middle' }} alt="" className="imgInactive" />
              </Link></span>
          </div> : null} 

           {/*{polling.status === true ?
          <div className="MenuBg NavRight">
            <span style={{ marginRight: 10 }}>
              <Link to="/ElectioMain" className='Couponsitem' activeClassName='activ'>
                <img src={elections} title="Polling" style={{ 'vertical-align': 'middle' }} alt="" className="imgactive" />
                <img src={electionsColor} title="Polling" style={{ 'vertical-align': 'middle' }} alt="" className="imgInactive" />
              </Link></span>
          </div> : null} */}


     {blog.status === true ?
          <div className="MenuBg NavRight">
            <span style={{ marginRight: 10 }}><Link to="/blogPage" className='Couponsitem' activeClassName='active'>
              <Icon type="exception" title="Blog" className="NavareaChart" style={{ marginRight: 10 }} /></Link></span>
          </div>
          : null}   

{/*          
        <div className="MenuBg NavRight">
          <span style={{ marginRight: 10 }}><Link to="/CreativeManagementDashboard" className='Couponsitem' activeClassName='active'>
            <Icon type="picture" className="NavareaChart" title="Creative Management" style={{ marginRight: 10 }} /></Link></span>
        </div>  */}



   {/*     <div className="MenuBg NavRight">
          <span style={{ marginRight: -18 }}><Link to="/MessageCentre" className='Couponsitem' activeClassName='active'>
            <Icon type="bell" className="NavareaChart" title="Message Centre" style={{ marginRight: 10 }} /></Link></span>
            <span className={this.state.notificationCount > 0 ? "webchlngKarokecount12" : ''}></span>

        </div> */} 
  


        <Modal id="test" className="modalEdit scrollAlign" style={{ top: '40px' }} width='450'
          title="Edit Profile" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}
          footer={<Button className="test SavBtnEditprofle" type="primary" size="large" id={this.state.userid} onClick={this.editProfile} htmlType="submit">Save</Button>}
        >
          {/* <EditProfile mydata={this.props.userdetails} /> */}
          <div className='textCenter cscroll'>

            <Form style={{ padding: '0px 20px' }} >
              <FormItem>
                <div className="userprofile">
                  <Upload {...props}

                    listType="picture-card"
                    className="avatar-uploader BorderNone"
                    showUploadList={false}

                    onChange={this.handleChangeimage}
                  >
                    {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                  </Upload>
                </div>
              </FormItem>
              <FormItem>
                <h6 className="h6FontStyl">First Name</h6>
                <Input placeholder="First Name" name="firstName" maxLength={30} value={this.state.firstName} onKeyPress={(e) => this.alphabetValidation(e)} onChange={this.handleChange} />
                <p className="editError">{this.state.errors.firstName}</p>

              </FormItem>
              <FormItem >
                <h6 className="h6FontStyl">Last Name</h6>
                <Input placeholder="Last Name" name="lastName" maxLength={30} value={this.state.lastName} onKeyPress={(e) => this.alphabetValidation(e)} onChange={this.handleChange} />
                <p className="editError">{this.state.errors.lastName}</p>
              </FormItem>



              <FormItem>
                <h6 className="h6FontStyl">Email ID</h6>
                <Input placeholder="email@fankick.io" name="emailId" value={this.state.emailId} maxLength={50} onChange={this.handleChange} />
                <p className="editError">{this.state.errors.emailId}</p>
                <div className="editError eml" id="em">Please enter a valid email</div>
              </FormItem>
              <FormItem>
                <h6 className="h6FontStyl">Mobile Number</h6>
                <Input placeholder="+44 (0) 7887 665 588" name="mobileNumber" maxLength={12} onKeyPress={(e) => this.mobileNumberValidation(e)} value={this.state.mobileNumber} onChange={this.handleChange} />
                <p className="editError">{this.state.errors.mobileNumber}</p><p className="editError">{this.state.errors.mobileLength}</p>
              </FormItem>


            </Form>

          </div>

        </Modal>
      </div>

    );
  }
}
export default Navigation;
/* eslint-disable */