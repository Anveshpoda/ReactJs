/* eslint-disable */
import React from 'react';
import axios from 'axios';
import { Input, InputNumber, Select, Row, Col, Form, Tabs, Radio, Upload, message, Steps, Button, Tag, Tooltip, Icon } from 'antd';
import moment from 'moment';
import './Custom.css';
import classnames from 'classnames';
import { browserHistory } from 'react-router';
import PlacesAutoComplete from './PlaceAutoComplete';
const FormItem = Form.Item;
//const TabPane = Tabs.TabPane;
const { TextArea } = Input;
const Option = Select.Option;
const Step = Steps.Step;
//const Step1 = Steps.Step;

const RadioGroup = Radio.Group;
class CustomFanclub extends React.Component {
    constructor(props) {
        super(props);
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
            location: '',
            city: '',
            Uw: '',
            catagory: '',
            nType: '',
            tags: [],
            locationArray: []


        }
    }
    componentDidMount() {
        if (this.props !== undefined) {
            this.setState({ catagory: this.props.category, nType: this.props.nType })
        }
    }
    onCusFanclubCatChange = (e) => {
        if (e === "All") {
            this.setState({ disabled: true, catId: e, cusFanclubCat: e, cusFanclubSubcatId: '', cusFanclubSubcatName: '', cusFanclubPerformed: '', cusFanclubFor: '' })
            this.state.errors.cusFanclubSubcatId = "";
        } else {
            this.props.cusFanclubCat.map((subcat) => {
                if (e === subcat._id) {
                    this.setState({ cusFanclubSubCat: subcat.subCategories, disabled: false, catId: e, cusFanclubCat: subcat.name, cusFanclubSubcatName: '' });
                }
            })
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
                this.setState({ cusFanclubTargetName: name.name, cusFanclubPerformed: '', cusFanclubFor: '',cusFanclubWithin1:'', cusFanclubDays: '', cusFanclubStartDay: '', cusFanclubEndDay: '', cusFanclubWithin: '' });

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
        if (this.state.cusFanclubSubcatId) {
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
            message.success(`Image uploaded successfully`);
            if (info.file.response.data !== '') this.state.errors.imageUrl1 = '';
            this.setState({
                imageUrl1: info.file.response.data
            })
        }
    }
    onChangeTitle = (e) => {
        this.setState({ title1: e.target.value })
        if (e.target.value.trim() !== '') this.state.errors.title1 = '';
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
            if (this.state.catId === '') errors.catId = "*mandatory field";
            if (this.state.cusFanclubCat !== "All") {
                if (this.state.cusFanclubSubcatName === '') errors.cusFanclubSubcatId = "*mandatory field";
            }
            if (this.state.cusFanclubTargetName === '') errors.cusFanclubTargetName = "*mandatory field";
            this.setState({ errors });
            if (Object.keys(errors).length === 0) {
                if (this.state.cusFanclubTargetName === "Join Fan Club") {
                    let errors = {};
                    if (this.state.disabled === false) {
                        if (this.state.cusFanclubSubcatId === '') errors.cusFanclubSubcatId = "*mandatory field";
                    }
                    if (this.state.cusFanclubPerformed === '') errors.cusFanclubPerformed = "*mandatory field"
                    if (this.state.cusFanclubPerformed != '' && this.state.cusFanclubPerformed != "wasNotPerformed") {
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
                        var time = moment().startOf('day').format('HH:mm:ss');
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
                    if (Object.keys(errors).length === 0) {
                        var data = {
                            //"catId": this.state.catId,
                            "subCatId": this.state.cusFanclubSubcatId,
                            "celebrityName": this.state.cusFanclubCelebName,
                            "date": newdate ? newdate : "",
                            "performed": this.state.cusFanclubPerformed,
                            "startDate": newdate1 ? newdate1 : "",
                            "endDate": newdate2 ? newdate2 : ""
                        }
                         if (this.state.catId === "All") {
                            data.catId=""
                        }else{
                            data.catId=this.state.catId
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
                        if (this.state.cusFanclubSubcatId === '') errors.cusFanclubSubcatId = "*mandatory field";
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
                        var time = moment().startOf('day').format('HH:mm:ss');
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
                    if (Object.keys(errors).length === 0) {
                        var data = {
                            //"catId": this.state.catId,
                            "subCatId": this.state.cusFanclubSubcatId,
                            "celebrityName": this.state.cusFanclubCelebName,
                            "date": newdate ? newdate : "",
                            "performed": this.state.cusFanclubPerformed,
                            "startDate": newdate1 ? newdate1 : "",
                            "endDate": newdate2 ? newdate2 : ""
                        }
                        if (this.state.catId === "All") {
                            data.catId=""
                        }else{
                            data.catId=this.state.catId
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
                        if (this.state.cusFanclubSubcatId === '') errors.cusFanclubSubcatId = "*mandatory field";
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
                        //time="5:30:00";
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
                    this.setState({ errors });
                    if (Object.keys(errors).length === 0) {
                        var data = {
                            //"catId": this.state.catId,
                            "subCatId": this.state.cusFanclubSubcatId,
                            "date": newdate ? newdate : "",
                            "range": this.state.cusFanclubWithin1,
                            "startDate": newdate1 ? newdate1 : "",
                            "endDate": newdate2 ? newdate2 : "",
                            "count": this.state.cusFanclubCount,
                            "startCount": this.state.cusFanclubStartCount,
                            "endCount": this.state.cusFanclubEndCount
                        }
                        if (this.state.catId === "All") {
                            data.catId=""
                        }else{
                            data.catId=this.state.catId
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
                        if (this.state.cusFanclubSubcatId === '') errors.cusFanclubSubcatId = "*mandatory field";
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

                    this.setState({ errors });
                    if (Object.keys(errors).length === 0) {
                        var data = {
                            //"catId": this.state.catId,
                            "subCatId": this.state.cusFanclubSubcatId,
                            "date": newdate ? newdate : "",
                            "range": this.state.cusFanclubWithin1,
                            "startDate": newdate1 ? newdate1 : "",
                            "endDate": newdate2 ? newdate2 : "",
                            "count": this.state.cusFanclubCount,
                            "startCount": this.state.cusFanclubStartCount,
                            "endCount": this.state.cusFanclubEndCount
                        }
                        if (this.state.catId === "All") {
                            data.catId=""
                        }else{
                            data.catId=this.state.catId
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
                        if (this.state.cusFanclubSubcatId === '') errors.cusFanclubSubcatId = "*mandatory field";
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
                    this.setState({ errors });
                    if (Object.keys(errors).length === 0) {
                        var data = {
                            // "catId": this.state.catId,
                            "subCatId": this.state.cusFanclubSubcatId,
                            "date": newdate ? newdate : "",
                            "range": this.state.cusFanclubWithin1,
                            "startDate": newdate1 ? newdate1 : "",
                            "endDate": newdate2 ? newdate2 : "",
                            "count": this.state.cusFanclubCount,
                            "startCount": this.state.cusFanclubStartCount,
                            "endCount": this.state.cusFanclubEndCount
                        }
                        if (this.state.catId === "All") {
                            data.catId=""
                        }else{
                            data.catId=this.state.catId
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
                        if (this.state.cusFanclubSubcatId === '') errors.cusFanclubSubcatId = "*mandatory field";
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

                    this.setState({ errors });
                    if (Object.keys(errors).length === 0) {
                        var data = {
                            //"catId": this.state.catId,
                            "subCatId": this.state.cusFanclubSubcatId,
                            "date": newdate ? newdate : "",
                            "startDate": newdate1 ? newdate1 : "",
                            "endDate": newdate2 ? newdate2 : "",
                        }
                        if (this.state.catId === "All") {
                            data.catId=""
                        }else{
                            data.catId=this.state.catId
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
                        if (this.state.cusFanclubSubcatId === '') errors.cusFanclubSubcatId = "*mandatory field";
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
                    this.setState({ errors });
                    if (Object.keys(errors).length === 0) {
                        var data = {
                            //"catId": this.state.catId,
                            "subCatId": this.state.cusFanclubSubcatId,
                            "date": newdate ? newdate : "",
                            "startDate": newdate1 ? newdate1 : "",
                            "endDate": newdate2 ? newdate2 : "",

                        }
                        if (this.state.catId === "All") {
                            data.catId=""
                        }else{
                            data.catId=this.state.catId
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
                        if (this.state.cusFanclubSubcatId === '') errors.cusFanclubSubcatId = "*mandatory field";
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
                    this.setState({ errors });
                    if (Object.keys(errors).length === 0) {
                        var data = {
                            //"catId": this.state.catId,
                            "subCatId": this.state.cusFanclubSubcatId,
                            "date": newdate ? newdate : "",
                            "startDate": newdate1 ? newdate1 : "",
                            "endDate": newdate2 ? newdate2 : "",
                            "count": this.state.cusFanclubCount,
                            "startCount": this.state.cusFanclubStartCount,
                            "endCount": this.state.cusFanclubEndCount,
                            "range": this.state.cusFanclubWithin1,
                        }
                        if (this.state.catId === "All") {
                            data.catId=""
                        }else{
                            data.catId=this.state.catId
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
        }
    }
    done() {
        if (this.state.current === 2) {
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
                        "locationTags": this.state.tags
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
                                // _self.setState({ParticipatedTwoDates:response.data})
                                message.success('Notification Sent');
                                browserHistory.push('/push-notifications/custom-notifications');
                            } else {
                                message.error(`Error! Unable to send Notification`);
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
                        "imageUrl": this.state.imageUrl1,
                        "location": this.state.location === "Global" ? [this.state.location] : locations,
                        "locationTags": this.state.tags
                    }
                    const url = "/customNotification"
                    var request = new Request(url, {
                        method: 'POST',
                        body: JSON.stringify(data1),
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
                                message.success('Notification Sent');
                                browserHistory.push('/push-notifications/custom-notifications');
                            } else {
                                message.error(`Error! Unable to send Notification`);
                            }
                        })
                }
            }
        }
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
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
        var { tags } = this.state;
        console.log("this state",this.state)
        var checks = ''
        if (this.state.cusFanclubCat === "All") {
            checks = this.state.cusFanclubCat;
        } else {
            checks = this.state.cusFanclubSubcatName
        }
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
        var subCategories = this.state.cusFanclubSubCat.map((subcat) => <Option value={subcat._id}>{subcat.name}</Option>);
        //if (this.state.cusFanclubCelebNames.length!==0)
        var celebNames = this.state.cusFanclubCelebNames.map((index) => <Option value={index}>{index}</Option>)
        const steps = [{
            title: 'Select Target Users',
            content:
            <div id="CFanclubs" className="block_container">
                <Row className="MarginTop20">
                    <Form>
                        <Row>
                            <Col span={18} className="colLg8">
                                <p className='greyColor'></p>
                                <FormItem label="Select Fan Clubs Category" className={classnames('catId', { error: !!this.state.errors.catId })}>

                                    <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                        showSearch
                                        placeholder="Select Fan Clubs Category"
                                        optionFilterProp="children"
                                        value={this.state.cusFanclubCat || undefined}
                                        name="catId"
                                        onChange={this.onCusFanclubCatChange}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                        {this.props.categories}
                                        <Option value="All">All</Option>
                                    </Select>
                                    <span>{this.state.errors.catId}</span>
                                </FormItem>
                                <FormItem label="Select Fan Clubs Sub-category" className="colLg8" className={classnames('cusFanclubSubcatId', { error: !!this.state.errors.cusFanclubSubcatId })}>
                                    <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                        showSearch
                                        placeholder="Select Fan Clubs Sub-category"
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
                        </Row>
                        <Row>
                            <Col span={24} className="">
                                <FormItem>
                                    <div className="bloc1">
                                        <Col span={7} className="">
                                            <FormItem label="Criteria to be followed" className={classnames('cusFanclubTargetName', { error: !!this.state.errors.cusFanclubTargetName })} >
                                                <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                                    showSearch
                                                    placeholder="Select Criteria"
                                                    optionFilterProp="children"
                                                    onChange={this.onCusTargetChange}
                                                    value={this.state.cusFanclubTargetName || undefined}
                                                    name="cusFanclubTargetName"
                                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                    >
                                                    {this.props.targetActivities}
                                                </Select>
                                                <span>{this.state.errors.cusFanclubTargetName}</span>
                                            </FormItem>
                                        </Col>
                                        {this.state.cusFanclubTargetName === "No.of Fan Clubs Joined" || this.state.cusFanclubTargetName === "No. of Fan Clubs Created" || this.state.cusFanclubTargetName === "No. of Fan Club Members - To Admin" || this.state.cusFanclubTargetName === "No. of Events Created" || this.state.cusFanclubTargetName === "Send Invite Count" || this.state.cusFanclubTargetName === "Fanclub Feed Count" ?
                                            <div>
                                                <Col span={24} className="">
                                                    <Col span={4} className="">
                                                        <FormItem label="Select Comparison Value" className={classnames('cusFanclubWithin1', { error: !!this.state.errors.cusFanclubWithin1 })}>
                                                            <Select className=""
                                                                showSearch
                                                                placeholder="Select Period"
                                                                optionFilterProp="children"
                                                                name="cusFanclubWithin1"
                                                                onChange={this.onCusFanclubWithinChange1}
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

                                                                <Col span={3} className="">
                                                                    <FormItem label="Enter Count" className={classnames('cusFanclubCount', { error: !!this.state.errors.cusFanclubCount })}>
                                                                        <InputNumber min={1} placeholder="15" name="cusFanclubCount" value={this.state.cusFanclubCount} onChange={this.handleInput3} />
                                                                        <span>{this.state.errors.cusFanclubCount}</span>
                                                                    </FormItem>
                                                                </Col>

                                                            </Col>
                                                        </div> : null}
                                                    {this.state.cusFanclubWithin1 === "within range" ? <div>

                                                        <Col span={2} className="marginLeft20">
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
                                                <Col span={24} className="">  <Col span={3} className="">
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
                                                    </FormItem>
                                                </Col>
                                                    <span>{this.state.errors.cusFanclubWithin}</span>

                                                    {this.state.cusFanclubWithin === 'within' ? <div>

                                                        <Col span={2} className="marginLeft20">
                                                            <FormItem label="Enter Count" className={classnames('cusFanclubDays', { error: !!this.state.errors.cusFanclubDays })}>
                                                                <InputNumber min={1} placeholder="15" name="cusFanclubDays" value={this.state.cusFanclubDays} onChange={this.handleInput} />
                                                                <span>{this.state.errors.cusFanclubDays}</span>
                                                            </FormItem>
                                                        </Col>

                                                    </div> : null}
                                                    {this.state.cusFanclubWithin === 'within range' ? <div>

                                                        <Col span={2} className="marginLeft20">
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
                                        {this.state.cusFanclubTargetName === "Join Fan Club" || this.state.cusFanclubTargetName === "Fan Club Creation" || this.state.cusFanclubTargetName === "Send Invite" ?

                                            <div>
                                                <Col span={4} className="CustomNotiFanclubsActivity">
                                                    <FormItem label="To Whom" className={classnames('cusFanclubPerformed', { error: !!this.state.errors.cusFanclubPerformed })}>
                                                        <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                                            className="marginLeft20"
                                                            showSearch

                                                            placeholder="was performed"
                                                            optionFilterProp="children"
                                                            name="cusFanclubPerformed"
                                                            value={this.state.cusFanclubPerformed || undefined}
                                                            onChange={this.onCusPerformedChange}
                                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                            >
                                                            <Option value="was performed">People Who Did</Option>
                                                            <Option value="wasNotPerformed">People Who Did Not</Option>
                                                        </Select>
                                                        <span className="marginLeft20">{this.state.errors.cusFanclubPerformed}</span>
                                                    </FormItem>
                                                </Col>

                                            </div> : null
                                        }
                                        {this.state.cusFanclubTargetName === "Fan Club Feeds" || this.state.cusFanclubTargetName === "Event Creation" ?
                                            <div>
                                                <Col span={4} className="CustomNotfiFanClubsWasNotperform">
                                                    <FormItem label="To Whom" className={classnames('cusFanclubPerformed', { error: !!this.state.errors.cusFanclubPerformed })}>
                                                        <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                                            className="marginLeft20"
                                                            showSearch
                                                            placeholder="Select One"
                                                            optionFilterProp="children"
                                                            onChange={this.onCusPerformedChange}
                                                            value={this.state.cusFanclubPerformed || undefined}
                                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                            >

                                                            <Option value="wasNotPerformed">People Who Did Not</Option>
                                                        </Select>
                                                        <span className="marginLeft20">{this.state.errors.cusFanclubPerformed}</span>
                                                    </FormItem>
                                                </Col>
                                            </div> : null}

                                        {this.state.cusFanclubPerformed === "was performed" ?
                                            <div>
                                                <Col span={3} className="marginLeft20 CustomnfanClubsforCelebity">
                                                    <FormItem label="Apply Filters" className={classnames('cusFanclubFor', { error: !!this.state.errors.cusFanclubFor })}>
                                                        <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                                            className="marginLeft20"
                                                            showSearch

                                                            placeholder="Select One"
                                                            optionFilterProp="children"
                                                            name="cusFanclubFor"
                                                            value={this.state.cusFanclubFor || undefined}
                                                            onChange={this.onCusForChange}
                                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                            >
                                                            {checks !== "All" ? <Option value="for celebrity">Celebrity</Option> : ''}
                                                            <Option value="for Period">Time Range</Option>
                                                            <Option value="Unspecified">Unspecified</Option>
                                                        </Select>
                                                        <span className="marginLeft20">{this.state.errors.cusFanclubFor}</span>
                                                    </FormItem>
                                                </Col>
                                            </div> : null

                                        }
                                        {this.state.cusFanclubPerformed === "wasNotPerformed" && this.state.cusFanclubTargetName != "Join Fan Club" ?
                                            <div>
                                                <Col span={4} className="marginLeft20 CustomNotifactionFanForPeriod">
                                                    <FormItem label="Select Duration" className={classnames('cusFanclubFor', { error: !!this.state.errors.cusFanclubFor })}>
                                                        <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                                            className="marginLeft20"
                                                            showSearch

                                                            placeholder="for period"
                                                            optionFilterProp="children"
                                                            onChange={this.onCusForChange}
                                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                            >

                                                            <Option value="for Period">Time Range</Option>
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

                                                <Col span={4} className="marginLeft20 CustomnfanClubsforCelebity">
                                                    <FormItem label="Select Celebrity" className={classnames('cusFanclubCelebName', { error: !!this.state.errors.cusFanclubCelebName })}>
                                                        <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                                            className="marginLeft20"
                                                            showSearch
                                                            placeholder="Select Celebrity"
                                                            optionFilterProp="children"
                                                            name="cusFanclubCelebName"
                                                            onChange={this.onCusFanclubCelebChange}
                                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                            >
                                                            {celebNames}
                                                        </Select>
                                                        <span>{this.state.errors.cusFanclubCelebName}</span>
                                                    </FormItem>
                                                </Col>

                                                <span className="">  </span>

                                                <Col span={24} className="">
                                                    <Col span={3} className="">
                                                        <FormItem label="Select Time Range" className={classnames('cusFanclubWithin', { error: !!this.state.errors.cusFanclubWithin })}>

                                                            <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                                                showSearch
                                                                className=""
                                                                placeholder="Select One"
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

                                                        <Col span={2} className="marginLeft20">
                                                            <FormItem label="Enter Count" className={classnames('cusFanclubDays', { error: !!this.state.errors.cusFanclubDays })}>
                                                                <InputNumber min={1} placeholder="15" name="cusFanclubDays" value={this.state.cusFanclubDays} onChange={this.handleInput} />
                                                                <span>{this.state.errors.cusFanclubDays}</span>
                                                            </FormItem>
                                                        </Col>

                                                    </div> : null}
                                                    {this.state.cusFanclubWithin === 'within range' ?
                                                        <div>
                                                            <Col span={18} className="">
                                                                <Col span={2} className="marginLeft20">
                                                                    <FormItem label="Start Count" className={classnames('cusFanclubStartDay', { error: !!this.state.errors.cusFanclubStartDay })}>
                                                                        <InputNumber min={1} placeholder="15" name="cusFanclubStartDay" value={this.state.cusFanclubStartDay} onChange={this.handleInput1} />
                                                                        <span>{this.state.errors.cusFanclubStartDay}</span>
                                                                    </FormItem>
                                                                </Col>

                                                                <Col span={2} className="marginLeft20">
                                                                    <FormItem label="End Count" className={classnames('cusFanclubEndDay', { error: !!this.state.errors.cusFanclubEndDay })}>
                                                                        <InputNumber min={1} placeholder="15" name="cusFanclubEndDay" value={this.state.cusFanclubEndDay} onChange={this.handleInput2} />
                                                                        <span>{this.state.errors.cusFanclubEndDay}</span>
                                                                    </FormItem>
                                                                </Col>
                                                            </Col>
                                                        </div> : null}

                                                </Col>
                                            </div>
                                            : null}
                                    </div>
                                    <div>
                                        {this.state.cusFanclubFor === "for Period" ?
                                            <div>
                                                <Col span={24} className="CustomfanClubsWithanrangesmain">
                                                    <Col span={4} className="">
                                                        <FormItem label="Select Time Range" className={classnames('cusFanclubWithin', { error: !!this.state.errors.cusFanclubWithin })}>
                                                            <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                                                showSearch
                                                                className="customFanclubsWithin"
                                                                placeholder="Select One"
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
                                                        <Col span={13} className="marginLeft20">

                                                            <Col span={4} className="">
                                                                <FormItem label="Enter Count" className={classnames('cusFanclubDays', { error: !!this.state.errors.cusFanclubDays })}>
                                                                    <InputNumber min={1} placeholder="15" name="cusFanclubDays" value={this.state.cusFanclubDays} onChange={this.handleInput} />
                                                                    <span>{this.state.errors.cusFanclubDays}</span>
                                                                </FormItem>
                                                            </Col>
                                                        </Col>
                                                    </div> : null}
                                                    {this.state.cusFanclubWithin === 'within range' ?
                                                        <div>
                                                            <Col span={18} className="marginLeft20">

                                                                <Col span={3} className="">
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
                        <Row>
                            <h4 className="CustomNotifiTitles">Notification Title</h4>
                            <Col span={10}>
                                <FormItem className={classnames('title1', { error: !!this.state.errors.title1 })}>
                                    <Input autoComplete={'off'} type="text" placeholder="Enter Title" value={this.state.title1} name="title1" name="title1" maxLength={50} onChange={this.onChangeTitle} />
                                    <span>{this.state.errors.title1}</span>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row className="marginBottom20">
                            <Col span={8} className="">
                                <h4 className="CustomNotifiTitles">Notification Decription</h4>
                                <FormItem className={classnames('description1', { error: !!this.state.errors.description1 })}>
                                    <TextArea rows={3} maxLength={150} placeholder="Enter Description" name="description1" value={this.state.description1} onChange={this.onChangeDes} />
                                    <span>{this.state.errors.description1}</span>
                                </FormItem>
                            </Col>
                            <Col span={4} className="smallUploader">
                                <h4 className="CustomNotifiTitles1">Image</h4>
                                <FormItem className={classnames('imageUrl1', { error: !!this.state.errors.imageUrl1 })} style={{ 'marginLeft': '20' }}>
                                    <Upload  {...props}
                                        className="avatar-uploader"
                                        style={{ width: 80, height: 80 }}
                                        showUploadList={false}
                                        accept=".png,.jpg,.jpeg"
                                        onChange={this.onChangeImg}
                                        >
                                        {
                                            this.state.imageUrl1 ?
                                                <img src={this.state.imageUrl1} alt="" className="avatar" style={{ width: 80, height: 80 }} /> :
                                                <Icon type="plus" className="avatar-uploader-trigger" style={{ width: 80, height: 80 }} />
                                        }
                                    </Upload>
                                    <span>{this.state.errors.imageUrl1}</span>
                                </FormItem>
                            </Col>
                        </Row>

                    </Form>
                </Row>
            </div>
        },
        {
            title: 'Select Location',
            content:
            <div>
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
            </div>
        }];
        return (
            <div id="custom" className="MarginTop20">
                <Steps current={current}>
                    {steps.map(item => <Step key={item.title} title={item.title} />)}
                </Steps>
                <div className="steps-content">{steps[this.state.current].content}</div>
                <div className="steps-action">
                    {
                        this.state.current < steps.length - 1
                        &&
                        <Button type="primary" onClick={() => this.next()}>Next</Button>
                    }
                    {
                        this.state.current === steps.length - 1
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
export default CustomFanclub;
/* eslint-disable */