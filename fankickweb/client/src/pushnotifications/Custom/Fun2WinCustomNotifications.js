/* eslint-disable */
import React from 'react';
import css from '../../pushnotifications/pushNotifications.css';
import PlacesAutoComplete from './PlaceAutoComplete';
import {
    Form, Input, InputNumber, Icon, Button, Radio, Select, Col, Row,
    Steps, Tag, Tooltip, Upload, message
} from 'antd';
import { Link, browserHistory } from 'react-router';

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const Step = Steps.Step;
const RadioGroup = Radio.Group;


class Fun2WinCustomNotifications extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            cusFanclubSubCat: [],
            fun2WinDurationFilter: '',
            fun2WinActivityFilter: '',
            fun2WinParticipationCountFilter: '',
            fun2WinCategory: '',
            fun2WinCategoryName: '',
            fun2winSubCategory: '',
            fun2winSubCategoryName: '',
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
            tags: [],
            locationArray: [],
            usersArray: [],
            errors: {},
            disabled: false,
            fun2winAll: "",
            fun2winSubcatAll: ""
        }
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
                        // if (body.category) {
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
                        // }
                    }
                }
                if (this.state.fun2WinActivityFilter === 'Not Participated') {
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
        }
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    done = () => {
        let errors = {};
        var dataObj = {
            'users': this.state.usersArray,
            'title': this.state.title.trim(),
            'description': this.state.contestDescription.trim(),
            'imageUrl': this.state.imageUrl,
            'location': [this.state.radioValue],
            "type": "Custom Notifications",
            "category": "Fun2Win"
        }
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
                        "type": "Custom Notifications",
                        "category": "Fun2Win",
                        "targetUserCategory": this.state.fun2WinCategoryName,
                        "targetUserSubcat": this.state.fun2winSubCategoryName,
                        "targetActivity": this.state.fun2WinActivityFilter,
                        "within": this.state.fun2WinDurationFilter,
                        "locationTags": this.state.tags
                    }
                    const url = '/customNotification'
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
                                message.success("Notification Sent");
                                browserHistory.push("/push-notifications/custom-notifications");
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
                        "type": "Custom Notifications",
                        "category": "Fun2Win",
                        "targetUserCategory": this.state.fun2WinCategoryName,
                        "targetUserSubcat": this.state.fun2winSubCategoryName,
                        "targetActivity": this.state.fun2WinActivityFilter,
                        "range": this.state.fun2WinParticipationCountFilter,
                        "likesCount": this.state.contestNumber,
                        "startLikesCount": this.state.contestOne,
                        "endLikesCount": this.state.contestTwo,
                        "within": this.state.fun2WinDurationFilter,
                        "locationTags": this.state.tags
                    }
                    const url = '/customNotification'
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
                                message.success("Notification Sent");
                                browserHistory.push("/push-notifications/custom-notifications");
                            }
                            else {  }
                        })
                }
                else if (this.state.fun2WinActivityFilter === "Not Participated") {
                    var dataObj = {
                        'users': this.state.usersArray,
                        'title': this.state.title.trim(),
                        'description': this.state.contestDescription.trim(),
                        'imageUrl': this.state.imageUrl,
                        'location': this.state.radioValue !== 'Global' ? locations : [this.state.radioValue],
                        "type": "Custom Notifications",
                        "category": "Fun2Win",
                        "targetUserCategory": this.state.fun2WinCategoryName,
                        "targetUserSubcat": this.state.fun2winSubCategoryName,
                        "locationTags": this.state.tags
                    }
                    const url = '/customNotification'
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
                                message.success("Notification Sent");
                                browserHistory.push("/push-notifications/custom-notifications");
                            }
                            else {  }
                        })
                }
            }
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
        if(!this.state.tags.includes(res[0])){
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

    onFun2WinCatChange = (e) => {
        if (this.state.fun2WinCategory == '') this.state.errors.fun2WinCategory = ''
        if (e.key === "All") {
            this.setState({ disabled: true, fun2winAll: e.key,fun2WinCategoryName:e.key })
        } else {
            this.props.cusFanclubCat.map((subcat) => {
                if (e.key === subcat._id) {
                    this.setState({ cusFanclubSubCat: subcat.subCategories });
                }
            })
            this.setState({
                fun2WinCategory: e.key,
                fun2WinCategoryName: e.label,
                fun2winSubCategory: "",
                disabled:false
            })
        }
    }

    onFun2WinSubCatChange = (e) => {
        if (this.state.fun2winSubCategory == '') this.state.errors.fun2winSubCategory = ''
        if (e.key != "All") {
            this.setState({
                fun2winSubCategory: e.key,
                fun2winSubCategoryName: e.label
            })
        } else {
            this.setState({
                fun2winSubcatAll: e.key
            })
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
    }
    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        if (this.state[e.target.name].length > 0) this.state.errors[e.target.name] = ''
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
                    <ul className="list-inline">
                        <li className="customFun2WinParticipated"> 
                        <FormItem label="Select Comparision Value">
                            <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                showSearch
                                style={{ width: 200 }}
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
                        </FormItem></li>
                        <li>
                            {/* {this.bindFun2WinDuration()} */}
                        </li>
                    </ul>
                </div>
            )
        }
        else if (this.state.fun2WinActivityFilter === 'No. of Participations') {
            return (<div>
                <ul className="list-inline"><li  className="customFun2WinParticipatedCount">
                    <FormItem label="Select Comparision Value">
                        <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                            showSearch
                            style={{ width: 150 }}
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
                    </FormItem></li>
                    <li>
                        {this.bindParticipatedCountView()}</li>
                </ul>
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
                <ul className="list-inline">
                    <li className="CustomFun2WinStart">
                        <FormItem label="Start Count">
                            {/* <Input type="" placeholder="From Contests" name="contestOne" value={this.state.contestOne} maxLength={50} onChange={this.onInputChange} /> */}
                            <InputNumber min={1}  placeholder="From Contests" name="contestOne" value={this.state.contestOne} onChange={this.handlecontestOneChange} />
                        </FormItem>
                        <p style={{ color: "red" }}>{this.state.errors.contestOne}</p>
                    </li>
                    <li className="CustomFun2WinEnd">
                        <FormItem label="End Count">
                            {/* <Input type="" placeholder="To Contests" name="contestTwo" value={this.state.contestTwo} maxLength={50} onChange={this.onInputChange} /> */}
                            <InputNumber min={1}  placeholder="To Contests" name="contestTwo" value={this.state.contestTwo} onChange={this.handlecontestTwoChange} />
                        </FormItem>
                        <p style={{ color: "red" }}>{this.state.errors.contestTwo}</p></li>
                    <li className="CustomFun2SelectRanges">
                        <FormItem label="Select Time Range">
                            <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                showSearch
                                style={{ width: 150 }}
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
                    </li>
                    <li>
                        {/* {this.bindFun2WinDuration()} */}
                    </li>
                </ul>
            </div>)
        }
        else {
            return (
                <div>
                    <ul className="list-inline">
                        <li className="CustomFun2WinCounts">
                            <FormItem label="Count">
                                {/* <Input type="" placeholder="Number" name="contestNumber" value={this.state.contestNumber} maxLength={50} onChange={this.onInputChange} /> */}
                                <InputNumber min={1}  placeholder="Number" name="contestNumber" value={this.state.contestNumber} onChange={this.handleDurationChange} />
                            </FormItem>
                            <p style={{ color: "red" }}>{this.state.errors.contestNumber}</p>
                        </li>
                        <li className="CustomFun2SelectRanges">
                            <FormItem label="Select Time Range">
                                <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                    showSearch
                                    style={{ width: 150 }}
                                    placeholder="within range"
                                    optionFilterProp="children"
                                    onChange={this.onDurationFilterChange}
                                    value={this.state.fun2WinDurationFilter}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                    <Option value="Within">Within</Option>
                                    <Option value="Within Range">Within Range</Option>
                                    <Option value="Unspecified">Unspecified</Option>
                                </Select></FormItem></li>
                        <li>
                            {/* {this.bindFun2WinDuration()} */}
                        </li>
                    </ul>
                </div>)
        }
    }

    // bindFun2WinDuration = () => {
    //     if (this.state.fun2WinDurationFilter === 'Within') {
    //         return (
    //             <div>
    //                 <FormItem>
    //                     <Input type="" placeholder="Enter Days" value={this.state.fromDays} name="fromDays" maxLength={50} onChange={this.onInputChange} />
    //                 </FormItem>
    //             </div>
    //         )
    //     } else if (this.state.fun2WinDurationFilter === 'Within Range') {
    //         return (
    //             <div>
    //                 <ul className="list-inline">
    //                     <li>
    //                         <FormItem>
    //                             <Input type="" placeholder="Enter From Days" name="fromDays" value={this.state.fromDays} maxLength={50} onChange={this.onInputChange} />
    //                         </FormItem>
    //                     </li><li> <span>to</span></li>
    //                     <li>
    //                         <FormItem>
    //                             <Input type="" placeholder="Enter To Days" name="toDays" value={this.state.toDays} maxLength={50} onChange={this.onInputChange} />
    //                         </FormItem>
    //                     </li>
    //                 </ul>
    //             </div>
    //         )
    //     }
    // }

    render() {
        const { tags } = this.state;
        const test = this.props.cusFanclubCat;
        var targetActivities = this.props.subCategories.map((subCat) => <Option value={subCat.name}>{subCat.name}</Option>)
        var categories = this.props.cusFanclubCat.map((subCat) => <Option value={subCat._id}>{subCat.name}</Option>);
        var subCategories = this.state.cusFanclubSubCat.map((subcat) => <Option value={subcat._id}>{subcat.name}</Option>);
        const steps = [{
            title: 'Select Target Users',
            content:
            <div>
                <div id="CFun2Win" className="">
                    <Row className="MarginTop20">
                        <Form>
                            <Row>
                                <Col span={18} className="">
                                    <FormItem label="Select Category" className="colLg8">
                                        <p className='greyColor'></p>
                                        <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                            showSearch
                                            style={{ width: 250 }}
                                            placeholder="Select Fan Clubs Category"
                                            optionFilterProp="children"
                                            onChange={this.onFun2WinCatChange}
                                            labelInValue
                                            defaultValue={{ key: this.state.fun2WinCategory || this.state.fun2winAll }}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                            {categories}
                                            <Option value="All">All</Option>
                                        </Select>
                                        <p style={{ color: "red" }}>{this.state.errors.fun2WinCategory}</p>

                                    </FormItem>

                                    <FormItem label="Select Sub-category" className="colLg8">
                                        <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                            showSearch
                                            style={{ width: 250 }}
                                            placeholder="Select Fan Clubs Sub-category"
                                            optionFilterProp="children"
                                            onChange={this.onFun2WinSubCatChange}
                                            labelInValue
                                            disabled={this.state.disabled}
                                            defaultValue={{ key: this.state.fun2winSubCategory }}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                            {subCategories}
                                            <Option value="All">All</Option>
                                        </Select>
                                        <p style={{ color: "red" }}>{this.state.errors.fun2winSubCategory}</p>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row><ul className="list-inline">
                                <li>
                                    <Col span={24} className="">
                                        <FormItem label="Criteria to be followed">
                                            <Select className="LeftSpace" getPopupContainer={triggerNode => triggerNode.parentNode}
                                                showSearch
                                                style={{ width: 150 }}
                                                placeholder="Participated"
                                                optionFilterProp="children"
                                                defaultValue={this.state.fun2WinActivityFilter ||undefined}
                                                onChange={this.onTargetActivityChange}
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                >
                                                {targetActivities}
                                            </Select>
                                            <p style={{ color: "red" }}>{this.state.errors.fun2WinActivityFilter}</p>
                                        </FormItem>
                                    </Col>
                                </li>
                                <li>
                                    {this.bindTargetActivityChange()}
                                </li>
                            </ul>
                            </Row>
                        </Form>
                    </Row>
                </div>
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
                           <h4 className="CustomNotifiTitles">Notification Title</h4>
                                <FormItem>
                                    <Input type="" placeholder="Enter Title" name="title" value={this.state.title} maxLength={50} onChange={this.onInputChange} />
                                </FormItem>
                                <p style={{ color: "red" }}>{this.state.errors.title}</p>
                            </Col>
                        </Row>

                        <Row className="marginBottom20">
                            <Col span={8} className="">
                              <h4 className="CustomNotifiTitles">Notification Decription</h4>
                               <FormItem>
                                <TextArea rows={3} placeholder="Enter Description" name="contestDescription" value={this.state.contestDescription} onChange={this.onInputChange} maxLength={150} />
                             </FormItem>
                            </Col>
                            <p style={{ color: "red" }}>{this.state.errors.contestDescription}</p>
                            <Col span={2} className="">
                             <h4 className="CustomNotifiTitlesimage">Image</h4>
                             <FormItem>
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
                                <FormItem>
                                    <RadioGroup onChange={this.onRadioChange} value={this.state.radioValue}>
                                        <Radio value='Global'>Global</Radio>
                                        <Radio value='location'>Local</Radio>
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
            </div>
        }];

        return (

            <div id="custom" className="MarginTop20">
                <Steps current={this.state.current}>
                    {steps.map(item => <Step key={item.title} title={item.title} />)}
                </Steps>
                <div className="steps-content">{steps[this.state.current].content}</div>
                <div className="steps-action">
                    {
                        this.state.current < steps.length - 1
                        &&
                        <Button className="lastButtonofCustomFun2Win" type="primary" onClick={() => this.next()}>Next</Button>
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

export default Fun2WinCustomNotifications;
/* eslint-disable */