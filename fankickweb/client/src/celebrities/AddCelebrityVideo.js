import React from 'react';
import ReactPlayer from 'react-player';
import { browserHistory } from 'react-router';
import { Scrollbars } from 'react-custom-scrollbars';
import videocam2 from '../images/videocam2.png';
import { Modal, Col, Upload, Icon, Button, message, Input, Form } from 'antd';
const Dragger = Upload.Dragger;
const FormItem = Form.Item;
const props = {
  name: 'file',
  multiple: true,
  action: '//jsonplaceholder.typicode.com/posts/',
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


class AddCelebrityVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      celebrityData: {},
      celebrityVideos: [],
      celebrityVideoUrl: '',
      visible: false,
      celebrityVideosArray: []
    }
  }

  componentWillReceiveProps(nextprops) {
    this.setState({
      celebrityData: nextprops.celebrityData,
      celebrityVideos: nextprops.celebrityData.trailers
    })
  }


  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleInputChange = (e) => {
    this.setState({
      celebrityVideoUrl: e.target.value,
    })
  }

  handleOk = (e) => {
    if (this.state.celebrityVideoUrl.length > 0) {
      let celebrityInfo = {
        'updatedDateTime': new Date().toISOString(),
        'trailers': [...this.state.celebrityVideos, ...this.state.celebrityVideosArray, { trailerUrl: this.state.celebrityVideoUrl }]
      }
      this.updateCelebrityVideos(celebrityInfo, this.state.celebrityData._id);
    }
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
      celebrityVideosArray: []
    });
  }

  updateCelebrityVideos = (data, id) => {
    var _this = this
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
          message.success('Celebrity Details has been updated successfully!');
          _this.setState({
            visible: false,
          });
          browserHistory.push("/celebritydata");
        }
        else {
          if (response.data.code === 11000)
            message.error(`Duplicate Celebrity, create with a different name!`);
          else {
            message.error('Error Occured in Updating Celebrity');
            console.log('Celebrity Creation Error', response);
          }
        }
      })
  }


  addNewRow = (e) => {
    if (this.state.celebrityVideoUrl.length > 0) {
      this.setState({
        celebrityVideosArray: [...this.state.celebrityVideosArray, { trailerUrl: this.state.celebrityVideoUrl }],
        celebrityVideoUrl: ''
      })
    }
  }

  render() {
    // console.log(this.state.celebrityData.trailers)
    var renderUrlList = this.state.celebrityVideosArray.map((cmt, idx) => {
      return (
        <Input placeholder="Basic usage" value={cmt.trailerUrl} disabled />
      )
    });
    return (
      <div className="AddCelebritiespageHome2">
        <div className="AddVideoCelebsHeader">
          <Col span={4} className="ViewPageAddVideoBtns">
            <div className="ViewpageCelebAddVieos" onClick={this.showModal}>
              <div className="Iconsofviewpage">
                <img src={videocam2} alt="Contestcover" width="30px" height="30px" />
                <h4>Add Videos</h4>
              </div>
              <Modal className="AddVideoModal"
                title="Basic Modal"
                visible={this.state.visible}
                onOk={this.handleOk}
                width='700'
                onCancel={this.handleCancel}
                >
                <Scrollbars style={{ height: '40vh', padding: '0px 10px' }}>
                  <div className="AddModalVideoupload">
                    <Dragger {...props}>
                      <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                      </p>
                      <p className="ant-upload-text">Click or drag file to this area to upload</p>
                      <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                    </Dragger>
                    <h4 className="addVideoor">( OR )</h4>
                    <FormItem>
                      <h4>EnterLink <Input placeholder="Enter Youtube Url" maxLength="20" value={this.state.celebrityVideoUrl} name="celebrityVideoUrl" onChange={this.handleInputChange} />
                      </h4>
                      {renderUrlList}
                    </FormItem>
                    <Button className="AddVideoCelebBtnss" type="primary" onClick={this.addNewRow}>Add More</Button>
                  </div>
                </Scrollbars>
              </Modal>
            </div>
          </Col>
          {Object.keys(this.props.celebrityData).length > 0 ? this.props.celebrityData.trailers.map((trailer) => {
            return (<Col span={4} className="ViewPageAddVideomain"><ReactPlayer width="100%" height="150px" url={`https://www.youtube.com/watch?v=${trailer.trailerUrl}`} controls playing={false} /> </Col>)
          }) : null}
        </div>
      </div>
    );
  }
}
export default (AddCelebrityVideo);