/* eslint-disable */
import React from 'react';
import axios, { post } from 'axios';
import Workbook from 'react-excel-workbook';
import reqwest from 'reqwest';
import clone from 'clone';
import $ from 'jquery';
import { Icon, Col, Button, Select, Input, Form, DatePicker, message, Upload, Row, Modal } from 'antd';
import css from '../Coupons.css';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
function disabledDate(current) {
    if (!current) {
        return false;
    }
    const date = moment();
    date.hour(0);
    date.minute(0);
    date.second(0);
    return current.valueOf() < date.valueOf();
}
//const format = 'h:mm a';
const dateFormat = 'YYYY-MM-DD';
class BulkUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            couponTypes: [],
            errors: {},
            couponBeginDate: new Date(),
            couponEndDate: '',
            couponStatus: 'True',
            couponCode: '',
            imageUrl: '',
            // fileList: [],
            // uploading: false,
            file: null,
            visible: false
        }
        this.baseState = this.state;
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
    }  

    showModal = (e) => {
       // console.log("bulk upload")
        var id = this.props.id
        var self = this;
        self.setState({
            visible: true,
        });
    }

    // --------------------- Coupons Bulk Upload
    onFormSubmit(e) {
        e.preventDefault() // Stop form submit      
        let errors = {};
        if (this.state.file === null) {
            errors.m8 = "file is mandatory";
        }
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            // var cid = this.state.couponId;
          //  console.log("bulk upload", this.state.file)
            this.fileUpload(this.state.file).then((response) => {
             //   console.log(response.data);
                this.setState({ file: null, visible: false, });
                if(response.data.status === 200){
                    message.success('Coupons uploaded Successfully');
                }else if(response.data.status === 404){
                    message.error('Empty excel cannot be uploaded');
                }else if(response.data.status === 500){
                    message.error('Please fill all the fields');
                }
                
                document.getElementById("bulkuploadfile").value = "";
                this.props.getCoupons();
              //  window.location.reload();
                // window.location.href = "/allcoupons";
            })
        }

    }

    onChange(e) {
      //  console.log("bulk upload", e);
       // console.log("bulk upload", e.target.files[0].name);
        //this.setState({ file: e.target.files[0] })
        let errors = {};
        this.setState({ file: e.target.files[0] });
        if (e.target.files[0].type === "image/jpeg" || e.target.files[0].type === "text/plain" ||  e.target.files[0].type === "image/png"|| e.target.files[0].type === "image/jpg" || e.target.files[0].type === "image/gif") {
            errors.m8 = "Upload excl File Only";
        } else {          
            this.setState({ file: e.target.files[0] });
        }
        this.setState({ errors });
    }

    fileUpload(file) {
        const url = '/uploadCoupons';
        const formData = new FormData();
        formData.append('file', file)
        const config = {
            headers: {
                'x-access-token': sessionStorage.getItem('token')
            }
        }
        return post(url, formData, config)
    }

    handleOk = (e) => {
     //   console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
       // console.log('wwwwwwwwwwwww',e);
        document.getElementById("bulkuploadfile").value = "";
        this.setState({
            visible: false,
            file: '',
            errors: {}
            
            // fileList: [],
            // uploading: false,
        });
    }

    render() {
        return (

            <div>            
                <Modal
                    className="couponsmodalB"
                    title="Upload Stock/Coupons"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={<Button className="mrgnRight8" type="primary" onClick={this.onFormSubmit}>Submit</Button>}
                >
                    <Form className="txtLeft">
                        <form >
                            <input style={{ marginTop: 20 }} type="file"
                            id="bulkuploadfile" onChange={this.onChange} />
                            <p style={{ color: 'red' }} id="points">{this.state.errors.m8}</p>
                            {/* <Button style={{ marginTop: 20 }} type="primary" onClick={this.onFormSubmit}>Upload File</Button> */}
                            <p style={{color:"#666", fontSize:10}}>Note: Upload only xlsx files</p>
                        </form>

                    </Form>
                </Modal>
            </div>


        );

    }
}


export default BulkUpload;
/* eslint-disable */