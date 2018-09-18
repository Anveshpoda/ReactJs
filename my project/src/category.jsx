import React, { Component } from 'react';
import { Select } from 'antd';
import axios from 'axios';
const Option = Select.Option;

class App extends React.Component {
    state = {
        categories: [],
        subCategories: [],
        subVal : 'Select SubCategory',
    }

    componentDidMount() {
        axios.get('http://qaweb.fankick.io/categories', {
            headers: { 'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQGZhbmtpY2suaW8iLCJpYXQiOjE1MzcyNDkyNTcsImV4cCI6MTU0MzI0OTI1N30.yC5w_MaoT99NfMrraZYoo_6y8KVrR3G-7z2l7nHZuEo' }
        }).then((response) => {
            const subCat = response.data.data.filter(r => r._id === '100000000000000000000001')
            this.setState({ categories: response.data.data, subCategories: subCat[0].subCategories });
        }).catch(function (error) { console.log(error); })
    }

    handleCatChange = (e) => {
        var catid = e;
        let subCat = this.state.categories.filter(r => r._id === e)
        this.setState({ subCategories: subCat[0].subCategories , subVal: 'Select SubCategory'});
        console.log(subCat)
    }
    onSubCatChange = (e,n) => { this.setState({ subVal: n.props.children }); }

    render() {
        const mapCategories = this.state.categories.map(category => <Option value={category._id}>{category.name}</Option>);
        const mapSubCategories = this.state.subCategories.map(subCategory => <Option value={subCategory._id}>{subCategory.name}</Option>);
        //const mapSubCategories1 = this.state.categories.filter(val =>  val.id === this.state.catid).map(r => <Option value={r._id}>{r.name}</Option> );
        return (
            <div> &nbsp;&nbsp;&nbsp;
        <Select defaultValue="Select Category" style={{ width: 150 }} onChange={this.handleCatChange}>
                    {mapCategories}
                </Select>
                &nbsp;&nbsp;&nbsp;
        <Select defaultValue="Select SubCategory" value={this.state.subVal} style={{ width: 150 }} onChange={this.onSubCatChange}>
                    {mapSubCategories}
                </Select>
            </div>
        );
    }
}

export default App