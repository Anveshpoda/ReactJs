import React from 'react';
import Dashboard from '../Dashboard/Dashboard';
import { Link } from 'react-router';
import { Col, Row, Button, Icon, Tabs, Select, Table, Input, Upload, message } from 'antd';
import './Newcontentcurator.css';
const TabPane = Tabs.TabPane;
// const FormItem = Form.Item;
const Option = Select.Option;

function handleChange(value) {
    console.log(`selected ${value}`);
}

function callback(key) {
    console.log(key);
}

const props = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

class CuratorLibrary extends React.Component {
    render() {
        const columns = [{
            title: 'Key Words',
            dataIndex: 'KeyWords',
            key: 'KeyWords',
        }, {
            title: 'Value',
            dataIndex: 'Value',
            key: 'Value',
        }];

        const dataSource = [{
            key: '1',
            KeyWords: 'Mike',
            Value: 32,

        }, {
            key: '2',
            KeyWords: 'John',
            Value: 42,
        }];


        const columns12 = [{
            title: 'Key Words',
            dataIndex: 'KeyWords',
            key: 'KeyWords',
        }, {
            title: 'Value',
            dataIndex: 'Value',
            key: 'Value',
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a href="javascript:;"> <Button type="primary" className="Contentlibblockuserbtn">Edit</Button></a>
                    <a href="javascript:;"><Button type="primary" className="Contentlibblockuserbtn">Delete</Button></a>
                </span>
            ),
        }];

        const data12 = [{
            key: '1',
            KeyWords: 'Mike',
            Value: 32,

        }, {
            key: '2',
            KeyWords: 'John',
            Value: 42,
        }];


        return (
            <Dashboard>
                <div className="CuratorLibrary">

                    <Col span={24}>
                        <div className="topmenucontnet">
                            <Col span={3}>
                                <h2>Content Curator</h2>
                            </Col>
                            <Col span={8} className="curatorlibsubmenu">
                                <ul className="list-inline curatorlibray">
                                    <li>
                                        <div className="Contentlibbtn">
                                            <Link to="/newcontentcurator/BlockUser" ><Button type="primary" className="Contentlibblockuserbtn"><span><Icon type="minus-circle-o" className="Blockusericon" /> </span>Block User</Button></Link>
                                        </div>

                                    </li>
                                    <li>
                                        <div className="Contentlibbtn">
                                            <Link to="/newcontentcurator" ><Button type="primary">Back To Dashboard</Button></Link>
                                        </div>

                                    </li>

                                </ul>
                            </Col>
                        </div>
                    </Col>

                    <Col span={24}>
                        <div className="Curatorlibrarybody">
                            <Tabs defaultActiveKey="1" onChange={callback}>
                                <TabPane tab="Default Library" key="1">
                                    <div>
                                        <Col span={12}>
                                            <Table dataSource={dataSource} columns={columns} pagination={false} />
                                        </Col>
                                    </div>
                                </TabPane>
                                <TabPane tab="Custom Library" key="2">
                                    <Col span={24}>
                                        <div>
                                            <Col span={12}>
                                                <div>
                                                    <h3>Individual Upload</h3>
                                                </div>
                                                <div>
                                                    <ul className="list-inline">
                                                        <li>
                                                            <h5 className="Contencuratliblabels">Enter Key Words</h5>
                                                            <Input placeholder="Enter Key Words" />

                                                        </li>
                                                        <li>
                                                            <h5 className="Contencuratliblabels">Select Value</h5>
                                                            <Select defaultValue="1" style={{ width: 120 }} onChange={handleChange}>
                                                                <Option value="1">1</Option>
                                                                <Option value="2">2</Option>
                                                                <Option value="3">3</Option>
                                                            </Select>

                                                        </li>
                                                        <li>
                                                            <div>
                                                                <Button type="primary">ADD</Button>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>

                                            </Col>
                                            <Col span={12}>
                                                <div className="Contentlibbulckcol">
                                                    <div>
                                                        <h3>Bulck Upload</h3>
                                                    </div>
                                                    <div>
                                                        <h5 className="Contencuratliblabels">Upload Sheet</h5>
                                                        <Upload {...props}>
                                                            <Button>
                                                                <Icon type="upload" /> Click to Upload
                                                                      </Button>
                                                        </Upload>
                                                    </div>
                                                </div>
                                            </Col>
                                        </div>
                                    </Col>
                                    <Col span={24}>
                                        <div>
                                            <Col span={12}>
                                                <Table columns={columns12} dataSource={data12} />
                                            </Col>
                                        </div>

                                    </Col>


                                </TabPane>
                            </Tabs>
                        </div>
                    </Col>

                </div>
            </Dashboard>
        );
    }
}
export default CuratorLibrary;