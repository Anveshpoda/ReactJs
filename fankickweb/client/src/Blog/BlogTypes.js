/* eslint-disable */
import React from 'react';
import { browserHistory, Link } from 'react-router';
import { Row, Col, Form, Input, Button, Select, Icon, Upload, message } from 'antd';
import axios from 'axios';
import RichTextEditor from 'react-rte';
import ReactPlayer from 'react-player';
import Dashboard from '../Dashboard/Dashboard';
import './BlogTypes.css';

let uuid = 1;

const fileList = [];

const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;

function handleBlur() {
    console.log('blur');
}

function handleFocus() {
    console.log('focus');
}

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
const props = {
    name: 'file',
    action: 'http://www.fankick.io/rest/azureImageUpload',
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


const props50 = {

    name: 'file',
    action: 'http://www.fankick.io/rest/azureImageUpload',
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

class FormGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            slideTitle: '',
            slideImageUrl: '',
            slideDescription: '',
            slides: [],
        };
        this.handleSlideTitle = this.handleSlideTitle.bind(this);
        this.handleSlideDescription = this.handleSlideDescription.bind(this);
        this.saveSlide = this.saveSlide.bind(this);
        this.deleteSlide = this.deleteSlide.bind(this);
    }

    handleSlideTitle(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log('Blog Title : ', e.target.value);
    }
    handleSlideDescription(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log('Blog Description : ', e.target.value);
    }

    handleSlideImage = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.setState({
                slideImageUrl: info.file.response.data,
                loading: false,
            });
            console.log("image ", this.state.slideImageUrl)
        }
    }

    saveSlide() {
        var obj = {};
        if (sessionStorage.getItem("slides")) {
            var arr = sessionStorage.getItem("slides")
            arr = JSON.parse(arr)
        }else{
            var arr=[];
        }
        obj = {
            slideTitle: this.state.slideTitle,
            slideDescription: this.state.slideDescription,
            slideImageUrl: this.state.slideImageUrl
        }
        arr.push(obj)
        sessionStorage.setItem("slides", JSON.stringify(arr));
        console.log("Total Slide Content : ", sessionStorage.getItem("slides"))
    }

     deleteSlide = (arr, obj) => {
        var obj = {};
        if (sessionStorage.getItem("slides")) {
        var arr = sessionStorage.getItem("slides")
            arr = JSON.parse(arr)
        } else {
        var arr = [];
        }
        obj = {
            slideTitle: this.state.slideTitle,
            slideDescription: this.state.slideDescription,
            slideImageUrl: this.state.slideImageUrl
        }
        const index = arr.indexOf(obj);
        arr.splice(index, 1);
        sessionStorage.setItem("slides", JSON.stringify(arr));
        console.log("Delete Slide: ", sessionStorage.getItem("slides"))

    }

    render() {
        const slideImageUrl = this.state.slideImageUrl;
        return (
            <div>
                <FormItem label='Slide Title'>
                    <Input
                        name='slideTitle'
                        value={this.state.slideTitle}
                        onChange={this.handleSlideTitle} />
                </FormItem>
                <FormItem label='Image Upload'>
                    <Upload {...props50}
                        listType="picture-card"
                        showUploadList={false}
                        onChange={this.handleSlideImage}
                        >
                        <div className='sImg'>
                            {slideImageUrl ? <img src={slideImageUrl} alt="" width='700' height='195' /> : 
                        
                            <div className='sIcon'>
                                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                                <div className="ant-upload-text">Upload</div>
                            </div>
                            }
                        </div>
                    </Upload>
                </FormItem>
                <FormItem label='Slide Description'>
                    <TextArea
                        rows={3}
                        name='slideDescription'
                        value={this.state.slideDescription}
                        onChange={this.handleSlideDescription} />
                </FormItem>
                <FormItem>
                <div className='bBox'>
                    <div className='btns'>
                        <Button onClick={this.saveSlide}>Save</Button>
                    </div>
                    <div className='btns'>
                        <div className='sIcon'>
                            <Button onClick={this.deleteSlide}>Delete</Button>
                        </div>
                    </div>
                </div>
                </FormItem>
            </div>
        );
    }
}

