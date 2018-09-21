/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import $ from "jquery";
import styles from './challenge';
import { Layout, Menu, Breadcrumb, Icon, Col, Form, Button, Input, Select, Upload, Modal, message } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const cx = classNames.bind(styles);
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

class UploadImage extends React.Component {
  state = {};
  
    handleChange = (info) => {
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
      }
    }

  render() {
    const imageUrl = this.state.imageUrl;
    return (
      <div className="clearfix">
         <Upload
        className="avatar-uploader"
        name="avatar"
        showUploadList={false}
        action="//jsonplaceholder.typicode.com/posts/"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {
          imageUrl ?
            <img className="boximage" src={imageUrl} alt="Box Image" className="avatar" /> :
            <Icon type="plus" className="avatar-uploader-trigger" />
        }
      </Upload>
      </div>
    );
  }
}


export default UploadImage;
/* eslint-disable */