/* eslint-disable */
import React from 'react';
import moment from 'moment';
import axios from 'axios';
import classnames from 'classnames';
import css from '../challenge.css';
import { Button, message, Modal, Form, DatePicker } from 'antd';
const FormItem = Form.Item;
const dateFormat = 'YYYY/MM/DD';
class Reschedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false, contestStartDate: '', contestEndDate: '', errors: {}, id: ''
    }
    this.disabledDate = this.disabledDate.bind(this);
    this.disableEndDate = this.disableEndDate.bind(this);
  }
  showModal = () => {
    //console.log("parent triggered")
    var id =this.props.id
    var self = this;
    axios.get('/contest/' + id, {
      headers: {
        "x-access-token": sessionStorage.token,
      },
    })
      .then(function (response) {
      //  console.log("upgrade data", response.data.data);
        const data = response.data.data;
        self.setState({ contestStartDate: data.contestStartDate })
        self.setState({ contestEndDate: data.contestEndDate })
      })
      .catch(function (error) {
        console.log(error);
      });
    self.setState({
      visible: true, id: this.props.id
    });
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
    const date = moment(this.state.contestStartDate).add(1, 'day');
    date.hour(0);
    date.minute(0);
    date.second(0);
    return current.valueOf() <= date.valueOf();
    //return current && current < moment().endOf('day');;
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
    var time = "5:30:00"
    var value1 = moment(value).format('YYYY-MM-DD');
    var d = value1 + " " + time;
    var newdate1 = new Date(d).toISOString();
    //console.log("newd edit ", newdate1)
    this.setState({ contestStartDate: newdate1, contestEndDate: '' });
    if (newdate1 !== '') this.state.errors.contestStartDate = '';
  }
  handleChange3 = (value) => {
   // console.log("value",value);
    var time = "5:30:00"
    var value1 = moment(value).format('YYYY-MM-DD');
    var d = value1 + " " + time;
    var newdate2 = new Date(d).toISOString();
    //console.log("newd", newdate2)
    this.setState({ contestEndDate: newdate2 });
    if (newdate2 !== '') this.state.errors.contestEndDate = '';
  }
  Submit11 = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {
        dd = '0'+dd
    } 
    if(mm<10) {
        mm = '0'+mm
    } 
    // today = mm + '-' + dd + '-' + yyyy;
    today=yyyy + '-' + mm + '-' + dd +' 05:30:00 AM';
    let errors = {};
    if (this.state.contestStartDate === '') errors.contestStartDate = "StartDate is required"
    if (this.state.contestEndDate === '') errors.contestEndDate = "EndDate is required"
    var enddate=this.state.contestEndDate;
    if( enddate != ''){
      if (enddate < today) errors.contestEndDate = "Please change end date"
    }
    var startdate=this.state.contestStartDate;
    if (startdate != '') {
     
        if (startdate < today) errors.contestStartDate = "Please change start date"
    }
   // if(moment(startdate).format('L')  === moment(enddate).format('L')) errors.contestStartDate="Start date and End date can't be same"
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      var data = {
        "contestStartDate": this.state.contestStartDate,
        "contestEndDate": this.state.contestEndDate,
        "isDeleted": false,
        "isPublished": false        
      }
      var self = this;
      var id = this.state.id;
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
            // console.log("dataresponse ina rescheduled user", response.data);
            self.setState({
              visible: false,
            });
            self.props.getContests();
            message.success('Challenge Rescheduled successfully!');
          }
          else {
            message.error(`unable to Rescheduled challenge.`);
          }
        })
    }
  }
  render() {
    //  console.log("this.props in reschedule",this.props);
    //  console.log("this.state",this.state);
    return (
      
      
        <Modal className="modalReschedl"
          title="Reschedule Challenge"
          visible={this.state.visible}
          footer={<Button className="mrgnRight8" type="primary" onClick={this.Submit11}>Submit</Button>}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form className="txtLeft">
            <ul className="list-inline">
              <li>
                <FormItem label="Contest Start Date" className={classnames('contestStartDate', { error: !!this.state.errors.contestStartDate })}>
                  <DatePicker getCalendarContainer={triggerNode => triggerNode.parentNode} onChange={this.handleChange2}
                    value={this.state.contestStartDate ? moment(this.state.contestStartDate, dateFormat) : ''} format={dateFormat} disabledDate={this.disabledDate} name="contestStartDate" placeholder="Select Start Date" />
                  <p>{this.state.errors.contestStartDate}</p>
                </FormItem>
              </li>
              <li>
                <FormItem label="Contest End Date" className={classnames('contestEndDate', { error: !!this.state.errors.contestEndDate })}>
                  <DatePicker getCalendarContainer={triggerNode => triggerNode.parentNode} onChange={this.handleChange3}
                    value={this.state.contestEndDate ? moment(this.state.contestEndDate, dateFormat) : ''} format={dateFormat} disabledDate={this.disableEndDate} name="contestEndDate" placeholder="Select End Date" />
                  <p>{this.state.errors.contestEndDate}</p>
                </FormItem>
              </li>
            </ul>
          </Form>
        </Modal>

    );
  }
}
export default (Reschedule);
/* eslint-disable */