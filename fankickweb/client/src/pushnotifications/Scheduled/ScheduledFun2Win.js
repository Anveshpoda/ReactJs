/* eslint-disable */
import React from 'react';
import { Input, Select, Row, Col, Form, Tabs, Tag, Tooltip, Radio, InputNumber, TimePicker, DatePicker, Upload, message, Steps, Button, Icon } from 'antd';
import AddTag from '../AddTag';
import axios from 'axios';
import classnames from 'classnames';
import { Link, browserHistory } from 'react-router';
import css from '../../pushnotifications/pushNotifications.css';
import moment from 'moment';
import PlacesAutoComplete from '../Custom/PlaceAutoComplete';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;
const Option = Select.Option;

const Step = Steps.Step;

const RadioGroup = Radio.Group;
const dateFormat = 'YYYY-MM-DD';
const format = 'HH:mm:ss';
function onChange(date, dateString) {
}

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

class ScheduledFun2Win extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 0,
            cusFanclubSubCat: [],
            categories: [],
            subCategories: [],
            fun2WinDurationFilter: '',
            fun2WinActivityFilter: '',
            fun2WinParticipationCountFilter: '',
            fun2WinCategory: '',
            fun2winTargetCat: '',
            fun2winTargetSubCat: '',
            fun2winSubCategory: '',
            fromDays: '',
            toDays: '',
            countTwo: '',
            contestNumber: '',
            contestOne: '',
            contestTwo: '',
            title: '',
            contestDescription: '',
            imageUrl: '',
            radioValue: '',
            location: '',
            usersArray: [],
            errors: {},
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
            editData: {},
            disabled: false,
            fun2winAll: "",
            fun2winSubcatAll: "",
            scheduleValue: "",
            activitiesList:
            [
                {
                    "id": 0,
                    "name": "Participated",
                    "_id": "5a2934549f13aace6a170c6b"
                },
                {
                    "id": 1,
                    "name": "No. of Participations",
                    "_id": "5a29348a9f13aace6a1712e9"
                },
                {
                    "id": 2,
                    "name": "Not Participated",
                    "_id": "5a29348a9f13aace6a1712e9"
                }
            ]
        }
    }
    componentWillMount() {

        if (Object.keys(this.props.editData).length == 0) {
        }
        else {
            this.setState({
                editData: this.props.editData,
            })
            this.loadCategories()
        }

    }

    loadCategories() {
        var _this = this;
        var fetchData = axios.create({
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': sessionStorage.getItem('token')
            }
        })
        fetchData.get('/categories').then(function (response) {
            _this.setState({
                categories: response.data.data,
                fun2WinCategory: _this.state.editData.targetUserCategoryId,
                fun2winTargetCat: _this.state.editData.targetUserCategory,
                fun2winSubCategory: _this.state.editData.targetUserSubcatId,
                fun2winTargetSubCat: _this.state.editData.targetUserSubcat,
                title: _this.state.editData.title,
                contestDescription: _this.state.editData.description,
                imageUrl: _this.state.editData.imageUrl,
                fun2WinActivityFilter: _this.state.editData.targetActivity,
                fun2WinParticipationCountFilter: _this.state.editData.range,
                scheduleCategory: _this.state.editData.schedule,
                scheduledDate: _this.state.editData.scheduleDate,
                fun2WinDurationFilter: _this.state.editData.within

            })
            if (_this.props.editData.targetUserCategory == "") {
                _this.setState({ fun2winAll: 'All', disabled: true, fun2WinCategory: '', fun2winSubCategory: '' })
            }

            for (var i = 0; i < response.data.data.length; i++) {
                if (_this.props.editData.targetUserCategory == response.data.data[i].name) {
                    _this.setState({
                        subCategories: response.data.data[i].subCategories
                    })
                }
            }
            if (_this.state.editData.range == 'WithinRange') {
                _this.setState({
                    contestOne: _this.state.editData.startLikesCount,
                    contestTwo: _this.state.editData.endLikesCount
                })
            }
            if (_this.state.editData.range == 'LessThan') {
                _this.setState({
                    contestNumber: _this.state.editData.likesCount
                })
            }
            if (_this.state.editData.range == 'GreaterThan') {
                _this.setState({
                    contestNumber: _this.state.editData.likesCount
                })
            }
            if (_this.state.editData.range == 'EqualsTo') {
                _this.setState({
                    contestNumber: _this.state.editData.likesCount
                })
            }
            if (_this.state.editData.schedule == '') {
                // const rdate = moment(_this.state.editData.scheduledDate).format('HH:mm:ss');
                _this.setState({
                    onTodayTime: _this.state.editData.scheduledDate,
                    scheduleValue: 'Immediately'
                })
            }
            if (_this.state.editData.schedule == 'Weekly') {
                const dd = moment(_this.state.editData.scheduledDate).format('dddd')
                _this.setState({ onWeeklyDay: dd, scheduleValue: 'Schedule date and time' });
                const tdate = moment(_this.state.editData.scheduledDate).format('HH:mm:ss');
                _this.setState({ onWeeklyTime: tdate });
                var dat = moment().day(dd).format('YYYY-MM-DD');
                var d = dat + ' ' + tdate;
                var de = new Date(d).toISOString();
                _this.setState({ scheduleCategory: _this.state.editData.schedule })
            }
            if (_this.state.editData.schedule == 'On Date' || _this.state.editData.schedule == 'Monthly') {
                const rdate = moment(_this.state.editData.scheduledDate).format('YYYY-MM-DD');
                _this.setState({ onDateDt: rdate, scheduleValue: 'Schedule date and time' });
                const tdate = moment(_this.state.editData.scheduledDate).format('HH:mm:ss');
                _this.setState({ onDateTime: tdate })
            }
            if (_this.state.editData.locationTags.length === 0) {
                _this.setState({ radioValue: 'Global' })
            }
            if (_this.state.editData.locationTags.length != 0) {
                _this.setState({
                    radioValue: 'location',
                    tags: _this.state.editData.locationTags
                })
                var res = _this.state.editData.locationTags;
                var locationAr = _this.state.editData.location;
                var arr = [];
                for (var i = 0; i < locationAr.length; i++) {
                    var locationObj = {};
                    locationObj.location = res[i];
                    locationObj.locId = locationAr[i];
                    arr.push(locationObj);
                }
                _this.setState({ locationArray: arr });

            }
        })

    }

    next() {
        var _this = this
        if (this.state.current == 0) {
            var body = {};
            let errors = {}
            if (this.state.fun2WinCategory === '' && this.state.fun2winAll === "") errors.fun2WinCategory = '*mandatory field'
            if (this.state.fun2winAll !== "All") {
                if (this.state.fun2winSubCategory === '' && this.state.fun2winSubcatAll === "") errors.fun2winSubCategory = '*mandatory field'
            }
            if (this.state.fun2WinActivityFilter === '') errors.fun2WinActivityFilter = '*mandatory field'
            this.setState({ errors })
            if (Object.keys(errors).length == 0) {

                if (this.state.fun2WinActivityFilter === 'Participated') {
                    if (this.state.fun2WinDurationFilter === '') errors.fun2WinDurationFilter = '*mandatory field'
                    this.setState({ errors })
                    if (Object.keys(errors).length == 0) {
                        body = {
                            "category": this.state.fun2WinCategory,
                            "subCategory": this.state.fun2winSubCategory
                        }
                        if (body) {
                            const url = '/fun2winNotification/participated'
                            var request = new Request(url, {
                                method: 'POST',
                                body: JSON.stringify(body),
                                headers: {
                                    "Content-Type": "application/json",
                                    'x-access-token': sessionStorage.getItem('token')
                                }
                            });
                            fetch(request)
                                .then(response => response.json())
                                .then(function (response) {
                                    if (response.status === 200) {
                                        if (response.data.length == 0) {
                                            message.error("No Users found for this filter");
                                            _this.setState({ usersArray: [] })
                                        }
                                        else {
                                            var list = response.data.filter((x, i, a) => a.indexOf(x) == i)
                                            _this.setState({ usersArray: list })
                                            const current = _this.state.current + 1;
                                            _this.setState({ current });

                                        }
                                    }
                                    else { }
                                })
                        }
                    }

                }
                else if (this.state.fun2WinActivityFilter === 'No. of Participations') {
                    if (this.state.fun2WinParticipationCountFilter == '') errors.fun2WinParticipationCountFilter = '*mandatory field'
                    this.setState({ errors })
                    if (Object.keys(errors).length == 0) {
                        if (this.state.fun2WinParticipationCountFilter == 'WithinRange') {
                            if (this.state.contestOne == '') errors.contestOne = '*mandatory field'
                            if (this.state.contestTwo == '') errors.contestTwo = '*mandatory field'
                            this.setState({ errors })
                            if (Object.keys(errors).length == 0) {
                                body = {
                                    "category": this.state.fun2WinCategory,
                                    "subCategory": this.state.fun2winSubCategory,
                                    "fromRange": this.state.contestOne,
                                    "toRange": this.state.contestTwo,
                                    "comparision": this.state.fun2WinParticipationCountFilter
                                }
                            }
                        }
                        else if (this.state.fun2WinParticipationCountFilter) {
                            if (this.state.contestNumber == '') errors.contestNumber = '*mandatory field'
                            this.setState({ errors })
                            if (Object.keys(errors).length == 0) {
                                body = {
                                    "category": this.state.fun2WinCategory,
                                    "subCategory": this.state.fun2winSubCategory,
                                    "count": this.state.contestNumber,
                                    "comparision": this.state.fun2WinParticipationCountFilter
                                }
                            }
                        }
                        if (body) {
                            const url = '/fun2winNotification/participatedCount'
                            var request = new Request(url, {
                                method: 'POST',
                                body: JSON.stringify(body),
                                headers: {
                                    "Content-Type": "application/json",
                                    'x-access-token': sessionStorage.getItem('token')
                                }
                            });
                            fetch(request)
                                .then(response => response.json())
                                .then(function (response) {
                                    if (response.status === 200) {
                                        if (response.data.length == 0) {
                                            message.error("No Users found for this filter");
                                            _this.setState({
                                                usersArray: []
                                            })
                                        }
                                        else {
                                            _this.setState({ usersArray: response.data })
                                            const current = _this.state.current + 1;
                                            _this.setState({ current });
                                        }
                                    }
                                    else {
                                    }
                                })
                        }
                    }
                }
                else if (this.state.fun2WinActivityFilter === 'Not Participated') {
                    if (Object.keys(errors).length == 0) {
                        body = {
                            "category": this.state.fun2WinCategory,
                            "subCategory": this.state.fun2winSubCategory
                        }

                        if (body) {
                            const url = '/fun2winNotification/notparticipated'
                            var request = new Request(url, {
                                method: 'POST',
                                body: JSON.stringify(body),
                                headers: {
                                    "Content-Type": "application/json",
                                    'x-access-token': sessionStorage.getItem('token')
                                }
                            });
                            fetch(request)
                                .then(response => response.json())
                                .then(function (response) {
                                    if (response.status === 200) {
                                        if (response.data.length == 0) {
                                            message.error("No Users found for this filter");
                                            _this.setState({
                                                usersArray: []
                                            })
                                        }
                                        else {
                                            _this.setState({ usersArray: response.data })
                                            const current = _this.state.current + 1;
                                            _this.setState({ current });
                                        }
                                    }
                                    else {
                                    }
                                })
                        }
                    }
                }
            }
        }

        if (this.state.current === 1) {
            let errors = {}
            if (this.state.title.trim() === '') errors.title = '*mandatory field'
            if (this.state.contestDescription.trim() === '') errors.contestDescription = '*mandatory field'
            if (this.state.imageUrl === '') errors.imageUrl = '*mandatory field'
            this.setState({ errors })
            if (Object.keys(errors).length == 0) {
                const current = this.state.current + 1;
                this.setState({ current });
            }
        } else if (this.state.current === 2) {
            let errors = {};
            if (this.state.scheduleValue === '') errors.scheduleValue = '*mandatory field'
            if (this.state.scheduleValue === "Schedule date and time") {
                if (this.state.scheduleCategory === '') errors.scheduleCategory = "*mandatory field"
            }
            this.setState({ errors });
            if (Object.keys(errors).length === 0) {
                if (this.state.scheduleCategory === "Weekly") {
                    let errors = {};
                    if (this.state.onWeeklyDay == '') errors.onWeeklyDay = "*mandatory field"
                    if (this.state.onWeeklyTime == '') errors.onWeeklyTime = "*mandatory field"
                    this.setState({ errors });
                    if (Object.keys(errors).length === 0) {
                        var { onWeeklyDay, onWeeklyTime } = this.state;
                        var dat = moment().day(onWeeklyDay).format('YYYY-MM-DD');
                        var d = dat + ' ' + onWeeklyTime;
                        var de = new Date(d).toISOString();
                        this.setState({ scheduleDate: de })
                        const current = this.state.current + 1;
                        this.setState({ current });
                    }
                } else if (this.state.scheduleCategory === "On Date" || this.state.scheduleCategory === "Monthly") {
                    let errors = {};
                    if (this.state.onDateDt == '') errors.onDateDt = "*mandatory field"
                    if (this.state.onDateTime == '') errors.onDateTime = "*mandatory field"
                    this.setState({ errors });
                    if (Object.keys(errors).length === 0) {
                        var { onDateDt, onDateTime } = this.state;
                        let d = onDateDt + ' ' + onDateTime;
                        var de = new Date(d).toISOString();
                        this.setState({ scheduleDate: de })
                        const current = this.state.current + 1;
                        this.setState({ current });
                    }

                } else if (this.state.scheduleValue === "Immediately") {
                    let errors = {}
                    if (this.state.onTodayTime == '') errors.onTodayTime = "*mandatory field"
                    this.setState({ errors });
                    if (Object.keys(errors).length === 0) {
                        this.setState({ scheduleDate: this.state.onTodayTime });
                        const current = this.state.current + 1;
                        this.setState({ current });
                    }
                }
            }

        }
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    done = () => {
        if (this.state.editData._id) {
            let errors = {};
            if (this.state.radioValue == '') errors.radioValue = '*mandatory field'
            this.setState({ errors })
            if (Object.keys(errors).length == 0) {
                if (this.state.radioValue == "location" && this.state.locationArray.length == 0) errors.location = "*mandatory field"
                this.setState({ errors })
                if (Object.keys(errors).length == 0) {
                    var locations = []
                    for (let i = 0; i < this.state.locationArray.length; i++) {
                        locations[i] = this.state.locationArray[i].locId
                    }
                    if (this.state.fun2WinActivityFilter === "Participated") {
                        var dataObj = {
                            'users': this.state.usersArray,
                            'title': this.state.title.trim(),
                            'description': this.state.contestDescription.trim(),
                            'imageUrl': this.state.imageUrl,
                            'location': this.state.radioValue !== 'Global' ? locations : [this.state.radioValue],
                            "type": "Scheduled Notifications",
                            "category": "Fun2Win",
                            "targetUserCategory": this.state.fun2winTargetCat,
                            "targetUserSubcat": this.state.fun2winTargetSubCat,
                            "targetActivity": this.state.fun2WinActivityFilter,
                            "within": this.state.fun2WinDurationFilter,
                            "scheduledDate": this.state.scheduleDate,
                            "status": true,
                            "schedule": this.state.scheduleCategory,
                            "locationTags": this.state.tags
                        }
                        if (this.state.fun2WinCategory != "") {
                            data.targetUserCategoryId = this.state.fun2WinCategory;
                        } if (this.state.fun2winSubCategory != "") {
                            data.targetUserSubcatId = this.state.fun2winSubCategory;
                        }
                        const url = '/scheduledNotification/' + this.state.editData._id
                        var request1 = new Request(url, {
                            method: 'PUT',
                            body: JSON.stringify(dataObj),
                            headers: {
                                "Content-Type": "application/json",
                                'x-access-token': sessionStorage.getItem('token')
                            }
                        });
                        fetch(request1)
                            .then(response => response.json())
                            .then(function (response) {
                                if (response.status === 200) {
                                    message.success("Notifications Edited Successfully");
                                    browserHistory.push("/push-notifications/scheduled-notifications");
                                }
                                else { }
                            })
                    } else if (this.state.fun2WinActivityFilter === "No. of Participations") {
                        var dataObj = {
                            'users': this.state.usersArray,
                            'title': this.state.title.trim(),
                            'description': this.state.contestDescription.trim(),
                            'imageUrl': this.state.imageUrl,
                            'location': this.state.radioValue !== 'Global' ? locations : [this.state.radioValue],
                            "type": "Scheduled Notifications",
                            "category": "Fun2Win",
                            "targetUserCategory": this.state.fun2winTargetCat,
                            "targetUserSubcat": this.state.fun2winTargetSubCat,
                            "targetActivity": this.state.fun2WinActivityFilter,
                            "range": this.state.fun2WinParticipationCountFilter,
                            "likesCount": this.state.contestNumber,
                            "startLikesCount": this.state.contestOne,
                            "endLikesCount": this.state.contestTwo,
                            "within": this.state.fun2WinDurationFilter,
                            "scheduledDate": this.state.scheduleDate,
                            "status": true,
                            "schedule": this.state.scheduleCategory,
                            "locationTags": this.state.tags
                        }
                        if (this.state.fun2WinCategory != "") {
                            data.targetUserCategoryId = this.state.fun2WinCategory;
                        } if (this.state.fun2winSubCategory != "") {
                            data.targetUserSubcatId = this.state.fun2winSubCategory;
                        }
                        const url = '/scheduledNotification/' + this.state.editData._id
                        var request2 = new Request(url, {
                            method: 'PUT',
                            body: JSON.stringify(dataObj),
                            headers: {
                                "Content-Type": "application/json",
                                'x-access-token': sessionStorage.getItem('token')
                            }
                        });
                        fetch(request2)
                            .then(response => response.json())
                            .then(function (response) {
                                if (response.status === 200) {
                                    message.success("Notifications Edited Successfully");
                                    browserHistory.push("/push-notifications/scheduled-notifications");
                                }
                                else { }
                            })
                            .catch((err) => { })
                    } else if (this.state.fun2WinActivityFilter === "Not Participated") {
                        var dataObj = {
                            'users': this.state.usersArray,
                            'title': this.state.title.trim(),
                            'description': this.state.contestDescription.trim(),
                            'imageUrl': this.state.imageUrl,
                            'location': this.state.radioValue !== 'Global' ? locations : [this.state.radioValue],
                            "type": "Scheduled Notifications",
                            "category": "Fun2Win",
                            "targetUserCategory": this.state.fun2winTargetCat,
                            "targetUserSubcat": this.state.fun2winTargetSubCat,
                            "targetActivity": this.state.fun2WinActivityFilter,
                            "within": this.state.fun2WinDurationFilter,
                            "scheduledDate": this.state.scheduleDate,
                            "status": true,
                            "schedule": this.state.scheduleCategory,
                            "locationTags": this.state.tags
                        }
                        if (this.state.fun2WinCategory != "") {
                            data.targetUserCategoryId = this.state.fun2WinCategory;
                        } if (this.state.fun2winSubCategory != "") {
                            data.targetUserSubcatId = this.state.fun2winSubCategory;
                        }
                        const url = '/scheduledNotification/' + this.state.editData._id
                        var request2 = new Request(url, {
                            method: 'PUT',
                            body: JSON.stringify(dataObj),
                            headers: {
                                "Content-Type": "application/json",
                                'x-access-token': sessionStorage.getItem('token')
                            }
                        });
                        fetch(request2)
                            .then(response => response.json())
                            .then(function (response) {
                                if (response.status === 200) {
                                    message.success("Notifications Edited Successfully");
                                    browserHistory.push("/push-notifications/scheduled-notifications");
                                }
                                else { }
                            })
                            .catch((err) => { })
                    }
                }
            }
        }
        else if (this.state.editData._id != '') {
            let errors = {};
            if (this.state.radioValue == '') errors.radioValue = 'Select Location Preference'
            this.setState({ errors })
            if (Object.keys(errors).length == 0) {
                if (this.state.radioValue == "location" && this.state.locationArray.length == 0) errors.location = "Please fill the location"
                this.setState({ errors })
                if (Object.keys(errors).length == 0) {
                    var locations = []
                    for (let i = 0; i < this.state.locationArray.length; i++) {
                        locations[i] = this.state.locationArray[i].locId
                    }
                    if (this.state.fun2WinActivityFilter === "Participated") {
                        var dataObj = {
                            'users': this.state.usersArray,
                            'title': this.state.title.trim(),
                            'description': this.state.contestDescription.trim(),
                            'imageUrl': this.state.imageUrl,
                            'location': this.state.radioValue !== 'Global' ? locations : [this.state.radioValue],
                            "type": "Scheduled Notifications",
                            "category": "Fun2Win",
                            "targetUserCategory": this.state.fun2winTargetCat,
                            "targetUserSubcat": this.state.fun2winTargetSubCat,
                            "targetActivity": this.state.fun2WinActivityFilter,
                            "within": this.state.fun2WinDurationFilter,
                            "scheduledDate": this.state.scheduleDate,
                            "status": true,
                            "schedule": this.state.scheduleCategory,
                            "locationTags": this.state.tags
                        }
                        if (this.state.fun2WinCategory != "") {
                            data.targetUserCategoryId = this.state.fun2WinCategory;
                        } if (this.state.fun2winSubCategory != "") {
                            data.targetUserSubcatId = this.state.fun2winSubCategory;
                        }
                        const url = '/scheduledNotification'
                        var request = new Request(url, {
                            method: 'POST',
                            body: JSON.stringify(dataObj),
                            headers: {
                                "Content-Type": "application/json",
                                'x-access-token': sessionStorage.getItem('token')
                            }
                        });
                        fetch(request)
                            .then(response => response.json())
                            .then(function (response) {
                                if (response.status === 200) {
                                    message.success("Notifications Sent");
                                    browserHistory.push("/push-notifications/scheduled-notifications");
                                }
                                else { }
                            })
                    } else if (this.state.fun2WinActivityFilter === "No. of Participations") {
                        var dataObj = {
                            'users': this.state.usersArray,
                            'title': this.state.title.trim(),
                            'description': this.state.contestDescription.trim(),
                            'imageUrl': this.state.imageUrl,
                            'location': this.state.radioValue !== 'Global' ? locations : [this.state.radioValue],
                            "type": "Scheduled Notifications",
                            "category": "Fun2Win",
                            "targetUserCategory": this.state.fun2winTargetCat,
                            "targetUserSubcat": this.state.fun2winTargetSubCat,
                            "targetActivity": this.state.fun2WinActivityFilter,
                            "range": this.state.fun2WinParticipationCountFilter,
                            "likesCount": this.state.contestNumber,
                            "startLikesCount": this.state.contestOne,
                            "status": true,
                            "endLikesCount": this.state.contestTwo,
                            "within": this.state.fun2WinDurationFilter,
                            "scheduledDate": this.state.scheduleDate,
                            "schedule": this.state.scheduleCategory,
                            "locationTags": this.state.tags
                        }
                        if (this.state.fun2WinCategory != "") {
                            data.targetUserCategoryId = this.state.fun2WinCategory;
                        } if (this.state.fun2winSubCategory != "") {
                            data.targetUserSubcatId = this.state.fun2winSubCategory;
                        }
                        const url = '/scheduledNotification'
                        var request = new Request(url, {
                            method: 'POST',
                            body: JSON.stringify(dataObj),
                            headers: {
                                "Content-Type": "application/json",
                                'x-access-token': sessionStorage.getItem('token')
                            }
                        });
                        fetch(request)
                            .then(response => response.json())
                            .then(function (response) {
                                if (response.status === 200) {
                                    message.success("Notifications Sent");
                                    browserHistory.push("/push-notifications/scheduled-notifications");
                                }
                                else { }
                            })
                    }
                    else if (this.state.fun2WinActivityFilter === "Not Participated") {
                        var dataObj = {
                            'users': this.state.usersArray,
                            'title': this.state.title.trim(),
                            'description': this.state.contestDescription.trim(),
                            'imageUrl': this.state.imageUrl,
                            'location': this.state.radioValue !== 'Global' ? locations : [this.state.radioValue],
                            "type": "Scheduled Notifications",
                            "category": "Fun2Win",
                            "targetUserCategory": this.state.fun2winTargetCat,
                            "targetUserSubcat": this.state.fun2winTargetSubCat,
                            "targetActivity": this.state.fun2WinActivityFilter,
                            "status": true,
                            "scheduledDate": this.state.scheduleDate,
                            "schedule": this.state.scheduleCategory,
                            "locationTags": this.state.tags
                        }
                        if (this.state.fun2WinCategory != "") {
                            data.targetUserCategoryId = this.state.fun2WinCategory;
                        } if (this.state.fun2winSubCategory != "") {
                            data.targetUserSubcatId = this.state.fun2winSubCategory;
                        }
                        const url = '/scheduledNotification'
                        var request = new Request(url, {
                            method: 'POST',
                            body: JSON.stringify(dataObj),
                            headers: {
                                "Content-Type": "application/json",
                                'x-access-token': sessionStorage.getItem('token')
                            }
                        });
                        fetch(request)
                            .then(response => response.json())
                            .then(function (response) {
                                if (response.status === 200) {
                                    message.success("Notifications Sent");
                                    browserHistory.push("/push-notifications/scheduled-notifications");
                                }
                                else { }
                            })
                    }
                }
            }
        }

    }


    onFun2WinCatChange = (e) => {
        //For Fun2Win
        if (this.state.fun2WinCategory == '') this.state.errors.fun2WinCategory = ''
        if (isEmpty(this.props.cusFanclubCat)) {
            this.state.categories.map((record) => {
                if (e === record._id) {
                    this.setState({ fun2winTargetCat: record.name })
                    this.setState({ subCategories: record.subCategories })
                }
            })
            this.setState({
                fun2WinCategory: e
            })
        }
        else {
            if (e === "All") {
                this.setState({ disabled: true, fun2winAll: e, fun2WinCategory: '', fun2winTargetCat: e, fun2winTargetSubCat: '' })
            } else {
                this.props.cusFanclubCat.map((subcat) => {
                    if (e === subcat._id) {
                        this.setState({ cusFanclubSubCat: subcat.subCategories, fun2winTargetCat: subcat.name });
                    }
                })
                this.setState({
                    fun2WinCategory: e,
                    fun2winSubCategory: "",
                    disabled: false,
                })
            }
        }
    }

    onFun2WinSubCatChange = (e) => {

        if (this.state.fun2winSubCategory == '') this.state.errors.fun2winSubCategory = '';

        if (isEmpty(this.props.cusFanclubCat)) {
            this.state.subCategories.map((subcategory) => {
                if (e === subcategory._id) {
                    this.setState({ fun2winTargetSubCat: subcategory.name });
                }
                this.setState({
                    fun2winSubCategory: e
                })
            })
        }
        else {
            if (e != "All") {
                this.state.cusFanclubSubCat.map((subcat) => {
                    if (e === subcat._id) {
                        this.setState({ fun2winTargetSubCat: subcat.name });
                    }
                    this.setState({
                        fun2winSubCategory: e
                    })
                })
            }
            else {
                this.setState({
                    fun2winSubcatAll: e
                })
            }
        }
    }

    onTargetActivityChange = (e) => {
        if (this.state.fun2WinActivityFilter == '') this.state.errors.fun2WinActivityFilter = ''
        this.setState({
            fun2WinActivityFilter: e
        })
    }
    onDurationFilterChange = (e) => {
        if (this.state.fun2WinDurationFilter == '') this.state.errors.fun2WinDurationFilter = ''
        this.setState({
            fun2WinDurationFilter: e
        })
    }
    handlecontestOneChange = (e) => {
        this.setState({
            contestOne: e
        })
        if (this.state.contestOne == '') this.state.errors.contestOne = ''
    }
    handlecontestTwoChange = (e) => {
        this.setState({
            contestTwo: e
        })
        if (this.state.contestTwo == '') this.state.errors.contestTwo = ''
    }
    onParticipationCountChange = (e) => {
        this.setState({ fun2WinParticipationCountFilter: e })
        if (this.state.fun2WinParticipationCountFilter == '') this.state.errors.fun2WinParticipationCountFilter = ''
    }
    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        // if (this.state[e.target.name].length > 0) this.state.errors[e.target.name] = ''
    }

    handleDurationChange = (e) => {
        this.setState({
            contestNumber: e
        })
        if (this.state.contestNumber == '') this.state.errors.contestNumber = ''
    }

    uploadImage = (info) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            if (info.file.response.data !== '') this.state.errors.imageUrl = '';
            this.setState({
                imageUrl: info.file.response.data
            })
        }
    }
    onRadioChange = (e) => {
        this.setState({ radioValue: e.target.value })
    }

    bindTargetActivityChange = () => {
        if (this.state.fun2WinActivityFilter === 'Participated') {
            return (
                <div>

                    <Col span={5} className="marginLeft20">
                        <FormItem label="Participated">
                            <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                showSearch
                                placeholder="within range"
                                optionFilterProp="children"
                                onChange={this.onDurationFilterChange}
                                value={this.state.fun2WinDurationFilter}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                <Option value="Within">Within</Option>
                                <Option value="Within Range">Within Range</Option>
                                <Option value="Unspecified">Unspecified</Option>
                            </Select>
                            <p style={{ color: "red" }}>{this.state.errors.fun2WinDurationFilter}</p>
                        </FormItem>
                    </Col>

                </div>
            )
        }
        else if (this.state.fun2WinActivityFilter === 'No. of Participations') {
            return (<div>

                <Col span={5} className="marginLeft20">
                    <FormItem label="Select Comparision Value">
                        <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                            showSearch
                            placeholder="Select range"
                            optionFilterProp="children"
                            onChange={this.onParticipationCountChange}
                            value={this.state.fun2WinParticipationCountFilter}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                            <Option value="LessThan">Less Than</Option>
                            <Option value="GreaterThan">Greater Than</Option>
                            <Option value="EqualsTo">Equals To</Option>
                            <Option value="WithinRange">Within Range</Option>
                        </Select>
                        <p style={{ color: "red" }}>{this.state.errors.fun2WinParticipationCountFilter}</p>
                    </FormItem>
                </Col>

                {this.bindParticipatedCountView()}
            </div>);
        }
        else if (this.state.fun2WinActivityFilter === 'Not Participated') {
            return (<div>
            </div>);
        }
    }

    bindParticipatedCountView = () => {
        if (this.state.fun2WinParticipationCountFilter == 'WithinRange') {
            return (<div>
                <Col span={2} className="marginLeft20 sechdulecountFun2winstart">
                    <FormItem label="Start Count">
                        {/* <Input type="" placeholder="From Contests" name="contestOne" value={this.state.contestOne} maxLength={50} onChange={this.onInputChange} /> */}
                        <InputNumber min={1} placeholder="From Contests" name="contestOne" value={this.state.contestOne} onChange={this.handlecontestOneChange} />
                    </FormItem>
                    <p style={{ color: "red" }}>{this.state.errors.contestOne}</p>
                </Col>
                <Col span={2} className="sechdulecountFun2winstart">
                    <FormItem label="End Count">
                        {/* <Input type="" placeholder="To Contests" name="contestTwo" value={this.state.contestTwo} maxLength={50} onChange={this.onInputChange} /> */}
                        <InputNumber min={1} placeholder="To Contests" name="contestTwo" value={this.state.contestTwo} onChange={this.handlecontestTwoChange} />
                    </FormItem>
                    <p style={{ color: "red" }}>{this.state.errors.contestTwo}</p>
                </Col>
                <Col span={5}>
                    <FormItem label="Select range">
                        <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                            showSearch
                            placeholder="within range"
                            optionFilterProp="children"
                            onChange={this.onDurationFilterChange}
                            value={this.state.fun2WinDurationFilter}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                            <Option value="Within">Within</Option>
                            <Option value="Within Range">Within Range</Option>
                            <Option value="Unspecified">Unspecified</Option>
                        </Select>
                    </FormItem>
                </Col>
                {/* {this.bindFun2WinDuration()} */}

            </div>)
        }
        else {
            return (
                <div>
                    <Col span={2} className="marginLeft20">
                        <FormItem label="Count">
                            {/* <Input type="" placeholder="Number" name="contestNumber" value={this.state.contestNumber} maxLength={50} onChange={this.onInputChange} /> */}
                            <InputNumber min={1} placeholder="Number" name="contestNumber" value={this.state.contestNumber} onChange={this.handleDurationChange} />
                        </FormItem>
                        <p style={{ color: "red" }}>{this.state.errors.contestNumber}</p>
                    </Col>
                    <Col span={5} className="selectRangefun2winSechdule">
                        <FormItem label="Select Range">
                            <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                showSearch
                                placeholder="within range"
                                optionFilterProp="children"
                                onChange={this.onDurationFilterChange}
                                value={this.state.fun2WinDurationFilter}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                <Option value="Within">Within</Option>
                                <Option value="Within Range">Within Range</Option>
                                <Option value="Unspecified">Unspecified</Option>
                            </Select></FormItem>
                    </Col>
                    {/* {this.bindFun2WinDuration()} */}


                </div>)
        }
    }
    onScheduleChange = (e) => {
        this.setState({ scheduleValue: e.target.value });
    }
    onScheduleCategoryChange = (e) => {
        this.setState({ scheduleCategory: e });
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
        this.setState({ onTodayTime: value });
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
                                        <TimePicker onChange={this.onWeeklyTimeChange} getPopupContainer={triggerNode => triggerNode.parentNode}
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
        const { current } = this.state;
        const { tags } = this.state;
        const test = this.props.cusFanclubCat;
        if (isEmpty(test)) {
            var categories = this.state.categories.map((category) => <Option value={category._id}>{category.name}</Option>)
            var subCategories = this.state.subCategories.map((subcat) => <Option value={subcat._id}>{subcat.name}</Option>);
        } else {
            var categories = this.props.cusFanclubCat.map((subCat) => <Option value={subCat._id}>{subCat.name}</Option>);
            var subCategories = this.state.cusFanclubSubCat.map((subcat) => <Option value={subcat._id}>{subcat.name}</Option>);
        }


        var targetActivities = this.props.subCategories.map((subCat) => <Option value={subCat.name}>{subCat.name}</Option>)
        var activitiesList = this.state.activitiesList.map((record) => <Option value={record.name}>{record.name}</Option>)

        // var categories = this.props.cusFanclubCat.map((subCat) => <Option value={subCat._id}>{subCat.name}</Option>);

        // var categories = this.state.categories.map((category) => <Option value={category._id}>{category.name}</Option>)

        // var subCategories = this.state.cusFanclubSubCat.map((subcat) => <Option value={subcat._id}>{subcat.name}</Option>);
        // var subCategories = this.state.subCategories.map((subcat) => <Option value={subcat._id}>{subcat.name}</Option>);
        const steps1 = [{
            title: 'Select Target Users',
            content:
            <div id="CFun2Win" className="">
                <Row className="MarginTop20">
                    <Form>
                        <Row>
                            <Col span={18} className="">
                                <FormItem label="Select Category" className="colLg8">
                                    <p className='greyColor'></p>
                                    <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                        showSearch
                                        placeholder="Select FanClubs Category"
                                        optionFilterProp="children"
                                        onChange={this.onFun2WinCatChange}
                                        defaultValue={this.state.fun2WinCategory || this.props.editData.targetUserCategory || this.state.fun2winAll}
                                        value={this.state.fun2WinCategory || this.props.editData.targetUserCategory || this.state.fun2winAll}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                        {categories}
                                        <Option value="All">All</Option>
                                    </Select>
                                    <p style={{ color: "red" }}>{this.state.errors.fun2WinCategory}</p>

                                </FormItem>

                                <FormItem label="Select Sub Category" className="colLgSubCategory">
                                    <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                        showSearch
                                        placeholder="Select FanClubs Sub Category"
                                        optionFilterProp="children"
                                        disabled={this.state.disabled}
                                        onChange={this.onFun2WinSubCatChange}
                                        defaultValue={this.state.fun2winSubCategory || this.props.editData.targetUserSubcat}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                        {subCategories}
                                        <Option value="All">All</Option>
                                    </Select>
                                    <p style={{ color: "red" }}>{this.state.errors.fun2winSubCategory}</p>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>

                                <Col span={5} className="">
                                    <FormItem label="Criteria to be followed">
                                        <Select className="LeftSpace" getPopupContainer={triggerNode => triggerNode.parentNode}
                                            showSearch
                                            placeholder="Select One"
                                            optionFilterProp="children"
                                            defaultValue={this.state.fun2WinActivityFilter}
                                            value={this.state.fun2WinActivityFilter || ''}
                                            onChange={this.onTargetActivityChange}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                            {targetActivities != '' ? targetActivities : activitiesList}
                                        </Select>
                                        <p style={{ color: "red" }}>{this.state.errors.fun2WinActivityFilter}</p>
                                    </FormItem>
                                </Col>

                                {this.bindTargetActivityChange()}
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
                        <Row className="marginBottom20">
                            <Col span={10} className="">
                                <FormItem>
                                    <Input type="" placeholder="Enter Title" name="title" value={this.state.title} maxLength={50} onChange={this.onInputChange} />
                                </FormItem>
                                <p style={{ color: "red" }}>{this.state.errors.title}</p>
                            </Col>
                        </Row>
                        <Row className="marginBottom20">
                            <Col span={8} className="">
                                <TextArea rows={3} placeholder="Enter Description" name="contestDescription" value={this.state.contestDescription} onChange={this.onInputChange} />
                            </Col>
                            <p style={{ color: "red" }}>{this.state.errors.contestDescription}</p>
                            <Col span={2} className="">
                                <Upload {...this.props.imageProps}
                                    className="avatar-uploader marginLeft20 pussNotImg"
                                    showUploadList={false}
                                    onChange={this.uploadImage}
                                    accept=".png,.jpg,.jpeg"
                                    >
                                    {
                                        this.state.imageUrl ?
                                            <img src={this.state.imageUrl} alt="" className="avatar" style={{ width: 80, height: 80 }} /> :
                                            <Icon type="plus" className="avatar-uploader-trigger" style={{ width: 75, height: 75 }} />
                                    }
                                </Upload>
                                <p style={{ color: "red" }}>{this.state.errors.imageUrl}</p>
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
                                        <Radio value="Schedule date and time">Specify date and time</Radio>
                                    </RadioGroup>
                                </FormItem>
                                <p style={{ color: "red" }}>{this.state.errors.scheduleValue}</p>
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
                                <FormItem>
                                    <RadioGroup onChange={this.onRadioChange} value={this.state.radioValue}>
                                        <Radio value='Global'>Send to all locations</Radio>
                                        <Radio value='location'>Specific location</Radio>
                                    </RadioGroup>
                                    <p style={{ color: "red" }}>{this.state.errors.radioValue}</p>
                                </FormItem>
                            </Col>
                        </Row>
                        {this.state.radioValue === 'location' ?
                            <Row>
                                <Col span={14} className="">
                                    <FormItem>
                                        {/* <Input type="" placeholder="Enter Location" name="location" value={this.state.location} maxLength={50} onChange={this.onInputChange} /> */}
                                        <PlacesAutoComplete submit44={this.handleMapData} className="ant-input" />
                                        <p style={{ color: "red" }}>{this.state.errors.location}</p>
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
export default ScheduledFun2Win;
/* eslint-disable */