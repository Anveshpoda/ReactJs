/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Dashboard from '../Dashboard/Dashboard';
import moment from 'moment';
import axios from 'axios';
import css from './electionPolling.css';
import { Link, browserHistory } from 'react-router';
import { Col, Row, Radio, Form, Steps, Select, Tag, Tooltip, Input, Switch, DatePicker, Icon, Upload, Button, message } from 'antd';
import { error } from 'util';
const FormItem = Form.Item;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const { TextArea } = Input;
const Step = Steps.Step;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { MonthPicker, RangePicker } = DatePicker;
function handleChange(checked) {
    console.log(`switch to ${checked}`);
}
function onChange(checked) {
    console.log(`switch to ${checked}`);
}

function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
}

function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
}

function disabledDateTime() {
    return {
        disabledHours: () => range(0, 24).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56],
    };
}

function disabledRangeTime(_, type) {
    if (type === 'start') {
        return {
            disabledHours: () => range(0, 60).splice(4, 20),
            disabledMinutes: () => range(30, 60),
            disabledSeconds: () => [55, 56],
        };
    }
    return {
        disabledHours: () => range(0, 60).splice(20, 4),
        disabledMinutes: () => range(0, 31),
        disabledSeconds: () => [55, 56],
    };
}



//---------------------Img ----------------//

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



