/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './user.css';
import $ from "jquery";
import { Layout, Menu, Breadcrumb, Icon, Form, Input, Col, Collapse, Switch, Tabs, Row } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const cx = classNames.bind(styles);
const FormItem = Form.Item;
const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;
function callback(key) {
    console.log(key);
}
function onChange(checked) {
    console.log(`switch to ${checked}`);
}
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
};
class ReqPermissions extends React.Component {
    render() {
        return (
            <div>
                <h5>Request Permissions</h5>
                <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </span>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="FanKick" key="1">
                        <Collapse bordered={false} defaultActiveKey={['1']}>
                            <Panel header="permissions 1" key="1" style={customPanelStyle}>
                                <p>{text}</p>
                            </Panel>
                            <Panel header="permissions 2" key="2" style={customPanelStyle}>
                                <p>{text}</p>
                            </Panel>
                            <Panel header="permissions 3" key="3" style={customPanelStyle}>
                                <p>{text}</p>
                            </Panel>
                        </Collapse>
                    </TabPane>
                    <TabPane tab="Agents" key="2">
                        <Collapse bordered={false} defaultActiveKey={['1']}>
                            <Panel header="permissions 1" key="1" style={customPanelStyle}>
                                <p>{text}</p>
                            </Panel>
                            <Panel header="permissions 2" key="2" style={customPanelStyle}>
                                <p>{text}</p>
                            </Panel>
                            <Panel header="permissions 3" key="3" style={customPanelStyle}>
                                <p>{text}</p>
                            </Panel>
                        </Collapse>
                    </TabPane>
                    <TabPane tab="Celebrity" key="3">
                        <Collapse bordered={false} defaultActiveKey={['1']}>
                            <Panel header="permissions 1" key="1" style={customPanelStyle}>
                                <p>{text}</p>
                            </Panel>
                            <Panel header="permissions 2" key="2" style={customPanelStyle}>
                                <p>{text}</p>
                            </Panel>
                            <Panel header="permissions 3" key="3" style={customPanelStyle}>
                                <p>{text}</p>
                            </Panel>
                        </Collapse>
                    </TabPane>
                </Tabs>
            </div>
        );
    };
}


export default ReqPermissions;
/* eslint-disable */