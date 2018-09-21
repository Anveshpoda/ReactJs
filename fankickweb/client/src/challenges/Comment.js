/* eslint-disable */
import React from 'react';
import { Button, message, Upload, Form, Icon, Input, Avatar } from 'antd';
const FormItem = Form.Item;
class Comment extends React.Component {
  state = {
    contestIcon: '',
  }

  handleEmployeeEdit(e) {
    // console.log("valus in comment",this.props.empId , this._editedText.value,this._editedText1.value,this._editedText2.value)
    //  console.log("img src",this._editedText2.src)
    const name = this._editedText.refs.input.value
    const name1 = this._editedText1.refs.input.value
    const img = this.state.contestIcon
    const imgd = this._editedText2.src
    if (name.trim() === '') {
      document.getElementById('name4').innerHTML = ("Please give name");
    } 
    else if(name.length >= 21){
      document.getElementById('name4').innerHTML = ("Name should be 20 characters");
    } 
    else if (name1.trim() === '') {
      document.getElementById('name5').innerHTML = ("Please give role");
    }
    else if(name1.length >= 21){
      document.getElementById('name5').innerHTML = ("Role should be 20 characters");
    }
    else if (img === '' && imgd === '') {
      document.getElementById('icon6').innerHTML = ("Please give image");
    }
    else if (this.state.contestIcon !== '' && name.length <= 20 && name1.length <=20) {
      this.props.fnEdit(this.props.empId, this._editedText.refs.input.value.trim(), this._editedText1.refs.input.value.trim(), this.state.contestIcon);
      this.state.contestIcon = ''
    }
    else  if(this.state.contestIcon === ''  && name.length <= 20 && name1.length <=20){
      //console.log("img src",this._editedText2.src)
      this.props.fnEdit(this.props.empId, this._editedText.refs.input.value.trim(), this._editedText1.refs.input.value.trim(), this._editedText2.src);
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
  render() {
 console.log("comment props", this.props)
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
     
    };
    //console.log("child state",this.props)
    var empEdit = (!this.props.editable) ?
      (<ul className="list-inline"><li><Avatar src={this.props.children[2]} /></li><li><h3>{this.props.children[0]}</h3></li><li>{this.props.children[1]}</li><li>{editBtn}</li></ul>) :
      (<div><Form>
        <ul className="list-inline"><li>
          <FormItem>
            <Input  type="text" className="form-control" ref={c => this._editedText = c} defaultValue={this.props.children[0]} />
            <p style={{ "color": "red", "text-align": "left" }} id="name4" className="name4"></p>
          </FormItem>

          <FormItem>
            <Input  type="text" className="form-control" ref={c => this._editedText1 = c} defaultValue={this.props.children[1]} />
            <p style={{ "color": "red", "text-align": "left" }} id="name5" className="name5"></p>
          </FormItem>
        </li>
          <li>
            <FormItem>
              <Upload {...props} onChange={this.handleChange5}
                showUploadList={false}
                accept=".png,.jpg,.jpeg">
                {
                  this.props.children[2] ?
                    <img src={this.state.contestIcon === '' ? this.props.children[2]:this.state.contestIcon} ref={c => this._editedText2 = c} name="contestIcon" alt="Contest Icon" className="avatar" style={{ width: 80, height: 80 }} /> :
                    <Icon type="plus" className="avatar-uploader-trigger" style={{ width: 80, height: 80, border: '1px solid #f0f0f0' }} />
                }

              </Upload>
              <p style={{ "color": "red", "text-align": "left" }} id="icon6" className="icon6"></p>
            </FormItem> </li>
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


export default Comment;
/* eslint-disable */