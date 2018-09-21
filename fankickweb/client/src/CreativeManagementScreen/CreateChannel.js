import React from 'react';
//import PropTypes from 'prop-types';
//import classNames from 'classnames/bind';
//import $ from "jquery";
import { Form,  Input,  Button,Col,Tag,Tooltip, Row } from 'antd';
const FormItem = Form.Item;

class CreateChannel extends React.Component {
    state = {
    tags: [ ],
    inputVisible: false,
    inputValue: '',
  };

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
    return (
      <div>
      <Form>
      <Row className="">
          <Col span={23} className="BordrBottomSubTitle">
            <Col span={8}><h4>CREATE NEW CHANNEL</h4></Col>
            <Col span={6} className="UploadDateRghtAlign">CREATE DATE:

            <span className="BlackTxt"> 16/05/2018</span></Col>
          </Col>

        </Row>


        <Row>
        <Col span={8} className="CreateChannelCreativeName">
        <FormItem>
<h6 className="CreativeChannelfont"> Enter Creative Name</h6>
<Input placeholder="* Anushka"  autoComplete={'off'} />
        </FormItem>
        </Col>
        </Row>

<Row>
 <FormItem>
 <h6 className="CreativeChannelfont"> Filter Tags</h6>
<div className="MainDivInput">
       <div className="CreativeTagMains"> 
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: '30%' ,height:'35px'  }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        </div>
        <div>
        {!inputVisible && (
          <Tag className="CreativeDChannel"
            onClick={this.showInput} 
         
          >
        
          </Tag>
        )}
        <div className="CreateChanneltaddAddbtn">
         <Button className="Createchannelbtn" type="primary">ADD </Button>
         </div>

        </div>
<div className="CreatemDefult-tags">
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag className="InbuiltTags" key={tag} closable={index !== -1} afterClose={() => this.handleClose(tag)}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
        })}
        </div>
      </div>
 </FormItem>

     </Row>
        </Form>
      </div>

    );
  };
}


export default CreateChannel;