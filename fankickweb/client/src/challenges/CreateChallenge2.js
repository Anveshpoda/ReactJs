import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import $ from "jquery";
import styles from './challenge';
import { Layout, Menu, Breadcrumb, Icon, Col, Form, Button, Input, Select, DatePicker, TimePicker, Tabs, Radio, Switch, Modal } from 'antd';
import UploadImage from './UploadImage';
import UploadFile from './UploadFile';
import AddTag from './AddTag';
import moment from 'moment';
const { Header, Content, Footer, Sider } = Layout;
const cx = classNames.bind(styles);
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
function callback(key) {
  console.log(key);
}
function onChange(checked) {
  console.log(`switch to ${checked}`);
}
function onChange(time, timeString) {
  console.log(time, timeString);
}
function onChange(date, dateString) {
  console.log(date, dateString);
}
class CreateChallenge extends React.Component {

  state = {
    value: 1,
  }
  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }
  state = { visible: false }
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
      <div>
        <Col span={20}>
          <h5>Create Challenge</h5>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
          <Form>

            <Tabs defaultActiveKey="1" onChange={callback} className="tabContainer">
              <TabPane tab="Challenge Details" key="1">
                <FormItem>
                  <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                    showSearch
                    placeholder="Challenge Type"
                    optionFilterProp="children">
                    <Option value="1">Karaoke</Option>
                    <Option value="2">Dub2Win</Option>
                    <Option value="3">Selfie Challenge</Option>
                    <Option value="4">Movie Promotional Karaoke</Option>
                    <Option value="5">Movie Promotional Dub2Win</Option>
                    <Option value="6">Movie Promotional Karaoke with Dub2Win</Option>
                    <Option value="7">Movie Promotional Karaoke with Selfie Challenge</Option>
                  </Select>
                </FormItem>
                <FormItem>
                  <TextArea rows={3} placeholder="Enter Contest Description here" />
                </FormItem>
                <FormItem className="ant-col-lg-12">
                  <DatePicker onChange={onChange} placeholder="Select Start Date"/>
                </FormItem>
                <FormItem className="ant-col-lg-12">
                  <DatePicker onChange={onChange} placeholder="Select End Date"/>
                </FormItem>
                <FormItem className="ant-col-lg-24">
                  <RadioGroup onChange={this.onChange} value={this.state.value}>
                    <Radio value={1}>Global Wise</Radio>
                    <Radio value={2}>Local Wise</Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem className="ant-col-lg-24">
                  <Input placeholder="Add multiple Location" />
                </FormItem>
                <FormItem className="ant-col-lg-24" className={('floatRight')}>
                  <Button type="primary">Save And Next</Button>
                </FormItem>
              </TabPane>
              <TabPane tab="Add Media" key="2">
                <ul className={cx('list-inline')}>
                  <li className={cx('antColLg-8')}>
                    <FormItem>
                      <h6 className={cx('h6Font')}>Add Banner Image</h6>
                      <UploadImage />
                    </FormItem>
                  </li>
                  <li className={cx('antColLg-8')}>
                    <FormItem>
                      <h6 className={cx('h6Font')}>Add Inner Image</h6>
                      <UploadImage />
                    </FormItem>
                  </li>
                  <li className={cx('antColLg-8')}>
                    <FormItem>
                      <h6 className={cx('h6Font')}>Add Thumbnail Image</h6>
                      <UploadImage />
                    </FormItem>
                  </li>
                </ul>
                <ul className={cx('list-inline')}>
                  <li className={cx('antColLg-8')}>
                    <FormItem>
                      <h6 className={cx('h6Font')}>Upload Karaoke Challenge Music File</h6>
                      <UploadFile />
                    </FormItem>
                  </li>
                  <li className={cx('antColLg-8')}>
                    <FormItem>
                      <h6 className={cx('h6Font')}>Add Karaoke Lyrics text</h6>
                      <Input placeholder="Enter Karaoke Lyrics Text" />
                    </FormItem>
                  </li>
                  <li className={cx('antColLg-8')}>
                    <FormItem>
                      <h6 className={cx('h6Font')}>Call to Action (CTA) Button Text</h6>
                      <Input placeholder="Enter Button Text" />
                    </FormItem>
                  </li>
                </ul>
                <FormItem className="ant-col-lg-24" className={('floatRight')}>
                  <Button type="primary">Save And Next</Button>
                </FormItem>
              </TabPane>
              <TabPane tab="Fancoins & Coupons" key="3">

                <FormItem className="ant-col-lg-24">
                  <Input placeholder="Add FanCoins" />
                </FormItem>
                <FormItem>
                  <span className="ant-col-lg-12">
                    <h6 className={cx('h6Font')}>Select Coupon</h6>
                    <p>Lorem Ipsum is simply dummy text of the printing. </p>
                  </span>
                  <span className="ant-col-lg-12"><Switch defaultChecked={false} onChange={onChange} /></span>
                </FormItem>
                <FormItem>
                  <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                    showSearch
                    placeholder="Select Coupon"
                    optionFilterProp="children">
                    <Option value="1">Amazon</Option>
                    <Option value="2">Book My Show</Option>
                    <Option value="3">Flipkart</Option>
                    <Option value="4">PVR Cinemas</Option>
                    <Option value="5">Movie Tickets</Option>
                    <Option value="6">Audio Release Passes</Option>
                    <Option value="7">Restaurant Coupons</Option>
                  </Select>
                </FormItem>
                <FormItem className="ant-col-lg-24">
                  <RadioGroup onChange={this.onChange} value={this.state.value}>
                    <Radio value={1}>Global Wise</Radio>
                    <Radio value={2}>Local Wise</Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem className="ant-col-lg-24">
                  <Input placeholder="Add Locations" />
                </FormItem>
                <FormItem className="ant-col-lg-24" className={('floatRight')}>
                  <Button type="primary">Save And Next</Button>
                </FormItem>
              </TabPane>
              <TabPane tab="About Movie" key="4">
                <FormItem>
                  <h6 className={cx('h6Font')}>Add Tags</h6>
                  <AddTag />
                </FormItem>
                <FormItem className="ant-col-lg-12">
                  <DatePicker onChange={onChange} placeholder="Select Release Date"/>
                </FormItem>
                <FormItem className="ant-col-lg-12">
                  <TimePicker onChange={onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                </FormItem>
                <FormItem className="ant-col-lg-24">
                  <TextArea rows={3} placeholder="Enter Synopsis here" />
                </FormItem>
                <FormItem className="ant-col-lg-24">
                  <Button onClick={this.showModal}>Add Crew & Cast</Button>
                </FormItem>
                <FormItem className="ant-col-lg-24" className={('floatRight')}>
                  <Button type="primary">Save And Next</Button>
                </FormItem>
              </TabPane>
              <TabPane tab="Terms & Conditions" key="5">
                <FormItem>
                  <TextArea rows={5} placeholder="Enter Terms & Conditions" />
                </FormItem>
                
                <FormItem className="ant-col-lg-24" className={('floatRight')}>
                  <Button type="primary" style={{margin:'0px 15px'}}>Save And Draft</Button>
                  <Button type="primary">Save And Publish</Button>
                </FormItem>
              </TabPane>
            </Tabs>
          </Form>
        </Col>
        <Modal
          title="Add Cast & Crew"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <div style={{ 'text-align': 'center' }}>
            
            <FormItem>
              <div className={cx('castImg')}>
                <UploadImage />
              </div>
            </FormItem>
            <FormItem>
              <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                showSearch
                placeholder="Select option"
                optionFilterProp="children" style={{width:'100%'}}>
                <Option value="1">Cast</Option>
                <Option value="2">Crew</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Input placeholder="Name" />
            </FormItem>
            <FormItem>
              <Input placeholder="Role/ Designation" />
            </FormItem>
            <Button>Add Cast</Button>
          </div>
        </Modal>
      </div>
    );
  };
}


export default CreateChallenge;