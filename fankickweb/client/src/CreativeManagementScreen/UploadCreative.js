import React from 'react';
import { Form, Icon, Input, Button, Tag, Select, Tooltip,Col, Row, Upload, message } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;





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

class UploadCreative extends React.Component {

  state = {
    loading: false,
    tags: [],
    inputVisible: false,
    inputValue: '',
  };
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


  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  }

  saveInputRef = input => this.input = input

  render() {
    const { tags, inputVisible, inputValue } = this.state;
    const uploadButton = (
      <div>
        <Icon className="ThemeTxtColor" type={this.state.loading ? 'loading' : 'download'} />
        <div className="ant-upload-text ThemeTxtColor">UPLOAD FILE HERE</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    return (
      <div>
        <Row className="Padding35">
          <Col span={23} className="BordrBottomSubTitle">
            <Col span={8}><h2>UPLOAD CREATIVE</h2></Col>
            <Col span={6} className="UploadDateRghtAlign">UPLOAD DATE:

            <span className="BlackTxt"> 16/05/2018</span></Col>
          </Col>

        </Row>


        <Row className="Paddingleft35">
          <Col span={23} className="">
            <Col span={8}>
              <FormItem label="Enter Creative Name">
                <Input className="" placeholder=" * Ragngasthalam Poster Design" autoComplete={'off'} />
              </FormItem>
            </Col>
          </Col>
        </Row>


        <Row className="Paddingleft35">
          <Col span={24} className="">
            <Col span={14}>
              <FormItem label="Upload Creative">

                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="uploadCreativeImg"
                  showUploadList={false}
                  action="//jsonplaceholder.typicode.com/posts/"
                  beforeUpload={beforeUpload}
                  onChange={this.handleChange}
                  >
                  {imageUrl ? <img src={imageUrl} alt="UploadImage" style={{ width: 250, height: 100 }} /> : uploadButton}
                </Upload>

              </FormItem>
            </Col>

            <Col span={8} className="mrgLeft15">
              <FormItem label="Device/Interface Type">

                <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Choose from list"
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              </FormItem>

              <FormItem label="Device/Interface Resolution">

                <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Choose from list"
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              </FormItem>

            </Col>

          </Col>
        </Row>
        <Row className="Paddingleft35">
          <Col span={24} className="">
            <FormItem label="Creative Tags">

              <div>
                {tags.map((tag, index) => {
                  const isLongTag = tag.length > 20;
                  const tagElem = (
                    <Tag key={tag} closable={index !== 0} afterClose={() => this.handleClose(tag)}>
                      {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                    </Tag>
                  );
                  return isLongTag ? <Tooltip>{tagElem}</Tooltip> : tagElem;
                })}
                {inputVisible && (
                  <Input
                    ref={this.saveInputRef}
                    type="text"
                    size="small"
                    style={{ width: 78 }}
                    value={inputValue}
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputConfirm}
                    onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && <Button size="large" type="dashed" onClick={this.showInput}>+ Type Tag words</Button>}
              </div>
            </FormItem>

          </Col>
        </Row>


      </div>

    );
  };
}


export default UploadCreative;