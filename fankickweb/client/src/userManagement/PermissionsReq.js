/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './user.css';
import $ from "jquery";
import { Layout, Menu, Breadcrumb, Icon, Form, Input, Col, Collapse, Switch, Tabs, Row, Avatar, Select, Table } from 'antd';
//import { fetchpermissionreq } from '../../actions/permissionreq';
const { Header, Content, Footer, Sider } = Layout;
const cx = classNames.bind(styles);
const FormItem = Form.Item;
const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
function handleChange(value) {
    console.log(`selected ${value}`);
}
function callback(key) {
    console.log(key);
}
function onChange(checked) {
    console.log(`switch to ${checked}`);
}
const text1 = `A dog is a type of domesticated animal.`;
const text = <span>
    <h6>Lorem Ipsum is simply dummy text</h6>
    <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
</span>;
const Date = <span>22-10-2017</span>;
const Username = <span><Avatar>N</Avatar><span style={{ position: 'absolute', padding: 8 }}>Narmadha</span></span>;
const permissions = <Select getPopupContainer={triggerNode => triggerNode.parentNode} defaultValue="Pending" style={{ width: 120 }} onChange={handleChange}>
    <Option value="Pending">Pending</Option>
    <Option value="Approved">Approved</Option>
    <Option value="Rejected">Rejected</Option>
    <Option value="Delete">Delete</Option>
    <Option value="Delete from Thread">Delete from Thread</Option>
</Select>;
const columns = [{
    title: 'User Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
}, {
    title: 'Date',
    dataIndex: 'date',
    sorter: (a, b) => a.date - b.date,
}, {
    title: 'Description',
    dataIndex: 'description',
    sorter: (a, b) => a.description.length - b.description.length,
}, {
    title: '',
    dataIndex: 'permissions',
}];

const perdata = [{
  key: '1',
  name: Username,
  date: Date,
  description: text,
  permissions: permissions

}, {
  key: '1',
  name: Username,
  date: Date,
  description: text,
  permissions: permissions

}];


function onChange(pagination, sorter) {
    console.log('params', pagination, sorter);
}
const id = "5a0a914ef60b0a1cc8413692";

class PermissionsReq extends React.Component {

    componentDidMount() {
        // this.props.fetchpermissionreq(id);
    }


    render() {
//         var perdata = [];
//         var permissionrequests = this.props.permission;
//         // console.log(permissionrequests, 'Array data obtained');
//         // console.log(permissionrequests.permissionRequests, 'Arraytype')
//         var temp = permissionrequests;
//         temp.map((data) => {
//             const myarr = {
//                 key: data.requestedUserId._id,
//                 name: data.requestedUserId.firstName,
//                 date: data.requestedUserId.createdDate,
//                 description: data.permissionType,
//                 permissions: <Select defaultValue={data.status} style={{ width: 120 }} onChange={handleChange}>
//     <Option value="Pending">Pending</Option>
//     <Option value="Approved">Approved</Option>
//     <Option value="Rejected">Rejected</Option>
//     <Option value="Delete">Delete</Option>
//     <Option value="Delete from Thread">Delete from Thread</Option>
// </Select>,
//             }
//             // console.log(data.requestedUserId.firstName, 'OneTwoThree')
//             perdata.push(myarr);
//             console.log(myarr, 'FourFiveSix')
//         })
        //  console.log(temp[0].requestedUserId.firstName, 'Harish')
        //  var bdata = permissionrequests.map((requests)=>{
        //      return(<h1> Hello {requests}</h1>)
        //  })
        // console.log(bdata, '81272838872888376728');
        // var data = permissionrequests;
        // var dlen = data.length;
        // var indents = [];
        // for (var i = 0; i < dlen; i++) {
        //     console.log("-------data----", data[i]);
        //     indents = data[i];
        //     console.log("-------maindata----", indents);
        //     if (indents !== undefined) {
        //         var len = indents.length;
        //         console.log("len================", len);
        //         for (var j = 0; j < len; j++) {
        //             console.log("!!!!!!!!!!!!!!!!!!", indents[j])
        //             var perdata1 = {
        //                 key: [j],
        //                 name: indents[j].requestedUserId.firstName,
        //                 date: indents[j].requestedUserId.createdDate,
        //                 description: indents[j].permissionType,
        //                 permissions: indents[j].status,
        //             }
        //             perdata.push(perdata1);

        //         }


        //     }
            //  var moviearray = {
            //                 "content_type": "text",
            //                 "title": rows[i].subCategoryName,
            //                 "payload": rows[i].subCategoryName
            //             }
            //             quickList.push(moviearray);
            // indents.push(<span className='indent' key={i}></span>);
        // }
        console.log("Props Data--------", this.props);

        return (
            <div>
                <h5>Permissions Request [28]</h5>
                <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </span>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="FanKick" key="1">
                        <Table columns={columns} dataSource={perdata} onChange={onChange} />
                    </TabPane>
                    <TabPane tab="Agents" key="2">
                        <Table columns={columns} dataSource={perdata} onChange={onChange} />
                    </TabPane>
                    <TabPane tab="Celebrity" key="3">
                        <Table columns={columns} dataSource={perdata} onChange={onChange} />
                    </TabPane>
                </Tabs>
            </div>
        );
    };
}
PermissionsReq.propTypes = {
    //contests: React.PropTypes.array.isRequired,
    fetchpermissionreq: React.PropTypes.func.isRequired,
    //deleteContest: React.PropTypes.func.isRequired
}

function mapStateToProps(state, props) {
    console.log("States-------------", state);
    console.log("props-------------", props);
    return {
        permission: state.permissionsReq[0]
    }
}

//export default connect(mapStateToProps, { fetchpermissionreq })(PermissionsReq);

export default PermissionsReq;
/* eslint-disable */