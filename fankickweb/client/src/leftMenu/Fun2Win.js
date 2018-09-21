import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Form, Input, Col, Checkbox, Button, Switch, Radio, Tabs, Select, Dropdown, Row, Upload, message } from 'antd';
// import { connect } from 'react-redux';
import clone from 'clone';
// import UploadImage from './UploadImage';
// import UploadFile from './UploadFile';
const Option = Select.Option;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
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


class ContentPacks extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    mobileNumber: '',
    'appContext': 'Fankick Network',
    'appId': 'FankickWeb',
    'createdBy': 'abc',
    organization: 'dev',
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

  handleChange = (info) => {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
    }
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
    // console.log(this.props, 'Props from parent')
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({
          setActiveTab: 'permission',
          'createdBy': 'createdBy'
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
    // this.props.signUp(this.state);
  }

  render() {

    function onChange(checked) {
      console.log(`switch to ${checked}`);
    }
    function callback(key) {
      console.log(key);
    }
    const { getFieldDecorator } = this.props.form;
    // const roles = clone(this.props.roles);
    // const mapRoles = roles.map((role) => {
    //   return (
    //     <Option value={role._id}>{role.roleName}</Option>
    //   )
    // });
    const emailCheck = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const passCheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const imageUrl = this.state.imageUrl;
    return (
      <div>
        <Form>

          <FormItem>
            <Row>
              <Col span={12}> <Radio.Group onChange={this.onChange}>
                <Radio.Button style={{ width: 130, textAlign: "center" }} value="Movies">Movies</Radio.Button>
                <Radio.Button style={{ width: 130, textAlign: "center" }} value="Sports">Sports</Radio.Button>
                <Radio.Button style={{ width: 130, textAlign: "center" }} value="Music">Music</Radio.Button>
                <Radio.Button style={{ width: 130, textAlign: "center" }} value="TV Viewers">TV Viewers</Radio.Button>
              </Radio.Group></Col>
              <Col span={12}><Select defaultValue="Cricket" style={{ width: 150 }} onChange={this.onChange}>
                <Option value="Football">Football</Option>
                <Option value="Hocky">Hocky</Option>
                <Option value="Tennies">Tennies</Option>
                <Option value="Yiminghe">Yiminghe</Option>
              </Select></Col>
            </Row>
          </FormItem>

          <Row>
            <Col span={12}>
              <h3> Fun 2 Win Details</h3>
              <FormItem className="colpadding ant-col-lg-20">
                {getFieldDecorator('type', {
                  rules: [{ required: true, message: 'Please enter type of fun2 win!' }, { min: 1, max: 80, message: 'Type should be between 1 and 80 characters' }],
                })(
                  <Input placeholder="Fun 2 Win Type" name="fun2wintype" setFieldsValue={this.state.firstName} onChange={this.onHandleChange} />
                  )}
              </FormItem>

              <FormItem className="colpadding ant-col-lg-20">
                {getFieldDecorator('title', {
                  rules: [{ required: true, message: 'Please enter Fun 2 Win Title!' }, { min: 1, max: 20, message: 'Title should be between 1 and 20 characters' }],
                })(
                  <Input placeholder="Fun 2 Win Title" name="fun2winTitle" setFieldsValue={this.state.lastName} onChange={this.onHandleChange} />
                  )}
              </FormItem>
              <FormItem className="colpadding ant-col-lg-20">
                {getFieldDecorator('description', {
                  rules: [{ required: true, message: 'Please enter the description of Fun2Win!' }],
                })(
                  <Input.TextArea placeholder="Description" name="description" setFieldsValue={this.state.firstName} onChange={this.onHandleChange} />
                  )}
              </FormItem>
              <FormItem className="colpadding ant-col-lg-20">
                <Select defaultValue="Fankick Fancoins" onChange={this.onChange}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled">Disabled</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </FormItem></Col>

            <Col span={12} >
              <h3> Fun 2 Win Cover Photo</h3>
              <FormItem style={{ width: 150, height: 150, textAlign: "center", border: "1px solid #999", paddingTop: 30, borderRadius: "10%", marginTop: 20 }}>

                {getFieldDecorator(' Banner image', {
                  rules: [{ required: true, message: 'Please give Banner image' }],
                })(
                  <Upload
                    className="avatar-uploader"
                    name="avatar"
                    showUploadList={false}
                    action="//jsonplaceholder.typicode.com/posts/"
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                  >
                    {
                      imageUrl ?
                        <img src={imageUrl} alt="" className="avatar" /> :
                        <Icon type="camera" style={{ fontWeight: "bold", fontSize: 40 }} className="avatar-uploader-trigger" />
                    }
                    <h6 className='h6Font'>Browse Your Image</h6>
                  </Upload>
                  )}
              </FormItem>
            </Col>
          </Row>

          <h2> Start Your Question</h2>
          <FormItem className="colpadding ant-col-lg-24">
            <Select defaultValue="Select Your Question Type" style={{ width: 120 }} onChange={this.onChange}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled">Disabled</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </FormItem>

          <h2> Question</h2>

          <FormItem className="colpadding ant-col-lg-24">
            <Select defaultValue="Grid Image Type" style={{ width: 120 }} onChange={this.onChange}>
              <Option value="Grid Image Type">Grid Image Type</Option>
              <Option value="Pairing Type">Pairing Type</Option>
              <Option value="Poll BAse Type">Poll BAse Type</Option>
              <Option value="Multiple Type">Multiple Type</Option>
            </Select>
          </FormItem>
          




          
            <FormItem className="colpadding ant-col-lg-20">
              {getFieldDecorator('description', {
                rules: [{ required: true, message: 'Please enter the description of Fun2Win!' }],
              })(
                <Input placeholder="Description" name="description" setFieldsValue={this.state.firstName} onChange={this.onHandleChange} />
                )}
            </FormItem>
            <FormItem>

              <Row gutter={16}>
                <Col className="gutter-row" span={6}>
                
                    <FormItem style={{ width: 150, height: 150, textAlign: "center", border: "1px solid #999", paddingTop: 30, borderRadius: "10%", marginBottom: 10 }}>

                      {getFieldDecorator(' Banner image', {
                        rules: [{ required: true, message: 'Please give Banner image' }],
                      })(
                        <Upload
                          className="avatar-uploader"
                          name="avatar"
                          showUploadList={false}
                          action="//jsonplaceholder.typicode.com/posts/"
                          beforeUpload={beforeUpload}
                          onChange={this.handleChange}
                        >
                          {
                            imageUrl ?
                              <img src={imageUrl} alt="" className="avatar" /> :
                              <Icon type="camera" style={{ fontWeight: "bold", fontSize: 40 }} className="avatar-uploader-trigger" />
                          }
                          <h6 className='h6Font'>Browse Your Image</h6>
                        </Upload>
                        )}
                    </FormItem>
                </Col>
                <Col className="gutter-row" span={6}>
                  
                    <FormItem style={{ width: 150, height: 150, textAlign: "center", border: "1px solid #999", paddingTop: 30, borderRadius: "10%", marginBottom: 10 }}>

                      {getFieldDecorator(' Banner image', {
                        rules: [{ required: true, message: 'Please give Banner image' }],
                      })(
                        <Upload
                          className="avatar-uploader"
                          name="avatar"
                          showUploadList={false}
                          action="//jsonplaceholder.typicode.com/posts/"
                          beforeUpload={beforeUpload}
                          onChange={this.handleChange}
                        >
                          {
                            imageUrl ?
                              <img src={imageUrl} alt="" className="avatar" /> :
                              <Icon type="camera" style={{ fontWeight: "bold", fontSize: 40 }} className="avatar-uploader-trigger" />
                          }
                          <h6 className='h6Font'>Browse Your Image</h6>
                        </Upload>
                        )}
                    </FormItem>
                </Col>
                <Col className="gutter-row" span={6}>
                  
                    <FormItem style={{ width: 150, height: 150, textAlign: "center", border: "1px solid #999", paddingTop: 30, borderRadius: "10%", marginBottom: 10 }}>

                      {getFieldDecorator(' Banner image', {
                        rules: [{ required: true, message: 'Please give Banner image' }],
                      })(
                        <Upload
                          className="avatar-uploader"
                          name="avatar"
                          showUploadList={false}
                          action="//jsonplaceholder.typicode.com/posts/"
                          beforeUpload={beforeUpload}
                          onChange={this.handleChange}
                        >
                          {
                            imageUrl ?
                              <img src={imageUrl} alt="" className="avatar" /> :
                              <Icon type="camera" style={{ fontWeight: "bold", fontSize: 40 }} className="avatar-uploader-trigger" />
                          }
                          <h6 className='h6Font'>Browse Your Image</h6>
                        </Upload>
                        )}
                    </FormItem>
                </Col>
                <Col className="gutter-row" span={6}>
                  
                    <FormItem style={{ width: 150, height: 150, textAlign: "center", border: "1px solid #999", paddingTop: 30, borderRadius: "10%", marginBottom: 10 }}>

                      {getFieldDecorator(' Banner image', {
                        rules: [{ required: true, message: 'Please give Banner image' }],
                      })(
                        <Upload
                          className="avatar-uploader"
                          name="avatar"
                          showUploadList={false}
                          action="//jsonplaceholder.typicode.com/posts/"
                          beforeUpload={beforeUpload}
                          onChange={this.handleChange}
                        >
                          {
                            imageUrl ?
                              <img src={imageUrl} alt="" className="avatar" /> :
                              <Icon type="camera" style={{ fontWeight: "bold", fontSize: 40 }} className="avatar-uploader-trigger" />
                          }
                          <h6 className='h6Font'>Browse Your Image</h6>
                        </Upload>
                        )}
                    </FormItem>
                </Col>
              </Row>
            </FormItem>
            <FormItem className="colpadding ant-col-lg-20">
              {getFieldDecorator('gridimgans', {
                rules: [{ required: true, message: 'Please enter the description of Fun2Win!' }],
              })(
                <Input placeholder="Answer" name="gridimgans" setFieldsValue={this.state.firstName} onChange={this.onHandleChange} />
                )}
            </FormItem>
         


          <div className="pairing">
            <FormItem className="colpadding ant-col-lg-20">
              {getFieldDecorator('description', {
                rules: [{ required: true, message: 'Please enter the description of Fun2Win!' }],
              })(
                <Input placeholder="Description" name="description" setFieldsValue={this.state.firstName} onChange={this.onHandleChange} />
                )}
            </FormItem>
            <FormItem>

              <Row gutter={16}>
                <Col className="gutter-row" span={6}>
                 
                    <FormItem style={{ width: 150, height: 150, textAlign: "center", border: "1px solid #999", paddingTop: 30, borderRadius: "10%", marginBottom: 10 }}>

                      {getFieldDecorator(' Banner image', {
                        rules: [{ required: true, message: 'Please give Banner image' }],
                      })(
                        <Upload
                          className="avatar-uploader"
                          name="avatar"
                          showUploadList={false}
                          action="//jsonplaceholder.typicode.com/posts/"
                          beforeUpload={beforeUpload}
                          onChange={this.handleChange}
                        >
                          {
                            imageUrl ?
                              <img src={imageUrl} alt="" className="avatar" /> :
                              <Icon type="camera" style={{ fontWeight: "bold", fontSize: 40 }} className="avatar-uploader-trigger" />
                          }
                          <h6 className='h6Font'>Browse Your Image</h6>
                        </Upload>
                        )}
                    </FormItem>
                </Col>
                <Col className="gutter-row" span={6}>
                  
                    <FormItem style={{ width: 150, height: 150, textAlign: "center", border: "1px solid #999", paddingTop: 30, borderRadius: "10%", marginBottom: 10 }}>

                      {getFieldDecorator(' Banner image', {
                        rules: [{ required: true, message: 'Please give Banner image' }],
                      })(
                        <Upload
                          className="avatar-uploader"
                          name="avatar"
                          showUploadList={false}
                          action="//jsonplaceholder.typicode.com/posts/"
                          beforeUpload={beforeUpload}
                          onChange={this.handleChange}
                        >
                          {
                            imageUrl ?
                              <img src={imageUrl} alt="" className="avatar" /> :
                              <Icon type="camera" style={{ fontWeight: "bold", fontSize: 40 }} className="avatar-uploader-trigger" />
                          }
                          <h6 className='h6Font'>Browse Your Image</h6>
                        </Upload>
                        )}
                    </FormItem>
                </Col>

                <Col className="gutter-row" span={6}>
                 
                    <FormItem style={{ width: 150, height: 150, textAlign: "center", border: "1px solid #999", paddingTop: 30, borderRadius: "10%", marginBottom: 10 }}>

                      {getFieldDecorator(' Banner image', {
                        rules: [{ required: true, message: 'Please give Banner image' }],
                      })(
                        <Upload
                          className="avatar-uploader"
                          name="avatar"
                          showUploadList={false}
                          action="//jsonplaceholder.typicode.com/posts/"
                          beforeUpload={beforeUpload}
                          onChange={this.handleChange}
                        >
                          {
                            imageUrl ?
                              <img src={imageUrl} alt="" className="avatar" /> :
                              <Icon type="camera" style={{ fontWeight: "bold", fontSize: 40 }} className="avatar-uploader-trigger" />
                          }
                          <h6 className='h6Font'>Browse Your Image</h6>
                        </Upload>
                        )}
                    </FormItem>
                </Col>
              </Row>
            </FormItem>
            <FormItem className="colpadding ant-col-lg-20">
              {getFieldDecorator('pairingans', {
                rules: [{ required: true, message: 'Please enter the description of Fun2Win!' }],
              })(
                <Input placeholder="Answer" name="pairingans" setFieldsValue={this.state.firstName} onChange={this.onHandleChange} />
                )}
            </FormItem>

          </div>

          <div className="pollbase">
            <Row>
              <Col span={12}> <FormItem className="colpadding ant-col-lg-20">
                {getFieldDecorator('pairingans', {
                  rules: [{ required: true, message: 'Please enter the description of Fun2Win!' }],
                })(
                  <Input placeholder="Answer" name="pairingans" setFieldsValue={this.state.firstName} onChange={this.onHandleChange} />
                  )}
              </FormItem></Col>
              <Col span={12}>
                <FormItem className="colpadding ant-col-lg-24">
                  <Select defaultValue="Select Correct Answer" style={{ width: 120 }} onChange={this.onChange}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled">Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <label> Select Poll Text Type</label>
            <FormItem className="colpadding ant-col-lg-24">
              <Select defaultValue="Yes/No" style={{ width: 120 }} >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled">Disabled</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </FormItem>
            

          </div>



          <div className="multiple">
            <Row>
              <Col span={12}>
                <FormItem className="colpadding ant-col-lg-20">
                  {getFieldDecorator('pairingans', {
                    rules: [{ required: true, message: 'Please enter the description of Fun2Win!' }],
                  })(
                    <Input placeholder="Answer" name="pairingans" setFieldsValue={this.state.firstName} onChange={this.onHandleChange} />
                    )}
                </FormItem></Col>
              <Col span={12}>
                <FormItem className="colpadding ant-col-lg-24">
                  <Select defaultValue="Select Correct Answer" style={{ width: 120 }} onChange={this.onChange}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled">Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                </FormItem></Col>
            </Row>
            <label> Enter Multiple Choices</label>
            <FormItem className="colpadding ant-col-lg-24">
              <Select defaultValue="Pairing Type" style={{ width: 120 }} onChange={this.onChange}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled">Disabled</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </FormItem>


            <FormItem className="colpadding ant-col-lg-24">
              <RadioGroup options="" onChange={this.onHandleChange} value="" />
              <Input placeholder="Answer" name="pairingans" value="" onChange={this.onHandleChange} />
              <RadioGroup options="" onChange={this.onHandleChange} value="" />
              <Input placeholder="Answer" name="pairingans" value="1" onChange={this.onHandleChange} />
              <RadioGroup options="" onChange={this.onHandleChange} value="" />
              <Input placeholder="Answer" name="pairingans" value="2" onChange={this.onHandleChange} />
              <RadioGroup options="" onChange={this.onHandleChange} value="" />
              <Input placeholder="Answer" name="pairingans" value="3" onChange={this.onHandleChange} />
            </FormItem>

          </div>
          
          <FormItem className="colpadding floatRight"  >
            <Button type="primary" onClick={this.handleSubmitContinue.bind(this)}>Save and Next</Button>
          </FormItem>

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

// export default ContentPacks;

const Fun2Win = Form.create()(ContentPacks);
export default Fun2Win;
// export default connect(mapStateToProps)(CreateUser);