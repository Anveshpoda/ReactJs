/* eslint-disable */
import React from 'react';
import $ from "jquery";
import Dashboard from '../Dashboard/Dashboard';
import { Form, Icon, Input, Menu, Row, Col, Button, Select, Checkbox, TimePicker, Modal, Popover, Layout } from 'antd';
import fullCalendar from 'fullcalendar';
import moment from 'moment';
import { Link } from 'react-router';
import css from './calendar.css';
import CalendarSidebar from './CalendarSidebar.js';
import Agnathavasi from './Agnathavasi.jpg';
import imagecalendr from './imagecalendr.jpeg';

imagecalendr
const Search = Input.Search;

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const Option = Select.Option;
const { Header, Content, Footer, Sider } = Layout;

function callback(key) {
  console.log(key);
}

function handleChange(value) {
  console.log(`selected ${value}`);
}





class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popovervisible: false,
      stateui: 'Task',
      taskClass: true,
      eventClass: false,
      visible: false,
      editPopUpvisible: false,
      deletevisible:false,
      disable: true
    }
    this.getCalendar = this.getCalendar.bind(this);
  }
  getCalendar() {
    var _this = this;
    $('#calendar').fullCalendar({

      header: {

        left: '',
        center: 'prev,title,next',
        right: 'month,agendaWeek,agendaDay'
      },
      editable: true,
      eventLimit: true,
      eventLimitText: "events",
      timeFormat: 'h(:mm) A',
      dayNamesShort: ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday'],
      nextDayThreshold: "00:00:00",
      dayClick: function (date, jsEvent, view, resourceObj) {
        _this.setState({ popovervisible: true, stateui: "Task", eventClass: false, taskClass: true });
        console.log("date", moment(date).format('MM/DD/YYYY'))
      },
      eventClick: function (event, jsEvent, view) {
        _this.setState({ editPopUpvisible: true, stateui: "Task", eventClass: false, taskClass: true });
      },
      events: [
        {
          title: 'All Day Event',
          start: '2018-03-02',
          color: '#FFDCA2',
          textColor: 'black',
          constraint: 'Public Events'
        },
        {
          title: 'Task Running',
          start: '2018-03-18',
          textColor: 'black',
          color: "#fcfcfc",
          constraint: 'Running Tasks'
        },
        {
          title: 'Task22',
          start: '2018-03-06',
          color: '#fcfcfc',
          textColor: '#FE3960',
          constraint: 'Closed Tasks'
        },
        {
          title: 'Event 22',
          start: '2018-03-03',
          color: '#FFDCA2',
          textColor: 'black',
          constraint: 'Public Events'
        },

      ]
    })

  }
  hide = () => {
    this.setState({
      popovervisible: false,

    });
  }

  componentDidMount() {
    this.getCalendar();

  }


  editHide = () => {
    this.setState({
      editPopUpvisible: false,

    });
  }

  componentDidMount() {
    this.getCalendar();

  }




 DeleteModal = () => {
    this.setState({
      deletevisible: true,     editPopUpvisible: false,

    });
  }
  // handleOk = (e) => {
  //   console.log(e);
  //   this.setState({
  //     deletevisible: false,
  //   });
  // }
  // handleCancel = (e) => {
  //   console.log(e);
  //   this.setState({
  //     deletevisible: false,
  //   });
  // }



  showModal = () => {
    this.setState({
      visible: true,
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





  calendarTaskEvent = (ui) => {

    {
      ui === "Task" ? this.setState({
        taskClass: true,
        eventClass: false
      }) : ui === "Event" ? this.setState({
        eventClass: true,
        taskClass: false
      }) : ''
    }
    this.setState({ stateui: ui });
  }


  render() {
    let taskBox = ["buttonbox"];
    if (this.state.taskClass) {
      taskBox.push('green');
    }
    let eventBox = ["buttonbox"];
    if (this.state.eventClass) {
      eventBox.push('green');
    }
    const format = "HH:mm"
    return (
      <Dashboard>
        <div className="paddingLeft20">
          <h2 className="teamTitle">Content Team - Siri Calendar</h2>

        </div>

        <div className="SubMenuCalendar">
          <Layout>

             <Col span={19} className="bgCalendar">
              <Layout className="padding30">

                <div id='calendar' className="FullClaendarsmain" ></div>

              </Layout>
            </Col>

            <Col span={5} className="CalendarMenu">
              <Button type="primary" className='MyCalendarsBtn claendarsbttns'> My Calendars</Button>
              <CalendarSidebar />
            </Col>

          </Layout>
          <Modal
            title=""
            onOk={this.hide}
            onCancel={this.hide}
            visible={this.state.popovervisible}
            footer={<div className="borderNone">
              {this.state.stateui === 'Task' ? <Link to={`/calendar/CalenderTask`}><Button className="mrgnRight8 bgNone" type="primary">More Options</Button>
              </Link> :
                <Link to={`/calendar/CalenderEvent`}><Button className="mrgnRight8 bgNone" type="primary">More Options</Button>
                </Link>}
              <Button className="mrgnRight8" type="primary">Save</Button></div>}
            >
            <div>
              {/*  <Row>
                <Col span={3}>
                  <Button type="primary" className='TaskBtn'>Task</Button>
                </Col>
                <Col span={4}>
                  <Button type="primary" className='EventBtn'>Event</Button>
                </Col>
              </Row>
              <Row className="bgTime">
                <Col span={5}>
                  <h3>March 11 </h3>
                </Col>
                <Col span={4} className="TimeRight">
                  <h3>Add Time </h3>
                </Col>
              </Row>
              <Row>
                <h3>Memebers:</h3>
                <div className="mrgnTop10">
                  <Col span={2}>
                    <img src={Agnathavasi} className="img-responsive imgRounded" />
                  </Col>
                  <Col span={2}>
                    <img src={imagecalendr} className="img-responsive imgRounded" />
                  </Col>
                  <Col span={2}>
                    <img src={Agnathavasi} className="img-responsive imgRounded" />
                  </Col>
                </div>
  </Row>*/}

              <div className="CelebrityaddImgsAndViedotabs">

                <Col span={24}>
                  {this.state.stateui === 'Task' ? <FormItem label="">
                    <Input className="CalenderEvent" placeholder="Enter Task Title" />
                  </FormItem> : <FormItem label="">
                      <Input className="CalenderEvent" placeholder="Enter Event Title" />
                    </FormItem>}
                  <Col span={4}>
                    <Button onClick={this.calendarTaskEvent.bind(this, "Task")} className={taskBox.join(' ')} >Task</Button>
                  </Col>
                  <Col span={4}>
                    <Button className="CalenderEventBtn" onClick={this.calendarTaskEvent.bind(this, "Event")} className={eventBox.join(' ')} >Event</Button>
                  </Col>
                </Col>


              </div>
              {this.state.stateui === 'Task' ? <div id="CelebsTab1">


                <Col span={24} className="bgTime">
                  <Col span={5}>
                    <h3>March 11 </h3>
                  </Col>
                  <Col span={4} className="TimeRight">
                    <TimePicker placeholder="Add Time" defaultOpenValue={moment('00:00', 'HH:mm')} format={format} />
                  </Col>
                </Col>
                <Col span={24}>
                  <h3>Memebers:</h3>
                  <div className="mrgnTop10">
                    <Col span={2}>
                      <img src={Agnathavasi} className="img-responsive imgRounded" />
                    </Col>
                    <Col span={2}>
                      <img src={imagecalendr} className="img-responsive imgRounded" />
                    </Col>
                    <Col span={2}>
                      <img src={Agnathavasi} className="img-responsive imgRounded" />
                    </Col>
                  </div>
                </Col>




              </div> : this.state.stateui === 'Event' ? <div id="CelebsTab2">

                <Col span={24} className="bgTime">
                  <Col span={5}>
                    <h3>March 11 </h3>
                  </Col>
                  <Col span={4} className="TimeRight">
                    <TimePicker placeholder="Add Time" defaultOpenValue={moment('00:00', 'HH:mm')} format={format} />
                  </Col>
                </Col>
                <Col span={24}>
                  <h3>Memebers:</h3>
                  <div className="mrgnTop10">
                    <Col span={2}>
                      <img src={Agnathavasi} className="img-responsive imgRounded" />
                    </Col>
                    <Col span={2}>
                      <img src={imagecalendr} className="img-responsive imgRounded" />
                    </Col>
                    <Col span={2}>
                      <img src={imagecalendr} className="img-responsive imgRounded" />
                    </Col>
                  </div>
                </Col>


              </div> : ''}


            </div>


          </Modal>



          <Modal className=""

            visible={this.state.editPopUpvisible}
            onOk={this.handleOk}
            onCancel={this.editHide}
            footer={<Button type="primary" className="DeltButtonCalendarPopUp" onClick={this.DeleteModal}>Delete</Button>}>
            <Icon type="edit" className="BorderIconCalendarPopUp" />
            <div className="CreateGroups">
              <Form>
                <Row>
                  <Input className="CalenderEvent BorderWidthCalendarPopUp" placeholder="Enter Task Title" />
                  <Col span={3}>
                    <Button type="primary" className='TaskBtn'>Task</Button>
                  </Col>
                  <Col span={4}>
                    <Button type="primary" className='EventBtn'>Event</Button>
                  </Col>
                </Row>
                <Row className="bgTime">
                  <Col span={5}>
                    <h3>March 11 -4pm </h3>
                  </Col>
                </Row>
                <Row>
                  <h3>Memebers:</h3>
                  <div className="mrgnTop10">
                    <Col span={2}>
                      <img src={Agnathavasi} className="img-responsive imgRounded" />
                    </Col>
                    <Col span={2}>
                      <img src={imagecalendr} className="img-responsive imgRounded" />
                    </Col>
                    <Col span={2}>
                      <img src={Agnathavasi} className="img-responsive imgRounded" />
                    </Col>
                  </div>
                </Row>
              </Form>
            </div>
          </Modal>

          <Modal className="alertCalendarPopuP"
            title="Send Cancellations to Team-mates ?"
            visible={this.state.deletevisible}
            onOk={this.hideModal}
            onCancel={this.hideModal}
         footer={<div className="mrgnBottom20"><Button className="" type="primary">CANCEL</Button><Button className="" type="primary">DON'T SEND</Button><Button className="" type="primary">SEND</Button></div>}
            >
        
          </Modal>

        </div>

      </Dashboard>
    );
  };
}


export default Calendar;
/* eslint-disable */