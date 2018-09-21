import React from 'react';
import $ from 'jquery';
import './funclub.css';
import Dashboard from '../Dashboard/Dashboard';

import { Row, Col,  Input, Form} from 'antd';
const FormItem = Form.Item;
$(function () {


    // Then hide the second div
    $("#div2").hide();

    // Then add a click handlers to the buttons
    $("#button1").click(function () {
        $("#div1").show();
        $("#div2").hide();
        $(this).addClass('addbuttonColor');
        $('#button2').removeClass('addbuttonColor');
    });
    $("#button2").click(function () {
        $(this).addClass('addbuttonColor');
        $('#button1').removeClass('addbuttonColor');
        $("#div1").hide();
        $("#div2").show();
    });
})

class FunDemo extends React.Component {


    render() {
        return (
            <Dashboard>
                <div className="DemoFun">
                    <Row>
                        <Col span={24} style={{ borderBottom: '1px solid #f0f0f0', margin: '20px auto' }}>
                            <Col span={4} >
                                <p style={{ textAlign: 'center' }} id="button1" className="addbuttonColor" >button1</p>
                            </Col>
                            <Col span={4}>
                                <p style={{ textAlign: 'center' }} id="button2" >button2</p>
                            </Col>
                        </Col>
                    </Row>
                </div>
                <div id="div1">
                    <Form>
                        <Row>
                            <Col span={12}>
                                <FormItem>
                                    <h4 className=''><span className="RedStar">*</span>Location</h4>
                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem>
                                    <h4 className=''><span className="RedStar">*</span>Location</h4>
                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem>
                                    <h4 className=''><span className="RedStar">*</span>Location</h4>
                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem>
                                    <h4 className=''><span className="RedStar">*</span>Location</h4>
                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem>
                                    <h4 className=''><span className="RedStar">*</span>Location</h4>
                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem>
                                    <h4 className=''><span className="RedStar">*</span>Location</h4>
                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row><Row>
                            <Col span={12}>
                                <FormItem>
                                    <h4 className=''><span className="RedStar">*</span>Location</h4>
                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem>
                                    <h4 className=''><span className="RedStar">*</span>Location</h4>
                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem>
                                    <h4 className=''><span className="RedStar">*</span>Location</h4>
                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem>
                                    <h4 className=''><span className="RedStar">*</span>Location</h4>
                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem>
                                    <h4 className=''><span className="RedStar">*</span>Location</h4>
                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem>
                                    <h4 className=''><span className="RedStar">*</span>Location</h4>
                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem>
                                    <h4 className=''><span className="RedStar">*</span>Location</h4>
                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem>
                                    <h4 className=''><span className="RedStar">*</span>Location</h4>
                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem>
                                    <h4 className=''><span className="RedStar">*</span>Location</h4>
                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem>
                                    <h4 className=''><span className="RedStar">*</span>Location</h4>
                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem>
                                    <h4 className=''><span className="RedStar">*</span>Location</h4>
                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem>
                                    <h4 className=''><span className="RedStar">*</span>Location</h4>
                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row>

                    </Form>
                </div>
                <div id="div2">
                    <Form>
                        <Row>
                            <Col span={12}>
                                <FormItem>
                                  
                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem>
                                
                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem>
                                   
                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem>
                                  
                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem>
                                   
                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem>
                               
                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row><Row>
                            <Col span={12}>
                                <FormItem>
                               
                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem>

                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem>
                                 
                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem>
                                   
                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem>
                                   
                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem>
                                  
                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem>
                                   
                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem>
                                   
                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem>
                                   
                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem>
                                  
                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem>
                                   
                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem>
                                 
                                    <Input placeholder="Enter Location" maxLength="20" name="location" />

                                </FormItem>
                            </Col>
                        </Row>

                    </Form>
                </div>


            </Dashboard>
        );
    }
}
export default FunDemo;