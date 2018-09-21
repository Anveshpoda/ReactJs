/* eslint-disable */
import React from 'react';
import { Col, Row, Select, Input } from 'antd';
import { Link } from 'react-router';
import css from './fancoins.css';
import Contests from './challengescontests/Contests';
import Fun2WinChallenges from './challengescontests/Fun2WinChallenges';
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

class ChallengesContests extends React.Component {
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
        this.setState({
            questionModel: e
        })
    }


    render() {
        const size = this.state.size;
        if (this.state.questionModel === 'Contests') {
            var bindQuestion = <Contests resetData={this.props.resetData.contests} />;
        } else {
            var bindQuestion = <Fun2WinChallenges resetData={this.props.resetData.fun2win} />;
        }
        return (
            <div>
                {/* <Select defaultValue="Fun2Win Challenges" style={{ width: "50%" }} onChange={this.onQuestionTypeChange}>
                    <Option value="Fun2Win Challenges">Fun2Win Challenges</Option>
                    <Option value="Contests">Contests</Option>
                </Select>
                <Row>
                    <Col span={24}>
                        {bindQuestion}
                    </Col>
                </Row> */}

                <Row>
                    <Col span={24}>
                        <Col span={12}>

                            <Fun2WinChallenges resetData={this.props.resetData.fun2win} />
                        </Col>
                        <Col span={12}>

                            <Contests resetData={this.props.resetData.contests} />
                        </Col>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default ChallengesContests;
/* eslint-disable */