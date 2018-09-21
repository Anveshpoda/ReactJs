/* eslint-disable */
import React from 'react';
import Dashboard from '../Dashboard/Dashboard'
import { Link, browserHistory } from 'react-router';
import { Icon, Form, Input, Col, Button, Radio, Tabs, Select, Row, Upload, message } from 'antd';
import axios from 'axios';

const Option = Select.Option;
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


class ContentPacks extends React.Component {
  state = {
    packName: '',
    celebrityName: '',
    noOfQuestions: 1,
    packImageUrl: '',
    packDescription: '',
    duration: 60,
    points: '',
    createdDate: 'Date',
    updatedDate: 'Date',
    categoryId: 'ObjectId',
    subCategoryId: 'Object Id',
    categories: [],
    subCategories: ['Select SubCategory'],
    imageUrl: "",
    fun2winTitle: "",
    answer: "",
    questionModel: '',
    contentPackQuestions: [],
    name: "",
    questionCategory: "Multiple",
    questionType: "Question",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctAnswer: ""
  }



  componentDidMount() {
    this.getCategories();
  }

  getCategories = () => {
    console.log("User", sessionStorage.getItem('token'))
    var instance = axios.create({
      timeout: 1000,
      headers: { 'x-access-token': sessionStorage.getItem('token') }
    });
    instance.get('/categories/').then((response) => {
      this.setState({
        categories: response.data.data
      })
    });
  }

