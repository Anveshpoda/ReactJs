/* eslint-disable */
import React from 'react';
import Dashboard from '../Dashboard/Dashboard'
import classnames from 'classnames';
import { Col, Row, Button, Tabs, Card, Radio, Form, Input, Select, Icon, Upload, Switch, Tag, Tooltip, message } from 'antd';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import fanclubs from './fanclubs.css';
import icon_tvshows from '../images/icon_tvshows.png';
import icon_movies from '../images/icon_movies.png';
import icon_music from '../images/icon_music.png';
import iconh_music from '../images/iconh_music.png';
import PlacesAutocomplete from 'react-places-autocomplete'
import { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete'
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
function callback(key) {
    console.log(key);
}

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
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




class CreateFanClub extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabactive: '1',
            value: "Public",
            imgloading: false,
            tags: [],
            inputVisible: false,
            inputValue: '',
            categories: [],
            subCategories: [],
            celebrities: [],
            mobileusers: [],
            celebname: '',
            fanclubDesc: '',
            fanclubName: '',
            address: '',
            lat1: '',
            lng1: '',
            Locid: '',
            geocodeResults: null,
            loading: false,
            requestJoin: false,
            ownermember: true,
            owneradminmember: false,
            imageUrl: '',
            categoryId: '',
            mobileNumber: [],
            subCategoryId: [],
            errors: {},
            inputlength: 0,
            tagserror: '',
            search: '',
            addClass: false,
            movieClass: false,
            sportsClass: false,
            musicClass: false,
            tvshowsClass: false,
            disabled:false

        }
        this.baseState = this.state;
        this.getCategories = this.getCategories.bind(this);
        this.getmobileUsers = this.getmobileUsers.bind(this); ``
        this.bindSubCategories = this.bindSubCategories.bind(this);
        //  this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onsubCategoryChange = this.onsubCategoryChange.bind(this);
        this.onCelebrityChange = this.onCelebrityChange.bind(this);
        this.mobileUserchange = this.mobileUserchange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderGeocodeFailure = this.renderGeocodeFailure.bind(this);
        this.renderGeocodeSuccess = this.renderGeocodeSuccess.bind(this);
        this.requestJoinChange = this.requestJoinChange.bind(this);
        this.ownerChange = this.ownerChange.bind(this);
        this.owneradminChange = this.owneradminChange.bind(this);
    }
    tabChange(key) {
        this.setState({ tabactive: '1' })
    }
    handleReset = () => {
        this.setState(this.baseState);
        this.getCategories();
        this.getmobileUsers();
    }
    fanclubChange = (e) => {
        if (this.state[e.target.name] === '') this.state.errors[e.target.name] = ''
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    requestJoinChange = (checked) => {
        this.setState({ requestJoin: checked });
    }
    ownerChange = (checked) => {
        this.setState({ ownermember: checked });
        if (checked === true) {
            this.setState({ owneradminmember: false });
        } else if (checked === false) {
            this.setState({ owneradminmember: true });
        }

    }
    owneradminChange = (checked) => {
        this.setState({ owneradminmember: checked });
        if (checked === true) {
            this.setState({ ownermember: false });
        } else if (checked === false) {
            this.setState({ ownermember: true });
        }
    }
    componentDidMount() {
        this.getCategories();
       
    }
    getCategories = () => {
        var _this = this;
        const url = '/categories';
        var request = new Request(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'x-access-token': sessionStorage.getItem('token')
            }
        });
        fetch(request)
            .then(response => response.json())
            .then(function (response) {
                _this.setState({ categories: response.data });
            })
    }
    getmobileUsers = (location) => {
        var _this = this;
        const url = '/mobile/users?location=' + location;
        var request = new Request(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'x-access-token': sessionStorage.getItem('token')
            }
        });
        fetch(request)
            .then(response => response.json())
            .then(function (response) {
                if (response.status === 200) {
                    _this.setState({ mobileusers: response.data });
                }
            })
    }
    getUsers = () => {    
       {this.state.locationName ? this.getmobileUsers(this.state.locationName[0]) : ''}
    }
    cardClick = (catid) => {
     
        if (catid === "100000000000000000000001") {
            this.setState({ movieClass: true });
            this.setState({ sportsClass: false });
            this.setState({ musicClass: false });
            this.setState({ tvshowsClass: false });
        } else if (catid === "100000000000000000000002") {
            this.setState({ movieClass: false });
            this.setState({ sportsClass: true });
            this.setState({ musicClass: false });
            this.setState({ tvshowsClass: false });
        } else if (catid === "100000000000000000000003") {
            this.setState({ movieClass: false });
            this.setState({ sportsClass: false });
            this.setState({ musicClass: true });
            this.setState({ tvshowsClass: false });
        } else if (catid === "100000000000000000000004") {
            this.setState({ movieClass: false });
            this.setState({ sportsClass: false });
            this.setState({ musicClass: false });
            this.setState({ tvshowsClass: true });
        }



        this.setState({ categoryId: catid });
        this.getCelebrities(catid);
        if (this.state.categoryId === '') this.state.errors.categoryId = ''
    }
    // onCategoryChange(e, category) {
    //     this.setState({ categoryId: e, subCategoryId: [], celebrities: [], celebname: '' });
    //     // this.bindSubCategories(e);
    //     this.getCelebrities(e);
    //     if (this.state.categoryId === '') this.state.errors.categoryId = ''
    // }

    bindSubCategories(category) {
        var a = this.state.categories.map((categorydata) => {
            if (category === categorydata._id) {
                this.setState({
                    subCategories: categorydata.subCategories,
                    celebname: 'Select Celebrity'
                });
            }
        });

    }
    onsubCategoryChange = (value, category) => {
        var subid = value.split(",");
        this.setState({ subCategoryId: value, celebname: 'Select Celebrity' });
        this.getCelebrities(subid);
        if (value.length !== 0) this.state.errors.subCategoryId = ''
    }
    mobileUserchange = (value) => {
        this.setState({ mobileNumber: value });
        if (value.length !== 0) this.state.errors.mobileNumber = '';

        //     (contest) => {

        //       return contest.mobileNumber.includes(this.state.mobileNumber);
        //     }
        //   );
        //   this.state.mobileusers.length === 0 ? null : filteredContacts.map((item, index) => {
        //     this.state.mobileusers = filteredContacts;
        //   });
    }
    mobileUsersearch = (value) => {
        this.setState({ search: value });



        // if (value === '') {
        //     this.getmobileUsers();
        // }
    }
    getCelebrities = (catid) => {
        var _this = this;
        // this.setState({ subCategoryId: subid });
        //   var data = { categoryIds: subid }
        // const url = process.env.REACT_APP_API_HOST + '/rest/getCelebrityNames?categoryId=' + catid + '&limit=10&offset=0';
        const url = '/celebrity-by-category/'+catid ;
        var request = new Request(url, {
            method: 'GET',
            // body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "x-access-token": sessionStorage.getItem('token')
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
    onCelebrityChange(value, category) {
        this.setState({ celebname: value });
        if (this.state.celebname === '') this.state.errors.celebname = ''
    }

    onfanclubChange = (e) => {

        // this.handleReset();
        // this.getCategories();
        // this.getmobileUsers();
        this.setState({
            value: e.target.value,
        });
    }


    imagehandleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ imgloading: true });
            return;
        }

        if (info.file.status === 'done') {
            if (info.file.response.data !== '') this.state.errors.imageUrl = '';
            this.setState({
                imageUrl: info.file.response.data,
                imgloading: false,
            });
        }
    }



    handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        this.setState({ tags, tagserror: " " });

        // this.setState({ inputlength: this.state.inputValue.length + this.state.inputlength });

        // var a = this.state.inputValue.length + this.state.inputlength;
        // console.log("this.satte",this.state.inputValue.length,this.state.inputlength,a)
        // if (a > 30) {
        //     this.setState({ tagserror: "Tags characters are limited to 30" });
        // } else {
        //     this.setState({ tagserror: "" });
        // }
    }

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    }

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
        if (this.state.inputValue === '') this.state.errors.tags = ''
    }

    handleInputConfirm = () => {
        const state = this.state;
        this.setState({ inputlength: this.state.inputValue.length + this.state.inputlength });
        var a = this.state.inputValue.length + this.state.inputlength;
        this.setState({ tagsLength: a });
        // if (a > 30) {
        //     this.setState({ tagserror: "Tags characters are limited to 30" });
        // } else {
        //     this.setState({ tagserror: "" });
        // }
        const inputValue = state.inputValue;
        let tags = state.tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });

    }

    saveInputRef = input => this.input = input;
    category = (e) => {
        let errors = {};
        if (this.state.categoryId === '' || this.state.categoryId === undefined) errors.categoryId = 'Please select a category';
        this.setState({ errors });
        if (Object.keys(errors).length == 0) {
            this.setState({ tabactive: '2' })
        }
    }

    publicFanclub = (e) => {
        let errors = {};
        var tagsLength = this.state.tags.join().replace(",", "");
        if (tagsLength.length > 30) errors.tags = 'Tags characters are limited to 30'


        //if (this.state.subCategoryId.length === 0 || this.state.subCategoryId === undefined) errors.subCategoryId = 'subCategoryId is Required'
        if (this.state.celebname === '' || this.state.celebname === undefined) errors.celebname = '*mandatory field'
        if (this.state.fanclubDesc === '' || this.state.fanclubDesc === undefined) errors.fanclubDesc = '*mandatory field'
        if (this.state.tags.length === 0 || this.state.tags === undefined) errors.tags = '*mandatory field'
        if (this.state.imageUrl === '' || this.state.imageUrl === undefined) errors.imageUrl = '*image is mandatory'
        if (this.state.mobileNumber.length === 0 || this.state.mobileNumber === undefined) errors.mobileNumber = '*mandatory field'
        if (this.state.fanclubName === '' || this.state.fanclubName === undefined) errors.fanclubName = '*mandatory field'
        if (this.state.locationName === '' || this.state.locationName === undefined) errors.address = '*mandatory field'

        this.setState({ errors, tagsLength: 0 });
        if (Object.keys(errors).length == 0) {
            var inviteMember;
            this.setState({disabled:true})
            if (this.state.requestJoin === true) {
                inviteMember = 1
            } else if (this.state.requestJoin === false) {
                inviteMember = 3
            }
            var _this = this;
            var data = {
                "categoryId": this.state.categoryId,
                "celebrityName": this.state.celebname,
                "description": this.state.fanclubDesc,
                "hashTag": this.state.tags,
                "imageUrl": this.state.imageUrl,
                "latitude": this.state.latitude,
                "locationName": this.state.locationName,
                "longitude": this.state.longitude,
                "name": this.state.fanclubName,
                "phoneNumbers": this.state.mobileNumber,
                "publicOrPrivate": false,
                "requestToJoin": this.state.requestJoin,
                "inviteMember": inviteMember,
                // "subCategoryIds": this.state.subCategoryId,
                "userId": "999999999999999999999999"
            }
            const url = process.env.REACT_APP_API_HOST + '/rest/createOrUpdateFanClub';
            var request = new Request(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            fetch(request)
                .then(response => response.json())
                .then(function (response) {
                    if (response.statusCode === 1) {
                        _this.handleReset();
                        message.success("Fan Club created successfully");
                        browserHistory.push('/fan-clubs');
                    }
                    else {
                    }
                });
        }

    }
    privateFanclub = (e) => {
        let errors = {};
        var tagsLength = this.state.tags.join().replace(",", "");
        if (tagsLength.length > 30) errors.tags = 'Tags characters are limited to 30'
        // if (this.state.categoryId === '' || this.state.categoryId === undefined) errors.categoryId = 'Category is Required'
        //   if (this.state.subCategoryId.length === 0 || this.state.subCategoryId === undefined) errors.subCategoryId = 'subCategoryId is Required'
        if (this.state.celebname === '' || this.state.celebname === undefined) errors.celebname = 'Celebrity Name is Required'
        if (this.state.fanclubDesc === '' || this.state.fanclubDesc === undefined) errors.fanclubDesc = 'Fanclub description is Required'
        if (this.state.tags.length === 0 || this.state.tags === undefined) errors.tags = 'Tags are Required'
        if (this.state.imageUrl === '' || this.state.imageUrl === undefined) errors.imageUrl = 'Image is Required'
        if (this.state.mobileNumber.length === 0 || this.state.mobileNumber === undefined) errors.mobileNumber = 'Invite atleast one member'
        if (this.state.fanclubName === '' || this.state.fanclubName === undefined) errors.fanclubName = 'fanclubName is Required'
        if (this.state.locationName === '' || this.state.locationName === undefined) errors.address = 'Location is Required'
        this.setState({ errors });
        if (Object.keys(errors).length == 0) {
            var _this = this;
            var inviteMember;
            this.setState({disabled:true})
            if (this.state.ownermember === true) {
                inviteMember = 1;
            } else if (this.state.owneradminmember === true) {
                inviteMember = 2;
            }
            var data = {
                "categoryId": this.state.categoryId,
                "celebrityName": this.state.celebname,
                "description": this.state.fanclubDesc,
                "hashTag": this.state.tags,
                "imageUrl": this.state.imageUrl,
                "latitude": this.state.latitude,
                "locationName": this.state.locationName,
                "longitude": this.state.longitude,
                "name": this.state.fanclubName,
                "phoneNumbers": this.state.mobileNumber,
                "publicOrPrivate": true,
                "requestToJoin": true,
                "inviteMember": inviteMember,
                //  "subCategoryIds": this.state.subCategoryId,
                "userId": "999999999999999999999999"
            }
            const url = process.env.REACT_APP_API_HOST + '/rest/createOrUpdateFanClub';
            var request = new Request(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            fetch(request)
                .then(response => response.json())
                .then(function (response) {
                    if (response.statusCode === 1) {
                        _this.handleReset();
                    message.success("Fan Club created successfully");
                        browserHistory.push('/fan-clubs');
                    }
                    else {
                    }
                });
        }

    }
    handleSelect(address) {
        this.setState({
            address,
            loading: true
        })
      
        geocodeByAddress(address)

            .then((results) => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                let addressarray = [];
                var data = {};
                let Locid1 = '';
                var res = this.state.address.split(",").map(function (item) {
                    addressarray.push(item);
                });
                this.setState({ latitude: lat, longitude: lng, locationName: addressarray });
                var self = this;

                this.setState({
                    geocodeResults: this.renderGeocodeSuccess(lat, lng),
                    loading: false,
                    lat1: lat,
                    lng1: lng,
                    Locid: Locid1
                })
                //   this.props
                //   .submit44(address,this.state.lat1)
            })
            .catch((error) => {
                this.setState({
                    geocodeResults: this.renderGeocodeFailure(error),
                    loading: false
                })

            });

    }

    handleChange(address) {
        this.setState({
            address,
            geocodeResults: null
        });
        if (this.state.address === '') this.state.errors.address = '';
       // this.getmobileUsers();
    }
   
    renderGeocodeFailure(err) {
        return (
            <div className="error" role="alert">
                <strong>Error! Please give correct details</strong> {err}
            </div>
        )
    }

    renderGeocodeSuccess(lat, lng) {
        return (
            <div className="alert alert-success" role="alert">
                <strong>Success!</strong> Geocoder found latitude and longitude: <strong>{lat}, {lng}</strong>
            </div>
        )
    }

    onChange = (e) => {
      
        this.setState({
            value: e.target.value,
        });
    }

    render() {
        const cssClasses = {
            root: 'form-group',
            input: 'Demo__search-input ant-input ant-input-lg',
            autocompleteContainer: 'Demo__autocomplete-container',

        }

        const AutocompleteItem = ({ formattedSuggestion }) => (
            <div className="Demo__suggestion-item">
                <i className='fa fa-map-marker Demo__suggestion-icon' />
                <strong>{formattedSuggestion.mainText}</strong>{' '}
                <small className="text-muted">{formattedSuggestion.secondaryText}</small>
            </div>)

        const inputProps = {
            type: "text",
            value: this.state.address,
            onChange: this.handleChange,
            // onBlur: () => {this.onBlur.bind(this) },
            onFocus: () => { },
            placeholder: "Search Places",
            name: 'Demo__input',
            id: "my-input-id",

        }

        const mapCategories = this.state.categories.map((category) => <Option value={category._id}>{category.name}</Option>);
        const mapSubCategories = this.state.subCategories.map((subCategory) => <Option value={subCategory._id}>{subCategory.name}</Option>);
        const mapCelebrities = this.state.celebrities.map((celebrity) => <Option value={celebrity.celebrityName}>{celebrity.celebrityName}</Option>);
        var mapUsers = this.state.mobileusers.map((users) => <Option value={users.mobileNumber}>{users.fullName ? users.fullName :  users.mobileNumber}</Option>);

        const uploadButton = (
            <div>
                <Icon type={this.state.imgloading ? 'imgloading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        const { tags, inputVisible, inputValue } = this.state;



        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        let movieBox = ["divbox"];
        if (this.state.movieClass) {
            movieBox.push('green');
        }
        let sportsBox = ["divbox"];
        if (this.state.sportsClass) {
            sportsBox.push('green');
        }
        let musicBox = ["divbox"];
        if (this.state.musicClass) {
            musicBox.push('green');
        }
        let tvshowsBox = ["divbox"];
        if (this.state.tvshowsClass) {
            tvshowsBox.push('green');
        }

        return (
            <Dashboard>
                <div className="">
                
                    <Row className="CreateFanClubsMainHeader CreateFanClubSubMenu">
                        <Col span={13}>
                            <h2 className="createfanclubpagetitle">Create Fan Club</h2>
                        </Col>
                        <Col span={11} className="CreateFanClubsubhead">
                            <Link to="/fan-clubs" ><Button type="primary" className="createfanclubbackbutton">Back to Fan Clubs</Button></Link>
                        </Col>
                    </Row>
                    <Row className="CreateFanClubBody">

                        <Tabs defaultActiveKey="1" onChange={this.tabChange.bind(this)} activeKey={this.state.tabactive}>
                            <TabPane tab="Category" key="1">
                                <div classname="createFanccategory">
                                    <Row className="createFanClubstopimages">
                                        <h3 className="createfancmainimagesheader">Select Fan Club Category</h3>
                                        <Col className="ant-col-2 NomargnLftMovies">
                                            <div className={movieBox.join(' ')} onClick={this.cardClick.bind(this, "100000000000000000000001")}>

                                                <FormItem >

                                                    <img src={icon_movies} alt="cover" className="img-responsive Createancimagesh" height="50px" width="50px" />
                                                    <p className="createFancimageTitle">Movies</p>

                                                </FormItem>

                                            </div>
                                        </Col>
                                        <Col className="ant-col-2 mrgLeft15">
                                            <div className={sportsBox.join(' ')} onClick={this.cardClick.bind(this, "100000000000000000000002")}>

                                                <FormItem>
                                                    <img src={icon_music} alt="cover" className="img-responsive Createancimagesh" height="50px" width="50px" />
                                                    <p className="createFancimageTitle">Sports</p>
                                                </FormItem>

                                            </div>
                                        </Col>
                                        <Col className="ant-col-2 mrgLeft15">
                                            <div className={musicBox.join(' ')} onClick={this.cardClick.bind(this, "100000000000000000000003")}>

                                                <FormItem>
                                                    <img src={iconh_music} alt="cover" className="img-responsive Createancimagesh" height="50px" width="50px" />
                                                    <p className="createFancimageTitle">Music</p>
                                                </FormItem>

                                            </div>
                                        </Col>
                                        <Col className="ant-col-2 mrgLeft15">
                                            <div className={tvshowsBox.join(' ')} onClick={this.cardClick.bind(this, "100000000000000000000004")}>

                                                <FormItem>
                                                    <img src={icon_tvshows} alt="cover" className="img-responsive Createancimagesh" height="50px" width="50px" />
                                                    <p className="createFancimageTitle">TV Shows</p>
                                                </FormItem>

                                            </div>
                                        </Col>
                                      
                                    </Row>
                                    <Row>
                                      <p className="createCategoryimageError" style={{ color: "red" }}>{this.state.errors.categoryId}</p>
                                      </Row>

                                    <Row>
                                        <Col span={20} className="createFanclubpublicPrivate">
                                            <FormItem>
                                                <h3>Please Select Fan Club Mode </h3>
                                                <RadioGroup onChange={this.onfanclubChange} value={this.state.value}>
                                                    <Radio style={radioStyle} value="Public"><span className="createfanclubverticalradios">Public</span>
                                                        <p>
                                                            This Fan Club will be visible to everyone on FanKick. Anyone can send request/join this Fan Club.
                                                         <br />   Members can also invite other people to join this Fan Club.
                                                 </p></Radio>

                                                    <Radio style={radioStyle} value="Private"><span className="createfanclubverticalradios">Private</span>
                                                        <p>This Fan Club will not be visible to everyone on FanKick. Only members will have access to see feeds and other details of the Fan Club.
                                                        <br/> Members will not be able to invite other people to join this Fan Club. Only owner and few other admins will have those permissions.</p>
                                                    </Radio>

                                                </RadioGroup>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={5} offset={15}>
                                            <Button className="CreatefanclubnextBtn" type="primary" onClick={this.category.bind(this)}>Save and Next</Button>
                                        </Col>
                                    </Row>
                                </div>
                            </TabPane>
                            <TabPane tab="Details" key="2">
                                <div className="">


                                    <Form>

                                        <Row>
                                            <Col span={9}>
                                                <FormItem>
                                                    <h6 className='h6Fnt'>Fan Club Title</h6>
                                                    <Input type="text" name="fanclubName" placeholder="Fan Club Title"
                                                        value={this.state.fanclubName} maxLength={30} onChange={this.fanclubChange.bind(this)} />
                                                    <span style={{ color: "red" }}>{this.state.errors.fanclubName}</span>
                                                </FormItem>
                                            </Col>
                                        </Row>


                                        <Row>
                                            {/* <Col span={4}>
                                            <FormItem>
                                                <h6 className='h6Fnt'>Select Category:</h6>
                                                <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                                    placeholder="Select Category"
                                                    value={this.state.categoryId || undefined}
                                                    onChange={this.onCategoryChange}>
                                                    {mapCategories}
                                                </Select>
                                                <span style={{ color: "red" }}>{this.state.errors.categoryId}</span>
                                            </FormItem>

                                        </Col>

                                        {/* <Col span={5}>
                                         <FormItem>
                                            <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                               className="mrgLeft50"
                                                placeholder="Select Sub Category"
                                                value={this.state.subCategoryId}
                                                onChange={this.onsubCategoryChange}>
                                                {mapSubCategories}
                                            </Select>
                                            <span style={{ color: "red" }} className="mrgLeft50" >{this.state.errors.subCategoryId}</span>
                                        </FormItem> 
                                        </Col>*/}



                                            <Col span={9} className="createfanclubSelectcategory">
                                                <FormItem>
                                                    <h6 className='h6Fnt'>Select Celebrity</h6>
                                                    <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                                        showSearch
                                                        placeholder="Select Celebrity"
                                                        value={this.state.celebname || undefined}
                                                        onChange={this.onCelebrityChange}
                                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} >
                                                        {mapCelebrities}
                                                    </Select>
                                                    <span style={{ color: "red" }}>{this.state.errors.celebname}</span>
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <div className="createFanCUpload">

                                                <Row>
                                                    <Col span={6}>
                                                        <FormItem>
                                                            <h6 className='h6Fnt'>Fan Club  Description:</h6>
                                                            <TextArea style={{ padding: '6px' }} rows={5} name="fanclubDesc"
                                                                value={this.state.fanclubDesc} maxLength={300} onChange={this.fanclubChange.bind(this)}
                                                                placeholder="Describe Fan Club" />
                                                            <span style={{ color: "red" }}>{this.state.errors.fanclubDesc}</span>
                                                        </FormItem>

                                                    </Col>
                                                    <Col span={3} className="createfanclubimagesupload">
                                                        <div className="fancupload">
                                                            <FormItem>
                                                                <h6 className='h6Fnt'>Upload Image</h6>
                                                                <Upload {...props}
                                                                    listType="picture-card"
                                                                    className="uploaderimage avatar-uploader"
                                                                    showUploadList={false}
                                                                    accept=".png,.jpg,.jpeg"
                                                                    onChange={this.imagehandleChange}
                                                                    >
                                                                    {imageUrl ? <img src={imageUrl} alt="" /> : uploadButton}
                                                                </Upload>
                                                                <span style={{ color: "red" }}>{this.state.errors.imageUrl}</span>
                                                            </FormItem>
                                                        </div>
                                                    </Col>

                                                </Row>
                                            </div>
                                        </Row>
                                        <Row>
                                            <Col span={9}>
                                                <FormItem>
                                                    <h6 className='h6Fnt'>Enter Fan Club Location</h6>
                                                    <PlacesAutocomplete
                                                        onSelect={this.handleSelect}
                                                        autocompleteItem={AutocompleteItem}
                                                        onEnterKeyDown={this.handleSelect}
                                                        classNames={cssClasses}
                                                        inputProps={inputProps}
                                                        defaultValue={this.state.address}
                                                        />
                                                    {this.state.loading ? <div><i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" /></div> : null}
                                                    {/* {!this.state.loading && this.state.geocodeResults ?
                                                        <div className='geocoding-results'>{this.state.geocodeResults}</div> :
                                                        null} */}
                                                    <span style={{ color: "red" }}>{this.state.errors.address}</span>
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={9}>
                                                <FormItem>
                                                    <h6 className='h6Fnt'>Permissions</h6>
                                                    {this.state.value === "Public" ? <Input placeholder="Define Permissions" disabled /> : <Input placeholder="Permession(Only members can view)" disabled />}
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={9}>
                                                <ul>
                                                    <FormItem>
                                                        <h6 className='h6Fnt'><span className="RedStar">*</span>Enter Hash Tag</h6>
                                                        <li>
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
                                                                    onFocus={this.getUsers.bind(this)}
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
                                                                    Enter Hashtag<Icon type="plus" />
                                                                </Tag>
                                                            )}

                                                        </li>
                                                        <span style={{ color: "red" }}>{this.state.tagserror}</span>
                                                        <span style={{ color: "red" }}>{this.state.errors.tags}</span>
                                                    </FormItem>
                                                </ul>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <div className="publiclines">
                                                <h6 className='h6Fnt'><span className="RedStar">*</span>Request to Join</h6>
                                                {this.state.value === "Public" ? <FormItem> <p className="Publiclinesp">Request to Join <span> <Switch onChange={this.requestJoinChange} /></span></p></FormItem> : null}
                                               
                                            </div>
                                        </Row>
                                        <Row>
                                            <div clasName="Privatelines">
                                                {this.state.value === "Private" ?
                                                    <FormItem><p>Only Owner Can Invite Member <span>
                                                        <Switch checked={this.state.ownermember} onChange={this.ownerChange} /></span></p></FormItem>
                                                    : null}

                                                {this.state.value === "Private" ? <FormItem><p>Owner & Admins Can Invite Member <span>
                                                    <Switch checked={this.state.owneradminmember} onChange={this.owneradminChange} /></span></p></FormItem> : null}
                                                    
                                                <Col span={9}>
                                                    <FormItem>
                                                        <h6 className='h6Fnt'><span className="RedStar">*</span>Invite Members</h6>

                                                        <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                                            showSearch
                                                            mode="multiple"
                                                            optionFilterProp="children"
                                                            placeholder="Invite Members"
                                                            value={this.state.mobileNumber || undefined}
                                                            onChange={this.mobileUserchange}
                                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>

                                                            {mapUsers}
                                                        </Select>
                                                        <span style={{ color: "red" }}>{this.state.errors.mobileNumber}</span>
                                                    </FormItem>
                                                </Col>
                                               
                                            </div>
                                        </Row>
                                        {this.state.value === "Public" ? <Button type="primary" disabled={this.state.disabled} className="marginTopBottom15" onClick={this.publicFanclub}>Create Public Fan Club</Button> : null}
                                        {this.state.value === "Private" ? <Button type="primary" disabled={this.state.disabled} className="marginTopBottom15" onClick={this.privateFanclub}>Create Private Fan Club</Button> : null}
                                    </Form>

                                </div>

                            </TabPane>

                        </Tabs>
                    </Row>
                </div>
            </Dashboard>
        );
    }
}

export default CreateFanClub;


