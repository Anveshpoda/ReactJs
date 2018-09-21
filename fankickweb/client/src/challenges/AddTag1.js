/* eslint-disable */
import React from 'react';
import css from './challenge.css';
import { Button, Input, Tag, Tooltip, Form } from 'antd';
const FormItem = Form.Item;
class AddTag1 extends React.Component {
  state = {
    tags: [],
    inputVisible: false,
    inputValue: '',
  };
  componentDidMount() {

    if (this.props.tags !== '') {
      this.setState({ tags: this.props.tags });
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
                  style={{ width: 78 }}
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

const EditTag = Form.create()(AddTag1);
export default EditTag;
/* eslint-disable */