import React from 'react';
import './crudstyles.css';
import {Col, Row } from 'antd';
class Brand extends React.Component {
  render() {

    return (
      <div className="widthresponsive">
        <div className="SubMenuCrud">
          <Row>
            <Col span={24}>
              Brand
     </Col>
          </Row>
        </div>
      </div>
    );
  };
}


export default Brand;