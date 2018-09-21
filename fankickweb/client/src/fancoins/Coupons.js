/* eslint-disable */
import React from 'react';
import { Col, Row, Select, Input } from 'antd';
import { Link } from 'react-router';
import css from './fancoins.css';
import CouponsConfig from './coupons/CouponsConfig';
const Option = Select.Option;
const { TextArea } = Input;


function callback(key) {
    // console.log(key);
}

function onChange(checked) {
    // console.log(`switch to ${checked}`);
}

function onChange(date, dateString) {
    // console.log(date, dateString);
}

function onChange(value) {
    // console.log('changed', value);
}

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleBlur() {
    // console.log('blur');
}

function handleFocus() {
    // console.log('focus');
}

function handleChange(value) {
    // console.log(`selected ${value}`);
}


function onChange(checkedValues) {
    // console.log('checked = ', checkedValues);
}

const plainOptions = ['Facebook', 'Twitter', 'Instagram', 'Share Message'];
const options = [
    { label: 'Facebook', value: 'Facebook' },
    { label: 'Twitter', value: 'Twitter' },
    { label: 'Instagram', value: 'Instagram' },
    { label: 'Share Message', value: 'Share Message' },
];

const promtecheckBox = [
    { label: 'FanClubs', value: 'FanClubs' },
    { label: 'Fun2Win', value: 'Fun2Win' },
];

const promteCheckBx = [
    { label: 'FanClubs', value: 'FanClubs' },
    { label: 'All', value: 'All' },
];




class Coupons extends React.Component {
    state = {
        size: 'large',
        questionModel: ''
    };

    handleSizeChange = (e) => {
        this.setState({ size: e.target.value });
    }
    constructor(props) {
        super(props);
        this.onQuestionTypeChange = this.onQuestionTypeChange.bind(this);
    }

    handleSizeChange = (e) => {
        this.setState({ size: e.target.value });
    }

    onQuestionTypeChange(e) {
        console.log(e, 'was changed in question type');
        this.setState({
            questionModel: e
        })
    }



    render() {
        const size = this.state.size;
        // if (this.state.questionModel === 'App Promotion') {
        //     // var bindQuestion = FanClubFeed;
        //     var bindQuestion = <AppPromotion />;
        // } else if (this.state.questionModel === "Festival Offers") {
        //     var bindQuestion = <FestivalOffers />
        // } else if (this.state.questionModel === "Coupon Configuration") {
        //     var bindQuestion = <CouponConfiguration />
        // } else {
        //     var bindQuestion = <CelebrityPromotion />;
        // }
        return (
            <div>
                {/* <Select defaultValue="Celebrity Promotion" style={{ width: "50%" }} onChange={this.onQuestionTypeChange}>
                    <Option value="Celebrity Promotion">Celebrity Promotion</Option>
                    <Option value="Festival Offers">Festival Offers</Option>
                    <Option value="App Promotion">App Promotion</Option>
                    <Option value="Coupon Configuration">Coupon Configuration</Option>
                </Select>
                <Row>
                    <Col span={24}>
                        {bindQuestion}
                    </Col>
                </Row> */}
                <CouponsConfig />
            </div>
        );
    }
}
export default Coupons;
/* eslint-disable */