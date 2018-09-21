import React from 'react';
import  './crudstyles.css';
import { Col, Row } from 'antd';

class SportsMatch extends React.Component {
  render() {
   
     return (
     <div className="widthresponsive">
      <div className="SubMenuCrud">
      <Row>
            <Col span={24}>
     Sports Match
     </Col>
     </Row>
     </div>
      </div>
    );
  };
}


export default SportsMatch;