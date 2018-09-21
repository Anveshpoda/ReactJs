/* eslint-disable */
import React from 'react';
import $ from "jquery";
import ReactTooltip from 'react-tooltip';
import css from '../CreateFun2WinEdit.css';
import { Form, Icon, Input, Tooltip, Button, Col, Row, Radio, Upload,Popconfirm, message } from 'antd';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

const props = {
  name: 'file',
  action:process.env.REACT_APP_API_HOST + '/rest/azureImageUploadWeb',
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

class PollingPack2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pollquestion: '',
      pollname: '',
      polloption1: '',
      polloption2: '',
      errors: {},
      pollbutton: true,
      pollid: '',
      counter: ''
    }
  }

  uploadImages = (e, info) => {
    var image = e;
    if (info.file.status === 'done') {
      message.success(`Image uploaded successfully`);
      if (info.file.response.data !== '') this.state.errors[image] = '';
      this.setState({
        [image]: info.file.response.data
      })
    }
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  componentWillReceiveProps(newProps) {
    this.setState({ counter: newProps.counter })
  }
  componentDidMount() {
    this.setState({ counter: this.props.counter })
  }

  handlepackEdit(e) {
    let errors = {}
    var pollquestion = this.pollquestion.refs.input.value.trim();
    var pollname; var polloption1; var polloption2;
    if (this.pollimage === undefined) {
      pollname = '';
    } else {
      pollname = this.pollimage.src;
    }
    if (this.polloption1 === undefined) {
      polloption1 = '';
    } else {
      polloption1 = this.polloption1.src;
    }
    if (this.polloption2 === undefined) {
      polloption2 = '';
    } else {
      polloption2 = this.polloption2.src;
    }
    if (pollquestion === '' || pollquestion === undefined) errors.question = 'Fill Question'
    if (pollname === '' || pollname === undefined) errors.name = 'Upload Question Image'
    if (polloption1 === '' || polloption1 === undefined) errors.polloption1 = 'Upload Image 1'
    if (polloption2 === '' || polloption2 === undefined) errors.polloption2 = 'Upload Image 2'
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.fnpollEdit(this.props.counter, this.props.pollid,
        this.pollquestion.refs.input.value.trim(), this.pollimage.src,
        this.polloption1.src, this.polloption2.src,
      );
    }
  }
  addPoll = (a) => {
    let errors = {}
    var pollquestion = this.pollquestion1.refs.input.value.trim();
    var pollname; var polloption1; var polloption2;
    if (this.pollimage1 === undefined) {
      pollname = '';
    } else {
      pollname = this.pollimage1.src;
    }
    if (this.polloption11 === undefined) {
      polloption1 = '';
    } else {
      polloption1 = this.polloption11.src;
    }
    if (this.polloption22 === undefined) {
      polloption2 = '';
    } else {
      polloption2 = this.polloption22.src;
    }
    if (pollquestion === '' || pollquestion === undefined) errors.question = 'Fill Question'
    if (pollname === '' || pollname === undefined) errors.name = 'Upload Question Image'
    if (polloption1 === '' || polloption1 === undefined) errors.polloption1 = 'Upload Image 1'
    if (polloption2 === '' || polloption2 === undefined) errors.polloption2 = 'Upload Image 2'
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.contentPackPoll(
        this.pollquestion1.refs.input.value.trim(), this.pollimage1.src,
        this.polloption11.src, this.polloption22.src,
      );
      $(".removepollForm").hide();
      this.props.hideDiv(a);
    }
  }
  confirm = () => {
    this.props.fnRemove();
}
  render() {
    var a = this.props.counterid;
    if (this.props.pollquestion === undefined) {
      return (
        <div className="removepollForm">
          <Row>
            <Col span={14} className="cfuntowinadd">
              <FormItem>
                <Input placeholder="Enter Question" id="pollquestion" name="pollquestion"
                  maxLength={75} autoComplete={'off'}
                  ref={node => this.pollquestion1 = node} />
                <span className="fun2WinQuestionError">{this.state.errors.question}</span>
              </FormItem>
            </Col>
            <Col span={1}>
              <span>

                <a data-tip data-for='globalPolling'>  <Icon className="mrgnIconleft46" type="exclamation-circle-o" /> </a>
                <ReactTooltip id='globalPolling' aria-haspopup='true' role='example'>
                  <ol>
                    <li>1. Length should not exceed 75 characters (With spaces)</li>
                    <li>2. You must specify an answer for each question</li>
                    <li>3. There will be no answer for Opinion type questions</li>
                  </ol>
                </ReactTooltip>
              </span>

            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <h2 className="fun2winEditQuestions">Question Image</h2>
            </Col>

          </Row>
          <Row className="marginTop20">
            <Col span={4} className="marginRight356">
              <div className="cfunguploadimg">
                <Upload {...props}
                  className="avatar-uploader"
                  showUploadList={false}
                  onChange={this.uploadImages.bind(this, 'pollname')}
                  accept=".png,.jpg,.jpeg"
                >
                  {
                    this.state.pollname ?
                      <img src={this.state.pollname}
                        alt="" className="avatar" ref={c => this.pollimage1 = c} /> :
                      <Icon type="picture" className="avatar-uploader-trigger" />
                  }
                </Upload>
              </div>
              <p className="fun2WinQuestionError">{this.state.errors.name}</p>
            </Col>


            <Col span={4} className="marginRight356">
              <div className="cfunguploadimg">
                <Upload {...props}
                  className="avatar-uploader"
                  showUploadList={false}
                  onChange={this.uploadImages.bind(this, 'polloption1')}
                  accept=".png,.jpg,.jpeg"
                >
                  {
                    this.state.polloption1 ?
                      <img src={this.state.polloption1}
                        alt="" className="avatar" ref={c => this.polloption11 = c} /> :
                      <Icon type="picture" className="avatar-uploader-trigger" />
                  }
                </Upload>
              </div>
              <p className="fun2WinQuestionError">{this.state.errors.polloption1}</p>
            </Col>

            <Col span={4} className="marginRight356">
              <div className="cfunguploadimg">
                <Upload {...props}
                  className="avatar-uploader"
                  showUploadList={false}
                  onChange={this.uploadImages.bind(this, 'polloption2')}
                  accept=".png,.jpg,.jpeg"
                >
                  {
                    this.state.polloption2 ?
                      <img src={this.state.polloption2}
                        alt="" className="avatar" ref={c => this.polloption22 = c} /> :
                      <Icon type="picture" className="avatar-uploader-trigger" />
                  }
                </Upload>
              </div>
              <p className="fun2WinQuestionError">{this.state.errors.polloption2}</p>
            </Col>
          </Row>
          <Row>
            <Col span={11} offset={13} className="cfuntowinQbtn">
              <Button type="primary" className='createFun2Win fun2WinEditPollBtn' onClick={this.addPoll.bind(this, a)}>
                ADD</Button>
            </Col>
          </Row>
        </div>
      );
    }
    else if (this.props.pollquestion !== '') {
      var packEdit = (!this.props.editable) ?
        (<div>
          <Row>
            <Col span={12}>
              
              <h4><span className="Fun2winEditQuestionno">{parseInt(this.state.counter) + 1+")"}</span> <span className="FontBold">{this.props.questionCategory}Type</span></h4>
            </Col>
            <Col span={4}>
              {editBtn}
            </Col>
          </Row>
          <Row>
            <Col span={24} className="">
              <p className="questionPara" title={this.props.pollquestion}>{this.props.pollquestion}</p>
            </Col>
          </Row>

        </div>) :
        (<div>
          <Row>
          
            <h4><span className="Fun2winEditQuestionno">{parseInt(this.state.counter) + 1+")"}</span> <span className="FontBold">{this.props.questionCategory}Type</span></h4>
            <Col span={23} className="cfuntowinadd">
              <FormItem>
                <Input placeholder="Enter Question" id="pollquestion" name="pollquestion"
                  maxLength={75} defaultValue={this.props.pollquestion}
                  ref={node => this.pollquestion = node} onChange={this.onInputChange.bind(this)} />
                <span className="fun2WinQuestionError">{this.state.errors.question}</span>
              </FormItem>
            </Col>
            <Col span={1}>
              <span>

                <a data-tip data-for='globalPolling'>  <Icon className="mrgnIconleft46" type="exclamation-circle-o" /> </a>
                <ReactTooltip id='globalPolling' aria-haspopup='true' role='example'>
                  <ol>
                    <li>1. Length should not exceed 75 characters (With spaces)</li>
                    <li>2. You must specify an answer for each question</li>
                    <li>3. There will be no answer for Opinion type questions</li>
                  </ol>
                </ReactTooltip>
              </span>

            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <h2 className="fun2winEditQuestions">Question Image</h2>
            </Col>

          </Row>
          <Row className="marginTop20">
            <Col span={6} className="marginRight356">
              <div className="cfunguploadimg">
                <Upload {...props}
                  className="avatar-uploader"
                  showUploadList={false}
                  onChange={this.uploadImages.bind(this, 'pollname')}
                  accept=".png,.jpg,.jpeg"
                >
                  {
                    this.props.pollimage ?
                      <img src={this.state.pollname === '' ? this.props.pollimage : this.state.pollname}
                        alt="" className="avatar" ref={c => this.pollimage = c} /> :
                      <Icon type="picture" className="avatar-uploader-trigger" />
                  }
                </Upload>
              </div>
              <p className="fun2WinQuestionError">{this.state.errors.name}</p>
            </Col>


            <Col span={6} className="marginRight356">
              <div className="cfunguploadimg">
                <Upload {...props}
                  className="avatar-uploader"
                  showUploadList={false}
                  onChange={this.uploadImages.bind(this, 'polloption1')}
                  accept=".png,.jpg,.jpeg"
                >
                  {
                    this.props.polloption1 ?
                      <img src={this.state.polloption1 === '' ? this.props.polloption1 : this.state.polloption1}
                        alt="" className="avatar" ref={c => this.polloption1 = c} /> :
                      <Icon type="picture" className="avatar-uploader-trigger" />
                  }
                </Upload>
              </div>
              <p className="fun2WinQuestionError">{this.state.errors.polloption1}</p>
            </Col>

            <Col span={6} className="marginRight356">
              <div className="cfunguploadimg">
                <Upload {...props}
                  className="avatar-uploader"
                  showUploadList={false}
                  onChange={this.uploadImages.bind(this, 'polloption2')}
                  accept=".png,.jpg,.jpeg"
                >
                  {
                    this.props.polloption2 ?
                      <img src={this.state.polloption2 === '' ? this.props.polloption2 : this.state.polloption2}
                        alt="" className="avatar" ref={c => this.polloption2 = c} /> :
                      <Icon type="picture" className="avatar-uploader-trigger" />
                  }
                </Upload>
              </div>
              <p className="fun2WinQuestionError">{this.state.errors.polloption2}</p>
            </Col>
          </Row>
          <Row>
            <Col span={11} offset={13} className="cfuntowinQbtn">

            </Col>
          </Row>
          {editBtn}
        </div>
        );
      var editBtn = (this.props.editable) ?
        (
          <Button className="editsaveBtn" onClick={this.handlepackEdit.bind(this)}>
            <Icon type="save" />
          </Button>) :
        (
          <Button className="editsaveBtn" onClick={this.props.fnEnableEdit}>
            <Icon type="edit" />
          </Button>);

      return (<div >

        <Row>
          <Col span={14}>

            {packEdit}
          </Col>
          <Col span={9}>

          <Popconfirm title="Are you sure delete this Question?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
          <Button className="Deltebtn mrgnIconleft10" >

              <Icon type="delete" />
          </Button>
          </Popconfirm>
          </Col>

          {editBtn}
        </Row>

      </div>);
    }
  }
}

export default PollingPack2;
/* eslint-disable */