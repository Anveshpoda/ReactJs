/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link, browserHistory } from 'react-router';
import Dashboard from '../Dashboard/Dashboard';
import css from './electionPolling.css';
import moment from 'moment';
import RichTextEditor from 'react-rte';
import axios from 'axios';
import { Form, Icon, Input, Button, Row, Col, Checkbox, Upload, Select, message, DatePicker, Steps } from 'antd';
const FormItem = Form.Item;
const Step = Steps.Step;
const { TextArea } = Input;
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
function handleChange(value) {
   // console.log(`selected ${value}`);
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

function onChange(value, dateString) {
   // console.log('Selected Time: ', value);
   // console.log('Formatted Selected Time: ', dateString);
}

function onOk(value) {
   // console.log('onOk: ', value);
}
const props = {
    name: 'file',
    action: process.env.REACT_APP_API_HOST + '/rest/azureImageUploadWeb',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        // console.log("info", info)
        if (info.file.status !== 'uploading') {
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

class NewCreateElection extends React.Component {
    static propTypes = {
        onChange11: PropTypes.func
    };
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            loading: false,
            value: RichTextEditor.createEmptyValue(),
            loading: false, imageUrl: '', pollcheck: '',
            PollTitle: '', PollTitle1: '', PollTitle2: '', PollTitle3: '', PollTitle4: '', PollTitle5: '',
            PollDescription: '', PollDescription1: '', PollDescription2: '', PollDescription3: '', PollDescription4: '', PollDescription5: '',
            contestIcon: '', enddateandtime: '', stratdateandtime: '', terms: '', pollstatus: '', pollended: '',
            winnersd: '', polltype: '', polldes: '', polltext: '', option1: '', option2: '', imageoption1: '', imageoption2: '',
            errors: {}, winnersCount: '', pollingtype: '', option11: '', polldetails: '', stratdateandtime1: '', enddateandtime1: '',
            option22: '', id: '', editdata: []
        };
        this.baseState = this.state
    }
    componentWillMount() {
      //  console.log("this.props", this.props.params)
        if (this.props.params._id === undefined) {
        } else {
            this.setState({ id: this.props.params._id });
            this.getContests(this.props.params._id);
        }
    }
    getContests = (id) => {
        axios.get(process.env.REACT_APP_API_HOST + '/rest/optionPollingById?pollId=' + id, {
            headers: {
                "x-access-token": sessionStorage.token,
            },
        })
            .then(function (response) {
              // console.log("response by id", response.data.data)
                this.setState({ editdata: response.data.data })
                this.setState({ pollingtype: this.state.editdata.type })
                this.setState({ value: RichTextEditor.createValueFromString(this.state.editdata.termsAndConditions, 'html') });
                this.setState({ polltype: this.state.editdata.pollType })
                this.setState({ polldes: this.state.editdata.pollDescription })
                this.setState({ polldetails: this.state.editdata.pollDetails })
                this.setState({ contestIcon: this.state.editdata.pollImageUrl })
                this.setState({ winnersCount: this.state.editdata.winnersCount })
                var d = new Date(this.state.editdata.pollStartDateTime).toLocaleString();
                var d1 = moment(d).format('YYYY-MM-DD HH:mm:ss');
                var d2 = new Date(this.state.editdata.pollEndDateTime).toLocaleString();
                var d4 = moment(d2).format('YYYY-MM-DD HH:mm:ss');
                this.setState({ stratdateandtime: d1 })
                this.setState({ enddateandtime: d4 })
                this.setState({ stratdateandtime1: this.state.editdata.pollStartDateTime })
                this.setState({ enddateandtime1: this.state.editdata.pollEndDateTime })

                this.setState({ pollcheck: "PollYettoStart" })
                if (this.state.editdata.type === "image") {
                    this.setState({ imageoption1: this.state.editdata.option1.optionImage })
                    this.setState({ option1: this.state.editdata.option1.option })
                    this.setState({ imageoption2: this.state.editdata.option2.optionImage })
                    this.setState({ option2: this.state.editdata.option2.option })

                } else {
                    this.setState({ option11: this.state.editdata.option1.option })
                    this.setState({ option22: this.state.editdata.option2.option })
                }
                if (this.state.editdata.contentOptions != undefined) {
                    this.setState({ PollTitle: this.state.editdata.contentOptions.toStart.pTitle })
                    this.setState({ PollDescription: this.state.editdata.contentOptions.toStart.pCaption })

                    this.setState({ PollTitle1: this.state.editdata.contentOptions.startedNparticipated.pTitle })
                    this.setState({ PollDescription1: this.state.editdata.contentOptions.startedNparticipated.pCaption })

                    this.setState({ PollTitle2: this.state.editdata.contentOptions.startedNotParticipated.pTitle })
                    this.setState({ PollDescription2: this.state.editdata.contentOptions.startedNotParticipated.pCaption })

                    this.setState({ PollTitle3: this.state.editdata.contentOptions.endedNparticipated.pTitle })
                    this.setState({ PollDescription3: this.state.editdata.contentOptions.endedNparticipated.pCaption })

                    this.setState({ PollTitle4: this.state.editdata.contentOptions.endedNotParticipated.pTitle })
                    this.setState({ PollDescription4: this.state.editdata.contentOptions.endedNotParticipated.pCaption })


                    this.setState({ PollTitle5: this.state.editdata.contentOptions.winnersDeclared.pTitle })
                    this.setState({ PollDescription5: this.state.editdata.contentOptions.winnersDeclared.pCaption })
                }
                // if (response.status === 200) {
                //   const hhh = response.data.data;
                //   this.setState({ data: hhh  });

                // }
            }.bind(this))
            .catch(function (error) {
               // console.log(error);
            });

    }
    resetForm = () => {
        this.setState(this.baseState)
    }
    next() {
        const current = this.state.current;
        if (current === 0) {
            let errors = {};
            if (this.state.polltype.trim() === '') errors.polltype = "* This field is mandatory";
            if (this.state.polldes === '') errors.polldes = "* Number is required";
            if (this.state.polldetails.trim() === '') errors.polldetails = "* This field is mandatory";
            if (this.state.polldetails.length >= 21) errors.polldetails = "* Details should be 20 chars";
            if (this.state.stratdateandtime === '') errors.stratdateandtime = "start date is required."
            if (this.state.enddateandtime === '') errors.enddateandtime = "end date is required."
            if (this.state.winnersCount === '') errors.winnersCount = "* Number is required"
            this.setState({ errors });
            if (Object.keys(errors).length === 0) {
                const current = this.state.current + 1;
                this.setState({ current });
            }
        }

        else if (current === 1) {
            let errors = {};
            if (this.state.PollTitle === '') errors.PollTitle = "* This field is mandatory."
            if (this.state.PollDescription === '') errors.PollDescription = "* This field is mandatory."
            if (this.state.PollTitle.length >= 36) errors.PollTitle = "Title should be 35 chars."
            if (this.state.PollDescription.length >= 56) errors.PollDescription = "Caption should be 55 chars."

            if (this.state.PollTitle1 === '') errors.PollTitle1 = "* This field is mandatory."
            if (this.state.PollDescription1 === '') errors.PollDescription1 = "* This field is mandatory."
            if (this.state.PollTitle1.length >= 36) errors.PollTitle1 = "Title should be 35 chars."
            if (this.state.PollDescription1.length >= 56) errors.PollDescription1 = "Caption should be 55 chars."

            if (this.state.PollTitle2 === '') errors.PollTitle2 = "* This field is mandatory."
            if (this.state.PollDescription2 === '') errors.PollDescription2 = "* This field is mandatory."
            if (this.state.PollTitle2.length >= 36) errors.PollTitle2 = "Title should be 35 chars."
            if (this.state.PollDescription2.length >= 56) errors.PollDescription2 = "Caption should be 55 chars."

            if (this.state.PollTitle3 === '') errors.PollTitle3 = "* This field is mandatory."
            if (this.state.PollDescription3 === '') errors.PollDescription3 = "* This field is mandatory."
            if (this.state.PollTitle3.length >= 36) errors.PollTitle3 = "Title should be 35 chars."
            if (this.state.PollDescription3.length >= 56) errors.PollDescription3 = "Caption should be 55 chars."

            if (this.state.PollTitle4 === '') errors.PollTitle4 = "* This field is mandatory."
            if (this.state.PollDescription4 === '') errors.PollDescription4 = "* This field is mandatory."
            if (this.state.PollTitle4.length >= 36) errors.PollTitle4 = "Title should be 35 chars."
            if (this.state.PollDescription4.length >= 56) errors.PollDescription4 = "Caption should be 55 chars."

            if (this.state.PollTitle5 === '') errors.PollTitle5 = "* This field is mandatory."
            if (this.state.PollDescription5 === '') errors.PollDescription5 = "* This field is mandatory."
            if (this.state.PollTitle5.length >= 36) errors.PollTitle5 = "Title should be 35 chars."
            if (this.state.PollDescription5.length >= 56) errors.PollDescription5 = "Caption should be 55 chars."
            this.setState({ errors });
            if (Object.keys(errors).length === 0) {
                const current = this.state.current + 1;
                this.setState({ current });
            }
        }
        else if (current === 2) {
            let errors = {};
            if (this.state.pollingtype === '') errors.pollingtype = "* This field is mandatory."
            if (this.state.contestIcon === '') errors.contestIcon = "* This field is mandatory."
            if (this.state.pollingtype === "image") {
                if (this.state.imageoption1 === '') errors.imageoption1 = "* This field is mandatory."
                if (this.state.imageoption2 === '') errors.imageoption2 = "* This field is mandatory."
                if (this.state.option1.trim() === '') errors.option1 = "Option1 is required."
                if (this.state.option2.trim() === '') errors.option2 = "Option2 is required."
                if (this.state.option1.length >= 26) errors.option1 = "Option1 should be 25 chars."
                if (this.state.option2.length >= 26) errors.option2 = "Option2 should be 25 chars."
            }
            else if (this.state.pollingtype === "text") {
                if (this.state.option11.trim() === '') errors.option11 = "* This field is mandatory."
                if (this.state.option22.trim() === '') errors.option22 = "* This field is mandatory."
                if (this.state.option11.length >= 26) errors.option11 = "Option1 should be 25 chars."
                if (this.state.option22.length >= 26) errors.option22 = "Option2 should be 25 chars."
            }
            this.setState({ errors });
            if (Object.keys(errors).length === 0) {
                const current = this.state.current + 1;
                this.setState({ current });
            }
        }


    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    done() {
        const current = this.state.current;
        if (current === 3) {
            let errors = {};
            if (this.state.PollTitle === '') errors.PollTitle = "* This field is mandatory."
            var htmjj = this.state.value.toString('html')
            var bb = "<html><head><link href='https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i' rel='stylesheet'></head><body><ul style='font-family:roboto;margin-Left:-120px;color:#929292'><ul>" + htmjj + "</ul><body></htm>"
            this.state.terms = bb;
            this.setState({ errors });
            if (Object.keys(errors).length === 0) {
                var data = {
                    "type": this.state.pollingtype,
                    "pollTitle": this.state.PollTitle.trim(),
                    "pollCaption": this.state.PollDescription.trim(),
                    "pollText": "",
                    "pollType": this.state.polltype.trim(),
                    "pollImageUrl": this.state.contestIcon,
                    "pollDescription": this.state.polldes.trim(),
                    "pollStartDateTime": this.state.stratdateandtime1,
                    "pollEndDateTime": this.state.enddateandtime1,
                    "option1": {
                        "option": this.state.pollingtype === "image" ? this.state.option1.trim() : this.state.option11.trim(),
                        "optionImage": this.state.imageoption1,

                    },
                    "option2": {
                        "option": this.state.pollingtype === "image" ? this.state.option2.trim() : this.state.option22.trim(),
                        "optionImage": this.state.imageoption2,

                    },
                    "optionImage1": this.state.imageoption1,
                    "optionImage2": this.state.imageoption2,
                    "winnersCount": this.state.winnersCount,
                    "termsAndConditions": this.state.terms.trim(),
                    "pollDetails": this.state.polldetails.trim(),
                    "contentOptions": {
                        "toStart": {
                            "pTitle": this.state.PollTitle.trim(),
                            "pCaption": this.state.PollDescription.trim()
                        }, "startedNparticipated": {
                            "pTitle": this.state.PollTitle1.trim(),
                            "pCaption": this.state.PollDescription1.trim()
                        }, "startedNotParticipated": {
                            "pTitle": this.state.PollTitle2.trim(),
                            "pCaption": this.state.PollDescription2.trim()
                        }, "endedNparticipated": {
                            "pTitle": this.state.PollTitle3.trim(),
                            "pCaption": this.state.PollDescription3.trim()
                        }, "endedNotParticipated": {
                            "pTitle": this.state.PollTitle4.trim(),
                            "pCaption": this.state.PollDescription4.trim()
                        }, "winnersDeclared": {
                            "pTitle": this.state.PollTitle5.trim(),
                            "pCaption": this.state.PollDescription5.trim()
                        }
                    }
                }

                if (this.state.id === '') {
                 //   console.log("create data", data)
                    var self = this
                    const url = process.env.REACT_APP_API_HOST + '/rest/optionPollCreation';
                    var request = new Request(url, {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: {
                            "Content-Type": "application/json",
                            'x-access-token': sessionStorage.getItem('token')
                        }
                    });
                    fetch(request)
                        .then(response => response.json())
                        .then(function (response) {
                            if (response.statusCode === 1) {
                               // console.log("resposnse", response)
                                self.resetForm();
                                message.success('Poll Created successfully!');
                                browserHistory.push("/ElectioMain");
                            }
                            else {
                               // console.log("resposnse", response)
                                message.error(`Unable to create poll.`, 5);
                            }
                        })
                } else {
                    data.pollId = this.state.id;
                   // console.log("edit data", data);
                    var self = this
                    const url = process.env.REACT_APP_API_HOST + '/rest/optionPollEdit';
                    var request = new Request(url, {
                        method: 'PUT',
                        body: JSON.stringify(data),
                        headers: {
                            "Content-Type": "application/json",
                            'x-access-token': sessionStorage.getItem('token')
                        }
                    });
                    fetch(request)
                        .then(response => response.json())
                        .then(function (response) {
                            if (response.statusCode === 1) {
                             //   console.log("resposnse", response)
                                self.resetForm();

                                message.success('Poll Edited successfully!');
                                browserHistory.push("/ElectioMain/UpComingElection");

                            }
                            else {
                               // console.log("resposnse", response)
                                message.error(`Unable to create poll.`, 5);
                            }
                        })
                }


            }
        }
    }
    onChange11 = (value) => {
        this.setState({ value });
        if (this.props.onChange) {
            this.props.onChange(
                value.toString('html')
            );
        }
    }
    handleChange14 = (value) => {
        if (this.state.pollcheck !== '') this.state.errors.pollcheck = ''
        this.setState({ pollcheck: value });
    }
    handleChange1 = (value) => {
        if (this.state.pollingtype !== '') this.state.errors.pollingtype = ''
        this.setState({ pollingtype: value });
    }
    onChangetitle = (e) => {
        if (this.state.PollTitle !== '') this.state.errors.PollTitle = ''
        if (this.state.PollTitle1 !== '') this.state.errors.PollTitle1 = ''
        if (this.state.PollTitle2 !== '') this.state.errors.PollTitle2 = ''
        if (this.state.PollTitle3 !== '') this.state.errors.PollTitle3 = ''
        if (this.state.PollTitle4 !== '') this.state.errors.PollTitle4 = ''
        if (this.state.PollTitle5 !== '') this.state.errors.PollTitle5 = ''
        this.setState({ [e.target.name]: e.target.value });
    }
    onChangedesc = (e) => {
        if (this.state.PollDescription !== '') this.state.errors.PollDescription = ''
        if (this.state.PollDescription1 !== '') this.state.errors.PollDescription1 = ''
        if (this.state.PollDescription2 !== '') this.state.errors.PollDescription2 = ''
        if (this.state.PollDescription3 !== '') this.state.errors.PollDescription3 = ''
        if (this.state.PollDescription4 !== '') this.state.errors.PollDescription4 = ''
        if (this.state.PollDescription5 !== '') this.state.errors.PollDescription5 = ''
        this.setState({ [e.target.name]: e.target.value });
    }
    handleChange5 = (info) => {
        // console.log("info.file.status", info.file.type);
        if (info.file.type === "image/png" || info.file.type === "image/jpg" || info.file.type === "image/jpeg") {
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                if (info.file.response.data !== '') this.state.errors.contestIcon = '';
                this.setState({
                    contestIcon: info.file.response.data
                })
            }
        }
    }
    handleChange6 = (info) => {
        // console.log("info.file.status", info.file.type);
        if (info.file.type === "image/png" || info.file.type === "image/jpg" || info.file.type === "image/jpeg") {
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                if (info.file.response.data !== '') this.state.errors.imageoption1 = '';
                this.setState({
                    imageoption1: info.file.response.data
                })
            }
        }
    }
    handleChange7 = (info) => {
        // console.log("info.file.status", info.file.type);
        if (info.file.type === "image/png" || info.file.type === "image/jpg" || info.file.type === "image/jpeg") {
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                if (info.file.response.data !== '') this.state.errors.imageoption2 = '';
                this.setState({
                    imageoption2: info.file.response.data
                })
            }
        }
    }
    onChange = (value, dateString) => {
        if (dateString !== '') this.state.errors.stratdateandtime = '';
        var changeddate = new Date(dateString).toISOString()
        this.setState({ stratdateandtime: dateString })
        this.setState({ stratdateandtime1: changeddate })
    }
    onChange1 = (value, dateString) => {
        if (dateString !== '') this.state.errors.enddateandtime = '';
        var changeddate = new Date(dateString).toISOString()
        this.setState({ enddateandtime: dateString })
        this.setState({ enddateandtime1: changeddate })
    }
    onOk = (value) => {
    }
    handleChange15 = (e) => {
        if (this.state.winnersCount !== '') this.state.errors.winnersCount = '';
        this.setState({ winnersCount: e.target.value });
    }
    onChangepolltype = (e) => {
        if (this.state.polltype !== '') this.state.errors.polltype = ''
        this.setState({ polltype: e.target.value })
    }
    onChangepolldesc = (e) => {
        if (this.state.polldes !== '') this.state.errors.polldes = ''
        this.setState({ polldes: e.target.value })
    }
    onChangepolldetails = (e) => {
        if (this.state.polldetails !== '') this.state.errors.polldetails = ''
        this.setState({ polldetails: e.target.value })
    }
    option1 = (e) => {
        if (this.state.option1 !== '') this.state.errors.option1 = ''
        this.setState({ option1: e.target.value })
    }
    option2 = (e) => {
        if (this.state.option2 !== '') this.state.errors.option2 = ''
        this.setState({ option2: e.target.value })
    }
    option11 = (e) => {
        if (this.state.option11 !== '') this.state.errors.option11 = ''
        this.setState({ option11: e.target.value })
    }
    option22 = (e) => {
        if (this.state.option22 !== '') this.state.errors.option22 = ''
        this.setState({ option22: e.target.value })
    }
    render() {
       // console.log("this.state", this.state);
        const imageUrl = this.state.imageUrl;
        const { current } = this.state;
        const steps = [{
            title: 'Poll Details',
            content:
                <Col span={24} className="NewCreatePollBody">
                    <Form>
                        <Col span={24}>
                            <Col span={10}>
                                <h6 className='h6Fnt'>Poll Contest</h6>
                                <FormItem className={classnames('polltype', { error: !!this.state.errors.polltype })}>

                                    <Input placeholder="Poll Type" value={this.state.polltype} onChange={this.onChangepolltype} />
                                    <p>{this.state.errors.polltype}</p>
                                </FormItem>
                            </Col>
                        </Col>
                        <Col span={24}>
                            <Col span={10}>
                                <h6 className='h6Fnt'>Match Number</h6>
                                <FormItem className={classnames('polldes', { error: !!this.state.errors.polldes })}>
                                    <Input type="number" placeholder="Match Number" value={this.state.polldes} onChange={this.onChangepolldesc} />
                                    <p>{this.state.errors.polldes}</p>
                                </FormItem>

                            </Col>
                        </Col>
                        <Col span={24}>
                            <Col span={10}>
                                <h6 className='h6Fnt'>Poll Details</h6>
                                <FormItem className={classnames('polldetails', { error: !!this.state.errors.polldetails })}>
                                    <Input placeholder="Poll Details" value={this.state.polldetails} onChange={this.onChangepolldetails} />
                                    <p>{this.state.errors.polldetails}</p>
                                </FormItem>
                            </Col>
                        </Col>

                        <Col span={24}>
                            <Col span={4}>
                                <h6 className='h6Fnt'>Poll Start Time</h6>
                                <FormItem className={classnames('stratdateandtime', { error: !!this.state.errors.stratdateandtime })}>

                                    <DatePicker getCalendarContainer={triggerNode => triggerNode.parentNode}
                                        showTime
                                        value={this.state.stratdateandtime ? moment(this.state.stratdateandtime, dateFormat) : ''}
                                        format="YYYY-MM-DD HH:mm:ss"
                                        placeholder="Starts At"
                                        onChange={this.onChange}
                                        onOk={this.onOk}
                                    />
                                    <p>{this.state.errors.stratdateandtime}</p>
                                </FormItem>
                            </Col>
                            <Col span={4} offset={2}>
                                <h6 className='h6Fnt'>Poll End Time</h6>
                                <FormItem className={classnames('enddateandtime', { error: !!this.state.errors.enddateandtime })}>
                                    <DatePicker getCalendarContainer={triggerNode => triggerNode.parentNode}
                                        showTime
                                        value={this.state.enddateandtime ? moment(this.state.enddateandtime, dateFormat) : ''}
                                        format="YYYY-MM-DD HH:mm:ss"
                                        placeholder="Ends At"
                                        onChange={this.onChange1}
                                        onOk={this.onOk1}
                                    />
                                    <p>{this.state.errors.enddateandtime}</p>
                                </FormItem>
                            </Col>
                        </Col>
                        <Col span={24}>
                            <Col span={10}>
                                <h6 className='h6Fnt'>Winners Count</h6>
                                <FormItem className={classnames('winnersCount', { error: !!this.state.errors.winnersCount })}>
                                    <Input type="number" placeholder="WinnersCount" value={this.state.winnersCount} onChange={this.handleChange15} />
                                    <p>{this.state.errors.winnersCount}</p>
                                </FormItem>

                            </Col>
                        </Col>




                    </Form></Col>,
        }, {
            title: 'Poll Content',
            content:
                <Col span={24} className="NewCreatePollBody">
                    <Form>
                        <Col span={24}>
                            <Col span={10}>
                                <h4 className='h6Fnt'>Poll Yet To Start</h4>
                                <ul>
                                    <li>
                                        <h6 className='h6Fnt'>Poll Title</h6>
                                        <FormItem className={classnames('PollTitle', { error: !!this.state.errors.PollTitle })}>
                                            <Input autoComplete={'off'} name="PollTitle" value={this.state.PollTitle} onChange={this.onChangetitle} />
                                            <p>{this.state.errors.PollTitle}</p>
                                        </FormItem>
                                    </li>
                                    <li>
                                        <h6 className='h6Fnt'>Poll Caption</h6>
                                        <FormItem className={classnames('PollDescription', { error: !!this.state.errors.PollDescription })}>
                                            <TextArea rows={3} placeholder="Enter Caption here" value={this.state.PollDescription} name="PollDescription" onChange={this.onChangedesc} />
                                            <p>{this.state.errors.PollDescription}</p>
                                        </FormItem>
                                    </li>
                                </ul>
                            </Col>

                            <Col span={10} offset={2}>
                                <h4 className='h6Fnt'>Poll Started(Participated)</h4>
                                <ul>
                                    <li>
                                        <h6 className='h6Fnt'>Poll Title</h6>
                                        <FormItem className={classnames('PollTitle1', { error: !!this.state.errors.PollTitle1 })}>
                                            <Input autoComplete={'off'} name="PollTitle1" value={this.state.PollTitle1} onChange={this.onChangetitle} />
                                            <p>{this.state.errors.PollTitle1}</p>
                                        </FormItem>
                                    </li>
                                    <li>
                                        <h6 className='h6Fnt'>Poll Caption</h6>
                                        <FormItem className={classnames('PollDescription1', { error: !!this.state.errors.PollDescription1 })}>
                                            <TextArea rows={3} placeholder="Enter Caption here" value={this.state.PollDescription1} name="PollDescription1" onChange={this.onChangedesc} />
                                            <p>{this.state.errors.PollDescription1}</p>
                                        </FormItem>
                                    </li>
                                </ul>

                            </Col>
                        </Col>


                        <Col span={24}>
                            <Col span={10}>
                                <h4 className='h6Fnt'>Poll Started (Not Participated)</h4>
                                <ul>
                                    <li>
                                        <h6 className='h6Fnt'>Poll Title</h6>
                                        <FormItem className={classnames('PollTitle2', { error: !!this.state.errors.PollTitle2 })}>
                                            <Input autoComplete={'off'} name="PollTitle2" value={this.state.PollTitle2} onChange={this.onChangetitle} />
                                            <p>{this.state.errors.PollTitle2}</p>
                                        </FormItem>
                                    </li>
                                    <li>
                                        <h6 className='h6Fnt'>Poll Caption</h6>
                                        <FormItem className={classnames('PollDescription2', { error: !!this.state.errors.PollDescription2 })}>
                                            <TextArea rows={3} placeholder="Enter Caption here" value={this.state.PollDescription2} name="PollDescription2" onChange={this.onChangedesc} />
                                            <p>{this.state.errors.PollDescription2}</p>
                                        </FormItem>
                                    </li>
                                </ul>
                            </Col>

                            <Col span={10} offset={2}>
                                <h4 className='h6Fnt'>Poll Ended(Participated)</h4>
                                <ul>
                                    <li>
                                        <h6 className='h6Fnt'>Poll Title</h6>
                                        <FormItem className={classnames('PollTitle3', { error: !!this.state.errors.PollTitle3 })}>
                                            <Input autoComplete={'off'} name="PollTitle3" value={this.state.PollTitle3} onChange={this.onChangetitle} />
                                            <p>{this.state.errors.PollTitle3}</p>
                                        </FormItem>
                                    </li>
                                    <li>
                                        <h6 className='h6Fnt'>Poll Caption</h6>
                                        <FormItem className={classnames('PollDescription3', { error: !!this.state.errors.PollDescription3 })}>
                                            <TextArea rows={3} placeholder="Enter Caption here" value={this.state.PollDescription3} name="PollDescription3" onChange={this.onChangedesc} />
                                            <p>{this.state.errors.PollDescription3}</p>
                                        </FormItem>
                                    </li>
                                </ul>

                            </Col>
                        </Col>

                        <Col span={24}>
                            <Col span={10}>
                                <h4 className='h6Fnt'>Poll Ended (Not Participated)</h4>
                                <ul>
                                    <li>
                                        <h6 className='h6Fnt'>Poll Title</h6>
                                        <FormItem className={classnames('PollTitle4', { error: !!this.state.errors.PollTitle4 })}>
                                            <Input autoComplete={'off'} name="PollTitle4" value={this.state.PollTitle4} onChange={this.onChangetitle} />
                                            <p>{this.state.errors.PollTitle4}</p>
                                        </FormItem>
                                    </li>
                                    <li>
                                        <h6 className='h6Fnt'>Poll Caption</h6>
                                        <FormItem className={classnames('PollDescription4', { error: !!this.state.errors.PollDescription4 })} >
                                            <TextArea rows={3} placeholder="Enter Caption here" value={this.state.PollDescription4} name="PollDescription4" onChange={this.onChangedesc} />
                                            <p>{this.state.errors.PollDescription4}</p>
                                        </FormItem>
                                    </li>
                                </ul>
                            </Col>

                            <Col span={10} offset={2}>
                                <h4 className='h6Fnt'>Winners Declared</h4>
                                <ul>
                                    <li>
                                        <h6 className='h6Fnt'>Poll Title</h6>
                                        <FormItem className={classnames('PollTitle5', { error: !!this.state.errors.PollTitle5 })}>
                                            <Input autoComplete={'off'} name="PollTitle5" value={this.state.PollTitle5} onChange={this.onChangetitle} />
                                            <p>{this.state.errors.PollTitle5}</p>
                                        </FormItem>
                                    </li>
                                    <li>
                                        <h6 className='h6Fnt'>Poll Caption</h6>
                                        <FormItem className={classnames('PollDescription5', { error: !!this.state.errors.PollDescription5 })}>
                                            <TextArea rows={3} placeholder="Enter Caption here" value={this.state.PollDescription5} name="PollDescription5" onChange={this.onChangedesc} />
                                            <p>{this.state.errors.PollDescription5}</p>
                                        </FormItem>
                                    </li>
                                </ul>

                            </Col>
                        </Col>
                    </Form>

                </Col>,
        }, {
            title: 'Add Media',
            content:
                <Col span={24} className="NewCreatePollBody">
                    <Form>
                        <Col span={24}>
                            <Col span={4}>
                                <h6 className='h6Fnt'>Select Type</h6>
                                <FormItem className={classnames('pollingtype', { error: !!this.state.errors.pollingtype })}>
                                    <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                        placeholder="Select type" style={{ width: 220 }}
                                        optionFilterProp="children"
                                        onChange={this.handleChange1}
                                        value={this.state.pollingtype || undefined}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        <Option value="image">Image</Option>
                                        <Option value="text">Text</Option>


                                    </Select>
                                    <p>{this.state.errors.pollingtype}</p>

                                </FormItem>
                            </Col>
                        </Col>

                        <Col span={24} className="NewCreatePollgallery">
                            <Col span={4} className="NewCreateMedia">
                                <FormItem className={classnames('contestIcon', { error: !!this.state.errors.contestIcon })}>
                                    <h6 className='h6Fnt'>Add Banner Image</h6>
                                    <Upload {...props}
                                        className="ElecTon avatar-uploader"
                                        showUploadList={false}
                                        onChange={this.handleChange5}

                                        accept=".png,.jpg,.jpeg"
                                    >
                                        {
                                            this.state.contestIcon ?
                                                <img src={this.state.contestIcon} name="contestIcon" alt="contest Icon Img" className="avatar" style={{ width: 143, height: 143 }} /> :
                                                <Icon type="plus" className="avatar-uploader-trigger" />
                                        }
                                    </Upload>
                                    <p>{this.state.errors.contestIcon}</p>
                                </FormItem>
                            </Col>
                            {this.state.pollingtype === "image" ? <div>
                                <Col span={4} className="NewCreateMedia">
                                    <FormItem className={classnames('imageoption1', { error: !!this.state.errors.imageoption1 })}>
                                        <h6 className='h6Fnt'>Add Image option1</h6>
                                        <Upload {...props}
                                            className="ElecTon avatar-uploader"
                                            showUploadList={false}
                                            onChange={this.handleChange6}

                                            accept=".png,.jpg,.jpeg"
                                        >
                                            {
                                                this.state.imageoption1 ?
                                                    <img src={this.state.imageoption1} name="contestIcon" alt="contest Icon Img" className="avatar" style={{ width: 143, height: 143 }} /> :
                                                    <Icon type="plus" className="avatar-uploader-trigger" />
                                            }
                                        </Upload>
                                        <p>{this.state.errors.imageoption1}</p>
                                    </FormItem>
                                </Col>

                                <Col span={4} className="NewCreateMedia">
                                    <FormItem className={classnames('imageoption2', { error: !!this.state.errors.imageoption2 })}>
                                        <h6 className='h6Fnt'>Add Image option2</h6>
                                        <Upload {...props}
                                            className="ElecTon avatar-uploader"
                                            showUploadList={false}

                                            onChange={this.handleChange7}
                                            accept=".png,.jpg,.jpeg"
                                        >
                                            {
                                                this.state.imageoption2 ?
                                                    <img src={this.state.imageoption2} name="contestIcon" alt="contest Icon Img" className="avatar" style={{ width: 143, height: 143 }} /> :
                                                    <Icon type="plus" className="avatar-uploader-trigger" />
                                            }
                                        </Upload>
                                        <p>{this.state.errors.imageoption2}</p>
                                    </FormItem>
                                </Col>
                            </div> : null}
                        </Col>
                        {this.state.pollingtype === "image" ? <div>
                            <Col span={24}>
                                <Col span={5}>
                                    <h6 className='h6Fnt'>Option1</h6>
                                    <FormItem className={classnames('option1', { error: !!this.state.errors.option1 })}>
                                        <Input placeholder="option1" value={this.state.option1} onChange={this.option1} />
                                        <p>{this.state.errors.option1}</p>
                                    </FormItem>
                                </Col>

                                <Col span={5} offset={1}>
                                    <h6 className='h6Fnt'>Option2</h6>
                                    <FormItem className={classnames('option2', { error: !!this.state.errors.option2 })}>
                                        <Input placeholder="option2" value={this.state.option2} onChange={this.option2} />
                                        <p>{this.state.errors.option2}</p>
                                    </FormItem>
                                </Col>

                            </Col></div> : null}
                        {this.state.pollingtype === "text" ? <div>
                            <Col span={24}>
                                <Col span={5}>
                                    <h6 className='h6Fnt'>Option1</h6>
                                    <FormItem className={classnames('option11', { error: !!this.state.errors.option11 })}>
                                        <Input placeholder="option1" value={this.state.option11} onChange={this.option11} />
                                        <p>{this.state.errors.option11}</p>
                                    </FormItem>
                                </Col>

                                <Col span={5} offset={1}>
                                    <h6 className='h6Fnt'>Option2</h6>
                                    <FormItem className={classnames('option22', { error: !!this.state.errors.option22 })}>
                                        <Input placeholder="option2" value={this.state.option22} onChange={this.option22} />
                                        <p>{this.state.errors.option22}</p>
                                    </FormItem>
                                </Col>

                            </Col></div> : null}

                    </Form>

                </Col>,
        },
        {
            title: 'Terms & Conditions',
            content:
                <Col span={24} className="NewCreatePollBody">
                    <Form>
                        <Col span={24}>
                            <Col span={10}>
                                <FormItem>
                                    <h6 className='h6Fnt'>Terms & conditions</h6>
                                    <RichTextEditor className="laTOfONT"
                                        value={this.state.value}
                                        onChange={this.onChange11}
                                    />
                                    <p>{this.state.errors.terms}</p>
                                </FormItem>
                            </Col>

                        </Col>
                    </Form>
                </Col>
            ,
        }
        ];





        return (
            <Dashboard>
                <div className="shopping-list">
                    <div className="ElectionsSubMenu">
                        <div className="SubMenu">
                            <Col span={20}><h2 className="pageTitle">Polling</h2></Col>
                            <Col span={4}>
                                <Link to="/ElectioMain"><Button type="primary" className="pollBackBtn">Back to Dash Board</Button></Link>
                            </Col>
                        </div>
                    </div>
                    <div>
                        <div className="newCreateElectioSteps">
                            <Steps current={current}>
                                {steps.map(item => <Step key={item.title} title={item.title} />)}
                            </Steps>
                            <div className="steps-content">{steps[this.state.current].content}</div>
                            <Col span={24} className="ChallengesPrevNextbtns">
                                <div className="steps-action floatRight">
                                    {
                                        this.state.current > 0
                                        &&
                                        <Button className="mrgnRight8" onClick={() => this.prev()}>
                                            Previous
            </Button>
                                    }
                                    {
                                        this.state.current < steps.length - 1
                                        &&
                                        <Button className="margnBottom20" type="primary" onClick={() => this.next()}>Save & Next</Button>
                                    }
                                    {
                                        this.state.current === steps.length - 1
                                        &&
                                        <Button type="primary" onClick={() => this.done()}>Done</Button>
                                    }

                                </div>
                            </Col>
                        </div>


                    </div>

                </div>
            </Dashboard>
        );
    }
}

export default NewCreateElection;
/* eslint-disable */