class CreateNewElection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            loading: false,
            value: Text,
            tags: [],
            inputVisible: false, displayhome: '', declaredimage: '', disabled: false,
            inputValue: '', editid: '', imagechange66: '', locationsList: [], selectedLocations: [],
            selectpolltype: '', radiotype: '', errors: {}, stratdateandtime: '', polldetails: '', stratdateandtime1: '',
            enddateandtime: '', enddateandtime1: '', NewPollTitle: '',
            PollTitle: '', PollTitle1: '', PollTitle2: '', PollTitle3: '', PollTitle4: '', PollTitle5: '',
            PollDescription: '', PollDescription1: '', PollDescription2: '', PollDescription3: '', PollDescription4: '', PollDescription5: '',
            creativeTags: [], optionsvalue: '', imagechange1: '', imagechange2: '', imagechange3: '',
            IWITHOUTTN1: '', IWITHOUTTN2: '', IWITHOUTTN3: '', switchcheck: false, emojiOption: '',
            emojiName1: '', emojiName2: '', emojiName3: '', imageemoji1: '', imageemoji2: '', imageemoji3: '',
            textwithimageswitch: false, bannerImage: '', textwithtimer1: '', textwithtimer2: '', twtimerImage: '',
            twtswitch: '', pairimage: '', pairimage1: '', pairimage2: '', pairswitch: false, pairname1: '', pairname2: '', pairname3: '', pairname4: '',
            timerwdcimage: '', imageimage1: '', imageimage2: '', imageoption2: '', imageoption1: '', textoption2: '', textoption1: '', winnswitch: '', diplaytimer: '',

            showTimeValue: '', showTimeValue1: '', hideTimeValue: '', hideTimeValue1: '',
            categories: [],
            subCategories: [],
            celebrities: [],
            subCategoryId: ''
        };
        this.baseState = this.state;
    }
    //-----select onchange-----//
    componentWillMount() {
        console.log("this.props", this.props.params)
        if (this.props.params._id === undefined) {
        } else {
            this.setState({ editid: this.props.params._id });
            this.getContests(this.props.params._id);
        }
        this.getLocationCatagory();
    }
    getcategories = () => {
        var instance = axios.create({
            headers: { 'x-access-token': sessionStorage.token }
        });
        instance.get('/categories').then((response) => {
            this.setState({ categories: response.data.data });
        });
    }


    getLocationCatagory = () => {
        var _this = this;
        var fetchData = axios.create({
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": sessionStorage.token
            }
        })
        fetchData.get('/locationNames').then(function (response) {
            // console.log("response for locations",response.data.data)
            // _this.setState({ locationsList: response.data.data })
            _this.setState({ locationsList: ["SelectAll", ...response.data.data] })
        })
    }
    getContests = (id) => {
        axios.get(process.env.REACT_APP_API_HOST + '/rest/optionPollingById?pollId=' + id, {
            headers: {
                "x-access-token": sessionStorage.token,
            },
        })
            .then(function (response) {
                console.log("response edit data in create", response.data.data)
                this.setState({ selectedLocations: response.data.data.location })
                this.setState({ editdata: response.data.data });
                this.setState({ selectpolltype: this.state.editdata.type })
                this.setState({ displayhome: this.state.editdata.pollSection })
                this.setState({ NewPollTitle: this.state.editdata.pollTitle })
                this.setState({ declaredimage: this.state.editdata.pollBackground })
                var d = new Date(this.state.editdata.pollStartDateTime).toLocaleString();
                var d1 = moment(d).format('YYYY-MM-DD HH:mm:ss');
                var d2 = new Date(this.state.editdata.pollEndDateTime).toLocaleString();
                var d4 = moment(d2).format('YYYY-MM-DD HH:mm:ss');
                var showt = new Date(this.state.editdata.pollShowTime).toLocaleString();
                var showtime = moment(showt).format('YYYY-MM-DD HH:mm:ss');
                var hidet = new Date(this.state.editdata.pollHideTime).toLocaleString();
                var hidetime = moment(hidet).format('YYYY-MM-DD HH:mm:ss');
                this.setState({ stratdateandtime: d1 })
                this.setState({ enddateandtime: d4 })
                this.setState({ showTimeValue: showtime })
                this.setState({ hideTimeValue: hidetime })

                this.setState({ stratdateandtime1: this.state.editdata.pollStartDateTime })
                this.setState({ enddateandtime1: this.state.editdata.pollEndDateTime })
                this.setState({ showTimeValue1: this.state.editdata.pollShowTime })
                this.setState({ hideTimeValue1: this.state.editdata.pollHideTime })

                this.setState({ creativeTags: this.state.editdata.pollTags })
                if (this.state.editdata.type === "imageWithOutTimer") {
                    this.setState({ imagechange66: this.state.editdata.pollImageUrl })
                    this.setState({ switchcheck: this.state.editdata.pollDeclaration === "result" ? true : false })
                    if (this.state.editdata.options.length === 2) {
                        this.setState({ optionsvalue: "2" })
                        this.setState({ IWITHOUTTN1: this.state.editdata.options[0].option })
                        this.setState({ IWITHOUTTN2: this.state.editdata.options[1].option })
                        this.setState({ imagechange1: this.state.editdata.options[0].optionTypeValue })
                        this.setState({ imagechange2: this.state.editdata.options[1].optionTypeValue })
                    } else {
                        if (this.state.editdata.options.length === 3) {
                            this.setState({ optionsvalue: "3" })
                            this.setState({ IWITHOUTTN1: this.state.editdata.options[0].option })
                            this.setState({ IWITHOUTTN2: this.state.editdata.options[1].option })
                            this.setState({ IWITHOUTTN3: this.state.editdata.options[2].option })
                            this.setState({ imagechange1: this.state.editdata.options[0].optionTypeValue })
                            this.setState({ imagechange2: this.state.editdata.options[1].optionTypeValue })
                            this.setState({ imagechange3: this.state.editdata.options[2].optionTypeValue })
                        }
                    }
                }
                if (this.state.editdata.type === "textWithOutTimer") {
                    this.setState({ twtimerImage: this.state.editdata.pollImageUrl })
                    this.setState({ textwithtimer1: this.state.editdata.options[0].option })
                    this.setState({ textwithtimer2: this.state.editdata.options[1].option })
                    this.setState({ twtswitch: this.state.editdata.pollDeclaration === "result" ? true : false })
                }
                if (this.state.editdata.type === "textWithEmoji") {
                    this.setState({ textwithimageswitch: this.state.editdata.pollDeclaration === "result" ? true : false })
                    if (this.state.editdata.options.length === 2) {
                        this.setState({ emojiOption: "2" })
                        this.setState({ bannerImage: this.state.editdata.pollImageUrl })
                        this.setState({ emojiName1: this.state.editdata.options[0].option })
                        this.setState({ imageemoji1: this.state.editdata.options[0].optionTypeValue })
                        this.setState({ emojiName2: this.state.editdata.options[1].option })
                        this.setState({ imageemoji2: this.state.editdata.options[1].optionTypeValue })
                    } else if (this.state.editdata.options.length === 3) {
                        this.setState({ emojiOption: "3" })
                        this.setState({ bannerImage: this.state.editdata.pollImageUrl })
                        this.setState({ emojiName1: this.state.editdata.options[0].option })
                        this.setState({ imageemoji1: this.state.editdata.options[0].optionTypeValue })
                        this.setState({ emojiName2: this.state.editdata.options[1].option })
                        this.setState({ imageemoji2: this.state.editdata.options[1].optionTypeValue })
                        this.setState({ emojiName3: this.state.editdata.options[2].option })
                        this.setState({ imageemoji3: this.state.editdata.options[2].optionTypeValue })

                    }
                }
                if (this.state.editdata.type === "pair") {
                    this.setState({ pairimage: this.state.editdata.pollImageUrl })
                    this.setState({ pairimage1: this.state.editdata.options[0].optionTypeValue })
                    this.setState({ pairimage2: this.state.editdata.options[1].optionTypeValue })
                    this.setState({ pairswitch: this.state.editdata.pollDeclaration === "result" ? true : false })
                    var string1 = this.state.editdata.options[0].option
                    var string3 = this.state.editdata.options[1].option
                    var string4 = string3.split(",");
                    var string2 = string1.split(",");
                    // console.log("string2",string2);
                    this.setState({ pairname1: string2[0] })
                    this.setState({ pairname3: string2[1] })
                    this.setState({ pairname2: string4[0] })
                    this.setState({ pairname4: string4[1] })

                }
                if (this.state.editdata.type === "imageWithTimer" || this.state.editdata.type === "textWithTimer") {
                    this.setState({ radiotype: this.state.editdata.pollType })
                    this.setState({ polldetails: this.state.editdata.pollDetails })
                    this.setState({ winnswitch: this.state.editdata.pollDeclaration === "result" ? true : false })
                    this.setState({ timerwdcimage: this.state.editdata.pollImageUrl })

                    if (this.state.editdata.pollType != '') {
                        if (this.state.editdata.pollType === "text") {
                            if (this.state.editdata.options.length === 2) {
                                this.setState({ textoption1: this.state.editdata.options[0].option })
                                this.setState({ textoption2: this.state.editdata.options[1].option })
                            }
                        }
                        else if (this.state.editdata.pollType === "image") {
                            if (this.state.editdata.options.length === 2) {
                                this.setState({ imageoption1: this.state.editdata.options[0].option })
                                this.setState({ imageoption2: this.state.editdata.options[1].option })
                                this.setState({ imageimage2: this.state.editdata.options[0].optionTypeValue })
                                this.setState({ imageimage1: this.state.editdata.options[1].optionTypeValue })
                            }
                        }
                    }
                    if (this.state.editdata.contentOptions != undefined) {
                        if (this.state.editdata.type === "imageWithTimer" || this.state.editdata.type === "textWithTimer") {
                            this.setState({ selectpolltype: "TimerWithDifferentContextes" })
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
                    }
                }
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }
    onselectPollType = (value) => {
        if (this.state.selectpolltype !== '') this.state.errors.selectpolltype = ''
        this.setState({ selectpolltype: value })
    }
    displayHome = (value) => {
        if (this.state.displayhome !== '') this.state.errors.displayhome = ''
        this.setState({ displayhome: value })

    }
    onChangeOptions = (value) => {
        if (this.state.optionsvalue !== '') this.state.errors.optionsvalue = ''
        this.setState({ optionsvalue: value })
    }
    onChangeSwitch = (checked) => {
        if (this.state.switchcheck !== '') this.state.errors.switchcheck = ''
        this.setState({ switchcheck: checked });
    }

    onCategoryChange = (catId) => {
        if (catId) this.state.errors['categoryId'] = ''
        if (catId) this.state.errors['subCategoryId'] = ''
        this.setState({
            categoryId: catId
        })
        this.bindSubCategories(catId);
    }

    bindSubCategories(category) {
        this.state.categories.map((categorydata) => {
            if (category === categorydata._id) {
                this.getCelebrities(categorydata.subCategories[0]._id);
                this.setState({
                    subCategories: categorydata.subCategories,
                    subCategoryId: categorydata.subCategories[0]._id,
                    celebrity: ''
                })
            }
        })
    }

    onSubCategoryChange = (e) => {
        this.setState({
            subCategoryId: e,
            celebrity: ''
        });
        this.getCelebrities(e)
    }

    getCelebrities = (subid) => {
        var _this = this;
        const url = '/celebrity-by-subcategory/' + subid;
        var request = new Request(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'x-access-token': sessionStorage.token
            }
        });
        fetch(request)
            .then(response => response.json())
            .then(function (response) {
                if (response.status === 200) {
                    _this.setState({ celebrities: response.data });
                }
                else {

                }
            })
    }

    onCelbrityChange = (e) => {
        if (e && this.state.errors['celebrity']) this.state.errors['celebrity'] = ''
        this.setState({
            celebrity: e
        })
        console.log(this.state, 'State Value', e)
    }


    next() {
        const current = this.state.current;
        if (current === 0) {
            let errors = {};
            if (this.state.selectpolltype === '') errors.selectpolltype = "* This field is mandatory";
            if (this.state.selectpolltype != '') {
                if (this.state.displayhome === '') errors.displayhome = "This field is required"
                if (this.state.NewPollTitle === '') errors.NewPollTitle = "Poll Title is required";

                if (this.state.NewPollTitle.length >= 81) errors.NewPollTitle = "Poll Title should be 80 chars";


                if (this.state.stratdateandtime === '') errors.stratdateandtime = "Start date is required.";
                if (this.state.enddateandtime === '') errors.enddateandtime = "End date is required.";
                if (this.state.stratdateandtime != '' && this.state.enddateandtime != '') {
                    if (this.state.stratdateandtime > this.state.enddateandtime) errors.enddateandtime = "end date should not be less than startdate"
                }
                if (this.state.showTimeValue === '') errors.showTimeValue = "Show time is required.";
                if (this.state.hideTimeValue === '') errors.hideTimeValue = "Hide time is required.";
                if (this.state.showTimeValue1 != '') {
                    if (this.state.stratdateandtime1 <= this.state.showTimeValue1) errors.showTimeValue = "show time should not be greater than start time"
                }
                if (this.state.hideTimeValue1 != '') {
                    if (this.state.enddateandtime1 >= this.state.hideTimeValue1) errors.hideTimeValue = "hide time should not be less than end time"
                }
                if (this.state.creativeTags.length === 0) errors.creativeTags = "Tags is required"
                if (this.state.creativeTags.length > 5) errors.creativeTags = "Tags should be 5"
                if (this.state.declaredimage === '') errors.declaredimage = "Image url is required"
                if (this.state.selectedLocations.length === 0) errors.selectedLocations = "Location is required"
            }
            if (this.state.selectpolltype === "TimerWithDifferentContextes") {

                if (this.state.polldetails === '') errors.polldetails = "Poll Details is required";
                if (this.state.polldetails.length >= 21) errors.polldetails = "Poll Details should be 20 chars";
                if (this.state.PollTitle === '') errors.PollTitle = "* This field is mandatory."
                if (this.state.PollDescription === '') errors.PollDescription = "* This field is mandatory."

                if (this.state.PollTitle.length >= 39) errors.PollTitle = "Title should be 38 chars."
                if (this.state.PollDescription.length >= 59) errors.PollDescription = "Caption should be 58 chars."

                if (this.state.PollTitle1 === '') errors.PollTitle1 = "* This field is mandatory."
                if (this.state.PollDescription1 === '') errors.PollDescription1 = "* This field is mandatory."
                if (this.state.PollTitle1.length >= 39) errors.PollTitle1 = "Title should be 38 chars."
                if (this.state.PollDescription1.length >= 59) errors.PollDescription1 = "Caption should be 58 chars."

                if (this.state.PollTitle2 === '') errors.PollTitle2 = "* This field is mandatory."
                if (this.state.PollDescription2 === '') errors.PollDescription2 = "* This field is mandatory."
                if (this.state.PollTitle2.length >= 39) errors.PollTitle2 = "Title should be 38 chars."
                if (this.state.PollDescription2.length >= 59) errors.PollDescription2 = "Caption should be 58 chars."

                if (this.state.PollTitle3 === '') errors.PollTitle3 = "* This field is mandatory."
                if (this.state.PollDescription3 === '') errors.PollDescription3 = "* This field is mandatory."
                if (this.state.PollTitle3.length >= 39) errors.PollTitle3 = "Title should be 38 chars."
                if (this.state.PollDescription3.length >= 59) errors.PollDescription3 = "Caption should be 58 chars."

                if (this.state.PollTitle4 === '') errors.PollTitle4 = "* This field is mandatory."
                if (this.state.PollDescription4 === '') errors.PollDescription4 = "* This field is mandatory."
                if (this.state.PollTitle4.length >= 39) errors.PollTitle4 = "Title should be 38 chars."
                if (this.state.PollDescription4.length >= 59) errors.PollDescription4 = "Caption should be 58 chars."

                if (this.state.PollTitle5 === '') errors.PollTitle5 = "* This field is mandatory."
                if (this.state.PollDescription5 === '') errors.PollDescription5 = "* This field is mandatory."
                if (this.state.PollTitle5.length >= 39) errors.PollTitle5 = "Title should be 38 chars."
                if (this.state.PollDescription5.length >= 59) errors.PollDescription5 = "Caption should be 58 chars."
            }

            this.setState({ errors });
            if (Object.keys(errors).length === 0) {
                const current = this.state.current + 1;
                this.setState({ current });
            }
        }

    }
    onpairImage = (info) => {
        if (info.file.status === 'done') {

            message.success(`${info.file.name} file uploaded successfully`);
            if (this.state.pairimage !== '') this.state.errors.pairimage = ''
            this.setState({
                pairimage: info.file.response.data
            })
        }
    }
    onpairChange = (checked) => {
        if (this.state.pairswitch !== '') this.state.errors.pairswitch = ''
        this.setState({ pairswitch: checked })
    }
    onpairname1 = (e) => {
        if (this.state.pairname1 !== '') this.state.errors.pairname1 = ''
        this.setState({ pairname1: e.target.value })
    }
    onpairname2 = (e) => {
        if (this.state.pairname2 !== '') this.state.errors.pairname2 = ''
        this.setState({ pairname2: e.target.value })
    }
    onpairname3 = (e) => {
        if (this.state.pairname3 !== '') this.state.errors.pairname3 = ''
        this.setState({ pairname3: e.target.value })
    }
    onpairname4 = (e) => {
        if (this.state.pairname4 !== '') this.state.errors.pairname4 = ''
        this.setState({ pairname4: e.target.value })
    }
    onpairImage1 = (info) => {
        if (info.file.status === 'done') {

            message.success(`${info.file.name} file uploaded successfully`);
            if (this.state.pairimage1 !== '') this.state.errors.pairimage1 = ''
            this.setState({
                pairimage1: info.file.response.data
            })
        }
    }
    onpairImage2 = (info) => {
        if (info.file.status === 'done') {

            message.success(`${info.file.name} file uploaded successfully`);
            if (this.state.pairimage2 !== '') this.state.errors.pairimage2 = ''
            this.setState({
                pairimage2: info.file.response.data
            })
        }
    }
    resetForm = () => {
        this.setState(this.baseState)
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    done() {
        const current = this.state.current;

        if (this.state.selectpolltype === "imageWithOutTimer") {
            if (current === 1) {
                let errors = {}
                if (this.state.optionsvalue === '') errors.optionsvalue = "Select one number";
                if (this.state.optionsvalue != '') {
                    if (this.state.IWITHOUTTN1 === '') errors.IWITHOUTTN1 = "Name is required";
                    if (this.state.IWITHOUTTN2 === '') errors.IWITHOUTTN2 = "Name is required";
                    if (this.state.IWITHOUTTN1.length >= 13) errors.IWITHOUTTN1 = "Name should be 12 chars";
                    if (this.state.IWITHOUTTN2.length >= 13) errors.IWITHOUTTN2 = "Name should be 12 chars";
                    //if (this.state.imagechange66 === '') errors.imagechange66 = "Image is r equired"
                    if (this.state.optionsvalue === "3") {
                        if (this.state.IWITHOUTTN3 === '') errors.IWITHOUTTN3 = "Name is required";
                        if (this.state.IWITHOUTTN3.length >= 13) errors.IWITHOUTTN3 = "Name should be 12 chars";
                    }
                    if (this.state.imagechange1 === '') errors.imagechange1 = "Image is required";
                    if (this.state.imagechange2 === '') errors.imagechange2 = "Image is required";
                    // if (this.state.switchcheck === false) errors.switchcheck = "This field is required"
                    if (this.state.optionsvalue === "3") {
                        if (this.state.imagechange3 === '') errors.imagechange3 = "Image is required";
                    }
                }
                this.setState({ errors });
                if (Object.keys(errors).length === 0) {
                    this.setState({ disabled: true })
                    var data = {
                        "pollTitle": this.state.NewPollTitle.trim(),
                        "pollCaption": "",
                        "goodieType": 0,
                        "type": this.state.selectpolltype,
                        "pollDetails": "",
                        "pollType": "bvvbc",
                        "pollTags": this.state.creativeTags,
                        "pollImageUrl": this.state.imagechange1,
                        "pollDescription": "vcxvxv",
                        "pollBackground": this.state.declaredimage,
                        "pollStartDateTime": this.state.stratdateandtime1,
                        "pollEndDateTime": this.state.enddateandtime1,
                        "pollShowTime": this.state.showTimeValue1,
                        "pollHideTime": this.state.hideTimeValue1,
                        "location": this.state.selectedLocations,
                        "options": [
                            {
                                "option": this.state.IWITHOUTTN1.trim(),
                                "optionType": "imageWithOutTimer",
                                "optionTypeValue": this.state.imagechange1,
                                "optionThumbnail": "",
                                "votersCount": 0
                            },
                            {
                                "option": this.state.IWITHOUTTN2.trim(),
                                "optionType": "imageWithOutTimer",
                                "optionTypeValue": this.state.imagechange2,
                                "optionThumbnail": "",
                                "votersCount": 0
                            }
                        ],
                        "winnersCount": 0,
                        "contentOptions": {
                            "toStart": {
                                "pTitle": this.state.NewPollTitle.trim(),
                                "pCaption": this.state.NewPollTitle.trim()
                            }, "startedNparticipated": {
                                "pTitle": this.state.NewPollTitle.trim(),
                                "pCaption": this.state.NewPollTitle.trim()
                            }, "startedNotParticipated": {
                                "pTitle": this.state.NewPollTitle.trim(),
                                "pCaption": this.state.NewPollTitle.trim()
                            }, "endedNparticipated": {
                                "pTitle": this.state.NewPollTitle.trim(),
                                "pCaption": this.state.NewPollTitle.trim()
                            }, "endedNotParticipated": {
                                "pTitle": this.state.NewPollTitle.trim(),
                                "pCaption": this.state.NewPollTitle.trim()
                            }, "winnersDeclared": {
                                "pTitle": this.state.NewPollTitle.trim(),
                                "pCaption": this.state.NewPollTitle.trim()
                            }
                        },

                        "pollSection": this.state.displayhome,
                        "pollDeclaration": this.state.switchcheck === true ? "result" : "opinion"
                    }
                    if (this.state.optionsvalue === "3") {
                        data.options.push({
                            "option": this.state.IWITHOUTTN3.trim(),
                            "optionType": "image",
                            "optionTypeValue": this.state.imagechange3,
                            "optionThumbnail": "",
                            "votersCount": 0
                        })
                    }
                    console.log("preview prepared data", data);
                    if (this.state.editid === '') {
                        var self = this;
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
                                if (response.statusMessage === "Success") {
                                    if (new Date(self.state.enddateandtime1).getTime() < new Date().getTime()) {
                                        browserHistory.push('/Polling')
                                    } else if (new Date(self.state.stratdateandtime1).getTime() > new Date().getTime()) {
                                        browserHistory.push('/Polling/UpComingElection')
                                    } else if (new Date().getTime() >= new Date(self.state.stratdateandtime1).getTime() &&
                                        new Date().getTime() <= new Date(self.state.enddateandtime1).getTime()) {
                                        browserHistory.push('/Polling/RunningElection')
                                    }
                                    self.resetForm();
                                    message.success('Poll Created successfully!');

                                }
                                else {
                                    message.error(`Unable to create Poll.`, 5);
                                }
                            })
                    } else if (this.state.editid != '') {
                        data.pollId = this.state.editid;
                        var self = this;
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
                                if (response.statusMessage === "Success") {
                                    if (new Date(self.state.enddateandtime1).getTime() < new Date().getTime()) {
                                        browserHistory.push('/Polling')
                                    } else if (new Date(self.state.stratdateandtime1).getTime() > new Date().getTime()) {
                                        browserHistory.push('/Polling/UpComingElection')
                                    } else if (new Date().getTime() >= new Date(self.state.stratdateandtime1).getTime() &&
                                        new Date().getTime() <= new Date(self.state.enddateandtime1).getTime()) {
                                        browserHistory.push('/Polling/RunningElection')
                                    }
                                    self.resetForm();
                                    message.success('Poll Updated successfully!');

                                }
                                else {
                                    message.error(`Unable to update Poll.`, 5);
                                }
                            })
                    }
                }
            }
        } else if (this.state.selectpolltype === "textWithEmoji") {
            if (current === 1) {
                let errors = {};
                if (this.state.emojiOption === '') errors.emojiOption = "Select one  number";
                if (this.state.emojiOption != '') {
                    if (this.state.bannerImage === '') errors.bannerImage = "Image is required";
                    if (this.state.emojiName1 === '') errors.emojiName1 = "Name is required";
                    if (this.state.emojiName2 === '') errors.emojiName2 = "Name is required";
                    if (this.state.emojiName1.length >= 16) errors.emojiName1 = "Name should be 15 chars";
                    if (this.state.emojiName2.length >= 16) errors.emojiName2 = "Name should be 15 chars";
                    if (this.state.imageemoji1 === '') errors.imageemoji1 = "Image is required";
                    if (this.state.imageemoji2 === '') errors.imageemoji2 = "Image is required";
                    // if (this.state.textwithimageswitch === false) errors.textwithimageswitch = "This field is required";
                    if (this.state.emojiOption === "3") {
                        if (this.state.emojiName3 === '') errors.emojiName3 = "Name is required";
                        if (this.state.emojiName3.length >= 16) errors.emojiName3 = "Name should be 15 chars";
                        if (this.state.imageemoji3 === '') errors.imageemoji3 = "Image is required";
                    }
                }

                this.setState({ errors });
                if (Object.keys(errors).length === 0) {
                    this.setState({ disabled: true })
                    var data = {
                        "pollTitle": this.state.NewPollTitle.trim(),
                        "pollCaption": "",
                        "goodieType": 0,
                        "type": this.state.selectpolltype,
                        "pollType": "bvvbc",
                        "pollDetails": "",
                        "pollTags": this.state.creativeTags,
                        "pollImageUrl": this.state.bannerImage,
                        "pollDescription": "vcxvxv",
                        "pollStartDateTime": this.state.stratdateandtime1,
                        "pollEndDateTime": this.state.enddateandtime1,
                        "pollBackground": this.state.declaredimage,
                        "location": this.state.selectedLocations,
                        "pollShowTime": this.state.showTimeValue1,
                        "pollHideTime": this.state.hideTimeValue1,
                        "options": [
                            {
                                "option": this.state.emojiName1.trim(),
                                "optionType": "textWithEmoji",
                                "optionTypeValue": this.state.imageemoji1,
                                "optionThumbnail": "",
                                "votersCount": 0
                            },
                            {
                                "option": this.state.emojiName2.trim(),
                                "optionType": "textWithEmoji",
                                "optionTypeValue": this.state.imageemoji2,
                                "optionThumbnail": "",
                                "votersCount": 0
                            }
                        ],
                        "winnersCount": 0,
                        "contentOptions": {
                            "toStart": {
                                "pTitle": this.state.NewPollTitle.trim(),
                                "pCaption": this.state.NewPollTitle.trim()
                            }, "startedNparticipated": {
                                "pTitle": this.state.NewPollTitle.trim(),
                                "pCaption": this.state.NewPollTitle.trim()
                            }, "startedNotParticipated": {
                                "pTitle": this.state.NewPollTitle.trim(),
                                "pCaption": this.state.NewPollTitle.trim()
                            }, "endedNparticipated": {
                                "pTitle": this.state.NewPollTitle.trim(),
                                "pCaption": this.state.NewPollTitle.trim()
                            }, "endedNotParticipated": {
                                "pTitle": this.state.NewPollTitle.trim(),
                                "pCaption": this.state.NewPollTitle.trim()
                            }, "winnersDeclared": {
                                "pTitle": this.state.NewPollTitle.trim(),
                                "pCaption": this.state.NewPollTitle.trim()
                            }
                        },

                        "pollSection": this.state.displayhome,
                        "pollDeclaration": this.state.textwithimageswitch === true ? "result" : "opinion"
                    }
                    if (this.state.emojiOption === "3") {
                        data.options.push({
                            "option": this.state.emojiName3.trim(),
                            "optionType": "textWithEmoji",
                            "optionTypeValue": this.state.imageemoji3,
                            "optionThumbnail": "",
                            "votersCount": 0
                        })
                    }
                    console.log("preview prepared data", data);
                    if (this.state.editid === '') {
                        var self = this;
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
                                if (response.statusMessage === "Success") {
                                    if (new Date(self.state.enddateandtime1).getTime() < new Date().getTime()) {
                                        browserHistory.push('/Polling')
                                    } else if (new Date(self.state.stratdateandtime1).getTime() > new Date().getTime()) {
                                        browserHistory.push('/Polling/UpComingElection')
                                    } else if (new Date().getTime() >= new Date(self.state.stratdateandtime1).getTime() &&
                                        new Date().getTime() <= new Date(self.state.enddateandtime1).getTime()) {
                                        browserHistory.push('/Polling/RunningElection')
                                    }
                                    self.resetForm();
                                    message.success('Poll Created successfully!');

                                }
                                else {
                                    message.error(`Unable to create Poll.`, 5);
                                }
                            })
                    } else if (this.state.editid != '') {
                        data.pollId = this.state.editid;
                        var self = this;
                        const url = process.env.REACT_APP_API_HOST + '/rest/optionPollEdit';;
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
                                if (response.statusMessage === "Success") {
                                    if (new Date(self.state.enddateandtime1).getTime() < new Date().getTime()) {
                                        browserHistory.push('/Polling')
                                    } else if (new Date(self.state.stratdateandtime1).getTime() > new Date().getTime()) {
                                        browserHistory.push('/Polling/UpComingElection')
                                    } else if (new Date().getTime() >= new Date(self.state.stratdateandtime1).getTime() &&
                                        new Date().getTime() <= new Date(self.state.enddateandtime1).getTime()) {
                                        browserHistory.push('/Polling/RunningElection')
                                    }
                                    self.resetForm();
                                    message.success('Poll Updated successfully!');

                                }
                                else {
                                    message.error(`Unable to update Poll.`, 5);
                                }
                            })
                    }
                }
            }
        }
        else if (this.state.selectpolltype === "textWithOutTimer") {
            if (current === 1) {
                let errors = {}
                if (this.state.twtimerImage === '') errors.twtimerImage = "Image is required"
                if (this.state.textwithtimer1 === '') errors.textwithtimer1 = "This field is required"
                if (this.state.textwithtimer2 === '') errors.textwithtimer2 = "This field is required"
                if (this.state.textwithtimer1.length >= 21) errors.textwithtimer1 = "Text should be 20 chars"
                if (this.state.textwithtimer2.length >= 21) errors.textwithtimer2 = "Text should be 20 chars"
                // if (this.state.twtswitch === '') errors.twtswitch = "This field is required"
                this.setState({ errors });
                if (Object.keys(errors).length === 0) {
                    this.setState({ disabled: true })
                    var data = {
                        "pollTitle": this.state.NewPollTitle.trim(),
                        "pollCaption": "",
                        "goodieType": 0,
                        "type": this.state.selectpolltype,
                        "pollType": "bvvbc",
                        "pollDetails": "",
                        "pollTags": this.state.creativeTags,
                        "pollImageUrl": this.state.twtimerImage,
                        "pollDescription": "vcxvxv",
                        "pollStartDateTime": this.state.stratdateandtime1,
                        "pollEndDateTime": this.state.enddateandtime1,
                        "pollBackground": this.state.declaredimage,
                        "location": this.state.selectedLocations,
                        "pollShowTime": this.state.showTimeValue1,
                        "pollHideTime": this.state.hideTimeValue1,
                        "options": [
                            {
                                "option": this.state.textwithtimer1.trim(),
                                "optionType": "textWithOutTimer",
                                "optionTypeValue": this.state.textwithtimer1,
                                "optionThumbnail": "",
                                "votersCount": 0
                            },
                            {
                                "option": this.state.textwithtimer2.trim(),
                                "optionType": "textWithOutTimer",
                                "optionTypeValue": this.state.textwithtimer2,
                                "optionThumbnail": "",
                                "votersCount": 0
                            }
                        ],
                        "winnersCount": 0,
                        "contentOptions": {
                            "toStart": {
                                "pTitle": this.state.NewPollTitle.trim(),
                                "pCaption": this.state.NewPollTitle.trim()
                            }, "startedNparticipated": {
                                "pTitle": this.state.NewPollTitle.trim(),
                                "pCaption": this.state.NewPollTitle.trim()
                            }, "startedNotParticipated": {
                                "pTitle": this.state.NewPollTitle.trim(),
                                "pCaption": this.state.NewPollTitle.trim()
                            }, "endedNparticipated": {
                                "pTitle": this.state.NewPollTitle.trim(),
                                "pCaption": this.state.NewPollTitle.trim()
                            }, "endedNotParticipated": {
                                "pTitle": this.state.NewPollTitle.trim(),
                                "pCaption": this.state.NewPollTitle.trim()
                            }, "winnersDeclared": {
                                "pTitle": this.state.NewPollTitle.trim(),
                                "pCaption": this.state.NewPollTitle.trim()
                            }
                        },

                        "pollSection": this.state.displayhome,
                        "pollDeclaration": this.state.twtswitch === true ? "result" : "opinion"
                    }
                    console.log("preview prepared data", data);
                    if (this.state.editid === '') {
                        var self = this;
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
                                if (response.statusMessage === "Success") {
                                    if (new Date(self.state.enddateandtime1).getTime() < new Date().getTime()) {
                                        browserHistory.push('/Polling')
                                    } else if (new Date(self.state.stratdateandtime1).getTime() > new Date().getTime()) {
                                        browserHistory.push('/Polling/UpComingElection')
                                    } else if (new Date().getTime() >= new Date(self.state.stratdateandtime1).getTime() &&
                                        new Date().getTime() <= new Date(self.state.enddateandtime1).getTime()) {
                                        browserHistory.push('/Polling/RunningElection')
                                    }
                                    self.resetForm();
                                    message.success('Poll Created successfully!');

                                }
                                else {
                                    message.error(`Unable to create Poll.`, 5);
                                }
                            })
                    } else if (this.state.editid != '') {
                        data.pollId = this.state.editid;
                        var self = this;
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
                                if (response.statusMessage === "Success") {
                                    if (new Date(self.state.enddateandtime1).getTime() < new Date().getTime()) {
                                        browserHistory.push('/Polling')
                                    } else if (new Date(self.state.stratdateandtime1).getTime() > new Date().getTime()) {
                                        browserHistory.push('/Polling/UpComingElection')
                                    } else if (new Date().getTime() >= new Date(self.state.stratdateandtime1).getTime() &&
                                        new Date().getTime() <= new Date(self.state.enddateandtime1).getTime()) {
                                        browserHistory.push('/Polling/RunningElection')
                                    }
                                    self.resetForm();
                                    message.success('Poll Updated successfully!');

                                }
                                else {
                                    message.error(`Unable to update Poll.`, 5);
                                }
                            })
                    }
                }
            }
        } else if (this.state.selectpolltype === "pair") {
            // console.log("pairmodal string checking",this.state.pairname1+','+this.state.pairname3);
            if (current === 1) {
                let errors = {}
                if (this.state.pairimage === '') errors.pairimage = "Image is required"
                if (this.state.pairimage1 === '') errors.pairimage1 = "Image is required"
                if (this.state.pairimage2 === '') errors.pairimage2 = "Image is required"
                if (this.state.pairname1 === '') errors.pairname1 = "Name is required"
                if (this.state.pairname2 === '') errors.pairname2 = "Name is required"
                if (this.state.pairname3 === '') errors.pairname3 = "Name is required"
                if (this.state.pairname4 === '') errors.pairname4 = "Name is required"
                if (this.state.pairname1.length >= 16) errors.pairname1 = "Name should be 15 chars"
                if (this.state.pairname2.length >= 16) errors.pairname2 = "Name should be 15 chars"
                if (this.state.pairname3.length >= 16) errors.pairname3 = "Name should be 15 chars"
                if (this.state.pairname4.length >= 16) errors.pairname4 = "Name should be 15 chars"
                //if (this.state.pairswitch === false) errors.pairswitch = "This field is required"
                this.setState({ errors });
                if (Object.keys(errors).length === 0) {
                    this.setState({ disabled: true })
                    var data = {
                        "pollTitle": this.state.NewPollTitle.trim(),
                        "pollCaption": "",
                        "goodieType": 0,
                        "pollTags": this.state.creativeTags,
                        "type": this.state.selectpolltype,
                        "pollType": "bvvbc",
                        "pollDetails": "",
                        "pollImageUrl": this.state.pairimage,
                        "pollDescription": "vcxvxv",
                        "pollStartDateTime": this.state.stratdateandtime1,
                        "pollEndDateTime": this.state.enddateandtime1,
                        "pollBackground": this.state.declaredimage,
                        "location": this.state.selectedLocations,
                        "pollShowTime": this.state.showTimeValue1,
                        "pollHideTime": this.state.hideTimeValue1,
                        "options": [
                            {
                                "option": this.state.pairname1.trim() + ',' + this.state.pairname3.trim(),
                                "optionType": "pair",
                                "optionTypeValue": this.state.pairimage1,
                                "optionThumbnail": "",
                                "votersCount": 0
                            },
                            {
                                "option": this.state.pairname2.trim() + ',' + this.state.pairname4.trim(),
                                "optionType": "pair",
                                "optionTypeValue": this.state.pairimage2,
                                "optionThumbnail": "",
                                "votersCount": 0
                            }
                        ],
                        "winnersCount": 0,
                        "contentOptions": {
                            "toStart": {
                                "pTitle": this.state.NewPollTitle.trim(),
                                "pCaption": this.state.NewPollTitle.trim()
                            }, "startedNparticipated": {
                                "pTitle": this.state.NewPollTitle.trim(),
                                "pCaption": this.state.NewPollTitle.trim()
                            }, "startedNotParticipated": {
                                "pTitle": this.state.NewPollTitle.trim(),
                                "pCaption": this.state.NewPollTitle.trim()
                            }, "endedNparticipated": {
                                "pTitle": this.state.NewPollTitle.trim(),
                                "pCaption": this.state.NewPollTitle.trim()
                            }, "endedNotParticipated": {
                                "pTitle": this.state.NewPollTitle.trim(),
                                "pCaption": this.state.NewPollTitle.trim()
                            }, "winnersDeclared": {
                                "pTitle": this.state.NewPollTitle.trim(),
                                "pCaption": this.state.NewPollTitle.trim()
                            }
                        },

                        "pollSection": this.state.displayhome,
                        "pollDeclaration": this.state.pairswitch === true ? "result" : "opinion"
                    }
                    console.log("preview prepared data", data);
                    if (this.state.editid === '') {
                        var self = this;
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
                                if (response.statusMessage === "Success") {
                                    if (new Date(self.state.enddateandtime1).getTime() < new Date().getTime()) {
                                        browserHistory.push('/Polling')
                                    } else if (new Date(self.state.stratdateandtime1).getTime() > new Date().getTime()) {
                                        browserHistory.push('/Polling/UpComingElection')
                                    } else if (new Date().getTime() >= new Date(self.state.stratdateandtime1).getTime() &&
                                        new Date().getTime() <= new Date(self.state.enddateandtime1).getTime()) {
                                        browserHistory.push('/Polling/RunningElection')
                                    }
                                    self.resetForm();
                                    message.success('Poll Created successfully!');

                                }
                                else {
                                    message.error(`Unable to create Poll.`, 5);
                                }
                            })
                    } else if (this.state.editid != '') {
                        data.pollId = this.state.editid;
                        var self = this;
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
                                if (response.statusMessage === "Success") {
                                    if (new Date(self.state.enddateandtime1).getTime() < new Date().getTime()) {
                                        browserHistory.push('/Polling')
                                    } else if (new Date(self.state.stratdateandtime1).getTime() > new Date().getTime()) {
                                        browserHistory.push('/Polling/UpComingElection')
                                    } else if (new Date().getTime() >= new Date(self.state.stratdateandtime1).getTime() &&
                                        new Date().getTime() <= new Date(self.state.enddateandtime1).getTime()) {
                                        browserHistory.push('/Polling/RunningElection')
                                    }
                                    self.resetForm();
                                    message.success('Poll Updated successfully!');

                                }
                                else {
                                    message.error(`Unable to update Poll.`, 5);
                                }
                            })
                    }
                }

            }
        } else if (this.state.selectpolltype === "TimerWithDifferentContextes") {
            if (current === 1) {
                let errors = {}
                if (this.state.radiotype === '') errors.radiotype = "This field is required"
                if (this.state.timerwdcimage === '') errors.timerwdcimage = "Image is required"
                // if (this.state.diplaytimer === '') errors.diplaytimer = "This field is required"
                // if (this.state.winnswitch === '') errors.winnswitch = "This field is required"
                if (this.state.radiotype === "text") {
                    if (this.state.textoption1 === '') errors.textoption1 = "This field is required"
                    if (this.state.textoption2 === '') errors.textoption2 = "This field is required"
                    if (this.state.textoption1.length >= 21) errors.textoption1 = "Option1 should be 20 chars"
                    if (this.state.textoption2.length >= 21) errors.textoption2 = "Option2 should be 20 chars"
                }
                else if (this.state.radiotype === "image") {
                    if (this.state.imageoption1 === '') errors.imageoption1 = "This field is required"
                    if (this.state.imageoption2 === '') errors.imageoption2 = "This field is required"
                    if (this.state.imageoption1.length >= 21) errors.imageoption1 = "Option1 should be 20 chars"
                    if (this.state.imageoption2.length >= 21) errors.imageoption2 = "Option2 should be 20 chars"
                    if (this.state.imageimage2 === '') errors.imageimage2 = "Image is required"
                    if (this.state.imageimage1 === '') errors.imageimage1 = "Image is required"
                }
                this.setState({ errors });
                if (Object.keys(errors).length === 0) {
                    this.setState({ disabled: true })
                    var data = {
                        "pollTitle": this.state.NewPollTitle.trim(),
                        "pollCaption": "",
                        "goodieType": 0,
                        "type": this.state.radiotype === "text" ? "textWithTimer" : "imageWithTimer",
                        "pollTags": this.state.creativeTags,
                        "pollType": this.state.radiotype === "text" ? "text" : "image",
                        "pollDetails": this.state.polldetails,
                        "pollImageUrl": this.state.timerwdcimage,
                        "pollDescription": "vcxvxv",
                        "pollStartDateTime": this.state.stratdateandtime1,
                        "pollEndDateTime": this.state.enddateandtime1,
                        "pollBackground": this.state.declaredimage,
                        "location": this.state.selectedLocations,
                        "pollShowTime": this.state.showTimeValue1,
                        "pollHideTime": this.state.hideTimeValue1,
                        "options": [
                            {
                                "option": this.state.textoption1.trim(),
                                "optionType": "textWithTimer",
                                "optionTypeValue": this.state.textoption1.trim(),
                                "optionThumbnail": "",
                                "votersCount": 0
                            },
                            {
                                "option": this.state.textoption2.trim(),
                                "optionType": "textWithTimer",
                                "optionTypeValue": this.state.textoption2.trim(),
                                "optionThumbnail": "",
                                "votersCount": 0
                            }
                        ],
                        "winnersCount": 0,
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
                        },

                        "pollSection": this.state.displayhome,
                        "pollDeclaration": this.state.winnswitch === true ? "result" : "opinion"
                    }
                    if (this.state.radiotype === "image") {
                        data.options = [{
                            "option": this.state.imageoption1.trim(),
                            "optionType": "imageWithTimer",
                            "optionTypeValue": this.state.imageimage2,
                            "optionThumbnail": "",
                            "votersCount": 0
                        },
                        {
                            "option": this.state.imageoption2.trim(),
                            "optionType": "imageWithTimer",
                            "optionTypeValue": this.state.imageimage1,
                            "optionThumbnail": "",
                            "votersCount": 0
                        }
                        ]
                    }
                    console.log("preview prepared data", data);
                    if (this.state.editid === '') {
                        var self = this;
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
                                if (response.statusMessage === "Success") {
                                    if (new Date(self.state.enddateandtime1).getTime() < new Date().getTime()) {
                                        browserHistory.push('/Polling')
                                    } else if (new Date(self.state.stratdateandtime1).getTime() > new Date().getTime()) {
                                        browserHistory.push('/Polling/UpComingElection')
                                    } else if (new Date().getTime() >= new Date(self.state.stratdateandtime1).getTime() &&
                                        new Date().getTime() <= new Date(self.state.enddateandtime1).getTime()) {
                                        browserHistory.push('/Polling/RunningElection')
                                    }
                                    self.resetForm();
                                    message.success('Poll Created successfully!');

                                }
                                else {
                                    message.error(`Unable to create Poll.`, 5);
                                }
                            })
                    } else if (this.state.editid != '') {
                        data.pollId = this.state.editid;
                        var self = this;
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
                                if (response.statusMessage === "Success") {


                                    if (new Date(self.state.enddateandtime1).getTime() < new Date().getTime()) {
                                        browserHistory.push('/Polling')
                                    } else if (new Date(self.state.stratdateandtime1).getTime() > new Date().getTime()) {
                                        browserHistory.push('/Polling/UpComingElection')
                                    } else if (new Date().getTime() >= new Date(self.state.stratdateandtime1).getTime() &&
                                        new Date().getTime() <= new Date(self.state.enddateandtime1).getTime()) {
                                        browserHistory.push('/Polling/RunningElection')
                                    }
                                    self.resetForm();
                                    message.success('Poll Updated successfully!');
                                }
                                else {
                                    message.error(`Unable to update Poll.`, 5);
                                }
                            })
                    }
                }
            }
        }

    }

    //----Upload-----//
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    }

    //--- Radios--//
    onradioType = (e) => {
        console.log('radio checked', e.target.value);
        if (this.state.radiotype !== '') this.state.errors.radiotype = ''
        this.setState({
            radiotype: e.target.value,
        });
    }

    //------ tags---------//

    handleClose = (removedTag) => {
        const creativeTags = this.state.creativeTags.filter(tag => tag !== removedTag);
        console.log(creativeTags);
        this.setState({ creativeTags });
    }

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    }

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }

    handleInputConfirm = () => {
        const state = this.state;
        const inputValue = state.inputValue;
        let creativeTags = state.creativeTags;
        if (inputValue && creativeTags.indexOf(inputValue) === -1) {
            creativeTags = [...creativeTags, inputValue];
        }
        console.log(creativeTags);
        if (this.state.creativeTags.length != 0) this.state.errors.creativeTags = ''
        this.setState({
            creativeTags,
            inputVisible: false,
            inputValue: '',
        });
    }

    saveInputRef = input => this.input = input



    onChangepolldetails = (e) => {
        if (this.state.polldetails !== '') this.state.errors.polldetails = ''
        this.setState({ polldetails: e.target.value })
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
    onChangeShow = (value, dateString) => {
        if (dateString !== '') this.state.errors.showTimeValue = '';
        var changeddate = new Date(dateString).toISOString()

        this.setState({ showTimeValue: dateString })
        this.setState({ showTimeValue1: changeddate })

    }
    onChangeHide = (value, dateString) => {
        if (dateString !== '') this.state.errors.hideTimeValue = '';
        var changeddate = new Date(dateString).toISOString()

        this.setState({ hideTimeValue: dateString })
        this.setState({ hideTimeValue1: changeddate })

    }
    onOk = (value) => {
    }
    ondeclaredImage = (e) => {
        if (this.state.declaredimage !== '') this.state.errors.declaredimage = ''
        this.setState({ declaredimage: e.target.value })
    }
    handleChangeLocation = (value) => {
        if (value == "SelectAll") {
            if (this.state.selectedLocations !== '') this.state.errors.selectedLocations = ''
            this.setState({
                selectedLocations: this.state.locationsList.slice(1, this.state.locationsList.length)
            })

        } else if (value.length == 22) {
            if (this.state.selectedLocations !== '') this.state.errors.selectedLocations = ''
            this.setState({ selectedLocations: [] })
        } else {
            if (this.state.selectedLocations !== '') this.state.errors.selectedLocations = ''
            this.setState({ selectedLocations: value })
        }
    }
    handleClose1 = (value) => {
    }
    onChangetitleNew = (e) => {
        if (this.state.NewPollTitle !== '') this.state.errors.NewPollTitle = ''
        this.setState({ NewPollTitle: e.target.value });
    }
    onChangetitle = (e) => {
        if (this.state.PollTitle !== '') this.state.errors.PollTitle = ''
        this.setState({ PollTitle: e.target.value });
    }
    onChangetitle1 = (e) => {
        if (this.state.PollTitle1 !== '') this.state.errors.PollTitle1 = ''
        this.setState({ PollTitle1: e.target.value });
    }
    onChangetitle2 = (e) => {
        if (this.state.PollTitle2 !== '') this.state.errors.PollTitle2 = ''
        this.setState({ PollTitle2: e.target.value });
    }
    onChangetitle3 = (e) => {
        if (this.state.PollTitle3 !== '') this.state.errors.PollTitle3 = ''
        this.setState({ PollTitle3: e.target.value });
    }
    onChangetitle4 = (e) => {
        if (this.state.PollTitle4 !== '') this.state.errors.PollTitle4 = ''
        this.setState({ PollTitle4: e.target.value });
    }
    onChangetitle5 = (e) => {
        if (this.state.PollTitle5 !== '') this.state.errors.PollTitle5 = ''
        this.setState({ PollTitle5: e.target.value });
    }
    onChangedesc = (e) => {
        if (this.state.PollDescription !== '') this.state.errors.PollDescription = ''
        this.setState({ PollDescription: e.target.value });
    }
    onChangedesc1 = (e) => {
        if (this.state.PollDescription1 !== '') this.state.errors.PollDescription1 = ''
        this.setState({ PollDescription1: e.target.value });
    }
    onChangedesc2 = (e) => {
        if (this.state.PollDescription2 !== '') this.state.errors.PollDescription2 = ''
        this.setState({ PollDescription2: e.target.value });
    }
    onChangedesc3 = (e) => {
        if (this.state.PollDescription3 !== '') this.state.errors.PollDescription3 = ''
        this.setState({ PollDescription3: e.target.value });
    }
    onChangedesc4 = (e) => {
        if (this.state.PollDescription4 !== '') this.state.errors.PollDescription4 = ''
        this.setState({ PollDescription4: e.target.value });
    }
    onChangedesc5 = (e) => {
        if (this.state.PollDescription5 !== '') this.state.errors.PollDescription5 = ''
        this.setState({ PollDescription5: e.target.value });
    }
    onImageChange1 = (info) => {
        if (info.file.status === 'done') {

            message.success(`${info.file.name} file uploaded successfully`);
            if (this.state.imagechange1 !== '') this.state.errors.imagechange1 = ''

            this.setState({
                imagechange1: info.file.response.data
            })
        }
    }
    onImageChange6 = (info) => {
        if (info.file.status === 'done') {

            message.success(`${info.file.name} file uploaded successfully`);
            if (this.state.imagechange66 !== '') this.state.errors.imagechange66 = ''
            this.setState({
                imagechange66: info.file.response.data
            })
        }
    }
    onImageChange2 = (info) => {
        if (info.file.status === 'done') {

            message.success(`${info.file.name} file uploaded successfully`);
            if (this.state.imagechange2 !== '') this.state.errors.imagechange2 = ''
            this.setState({
                imagechange2: info.file.response.data
            })
        }
    }
    onImageChange3 = (info) => {
        if (info.file.status === 'done') {

            message.success(`${info.file.name} file uploaded successfully`);
            if (this.state.imagechange3 !== '') this.state.errors.imagechange3 = ''
            this.setState({
                imagechange3: info.file.response.data
            })
        }
    }
    onChangeIwtn1 = (e) => {
        if (this.state.IWITHOUTTN1 !== '') this.state.errors.IWITHOUTTN1 = ''
        this.setState({ IWITHOUTTN1: e.target.value });
    }
    onChangeIwtn2 = (e) => {
        if (this.state.IWITHOUTTN2 !== '') this.state.errors.IWITHOUTTN2 = ''
        this.setState({ IWITHOUTTN2: e.target.value });
    }
    onChangeIwtn3 = (e) => {
        if (this.state.IWITHOUTTN3 !== '') this.state.errors.IWITHOUTTN3 = ''
        this.setState({ IWITHOUTTN3: e.target.value });
    }
    onChangeEmoji = (value) => {
        if (this.state.emojiOption !== '') this.state.errors.emojiOption = ''
        this.setState({ emojiOption: value });
    }
    onEmojiChange1 = (e) => {
        if (this.state.emojiName1 !== '') this.state.errors.emojiName1 = ''
        this.setState({ emojiName1: e.target.value })
    }
    onEmojiChange2 = (e) => {
        if (this.state.emojiName2 !== '') this.state.errors.emojiName2 = ''
        this.setState({ emojiName2: e.target.value })
    }
    onEmojiChange3 = (e) => {
        if (this.state.emojiName3 !== '') this.state.errors.emojiName3 = ''
        this.setState({ emojiName3: e.target.value })
    }
    onChangeemoji1 = (info) => {
        if (info.file.status === 'done') {

            message.success(`${info.file.name} file uploaded successfully`);
            if (this.state.imageemoji1 !== '') this.state.errors.imageemoji1 = ''
            this.setState({
                imageemoji1: info.file.response.data
            })
        }
    }
    onChangeemoji2 = (info) => {
        if (info.file.status === 'done') {

            message.success(`${info.file.name} file uploaded successfully`);
            if (this.state.imageemoji2 !== '') this.state.errors.imageemoji2 = ''
            this.setState({
                imageemoji2: info.file.response.data
            })
        }
    }
    onChangeemoji3 = (info) => {
        if (info.file.status === 'done') {

            message.success(`${info.file.name} file uploaded successfully`);
            if (this.state.imageemoji3 !== '') this.state.errors.imageemoji3 = ''
            this.setState({
                imageemoji3: info.file.response.data
            })
        }
    }
    onChangebanner = (info) => {
        if (info.file.status === 'done') {

            message.success(`${info.file.name} file uploaded successfully`);
            if (this.state.bannerImage !== '') this.state.errors.bannerImage = ''
            this.setState({
                bannerImage: info.file.response.data
            })
        }
    }
    onTextwithimage = (checked) => {
        if (this.state.textwithimageswitch !== '') this.state.errors.textwithimageswitch = ''
        this.setState({ textwithimageswitch: checked });
    }
    onTwtimerImage = (info) => {
        if (info.file.status === 'done') {

            message.success(`${info.file.name} file uploaded successfully`);
            if (this.state.twtimerImage !== '') this.state.errors.twtimerImage = ''
            this.setState({
                twtimerImage: info.file.response.data
            })
        }
    }
    onChangetwt1 = (e) => {
        this.setState({ textwithtimer1: e.target.value });
    }
    onChangetwt2 = (e) => {
        this.setState({ textwithtimer2: e.target.value });
    }
    onChangetwts = (checked) => {
        if (this.state.twtswitch !== '') this.state.errors.twtswitch = ''
        this.setState({ twtswitch: checked })
    }
    onChangewinners = (checked) => {
        if (this.state.winnswitch !== '') this.state.errors.winnswitch = ''
        this.setState({ winnswitch: checked })
    }
    onDisplaytime = (checked) => {
        if (this.state.diplaytimer !== '') this.state.errors.diplaytimer = ''
        this.setState({ diplaytimer: checked })
    }
    onImageImage = (info) => {
        if (info.file.status === 'done') {

            message.success(`${info.file.name} file uploaded successfully`);
            if (this.state.imageimage1 !== '') this.state.errors.imageimage1 = ''
            this.setState({
                imageimage1: info.file.response.data
            })
        }
    }
    onImageImag = (info) => {
        if (info.file.status === 'done') {

            message.success(`${info.file.name} file uploaded successfully`);
            if (this.state.imageimage2 !== '') this.state.errors.imageimage2 = ''
            this.setState({
                imageimage2: info.file.response.data
            })
        }
    }
    onTimerwithdiffimage = (info) => {
        if (info.file.status === 'done') {

            message.success(`${info.file.name} file uploaded successfully`);
            if (this.state.timerwdcimage !== '') this.state.errors.timerwdcimage = ''
            this.setState({
                timerwdcimage: info.file.response.data
            })
        }
    }
    textoChange1 = (e) => {
        if (this.state.textoption1 !== '') this.state.errors.textoption1 = ''
        this.setState({ textoption1: e.target.value });
    }
    textoChange2 = (e) => {
        if (this.state.textoption2 !== '') this.state.errors.textoption2 = ''
        this.setState({ textoption2: e.target.value });
    }
    imageChangeOption1 = (e) => {
        if (this.state.imageoption1 !== '') this.state.errors.imageoption1 = ''
        this.setState({ imageoption1: e.target.value })
    }
    imageChangeOption2 = (e) => {
        if (this.state.imageoption2 !== '') this.state.errors.imageoption2 = ''
        this.setState({ imageoption2: e.target.value })
    }

    //------new added tags ----//
    /* state = {
         tags: ['Unremovable', 'Tag 2', 'Tag 3'],
         inputVisible: false,
         inputValue: '',
     };
 
     handleClose = (removedTag) => {
         const tags = this.state.tags.filter(tag => tag !== removedTag);
         console.log(tags);
         this.setState({ tags });
     }
 
     showInput = () => {
         this.setState({ inputVisible: true }, () => this.input.focus());
     }
 
     handleInputChange = (e) => {
         this.setState({ inputValue: e.target.value });
     }
 
     handleInputConfirm = () => {
         const state = this.state;
         const inputValue = state.inputValue;
         let tags = state.tags;
         if (inputValue && tags.indexOf(inputValue) === -1) {
             tags = [...tags, inputValue];
         }
         console.log(tags);
         this.setState({
             tags,
             inputVisible: false,
             inputValue: '',
         });
     }
 
     saveInputRef = input => this.input = input*/

    //--------//




    render() {
        console.log("this.state", this.state);
        var mapCategories = this.state.categories.map((category) => <Option value={category._id}>{category.name}</Option>);
        var mapsubCategories = this.state.subCategories.map((subcategory) => <Option value={subcategory._id}>{subcategory.name}</Option>);
        var mapCelebrities = this.state.celebrities.map((celebrity) => <Option value={celebrity.celebrityName}>{celebrity.celebrityName}</Option>);
        const { tags} = this.state;
        const { creativeTags, inputVisible, inputValue } = this.state;
        const { current } = this.state;
        const { selectpolltype, radiotype, optionsvalue } = this.state
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
                    this.setState({ creativeMediaUrl: '' });
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            }
        };

        const childrenlocations = this.state.locationsList.map((category) => <Option value={category}>{category}</Option>)
        const steps = [{
            title: 'Poll Details',
            content:
            <Col span={24} className="NewCreatePollBody">
                <Form autoComplete={'off'}>
                    <Col span={24}>
                        <Col span={7} xl={{ span: 5 }}>
                            <FormItem label="Poll Type" className={classnames('selectpolltype', { error: !!this.state.errors.selectpolltype })}>
                                <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                    value={this.state.selectpolltype || undefined}
                                    onChange={this.onselectPollType} placeholder="Select Poll Category"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                    <Option value="imageWithOutTimer">Image With out Timer</Option>
                                    <Option value="textWithEmoji">Text With Emoji</Option>
                                    <Option value="textWithOutTimer">Text Without Timer </Option>
                                    <Option value="pair">Pair Model</Option>
                                    <Option value="TimerWithDifferentContextes">Timer With Different Contextes</Option>
                                </Select>
                                <p>{this.state.errors.selectpolltype}</p>
                            </FormItem>
                        </Col>




                        <Col span={5} xl={{ span: 4 }} offset={1} className="Mobilehomedisplayselect">
                            <FormItem label="Mobile Display Section"
                                className={classnames('displayhome', { error: !!this.state.errors.displayhome })}>
                                <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                    value={this.state.displayhome} style={{ width: '100%' }} onChange={this.displayHome}>
                                    <Option value="FanKick Home">FanKick Home</Option>
                                    <Option value="FanClub Home One">FanClub Home One</Option>
                                    <Option value="FanClub Home Two">FanClub Home Two</Option>
                                </Select>
                                <p>{this.state.errors.displayhome}</p>
                            </FormItem>
                        </Col>

                    </Col>
                    {this.state.selectpolltype === '' ? null : this.state.selectpolltype === "TimerWithDifferentContextes" ? <div>
                        <Col span={24}>
                            <Col span={13} xl={{ span: 10 }}>
                                <FormItem label="Poll Details" className={classnames('polldetails', { error: !!this.state.errors.polldetails })}>
                                    <Input placeholder="Poll Details" value={this.state.polldetails} onChange={this.onChangepolldetails} />
                                    <p>{this.state.errors.polldetails}</p>
                                </FormItem>
                            </Col>
                        </Col>
                    </div> : null}
                    {this.state.selectpolltype != '' ? <div>
                        <Col span={24} className="pollstartenddatetimes">
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
                            <Col span={4} offset={3} className="Pollendtimess">
                                <h6 className='h6Fnt'>Poll End Time</h6>
                                <FormItem className={classnames('enddateandtime', { error: !!this.state.errors.enddateandtime })}>
                                    <DatePicker getCalendarContainer={triggerNode => triggerNode.parentNode}
                                        showTime
                                        value={this.state.enddateandtime ? moment(this.state.enddateandtime, dateFormat) : ''}
                                        format="YYYY-MM-DD HH:mm:ss"
                                        placeholder="Ends At"
                                        onChange={this.onChange1}
                                        onOk={this.onOk}
                                        />
                                    <p>{this.state.errors.enddateandtime}</p>
                                </FormItem>
                            </Col>
                        </Col>

                        <Col span={24}>
                            <Col span={13} xl={{ span: 10 }}>
                                <FormItem label="Poll Title" className={classnames('NewPollTitle', { error: !!this.state.errors.NewPollTitle })}>
                                    <Input autoComplete={'off'} placeholder="Poll Title" name="NewPollTitle" value={this.state.NewPollTitle} onChange={this.onChangetitleNew} />
                                    <p>{this.state.errors.NewPollTitle}</p>
                                </FormItem>
                            </Col>
                        </Col>
                    </div> : null}
                    {this.state.stratdateandtime != '' && this.state.enddateandtime != '' ?
                        <Col span={24} className="pollstartenddatetimes">
                            <Col span={4}>
                                <h6 className='h6Fnt'>Poll Show Time</h6>
                                <FormItem className={classnames('showTimeValue', { error: !!this.state.errors.showTimeValue })}>

                                    <DatePicker getCalendarContainer={triggerNode => triggerNode.parentNode}
                                        showTime
                                        value={this.state.showTimeValue ? moment(this.state.showTimeValue, dateFormat) : ''}
                                        format="YYYY-MM-DD HH:mm:ss"
                                        placeholder="Starts At"
                                        onChange={this.onChangeShow}
                                        onOk={this.onOk}
                                        />
                                    <p>{this.state.errors.showTimeValue}</p>
                                </FormItem>
                            </Col>
                            <Col span={4} offset={3} className="Pollendtimess">
                                <h6 className='h6Fnt'>Poll Hide Time</h6>
                                <FormItem className={classnames('hideTimeValue', { error: !!this.state.errors.hideTimeValue })}>
                                    <DatePicker getCalendarContainer={triggerNode => triggerNode.parentNode}
                                        showTime
                                        value={this.state.hideTimeValue ? moment(this.state.hideTimeValue, dateFormat) : ''}
                                        format="YYYY-MM-DD HH:mm:ss"
                                        placeholder="Ends At"
                                        onChange={this.onChangeHide}
                                        onOk={this.onOk}
                                        />
                                    <p>{this.state.errors.hideTimeValue}</p>
                                </FormItem>
                            </Col>
                        </Col> : null}
                    {this.state.selectpolltype != '' ?
                        <Col span={24} className="CreateDatacreativeTagsCreativie">
                            <FormItem label="Tags" className={classnames('creativeTags', { error: !!this.state.errors.creativeTags })}>
                                <div className="CreateDataTypeTagWords45 ant-col-10 ant-col-xl-7">
                                    {inputVisible && (
                                        <Input className="balckpather"
                                            ref={this.saveInputRef}
                                            type="text"
                                            size="small"
                                            style={{ width: '71%', height: '30px' }}
                                            value={inputValue}

                                            onChange={this.handleInputChange}
                                            onBlur={this.handleInputConfirm}
                                            onPressEnter={this.handleInputConfirm}
                                            />
                                    )}
                                    {!inputVisible && (
                                        <Tag className="CreatepollDataTypeTagWords"
                                            onClick={this.showInput}
                                            >

                                        </Tag>
                                    )}
                                    <Button className="CreatepolltaddAddbtn" type="primary">ADD </Button>
                                </div>
                                <div className="PollTags">
                                    {creativeTags === undefined ? null : creativeTags.map((tag, index) => {
                                        const isLongTag = tag.length > 20;
                                        const tagElem = (
                                            <Tag key={tag} closable={index !== -1} afterClose={() => this.handleClose(tag)}>
                                                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                            </Tag>
                                        );
                                        return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                                    })}
                                </div>
                                <span>{this.state.errors.creativeTags}</span>
                            </FormItem>
                        </Col>
                        : null}

                    <Col span={24}>
                        <Col span={13} xl={{ span: 10 }}>
                            <FormItem label="Background Image url for Declared winners"
                                className={classnames('declaredimage', { error: !!this.state.errors.declaredimage })}>
                                <Input placeholder="Enter Background Image" value={this.state.declaredimage}
                                    name="declaredimage" onChange={this.ondeclaredImage} />
                                <p>{this.state.errors.declaredimage}</p>
                            </FormItem>
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Col span={13} xl={{ span: 10 }}>
                            <FormItem label="Location tags"
                                className={classnames('selectedLocations', { error: !!this.state.errors.selectedLocations })}>
                                <Select className="electionpolllocationsh" getPopupContainer={triggerNode => triggerNode.parentNode}
                                    showSearch
                                    mode="multiple"
                                    optionFilterProp="children"
                                    style={{ width: '100%' }}
                                    placeholder="Tags Mode"
                                    value={this.state.selectedLocations || undefined}
                                    onChange={this.handleChangeLocation}

                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                    {childrenlocations}
                                </Select>
                                <p>{this.state.errors.selectedLocations}</p>

                            </FormItem>
                        </Col>
                    </Col>

                    {selectpolltype === "TimerWithDifferentContextes" ? <div>
                        <Col span={24} className="cpollTimerwithdiffcontext">
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
                                            <Input autoComplete={'off'} name="PollTitle1" value={this.state.PollTitle1} onChange={this.onChangetitle1} />
                                            <p>{this.state.errors.PollTitle1}</p>
                                        </FormItem>
                                    </li>
                                    <li>
                                        <h6 className='h6Fnt'>Poll Caption</h6>
                                        <FormItem className={classnames('PollDescription1', { error: !!this.state.errors.PollDescription1 })}>
                                            <TextArea rows={3} placeholder="Enter Caption here" value={this.state.PollDescription1} name="PollDescription1" onChange={this.onChangedesc1} />
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
                                            <Input autoComplete={'off'} name="PollTitle2" value={this.state.PollTitle2} onChange={this.onChangetitle2} />
                                            <p>{this.state.errors.PollTitle2}</p>
                                        </FormItem>
                                    </li>
                                    <li>
                                        <h6 className='h6Fnt'>Poll Caption</h6>
                                        <FormItem className={classnames('PollDescription2', { error: !!this.state.errors.PollDescription2 })}>
                                            <TextArea rows={3} placeholder="Enter Caption here" value={this.state.PollDescription2} name="PollDescription2" onChange={this.onChangedesc2} />
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
                                            <Input autoComplete={'off'} name="PollTitle3" value={this.state.PollTitle3} onChange={this.onChangetitle3} />
                                            <p>{this.state.errors.PollTitle3}</p>
                                        </FormItem>
                                    </li>
                                    <li>
                                        <h6 className='h6Fnt'>Poll Caption</h6>
                                        <FormItem className={classnames('PollDescription3', { error: !!this.state.errors.PollDescription3 })}>
                                            <TextArea rows={3} placeholder="Enter Caption here" value={this.state.PollDescription3} name="PollDescription3" onChange={this.onChangedesc3} />
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
                                            <Input autoComplete={'off'} name="PollTitle4" value={this.state.PollTitle4} onChange={this.onChangetitle4} />
                                            <p>{this.state.errors.PollTitle4}</p>
                                        </FormItem>
                                    </li>
                                    <li>
                                        <h6 className='h6Fnt'>Poll Caption</h6>
                                        <FormItem className={classnames('PollDescription4', { error: !!this.state.errors.PollDescription4 })} >
                                            <TextArea rows={3} placeholder="Enter Caption here" value={this.state.PollDescription4} name="PollDescription4" onChange={this.onChangedesc4} />
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
                                            <Input autoComplete={'off'} name="PollTitle5" value={this.state.PollTitle5} onChange={this.onChangetitle5} />
                                            <p>{this.state.errors.PollTitle5}</p>
                                        </FormItem>
                                    </li>
                                    <li>
                                        <h6 className='h6Fnt'>Poll Caption</h6>
                                        <FormItem className={classnames('PollDescription5', { error: !!this.state.errors.PollDescription5 })}>
                                            <TextArea rows={3} placeholder="Enter Caption here" value={this.state.PollDescription5} name="PollDescription5" onChange={this.onChangedesc5} />
                                            <p>{this.state.errors.PollDescription5}</p>
                                        </FormItem>
                                    </li>
                                </ul>

                            </Col>
                        </Col>
                    </div> : null}
                </Form>
            </Col>

        },
        {
            title: 'Poll Reference',
            content: <Col span={24}>
                <Col span={24}>
                    <Col span={6}>
                        <FormItem label="Author Name">
                            <Input placeholder="Author Name" />
                        </FormItem>
                    </Col>
                </Col>
                <Col span={24}>
                    <Col span={6}>
                        <FormItem label="Movie Name">
                            <Input placeholder="Movie Name" />
                        </FormItem>
                    </Col>
                </Col>
                <Col span={24}>
                    <FormItem label="Major Keywords">

                        <div>
                            {tags.map((tag, index) => {
                                const isLongTag = tag.length > 20;
                                const tagElem = (
                                    <Tag key={tag} closable={index !== -1} afterClose={() => this.handleClose(tag)}>
                                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                    </Tag>
                                );
                                return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                            })}
                            {inputVisible && (
                                <Input
                                    ref={this.saveInputRef}
                                    type="text"
                                    size="small"
                                    style={{ width: 78 }}
                                    value={inputValue}
                                    onChange={this.handleInputChange}
                                    onBlur={this.handleInputConfirm}
                                    onPressEnter={this.handleInputConfirm}
                                    />
                            )}
                            {!inputVisible && (
                                <Tag
                                    onClick={this.showInput}
                                    style={{ background: '#fff', borderStyle: 'dashed' }}
                                    >
                                    <Icon type="plus" /> New Tag
          </Tag>
                            )}
                        </div>
                    </FormItem>
                </Col>

                <Col span={24}>
                    <FormItem label="Minor Keywords">

                        <div>
                            {tags.map((tag, index) => {
                                const isLongTag = tag.length > 20;
                                const tagElem = (
                                    <Tag key={tag} closable={index !== -1} afterClose={() => this.handleClose(tag)}>
                                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                    </Tag>
                                );
                                return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                            })}
                            {inputVisible && (
                                <Input
                                    ref={this.saveInputRef}
                                    type="text"
                                    size="small"
                                    style={{ width: 78 }}
                                    value={inputValue}
                                    onChange={this.handleInputChange}
                                    onBlur={this.handleInputConfirm}
                                    onPressEnter={this.handleInputConfirm}
                                    />
                            )}
                            {!inputVisible && (
                                <Tag
                                    onClick={this.showInput}
                                    style={{ background: '#fff', borderStyle: 'dashed' }}
                                    >
                                    <Icon type="plus" /> New Tag
          </Tag>
                            )}
                        </div>
                    </FormItem>
                </Col>






            </Col>,
        },

        {
            title: 'Add Media',
            content:
            <Col span={24}>
                <Form autoComplete={'off'}>
                    {selectpolltype === "textWithEmoji" ?
                        <div className="Emojis">

                            <Col span={24}>
                                <Col span={10}>
                                    <FormItem label="Select Option" className={classnames('emojiOption', { error: !!this.state.errors.emojiOption })}>
                                        <ul className="list-inline">
                                            <li className="cpolltextWithEmoji">
                                                <span className="h6Fnt">  Select No Of Emojis </span>
                                            </li>
                                            <li>
                                                <Select value={this.state.emojiOption || undefined}
                                                    placeholder="Select number" style={{ width: 120 }} onChange={this.onChangeEmoji}>
                                                    <Option value="2">2</Option>
                                                    <Option value="3">3</Option>

                                                </Select>
                                            </li>
                                        </ul>
                                        <span>{this.state.errors.emojiOption}</span>
                                    </FormItem>
                                </Col>
                            </Col>
                            <Col span={24}>
                                <Col span={14} xl={{ span: 10 }} className="EmojiBannerImg">
                                    <FormItem label="Banner Image" className={classnames('bannerImage', { error: !!this.state.errors.bannerImage })}>
                                        <Upload {...props}
                                            className="ElecTonban avatar-uploader"
                                            showUploadList={false}
                                            onChange={this.onChangebanner}

                                            accept=".png,.jpg,.jpeg"
                                            >
                                            {
                                                this.state.bannerImage ?
                                                    <img src={this.state.bannerImage} name="contestIcon" alt="contest Icon Img" className="avatar" style={{ width: 143, height: 143 }} /> :
                                                    <Icon type="plus" className="avatar-uploader-trigger" />
                                            }
                                        </Upload>
                                        <span>{this.state.errors.bannerImage}</span>
                                    </FormItem>
                                </Col>
                            </Col>

                            <Col span={24} className="CpolltextWithEmojioptns">
                                <Col span={6} xl={{ span: 4 }}>
                                    <FormItem label="Text 1" className={classnames('emojiName1', { error: !!this.state.errors.emojiName1 })}>
                                        <Input placeholder="Enter Text here" name="emojiName1" value={this.state.emojiName1} onChange={this.onEmojiChange1} />
                                        <span>{this.state.errors.emojiName1}</span>
                                    </FormItem>
                                </Col>

                                <Col span={6} xl={{ span: 4 }} offset={2}>
                                    <FormItem label="Text 2" className={classnames('emojiName2', { error: !!this.state.errors.emojiName2 })}>
                                        <Input value={this.state.emojiName2} placeholder="Enter Text here" name="emojiName2" onChange={this.onEmojiChange2} />
                                        <span>{this.state.errors.emojiName2}</span>
                                    </FormItem>
                                </Col>
                                {this.state.emojiOption === "3" || this.state.emojiOption === 3 ?
                                    <Col span={6} xl={{ span: 4 }} offset={2}>
                                        <FormItem label="Text 3" className={classnames('emojiName3', { error: !!this.state.errors.emojiName3 })}>
                                            <Input value={this.state.emojiName3} placeholder="Enter Text here" name="emojiName3" onChange={this.onEmojiChange3} />
                                            <span>{this.state.errors.emojiName3}</span>
                                        </FormItem>
                                    </Col>
                                    : null}
                            </Col>

                            <Col span={24}>
                                <Col span={6} xl={{ span: 4 }} className="CpollTextwithemojiimgoptns">
                                    <FormItem label="Add option1 Emoji" className={classnames('imageemoji1', { error: !!this.state.errors.imageemoji1 })} >
                                        <Upload {...props}
                                            onChange={this.onChangeemoji1}
                                            showUploadList={false}
                                            accept=".png,.jpg,.jpeg">
                                            {
                                                this.state.imageemoji1 ?
                                                    <img src={this.state.imageemoji1} name="contestIcon" alt="Contest Icon" className="avatar circleImg" style={{ width: 80, height: 80 }} /> :
                                                    <Icon type="plus" className="avatar-uploader-trigger circleImg" style={{ width: 80, height: 80, border: '1px solid #EBEAEA' }} />
                                            }
                                        </Upload>
                                        <span>{this.state.errors.imageemoji1}</span>
                                    </FormItem>
                                </Col>

                                <Col span={6} xl={{ span: 4 }} offset={2} className="CpollTextwithemojiimgoptns">
                                    <FormItem label="Add option2 Emoji" className={classnames('imageemoji2', { error: !!this.state.errors.imageemoji2 })} >
                                        <Upload {...props}
                                            onChange={this.onChangeemoji2}
                                            showUploadList={false}
                                            accept=".png,.jpg,.jpeg">
                                            {
                                                this.state.imageemoji2 ?
                                                    <img src={this.state.imageemoji2} name="contestIcon" alt="Contest Icon" className="avatar circleImg" style={{ width: 80, height: 80 }} /> :
                                                    <Icon type="plus" className="avatar-uploader-trigger circleImg" style={{ width: 80, height: 80, border: '1px solid #EBEAEA' }} />
                                            }
                                        </Upload>
                                        <span>{this.state.errors.imageemoji2}</span>
                                    </FormItem>
                                </Col>
                                {this.state.emojiOption === "3" || this.state.emojiOption === 3 ?
                                    <Col span={6} xl={{ span: 4 }} offset={2} className="CpollTextwithemojiimgoptns">
                                        <FormItem label="Add option3 Emoji" className={classnames('imageemoji3', { error: !!this.state.errors.imageemoji3 })}>
                                            <Upload {...props}
                                                onChange={this.onChangeemoji3}
                                                showUploadList={false}
                                                accept=".png,.jpg,.jpeg">
                                                {
                                                    this.state.imageemoji3 ?
                                                        <img src={this.state.imageemoji3} name="contestIcon" alt="Contest Icon" className="avatar circleImg" style={{ width: 80, height: 80 }} /> :
                                                        <Icon type="plus" className="avatar-uploader-trigger circleImg" style={{ width: 80, height: 80, border: '1px solid #EBEAEA' }} />
                                                }
                                            </Upload>
                                            <span>{this.state.errors.imageemoji3}</span>
                                        </FormItem>
                                    </Col> : null}
                            </Col>

                            <Col span={24}>
                                <Col span={10} className="CpolltextWithEmojiswitch">
                                    <FormItem className={classnames('textwithimageswitch', { error: !!this.state.errors.textwithimageswitch })}>
                                        <ul className="list-inline">
                                            <li>
                                                <span className="h6Fnt"> Should we have Wnners for this Poll ?</span>
                                            </li>
                                            <li>
                                                <Switch checked={this.state.textwithimageswitch} onChange={this.onTextwithimage} />
                                            </li>
                                        </ul>
                                        <span>{this.state.errors.textwithimageswitch}</span>
                                    </FormItem>
                                </Col>
                            </Col>
                        </div>
                        : null}
                    {selectpolltype === "textWithOutTimer" ?

                        <div className="textWithOutTimer">

                            <Col span={24}>
                                <Col span={14} xl={{ span: 10 }} className="textWithOutTimerbanImg">
                                    <FormItem label="Banner Image" className={classnames('twtimerImage', { error: !!this.state.errors.twtimerImage })}>
                                        <Upload {...props}
                                            className="ElecTonban avatar-uploader"
                                            showUploadList={false}
                                            onChange={this.onTwtimerImage}

                                            accept=".png,.jpg,.jpeg"
                                            >
                                            {
                                                this.state.twtimerImage ?
                                                    <img src={this.state.twtimerImage} name="contestIcon" alt="contest Icon Img" className="avatar" style={{ width: 143, height: 143 }} /> :
                                                    <Icon type="plus" className="avatar-uploader-trigger" />
                                            }
                                        </Upload>
                                        <span>{this.state.errors.twtimerImage}</span>
                                    </FormItem>
                                </Col>
                            </Col>


                            <Col span={24} className="cpolltextWithOutTimeroptns">
                                <Col span={14} xl={{ span: 10 }}>
                                    <FormItem label="Text 1" className={classnames('textwithtimer1', { error: !!this.state.errors.textwithtimer1 })}>
                                        <Input placeholder="Enter Text here" value={this.state.textwithtimer1} name="textwithtimer1" onChange={this.onChangetwt1} />
                                        <span>{this.state.errors.textwithtimer1}</span>
                                    </FormItem>
                                </Col>
                            </Col>
                            <Col span={24}>
                                <Col span={14} xl={{ span: 10 }}>
                                    <FormItem label="Text 2" className={classnames('textwithtimer2', { error: !!this.state.errors.textwithtimer2 })}>
                                        <Input placeholder="Enter Text here" name="textwithtimer2" value={this.state.textwithtimer2} onChange={this.onChangetwt2} />
                                        <span>{this.state.errors.textwithtimer2}</span>
                                    </FormItem>
                                </Col>
                            </Col>

                            <Col span={24}>
                                <Col span={14} xl={{ span: 6 }} className="cpolltextWithOutTimerswitch">
                                    <FormItem className={classnames('twtswitch', { error: !!this.state.errors.twtswitch })}>
                                        <ul className="list-inline">
                                            <li>
                                                <span className="h6Fnt">  Should we have Wnners for this Poll ? </span>
                                            </li>
                                            <li>
                                                <Switch checked={this.state.twtswitch} onChange={this.onChangetwts} />
                                            </li>
                                        </ul>
                                        <span>{this.state.errors.twtswitch}</span>
                                    </FormItem>
                                </Col>
                            </Col>

                        </div> : null}
                    {selectpolltype === "imageWithOutTimer" ?
                        <div className="imageWithOutTimer">
                            {/* <h2>Image Without Timer</h2> */}
                            <Col span={24}>
                                <Col span={10}>
                                    <FormItem className={classnames("optionsvalue", { error: !!this.state.errors.optionsvalue })}>
                                        <ul className="list-inline">
                                            <li className="Listselectnosimagewithout"><span className="h6Fnt">
                                                Select No Of Options</span>
                                            </li>
                                            <li>
                                                <Select value={this.state.optionsvalue || undefined}
                                                    placeholder="select Number" style={{ width: 120 }} onChange={this.onChangeOptions}>
                                                    <Option value="2">2</Option>
                                                    <Option value="3">3</Option>

                                                </Select>
                                            </li>
                                        </ul>
                                        <span>{this.state.errors.optionsvalue}</span>
                                    </FormItem>
                                </Col>
                            </Col>
                            {/*   <Col span={6} xl={{ span: 4 }} offset={1}>
                                    <FormItem label="Add Option3 Image" className={classnames("imagechange66", { error: !!this.state.errors.imagechange66 })}>
                                        <Upload {...props}
                                            className="ElecTon avatar-uploader"
                                            showUploadList={false}
                                            onChange={this.onImageChange6}

                                            accept=".png,.jpg,.jpeg"
                                        >
                                            {
                                                this.state.imagechange66 ?
                                                    <img src={this.state.imagechange66} name="contestIcon" alt="contest Icon Img" className="avatar" style={{ width: 143, height: 143 }} /> :
                                                    <Icon type="plus" className="avatar-uploader-trigger" />
                                            }
                                        </Upload>
                                        <span>{this.state.errors.imagechange66}</span>
                                    </FormItem>
                                </Col>*/}
                            <Col span={24} className="PollimageWithOutTimer optns">
                                <Col span={6} xl={{ span: 4 }}>
                                    <FormItem label="Name1" className={classnames("IWITHOUTTN1", { error: !!this.state.errors.IWITHOUTTN1 })}>
                                        <Input placeholder="Enter Name" name="IWITHOUTTN1" value={this.state.IWITHOUTTN1} onChange={this.onChangeIwtn1} />
                                        <span>{this.state.errors.IWITHOUTTN1}</span>
                                    </FormItem>
                                </Col>

                                <Col span={6} xl={{ span: 4 }} offset={2}>
                                    <FormItem label="Name2" className={classnames("IWITHOUTTN2", { error: !!this.state.errors.IWITHOUTTN2 })}>
                                        <Input placeholder="Enter Name" name="IWITHOUTTN2" value={this.state.IWITHOUTTN2} onChange={this.onChangeIwtn2} />
                                        <span>{this.state.errors.IWITHOUTTN2}</span>
                                    </FormItem>
                                </Col>
                                {optionsvalue === "3" ? <div>
                                    <Col span={6} xl={{ span: 4 }} offset={2}>
                                        <FormItem label="Name3" className={classnames("IWITHOUTTN3", { error: !!this.state.errors.IWITHOUTTN3 })}>
                                            <Input placeholder="Enter Name" name="IWITHOUTTN3" value={this.state.IWITHOUTTN3} onChange={this.onChangeIwtn3} />
                                            <span>{this.state.errors.IWITHOUTTN3}</span>
                                        </FormItem>
                                    </Col></div> : null}
                            </Col>

                            <Col span={24}>
                                <Col span={6} xl={{ span: 4 }}>
                                    <FormItem label="Add Option1 Image" className={classnames("imagechange1", { error: !!this.state.errors.imagechange1 })}>
                                        <Upload {...props}
                                            className="ElecTon avatar-uploader"
                                            showUploadList={false}
                                            onChange={this.onImageChange1}

                                            accept=".png,.jpg,.jpeg"
                                            >
                                            {
                                                this.state.imagechange1 ?
                                                    <img src={this.state.imagechange1} name="contestIcon" alt="contest Icon Img" className="avatar" style={{ width: 143, height: 143 }} /> :
                                                    <Icon type="plus" className="avatar-uploader-trigger" />
                                            }
                                        </Upload>
                                        <span>{this.state.errors.imagechange1}</span>
                                    </FormItem>
                                </Col>

                                <Col span={6} xl={{ span: 4 }} offset={2}>
                                    <FormItem label="Add Option2 Image" className={classnames("imagechange2", { error: !!this.state.errors.imagechange2 })}>
                                        <Upload {...props}
                                            className="ElecTon avatar-uploader"
                                            showUploadList={false}
                                            onChange={this.onImageChange2}

                                            accept=".png,.jpg,.jpeg"
                                            >
                                            {
                                                this.state.imagechange2 ?
                                                    <img src={this.state.imagechange2} name="contestIcon" alt="contest Icon Img" className="avatar" style={{ width: 143, height: 143 }} /> :
                                                    <Icon type="plus" className="avatar-uploader-trigger" />
                                            }
                                        </Upload>
                                        <span>{this.state.errors.imagechange2}</span>
                                    </FormItem>
                                </Col>
                                {optionsvalue === "3" ? <div>
                                    <Col span={6} xl={{ span: 4 }} offset={2}>
                                        <FormItem label="Add Option3 Image" className={classnames("imagechange3", { error: !!this.state.errors.imagechange3 })}>
                                            <Upload {...props}
                                                className="ElecTon avatar-uploader"
                                                showUploadList={false}
                                                onChange={this.onImageChange3}

                                                accept=".png,.jpg,.jpeg"
                                                >
                                                {
                                                    this.state.imagechange3 ?
                                                        <img src={this.state.imagechange3} name="contestIcon" alt="contest Icon Img" className="avatar" style={{ width: 143, height: 143 }} /> :
                                                        <Icon type="plus" className="avatar-uploader-trigger" />
                                                }
                                            </Upload>
                                            <span>{this.state.errors.imagechange3}</span>
                                        </FormItem>
                                    </Col></div> : null}
                            </Col>

                            <Col span={24} className="ElectPollimageswithoutimerswitchess">
                                <Col span={14} xl={{ span: 6 }}>
                                    <FormItem className={classnames("switchcheck", { error: !!this.state.errors.switchcheck })}>
                                        <ul className="list-inline">
                                            <li className="listimagewithoutimercheck">
                                                <span className="h6Fnt"> Should we have Wnners for this Poll ?</span>
                                            </li>
                                            <li>
                                                <Switch checked={this.state.switchcheck} onChange={this.onChangeSwitch} />
                                            </li>
                                        </ul>
                                        <span>{this.state.errors.switchcheck}</span>
                                    </FormItem>
                                </Col>
                            </Col>
                        </div>
                        : null}
                    {selectpolltype === "pair" ?
                        <div className="pair">
                            <Col span={24}>
                                <Col span={14} xl={{ span: 10 }} className="textWithOutTimerbanImg">
                                    <FormItem label="Banner Image" className={classnames("pairimage", { error: !!this.state.errors.pairimage })}>
                                        <Upload {...props}
                                            className="ElecTonpairban avatar-uploader"
                                            showUploadList={false}
                                            onChange={this.onpairImage}

                                            accept=".png,.jpg,.jpeg"
                                            >
                                            {
                                                this.state.pairimage ?
                                                    <img src={this.state.pairimage} name="contestIcon" alt="contest Icon Img" className="avatar" style={{ width: 143, height: 143 }} /> :
                                                    <Icon type="plus" className="avatar-uploader-trigger" />
                                            }
                                        </Upload>
                                        <span>{this.state.errors.pairimage}</span>
                                    </FormItem>
                                </Col>
                            </Col>
                            <Col span={24} className="cpollpairoptns">
                                <Col span={6} xl={{ span: 4 }}>
                                    <h4 className="pairoptionsheadin">Pair 1</h4>
                                    <FormItem label="Pair 1 FirstName" className={classnames("pairname1", { error: !!this.state.errors.pairname1 })}>
                                        <Input value={this.state.pairname1} placeholder="Enter Name" name="pairname1" onChange={this.onpairname1} />
                                        <span>{this.state.errors.pairname1}</span>
                                    </FormItem>
                                </Col>
                                <Col span={6} xl={{ span: 4 }} offset={2}>
                                    <h4 className="pairoptionsheadin">Pair 2</h4>
                                    <FormItem label="Pair 2 FirstName" className={classnames("pairname2", { error: !!this.state.errors.pairname2 })}>
                                        <Input value={this.state.pairname2} placeholder="Enter Name" name="pairname2" onChange={this.onpairname2} />
                                        <span>{this.state.errors.pairname2}</span>
                                    </FormItem>
                                </Col>
                            </Col>
                            <Col span={24}>
                                <Col span={6} xl={{ span: 4 }}>
                                    <FormItem label="Pair 1 SecondName" className={classnames("pairname3", { error: !!this.state.errors.pairname3 })}>
                                        <Input value={this.state.pairname3} placeholder="Enter Name" name="pairname3" onChange={this.onpairname3} />
                                        <span>{this.state.errors.pairname3}</span>
                                    </FormItem>
                                </Col>
                                <Col span={6} xl={{ span: 4 }} offset={2}>
                                    <FormItem label="Pair 2 SecondName" className={classnames("pairname4", { error: !!this.state.errors.pairname4 })}>
                                        <Input value={this.state.pairname4} placeholder="Enter Name" name="pairname4" onChange={this.onpairname4} />
                                        <span>{this.state.errors.pairname4}</span>
                                    </FormItem>
                                </Col>
                            </Col>
                            <Col span={24}>
                                <Col span={6} xl={{ span: 4 }}>
                                    <FormItem label="Add Pair 1 Image" className={classnames("pairimage1", { error: !!this.state.errors.pairimage1 })}>
                                        <Upload {...props}
                                            className="ElecTon avatar-uploader"
                                            showUploadList={false}
                                            onChange={this.onpairImage1}

                                            accept=".png,.jpg,.jpeg"
                                            >
                                            {
                                                this.state.pairimage1 ?
                                                    <img src={this.state.pairimage1} name="contestIcon" alt="contest Icon Img" className="avatar" style={{ width: 143, height: 143 }} /> :
                                                    <Icon type="plus" className="avatar-uploader-trigger" />
                                            }
                                        </Upload>
                                        <span>{this.state.errors.pairimage1}</span>
                                    </FormItem>
                                </Col>
                                <Col span={6} xl={{ span: 4 }} offset={2}>
                                    <FormItem label="Add Pair 2 Image" className={classnames("pairimage2", { error: !!this.state.errors.pairimage2 })}>
                                        <Upload {...props}
                                            className="ElecTon avatar-uploader"
                                            showUploadList={false}
                                            onChange={this.onpairImage2}

                                            accept=".png,.jpg,.jpeg"
                                            >
                                            {
                                                this.state.pairimage2 ?
                                                    <img src={this.state.pairimage2} name="contestIcon" alt="contest Icon Img" className="avatar" style={{ width: 143, height: 143 }} /> :
                                                    <Icon type="plus" className="avatar-uploader-trigger" />
                                            }
                                        </Upload>
                                        <span>{this.state.errors.pairimage2}</span>
                                    </FormItem>
                                </Col>

                            </Col>

                            <Col span={24}>
                                <Col span={14} xl={{ span: 6 }} className="cpollpairswitch">
                                    <FormItem className={classnames("pairswitch", { error: !!this.state.errors.pairswitch })}>
                                        <ul className="list-inline">
                                            <li>
                                                <span className="h6Fnt"> Should we have Wnners for this Poll ? </span>
                                            </li>
                                            <li>
                                                <Switch checked={this.state.pairswitch} onChange={this.onpairChange} />
                                            </li>
                                        </ul>
                                        <span>{this.state.errors.pairswitch}</span>
                                    </FormItem>
                                </Col>
                            </Col>
                        </div>
                        : null}
                    {selectpolltype === "TimerWithDifferentContextes" ?
                        <div className="TimerWithDifferentContextes">

                            <div className="MainHeaderContextes">

                                <Col span={24}>
                                    <Col span={8} xl={{ span: 6 }}>
                                        <FormItem className={classnames("radiotype", { error: !!this.state.errors.radiotype })}>
                                            <ul className="list-inline">
                                                <li>
                                                    <span className="h6Fnt">Select Type</span>
                                                </li>
                                                <li>
                                                    <RadioGroup onChange={this.onradioType} value={this.state.radiotype}>
                                                        <Radio value="text">Text</Radio>
                                                        <Radio value="image">Image</Radio>
                                                    </RadioGroup>
                                                    <span>{this.state.errors.radiotype}</span>
                                                </li>
                                            </ul>
                                        </FormItem>
                                    </Col>
                                </Col>
                            </div>

                            <div className="TextWithContextsBanimg">
                                <Col span={24}>
                                    <Col span={14} xl={{ span: 10 }} className="textWithOutTimerbanImg">
                                        <FormItem label="Banner Image" className={classnames("timerwdcimage", { error: !!this.state.errors.timerwdcimage })}>
                                            <Upload {...props}
                                                className="ElecTonban avatar-uploader"
                                                showUploadList={false}
                                                onChange={this.onTimerwithdiffimage}

                                                accept=".png,.jpg,.jpeg"
                                                >
                                                {
                                                    this.state.timerwdcimage ?
                                                        <img src={this.state.timerwdcimage} name="contestIcon" alt="contest Icon Img" className="avatar" style={{ width: 143, height: 143 }} /> :
                                                        <Icon type="plus" className="avatar-uploader-trigger" />
                                                }
                                            </Upload>
                                            <span>{this.state.errors.timerwdcimage}</span>
                                        </FormItem>
                                    </Col>
                                </Col>
                            </div>
                            {radiotype === "text" ?
                                <div className="ContextTextType">

                                    <Col span={24}>
                                        <Col span={14} xl={{ span: 10 }} className="cpolltextwithdiifcontextoptions">
                                            <FormItem label="Option 1" className={classnames("textoption1", { error: !!this.state.errors.textoption1 })}>
                                                <Input placeholder="Enter Text here" name="textoption1" value={this.state.textoption1}
                                                    onChange={this.textoChange1} autocomplete="off" />
                                                <span>{this.state.errors.textoption1}</span>
                                            </FormItem>
                                        </Col>
                                    </Col>
                                    <Col span={24}>
                                        <Col span={14} xl={{ span: 10 }}>
                                            <FormItem label="Option 2" className={classnames("textoption2", { error: !!this.state.errors.textoption2 })}>
                                                <Input placeholder="Enter Text here" name="textoption2" value={this.state.textoption2}
                                                    onChange={this.textoChange2} autocomplete="off" />
                                                <span>{this.state.errors.textoption2}</span>
                                            </FormItem>
                                        </Col>
                                    </Col>
                                </div>
                                : null}
                            {radiotype === "image" ?
                                <div className="ContextImageType">
                                    <Col span={24} className="Cpollcontextimgoptns">
                                        <Col span={6} xl={{ span: 4 }} className={classnames("imageoption1", { error: !!this.state.errors.imageoption1 })}>
                                            <FormItem label="Option 1">
                                                <Input placeholder="Enter Text here" name="imageoption1" value={this.state.imageoption1}
                                                    onChange={this.imageChangeOption1} autocomplete="off" />
                                                <span>{this.state.errors.imageoption1}</span>
                                            </FormItem>
                                        </Col>
                                        <Col span={6} xl={{ span: 4 }} offset={2}>
                                            <FormItem label="Option 2" className={classnames("imageoption2", { error: !!this.state.errors.imageoption2 })}>
                                                <Input placeholder="Enter Text here" name="imageoption2" value={this.state.imageoption2}
                                                    onChange={this.imageChangeOption2} autocomplete="off" />
                                                <span>{this.state.errors.imageoption2}</span>
                                            </FormItem>
                                        </Col>
                                    </Col>

                                    <Col span={24}>
                                        <Col span={6} xl={{ span: 4 }}>
                                            <FormItem label="Add Option 1 Image" className={classnames("imageimage2", { error: !!this.state.errors.imageimage2 })}>
                                                <Upload {...props}
                                                    className="ElecTon avatar-uploader"
                                                    showUploadList={false}
                                                    onChange={this.onImageImag}

                                                    accept=".png,.jpg,.jpeg"
                                                    >
                                                    {
                                                        this.state.imageimage2 ?
                                                            <img src={this.state.imageimage2} name="contestIcon" alt="contest Icon Img" className="avatar" style={{ width: 143, height: 143 }} /> :
                                                            <Icon type="plus" className="avatar-uploader-trigger" />
                                                    }
                                                </Upload>
                                                <span>{this.state.errors.imageimage2}</span>
                                            </FormItem>
                                        </Col>

                                        <Col span={6} xl={{ span: 4 }} offset={2}>
                                            <FormItem label="Add Option 2 Image" className={classnames("imageimage1", { error: !!this.state.errors.imageimage1 })}>
                                                <Upload {...props}
                                                    className="ElecTon avatar-uploader"
                                                    showUploadList={false}
                                                    onChange={this.onImageImage}

                                                    accept=".png,.jpg,.jpeg"
                                                    >
                                                    {
                                                        this.state.imageimage1 ?
                                                            <img src={this.state.imageimage1} name="contestIcon" alt="contest Icon Img" className="avatar" style={{ width: 143, height: 143 }} /> :
                                                            <Icon type="plus" className="avatar-uploader-trigger" />
                                                    }
                                                </Upload>
                                                <span>{this.state.errors.imageimage1}</span>
                                            </FormItem>
                                        </Col>
                                    </Col>
                                </div> : null}
                            {radiotype != '' ?
                                <div className="DisplaContextTimer">
                                    {/* <Col span={24} className="cpollContextTimerswitches">
                                        <Col span={6}>
                                            <FormItem className={classnames("diplaytimer", { error: !!this.state.errors.diplaytimer })}>
                                                <ul className="list-inline">
                                                    <li>
                                                        <span className="h6Fnt">  Display Timer</span>
                                                    </li>
                                                    <li>
                                                        <Switch checked={this.state.diplaytimer} onChange={this.onDisplaytime} />
                                                    </li>
                                                </ul>
                                                <span>{this.state.errors.diplaytimer}</span>
                                            </FormItem>
                                        </Col>
                                    </Col> */}

                                    <Col span={24}>
                                        <Col span={14} xl={{ span: 6 }}>
                                            <FormItem className={classnames("winnswitch", { error: !!this.state.errors.winnswitch })}>
                                                <ul className="list-inline">
                                                    <li>
                                                        <span className="h6Fnt"> Should we have Wnners for this Poll ? </span>
                                                    </li>
                                                    <li>
                                                        <Switch checked={this.state.winnswitch} onChange={this.onChangewinners} />
                                                    </li>
                                                </ul>
                                                <span>{this.state.errors.winnswitch}</span>
                                            </FormItem>
                                        </Col>
                                    </Col>
                                </div>
                                : null}
                        </div>
                        : null}
                </Form>
            </Col>,
        }];
        return (
            <Dashboard>
                <div className="ElectionsSubMenu">
                    <div className="SubMenu">
                        <Col span={20}>
                            {this.state.editid === '' ? <Col span={4}><h2 className="pollingpageTitle">Create Polling</h2></Col> :
                                <Col span={4}><h2 className="pageTitle">Edit Polling</h2></Col>}
                            <Col span={3} lg={{span:4}} xl={{span:3}}>
                                <Select
                                    className="pollingCreateselect"
                                    getPopupContainer={triggerNode => triggerNode.parentNode}
                                    placeholder="Select Category"
                                    style={{ width: '100% ' }}
                                    optionFilterProp="children"
                                    onChange={this.onCategoryChange.bind(this)}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                    {mapCategories}
                                </Select>

                            </Col>
                            <Col span={3} lg={{span:4}} xl={{span:3}}>
                                <Select
                                    className="pollingCreateselect"
                                    getPopupContainer={triggerNode => triggerNode.parentNode}
                                   placeholder="Select SubCategory"
                                    style={{ width: '100% ' }}
                                    optionFilterProp="children"
                                    value={this.state.subCategoryId || undefined}
                                    onChange={this.onSubCategoryChange.bind(this)}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                    {mapsubCategories}
                                </Select>

                            </Col>
                            <Col span={3} lg={{span:4}} xl={{span:3}}>
                                <Select
                                    className="pollingCreateselect"
                                    getPopupContainer={triggerNode => triggerNode.parentNode}
                                   placeholder="Select Celebrity"
                                    style={{ width: '100% ' }}
                                    optionFilterProp="children"
                                    onChange={this.onCelbrityChange.bind(this)}
                                    value={this.state.celebrity || undefined}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                    {mapCelebrities}
                                </Select>

                            </Col>
                        </Col>
                        <Col span={4}>
                            <Link to="/Polling"><Button type="primary" className="pollBackBtn">Back to Dash Board</Button></Link>
                        </Col>
                    </div>
                </div>
                <div>
                    <Col span={16}>
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
                                        <Button type="primary" disabled={this.state.disabled} onClick={() => this.done()}>Done</Button>
                                    }
                                </div>
                            </Col>
                        </div>
                    </Col>
                </div>
            </Dashboard>
        );
    }
}

export default CreateNewElection;
/* eslint-disable */