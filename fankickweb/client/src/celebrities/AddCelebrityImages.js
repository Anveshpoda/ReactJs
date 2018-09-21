import React from 'react';
//import { browserHistory } from 'react-router';
import { Modal, Col, Upload, Icon, message } from 'antd';
const Dragger = Upload.Dragger;


const props = {
  name: 'file',
  multiple: true,
  accept: ".png,.jpg,.jpeg",
  action: process.env.REACT_APP_API_HOST + '/rest/azureImageUploadWeb',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    info.fileList = []
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (info.file.status === 'done') {
      message.success(`Image uploaded successfully`);
      console.log(info.file, info.fileList)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

class AddCelebrityImages extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      celebrityPhotos: [],
      celebrityData: {},
      imagesArray: [],
      photosImageUrl: ''
    }
  }

  componentWillReceiveProps(nextprops) {
    this.setState({
      celebrityData: nextprops.celebrityData,
      celebrityPhotos: nextprops.celebrityData.photos
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  uploadImage = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      message.success(`Image uploaded successfully`);
      // console.log(info.file, info.fileList)
      this.setState({
        imagesArray: [...this.state.imagesArray, { photosImageUrl: info.file.response.data }]
      })
    }
  }
  removeImage = (e) => {
    const imagesArray = this.state.imagesArray.filter(img => img.photosImageUrl !== e.response.data)
    this.setState({
      imagesArray
    })
  }
  handleOk = (e) => {
    let celebrityInfo = {
      'updatedDateTime': new Date().toISOString(),
      'photos': [...this.state.celebrityPhotos, ...this.state.imagesArray]
    }
    this.updateCelebrityDetails(celebrityInfo, this.state.celebrityData._id);
  }

  handleCancel = (e) => {
    // console.log(this.state)
    // console.log(e);
    this.setState({
      visible: false,
    });
  }

  updateCelebrityDetails = (data, id) => {
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
          window.location.reload()
          // browserHistory.push("/celebrities");
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


  //-----images---//

  render() {
    // console.log(this.props.celebrityData, 'In AddCelebrity Image')

    // const mapCelebrityImages = this.state.celebrityPhotos.photos.map((photo)=>{
    //   return(<img src={photo.photosImageUrl} alt="Contestcover" width="100%" height="150px" />)
    // })

    return (
      <div className="AddCelebritiespageHome">
      <div className="AddimagesCardHeader">
        <Col span={4} className="ViewPageCelebsAddImagesshs">
          <div className="ViewCelebUploadBtnsh" onClick={this.showModal}>
            <div className="Iconsofviewpage">
              <p><Icon type="picture" style={{ fontSize: '20px' }} /></p>
              <h4>Add Images</h4>
            </div>

        
          </div>
        </Col>
          
              <Modal
              title="UploadFiles"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <div ClassName="UploadImagesforaddCelebrity">

                <Dragger {...props} onChange={this.uploadImage} onRemove={this.removeImage}>
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">Support for a single or bulk upload</p>
                </Dragger>

              </div>
            </Modal>

        {/* <img src={amitabh1} alt="Contestcover" width="100%" height="150px" /> */}
        {Object.keys(this.props.celebrityData).length > 0 ? this.props.celebrityData.photos.map((photo) => {
          return (
            <Col span={4} className="ViewPageCelebsAddImagess">
              <img src={photo.photosImageUrl} alt="Contestcover" title={photo.photosImageUrl} width="100%" height="150px" />
            </Col>)
        }) : null}

    

</div>
      </div>

    );
  }
}
export default (AddCelebrityImages);
