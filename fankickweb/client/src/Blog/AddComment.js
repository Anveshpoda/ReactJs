import React from 'react';
import { Form, Input, Icon, Button, Col, Row } from 'antd';
import './AddComment.css';
const FormItem = Form.Item;
const { TextArea } = Input;

let uuid = 0;
class AddComment extends React.Component {
    constructor(){
        super();
        this.state = {
            hideButton: true
        };
    }
    remove = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        uuid++;
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
        this.setState({
            hideButton: false
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => {
            return (
                <Row>
                <Col span={24} >
                    <Col span={14} offset={5}>
                        <div className='btBox'>
                            <div>
                                <div>
                                    {keys.length > 1 ? (
                                        <Icon
                                            className="dynamic-delete-button"
                                            type="minus-circle-o"
                                            disabled={keys.length === 1}
                                            onClick={() => this.remove(k)}
                                            />
                                    ) : null}
                                    <Col span={24} offset={2}>
                                        <Col span={12}>
                                            <FormItem label='Name'>
                                                {getFieldDecorator(`Name[${k}]`, {
                                                    validateTrigger: ['onChange', 'onBlur'],
                                                    rules: [{
                                                        required: true,
                                                        whitespace: true,
                                                        message: "Please Enter Name",
                                                    }],
                                                })(
                                                    <Input placeholder="Name" style={{ width: '60%', marginRight: 8 }} />
                                                    )}
                                            </FormItem>
                                        </Col>
                                        <Col span={12}>
                                            <FormItem label='Email'>
                                                {getFieldDecorator(`email[${k}]`, {
                                                    validateTrigger: ['onChange', 'onBlur'],
                                                    rules: [{
                                                        required: true,
                                                        whitespace: true,
                                                        message: "Please Enter Email.",
                                                    }],
                                                })(
                                                    <Input placeholder="Email" style={{ width: '60%', marginRight: 8 }} />
                                                    )}
                                            </FormItem>
                                        </Col>
                                        <Col span={20}>
                                            <FormItem label='Comment'>
                                                {getFieldDecorator(`comment[${k}]`, {
                                                    validateTrigger: ['onChange', 'onBlur'],
                                                    rules: [{
                                                        required: true,
                                                        whitespace: true,
                                                        message: "Comment is required.",
                                                    }],
                                                })(
                                                    <TextArea rows={5} placeholder='Comment here' />
                                                    )}
                                            </FormItem>
                                        </Col>
                                    </Col>

                                </div>
                            </div>
                        </div>
                    </Col>
                </Col>
                </Row>
            );
        });


        var showBtn = (this.state.hideButton) ?
                (
                <FormItem>
                    <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                        Click here to post a Comment
                    </Button>
                </FormItem> 
               ) 
               :
               (
                <Form onSubmit={this.handleSubmit}>
                <div className='cmtBtn'>
                <FormItem>
                    <Button type="primary" htmlType="submit">Post Comment</Button>
                </FormItem>
                </div>
                </Form>
               );
        return (

            <Form>
                {formItems}
                <Row>
                <Col span={24}>
                <div className='cmtBox'>
                <Col span={24}>
                {showBtn}
                 </Col>
                </div>
                </Col>
                </Row>
            </Form>
        );
    }
}

export default Form.create()(AddComment);