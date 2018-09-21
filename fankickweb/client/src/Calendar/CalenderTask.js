/* eslint-disable */
import React from 'react';
//import $ from "jquery";
//import { Link } from 'react-router';
import Dashboard from '../Dashboard/Dashboard';
import { Link } from 'react-router';
import { Col, Form, Icon, Row, Input, Checkbox, Menu, Button, Select, Layout } from 'antd';
import CalendarSidebar from './CalendarSidebar.js';
import { DatePicker } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const { Sider } = Layout;
const { TextArea } = Input;
const Option = Select.Option;
//const { MonthPicker, RangePicker } = DatePicker;

const Search = Input.Search;



function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledDate(current) {
  // Can not select days before today and today
  return current && current.valueOf() < Date.now();
}

function disabledDateTime() {
  return {
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  };
}

function disabledRangeTime(_, type) {
  if (type === 'start') {
    return {
      disabledHours: () => range(0, 60).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  return {
    disabledHours: () => range(0, 60).splice(20, 4),
    disabledMinutes: () => range(0, 31),
    disabledSeconds: () => [55, 56],
  };
}



function onChange(time, timeString) {
  console.log(time, timeString);
}

// function onChange(e) {
//   console.log(`checked = ${e.target.checked}`);
// }
// function callback(key) {
//   console.log(key);
// }



function handleChange(value) {
  console.log(`selected ${value}`);
}



class CalenderTask extends React.Component {

  render() {



    return (
      <Dashboard>
        <div className="CalenderEvents">


          <div className="paddingLeft20">

          </div>

          <div className="SubMenuCalendar">
            <Layout>

              <Col span={19}>
                <Layout className="padding30">
                  <Col span={24}>
                    <h2 className="teamTitle"> <Link to={`/calendar`}><Icon type="arrow-left" /> </Link>Ishak's Calendar</h2>

                  </Col>
                  <Form>
                    <Row>
                      <Col span={15}>
                        <FormItem label="Enter Title">
                          <Input className="CalenderEvent" placeholder="Enter Task Title" />
                        </FormItem>
                      </Col>
                      {/* <Col span={15}>
             <ul className="list-inline" style={{borderBottom:'1px solid red'}}>
             <li>
              <h3>EventTitle </h3>
              </li>
              <li>
               <h4><span>11 March , 4pm</span> <span><Icon type="edit" /></span></h4>
              </li>
             </ul>
  </Col>*/}

                    </Row>
                    <Row>
                      <Col span={10}>
                        <FormItem label="Task Description">
                          <TextArea placeholder="I explain the task details in basic here" rows={3} />

                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={13}>
                        <ul className="list-inline">
                          <li>
                            <h4 className="taskcompletionD">Task Completion Date</h4>
                          </li>
                          <li>
                            <FormItem>
                              <DatePicker
                                format="DD-MMMM HH:mm A"
                                disabledDate={disabledDate}
                                disabledTime={disabledDateTime}
                                showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                                />
                            </FormItem>
                          </li>


                        </ul>


                      </Col>
                      <Col span={9}>
                        <ul className="list-inline">
                          <li>
                            <h4 className="CalendartakRemainder">Remainder</h4>
                          </li>
                          <li>
                            <FormItem>
                              <Select defaultValue="1day before" style={{ width: 120 }} onChange={handleChange}>
                                <Option value="2day before">2day before</Option>
                                <Option value="3day before">3day before</Option>
                              </Select>
                            </FormItem>
                          </li>
                        </ul>
                      </Col>

                    </Row>
                    <Row>
                      <Col span={12}>
                        <FormItem label="Invite Members">
                          <Search
                            placeholder="input search text"
                            onSearch={value => console.log(value)}
                            style={{ width: 200 }}
                            />
                          <Select placeholder="Can Edit" style={{ width: 120 }} onChange={handleChange}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled" disabled>Disabled</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                          </Select>

                        </FormItem>
                      </Col>
                      <Col span={5} className="calendarTaskMakePublic">
                        <FormItem>
                          <Checkbox onChange={onChange}>Make Public</Checkbox>

                        </FormItem>



                      </Col>



                    </Row>


                    <Row>
                      <Col span={16}>
                        <Button type="primary" className="SaveBtnEvent">Save</Button>
                      </Col>
                    </Row>
                  </Form>
                </Layout>
              </Col>

              <Col span={5} className="CalendarMenu">
                <Button type="primary" className='MyCalendarsBtn claendarsbttns'> My Calendars</Button>

              <CalendarSidebar/>
             
              </Col>

            </Layout>

          </div>

        </div>
      </Dashboard>
    );
  }


}
export default CalenderTask;
/* eslint-disable */