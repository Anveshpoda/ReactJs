/* eslint-disable */
import React from 'react';
import axios from 'axios';
import Dashboard from '../Dashboard/Dashboard'
import classnames from 'classnames';
import { Col, Row, Button, Radio, Form, Input, Select, Icon, Upload, message, Modal, Tag } from 'antd';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import funclubs from './funclub.css';
import { Scrollbars } from 'react-custom-scrollbars';
import youtubeIcon from '../images/youtube.png';
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
// const props = {
//     name: 'file',
//     action: 'https://dev.fankick.io/rest/azureImageUploadWeb',
//     headers: {
//         authorization: 'authorization-text',
//     },
//     onChange(info) {
//         if (info.file.status !== 'uploading') {
//         }
//         if (info.file.status === 'done') {
//             message.success(`${info.file.name} file uploaded successfully`);
//         } else if (info.file.status === 'error') {
//             message.error(`${info.file.name} file upload failed.`);
//         }
//     },
// };

// const props1 = {
//     name: 'file',
//     action: 'https://dev.fankick.io/rest/azureImageUploadWeb',
//     headers: {
//         authorization: 'authorization-text',
//     },
//     onChange(info) {
//         if (info.file.status !== 'uploading') {
//         }
//         if (info.file.status === 'done') {
//             message.success(`${info.file.name} file uploaded successfully`);
//         } else if (info.file.status === 'error') {
//             message.error(`${info.file.name} file upload failed.`);
//         }
//     },
//     onRemove(info) {
//         this.setState({ jokeUrl: '' });
//     }

