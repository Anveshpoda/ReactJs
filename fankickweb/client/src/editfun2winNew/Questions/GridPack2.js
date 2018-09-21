/* eslint-disable */
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { browserHistory } from 'react-router';
import classNames from 'classnames/bind';
import css from '../CreateFun2WinEdit.css';
import $ from "jquery";
import { Form, Icon, Input, Tooltip, Button, Checkbox, Col, Row, Radio, Upload, message,Popconfirm, Select } from 'antd';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
    marginTop: '18px',
    width: "100%"
};
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
            message.success(`Image uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

class GridPack2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gridquestion: '',
            gridquestionType: '',
            gridoption1: '',
            gridoption2: '',
            gridoption3: '',
            gridoption4: '',
            gridcheckbox1: '',
            gridcheckbox2: '',
            gridcheckbox3: '',
            gridcheckbox4: '',
            gridcorrectAnswer: '',
            errors: {},
            disablegridcheckbox1: false,
            disablegridcheckbox2: false,
            disablegridcheckbox3: false,
            disablegridcheckbox4: false,
            gridbutton: true,
            gridid: '',
            gridradioState: false,
            gridquestionType1: '',
            gridradioState1: false,
            counter: ''
        }
    }
    componentWillReceiveProps(newProps) {
        this.setState({ counter: newProps.counter })
    }
    componentDidMount() {
        this.setState({ counter: this.props.counter })
        if (this.props.gridquestionType === "Question") {
            this.setState({
                gridradioState: false
            })
        } else if (this.props.gridquestionType === "Opinion") {
            this.setState({
                gridradioState: true
            })
        }
    }
    onChange89 = (e) => {
    }
    onRadioChange = (e) => {
        const qType = e.target.value;
        this.setState({
            gridquestionType: qType
        })
        if (e.target.value.includes("Question")) {
            this.setState({
                gridradioState: false
            })
        }
        else if (e.target.value.includes("Opinion")) {
            this.setState({
                gridradioState: true
            })
        }
    }
    onRadioChange1 = (e) => {
        const qType = e.target.value;
        this.setState({
            gridquestionType1: qType
        })
        if (e.target.value.includes("Question")) {
            this.setState({
                gridradioState1: false
            })
        }
        else if (e.target.value.includes("Opinion")) {
            this.setState({
                gridradioState1: true
            })
        }
    }
    onInputChange = (e) => {
        if (this.state.gridquestion != '') this.state.errors.question = ''
        this.setState({
            [e.target.id]: e.target.value
        })
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

    onCheckBoxChange = (e) => {
        if (e.target.value.includes("gridAns1") && e.target.checked) {
            this.setState({
                gridcheckbox1: true,
                gridcheckbox2: false,
                gridcheckbox3: false,
                gridcheckbox4: false,
                gridcorrectAnswer: 1,
            })
        }
        else if (e.target.value.includes("gridAns2") && e.target.checked) {
            this.setState({
                gridcheckbox1: false,
                gridcheckbox2: true,
                gridcheckbox3: false,
                gridcheckbox4: false,
                gridcorrectAnswer: 2,
            })
        }
        else if (e.target.value.includes("gridAns3") && e.target.checked) {
            this.setState({
                gridcheckbox1: false,
                gridcheckbox2: false,
                gridcheckbox3: true,
                gridcheckbox4: false,
                gridcorrectAnswer: 3,
            })
        }
        else if (e.target.value.includes("gridAns4") && e.target.checked) {
            this.setState({
                gridcheckbox1: false,
                gridcheckbox2: false,
                gridcheckbox3: false,
                gridcheckbox4: true,
                gridcorrectAnswer: 4,
            })
        }
    }
    handlepackEdit(e) {
        var question = this.gridquestion.refs.input.value.trim();
        var questionType = this.gridquestionType.state.value
        var correctAnswer = this.gridcorrectAnswer.state.value
        var gridoption1; var gridoption2; var gridoption3; var gridoption4;
        if (this.gridoption1 === undefined) {
            gridoption1 = '';
        } else {
            gridoption1 = this.gridoption1.src;
        }
        if (this.gridoption2 === undefined) {
            gridoption2 = '';
        } else {
            gridoption2 = this.gridoption2.src;
        }
        if (this.gridoption3 === undefined) {
            gridoption3 = '';
        } else {
            gridoption3 = this.gridoption3.src;
        }
        if (this.gridoption4 === undefined) {
            gridoption4 = '';
        } else {
            gridoption4 = this.gridoption4.src;
        }
        let errors = {}
        if (question === '' || question === undefined) errors.question = 'Enter Question'
        if (gridoption1 === '' || gridoption1 === undefined) errors.gridoption1 = 'Upload Image 1'
        if (gridoption2 === '' || gridoption2 === undefined) errors.gridoption2 = 'Upload Image 2'
        if (gridoption3 === '' || gridoption3 === undefined) errors.gridoption3 = 'Upload Image 3'
        if (gridoption4 === '' || gridoption4 === undefined) errors.gridoption4 = 'Upload Image 4'
        if (questionType === '' || questionType === undefined) errors.questionType = 'Please Select Question Type'
        if ((correctAnswer === '' || correctAnswer === undefined) && (questionType === 'Question')) errors.selectAnswer = 'Please select an answer'
        this.setState({ errors })
        if (Object.keys(errors).length === 0) {
            const gridquestionType = this.gridquestionType.state.value;
            const gridcorrectAnswer = this.gridcorrectAnswer.state.value
            this.props.fngridEdit(this.props.counter, this.props.gridid,
                this.gridquestion.refs.input.value.trim(), this.gridoption1.src,
                this.gridoption2.src, this.gridoption3.src, this.gridoption4.src,
                gridquestionType, gridcorrectAnswer);
        }
    }
    addGrid = (a) => {
        var gridoption1; var gridoption2; var gridoption3; var gridoption4;
        var question = this.gridquestion1.refs.input.value.trim();
        var questionType = this.gridquestionType1.state.value
        var correctAnswer = this.gridcorrectAnswer1.state.value
        if (this.gridoption11 === undefined) {
            gridoption1 = '';
        } else {
            gridoption1 = this.gridoption11.src;
        }
        if (this.gridoption22 === undefined) {
            gridoption2 = '';
        } else {
            gridoption2 = this.gridoption22.src;
        }
        if (this.gridoption33 === undefined) {
            gridoption3 = '';
        } else {
            gridoption3 = this.gridoption33.src;
        }
        if (this.gridoption44 === undefined) {
            gridoption4 = '';
        } else {
            gridoption4 = this.gridoption44.src;
        }
        let errors = {}
        if (question === '' || question === undefined) errors.question = 'Enter Question'
        if (gridoption1 === '' || gridoption1 === undefined) errors.gridoption1 = 'Upload Image 1'
        if (gridoption2 === '' || gridoption2 === undefined) errors.gridoption2 = 'Upload Image 2'
        if (gridoption3 === '' || gridoption3 === undefined) errors.gridoption3 = 'Upload Image 3'
        if (gridoption4 === '' || gridoption4 === undefined) errors.gridoption4 = 'Upload Image 4'
        if (questionType === '' || questionType === undefined) errors.questionType = 'Please Select Question Type'
        if ((correctAnswer === '' || correctAnswer === undefined) && (questionType === 'Question')) errors.selectAnswer = 'Please select an answer'
        this.setState({ errors })
        if (Object.keys(errors).length === 0) {
            this.props.contentPackGrid(
                this.gridquestionType1.state.value, this.gridquestion1.refs.input.value.trim(), this.gridoption11.src,
                this.gridoption22.src, this.gridoption33.src, this.gridoption44.src, this.gridcorrectAnswer1.state.value
            )
            $(".removegridForm").hide();
            this.props.hideDiv(a);
        }
    }
    confirm = () => {
        this.props.fnRemove();
    }
    render() {
        var a = this.props.counterid;
        if (this.props.gridquestion === undefined) {
            return (
                <div className="removegridForm">
                    <Row>
                        <Col span={6} className="cfuntowinadd">
                            <h6 className='h6Fnt'>Select Answer</h6>
                        </Col>
                        <Col span={16} className="cfuntowinadd">
                            <RadioGroup value={this.state.gridquestionType1} onChange={this.onRadioChange1}
                                ref={RadioGroup => this.gridquestionType1 = RadioGroup} >
                                <Radio value='Opinion'>Opinion</Radio>
                                <Radio value='Question'>Question</Radio>
                                <p className="fun2WinQuestionError">{this.state.errors.questionType}</p>
                            </RadioGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={14} className="cfuntowinadd">

                            <FormItem>
                                <Input placeholder="Enter Question" id="gridquestion"
                                    maxLength={75} name="gridquestion" autoComplete={'off'}
                                    ref={node => this.gridquestion1 = node}
                                />
                                <p className="fun2WinQuestionError">{this.state.errors.question}</p>
                            </FormItem>
                        </Col>
                        <Col span={1}>
                            <span>


                                <a data-tip data-for='globalGrid'>  <Icon className="mrgnIconleft46" type="exclamation-circle-o" /> </a>
                                <ReactTooltip id='globalGrid' aria-haspopup='true' role='example'>
                                    <ol>
                                        <li>1. Length should not exceed 75 characters (With spaces)</li>
                                        <li>2. You must specify an answer for each question</li>
                                        <li>3. There will be no answer for Opinion type questions</li>
                                    </ol>
                                </ReactTooltip>
                            </span>
                        </Col>
                    </Row>


                    <Row className="marginTop20">
                        <RadioGroup disabled={this.state.gridradioState1}
                            ref={RadioGroup => this.gridcorrectAnswer1 = RadioGroup}

                            style={{ width: '100%' }}>
                            <Col span={3} className="marginRight38">
                                <div className="cfunguploadimg">
                                    <Radio value={1}>  </Radio>

                                    <Upload {...props}
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        onChange={this.uploadImages.bind(this, 'gridoption1')}
                                        accept=".png,.jpg,.jpeg"
                                    >
                                        {
                                            this.state.gridoption1 ?
                                                <img src={this.state.gridoption1}
                                                    alt="" className="avatar" ref={c => this.gridoption11 = c} /> :
                                                <Icon type="picture" className="avatar-uploader-trigger" />
                                        }
                                    </Upload>

                                </div>
                                <p className="fun2WinQuestionError">{this.state.errors.gridoption1}</p>
                            </Col>

                            <Col span={3} className="marginRight38">
                                <div className="cfunguploadimg">
                                    <Radio value={2}> </Radio>

                                    <Upload {...props}
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        onChange={this.uploadImages.bind(this, 'gridoption2')}
                                        accept=".png,.jpg,.jpeg"
                                    >
                                        {
                                            this.state.gridoption2 ?
                                                <img src={this.state.gridoption2}
                                                    alt="" className="avatar" ref={c => this.gridoption22 = c} /> :
                                                <Icon type="picture" className="avatar-uploader-trigger" />
                                        }
                                    </Upload>

                                </div>
                                <p className="fun2WinQuestionError">{this.state.errors.gridoption2}</p>
                            </Col>

                            <Col span={3} className="marginRight38">
                                <div className="cfunguploadimg">
                                    <Radio value={3}> </Radio>

                                    <Upload {...props}
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        onChange={this.uploadImages.bind(this, 'gridoption3')}
                                        accept=".png,.jpg,.jpeg"
                                    >
                                        {
                                            this.state.gridoption3 ?
                                                <img src={this.state.gridoption3}
                                                    alt="" className="avatar" ref={c => this.gridoption33 = c} /> :
                                                <Icon type="picture" className="avatar-uploader-trigger" />
                                        }
                                    </Upload>

                                </div>
                                <p className="fun2WinQuestionError">{this.state.errors.gridoption3}</p>
                            </Col>

                            <Col span={3} className="marginRight38">
                                <div className="cfunguploadimg">
                                    <Radio value={4}>  </Radio>

                                    <Upload {...props}
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        onChange={this.uploadImages.bind(this, 'gridoption4')}
                                        accept=".png,.jpg,.jpeg"
                                    >
                                        {
                                            this.state.gridoption4 ?
                                                <img src={this.state.gridoption4}
                                                    alt="" className="avatar" ref={c => this.gridoption44 = c} /> :
                                                <Icon type="picture" className="avatar-uploader-trigger" />
                                        }
                                    </Upload>

                                </div>
                                <p className="fun2WinQuestionError">{this.state.errors.gridoption4}</p>
                            </Col>
                        </RadioGroup>
                    </Row>
                    <Row>
                        <p className="fun2WinQuestionError">{this.state.errors.selectAnswer}</p>

                    </Row>
                    <Row>
                        <Col span={16} className="cfuntowinadd">
                            <h6 className='h6Fnt'>Please Select Answer Through CheckBox</h6>

                        </Col>

                        <Col span={6} offset={12} className="cfuntowinQbtn cfuntowinadd">

                        </Col>
                        <Col>
                            <Button type="primary" className='createFun2Win fun2winEditGridBtn' onClick={this.addGrid.bind(this, a)}>
                                ADD</Button>
                        </Col>
                    </Row>
                </div>
            );

        }
        else if (this.props.gridquestion !== '') {
            var packEdit = (!this.props.editable) ?
                (<div>
                    <Row>
                        <Col span={12}>
                            
                            <h4><span className="Fun2winEditQuestionno">{parseInt(this.state.counter) + 1+")"}</span> <span className="FontBold">{this.props.questionCategory} Type</span></h4>
                        </Col>
                        <Col span={4}>
                            {editBtn}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} className="">
                            <p className="questionPara" title={this.props.gridquestion}>{this.props.gridquestion}</p> </Col>
                    </Row>
                </div>) :
                (<div>
                    <Row>
                        <h4></h4>         
                        <h4><span className="Fun2winEditQuestionno">{parseInt(this.state.counter) + 1}</span> <span className="FontBold">{this.props.questionCategory} Type</span></h4>
                        <Col span={6} className="cfuntowinadd">
                            <h6 className='h6Fnt'>Select Answer</h6>
                        </Col>
                        <Col span={16} className="cfuntowinadd">
                            <RadioGroup defaultValue={this.props.gridquestionType} onChange={this.onRadioChange}
                                ref={RadioGroup => this.gridquestionType = RadioGroup} >
                                <Radio value='Opinion'>Opinion</Radio>
                                <Radio value='Question'>Question</Radio>
                                <p className="fun2WinQuestionError">{this.state.errors.questionType}</p>
                            </RadioGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={23} className="cfuntowinadd">

                            <FormItem>
                                <Input placeholder="Enter Question" id="gridquestion" maxLength={75} name="gridquestion"
                                    ref={node => this.gridquestion = node} defaultValue={this.props.gridquestion} />
                                <p className="fun2WinQuestionError">{this.state.errors.question}</p>
                            </FormItem>
                        </Col>
                        <Col span={1}>
                            <span>


                                <a data-tip data-for='globalGrid'>  <Icon className="mrgnIconleft46" type="exclamation-circle-o" /> </a>
                                <ReactTooltip id='globalGrid' aria-haspopup='true' role='example'>
                                    <ol>
                                        <li>1. Length should not exceed 75 characters (With spaces)</li>
                                        <li>2. You must specify an answer for each question</li>
                                        <li>3. There will be no answer for Opinion type questions</li>
                                    </ol>
                                </ReactTooltip>
                            </span>
                        </Col>
                    </Row>


                    <Row className="marginTop20">
                        <RadioGroup disabled={this.state.gridradioState} ref={RadioGroup => this.gridcorrectAnswer = RadioGroup}
                            defaultValue={this.props.gridcorrectAnswer} onChange={this.onChange89}
                            style={{ width: '100%' }}>
                            <Col span={4} className="marginuploadRight38">
                                <div className="cfunguploadimgEditgrid">
                                    <Radio value={1}>  </Radio>


                                    <Upload {...props}
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        onChange={this.uploadImages.bind(this, 'gridoption1')}
                                        accept=".png,.jpg,.jpeg"
                                    >
                                        {
                                            this.props.gridoption1 ?
                                                <img src={this.state.gridoption1 === '' ? this.props.gridoption1 : this.state.gridoption1}
                                                    alt="" className="avatar" ref={c => this.gridoption1 = c} /> :
                                                <Icon type="picture" className="avatar-uploader-trigger" />
                                        }
                                    </Upload>

                                </div>
                                <p className="fun2WinQuestionError">{this.state.errors.gridoption1}</p>
                            </Col>

                            <Col span={4} className="marginuploadRight38">
                                <div className="cfunguploadimgEditgrid">
                                    <Radio value={2}>     </Radio>

                                    <Upload {...props}
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        onChange={this.uploadImages.bind(this, 'gridoption2')}
                                        accept=".png,.jpg,.jpeg"
                                    >
                                        {
                                            this.props.gridoption2 ?
                                                <img src={this.state.gridoption2 === '' ? this.props.gridoption2 : this.state.gridoption2}
                                                    alt="" className="avatar" ref={c => this.gridoption2 = c} /> :
                                                <Icon type="picture" className="avatar-uploader-trigger" />
                                        }
                                    </Upload>

                                </div>
                                <p className="fun2WinQuestionError">{this.state.errors.gridoption2}</p>
                            </Col>

                            <Col span={4} className="marginuploadRight38">
                                <div className="cfunguploadimgEditgrid">
                                    <Radio value={3}>   </Radio>

                                    <Upload {...props}
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        onChange={this.uploadImages.bind(this, 'gridoption3')}
                                        accept=".png,.jpg,.jpeg"
                                    >
                                        {
                                            this.props.gridoption3 ?
                                                <img src={this.state.gridoption3 === '' ? this.props.gridoption3 : this.state.gridoption3}
                                                    alt="" className="avatar" ref={c => this.gridoption3 = c} /> :
                                                <Icon type="picture" className="avatar-uploader-trigger" />
                                        }
                                    </Upload>

                                </div>
                                <p className="fun2WinQuestionError">{this.state.errors.gridoption3}</p>
                            </Col>

                            <Col span={4} className="marginuploadRight38">
                                <div className="cfunguploadimgEditgrid">
                                    <Radio value={4}>  </Radio>

                                    <Upload {...props}
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        onChange={this.uploadImages.bind(this, 'gridoption4')}
                                        accept=".png,.jpg,.jpeg"
                                    >
                                        {
                                            this.props.gridoption4 ?
                                                <img src={this.state.gridoption4 === '' ? this.props.gridoption4 : this.state.gridoption4}
                                                    alt="" className="avatar" ref={c => this.gridoption4 = c} /> :
                                                <Icon type="picture" className="avatar-uploader-trigger" />
                                        }
                                    </Upload>

                                </div>
                                <p className="fun2WinQuestionError">{this.state.errors.gridoption4}</p>
                            </Col>
                        </RadioGroup>
                    </Row>
                    <Row>
                        <p className="fun2WinQuestionError">{this.state.errors.selectAnswer}</p>

                    </Row>
                    <Row>
                        <Col span={16} className="cfuntowinadd">
                            <h6 className='h6Fnt'>Please Select Answer Through CheckBox</h6>

                        </Col>

                        <Col span={6} offset={12} className="cfuntowinQbtn cfuntowinadd">

                        </Col>
                    </Row>
                    {editBtn}
                </div>
                );
            var editBtn = (this.props.editable) ?
                (<Button className="fun2winSavesbtns" onClick={this.handlepackEdit.bind(this)}> <Icon type="save" /></Button>) :
                (<Button className="editsaveBtn" onClick={this.props.fnEnableEdit}>
                    <Icon type="edit" /></Button>);

            return (<div>
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

export default GridPack2;
/* eslint-disable */