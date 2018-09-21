import React from 'react';
import { Link } from 'react-router';
import { Form, Icon, Input, Button,  Select, Col, Tag, Tooltip, Upload, Row, Steps, message, DatePicker, Modal } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const Step = Steps.Step;
function handleChange(value) {
  console.log(`selected ${value}`);
}

//

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}



//
function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf('day');
}

function disabledDateTime() {
  return {
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  };
}



//
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


class CreatedataItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      loading: false,
      tags: [],
      inputVisible: false,
      inputValue: '',
    };
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  //
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


  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    const { tags, inputVisible, inputValue } = this.state;
    const imageUrl = this.state.imageUrl;
    const { current } = this.state;
    const steps = [{
      title: 'Movie',
      content: <Col span={24} className="creativePagesContent">
        <Form>
          <Col span={24}>
            <Col span={8}>
              <FormItem>
                <h6 className="h6Fnt">Enter Movie Name</h6>
                <Input placeholder="Movie Name" autoComplete={'off'}  />
              </FormItem>
            </Col>
            <Col span={4} offset={1}>
              <FormItem>
                <h6 className="h6Fnt">Select Movie Genre</h6>
                <Select defaultValue="Choose From List" className="SelectMovieGenreDrop" getPopupContainer={triggerNode => triggerNode.parentNode} onChange={handleChange}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled">Disabled</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </FormItem>
            </Col>
          </Col>
          <Col span={24}>
            <Col span={10}>
              <FormItem>
                <h6 className="h6Fnt">Enter Description</h6>
                <TextArea rows={3} placeholder="Enter Description here" name="contestDescription" />
              </FormItem>
            </Col>
          </Col>
          <Col span={24}>
            <ul className="list-inline">
              <li>
                <h6 className="h6Fnt CreatedataMovieRealse">Movie Relase Date</h6>
              </li>
              <li>
                <DatePicker
                  format="YYYY-MM-DD HH:mm:ss"
                  disabledDate={disabledDate}
                  disabledTime={disabledDateTime}
                  showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                  />
              </li>
            </ul>
          </Col>
        </Form>
      </Col>,
    }, {
      title: 'Cast And Crew',
      content: <Col span={24} className="creativePagesContent">
        <Form>
          <ul className="list-inline">
            <li>
              <FormItem className="celImage">
                <h6 className="h6Fnt">Add Movie Cast</h6>
                <Upload
                  onChange={this.handleChange}
                  >
                  {imageUrl ? <img src={imageUrl} name="contestIcon" alt="Contest Icon" className="avatar circleImg" style={{ width: 80, height: 80 }} /> :
                    <Icon type="plus" className="avatar-uploader-trigger circleImg" style={{ width: 80, height: 80, border: '1px solid #EBEAEA' }} />
                  }
                </Upload>
              </FormItem>
            </li>
            <li>

            </li>
            <li className="CreateDataCelebrityinfo">
              <FormItem>
                <Input type="text" className="" autoComplete={'off'}  placeholder="Enter Celebrity Name" />
              </FormItem>
              <FormItem>
                <Input type="text" className="" autoComplete={'off'}  placeholder="Enter Celebrity Role" />
              </FormItem>
            </li>
            <li className="CreateDataCelebrityBtn">
              <Button className="btn btn-success margin_btn center-block">ADD</Button>
            </li>
          </ul>

        </Form>
      </Col>,
    }, {
      title: 'Social Media Links',
      content: <Col span={24} className="creativePagesContent">
        <Form>
          <Col span={24}>
            <Col span={8}>
              <FormItem>
                <h6 className="h6Fnt">Facebook Page Link</h6>
                <Input placeholder="Enter Link Here" />
              </FormItem>
            </Col>
          </Col>
          <Col span={24}>
            <Col span={8}>
              <FormItem>
                <h6 className="h6Fnt">Youtube Trailer Link</h6>
                <Input placeholder="Enter Link Here" />
              </FormItem>
            </Col>
          </Col>
          <Col span={24}>
            <Col span={8}>
              <FormItem>
                <h6 className="h6Fnt">Instagram Page Link</h6>
                <Input placeholder="Enter Link Here" />
              </FormItem>
            </Col>
          </Col>
        </Form>
      </Col>,
    }, {
      title: 'Creativies',
      content: <Col span={24} className="creativePagesContent">
        <Form>
          <Col span={24}>
            <Col span={8}>
              <FormItem>
                <h6 className="h6Fnt">Creative Name</h6>
                <Input placeholder="Enter Title" autoComplete={'off'}  />
              </FormItem>
            </Col>
            <Col span={4} offset={1}>
              <FormItem>
                <h6 className="h6Fnt">Select Creative Type</h6>
                <Select defaultValue="Choose From List" className="CreateDataCreativeType"
                getPopupContainer={triggerNode => triggerNode.parentNode}
                 onChange={handleChange}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled">Disabled</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </FormItem>
            </Col>
          </Col>
          <Col span={24}>
            <Col span={8}>
              <FormItem>
                <h6 className="h6Fnt">Creative description</h6>
                <TextArea rows={3} placeholder="Enter Description here" name="contestDescription" />
              </FormItem>
            </Col>
            <Col span={4} offset={1}>
              <FormItem>
                <h6 className="h6Fnt">Image / video / Audio Resolution</h6>
                <Select defaultValue="100 dpi" className="CreateDataResolution" onChange={handleChange}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled">Disabled</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </FormItem>
            </Col>
          </Col>

          <Col span={24} className="CreateDataTagsCreativie">
            <FormItem>
              <h6 className="h6Fnt">Creative Tags</h6>
              <div className="CreateDataTypeTagWords45">

                {inputVisible && (
                  <Input
                    ref={this.saveInputRef}
                    type="text"
                    size="small"
                    style={{ width: '20%' }}
                    value={inputValue}
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputConfirm}
                    onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && (
                  <Tag className="CreateDataTypeTagWords"
                    onClick={this.showInput}

                    >
                    <Icon type="plus" />Type Tag Words
          </Tag>
                )}

                {tags.map((tag, index) => {
                  const isLongTag = tag.length > 10;
                  const tagElem = (
                    <Tag key={tag} closable={index !== -1} afterClose={() => this.handleClose(tag)}>
                      {isLongTag ? `${tag.slice(0, 10)}...` : tag}
                    </Tag>
                  );
                  return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                })}
              </div>
            </FormItem>
          </Col>
          <Col span={24} className="CreateDataBtnUploadFiles">
            <div className="CreateDataAllfilesUpload">
              <Upload {...props}>
                <Button>
                  <Icon type="upload" /> Click to Upload
                </Button>
              </Upload>
            </div>
            <div className="CreateDataAddUploadBtn">
              <Button className="CreateDataAddFiles" type="primary"><Icon type="plus-circle-o" /> Add New Creatives</Button>
            </div>

          </Col>
        </Form>
      </Col>,
    }];

    return (
     
        <div className="CommentData">
          <Form>
            <Row>
              <Col span={24} className="CreateDataHeader">
                <Col span={8}>
                  <h2><span><Link to="/MessageCentre"><Icon type="arrow-left" /></Link></span> <span> Create Data Item</span></h2>
                </Col>
                <Col span={6} className="CreateDataRight">

                  <h4 className="DatesOfcreateHead"> 11 March , 4 PM</h4>
                </Col>
              </Col>
            </Row>
            <Row className="SelectDataTypedrop1">
              <Col span={6}>
                <FormItem>
                  <h6 className="h6Fnt">Select Data Type</h6>
                  <Select defaultValue="lucy" onChange={handleChange}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled">Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <div>
                <Steps current={current}>
                  {steps.map(item => <Step key={item.title} title={item.title} />)}
                </Steps>
                <div className="steps-content">{steps[this.state.current].content}</div>
                <Col span={24} className="ChallengesPrevNextbtns">
                  <div className="steps-action  floatRight">
                    {
                      this.state.current > 0
                      &&
                      <Button className="mrgnRight8" style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                        Previous
            </Button>
                    }
                    {
                      this.state.current < steps.length - 1
                      &&
                      <Button className="margnBottom20" type="primary" onClick={() => this.next()}>Next</Button>

                    }
                    {
                      this.state.current === steps.length - 1
                      &&

                      <Button type="primary" onClick={this.showModal}>Done</Button>


                    }

                  </div>
                </Col>
              </div>
            </Row>

            <div>
              <Modal
                title="Send For Approval To"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                <div>
                  <Col span={24}>
                    <Col span={10} className="MessageApprovalselectmem">
                      <FormItem>
                        <h6 className="h6Fnt">Add Members</h6>
                        <Select defaultValue="Choose Members From List" className="SelectMovieGenreDrop" onChange={handleChange}>
                          <Option value="jack">Jack</Option>
                          <Option value="lucy">Lucy</Option>
                          <Option value="disabled">Disabled</Option>
                          <Option value="Yiminghe">yiminghe</Option>
                        </Select>

                      </FormItem>
                    </Col>
                  </Col>
                  <Col span={24}>
                    <Col span={16}>
                      <FormItem>
                        <h6 className="h6Fnt">Add Note Or Description</h6>
                <TextArea rows={3} placeholder="Add Note Or Description" name="contestDescription" />
                      </FormItem>
                    </Col>

                  </Col>


                </div>
              </Modal>
            </div>

          </Form>

        </div>
    
    );
  }
}

export default CreatedataItem;
