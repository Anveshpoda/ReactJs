/* eslint-disable */
import React from 'react';
import { Col, Form, Icon, Row, Input, Menu, Button, Select, Layout } from 'antd';
//import { Link } from 'react-router';
import Dashboard from '../Dashboard/Dashboard';
import { Link } from 'react-router';
import CalendarSidebar from './CalendarSidebar.js';
import './calendar.css';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const { Sider } = Layout;
const { TextArea } = Input;
const Option = Select.Option;

// function callback(key) {
//   console.log(key);
// }



function handleChange(value) {
  console.log(`selected ${value}`);
}


class CalenderEvent extends React.Component {
  render() {
    return (
      <Dashboard>
        <div className="CalenderEvents">


          <div className="paddingLeft20">

          </div>

          <div className="SubMenuCalendar">
            <Layout>

              <Col span={19} className="bgCalendar">
                <Layout className="padding30">
                  <Col span={15}>
                    <h2 className="teamTitle"> <Link to={`/calendar`}><Icon type="arrow-left" /> </Link>Ishahak's Calendar - New Event</h2>


                  </Col>
                  <Form>
                    <Row>
                      <Col span={15}>
                        <FormItem label="">
                          <Input className="CalenderEvent" placeholder="Enter Event Title" />
                          <h3 className="FloatRht">26 March, 2018  <Icon type="edit" /></h3>
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
                        <FormItem label="Description">
                          <TextArea placeholder="I explain the task details in basic here" rows={3} />

                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        <ul className="list-inline">
                          <li>
                            <h4 className="CalendarEventRemainder">Remainder</h4>
                          </li>
                          <li>
                            <FormItem>
                              <Select defaultValue="1day before" style={{ width: 120 }} onChange={handleChange}>
                                <Option value="2day before">2day before</Option>
                                <Option value="3day before">3day before</Option>


                              </Select>


                            </FormItem>
                          </li>
                          <li className="TypeofEventCalendar">
                            <h4><span><Icon type="unlock" /></span> <span>Public Event</span></h4>
                          </li>
                        </ul>
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

export default CalenderEvent;
/* eslint-disable */