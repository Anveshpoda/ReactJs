/* eslint-disable */
import React from 'react';
import {  Link } from 'react-router';
import { Row, Col, Form, Input, Button, Select, Icon, Upload, message } from 'antd';
import Dashboard from '../Dashboard/Dashboard';
import axios from 'axios';
import RichTextEditor from 'react-rte';
import { browserHistory } from 'react-router';
import ReactPlayer from 'react-player';
import './EditBlogTypes.css';


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

const props3 = {
    name: 'file',
    action: 'http://www.fankick.io/rest/azureImageUpload',
    listType: 'picture',
    defaultFileList: [...fileList],
    onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
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
    componentWillMount(){
        sessionStorage.removeItem("slides")
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
        } else {
            var arr = [];
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

    deleteSlide = (arr, obj, index) => {
        
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
        
        arr.indexOf(obj);
        arr.splice(index, 1);
        sessionStorage.setItem("slides", JSON.stringify(arr));
        console.log("Delete Slide: ", sessionStorage.getItem("slides")); 
        console.log('index : ', index);
        }

    componentWillReceiveProps(nextProps){
        this.setState({slides:nextProps.editData})
        sessionStorage.setItem("slides",JSON.stringify(nextProps.editData))
        }

    render() {
        console.log("adasdasd",this.props.editData)
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const slideImageUrl = this.state.slideImageUrl;
        var slide=this.state.slides?
        this.state.slides.map((item) => {
            return (
                <div>
                    <FormItem label='Slide Title'>
                        <Input
                            name='slideTitle'
                            value={item.slideTitle}
                            onChange={this.handleSlideTitle} />
                    </FormItem>
                    <FormItem label='Upload Image'>
                        <Upload {...props50}
                            listType="picture-card"
                            showUploadList={false}
                            onChange={this.handleSlideImage}
                            >
                            <div className='sImg'>
                                {item.slideImageUrl ? <img src={item.slideImageUrl} alt="" width='700' height='195' /> : uploadButton}
                            </div>
                        </Upload>
                    </FormItem>
                    <FormItem label='Slide Description'>
                        <TextArea
                            rows={3}
                            name='slideDescription'
                            value={item.slideDescription}
                            onChange={this.handleSlideDescription} />
                    </FormItem>
                    <FormItem>
                <div className='bBox'>
                    <div className='btns'>
                        <Button onClick={this.saveSlide}>Save</Button>
                    </div>
                    <div className='btns'>
                        <div className='sIcon'>
                            <Button onClick={this.deleteSlide.bind(this, this.index)}>Delete</Button>
                        </div>
                    </div>
                </div>
                </FormItem>
                </div>
            );
        }):null
        return(
            <div>
            {slide?slide:<div>
                    <FormItem>
                        <Input
                            name='slideTitle'
                            value={this.state.slideTitle}
                            onChange={this.handleSlideTitle} />
                    </FormItem>
                    <FormItem>
                        <Upload {...props50}
                            listType="picture-card"
                            showUploadList={false}
                            onChange={this.handleSlideImage}
                            >
                            <div className='sImg'>
                                {this.state.slideImageUrl ? <img src={this.state.slideImageUrl} alt="" width='700' height='195' /> : uploadButton}
                            </div>
                        </Upload>
                    </FormItem>
                    <FormItem>
                        <TextArea
                            rows={3}
                            name='slideDescription'
                            value={this.state.slideDescription}
                            onChange={this.handleSlideDescription} />
                    </FormItem>
                    <FormItem>
                        <Button onClick={this.saveSlide}>Save</Button>
                        <Button onClick={this.deleteSlide}>Delete</Button>
                    </FormItem>
                </div>}
            </div>
        )
    }
}


class BlogTypes extends React.Component {
    constructor() {
        super();
        this.state = {
            blogcontent: RichTextEditor.createEmptyValue(),
            imageUrl: '',
            videoUrl: '',
            loading: false,
            loading1: false,
            title: '',
            authorName: '',
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
            data: [],
            rowList: [],
            itemCodes: [],
            itemCode: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onsubCategoryChange = this.onsubCategoryChange.bind(this);
        this.bindSubCategories = this.bindSubCategories.bind(this);
        this.onChange7 = this.onChange7.bind(this);
        this.EditBlogData = this.EditBlogData.bind(this);
        this.handleChangeTextImage = this.handleChangeTextImage.bind(this);
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

    handleChange1(value) {
        this.setState({
            authorName: value
        });
        console.log('Author Name : ', value);
    }

    handleChange2 = (e) => {
        if (this.state.videoUrl !== '') this.state.errors.videoUrl = '';
        this.setState({ videoUrl: e.target.value });
    }
    onChange7 = (e) => {
        this.setState({
            videoUrl: e.target.value,
            player: true
        });
        console.log('video url', e.target.value);
    }

    selectblogType = (value) => {
        this.setState({ type: value });
        console.log('Type of Blogs : ', value);
    }

    getCategories = () => {
        var _this = this;
        var instance = axios.create({
            headers:{
                'x-access-token':sessionStorage.token
            }
        });
        instance.get('/categories').then((response) => {
            _this.setState({ categories: response.data.data });
            console.log('Categories list :', response.data.data);

        });
    }

    onCategoryChange(value, category) {
        var catid = value;
        this.setState({ subcategoryId: '' })
        this.bindSubCategories(catid);
        this.state.categories.forEach((item) => {
            if (value === item._id) {
                this.setState({ categoryName: item.name });
                console.log('Categories : ', item.name);
            }
        }
        )
        this.setState({ categoryId: catid })
    }

    bindSubCategories(category) {
        this.state.categories.forEach((categorydata) => {
            if (category === categorydata._id) {
                this.setState({
                    subCategories: categorydata.subCategories
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

    componentWillMount() {
        if (this.props.params.id !== undefined) {
            var req = axios.create({
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            req.get('/getBlog/' + this.props.params.id).then((response) => {
                console.log("get response", response.data.data)
                this.setState({ data: response.data.data[0] });
                this.setState({ title: this.state.data.title });
                this.setState({ authorName: this.state.data.authorName });
                this.setState({ categoryId: this.state.data.categoryId });
                this.setState({ categoryId: this.state.data.categoryId });
                this.setState({ categoryName: this.state.data.category });
                this.setState({ subCategoryName: this.state.data.subCategory });
                this.setState({ subcategoryId: this.state.data.subCategoryId });
                this.setState({ type: this.state.data.type });


                this.setState({ imageUrl: this.state.data.imageUrl });
                this.setState({ videoUrl: this.state.data.videoUrl, player: true });
                this.setState({ blogcontent: RichTextEditor.createValueFromString(this.state.data.content, 'html') });

                this.setState({ slides: this.state.data.slides });
            })
        }
        this.getCategories();
    }

    EditBlogData(event, props) {

          event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {

        var value = this.state.blogcontent
        console.log("value", value);

        var contentData = value.toString('html');
        console.log("content variable", contentData)

        if (this.state.videoUrl === '') {
            alert("please Enter player id")
        } else {
            this.setState({ player: true });
        }
        if (this.state.type === "Text") {
            console.log('ddddd', this.state.type);

            var data = {
                title: this.state.title,
                categoryId: this.state.categoryId,
                subCategoryId: this.state.subcategoryId,
                category: this.state.categoryName,
                subCategory: this.state.subCategoryName,
                authorName: this.state.authorName,
                blogStatus: event.target.value,
                type: this.state.type,


                imageUrl: this.state.imageUrl,
                content: contentData,
            };
        } else if (this.state.type === "Slides") {
            var slide=sessionStorage.getItem("slides");
            var arr=JSON.parse(slide);
            var data = {
                title: this.state.title,
                categoryId: this.state.categoryId,
                subCategoryId: this.state.subcategoryId,
                category: this.state.categoryName,
                subCategory: this.state.subCategoryName,
                authorName: this.state.authorName,
                blogStatus: event.target.value,
                type: this.state.type,
                slides: arr
            };
            sessionStorage.removeItem("slides")
        } else if (this.state.type === "Video") {
            var data = {
                title: this.state.title,
                categoryId: this.state.categoryId,
                subCategoryId: this.state.subcategoryId,
                category: this.state.categoryName,
                subCategory: this.state.subCategoryName,
                authorName: this.state.authorName,
                blogStatus: event.target.value,
                type: this.state.type,

                videoUrl: this.state.videoUrl,
                content: contentData,
            };
        }
        console.log("value: ", event.target.value);
        var req = axios.create({
            headers: {
                'Content-Type': 'application/json'
            }
        });
        req.put('/editBlog/' + this.props.params.id, data).then((response) => {
            console.log("put response", response.data.data);
            alert('Blog Successfully Edited');
            browserHistory.push('/blogPage');

        })
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

        console.log("Received Data: ", this.state.data.slides)
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
            onRemove(info) {
                _this.setState({ slideImageUrl: '' });
            }
        };

        const rowList = this.state.rowList.map((row, index) => {
            return (<FormGroup key={index} index={index + 1} field={`"itemCode_"${index}`} />);
        });

        return (
            <div>
                <Dashboard>
                <Row>
                 <Col span={24} className='blogchallengesmenu'>
                <div className="SubMenu">
                    <Col span={10}><h2 className="pageTitle">Edit Blog</h2></Col>
                    <Col span={14}>
                        <nav role="navigation" className="RghtAlign">
                            <Link to="/blogPage" className='item challengenav' activeClassName='active'><Button type="primary">Back to Blog Page</Button></Link>
                          
                        </nav>
                    </Col>
                    </div>
                </Col>


                </Row>
              
                    <Row>
                      <div className="CreateBlogTypeFan">
                        <Col span={24} >
                            <Col span={15} offset={5} sm={{offset:2}}>
                                <div className='btBox'>
                                    <h3>Edit Blog Types</h3>
                                    <Form className="createBlogForm" onSubmit={this.handleSubmit}>
                                        <FormItem label="Blog Title">
                                            {getFieldDecorator('title', {
                                                rules: [{ required: true, message: 'Slide Title is required!' },
                                                { max: 100, message: 'Maximum 100 characters' },
                                                { min: 4, message: 'Minimum 4 characters' },
                                                  { whitespace: true, message: 'No spaces allowed'}
                                                ],
                                                initialValue: `${this.state.title}`
                                            })(
                                                <Input
                                                    placeholder="Enter Blog Title"
                                                    name='title'  maxLength={100}
                                                    onChange={this.handleChange} />
                                                )}
                                        </FormItem>
                                        <ul className="list-inline">
                                            <li className="EditBlogSelect1">
                                                <FormItem label="Category">
                                                    {getFieldDecorator('category', {
                                                        rules: [{ required: true, message: 'Please Select Category!' }],
                                                        initialValue: `${this.state.categoryName}`
                                                    })(
                                                        <Select
                                                          getPopupContainer={triggerNode => triggerNode.parentNode}
                                                            showSearch
                                                            style={{ width: 300 }}
                                                            placeholder="Select Category"
                                                            optionFilterProp="children"
                                                            name="categoryId"
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
                                                    {getFieldDecorator('subCategory', {
                                                        rules: [{ required: true, message: 'Please Select Sub-Category!' }],
                                                        initialValue: `${this.state.subCategoryName}`
                                                    })(
                                                        <Select
                                                          getPopupContainer={triggerNode => triggerNode.parentNode}
                                                            showSearch
                                                            style={{ width: 300 }}
                                                            placeholder="Select Sub Category"
                                                            optionFilterProp="children"
                                                            name="subcategoryId"
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
                                        <ul className="list-inline"><li className="EditBlogSelect1">
                                            <FormItem label="Author Name">
                                                {getFieldDecorator('authorName', {
                                                    rules: [{ required: true, message: 'Please Select Author Name!' }],
                                                    initialValue: `${this.state.authorName}`
                                                })(
                                                    <Select
                                                      getPopupContainer={triggerNode => triggerNode.parentNode}
                                                        showSearch
                                                        style={{ width: 300 }}
                                                        placeholder="Select Author Name"
                                                        optionFilterProp="children"
                                                        name="authorName"
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
                                                        initialValue: `${this.state.type}`
                                                    })(
                                                        <Select
                                                          getPopupContainer={triggerNode => triggerNode.parentNode}
                                                            showSearch
                                                            style={{ width: 300 }}
                                                            placeholder="Select Blog Type"
                                                            optionFilterProp="children"
                                                            name="type"
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
                                            <li className="suballowesinblog20">
                                                <FormItem>
                                                    {this.state.type === "Text" ?
                                                        <div>
                                                            <h3>Text Blog</h3>
                                                            <FormItem label="Upload Image">
                                                                {getFieldDecorator('image', {
                                                                    rules: [
                                                                        { required: true, message: 'Image is required!' },
                                                                        { whitespace: true, message: 'No spaces allowed'}],
                                                                    initialValue: `${this.state.imageUrl}`
                                                                })(
                                                                    <Upload {...props}
                                                                        listType="picture-card"
                                                                        //className="avatar-uploader"
                                                                        showUploadList={false}
                                                                        beforeUpload={beforeUpload}
                                                                        //value={this.state.imageUrl}
                                                                        onChange={this.handleChangeTextImage}
                                                                        >
                                                                        {imageUrl ? <div className='tbImg'><img src={imageUrl} alt="" width='700' height='194' /></div> : uploadButton}
                                                                    </Upload>
                                                                    )}
                                                            </FormItem>
                                                            <FormItem>
                                                                <RichTextEditor
                                                                    name="blogcontent"
                                                                    value={this.state.blogcontent}
                                                                    onChange={this.onChange} />
                                                            </FormItem>
                                                        </div> : null}
                                                </FormItem>
                                            </li>
                                            <li>
                                                <FormItem>
                                                    {this.state.type === "Slides" ?
                                                        <div>
                                                            <h3>Slide Blog</h3>
                                                            <div className="slidecontainer">
                                                                <div>
                                                                <div  className='asBut'>
                                                                    <Button type="primary" onClick={this.handlerAddRow.bind(this)}>
                                                                        <Icon type='plus-circle-o'/>
                                                                            Add Slide
                                                                    </Button>
                                                                </div> 
                                                                        {rowList}
                                                                    <FormGroup editData={this.state.slides} />
                                                                </div>
                                                            </div>

                                                        </div> : null}
                                                </FormItem>
                                            </li>
                                            <li className="suballowesinblog20">
                                                <FormItem>
                                                    {this.state.type === "Video" ?
                                                        <div>
                                                            <h3>Video Blog</h3>
                                                            <Form>
                                                                <FormItem label="Video Url">
                                                                    <Input
                                                                        placeholder="Video Url"
                                                                        name="videoUrl"
                                                                        value={this.state.videoUrl}
                                                                        onChange={this.onChange7} />
                                                                </FormItem>
                                                                {
                                                                    this.state.player ?
                                                                        <div >
                                                                            <ReactPlayer
                                                                                config={{ youtube: { playerVars: { showinfo: 1 } } }}
                                                                                url={this.state.videoUrl}
                                                                                className='eplay'
                                                                                width='700' />
                                                                        </div> : ""
                                                                }
                                                                <FormItem label="Enter Blog Text">
                                                                    <RichTextEditor name="blogcontent"
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
                                                onClick={this.EditBlogData.bind()}
                                                >
                                                Submit
                                       </Button>
                                        </FormItem>
                                    </Form>
                                </div>
                            </Col>
                        </Col>
                        </div>
                    </Row>
                    
                </Dashboard>
            </div>
        );
    }
}

export default Form.create()(BlogTypes);
/* eslint-disable */