  saveContentPacks = (data) => {
    console.log("User", sessionStorage.getItem('token'))
    const url = '/pack';
    var request = new Request(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        'x-access-token':sessionStorage.getItem('token')
      }
    });
    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        if (response.status === 200) {
          console.log("dataresponse", response.data);
          message.success('Fun2Win has been created successfully!');
          console.log(response, 'Service Response');
          browserHistory.push("/fun2win");
        }
        else {
          message.error(`Unable to create Fun2Win`, 5);
          console.log("dataresponse", response);
        }
      })
  }


  constructor(props) {
    super(props);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.bindSubCategories = this.bindSubCategories.bind(this);
    this.onSubCategoryChange = this.onSubCategoryChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onQuestionTypeChange = this.onQuestionTypeChange.bind(this);
    this.handleMultipleAnswer = this.handleMultipleAnswer.bind(this);
    this.handleSubmitContinue = this.handleSubmitContinue.bind(this);
    this.baseState = this.state;
  }

  handleChange = (info) => {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      message.success(`Image uploaded successfully`);
      this.setState({
        packImageUrl: info.file.response.data
      })
    }
  }

  onCategoryChange(e) {
    console.log(e, 'was changed');
    this.setState({
      categoryId: e
    })
    this.bindSubCategories(e);
  }

  bindSubCategories(category) {
    var a = this.state.categories.map((categorydata) => {
      if (category === categorydata._id) {
        this.setState({
          subCategories: categorydata.subCategories
        })
      }
    })
  }
  onSubCategoryChange(e) {
    this.setState({
      subCategoryId: e
    })
  }

  handleMultipleAnswer(e) {
    this.setState({
      correctAnswer: e
    })
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onQuestionTypeChange(e) {
    console.log(e, 'was changed in question type');
    this.setState({
      questionModel: e
    })
  }

  handleSubmitContinue(e, props) {
    console.log(this.state, 'all');
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        let questionSchema = {
          'name': this.state.name,
          'questionCategory': this.state.questionCategory,
          'questionType': this.state.questionType,
          'option1': this.state.option1,
          'optionId1': 1,
          'option2': this.state.option2,
          'optionId2': 2,
          'option3': this.state.option3,
          'optionId3': 3,
          'option4': this.state.option4,
          'optionId4': 4,
          'correctAnswer': this.state.correctAnswer,
          'createdDateTime': new Date().toISOString(),
          'modifiedDateTime': new Date().toISOString()
        }

        var questions = [];
      //   for (var i=0; i<=4; i++){
      //     questions.push(questionSchema);
      //  }
        questions.push(questionSchema);
        let contentPack = {
          'name': this.state.fun2winTitle,
          'celebrityName': this.state.celebrityName,
          'imageURL': this.state.packImageUrl,
          'description': this.state.packDescription,
          'duration': this.state.duration,
          'points': this.state.points,
          'createdDateTime': new Date().toISOString(),
          'modifiedDateTime': new Date().toISOString(),
          'userActions': [],
          'comments': [],
          'categoryId': this.state.categoryId,
          'subCategoryId': this.state.subCategoryId,
          'contentPackQuestions': questions,
        };
        console.log(contentPack);
        this.saveContentPacks(contentPack)  
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    // const pollType = (<div className="pollbase">
    //   <Row>
    //     <Col span={12}> <FormItem className="colpadding ant-col-lg-20">
    //       {getFieldDecorator('question', {
    //         rules: [{ required: true, message: 'Please enter the question of Fun2Win!' }],
    //       })(
    //         <Input placeholder="Poll Type Question" name="question" setFieldsValue={this.state.name} onChange={this.handleInputChange} />
    //         )}
    //     </FormItem></Col>
    //     <Col span={12}>
    //       <FormItem className="colpadding ant-col-lg-24">
    //         <Select defaultValue="Select Correct Answer" style={{ width: 120 }} onChange={this.onChange}>
    //           <Option value="Yes">Yes</Option>
    //           <Option value="No">No</Option>
    //         </Select>
    //       </FormItem>
    //     </Col>
    //   </Row>
    // </div>);

    // const gridType = (<div className="gridtype">
    //   <h3>Grid Type</h3>
    //   <FormItem className="colpadding">
    //     {getFieldDecorator('question', {
    //       rules: [{ required: true, message: 'Please enter the question for Fun2Win!' }],
    //     })(
    //       <Input placeholder="Grid Type Question" name="question" setFieldsValue={this.state.name} onChange={this.handleInputChange} />
    //       )}
    //   </FormItem>
    //   <FormItem>

    //     <Row gutter={16}>
    //       <Col className="gutter-row" span={6}>

    //         <FormItem style={{ width: 150, height: 150, textAlign: "center", border: "1px solid #999", paddingTop: 30, borderRadius: "10%", marginBottom: 10 }}>

    //           {getFieldDecorator('option1', {
    //             rules: [{ required: true, message: 'Please give Banner image' }],
    //           })(
    //             <Upload {...props}
    //               className="avatar-uploader"
    //               showUploadList={false}
    //               onChange={this.handleChange}
    //               accept=".png,.jpg,.jpeg"
    //             >
    //               {
    //                 this.state.option1 ?
    //                   <img src={this.state.option1} name="contestImageUrl" alt="" className="avatar" /> :
    //                   <Icon type="camera" style={{ fontWeight: "bold", fontSize: 40 }} className="avatar-uploader-trigger" />
    //               }
    //               <h6 className='h6Font'>Image 1</h6>
    //             </Upload>

    //             )}
    //         </FormItem>
    //       </Col>
    //       <Col className="gutter-row" span={6}>

    //         <FormItem style={{ width: 150, height: 150, textAlign: "center", border: "1px solid #999", paddingTop: 30, borderRadius: "10%", marginBottom: 10 }}>

    //           {getFieldDecorator('option2', {
    //             rules: [{ required: true, message: 'Please give Banner image' }],
    //           })(
    //             <Upload {...props}
    //               className="avatar-uploader"
    //               showUploadList={false}
    //               onChange={this.handleChange}
    //               accept=".png,.jpg,.jpeg"
    //             >
    //               {
    //                 this.state.option2 ?
    //                   <img src={this.state.option2} alt="" className="avatar" /> :
    //                   <Icon type="camera" style={{ fontWeight: "bold", fontSize: 40 }} className="avatar-uploader-trigger" />
    //               }
    //               <h6 className='h6Font'>Image 2</h6>
    //             </Upload>
    //             )}
    //         </FormItem>
    //       </Col>
    //       <Col className="gutter-row" span={6}>

    //         <FormItem style={{ width: 150, height: 150, textAlign: "center", border: "1px solid #999", paddingTop: 30, borderRadius: "10%", marginBottom: 10 }}>

    //           {getFieldDecorator('option3', {
    //             rules: [{ required: true, message: 'Please give Banner image' }],
    //           })(
    //             <Upload {...props}
    //               className="avatar-uploader"
    //               showUploadList={false}
    //               onChange={this.handleChange}
    //               accept=".png,.jpg,.jpeg"
    //             >
    //               {
    //                 this.state.option3 ?
    //                   <img src={this.state.option3} alt="" className="avatar" /> :
    //                   <Icon type="camera" style={{ fontWeight: "bold", fontSize: 40 }} className="avatar-uploader-trigger" />
    //               }
    //               <h6 className='h6Font'>Image 3</h6>
    //             </Upload>
    //             )}
    //         </FormItem>
    //       </Col>
    //       <Col className="gutter-row" span={6}>

    //         <FormItem style={{ width: 150, height: 150, textAlign: "center", border: "1px solid #999", paddingTop: 30, borderRadius: "10%", marginBottom: 10 }}>

    //           {getFieldDecorator('option4', {
    //             rules: [{ required: true, message: 'Please give Banner image' }],
    //           })(
    //             <Upload {...props}
    //               className="avatar-uploader"
    //               showUploadList={false}
    //               onChange={this.handleChange}
    //               accept=".png,.jpg,.jpeg"
    //             >                  {
    //                 this.state.option4 ?
    //                   <img src={this.state.option4} alt="" className="avatar" /> :
    //                   <Icon type="camera" style={{ fontWeight: "bold", fontSize: 40 }} className="avatar-uploader-trigger" />
    //               }
    //               <h6 className='h6Font'>Image 4</h6>
    //             </Upload>
    //             )}
    //         </FormItem>
    //       </Col>
    //     </Row>
    //   </FormItem>
    //   <FormItem className="colpadding">
    //     {getFieldDecorator('answer', {
    //       rules: [{ required: true, message: 'Please enter the description of Fun2Win!' }],
    //     })(
    //       <Input placeholder="Grid Type Answer" name="answer" setFieldsValue={this.state.correctAnswer} onChange={this.handleInputChange} />
    //       )}
    //   </FormItem>
    // </div>);

    // const pairingType = (<div className="pairing">
    //   <FormItem className="colpadding">
    //     {getFieldDecorator('description', {
    //       rules: [{ required: true, message: 'Please enter the description of Fun2Win!' }],
    //     })(
    //       <Input placeholder="Pairing Type Question" name="question" setFieldsValue={this.state.name} onChange={this.handleInputChange} />
    //       )}
    //   </FormItem>
    //   <FormItem>

    //     <Row gutter={16}>
    //       <Col className="gutter-row" span={6}>

    //         <FormItem style={{ width: 150, height: 150, textAlign: "center", border: "1px solid #999", paddingTop: 30, borderRadius: "10%", marginBottom: 10 }}>

    //           {getFieldDecorator('imageUrl', {
    //             rules: [{ required: true, message: 'Please provide image' }],
    //           })(
    //             <Upload {...props}
    //               className="avatar-uploader"
    //               showUploadList={false}
    //               onChange={this.handleChange}
    //               accept=".png,.jpg,.jpeg"
    //             >
    //               {
    //                 this.state.imageUrl ?
    //                   <img src={this.state.imageUrl} alt="" className="avatar" /> :
    //                   <Icon type="camera" style={{ fontWeight: "bold", fontSize: 40 }} className="avatar-uploader-trigger" />
    //               }
    //               <h6 className='h6Font'>Upload Image 1</h6>
    //             </Upload>
    //             )}
    //         </FormItem>
    //       </Col>
    //       <Col className="gutter-row" span={6}>

    //         <FormItem style={{ width: 150, height: 150, textAlign: "center", border: "1px solid #999", paddingTop: 30, borderRadius: "10%", marginBottom: 10 }}>

    //           {getFieldDecorator(' imageUrl', {
    //             rules: [{ required: true, message: 'Please provide image' }],
    //           })(
    //             <Upload {...props}
    //               className="avatar-uploader"
    //               showUploadList={false}
    //               onChange={this.handleChange}
    //               accept=".png,.jpg,.jpeg"
    //             >
    //               {
    //                 this.state.imageUrl ?
    //                   <img src={this.state.imageUrl} alt="" className="avatar" /> :
    //                   <Icon type="camera" style={{ fontWeight: "bold", fontSize: 40 }} className="avatar-uploader-trigger" />
    //               }
    //               <h6 className='h6Font'>Upload Image2</h6>
    //             </Upload>
    //             )}
    //         </FormItem>
    //       </Col>

    //       <Col className="gutter-row" span={6}>

    //         <FormItem style={{ width: 150, height: 150, textAlign: "center", border: "1px solid #999", paddingTop: 30, borderRadius: "10%", marginBottom: 10 }}>

    //           {getFieldDecorator('imageUrl', {
    //             rules: [{ required: true, message: 'Please provide image' }],
    //           })(
    //             <Upload {...props}
    //               className="avatar-uploader"
    //               showUploadList={false}
    //               onChange={this.handleChange}
    //               accept=".png,.jpg,.jpeg"
    //             >
    //               {
    //                 this.state.imageUrl ?
    //                   <img src={this.state.imageUrl} alt="" className="avatar" /> :
    //                   <Icon type="camera" style={{ fontWeight: "bold", fontSize: 40 }} className="avatar-uploader-trigger" />
    //               }
    //               <h6 className='h6Font'>Upload Image 3</h6>
    //             </Upload>
    //             )}
    //         </FormItem>
    //       </Col>
    //     </Row>
    //   </FormItem>
    //   <FormItem className="colpadding">
    //     {getFieldDecorator('answer', {
    //       rules: [{ required: true, message: 'Please fill the answer!' }],
    //     })(
    //       <Input placeholder="Pairing Type Answer" name="answer" setFieldsValue={this.state.answer} onChange={this.handleInputChange} />
    //       )}
    //   </FormItem>

    // </div>);

    const multipleType = (<div className="multiple">
      <h3>Multiple Type</h3>
      <Row>
        <Col span={12}>
          <FormItem className="colpadding">
            {getFieldDecorator('name', {
              rules: [{ required: true, whitespace: true, message: 'Please enter question' }],
            })(
              <Input placeholder="Multiple type question" name="name" setFieldsValue={this.state.name} onChange={this.handleInputChange} />
              )}
          </FormItem></Col>
        <Col span={12}>
          <FormItem className="colpadding">
            <Select defaultValue="Select Correct Answer" style={{ width: 120 }} onChange={this.handleMultipleAnswer}>
              <Option value="1">Option One</Option>
              <Option value="2">Option Two</Option>
              <Option value="3">Option Three</Option>
              <Option value="4">Option Four</Option>
            </Select>
          </FormItem></Col>
      </Row>

      <FormItem className="colpadding">
        {getFieldDecorator('option1', {
          rules: [{ required: true, whitespace: true, message: 'Please fill Option 1' }],
        })(
          <Input placeholder="Answer One" name="option1" setFieldsValue={this.state.option1} onChange={this.handleInputChange} />
          )}
      </FormItem>
      <FormItem className="colpadding">
        {getFieldDecorator('option2', {
          rules: [{ required: true, whitespace: true, message: 'Please fill Option 2' }],
        })(
          <Input placeholder="Answer Two" name="option2" setFieldsValue={this.state.option2} onChange={this.handleInputChange} />
          )}
      </FormItem>
      <FormItem className="colpadding">
        {getFieldDecorator('option3', {
          rules: [{ required: true, whitespace: true, message: 'Please fill Option 3' }],
        })(
          <Input placeholder="Answer Three" name="option3" setFieldsValue={this.state.option3} onChange={this.handleInputChange} />
          )}
      </FormItem>
      <FormItem className="colpadding">
        {getFieldDecorator('option4', {
          rules: [{ required: true, whitespace: true, message: 'Please fill Option 4' }],
        })(
          <Input placeholder="Answer Four" name="option4" setFieldsValue={this.state.option4} onChange={this.handleInputChange} />
          )}
      </FormItem>
    </div>);

    // if (this.state.questionModel === 'Grid Image Type') {
    //   var bindQuestion = gridType;
    // }
    // else if (this.state.questionModel === 'Poll Base Type') {
    //   var bindQuestion = pollType;
    // }
    // else if (this.state.questionModel === 'Pairing Type') {
    //   var bindQuestion = pairingType;
    // }
    // else if (this.state.questionModel === 'Multiple Type') {
    //   var bindQuestion = multipleType;
    // }

    const mapCategories = this.state.categories.map((category) => <Option value={category._id}>{category.name}</Option>);

    const mapSubCategories = this.state.subCategories.map((subCategory) => <Option value={subCategory._id}>{subCategory.name}</Option>)

    const imageUrl = this.state.imageUrl;


    return (
      <Dashboard>
      <div>
        <Form>
          <FormItem>
            <Row>
              <Col span={12}>
                <Select defaultValue="Select Category" style={{ width: 150 }} onChange={this.onCategoryChange}>
                  {mapCategories}
                </Select>
              </Col>
              <Col span={12}><Select defaultValue="Select SubCategory" style={{ width: 150 }} onChange={this.onSubCategoryChange}>
                {/* {this.state.subCategories.length< 0?this.state.subCategories:{mapSubCategories}} */}
                {mapSubCategories}
              </Select></Col>
            </Row>
          </FormItem>

          <Row>
            <Col span={12}>
              <h3> Fun 2 Win Details</h3>
              <FormItem className="colpadding ant-col-lg-20">
                {getFieldDecorator('type', {
                  rules: [{ required: true, whitespace: true, message: 'Please enter the celebrity Name!' }, { min: 1, max: 80, message: 'Type should be between 1 and 80 characters' }],
                })(
                  <Input autoComplete={'off'} placeholder="Celebrity Name" name="celebrityName" setFieldsValue={this.state.celebrityName} onChange={this.handleInputChange} />
                  )}
              </FormItem>

              <FormItem className="colpadding ant-col-lg-20">
                {getFieldDecorator('title', {
                  rules: [{ required: true, whitespace: true, message: 'Please enter Fun 2 Win Title!' }, { min: 1, max: 20, message: 'Title should be between 1 and 20 characters' }],
                })(
                  <Input autoComplete={'off'} placeholder="Fun 2 Win Title" name="fun2winTitle" setFieldsValue={this.state.fun2winTitle} onChange={this.handleInputChange} />
                  )}
              </FormItem>
              <FormItem className="colpadding ant-col-lg-20">
                {getFieldDecorator('packDescription', {
                  rules: [{ required: true, whitespace: true, message: 'Please enter the description of Fun2Win!' }],
                })(
                  <Input.TextArea placeholder="Description" name="packDescription" setFieldsValue={this.state.packDescription} onChange={this.handleInputChange} />
                  )}
              </FormItem>

              <FormItem className="colpadding ant-col-lg-20">
              {getFieldDecorator('points', {
                  rules: [{ required: true, whitespace: true, message: 'Please enter the number of Fancoins to be awarded!' }],
                })(
                <Input placeholder="points" name="points" setFieldsValue={this.state.points} onChange={this.handleInputChange} />
              )}
              </FormItem></Col>

            <Col span={12} >
              <h3> Fun 2 Win Cover Photo</h3>
              <FormItem style={{ width: 150, height: 150, textAlign: "center", border: "1px solid #999", paddingTop: 30, borderRadius: "10%", marginTop: 20 }}>

                {getFieldDecorator(' Banner image', {
                  rules: [{ required: true, message: 'Please give Banner image' }],
                })(
                  <Upload {...props}
                    className="avatar-uploader"
                    showUploadList={false}
                    onChange={this.handleChange}
                    accept=".png,.jpg,.jpeg"
                  >
                    {
                      this.state.packImageUrl ?
                        <img src={this.state.packImageUrl} alt="" className="avatar" /> :
                        <Icon type="camera" style={{ fontWeight: "bold", fontSize: 40 }} className="avatar-uploader-trigger" />
                    }
                    <h6 className='h6Font'>Upload Cover Photo</h6>
                  </Upload>
                  )}
              </FormItem>
            </Col>
          </Row>

          {/* <h2> Question</h2> */}

          {/* <FormItem className="colpadding">
            <Select defaultValue="Select Type" style={{ width: 120 }} onChange={this.onQuestionTypeChange}>
              <Option value="Grid Image Type">Grid Image Type</Option>
              <Option value="Pairing Type">Pairing Type</Option>
              <Option value="Poll Base Type">Poll Base Type</Option>
              <Option value="Multiple Type">Multiple Type</Option>
            </Select>
          </FormItem> */}
          {/* {gridType} */}
          {/* {pairingType} */}
          {/* {pollType} */}
          {multipleType}
          {/* {bindQuestion} */}
          <FormItem className="colpadding floatRight"  >
            <Button type="primary" onClick={this.handleSubmitContinue.bind(this)}>Save and Next</Button>
          </FormItem>
        </Form>
      </div>
      </Dashboard>
    );
  };
}

const Fun2Win = Form.create()(ContentPacks);
export default Fun2Win;
/* eslint-disable */