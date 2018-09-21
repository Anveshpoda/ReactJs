/* eslint-disable */
import React from 'react';
import { Input, InputNumber, Select, Row, Col, Form, Tabs, Tag, Tooltip, Radio, TimePicker, DatePicker, Upload, message, Steps, Button, Icon } from 'antd';
import AddTag from '../AddTag';
import classnames from 'classnames';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import moment from 'moment';
import PlacesAutoComplete from '../Custom/PlaceAutoComplete';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;
const Option = Select.Option;
const Step = Steps.Step;
//const Step1 = Steps.Step;
const dateFormat = 'YYYY-MM-DD';
const format = 'HH:mm:ss';
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
class ScheduledFanclubs extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 0,
            imageUrl1: '',
            cusFanclubSubCat: [],
            cusFanclubCat: '',
            cusFanclubSubcatName: '',
            cusFanclubTargetName: '',
            cusFanclubPerformed: '',
            cusFanclubFor: '',
            cusFanclubSubcatId: '',
            cusFanclubCelebNames: [],
            cusFanclubCelebName: '',
            cusFanclubWithin: '',
            cusFanclubCelebUsers: [],
            cusFanclubDays: '',
            cusFanclubStartDay: '',
            cusFanclubEndDay: '',
            cusFanclubCreateDate: '',
            cusFanclubDate: '',
            cusFanclubDate1: '',
            cusFanclubDate2: '',
            disabled: false,
            catId: '',
            cusFanclubCount: '',
            cusFanclubStartCount: '',
            cusFanclubEndCount: '',
            cusFanclubWithin1: '',
            errors: {},
            title1: '',
            description1: '',
            imageUrl1: '',
            location: '',
            city: '',
            Uw: '',
            catagory: '',
            nType: '',
            scheduleValue: '',
            onDateDt: "",
            onDateTime: "",
            onWeeklyDay: "",
            onWeeklyTime: "",
            onTodayTime: "",
            scheduleCategory: "",
            tags: [],
            locationArray: [],
            scheduleDate: "",
            editfanclubdata: {},
            categories: [],
            activitiesList:
            [
                {
                    "id": 0,
                    "name": "Join Fan Club",
                    "_id": "5a2934549f13aace6a170c6b"
                },
                {
                    "id": 1,
                    "name": "No.of Fan Clubs Joined",
                    "_id": "5a29348a9f13aace6a1712e9"
                },
                {
                    "id": 2,
                    "name": "Fan Club Creation",
                    "_id": "5a2934a29f13aace6a1713d5"
                },
                {
                    "id": 3,
                    "name": "No. of Fan Clubs Created",
                    "_id": "5a2934b79f13aace6a171497"
                },
                {
                    "id": 4,
                    "name": "No. of Fan Club Members - To Admin",
                    "_id": "5a2934cc9f13aace6a1719fc"
                },
                {
                    "id": 5,
                    "name": "Event Creation",
                    "_id": "5a2934e49f13aace6a171af2"
                },
                {
                    "id": 6,
                    "name": "No. of Events Created",
                    "_id": "5a2934fb9f13aace6a171bca"
                },
                {
                    "id": 7,
                    "name": "Fan Club Feeds",
                    "_id": "5a29352e9f13aace6a172224"
                }

            ]
        }
    }
    componentWillMount() {
        if (this.props != undefined) {

            this.setState({ catagory: this.props.category, nType: this.props.nType, editfanclubdata: this.props.editData })
        }
        var myObj = this.props.editData
        if (isEmpty(myObj)) {
        } else {
            var self = this;
            self.getCatagory();

        }
    }
    getCatagory = () => {
        var _this = this;
        var fetchCateg = axios.create({ headers: { 'x-access-token': sessionStorage.getItem('token') } });
        fetchCateg.get('/categories').then(function (response) {
            const data = response.data.data
            _this.setState({ categories: data });
            _this.setState({ catagory: _this.state.editfanclubdata.category })
            _this.setState({ nType: _this.state.editfanclubdata.type });
            _this.setState({ cusFanclubCat: _this.state.editfanclubdata.targetUserCategory });
            if(_this.state.editfanclubdata.targetUserCategory==="All")_this.setState({disabled:true})
            _this.setState({ cusFanclubSubcatName: _this.state.editfanclubdata.targetUserSubcat });
            _this.setState({ cusFanclubTargetName: _this.state.editfanclubdata.targetActivity });
            _this.setState({ cusFanclubPerformed: _this.state.editfanclubdata.performed });
            _this.setState({ cusFanclubFor: _this.state.editfanclubdata.forCelebrity });
            _this.setState({ cusFanclubCelebName: _this.state.editfanclubdata.celebrityName });
            _this.setState({ catId: _this.state.editfanclubdata.targetUserCategoryId });
            _this.setState({ cusFanclubSubcatId: _this.state.editfanclubdata.targetUserSubcatId });
            _this.setState({ cusFanclubWithin1: _this.state.editfanclubdata.range });
            _this.setState({ cusFanclubWithin: _this.state.editfanclubdata.within });
            _this.setState({ cusFanclubCount: _this.state.editfanclubdata.likesCount });
            _this.setState({ cusFanclubStartCount: _this.state.editfanclubdata.startLikesCount });
            _this.setState({ cusFanclubEndCount: _this.state.editfanclubdata.endLikesCount });
            _this.setState({ cusFanclubStartDay: _this.state.editfanclubdata.startDays });
            _this.setState({ cusFanclubEndDay: _this.state.editfanclubdata.endDays });
            _this.setState({ cusFanclubDays: _this.state.editfanclubdata.days });
            _this.setState({ title1: _this.state.editfanclubdata.title });
            _this.setState({ description1: _this.state.editfanclubdata.description })
            _this.setState({ imageUrl1: _this.state.editfanclubdata.imageUrl })
            _this.setState({ scheduleCategory: _this.state.editfanclubdata.schedule })


            if (_this.state.editfanclubdata.schedule === "") {
                _this.setState({ scheduleValue: "Immediately" });
                //var time=moment(_this.state.editfanclubdata.scheduledDate).format("HH:mm:ss")
                _this.setState({ onTodayTime: _this.state.editfanclubdata.scheduledDate })
            } else if (_this.state.editfanclubdata.schedule === "On Date") {
                _this.setState({ scheduleValue: "Schedule date and time" });
                const rdate = moment(_this.state.editfanclubdata.scheduledDate).format('YYYY-MM-DD');
                _this.setState({ onDateDt: rdate });
                const tdate = moment(_this.state.editfanclubdata.scheduledDate).format('HH:mm:ss');
                _this.setState({ onDateTime: tdate })
            } else if (_this.state.editfanclubdata.schedule === "Weekly") {
                _this.setState({ scheduleValue: "Schedule date and time" });

                const dd = moment(_this.state.editfanclubdata.scheduledDate).format('dddd')
                _this.setState({ onWeeklyDay: dd });
                const tdate = moment(_this.state.editfanclubdata.scheduledDate).format('HH:mm:ss');
                _this.setState({ onWeeklyTime: tdate });
            } else if (_this.state.editfanclubdata.schedule === "Monthly") {
                _this.setState({ scheduleValue: "Schedule date and time" });
                const rdate = moment(_this.state.editfanclubdata.scheduledDate).format('YYYY-MM-DD');
                _this.setState({ onDateDt: rdate });
                const tdate = moment(_this.state.editfanclubdata.scheduledDate).format('HH:mm:ss');
                _this.setState({ onDateTime: tdate })
            }
            var dat = moment().subtract(_this.state.editfanclubdata.startDays, 'days').calendar();
            var time = moment(dat).add(1, 'day').toISOString();
            _this.setState({ cusFanclubDate1: time });
            _this.setState({ cusFanclubEndDay: _this.state.editfanclubdata.endDays });
            var dat = moment().subtract(_this.state.editfanclubdata.endDays, 'days').calendar();
            var time = moment(dat).add(1, 'day').toISOString();
            _this.setState({ cusFanclubDate2: time });

            if (_this.state.editfanclubdata.forCelebrity === "for celebrity") {
                const id = _this.state.editfanclubdata.targetUserSubcatId
                var getData = axios.create({
                    params: {
                        subCatId: id
                    }, headers: { 'Content-Type': 'application/json' }
                })
                getData.get('/celebrityNames').then(function (response) {
                    _this.setState({ cusFanclubCelebNames: response.data.data });
                })
            }
            if (_this.state.editfanclubdata.targetUserCategory === "Movies") {
                _this.setState({ cusFanclubSubCat: _this.state.categories[0].subCategories })
            } else if (_this.state.editfanclubdata.targetUserCategory === "Sports") {
                _this.setState({ cusFanclubSubCat: _this.state.categories[1].subCategories })
            }
            else if (_this.state.editfanclubdata.targetUserCategory === "Music") {
                _this.setState({ cusFanclubSubCat: _this.state.categories[1].subCategories })
            } else if (_this.state.editfanclubdata.targetUserCategory === "TV Shows") {
                _this.setState({ cusFanclubSubCat: _this.state.categories[1].subCategories })
            }
            if (_this.state.editfanclubdata.locationTags.length === 0) {
                _this.setState({ location: "Global" })
            } else if (_this.state.editfanclubdata.locationTags.length != 0) {
                _this.setState({ location: "Local" })
                _this.setState({ tags: _this.state.editfanclubdata.locationTags })
                // _this.setState({locationArray:_this.state.editfanclubdata.location})
                var res = _this.state.editfanclubdata.locationTags;
                var locationAr = _this.state.editfanclubdata.location;
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
        })

    }

    onCusFanclubCatChange = (e) => {
        if (e === "All") {
            this.setState({ disabled: true, catId: e, cusFanclubCat: e, cusFanclubSubcatName: '', cusFanclubPerformed: '', cusFanclubFor: '' })
            this.state.errors.cusFanclubSubcatId = "";
        } else {
            var myObj = this.props.cusFanclubCat
            if (isEmpty(myObj)) {
                this.state.categories.map((subcat) => {
                    if (e === subcat._id) {
                        this.setState({ cusFanclubSubCat: subcat.subCategories, disabled: false, catId: e, cusFanclubCat: subcat.name, cusFanclubSubcatName: '' });
                    }
                })
            } else {
                this.props.cusFanclubCat.map((subcat) => {
                    if (e === subcat._id) {
                        this.setState({ cusFanclubSubCat: subcat.subCategories, disabled: false, catId: e, cusFanclubCat: subcat.name, cusFanclubSubcatName: '' });
                    }
                })
            }
        }
        if (e !== '') this.state.errors.catId = '';
    }
    onCusFanclubSubcatChange = (e) => {
        if (e === "All") {
            this.setState({ cusFanclubSubcatName: e })
        } else {
            this.state.cusFanclubSubCat.map((subCat) => {
                if (e === subCat._id) {
                    this.setState({ cusFanclubSubcatName: subCat.name })
                }
            })
        }
        this.setState({ cusFanclubSubcatId: e, cusFanclubPerformed: '', cusFanclubFor: '' });
        if (e !== '') this.state.errors.cusFanclubSubcatId = '';

    }
    onCusTargetChange = (e) => {
        this.props.subCategories.map((name) => {
            if (e === name._id) {
                this.setState({ cusFanclubTargetName: name.name, cusFanclubPerformed: '', cusFanclubFor: '', cusFanclubDays: '', cusFanclubStartDay: '', cusFanclubEndDay: '', cusFanclubWithin: '' });

            }
        })
        if (e !== '') this.state.errors.cusFanclubTargetName = '';
    }
    onCusPerformedChange = (e) => {
        this.setState({ cusFanclubPerformed: e, cusFanclubFor: '', });
        if (e !== '') this.state.errors.cusFanclubPerformed = '';

    }
    onCusForChange = (e) => {
        var _this = this;
        this.setState({ cusFanclubFor: e, cusFanclubDays: '', cusFanclubStartDay: '', cusFanclubEndDay: '', cusFanclubWithin: '' });
        if (e === 'for celebrity') {
            var getData = axios.create({
                params: {
                    subCatId: this.state.cusFanclubSubcatId
                }, headers: { 'Content-Type': 'application/json' }
            })
            getData.get('/celebrityNames').then(function (response) {
                _this.setState({ cusFanclubCelebNames: response.data.data });
            })
        }
        if (e !== '') this.state.errors.cusFanclubFor = '';
    }
    onCusFanclubCelebChange = (e) => {
        var _this = this;
        this.setState({ cusFanclubCelebName: e });
        if (e !== '') this.state.errors.cusFanclubCelebName = '';
    }
    onCusFanclubWithinChange = (e) => {
        this.setState({ cusFanclubWithin: e });
        if (e !== '') this.state.errors.cusFanclubWithin = '';
    }
    onCusFanclubWithinChange1 = (e) => {
        this.setState({ cusFanclubWithin1: e });
        if (e !== '') this.state.errors.cusFanclubWithin1 = '';
    }
    handleInput = (e) => {
        this.setState({ cusFanclubDays: e });
        var dat = moment().subtract(e, 'days').calendar();
        var time = moment(dat).add(1, 'day').toISOString();
        this.setState({ cusFanclubDate: time });
        if (e !== undefined || e !== "") this.state.errors.cusFanclubDays = '';
    }
    handleInput1 = (e) => {
        this.setState({ cusFanclubStartDay: e });
        var dat = moment().subtract(e, 'days').calendar();
        var time = moment(dat).add(1, 'day').toISOString();
        this.setState({ cusFanclubDate1: time });
        if (e !== undefined || e !== "") this.state.errors.cusFanclubStartDay = '';
    }
    handleInput2 = (e) => {
        this.setState({ cusFanclubEndDay: e });
        var dat = moment().subtract(e, 'days').calendar();
        var time = moment(dat).add(1, 'day').toISOString();
        this.setState({ cusFanclubDate2: time });
        if (e !== undefined || e !== "") this.state.errors.cusFanclubEndDay = '';
    }
    handleInput3 = (e) => {
        this.setState({ cusFanclubCount: e });
        if (e !== undefined || e !== "") this.state.errors.cusFanclubCount = '';
    }
    handleInput4 = (e) => {
        this.setState({ cusFanclubStartCount: e });
        if (e !== undefined || e !== "") this.state.errors.cusFanclubStartCount = '';
    }
    handleInput5 = (e) => {
        this.setState({ cusFanclubEndCount: e });
        if (e !== undefined || e !== "") this.state.errors.cusFanclubEndCount = '';
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
    onChangeTitle = (e) => {
        this.setState({ title1: e.target.value })
        if (e.target.value !== '') this.state.errors.title1 = '';
    }
    onChangeDes = (e) => {
        this.setState({ description1: e.target.value });
        if (e.target.value !== '') this.state.errors.description1 = '';
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
    next() {
        const current = this.state.current + 1;
        var _this = this;
        if (this.state.current === 0) {
            let errors = {};
            if (this.state.cusFanclubCat === '') errors.catId = "*mandatory field";
            if (this.state.cusFanclubCat !== "All") {
                if (this.state.cusFanclubSubcatName === '') errors.cusFanclubSubcatId = "*mandatory field";
            }
            if (this.state.cusFanclubTargetName === '') errors.cusFanclubTargetName = "*mandatory field";
            this.setState({ errors });
            if (Object.keys(errors).length === 0) {
                if (this.state.cusFanclubTargetName === "Join Fan Club") {
                    let errors = {};
                    if (this.state.disabled === false) {
                        if (this.state.cusFanclubSubcatName === '') errors.cusFanclubSubcatId = "*mandatory field";
                    }
                    if (this.state.cusFanclubPerformed === '') errors.cusFanclubPerformed = "*mandatory field"
                    if (this.state.cusFanclubPerformed != "wasNotPerformed") {
                        if (this.state.cusFanclubFor === '') errors.cusFanclubFor = "*mandatory field";
                        if (this.state.cusFanclubFor === "for celebrity") {
                            if (this.state.cusFanclubCelebName === '') errors.cusFanclubCelebName = "*mandatory field";
                            if (this.state.cusFanclubWithin === '') errors.cusFanclubWithin = "*mandatory field"
                        }
                        if (this.state.cusFanclubFor === "for Period") {
                            if (this.state.cusFanclubWithin === '') errors.cusFanclubWithin = "*mandatory field"
                        }
                    }
                    if (this.state.cusFanclubWithin === "within") {
                        if (this.state.cusFanclubDays === undefined || this.state.cusFanclubDays === "") errors.cusFanclubDays = "*mandatory field";
                    }
                    if (this.state.cusFanclubWithin === "within range") {
                        if (this.state.cusFanclubStartDay === undefined || this.state.cusFanclubStartDay === "") errors.cusFanclubStartDay = "*mandatory field";
                        if (this.state.cusFanclubEndDay === undefined || this.state.cusFanclubEndDay === "") errors.cusFanclubEndDay = "*mandatory field";
                    }

                    this.setState({ errors });
                    if (Object.keys(errors).length === 0) {
                        if (this.state.catId === "All") {
                            this.state.catId = ''
                        }
                        var newdate, newdate1, newdate2;
                        if (this.state.cusFanclubDays) {
                            const number = this.state.cusFanclubDays;
                            var date = new Date();
                            date.setDate(date.getDate() - number);
                            var day = moment(date).format("YYYY-MM-DD")
                            var time = moment().startOf('day').format('HH:mm:ss');
                            var d = day + " " + time;
                            newdate = new Date(d).toISOString();
                        }
                        else if (this.state.cusFanclubStartDay) {
                            const number1 = this.state.cusFanclubStartDay;
                            var date1 = new Date();
                            date1.setDate(date1.getDate() - number1);
                            var day = moment(date1).format("YYYY-MM-DD")
                            var time = moment().endOf('day').format('HH:mm:ss');
                            var d = day + " " + time;
                            newdate1 = new Date(d).toISOString();
                            const number2 = this.state.cusFanclubEndDay;
                            var date2 = new Date();
                            date2.setDate(date2.getDate() - number2);
                            var day = moment(date2).format("YYYY-MM-DD")

                            var time = moment().startOf('day').format('HH:mm:ss');
                            var d = day + " " + time;
                            newdate2 = new Date(d).toISOString();
                        }
                        var data = {
                            "catId": this.state.catId,
                            "subCatId": this.state.cusFanclubSubcatId,
                            "celebrityName": this.state.cusFanclubCelebName,
                            "date": newdate ? newdate : "",
                            "performed": this.state.cusFanclubPerformed,
                            "startDate": newdate1 ? newdate1 : "",
                            "endDate": newdate2 ? newdate2 : ""
                        }
                        var fetchReq = axios.create({
                            headers: { 'Content-Type': 'application/json', 'x-access-token': sessionStorage.getItem('token') }
                        })
                        fetchReq.post('/joinedFanclub', data).then(function (response) {
                            _this.setState({ cusFanclubCelebUsers: response.data.data });
                        })

                        this.setState({ current });
                    }
                } else if (this.state.cusFanclubTargetName === "Fan Club Creation") {
                    let errors = {};
                    if (this.state.disabled === false) {
                        if (this.state.cusFanclubSubcatName === '') errors.cusFanclubSubcatId = "*mandatory field";
                    }
                    if (this.state.cusFanclubPerformed === '') errors.cusFanclubPerformed = "*mandatory field"
                    if (this.state.cusFanclubPerformed != '') {
                        if (this.state.cusFanclubFor === '') errors.cusFanclubFor = "*mandatory field";
                        if (this.state.cusFanclubFor === "for celebrity") {
                            if (this.state.cusFanclubCelebName === '') errors.cusFanclubCelebName = "*mandatory field";
                            if (this.state.cusFanclubWithin === '') errors.cusFanclubWithin = "*mandatory field"
                        }
                        if (this.state.cusFanclubFor === "for Period") {
                            if (this.state.cusFanclubWithin === '') errors.cusFanclubWithin = "*mandatory field"
                        }
                    }
                    if (this.state.cusFanclubWithin === "within") {
                        if (this.state.cusFanclubDays === undefined || this.state.cusFanclubDays === "") errors.cusFanclubDays = "*mandatory field";
                    }
                    if (this.state.cusFanclubWithin === "within range") {
                        if (this.state.cusFanclubStartDay === undefined || this.state.cusFanclubStartDay === "") errors.cusFanclubStartDay = "*mandatory field";
                        if (this.state.cusFanclubEndDay === undefined || this.state.cusFanclubEndDay === "") errors.cusFanclubEndDay = "*mandatory field";
                    }
                    this.setState({ errors });
                    if (Object.keys(errors).length === 0) {
                        if (this.state.catId === "All") {
                            this.state.catId = ''
                        }
                        var newdate, newdate1, newdate2;
                        if (this.state.cusFanclubDays) {
                            const number = this.state.cusFanclubDays;
                            var date = new Date();
                            date.setDate(date.getDate() - number);
                            var day = moment(date).format("YYYY-MM-DD")
                            var time = moment().startOf('day').format('HH:mm:ss');
                            var d = day + " " + time;
                            newdate = new Date(d).toISOString();
                        }
                        else if (this.state.cusFanclubStartDay) {
                            const number1 = this.state.cusFanclubStartDay;
                            var date1 = new Date();
                            date1.setDate(date1.getDate() - number1);
                            var day = moment(date1).format("YYYY-MM-DD")
                            var time = moment().endOf('day').format('HH:mm:ss');
                            var d = day + " " + time;
                            newdate1 = new Date(d).toISOString();
                            const number2 = this.state.cusFanclubEndDay;
                            var date2 = new Date();
                            date2.setDate(date2.getDate() - number2);
                            var day = moment(date2).format("YYYY-MM-DD")

                            var time = moment().startOf('day').format('HH:mm:ss');
                            var d = day + " " + time;
                            newdate2 = new Date(d).toISOString();
                        }
                        var data = {
                            "catId": this.state.catId,
                            "subCatId": this.state.cusFanclubSubcatId,
                            "celebrityName": this.state.cusFanclubCelebName,
                            "date": newdate ? newdate : "",
                            "performed": this.state.cusFanclubPerformed,
                            "startDate": newdate1 ? newdate1 : "",
                            "endDate": newdate2 ? newdate2 : ""
                        }

                        var fetchReq = axios.create({
                            headers: { 'Content-Type': 'application/json', 'x-access-token': sessionStorage.getItem('token') }
                        })
                        fetchReq.post('/createFanclub', data).then(function (response) {
                            _this.setState({ cusFanclubCelebUsers: response.data.data });
                        })

                        this.setState({ current });
                    }
                }
                else if (this.state.cusFanclubTargetName === "No.of Fan Clubs Joined") {
                    let errors = {};
                    if (this.state.disabled === false) {
                        if (this.state.cusFanclubSubcatName === '') errors.cusFanclubSubcatId = "*mandatory field";
                    }
                    if (this.state.cusFanclubWithin1 === '') errors.cusFanclubWithin1 = "*mandatory field"
                    if (this.state.cusFanclubWithin1 != '') {
                        if (this.state.cusFanclubWithin1 != 'within range') {
                            if (this.state.cusFanclubCount === undefined || this.state.cusFanclubCount === "") errors.cusFanclubCount = "*mandatory field"
                        }
                        if (this.state.cusFanclubWithin1 === 'within range') {
                            if (this.state.cusFanclubStartCount === undefined || this.state.cusFanclubStartCount === "") errors.cusFanclubStartCount = "*mandatory field"
                            if (this.state.cusFanclubEndCount === undefined || this.state.cusFanclubEndCount === "") errors.cusFanclubEndCount = "*mandatory field"
                        }
                    }
                    if (this.state.cusFanclubWithin === '') errors.cusFanclubWithin = "Range is required"
                    if (this.state.cusFanclubWithin != '') {
                        if (this.state.cusFanclubWithin === "within") {
                            if (this.state.cusFanclubDays === undefined || this.state.cusFanclubDays === "") errors.cusFanclubDays = "*mandatory field";
                        }
                        if (this.state.cusFanclubWithin === "within range") {
                            if (this.state.cusFanclubStartDay === undefined || this.state.cusFanclubStartDay === "") errors.cusFanclubStartDay = "*mandatory field";
                            if (this.state.cusFanclubEndDay === undefined || this.state.cusFanclubEndDay === "") errors.cusFanclubEndDay = "*mandatory field";
                        }
                    }
                    this.setState({ errors });
                    if (Object.keys(errors).length === 0) {
                        if (this.state.catId === "All") {
                            this.state.catId = ''
                        }
                        var newdate, newdate1, newdate2;
                        if (this.state.cusFanclubDays) {
                            const number = this.state.cusFanclubDays;
                            var date = new Date();
                            date.setDate(date.getDate() - number);
                            var day = moment(date).format("YYYY-MM-DD")
                            var time = moment().startOf('day').format('HH:mm:ss');
                            var d = day + " " + time;
                            newdate = new Date(d).toISOString();
                        }
                        else if (this.state.cusFanclubStartDay) {
                            const number1 = this.state.cusFanclubStartDay;
                            var date1 = new Date();
                            date1.setDate(date1.getDate() - number1);
                            var day = moment(date1).format("YYYY-MM-DD")
                            var time = moment().endOf('day').format('HH:mm:ss');
                            var d = day + " " + time;
                            newdate1 = new Date(d).toISOString();
                            const number2 = this.state.cusFanclubEndDay;
                            var date2 = new Date();
                            date2.setDate(date2.getDate() - number2);
                            var day = moment(date2).format("YYYY-MM-DD")

                            var time = moment().startOf('day').format('HH:mm:ss');
                            var d = day + " " + time;
                            newdate2 = new Date(d).toISOString();
                        }
                        var data = {
                            "catId": this.state.catId,
                            "subCatId": this.state.cusFanclubSubcatId,
                            "date": newdate ? newdate : "",
                            "range": this.state.cusFanclubWithin1,
                            "startDate": newdate1 ? newdate1 : "",
                            "endDate": newdate2 ? newdate2 : "",
                            "count": this.state.cusFanclubCount,
                            "startCount": this.state.cusFanclubStartCount,
                            "endCount": this.state.cusFanclubEndCount
                        }
                        var fetchReq = axios.create({
                            headers: { 'Content-Type': 'application/json', 'x-access-token': sessionStorage.getItem('token') }
                        })
                        fetchReq.post('/fanclubCount', data).then(function (response) {
                            _this.setState({ cusFanclubCelebUsers: response.data.data });
                        })
                        this.setState({ current });
                    }
                }
                else if (this.state.cusFanclubTargetName === "No. of Fan Clubs Created") {
                    let errors = {};
                    if (this.state.disabled === false) {
                        if (this.state.cusFanclubSubcatName === '') errors.cusFanclubSubcatId = "*mandatory field";
                    }
                    if (this.state.cusFanclubWithin1 === '') errors.cusFanclubWithin1 = "*mandatory field"
                    if (this.state.cusFanclubWithin1 != '') {
                        if (this.state.cusFanclubWithin1 != 'within range') {
                            if (this.state.cusFanclubCount === undefined || this.state.cusFanclubCount === "") errors.cusFanclubCount = "*mandatory field"
                        }
                        if (this.state.cusFanclubWithin1 === 'within range') {
                            if (this.state.cusFanclubStartCount === undefined || this.state.cusFanclubStartCount === "") errors.cusFanclubStartCount = "*mandatory field"
                            if (this.state.cusFanclubEndCount === undefined || this.state.cusFanclubEndCount === "") errors.cusFanclubEndCount = "*mandatory field"
                        }
                    }
                    if (this.state.cusFanclubWithin === '') errors.cusFanclubWithin = "*mandatory field"
                    if (this.state.cusFanclubWithin != '') {
                        if (this.state.cusFanclubWithin === "within") {
                            if (this.state.cusFanclubDays === undefined || this.state.cusFanclubDays === "") errors.cusFanclubDays = "*mandatory field";
                        }
                        if (this.state.cusFanclubWithin === "within range") {
                            if (this.state.cusFanclubStartDay === undefined || this.state.cusFanclubStartDay === "") errors.cusFanclubStartDay = "*mandatory field";
                            if (this.state.cusFanclubEndDay === undefined || this.state.cusFanclubEndDay === "") errors.cusFanclubEndDay = "*mandatory field";
                        }
                    }
                    this.setState({ errors });
                    if (Object.keys(errors).length === 0) {
                        if (this.state.catId === "All") {
                            this.state.catId = ''
                        }
                        var newdate, newdate1, newdate2;
                        if (this.state.cusFanclubDays) {
                            const number = this.state.cusFanclubDays;
                            var date = new Date();
                            date.setDate(date.getDate() - number);
                            var day = moment(date).format("YYYY-MM-DD")
                            var time = moment().startOf('day').format('HH:mm:ss');
                            var d = day + " " + time;
                            newdate = new Date(d).toISOString();
                        }
                        else if (this.state.cusFanclubStartDay) {
                            const number1 = this.state.cusFanclubStartDay;
                            var date1 = new Date();
                            date1.setDate(date1.getDate() - number1);
                            var day = moment(date1).format("YYYY-MM-DD")
                            var time = moment().endOf('day').format('HH:mm:ss');
                            var d = day + " " + time;
                            newdate1 = new Date(d).toISOString();
                            const number2 = this.state.cusFanclubEndDay;
                            var date2 = new Date();
                            date2.setDate(date2.getDate() - number2);
                            var day = moment(date2).format("YYYY-MM-DD")
                            var time = moment().startOf('day').format('HH:mm:ss');
                            var d = day + " " + time;
                            newdate2 = new Date(d).toISOString();
                        }
                        var data = {
                            "catId": this.state.catId,
                            "subCatId": this.state.cusFanclubSubcatId,
                            "date": newdate ? newdate : "",
                            "range": this.state.cusFanclubWithin1,
                            "startDate": newdate1 ? newdate1 : "",
                            "endDate": newdate2 ? newdate2 : "",
                            "count": this.state.cusFanclubCount,
                            "startCount": this.state.cusFanclubStartCount,
                            "endCount": this.state.cusFanclubEndCount
                        }
                        var fetchReq = axios.create({
                            headers: { 'Content-Type': 'application/json', 'x-access-token': sessionStorage.getItem('token') }
                        })
                        fetchReq.post('/createFanclubCount', data).then(function (response) {
                            _this.setState({ cusFanclubCelebUsers: response.data.data });
                        })
                        this.setState({ current });
                    }
                } else if (this.state.cusFanclubTargetName === "No. of Fan Club Members - To Admin") {
                    let errors = {};
                    if (this.state.disabled === false) {
                        if (this.state.cusFanclubSubcatName === '') errors.cusFanclubSubcatId = "*mandatory field";
                    }
                    if (this.state.cusFanclubWithin1 === '') errors.cusFanclubWithin1 = "*mandatory field"
                    if (this.state.cusFanclubWithin1 != '') {
                        if (this.state.cusFanclubWithin1 != 'within range') {
                            if (this.state.cusFanclubCount === undefined || this.state.cusFanclubCount === "") errors.cusFanclubCount = "*mandatory field"
                        }
                        if (this.state.cusFanclubWithin1 === 'within range') {
                            if (this.state.cusFanclubStartCount === undefined || this.state.cusFanclubStartCount === "") errors.cusFanclubStartCount = "*mandatory field"
                            if (this.state.cusFanclubEndCount === undefined || this.state.cusFanclubEndCount === "") errors.cusFanclubEndCount = "*mandatory field"
                        }
                    }
                    if (this.state.cusFanclubWithin === '') errors.cusFanclubWithin = "*mandatory field"
                    if (this.state.cusFanclubWithin != '') {
                        if (this.state.cusFanclubWithin === "within") {
                            if (this.state.cusFanclubDays === undefined || this.state.cusFanclubDays === "") errors.cusFanclubDays = "*mandatory field";
                        }
                        if (this.state.cusFanclubWithin === "within range") {
                            if (this.state.cusFanclubStartDay === undefined || this.state.cusFanclubStartDay === "") errors.cusFanclubStartDay = "*mandatory field";
                            if (this.state.cusFanclubEndDay === undefined || this.state.cusFanclubEndDay === "") errors.cusFanclubEndDay = "*mandatory field";
                        }
                    }
                    this.setState({ errors });
                    if (Object.keys(errors).length === 0) {
                        if (this.state.catId === "All") {
                            this.state.catId = ''
                        }
                        var newdate, newdate1, newdate2;
                        if (this.state.cusFanclubDays) {
                            const number = this.state.cusFanclubDays;
                            var date = new Date();
                            date.setDate(date.getDate() - number);
                            var day = moment(date).format("YYYY-MM-DD")
                            var time = moment().startOf('day').format('HH:mm:ss');
                            var d = day + " " + time;
                            newdate = new Date(d).toISOString();
                        }
                        else if (this.state.cusFanclubStartDay) {
                            const number1 = this.state.cusFanclubStartDay;
                            var date1 = new Date();
                            date1.setDate(date1.getDate() - number1);
                            var day = moment(date1).format("YYYY-MM-DD")
                            var time = moment().endOf('day').format('HH:mm:ss');
                            var d = day + " " + time;
                            newdate1 = new Date(d).toISOString();
                            const number2 = this.state.cusFanclubEndDay;
                            var date2 = new Date();
                            date2.setDate(date2.getDate() - number2);
                            var day = moment(date2).format("YYYY-MM-DD")

                            var time = moment().startOf('day').format('HH:mm:ss');
                            var d = day + " " + time;
                            newdate2 = new Date(d).toISOString();
                        }
                        var data = {
                            "catId": this.state.catId,
                            "subCatId": this.state.cusFanclubSubcatId,
                            "date": newdate ? newdate : "",
                            "range": this.state.cusFanclubWithin1,
                            "startDate": newdate1 ? newdate1 : "",
                            "endDate": newdate2 ? newdate2 : "",
                            "count": this.state.cusFanclubCount,
                            "startCount": this.state.cusFanclubStartCount,
                            "endCount": this.state.cusFanclubEndCount
                        }
                        var fetchReq = axios.create({
                            headers: { 'Content-Type': 'application/json', 'x-access-token': sessionStorage.getItem('token') }
                        })
                        fetchReq.post('/memberCount', data).then(function (response) {
                            _this.setState({ cusFanclubCelebUsers: response.data.data });
                        })
                        this.setState({ current });
                    }
                }
                else if (this.state.cusFanclubTargetName === "Fan Club Feeds") {
                    let errors = {};
                    if (this.state.disabled === false) {
                        if (this.state.cusFanclubSubcatName === '') errors.cusFanclubSubcatId = "*mandatory field";
                    }
                    if (this.state.cusFanclubPerformed === '') errors.cusFanclubPerformed = "*mandatory field"
                    if (this.state.cusFanclubPerformed != '') {
                        if (this.state.cusFanclubFor === '') errors.cusFanclubFor = "*mandatory field"
                        if (this.state.cusFanclubFor === "for Period") {
                            if (this.state.cusFanclubWithin === '') errors.cusFanclubWithin = "*mandatory field"
                        }
                    }
                    if (this.state.cusFanclubWithin === "within") {
                        if (this.state.cusFanclubDays === undefined || this.state.cusFanclubDays === "") errors.cusFanclubDays = "*mandatory field";
                    }
                    if (this.state.cusFanclubWithin === "within range") {
                        if (this.state.cusFanclubStartDay === undefined || this.state.cusFanclubStartDay === "") errors.cusFanclubStartDay = "*mandatory field";
                        if (this.state.cusFanclubEndDay === undefined || this.state.cusFanclubEndDay === "") errors.cusFanclubEndDay = "*mandatory field";
                    }
                    this.setState({ errors });
                    if (Object.keys(errors).length === 0) {
                        if (this.state.catId === "All") {
                            this.state.catId = ''
                        }
                        var newdate, newdate1, newdate2;
                        if (this.state.cusFanclubDays) {
                            const number = this.state.cusFanclubDays;
                            var date = new Date();
                            date.setDate(date.getDate() - number);
                            var day = moment(date).format("YYYY-MM-DD")
                            var time = moment().startOf('day').format('HH:mm:ss');
                            var d = day + " " + time;
                            newdate = new Date(d).toISOString();
                        }
                        else if (this.state.cusFanclubStartDay) {
                            const number1 = this.state.cusFanclubStartDay;
                            var date1 = new Date();
                            date1.setDate(date1.getDate() - number1);
                            var day = moment(date1).format("YYYY-MM-DD")
                            var time = moment().endOf('day').format('HH:mm:ss');
                            var d = day + " " + time;
                            newdate1 = new Date(d).toISOString();
                            const number2 = this.state.cusFanclubEndDay;
                            var date2 = new Date();
                            date2.setDate(date2.getDate() - number2);
                            var day = moment(date2).format("YYYY-MM-DD")

                            var time = moment().startOf('day').format('HH:mm:ss');
                            var d = day + " " + time;
                            newdate2 = new Date(d).toISOString();
                        }
                        var data = {
                            "catId": this.state.catId,
                            "subCatId": this.state.cusFanclubSubcatId,
                            "date": newdate ? newdate : "",
                            "startDate": newdate1 ? newdate1 : "",
                            "endDate": newdate2 ? newdate2 : "",

                        }
                        var fetchReq = axios.create({
                            headers: { 'Content-Type': 'application/json', 'x-access-token': sessionStorage.getItem('token') }
                        })
                        fetchReq.post('/fanclubFeed', data).then(function (response) {
                            _this.setState({ cusFanclubCelebUsers: response.data.data });
                        })
                        this.setState({ current });
                    }
                }
                else if (this.state.cusFanclubTargetName === "Event Creation") {
                    let errors = {};
                    if (this.state.disabled === false) {
                        if (this.state.cusFanclubSubcatName === '') errors.cusFanclubSubcatId = "*mandatory field";
                    }
                    if (this.state.cusFanclubPerformed === '') errors.cusFanclubPerformed = "*mandatory field"
                    if (this.state.cusFanclubPerformed != '') {
                        if (this.state.cusFanclubFor === '') errors.cusFanclubFor = "*mandatory field"
                        if (this.state.cusFanclubFor === "for Period") {
                            if (this.state.cusFanclubWithin === '') errors.cusFanclubWithin = "*mandatory field"
                        }
                    }
                    if (this.state.cusFanclubWithin === "within") {
                        if (this.state.cusFanclubDays === undefined || this.state.cusFanclubDays === "") errors.cusFanclubDays = "*mandatory field";
                    }
                    if (this.state.cusFanclubWithin === "within range") {
                        if (this.state.cusFanclubStartDay === undefined || this.state.cusFanclubStartDay === "") errors.cusFanclubStartDay = "*mandatory field";
                        if (this.state.cusFanclubEndDay === undefined || this.state.cusFanclubEndDay === "") errors.cusFanclubEndDay = "*mandatory field";
                    }
                    this.setState({ errors });
                    if (Object.keys(errors).length === 0) {
                        if (this.state.catId === "All") {
                            this.state.catId = ''
                        }
                        var newdate, newdate1, newdate2;
                        if (this.state.cusFanclubDays) {
                            const number = this.state.cusFanclubDays;
                            var date = new Date();
                            date.setDate(date.getDate() - number);
                            var day = moment(date).format("YYYY-MM-DD")
                            var time = moment().startOf('day').format('HH:mm:ss');
                            var d = day + " " + time;
                            newdate = new Date(d).toISOString();
                        }
                        else if (this.state.cusFanclubStartDay) {
                            const number1 = this.state.cusFanclubStartDay;
                            var date1 = new Date();
                            date1.setDate(date1.getDate() - number1);
                            var day = moment(date1).format("YYYY-MM-DD")
                            var time = moment().endOf('day').format('HH:mm:ss');
                            var d = day + " " + time;
                            newdate1 = new Date(d).toISOString();
                            const number2 = this.state.cusFanclubEndDay;
                            var date2 = new Date();
                            date2.setDate(date2.getDate() - number2);
                            var day = moment(date2).format("YYYY-MM-DD")

                            var time = moment().startOf('day').format('HH:mm:ss');
                            var d = day + " " + time;
                            newdate2 = new Date(d).toISOString();
                        }
                        var data = {
                            "catId": this.state.catId,
                            "subCatId": this.state.cusFanclubSubcatId,
                            "date": newdate ? newdate : "",
                            "startDate": newdate1 ? newdate1 : "",
                            "endDate": newdate2 ? newdate2 : "",

                        }
                        var fetchReq = axios.create({
                            headers: { 'Content-Type': 'application/json', 'x-access-token': sessionStorage.getItem('token') }
                        })
                        fetchReq.post('/createEvent', data).then(function (response) {
                            _this.setState({ cusFanclubCelebUsers: response.data.data });
                        })
                        this.setState({ current });
                    }
                }
                else if (this.state.cusFanclubTargetName === "No. of Events Created") {
                    let errors = {};
                    if (this.state.disabled === false) {
                        if (this.state.cusFanclubSubcatName === '') errors.cusFanclubSubcatId = "*mandatory field";
                    }
                    if (this.state.cusFanclubWithin1 === '') errors.cusFanclubWithin1 = "*mandatory field"
                    if (this.state.cusFanclubWithin1 != '') {
                        if (this.state.cusFanclubWithin1 != 'within range') {
                            if (this.state.cusFanclubCount === undefined || this.state.cusFanclubCount === "") errors.cusFanclubCount = "*mandatory field"
                        }
                        if (this.state.cusFanclubWithin1 === 'within range') {
                            if (this.state.cusFanclubStartCount === undefined || this.state.cusFanclubStartCount === "") errors.cusFanclubStartCount = "*mandatory field"
                            if (this.state.cusFanclubEndCount === undefined || this.state.cusFanclubEndCount === "") errors.cusFanclubEndCount = "*mandatory field"
                        }
                    }
                    if (this.state.cusFanclubWithin === '') errors.cusFanclubWithin = "*mandatory field"
                    if (this.state.cusFanclubWithin != '') {
                        if (this.state.cusFanclubWithin === "within") {
                            if (this.state.cusFanclubDays === undefined || this.state.cusFanclubDays === "") errors.cusFanclubDays = "*mandatory field";
                        }
                        if (this.state.cusFanclubWithin === "within range") {
                            if (this.state.cusFanclubStartDay === undefined || this.state.cusFanclubStartDay === "") errors.cusFanclubStartDay = "*mandatory field";
                            if (this.state.cusFanclubEndDay === undefined || this.state.cusFanclubEndDay === "") errors.cusFanclubEndDay = "*mandatory field";
                        }
                    }
                    this.setState({ errors });
                    if (Object.keys(errors).length === 0) {
                        if (this.state.catId === "All") {
                            this.state.catId = ''
                        }
                        var newdate, newdate1, newdate2;
                        if (this.state.cusFanclubDays) {
                            const number = this.state.cusFanclubDays;
                            var date = new Date();
                            date.setDate(date.getDate() - number);
                            var day = moment(date).format("YYYY-MM-DD")
                            var time = moment().startOf('day').format('HH:mm:ss');
                            var d = day + " " + time;
                            newdate = new Date(d).toISOString();
                        }
                        else if (this.state.cusFanclubStartDay) {
                            const number1 = this.state.cusFanclubStartDay;
                            var date1 = new Date();
                            date1.setDate(date1.getDate() - number1);
                            var day = moment(date1).format("YYYY-MM-DD")
                            var time = moment().endOf('day').format('HH:mm:ss');
                            var d = day + " " + time;
                            newdate1 = new Date(d).toISOString();
                            const number2 = this.state.cusFanclubEndDay;
                            var date2 = new Date();
                            date2.setDate(date2.getDate() - number2);
                            var day = moment(date2).format("YYYY-MM-DD")

                            var time = moment().startOf('day').format('HH:mm:ss');
                            var d = day + " " + time;
                            newdate2 = new Date(d).toISOString();
                        }
                        var data = {
                            "catId": this.state.catId,
                            "subCatId": this.state.cusFanclubSubcatId,
                            "date": newdate ? newdate : "",
                            "startDate": newdate1 ? newdate1 : "",
                            "endDate": newdate2 ? newdate2 : "",
                            "count": this.state.cusFanclubCount,
                            "startCount": this.state.cusFanclubStartCount,
                            "endCount": this.state.cusFanclubEndCount,
                            "range": this.state.cusFanclubWithin1,
                        }

                        var fetchReq = axios.create({
                            headers: { 'Content-Type': 'application/json', 'x-access-token': sessionStorage.getItem('token') }
                        })
                        fetchReq.post('/createEventCount', data).then(function (response) {
                            _this.setState({ cusFanclubCelebUsers: response.data.data });
                        })
                        this.setState({ current });
                    }
                }
            }
        }
        else if (this.state.current === 1) {
            let errors = {};
            if (this.state.title1.trim() === '') errors.title1 = "*mandatory field";
            if (this.state.description1.trim() === '') errors.description1 = "*mandatory field";
            if (this.state.imageUrl1 === '') errors.imageUrl1 = "*mandatory field";
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
                        const current = this.state.current + 1;
                        this.setState({ current });
                        this.setState({ scheduleDate: de })
                    }
                } else if (this.state.scheduleValue === "Immediately") {
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
    onScheduleChange = (e) => {
        this.setState({ scheduleValue: e.target.value });
    }
    done() {
        var myObj = this.state.editfanclubdata; // Empty Object
        if (isEmpty(myObj)) {
            // Object is empty (Would return true in this example)
            if (this.state.current === 3) {
                let errors = {};
                if (this.state.location === '') errors.location = "*mandatory field";
                if (this.state.location === "Local" && this.state.locationArray.length == 0) errors.city = "*mandatory field"
                this.setState({ errors });
                if (Object.keys(errors).length === 0) {


                    var _self = this;
                    var locations = []
                    for (let i = 0; i < this.state.locationArray.length; i++) {
                        locations[i] = this.state.locationArray[i].locId
                    }
                    const url = "/scheduledNotification";
                    if (this.state.cusFanclubTargetName === "Join Fan Club" || this.state.cusFanclubTargetName === "Fan Club Creation" || this.state.cusFanclubTargetName === "Event Creation" || this.state.cusFanclubTargetName === "Fan Club Feeds") {
                        var data = {
                            "type": this.state.nType,
                            "category": this.state.catagory,
                            "targetUserCategory": this.state.cusFanclubCat,
                            "targetUserSubcat": this.state.cusFanclubSubcatName,
                            "targetActivity": this.state.cusFanclubTargetName,
                            "performed": this.state.cusFanclubPerformed,
                            "forCelebrity": this.state.cusFanclubFor,
                            "celebrityName": this.state.cusFanclubCelebName,
                            "within": this.state.cusFanclubWithin,
                            "days": this.state.cusFanclubDays,
                            "startDays": this.state.cusFanclubStartDay,
                            "endDays": this.state.cusFanclubEndDay,
                            "users": this.state.cusFanclubCelebUsers,
                            "title": this.state.title1.trim(),
                            "description": this.state.description1.trim(),
                            "imageUrl": this.state.imageUrl1,
                            "location": this.state.location === "Global" ? [this.state.location] : locations,
                            "locationTags": this.state.tags,
                            "status": true,
                            "scheduledDate": this.state.scheduleDate,
                            "schedule": this.state.scheduleCategory
                        }
                        if (this.state.catId != "") {
                            data.targetUserCategoryId = this.state.catId;
                        } if (this.state.cusFanclubSubcatId != "") {
                            data.targetUserSubcatId = this.state.cusFanclubSubcatId;
                        }

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
                                    // _self.setState({ParticipatedTwoDates:response.data})
                                    message.success('Notification Created successfully!');
                                    browserHistory.push('/push-notifications/scheduled-notifications');
                                } else {
                                    message.error(`unable to create Notification.`);
                                }
                            })
                    } else if (this.state.cusFanclubTargetName === "No.of Fan Clubs Joined" || this.state.cusFanclubTargetName === "No. of Fan Clubs Created" || this.state.cusFanclubTargetName === "No. of Fan Club Members - To Admin" || this.state.cusFanclubTargetName === "No. of Events Created") {
                        var data1 = {
                            "type": this.state.nType,
                            "category": this.state.catagory,
                            "targetUserCategory": this.state.cusFanclubCat,
                            "targetUserSubcat": this.state.cusFanclubSubcatName,
                            "targetActivity": this.state.cusFanclubTargetName,
                            "range": this.state.cusFanclubWithin1,
                            "likesCount": this.state.cusFanclubCount,
                            "startLikesCount": this.state.cusFanclubStartCount,
                            "endLikesCount": this.state.cusFanclubEndCount,
                            "within": this.state.cusFanclubWithin,
                            "days": this.state.cusFanclubDays,
                            "startDays": this.state.cusFanclubStartDay,
                            "endDays": this.state.cusFanclubEndDay,
                            "users": this.state.cusFanclubCelebUsers,
                            "title": this.state.title1.trim(),
                            "description": this.state.description1.trim(),
                            "status": true,
                            "imageUrl": this.state.imageUrl1,
                            "location": this.state.location === "Global" ? [this.state.location] : locations,
                            "locationTags": this.state.tags,
                            "scheduledDate": this.state.scheduleDate,
                            "schedule": this.state.scheduleCategory
                        }
                        if (this.state.catId != "") {
                            data1.targetUserCategoryId = this.state.catId;
                        } if (this.state.cusFanclubSubcatId != "") {
                            data1.targetUserSubcatId = this.state.cusFanclubSubcatId;
                        }

                        var request1 = new Request(url, {
                            method: 'POST',
                            body: JSON.stringify(data1),
                            headers: {
                                "Content-Type": "application/json",
                                'x-access-token': sessionStorage.getItem('token')
                            }
                        });
                        fetch(request1)
                            .then(response => response.json())
                            .then(function (response) {
                                if (response.status === 200) {
                                    // _self.setState({ParticipatedTwoDates:response.data})
                                    message.success('Notification Created successfully!');
                                    browserHistory.push('/push-notifications/scheduled-notifications');
                                } else {
                                    message.error(`unable to create Notification.`);
                                }
                            })
                    }
                }
            }
        } else {
            // Object is NOT empty
            if (this.state.current === 3) {
                let errors = {};
                if (this.state.location === '') errors.location = "*mandatory field";
                if (this.state.location === "Local" && this.state.locationArray.length == 0) errors.city = "*mandatory field"
                this.setState({ errors });
                if (Object.keys(errors).length === 0) {


                    var _self = this;
                    var locations = []
                    for (let i = 0; i < this.state.locationArray.length; i++) {
                        locations[i] = this.state.locationArray[i].locId
                    }
                    var id = this.state.editfanclubdata._id
                    const url = "/scheduledNotification/" + id;
                    if (this.state.cusFanclubTargetName === "Join Fan Club" || this.state.cusFanclubTargetName === "Fan Club Creation" || this.state.cusFanclubTargetName === "Event Creation" || this.state.cusFanclubTargetName === "Fan Club Feeds") {
                        var data = {
                            "type": this.state.nType,
                            "category": this.state.catagory,
                            "targetUserCategory": this.state.cusFanclubCat,
                            "targetUserSubcat": this.state.cusFanclubSubcatName,
                            "targetActivity": this.state.cusFanclubTargetName,
                            "performed": this.state.cusFanclubPerformed,
                            "forCelebrity": this.state.cusFanclubFor,
                            "celebrityName": this.state.cusFanclubCelebName,
                            "within": this.state.cusFanclubWithin,
                            "days": this.state.cusFanclubDays,
                            "startDays": this.state.cusFanclubStartDay,
                            "endDays": this.state.cusFanclubEndDay,
                            "users": this.state.cusFanclubCelebUsers,
                            "title": this.state.title1.trim(),
                            "description": this.state.description1.trim(),
                            "status": true,
                            "imageUrl": this.state.imageUrl1,
                            "location": this.state.location === "Global" ? [this.state.location] : locations,
                            "locationTags": this.state.tags,
                            "scheduledDate": this.state.scheduleDate,
                            "schedule": this.state.scheduleCategory

                        }
                        if (this.state.catId != "") {
                            data.targetUserCategoryId = this.state.catId;
                        } if (this.state.cusFanclubSubcatId != "") {
                            data.targetUserSubcatId = this.state.cusFanclubSubcatId;
                        }

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
                                    // _self.setState({ParticipatedTwoDates:response.data})
                                    message.success('Notification Edited successfully!');
                                    browserHistory.push('/push-notifications/scheduled-notifications');
                                } else {
                                    message.error(`unable to edit Notification.`);
                                }
                            })
                    } else if (this.state.cusFanclubTargetName === "No.of Fan Clubs Joined" || this.state.cusFanclubTargetName === "No. of Fan Clubs Created" || this.state.cusFanclubTargetName === "No. of Fan Club Members - To Admin" || this.state.cusFanclubTargetName === "No. of Events Created") {
                        var data1 = {
                            "type": this.state.nType,
                            "category": this.state.catagory,
                            "targetUserCategory": this.state.cusFanclubCat,
                            "targetUserSubcat": this.state.cusFanclubSubcatName,
                            "targetActivity": this.state.cusFanclubTargetName,
                            "range": this.state.cusFanclubWithin1,
                            "likesCount": this.state.cusFanclubCount,
                            "startLikesCount": this.state.cusFanclubStartCount,
                            "endLikesCount": this.state.cusFanclubEndCount,
                            "within": this.state.cusFanclubWithin,
                            "days": this.state.cusFanclubDays,
                            "startDays": this.state.cusFanclubStartDay,
                            "endDays": this.state.cusFanclubEndDay,
                            "users": this.state.cusFanclubCelebUsers,
                            "title": this.state.title1.trim(),
                            "description": this.state.description1.trim(),
                            "status": true,
                            "imageUrl": this.state.imageUrl1,
                            "location": this.state.location === "Global" ? [this.state.location] : locations,
                            "locationTags": this.state.tags,
                            "scheduledDate": this.state.scheduleDate,
                            "schedule": this.state.scheduleCategory

                        }
                        if (this.state.catId != "") {
                            data1.targetUserCategoryId = this.state.catId;
                        } if (this.state.cusFanclubSubcatId != "") {
                            data1.targetUserSubcatId = this.state.cusFanclubSubcatId;
                        }

                        var request1 = new Request(url, {
                            method: 'PUT',
                            body: JSON.stringify(data1),
                            headers: {
                                "Content-Type": "application/json",
                                'x-access-token': sessionStorage.getItem('token')
                            }
                        });
                        fetch(request1)
                            .then(response => response.json())
                            .then(function (response) {
                                if (response.status === 200) {
                                    // _self.setState({ParticipatedTwoDates:response.data})
                                    message.success('Notification edited successfully!');
                                    browserHistory.push('/push-notifications/scheduled-notifications');
                                } else {
                                    message.error(`unable to edit Notification.`);
                                }
                            })
                    }
                }
            }
        }
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    bindCusFanclubWithinView = () => {
        if (this.state.cusFanclubWithin === 'within') {
            return (
                <div>
                    <span className="">  ---last---  </span>
                    <FormItem className={classnames('cusFanclubDays', { error: !!this.state.errors.cusFanclubDays })}>
                        <Input placeholder="15" style={{ width: 50 }} name="cusFanclubDays" onChange={this.handleInput} />
                        <span>{this.state.errors.cusFanclubDays}</span>
                    </FormItem>
                    <span className="">  ---days </span>
                </div>
            )
        } else if (this.state.cusFanclubWithin === 'within range') {
            return (
                <div>
                    <span className="">  ---last---  </span>
                    <FormItem className={classnames('cusFanclubStartDay', { error: !!this.state.errors.cusFanclubStartDay })}>
                        <Input placeholder="15" style={{ width: 50 }} name="cusFanclubStartDay" onChange={this.handleInput1} />
                        <span>{this.state.errors.cusFanclubStartDay}</span>
                    </FormItem>
                    <span className="">  ---to---  </span>
                    <FormItem className={classnames('cusFanclubEndDay', { error: !!this.state.errors.cusFanclubEndDay })}>
                        <Input placeholder="15" style={{ width: 50 }} name="cusFanclubEndDay" onChange={this.handleInput2} />
                        <span>{this.state.errors.cusFanclubEndDay}</span>
                    </FormItem>
                    <span className="">  ---days </span>
                </div>
            )
        }
    }
    bindCusFanclubWithinView1 = () => {
        if (this.state.cusFanclubWithin1 === "Is less than" || this.state.cusFanclubWithin1 === "Is greater than" || this.state.cusFanclubWithin1 === "Is equal to") {
            return (
                <div>
                    <span className="">  ---last---  </span>
                    <FormItem className={classnames('cusFanclubCount', { error: !!this.state.errors.cusFanclubCount })}>
                        <Input placeholder="15" style={{ width: 50 }} name="cusFanclubCount" onChange={this.handleInput3} />
                        <span>{this.state.errors.cusFanclubCount}</span>
                    </FormItem>
                    <span className="">  ---days </span>
                </div>
            )
        } else if (this.state.cusFanclubWithin1 === 'within range') {
            return (
                <div>
                    <span className="">  ---last---  </span>
                    <FormItem className={classnames('cusFanclubStartCount', { error: !!this.state.errors.cusFanclubStartCount })}>
                        <Input placeholder="15" style={{ width: 50 }} name="cusFanclubStartCount" onChange={this.handleInput3} />
                        <span>{this.state.errors.cusFanclubStartCount}</span>
                    </FormItem>
                    <span className="">  ---to---  </span>
                    <FormItem className={classnames('cusFanclubEndCount', { error: !!this.state.errors.cusFanclubEndCount })}>
                        <Input placeholder="15" style={{ width: 50 }} name="cusFanclubEndCount" onChange={this.handleInput3} />
                        <span>{this.state.errors.cusFanclubEndCount}</span>
                    </FormItem>
                    <span className="">  ---days </span>
                </div>
            )
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

    render() {
        const { tags } = this.state;
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
        const { imageUrl1, current } = this.state;
        var myObj = this.state.categories; // Empty Object
        if (isEmpty(myObj)) {
            // Object is empty (Would return true in this example)
        } else {
            // Object is NOT empty
            var editcat = this.state.categories.map((cat) => <option value={cat._id}>{cat.name}</option>);
        }
        var myObj = this.props.targetActivities;
        if (isEmpty(myObj)) {
            // Object is empty (Would return true in this example)
            var actL = this.state.activitiesList.map((subcat) => <Option value={subcat._id}>{subcat.name}</Option>);
        } else {
            // Object is NOT empty
        }

        var subCategories = this.state.cusFanclubSubCat.map((subcat) => <Option value={subcat._id}>{subcat.name}</Option>);
        var celebNames = this.state.cusFanclubCelebNames.map((index) => <Option value={index}>{index}</Option>)


        const steps1 = [{
            title: 'Select Target Users',
            content:
            <div id="CFanclubs" className="block_container">
                <Row className="MarginTop20">
                    <Form>
                        <Row>
                            <Col span={24} className="">

                                <p className='greyColor'></p>
                                <Col span={5}>
                                    <FormItem label="Select FanClubs Category" className={classnames('catId', { error: !!this.state.errors.catId })} label="Select Category">

                                        <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                            showSearch
                                            style={{ width: '100%' }}
                                            placeholder="Select FanClubs Category"
                                            optionFilterProp="children"
                                            value={this.state.cusFanclubCat || undefined}
                                            name="catId"
                                            onChange={this.onCusFanclubCatChange}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                            {this.props.categories != '' ? this.props.categories : editcat}
                                            <Option value="All">All</Option>
                                        </Select>
                                        <span>{this.state.errors.catId}</span>
                                    </FormItem>
                                </Col>

                                <Col span={5} className="marginLeft20">
                                    <FormItem label="Select FanClubs Sub Category" className="colLg8" className={classnames('cusFanclubSubcatId', { error: !!this.state.errors.cusFanclubSubcatId })} label="Select Sub Category">
                                        <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                            showSearch
                                            style={{ width: '100%' }}
                                            placeholder="Select FanClubs Sub Category"
                                            optionFilterProp="children"
                                            value={this.state.cusFanclubSubcatName || undefined}
                                            onChange={this.onCusFanclubSubcatChange}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            disabled={this.state.disabled}>
                                            {subCategories}
                                            <Option value="All">All</Option>
                                        </Select>
                                        <span>{this.state.errors.cusFanclubSubcatId}</span>
                                    </FormItem>
                                </Col>

                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} className="">
                                <Col span={5} className="">
                                    <FormItem label="Select Target Activity" className={classnames('cusFanclubTargetName', { error: !!this.state.errors.cusFanclubTargetName })} label="Select Target Activity">
                                        <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                            showSearch
                                            placeholder="Select Target Activity"
                                            optionFilterProp="children"
                                            onChange={this.onCusTargetChange}
                                            value={this.state.cusFanclubTargetName || undefined}
                                            name="cusFanclubTargetName"
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                            {this.props.targetActivities != '' ? this.props.targetActivities : actL

                                            }
                                        </Select>
                                        <span>{this.state.errors.cusFanclubTargetName}</span>
                                    </FormItem>
                                </Col>
                            </Col>
                            <Col span={24} className="">
                                <FormItem>
                                    <div className="bloc1">

                                        {this.state.cusFanclubTargetName === "No.of Fan Clubs Joined" || this.state.cusFanclubTargetName === "No. of Fan Clubs Created" || this.state.cusFanclubTargetName === "No. of Fan Club Members - To Admin" || this.state.cusFanclubTargetName === "No. of Events Created" || this.state.cusFanclubTargetName === "Send Invite Count" || this.state.cusFanclubTargetName === "Fanclub Feed Count" ?
                                            <div>
                                                <Col span={24} className="">
                                                    <Col span={5} className="">
                                                        <FormItem label="Select Comparison Value" className={classnames('cusFanclubWithin1', { error: !!this.state.errors.cusFanclubWithin1 })}>
                                                            <Select className=""
                                                                showSearch
                                                                placeholder="Select Period"
                                                                optionFilterProp="children"
                                                                name="cusFanclubWithin1"
                                                                onChange={this.onCusFanclubWithinChange1}
                                                                value={this.state.cusFanclubWithin1 || undefined}
                                                                >
                                                                <Option value="Is less than">Is less than</Option>
                                                                <Option value="Is greater than">Is greater than</Option>
                                                                <Option value="Is equal to">Is equal to </Option>
                                                                <Option value="within range">With In Range</Option>
                                                            </Select>
                                                        </FormItem>
                                                    </Col>
                                                    <span>{this.state.errors.cusFanclubWithin1}</span>

                                                    {this.state.cusFanclubWithin1 === "Is less than" || this.state.cusFanclubWithin1 === "Is greater than" || this.state.cusFanclubWithin1 === "Is equal to" ?
                                                        <div>

                                                            <Col span={16} className="marginLeft20">

                                                                <Col span={5} className="">
                                                                    <FormItem label="Enter Count" className={classnames('cusFanclubCount', { error: !!this.state.errors.cusFanclubCount })}>
                                                                        <InputNumber min={1} placeholder="15" name="cusFanclubCount" value={this.state.cusFanclubCount} onChange={this.handleInput3} />
                                                                        <span>{this.state.errors.cusFanclubCount}</span>
                                                                    </FormItem>
                                                                </Col>

                                                            </Col>
                                                        </div> : null}
                                                    {this.state.cusFanclubWithin1 === "within range" ? <div>

                                                        <Col span={2} className="marginLeft20 fanclubsSechdulednotificationstart">
                                                            <FormItem label="Start Count" className={classnames('cusFanclubStartCount', { error: !!this.state.errors.cusFanclubStartCount })}>
                                                                <InputNumber min={1} placeholder="15" name="cusFanclubStartCount" value={this.state.cusFanclubStartCount} onChange={this.handleInput4} />
                                                                <span>{this.state.errors.cusFanclubStartCount}</span>
                                                            </FormItem>
                                                        </Col>

                                                        <Col span={2} className="">
                                                            <FormItem label="End Count" className={classnames('cusFanclubEndCount', { error: !!this.state.errors.cusFanclubEndCount })}>
                                                                <InputNumber min={1} placeholder="15" name="cusFanclubEndCount" value={this.state.cusFanclubEndCount} onChange={this.handleInput5} />
                                                                <span>{this.state.errors.cusFanclubEndCount}</span>
                                                            </FormItem>
                                                        </Col>

                                                    </div> : null}

                                                </Col>
                                                <Col span={24} className=""> <Col span={5} className="">
                                                    <FormItem label="Select Time Range" className={classnames('cusFanclubWithin', { error: !!this.state.errors.cusFanclubWithin })}>

                                                        <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                                            showSearch
                                                            placeholder="within"
                                                            optionFilterProp="children"
                                                            name="cusFanclubWithin"
                                                            value={this.state.cusFanclubWithin || undefined}
                                                            onChange={this.onCusFanclubWithinChange}
                                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                            >
                                                            <Option value="within">within</Option>
                                                            <Option value="within range">within range</Option>
                                                            <Option value="unspecified">Unspecified</Option>
                                                        </Select>

                                                        <span>{this.state.errors.cusFanclubWithin}</span>


                                                    </FormItem>
                                                </Col>
                                                    {this.state.cusFanclubWithin === 'within' ? <div>

                                                        <Col span={4} className="marginLeft20">
                                                            <FormItem label="Enter Count" className={classnames('cusFanclubDays', { error: !!this.state.errors.cusFanclubDays })}>
                                                                <InputNumber min={1} placeholder="15" name="cusFanclubDays" value={this.state.cusFanclubDays} onChange={this.handleInput} />
                                                                <span>{this.state.errors.cusFanclubDays}</span>
                                                            </FormItem>
                                                        </Col>

                                                    </div> : null}
                                                    {this.state.cusFanclubWithin === 'within range' ? <div>

                                                        <Col span={2} className="marginLeft20 sechduledfanclubstartDayss">
                                                            <FormItem label="Start Count" className={classnames('cusFanclubStartDay', { error: !!this.state.errors.cusFanclubStartDay })}>
                                                                <InputNumber min={1} placeholder="15" name="cusFanclubStartDay" value={this.state.cusFanclubStartDay} onChange={this.handleInput1} />
                                                                <span>{this.state.errors.cusFanclubStartDay}</span>
                                                            </FormItem>
                                                        </Col>
                                                        <Col span={4} className="">
                                                            <FormItem label="End Count" className={classnames('cusFanclubEndDay', { error: !!this.state.errors.cusFanclubEndDay })}>
                                                                <InputNumber min={1} placeholder="15" name="cusFanclubEndDay" value={this.state.cusFanclubEndDay} onChange={this.handleInput2} />
                                                                <span>{this.state.errors.cusFanclubEndDay}</span>
                                                            </FormItem>
                                                        </Col>

                                                    </div> : null}
                                                </Col>
                                            </div>
                                            : null}
                                        {this.state.cusFanclubTargetName === "Join Fan Club" || this.state.cusFanclubTargetName === "Fan Club Creation" || this.state.cusFanclubTargetName === "Send Invite" ?

                                            <div>
                                                <Col span={5} className="">
                                                    <FormItem label="Activity Status" className={classnames('cusFanclubPerformed', { error: !!this.state.errors.cusFanclubPerformed })}>
                                                        <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                                            className=""
                                                            showSearch
                                                            placeholder="was performed"
                                                            optionFilterProp="children"
                                                            name="cusFanclubPerformed"
                                                            value={this.state.cusFanclubPerformed || undefined}
                                                            onChange={this.onCusPerformedChange}
                                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                            >
                                                            <Option value="was performed">Was Performed</Option>
                                                            <Option value="wasNotPerformed">Was Not Performed</Option>
                                                        </Select>
                                                        <span>{this.state.errors.cusFanclubPerformed}</span>
                                                    </FormItem>
                                                </Col>

                                            </div> : null
                                        }
                                        {this.state.cusFanclubTargetName === "Fan Club Feeds" || this.state.cusFanclubTargetName === "Event Creation" ?
                                            <div>
                                                <Col span={5} className="">
                                                    <FormItem label="Was Not Performed" className={classnames('cusFanclubPerformed', { error: !!this.state.errors.cusFanclubPerformed })}>
                                                        <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                                            className=""
                                                            showSearch

                                                            placeholder="was not performed"
                                                            optionFilterProp="children"
                                                            onChange={this.onCusPerformedChange}
                                                            value={this.state.cusFanclubPerformed || undefined}
                                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                            >

                                                            <Option value="wasNotPerformed">Was Not Performed</Option>
                                                        </Select>
                                                        <span>{this.state.errors.cusFanclubPerformed}</span>
                                                    </FormItem>
                                                </Col>
                                            </div> : null}

                                        {this.state.cusFanclubPerformed === "was performed" ?
                                            <div>
                                                <Col span={5} className="marginLeft20">
                                                    <FormItem label="Select Filter Criteria" className={classnames('cusFanclubFor', { error: !!this.state.errors.cusFanclubFor })}>
                                                        <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                                            className=""
                                                            showSearch
                                                            placeholder="for celebrity"
                                                            optionFilterProp="children"
                                                            name="cusFanclubFor"
                                                            value={this.state.cusFanclubFor || undefined}
                                                            onChange={this.onCusForChange}
                                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                            >
                                                            {this.state.cusFanclubCat !== "All" ? <Option value="for celebrity">for celebrity</Option> : ''}
                                                            <Option value="for Period">for period</Option>
                                                            <Option value="Unspecified">Unspecified</Option>
                                                        </Select>
                                                        <span>{this.state.errors.cusFanclubFor}</span>
                                                    </FormItem>
                                                </Col>
                                            </div> : null

                                        }
                                        {this.state.cusFanclubPerformed === "wasNotPerformed" && this.state.cusFanclubTargetName != "Join Fan Club" ?
                                            <div>
                                                <Col span={5} className="marginLeft20">
                                                    <FormItem label="Select Comparison Value" className={classnames('cusFanclubFor', { error: !!this.state.errors.cusFanclubFor })}>
                                                        <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                                            className=""
                                                            showSearch
                                                            placeholder="for period"
                                                            optionFilterProp="children"
                                                            onChange={this.onCusForChange}
                                                            value={this.state.cusFanclubFor || undefined}
                                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                            >

                                                            <Option value="for Period">for period</Option>
                                                            <Option value="Unspecified">Unspecified</Option>
                                                        </Select>
                                                        <span>{this.state.errors.cusFanclubFor}</span>
                                                    </FormItem>
                                                </Col>
                                            </div> : null
                                        }
                                    </div>
                                    <div>
                                        {this.state.cusFanclubFor === "for celebrity" ?
                                            <div className="bloc2">
                                                <Col span={5} className="marginLeft10 sechduledforcelebrity">
                                                    <FormItem label="Select Celebrity" className={classnames('cusFanclubCelebName', { error: !!this.state.errors.cusFanclubCelebName })}>
                                                        <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                                            className="marginLeft10"
                                                            showSearch
                                                            placeholder="Sharukh k"
                                                            optionFilterProp="children"
                                                            name="cusFanclubCelebName"
                                                            onChange={this.onCusFanclubCelebChange}
                                                            value={this.state.cusFanclubCelebName || undefined}
                                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                            >
                                                            {celebNames}
                                                        </Select>
                                                        <span>{this.state.errors.cusFanclubCelebName}</span>
                                                    </FormItem>
                                                </Col>
                                                <Col span={24} className="">
                                                    <Col span={5} className="">
                                                        <FormItem label="Select Time Range" className={classnames('cusFanclubWithin', { error: !!this.state.errors.cusFanclubWithin })}>

                                                            <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                                                showSearch
                                                                className=""
                                                                placeholder="within"
                                                                optionFilterProp="children"
                                                                value={this.state.cusFanclubWithin || undefined}
                                                                onChange={this.onCusFanclubWithinChange}
                                                                name="cusFanclubWithin"
                                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                                >
                                                                <Option value="within">within</Option>
                                                                <Option value="within range">within range</Option>
                                                                <Option value="unspecified">Unspecified</Option>
                                                            </Select>
                                                        </FormItem>
                                                    </Col>
                                                    <span>{this.state.errors.cusFanclubWithin}</span>
                                                    {this.state.cusFanclubWithin === 'within' ? <div>

                                                        <Col span={4} className="marginLeft20">
                                                            <FormItem label="Enter Count" className={classnames('cusFanclubDays', { error: !!this.state.errors.cusFanclubDays })}>
                                                                <InputNumber min={1} placeholder="15" name="cusFanclubDays" value={this.state.cusFanclubDays} onChange={this.handleInput} />
                                                                <span>{this.state.errors.cusFanclubDays}</span>
                                                            </FormItem>
                                                        </Col>

                                                    </div> : null}
                                                    {this.state.cusFanclubWithin === 'within range' ?
                                                        <div>

                                                            <Col span={2} className="marginLeft20 fanclubsSechdulednotificationstart">
                                                                <FormItem label="Start Count" className={classnames('cusFanclubStartDay', { error: !!this.state.errors.cusFanclubStartDay })}>
                                                                    <InputNumber min={1} placeholder="15" name="cusFanclubStartDay" value={this.state.cusFanclubStartDay} onChange={this.handleInput1} />
                                                                    <span>{this.state.errors.cusFanclubStartDay}</span>
                                                                </FormItem>
                                                            </Col>

                                                            <Col span={2} className="">
                                                                <FormItem label="End Count" className={classnames('cusFanclubEndDay', { error: !!this.state.errors.cusFanclubEndDay })}>
                                                                    <InputNumber min={1} placeholder="15" name="cusFanclubEndDay" value={this.state.cusFanclubEndDay} onChange={this.handleInput2} />
                                                                    <span>{this.state.errors.cusFanclubEndDay}</span>
                                                                </FormItem>
                                                            </Col>

                                                        </div> : null}

                                                </Col>
                                            </div>
                                            : null}
                                    </div>
                                    <div>
                                        {this.state.cusFanclubFor === "for Period" ?
                                            <div>
                                                <Col span={24} className="">
                                                    <Col span={5} className="">
                                                        <FormItem label="Select Time Range" className={classnames('cusFanclubWithin', { error: !!this.state.errors.cusFanclubWithin })}>
                                                            <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                                                showSearch
                                                                className=""
                                                                placeholder="within"
                                                                optionFilterProp="children"
                                                                value={this.state.cusFanclubWithin || undefined}
                                                                onChange={this.onCusFanclubWithinChange}
                                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                                >
                                                                <Option value="within">within</Option>
                                                                <Option value="within range">within range</Option>
                                                                <Option value="unspecified">Unspecified</Option>
                                                            </Select>
                                                        </FormItem>
                                                    </Col>
                                                    <span>{this.state.errors.cusFanclubWithin}</span>
                                                    {this.state.cusFanclubWithin === 'within' ? <div>

                                                        <Col span={4} className="marginLeft20">
                                                            <FormItem label="Enter Count" className={classnames('cusFanclubDays', { error: !!this.state.errors.cusFanclubDays })}>
                                                                <InputNumber min={1} placeholder="15" name="cusFanclubDays" value={this.state.cusFanclubDays} onChange={this.handleInput} />
                                                                <span>{this.state.errors.cusFanclubDays}</span>
                                                            </FormItem>
                                                        </Col>
                                                    </div> : null}
                                                    {this.state.cusFanclubWithin === 'within range' ?
                                                        <div>   <Col span={2} className="marginLeft20 fanclubsschedulestartforperiod">
                                                            <FormItem label="Start Count" className={classnames('cusFanclubStartDay', { error: !!this.state.errors.cusFanclubStartDay })}>
                                                                <InputNumber min={1} placeholder="15" name="cusFanclubStartDay" value={this.state.cusFanclubStartDay} onChange={this.handleInput1} />
                                                                <span>{this.state.errors.cusFanclubStartDay}</span>
                                                            </FormItem>
                                                        </Col>
                                                            <Col span={2}>

                                                                <FormItem label="End Count" className={classnames('cusFanclubEndDay', { error: !!this.state.errors.cusFanclubEndDay })}>
                                                                    <InputNumber min={1} placeholder="15" name="cusFanclubEndDay" value={this.state.cusFanclubEndDay} onChange={this.handleInput2} />
                                                                    <span>{this.state.errors.cusFanclubEndDay}</span>
                                                                </FormItem>
                                                            </Col>
                                                        </div> : null}

                                                </Col>
                                            </div> : null}

                                    </div>
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
                        <Row className="">
                            <Col span={10} className="">
                                <FormItem label="Enter Title" className={classnames('title1', { error: !!this.state.errors.title1 })}>
                                    <Input type="text" placeholder="Enter Title" value={this.state.title1} name="title1" name="title1" maxLength={50} onChange={this.onChangeTitle} />
                                    <span>{this.state.errors.title1}</span>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row className="">
                            <Col span={8} className="">
                                <FormItem label="Enter Description" className={classnames('description1', { error: !!this.state.errors.description1 })}>
                                    <TextArea rows={3} placeholder="Enter Description" name="description1" value={this.state.description1} onChange={this.onChangeDes} />
                                    <span>{this.state.errors.description1}</span>
                                </FormItem>
                            </Col>

                            <Col span={2} className="">
                                <FormItem label="Select Image" className={classnames('imageUrl1', { error: !!this.state.errors.imageUrl1 })}>
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
                                        <Radio value="Schedule date and time">Specify Date and Time</Radio>
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
export default ScheduledFanclubs;
/* eslint-disable */