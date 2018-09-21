/* eslint-disable */
import React from 'react';
import { Checkbox, Form, Select, Tabs, Button, Row, Col, Icon, Input, Upload, message } from 'antd';
import $ from 'jquery';
import { Scrollbars } from 'react-custom-scrollbars';
const Option = Select.Option;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;


class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 1;
        const panes = [
            {
                title: 'S.Q.1',
                key: 'SubQuestion1'
            }
        ];
        this.state = {
            category: '',
            activeKey: panes[0].key,
            panes,
            optionImageUploadArray: [1],
            combinationImage: '',
            errors: {}
        }
    }
    componentDidMount() {
        this.setState({
            category: this.props.questionCategory, queueId: this.props.questionId
        })
    }


    componentWillReceiveProps(newProps) {
        this.setState({
            category: newProps.questionCategory
        })
    }

    add = () => {
        const panes = this.state.panes;
        const activeKey = `SubQuestion${++this.newTabIndex}`;
        panes.push({ title: `S.Q.${this.state.panes.length + 1}`, key: activeKey });
        this.setState({ panes, activeKey });
    }

    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    }
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    onChange = (activeKey) => {
        this.setState({ activeKey });
    }

    addElementToArray = (key, e) => {
        if (this.state['optionMediaType' + key] === "Text") {
            let str = this.state['optionTextArray' + key][this.state['optionTextArray' + key].length - 1]
            let a = str.substring(str.indexOf("-") + 1, str.length)
            let element = key + '@OptionText-' + (parseInt(a) + 1)
            this.setState({
                ['optionTextArray' + key]: [...this.state['optionTextArray' + key], element],
                ['CB&' + element]: false
            })

        } else if (this.state['optionMediaType' + key] === "Image") {
            if (this.state['optionImageUploadArray' + key].length > 3) {
                message.info('You cannot add more than 4 images');
            } else {
                let str = this.state['optionImageUploadArray' + key][this.state['optionImageUploadArray' + key].length - 1]
                let a = str.substring(str.indexOf("-") + 1, str.length)
                let element = key + '@OptionImage-' + (parseInt(a) + 1)
                this.setState({
                    ['optionImageUploadArray' + key]: [...this.state['optionImageUploadArray' + key], element],
                    ['CB&' + element]: false
                })
            }

        } else if (this.state['optionMediaType' + key] === "Drag&Drop") {
            if (this.state['optionDragNDropArray' + key].length > 2) {
                message.info('You cannot add more than 3 images');
            } else {
                let str = this.state['optionDragNDropArray' + key][this.state['optionDragNDropArray' + key].length - 1]
                let a = str.substring(str.indexOf("-") + 1, str.length)
                let element = key + '@OptionDragNDrop-' + (parseInt(a) + 1)
                this.setState({
                    ['optionDragNDropArray' + key]: [...this.state['optionDragNDropArray' + key], element],
                    ['CB&' + element]: false
                })
            }

        }
    }

    handleAnswerTypeChange = (key, paneNumber, e) => {
        console.log(key, 'key', paneNumber, 'paneNumber', e, 'paneNumberpaneNumberpaneNumber')
        if (this.state[key]) this.state.errors[key] = ''
        if (e === "Text") {
            this.setState({
                [key]: e,
                ['optionTextArray' + paneNumber]: [paneNumber + '@OptionText-1'],
                ['CB&' + paneNumber + '@OptionText-1']: false,
                ['optionImageUploadArray' + paneNumber]: [],
                ['optionDragNDropArray' + paneNumber]: []
            })
            if (this.state['optionImageUploadArray' + paneNumber] != undefined) {
                this.state['optionImageUploadArray' + paneNumber].length > 0 ? this.state['optionImageUploadArray' + paneNumber].map((element) => {
                    this.setState({
                        [element]: ''
                    })
                }) : null
            }
            if (this.state['optionDragNDropArray' + paneNumber] != undefined) {
                this.state['optionDragNDropArray' + paneNumber].map((element) => {
                    this.setState({
                        [element]: ''
                    })
                })
            }
        } else if (e === "Image") {
            this.setState({
                [key]: e,
                ['optionImageUploadArray' + paneNumber]: [paneNumber + '@OptionImage-1'],
                ['CB&' + paneNumber + '@OptionImage-1']: false,
                ['optionTextArray' + paneNumber]: [],
                ['optionDragNDropArray' + paneNumber]: []
            })
            if (this.state['optionTextArray' + paneNumber] != undefined) {
                this.state['optionTextArray' + paneNumber].map((element) => {
                    this.setState({
                        [element]: ''
                    })
                })
            }
            if (this.state['optionDragNDropArray' + paneNumber] != undefined) {
                this.state['optionDragNDropArray' + paneNumber].map((element) => {
                    this.setState({
                        [element]: ''
                    })
                })
            }

        } else if (e === "Drag&Drop") {
            this.setState({
                [key]: e,
                ['optionDragNDropArray' + paneNumber]: [paneNumber + '@OptionDragNDrop-1'],
                ['CB&' + paneNumber + '@OptionDragNDrop-1']: false,
                ['optionTextArray' + paneNumber]: [],
                ['optionImageUploadArray' + paneNumber]: []
            })
            if (this.state['optionTextArray' + paneNumber] != undefined) {
                this.state['optionTextArray' + paneNumber].length > 0 ? this.state['optionTextArray' + paneNumber].map((element) => {
                    this.setState({
                        [element]: ''
                    })
                }) : null
            }
            if (this.state['optionImageUploadArray' + paneNumber] != undefined) {
                this.state['optionImageUploadArray' + paneNumber].length > 0 ? this.state['optionImageUploadArray' + paneNumber].map((element) => {
                    this.setState({
                        [element]: ''
                    })
                }) : null
            }
        }
    }

    handleDropDownChange = (key, e) => {
        console.log(key, 'key12', e, 'e12')
        if (this.state[key] && this.state.errors[key]) this.state.errors[key] = ''
        this.setState({
            [key]: e
        })
        // alert(key)
        console.log(this.state, 'asd')
    }


    handleInputChange = (e) => {
        if (this.state[e.target.name] && this.state.errors[e.target.name]) this.state.errors[e.target.name] = ''
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    handleOptionImageUpload = (image, info) => {
        if (info.file.status === 'done') {
            message.success(`Image uploaded successfully`);
            if (info.file.response.data !== '' && this.state.errors[image]) this.state.errors[image] = '';
            this.setState({
                [image]: info.file.response.data
            })
        }
    }

    deleteOptionContent = (key, e) => {
        if (key.includes("@OptionText")) {
            let questionNo = key.substring(0, key.indexOf("@"))
            if (this.state['optionTextArray' + questionNo].length === 1) {
                message.info(`First Option Cannot be deleted`)
            }
            else {
                this.setState({
                    ['optionTextArray' + questionNo]: this.state['optionTextArray' + questionNo].filter(record => record !== key),
                    [key]: undefined,
                    ["CB&" + key]: undefined
                })
            }

        } else if (key.includes("@OptionImage")) {
            let questionNo = key.substring(0, key.indexOf("@"))
            if (this.state['optionImageUploadArray' + questionNo].length === 1) {
                message.info(`First Option Cannot be deleted`)
            }
            else {
                this.setState({
                    ['optionImageUploadArray' + questionNo]: this.state['optionImageUploadArray' + questionNo].filter(record => record !== key),
                    [key]: undefined,
                    ["CB&" + key]: undefined
                })
            }
        } else if (key.includes("@OptionDragNDrop")) {
            let questionNo = key.substring(0, key.indexOf("@"))
            if (this.state['optionDragNDropArray' + questionNo].length === 1) {
                message.info(`First Option Cannot be deleted`)
            } else {
                this.setState({
                    ['optionDragNDropArray' + questionNo]: this.state['optionDragNDropArray' + questionNo].filter(record => record !== key),
                    [key]: undefined,
                    ["CB&" + key]: undefined
                })
            }

        }

    }

    onCheckBoxChange = (e) => {
        let substr = e.target.name.substring(e.target.name.indexOf("&") + 1, e.target.name.indexOf("@"))
        if (e.target.checked && this.state["optionAnswerType" + substr] === "QUESTION") {
            if (this.state.errors.correctAnswer) this.state.errors.correctAnswer = ''
            if (e.target.name.includes("Text")) {
                this.state["optionTextArray" + substr].map((element) => {
                    if (this.state["CB&" + element]) {
                        this.setState({
                            ["CB&" + element]: false
                        })
                    }
                })
                this.setState({
                    [e.target.name]: true
                })
            } else if (e.target.name.includes("Image")) {
                this.state["optionImageUploadArray" + substr].map((element) => {
                    if (this.state["CB&" + element]) {
                        this.setState({
                            ["CB&" + element]: false
                        })
                    }
                })
                this.setState({
                    [e.target.name]: true
                })
            } else if (e.target.name.includes("DragNDrop")) {
                this.state["optionDragNDropArray" + substr].map((element) => {
                    if (this.state["CB&" + element]) {
                        this.setState({
                            ["CB&" + element]: false
                        })
                    }
                })
                this.setState({
                    [e.target.name]: true
                })
            }
        }
        else {
            this.setState({
                [e.target.name]: false
            })
        }

    }

    saveQuestion = (key, e) => {
        let errors = {};
        let answerError = "Error";
        if (this.state[this.state.queueId + "@" + key] === "" || this.state[this.state.queueId + "@" + key] === undefined) errors[this.state.queueId + "@" + key] = "Fill the Question"
        if (this.state["optionAnswerType" + key] === "" || this.state["optionAnswerType" + key] === undefined) errors["optionAnswerType" + key] = "Select Question Type"
        if (this.state["optionMediaType" + key] === "" || this.state["optionMediaType" + key] === undefined) errors["optionMediaType" + key] = "Select Answers Type"
        if (this.state["optionMediaType" + key] === "Text") {
            this.state["optionTextArray" + key].map((record, index) => {
                if (this.state[record] === "" || this.state[record] === undefined) errors[record] = "Please enter the answer"
                if (this.state["CB&" + record]) answerError = ''
            })
        }
        if (this.state["optionMediaType" + key] === "Image") {
            this.state["optionImageUploadArray" + key].map((record, index) => {
                if (this.state[record] === "" || this.state[record] === undefined) errors[record] = "Please Upload the image"
                if (this.state["CB&" + record]) answerError = ''
            })
        }
        if (this.state["optionMediaType" + key] === "Drag&Drop") {
            this.state["optionDragNDropArray" + key].map((record, index) => {
                if (this.state[record] === "" || this.state[record] === undefined) errors[record] = "Please Upload the image"
                if (this.state["CB&" + record]) answerError = ''
            })
        }
        if (this.state["optionAnswerType" + key] === "QUESTION") {
            if (answerError) errors.correctAnswer = "Please Select the Answer";
        }
        this.setState({ errors })
        if (Object.keys(errors).length === 0) {
            let optionsType;
            let optionMediaType;
            let correctAnswer = 0;
            let options = []
            if (this.state["optionMediaType" + key] === "Text") {
                optionsType = "MULTIPLE"
                optionMediaType = 'text'
                this.state["optionTextArray" + key].map((record, index) => {
                    let obj = {}
                    // console.log("MULTIPLE", this.state[record], "Index", index)
                    if (this.state["CB&" + record] && this.state["optionAnswerType" + key] === "QUESTION") {
                        // console.log("Correct Answer", [this.state["CB&" + record]], index + 1)
                        correctAnswer = index + 1
                    }
                    obj.optionId = index + 1
                    obj.option = this.state[record]
                    options.push(obj)
                })
            }
            else if (this.state["optionMediaType" + key] === "Image") {
                if (this.state["optionImageUploadArray" + key].length === 4) {
                    optionsType = "GRID"
                    optionMediaType = 'image'
                    this.state["optionImageUploadArray" + key].map((record, index) => {
                        let obj = {}
                        // console.log("GRID")
                        if (this.state["CB&" + record] && this.state["optionAnswerType" + key] === "QUESTION") {
                            // console.log("Correct Answer", [this.state["CB&" + record]], index + 1)
                            correctAnswer = index + 1
                        }
                        obj.optionId = index + 1
                        obj.option = this.state[record]
                        options.push(obj)
                    })
                }
                if (this.state["optionImageUploadArray" + key].length === 3) {
                    optionsType = "THREEIMAGE";
                    optionMediaType = 'image'
                    this.state["optionImageUploadArray" + key].map((record, index) => {
                        let obj = {}
                        if (this.state["CB&" + record] && this.state["optionAnswerType" + key] === "QUESTION") {
                            // console.log("Correct Answer", [this.state["CB&" + record]], index + 1)
                            correctAnswer = index + 1
                        }
                        obj.optionId = index + 1
                        obj.option = this.state[record]
                        options.push(obj)

                    })
                }
                if (this.state["optionImageUploadArray" + key].length === 2) {
                    optionsType = "POLL";
                    optionMediaType = 'image'
                    this.state["optionImageUploadArray" + key].map((record, index) => {
                        let obj = {}
                        if (this.state["CB&" + record] && this.state["optionAnswerType" + key] === "QUESTION") {
                            // console.log("Correct Answer", [this.state["CB&" + record]], index + 1)
                            correctAnswer = index + 1
                        }
                        obj.optionId = index + 1
                        obj.option = this.state[record]
                        options.push(obj)
                    })
                }
            }
            // console.log(options)
            // console.log(correctAnswer)
            let data = {
                name: this.state[this.state.queueId + "@" + key],
                optionsType: optionsType,
                answerType: this.state["optionAnswerType" + key],
                optionMediaType: optionMediaType,
                options: options,
                correctAnswer: correctAnswer

            }
            console.log(data, 'Data Enterd')
            this.props.saveSubQuestionPacks(data, this.state.queueId + "@" + key)
        }
    }

    savePackQuestion = (key, e) => {
        console.log(key, 'Question No')
        let errors = {};
        let answerError = "Error";
        let questions = []
        this.state.panes.map((pane) => {
            console.log(pane.key, 'Sub Question No')
            if (this.state[key + "@" + pane.key] === undefined) errors[key + "@" + pane.key] = "Fill the Question"
            if (this.state[key + "@" + pane.key] !== undefined) {
                if (this.state[key + "@" + pane.key].trim() === "") errors[key + "@" + pane.key] = "Fill the Question"
            }
            if (this.state["optionMediaType" + pane.key] === "" || this.state["optionMediaType" + pane.key] === undefined) errors["optionMediaType" + pane.key] = "Select Answers Type"
            if (this.state["optionAnswerType" + pane.key] === "" || this.state["optionAnswerType" + pane.key] === undefined) errors["optionAnswerType" + pane.key] = "Select Question Type"
            let temparray = [], unansweredArray = [];
            if (this.state["optionMediaType" + pane.key] === "Text") {
                if (this.state["optionTextArray" + pane.key].length < 2) {
                    errors.minimumQuestions = `Minimum 2 Options need to present`
                    message.info(`Minimum 2 Options need to present`)
                }
                this.state["optionTextArray" + pane.key].map((record, index) => {
                    temparray.push({
                        ["CB&" + record]: this.state["CB&" + record]
                    })
                    temparray.map((record) => {
                        unansweredArray = temparray.filter((record) => record[Object.keys(record)] != false)
                    })
                    if (this.state[record] === undefined) errors[record] = "Please enter the answer"
                    if (this.state[record] != undefined) {
                        if (this.state[record].trim() === "") errors[record] = "Please enter the answer"
                    }
                    // if (this.state["CB&" + record]) answerError = ''
                })
            }
            if (this.state["optionMediaType" + pane.key] === "Image") {
                if (this.state["optionImageUploadArray" + pane.key].length < 2) {
                    errors.minimumQuestions = `Minimum 2 Options need to present`
                    message.info(`Minimum 2 Options need to present`)
                }
                this.state["optionImageUploadArray" + pane.key].map((record, index) => {
                    temparray.push({
                        ["CB&" + record]: this.state["CB&" + record]
                    })
                    temparray.map((record) => {
                        unansweredArray = temparray.filter((record) => record[Object.keys(record)] != false)
                    })
                    if (this.state[record] === "" || this.state[record] === undefined) errors[record] = "Please Upload the image"
                    // if (this.state["CB&" + record]) answerError = ''
                })
            }
            if (this.state["optionMediaType" + pane.key] === "Drag&Drop") {
                if (this.state["optionDragNDropArray" + pane.key].length < 3) {
                    errors.minimumQuestions = `Minimum 3 Options need to present`
                    message.info(`Minimum 3 Options need to present`)
                }
                if (this.state.combinationImage === "") errors.combinationImage = "Please upload the image"
                this.state["optionDragNDropArray" + pane.key].map((record, index) => {
                    temparray.push({
                        ["CB&" + record]: this.state["CB&" + record]
                    })
                    temparray.map((record) => {
                        unansweredArray = temparray.filter((record) => record[Object.keys(record)] != false)
                    })
                    if (this.state[record] === "" || this.state[record] === undefined) errors[record] = "Please Upload the image"
                    // if (this.state["CB&" + record]) answerError = ''
                })
            }
            if (unansweredArray.length === 0 && this.state["optionAnswerType" + pane.key] === "QUESTION") {
                errors['correctAnswer'] = 'Select Answer'
            }
            this.setState({ errors })
            if (Object.keys(errors).length === 0) {
                let optionsType;
                let optionMediaType;
                let correctAnswer = 0;
                let options = []
                if (this.state["optionMediaType" + pane.key] === "Text") {
                    optionsType = "MULTIPLE"
                    optionMediaType = 'text'
                    this.state["optionTextArray" + pane.key].map((record, index) => {
                        let obj = {}
                        if (this.state["CB&" + record] && this.state["optionAnswerType" + pane.key] === "QUESTION") {
                            correctAnswer = index + 1
                        }
                        obj.optionId = index + 1
                        obj.option = this.state[record]
                        options.push(obj)
                    })
                }
                else if (this.state["optionMediaType" + pane.key] === "Image") {
                    if (this.state["optionImageUploadArray" + pane.key].length === 4) {
                        optionsType = "GRID"
                        optionMediaType = 'image'
                        this.state["optionImageUploadArray" + pane.key].map((record, index) => {
                            let obj = {}
                            if (this.state["CB&" + record] && this.state["optionAnswerType" + pane.key] === "QUESTION") {
                                correctAnswer = index + 1
                            }
                            obj.optionId = index + 1
                            obj.option = this.state[record]
                            options.push(obj)
                        })
                    }
                    if (this.state["optionImageUploadArray" + pane.key].length === 3) {
                        optionsType = "THREEIMAGE";
                        optionMediaType = 'image'
                        this.state["optionImageUploadArray" + pane.key].map((record, index) => {
                            let obj = {}
                            if (this.state["CB&" + record] && this.state["optionAnswerType" + pane.key] === "QUESTION") {
                                correctAnswer = index + 1
                            }
                            obj.optionId = index + 1
                            obj.option = this.state[record]
                            options.push(obj)

                        })
                    }
                    if (this.state["optionImageUploadArray" + pane.key].length === 2) {
                        optionsType = "POLL";
                        optionMediaType = 'image'
                        this.state["optionImageUploadArray" + pane.key].map((record, index) => {
                            let obj = {}
                            if (this.state["CB&" + record] && this.state["optionAnswerType" + pane.key] === "QUESTION") {
                                correctAnswer = index + 1
                            }
                            obj.optionId = index + 1
                            obj.option = this.state[record]
                            options.push(obj)
                        })
                    }
                }
                else if (this.state["optionMediaType" + pane.key] === "Drag&Drop") {
                    if (this.state["optionDragNDropArray" + pane.key].length === 3) {
                        optionsType = "COMBINATION";
                        optionMediaType = 'image'
                        this.state["optionDragNDropArray" + pane.key].map((record, index) => {
                            let obj = {}
                            if (this.state["CB&" + record] && this.state["optionAnswerType" + pane.key] === "QUESTION") {
                                correctAnswer = index + 1
                            }
                            obj.optionId = index + 1
                            obj.option = this.state[record]
                            options.push(obj)
                        })
                    }
                }
                let data = {
                    name: this.state[key + "@" + pane.key],
                    optionsType: optionsType,
                    answerType: this.state["optionAnswerType" + pane.key],
                    optionMediaType: optionMediaType,
                    options: options,
                    correctAnswer: correctAnswer

                }
                if (optionsType == 'COMBINATION') {
                    Object.assign(data, { "mediaURL": this.state.combinationImage })
                }
                console.log(data, 'Data Submitted')
                questions.push(data)
            }

        })
        console.log(questions)
        if (questions.length > 0 && Object.keys(this.state.errors).length === 0) {
            this.props.saveSubQuestionPacks(questions, this.state.queueId)
        }

    }

    render() {
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
            <div>
                <div className="Redfun2winsubques">
                    <ul className="list-inline">
                        <li className="ant-col-18">
                            {this.state.category != "Text" ? <p> Sub Questions Added - {this.state.panes.length}</p> : null} </li>
                        <li className="ant-col-6">

                            {this.state.category != "Text" ? <Button className="RightAlignButn AddmoreBtn" onClick={this.add.bind(this)}>Add Sub Question</Button> : null}
                        </li>
                    </ul>
                    {this.state.category != "Text" ? (<div>
                        <Col span={24}>
                            <Tabs className="QuestionTab redsubquestiontabs"
                                hideAdd
                                onChange={this.onChange}
                                activeKey={this.state.activeKey}
                                type="editable-card"
                                onEdit={this.onEdit}
                                >
                                {this.state.panes.map((pane, index) => <TabPane tab={"S.Q." + (index + 1)} key={pane.key}>
                                    <div>
                                        <Row>
                                            <Col span={24}>
                                                <Col span={13}>
                                                    <FormItem label="Type Your Question OR Brief(Optional)">
                                                        <TextArea rows={3} placeholder="I Enter here" name={this.state.queueId + "@" + pane.key} onChange={this.handleInputChange} />
                                                        <p style={{ color: "red" }} className="Error">{this.state.errors[this.state.queueId + "@" + pane.key]}</p>
                                                    </FormItem>
                                                </Col>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={24}>
                                                <Col span={5}>
                                                    <FormItem label="Add Answers">
                                                        <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                                            showSearch
                                                            style={{ width: '100%' }}
                                                            placeholder="Question Category"
                                                            optionFilterProp="children"
                                                            onChange={this.handleAnswerTypeChange.bind(this, 'optionMediaType' + pane.key, pane.key)}
                                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                            >
                                                            <Option value="Text">Text</Option>
                                                            <Option value="Image">Image</Option>
                                                        </Select>
                                                        <p style={{ color: "red" }} className="Error">{this.state.errors["optionMediaType" + pane.key]}</p>
                                                    </FormItem>
                                                </Col>
                                                <Col span={5} offset={3}>
                                                    <FormItem label="Winning Criteria">
                                                        <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                                            showSearch
                                                            style={{ width: '100%' }}
                                                            placeholder="Opinion Based"
                                                            optionFilterProp="children"
                                                            onChange={this.handleDropDownChange.bind(this, 'optionAnswerType' + pane.key)}
                                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                            >
                                                            <Option value="OPINION">Opinion Based</Option>
                                                            <Option value="QUESTION">Result Based</Option>
                                                        </Select>
                                                        <p style={{ color: "red" }} className="Error">{this.state.errors["optionAnswerType" + pane.key]}</p>
                                                    </FormItem>
                                                </Col>
                                                <Col span={4} className="MrgnLeft80 RedsFunaddmoreoptns">
                                                    <FormItem label=" ">
                                                        <Button className="RightAlignButn AddmoreBtn" onClick={this.addElementToArray.bind(this, pane.key)}>Add Extra Options</Button>
                                                    </FormItem>
                                                </Col>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Scrollbars style={{ height: '30vh', padding: '0px 10px' }}>
                                                <Col span={24} className="">

                                                    {this.state['optionMediaType' + pane.key] ? <div>
                                                        {this.state['optionMediaType' + pane.key] === 'Text' ? <div className="redfun2winsoptnss">
                                                            {this.state['optionTextArray' + pane.key].length > 0 ? this.state['optionTextArray' + pane.key].map((imgs, index) => {
                                                                return (

                                                                    <Col span={12} xs={{span:12}} md={{span:12}} lg={{span:12}} xl={{span:12}}>
                                                                        <FormItem className="redfinedfun2intxtoptns">
                                                                            <div className="redotionlabel">
                                                                                <h3 className="SubTxtOptions"> <span>{"Option" + (index + 1)}</span> <span className="Redfinedtxtdelicon"><Icon type="close-square-o" className="IconClose" onClick={this.deleteOptionContent.bind(this, imgs)} /></span></h3>
                                                                            </div>
                                                                            <Checkbox className="AddImageFun2Win" name={"CB&" + imgs} onChange={this.onCheckBoxChange.bind(this)} checked={this.state['optionAnswerType' + pane.key] === "QUESTION"? this.state["CB&" + imgs]: false}></Checkbox>

                                                                            <Input className="redfinedfun2winstxtoptns" placeholder="Enter Option" name={imgs} value={this.state[imgs]} onChange={this.handleInputChange.bind(this)} />
                                                                            <p style={{ color: "red" }} className="Error">{this.state.errors[imgs]}</p>
                                                                        </FormItem>
                                                                    </Col>

                                                                )
                                                            }) : null}
                                                        </div> : <div>
                                                                {this.state['optionImageUploadArray' + pane.key].length > 0 ? this.state['optionImageUploadArray' + pane.key].map((imgs, index) => {
                                                                    return (
                                                                        <Col span={6} sm={{span:8}}  lg={{span:6}} xl={{span:6}} className="redfinedarryimgsoptns">


                                                                            <FormItem>
                                                                                <div className="Refinedimagetypetopmainhead">
                                                                                    <h3 className="redfinedimagetypeptionslabel"><span>{"Option" + (index + 1)}</span> <span className="redinedfun2winimgdel"> <Icon type="close-square-o" className="paddingLftRht15 IconClose" onClick={this.deleteOptionContent.bind(this, imgs)} /></span></h3>
                                                                                </div>
                                                                                <Checkbox className="AddImageFun2Winimagetype" name={"CB&" + imgs} onChange={this.onCheckBoxChange.bind(this)} checked={this.state['optionAnswerType' + pane.key] === "QUESTION"? this.state["CB&" + imgs]: false}></Checkbox>
                                                                                <Upload {...props}
                                                                                    className="avatar-uploader"
                                                                                    showUploadList={false}
                                                                                    onChange={this.handleOptionImageUpload.bind(this, imgs)}
                                                                                    accept=".png,.jpg,.jpeg"
                                                                                    >
                                                                                    {
                                                                                        this.state[imgs] ?
                                                                                            <img src={this.state[imgs]} alt="" className="avatar" /> :
                                                                                            <Icon type="picture" className="avatar-uploader-trigger" />
                                                                                    }
                                                                                </Upload>
                                                                                <p style={{ color: "red" }} className="Error">{this.state.errors[imgs]}</p>
                                                                            </FormItem>
                                                                        </Col>)
                                                                }) : null}
                                                            </div>}</div> : null}
                                                </Col>
                                            </Scrollbars>
                                        </Row>
                                        <Row>
                                            <Col span={5}>
                                                <p style={{ color: "red" }} className="Error">{this.state.errors.correctAnswer}</p>
                                            </Col>
                                            {/* <Col span={5} className="btnRight">
                                            <Button type="primary" className='createFun2Win' onClick={this.saveQuestion.bind(this, pane.key)}>Save</Button>
                                        </Col> */}
                                        </Row>
                                    </div>
                                </TabPane>)}
                            </Tabs>
                        </Col>
                    </div>) : null}

                    {/* New Code Starts */}
                    {this.state.category === "Text" ? <div>
                        <Row>
                            <Col span={24} className="redsfun2winoptional">
                                <Col span={6} lg={{span:13}} xl={{span:12}}>
                                    <FormItem label="Type Your Question OR Brief(Optional)">
                                        <TextArea rows={3} placeholder="I Enter here" name={this.state.queueId + "@SubQuestion1"} onChange={this.handleInputChange} />
                                    </FormItem>
                                    <p style={{ color: "red" }} className="Error">{this.state.errors['Question1@SubQuestion1']}</p>
                                </Col>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Col span={5}>
                                    <FormItem label="Add Answers">
                                        <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                            showSearch
                                            style={{ width: '100%' }}
                                            placeholder="Question Category"
                                            optionFilterProp="children"
                                            onChange={this.handleAnswerTypeChange.bind(this, 'optionMediaTypeSubQuestion1', 'SubQuestion1')}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                            <Option value="Text">Text</Option>
                                            <Option value="Image">Image</Option>
                                            {this.state.category === 'Text' ? <Option value="Drag&Drop">Image Drag&Drop</Option> : null}
                                        </Select>
                                        <p style={{ color: "red" }} className="Error">{this.state.errors.optionMediaTypeSubQuestion1}</p>
                                    </FormItem>
                                </Col>
                                <Col span={5} offset={3}>
                                    <FormItem label="Winning Criteria">
                                        <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                            showSearch
                                            style={{ width: '100%' }}
                                            placeholder="Opinion Based"
                                            optionFilterProp="children"
                                            onChange={this.handleDropDownChange.bind(this, 'optionAnswerTypeSubQuestion1')}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                            <Option value="OPINION">Opinion Based</Option>
                                            <Option value="QUESTION">Result Based</Option>
                                        </Select>
                                        <p style={{ color: "red" }} className="Error">{this.state.errors.optionAnswerTypeSubQuestion1}</p>
                                    </FormItem>
                                </Col>
                                <Col span={8} className="RedsFunaddmoreoptns">
                                    <FormItem label=" ">
                                        <Button className="RightAlignButn AddmoreBtn" onClick={this.addElementToArray.bind(this, 'SubQuestion1')}>Add Extra Options</Button>
                                    </FormItem>
                                </Col>
                                <Scrollbars style={{ height: '30vh', padding: '0px 10px' }}>
                                    <Col span={24}>

                                        {this.state.optionMediaTypeSubQuestion1 ? <div className="redfinedtexttypeoptions">

                                            {this.state.optionTextArraySubQuestion1.length > 0 ? this.state.optionTextArraySubQuestion1.map((imgs, index) => {
                                                return (
                                                    <Col span={12}>
                                                        <FormItem className="redfinedfun2intxtoptns">
                                                            <div className="redotionlabel">
                                                                <h3 className="SubTxtOptions"><span> {"Option" + (index + 1)} </span>  <span className="Redfinedtxtdelicon"><Icon type="close-square-o" className="IconClose" onClick={this.deleteOptionContent.bind(this, imgs)} /></span></h3>
                                                            </div>
                                                            <Checkbox className="AddImageFun2Win" name={"CB&" + imgs} onChange={this.onCheckBoxChange.bind(this)} checked={this.state.optionAnswerTypeSubQuestion1 === "QUESTION"? this.state["CB&" + imgs]: false}></Checkbox>

                                                            <Input className="redfinedfun2winstxtoptns" placeholder="Enter Option" name={imgs} value={this.state[imgs]} onChange={this.handleInputChange.bind(this)} />
                                                            <p style={{ color: "red" }} className="Error">{this.state.errors[imgs]}</p>
                                                        </FormItem>
                                                    </Col>
                                                )
                                            }) : null}
                                            {this.state.optionImageUploadArraySubQuestion1.length > 0 ? this.state.optionImageUploadArraySubQuestion1.map((imgs, index) => {
                                                return (
                                                    <Col span={6}  sm={{span:8}}  lg={{span:6}} xl={{span:6}} className="smallRefinedimagetypetopmainhead">

                                                        <FormItem>
                                                            <div className="Refinedimagetypetopmainhead">
                                                                <h3 className="redfinedimagetypeptionslabel"><span> {"Option" + (index + 1)}</span><span className="redinedfun2winimgdel2"> <Icon type="close-square-o" className="IconClose" onClick={this.deleteOptionContent.bind(this, imgs)} /></span>
                                                                </h3>
                                                            </div>
                                                            <Checkbox className="AddImageFun2Winimagetype" name={"CB&" + imgs} onChange={this.onCheckBoxChange.bind(this)} checked={this.state.optionAnswerTypeSubQuestion1 === "QUESTION"? this.state["CB&" + imgs] : false}></Checkbox>

                                                            <Upload {...props}
                                                                className="avatar-uploader"
                                                                showUploadList={false}
                                                                onChange={this.handleOptionImageUpload.bind(this, imgs)}
                                                                accept=".png,.jpg,.jpeg"
                                                                >
                                                                {
                                                                    this.state[imgs] ?
                                                                        <img src={this.state[imgs]} alt="" className="avatar" /> :
                                                                        <Icon type="picture" className="avatar-uploader-trigger" />
                                                                }
                                                            </Upload>
                                                            <p style={{ color: "red" }} className="Error">{this.state.errors[imgs]}</p>
                                                        </FormItem>
                                                    </Col>)
                                            }) : null}
                                            {this.state.optionDragNDropArraySubQuestion1.length > 0 ? <div>
                                                <FormItem label="ImageUrl">
                                                    <Upload {...props}
                                                        className="avatar-uploader"
                                                        showUploadList={false}
                                                        onChange={this.handleOptionImageUpload.bind(this, 'combinationImage')}
                                                        accept=".png,.jpg,.jpeg"
                                                        >
                                                        {
                                                            this.state.combinationImage ?
                                                                <img src={this.state.combinationImage} alt="" className="avatar" /> :
                                                                <Icon type="picture" className="avatar-uploader-trigger" />
                                                        }
                                                    </Upload>
                                                    <p style={{ color: "red" }} className="Error">{this.state.errors.combinationImage}</p>
                                                </FormItem>
                                                {this.state.optionDragNDropArraySubQuestion1.map((imgs, index) => {
                                                    return (
                                                        <Col span={6} sm={{span:8}}  lg={{span:6}} xl={{span:6}}>
                                                           
                                                            <FormItem className="redfun2winimagedragdrop">
                                                              <div className="Refinedimagetypetopmainhead">
                                                                <h3 className="redfinedimagetypeptionslabel"><span>{"Option" + (index + 1)}</span> <span className="redinedfun2winimgdel">  <Icon type="close-square-o" className="paddingLftRht15 IconClose" onClick={this.deleteOptionContent.bind(this, imgs)} /></span></h3>
                                                                </div>
                                                              
                                                                 <Checkbox className="AddImageFun2Winimagetype" name={"CB&" + imgs} onChange={this.onCheckBoxChange.bind(this)} checked={this.state.optionAnswerTypeSubQuestion1 === "QUESTION" ? this.state["CB&" + imgs]: false}></Checkbox>
                                                                <Upload {...props}
                                                                    className="avatar-uploader"
                                                                    showUploadList={false}
                                                                    onChange={this.handleOptionImageUpload.bind(this, imgs)}
                                                                    accept=".png,.jpg,.jpeg"
                                                                    >
                                                                    {
                                                                        this.state[imgs] ?
                                                                            <img src={this.state[imgs]} alt="" className="avatar" /> :
                                                                            <Icon type="picture" className="avatar-uploader-trigger" />
                                                                    }
                                                                </Upload>
                                                                <p style={{ color: "red" }} className="Error">{this.state.errors[imgs]}</p>
                                                            </FormItem>
                                                        </Col>)
                                                })}
                                            </div> : null}

                                        </div> : null}
                                    </Col>
                                </Scrollbars>
                                {/* <Col span={8}>
                                    <FormItem label=" ">
                                        <Button type="primary" className='createFun2Win' onClick={this.saveQuestion.bind(this, 'SubQuestion1')}>Save</Button>
                                    </FormItem>
                                </Col> */}
                                <Col span={5}>
                                    <p style={{ color: "red" }} className="Error">{this.state.errors.correctAnswer}</p>
                                </Col>
                            </Col>
                        </Row>
                    </div> : null}
                    {this.state.panes.length > 0 ? <Col span={24}>
                        <FormItem label=" ">
                            <Button type="primary" className='createFun2Win' onClick={this.savePackQuestion.bind(this, this.state.queueId)}>Save</Button>
                        </FormItem>
                    </Col> : null}
                </div>
            </div>

        );
    };
}

export default Questions;
/* eslint-disable */