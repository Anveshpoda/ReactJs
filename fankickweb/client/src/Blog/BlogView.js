/* eslint-disable */
import React, { Component } from 'react';
import { Modal, Col, Icon } from 'antd';
import './blog.css';
import moment from 'moment';
import { Scrollbars } from 'react-custom-scrollbars';
import RichTextEditor from 'react-rte';
import ReactPlayer from 'react-player';
import axios from 'axios';



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
            value: RichTextEditor.createEmptyValue()
        };
    }
    showModal = (e) => {
        console.log("id target",this.props.id);
        var id=this.props.id
        var self=this;
        axios.get('/getBlog/' + id, {
          headers: {
            "x-access-token": sessionStorage.token,
          },
        })
        .then(function (response) {
            console.log("blog view data",response.data);
            console.log("response",response.data);

            self.setState({ data: response.data.data[0] });
            self.setState({ title: response.data.data[0].title });
            self.setState({ authorName: response.data.data[0].authorName });
            self.setState({ publishedDate: moment(response.data.data[0].publishedDate).format('DD MMM YYYY') });
            self.setState({ categoryId: response.data.data[0].categoryId });
            self.setState({ categoryId: response.data.data[0].categoryId });
            self.setState({ categoryName:response.data.data[0].category });
            self.setState({ subCategoryName:response.data.data[0].subCategory });
            self.setState({ subcategoryId: response.data.data[0].subCategoryId });
            self.setState({ imageUrl: response.data.data[0].imageUrl });
            self.setState({ videoUrl: response.data.data[0].videoUrl });
            self.setState({ blogStatus: response.data.data[0].blogStatus });
            self.setState({value: RichTextEditor.createValueFromString(response.data.data[0].content, 'html') })
          
          })
          .catch(function (error) {
            console.log(error);
          });
        self.setState({
          visible: true
        });
    }
    handleOk = () => {
       
        this.setState({
            visible: false,
        });
    }

    handleCancel = () => {
this.setState({
            visible: false,
        });
    }


    render() {

        if(this.state.data.type == 'Video'){
            var img = <div>
                            <ReactPlayer
                            config={{ youtube: { playerVars: { showinfo: 1 } } }}
                            url={this.state.videoUrl}
                            className="allblogVideo" />
                      </div>
        } else {
            var img = <div>
                            <img src={this.state.imageUrl} className="viewblogimg" alt="coverimg" />
                      </div>
        }

        return (
            <div>
                <span  id={this.props.id} onClick={this.showModal.bind(this)}>
                <a > <Icon type='eye' /></a> </span>
                <Modal
                    title={this.state.title}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width='750'
                >
                  <Scrollbars style={{ height: '60vh', padding: '0px 10px' }}>
                  <div className="Blogviewscroll">
                   {img}
                   <Col span={24} className="blogMetaDetails">
                    <Col span={8}>
                    <h4 className="viewblgcnt">Status : {this.state.blogStatus}</h4>
                    </Col>
                    <Col span={8}>  <h4>Author : {this.state.authorName}</h4></Col>
                    <Col span={8}>
                    <h4 className="viewblgcnt">Published On : {this.state.publishedDate}</h4>
                    </Col>
                    </Col>
                    <Col>
                    <RichTextEditor className="viewblgRte"
                        value={this.state.value}
                        readOnly={this.state.readOnly}
                    />
                    </Col>
                    </div>
                    </Scrollbars>
                </Modal>
            </div>
        );
    }
}

export default Blogview;
/* eslint-disable */