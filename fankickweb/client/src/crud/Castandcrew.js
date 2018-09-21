/* eslint-disable */
import React from 'react';
import { Button, Col, message, Upload, Form, Icon, Input, Avatar } from 'antd';
const FormItem = Form.Item;
class Castandcrew extends React.Component {
  state = {
    contestIcon1: '',errors:{}
  }

  handleEmployeeEdit(e) {
    // console.log("valus in comment",this.props.empId , this._editedText.value,this._editedText1.value,this._editedText2.value)
    //  console.log("img src",this._editedText2.src)
    const name = this._editedText.refs.input.value
    const name1 = this._editedText1.refs.input.value
    const img = this.state.contestIcon1
    const imgd = this._editedText2.src
    if (name.trim() === '') {
      document.getElementById('name4').innerHTML = ("Please give name");
    }
    else if (name.length >= 21) {
      document.getElementById('name4').innerHTML = ("Name should be 20 characters");
    }
    else if (name1.trim() === '') {
      document.getElementById('name5').innerHTML = ("Please give role");
    }
    else if (name1.length >= 21) {
      document.getElementById('name5').innerHTML = ("Role should be 20 characters");
    }
    else if (img === '' && imgd === '') {
      document.getElementById('icon6').innerHTML = ("Please give image");
    }
    else if (this.state.contestIcon1 != '' && name.length <= 20 && name1.length <= 20) {
      this.props.fnEdit(this.props.empId, this._editedText.refs.input.value.trim(), this._editedText1.refs.input.value.trim(), this.state.contestIcon1);
    }
    else if (this.state.contestIcon1 === '' && name.length <= 20 && name1.length <= 20) {
      this.props.fnEdit(this.props.empId, this._editedText.refs.input.value.trim(), this._editedText1.refs.input.value.trim(), this._editedText2.src);
    }
    this.state.contestIcon1=''

  }
  handleChange5 = (info) => {
    if (info.file.type === "image/png" || info.file.type === "image/jpg" || info.file.type === "image/jpeg") {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        if (info.file.response.data !== '') this.state.errors.contestIcon = '';
        this.setState({
          contestIcon1: info.file.response.data
        })
      }
    } else {
      let errors = {};
      if (this.state.contestIcon1 === '') errors.contestIcon1 = "Only Image is required."
      this.setState({ errors });
      if (Object.keys(errors).length === 0) {
        // console.log("super");
      }
    }
  }
  render() {
     console.log("cats and crew state", this.state)
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

    };
    //console.log("child state",this.props)
    var empEdit = (!this.props.editable) ?
      (<ul className="list-inline"><li><Avatar className="cReateCastCrewloopimgs" src={this.props.children[2]} /></li><li className="CasTcrewRoleNamess"><p>{this.props.children[0]}</p> <p>{this.props.children[1]}</p></li><li>{editBtn}</li></ul>) :
      (<div><Form>
        <ul className="list-inline">
          <li className="dcdfzdfds">
            <FormItem className="celImage">
              <Upload {...props} onChange={this.handleChange5}
                showUploadList={false}
                accept=".png,.jpg,.jpeg">
                {
                  this.props.children[2] ?
                    <img src={this.state.contestIcon1 === '' ? this.props.children[2] : this.state.contestIcon1} ref={c => this._editedText2 = c} name="contestIcon" alt="Contest Icon" className="avatar" style={{ width: 80, height: 80, borderRadius: '46px' }} /> :
                    <Icon type="plus" className="avatar-uploader-trigger" style={{ width: 80, height: 80, border: '1px solid #f0f0f0' }} />
                }

              </Upload>
              <p style={{ "color": "red", "text-align": "left" }} id="icon6" className="icon6"></p>
              <span style={{ "color": "red", "text-align": "left" }} id="icon6" className="icon6">{this.state.errors.contestIcon1}</span>
            </FormItem> </li>
          <li className="CastCrewFormFields">
            <FormItem>
              <Input type="text" className="form-control" ref={c => this._editedText = c} defaultValue={this.props.children[0]} />
              <p style={{ "color": "red", "text-align": "left" }} id="name4" className="name4"></p>
            </FormItem>

            <FormItem>
              <Input type="text" className="form-control" ref={c => this._editedText1 = c} defaultValue={this.props.children[1]} />
              <p style={{ "color": "red", "text-align": "left" }} id="name5" className="name5"></p>
            </FormItem>
          </li>

          <li className="CreatemetaMainEditbtnss">{editBtn}</li>
        </ul>
      </Form>
      </div>);

    var editBtn = (this.props.editable) ?
      (<span className="CastCrewEditnBtnss" onClick={this.handleEmployeeEdit.bind(this)}><Icon type="save" /></span>) :
      (<span  onClick={this.props.fnEnableEdit}><Icon type="edit" /></span>);

    return (

      <section className="CreateCurdListimgsmain1">
 
      <Col span={8}>
        <ul className="list-inline">
          <li className="ant-col-16"> {empEdit}</li>
          {this.props.disabled === false || this.props.disabled === undefined ?
            <li className="CastCrewEDitIocns"><span>{editBtn}</span></li> : ''}
         {this.props.disabled === false || this.props.disabled === undefined ?
           <li className="CastCrewEDitIocns"><span onClick={this.props.fnRemove}><Icon type="delete" /></span></li> : '' }
        </ul>
        </Col>
      </section>

    );
  }
}


export default Castandcrew;
/* eslint-disable */