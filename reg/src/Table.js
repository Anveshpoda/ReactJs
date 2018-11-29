import React, { Component } from 'react';
import { Table, Divider } from 'antd';
import data from './products.json'

export default class Table1 extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        total: 0,
        count: 0,
        cartItems: []
      };
    }

    edit = (r) =>{
      var total = this.state.total
      var count = this.state.count
      var arr = this.state.cartItems
      arr.push(r)
        this.setState({ total:total+r.price, count:count+1 , cartItems:arr})
    }

    delete = (r) =>{
      const arrayCopy = this.state.cartItems.filter((row) => row.id !== r.id);
      var total = this.state.total
      var count = this.state.count
        this.setState({ total:total-r.price, count:count-1 , cartItems:arrayCopy})
    }

    render() {
      //const items = this.props.items;

      const columns = [{
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      }, {
        title: 'price',
        dataIndex: 'price',
        key: 'price',
      },{
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      }, {
        title: 'style',
        dataIndex: 'style',
      }, {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <div>
            <input type="button" value="Edit" onClick={() => this.edit(record)} className="del-btn" />
          </div>
        ),
      }];

      const columns1 = [{
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      }, {
        title: 'price',
        dataIndex: 'price',
        key: 'price',
      }, {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <div>
            <input type="button" value="Edit" onClick={() => this.delete(record)} className="del-btn" />
          </div>
        ),
      }];

      const data1 = this.state.cartItems
      return (
        <div>
          
          count = {this.state.count}
          Total = {this.state.total}
       <div>
        <Table columns={columns} pagination={{ pageSize: 10 }} dataSource={data.products} />
        <Table columns={columns1} pagination={{ pageSize: 10 }} dataSource={data1} />
      </div>
        </div>
      );
    }
  }


//   export default Table;
