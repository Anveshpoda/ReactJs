/* eslint-disable */
import React from 'react';
import $ from "jquery";
import ReactTooltip from 'react-tooltip';
import css from '../CreateFun2WinEdit.css';
import { Form, Icon, Input, Tooltip, Button, Checkbox, Col, Row, Radio, message,Popconfirm, Select } from 'antd';
const Option = Select.Option;

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
    marginTop: '18px',
    width: "100%"
};

class MultiplePack2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            multiquestion: '',
            multipleoption1: '',
            multipleoption2: '',
            multipleoption3: '',
            multipleoption4: '',
            multiquestionType: '',
            multicorrectAnswer: '',
            errors: {},
            multiradioState: false,
            multi: '',
            questionCategory: '',
            multicorrectAns: '',
            questions: [],
            multibutton: true,
            multiid: '',
            multiquestionType1: '',
            multiradioState1: false,
            counter: ''
        }
    }
    componentWillReceiveProps(newProps) {
        this.setState({ counter: newProps.counter })
    }
    componentDidMount() {
        this.setState({ counter: this.props.counter });
        if (this.props.multiquestionType === "Question") {
            this.setState({
                multiradioState: false
            })
        } else if (this.props.multiquestionType === "Opinion") {
            this.setState({
                multiradioState: true
            })
        }
    }

    onRadioChange = (e) => {
        const qType = e.target.value;
        this.setState({
            multiquestionType: qType
        })
        if (e.target.value.includes("Question")) {
            this.setState({
                multiradioState: false
            })
        }
        else if (e.target.value.includes("Opinion")) {
            this.setState({
                multiradioState: true
            })
        }
    }
    onRadioChange1 = (e) => {
        const qType = e.target.value;
        this.setState({
            multiquestionType1: qType
        })
        if (e.target.value.includes("Question")) {
            this.setState({
                multiradioState1: false
            })
        }
        else if (e.target.value.includes("Opinion")) {
            this.setState({
                multiradioState1: true
            })
        }
    }
    onInputChange = (e) => {
        if (this.state.multiplequestion != '') this.state.errors.question = ''
        if (this.state.multipleoption1 != '') this.state.errors.multipleOption1 = ''
        if (this.state.multipleoption2 != '') this.state.errors.multipleOption2 = ''
        if (this.state.multipleoption3 != '') this.state.errors.multipleOption3 = ''
        if (this.state.multipleoption4 != '') this.state.errors.multipleOption4 = ''
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    onAnswerChange = (e) => {
    }
    addMultiple = (a, fff) => {
        var multiquestion1 = this.multiquestion1.refs.input.value.trim()
        var multioption11 = this.multioption11.refs.input.value.trim()
        var multioption22 = this.multioption22.refs.input.value.trim()
        var multioption33 = this.multioption33.refs.input.value.trim()
        var multioption44 = this.multioption44.refs.input.value.trim()
        let errors = {}
        if (multiquestion1 === '' || multiquestion1 === undefined) errors.question = 'Enter Question'
        if (multioption11 === '' || multioption11 === undefined) errors.multipleOption1 = 'Enter Option 1'
        if (multioption22 === '' || multioption22 === undefined) errors.multipleOption2 = 'Enter Option 2'
        if (multioption33 === '' || multioption33 === undefined) errors.multipleOption3 = 'Enter Option 3'
        if (multioption44 === '' || multioption44 === undefined) errors.multipleOption4 = 'Enter Option 4'
        if (this.multiquestionType1.state.value === '' || this.multiquestionType1.state.value === undefined) errors.questionType = 'Please Select Question Type'
        if ((this.multicorrectAnswer1.state.value === '' || this.multicorrectAnswer1.state.value === undefined) && (this.multiquestionType1.state.value === 'Question')) errors.selectAnswer = 'Please select an answer'
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.props.contentPack(
                this.multiquestionType1.state.value, this.multicorrectAnswer1.state.value, this.multiquestion1.refs.input.value.trim(),
                this.multioption11.refs.input.value.trim(), this.multioption22.refs.input.value.trim(), this.multioption33.refs.input.value.trim(),
                this.multioption44.refs.input.value.trim()
            );
            $(".removemultiForm").hide();
            this.props.hideDiv(a);
        }
    }
    handlepackEdit(e) {
        var multiquestion = this.multiquestion.refs.input.value.trim()
        var multioption1 = this.multioption1.refs.input.value.trim()
        var multioption2 = this.multioption2.refs.input.value.trim()
        var multioption3 = this.multioption3.refs.input.value.trim()
        var multioption4 = this.multioption4.refs.input.value.trim()
        let errors = {}
        if (multiquestion === '' || multiquestion === undefined) errors.question = 'Enter Question'
        if (multioption1 === '' || multioption1 === undefined) errors.multipleOption1 = 'Enter Option 1'
        if (multioption2 === '' || multioption2 === undefined) errors.multipleOption2 = 'Enter Option 2'
        if (multioption3 === '' || multioption3 === undefined) errors.multipleOption3 = 'Enter Option 3'
        if (multioption4 === '' || multioption4 === undefined) errors.multipleOption4 = 'Enter Option 4'
        if (this.multiquestionType.state.value === '' || this.multiquestionType.state.value === undefined) errors.questionType = 'Please Select Question Type'
        if ((this.multicorrectAnswer.state.value === '' || this.multicorrectAnswer.state.value === undefined) && (this.multiquestionType.state.value === 'Question')) errors.selectAnswer = 'Please select an answer'
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            const multiquestionType = this.multiquestionType.state.value;
            const multicorrectAnswer = this.multicorrectAnswer.state.value
            this.props.fnmultiEdit(this.props.counter, this.props.multiid,
                this.multiquestion.refs.input.value.trim(), this.multioption1.refs.input.value.trim(),
                this.multioption2.refs.input.value.trim(), this.multioption3.refs.input.value.trim(), this.multioption4.refs.input.value.trim(),
                multiquestionType, multicorrectAnswer);
        }
    }
    confirm = () => {
        this.props.fnRemove();
    }
    render() {
        var fff = this.props.questionCategory
        var a = this.props.counterid;
        if (this.props.multiquestion === undefined) {
            return (
                <div className="removemultiForm">
                    <Row>

                        <Col span={3} className="cfuntowinadd">
                            <h6 className='h6Fnt'>Select Answer</h6>
                        </Col>

                        <Col span={16} className="cfuntowinadd">
                            <RadioGroup value={this.state.multiquestionType1} onChange={this.onRadioChange1}
                                ref={RadioGroup => this.multiquestionType1 = RadioGroup} >
                                <Radio value='Opinion'>Opinion</Radio>
                                <Radio value='Question'>Question</Radio>
                                <p className="fun2WinQuestionError">{this.state.errors.questionType}</p>
                            </RadioGroup>
                            <Row>
                                <p className="fun2WinQuestionError">{this.state.errors.selectAnswer}</p>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={14} className="cfuntowinadd">
                            <FormItem>
                                <Input placeholder="Enter Question" id="multiquestion" 
                                    ref={node => this.multiquestion1 = node} maxLength={75} name="multiquestion"
                                />
                                <p className="fun2WinQuestionError">{this.state.errors.question}</p>
                            </FormItem>
                        </Col>
                        <Col span={1}>
                            <span>
                                <a data-tip data-for='globalMultiple'>  <Icon className="mrgnIconleft46" type="exclamation-circle-o" /> </a>
                                <ReactTooltip id='globalMultiple' aria-haspopup='true' role='example'>
                                    <ol>
                                        <li>1. Length should not exceed 75 characters (With spaces)</li>
                                        <li>2. You must specify an answer for each question</li>
                                        <li>3. There will be no answer for Opinion type questions</li>
                                    </ol>
                                </ReactTooltip>
                            </span>
                        </Col>
                    </Row>

                    <Row className="marginBottom14">

                        <RadioGroup disabled={this.state.multiradioState1} ref={RadioGroup => this.multicorrectAnswer1 = RadioGroup}

                            style={{ width: '100%' }}>
                            <Row>
                                <Col span={7} className="EfuntowinQuestion">
                                    <Radio style={radioStyle} value={1}>
                                        <Input placeholder="option 1" id='multipleoption1' maxLength={30}
                                            name="multipleoption1"
                                            ref={node => this.multioption11 = node} />
                                        <p className="multipleP fun2WinQuestionError">{this.state.errors.multipleOption1}</p>
                                    </Radio>
                                </Col>
                                <Col span={1}>
                                    <span>
                                        <a data-tip data-for='globalMultiple1'>  <Icon className="mrgnIconleft40" type="exclamation-circle-o" /> </a>
                                        <ReactTooltip id='globalMultiple1' aria-haspopup='true' role='example'>
                                            <ol>
                                                <li>This field is mandatory</li>
                                            </ol>
                                        </ReactTooltip>
                                    </span>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={7} className="EfuntowinQuestion">
                                    <Radio style={radioStyle} value={2}>
                                        <Input placeholder="option 2" id='multipleoption2'
                                            maxLength={30} name="multipleoption2"
                                            ref={node => this.multioption22 = node}
                                        />
                                        <p className="multipleP fun2WinQuestionError">{this.state.errors.multipleOption2}</p>
                                    </Radio>

                                </Col>
                                <Col span={1}>
                                    <span>
                                        <a data-tip data-for='globalMultiple2'>  <Icon className="mrgnIconleft40" type="exclamation-circle-o" /> </a>
                                        <ReactTooltip id='globalMultiple2' aria-haspopup='true' role='example'>
                                            <ol>
                                                <li>This field is mandatory</li>
                                            </ol>
                                        </ReactTooltip>
                                    </span>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={7} className="EfuntowinQuestion">
                                    <Radio style={radioStyle} value={3}>
                                        <Input placeholder="option 3" id='multipleoption3'
                                            maxLength={30} name="multipleoption3"
                                            ref={node => this.multioption33 = node}
                                        />
                                        <p className="multipleP fun2WinQuestionError">{this.state.errors.multipleOption3}</p>
                                    </Radio>
                                </Col>
                                <Col span={1}>
                                    <span>
                                        <a data-tip data-for='globalMultiple3'>  <Icon className="mrgnIconleft40" type="exclamation-circle-o" /> </a>
                                        <ReactTooltip id='globalMultiple3' aria-haspopup='true' role='example'>
                                            <ol>
                                                <li>This field is mandatory</li>
                                            </ol>
                                        </ReactTooltip>
                                    </span>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={7} className="EfuntowinQuestion">
                                    <Radio style={radioStyle} value={4}>
                                        <Input placeholder="option 4" id='multipleoption4'
                                            maxLength={30} name="multipleoption4"
                                            ref={node => this.multioption44 = node}
                                        />
                                        <p className="multipleP fun2WinQuestionError">{this.state.errors.multipleOption4}</p>
                                    </Radio>
                                </Col>
                                <Col span={1}>
                                    <span>
                                        <a data-tip data-for='globalMultiple4'>  <Icon className="mrgnIconleft40" type="exclamation-circle-o" /> </a>
                                        <ReactTooltip id='globalMultiple4' aria-haspopup='true' role='example'>
                                            <ol>
                                                <li>This field is mandatory</li>
                                            </ol>
                                        </ReactTooltip>
                                    </span>
                                </Col>
                                <Col>
                                    <Button type="primary" className='createFun2Winmul' onClick={this.addMultiple.bind(this, a, fff)}>
                                        ADD</Button>
                                </Col>
                            </Row>
                        </RadioGroup>
                    </Row>

                </div>
            );
        }
        else if (this.props.multiquestion !== '') {
            var packEdit = (!this.props.editable) ?
                (

                    <div>
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
                                <p className="questionPara" title= {this.props.multiquestion}>{this.props.multiquestion}</p> </Col>
                        </Row></div>


                ) :
                (<div>

                    <Row>
                        
                        <h4><span className="Fun2winEditQuestionno">{parseInt(this.state.counter) + 1+")"}</span> <span className="FontBold">{this.props.questionCategory} Type</span></h4>
                        <Col span={6} className="cfuntowinadd">
                            <h6 className='h6Fnt'>Select Answer</h6>
                        </Col>
                        <Col span={16} className="cfuntowinadd">
                            <RadioGroup defaultValue={this.props.multiquestionType}
                                onChange={this.onRadioChange} ref={RadioGroup => this.multiquestionType = RadioGroup} >
                                <Radio value='Opinion'>Opinion</Radio>
                                <Radio value='Question'>Question</Radio>
                                <p className="fun2WinQuestionError">{this.state.errors.questionType}</p>
                            </RadioGroup>

                        </Col>
                    </Row>
                    <Row>
                        <p className="fun2WinQuestionError">{this.state.errors.selectAnswer}</p>
                    </Row>
                    <Row>
                        <Col span={22} className="cfuntowinadd">
                            <FormItem>
                                <Input placeholder="Enter Question" id="multiquestion"  autoComplete={'off'}
                                    ref={node => this.multiquestion = node} maxLength={75} name="multiquestion"
                                    defaultValue={this.props.multiquestion} />
                                <p className="fun2WinQuestionError">{this.state.errors.question}</p>
                            </FormItem>
                        </Col>
                        <Col span={1}>
                            <span>
                                <a data-tip data-for='globalMultiple'>  <Icon className="mrgnIconleft46" type="exclamation-circle-o" /> </a>
                                <ReactTooltip id='globalMultiple' aria-haspopup='true' role='example'>
                                    <ol>
                                        <li>1. Length should not exceed 75 characters (With spaces)</li>
                                        <li>2. You must specify an answer for each question</li>
                                        <li>3. There will be no answer for Opinion type questions</li>
                                    </ol>
                                </ReactTooltip>
                            </span>
                        </Col>
                    </Row>

                    <Row className="marginBottom14">

                        <RadioGroup disabled={this.state.multiradioState} ref={RadioGroup => this.multicorrectAnswer = RadioGroup}
                            defaultValue={this.props.multicorrectAnswer} onChange={this.onAnswerChange.bind(this)}
                            style={{ width: '100%' }}>
                            <Row>
                                <Col span={11} className="EfuntowinQuestion">
                                    <Radio style={radioStyle} value={1}>
                                        <Input placeholder="option 1" id='multipleoption1' maxLength={30}
                                            name="multipleoption1" defaultValue={this.props.multioption1}
                                            ref={node => this.multioption1 = node} onChange={this.onInputChange.bind(this)} />
                                        <p className="multipleP fun2WinQuestionError">{this.state.errors.multipleOption1}</p>
                                    </Radio>
                                </Col>
                                <Col span={1}>
                                    <span>
                                        <a data-tip data-for='globalMultiple1'>  <Icon className="mrgnIconleft40" type="exclamation-circle-o" /> </a>
                                        <ReactTooltip id='globalMultiple1' aria-haspopup='true' role='example'>
                                            <ol>
                                                <li>This field is mandatory</li>
                                            </ol>
                                        </ReactTooltip>
                                    </span>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={11} className="EfuntowinQuestion">
                                    <Radio style={radioStyle} value={2}>
                                        <Input placeholder="option 2" id='multipleoption2'
                                            maxLength={30} name="multipleoption2" defaultValue={this.props.multioption2}
                                            ref={node => this.multioption2 = node} onChange={this.onInputChange.bind(this)} />
                                        <p className="multipleP fun2WinQuestionError">{this.state.errors.multipleOption2}</p>
                                    </Radio>

                                </Col>
                                <Col span={1}>
                                    <span>
                                        <a data-tip data-for='globalMultiple2'>  <Icon className="mrgnIconleft40" type="exclamation-circle-o" /> </a>
                                        <ReactTooltip id='globalMultiple2' aria-haspopup='true' role='example'>
                                            <ol>
                                                <li>This field is mandatory</li>
                                            </ol>
                                        </ReactTooltip>
                                    </span>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={11} className="EfuntowinQuestion">
                                    <Radio style={radioStyle} value={3}>
                                        <Input placeholder="option 3" id='multipleoption3'
                                            maxLength={30} name="multipleoption3" defaultValue={this.props.multioption3}
                                            ref={node => this.multioption3 = node} onChange={this.onInputChange.bind(this)} />
                                        <p className="multipleP fun2WinQuestionError">{this.state.errors.multipleOption3}</p>
                                    </Radio>
                                </Col>
                                <Col span={1}>
                                    <span>
                                        <a data-tip data-for='globalMultiple3'>  <Icon className="mrgnIconleft40" type="exclamation-circle-o" /> </a>
                                        <ReactTooltip id='globalMultiple3' aria-haspopup='true' role='example'>
                                            <ol>
                                                <li>This field is mandatory</li>
                                            </ol>
                                        </ReactTooltip>
                                    </span>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={11} className="EfuntowinQuestion">
                                    <Radio style={radioStyle} value={4}>
                                        <Input placeholder="option 4" id='multipleoption4'
                                            maxLength={30} name="multipleoption4" defaultValue={this.props.multioption4}
                                            ref={node => this.multioption4 = node} onChange={this.onInputChange.bind(this)} />
                                        <p className="multipleP fun2WinQuestionError">{this.state.errors.multipleOption4}</p>
                                    </Radio>
                                </Col>
                                <Col span={1}>
                                    <span>
                                        <a data-tip data-for='globalMultiple4'>  <Icon className="mrgnIconleft40" type="exclamation-circle-o" /> </a>
                                        <ReactTooltip id='globalMultiple4' aria-haspopup='true' role='example'>
                                            <ol>
                                                <li>This field is mandatory</li>
                                            </ol>
                                        </ReactTooltip>
                                    </span>
                                </Col>
                            </Row>
                        </RadioGroup>
                    </Row>

                </div>);
            var editBtn = (this.props.editable) ?
                (<Button className="fun2winSavesbtns" onClick={this.handlepackEdit.bind(this)}> <Icon type="save" /></Button>) :
                (<Button className="editsaveBtn" onClick={this.props.fnEnableEdit}>
                    <Icon type="edit" /></Button>);

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

export default MultiplePack2;
/* eslint-disable */