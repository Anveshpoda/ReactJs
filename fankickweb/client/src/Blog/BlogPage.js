/* eslint-disable */
import React, { Component } from 'react';
import { Row, Col, Card, Icon, Avatar, Modal, Button, DatePicker, Menu, Dropdown, Form, Input, Select, Layout } from 'antd';
import './BlogPage.css';
import moment from "moment";
import ReactPlayer from 'react-player';
import { Link } from 'react-router';
import RichTextEditor from 'react-rte';
import Dashboard from '../Dashboard/Dashboard';
import axios from 'axios';
import BlogView from './BlogView';
import ShowBlog from './ShowBlog';


const { Meta } = Card;
const FormItem = Form.Item;

function disabledDate(current) {
  return current && current < moment().startOf('day');
}

class BlogPage extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      visible: false,
      visible1: false,
      readOnly: true,
      blogid: '',
      publishedDate: '',
      loading: false,
      AllBlogsClass: true,
      UpcomingClass: false,
      PublishedClass: false,
      errors: {},
      countViews: 0

    };

    this.showUpComingBlogs = this.showUpComingBlogs.bind(this);
    this.showPublishedBlogs = this.showPublishedBlogs.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.publishData = this.publishData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fetchFirst = this.fetchFirst.bind(this);
    this.addOne = this.addOne.bind(this);
  }

  handleChange = (value) => {
    if(value!="")this.state.errors.publishDate="";
    this.setState({
      publishedDate: value
    });
    console.log('published date value : ', value);
  }

  showModal = (did) => {
    this.setState({
      visible: true, blogid: did

    });
    console.log('show modal data', this.state.blogid);
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({ visible: false });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({ visible: false });
  }

  showModal1 = (did) => {
    this.setState({
      visible1: true, blogid: did
    });
    console.log("id", this.state.blogid)
  }
  handleOk1 = (e) => {
    console.log(e);
    this.setState({
      visible1: false,
    });
  }
  handleCancel1 = (e) => {
    console.log(e);
    this.setState({
      visible1: false,
    });
  }

  componentDidMount() {
    this.fetchFirst();
  }

  fetchFirst() {
    this.setState({
      AllBlogsClass: true,
      UpcomingClass: false,
      PublishedClass: false
    })
    var that = this;
    const url = '/getBlogs';
    console.log("service");
    var request = new Request(url, {
      method: 'GET',
    });

    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        console.log("response", response.data);
        if (response.status === 200) {
          that.setState({
            posts: response.data,
          })
          console.log("total blogs : ", that.state.posts.length);
        }
        else {

        }
      })
  }


  onDelete = (e) => {
    var id = this.state.blogid;
    console.log("id", id)
    var reqDel = axios.create({
      headers: {
        'Content-Type': 'application/json'
      }
    })
    reqDel.delete('/deleteBlog/' + id).then((response) => {
      this.fetchFirst();
      this.handleOk1();
      console.log('Delete Service : ', response);
    })
  }

  showUpComingBlogs() {
    this.setState({
      AllBlogsClass: false,
      UpcomingClass: true,
      PublishedClass: false
    })
    var that = this;
    const url = '/getBlogs';
    var request = new Request(url, {
      method: 'GET',

    });
    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        console.log("response", response.data);

        if (response.status === 200) {
          that.setState({ post: response.data });
          console.log(" 2nd that", response.data);

          const render = [];
          for (let key in that.state.post) {
            var contest = that.state.post[key]
            if (contest.blogStatus === "Created") {
              render.push(contest);
            }
          }
          that.setState({
            posts: render,
          });
        }
        else {
        }
      })
  }
  showPublishedBlogs() {
    this.setState({
      AllBlogsClass: false,
      UpcomingClass: false,
      PublishedClass: true
    })
    var that = this;
    const url = '/getBlogs';
    console.log("service");
    var request = new Request(url, {
      method: 'GET',

    });
    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        console.log("response", response.data);

        if (response.status === 200) {
          that.setState({ postss: response.data });
          console.log("2nd that", response.data);

          const render = [];
          for (let key in that.state.postss) {
            var contests = that.state.postss[key]
            if (contests.blogStatus === "Published") {
              render.push(contests);
            }
          }
          that.setState({
            posts: render,
          });
        }
        else {

        }
      })
  }


  publishData(event, props) {
    var id = this.state.blogid;
    let errors = {};
    if (this.state.publishedDate === "") errors.publishDate = "Please fill this field!"
    this.setState({ errors })
    if (Object.keys(errors).length === 0) {
      console.log("publish status id:", id);
      var data = {
        publishedDate: new Date(this.state.publishedDate).toISOString(),
        blogStatus: event.target.value,
      }
      console.log("publish status value: ", event.target.value);
      var req = axios.create({
        headers: {
          'Content-Type': 'application/json'
        }
      });
      req.put('/updateBlog/' + id, data).then((response) => {
        this.handleOk();
        console.log("put response", response.data.data);
        alert('Blog Successfully Published');
        this.showPublishedBlogs();



      })
    }
  }



  addOne() { 
        this.setState({
            countViews: this.state.countViews + 1
        });
    }

  render() {

    const { visible, loading } = this.state;
    const dateFormat = ('MM/DD/YYYY');
    console.log("Data from posts[] :", this.state.posts)
    var Data = [];
    for (let i in this.state.posts) {
      var item = this.state.posts[i];
      var img;
      if (item.type == "Slides") {
        img = <div>

          {item.slides[0] ? <img src={item.slides[0].slideImageUrl} className="allblogimg" alt="coverimg" /> : ""}
          <Icon type="camera-o" />
          <h4 className="blogTitle1">  {item.title}</h4>
        </div>
      } else if (item.type === "Video") {
        img = <div>

          <ReactPlayer
            config={{ youtube: { playerVars: { showinfo: 1 } } }}
            url={item.videoUrl}
            className="allblogVideo"
            controls
             />
          <h4 className="blogTitle2"> {item.title}</h4>
        </div>
      } else {
        img = <div>
          <img src={item.imageUrl} className="allblogimg" alt="coverimg" />
          <h4 className="blogTitle1"> {item.title}</h4>
        </div>
      }
      Data.push(<div key={i}>
        <div className="ui card">
          <Col span={6} xs={12} sm={12} xl={4} lg={6} md={6}>
            {/* <Row> */}
            <Card className="cardcontent"
              // style={{ width: 300 }}
              cover={<div>
                {img}

                {/* <p>{item.type}</p> */}
              </div>}
              onClick={this.addOne} >
              <div className="image hover01">
                <figure>
                  {img}
                  {/*<img className="Boximage challengesmaincardImage"src={item.imageUrl} alt="Contest Cover" width='100%' max-width='400px' height='175px' />*/}
                </figure>
              </div>
              <Col span={24}>
                <div className="bloginfo">
                  <p>Views: {this.state.countViews+1}</p>
                  <p><span>Published on: </span><span className="Mainpublishstatus">{moment(item.publishedDate).format('DD MMMM YYYY')}</span></p>
                  <p>Author Name: {item.authorName}</p>

                </div>
              </Col>
              <Col span={24} className="drop" id='area'>
                <div className="cardfooter">
                  <div className='btns'>
                    <div className='istatus'>
                      <p className='pcolor'>Status: {item.blogStatus}</p>
                    </div>
                  </div>
                  <div className='btns'>
                    <div className='iedit'>
                      <Link to={`/editBlogTypes/${item._id}`}>
                        <Icon type='edit' />
                      </Link>
                    </div>
                  </div>
                  <div className='btns'>
                    <div className='ieye'>
                    <Link to={`/showBlog/${item._id}`}>
                        <Icon type='eye' />
                      </Link>
                    {/*<BlogView id={item._id} />*/}
                    </div>
                  </div>
                  <div className='btns'>
                    <div className='iellipsis'>
                      <Dropdown
                        getPopupContainer={() => document.getElementById('area')}
                        overlay={<Menu>
                          {this.state.posts[i].blogStatus==="Created" ?
                            <Menu.Item key="0">
                              <Button onClick={this.showModal.bind(this, item._id)} className='but3'>
                                <a>Publish</a>
                              </Button>
                            </Menu.Item>
                            :
                            null}
                          <Menu.Item key="1">
                            <Button onClick={this.showModal1.bind(this, item._id)} className='but3'>
                              <a>Delete</a>
                            </Button>
                          </Menu.Item>
                        </Menu>} trigger={['click']}>
                        <a className="ant-dropdown-link" href="#">
                          <Icon type="ellipsis" />
                        </a>
                      </Dropdown>
                    </div>
                  </div>
                </div>
              </Col>
            </Card>
            {/* </Row> */}
          </Col>
        </div>
      </div>)
    }
    var loadingData = (this.state.posts.length) ?
      <Row>
        {Data}
      </Row>
      :
      <h1 className='loaddata'> <Icon type="loading" /></h1>
    const { getFieldDecorator, getFieldValue } = this.props.form;


    let AllBlogs = ["but"];
    if (this.state.AllBlogsClass) {
      AllBlogs.push('green');
    }
    let UpcomingBlogs = ["but"];
    if (this.state.UpcomingClass) {
      UpcomingBlogs.push('green');
    }
    let PublishedBlogs = ["but"];
    if (this.state.PublishedClass) {
      PublishedBlogs.push('green');
    }


    return (
      <div>
        <Dashboard>
          <div>
            <Row>
              <Col span={24} className='blogchallengesmenu'>
                <div className="SubMenu">
                  <Col span={8}><h2 className="pageTitle">Blogs Center</h2></Col>
                  <Col span={16} className="Blogpagesheaders">
                    <nav className='challengesnavigation' role="navigation" className="RghtAlign">
                      <Link to="/blogPage" className='item challengenav'>Blog Page</Link>
                      <Link><Button className={AllBlogs.join(' ')} onClick={this.fetchFirst}  >All Blogs</Button></Link>
                      <Link><Button className={UpcomingBlogs.join(' ')} onClick={this.showUpComingBlogs} >UpComing Blogs</Button></Link>
                      <Link><Button className={PublishedBlogs.join(' ')} onClick={this.showPublishedBlogs}  >Published Blogs</Button></Link>
                      <Link to="/blogTypes"> <Button type="primary" className='createBtn'>Create New Blog</Button></Link>
                    </nav>
                  </Col>
                </div>
              </Col>
            </Row>

            {loadingData}


            <div>

              <Modal
                visible={visible}
                title="Publish Blog"
                footer={[
                  <Button key="back" onClick={this.handleCancel}>Cancel</Button>,
                  <Button key="submit" value='Published' onClick={this.publishData.bind(this)}>Publish</Button>
                ]}
                >
                <h4>Select date to Publish</h4>
                <div className='datee'>
                  <FormItem label='Select Date'>
                    {getFieldDecorator('publishedDate', {
                      rules: [
                        { required: true, message: 'Please Select a date to publish!' }],
                      //setFieldsValue: `${this.state.publishedDate}`
                    })(
                      <DatePicker
                        disabledDate={disabledDate}
                        onChange={this.handleChange}
                        name="publishedDate"
                        value={this.state.publishedDate}
                        />
                      )}
                    <p style={{color:"red"}} calssName="Error">{this.state.errors.publishDate}</p>
                  </FormItem>
                </div>
              </Modal>
              <div>
                <Modal
                  title="Delete Blog"
                  visible={this.state.visible1}
                  footer={[
                    <Button key="back" onClick={this.handleCancel1}>Cancel</Button>,
                    <Button key="submit" onClick={this.onDelete.bind(this)}>Delete</Button>
                  ]}
                  >
                  <h4>Are you sure to delelte this Blog?</h4>
                </Modal>
              </div>
            </div>
          </div>

        </Dashboard>
      </div>

    );
  }
}

export default Form.create()(BlogPage);
/* eslint-disable */