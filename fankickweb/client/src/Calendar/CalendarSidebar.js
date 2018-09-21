import React from 'react';
import { Col, Row, Form, Icon, Input, Menu, Button, Modal, Select, Layout } from 'antd';
import './calendar.css';
const SubMenu = Menu.SubMenu;
const { Sider } = Layout;
const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option;


function handleChange(value) {
  console.log(`selected ${value}`);
}


class CalendarSidebar extends React.Component {
  state = {
    visible: false,
    disable: true
  }


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




  render() {
    return (
      <div className="shopping-list">
        <Sider className="width30Percnt calendarSideMenu" width={200}>
          <Menu className="calendarSideMenu"
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            >
            <div>
              {/* <Menu.Item key="RedeemedCoupons">  </Menu.Item>*/}
              <ul className="list-inline">
                <li className="addtemmatcalendarli">
                  <Input placeholder="Add teammate's Calendar" className="addtemmatcalendarinput" /></li><li>
                  <Icon className="CalendarPlusIcon" type="plus" />

                </li>
              </ul>

            </div>

            <SubMenu key="Fancoins" title={<span className="PaddingLeft0">Message Center Team <Icon type="edit" /></span>}>
              <Menu.Item key="CoinsEarnedReport">Calendar</Menu.Item>
              <Menu.Item key="CoinsRedeemedReport">Calendar</Menu.Item>
              <Menu.Item key="FeatureWiseReports">Calendar</Menu.Item>
            </SubMenu>

          </Menu>
        </Sider>

        <div>
          <hr className="light" />
          <Button type="primary" onClick={this.showModal} className='MyCalendarsBtn'>Create New group</Button>
        </div>
        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
            footer={<div className="borderNone">
           
           <Button className="DicardBtnLeft bgNone" type="primary">Discard Changes</Button><Button className="mrgnRight8" type="primary">Create</Button></div>}
            >
          <div className="CreateGroups">
            <Form>
              <Row>
                <Col span={24}>
                  <FormItem>
                   <Input className="CalenderEvent" placeholder="Enter Group Title" />
                  </FormItem>
                </Col>
              </Row>

              <Row>
                <FormItem label="Add Members">
                  <Search className="SearchCalndr"
                    placeholder="I Enter Email"
                    onSearch={value => console.log(value)}
                    style={{ width: 200 }}
                    />
                  <Select placeholder="Can Edit" style={{ width: 120 }} className="CanEditInput" onChange={handleChange}>
                    <Option value="Can View">Can View</Option>
                    <Option value="Can Delete">Can Delete</Option>
                    
                  </Select>

                </FormItem>
              </Row>

            </Form>
          </div>
        </Modal>

      </div>
    );
  }
}

export default CalendarSidebar;