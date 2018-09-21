/* eslint-disable */
import React, { Component } from 'react';
import { Modal, Col, Icon, Row, Button } from 'antd';
import { Link } from 'react-router';
import './ShowBlog.css';
import moment from 'moment';
import Dashboard from '../Dashboard/Dashboard';
import { Scrollbars } from 'react-custom-scrollbars';
import RichTextEditor from 'react-rte';
import ReactPlayer from 'react-player';
import axios from 'axios';
import AddComment from './AddComment';



//import RichTextEditor from 'react-rte';

class Blogview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            readOnly: true,
            authorName: '',
            title: '',
            blogcontent: '',
            imageUrl: '',
            blogStatus: '',
            publishedDate: '',
            data: {},
            modalid: '',
            value: RichTextEditor.createEmptyValue(),
            countViews: ''
        };
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
                this.setState({ title: response.data.data[0].title });
                this.setState({ authorName: response.data.data[0].authorName });
                this.setState({ publishedDate: moment(response.data.data[0].publishedDate).format('DD MMM YYYY') });
                this.setState({ categoryId: response.data.data[0].categoryId });
                this.setState({ categoryName: response.data.data[0].category });
                this.setState({ subCategoryName: response.data.data[0].subCategory });
                this.setState({ subcategoryId: response.data.data[0].subCategoryId });
                this.setState({ imageUrl: response.data.data[0].imageUrl });
                this.setState({ videoUrl: response.data.data[0].videoUrl });
                this.setState({ blogStatus: response.data.data[0].blogStatus });
                this.setState({ countViews: response.data.data[0].countViews });
                this.setState({ value: RichTextEditor.createValueFromString(response.data.data[0].content, 'html') })
            })
        }
    }



    render() {

        if (this.state.data.type == 'Video') {
            var img = <div>
                <ReactPlayer className="ShowBlogReactplayers"
                    config={{ youtube: { playerVars: { showinfo: 1 } } }}
                    url={this.state.videoUrl}
                   
                    height="500" />
            </div>
        } else {
            var img = <div>
                <img src={this.state.imageUrl} className="viewblogimg" alt="coverimg" />
            </div>
        }

        return (
            <div>
                <Dashboard>
                    <Row>
                        <Col span={24} className='blogchallengesmenu'>
                            <div className="SubMenu">
                                <Col span={10}><h2 className="pageTitle">Blog Details</h2></Col>
                                <Col span={14}>
                                    <nav role="navigation" className="RghtAlign">
                                        <Link to="/blogPage" className='item challengenav' activeClassName='active'><Button type="primary">Back to Blog Page</Button></Link>

                                    </nav>
                                </Col>
                            </div>
                        </Col>


                    </Row>

                    <Row>
                        <div className="CreateBlogTypeFan20">
                            <Col span={24} >
                                <Col span={18} offset={4}>
                                    <div className='btBox'>
                                        <div>
                                            <Col span={22}>
                                            <Col className='showtitle'>
                                             <h1>{this.state.title}</h1>
                                                </Col>    
                                                <div>
                                                    <Col span={18}>
                                                         {img}
                                                    </Col>
                                                    <Col span={24} className="showMetaDetails">
                                                        <Col span={5}>
                                                            <h4>Views: {this.state.countViews}</h4>
                                                        </Col>
                                                        <Col span={5}>
                                                            <h4 className="viewblgcnt">Status : {this.state.blogStatus}</h4>
                                                        </Col>
                                                        <Col span={5}>  <h4>Author : {this.state.authorName}</h4></Col>
                                                        <Col span={6}>
                                                            <h4 className="viewblgcnt">Published On : {this.state.publishedDate}</h4>
                                                        </Col>
                                                        </Col>
                                                    <Col span={24} className='showcontent'>
                                                        <RichTextEditor className="showblgRte"
                                                            value={this.state.value}
                                                            readOnly={this.state.readOnly}
                                                            />
                                                    </Col>
                                                </div>
                                            </Col>
                                        </div>
                                    </div>
                                </Col>
                            </Col>
                        </div>
                        <div className="CreateBlogTypeFan20">
                       
                                <AddComment />
                        
                        </div>
                    </Row>

                </Dashboard>
            </div>
        );
    }
}

export default Blogview;
/* eslint-disable */