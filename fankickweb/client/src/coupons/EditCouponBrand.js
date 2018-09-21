import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import $ from "jquery";
import { Scrollbars } from 'react-custom-scrollbars';
import RichTextEditor from 'react-rte';
import { Form, Icon, Input, Button, Checkbox, Modal,Select, Col, Row, Tabs, Upload, message } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;

function callback(key) {
  console.log(key);
}
function handleChange(value) {
  console.log(`selected ${value}`);
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

class EditCouponBrand extends React.Component {
  state = { visible: false }
  showModalEditCouponBrand = () => {
    this.setState({
      visible: true,
      loading: false,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({ visible: false })
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({ visible: false })
  }

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

  static propTypes = {
    onChange: PropTypes.func
  };

  state = {
    value: RichTextEditor.createEmptyValue()
  }

  onChange = (value) => {
    this.setState({ value });
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onChange(
        value.toString('html')
      );
    }
  };




  render() {
    console.log("this.p[rops]",this.props.couponsInfo)
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;

    return (
      <div>
       
        
      </div>
    );
  };
}


export default EditCouponBrand;