class BlogTypes extends React.Component {
    constructor() {
        super();
        this.state = {
            contestVideoUrl: '',
            blogcontent: RichTextEditor.createEmptyValue(),
            imageUrl: '',
            videoUrl: '',
            loading: false,
            loading1: false,
            title: '',
            authorName: '',
            blogType: '',
            type: '',
            categories: [],
            subCategories: [],
            subCategoryId: '',
            categoryId: '',
            categoryName: '',
            subCategoryName: '',
            player: false,
            slides: [],
            slideTitle: '',
            slideImageUrl: '',
            slideDescription: '',
            data: {},
            numElems: 3,
            rowList: [],
            itemCodes: [],
            itemCode: '',
            current: 0,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChange00 = this.handleChange00.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onsubCategoryChange = this.onsubCategoryChange.bind(this);
        this.bindSubCategories = this.bindSubCategories.bind(this);
        this.onChange7 = this.onChange7.bind(this);
    }

    onChange = (blogcontent) => {
        console.log("Blog Content", blogcontent.toString('html'))
        this.setState({ blogcontent });
        if (this.props.onChange) {
            this.props.onChange(
                blogcontent.toString('html')
            );
        }
    };

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log('Blog Title : ', e.target.value);
    }

    handleChange0 = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            this.setState({
                imageUrl: info.file.response.data,
                loading: false,
            });
            console.log("image ", this.state.imageUrl)
        }
    }

    handleChange00 = (info) => {

        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        }

        if (info.file.status === 'uploading') {
            this.setState({ loading1: true });
            return;
        }

        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                slideImageUrl: info.file.response.data
            }));
            console.log("Slide Image : ", info.file.response.data)
        }
    }

    handleChange1(value) {
        this.setState({
            authorName: value
        });
        console.log('Author Name : ', value);
    }

    selectblogType = (value) => {
        this.setState({ blogType: value });
        console.log('Type of Blogs : ', value);
    }

    getCategories = () => {
        var _this = this;
        var instance = axios.create({
            headers: {
                'x-access-token': sessionStorage.token
            }
        });
        instance.get('/categories').then((response) => {
            _this.setState({ categories: response.data.data });
            // console.log('Categories list :', response.data.data);
        });
    }

    onCategoryChange(value, category) {
        var catid = value;
       // this.setState({ subcategoryId: '' })
        this.bindSubCategories(catid);
        // this.state.categories.forEach((item) => {
        //     if (value === item._id) {
        //         this.setState({ categoryName: item.name });
        //         console.log('Categories : ', item.name);
        //     }
        // }
        // )
        this.setState({ categoryId: catid })
    }

    bindSubCategories(category) {
        this.state.categories.forEach((categorydata) => {
            if (category === categorydata._id) {
                this.setState({
                    subCategories: categorydata.subCategories, subcategoryId: ''
                })
            }
        })
    }
    onsubCategoryChange = (value, category) => {
        var subid = value;
        this.state.subCategories.forEach((item) => {
            if (value === item._id) {
                this.setState({ subCategoryName: item.name });
                console.log('Sub Categories : ', item.name);
            }
        })
        this.setState({ subcategoryId: subid });
    }
    componentWillMount() {
        this.getCategories();
    }
    onChange = (blogcontent) => {
        console.log("blogcontent.toString('html')", blogcontent.toString('html'))
        this.setState({ blogcontent });
        if (this.props.onChange) {
            this.props.onChange(
                blogcontent.toString('html')
            );
        }
    };
    handleChangeTextImage = (info) => {
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
    onChange7 = (e) => {
        this.setState({
            contestVideoUrl: e.target.value,
            player: true
        });
        console.log('video url', e.target.value);
    }
    handleSubmit1 = (event) => {

        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
              

        const {slides} = this.state;
        var value = this.state.blogcontent
        console.log("value", value);
        var hhh = value.toString('html');
        console.log("content variable", hhh)
        if (this.state.contestVideoUrl === '') {
        } else {
            this.setState({ player: true });
        }

        var _red = this;
        if (this.state.blogType === "Text") {

            var data = {
                title: this.state.title,
                categoryId: this.state.categoryId,
                subCategoryId: this.state.subcategoryId,
                category: this.state.categoryName,
                subCategory: this.state.subCategoryName,
                authorName: this.state.authorName,
                blogStatus: event.target.value,
                type: this.state.blogType,


                imageUrl: this.state.imageUrl,
                content: hhh,
            };
        }
        else if (this.state.blogType === "Slides") {
            var slide = sessionStorage.getItem("slides")
            var rr = JSON.parse(slide);
            var data = {
                title: this.state.title,
                categoryId: this.state.categoryId,
                subCategoryId: this.state.subcategoryId,
                category: this.state.categoryName,
                subCategory: this.state.subCategoryName,
                authorName: this.state.authorName,
                blogStatus: event.target.value,
                type: this.state.blogType,


                slides: rr
            };
            sessionStorage.removeItem("slides");
        }
        else if (this.state.blogType === "Video") {
            var data = {
                title: this.state.title,
                categoryId: this.state.categoryId,
                subCategoryId: this.state.subcategoryId,
                category: this.state.categoryName,
                subCategory: this.state.subCategoryName,
                authorName: this.state.authorName,
                blogStatus: event.target.value,
                type: this.state.blogType,

                videoUrl: this.state.contestVideoUrl,
                content: hhh,
            };
        }

        const url = "/createBlog"
        var request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        });
        fetch(request)
            .then(response => response.json())
            .then(function (response) {
                if (response.status === 200) {
                    console.log('all data : ', response);
                } else {
                }
            })
        alert('Blog Successfully created');
        browserHistory.push('/blogPage');
          console.log('Received values of form: ', values);
            }
        });
    }

    handlerAddRow() {
        const rowList = this.state.rowList.concat(FormGroup);
        this.setState({ rowList });
    }
    handleRemoveItem() {
        console.log('remove Item');
    }

    render() {
        console.log("pos4rtrw", this.state.data)

        this.state.categories.forEach((categorydata) => {
            if (categorydata._id === this.state.categoryId) {
                this.state.subCategories = categorydata.subCategories;
            }
        });
        const mapCategories =
            this.state.categories.map((category, i) =>
                <Option key={i} value={category._id}>{category.name}</Option>);
        const mapSubCategories =
            this.state.subCategories.map((subCategory, i) =>
                <Option key={i} value={subCategory._id}>{subCategory.name}</Option>);


        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        const slideImageUrl = this.state.slideImageUrl;

        const { getFieldDecorator, getFieldValue } = this.props.form;


        console.log("this.state in demo", this.state)
        var _this = this;

        const props5 = {
            name: 'file',
            action: 'http://www.fankick.io/rest/azureImageUpload',
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

        const rowList = this.state.rowList.map((row, index) => {
            return (<FormGroup key={index} index={index + 1} field={`"itemCode_"${index}`} />);
        });

        return (
            <div>
                <Dashboard>
                <div>
                <Col span={24} className='blogchallengesmenu'>
                <div className="SubMenu">
                    <Col span={10}><h2 className="pageTitle">Blogs Center</h2></Col>
                    <Col span={14}>
                        <nav role="navigation" className="RghtAlign">
                            <Link to="/blogPage" className='item challengenav' activeClassName='active'>Blog Page</Link>
                            <Link to="/blogTypes"> <Button type="primary" className='createBtn mrgLeft30'>Create New Blog</Button></Link>
                        </nav>
                    </Col>
                    </div>
                </Col>



                  
                        <Col span={24} >
                        <div className="CreateBlogTypeFan">
                            <Col span={15} offset={5} sm={{offset:2}}>
                                <div className='btBox'>
                                    <h3>Blog Types</h3>
                                    <Form className="createBlogForm">
                                        <FormItem label="Blog Title">
                                            {getFieldDecorator('title', {
                                                rules: [
                                                    { required: true, message: 'Slide Title is required!' },
                                                    { max: 100, message: 'Maximum 100 characters' },
                                                    { min: 4, message: 'Minimum 4 characters' },
                                                    { whitespace: true, message: 'No spaces allowed'}],
                                                setFieldsValue: `${this.state.title}`,
                                                
                                            })(
                                                <Input
                                                    placeholder="Enter Blog Title"
                                                    name='title'   maxLength={100}
                                                    //value={this.state.title}
                                                    onChange={this.handleChange} />
                                                )}
                                        </FormItem>
                                        <ul className="list-inline Createblogsselectslist">
                                            <li className="createblogselect1">
                                                <FormItem label="Category">
                                                    {getFieldDecorator('categoryId', {
                                                        rules: [{ required: true, message: 'Please Select Category!' }],
                                                        setFieldsValue: `${this.state.categoryId}`
                                                    })(
                                                        <Select
                                                          getPopupContainer={triggerNode => triggerNode.parentNode}
                                                            showSearch
                                                            style={{ width: 300 }}
                                                            placeholder="Select Category"
                                                            optionFilterProp="children"
                                                            name="categoryId"
                                                            //value={this.state.categoryId}
                                                            onChange={this.onCategoryChange}
                                                            onFocus={handleFocus}
                                                            onBlur={handleBlur}
                                                            >
                                                            {mapCategories}
                                                        </Select>
                                                        )}
                                                </FormItem>
                                            </li>
                                            <li>
                                                <FormItem label=" Sub Category">
                                                    {getFieldDecorator('subcategoryId', {
                                                        rules: [{ required: true, message: 'Please Select Sub-Category!' }],
                                                        //setFieldsValue: `${this.state.subcategoryId}`
                                                    })(
                                                        <Select
                                                          getPopupContainer={triggerNode => triggerNode.parentNode}
                                                            showSearch
                                                            style={{ width: 300 }}
                                                            placeholder="Select Sub Category"
                                                            optionFilterProp="children"
                                                            name="subcategoryId"
                                                            value={this.state.subcategoryId}
                                                            onChange={this.onsubCategoryChange}
                                                            onFocus={handleFocus}
                                                            onBlur={handleBlur}
                                                            >
                                                            {mapSubCategories}
                                                        </Select>
                                                    )}
                                                </FormItem>
                                            </li>
                                        </ul>
                                        <ul className="list-inline Createblogsselectslist"><li className="createblogselect1">
                                            <FormItem label="Author Name">
                                                {getFieldDecorator('authorName', {
                                                    rules: [{ required: true, message: 'Please Select Author Name!' }],
                                                    setFieldsValue: `${this.state.authorName}`
                                                })(
                                                    <Select
                                                      getPopupContainer={triggerNode => triggerNode.parentNode}
                                                        showSearch
                                                        style={{ width: 300 }}
                                                        placeholder="Select Author Name"
                                                        optionFilterProp="children"
                                                        name="authorName"
                                                        //value={this.state.authorName}
                                                        onChange={this.handleChange1}
                                                        onFocus={handleFocus}
                                                        onBlur={handleBlur}
                                                        >
                                                        <Option value="Siddharth">Siddharth</Option>
                                                        <Option value="Swetha">Swetha</Option>
                                                        <Option value="Rakesh">Rakesh</Option>
                                                    </Select>
                                                    )}
                                            </FormItem></li>
                                            <li>
                                                <FormItem label="Blog Type">
                                                    {getFieldDecorator('blogType', {
                                                        rules: [{ required: true, message: 'Please Select type of Blog!' }],
                                                        setFieldsValue: `${this.state.blogType}`
                                                    })(
                                                        <Select
                                                        getPopupContainer={triggerNode => triggerNode.parentNode}
                                                            showSearch
                                                            style={{ width: 300 }}
                                                            placeholder="Select Blog Type"
                                                            optionFilterProp="children"
                                                            name="blogType"
                                                            onChange={this.selectblogType}
                                                            onFocus={handleFocus}
                                                            onBlur={handleBlur}
                                                            >
                                                            <Option value="Text">Text Blog</Option>
                                                            {/*<Option value="Slides">Slide Blog</Option>*/}
                                                            <Option value="Video">Video Blog</Option>
                                                        </Select>
                                                        )}
                                                </FormItem></li>
                                            <li className="suballowesinblog">
                                                <FormItem>
                                                    {this.state.blogType === "Text" ?
                                                        <div>
                                                            <h3>Text Blog</h3>
                                                            <FormItem label="Upload Image">
                                                                {getFieldDecorator('image', {
                                                                    rules: [{ required: true, message: 'Image is required!' }],
                                                                })(
                                                                    <Upload {...props}
                                                                        listType="picture-card"
                                                                        //className="avatar-uploader"
                                                                        showUploadList={false}
                                                                        //beforeUpload={beforeUpload}
                                                                        onChange={this.handleChangeTextImage}
                                                                        accept=".png,.jpg,.jpeg"
                                                                        >
                                                                        {imageUrl ? <div className='tbImg'><img src={imageUrl} alt="" width='650' height='194' /> </div> :

                                                                            <div className='tbIcon'>
                                                                                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                                                                                <div className="ant-upload-text">Upload</div>
                                                                            </div>
                                                                        }
                                                                    </Upload>
                                                                    )}
                                                            </FormItem>
                                                            <FormItem label="Description">

                                                                <RichTextEditor
                                                                    name="blogcontent"
                                                                    value={this.state.blogcontent}
                                                                    onChange={this.onChange}
                                                                    />

                                                            </FormItem>
                                                        </div> : null}
                                                </FormItem>
                                            </li>
                                            <li>
                                                <FormItem>
                                                    {this.state.blogType === "Slides" ?
                                                        <div>
                                                            <h3>Slide Blog</h3>
                                                            <div className="slidecontainer">
                                                                <div>
                                                                {rowList}
                                                                    <Button type="primary" onClick={this.handlerAddRow.bind(this)}><Icon type='plus-circle-o'/>Add Slide</Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        : null}
                                                </FormItem>
                                            </li>
                                            <li className="suballowesinblog20">
                                                <FormItem>
                                                    {this.state.blogType === "Video" ?
                                                        <div>
                                                            <h3>Video Blog</h3>
                                                            <Form>
                                                                <FormItem label="Video Url">
                                                                    {getFieldDecorator('contestVideoUrl', {
                                                                        rules: [{ required: true, message: 'Video Url is required!' }],
                                                                        //setFieldsValue: `${this.state.blogcontent}`
                                                                    })(
                                                                        <Input
                                                                            placeholder="Video Url"
                                                                            name="videoUrl"
                                                                            value={this.state.contestVideoUrl}
                                                                            onChange={this.onChange7} />
                                                                        )}
                                                                </FormItem>
                                                                {
                                                                    this.state.player ?
                                                                        <ReactPlayer
                                                                            config={{ youtube: { playerVars: { showinfo: 1 } } }}
                                                                            url={this.state.contestVideoUrl} /> : ""
                                                                }
                                                                <FormItem label="Video Description">

                                                                    <RichTextEditor calssName="CreateBlogsRichText"
                                                                        name="blogcontent"
                                                                        value={this.state.blogcontent}
                                                                        onChange={this.onChange}
                                                                        />

                                                                </FormItem>
                                                            </Form>
                                                        </div> : null}
                                                </FormItem>
                                            </li>
                                        </ul>
                                        <FormItem>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                value="Created"
                                                onClick={this.handleSubmit1.bind()}
                                                >
                                                Submit
                                       </Button>
                                        </FormItem>
                                    </Form>
                                </div>
                            </Col>
                            </div>
                        </Col>
                    
                  </div>
                </Dashboard>
            </div>
        );
    }
}

export default Form.create()(BlogTypes);
/* eslint-disable */