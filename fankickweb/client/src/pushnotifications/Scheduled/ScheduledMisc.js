/* eslint-disable */
import React from 'react';
import { Input, Select, Row, Col, InputNumber, Form, Tabs, Radio, Tag, Tooltip, TimePicker, DatePicker, Upload, message, Steps, Button, Icon } from 'antd';
import AddTag from '../AddTag';
import classnames from 'classnames';
import moment from 'moment';
import moments from 'moment-timezone';
import $ from 'jquery'
import axios from 'axios';
import { browserHistory } from 'react-router';
import PlacesAutoComplete from '../Custom/PlaceAutoComplete';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;
const Option = Select.Option;

const Step = Steps.Step;
const format = 'HH:mm';
const dateFormat = 'YYYY-MM-DD';
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

class ScheduledMisc extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 0,
            scheduleValue: "",
            scheduleCategory: "",
            onDateDt: "",
            onDateTime: "",
            onWeeklyDay: "",
            onWeeklyTime: "",
            onTodayTime: "",
            catagiryname: '',
            Rangein: '',
            within: '',
            withinran3: '',
            withinran4: '',
            performed: '',
            MIsData: {},
            MIsData1: {},
            errors: {},
            title1: '',
            description1: '',
            imageUrl1: '',
            location: '',
            city: '',
            category: '',
            nType: '',
            locationArray: [],
            tags: [],
            scheduleDate: "",
            schedule: "",
            editData: '',
            activitiesList:
            [
                {
                    "_id": "5a2936ce9f13aace6a1752bf",
                    "name": "Refer Friend",
                    "sTypeId": "5a28072f9f13aace6a02f96f",
                    "cTypeId": "5a2806cf9f13aace6a02f111"
                },
                {
                    "_id": "5a29371d9f13aace6a175f00",
                    "name": "Profile Creation",
                    "sTypeId": "5a28072f9f13aace6a02f96f",
                    "cTypeId": "5a2806cf9f13aace6a02f111"
                },
                {
                    "_id": "5a2937329f13aace6a175faf",
                    "name": "Add Profile Picture",
                    "sTypeId": "5a28072f9f13aace6a02f96f",
                    "cTypeId": "5a2806cf9f13aace6a02f111"
                },
                {
                    "_id": "5a2937429f13aace6a176032",
                    "name": "No. of Fan Coins",
                    "sTypeId": "5a28072f9f13aace6a02f96f",
                    "cTypeId": "5a2806cf9f13aace6a02f111"
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
                catagiryname: this.props.editData.targetActivity,
                performed: this.props.editData.performed,
                title1: this.props.editData.title,
                description1: this.props.editData.description,
                imageUrl1: this.props.editData.imageUrl,
                scheduleDate: this.props.editData.scheduledDate
            })
            if (this.props.editData.targetActivity == "No. of Fan Coins") {
                if (this.props.editData.range == "withinRange") {
                    this.setState({
                        Rangein: this.props.editData.range,
                        withinran3: this.props.editData.startLikesCount,
                        withinran4: this.props.editData.endLikesCount
                    })
                }
                else {
                    this.setState({
                        Rangein: this.props.editData.range,
                        within: this.props.editData.likesCount
                    })
                }

            }

            if (this.props.editData.schedule == "") {
                const rdate = moment(this.props.editData.scheduledDate).format('HH:mm:ss');
                this.setState({ scheduleValue: 'Today', onTodayTime: this.props.editData.scheduledDate })
            }
            if (this.props.editData.schedule == 'Weekly') {
                const dd = moment(this.props.editData.scheduledDate).format('dddd')
                this.setState({ onWeeklyDay: dd, scheduleValue: 'Schedule date and time' });
                const tdate = moment(this.props.editData.scheduledDate).format('HH:mm:ss');
                this.setState({ onWeeklyTime: tdate });
                var dat = moment().day(dd).format('YYYY-MM-DD');
                var d = dat + ' ' + tdate;
                var de = new Date(d).toISOString();
                this.setState({ scheduleCategory: this.props.editData.schedule })
            }
            if (this.props.editData.schedule == "On Date" || this.props.editData.schedule == "Monthly") {
                const rdate = moment(this.props.editData.scheduledDate).format('YYYY-MM-DD');
                this.setState({ onDateDt: rdate, scheduleValue: 'Schedule date and time' });
                const tdate = moment(this.props.editData.scheduledDate).format('HH:mm:ss');
                this.setState({ onDateTime: tdate })
                this.setState({ scheduleCategory: this.props.editData.schedule })
            }
            if (this.props.editData.locationTags.length === 0) {
                this.setState({ location: 'Global' })
            }
            if (this.props.editData.locationTags.length != 0) {
                this.setState({
                    location: 'Local',
                    tags: this.props.editData.locationTags
                })
                var res = this.props.editData.locationTags;
                var locationAr = this.props.editData.location;
                var arr = [];
                for (var i = 0; i < locationAr.length; i++) {
                    var locationObj = {};
                    locationObj.location = res[i];
                    locationObj.locId = locationAr[i];
                    arr.push(locationObj);
                }
                this.setState({ locationArray: arr });
            }
        }
    }


    componentDidMount() {
        if (this.props != undefined) {
            this.setState({ category: this.props.category, nType: this.props.nType })
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

    next() {

        if (this.state.current === 0) {
            let errors = {};
            var _self = this;
            if (this.state.catagiryname === '') errors.catagiryname = "Select one catagory";
            this.setState({ errors });
            if (Object.keys(errors).length === 0) {
                if (this.state.catagiryname === "Refer Friend") {
                    let errors = {};
                    if (this.state.performed === '') errors.performed = "Field is required";
                    this.setState({ errors });
                    if (Object.keys(errors).length === 0) {
                        // axios.get('/notifications/referFriend', {
                        //     headers: {
                        //         "x-access-token": sessionStorage.token,
                        //     },

                        // })
                        //     .then(function (response) {

                        //         this.setState({ MIsData: response.data.data });

                        //     }.bind(this))
                        //     .catch(function (error) {
                        //     });
                        const current = this.state.current + 1;
                        this.setState({ current });
                    }
                } else if (this.state.catagiryname === "Profile Creation") {
                    let errors = {};
                    if (this.state.performed === '') errors.performed = "Field is required";
                    this.setState({ errors });
                    if (Object.keys(errors).length === 0) {
                        // axios.get('/notifications/createProfile', {
                        //     headers: {
                        //         "x-access-token": sessionStorage.token,
                        //     },

                        // })
                        //     .then(function (response) {

                        //         this.setState({ MIsData: response.data.data });

                        //     }.bind(this))
                        //     .catch(function (error) {
                        //     });
                        const current = this.state.current + 1;
                        this.setState({ current });
                    }
                }
                else if (this.state.catagiryname === "Add Profile Picture") {
                    let errors = {};
                    if (this.state.performed === '') errors.performed = "Field is required";
                    this.setState({ errors });
                    if (Object.keys(errors).length === 0) {
                        // axios.get('/notifications/createProfilePic', {
                        //     headers: {
                        //         "x-access-token": sessionStorage.token,
                        //     },

                        // })
                        //     .then(function (response) {

                        //         this.setState({ MIsData: response.data.data });

                        //     }.bind(this))
                        //     .catch(function (error) {
                        //     });
                        const current = this.state.current + 1;
                        this.setState({ current });
                    }
                }
                else if (this.state.catagiryname === "No. of Fan Coins") {
                    let errors = {};
                    if (this.state.Rangein === '') errors.Rangein = " Select one catagoery";
                    if (this.state.Rangein != '') {
                        if (this.state.Rangein != "withinRange") {
                            if (this.state.within === '') errors.within = "Count is required";
                        }
                        if (this.state.Rangein === "withinRange") {
                            if (this.state.withinran3 === '') errors.withinran3 = "Start Count is required";
                            if (this.state.withinran4 === '') errors.withinran4 = "End Count is required";
                        }
                    }
                    this.setState({ errors });
                    if (Object.keys(errors).length === 0) {

                        // var data = {
                        //     "range": this.state.Rangein,
                        //     "count": this.state.within,
                        //     "startCount": this.state.withinran3,
                        //     "endCount": this.state.withinran4
                        // }
                        // var fetchReq = axios.create({
                        //     headers: { 'Content-Type': 'application/json', 'x-access-token': sessionStorage.getItem('token') }
                        // })
                        // fetchReq.post('/notifications/fancoins', data).then(function (response) {
                        //     _self.setState({ MIsData: response.data.data });
                        // })
                        const current = this.state.current + 1;
                        this.setState({ current });
                    }
                } else if (this.state.catagiryname === "All Users") {
                    // var fetchReq = axios.create({
                    //     headers: { 'Content-Type': 'application/json', 'x-access-token': sessionStorage.getItem('token') }
                    // })
                    // fetchReq.get('/notifications/generic').then(function (response) {
                    //     _self.setState({ MIsData: response.data.data });
                    // })
                    const current = this.state.current + 1;
                    this.setState({ current });
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
            if (this.state.scheduleValue === '') errors.scheduleValue = "*mandatory field";
            if (this.state.scheduleValue === "Schedule date and time") {
                if (this.state.scheduleCategory === '') errors.scheduleCategory = "*mandatory field"
            }
            this.setState({ errors });
            if (Object.keys(errors).length === 0) {
                if (this.state.scheduleCategory === "Weekly") {
                    let errors = {};
                    if (this.state.onWeeklyDay === '') errors.onWeeklyDay = "*mandatory field";
                    if (this.state.onWeeklyTime === '') errors.onWeeklyTime = "*mandatory field";
                    this.setState({ errors });
                    if (Object.keys(errors).length === 0) {
                        var {onWeeklyDay, onWeeklyTime} = this.state;
                        var dat = moment().day(onWeeklyDay).format('YYYY-MM-DD');
                        var d = dat + ' ' + onWeeklyTime;
                        var de = new Date(d).toISOString();
                        console.log("date", de)
                        const current = this.state.current + 1;
                        this.setState({ current });
                        this.setState({ scheduleDate: de })
                    }

                } else if (this.state.scheduleCategory === "On Date" || this.state.scheduleCategory === "Monthly") {
                    let errors = {};
                    if (this.state.onDateDt === '') errors.onDateDt = "*mandatory field";
                    if (this.state.onDateTime === '') errors.onDateTime = "*mandatory field";
                    this.setState({ errors });
                    if (Object.keys(errors).length === 0) {
                        var {onDateDt, onDateTime} = this.state;
                        let d = onDateDt + ' ' + onDateTime;
                        var de = new Date(d).toISOString();
                        console.log("date", de)
                        const current = this.state.current + 1;
                        this.setState({ current });
                        this.setState({ scheduleDate: de })
                    }
                } else if (this.state.scheduleValue === "Today") {
                    let errors = {};
                    if (this.state.onTodayTime === '') errors.onTodayTime = "*mandatory field";
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

        if (this.state.current === 3) {
            if (this.props.editData._id) {
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
                    if (this.state.catagiryname !== "No. of Fan Coins" && this.state.catagiryname !== "All Users") {
                        var data = {
                            "type": "Scheduled Notifications",
                            "category": "Miscellaneous",
                            "users": this.state.MIsData,
                            "title": this.state.title1.trim(),
                            "description": this.state.description1.trim(),
                            "imageUrl": this.state.imageUrl1,
                            "location": this.state.location === "Global" ? [this.state.location] : locations,
                            "targetActivity": this.state.catagiryname,
                            "performed": this.state.performed,
                            "scheduledDate": this.state.scheduleDate,
                            "status": true,
                            // "schedule": this.state.scheduleCategory,
                            "locationTags": this.state.tags
                        }
                        if (this.state.scheduleCategory === "") {
                            data.schedule = this.state.scheduleValue
                        } else {
                            data.schedule = this.state.scheduleCategory
                        }
                        const url = "/scheduledNotification/" + this.props.editData._id
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
                                    //_self.setState({ParticipatedTwoDates:response.data})
                                    message.success('Notification updated successfully!');
                                    browserHistory.push('/push-notifications/scheduled-notifications');
                                } else {
                                    message.error(`unable to create Notification.`);
                                }
                            })
                    } else if (this.state.catagiryname === "No. of Fan Coins") {
                        var data = {

                            "type": "Scheduled Notifications",
                            "category": "Miscellaneous",
                            "users": this.state.MIsData,
                            "title": this.state.title1.trim(),
                            "description": this.state.description1.trim(),
                            "imageUrl": this.state.imageUrl1,
                            "location": this.state.location === "Global" ? [this.state.location] : locations,
                            "targetActivity": this.state.catagiryname,
                            "range": this.state.Rangein,
                            "likesCount": this.state.within,
                            "startLikesCount": this.state.withinran3,
                            "endLikesCount": this.state.withinran4,
                            "scheduledDate": this.state.scheduleDate,
                            "status": true,
                            // "schedule": this.state.scheduleCategory,
                            "locationTags": this.state.tags


                        }
                        if (this.state.scheduleCategory === "") {
                            data.schedule = this.state.scheduleValue
                        } else {
                            data.schedule = this.state.scheduleCategory
                        }
                        const url = "/scheduledNotification/" + this.props.editData._id
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
                                    //_self.setState({ParticipatedTwoDates:response.data})
                                    message.success('Notification Updated successfully!');
                                    browserHistory.push('/push-notifications/scheduled-notifications');
                                } else {
                                    message.error(`unable to create Notification.`);
                                }
                            })
                    } else if (this.state.catagiryname === "All Users") {
                        // var data = {
                        //     "scheduledDate": this.state.scheduleDate,
                        //     "title": this.state.title1.trim(),
                        //     "message": this.state.description1.trim(),
                        //     "imageUrl": this.state.imageUrl1,
                        //     "status": 0,
                        //     "type": "generic"
                        // }
                        var data = {
                            "type": "Scheduled Notifications",
                            "category": "Miscellaneous",
                            // "users": this.state.MIsData,
                            "title": this.state.title1.trim(),
                            "description": this.state.description1.trim(),
                            "imageUrl": this.state.imageUrl1,
                            "location": this.state.location === "Global" ? [this.state.location] : locations,
                            "targetActivity": this.state.catagiryname,
                            "performed": this.state.performed,
                            "scheduledDate": this.state.scheduleDate,
                            "status": true,
                            //"schedule": this.state.scheduleCategory,
                            "locationTags": this.state.tags
                        }
                        if (this.state.scheduleCategory === "") {
                            data.schedule = this.state.scheduleValue
                        } else {
                            data.schedule = this.state.scheduleCategory
                        }
                        var req = axios.create({
                            headers: {
                                "x-access-token": sessionStorage.getItem('token')
                            }
                        })
                        req.put('/scheduledNotification/' + this.props.editData._id, data).then((response) => {
                            if (response.status === 200) {
                                message.success('Notification Updated successfully!');
                                browserHistory.push('/push-notifications/scheduled-notifications')
                            } else {
                                message.error(`Unable to create Notification.`);
                            }
                        })
                    }
                }
            }
            else {
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
                    if (this.state.catagiryname !== "No. of Fan Coins" && this.state.catagiryname !== "All Users") {
                        var data = {
                            "type": this.state.nType,
                            "category": this.state.category,
                            "users": this.state.MIsData,
                            "title": this.state.title1.trim(),
                            "description": this.state.description1.trim(),
                            "imageUrl": this.state.imageUrl1,
                            "location": this.state.location === "Global" ? [this.state.location] : locations,
                            "targetActivity": this.state.catagiryname,
                            "performed": this.state.performed,
                            "scheduledDate": this.state.scheduleDate,
                            "status": true,
                            //"schedule": this.state.scheduleCategory,
                            "locationTags": this.state.tags
                        }
                        if (this.state.scheduleCategory === "") {
                            data.schedule = this.state.scheduleValue
                        } else {
                            data.schedule = this.state.scheduleCategory
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
                                    //_self.setState({ParticipatedTwoDates:response.data})
                                    message.success('Notification Created successfully!');
                                    browserHistory.push('/push-notifications/scheduled-notifications');
                                } else {
                                    message.error(`unable to create Notification.`);
                                }
                            })
                    } else if (this.state.catagiryname === "No. of Fan Coins") {
                        var data = {

                            "type": this.state.nType,
                            "category": this.state.category,
                            "users": this.state.MIsData,
                            "title": this.state.title1.trim(),
                            "description": this.state.description1.trim(),
                            "imageUrl": this.state.imageUrl1,
                            "location": this.state.location === "Global" ? [this.state.location] : locations,
                            "targetActivity": this.state.catagiryname,
                            "range": this.state.Rangein,
                            "likesCount": this.state.within,
                            "startLikesCount": this.state.withinran3,
                            "endLikesCount": this.state.withinran4,
                            "status": true,
                            "scheduledDate": this.state.scheduleDate,
                            // "schedule": this.state.scheduleCategory,
                            "locationTags": this.state.tags

                        }
                        if (this.state.scheduleCategory === "") {
                            data.schedule = this.state.scheduleValue
                        } else {
                            data.schedule = this.state.scheduleCategory
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
                                    //_self.setState({ParticipatedTwoDates:response.data})
                                    message.success('Notification Created successfully!');
                                    browserHistory.push('/push-notifications/scheduled-notifications');
                                } else {
                                    message.error(`unable to create Notification.`);
                                }
                            })
                    }
                    else if (this.state.catagiryname === "All Users") {
                        // var data = {
                        //     "scheduledDate": this.state.scheduleDate,
                        //     "title": this.state.title1.trim(),
                        //     "message": this.state.description1.trim(),
                        //     "imageUrl": this.state.imageUrl1,
                        //     "status": 0,
                        //     "type": "generic"
                        // }
                        var data = {
                            "type": "Scheduled Notifications",
                            "category": "Miscellaneous",
                            // "users": this.state.MIsData,
                            "title": this.state.title1.trim(),
                            "description": this.state.description1.trim(),
                            "imageUrl": this.state.imageUrl1,
                            "location": this.state.location === "Global" ? [this.state.location] : locations,
                            "targetActivity": this.state.catagiryname,
                            "performed": this.state.performed,
                            "scheduledDate": this.state.scheduleDate,
                            "status": true,
                            //"schedule": this.state.scheduleCategory,
                            "locationTags": this.state.tags
                        }
                        if (this.state.scheduleCategory === "") {
                            data.schedule = this.state.scheduleValue
                        } else {
                            data.schedule = this.state.scheduleCategory
                        }
                        var req = axios.create({
                            headers: {
                                "x-access-token": sessionStorage.getItem('token')
                            }
                        })
                        req.post('/scheduledNotification', data).then((response) => {
                            if (response.status === 200) {
                                message.success('Notification created successfully!');
                                browserHistory.push('/push-notifications/scheduled-notifications');
                            } else {
                                message.error(`Unable to create Notification.`);
                            }
                        })
                    }
                }
            }

        }

    }
    onCategoryChange = (value) => {
        this.setState({ catagiryname: value, performed: '', Rangein: '', within: '', withinran4: '', withinran3: '' });
        if (value !== '') this.state.errors.catagiryname = '';
    }
    onCategoryChange1 = (value) => {
        this.setState({ performed: value });
        if (value !== '') this.state.errors.performed = '';
    }
    onChangeRange = (value) => {
        this.setState({ Rangein: value })
        if (value !== '') this.state.errors.Rangein = '';
    }
    onChangeWithin = (e) => {
        this.setState({ within: e })
        if (e !== '') this.state.errors.within = '';
    }
    onChangewithinran3 = (e) => {
        this.setState({ withinran3: e });
        if (e !== '') this.state.errors.withinran3 = '';
    }
    onChangewithinran4 = (e) => {
        this.setState({ withinran4: e });
        if (e !== '') this.state.errors.withinran4 = '';
    }
    onChangeTitle = (e) => {
        $("Input").on("keydown", function (e) {
            if (e.which === 32 && !this.value.length)
                e.preventDefault();
        });
        this.setState({ title1: e.target.value })
        if (e.target.value !== '') this.state.errors.title1 = '';
    }
    onChangeDes = (e) => {
        $("Input").on("keydown", function (e) {
            if (e.which === 32 && !this.value.length)
                e.preventDefault();
        });
        this.setState({ description1: e.target.value });
        if (e.target.value !== '') this.state.errors.description1 = '';
    }
    onChangeImg = (info) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            console.log("imageurl", info.file.response.data)
            if (info.file.response.data !== '') this.state.errors.imageUrl1 = '';
            this.setState({
                imageUrl1: info.file.response.data
            })
        }
    }
    onChanRadio = (e) => {
        var self = this;
        this.setState({ location: e.target.value })
        if (e.target.value !== '') this.state.errors.location = '';
    }
    onChangelnam = (e) => {
        this.setState({ city: e.target.value });
        if (e.target.value !== '') this.state.errors.city = '';
        const string = e.target.value;
        const Uw1 = string.charAt(0).toUpperCase() + string.slice(1);
        this.setState({ Uw: Uw1 });
    }

    onScheduleChange = (e) => {
        if (e.target.value === "Today") {
            this.setState({ onDateDt: '', onDateTime: '', onWeeklyTime: '', onWeeklyDay: '', scheduleCategory: '' })
        }
        if (e.target.value === "Schedule date and time") {
            this.setState({ onTodayTime: '' })
        }
        this.setState({ scheduleValue: e.target.value });
    }
    onScheduleCategoryChange = (e) => {
        this.setState({ scheduleCategory: e });
    }
    disablingCurrentHours = () => {
        if (this.state.onDateDt == moment().format('YYYY-MM-DD')) {
            var time = new moment().format("HH");
            var num = [];
            for (let i = 0; i < time; i++) {
                num.push(i);
            }
            return num;
        }
    }
    disablingCurrentHours1 = () => {
        var time = new moment().format("HH");
        var num = [];
        for (let i = 0; i < time; i++) {
            num.push(i);
        }
        return num;
    }

    disabledCurrentMinutes1 = (hour) => {
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
    disabledCurrentMinutes = (hour) => {
        if (this.state.onDateDt == moment().format('YYYY-MM-DD')) {
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
        var value = moment(e).add(10, 'seconds').format('HH:mm:ss');
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
        // var value = moment(e).format("HH:mm:ss a");
        var value = moment(e).add(10, 'seconds').format('HH:mm:ss');
        var value1 = moment().format('YYYY-MM-DD');
        let d = value1 + ' ' + value;
        var de = new Date(d).toISOString();
        console.log("sdfsdf", de)
        this.setState({ onTodayTime: de });
    }
    bindImmediateView = () => {
        var { scheduleValue } = this.state;
        if (scheduleValue === "Today") {

            return (
                <Row>
                    <Col span={20} className="">
                        <FormItem label="Select Time" className={classnames('onTodayTime', { error: !!this.state.errors.onTodayTime })}>
                            <TimePicker getPopupContainer={triggerNode => triggerNode.parentNode} onChange={this.onTodayTimeChange} format={format} defaultOpenValue={moment(new Date, 'HH:mm:ss').minute(-10).hour(-1)} disabledHours={this.disablingCurrentHours1} disabledMinutes={this.disabledCurrentMinutes1}
                                defaultValue={this.state.onTodayTime ? moment(this.state.onTodayTime, format) : ""} value={this.state.onTodayTime ? moment(this.state.onTodayTime) : ""}
                                />
                            <span>{this.state.errors.onTodayTime}</span>
                        </FormItem>
                        <p className="marginBottom20">Message will be sent as specified.</p>
                    </Col>
                </Row>
            )
        } else if (scheduleValue === "Schedule date and time") {
            console.log("current date", moment().format('YYYY-MM-DD'), "onDate", this.state.onDateDt)
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
                                    {this.state.catagiryname !== "All Users" ? <Option value="Weekly">Weekly</Option> : ''}
                                    {this.state.catagiryname !== "All Users" ? <Option value="Monthly">Monthly</Option> : ''}
                                </Select>
                                <span>{this.state.errors.scheduleCategory}</span>
                            </FormItem >
                            {this.state.scheduleCategory === "On Date" || this.state.scheduleCategory === "Monthly" ?
                                <div className="MarginTop20">
                                    <FormItem label="Specify Date" className={classnames('onDateDt', { error: !!this.state.errors.onDateDt })}>
                                        <DatePicker onChange={this.onDateChange} disabledDate={this.disabledDate} getCalendarContainer={triggerNode => triggerNode.parentNode}
                                            value={this.state.onDateDt ? moment(this.state.onDateDt, dateFormat) : ''} format={dateFormat} />
                                        <span>{this.state.errors.onDateDt}</span>
                                    </FormItem>
                                    {/*<span className="spanPadding">at</span>*/}
                                    <FormItem label="Specify Time" className={classnames('onDateTime', { error: !!this.state.errors.onDateTime })}>
                                        <TimePicker getPopupContainer={triggerNode => triggerNode.parentNode} onChange={this.onDateTimeChange} format={format}
                                            defaultOpenValue={moment(new Date, 'HH:mm:ss').minute(-10).hour(-1)}
                                            disabledHours={this.disablingCurrentHours}
                                            disabledMinutes={this.disabledCurrentMinutes}
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
                                        <TimePicker getPopupContainer={triggerNode => triggerNode.parentNode} onChange={this.onWeeklyTimeChange}
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
        console.log("this state", this.state)
        if (Object.keys(this.props.editData).length > 0) {
        }
        else {
        }
        var {tags} = this.state;
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
        // var targetActivities = this.props.subCategories.map((subCat) => <Option value={subCat.name}>{subCat.name}</Option>)
        var targetActivities = this.state.activitiesList.map((record) => <Option value={record.name}>{record.name}</Option>)
        const steps1 = [{
            title: 'Select Target Users',
            content:
            <div id="CMiscellaneous" className="">
                <Row className="MarginTop20">
                    <Form>
                        <Row>
                            <Col span={8} className="">
                                <FormItem>
                                    <FormItem label="Select Activity from list" className={classnames('catagiryname', { error: !!this.state.errors.catagiryname })}>
                                        <Select className="LeftMoreSpace" getPopupContainer={triggerNode => triggerNode.parentNode}
                                            showSearch

                                            placeholder="Select Miscellanous Category"
                                            optionFilterProp="children"
                                            onChange={this.onCategoryChange}
                                            value={this.state.catagiryname}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                            {targetActivities}
                                            <Option value="All Users">All Users</Option>
                                        </Select>
                                        <p>{this.state.errors.catagiryname}</p>
                                    </FormItem>
                                    {this.state.catagiryname === "Refer Friend" || this.state.catagiryname === "Profile Creation" || this.state.catagiryname === "Add Profile Picture" ?
                                        <div><FormItem label="Activity Status" className={classnames('performed', { error: !!this.state.errors.performed })}>
                                            <Select className="LeftMoreSpace" getPopupContainer={triggerNode => triggerNode.parentNode}
                                                showSearch
                                                style={{ width: 200 }}
                                                placeholder="was Not performed"
                                                optionFilterProp="children"
                                                onChange={this.onCategoryChange1}
                                                value={this.state.performed}
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                >
                                                <Option value="wasNotPerformed">Was Not Performed</Option>

                                            </Select>
                                            <p>{this.state.errors.performed}</p>
                                        </FormItem></div>
                                        : null}
                                    <ul className="list-inline">
                                        <li>
                                            {this.state.catagiryname === "No. of Fan Coins" ?
                                                <FormItem label="Select Range" className={classnames('Rangein', { error: !!this.state.errors.Rangein })}>
                                                    <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                                        showSearch
                                                        style={{ width: 150 }}
                                                        placeholder="within"
                                                        optionFilterProp="children"
                                                        value={this.state.Rangein}
                                                        onChange={this.onChangeRange}
                                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                        >
                                                        <Option value="Is less than">Is less than</Option>
                                                        <Option value="Is greater than">Is greater than</Option>
                                                        <Option value="Is equal to">Is equal to </Option>

                                                        <Option value="withinRange">With In Range</Option>
                                                    </Select>
                                                    <p>{this.state.errors.Rangein}</p>
                                                </FormItem>

                                                : null}</li>
                                        <li className="SechduledMiscWithin">
                                            {this.state.Rangein === "Is less than" || this.state.Rangein === "Is greater than" || this.state.Rangein === "Is equal to" ? <div>
                                                <FormItem label="within" className={classnames('within', { error: !!this.state.errors.within })}>
                                                    <InputNumber min={1} placeholder="WithIn" name="within" value={this.state.within} onChange={this.onChangeWithin} style={{ width: 200 }} />
                                                    <p>{this.state.errors.within}</p>
                                                </FormItem>
                                            </div> : null}</li>
                                        <li>
                                            {this.state.Rangein === "withinRange" ? <div>
                                                <ul className="list-inline"><li><FormItem label="within " className={classnames('withinran3', { error: !!this.state.errors.withinran3 })}>
                                                    <InputNumber min={1} placeholder="start to" value={this.state.withinran3} name="withinran3" onChange={this.onChangewithinran3} />
                                                    <p>{this.state.errors.withinran3}</p>
                                                </FormItem></li>.
                                                <li>
                                                        <FormItem label="within Range" className={classnames('withinran4', { error: !!this.state.errors.withinran4 })}>
                                                            <InputNumber min={1} value={this.state.withinran4} name="withinran4" placeholder="end" onChange={this.onChangewithinran4} />
                                                            <p>{this.state.errors.withinran4}</p>
                                                        </FormItem></li>
                                                </ul></div> : null}</li>
                                    </ul>
                                </FormItem>
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
                                <FormItem className={classnames('title1', { error: !!this.state.errors.title1 })}>
                                    <Input type="text" placeholder="Enter Title" value={this.state.title1} name="title1" name="title1" maxLength={this.state.catagiryname === "All Users" ? 48 : 50} onChange={this.onChangeTitle} />
                                    <p>{this.state.errors.title1}</p>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row className="marginBottom20">

                            <Col span={8} className="">
                                <FormItem className={classnames('description1', { error: !!this.state.errors.description1 })}>
                                    <TextArea rows={3} placeholder="Enter Description" name="description1" maxLength={this.state.catagiryname === "All Users" ? 100 : 150} value={this.state.description1} onChange={this.onChangeDes} />
                                    <p>{this.state.errors.description1}</p>
                                </FormItem>
                            </Col>

                            <Col span={2} className="smallUploader">
                                <FormItem className={classnames('imageUrl1', { error: !!this.state.errors.imageUrl1 })} style={{ 'marginLeft': '20' }}>
                                    <Upload  {...props}
                                        className="avatar-uploader marginLeft20 pussNotImg"

                                        showUploadList={false}
                                        accept=".png,.jpg,.jpeg"
                                        onChange={this.onChangeImg}
                                        style={{ width: 80, height: 80 }}
                                        >
                                        {
                                            this.state.imageUrl1 ?
                                                <img src={this.state.imageUrl1} alt="" className="avatar" style={{ width: 80, height: 80 }} /> :
                                                <Icon type="plus" className="avatar-uploader-trigger" style={{ width: 75, height: 75 }} />
                                        }
                                    </Upload>
                                    <p>{this.state.errors.imageUrl1}</p>
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
                                        <Radio value="Today">Today</Radio>
                                        <Radio value="Schedule date and time">Schedule date and time</Radio>
                                    </RadioGroup>
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
                                    <p>{this.state.errors.location}</p>
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
export default ScheduledMisc;
/* eslint-disable */