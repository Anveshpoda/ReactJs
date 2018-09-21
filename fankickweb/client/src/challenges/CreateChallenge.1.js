import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import $ from "jquery";
import styles from './challenge';
import { Layout, Menu, Breadcrumb, Icon, Col, Form, Button, Input, Select, DatePicker, TimePicker } from 'antd';
import UploadImage from './UploadImage';
import UploadFile from './UploadFile';
import AddTag from './AddTag';
import moment from 'moment';
const { Header, Content, Footer, Sider } = Layout;
const cx = classNames.bind(styles);
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

function onChange(time, timeString) {
  console.log(time, timeString);
}
function onChange(date, dateString) {
  console.log(date, dateString);
}
class CreateChallenge extends React.Component {

  render() {
    return (
      <div>
        <Col span={16}>
          <h5>Create Challenge</h5>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
          <Form>
            <FormItem>
              <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                showSearch
                placeholder="Challenge Type"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                <Option value="Challenge1">Challenge1</Option>
                <Option value="Challenge2">Challenge2</Option>
                <Option value="Challenge3">Challenge3</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Input placeholder="Challenge Title" />
            </FormItem>
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
              <li className={cx('antColLg-12')}>
                <FormItem>
                  <h6 className={cx('h6Font')}>Call to Action (CTA) Button Text</h6>
                  <Input placeholder="Enter Button Text" />
                </FormItem>
              </li>
              <li className={cx('antColLg-12')}>
                <FormItem style={{ paddingLeft: 20 }}>
                  <h6 className={cx('h6Font')}>Upload Music/Video File</h6>
                  <UploadFile />
                </FormItem>
              </li>
            </ul>
            <FormItem>
              <h6 className={cx('h6Font')}>Contest Description</h6>
              <TextArea rows={3} placeholder="Enter Description here" />
            </FormItem>
            <h5 className={cx('blue')}>About Movie Section</h5>
            <FormItem>
              <h6 className={cx('h6Font')}>Video Url</h6>
              <Input placeholder="Video Url" />
            </FormItem>
            <FormItem>
              <h6 className={cx('h6Font')}>Add Tags</h6>
              <AddTag />
            </FormItem>
            <ul className={cx('list-inline')}>
              <li className={cx('antColLg-12')}>
                <FormItem>
                  <h6 className={cx('h6Font')}>Release Date</h6>
                  <DatePicker onChange={onChange} />
                </FormItem>
              </li>
              <li className={cx('antColLg-12')}>
                <FormItem>
                  <h6 className={cx('h6Font')}>Select Time</h6>
                  <TimePicker onChange={onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                </FormItem>
              </li>
            </ul>
            <FormItem>
              <h6 className={cx('h6Font')}>Synopsis</h6>
              <TextArea rows={3} placeholder="Enter Synopsis here" />
            </FormItem>
            <ul className={cx('list-inline')}>
              <h6 className={cx('h6Font')}>Movie Cast</h6>
              <li className={cx('antColLg-4')}>
                <FormItem>
                  <div className={cx('castImg')}>
                    <UploadImage />
                  </div>
                </FormItem>
              </li>
              <li className={cx('antColLg-8')} style={{ verticalAlign: 'middle' }}>
                <FormItem style={{ paddingLeft: 20 }}>
                  <Input placeholder="Name" />
                </FormItem>
                <FormItem style={{ paddingLeft: 20 }}>
                  <Input placeholder="Role/ Designation" />
                </FormItem>
              </li>
              <li className={cx('antColLg-4')}>
                <Button>Add Cast</Button>
              </li>
            </ul>
            <ul className={cx('list-inline')}>
              <h6 className={cx('h6Font')}>Movie Crew</h6>
              <li className={cx('antColLg-4')}>
                <FormItem>
                  <div className={cx('castImg')}>
                    <UploadImage />
                  </div>
                </FormItem>
              </li>
              <li className={cx('antColLg-8')} style={{ verticalAlign: 'middle' }}>
                <FormItem style={{ paddingLeft: 20 }}>
                  <Input placeholder="Name" />
                </FormItem>
                <FormItem style={{ paddingLeft: 20 }}>
                  <Input placeholder="Role/ Designation" />
                </FormItem>
              </li>
              <li className={cx('antColLg-4')}>
                <Button>Add Crew</Button>
              </li>
            </ul>
            <h5>FanCoins</h5>
            <FormItem className={cx('antColLg-8')}>
              <Input placeholder="Enter FanCoins" />
            </FormItem>
            <FormItem>
              <TextArea rows={3} placeholder="Enter Description here" />
            </FormItem>
            <h5>Challenge Duration</h5>
            <FormItem className="ant-col-lg-8">
              <h6 className={cx('h6Font')}>Start Date</h6>
              <DatePicker onChange={onChange} />
            </FormItem>
            <FormItem className="ant-col-lg-8">
              <h6 className={cx('h6Font')}>End Date</h6>
              <DatePicker onChange={onChange} />
            </FormItem>
            <FormItem className="ant-col-lg-12">
              <Button type="primary" size="large">Send For Approval</Button>
            </FormItem>
          </Form>
        </Col>
      </div>
    );
  };
}


export default CreateChallenge;