// };
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
            thumbnailUrl: '',
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
            deletevisible: false,
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
            locationArray: []
        }
        //  this.getFunClubsId = this.getFunClubsId.bind(this);
        this.bindSubCategories = this.bindSubCategories.bind(this);
        //   this.onCategoryChange = this.onCategoryChange.bind(this);
        //  this.onsubCategoryChange = this.onsubCategoryChange.bind(this);
        //  this.onChangeCelebrityName = this.onChangeCelebrityName.bind(this);
        //  this.selectjokeType = this.selectjokeType.bind(this);
        //  this.onChangeDiscription = this.onChangeDiscription.bind(this);
        //   this.onChangeLocation = this.onChangeLocation.bind(this);
        //  this.onChangeLanguage = this.onChangeLanguage.bind(this);
        this.handleAudioChange = this.handleAudioChange.bind(this);
        this.onChangefunclubCategory = this.onChangefunclubCategory.bind(this);
        this.onChangefunclubsubCategory = this.onChangefunclubsubCategory.bind(this);
    }
    state = {
        loading: false,
    };


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
        // this.getFunClubsName();
        this.getCategories();
    }

    // getFunClubsName = () => {
    //     //  console.log("User -----------", sessionStorage.getItem('token'))
    //     var instance = axios.create({
    //         headers: { 'x-access-token': sessionStorage.getItem('token') }
    //     });
    //     instance.get('/getFunClubNames').then((response) => {
    //         //     console.log("FunClub Names -----------", response.data.data);
    //         this.setState({ funClubsCategories: response.data.data });
    //     });
    // }

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

    // onCategoryChange = (e) => {
    //     console.log(e)
    //     this.setState({
    //         subCategoryIds: []
    //     })
    //     // if (e) {
    //     //   this.state.errors.categoryName = ''
    //     //   this.state.errors.subCategoryName = ''
    //     // }
    //     this.setState({
    //         categoryId: e
    //     });
    //     this.bindSubCategories(e)
    // }


    onChangefunclubCategory(e, category) {
        var catid = e;
      //  console.log("Category Id------------------------", e);
        this.setState({ funclubcategoryId: catid });
        // this.getCategorieswise(e);
        this.bindSubCategories(e);
    }

    // getFunClubsId(e) {
    //     var funclubname = e;
    //     // console.log("Funclub Name:------>", funclubname);
    //     this.setState({
    //         funclubId: funclubname
    //     })
    //     // this.fetchRequest(coupontype);
    // }

    bindSubCategories(category) {
        // var a = this.state.categories.map((categorydata) => {
        //     if (category === categorydata._id) {
        //         this.setState({
        //             subCategories: categorydata.subCategories
        //         })
        //     }
        // })
        this.state.categories.map((categorydata) => {
            if (category === categorydata._id) {
                this.setState({
                    subCategories: categorydata.subCategories,
                    funclubsubCategoryId: categorydata.subCategories[0]._id,
                    subCategoryName: categorydata.subCategories[0].name
                })

            }
        })
       // console.log(this.state)
    }

    // onsubCategoryChange = (e) => {
    //     // var subid = value;
    //     // //   console.log("subCategory Id------------------------", subid);
    //     // this.setState({ subCategoryId: value });
    //     // // this.getCelebrities(subid);
    //     // // this.getSubCategoriesWise(subid);
    //     // console.log(e)
    //     this.setState({
    //         subCategoryId: e,
    //     });
    // }

    onChangefunclubsubCategory = (e) => {
        var subid = e;
       // console.log("subCategory Id------------------------", subid);
        this.setState({ funclubsubCategoryId: e });
        // this.getCelebrities(subid);
        // this.getSubCategoriesWise(subid);
    }

    // selectjokeType = (e) => {
    //     //  console.log("selectjokeType------------------------", e);
    //     this.setState({ jokeType: e });

    // }
    // onChangeCelebrityName = (e) => {
    //     this.setState({ celName: e.target.value });
    // }

    // onChangeLocation = (e) => {
    //     this.setState({ location: e.target.value });
    // }

    // onChangeLanguage = (e) => {
    //     this.setState({ language: e.target.value });
    // }

    // onChangeDiscription = (e) => {
    //     this.setState({ discription: e.target.value });
    // }

    onChangeFunclubCelebrityName = (e) => {
        this.setState({ FunclubCelebrityName: e.target.value });
    }

    onChangeFunclubLocation = (e) => {
        this.setState({ FunclubLocation: e.target.value });
    }

    onChangeFunclubName = (e) => {
        this.setState({ NewFunclubName: e.target.value });
    }

    onChangeFunclubDiscription = (e) => {
        this.setState({ FunclubDiscription: e.target.value });
    }

    // handleImageChange = (info) => {
    //     if (info.file.type === "image/png" || info.file.type === "image/jpg" || info.file.type === "image/jpeg" || info.file.type === "image/gif") {
    //         if (info.file.status === 'done') {
    //             message.success(`Image uploaded successfully`);
    //             //   if (info.file.response.data !== '') this.state.errors.jokeUrl = '';
    //             this.setState({
    //                 jokeUrl: info.file.response.data,
    //                 thumbnailUrl: info.file.response.data
    //             });
    //             // console.log("image url", this.state.jokeUrl)
    //         }
    //     } else {
    //         console.log("super");
    //         //   let errors = {};
    //         //   if (this.state.jokeUrl === '') errors.jokeUrl = "Only Image is required."
    //         //   this.setState({ errors });
    //         //   if (Object.keys(errors).length === 0) {
    //         //     
    //         //   }
    //     }
    // }

    funclubImageChange = (info) => {
        if (info.file.type === "image/png" || info.file.type === "image/jpg" || info.file.type === "image/jpeg" || info.file.type === "image/gif") {
            if (info.file.status === 'done') {
                message.success(`Image uploaded successfully`);
                //   if (info.file.response.data !== '') this.state.errors.jokeUrl = '';
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

    // handleThumbnaileChange = (info) => {
    //     if (info.file.type === "image/png" || info.file.type === "image/jpg" || info.file.type === "image/jpeg" || info.file.type === "image/gif") {
    //         if (info.file.status === 'done') {
    //             message.success(`Image uploaded successfully`);
    //             //   if (info.file.response.data !== '') this.state.errors.jokeUrl = '';
    //             this.setState({
    //                 // jokeUrl: info.file.response.data,
    //                 thumbnailUrl: info.file.response.data
    //             });
    //             console.log("image url", this.state.jokeUrl)
    //         }
    //     } else {
    //         console.log("super");
    //         //   let errors = {};
    //         //   if (this.state.jokeUrl === '') errors.jokeUrl = "Only Image is required."
    //         //   this.setState({ errors });
    //         //   if (Object.keys(errors).length === 0) {
    //         //    
    //         //   }
    //     }
    // }

    // handleAudioChange = (info) => {
    //     var _this = this;
    //     if (info.file.type === "audio/mp3" || info.file.type === "audio/x-m4a") {
    //         {
    //             message.success(`Audio file uploaded successfully`);
    //             // if (info.file.response.data !== '') this.state.errors.jokeUrl = '';
    //             var audioUrl = info.file.response;
    //         }
    //         //   console.log("super---->1111", _this.state.jokeUrl);
    //     } else {
    //         //   let errors = {};
    //         //   if (this.state.jokeUrl === '') errors.jokeUrl = "Only audio is required."
    //         //   this.setState({ errors });
    //         //   if (Object.keys(errors).length === 0) {
    //         console.log("super");
    //         // }
    //     }
    //     this.getAuidUrl(audioUrl);
    // }

    getAuidUrl = (audioUrl) => {
       // console.log("super---->1111", audioUrl);
        this.setState({ jokeUrl: audioUrl.data });
    }

    handledeleteCancel = (e) => {
        this.setState({ deletevisible: false });
    }

    createFunClubModal = () => {
        this.setState({ deletevisible: true });
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

    // handleSubmit = (e) => {
    //     //e.preventDefault();
    //     var _this = this;
    //     // console.log('state data-------->', this.state);
    //     // console.log('state data-------->', this.state.coins.id);
    //     // this.props.form.validateFields((err, values) => {
    //     //   if (!err) {
    //     // console.log('Received values of form: ', values);
    //     //console.log('state data', this.state);
    //     // message.destroy();
    //     let errors = {};
    //     if (this.state.funclubId === undefined || this.state.funclubId === '') {
    //         errors.m8 = "FunClub is mandatory";
    //     }
    //     // else if (this.state.celName === "" || this.state.celName === undefined) {
    //     //     errors.m1 = "Celebrity is mandatory";
    //     // }
    //     else if (this.state.language === undefined || this.state.language === '') {
    //         errors.m3 = "Language is mandatory";
    //     }
    //     // else if (this.state.location === undefined || this.state.location === '') {
    //     //     errors.m2 = "Location is mandatory";
    //     // }
    //     else if (this.state.discription === undefined || this.state.discription === '') {
    //         errors.m5 = "Discription is mandatory";
    //     }
    //     else if (this.state.thumbnailUrl === undefined || this.state.thumbnailUrl === '') {
    //         errors.m4 = "Thumbnail is Mandatory";
    //     }
    //     else if (this.state.jokeUrl === undefined || this.state.jokeUrl === '') {
    //         errors.m7 = "Field is Mandatory";
    //     }

    //     this.setState({ errors });
    //     if (Object.keys(errors).length === 0) {
    //         // var cid = this.state.couponId;
    //         var data = {
    //             "funClubId": this.state.funclubId,
    //             "type": this.state.jokeType,
    //             "language": this.state.language,
    //             "location": this.state.tags,
    //             // "thumbnail": "https://fankickdev.blob.core.windows.net/images/sportsJan302018_2.png",
    //             // "jokesUrl": "https://fankickdev.blob.core.windows.net/images/sportsJan302018_2.png",
    //             "thumbnail": this.state.thumbnailUrl,
    //             "jokesUrl": this.state.jokeUrl,
    //             "jokeDescription": this.state.discription,
    //             "celebrityName": [this.state.celName],
    //             "catSubCategories": [{
    //                 "_id": this.state.categoryId,
    //                 "subCategories": this.state.subCategoryId
    //             }]
    //         }
    //         this.createJoke(data);
    //         console.log("handleSubmit data--->", data);
    //     }
    //     // console.log("handleSubmit data--->", cid);
    // }

    createFunClub = () => {
        var _this = this;
        let errors = {};
        if (_this.state.FunclubCelebrityName === undefined || _this.state.FunclubCelebrityName === '') {
            errors.m8 = "FunClub Celebrity is mandatory";
        } else if (_this.state.funclubcategoryId === "" || _this.state.funclubcategoryId === undefined) {
            errors.m1 = "FunClub Category is mandatory";
        }
        else if (_this.state.NewFunclubName === undefined || _this.state.NewFunclubName === '') {
            errors.m3 = "Funclub Name is mandatory";
        }
        else if (_this.state.FunclubLocation === undefined || _this.state.FunclubLocation === '') {
            errors.m2 = "Location is mandatory";
        }
        else if (_this.state.FunclubDiscription === undefined || _this.state.FunclubDiscription === '') {
            errors.m5 = "Discription is mandatory";
        }
        else if (_this.state.FunclubImg === undefined || _this.state.FunclubImg === '') {
            errors.m7 = "FumClub Image is Mandatory";
        }

        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            // var cid = this.state.couponId;
            var data = {
                "celebrityName": _this.state.FunclubCelebrityName,
                "funClubImageUrl": _this.state.FunclubImg,
                "funClubDescription": _this.state.FunclubDiscription,
                "location": [_this.state.FunclubLocation],
                "funClubName": _this.state.NewFunclubName,
                "followers": [],
                "catSubCategories": [
                    {
                        "_id": _this.state.funclubcategoryId,
                        "subCategories": [
                            _this.state.funclubsubCategoryId
                        ]
                    }
                ]
            }
            //console.log("Funclub Creation Data-----------", data);
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
                        _this.setState({ deletevisible: false });

                    }
                    else {
                        message.error(`unable to add joke.`, 5);
                      //  console.log("dataresponse", response);
                    }
                })
        }



    }

    // videoOnChange = (e) => {
    //     //console.log("video url data--->", e.target.value);
    //     // if (this.state.contestVideoUrl !== '') this.state.errors.contestVideoUrl = '';
    //     this.setState({ jokeUrl: e.target.value });
    // }

    // createJoke = (data) => {
    //     var _this = this;
    //     // console.log("User", sessionStorage.getItem('token'))
    //     const url = '/FunClubJoke';
    //     // console.log("url--09-----------90-------->", url);
    //     var request = new Request(url, {
    //         method: 'POST',
    //         body: JSON.stringify(data),
    //         headers: {
    //             "Content-Type": "application/json",
    //             'x-access-token': sessionStorage.getItem('token')
    //         }
    //     });
    //     fetch(request)
    //         //.then(response => response.json())
    //         .then(function (response) {
    //             if (response.status === 200) {
    //                 //  console.log("dataresponse", response.data);
    //                 message.success('Joke added successfully!');
    //                 //  console.log(response, 'Service Response');
    //                 //   browserHistory.push("/fun2win");
    //                 //this.getCoins();   
    //                 //_this.handleReset();
    //                 _this.setState({
    //                     jokeType: '',
    //                     language: '',
    //                     thumbnailUrl: '',
    //                     discription: '',
    //                     jokeUrl: '',
    //                     funclubId: '',
    //                     celName: '',
    //                     location: ''
    //                 })

    //             }
    //             else {
    //                 message.error(`unable to add joke.`, 5);
    //                 console.log("dataresponse", response);
    //             }
    //         })
    // }

    render() {
        const { tags } = this.state
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const jokeUrl = this.state.jokeUrl;
        const thumbnailUrl = this.state.thumbnailUrl;
        const funclubImage = this.state.FunclubImg
        const mapFunClubsName = this.state.funClubsCategories.map((coupon) => <Option value={coupon._id}>{coupon.funClubName}</Option>);
        const mapCategories = this.state.categories.map((category) => <Option value={category._id}>{category.name}</Option>);
        const mapSubCategories = this.state.subCategories.map((subCategory) => <Option value={subCategory._id}>{subCategory.name}</Option>);
        return (
            <div>
                <Row className="FunClubsInner">
                    <Col span={20} className="FunClubsInner2">
                        <ul className="list-inline">
                            <li className="ant-col-12">   <h4 className=''><span className="RedStar">*</span>Select Category</h4>
                                <Select getPopupContainer={triggerNode => triggerNode.parentNode} defaultValue="Select Category" style={{ width: 220 }} onChange={this.onChangefunclubCategory}>
                                    {mapCategories}
                                </Select></li>
                            <li> <h4 className=''><span className="RedStar">*</span>Select SubCategory</h4>
                                <Select getPopupContainer={triggerNode => triggerNode.parentNode} defaultValue="Select SubCategory" style={{ width: 220 }} onChange={this.onChangefunclubsubCategory}>
                                    {/* {this.state.subCategories.length < 0? <h1>No SubCategories available</h1>:{mapSubCategories}}  */}
                                    {mapSubCategories}
                                </Select></li>
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col span={18}>
                        <FormItem>
                            <h4 className=''><span className="RedStar">*</span>FunClub Name</h4>
                            <Input placeholder="Enter FunClub Name" maxLength="20" name="language" value={this.state.NewFunclubName} onChange={this.onChangeFunclubName} />
                            <span id="points" style={{ color: "red" }}>{this.state.errors.m3}</span>
                        </FormItem>
                        <FormItem>
                            <h4 className=''><span className="RedStar">*</span>Celebrity Name</h4>
                            <Input placeholder="Enter Celebrity Name" maxLength="20" name="celName" value={this.state.FunclubCelebrityName} onChange={this.onChangeFunclubCelebrityName} />
                            <span id="points" style={{ color: "red" }}>{this.state.errors.m1}</span>
                        </FormItem>
                        <FormItem>
                            <h4 className=''><span className="RedStar">*</span>Location</h4>
                            <Input placeholder="Enter Location" maxLength="20" name="location" value={this.state.FunclubLocation} onChange={this.onChangeFunclubLocation} />
                            <span id="points" style={{ color: "red" }}>{this.state.errors.m2}</span>
                        </FormItem>
                        <FormItem>
                            <h4 className=''><span className="RedStar">*</span>FunClub Description</h4>
                            <Input placeholder="Enter Location" maxLength="20" name="discription" value={this.state.FunclubDiscription} onChange={this.onChangeFunclubDiscription} />
                            <span id="points" style={{ color: "red" }}>{this.state.errors.m5}</span>
                        </FormItem>

                        <FormItem >
                            <h4 className=''><span className="RedStar">*</span>FunClub Image Url</h4>
                            <div className="upImagefun">
                                <Upload {...props}
                                    listType="picture-card"
                                    className="uploaderimage avatar-uploader"
                                    showUploadList={false}
                                    onChange={this.funclubImageChange}
                                >
                                    {funclubImage ? <img src={funclubImage} alt="" /> : uploadButton}
                                </Upload></div>
                        </FormItem>
                    </Col>
                </Row>
                <FormItem >
                    <Button type="primary" onClick={this.createFunClub}>Save </Button>
                    {/* <Button onClick={this.handledeleteCancel} className="margnLeft20">Cancel </Button> */}
                </FormItem>
            </div>
        );
    }
}

export default CreateFunClub;
/* eslint-disable */