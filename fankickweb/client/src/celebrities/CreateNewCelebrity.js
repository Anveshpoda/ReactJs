/* eslint-disable */
import React from 'react';
import Dashboard from '../Dashboard/Dashboard'
import { Link, browserHistory } from 'react-router';
import { Icon, Input, Col, Button, Radio, Tabs, Tag, Tooltip, Select, Row, Upload, message, Form } from 'antd';
import PlacesAutoComplete from '../pushnotifications/Custom/PlaceAutoComplete';
import css from './Celebrities.css';
import axios from 'axios';
const { TextArea } = Input;
const Option = Select.Option;


const FormItem = Form.Item;
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


class CreateNewCelebrity extends React.Component {
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
      subCategoryIds: []
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    this.loadCategories();
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
    console.log(this.state)
  }

  onSubCategoryChange = (e) => {
    // console.log(e)
    this.setState({
      subCategoryId: e.key,
      subCategoryName: e.label
    });
  }

  onMultipleSubCategoryChange = (e) => {
    console.log(e)
    this.setState({
      subCategoryIds: e
    })
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
    if (this.state[e.target.name].length > 0) this.state.errors[e.target.name] = ''
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    let errors = {}
    if (this.state.celebrityName.trim() === '') errors.celebrityName = 'CelebrityName Required'
    if (this.state.gender === '') errors.gender = 'Gender Required'
    if (this.state.imageUrl === '' || this.state.imageUrl === '') errors.imageUrl = 'ImageUrl Required'
    if (this.state.categoryId === '' || this.state.categoryName === '') errors.categoryName = 'Category Required'
    // if (this.state.subCategoryId === '') errors.subCategoryName = 'Sub-Category Required'
    if (this.state.celebrityCountry === '') errors.celebrityCountry = 'Country Required'
    if (this.state.celebrityRole.trim() === '') errors.celebrityRole = 'Role Required'
    if (this.state.subCategoryIds.length === 0) errors.subCategoryName = 'Select Sub-Category'
    if (this.state.tags.length === 0) errors.location = 'Select Atleast One Location'
    this.setState({ errors })
    if (Object.keys(errors).length == 0) {
      let celebrityDetails = {
        'celebrityName': this.state.celebrityName.trim(),
        'categoryName': this.state.categoryName,
        'categoryId': this.state.categoryId,
        // 'subCategoryName': this.state.subCategoryName,
        // 'subCategoryId': this.state.subCategoryId,
        'subCategoryId': this.state.subCategoryIds,
        'occupation': this.state.celebrityRole,
        'celebrityImageUrl': this.state.imageUrl,
        'gender': this.state.gender,
        'country': this.state.celebrityCountry,
        'createdDateTime': new Date().toISOString(),
        'updatedDateTime': new Date().toISOString(),
        'location': this.state.tags,
        'songs': [],
        'trailers': [],
        'photos': [],
        'comments': [],
        'pinnedUsers': [],
      }
      this.createCelebrity(celebrityDetails)
    }
  }

  createCelebrity = (data) => {
    const url = '/celebrity';
    var request = new Request(url, {
      method: 'POST',
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
          message.success('Celebrity has been created successfully!');
          console.log('response', response)
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
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    const { categories, subCategories, tags } = this.state
    const mapCategories = categories.map((category) => <Option value={category._id}>{category.name}</Option>)
    const mapSubCategories = subCategories.map((subCategory) => <Option value={subCategory._id}>{subCategory.name}</Option>)
    return (
      <Dashboard>
        <div className="CreateCelebrity">
          <Row className="CreateCelebrityHeader createCelebSubMenu">
            <Col span={16}>
              <h2 className="CreateCelebsmaintitle">Create Celebrity</h2>

            </Col>
            <Col span={8}>
              <Link to="/celebritydata"> <Button type="primary" className='celebscreateBtn'>Back To Celebrity</Button></Link>
            </Col>
          </Row>
          <div className="CreateCardCelebrities">
            <Form>
              <Row className="CereateCelebsName">
                <h4>Celebrity Name</h4>
                <Col span={8}>
                  <FormItem>
                    <Input autoComplete={'off'} placeholder="Enter Celebrity Name" maxLength="20" name="celebrityName" onChange={this.handleInputChange} />
                    <p className="createerror">{this.state.errors.celebrityName}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <h4>Gender</h4>
                <Col span={3} xs={12} sm={12} xl={3} lg={5} md={5} className="">
                  <FormItem>
                    <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                      defaultValue="Select Gender"
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
                      style={{ width: '190px' }}>
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
              <h4>Select Sub-Category (You can select multiple sub-categories) </h4>
              <Row>
                <Col span={8}>
                  <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    value={this.state.subCategoryIds}
                    onChange={this.onMultipleSubCategoryChange}
                    >
                    {mapSubCategories}
                  </Select>
                  <p className="createerror">{this.state.errors.subCategoryName}</p>
                </Col>
              </Row>
              <Row>
                <Col span={8} className="CelebsRolesSkill">
                  <h4>Role/Skill</h4>
                  {/* <FormItem>
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    defaultValue={['a10', 'c12']}
                    onChange={handleChange}
                    >
                    {children}
                  </Select>
                </FormItem>*/}
                  <FormItem>
                    <Input placeholder="Enter Role/Skill" autoComplete={'off'} maxLength="20" name="celebrityRole" onChange={this.handleInputChange} />
                  </FormItem>
                  <p className="createerror">{this.state.errors.celebrityRole}</p>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <h4>Country</h4>
                  <FormItem>
                    <Input placeholder="Country" autoComplete={'off'} maxLength="20" name="celebrityCountry" onChange={this.handleInputChange} />
                  </FormItem>
                  <p className="createerror">{this.state.errors.celebrityCountry}</p>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <h4>Location (You can add multiple locations)</h4>
                  {/*  <FormItem>
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    defaultValue={['a10', 'c12']}
                    onChange={handleChange}
                    >
                    {children}
                  </Select>
                </FormItem>*/}
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
                </Col>
              </Row>
              <Row>
                <Col span={5} offset={14}>
                  <Button className="CreateCelebrityfinalButton" type="primary" onClick={this.handleSubmit.bind(this)}>Create Celebrity</Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Dashboard>
    );
  }
};

export default CreateNewCelebrity;
/* eslint-disable */