import React from 'react';
import classNames from 'classnames/bind';
import { Col,Select,Button} from 'antd';
import fanclubs from './fanclubs.css';
const Option = Select.Option;

function handleChange(value) {
  console.log(`selected ${value}`);
}


class Fanmembers extends React.Component {
  render() {
    return (
      <div className="fanmembersmain">
       <Col span={24}>
       <Col span={12}>
       <h6 className="h6Fnt">ADD USER</h6>
        <Select defaultValue="Select User" style={{ width:'100%' }} onChange={handleChange}>
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>Disabled</Option>
      <Option value="Yiminghe">yiminghe</Option>
      <Option value="1">yiminghe</Option>
      <Option value="2">yiminghe</Option>
      <Option value="3">yiminghe</Option>
      <Option value="4">yiminghe</Option>
      <Option value="5">yiminghe</Option>
      <Option value="6">yiminghe</Option>
      <Option value="7">yiminghe</Option>
      <Option value="8">yiminghe</Option>
    </Select>
       </Col>
       <Col span={12}>
       <div className="FanAddusersbtnmain">
<Button type="primary">ADD</Button>
</div>
       </Col>

       </Col>
      </div>
    );
  }
}
export default Fanmembers;