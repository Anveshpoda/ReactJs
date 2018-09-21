/* eslint-disable */
import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import Dashboard from '../Dashboard/Dashboard';
import classnames from 'classnames';
import { Col, Row, Button, Radio, Form, Input, Select, Icon, Upload, message, Modal, Tag } from 'antd';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import funclubs from './funclub.css';
import { Scrollbars } from 'react-custom-scrollbars';
import youtubeIcon from '../images/youtube.png';
import vimeoIcon from '../images/vimeo.png';
//import funclubs1 from '../images/icons/left/funclubs-color.png';
import PlacesAutoComplete from '../pushnotifications/Custom/PlaceAutoComplete';
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

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

const props1 = {
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
    onRemove(info) {
        this.setState({ jokeUrl: '' });
    }

};
class CreateFunClub extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 0,
            categories: [],
            subCategories: [],
            selectjokeType: ' ',
            categoryId: '',
            subCategoryId: '',
            jokeUrl: '',
            vthumbnailUrl: '',
            ijokeUrl: '',
            ithumbnailUrl: '',
            gjokeUrl: '',
            gthumbnailUrl: '',
            tjokeUrl: '',
            tthumbnailUrl: '',
            fileList: '',
            Daudio: '',
            funclubId: '',
            jokeType: '',
            celName: '',
            location: '',
            language: '',
            funClubsCategories: [],
            discription: '',
            errors: '',
            deleteVisible: false,
            funclubcategoryId: '',
            funclubsubCategoryId: [],
            FunclubDiscription: '',
            NewFunclubName: '',
            FunclubLocation: '',
            FunclubCelebrityName: '',
            FunclubImg: '',
            subCategoryIds: [],
            subCategoryName: '',
            celebrityName: '',
            tags: [],
            errors: {},
            locationArray: [],
            fileList: [],
            discription: '',
            videoUrl: '',
            thumbnailAudioUrl: '',
            audioUrl: '',
            subCategoryId: [],
            loading: false,
        }
        this.getFunClubsId = this.getFunClubsId.bind(this);
        this.bindSubCategories = this.bindSubCategories.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onsubCategoryChange = this.onsubCategoryChange.bind(this);
        this.onChangeCelebrityName = this.onChangeCelebrityName.bind(this);
        this.selectjokeType = this.selectjokeType.bind(this);
        this.onChangeDiscription = this.onChangeDiscription.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeLanguage = this.onChangeLanguage.bind(this);
        this.handleAudioChange = this.handleAudioChange.bind(this);
        this.onChangefunclubCategory = this.onChangefunclubCategory.bind(this);
        this.onChangefunclubsubCategory = this.onChangefunclubsubCategory.bind(this);
    }


    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, jokeUrl => this.setState({
                jokeUrl,
                loading: false,
            }));
        }
    }

    componentDidMount() {
        this.getFunClubsName();
        this.getCategories();
    }

    getFunClubsName = () => {
        //  console.log("User -----------", sessionStorage.getItem('token'))
        var instance = axios.create({
            headers: { 'x-access-token': sessionStorage.getItem('token') }
        });
        instance.get('/getFunClubNames').then((response) => {
            //     console.log("FunClub Names -----------", response.data.data);
            this.setState({ funClubsCategories: response.data.data });
        });
    }

    getCategories = () => {
        // console.log("User -----------", sessionStorage.getItem('token'))
        var instance = axios.create({
            headers: { 'x-access-token': sessionStorage.getItem('token') }
        });
        instance.get('/categories').then((response) => {
            //    console.log("Data categories------------------", response.data.data);
            this.setState({ categories: response.data.data });
        });
    }

    onCategoryChange = (e) => {
        console.log(e)
        this.setState({
            subCategoryIds: []
        })
        // if (e) {
        //   this.state.errors.categoryName = ''
        //   this.state.errors.subCategoryName = ''
        // }
        this.setState({
            categoryId: e
        });
        this.bindSubCategories(e)
    }


    onChangefunclubCategory(e, category) {
        var catid = e;
        // console.log("Category Id------------------------", e);
        this.setState({ funclubcategoryId: catid });
        if (e != "") this.state.errors.funclubCategory = ""
        // this.getCategorieswise(e);
        this.setState({ subCategoryId: [] });
        this.bindSubCategories(e);
    }

    getFunClubsId = (e) => {
        var funclubname = e;
        var self = this;
        if (e != '') self.state.errors.m8 = '';
        self.setState({
            funclubId: funclubname
        })
        // self.setState({  })
        // console.log("Funclub Name:------>", funclubname);
        if (funclubname === "CreateNewFunClub") {
            self.setState({ deleteVisible: true,funclubId:"" })
            // console.log("dadasd", this.state.deleteVisible)
        }

        // this.fetchRequest(coupontype);
    }

    bindSubCategories(category) {
        this.setState({ subCategoryId: [] });
        this.state.categories.map((categorydata) => {
            if (category === categorydata._id) {
                this.setState({
                    subCategories: categorydata.subCategories,
                    // subCategoryId: categorydata.subCategories[0]._id,
                    // subCategoryName: categorydata.subCategories[0].name
                })

            }
        })
        //  console.log(this.state)
    }

    onsubCategoryChange = (e) => {
        if (e != "") this.state.errors.funclubSubCategory = ""
        this.setState({
            subCategoryId: e,
        });
    }

    onChangefunclubsubCategory = (e) => {
        // var subid = value;
        // console.log("subCategory Id------------------------", subid);
        this.setState({ funclubsubCategoryId: e });
    }

    selectjokeType = (e) => {
        //  console.log("selectjokeType------------------------", e);
        if (e != '') this.state.errors.m7 = '';
        this.setState({ jokeType: e });

    }
    onChangeCelebrityName = (e) => {
        $("TextArea").on("keydown", function (e) {
            if (e.which === 32 && !this.value.length)
                e.preventDefault();
        });
        this.setState({ celName: e.target.value });
    }

    onChangeLocation = (e) => {
        this.setState({ location: e.target.value });
    }

    onChangeLanguage = (e) => {
        $("Input").on("keydown", function (e) {
            if (e.which === 32 && !this.value.length)
                e.preventDefault();
        });
        if (e.target.value != "") this.state.errors.language = ""
        this.setState({ language: e.target.value });
    }

    onChangeDiscription = (e) => {
        // if (e.target.value != '') this.state.errors.m5 = '';
        $("Input").on("keydown", function (e) {
            if (e.which === 32 && !this.value.length)
                e.preventDefault();
        });
        this.setState({ discription: e.target.value });
    }

    onChangeFunclubCelebrityName = (e) => {
        $("Input").on("keydown", function (e) {
            if (e.which === 32 && !this.value.length)
                e.preventDefault();
        });
        if (e.target.value != "") this.state.errors.celebrityName = ""
        this.setState({ FunclubCelebrityName: e.target.value });
    }

    onChangeFunclubLocation = (e) => {
        this.setState({ FunclubLocation: e.target.value });
    }

    onChangeFunclubName = (e) => {
        $("Input").on("keydown", function (e) {
            if (e.which === 32 && !this.value.length)
                e.preventDefault();
        });
        if (e.target.value != "") this.state.errors.funclubName = ""
        this.setState({ NewFunclubName: e.target.value });
    }

    onChangeFunclubDiscription = (e) => {
        $("TextArea").on("keydown", function (e) {
            if (e.which === 32 && !this.value.length)
                e.preventDefault();
        });
        if (e.target.value != "") this.state.errors.description = "";
        this.setState({ FunclubDiscription: e.target.value });
    }

    handleImageChange = (info) => {
        if (info.file.type === "image/png" || info.file.type === "image/jpg" || info.file.type === "image/jpeg" || info.file.type === "image/gif") {
            if (info.file.status === 'done') {
                if (info.file.response.data != "") this.state.errors.ijokeUrl = "";
                message.success(`Image uploaded successfully`);
                //   if (info.file.response.data !== '') this.state.errors.jokeUrl = '';
                this.setState({
                    ijokeUrl: info.file.response.data,
                    ithumbnailUrl: info.file.response.data
                });
                // console.log("image url", info.file.response.data)
            }
        } else {
            // console.log("errors");
            //   let errors = {};
            //   if (this.state.jokeUrl === '') errors.jokeUrl = "Only Image is required."
            //   this.setState({ errors });
            //   if (Object.keys(errors).length === 0) {
            //     
            //   }
        }
    }
    handleImageChange1 = (info) => {
        if (info.file.type === "image/png" || info.file.type === "image/jpg" || info.file.type === "image/jpeg" || info.file.type === "image/gif") {
            if (info.file.status === 'done') {
                if (info.file.response.data != "") this.state.errors.gjokeUrl = "";
                message.success(`Image uploaded successfully`);
                //   if (info.file.response.data !== '') this.state.errors.jokeUrl = '';
                this.setState({
                    gjokeUrl: info.file.response.data,
                    gthumbnailUrl: info.file.response.data
                });
                //console.log("image url", info.file.response.data)
            }
        } else {
            // console.log("errors");
            //   let errors = {};
            //   if (this.state.jokeUrl === '') errors.jokeUrl = "Only Image is required."
            //   this.setState({ errors });
            //   if (Object.keys(errors).length === 0) {
            //     
            //   }
        }
    }
    handleImageChange2 = (info) => {
        if (info.file.type === "image/png" || info.file.type === "image/jpg" || info.file.type === "image/jpeg" || info.file.type === "image/gif") {
            if (info.file.status === 'done') {
                if (info.file.response.data != "") this.state.errors.tjokeUrl = "";
                message.success(`Image uploaded successfully`);
                //   if (info.file.response.data !== '') this.state.errors.jokeUrl = '';
                this.setState({
                    tjokeUrl: info.file.response.data,
                    tthumbnailUrl: info.file.response.data
                });
                // console.log("image url", info.file.response.data)
            }
        } else {
            // console.log("errors");
            //   let errors = {};
            //   if (this.state.jokeUrl === '') errors.jokeUrl = "Only Image is required."
            //   this.setState({ errors });
            //   if (Object.keys(errors).length === 0) {
            //     
            //   }
        }
    }
    funclubImageChange = (info) => {
        if (info.file.type === "image/png" || info.file.type === "image/jpg" || info.file.type === "image/jpeg" || info.file.type === "image/gif") {
            if (info.file.status === 'done') {
                message.success(`Image uploaded successfully`);
                if (info.file.response.data !== '') this.state.errors.funclubImage = '';
                this.setState({
                    FunclubImg: info.file.response.data
                });
                // console.log("image url", this.state.jokeUrl)
            }
        } else {
            //  console.log("Only Image is required.");
            //   let errors = {};
            //   if (this.state.jokeUrl === '') errors.jokeUrl = "Only Image is required."
            //   this.setState({ errors });
            //   if (Object.keys(errors).length === 0) {
            //     
            //   }
        }
    }

    handleThumbnaileChange = (info) => {
        if (info.file.type === "image/png" || info.file.type === "image/jpg" || info.file.type === "image/jpeg" || info.file.type === "image/gif") {
            if (info.file.status === 'done') {

                message.success(`Image uploaded successfully`);
                //   if (info.file.response.data !== '') this.state.errors.jokeUrl = '';
                if (this.state.jokeType === "video") {
                    if (info.file.response.data != "") this.state.errors.vthumbnailUrl = "";
                    this.setState({
                        // jokeUrl: info.file.response.data,
                        vthumbnailUrl: info.file.response.data
                    });
                } else if (this.state.jokeType === "audio") {
                    if (info.file.response.data != "") this.state.errors.thumbnailAudioUrl = "";
                    this.setState({
                        // jokeUrl: info.file.response.data,
                        thumbnailAudioUrl: info.file.response.data
                    });
                }
                // console.log("image url", this.state.jokeUrl)
            }
        } else {
            // console.log("errors");
            //   let errors = {};
            //   if (this.state.jokeUrl === '') errors.jokeUrl = "Only Image is required."
            //   this.setState({ errors });
            //   if (Object.keys(errors).length === 0) {
            //    
            //   }
        }
    }

    handleAudioChange = (info) => {
        var _this = this;
        if (info.file.type === "audio/mp3" || info.file.type === "audio/x-m4a") {
            let fileList = info.fileList;
            fileList = fileList.slice(-1);
            fileList = fileList.map((file) => {
                if (file.response) {
                    file.url = file.response.url;
                }
                return file;
            });
            fileList = fileList.filter((file) => {
                if (file.response) {
                    return file.response.status === 'success';
                }
                return true;
            });
            this.setState({ fileList: fileList });
            if (info.file.status === 'done') {
                if (info.file.response.data != "") this.state.errors.audioUrl = "";
                message.success(`Audio file uploaded successfully`);
                //if (info.file.response.data !== '') this.state.errors.karaokeAudioUrl = '';
                this.setState({ audioUrl: info.file.response.data });
            }
        }


    }

    getAuidUrl = (audioUrl) => {
        //  console.log("super---->1111", audioUrl);
        this.setState({ jokeUrl: audioUrl.data });
    }

    handledeleteCancel = (e) => {
        this.setState({ deleteVisible: false });
        // window.location.href = "/fun-clubs/CreateFunClubJoke";
    }

    createFunClubModal = () => {
        this.setState({ deleteVisible: true });
        window.location.href = "/fun-clubs/CreateFunClubJoke";
    }

    handleMapData = (data, locationId) => {
        if (data) this.state.errors.location = ''
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

    handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        const locationArray = this.state.locationArray.filter(loc => loc.location !== removedTag)
        this.setState({ tags, locationArray });
    }

    handleSubmit = (e) => {
        var _this = this;
        let errors = {};
        if (this.state.funclubId === undefined || this.state.funclubId === 'CreateNewFunClub' || this.state.funclubId === '') {
            errors.m8 = "FunClub is mandatory";
        }
        if (this.state.jokeType === undefined || this.state.jokeType === '') {
            errors.m7 = "joke type Field is Mandatory";
        }
        if (this.state.jokeType != undefined || this.state.jokeType != '') {
            if (this.state.jokeType === "text") {
                if (this.state.tjokeUrl === "") errors.tjokeUrl = " text Field is Mandatory"
            }
            if (this.state.jokeType === "image") {
                if (this.state.ijokeUrl === "") errors.ijokeUrl = " image Field is Mandatory"
            }
            if (this.state.jokeType === "gif") {
                if (this.state.gjokeUrl === "") errors.gjokeUrl = " gif Field is Mandatory"
            }
            if (this.state.jokeType === "video") {
                if (this.state.vthumbnailUrl === "") errors.vthumbnailUrl = " vimage Field is Mandatory";
                if (this.state.videoUrl === "") errors.videoUrl = " video id Field is Mandatory";
            }
            if (this.state.jokeType === "audio") {
                if (this.state.audioUrl === "") errors.audioUrl = " audio mp3 Field is Mandatory";
                if (this.state.thumbnailAudioUrl === "") errors.thumbnailAudioUrl = " audio image Field is Mandatory";
            }
        }

        this.setState({ errors });
        if (Object.keys(errors).length === 0) {

            var data = {
                "funClubId": this.state.funclubId,
                "type": this.state.jokeType,

                "jokeDescription": this.state.discription,
            }
            if (this.state.jokeType === "text") {
                data.thumbnail = this.state.tjokeUrl
                data.jokesUrl = this.state.tjokeUrl
            }
            if (this.state.jokeType === "image") {
                data.thumbnail = this.state.ijokeUrl
                data.jokesUrl = this.state.ijokeUrl
            }
            if (this.state.jokeType === "gif") {
                data.thumbnail = this.state.gjokeUrl
                data.jokesUrl = this.state.gjokeUrl
            }
            if (this.state.jokeType === "video") {
                data.thumbnail = this.state.vthumbnailUrl
                data.jokesUrl = this.state.videoUrl
            }
            if (this.state.jokeType === "audio") {
                data.thumbnail = this.state.thumbnailAudioUrl
                data.jokesUrl = this.state.audioUrl
            }
            this.createJoke(data);
            // console.log("handleSubmit data--->", data);
        }

    }

    createFunClub = () => {
        var _this = this;
        let errors = {};
        if (_this.state.funclubcategoryId === undefined || _this.state.funclubcategoryId === '') {
            errors.funclubCategory = "*mandatory catagory field";
        } if (_this.state.subCategoryId === "" || _this.state.subCategoryId === undefined || _this.state.subCategoryId.length === 0) {
            errors.funclubSubCategory = "*mandatory field";
        }
        if (_this.state.NewFunclubName === undefined || _this.state.NewFunclubName.trim() === '') {
            errors.funclubName = "*mandatory field";
        }
        if (this.state.tags.length === 0) {
            errors.location = "*mandatory field";
        }
        if (this.state.FunclubCelebrityName === undefined || this.state.FunclubCelebrityName.trim() === "") {
            errors.celebrityName = "*mandatory field"
        }
        if (this.state.language === undefined || this.state.language.trim() === "") {
            errors.language = "*mandatory field"
        }
        if (_this.state.FunclubDiscription === undefined || _this.state.FunclubDiscription === '') {
            errors.description = "*mandatory field";
        }
        if (_this.state.FunclubImg === undefined || _this.state.FunclubImg === '') {
            errors.funclubImage = "*mandatory field";
        }

        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            // var cid = this.state.couponId;
            var data = {
                "celebrityName": _this.state.FunclubCelebrityName,
                "funClubImageUrl": _this.state.FunclubImg,
                "funClubDescription": _this.state.FunclubDiscription,
                "location": _this.state.tags,
                "funClubName": _this.state.NewFunclubName,
                "followers": [],
                "catSubCategories": [
                    {
                        "_id": _this.state.funclubcategoryId,
                        "subCategories":
                        _this.state.subCategoryId

                    }
                ]
            }
            // console.log("Funclub Creation Data-----------", data);
            const url = '/FunClub';
            var request = new Request(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    'x-access-token': sessionStorage.getItem('token')
                }
            });
            fetch(request)
                //.then(response => response.json())
                .then(function (response) {
                    if (response.status === 200) {
                        //  console.log("dataresponse", response.data);
                        message.success('Joke added successfully!');
                        //  console.log(response, 'Service Response');
                        _this.setState({ deleteVisible: false });
                        // window.location.href = "/fun-clubs/CreateFunClubJoke";
                        // _this.getFunClubsName();

                    }
                    else {
                        message.error(`unable to add joke.`, 5);
                        // console.log("dataresponse", response);
                    }
                })
        }
    }

    videoOnChange = (e) => {
        //console.log("video url data--->", e.target.value);
        // if (this.state.contestVideoUrl !== '') this.state.errors.contestVideoUrl = '';
        if (e.target.value != '') this.state.errors.videoUrl = "";
        this.setState({ videoUrl: e.target.value });
    }

    createJoke = (data) => {
        var _this = this;
        // console.log("User", sessionStorage.getItem('token'))
        const url = '/FunClubJoke';
        // console.log("url--09-----------90-------->", url);
        var request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                'x-access-token': sessionStorage.getItem('token')
            }
        });
        fetch(request)
            //.then(response => response.json())
            .then(function (response) {
                if (response.status === 200) {
                    //  console.log("dataresponse", response.data);
                    message.success('Joke added successfully!');
                    //  console.log(response, 'Service Response');
                    //   browserHistory.push("/fun2win");
                    //this.getCoins();   
                    //_this.handleReset();
                    _this.setState({
                        jokeType: '',
                        funclubId: '',
                        language: '',
                        thumbnailUrl: '',
                        discription: '',
                        jokeUrl: '',
                        funclubId: '',
                        celName: '',
                        location: '',
                        ijokeUrl: '',
                        gjokeUrl: '',
                        tjokeUrl: '',
                        videoUrl: '',
                        vthumbnailUrl: '',
                        audioUrl: '',
                        thumbnailAudioUrl: ''
                    })

                }
                else {
                    message.error(`unable to add joke.`, 5);
                    //  console.log("dataresponse", response);
                }
            })
    }

    render() {
        //  console.log("this.state funclub", this.state)
        const { tags } = this.state
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const deleteVisible = this.state.deleteVisible
        // console.log("deleteVisible", deleteVisible);
        const { tjokeUrl, gjokeUrl, ijokeUrl, vthumbnailUrl } = this.state
        const jokeUrl = this.state.jokeUrl;
        const thumbnailUrl = this.state.thumbnailUrl;
        const funclubImage = this.state.FunclubImg
        const mapFunClubsName = this.state.funClubsCategories.map((coupon) => <Option value={coupon._id}>{coupon.funClubName}</Option>);
        const mapCategories = this.state.categories.map((category) => <Option value={category._id}>{category.name}</Option>);
        const mapSubCategories = this.state.subCategories.map((subCategory) => <Option value={subCategory._id}>{subCategory.name}</Option>);
        // console.log("mapSubCategories", mapSubCategories);
        return (
            <Dashboard>

                <div className="CreateFunClub">
                    <Row className="CreateFunClubHeader createfunClubSubMenu">
                        <Col span={12}>
                            <h2 className="CreateFunClubsubHeader">Add Joke</h2>
                        </Col>
                        <Col span={4} offset={8}>
                            <Link to="/fun-clubs" ><Button type="primary" className="FunClubsBackButtn"><Icon type="arrow-left" /> Back to Fun Clubs</Button></Link>
                        </Col>
                    </Row>
                    <div className="funClubsbody">
                        <Form>
                            <Row className="CreatefunBody">
                                <Col span={20} classNAame="FunClubsSubBody">
                                    <ul className="list-inline">
                                        <li className="ant-col-8 FunClubSelect">
                                            <h4 className='FunClubsCreate'><span className="RedStar">*</span>Select Fun Club</h4>
                                            <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                                defaultValue="Select Fun Club"
                                                style={{ width: 247 }}
                                                value={this.state.funclubId}
                                                onChange={this.getFunClubsId.bind(this)}>
                                                {/* {this.state.subCategories.length < 0? <h1>No SubCategories available</h1>:{mapSubCategories}}  */}
                                                {mapFunClubsName}
                                                <Option value="CreateNewFunClub" className="DropDownoption">{/*<img src={funclubs1} alt="ContestCover" className="CreateNewFunclubDrop" />*/}<span className="DropDownlistName">Create New Fun Club</span></Option>
                                            </Select>
                                            <p style={{ color: 'red' }} id="points">{this.state.errors.m8}</p> </li>
                                        <li className="ant-col-6 CreateNewFunClub">
                                            <h4 className=''><span className="RedStar"></span></h4>
                                            {/*<Button className="CreatenewFunClubbtn" type="primary" onClick={this.createFunClubModal}>Create New FunClub</Button>*/}</li>
                                    </ul>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <FormItem>
                                        <h4 className='FunClubsCreate'>Description</h4>
                                        <Input placeholder="Enter Description" maxLength="20" name="discription" value={this.state.discription} onChange={this.onChangeDiscription} />
                                        <span id="points" style={{ color: "red" }}>{this.state.errors.m5}</span>
                                    </FormItem>

                                    <FormItem >
                                        <h4 className='FunClubsCreate'><span className="RedStar">*</span>Joke Type</h4>
                                        <Select placeholder="Select Type Of Joke"
                                            getPopupContainer={triggerNode => triggerNode.parentNode}
                                            style={{ width: "100%" }}
                                            value={this.state.jokeType}
                                            onChange={this.selectjokeType}>
                                            <Option value="text">Text</Option>
                                            <Option value="image">Image</Option>
                                            <Option value="video">Video</Option>
                                            <Option value="audio">Audio</Option>
                                            <Option value="gif">Gif</Option>
                                        </Select>
                                    </FormItem>
                                    <span id="points" style={{ color: "red" }}>{this.state.errors.m7}</span>
                                </Col>
                            </Row>
                            <Row>
                                <div className="CFunClubupload">
                                    <FormItem className="FunClubImage">
                                        {this.state.jokeType === "image" ?
                                            <Upload {...props}
                                                listType="picture-card"
                                                className="uploaderimage avatar-uploader"
                                                showUploadList={false}
                                                onChange={this.handleImageChange}
                                                >
                                                {ijokeUrl ? <img src={ijokeUrl} alt="" /> : uploadButton}
                                            </Upload> : null}
                                        <span id="points" style={{ color: "red" }}>{this.state.jokeType === "image" ?
                                            this.state.errors.ijokeUrl : null}</span>
                                    </FormItem>
                                    <FormItem className="FunClubImage">
                                        {this.state.jokeType === "gif" ?
                                            <Upload {...props}
                                                listType="picture-card"
                                                className="uploaderimage avatar-uploader"
                                                showUploadList={false}
                                                onChange={this.handleImageChange1}
                                                >
                                                {gjokeUrl ? <img src={gjokeUrl} alt="" /> : uploadButton}
                                            </Upload> : null}
                                        <span id="points" style={{ color: "red" }}>
                                            {this.state.jokeType === "gif" ? this.state.errors.gjokeUrl : null}</span>
                                    </FormItem>
                                    <FormItem className="FunClubImage">
                                        {this.state.jokeType === "text" ?
                                            <Upload {...props}
                                                listType="picture-card"
                                                className="uploaderimage avatar-uploader"
                                                showUploadList={false}
                                                onChange={this.handleImageChange2}
                                                >
                                                {tjokeUrl ? <img src={tjokeUrl} alt="" /> : uploadButton}
                                            </Upload> : null}
                                        <span id="points" style={{ color: "red" }}>
                                            {this.state.jokeType === "text" ? this.state.errors.tjokeUrl : null}</span>
                                    </FormItem>
                                </div>
                            </Row>
                            <Row>
                                <ul className="Createuploadgif">

                                    <li className="cfunuploadaudio">
                                        {this.state.jokeType === "video" ?
                                            <div className="FunClubsAudios">
                                                <h4 className='FunClubsCreate'>Enter YouTube Video Code</h4>
                                                <Input placeholder="Contest video id" name="contestVideoUrl"
                                                    value={this.state.videoUrl} onChange={this.videoOnChange} />
                                                <span id="points" style={{ color: "red" }}>
                                                    {this.state.jokeType === "video" ? this.state.errors.videoUrl : null}</span>
                                                <a href="https://www.youtube.com/" target="_blank">
                                                    <Icon> <img src={youtubeIcon} className="mrgnTop15" style={{ 'vertical-align': 'middle' }} alt="" /></Icon>
                                                    <Icon type="youtube" />
                                                    <Icon type="codepen" />
                                                </a>
                                                {/* <a href="https://vimeo.com/" target="_blank">
                    <Icon> <img src={vimeoIcon} className="mrgn15" style={{ 'vertical-align': 'middle' }} alt="" /></Icon>
                  </a> */}
                                            </div> : null}
                                        {/*<span id="points" style={{ color: "red" }}>{this.state.errors.m7}</span>*/}
                                    </li>

                                    <li>  <FormItem>
                                        {this.state.jokeType === "video" ?
                                            <div className="upImagefun">
                                                <h4 className='FunClubsCreate'>Upload Thumbnail Image</h4>
                                                <Upload {...props}
                                                    listType="picture-card"
                                                    className="uploaderimage avatar-uploader"
                                                    showUploadList={false}
                                                    onChange={this.handleThumbnaileChange}
                                                    >
                                                    {vthumbnailUrl ? <img src={vthumbnailUrl} alt="" /> : uploadButton}
                                                </Upload>
                                            </div> : null}
                                    </FormItem></li>
                                    <span id="points" style={{ color: "red" }}>
                                        {this.state.jokeType === "video" ? this.state.errors.vthumbnailUrl : null}</span>
                                </ul>
                            </Row>
                            <Row>
                                <ul className="Createuploadgif funClubsUploadgifs">
                                    <li className="cfunuploadaudio">
                                        <FormItem>
                                            {this.state.jokeType === "audio" ?

                                                <Upload  {...props1}
                                                    //showUploadList={false}
                                                    fileList={this.state.fileList}
                                                    onChange={this.handleAudioChange}>
                                                    <Button>
                                                        <Icon type="upload" /> Click to Upload
                                    </Button>
                                                </Upload> : null}
                                            <p>{this.state.jokeType === "audio" ? this.state.audioUrl : null}</p>
                                            <span id="points" style={{ color: "red" }}>
                                                {this.state.jokeType === "audio" ? this.state.errors.audioUrl : null}</span>
                                        </FormItem>
                                    </li>
                                    <li>  <FormItem>
                                        {this.state.jokeType === "audio" ?
                                            <div className="upImagefun">
                                                <h4 className='FunClubsCreate'>Upload Thumbnail Image</h4>
                                                <Upload {...props}
                                                    listType="picture-card"
                                                    className="uploaderimage avatar-uploader"
                                                    showUploadList={false}
                                                    onChange={this.handleThumbnaileChange}
                                                    >
                                                    {this.state.thumbnailAudioUrl ? <img src={this.state.thumbnailAudioUrl} alt="" /> : uploadButton}
                                                </Upload></div> : null}
                                    </FormItem>
                                        <span id="points" style={{ color: "red" }}>
                                            {this.state.jokeType === "audio" ? this.state.errors.thumbnailAudioUrl : null}</span> </li>

                                </ul>
                            </Row>
                            <Row>
                                <ul>
                                    <li>
                                        <div className="CfunBtn">
                                            <Button type="primary" onClick={this.handleSubmit.bind(this)} >Create</Button>
                                        </div>
                                    </li>
                                </ul>
                            </Row>
                        </Form>
                    </div>

                    <Modal className="couponsmodalB"
                        title="Create New Fun Club"

                        visible={deleteVisible}
                        onCancel={this.handledeleteCancel}
                        width='817'
                        style={{ top: 20 }}
                        footer={<FormItem >
                            <Button type="primary" onClick={this.createFunClub}>Save </Button>
                            {/* <Button onClick={this.handledeleteCancel} className="margnLeft20">Cancel </Button> */}
                        </FormItem>}
                        >
                        <Scrollbars className="FunClubModalScroll" style={{ height: '58vh', padding: '0px 10px' }}>
                            <div>
                                <Row className="FunClubsInner">
                                    <Col span={20} className="FunClubsInner2">
                                        <div>
                                            <ul className="list-inline">
                                                <li className="ant-col-12">
                                                    <h4 className='FunClubsCreate createsubFanClub'><span className="RedStar">*</span>Select Category</h4>
                                                    <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                                        placeholder="Select Category"
                                                        style={{ width: 220 }}
                                                        value={this.state.funclubcategoryId || undefined}
                                                        onChange={this.onChangefunclubCategory}>
                                                        {mapCategories}
                                                    </Select>

                                                    <p id="points" className="selectPoints" style={{ color: "red" }}>{this.state.errors.funclubCategory}</p>
                                                </li>

                                            </ul>
                                        </div>
                                        <div>
                                            <ul>
                                                <li className="ant-col-6 funClubSelectSubCategory">
                                                    <h4 className='FunClubsCreate'><span className="RedStar">*</span>Select Sub-Category</h4>
                                                    {/* <Select getPopupContainer={triggerNode => triggerNode.parentNode} defaultValue="Select SubCategory" style={{ width: 244 }} onChange={this.onsubCategoryChange}>
                                        {mapSubCategories}
                                    </Select> */}

                                                    <Select getPopupContainer={triggerNode => triggerNode.parentNode}

                                                        mode="multiple"
                                                        style={{ width: '100%' }}
                                                        placeholder="Select Sub-category"
                                                        onChange={this.onsubCategoryChange}
                                                        value={this.state.subCategoryId || undefined}

                                                        >
                                                        {mapSubCategories}
                                                    </Select>
                                                    <p id="points" className="selectPoints" style={{ color: "red" }}>{this.state.errors.funclubSubCategory}</p>
                                                </li>

                                            </ul>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={18}>
                                        <FormItem>
                                            <h4 className='FunClubsCreate'><span className="RedStar">*</span>Fun Club Name</h4>
                                            <Input placeholder="Enter Fun Club Name" maxLength="20" name="language" value={this.state.NewFunclubName} onChange={this.onChangeFunclubName} />
                                            <span id="points" style={{ color: "red" }}>{this.state.errors.funclubName}</span>
                                        </FormItem>
                                    </Col>
                                    <Col span={18}>
                                        <FormItem>
                                            <h4 className='FunClubsCreate'><span className="RedStar">*</span>Celebrity Name</h4>
                                            <Input placeholder="Enter Celebrity Name" maxLength="20" name="celName" value={this.state.FunclubCelebrityName} onChange={this.onChangeFunclubCelebrityName} />
                                            <span id="points" style={{ color: "red" }}>{this.state.errors.celebrityName}</span>
                                        </FormItem>
                                    </Col>
                                    <Col span={18}>
                                        <FormItem>
                                            <h4 className='FunClubsCreate'><span className="RedStar">*</span>Language</h4>
                                            <Input placeholder="Enter Language" maxLength="20" name="language" value={this.state.language} onChange={this.onChangeLanguage} />
                                            <span id="points" style={{ color: "red" }}>{this.state.errors.language}</span>
                                        </FormItem>
                                        <FormItem>
                                            <h4 className='FunClubsCreate'><span className="RedStar">*</span>Location</h4>
                                            <FormItem>
                                                {/* <Input placeholder="Enter Location" maxLength="20" name="celLocations" /> */}
                                                <PlacesAutoComplete submit44={this.handleMapData} className="ant-input" />
                                                <p className="createerror">{this.state.errors.location}</p>
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
                                        </FormItem>
                                    </Col>
                                    <Col span={18}>
                                        <FormItem>
                                            <h4 className='FunClubsCreate'><span className="RedStar">*</span>FunClub Description</h4>
                                            <Input placeholder="Enter Location" maxLength="20" name="discription" value={this.state.FunclubDiscription} onChange={this.onChangeFunclubDiscription} />
                                            <span id="points" style={{ color: "red" }}>{this.state.errors.description}</span>
                                        </FormItem>
                                    </Col>
                                    <Col span={18}>

                                        <FormItem>
                                            <h4 className='FunClubsCreate'><span className="RedStar">*</span>FunClub Image Url</h4>
                                            <div className="upImagefun">
                                                <Upload {...props}
                                                    listType="picture-card"
                                                    className="uploaderimage avatar-uploader"
                                                    showUploadList={false}
                                                    accept=".png,.jpg,.jpeg"
                                                    onChange={this.funclubImageChange}
                                                    >
                                                    {funclubImage ? <img src={funclubImage} alt="" /> : uploadButton}
                                                </Upload>

                                            </div>
                                            <p id="points" style={{ color: "red" }}>{this.state.errors.funclubImage}</p>
                                        </FormItem>
                                    </Col>
                                </Row>

                            </div>
                        </Scrollbars>
                    </Modal>
                </div>

            </Dashboard>
        );
    }
}

export default CreateFunClub;
/* eslint-disable */