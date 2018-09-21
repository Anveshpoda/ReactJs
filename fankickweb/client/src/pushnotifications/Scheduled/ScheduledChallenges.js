/* eslint-disable */
import React from 'react';
import { Input,InputNumber, Select, Row, Col, Form, Tabs, Tag, Tooltip, Radio, TimePicker, DatePicker, Upload, message, Steps, Button, Icon } from 'antd';
import AddTag from '../AddTag';
import { Link, browserHistory } from 'react-router';
import classnames from 'classnames';
import moment from 'moment';
import PlacesAutoComplete from '../Custom/PlaceAutoComplete';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';
const format = 'HH:mm:ss';

const Step = Steps.Step;
//const Step1 = Steps.Step;

const RadioGroup = Radio.Group;

function onChange(date, dateString) {
}
function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
class ScheduledChallenges extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 0,
            ChallengeCategory: '',
            category: '',
            nType: '',
            PartiCoun: '',
            Rangein: '',
            within: '',
            withinran1: '',
            withinran2: '',
            withinran3: '',
            withinran4: '',
            formovie: '',
            imageUrl1: '',
            title1: '',
            description1: '',
            location: '',
            city: '',
            movienames: '',
            ccc: '',
            datewithin1: '',
            newdatewithin1: '',
            newdatewithinran1: '',
            newdatewithinran2: '',
            Uw: '',
            errors: {},
            LikeAndDate: {},
            onDateDt: "",
            onDateTime: "",
            onWeeklyDay: "",
            onWeeklyTime: "",
            onTodayTime: "",
            scheduleCategory: "",
            tags: [],
            locationArray: [],
            scheduleDate: "",
            schedule: "",
            scheduleValue: "",
            editchallangedata: {},
            participatedlist: [
                {
                    "id": 0,
                    "name": "No. of Likes Received",
                    "_id": "5a2935c39f13aace6a173560"
                },
                {
                    "id": 1,
                    "name": "No. of Participations",
                    "_id": "5a2935da9f13aace6a173631"
                },
                {
                    "id": 2,
                    "name": "Participated",
                    "_id": "5a2935e89f13aace6a1736b7"
                }
            ]

        }
    }
    handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        const locationArray = this.state.locationArray.filter(loc => loc.location !== removedTag)
        this.setState({ tags, locationArray });
    }


    handleMapData = (data, locationId) => {
        var res = data.split(',');
        var locationObj = {}
        if (!this.state.tags.includes(res[0])) {
            locationObj.location = res[0];
            locationObj.locId = locationId;
            var locations = [...this.state.locationArray, locationObj]
            var tags = [...this.state.tags, res[0]];
            this.setState({
                tags: tags,
                locationArray: locations
            })
        }
    }
    componentWillMount() {
        if (this.props != undefined) {
            this.setState({ category: this.props.category, nType: this.props.nType })
        }
        var myObj = this.props.editData
        if (isEmpty(myObj)) {
        } else {
            var _this = this
            _this.setState({ editchallangedata: _this.props.editData });
            _this.setState({ category: _this.props.editData.category });
            _this.setState({ nType: _this.props.editData.type });
            _this.setState({ ChallengeCategory: _this.props.editData.targetUserCategory });
            _this.setState({ PartiCoun: _this.props.editData.targetActivity });
            _this.setState({ Rangein: _this.props.editData.range });
            _this.setState({ within: _this.props.editData.likesCount });
            _this.setState({ ccc: _this.props.editData.within });
            _this.setState({ withinran3: _this.props.editData.startLikesCount });
            _this.setState({ withinran4: _this.props.editData.endLikesCount });
            _this.setState({ withinran1: _this.props.editData.startDays });
            _this.setState({ withinran2: _this.props.editData.endDays });
            _this.setState({ datewithin1: _this.props.editData.days });
            _this.setState({ title1: _this.props.editData.title });
            _this.setState({ description1: _this.props.editData.description });
            _this.setState({ imageUrl1: _this.props.editData.imageUrl });
            _this.setState({ scheduleCategory: _this.props.editData.schedule })
            var dat = moment().subtract(_this.props.editData.startDays, 'days').calendar();
            var time = moment(dat).add(1, 'day').toISOString();
            _this.setState({ newdatewithinran2: time });
            var dat = moment().subtract(_this.props.editData.endDays, 'days').calendar();
            var time = moment(dat).add(1, 'day').toISOString();
            _this.setState({ newdatewithinran1: time });
            if (_this.props.editData.schedule === "") {
                _this.setState({ scheduleValue: "Immediately" });
                _this.setState({ onTodayTime: _this.props.editData.scheduledDate })
            } else if (_this.props.editData.schedule === "On Date") {
                _this.setState({ scheduleValue: "Schedule date and time" });
                const rdate = moment(_this.props.editData.scheduledDate).format('YYYY-MM-DD');
                _this.setState({ onDateDt: rdate });
                const tdate = moment(_this.props.editData.scheduledDate).format('HH:mm:ss');
                _this.setState({ onDateTime: tdate })
            } else if (_this.props.editData.schedule === "Weekly") {
                _this.setState({ scheduleValue: "Schedule date and time" });

                const dd = moment(_this.props.editData.scheduledDate).format('dddd')
                _this.setState({ onWeeklyDay: dd });
                const tdate = moment(_this.props.editData.scheduledDate).format('HH:mm:ss');
                _this.setState({ onWeeklyTime: tdate });
            } else if (_this.props.editData.schedule === "Monthly") {
                _this.setState({ scheduleValue: "Schedule date and time" });
                const rdate = moment(_this.props.editData.scheduledDate).format('YYYY-MM-DD');
                _this.setState({ onDateDt: rdate });
                const tdate = moment(_this.props.editData.scheduledDate).format('HH:mm:ss');
                _this.setState({ onDateTime: tdate })
            }
            if (_this.props.editData.locationTags.length === 0) {
                _this.setState({ location: "Global" })
            } else if (_this.props.editData.locationTags.length != 0) {
                _this.setState({ location: "Local" })
                _this.setState({ tags: _this.props.editData.locationTags })
                // _this.setState({locationArray:_this.state.editfanclubdata.location})
                var res = _this.props.editData.locationTags;
                var locationAr = _this.props.editData.location;
                var arr = [];
                for (var i = 0; i < locationAr.length; i++) {
                    var locationObj = {};
                    locationObj.location = res[i];
                    locationObj.locId = locationAr[i];
                    arr.push(locationObj);
                }
                _this.setState({ locationArray: arr });
                //var locations = [...this.state.locationArray, locationObj]

            }
        }
    }
    onChangelnam = (e) => {
        this.setState({ city: e.target.value });
        if (e.target.value !== '') this.state.errors.city = '';
        const string = e.target.value;
        const Uw1 = string.charAt(0).toUpperCase() + string.slice(1);
        this.setState({ Uw: Uw1 });
    }
    onChanRadio = (e) => {
        var self = this;
        this.setState({ location: e.target.value })
        if (e.target.value !== '') this.state.errors.location = '';
    }

    onChangeImg = (info) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            if (info.file.response.data !== '') this.state.errors.imageUrl1 = '';
            this.setState({
                imageUrl1: info.file.response.data
            })
        }
    }
    onChangewithinran3 = (e) => {
        this.setState({ withinran3: e });
        if (e !== '') this.state.errors.withinran3 = '';
    }
    onChangewithinran4 = (e) => {
        this.setState({ withinran4: e });
        if (e !== '') this.state.errors.withinran4 = '';
    }
    onChangewithinran1 = (e) => {
        this.setState({ withinran1: e })
        if (e !== '') this.state.errors.withinran1 = '';
        const number = e;
        var date = new Date();
        date.setDate(date.getDate() - number);
        const newdate = moment(date).format();
        this.setState({ newdatewithinran1: newdate })
    }
    onChangewithinran2 = (e) => {
        this.setState({ withinran2: e })
        if (e !== '') this.state.errors.withinran2 = '';
        const number = e;
        var date = new Date();
        date.setDate(date.getDate() - number);
        const newdate = moment(date).format();
        this.setState({ newdatewithinran2: newdate })
    }
    onChangeDate = (e) => {
        this.setState({ datewithin1: e })
        if (e !== '') this.state.errors.datewithin1 = '';
        const number = e;
        var date = new Date();
        date.setDate(date.getDate() - number);
        const newdate = moment(date).format();
        this.setState({ newdatewithin1: newdate })
    }
    onChangeDes = (e) => {
        this.setState({ description1: e.target.value });
        if (e.target.value !== '') this.state.errors.description1 = '';
    }
    onChangeTitle = (e) => {
        this.setState({ title1: e.target.value })
        if (e.target.value !== '') this.state.errors.title1 = '';
    }
    onCusChalType = (value) => {
        this.setState({ ChallengeCategory: value })
        if (value !== '') this.state.errors.ChallengeCategory = '';
    }
    onChangeTargetActi = (value) => {
        this.setState({ PartiCoun: value });
        if (value !== '') this.state.errors.PartiCoun = '';
        this.state.Rangein = ''
    }
    onChangeRange = (value) => {
        this.setState({ Rangein: value })
        if (value !== '') this.state.errors.Rangein = '';
    }

    onChangeWithin = (e) => {
        this.setState({ within: e })
        if (e !== '') this.state.errors.within = '';
    }

    onCategoryChange1 = (value) => {
        this.setState({ ccc: value });
        if (value !== '') this.state.errors.ccc = '';
    }

    next() {
        if (this.state.current === 0) {
            let errors = {};
            if (this.state.ChallengeCategory === '') errors.ChallengeCategory = "Challenge is required";
            if (this.state.PartiCoun === '') errors.PartiCoun = "Participated is required";
            if (this.state.ccc === '') errors.ccc = "Range is required";
            this.setState({ errors });
            if (Object.keys(errors).length === 0) {
                if (this.state.PartiCoun === "No. of Likes Received") {
                    if (this.state.ccc === "withIn" || this.state.ccc === "Unspecified") {
                        if (this.state.Rangein != "withinRange") {
                            let errors = {};
                            if (this.state.Rangein === '') errors.Rangein = "Select one field"
                            if (this.state.ccc === "withIn") {
                                if (this.state.datewithin1 === '') errors.datewithin1 = "date is required"
                            }

                            if (this.state.Rangein != '') {
                                if (this.state.within === '') errors.within = "Like is required"
                            }
                            this.setState({ errors })
                            if (Object.keys(errors).length === 0) {
                                var _self = this;
                                var newdate;
                                if (this.state.datewithin1) {
                                    const number = this.state.datewithin1;
                                    var date = new Date();
                                    date.setDate(date.getDate() - number);
                                    var day = moment(date).format("YYYY-MM-DD")
                                    var time = moment().startOf('day').format('HH:mm:ss');
                                    var d = day + " " + time;
                                    newdate = new Date(d).toISOString();
                                }
                                var data = {
                                    "likes": this.state.within,
                                    "date": newdate ? newdate : "",
                                    "category": this.state.ChallengeCategory,
                                    "range": this.state.Rangein
                                }
                                var url = "/likesCount";
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
                                        if (response.status === 200) {
                                            _self.setState({ LikeAndDate: response.data })
                                            message.success('Notification Created successfully!');
                                        } else {
                                            message.error(`unable to create Notification.`);
                                        }

                                    })
                                const current = this.state.current + 1;
                                this.setState({ current });

                            }
                        }
                        else if (this.state.Rangein === "withinRange") {
                            let errors = {};
                            if (this.state.Rangein === '') errors.Rangein = "Select one field"
                            if (this.state.ccc === "withIn") {
                                if (this.state.datewithin1 === '') errors.datewithin1 = "date is required"
                            }
                            if (this.state.Rangein != '') {
                                if (this.state.withinran3 === '') errors.withinran3 = "Like1 is required"
                                if (this.state.withinran4 === '') errors.withinran4 = "Like2 is required"
                            }
                            this.setState({ errors })
                            if (Object.keys(errors).length === 0) {
                                var _self = this;
                                var newdate;
                                if (this.state.datewithin1) {
                                    const number = this.state.datewithin1;
                                    var date = new Date();
                                    date.setDate(date.getDate() - number);
                                    var day = moment(date).format("YYYY-MM-DD")
                                    var time = moment().startOf('day').format('HH:mm:ss');
                                    var d = day + " " + time;
                                    newdate = new Date(d).toISOString();
                                }
                                var data = {
                                    "category": this.state.ChallengeCategory,
                                    "fromLikes": this.state.withinran3,
                                    "date": newdate ? newdate : "",
                                    "range": this.state.Rangein,
                                    "toLikes": this.state.withinran4
                                }
                                var url = "/likesCount";
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
                                        if (response.status === 200) {
                                            _self.setState({ LikeAndDate: response.data })
                                            message.success('Notification Created successfully!');
                                        } else {
                                            message.error(`unable to create Notification.`);
                                        }
                                    })
                                const current = this.state.current + 1;
                                this.setState({ current });
                            }
                        }
                    }
                    else if (this.state.ccc === "withinRange" || this.state.ccc === "Unspecified") {
                        if (this.state.Rangein != "withinRange") {
                            let errors = {};
                            if (this.state.Rangein === '') errors.Rangein = "Select one field"
                            if (this.state.ccc === "withinRange") {
                                if (this.state.withinran1 === '') errors.withinran1 = "date1 is required"
                                if (this.state.withinran2 === '') errors.withinran2 = "date2 is required"
                            }
                            if (this.state.Rangein != '') {
                                if (this.state.within === '') errors.within = "Like is required"
                            }
                            this.setState({ errors })
                            if (Object.keys(errors).length === 0) {
                                var _self = this;
                                var newdate1, newdate2;
                                if (this.state.withinran1) {
                                    const number1 = this.state.withinran1;
                                    var date1 = new Date();
                                    date1.setDate(date1.getDate() - number1);
                                    var day = moment(date1).format("YYYY-MM-DD")
                                    var time = moment().endOf('day').format('HH:mm:ss');
                                    var d = day + " " + time;
                                    newdate1 = new Date(d).toISOString();
                                    const number2 = this.state.withinran2;
                                    var date2 = new Date();
                                    date2.setDate(date2.getDate() - number2);
                                    var day = moment(date2).format("YYYY-MM-DD")

                                    var time = moment().startOf('day').format('HH:mm:ss');
                                    var d = day + " " + time;
                                    newdate2 = new Date(d).toISOString();
                                }
                                var data = {
                                    "likes": this.state.within,
                                    "startDate": newdate1 ? newdate1 : "",
                                    "endDate": newdate2 ? newdate2 : "",
                                    "category": this.state.ChallengeCategory,
                                    "range": this.state.Rangein
                                }
                                const url = "/likesCountRange";
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
                                        if (response.status === 200) {
                                            _self.setState({ LikeAndDate: response.data });
                                            message.success('Notification Created successfully!');
                                        } else {
                                            message.error(`unable to create Notification.`);
                                        }
                                    })
                                const current = this.state.current + 1;
                                this.setState({ current });
                            }
                        }
                        else if (this.state.Rangein === "withinRange") {
                            let errors = {};
                            if (this.state.Rangein === '') errors.Rangein = "Select one field"
                            if (this.state.ccc === "withinRange") {
                                if (this.state.withinran1 === '') errors.withinran1 = "date1 is required"
                                if (this.state.withinran2 === '') errors.withinran2 = "date2 is required"
                            }
                            if (this.state.Rangein != '') {
                                if (this.state.withinran3 === '') errors.withinran3 = "Like1 is required"
                                if (this.state.withinran4 === '') errors.withinran4 = "Like2 is required"
                            }
                            this.setState({ errors })
                            if (Object.keys(errors).length === 0) {
                                var _self = this;
                                var newdate1, newdate2;
                                if (this.state.withinran1) {
                                    const number1 = this.state.withinran1;
                                    var date1 = new Date();
                                    date1.setDate(date1.getDate() - number1);
                                    var day = moment(date1).format("YYYY-MM-DD")
                                    var time = moment().endOf('day').format('HH:mm:ss');
                                    var d = day + " " + time;
                                    newdate1 = new Date(d).toISOString();
                                    const number2 = this.state.withinran2;
                                    var date2 = new Date();
                                    date2.setDate(date2.getDate() - number2);
                                    var day = moment(date2).format("YYYY-MM-DD")

                                    var time = moment().startOf('day').format('HH:mm:ss');
                                    var d = day + " " + time;
                                    newdate2 = new Date(d).toISOString();
                                }
                                var data = {
                                    "category": this.state.ChallengeCategory,
                                    "fromLikes": this.state.withinran3,
                                    "startDate": newdate1 ? newdate1 : "",
                                    "endDate": newdate2 ? newdate2 : "",
                                    "range": this.state.Rangein,
                                    "toLikes": this.state.withinran4
                                }
                                const url = "/likesCountRange";
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
                                        if (response.status === 200) {
                                            _self.setState({ LikeAndDate: response.data });
                                            message.success('Notification Created successfully!');
                                        } else {
                                            message.error(`unable to create Notification.`);
                                        }
                                    })
                                const current = this.state.current + 1;
                                this.setState({ current });
                            }
                        }
                    }

                }
                else if (this.state.PartiCoun === "No. of Participations") {
                    if (this.state.ccc === "withIn" || this.state.ccc === "Unspecified") {
                        if (this.state.Rangein != "withinRange") {
                            let errors = {};
                            if (this.state.Rangein === '') errors.Rangein = "Select one field"
                            if (this.state.ccc === "withIn") {
                                if (this.state.datewithin1 === '') errors.datewithin1 = "date is required"
                            }

                            if (this.state.Rangein != '') {
                                if (this.state.within === '') errors.within = "Number is required"
                            }
                            this.setState({ errors })
                            if (Object.keys(errors).length === 0) {
                                var _self = this;
                                var newdate;
                                if (this.state.datewithin1) {
                                    const number = this.state.datewithin1;
                                    var date = new Date();
                                    date.setDate(date.getDate() - number);
                                    var day = moment(date).format("YYYY-MM-DD")
                                    var time = moment().startOf('day').format('HH:mm:ss');
                                    var d = day + " " + time;
                                    newdate = new Date(d).toISOString();
                                }
                                var data = {
                                    "category": this.state.ChallengeCategory,
                                    "count": this.state.within,
                                    "date": newdate ? newdate : "",
                                    "range": this.state.Rangein
                                }
                                var url = "/participatedCount";
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
                                        if (response.status === 200) {
                                            _self.setState({ LikeAndDate: response.data });
                                            message.success('Notification Created successfully!');
                                        } else {
                                            message.error(`unable to create Notification.`);
                                        }

                                    })
                                const current = this.state.current + 1;
                                this.setState({ current });
                            }
                        } else if (this.state.Rangein === "withinRange") {
                            let errors = {};
                            if (this.state.Rangein === '') errors.Rangein = "Select one field"
                            if (this.state.ccc === "withIn") {
                                if (this.state.datewithin1 === '') errors.datewithin1 = "date is required"
                            }
                            if (this.state.Rangein != '') {
                                if (this.state.withinran3 === '') errors.withinran3 = "Count1 is required"
                                if (this.state.withinran4 === '') errors.withinran4 = "Count2 is required"
                            }
                            this.setState({ errors })
                            if (Object.keys(errors).length === 0) {
                                var _self = this;
                                var newdate;
                                if (this.state.datewithin1) {
                                    const number = this.state.datewithin1;
                                    var date = new Date();
                                    date.setDate(date.getDate() - number);
                                    var day = moment(date).format("YYYY-MM-DD")
                                    var time = moment().startOf('day').format('HH:mm:ss');
                                    var d = day + " " + time;
                                    newdate = new Date(d).toISOString();
                                }
                                var data = {
                                    "category": this.state.ChallengeCategory,
                                    "fromCount": this.state.withinran3,
                                    "date": newdate ? newdate : "",
                                    "range": this.state.Rangein,
                                    "toCount": this.state.withinran4
                                }
                                var url = "/participatedCount";
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
                                        if (response.status === 200) {
                                            _self.setState({ LikeAndDate: response.data });
                                            message.success('Notification Created successfully!');
                                        } else {
                                            message.error(`unable to create Notification.`);
                                        }

                                    })
                                const current = this.state.current + 1;
                                this.setState({ current });
                            }
                        }

                    } else if (this.state.ccc === "withinRange" || this.state.ccc === "Unspecified") {

                        if (this.state.Rangein != "withinRange") {
                            let errors = {};
                            if (this.state.Rangein === '') errors.Rangein = "Select one field"
                            if (this.state.ccc === "withinRange") {
                                if (this.state.withinran1 === '') errors.withinran1 = "date1 is required"
                                if (this.state.withinran2 === '') errors.withinran2 = "date2 is required"
                            }
                            if (this.state.Rangein != '') {
                                if (this.state.within === '') errors.within = "Like is required"
                            }
                            this.setState({ errors })
                            if (Object.keys(errors).length === 0) {
                                var _self = this;
                                var newdate1, newdate2;
                                if (this.state.withinran1) {
                                    const number1 = this.state.withinran1;
                                    var date1 = new Date();
                                    date1.setDate(date1.getDate() - number1);
                                    var day = moment(date1).format("YYYY-MM-DD")
                                    var time = moment().endOf('day').format('HH:mm:ss');
                                    var d = day + " " + time;
                                    newdate1 = new Date(d).toISOString();
                                    const number2 = this.state.withinran2;
                                    var date2 = new Date();
                                    date2.setDate(date2.getDate() - number2);
                                    var day = moment(date2).format("YYYY-MM-DD")

                                    var time = moment().startOf('day').format('HH:mm:ss');
                                    var d = day + " " + time;
                                    newdate2 = new Date(d).toISOString();
                                }
                                var data = {
                                    "category": this.state.ChallengeCategory,
                                    "count": this.state.within,
                                    "startDate": newdate1 ? newdate1 : "",
                                    "endDate": newdate2 ? newdate2 : "",
                                    "range": this.state.Rangein
                                }
                                const url = "/participatedCountRange";
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
                                        if (response.status === 200) {
                                            _self.setState({ LikeAndDate: response.data });
                                            message.success('Notification Created successfully!');
                                        } else {
                                            message.error(`unable to create Notification.`);
                                        }

                                    })
                                const current = this.state.current + 1;
                                this.setState({ current });
                            }

                        } else if (this.state.Rangein === "withinRange") {
                            let errors = {};
                            if (this.state.Rangein === '') errors.Rangein = "Select one field"
                            if (this.state.ccc === "withinRange") {
                                if (this.state.withinran1 === '') errors.withinran1 = "date1 is required"
                                if (this.state.withinran2 === '') errors.withinran2 = "date2 is required"
                            }
                            if (this.state.Rangein != '') {
                                if (this.state.withinran3 === '') errors.withinran3 = "Like1 is required"
                                if (this.state.withinran4 === '') errors.withinran4 = "Like2 is required"
                            }
                            this.setState({ errors })
                            if (Object.keys(errors).length === 0) {
                                var _self = this;
                                var newdate1, newdate2;
                                if (this.state.withinran1) {
                                    const number1 = this.state.withinran1;
                                    var date1 = new Date();
                                    date1.setDate(date1.getDate() - number1);
                                    var day = moment(date1).format("YYYY-MM-DD")
                                    var time = moment().endOf('day').format('HH:mm:ss');
                                    var d = day + " " + time;
                                    newdate1 = new Date(d).toISOString();
                                    const number2 = this.state.withinran2;
                                    var date2 = new Date();
                                    date2.setDate(date2.getDate() - number2);
                                    var day = moment(date2).format("YYYY-MM-DD")

                                    var time = moment().startOf('day').format('HH:mm:ss');
                                    var d = day + " " + time;
                                    newdate2 = new Date(d).toISOString();
                                }
                                var data = {
                                    "category": this.state.ChallengeCategory,
                                    "fromCount": this.state.withinran3,
                                    "startDate": newdate1 ? newdate1 : "",
                                    "endDate": newdate2 ? newdate2 : "",
                                    "range": this.state.Rangein,
                                    "toCount": this.state.withinran4
                                }
                                const url = "/participatedCountRange";
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
                                        if (response.status === 200) {
                                            _self.setState({ LikeAndDate: response.data });
                                            message.success('Notification Created successfully!');
                                        } else {
                                            message.error(`unable to create Notification.`);
                                        }
                                    })
                                const current = this.state.current + 1;
                                this.setState({ current });
                            }
                        }
                    }
                }
                else if (this.state.PartiCoun === "Participated") {
                    if (this.state.ccc === "withIn" || this.state.ccc === "Unspecified") {
                        let errors = {};
                        if (this.state.ccc === "withIn") {
                            if (this.state.datewithin1 === '') errors.datewithin1 = "date is required"
                        }
                        this.setState({ errors })
                        if (Object.keys(errors).length === 0) {

                            var _self = this;
                            var newdate;
                            if (this.state.datewithin1) {
                                const number = this.state.datewithin1;
                                var date = new Date();
                                date.setDate(date.getDate() - number);
                                var day = moment(date).format("YYYY-MM-DD")
                                var time = moment().startOf('day').format('HH:mm:ss');
                                var d = day + " " + time;
                                newdate = new Date(d).toISOString();
                            }
                            var data = {
                                "category": this.state.ChallengeCategory,
                                "date": newdate ? newdate : ""
                            }
                            const url = "/participated"
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
                                    if (response.status === 200) {
                                        _self.setState({ LikeAndDate: response.data })
                                        message.success('Notification Created successfully!');
                                    } else {
                                        message.error(`unable to create Notification.`);
                                    }

                                })
                            const current = this.state.current + 1;
                            this.setState({ current });
                        }

                    } else if (this.state.ccc === "withinRange" || this.state.ccc === "Unspecified") {
                        let errors = {};
                        if (this.state.ccc === "withinRange") {
                            if (this.state.withinran1 === '') errors.withinran1 = "date1 is required"
                            if (this.state.withinran2 === '') errors.withinran2 = "date2 is required"
                        }

                        this.setState({ errors })
                        if (Object.keys(errors).length === 0) {
                            var _self = this;
                            var newdate1, newdate2;
                            if (this.state.withinran1) {
                                const number1 = this.state.withinran1;
                                var date1 = new Date();
                                date1.setDate(date1.getDate() - number1);
                                var day = moment(date1).format("YYYY-MM-DD")
                                var time = moment().endOf('day').format('HH:mm:ss');
                                var d = day + " " + time;
                                newdate1 = new Date(d).toISOString();
                                const number2 = this.state.withinran2;
                                var date2 = new Date();
                                date2.setDate(date2.getDate() - number2);
                                var day = moment(date2).format("YYYY-MM-DD")

                                var time = moment().startOf('day').format('HH:mm:ss');
                                var d = day + " " + time;
                                newdate2 = new Date(d).toISOString();
                            }
                            var data = {
                                "category": this.state.ChallengeCategory,
                                "startDate": newdate1 ? newdate1 : "",
                                "endDate": newdate2 ? newdate2 : ""
                            }
                            const url = "/customNotification"
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
                                    if (response.status === 200) {
                                        _self.setState({ LikeAndDate: response.data })
                                        message.success('Notification Created successfully!');
                                    } else {
                                        message.error(`unable to create Notification.`);
                                    }
                                })
                            const current = this.state.current + 1;
                            this.setState({ current });
                        }
                    }
                }

            }
        } else if (this.state.current === 1) {
            let errors = {};
            if (this.state.title1.trim() === '') errors.title1 = "Title is required";
            if (this.state.description1.trim() === '') errors.description1 = "Description is required";
            if (this.state.imageUrl1 === '') errors.imageUrl1 = "Image is required";
            this.setState({ errors });
            if (Object.keys(errors).length === 0) {
                const current = this.state.current + 1;
                this.setState({ current });
            }
        } else if (this.state.current === 2) {
            let errors = {};
            if (this.state.scheduleValue === '') errors.scheduleValue = "one catagory is required";
            if (this.state.scheduleValue === "Schedule date and time") {
                if (this.state.scheduleCategory === '') errors.scheduleCategory = "selct one type"
            }
            this.setState({ errors });
            if (Object.keys(errors).length === 0) {
                if (this.state.scheduleCategory === "Weekly") {
                    let errors = {};
                    if (this.state.onWeeklyDay === '') errors.onWeeklyDay = "Date is required";
                    if (this.state.onWeeklyTime === '') errors.onWeeklyTime = "Time is required";
                    this.setState({ errors });
                    if (Object.keys(errors).length === 0) {
                        var {onWeeklyDay, onWeeklyTime} = this.state;
                        //var dat = moment(onWeeklyDay).format("YYYY-MM-DD");
                        var dat = moment().day(onWeeklyDay).format('YYYY-MM-DD');
                        var d = dat + ' ' + onWeeklyTime;
                        var de = new Date(d).toISOString();
                        const current = this.state.current + 1;
                        this.setState({ current });
                        this.setState({ scheduleDate: de })
                    }

                } else if (this.state.scheduleCategory === "On Date" || this.state.scheduleCategory === "Monthly") {
                    let errors = {};
                    if (this.state.onDateDt === '') errors.onDateDt = "Date is required";
                    if (this.state.onDateTime === '') errors.onDateTime = "Time is required";
                    this.setState({ errors });
                    if (Object.keys(errors).length === 0) {
                        var {onDateDt, onDateTime} = this.state;
                        let d = onDateDt + ' ' + onDateTime;
                        var de = new Date(d).toISOString();
                        const current = this.state.current + 1;
                        this.setState({ current });
                        this.setState({ scheduleDate: de })
                    }
                } else if (this.state.scheduleValue === "Immediately") {
                    let errors = {};
                    if (this.state.onTodayTime === '') errors.onTodayTime = "Time is required";
                    this.setState({ errors });
                    if (Object.keys(errors).length === 0) {
                        const current = this.state.current + 1;
                        this.setState({ current });
                        this.setState({ scheduleDate: this.state.onTodayTime });

                    }
                }
            }
        }
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    done() {
        var myObj = this.state.editchallangedata; // Empty Object
        if (isEmpty(myObj)) {
            // Object is empty (Would return true in this example)
            if (this.state.current === 3) {
                let errors = {};
                if (this.state.location === '') errors.location = "location is required";
                if (this.state.location === "Local" && this.state.locationArray.length == 0) errors.city = "Enter Atleast One City"
                this.setState({ errors });
                if (Object.keys(errors).length === 0) {


                    var _self = this;
                    var locations = []
                    for (let i = 0; i < this.state.locationArray.length; i++) {
                        locations[i] = this.state.locationArray[i].locId
                    }
                    var data = {
                        "type": this.state.nType,
                        "category": this.state.category,
                        "users": this.state.LikeAndDate,
                        "title": this.state.title1.trim(),
                        "description": this.state.description1.trim(),
                        "imageUrl": this.state.imageUrl1,
                        "location": this.state.location == "Global" ? [this.state.location] : locations,
                        "targetUserCategory": this.state.ChallengeCategory,
                        "targetActivity": this.state.PartiCoun,
                        "range": this.state.Rangein,
                        "likesCount": this.state.within,
                        "startLikesCount": this.state.withinran3,
                        "endLikesCount": this.state.withinran4,
                        "within": this.state.ccc,
                        "days": this.state.datewithin1,
                        "startDays": this.state.withinran1,
                        "status": true,
                        "endDays": this.state.withinran2,
                        "locationTags": this.state.tags,
                        "scheduledDate": this.state.scheduleDate,
                        "schedule": this.state.scheduleCategory

                    }
                    const url = "/scheduledNotification"
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
                            if (response.status === 200) {
                                _self.setState({ ParticipatedTwoDates: response.data })
                                message.success('Notification Created successfully!');
                                browserHistory.push('/push-notifications/custom-notifications');
                            } else {
                                message.error(`unable to create Notification.`);
                            }
                        })
                }
            }
        } else {
            if (this.state.current === 3) {
                let errors = {};
                if (this.state.location === '') errors.location = "location is required";
                if (this.state.location === "Local" && this.state.locationArray.length == 0) errors.city = "Enter Atleast One City"
                this.setState({ errors });
                if (Object.keys(errors).length === 0) {


                    var _self = this;
                    var locations = []
                    for (let i = 0; i < this.state.locationArray.length; i++) {
                        locations[i] = this.state.locationArray[i].locId
                    }
                    var data = {
                        "type": this.state.nType,
                        "category": this.state.category,
                        "users": this.state.LikeAndDate,
                        "title": this.state.title1.trim(),
                        "description": this.state.description1.trim(),
                        "imageUrl": this.state.imageUrl1,
                        "location": this.state.location == "Global" ? [this.state.location] : locations,
                        "targetUserCategory": this.state.ChallengeCategory,
                        "targetActivity": this.state.PartiCoun,
                        "range": this.state.Rangein,
                        "likesCount": this.state.within,
                        "startLikesCount": this.state.withinran3,
                        "endLikesCount": this.state.withinran4,
                        "within": this.state.ccc,
                        "status": true,
                        "days": this.state.datewithin1,
                        "startDays": this.state.withinran1,
                        "endDays": this.state.withinran2,
                        "locationTags": this.state.tags,
                        "scheduledDate": this.state.scheduleDate,
                        "schedule": this.state.scheduleCategory

                    }
                    const id = this.state.editchallangedata._id;
                    const url = "/scheduledNotification/" + id
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
                            if (response.status === 200) {
                                _self.setState({ ParticipatedTwoDates: response.data })
                                message.success('Notification Edited successfully!');
                                browserHistory.push('/push-notifications/custom-notifications');
                            } else {
                                message.error(`unable to edit Notification.`);
                            }
                        })
                }
            }
        }
    }
    onScheduleCategoryChange = (e) => {
        this.setState({ scheduleCategory: e, onDateDt: '', onDateTime: '', onWeeklyDay: '', onWeeklyTime: '' });
    }
    disablingCurrentHours = () => {
        var time = new moment().format("HH");
        var num = [];
        for (let i = 0; i < time; i++) {
            num.push(i);
        }
        return num;
    }
    disabledCurrentMinutes = (hour) => {
        var h = +(new moment().format("HH"));
        if (hour === h) {
            var min = new moment().format("mm");
            var min1 = +min + 15;
            var num = [];
            for (let i = 0; i < min1; i++) {
                num.push(i);
            }
            return num;
        }
    }
    disabledDate = (current) => {
        if (!current) {
            return false;
        }
        const date = moment();
        date.hour(0);
        date.minute(0);
        date.second(0);
        return current.valueOf() < date.valueOf();
    }
    onDateChange = (e) => {
        var value = moment(e).format('YYYY-MM-DD');
        this.setState({ onDateDt: value });
    }
    onDateTimeChange = (e) => {
        var value = moment(e).format('HH:mm:ss');
        this.setState({ onDateTime: value });
    }
    onWeeklyTimeChange = (e) => {
        var value = moment(e).format("HH:mm:ss");
        this.setState({ onWeeklyTime: value });
    }
    onWeeklyDayChange = (value) => {
        this.setState({ onWeeklyDay: value });
    }
    onTodayTimeChange = (e) => {
        var value = moment(e).toISOString();
        this.setState({ onTodayTime: value, onDateTime: '', onWeeklyDay: '', onWeeklyTime: '', scheduleCategory: '' });
    }
    onScheduleChange = (e) => {
        this.setState({ scheduleValue: e.target.value });
    }

    bindImmediateView = () => {
        var { scheduleValue } = this.state;
        if (scheduleValue === "Immediately") {
            return (
                <Row>
                    <Col span={20} className="">
                        <FormItem label="Select Time" className={classnames('onTodayTime', { error: !!this.state.errors.onTodayTime })}>
                            <TimePicker getPopupContainer={triggerNode => triggerNode.parentNode} onChange={this.onTodayTimeChange} defaultOpenValue={moment(new Date,'HH:mm:ss').minute(-10)} disabledHours={this.disablingCurrentHours} disabledMinutes={this.disabledCurrentMinutes}
                                defaultValue={this.state.onTodayTime ? moment(this.state.onTodayTime, format) : ""} value={this.state.onTodayTime ? moment(this.state.onTodayTime) : ""}
                                />
                            <span>{this.state.errors.onTodayTime}</span>
                        </FormItem>
                        <p className="marginBottom20">Message will be sent as specified.</p>
                    </Col>
                </Row>
            )
        } else if (scheduleValue === "Schedule date and time") {
            return (
                <div>
                    <Row>
                        <Col span={20} className="">
                            <FormItem label="Schedule" className={classnames('scheduleCategory', { error: !!this.state.errors.scheduleCategory })}>
                                <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                    showSearch className="marginRight20"
                                    style={{ width: 100 }}
                                    placeholder="Monthly"
                                    optionFilterProp="children"
                                    onChange={this.onScheduleCategoryChange}
                                    value={this.state.scheduleCategory || undefined}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                    <Option value="On Date">On Date</Option>
                                    <Option value="Weekly">Weekly</Option>
                                    <Option value="Monthly">Monthly</Option>
                                </Select>
                                <span>{this.state.errors.scheduleCategory}</span>
                            </FormItem >
                            {this.state.scheduleCategory === "On Date" || this.state.scheduleCategory === "Monthly" ?
                                <div className="MarginTop20">
                                    <FormItem label="Specify Date" className={classnames('onDateDt', { error: !!this.state.errors.onDateDt })}>
                                        <DatePicker onChange={this.onDateChange} disabledDate={this.disabledDate}  getCalendarContainer={triggerNode => triggerNode.parentNode}
                                            value={this.state.onDateDt ? moment(this.state.onDateDt, dateFormat) : ''} format={dateFormat} />
                                        <span>{this.state.errors.onDateDt}</span>
                                    </FormItem>
                                    {/*<span className="spanPadding">at</span>*/}
                                    <FormItem label="Specify Time" className={classnames('onDateTime', { error: !!this.state.errors.onDateTime })}>
                                        <TimePicker onChange={this.onDateTimeChange} getPopupContainer={triggerNode => triggerNode.parentNode}
                                            value={this.state.onDateTime ? moment(this.state.onDateTime, format) : ''}
                                            />
                                        <span>{this.state.errors.onDateTime}</span>
                                    </FormItem>
                                </div>
                                : null}
                            {this.state.scheduleCategory === "Weekly" ?
                                <div className="MarginTop20">
                                    <FormItem label="Specify Day" className={classnames('onWeeklyDay', { error: !!this.state.errors.onWeeklyDay })}>
                                        <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                            showSearch className=""
                                            style={{ width: 100 }}
                                            placeholder="Select Day"
                                            optionFilterProp="children"
                                            onChange={this.onWeeklyDayChange}

                                            value={this.state.onWeeklyDay || undefined}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                            <Option value="Monday">Monday</Option>
                                            <Option value="Tuesday">Tuesday</Option>
                                            <Option value="Wednesday">Wednesday</Option>
                                            <Option value="Thursday">Thursday</Option>
                                            <Option value="Friday">Friday</Option>
                                            <Option value="Saturday">Saturday</Option>
                                            <Option value="Sunday">Sunday</Option>
                                        </Select>
                                        <span>{this.state.errors.onWeeklyDay}</span>
                                    </FormItem>
                                    {/*<span className="spanPadding">at</span>*/}
                                    <FormItem label="Specify Time" className={classnames('onWeeklyTime', { error: !!this.state.errors.onWeeklyTime })}>
                                        <TimePicker onChange={this.onWeeklyTimeChange}  getPopupContainer={triggerNode => triggerNode.parentNode}
                                            value={this.state.onWeeklyTime ? moment(this.state.onWeeklyTime, format) : ''}

                                            />
                                        <span>{this.state.errors.onWeeklyTime}</span>
                                    </FormItem>

                                </div> : null}
                        </Col>
                    </Row>
                </div>
            )
        }
    }
    render() {
        const {tags} = this.state;
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

        var targetActivities = this.props.subCategories.map((subCat) => <Option value={subCat.name}>{subCat.name}</Option>)
        var myObj = this.state.editchallangedata; // Empty Object
        if (isEmpty(myObj)) {
            // Object is empty (Would return true in this example)
        } else {
            // Object is NOT empty
            var editcat = this.state.participatedlist.map((cat) => <option value={cat.name}>{cat.name}</option>);
        }
        const { current } = this.state;
        const steps1 = [{
            title: 'Select Target Users',
            content:
            <div id="CChallenges" className="">
                <Row className="MarginTop20">
                    <Form>
                        <Row>
                            <Col span={18} className="">
                                <FormItem label="Select Challenge Category" className={classnames('ChallengeCategory', { error: !!this.state.errors.ChallengeCategory })}>
                                    <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                        showSearch
                                        style={{ width: 250 }}
                                        placeholder="Select Challenge Category"
                                        optionFilterProp="children"
                                        value={this.state.ChallengeCategory || undefined}
                                        onChange={this.onCusChalType}
                                        name="ChallengeCategory"
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                        <Option value="dubshmash">Dubshmash</Option>
                                        <Option value="karoke">Karoke</Option>
                                        <Option value="wallpost">Wallpost</Option>
                                        <Option value="poster">Poster</Option>
                                        <Option value="All">All</Option>
                                    </Select>
                                    <span>{this.state.errors.ChallengeCategory}</span>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={18} className="">
                                <ul className="list-inline">
                                    <li>
                                        <FormItem label="Select Challenge name" className={classnames('PartiCoun', { error: !!this.state.errors.PartiCoun })}>

                                            <Select className="LeftSpace" getPopupContainer={triggerNode => triggerNode.parentNode}
                                                showSearch
                                                style={{ width: 200 }}
                                                placeholder="Participated"
                                                optionFilterProp="children"
                                                value={this.state.PartiCoun || undefined}
                                                onChange={this.onChangeTargetActi}
                                                name="PartiCoun"
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                >
                                                {targetActivities != '' ? targetActivities : editcat}

                                            </Select>
                                            <span>{this.state.errors.PartiCoun}</span>
                                        </FormItem></li>
                                    <li>
                                        {this.state.PartiCoun === "No. of Likes Received" || this.state.PartiCoun === "No. of Participations" ?
                                            <div className="SechduledChallengeslkeRange">
                                                <FormItem label="Select Like Range" className={classnames('Rangein', { error: !!this.state.errors.Rangein })}>
                                                    <Select className="LeftSpace"
                                                        showSearch
                                                        style={{ width: 200 }}
                                                        placeholder="select range"
                                                        optionFilterProp="children"
                                                        name="Rangein"
                                                        value={this.state.Rangein || undefined}
                                                        onChange={this.onChangeRange}
                                                        >
                                                        <Option value="Is less than">Is less than</Option>
                                                        <Option value="Is greater than">Is greater than</Option>
                                                        <Option value="Is equal to">Is equal to </Option>

                                                        <Option value="withinRange">With In Range</Option>
                                                    </Select>
                                                    <span>{this.state.errors.Rangein}</span>
                                                </FormItem>
                                            </div>
                                            : null}</li>
                                    <li className="SechduledChallengesWithRange">
                                        {this.state.Rangein === "Is less than" || this.state.Rangein === "Is greater than" || this.state.Rangein === "Is equal to" ? <div>
                                            <FormItem label="With Range" className={classnames('within', { error: !!this.state.errors.within })}>
                                                <InputNumber min={1} placeholder="WithIn" name="within" value={this.state.within} onChange={this.onChangeWithin} style={{ width: 200 }} />
                                                <p style={{ "color": "red", "text-align": "left" }} id="mobile" className="mobile"></p>
                                                <span>{this.state.errors.within}</span>
                                            </FormItem></div> : null}</li>
                                    <li>
                                        {this.state.Rangein === "withinRange" ? <div>
                                            <FormItem>
                                                <ul className="list-inline"><li>
                                                    <FormItem label="Start Count" className={classnames('withinran3', { error: !!this.state.errors.withinran3 })}>
                                                        <InputNumber min={1} placeholder="start to" value={this.state.withinran3} name="withinran3" onChange={this.onChangewithinran3} />
                                                        <span>{this.state.errors.withinran3}</span>
                                                    </FormItem>
                                                </li>  <li>
                                                        <FormItem label="End Count" className={classnames('withinran4', { error: !!this.state.errors.withinran4 })}>
                                                            <InputNumber min={1} value={this.state.withinran4} name="withinran4" placeholder="end" onChange={this.onChangewithinran4} />
                                                            <span>{this.state.errors.withinran4}</span>
                                                        </FormItem>
                                                    </li></ul>
                                                {/* <span className="">  ---  </span> */}
                                            </FormItem></div> : null}</li>
                                </ul>
                            </Col>


                            <Col span={18} className="">
                                <ul className="list-inline">
                                    <li>
                                        <FormItem label="Select Date Range" className={classnames('ccc', { error: !!this.state.errors.ccc })}>
                                            <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                                showSearch
                                                style={{ width: 200 }}
                                                placeholder="within"
                                                optionFilterProp="children"
                                                value={this.state.ccc || undefined}
                                                onChange={this.onCategoryChange1}
                                                name="ccc"
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                >
                                                <Option value="withIn">withIn</Option>
                                                <Option value="withinRange">withinRange</Option>
                                                <Option value="Unspecified">Unspecified</Option>

                                            </Select>
                                            <span>{this.state.errors.ccc}</span>
                                        </FormItem></li>
                                    <li className="SechduledChallengesWithdays">
                                        {this.state.ccc === "withIn" ? <div>

                                            <FormItem label="with days" className={classnames('datewithin1', { error: !!this.state.errors.datewithin1 })}>
                                                <InputNumber min={1} placeholder="15" style={{ width: 50 }} value={this.state.datewithin1} onChange={this.onChangeDate} />
                                                <span>{this.state.errors.datewithin1}</span>
                                            </FormItem>

                                        </div> : null}</li>
                                    <li>

                                        {this.state.ccc === "withinRange" ? <div>
                                            <ul className="list-inline"><li>
                                                <FormItem label="Start Count" className={classnames('withinran1', { error: !!this.state.errors.withinran1 })}>
                                                    <InputNumber min={1} placeholder="start to" value={this.state.withinran1} onChange={this.onChangewithinran1} />
                                                    <span>{this.state.errors.withinran1}</span>
                                                </FormItem>
                                            </li>  <li>
                                                    <FormItem label="End Count" className={classnames('withinran2', { error: !!this.state.errors.withinran2 })}>
                                                        <InputNumber min={1} value={this.state.withinran2} placeholder="end" onChange={this.onChangewithinran2} />
                                                        <span>{this.state.errors.withinran2}</span>
                                                    </FormItem>
                                                </li></ul>
                                            {/* <span className="">  ---  </span> */}
                                        </div> : null}
                                    </li>
                                </ul>
                                {/* {this.state.ccc === "Unspecified" ? null:null} */}
                            </Col>
                        </Row>
                    </Form>
                </Row>
            </div>

        },
        {
            title: 'Compose Message',
            content:
            <div>
                <Row className="MarginTop20">
                    <Form>
                        <Row className="">
                            <Col span={8} className="">
                                <FormItem className={classnames('title1', { error: !!this.state.errors.title1 })}>
                                    <Input type="text" placeholder="Enter Title" value={this.state.title1} name="title1" name="title1" maxLength={50} onChange={this.onChangeTitle} />
                                    <span>{this.state.errors.title1}</span>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row className="marginBottom20">
                            <Col span={8} className="">
                                <FormItem className={classnames('description1', { error: !!this.state.errors.description1 })}>
                                    <TextArea rows={3} placeholder="Enter Description" name="description1" value={this.state.description1} onChange={this.onChangeDes} />
                                    <span>{this.state.errors.description1}</span>
                                </FormItem>
                            </Col>
                            <Col span={2} className="">
                                <FormItem className={classnames('imageUrl1', { error: !!this.state.errors.imageUrl1 })}>
                                    <Upload  {...props}
                                        className="avatar-uploader pussNotImg marginLeft20"

                                        showUploadList={false}
                                        accept=".png,.jpg,.jpeg"
                                        onChange={this.onChangeImg}
                                        >
                                        {
                                            this.state.imageUrl1 ?
                                                <img src={this.state.imageUrl1} alt="" className="avatar" style={{ width: 80, height: 80 }} /> :
                                                <Icon type="plus" className="avatar-uploader-trigger" style={{ width: 75, height: 75 }} />
                                        }
                                    </Upload>
                                    <span>{this.state.errors.imageUrl1}</span>
                                </FormItem>
                            </Col>
                        </Row>

                    </Form>
                </Row>
            </div>
            ,
        },
        {
            title: 'Schedule Delivery',
            content:
            <div>
                <Row className="MarginTop20">
                    <Form>

                        <Row>
                            <Col span={14} className="">
                                <FormItem>
                                    <RadioGroup onChange={this.onScheduleChange} value={this.state.scheduleValue}>
                                        <Radio value="Immediately">Today</Radio>
                                        <Radio value="Schedule date and time">Schedule date and time</Radio>
                                    </RadioGroup>
                                    <span>{this.state.errors.scheduleValue}</span>
                                </FormItem>
                            </Col>
                        </Row>
                        {this.bindImmediateView()}
                    </Form>
                </Row>
            </div>
            ,
        },

        {
            title: 'Select Location',
            content: <div>
                <Row className="MarginTop20">
                    <Form>
                        <Row>
                            <Col span={14} className="">
                                <FormItem className={classnames('location', { error: !!this.state.errors.location })}>
                                    <RadioGroup onChange={this.onChanRadio} value={this.state.location}>
                                        <Radio value="Global">Global</Radio>
                                        <Radio value="Local">Local</Radio>
                                    </RadioGroup>
                                    <span>{this.state.errors.location}</span>
                                </FormItem>
                            </Col>
                        </Row>
                        {this.state.location === "Local" ?
                            <Row>
                                <Col span={14} className="">
                                    <FormItem>
                                        {/* <Input type="" placeholder="Enter Location" name="location" value={this.state.location} maxLength={50} onChange={this.onInputChange} /> */}
                                        <PlacesAutoComplete submit44={this.handleMapData} className="ant-input" />
                                        <p style={{ color: "red" }}>{this.state.errors.city}</p>
                                    </FormItem>
                                    <FormItem>
                                        {tags.map((tag, index) => {
                                            const isLongTag = tag.length > 20;
                                            const tagElem = (
                                                <Tag key={tag} closable afterClose={() => this.handleClose(tag)}>
                                                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                                </Tag>
                                            );
                                            return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                                        })}
                                    </FormItem>
                                </Col>
                            </Row>
                            : null}
                    </Form>
                </Row>
            </div>,
        }];
        return (
            <div id="scheduled" className="MarginTop20">
                <Steps current={current}>
                    {steps1.map(item => <Step key={item.title} title={item.title} />)}
                </Steps>
                <div className="steps-content">{steps1[this.state.current].content}</div>
                <div className="steps-action">
                    {
                        this.state.current < steps1.length - 1
                        &&
                        <Button type="primary" onClick={() => this.next()}>Next</Button>
                    }
                    {
                        this.state.current === steps1.length - 1
                        &&
                        <Button type="primary" onClick={() => this.done()}>Done</Button>
                    }
                    {
                        this.state.current > 0
                        &&
                        <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                            Previous
            </Button>
                    }
                </div>
            </div>
        )
    }
}
export default ScheduledChallenges;
/* eslint-disable */