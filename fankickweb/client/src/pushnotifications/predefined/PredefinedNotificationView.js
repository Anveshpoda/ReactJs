/* eslint-disable */
import React from 'react';
import { Row,Col,Switch,Button,Input,Select,Upload,Icon,message } from 'antd';
import css from '../pushNotifications.css';

  const { TextArea } = Input;

class PredefinedNotificationView extends React.Component{
    constructor(props){
        super(props);
        this.state={
            imageUrl2: '',
            imageUrl:'',
            editSwitch:'',
            switch:''
        }
    }
    handleImage = (info) => {
    if (info.file.status === 'done') {
      // getBase64(info.file.originFileObj, Iconbannerimagename => this.setState({ Iconbannerimagename }));
      message.success(`${info.file.name} file uploaded successfully`);
       if(this.props.id != undefined){
         this.setState({imageUrl:info.file.response.data})
         this.props.editData.imageURL=this.state.imageUrl;
       }
      
      this.setState({
        imageUrl2: info.file.response.data
        
      })
    }
  }
   handleSwitch = (e) => {
    if(this.props.id != undefined){
      this.setState({editSwitch:e});
      this.props.editData.onOrOff=this.state.editSwitch;
    }
    this.setState({switch:e})
  }
    render(){
        var props=this.props.prop;
        var subCategories=this.props.subCategories;
        var beforeUpload=this.props.beforeUpload;
        var editData=this.props.editData;
        return(
            <div id="predefined" className="MarginTop20">
            <Row>
              <Col span={17} className='MarginTop20'>
                <p className="subPara"> Compose Message</p>
              </Col>

              <Col  className='MarginTop20'>
                <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                  showSearch className='MarginTop20'
                  style={{ width: 350 }}
                  placeholder="Select Target Activity"
                  optionFilterProp="children"
                  defaultValue={editData.notification}
                  onChange={this.onSubCategoryChange}
                  disabled={this.props.id?'disabled':''}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                {subCategories}

              </Select>
              <p className="editError">{this.props.errors.subCat}</p>

              </Col>
               <Row className="">
              <Col span={8} className='marginlfrt20'>
                <Input type="" placeholder="Enter Title" name="title" defaultValue={editData.title} onChange={this.handleChange}/>
                <p className="editError">{this.props.errors.title}</p>
              </Col>
              </Row>

              <Row className="marginBottom20">
                <Col span={8} className="">
                  <TextArea rows={3} placeholder="Enter Description" name="desc" defaultValue={editData.description} onChange={this.handleChange} />
                  <p className="editError">{this.props.errors.desc}</p>
                </Col>
                <Col span={4} className="">
                  <Upload {...props}
                    className="avatar-uploader marginLeft20"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={this.handleImage}
                    accept=".png,.jpg,.jpeg"
                  >
                {
                  this.state.imageUrl2||editData.imageURL ?
                    <img src={editData.imageURL?editData.imageURL:this.state.imageUrl2} name="contestIcon" alt="" className="avatar" /> :
                    <Icon type="plus" className="avatar-uploader-trigger" />
                }
                </Upload>
                <p className="editError">{this.props.errors.image}</p>
                </Col>
                <Switch checked={this.props.id?editData.onOrOff:this.state.switch} onChange={(e)=>this.handleSwitch(e)}/>
              </Row>
              <Button type="primary" className='createBtn' onClick={this.props.handleSubmit}>Save</Button>

            </Row>

          </div>
        )
    }
}
export default PredefinedNotificationView;
/* eslint-disable */