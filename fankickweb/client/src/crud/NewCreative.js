/* eslint-disable */
import React from 'react';
import classnames from 'classnames';
import { Form, Icon, Avatar, Input, Button, Select, Col, Tag, Tooltip, Upload, Row, Steps, message, DatePicker, Modal } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
class NewCreative extends React.Component {
  state = {
    contestIcon: '', creativeName: '', creativeType: '', creativeTags: [], crativeDescription: '',
    inputVisible: false, creativeMediaUrl: '',
    inputValue: ''
  }
  componentWillMount() {
    console.log("this.props in did mount", this.props);
    if (this.props.children[0] != undefined && this.props.children[0] != '') {
      this.setState({ creativeName: this.props.children[0] })
      this.setState({ creativeType: this.props.children[1] })
      this.setState({ crativeDescription: this.props.children[2] })
      this.setState({ creativeTags: this.props.children[3] })
      this.setState({ creativeMediaUrl: this.props.children[4] })
    }
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
    let creativeTags = state.creativeTags;
    if (inputValue && creativeTags.indexOf(inputValue) === -1) {
      creativeTags = [...creativeTags, inputValue];
    }
    console.log(creativeTags);
    this.setState({
      creativeTags,
      inputVisible: false,
      inputValue: '',
    });
  }
  saveInputRef = input => this.input = input
  handleEmployeeEdit(e) {
    if (this.state.creativeName.trim() === '') {
      document.getElementById('creativeName').innerHTML = ("Field is required");
    }
    if (this.state.creativeType === '') {
      document.getElementById('creativeType').innerHTML = ("Field is required");
    }
    if (this.state.crativeDescription.trim() === '') {
      document.getElementById('crativeDescription').innerHTML = ("Field is required");
    }
    if (this.state.creativeMediaUrl === '') {
      document.getElementById('creativeMediaUrl1').innerHTML = ("Field is required");
    }
    if (this.state.creativeTags.length === 0) {
      document.getElementById('creativeTags').innerHTML = ("Field is required");
    }
    else if (this.state.creativeName != '' && this.state.creativeType != ''
      && this.state.crativeDescription != '' && this.state.creativeMediaUrl != '' && this.state.creativeTags.length != 0
    ) {
      const creativeName = this.state.creativeName.trim()
      const creativeType = this.state.creativeType
      const crativeDescription = this.state.crativeDescription.trim()
      const creativeMediaUrl = this.state.creativeMediaUrl.trim()
      const creativeTags = this.state.creativeTags
      //console.log("img src",this._editedText2.src)
      this.props.fnEdit(this.props.empId,
        creativeName,
        creativeType,
        crativeDescription,
        creativeMediaUrl,
        creativeTags);
    }

  }
  handleChange5 = (info) => {
    if (info.file.status === 'done') {
      // getBase64(info.file.originFileObj, crewimageUrl => this.setState({ crewimageUrl }));
      message.success(`${info.file.name} file uploaded successfully`);

      this.setState({
        contestIcon: info.file.response.data
      })
    }
  }
  handleChange6 = (info, e) => {
    var _self = this;
    var imageex = "image/png", imageex1 = "image/jpg", imageex2 = "image/jpeg"
    var audioex = "audio/mp3", audioex1 = "audio/x-m4a"
    var videoex = "video/mp4", videoex1 = "video/mp3"
    var typecheck = _self.state.creativeType
    if (typecheck == "image") {
      if (imageex === info.file.type || imageex1 === info.file.type || imageex2 === info.file.type) {
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
          document.getElementById('creativeMediaUrl').innerHTML = (``);
          _self.setState({
            creativeMediaUrl: info.file.response.data
          })
        }
        else if (info.file.status !== 'uploading') {
          message.warning(`${_self.state.creativeType} file only accepted.`);
        }
      }


    } else if (typecheck == "audio") {
      if (audioex === info.file.type || audioex1 === info.file.type) {
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
          document.getElementById('creativeMediaUrl').innerHTML = (``);
          _self.setState({
            creativeMediaUrl: info.file.response.data
          })
        }
        else if (info.file.status !== 'uploading') {
          message.warning(`${_self.state.creativeType} file only accepted.`);
        }
      }


    }
    else if (typecheck == "video") {
      if (videoex === info.file.type || videoex1 === info.file.type) {
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
          document.getElementById('creativeMediaUrl').innerHTML = (``);
          _self.setState({
            creativeMediaUrl: info.file.response.data
          })
        }
        else if (info.file.status !== 'uploading') {
          message.warning(`${_self.state.creativeType} file only accepted.`);
        }
      }

    }
    if (_self.state.creativeMediaUrl === '') {
      document.getElementById('creativeMediaUrl').innerHTML = (`${_self.state.creativeType} file only accepted.`)
    }


  }
  onCreativetype = (value) => {
    this.setState({ creativeType: value,creativeMediaUrl:'' })
  }
  onCreativename = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleClose = (removedTag) => {
    const creativeTags = this.state.creativeTags.filter(tag => tag !== removedTag);
    console.log(creativeTags);
    this.setState({ creativeTags });
  }
  componentWillReceiveProps(newProps) {
    console.log("newprops", newProps);
  }
  render() {
    const { creativeTags, inputVisible, inputValue } = this.state;
    // const {creativeTags} = this.props.children[3] != undefined ? this.props.children[3]:this.state.creativeTags
    //   var creativeTags=[]
    //  if(this.state.creativeTags === ''){
    //    creativeTags=this.props.children[3]
    //  }
    console.log("creativeTags", creativeTags);
    var _this = this;
    const props = {
      name: 'file',
      action: process.env.REACT_APP_API_HOST + '/rest/azureImageUploadWeb',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
      onRemove(info) {
        this.setState({ creativeMediaUrl: '' });
      }

    };

    var empEdit = (!this.props.editable) ?
     ( <div><ul className="list-inline">{/*<li><Avatar src={this.props.children[2]} /></li>*/}<li><h4 className="AddCreativenewSession">{this.props.children[0]}</h4> <p className="Editcreativepsontex">{this.props.children[1]}</p></li><li>{editBtn}</li></ul></div>) :
      (<div><Col span={24} className="creativePagesContent">
        <Form>
          <Col span={24}>
            <Col span={8}>
              <FormItem >
                <h6 className="h6Fnt">Creative Name</h6>
                <Input type="text" placeholder="Enter Title" autoComplete={'off'}  name="creativeName" defaultValue={this.props.children[0]} onChange={this.onCreativename} />
                <p style={{ "color": "red", "text-align": "left" }} id="creativeName" className="creativeName"></p>
              </FormItem>
            </Col>
            <Col span={6} xl={{ span: 4 }} offset={1}>
              <FormItem >
                <h6 className="h6Fnt">Select Creative Type</h6>
                <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                  className="CreateDataCreativeType" defaultValue={this.props.children[1] || undefined} onChange={this.onCreativetype}>
                  <Option value="audio">Audio</Option>
                  <Option value="video">Video</Option>
                  <Option value="image">Image</Option>

                </Select>

                <p style={{ "color": "red", "text-align": "left" }} id="creativeType" className="creativeType"></p>
              </FormItem>
            </Col>
          </Col>
          <Col span={24}>
            <Col span={8}>
              <FormItem >
                <h6 className="h6Fnt">Creative description</h6>
                <TextArea rows={3} placeholder="Enter Description here" name="crativeDescription"
                  defaultValue={this.props.children[2]} onChange={this.onCreativename} />
                <p style={{ "color": "red", "text-align": "left" }} id="crativeDescription" className="crativeDescription"></p>
              </FormItem>
            </Col>
          </Col>

          <Col span={24} className="CreateDatacreativeTagsCreativie">
            <FormItem  >
              <h6 className="h6Fnt">Creative creativeTags</h6>
              <div className="CreateDataTypeTagWords45">

                {inputVisible && (
                  <Input
                    ref={this.saveInputRef}
                    type="text"
                    size="small"
                    style={{ width: '20%', height: '30px' }}
                    value={inputValue}
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputConfirm}
                    onPressEnter={this.handleInputConfirm}
                  />
                )}
                {!inputVisible && (

                  <Tag
                    onClick={this.showInput}
                    style={{ background: '#fff', borderStyle: 'dashed' }}
                  >
                    <Icon type="plus" /> New Tag
          </Tag>)}


                {creativeTags === undefined ? null : creativeTags.map((tag, index) => {
                  const isLongTag = tag.length > 10;
                  const tagElem = (
                    <Tag className="creativeTagsCreadDtas" key={tag} closable={index !== -1} afterClose={() => this.handleClose(tag)}>
                      {isLongTag ? `${tag.slice(0, 10)}...` : tag}
                    </Tag>
                  );
                  return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                })}
              </div>
              <p style={{ "color": "red", "text-align": "left" }} id="creativeTags" className="creativeTags"></p>
            </FormItem>
          </Col>
          <Col span={24} className="CreateDataBtnUploadFiles">
            <FormItem className="CreateDataAllfilesUpload">
              <Upload {...props} onChange={this.handleChange6}
                accept=".png,.jpg,.jpeg" showUploadList={false}>
                <Button>
                  <Icon type="upload" /> Click to Upload
            </Button>
                <h4>{this.state.creativeMediaUrl}</h4>
                <p style={{ "color": "red", "text-align": "left" }} id="creativeMediaUrl1" className="creativeMediaUrl1"></p>
              </Upload>

            </FormItem>
           
          </Col>
        </Form>
      </Col>
    </div>);

    var editBtn = (this.props.editable) ?
      (<Button onClick={this.handleEmployeeEdit.bind(this)} className="Deltebtn mrgnIconleft10"><Icon type="save" /></Button>) :
      (<Button onClick={this.props.fnEnableEdit} className="Deltebtn mrgnIconleft10"><Icon type="edit" /></Button>);

    return (
      <section>
      <Col span={24} className="Aftersavecreativemeta">
        <ul className="list-inline">
          <li className="ant-col-12"> {empEdit}</li>
          <li> {editBtn}</li>
          <li> <Button onClick={this.props.fnRemove} className="Deltebtn mrgnIconleft10"><Icon type="delete" /></Button></li>
        </ul>
        </Col>
      </section>
    );
  }
}


export default NewCreative;
/* eslint-disable */