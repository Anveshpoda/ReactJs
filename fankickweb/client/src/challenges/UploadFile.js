/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import $ from "jquery";
import styles from './challenge';
import { Layout, Menu, Breadcrumb, Icon, Col, Form, Button, Input, Select, Upload, Modal, message } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const cx = classNames.bind(styles);
const props = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
class UploadFile extends React.Component {

  render() {

    return (
      <div>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> Click to Upload
    </Button>
        </Upload>
      </div>
    );
  }
}


export default UploadFile;
/* eslint-disable */