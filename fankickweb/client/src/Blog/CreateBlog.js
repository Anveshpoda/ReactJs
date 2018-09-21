/* eslint-disable */
import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, Form, Icon, Input, Button, Select, DatePicker, Upload, message } from 'antd';
import './blog.css';
import Dashboard from '../Dashboard/Dashboard';
const FormItem = Form.Item;
const Option = Select.Option;
// select dropdown
function handleChange(value) {
    console.log(`selected ${value}`);
}

function handleBlur() {
    console.log('blur');
}

function handleFocus() {
    console.log('focus');
}
// datepicker
function onChange(date, dateString) {
    console.log(date, dateString);
}
//uploadImg

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

class CreateBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createSlideblog: false,
            blogTitle: "",
            categoryName: "",
            categoryId: "",
            subCategoryName: "",
            subCategoryId: "",
            authorName: "",
            slides: [],
            type: "",
            categories: [],
            subCategories: [],
            slideTitle: "",
            slideImageUrl: "",
            slideDescription: "",
            
        }
        this.bindSlides = this.bindSlides.bind(this)
    }
    componentWillMount() {
        var req = axios.create({
            headers: {
                'x-access-token': sessionStorage.token
            }
        })
        req.get('/categories').then((res) => {
            this.setState({ categories: res.data.data })
        })
    }
    getnewslide = () => {
        this.setState({ createSlideblog: true });
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
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    }
    handleBlogTitle = (e) => {
        this.setState({ blogTitle: e.target.value })
    }
    handleCategory = (e) => {
        this.setState({ categoryId: e })
        this.state.categories.map((item) => {
            if (e === item._id) {
                this.setState({ categoryName: item.name, subCategories: item.subCategories })
            }
        })
    }
    handleSubCategory = (e) => {
        this.setState({ subCategoryId: e })
        this.state.subCategories.map((item) => {
            if (e === item._id) {
                this.setState({ subCategoryName: item.name })
            }
        })
    }
    handleAuthorName = (e) => {
        this.setState({ authorName: e })
    }
    handleBlogType = (e) => {
        this.setState({ type: e })
    }
    handleSlideTitle = (e) => {
        this.setState({ slideTitle: e.target.value })
    }
    handleSlideImage = (info) => {
        if (info.file.status === "done") {
            message.success("Image Uploaded Successfully")
            console.log("dfasdad", info.file.response.data)
            this.setState({ slideImageUrl: info.file.response.data })
        }
    }
    handleSlideDesc = (e) => {
        this.setState({ slideDescription: e.target.value })
    }
    handleSave = () => {
        var obj = {
            slideTitle: this.state.slideTitle,
            slideImageUrl: this.state.slideImageUrl,
            slideDescription: this.state.slideDescription
        }
        this.state.slides.push(obj);
        console.log("dsdf", this.state.slides)
        this.render()
    }
    handleAddSlide = () => {
        this.setState({ createSlideblog: true });
    }
    bindSlides = () => {
        var {slides} = this.state;
        console.log("dqadasdasd", slides.length)
        if (slides.length != 0) {
            slides.map((item, index) => <div>
                <img src={item.slideImageUrl} style={{ width: 80, height: 80 }} />
                <h5>{item.slideTitle}</h5>
                <p>{item.slideDescription}</p>
                <Button>Edit</Button>
                <Button>Delete</Button>
            </div>)
        }
    }
    render() {
        console.log("rendering", this.state.slides)
        const props = {
            name: 'file',
            action: process.env.REACT_APP_API_HOST + '/rest/azureImageUploadWeb',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                // console.log("info", info)
                if (info.file.status !== 'uploading') {
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        // var slides;
        // if (this.state.slides.length != 0) {
        //     slides = this.state.slides.map((item, index) => <div>
        //         <img src={item.slideImageUrl} style={{ width: 80, height: 80 }} />
        //         <h5>{item.slideTitle}</h5>
        //         <p>{item.slideDescription}</p>
        //         <Button>Edit</Button>
        //         <Button>Delete</Button>
        //     </div>);
        // }
        // console.log("saasd",slides)
        
      //  console.log("slides map",slides);
        const imageUrl = this.state.imageUrl;
        var categories = this.state.categories.map((item) => <Option value={item._id}>{item.name}</Option>)
        var subCategories = this.state.subCategories.map((item) => <Option value={item._id}>{item.name}</Option>)
        return (
            <div>
                <Dashboard>
                    <Row>
                        <Col span={24}>

                            <Col span={14} offset={5}>
                                <h3>Create Blog</h3>
                                <Form className="createBlogForm">
                                    <FormItem label="Blog Title">
                                        <Input placeholder="Enter Blog Title" onChange={this.handleBlogTitle} />
                                    </FormItem>
                                    <ul className="list-inline">
                                        <li>
                                            <FormItem label="Category">
                                                <Select
                                                    showSearch
                                                    style={{ width: 300 }}
                                                    placeholder="Select Category"
                                                    optionFilterProp="children"
                                                    onChange={this.handleCategory}
                                                    onFocus={handleFocus}
                                                    onBlur={handleBlur}
                                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                    >
                                                    {categories}
                                                </Select>
                                            </FormItem></li>
                                        <li>
                                            <FormItem label=" Sub Category">
                                                <Select
                                                    showSearch
                                                    style={{ width: 300 }}
                                                    placeholder="Select Sub Category"
                                                    optionFilterProp="children"
                                                    onChange={this.handleSubCategory}
                                                    onFocus={handleFocus}
                                                    onBlur={handleBlur}
                                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                    >
                                                    {subCategories}
                                                </Select>
                                            </FormItem></li>
                                    </ul>
                                    <ul className="list-inline"><li>
                                        <FormItem label="Author Name">
                                            <Select
                                                showSearch
                                                style={{ width: 300 }}
                                                placeholder="Select Author Name"
                                                optionFilterProp="children"
                                                onChange={this.handleAuthorName}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                >
                                                <Option value="Swetha">Swetha</Option>
                                                <Option value="Kumar">Kumar</Option>
                                                <Option value="Ishahak">Ishahak</Option>
                                            </Select>
                                        </FormItem></li>
                                        <li>
                                            <FormItem label="Blog type">
                                                <Select
                                                    showSearch
                                                    style={{ width: 300 }}
                                                    placeholder="Select blog type"
                                                    optionFilterProp="children"
                                                    onChange={this.handleBlogType}
                                                    onFocus={handleFocus}
                                                    onBlur={handleBlur}
                                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                    >
                                                    <Option value="Text">Text</Option>
                                                    <Option value="Video">Video</Option>
                                                    <Option value="Slides">Slide</Option>
                                                </Select>
                                            </FormItem>
                                        </li>
                                    </ul>
                                    {this.state.createSlideblog ? <div><FormItem label="slide Title">
                                        <Input placeholder="Enter Slide Title" onChange={this.handleSlideTitle} />
                                    </FormItem>
                                        <FormItem label="Upload Image">
                                            <Upload {...props}
                                                onChange={this.handleSlideImage}
                                                className="uploaderchlng avatar-uploader"
                                                showUploadList={false}
                                                accept=".png,.jpg,.jpeg"
                                                >
                                                {this.state.slideImageUrl ? <img src={this.state.slideImageUrl} alt="" /> : uploadButton}
                                            </Upload>

                                        </FormItem>
                                        <FormItem label="Enter Blog Text"><Input rows={4} onChange={this.handleSlideDesc} /></FormItem>
                                        <FormItem>
                                            <Button type="primary" onClick={this.handleSave.bind(this)}>Save slide</Button>
                                        </FormItem></div> : ""}
                                    {this.state.type === "Slides" ? <Button type="primary" onClick={this.handleAddSlide}>Add Slide</Button> : ""}
                                    {/*this.state.createSlideblog ?
                                        <div>
                                            <FormItem label="slide Title">
                                                <Input placeholder="Enter Blog Title" />
                                            </FormItem>
                                            <FormItem label="Upload Image">
                                                <Upload
                                                    name="avatar"
                                                    listType="picture-card"
                                                    className="avatar-uploader"
                                                    showUploadList={false}
                                                    action="//jsonplaceholder.typicode.com/posts/"
                                                    beforeUpload={beforeUpload}
                                                    onChange={this.handleChange}
                                                    >
                                                    {imageUrl ? <img src={imageUrl} alt="" /> : uploadButton}
                                                </Upload>

                                            </FormItem>
                                            <FormItem label="Enter Blog Text"><Input rows={4} /></FormItem>
                                        </div>
                                        : null*/}
                                    <FormItem>
                                        <Button type="primary">Create</Button>
                                    </FormItem>
                                    <FormItem>
                                      <Comment slides={this.state.slides}/>

                                    </FormItem>
                                </Form>
                            </Col>
                        </Col>
                    </Row>
                </Dashboard>
            </div>

        );
    }
}

export default CreateBlog;
/* eslint-disable */