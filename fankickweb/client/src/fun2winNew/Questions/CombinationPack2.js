/* eslint-disable */
import React from 'react';
import $ from "jquery";
import ReactTooltip from 'react-tooltip';
import css from '../CreateFun2Win.css';
import { Form, Icon, Input, Button, Tooltip, Checkbox, Col, Row,Popconfirm, Radio, Upload, message } from 'antd';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

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
class CombinationPack2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            combinationquestion: '',
            combinationname: '',
            combioption1: '',
            combioption2: '',
            combioption3: '',
            combinationcheckbox1: '',
            combinationcheckbox2: '',
            combinationcheckbox3: '',
            disablecombinationcheckbox1: false,
            disablecombinationcheckbox2: false,
            disablecombinationcheckbox3: false,
            combinationquestionType: '',
            combinationcorrectAnswer: '',
            errors: {},
            combibutton: true,
            combinationid: '',
            combradioState: false,
            combinationquestionType1: '',
            combradioState1: false,
            counter: ''
        }
    }

    uploadImages = (e, info) => {
        var image = e;
        var imageId = image.charAt(image.length - 1);
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            if (info.file.response.data !== '') this.state.errors[image] = '';
            this.setState({
                [image]: info.file.response.data
            })
        }
    }
    onRadioChange1 = (e) => {
        const qType = e.target.value;
        this.setState({
            combinationquestionType1: qType
        })
        if (e.target.value.includes("Question")) {
            this.setState({
                combradioState1: false
            })
        }
        else if (e.target.value.includes("Opinion")) {
            this.setState({
                combradioState1: true
            })
        }
    }
    onRadioChange = (e) => {
        const qType = e.target.value;
        this.setState({
            combinationquestionType: qType
        })
        if (e.target.value.includes("Question")) {
            this.setState({
                combradioState: false
            })
        }
        else if (e.target.value.includes("Opinion")) {
            this.setState({
                combradioState: true
            })
        }
    }
    componentWillReceiveProps(newProps) {
        this.setState({ counter: newProps.counter })
    }
    componentDidMount() {
        this.setState({ counter: this.props.counter })
        if (this.props.combinationquestionType === "Question") {
            this.setState({
                combradioState: false
            })
        } else if (this.props.combinationquestionType === "Opinion") {
            this.setState({
                combradioState: true
            })
        }
    }
    onCheckBoxChange = (e) => {
        if (e.target.value !== '') this.state.errors.selectAnswer = '';
        if (e.target.value === 'combiAns1' && e.target.checked) {
            this.setState({
                combinationcheckbox1: true,
                combinationcheckbox2: false,
                combinationcheckbox3: false,
                combinationcorrectAnswer: 1,
            })
        }
        else if (e.target.value === 'combiAns2' && e.target.checked) {
            this.setState({
                combinationcheckbox1: false,
                combinationcheckbox2: true,
                combinationcheckbox3: false,
                combinationcorrectAnswer: 2,
            })
        }
        else if (e.target.value === 'combiAns3' && e.target.checked) {
            this.setState({
                combinationcheckbox1: false,
                combinationcheckbox2: false,
                combinationcheckbox3: true,
                combinationcorrectAnswer: 3,
            })
        }
    }
    onInputChange = (e) => {
        if (this.state.combinationquestion != '') this.state.errors.question = ''
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handlepackEdit(e) {
        var combinationquestionType = this.combinationquestionType.state.value;
        var combinationcorrectAnswer = this.combinationcorrectAnswer.state.value;
        var combinationquestion = this.combinationquestion.refs.input.value.trim();
        var combinationname; var combioption1; var combioption2; var combioption3;
        if (this.combinationimage === undefined) {
            combinationname = '';
        } else {
            combinationname = this.combinationimage.src;
        }
        if (this.combinationoption1 === undefined) {
            combioption1 = '';
        } else {
            combioption1 = this.combinationoption1.src;
        }
        if (this.combinationoption2 === undefined) {
            combioption2 = '';
        } else {
            combioption2 = this.combinationoption2.src;
        }
        if (this.combinationoption3 === undefined) {
            combioption3 = '';
        } else {
            combioption3 = this.combinationoption3.src;
        }
        let errors = {}
        if (combinationquestion === '' || combinationquestion === undefined) errors.question = 'Enter Question'
        if (combinationname === '' || combinationname === undefined) errors.name = 'Upload Question Image'
        if (combioption1 === '' || combioption1 === undefined) errors.combioption1 = 'Upload Image 1'
        if (combioption2 === '' || combioption2 === undefined) errors.combioption2 = 'Upload Image 2'
        if (combioption3 === '' || combioption3 === undefined) errors.combioption3 = 'Upload Image 3'
        if (combinationquestionType === '' || combinationquestionType === undefined) errors.questionType = 'Please fill QuestionType'
        if ((combinationcorrectAnswer === '' || combinationcorrectAnswer === undefined) && (combinationquestionType === 'Question')) errors.selectAnswer = 'Please select an answer'
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            const combinationquestionType = this.combinationquestionType.state.value;
            const combinationcorrectAnswer = this.combinationcorrectAnswer.state.value
            this.props.fncombiEdit(this.props.counter, this.props.combinationid,
                this.combinationquestion.refs.input.value.trim(), this.combinationimage.src,
                this.combinationoption1.src,
                this.combinationoption2.src, this.combinationoption3.src,
                combinationquestionType, combinationcorrectAnswer);
        }

    }
    addComb = (a) => {
        var combinationquestionType = this.combinationquestionType1.state.value;
        var combinationcorrectAnswer = this.combinationcorrectAnswer1.state.value;
        var combinationquestion = this.combinationquestion1.refs.input.value.trim();
        var combinationname; var combioption1; var combioption2; var combioption3;
        if (this.combinationimage1 === undefined) {
            combinationname = '';
        } else {
            combinationname = this.combinationimage1.src;
        }
        if (this.combinationoption11 === undefined) {
            combioption1 = '';
        } else {
            combioption1 = this.combinationoption11.src;
        }
        if (this.combinationoption22 === undefined) {
            combioption2 = '';
        } else {
            combioption2 = this.combinationoption22.src;
        }
        if (this.combinationoption33 === undefined) {
            combioption3 = '';
        } else {
            combioption3 = this.combinationoption33.src;
        }
        let errors = {}
        if (combinationquestion === '' || combinationquestion === undefined) errors.question = 'Enter Question'
        if (combinationname === '' || combinationname === undefined) errors.name = 'Upload Question Image'
        if (combioption1 === '' || combioption1 === undefined) errors.combioption1 = 'Upload Image 1'
        if (combioption2 === '' || combioption2 === undefined) errors.combioption2 = 'Upload Image 2'
        if (combioption3 === '' || combioption3 === undefined) errors.combioption3 = 'Upload Image 3'
        if (combinationquestionType === '' || combinationquestionType === undefined) errors.questionType = 'Please fill QuestionType'
        if ((combinationcorrectAnswer === '' || combinationcorrectAnswer === undefined) && (combinationquestionType === 'Question')) errors.selectAnswer = 'Please select an answer'
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.props.contentPackCombi(
                this.combinationquestion1.refs.input.value.trim(), this.combinationimage1.src,
                this.combinationoption11.src, this.combinationoption22.src, this.combinationoption33.src, this.combinationquestionType1.state.value, this.combinationcorrectAnswer1.state.value
            );

            $(".removecombiForm").hide();
            this.props.hideDiv(a);
        }
    }
    confirm = () => {
        this.props.fnRemove();
    }
    render() {
        var a = this.props.counterid;
        if (this.props.combinationquestion === undefined) {
            return (
                <div className="removecombiForm">
                    <Row>
                        <Col span={6} xl={{span:2}} className="cfuntowinadd">
                            <h6 className='h6Fnt'>Select Answer</h6>
                        </Col>
                        <Col span={16} className="cfuntowinadd">
                            <RadioGroup value={this.state.combinationquestionType1}
                                onChange={this.onRadioChange1}
                                ref={RadioGroup => this.combinationquestionType1 = RadioGroup} >
                                <Radio value='Opinion' >Opinion</Radio>
                                <Radio value='Question'>Question</Radio>
                            </RadioGroup>
                            <p className="fun2WinQuestionError">{this.state.errors.questionType}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={14} className="cfuntowinadd">
                            <FormItem>
                                <Input placeholder="Enter Question" id="combinationquestion"
                                    maxLength={75} name="combinationquestion"
                                    autoComplete={'off'}
                                    ref={node => this.combinationquestion1 = node} />
                                <p className="fun2WinQuestionError">{this.state.errors.question}</p>
                            </FormItem>
                        </Col>
                        <Col span={1}>
                            <span>
                                <a data-tip data-for='globalCombination'>  <Icon className="mrgnIconleft46" type="exclamation-circle-o" /> </a>
                                <ReactTooltip id='globalCombination' aria-haspopup='true' role='example'>
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
                    <Row>
                        <Col span={4}>
                            <Col span={24} className="marginRight356 QuestionEditCombination">
                                <div className="cfunguploadimg">
                                    <Upload {...props}
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        onChange={this.uploadImages.bind(this, 'combinationname')}
                                        accept=".png,.jpg,.jpeg"
                                    >
                                        {
                                            this.state.combinationname ?
                                                <img src={this.state.combinationname}
                                                    alt="" className="avatar" ref={c => this.combinationimage1 = c} /> :
                                                <Icon type="picture" className="avatar-uploader-trigger" />
                                        }
                                    </Upload>
                                </div>
                                <p className="fun2WinQuestionError">{this.state.errors.name}</p>
                            </Col>
                        </Col>
                        <Col span={20}>
                            <RadioGroup disabled={this.state.combradioState1}
                                ref={RadioGroup => this.combinationcorrectAnswer1 = RadioGroup}

                                style={{ width: '100%' }}>
                                <Col span={4} className="marginRight356">
                                    <div className="cfunguploadimg">
                                        <Radio value={1}>  </Radio>
                                        <Upload {...props}
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            onChange={this.uploadImages.bind(this, 'combioption1')}
                                            accept=".png,.jpg,.jpeg"
                                        >
                                            {
                                                this.state.combioption1 ?
                                                    <img src={this.state.combioption1}
                                                        alt="" className="avatar" ref={c => this.combinationoption11 = c} /> :
                                                    <Icon type="picture" className="avatar-uploader-trigger" />
                                            }
                                        </Upload>

                                    </div>
                                    <p className="fun2WinQuestionError">{this.state.errors.combioption1}</p>

                                </Col>

                                <Col span={4} className="marginRight356">
                                    <div className="cfunguploadimg">
                                        <Radio value={2}>  </Radio>
                                        <Upload {...props}
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            onChange={this.uploadImages.bind(this, 'combioption2')}
                                            accept=".png,.jpg,.jpeg"
                                        >
                                            {
                                                this.state.combioption2 ?
                                                    <img src={this.state.combioption2}
                                                        alt="" className="avatar" ref={c => this.combinationoption22 = c} /> :
                                                    <Icon type="picture" className="avatar-uploader-trigger" />
                                            }
                                        </Upload>
                                    </div>
                                    <p className="fun2WinQuestionError">{this.state.errors.combioption2}</p>
                                </Col>
                                <Col span={4} className="marginRight356">
                                    <div className="cfunguploadimg">
                                        <Radio value={3}> </Radio>
                                        <Upload {...props}
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            onChange={this.uploadImages.bind(this, 'combioption3')}
                                            accept=".png,.jpg,.jpeg"
                                        >
                                            {
                                                this.state.combioption3 ?
                                                    <img src={this.state.combioption3}
                                                        alt="" className="avatar" ref={c => this.combinationoption33 = c} /> :
                                                    <Icon type="picture" className="avatar-uploader-trigger" />
                                            }
                                        </Upload>
                                    </div>
                                    <p className="fun2WinQuestionError">{this.state.errors.combioption3}</p>
                                </Col>
                            </RadioGroup>
                        </Col>
                    </Row>
                    <Row>
                        <p className="fun2WinQuestionError">{this.state.errors.selectAnswer}</p>
                    </Row>
                    <Row>
                        <Col span={15} className="cfuntowinadd">
                            <h6 className='h6Fnt'>Please Select Answer Through CheckBox</h6>
                        </Col>
                        <Col span={6} offset={17} className="cfuntowinQbtn cfuntowinaddsbtns">
                            <Button type="primary" className='createFun2Win' onClick={this.addComb.bind(this, a)}>
                                ADD</Button>
                        </Col>
                    </Row>
                </div>
            );
        }
        else if (this.props.combinationquestion !== '') {
            var packEdit = (!this.props.editable) ?
                (<div>
                    <Row>
                        <Col span={12}>
                       
                            <h4 className="FontBold"><span>{parseInt(this.state.counter) + 1+")"}</span> <span>{this.props.questionCategory} Type</span></h4>
                        </Col>
                        <Col span={4}>
                            {editBtn}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} className="">

                            <p className="questionPara" title={this.props.combinationquestion}>{this.props.combinationquestion}</p>
                        </Col>
                    </Row></div>) :
                (<div>
                    <Row>
                   
                        <h4 className="FontBold"><span>{parseInt(this.state.counter) + 1}</span> <span>{this.props.questionCategory} Type</span></h4>
                        <Col span={6} className="cfuntowinadd">
                            <h6 className='h6Fnt'>Select Answer</h6>
                        </Col>
                        <Col span={16} className="cfuntowinadd">
                            <RadioGroup defaultValue={this.props.combinationquestionType}
                                onChange={this.onRadioChange}
                                ref={RadioGroup => this.combinationquestionType = RadioGroup} >
                                <Radio value='Opinion' >Opinion</Radio>
                                <Radio value='Question'>Question</Radio>
                            </RadioGroup>
                            <p className="fun2WinQuestionError">{this.state.errors.questionType}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={23} className="cfuntowinadd">
                            <FormItem>
                                <Input placeholder="Enter Question" id="combinationquestion"
                                    maxLength={75} name="combinationquestion"
                                    defaultValue={this.props.combinationquestion}
                                    ref={node => this.combinationquestion = node} onChange={this.onInputChange.bind(this)} />
                                <p className="fun2WinQuestionError">{this.state.errors.question}</p>
                            </FormItem>
                        </Col>
                        <Col span={1}>
                            <span>

                                <a data-tip data-for='globalCombination'>  <Icon className="mrgnIconleft46" type="exclamation-circle-o" /> </a>
                                <ReactTooltip id='globalCombination' aria-haspopup='true' role='example'>
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
                        <Col span={5}>
                            <Col span={24} className="marginRight356 fun2WinEditCombinationQuestion">
                                <div className="fun2winuploadcombination">
                                    <Upload {...props}
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        onChange={this.uploadImages.bind(this, 'combinationname')}
                                        accept=".png,.jpg,.jpeg"
                                    >
                                        {
                                            this.props.combinationimage ?
                                                <img src={this.state.combinationname === '' ? this.props.combinationimage : this.state.combinationname}
                                                    alt="" className="avatar" ref={c => this.combinationimage = c} /> :
                                                <Icon type="picture" className="avatar-uploader-trigger" />
                                        }
                                    </Upload>
                                </div>

                                <p className="fun2WinQuestionError">{this.state.errors.name}</p>
                            </Col>
                        </Col>
                        <Col span={19}>
                            <RadioGroup disabled={this.state.combradioState}
                                ref={RadioGroup => this.combinationcorrectAnswer = RadioGroup}
                                defaultValue={this.props.combinationcorrectAnswer}
                                style={{ width: '100%' }}>
                                <Col span={5} className="marginRight356">
                                    <div className="fun2winuploadcombination">
                                        <Radio value={1}>  </Radio>

                                        <Upload {...props}
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            onChange={this.uploadImages.bind(this, 'combioption1')}
                                            accept=".png,.jpg,.jpeg"
                                        >
                                            {
                                                this.props.combinationoption1 ?
                                                    <img src={this.state.combioption1 === '' ? this.props.combinationoption1 : this.state.combioption1}
                                                        alt="" className="avatar" ref={c => this.combinationoption1 = c} /> :
                                                    <Icon type="picture" className="avatar-uploader-trigger" />
                                            }
                                        </Upload>

                                    </div>
                                    <p className="fun2WinQuestionError">{this.state.errors.combioption1}</p>

                                </Col>

                                <Col span={5} className="marginRight356">
                                    <div className="fun2winuploadcombination">
                                        <Radio value={2}>  </Radio>
                                        <Upload {...props}
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            onChange={this.uploadImages.bind(this, 'combioption2')}
                                            accept=".png,.jpg,.jpeg"
                                        >
                                            {
                                                this.props.combinationoption2 ?
                                                    <img src={this.state.combioption2 === '' ? this.props.combinationoption2 : this.state.combioption2}
                                                        alt="" className="avatar" ref={c => this.combinationoption2 = c} /> :
                                                    <Icon type="picture" className="avatar-uploader-trigger" />
                                            }
                                        </Upload>
                                    </div>
                                    <p className="fun2WinQuestionError">{this.state.errors.combioption2}</p>
                                </Col>
                                <Col span={5} className="marginRight356">
                                    <div className="fun2winuploadcombination">
                                        <Radio value={3}> </Radio>
                                        <Upload {...props}
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            onChange={this.uploadImages.bind(this, 'combioption3')}
                                            accept=".png,.jpg,.jpeg"
                                        >
                                            {
                                                this.props.combinationoption3 ?
                                                    <img src={this.state.combioption3 === '' ? this.props.combinationoption3 : this.state.combioption3}
                                                        alt="" className="avatar" ref={c => this.combinationoption3 = c} /> :
                                                    <Icon type="picture" className="avatar-uploader-trigger" />
                                            }
                                        </Upload>
                                    </div>
                                    <p className="fun2WinQuestionError">{this.state.errors.combioption3}</p>
                                </Col>
                            </RadioGroup>
                        </Col>
                    </Row>
                    <Row>
                        <p className="fun2WinQuestionError">{this.state.errors.selectAnswer}</p>
                    </Row>
                    <Row>
                        <Col span={15} className="cfuntowinadd">
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
                (<Button className="editsaveBtn" onClick={this.props.fnEnableEdit}><Icon type="edit" /></Button>);

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

export default CombinationPack2;
/* eslint-disable */