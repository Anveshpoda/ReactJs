/* eslint-disable */
import React, { PropTypes } from 'react';
import RichTextEditor from 'react-rte';
import axios from 'axios';
import $ from 'jquery';
import { Scrollbars } from 'react-custom-scrollbars';
import { Icon, Col, Button, Input, Form, InputNumber, message, Upload, Select, Modal } from 'antd';
import css from '../Coupons.css';
const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input;


const props = {
    name: 'file',
    action: process.env.REACT_APP_API_HOST + '/rest/azureImageUploadWeb',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

class AddNewCoupon extends React.Component {
    static propTypes = {
        onChange: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            contests: [],
            couponTypes: [],
            errors: {},
            id: '',
            couponFrom: '',
            couponDescription: '',
            couponCost: '',
            fanCoins: '',
            couponType: '',
            couponIcon: '',
            inputType: '',
            inputLimit: '',
            couponImageUrl: '',
            termsAndConditions: RichTextEditor.createEmptyValue(),
            value: RichTextEditor.createEmptyValue()
        }
        this.baseState = this.state;
        this.onChangecouponFrom = this.onChangecouponFrom.bind(this);
        this.onChangecouponDescription = this.onChangecouponDescription.bind(this);
        this.onChangetermsAndCon = this.onChangetermsAndCon.bind(this);
        this.onChangefanCoins = this.onChangefanCoins.bind(this);
        this.onChangecouponCost = this.onChangecouponCost.bind(this);
        this.onChangecouponType = this.onChangecouponType.bind(this);

    }

    componentWillMount() {
        this.getcouponType();
    }

    showModal = (e) => {
        // console.log("bulk upload")
        var id = this.props.id
        var self = this;
        self.setState({
            visible: true,
        });
    }

    getcouponType = () => {
        //  console.log("User -----------", sessionStorage.getItem('token'))
        var instance = axios.create({
            headers: { 'x-access-token': sessionStorage.getItem('token') }
        });
        instance.get('/coupon-types').then((response) => {
            // console.log("Data couponType------------------", response.data.data);
            this.setState({ couponTypes: response.data.data });
        });
    }

    onChangecouponFrom(e) {
        if (e) {
            this.state.errors.m1 = ''
        }
        $("Input").on("keydown", function (e) {
            if (e.which === 32 && !this.value.length)
                e.preventDefault();
        });
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangecouponDescription(e) {
        if (e) {
            this.state.errors.m7 = ''
        }
        $("TextArea").on("keydown", function (e) {
            if (e.which === 32 && !this.value.length)
                e.preventDefault();
        });
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangetermsAndCon(value) {
        this.setState({ value });
        if (this.props.onChange) {
            this.props.onChange(
                value.toString('html')
            );
        }
    }

    onChangefanCoins(value) {
        if (value) {
            this.state.errors.m4 = ''
        }
        this.setState({
            fanCoins: value
        })

    }

    onChangecouponCost(value) {
        if (value) {
            this.state.errors.m3 = ''
        }
        this.setState({
            couponCost: value
        })

    }

    onChangecouponType(e) {
        if (e) {
            this.state.errors.m2 = ''
        }
        // console.log("e---------------------", e);
        // this.setState({
        //     couponType: e
        // })


        $("Input").on("keydown", function (e) {
            if (e.which === 32 && !this.value.length)
                e.preventDefault();
        });
        e.preventDefault();
        this.setState({
            couponType: e.target.value
        })
    }

    uploadCouponImage = (info) => {
        if (info) {
            this.state.errors.m5 = ''
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            this.setState({
                couponImageUrl: info.file.response.data
            })
        }
    }

    uploadCouponIcon = (info) => {
        if (info) {
            this.state.errors.m6 = ''
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            this.setState({
                couponIcon: info.file.response.data
            })
        }
    }

    handleSubmit = (e) => {
        var htmlvalue = this.state.value.toString('html')
        var htmlcode = "<html><head><link href='https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i' rel='stylesheet'></head><body><ul style='font-family:roboto;margin-Left:-50px;color:#929292'>" + htmlvalue + "</ul><body></html>"
        this.state.termsAndConditions = htmlcode;
        e.preventDefault();
        message.destroy();
        let errors = {};

        if (this.state.couponType.trim().length > 20) {
            errors.m2 = "Max length is 20 characters";
        }
        if (this.state.couponType.trim() === "") {
            errors.m2 = "This field is mandatory";
        }
        if (this.state.couponFrom.trim() === "") {
            errors.m1 = "This field is mandatory";
        }
        if (this.state.couponDescription === undefined || this.state.couponDescription === "") {
            errors.m7 = "This field is mandatory";
        }
        if (this.state.couponCost === undefined || this.state.couponCost === "") {
            errors.m3 = "This field is mandatory";
        }
        if (this.state.fanCoins === undefined || this.state.fanCoins === "") {
            errors.m4 = "This field is mandatory";
        }
        if (this.state.couponImageUrl.trim() === "") {
            errors.m5 = "Image is mandatory";
        }
        if (this.state.couponIcon.trim() === "") {
            errors.m6 = "Image is mandatory";
        }
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            var req = axios.create({
                headers: { "x-access-token": sessionStorage.token },
                params: {
                    couponCost: this.state.couponCost,
                    fanCoins: this.state.fanCoins,
                    couponFrom: this.state.couponFrom.trim()
                }
            });
            req.get('/editCouponBrand').then((response) => {
                if (response.data.data.length === 0) {
                    var data = {
                        'couponFrom': this.state.couponFrom.trim(),
                        'couponDescription': this.state.couponDescription.trim(),
                        'couponCost': this.state.couponCost,
                        'fanCoins': this.state.fanCoins,
                        'couponType': this.state.couponType.trim(),
                        'couponImageUrl': this.state.couponImageUrl,
                        'couponIcon': this.state.couponIcon,
                        'couponImage': this.state.couponIcon,
                        'type': this.state.inputType,
                        'limit': this.state.inputLimit,
                        'termsAndConditions': this.state.termsAndConditions,
                        'brandAndroidUrl': "",
                        'brandIosUrl': "",
                        'brandWebUrl': ""
                    }
                    //console.log("X----->",data);
                    this.updateNewCoupon(data);
                } else {
                    message.error(`This brand already exists`);
                }
            })
        }
    }

    onChangeType = (e) => {
        this.setState({ inputType: e.target.value })
    }

    onChangeLimit = (e) => {
        this.setState({ inputLimit: e })
    }

    updateNewCoupon = (data) => {
        var _this = this;
        const url = '/coupon';
        var request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                'x-access-token': sessionStorage.getItem('token')
            }
        });
        fetch(request)
            .then(function (response) {
                if (response.status === 200) {
                    message.success('Contents coins updated successfully!');
                    _this.setState({
                        couponType: '',
                        couponFrom: '',
                        couponDescription: '',
                        couponCost: '',
                        fanCoins: '',
                        couponImageUrl: '',
                        couponIcon: '',
                        termsAndConditions: RichTextEditor.createEmptyValue(),
                        visible: false
                    })

                    // window.location.href = "/allcoupons";
                }
                else {
                    message.error(`Unable to create new brand`, 5);
                    // console.log("dataresponse", response);
                }
            })
    }

    handleOk = (e) => {
        // console.log(e);
        // this.setState({
        //     visible: false,
        // });
        this.setState({
            couponType: '',
            couponFrom: '',
            couponDescription: '',
            couponCost: '',
            fanCoins: '',
            couponImageUrl: '',
            couponIcon: '',
            termsAndConditions: RichTextEditor.createEmptyValue(),
            visible: false,
            errors: {}
        })

    }
    handleCancel = (e) => {
        // console.log(e);
        // this.setState({
        //     visible: false,
        // });
        this.setState({
            couponType: '',
            couponFrom: '',
            couponDescription: '',
            couponCost: '',
            fanCoins: '',
            couponImageUrl: '',
            couponIcon: '',
            termsAndConditions: RichTextEditor.createEmptyValue(),
            visible: false,
            errors: {}
        })
    }

    render() {
        const { couponImageUrl } = this.state;
        const { couponIcon } = this.state;
        const { imageUrl } = this.state;
        const mapCoupon = this.state.couponTypes.map((coupon) => <Option value={coupon._id}>{coupon.couponFrom}</Option>);
        return (
            <Modal
                className="Addnew-coupmerchant"
                title="Add New Brand/Merchant"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={<Button className="SubmitBtn" type="primary" onClick={this.handleSubmit.bind(this)}>Submit</Button>}
                >
                <Scrollbars style={{ height: '56vh', padding: '0px 10px' }}>
                    <div className="AddCouponMainBody">
                        <span id="points" style={{ color: "red" }}>{this.state.errors.mess}</span>
                        <Col span={24}>
                            <Col span={11}>

                                <FormItem>
                                    <h6 className='AddCoupnh6Fnt'>Coupon Type</h6>
                                    <Input placeholder="Specify Coupon Type" maxLength="20" name="couponFrom" value={this.state.couponType} onChange={this.onChangecouponType} />
                                    <p id="points" style={{ color: "red" }}>{this.state.errors.m2}</p>
                                </FormItem>
                            </Col>

                            <Col span={11} offset={2}>
                                <FormItem className="marginLft50" >
                                    <h6 className='AddCoupnh6Fnt paddingLft50'>Coupon From</h6>
                                    <Input placeholder="Specify Merchant" maxLength="20" name="couponFrom" value={this.state.couponFrom} onChange={this.onChangecouponFrom} />
                                    <p id="points" style={{ color: "red" }}>{this.state.errors.m1}</p>
                                </FormItem>
                            </Col>


                        </Col>
                        <Col span={24}>
                            <FormItem>
                                <h6 className='AddCoupnh6Fnt'>Coupon Description</h6>
                                <TextArea rows={3} value="" name="couponDescription" maxLength="30" placeholder="Coupon Description" value={this.state.couponDescription} onChange={this.onChangecouponDescription} />
                                <p id="points" style={{ color: "red" }}>{this.state.errors.m7}</p>
                            </FormItem>
                        </Col>
                        <Col span={24}>
                            <Col span={12}>
                                <FormItem>
                                    <h6 className='AddCoupnh6Fnt'>Coupon Cost (Rupees)</h6>
                                    <InputNumber className="CouponsPopupInputWidth" min={1} max={1000} name="couponCost" value={this.state.couponCost} onChange={this.onChangecouponCost} />
                                    <p id="points" style={{ color: "red" }}>{this.state.errors.m3}</p>
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem className="marginLeft30">
                                    <h6 className='AddCoupnh6Fnt'>Fan Coins (Redemption Value)</h6>
                                    <InputNumber className="CouponsPopupInputWidthRight" min={1} max={100000} name="fanCoins" value={this.state.fanCoins} onChange={this.onChangefanCoins} />
                                    <p id="points" style={{ color: "red" }}>{this.state.errors.m4}</p>
                                </FormItem>
                            </Col>
                        </Col>

                        <Col span={24}>
                            <Col span={12}>
                                <FormItem>
                                    <h6 className='AddCoupnh6Fnt'>Type</h6>
                                    <Input className="CouponsPopupInputWidth" name="couponCost" value={this.state.inputType} onChange={this.onChangeType} />
                                    <p id="points" style={{ color: "red" }}>{this.state.errors.m3}</p>
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem className="marginLeft30">
                                    <h6 className='AddCoupnh6Fnt'>Limit</h6>
                                    <InputNumber className="CouponsPopupInputWidthRight" min={1} max={100} name="fanCoins" value={this.state.inputLimit} onChange={this.onChangeLimit} />
                                    <p id="points" style={{ color: "red" }}>{this.state.errors.m4}</p>
                                </FormItem>
                            </Col>
                        </Col>

                        <Col span={24}>

                            <FormItem>
                                <h6 className='AddCoupnh6Fnt'>Terms and Conditions</h6>
                                <div className="AddCouponRichtext">
                                    <RichTextEditor className="laTOfONT"
                                        value={this.state.value}
                                        onChange={this.onChangetermsAndCon}
                                        />
                                </div>
                            </FormItem>

                        </Col>
                        <Col span={24}>
                            <Col span={12} className="">
                                <FormItem>
                                    <h6 className='AddCoupnh6Fnt'>Add Coupon logo</h6>
                                    <div className="AddCouponsUploadImage">
                                        <Upload {...props}
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            onChange={this.uploadCouponImage}
                                            accept=".png,.jpg,.jpeg"
                                            >
                                            {
                                                couponImageUrl ?
                                                    <img src={this.state.couponImageUrl} alt="" className="avatar" /> :
                                                    <Icon type="plus" className="avatar-uploader-trigger" />
                                            }
                                        </Upload>
                                        <p>{this.state.couponImageUrl}</p>
                                        <p>{this.state.couponIcon}</p>
                                    </div>
                                    <p id="points" style={{ color: "red" }}>{this.state.errors.m5}</p>
                                </FormItem>
                            </Col>

                            <Col span={12} className="">
                                <FormItem>
                                    <h6 className='AddCoupnh6Fnt'>Add Coupon Image</h6>
                                    <div className="AddCouponsUploadImage">
                                        <Upload {...props}
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            onChange={this.uploadCouponIcon}
                                            accept=".png,.jpg,.jpeg">
                                            {
                                                couponIcon ?
                                                    <img src={this.state.couponIcon} alt="" className="avatar" /> :
                                                    <Icon type="plus" className="avatar-uploader-trigger" />
                                            }
                                        </Upload>
                                    </div>
                                    <p id="points" style={{ color: "red" }}>{this.state.errors.m6}</p>
                                </FormItem>
                            </Col>
                        </Col>
                        <Button className="SubmitBtn" type="primary" onClick={this.handleSubmit.bind(this)}>Submit</Button>


                    </div>
                </Scrollbars>
            </Modal>


        );
    }
}
export default AddNewCoupon;