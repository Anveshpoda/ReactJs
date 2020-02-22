import React, { Component } from 'react'
import { Table } from 'antd';

export default class componentName extends Component {
    render() {

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                //   render: text => <a>{text}</a>,
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: 'Gender',
                dataIndex: 'gender',
                key: 'gender',
            },

            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Phone No',
                dataIndex: 'phoneNo',
                key: 'phoneNo',
                render: text => <a>{text}</a>,
            },
        ];

        return (
            <div>
                <Table columns={columns} dataSource={this.props.data} />
            </div>
        )
    }
}
