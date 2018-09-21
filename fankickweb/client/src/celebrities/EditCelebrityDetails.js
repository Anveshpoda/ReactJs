/* eslint-disable */
import React from 'react';
import Dashboard from '../Dashboard/Dashboard'
import { Link, browserHistory } from 'react-router';
import { Icon, Form, Input, Col, Button, Radio, Tabs, Tag, Tooltip, Select, Row, Upload, message } from 'antd';
import PlacesAutoComplete from '../pushnotifications/Custom/PlaceAutoComplete';
import css from './Celebrities.css';
import axios from 'axios';
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;


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
            message.success(`Image uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};


class EditCelebrityDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            celebrityName: '',
            celebrityRole: '',
            celebrityCountry: '',
            categories: [],
            subCategories: [],
            categoryId: '',
            categoryName: '',
            subCategoryId: '',
            subCategoryName: '',
            imageUrl: '',
            gender: '',
            tags: [],
            locationArray: [],
            errors: {},
            celebrityData: {},
            subCategoryIds: []
        };
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillMount() {
        // console.log(this.props.params._id)

        this.loadCategories();
        this.loadCelebrityDetails(this.props.params._id)
    }

    componentDidMount() {
      
    }

    loadCelebrityDetails = (id) => {
        var instance = axios.create({
            timeout: 1000,
            headers: { 'x-access-token': sessionStorage.getItem('token') }
        });
        instance.get('/celebrity/' + id).then((response) => {
            this.setState({
                celebrityData: response.data.data,
                celebrityName: response.data.data.celebrityName,
                gender: response.data.data.gender,
                imageUrl: response.data.data.celebrityImageUrl,
                celebrityRole: response.data.data.occupation,
                tags: response.data.data.location,
                categoryName: response.data.data.categoryName,
                categoryId: response.data.data.categoryId,
                celebrityCountry: response.data.data.country
            })
           // console.log(response.data.data.country)
            if (response.data.data.subCategoryId) {
                this.bindSubCategories(response.data.data.categoryId)
                // this.setState({
                //     subCategoryId: response.data.data.subCategoryId,
                //     subCategoryName: response.data.data.subCategoryName
                // })
                this.setState({
                    subCategoryIds: response.data.data.subCategoryId
                })
            }
        });
    }


    loadCategories = () => {
        var instance = axios.create({
            timeout: 1000,
            headers: { 'x-access-token': sessionStorage.getItem('token') }
        });
        instance.get('/categories/').then((response) => {
            this.setState({
                categories: response.data.data
            })
        });
    }

    onCategoryChange = (e) => {
        this.setState({
            subCategoryIds: []
        })
        if (e) {
            this.state.errors.categoryName = ''
            this.state.errors.subCategoryName = ''
        }
        this.setState({
            categoryId: e.key,
            categoryName: e.label
        });
        this.bindSubCategories(e.key)
    }

    bindSubCategories = (category) => {
        // if (category) {
        //   this.state.errors.category = '';
        //   this.state.errors.subCategoryId = ''
        // }
        this.state.categories.map((categorydata) => {
            if (category === categorydata._id) {
                this.setState({
                    subCategories: categorydata.subCategories,
                    subCategoryId: categorydata.subCategories[0]._id,
                    subCategoryName: categorydata.subCategories[0].name
                })

            }
        })
    }

    onMultipleSubCategoryChange = (e) => {
        // console.log("onchange",e.length);
        // console.log("state subcatagories",this.state.subCategoryIds.length);
        // // var ids=this.state.subCategoryIds;
        // // var eids=e;
        this.setState({
            subCategoryIds: e
        })
    }
    // testFunc =(e) =>{
    //     console.log(this.state.subCategoryIds, 'subcategories')
    //     // this.state.subCategoryIds.filter(subcat => subcat._id !== e)
    //     if(this.state.subCategoryIds.includes(e)){
    //         message.info('You cannot remove already existing sub-categories')
    //         this.setState({subCategoryIds: this.state.subCategoryIds})
    //         console.log(this.state.subCategoryIds, 'Subcategory ids ')
    //     }
    // }
    onSubCategoryChange = (e) => {
        console.log(e)
        this.setState({
            subCategoryId: e.key,
            subCategoryName: e.label
        });
    }

    onGenderChange = (e) => {
        if (e) this.state.errors.gender = ''
        this.setState({ gender: e })
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


    uploadImage = (info) => {

        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            message.success(`Image uploaded successfully`);
            if (info.file.response.data !== '') this.state.errors.imageUrl = '';
            this.setState({
                imageUrl: info.file.response.data,
                loading: false
            })
        }
    }

    handleInputChange = (e) => {
        if (this.state[e.target.name] !== '') this.state.errors[e.target.name] = ''
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("this",this.state)
        let errors = {}
        if (this.state.celebrityName.trim() === '') errors.celebrityName = 'CelebrityName Required'
        if (this.state.gender === '' || this.state.gender ===  undefined) errors.gender = 'Gender Required'
        if (this.state.imageUrl === '' || this.state.imageUrl === '') errors.imageUrl = 'ImageUrl Required'
        if (this.state.categoryId === '' || this.state.categoryName === '') errors.categoryName = 'Category Required'
        // if (this.state.subCategoryId === '') errors.subCategoryName = 'Sub-Category Required'
        if (this.state.celebrityCountry === '' || this.state.celebrityCountry === undefined) errors.celebrityCountry = 'Celebrity Country Required'
        if (this.state.celebrityRole === '') errors.celebrityRole = 'Role Required'
        if (this.state.subCategoryIds.length == 0) errors.subCategoryName = 'Sub-Category Required'
        if (this.state.tags.length == 0) errors.location = 'Select Atleast One Location'
        this.setState({ errors })
        if (Object.keys(errors).length == 0) {
            let celebrityDetails = {
                'celebrityName': this.state.celebrityName.trim(),
                'categoryName': this.state.categoryName,
                'categoryId': this.state.categoryId,
                // 'subCategoryName': this.state.subCategoryName,
                // 'subCategoryId': this.state.subCategoryId,
                'country': this.state.celebrityCountry,
                'subCategoryId': this.state.subCategoryIds,
                'occupation': this.state.celebrityRole,
                'celebrityImageUrl': this.state.imageUrl,
                'gender': this.state.gender,
                'updatedDateTime': new Date().toISOString(),
                'location': this.state.tags
            }
            this.createCelebrity(celebrityDetails, this.state.celebrityData._id)
        }
    }

    createCelebrity = (data, id) => {
        const url = '/celebrity/' + id;
        var request = new Request(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                'x-access-token': sessionStorage.token
            }
        });
        fetch(request)
            .then(response => response.json())
            .then(function (response) {
                if (response.status === 200) {
                    message.success('Celebrity has been updated successfully!');
                    browserHistory.push("/celebritydata");
                }
                else {
                    if (response.data.code == 11000)
                        message.error(`Duplicate Celebrity, create with a different name!`);
                    else {
                        message.error('Error Occured in Creating Celebrity');
                        console.log('Celebrity Creation Error', response);
                    }
                }
            })
    }

    render() {
       console.log("this.state",this.state);
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
 
        
            for (let key in this.state.categories) {   
                var categorydata = this.state.categories[key];           
                if (categorydata._id === this.state.categoryId) {
                    this.state.subCategories = categorydata.subCategories
                  }
              } 
        
     
        const imageUrl = this.state.imageUrl;
        var { categories, tags } = this.state
        var mapCategories = categories.map((category) => <Option value={category._id}>{category.name}</Option>)
        var mapSubCategories =  this.state.subCategories.map((subCategory) => <Option value={subCategory._id}>{subCategory.name}</Option>)
        return (
            <Dashboard>
                <div className="CreateCelebrity">
                    <Row className="CreateCelebrityHeader createCelebSubMenu">
                        <Col span={16}>
                            <h2 className="CreateCelebsmaintitle">Edit Celebrity</h2>

                        </Col>
                        <Col span={8}>
                            <Link to="/celebritydata"> <Button type="primary" className='CelebritiyEditbtn'>Back To Celebrity</Button></Link>
                        </Col>
                    </Row>
                    <div className="CreateCardCelebrities">
                        <Form>
                            <Row className="CereateCelebsName">
                                <h4>Celebrity Name</h4>
                                <Col span={8}>
                                    <FormItem>
                                        <Input autoComplete={'off'} placeholder="Enter Celebrity Name" maxLength="20" name="celebrityName" value={this.state.celebrityName} onChange={this.handleInputChange} disabled />
                                        <p className="createerror">{this.state.errors.celebrityName}</p>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <h4>Gender</h4>
                              <Col span={3} xs={12} sm={12} xl={3} lg={5} md={5} className="">
                                    <FormItem>
                                        <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                            value={this.state.gender}
                                            onChange={this.onGenderChange} >
                                            <Option value='Male'>Male</Option>
                                            <Option value='Female'>Female</Option>
                                        </Select>
                                        <p className="createerror">{this.state.errors.gender}</p>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <h4>Celebrity Image</h4>
                                <Col span={4}>
                                    <FormItem>
                                        <div className="CelebrityUploadImage">
                                            {/* <Upload {...props}
                                            name="avatar"
                                            listType="picture-card"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            onChange={this.uploadImage}
                                            accept=".png,.jpg,.jpeg"
                                        > */}
                                            <Upload {...props}
                                                className="avatar-uploader"
                                                listType="picture-card"
                                                showUploadList={false}
                                                onChange={this.uploadImage}
                                                accept=".png,.jpg,.jpeg"
                                            >
                                                {imageUrl ? <img src={imageUrl} alt="" /> : uploadButton}
                                            </Upload>
                                            <p className="createerror">{this.state.errors.imageUrl}</p>
                                        </div>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4}>
                                    <h4>Select Category</h4>
                                    <FormItem>
                                        <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                            defaultValue={{ key: "Select Category" }}
                                            onChange={this.onCategoryChange}
                                            labelInValue
                                            value={{ key: this.state.categoryId }}
                                            style={{ width: '190px' }}
                                            disabled>
                                            {mapCategories}
                                        </Select>
                                        <p className="createerror">{this.state.errors.categoryName}</p>
                                    </FormItem>
                                </Col>
                                {/* <Col span={4} className="CreateCelebsSubCategory">
                                <h4>Select Sub Category</h4>
                                <FormItem>
                                    <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                        defaultValue={{ key: "Select SubCategory" }}
                                        onChange={this.onSubCategoryChange}
                                        labelInValue
                                        value={{ key: this.state.subCategoryId }}
                                        style={{ width: '190px' }}>
                                        {mapSubCategories}
                                    </Select>
                                    <p className="createerror">{this.state.errors.subCategoryName}</p>
                                </FormItem>
                            </Col> */}
                            </Row>
                            <h4>Select Multiple Sub-Categories</h4>
                            <Row>
                                <Col span={8}>
                                    <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                                        mode="multiple"
                                        style={{ width: '100%' }}
                                        placeholder="Please select"
                                        value={this.state.subCategoryIds || undefined}
                                        onChange={this.onMultipleSubCategoryChange}
                                        onDeselect={this.testFunc}
                                    >
                                        {mapSubCategories}
                                    </Select>
                                    <p className="createerror">{this.state.errors.subCategoryName}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8} className="EditCelebSkillrole">
                                    <h4>Role/Skill</h4>
                                    <FormItem>
                                        <Input placeholder="Enter Role/Skill" maxLength="20" name="celebrityRole" value={this.state.celebrityRole} onChange={this.handleInputChange} />
                                    </FormItem>
                                    <p className="createerror">{this.state.errors.celebrityRole}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <h4>Country</h4>
                                    <FormItem>
                                        <Input placeholder="Country" maxLength="20" name="celebrityCountry" value={this.state.celebrityCountry} onChange={this.handleInputChange} />
                                    </FormItem>
                                    <p className="createerror">{this.state.errors.celebrityCountry}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <h4>Location you Can Add multiple Locations</h4>
                                    <FormItem>
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
                                </Col>
                            </Row>
                            <Row>
                                <Col span={5} offset={14}>
                                    <Button className="CreateCelebrityfinalButton" type="primary" onClick={this.handleSubmit.bind(this)}>Update Celebrity</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </Dashboard>
        );
    }
};

export default EditCelebrityDetails;
/* eslint-disable */