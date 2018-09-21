/* eslint-disable */
import React from 'react';
import moment from 'moment';
import axios from 'axios';
import classnames from 'classnames';
import css from '../challenge.css';
import {Button,message, Modal, Form,DatePicker } from 'antd';
const FormItem = Form.Item;
const dateFormat = 'YYYY/MM/DD';
class Upgrade extends React.Component {
  constructor(props) {
    super(props);
    this.state = 
    {  
      visible: false,
      contestStartDate:'',
      contestEndDate:'' ,
      errors:{},
      id:'' 
    }
    this.disabledDate = this.disabledDate.bind(this);
    this.disableEndDate = this.disableEndDate.bind(this);
  }
  showModal = (e) => {
    var id=this.props.id
    var self=this;
    axios.get('/contest/' + id, {
      headers: {
        "x-access-token": sessionStorage.token,
      },
    })
      .then(function (response) {
        console.log("upgrade data",response.data.data);
        const data=response.data.data;
        self.setState({contestStartDate:data.contestStartDate})
        self.setState({contestEndDate:data.contestEndDate})
      })
      .catch(function (error) {
        console.log(error);
      });
    self.setState({
      visible: true,id:this.props.id
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
  handleChange2 = (value) => {
    var value1 = moment(value).format('YYYY-MM-DD');
    this.setState({ contestStartDate: value1, contestEndDate: '' });
    if (value1 !== '') this.state.errors.contestStartDate = '';
  }
  handleChange3 = (value) => {
    var value1 = moment(value).format('YYYY-MM-DD');
    this.setState({ contestEndDate: value1 });
    if (value1 !== '') this.state.errors.contestEndDate = '';
  }
  disabledDate(current) {
    if (!current) {
      return false;
    }
    const date = moment();
    date.hour(0);
    date.minute(0);
    date.second(0);
    return current.valueOf() < date.valueOf();
  }
  disableEndDate(current) {
    if (!current) {
      return false;
    }
    const date = moment(this.state.contestStartDate);
    date.hour(0);
    date.minute(0);
    date.second(0);
    return current.valueOf() <= date.valueOf();
  }
  Submit11 = () => {
      let errors={};
      ///if(this.state.contestStartDate === '')errors.contestStartDate="StartDate is required"
      if(this.state.contestEndDate === '')errors.contestEndDate="EndDate is required"
      this.setState({errors});
      if (Object.keys(errors).length === 0) {
        var data={
          "contestStartDate": this.state.contestStartDate,
          "contestEndDate": this.state.contestEndDate,
          "isDeleted": false,
          "isPublished": true,
       }
       var self=this;
       var id=this.state.id;
       const url = '/contest/' + id;
       var request = new Request(url, {
         method: 'PUT',
         body: JSON.stringify(data),
         headers: {
           "Content-Type": "application/json",
           'x-access-token': sessionStorage.getItem('token')
         }
       });
       fetch(request)
         .then(response => response.json())
         .then(function (response) {
           if (response.status === 200) {
                // console.log("dataresponse ina Upgrade user", response.data);
                self.setState({
                  visible: false,
                });
                self.props.getContests();
             message.success('Challenge Upgraded successfully!');
            
             
           }
           else {
             message.error(`unable to Upgrade challenge.`);
           }
         })
      }
  }
  render() {
      // console.log("this.props in upgrad",this.props);
      //   console.log("this.state",this.state);
    return (
      
       
        <Modal
         className="UpgrademodalHeight"
          title="Extend Duration (Select New Timings)"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={ <Button className="mrgnRight8" type="primary"  onClick={this.Submit11}>Submit</Button>}
                >
          <Form className="txtLeft">
            <ul className="list-inline">
              <li>
                <FormItem label="Contest Start Date" className={classnames('contestStartDate', { error: !!this.state.errors.contestStartDate })}>
                  <DatePicker className="PlachldTxt" getCalendarContainer={triggerNode => triggerNode.parentNode} onChange={this.handleChange2} value={this.state.contestStartDate ? moment(this.state.contestStartDate, dateFormat) : ''} format={dateFormat} disabledDate={this.disabledDate} name="contestStartDate" placeholder="Select Start Date" disabled/>
                  <p>{this.state.errors.contestStartDate}</p>
                </FormItem>
              </li>
              <li>
                <FormItem label="Contest End Date" className={classnames('contestEndDate', { error: !!this.state.errors.contestEndDate })}>
                  <DatePicker getCalendarContainer={triggerNode => triggerNode.parentNode} onChange={this.handleChange3} value={this.state.contestEndDate ? moment(this.state.contestEndDate, dateFormat) : ''} format={dateFormat} disabledDate={this.disableEndDate} name="contestEndDate" placeholder="Select End Date" />
                  <p>{this.state.errors.contestEndDate}</p>
                </FormItem>
              </li>
            </ul>

          </Form>
        </Modal>
      
    );
  }
}
export default (Upgrade);
/* eslint-disable */