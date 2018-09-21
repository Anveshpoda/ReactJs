/* eslint-disable */
import React from 'react';
import css from './challenge.css';
import { Button, Input, Tag, Tooltip, Form } from 'antd';
const FormItem = Form.Item;
class AddTag extends React.Component {
  state = {
    tags: [],
    inputVisible: false,
    inputValue: '',
  };
  componentDidMount() {

    if (this.props.tag !== '' && this.props.tag !== undefined) {
      this.setState({ tags: this.props.tag });
    }
  }
  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
    this.props.handleTag(tags);
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {

    this.setState({ inputValue: e.target.value.trim() });
  }

  handleInputConfirm = (e) => {

    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    // console.log("confirm tags",tags);
    // console.log("confirm tags inputValue",inputValue);
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }

    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
    this.props.handleTag(tags);
  }

  saveInputRef = input => this.input = input

  render() {
    // console.log("this .state in tag",this.state);
    const { tags, inputVisible, inputValue } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Form>
          {tags === undefined ? null : tags.map((tag, index) => {
            const isLongTag = tag.length > 20;
            const tagElem = (
              <Tag key={tag} closable={index !== -1} afterClose={() => this.handleClose(tag)}>
                {isLongTag ? `${tag.slice(-1, 20)}...` : tag}
              </Tag>
            );
            return isLongTag ? <Tooltip title={tag}>{tagElem}</Tooltip> : tagElem;
          })}
          {inputVisible && (
            <FormItem>
              {getFieldDecorator('tag', {
                rules: [{ required: true, message: 'Please give atleast one tag!' }],
              })(
                <Input
                  ref={this.saveInputRef}
                  type="text"
                  size="large"
                 className="width78"
                  value={inputValue}
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputConfirm}
                  onPressEnter={this.handleInputConfirm}
                />
                )}
            </FormItem>
          )}
          {!inputVisible && <Button size="large" type="dashed" onClick={this.showInput}>+ New Tag</Button>}
        </Form>
      </div>
    );
  }
}

const CreateTag = Form.create()(AddTag);
export default CreateTag;
/* eslint-disable */