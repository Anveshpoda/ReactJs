/* eslint-disable */
import React from 'react';
import css from '../index.css';
import { Link, browserHistory } from 'react-router';
import $ from "jquery";
//import { Scrollbars } from 'react-custom-scrollbars';
import {  Menu,  Icon,  Form, Input, Button, Modal,message } from 'antd';
// import EditProfile from '../userManagement/EditProfile';
// import { logOut, userDetails, fetchUserData} from '../../actions/users';
// import UploadImage from '../challenges/UploadImage';
// import UploadFile from '../challenges/UploadFile';
 import clone from 'clone';
//import styles from '../css/components/navigation';
// const { Header, Content, Footer, Sider } = Layout;
// const cx = classNames.bind(styles);
// const SubMenu = Menu.SubMenu;
const FormItem = Form.Item;
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

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      role: '',
      emailId: '',
      mobileNumber: '',
      firstName: '',
      lastName: '',
      userid: '',
      visible: false,
      userData : {},
      isFilled:false,
      errors:{},
      userDetails:{}
     


    }
    this.baseState = this.state
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeimage = this.handleChangeimage.bind(this);
    this.editProfile = this.editProfile.bind(this);
  }

  handleChange(e) {
    $("Input").on("keydown", function (e) {
      if (e.which === 32 && !this.value.length)
        e.preventDefault();
    });
    if(e.target.name === 'firstName'){
      if(this.state.firstName !== '')this.state.errors.firstName='';
    }
    if(e.target.name === 'lastName'){
      if(this.state.lastName !== '')this.state.errors.lastName='';
    }
    if(e.target.name === 'emailId'){
      if(this.state.emailId !== '')this.state.errors.emailId='';
    }
    if(e.target.name === 'mobileNumber'){
      if(this.state.mobileNumber !== '')this.state.errors.mobileNumber='';
    }

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

userProfile = () => {
  if( sessionStorage.getItem('user') === null){
    browserHistory.push("/");
  }else{
  var _this = this;
  var tok = sessionStorage.getItem('token');
  var user = JSON.parse( sessionStorage.getItem('user'));
  var id = user._id;
 this.setState({userid : id}); 
  const url = '/user/'+id;

  var request = new Request(url, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "x-access-token":tok
    }
  });
  fetch(request)
    .then(response => response.json())
    .then(function (response) {
      if (response.status === 200) {
      
       _this.setState({userData : response.data});
       _this.setState({firstName : _this.state.userData.firstname});
       _this.setState({lastName : _this.state.userData.lastname});
       _this.setState({ username : _this.state.firstName + _this.state.lastName});
       _this.setState({emailid : _this.state.userData.email});
       _this.setState({role : _this.state.userData.role});
       _this.setState({mobileNumber : _this.state.userData.phonenumber});
   

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
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    if (Object.keys(this.state.errors).length === 0) {
      this.setState({
        visible: false,
      });
    }
  }

  mobileNumberValidation=(e)=>{
    const re = /^[0-9\b]+$/;
    if(!re.test(e.key)){
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
    var { emailId }=this.state;
    if(this.state.firstName != undefined){
      if (this.state.firstName.trim() === '') errors.firstName = "Please enter your firstname!";
    }
    if(this.state.lastName != undefined){
      if (this.state.lastName.trim() === '') errors.lastName = "Please enter your lastname!";
    }
    if(this.state.emailId != undefined){
      if (this.state.emailId.trim() === '') errors.emailId = "Please enter your emailId!";
    }
    if(this.state.mobileNumber != undefined){
      if (this.state.mobileNumber.trim() === '') errors.mobileNumber = "Please enter your mobileNumber!";
    }
    
    this.setState({
      errors: errors
    });

    if (Object.keys(errors).length === 0) {
      if(this.checkEmail(emailId)){
      console.log("id", id)
      var _this = this;
      var tok = sessionStorage.getItem('token');
      const url = '/user/' + id;
      let data = {
        email: this.state.emailId.trim(),
        firstname: this.state.firstName.trim(),
        lastname: this.state.lastName.trim(),
        phonenumber: this.state.mobileNumber.trim()
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

            sessionStorage.setItem('user', JSON.stringify(response.data));
            var userd = JSON.parse(sessionStorage.getItem('user'));
            _this.setState({ emailId: userd.email });
            _this.setState({ userName: userd.firstname + userd.lastname })
            // _this.setState({Role  : userd.email})
            _this.setState({ mobileNum: userd.phonenumber })
            _this.setState({
              visible: false,
            });
            message.success('Profile is updated successfully');

          }
          else {
            message.error('INVALID Data');
          }
        })
    }else{
      $("#em").removeClass("eml");
    }
    }
  }
 
  componentDidMount() {
    // $(".localIdentName-profile__rightMenubg").show();
    var user = JSON.parse( sessionStorage.getItem('user'));
    this.setState({emailId  : user.email})
    this.setState({userName  : user.firstname + user.lastname})
   // this.setState({Role  : user.email})
    this.setState({mobileNum  : user.phonenumber})
      // var id = user
    $("#closerightMenuView").click(function () {
      $("#rightMenuView").hide();
    
    });
  }

  logout() {
    sessionStorage.clear();
    browserHistory.push("/");
  }

  render() {
    return (
      <div className='rightMenubg'>

        <div className='textCenter'  style={{'border-bottom': '1px solid #f0f0f0'}}>

          <div className='profileImage'>
            <img alt="example" width="35%" src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png" style={{ padding: '15px 15px 5px' }} />
          </div>

          <ul>
            <li><span style={{ fontSize: 18, fontWeight: 'bold' }}>{this.state.userName}</span></li>
            {/* <li><span style={{ fontSize: 15 }}>{this.state.Role}</span></li> */}
            <li><span>Fankick*</span></li>
            <li>
              <Link
                onClick={() => this.logout()}
                to="/">Logout</Link>
            </li>

            <li><p onClick={this.showModal} style={{ padding: 10, color: '#783293', cursor:'pointer' }}><Icon type="edit" /> Edit Profile </p></li>
          </ul>
        </div>
        <div className='clear'></div>
        <div className='pfContactDetails'  style={{'border-bottom': '1px solid #f0f0f0'}}>
          <ul>
            <li><span style={{ fontSize: 12 }}>Email:</span><span style={{ fontWeight: 'bold' }}>{this.state.emailId}</span></li>
            <li></li>
            <li><span style={{ fontSize: 12 }}>Mobile:</span><span style={{ fontWeight: 'bold' }}> {this.state.mobileNum}</span></li>
          </ul>

        </div>
        <div>
          <Menu mode="inline" defaultSelectedKeys={[]}>
            <Menu.Item key="1">
              <Link to="/permisions-requests"> Permisions Requests <lable>[28]</lable></Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/requests-permisions"> Requests Permisions</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="#"> Add New Member</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/manage-fankick-account"> Manage Fankick Account</Link>
            </Menu.Item>
            <Menu.Item key="5">
              Manage Agent Account
            </Menu.Item>
            <Menu.Item key="6">
              Manage Celebrity Account
            </Menu.Item>
            <Menu.Item key="7">
              Manage Production House Account
            </Menu.Item>
          </Menu>
        </div>
        <Modal id="test" className='modalSize modalHeight380' title="Edit Profile" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} footer={null}>
          {/* <EditProfile mydata={this.props.userdetails} /> */}
          <div className='textCenter'>
            <Form style={{ padding: '0px 20px' }} >
              <FormItem>
                <div>

                  {/* <div >

                    <Upload {...props}
                      className="avatar-uploader"
                      showUploadList={false}
                      onChange={this.handleChangeimage}
                      accept=".png,.jpg,.jpeg"
                    >
                      {
                        this.state.imageUrl ?
                          <img width="25%" style={{ border: '0px black' }} src="" alt="" className="avatar" /> :
                          <Icon type="camera-o" className="avatar-uploader-trigger" />
                      }
                    </Upload>
                  </div>
                  {/* <Icon type="camera-o" /> */}

                </div> 
              </FormItem>
              <FormItem >

                <Input placeholder="First name" name="firstName" maxLength={12} value={this.state.firstName} onChange={this.handleChange} />
                <p className="editError">{this.state.errors.firstName}</p>

              </FormItem>
              <FormItem >

                <Input placeholder="Last Name" name="lastName" maxLength={12} value={this.state.lastName} onChange={this.handleChange} />
                <p className="editError">{this.state.errors.lastName}</p>
              </FormItem>



              <FormItem>
                <Input placeholder="email@fankick.io" name="emailId" value={this.state.emailId}  maxLength={50}  onChange={this.handleChange} />
                <p className="editError">{this.state.errors.emailId}</p>
                <div className="editError eml" id="em">Please enter valid Email!</div>
              </FormItem>
              <FormItem>
                <Input placeholder="+44 (0) 7887 665 588" name="mobileNumber"  maxLength={10} onKeyPress={(e)=>this.mobileNumberValidation(e)} value={this.state.mobileNumber} onChange={this.handleChange} />
                <p className="editError">{this.state.errors.mobileNumber}</p>
              </FormItem>

              <Button className="test" type="primary" size="large" id={this.state.userid} onClick={this.editProfile} htmlType="submit">Save</Button>
            </Form>
          </div>
        </Modal>
      </div>
    );
    // }
  };
}
export default (Profile)
/* eslint-disable */