/* eslint-disable */
import React from 'react';
import $ from "jquery";
import ReactTooltip from 'react-tooltip';
import css from '../CreateFun2WinEdit.css';
import { Form, Icon, Input, Checkbox, Col, Row, Upload, message, Radio,Popconfirm, Button } from 'antd';
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
            message.success(`Image uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

class ImagePack2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imagequestion: '',
            imagename: '',
            imageoption1: '',
            imageoption2: '',
            imageoption3: '',
            imagecheckbox1: '',
            imagecheckbox2: '',
            imagecheckbox3: '',
            imagecorrectAnswer: '',
            errors: {},
            imagebutton: true,
            imageid: '',
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
        if (this.state[e.target.id] === '') this.state.errors[e.target.id] = ''

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
    onCheckBoxChange = (e) => {
        if (e.target.value !== '') this.state.errors.correctAnswer = '';
        if (e.target.value.includes("imgAns1") && e.target.checked) {
            this.setState({
                imagecheckbox1: true,
                imagecheckbox2: false,
                imagecheckbox3: false,
                imagecorrectAnswer: 1,
            })
        }
        else if (e.target.value.includes("imgAns2") && e.target.checked) {
            this.setState({
                imagecheckbox1: false,
                imagecheckbox2: true,
                imagecheckbox3: false,
                imagecorrectAnswer: 2,
            })
        }
        else if (e.target.value.includes("imgAns3") && e.target.checked) {
            this.setState({
                imagecheckbox1: false,
                imagecheckbox2: false,
                imagecheckbox3: true,
                imagecorrectAnswer: 3,
            })
        }
    }
    handlepackEdit(e) {
        var imagequestion = this.imagequestion.refs.input.value.trim();
        var imagecorrectAnswer = this.imagecorrectAnswer.state.value
        var imageoption1 = this.imageoption1.refs.input.value.trim()
        var imageoption2 = this.imageoption2.refs.input.value.trim()
        var imageoption3 = this.imageoption3.refs.input.value.trim()
        var imagename;
        if (this.imageimage === undefined) {
            imagename = '';
        } else {
            imagename = this.imageimage.src;
        }
        let errors = {}
        if (imagequestion === '' || imagequestion === undefined) errors.question = 'Fill Question'
        if (imagename === '' || imagename === undefined) errors.name = 'Upload Question\'s Image'
        if (imageoption1 === '' || imageoption1 === undefined) errors.imageoption1 = 'Fill Option 1'
        if (imageoption2 === '' || imageoption2 === undefined) errors.imageoption2 = 'Fill Option 2'
        if (imageoption3 === '' || imageoption3 === undefined) errors.imageoption3 = 'Fill Option 3'
        if ((imagecorrectAnswer === '' || imagecorrectAnswer === undefined)) errors.correctAnswer = 'Select Answer'
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            const imagecorrectAnswer = this.imagecorrectAnswer.state.value
            this.props.fnimageEdit(this.props.counter, this.props.imageid,
                this.imagequestion.refs.input.value.trim(), this.imageimage.src, this.imageoption1.refs.input.value.trim(),
                this.imageoption2.refs.input.value.trim(), this.imageoption3.refs.input.value.trim(),
                imagecorrectAnswer);
        }
    }
    addImage = (a) => {
        var imagequestion = this.imagequestion1.refs.input.value.trim();
        var imagecorrectAnswer = this.imagecorrectAnswer1.state.value
        var imageoption1 = this.imageoption11.refs.input.value.trim()
        var imageoption2 = this.imageoption22.refs.input.value.trim()
        var imageoption3 = this.imageoption33.refs.input.value.trim()
        var imagename;
        if (this.imageimage1 === undefined) {
            imagename = '';
        } else {
            imagename = this.imageimage1.src;
        }
        let errors = {}
        if (imagequestion === '' || imagequestion === undefined) errors.question = 'Fill Question'
        if (imagename === '' || imagename === undefined) errors.name = 'Upload Question\'s Image'
        if (imageoption1 === '' || imageoption1 === undefined) errors.imageoption1 = 'Fill Option 1'
        if (imageoption2 === '' || imageoption2 === undefined) errors.imageoption2 = 'Fill Option 2'
        if (imageoption3 === '' || imageoption3 === undefined) errors.imageoption3 = 'Fill Option 3'
        if ((imagecorrectAnswer === '' || imagecorrectAnswer === undefined)) errors.correctAnswer = 'Select Answer'
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.props.contentPackImage(
                this.imagequestion1.refs.input.value.trim(), this.imageimage1.src, this.imageoption11.refs.input.value.trim(),
                this.imageoption22.refs.input.value.trim(), this.imageoption33.refs.input.value.trim(), this.imagecorrectAnswer1.state.value
            );
            $(".removeimageForm").hide();
            this.props.hideDiv(a);
        }
    }
    confirm = () => {
        this.props.fnRemove();
    }
    render() {
        var a = this.props.counterid;
        if (this.props.imagequestion === undefined) {
            return (
                <div className="removeimageForm">
                    <Row>
                        <Col span={14} className="cfuntowinadd">
                            <FormItem>
                                <Input placeholder="Enter Question" id="imagequestion"
                                    maxLength={75} name="imagequestion" autoComplete={'off'}
                                    ref={c => this.imagequestion1 = c} />
                                <span className="fun2WinQuestionError">{this.state.errors.question}</span>
                            </FormItem>
                        </Col>
                        <Col span={1}>
                            <span>
                                <a data-tip data-for='globalImage'>  <Icon className="mrgnIconleft46" type="exclamation-circle-o" /> </a>
                                <ReactTooltip id='globalImage' aria-haspopup='true' role='example'>
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
                        <Col span={5} className="">
                            <div className="cfunguploadimgs">
                                <Upload {...props}
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    onChange={this.uploadImages.bind(this, 'imagename')}
                                    accept=".png,.jpg,.jpeg"
                                >
                                    {
                                        this.state.imagename ?
                                            <img src={this.state.imagename}
                                                alt="" className="avatar" ref={node => this.imageimage1 = node} /> :
                                            <Icon type="picture" style={{ paddingBottom: '40px' }} className="avatar-uploader-trigger" />
                                    }
                                </Upload>
                            </div>
                            <p className="fun2WinQuestionError">{this.state.errors.name}</p>
                        </Col>
                        <Col span={18} className="">
                            <RadioGroup
                                ref={RadioGroup => this.imagecorrectAnswer1 = RadioGroup}

                                style={{ width: '100%' }}>
                                <Row className="marginBottom14">
                                    <Col span={1} className="">
                                        <Radio value={1}>
                                        </Radio>
                                    </Col>
                                    <Col span={11} className="">
                                        <Input placeholder="Option 1" id='imageoption1' maxLength={30} name=""
                                            ref={c => this.imageoption11 = c} />
                                        <p className="fun2WinQuestionError">{this.state.errors.imageoption1}</p>
                                    </Col>
                                    <Col span={1}>
                                        <span>
                                            <a data-tip data-for='globalImage1'>  <Icon className="mrgleft10" type="exclamation-circle-o" /> </a>
                                            <ReactTooltip id='globalImage1' aria-haspopup='true' role='example'>
                                                <ol>
                                                    <li>Contest Answer is Required </li>
                                                </ol>
                                            </ReactTooltip>
                                        </span>

                                    </Col>

                                </Row>
                                <Row className="marginBottom14">
                                    <Col span={1} className="">
                                        <Radio value={2}>
                                        </Radio>
                                    </Col>
                                    <Col span={11} className="">
                                        <Input placeholder="Option 2" id='imageoption2' maxLength={30} name=""
                                            ref={c => this.imageoption22 = c} />
                                        <p className="fun2WinQuestionError">{this.state.errors.imageoption2}</p>
                                    </Col>
                                    <Col span={1}>
                                        <span>
                                            <a data-tip data-for='globalImage2'>  <Icon className="mrgleft10" type="exclamation-circle-o" /> </a>
                                            <ReactTooltip id='globalImage2' aria-haspopup='true' role='example'>
                                                <ol>
                                                    <li>Contest Answer is Required </li>
                                                </ol>
                                            </ReactTooltip>
                                        </span>

                                    </Col>


                                </Row>
                                <Row className="marginBottom14">
                                    <Col span={1} className="">
                                        <Radio value={3}>
                                        </Radio>
                                    </Col>
                                    <Col span={11} className="">
                                        <Input placeholder="Option 3" id='imageoption3' maxLength={30} name=""
                                            ref={node => this.imageoption33 = node} />
                                        <p className="fun2WinQuestionError">{this.state.errors.imageoption3}</p>
                                    </Col>
                                    <Col span={1}>
                                        <span>
                                            <a data-tip data-for='globalImage3'>  <Icon className="mrgleft10" type="exclamation-circle-o" /> </a>
                                            <ReactTooltip id='globalImage3' aria-haspopup='true' role='example'>
                                                <ol>
                                                    <li>Contest Answer is Required </li>
                                                </ol>
                                            </ReactTooltip>
                                        </span>

                                    </Col>


                                </Row>
                                <Row>
                                    <p className="fun2WinQuestionError">{this.state.errors.correctAnswer}</p>
                                </Row>
                            </RadioGroup>
                        </Col>

                    </Row>
                    <Row>
                        <Col span={15} className="cfuntowinadd">
                            <h6 className='h6Fnt'>Please Select Answer Through CheckBox</h6>

                        </Col>
                        <Col span={6} offset={17} className="cfuntowinQbtn cfuntowinadd">
                            <Button type="primary" className='createFun2Win' onClick={this.addImage.bind(this, a)}>
                                ADD</Button>
                        </Col>
                    </Row>

                </div>
            );
        }
        else if (this.props.imagequestion != '') {
            var packEdit = (!this.props.editable) ?
                (<div>
                    <Row>
                        <Col span={12}>
                            <h4></h4>

                            <h4><span className="Fun2winEditQuestionno">{parseInt(this.state.counter) + 1+")"}</span> <span className="FontBold">{this.props.questionCategory} Type</span></h4>
                        </Col>
                        <Col span={4}>
                            {editBtn}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} className="">
                            <p className="questionPara" title={this.props.imagequestion}>{this.props.imagequestion}</p>
                        </Col>
                    </Row>

                </div>) :
                (<div>
                    <Row>
                        <h4></h4>
                        <h4><span className="Fun2winEditQuestionno">{parseInt(this.state.counter) + 1+")"}</span> <span className="FontBold">{this.props.questionCategory} Type</span></h4>
                        <Col span={23} className="cfuntowinadd">
                            <FormItem>
                                <Input placeholder="Enter Question" id="imagequestion"
                                    maxLength={75} name="imagequestion" defaultValue={this.props.imagequestion}
                                    onChange={this.onInputChange.bind(this)} ref={c => this.imagequestion = c} />
                                <span className="fun2WinQuestionError">{this.state.errors.question}</span>
                            </FormItem>
                        </Col>
                        <Col span={1}>
                            <span>
                                <a data-tip data-for='globalImage'>  <Icon className="mrgnIconleft46" type="exclamation-circle-o" /> </a>
                                <ReactTooltip id='globalImage' aria-haspopup='true' role='example'>
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
                        <Col span={9} className="">
                            <div className="cfunguploadimgsEdit">
                                <Upload {...props}
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    onChange={this.uploadImages.bind(this, 'imagename')}
                                    accept=".png,.jpg,.jpeg"
                                >
                                    {
                                        this.props.imageimage ?
                                            <img src={this.state.imagename === '' ? this.props.imageimage : this.state.imagename}
                                                alt="" className="avatar" ref={node => this.imageimage = node} /> :
                                            <Icon type="picture" style={{ paddingBottom: '40px' }} className="avatar-uploader-trigger" />
                                    }
                                </Upload>
                            </div>
                            <p className="fun2WinQuestionError">{this.state.errors.name}</p>
                        </Col>
                        <Col span={15} className="">
                            <RadioGroup
                                ref={RadioGroup => this.imagecorrectAnswer = RadioGroup}
                                defaultValue={this.props.imagecorrectAnswer}
                                style={{ width: '100%' }}>
                                <Row className="marginBottom14">
                                    <Col span={2} className="">
                                        <Radio value={1}>
                                        </Radio>
                                    </Col>
                                    <Col span={13} className="">
                                        <Input placeholder="Option 1" id='imageoption1' maxLength={30} name=""
                                            defaultValue={this.props.imageoption1} ref={c => this.imageoption1 = c} onChange={this.onInputChange.bind(this)} />
                                        <p className="fun2WinQuestionError">{this.state.errors.imageoption1}</p>
                                    </Col>
                                    <Col span={1}>
                                        <span>
                                            <a data-tip data-for='globalImage1'>  <Icon className="mrgleft10" type="exclamation-circle-o" /> </a>
                                            <ReactTooltip id='globalImage1' aria-haspopup='true' role='example'>
                                                <ol>
                                                    <li>Contest Answer is Required </li>
                                                </ol>
                                            </ReactTooltip>
                                        </span>

                                    </Col>

                                </Row>
                                <Row className="marginBottom14">
                                    <Col span={2} className="">
                                        <Radio value={2}>
                                        </Radio>
                                    </Col>
                                    <Col span={13} className="">
                                        <Input placeholder="Option 2" id='imageoption2' maxLength={30} name=""
                                            defaultValue={this.props.imageoption2} ref={c => this.imageoption2 = c} onChange={this.onInputChange.bind(this)} />
                                        <p className="fun2WinQuestionError">{this.state.errors.imageoption2}</p>
                                    </Col>
                                    <Col span={1}>
                                        <span>
                                            <a data-tip data-for='globalImage2'>  <Icon className="mrgleft10" type="exclamation-circle-o" /> </a>
                                            <ReactTooltip id='globalImage2' aria-haspopup='true' role='example'>
                                                <ol>
                                                    <li>Contest Answer is Required </li>
                                                </ol>
                                            </ReactTooltip>
                                        </span>

                                    </Col>


                                </Row>
                                <Row className="marginBottom14">
                                    <Col span={2} className="">
                                        <Radio value={3}>
                                        </Radio>
                                    </Col>
                                    <Col span={13} className="">
                                        <Input placeholder="Option 3" id='imageoption3' maxLength={30} name=""
                                            defaultValue={this.props.imageoption3} ref={node => this.imageoption3 = node} onChange={this.onInputChange.bind(this)} />
                                        <p className="fun2WinQuestionError">{this.state.errors.imageoption3}</p>
                                    </Col>
                                    <Col span={1}>
                                        <span>
                                            <a data-tip data-for='globalImage3'>  <Icon className="mrgleft10" type="exclamation-circle-o" /> </a>
                                            <ReactTooltip id='globalImage3' aria-haspopup='true' role='example'>
                                                <ol>
                                                    <li>Contest Answer is Required </li>
                                                </ol>
                                            </ReactTooltip>
                                        </span>

                                    </Col>


                                </Row>
                                <Row>
                                    <p className="fun2WinQuestionError">{this.state.errors.correctAnswer}</p>
                                </Row>
                            </RadioGroup>
                        </Col>

                    </Row>
                    <Row>
                        <Col span={15} className="cfuntowinadd">
                            <h6 className='h6Fnt'>Please Select Answer Through CheckBox</h6>

                        </Col>
                        <Col span={6} offset={13} className="cfuntowinQbtn cfuntowinadd">
                        </Col>
                    </Row>

                    {editBtn}
                </div>
                );

            var editBtn = (this.props.editable) ?
                (<Button className="editsaveBtn" onClick={this.handlepackEdit.bind(this)}>
                    <Icon type="save" />
                </Button>) :
                (<Button className="editsaveBtn" onClick={this.props.fnEnableEdit}>
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

export default ImagePack2;
/* eslint-disable */