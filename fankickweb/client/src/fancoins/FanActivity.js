/* eslint-disable */
import React, { Children } from 'react';
//import $ from 'jquery';
import { Col, Row, Select, Switch, Input, Tabs, Form, Checkbox } from 'antd';
//import { Link } from 'react-router';
//import css from './fancoins.css';
import CreateEvent from './fanactivity/CreateEvent';
import FanClubFeed from './fanactivity/FanClubFeed';
import ReferFriend from './fanactivity/ReferFriend';
import CreateProfile from './fanactivity/CreateProfile';
//const TabPane = Tabs.TabPane;
//const FormItem = Form.Item;
const Option = Select.Option;
//const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;


// function callback(key) {
//     console.log(key);
// }


// const formItemLayout = {
//     labelCol: {
//         xs: { span: 24 },
//         sm: { span: 6 },
//     },
//     wrapperCol: {
//         xs: { span: 24 },
//         sm: { span: 14 },
//     },
// };

// function onChange(checked) {
//     console.log(`switch to ${checked}`);
// }

// function onChange(date, dateString) {
//     console.log(date, dateString);
// }

// function onChange(value) {
//     console.log('changed', value);
// }

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

// function handleBlur() {
//     console.log('blur');
// }

// function handleFocus() {
//     console.log('focus');
// }

// function handleChange(value) {
//     console.log(`selected ${value}`);
// }


// function onChange(checkedValues) {
//     console.log('checked = ', checkedValues);
// }

//const plainOptions = ['Facebook', 'Twitter', 'Instagram', 'Share Message'];
// const options = [
//     { label: 'Facebook', value: 'Facebook' },
//     { label: 'Twitter', value: 'Twitter' },
//     { label: 'Instagram', value: 'Instagram' },
//     { label: 'Share Message', value: 'Share Message' },
// ];

// const promtecheckBox = [
//     { label: 'FanClubs', value: 'FanClubs' },
//     { label: 'Fun2Win', value: 'Fun2Win' },
// ];

// const promteCheckBx = [
//     { label: 'FanClubs', value: 'FanClubs' },
//     { label: 'All', value: 'All' },
// ];




class FanActivity extends React.Component {
    state = {
        size: 'large',
        questionModel: ''
    };

    constructor(props) {
        super(props);

        this.onQuestionTypeChange = this.onQuestionTypeChange.bind(this);

    }

    handleSizeChange = (e) => {
        this.setState({ size: e.target.value });
    }

    onQuestionTypeChange(e) {
        //console.log(e, 'was changed in question type');
        this.setState({
            questionModel: e
        })
    }



    render() {
        // const size = this.state.size;
        var bindQuestion = '';
        if (this.state.questionModel === 'Create Profile') {
            bindQuestion = <CreateProfile resetData={this.props.resetData.fanActivity} />;
        }
        else if (this.state.questionModel === 'Create Event') {
            bindQuestion = <CreateEvent resetData={this.props.resetData.fanActivity} />;
        }
        else if (this.state.questionModel === 'FanClub Feed') {
            // var bindQuestion = FanClubFeed;
            bindQuestion = <FanClubFeed resetData={this.props.resetData.fanClubs} />;
        } else {
            bindQuestion = <ReferFriend resetData={this.props.resetData.fanActivity} />;
        }
        return (
            <div>
                {/* <Select defaultValue="Refer a Friend" style={{ width: "50%" }} onChange={this.onQuestionTypeChange}>
                    <Option value="Refer a Friend">Refer a Friend</Option>
                    <Option value="Create Profile">Create Profile</Option>
                    <Option value="Create Event">Create Event</Option>
                    <Option value="FanClub Feed">FanClub Feed</Option>
                </Select>
                <Row>
                    <Col span={24}>                     
                        {bindQuestion}
                    </Col>
                </Row> */}

                <Row>
                    <Col span={24}>
                       <Col span={12}>
                            <ReferFriend resetData={this.props.resetData.fanActivity} />

                        </Col>
                        <Col span={12}>
                            <CreateProfile resetData={this.props.resetData.fanActivity} />

                        </Col>
                        <Col span={12}>
                            <CreateEvent resetData={this.props.resetData.fanActivity} />

                        </Col>
                     <Col span={12}>
                            <FanClubFeed resetData={this.props.resetData.fanClubs} />
                        </Col>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default FanActivity;
/* eslint-disable */