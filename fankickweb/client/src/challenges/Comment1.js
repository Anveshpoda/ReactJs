/* eslint-disable */
import React from 'react';
import { Button, message, Upload, Form, Icon, Input, Avatar } from 'antd';
const FormItem = Form.Item;
class Comment1 extends React.Component {
  state = {
    contestIcon1: '',
  }

  handleEmployeeEdit(e) {
    const name = this._editedText2.refs.input.value
    const name1 = this._editedText3.refs.input.value
    const img = this.state.contestIcon1
    const imgd = this._editedText5.src
    if (name.trim() === '') {
      document.getElementById('name8').innerHTML = ("Please give name");
    }
    else if (name.length >= 21) {
      document.getElementById('name8').innerHTML = ("Name should be 20 characters");
    }
    else if (name1.trim() === '') {
      document.getElementById('name9').innerHTML = ("Please give role");
    }
    else if (name1.length >= 21) {
      document.getElementById('name9').innerHTML = ("Role should be 20 characters");
    }
    else if (img === '' && imgd === '') {
      document.getElementById('icon10').innerHTML = ("Please give image");
    }
    else if (this.state.contestIcon1 !== '' && name.length <= 20 && name1.length <= 20) {
      this.props.fnEdit(this.props.empId, this._editedText2.refs.input.value.trim(), this._editedText3.refs.input.value.trim(), this.state.contestIcon1);

    }
    else if (this.state.contestIcon1 === '' && name.length <= 20 && name1.length <= 20) {
      this.props.fnEdit(this.props.empId, this._editedText2.refs.input.value.trim(), this._editedText3.refs.input.value.trim(), this._editedText5.src);
    }
    this.state.contestIcon1 = ''
  }
  handleChange6 = (info) => {
    if (info.file.status === 'done') {
      // getBase64(info.file.originFileObj, crewimageUrl => this.setState({ crewimageUrl }));
      message.success(`${info.file.name} file uploaded successfully`);

      this.setState({
        contestIcon1: info.file.response.data
      })
    }
  }
  render() {
    console.log("comment1 props",this.props)
    var _this = this;
    const props = {
      name: 'file',
      action:  process.env.REACT_APP_API_HOST + '/rest/azureImageUploadWeb',
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
        _this.setState({ karaokeAudioUrl: '' });
      }
    };

    var empEdit = (!this.props.editable) ?
      (<ul className="list-inline"><li><Avatar src={this.props.children[2]} /></li><li><h3>{this.props.children[0]}</h3></li><li>{this.props.children[1]}</li><li>{editBtn}</li></ul>) :
      (<div><Form>

        <ul className="list-inline"><li>
          <FormItem>
            <Input type="text" ref={node => this._editedText2 = node} defaultValue={this.props.children[0]} />
            <p style={{ "color": "red", "text-align": "left" }} id="name8" className="name8"></p>
          </FormItem>

          <FormItem>
            <Input type="text" ref={node => this._editedText3 = node} defaultValue={this.props.children[1]} />
            <p style={{ "color": "red", "text-align": "left" }} id="name9" className="name9"></p>
          </FormItem>
        </li>
          <li>
            <FormItem>
              <Upload {...props} onChange={this.handleChange6}
                showUploadList={false}
                accept=".png,.jpg,.jpeg">
                {
                  this.props.children[2] ?
                    <img src={this.state.contestIcon1 === '' ? this.props.children[2] : this.state.contestIcon1} ref={node => this._editedText5 = node} name="contestIcon1" alt="contest Icon" className="avatar" style={{ width: 80, height: 80 }} /> :
                    <Icon type="plus" className="avatar-uploader-trigger" style={{ width: 80, height: 80, border: '1px solid #f0f0f0' }} />
                }

              </Upload>
              <p style={{ "color": "red", "text-align": "left" }} id="icon10" className="icon10"></p>
            </FormItem>
          </li>
          <li>{editBtn}</li>
        </ul>
      </Form>
      </div>);

    var editBtn = (this.props.editable) ?
      (<Button onClick={this.handleEmployeeEdit.bind(this)} className="btn btn-success sav_btn">Save</Button>) :
      (<span onClick={this.props.fnEnableEdit} className="btn btn-primary edit_btn"><Icon type="edit" /></span>);

    return (
      <section className="well">
        <ul className="list-inline">
          <li> {empEdit}</li>
          {this.props.disabled === false || this.props.disabled === undefined ? <li> {editBtn}</li> : ''}
          {this.props.disabled === false || this.props.disabled === undefined ? <li> <span onClick={this.props.fnRemove} className="btn btn-danger Delete_btn"><Icon type="delete" /></span></li> : ''}
        </ul>

      </section>
    );
  }
}


export default Comment1;
/* eslint-disable */