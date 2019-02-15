import React, { Component } from 'react'
import MainLayout from './MainLayout/MainLayout'
import { Col, Card, Row, Form, Input, Button, Slider, InputNumber } from 'antd';
import { Circle, GoogleMap, InfoWindow, withGoogleMap } from "react-google-maps";
import canUseDOM from "can-use-dom";
import raf from "raf";

const geolocation = (
  canUseDOM && navigator.geolocation ?
    navigator.geolocation :
    ({
      getCurrentPosition(success, failure) {
        failure(`Your browser doesn't support geolocation.`);
      },
    })
);



const GeolocationExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap defaultZoom={15} center={props.center} >
    {props.center && (
      <InfoWindow position={props.center}>
        <div>{props.content}</div>
      </InfoWindow>
    )}
    {props.center && (
      <Circle
        center={props.center}
        radius={props.radius}
        
        options={{
          fillColor: '#1DD9FA',
          fillOpacity: 0.30,
          strokeColor: 'blue',
          strokeOpacity: 1,
          strokeWeight: 1,
        }}
      />
    )}
    {props.center && (
      <Circle
        center={props.center}
        radius={props.radius2? props.radius2: 400}
        
        options={{
          fillColor: '#1DD9FA',
          fillOpacity: 0.20,
          strokeColor: '#1DD9FA',
          strokeOpacity: 1,
          strokeWeight: 1,
        }}
      />
    )}
    {props.center && (
      <Circle
        center={props.center}
        radius={props.radius3? props.radius3: 600}
        
        options={{
          fillColor: 'red',
          fillOpacity: 0.10,
          strokeColor: 'red',
          strokeOpacity: 1,
          strokeWeight: 1,
        }}
      />
    )}
  </GoogleMap>
));

export default class nav1 extends Component {
  state = {
    center: null,
    content: null,
    radius: 3000,
    storeName: '',
    errors: {},
    radius2: 1,
    radius3: 1,
  };

  onChange = (value) => {
    this.setState({
      inputValue: value,
    });
  }

  isUnmounted = false;

  componentDidMount() {
    const tick = () => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({ radius: Math.max(this.state.radius - 20, 0) });

      if (this.state.radius > 200) {
        raf(tick);
      }
    };
    geolocation.getCurrentPosition((position) => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        content: `Location found using HTML5.`,
      });

      raf(tick);
    }, (reason) => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({
        center: {
          lat: 60,
          lng: 105,
        },
        content: `Error: The Geolocation service failed (${reason}).`,
      });
    });
  }

  onChangeRadious1 = e => {
    this.setState({
      radius: e,
    });
  }

  onChangeRadious2 = e =>   this.setState({ radius2: e });
  onChangeRadious3 = e =>   this.setState({ radius3: e });
  

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  render() {

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    const tailFormItemLayout1 = {
      wrapperCol: {
        xs: {  span: 24 },
        sm: {
          span: 20,
          offset: 4 
        },
      },
    };

    
    const { inputValue, radius, radius1, radius2, radius3 } = this.state;


    return (
      <MainLayout>
        <div>
          <div >
            <Row style={{ height: "80vh", float: "center" }} gutter={10}>
              <Col span={12}>
                <Card className="geoCard" bordered={true}>

                  <Form onSubmit={this.handleSubmit}>

                    <Form.Item  {...formItemLayout} label="Store Name" >
                      <Input placeholder="Store Name" value={this.state.storeName} name="storeName" onChange={this.handleChange11} />
                      <span style={{ color: 'Red' }}>{this.state.errors.storeName}</span>
                    </Form.Item>

                    <Form.Item  {...formItemLayout} label="Srore ID" >
                      <Input placeholder="Srore ID" value={this.state.sroreId} name="sroreId" onChange={this.handleChange11} />
                      <span style={{ color: 'Red' }}>{this.state.errors.sroreId}</span>
                    </Form.Item>

                    <Form.Item  {...formItemLayout} label="Latitude" >
                      <Input placeholder="Latitude" value={this.state.latitude} name="latitude" onChange={this.handleChange11} />
                      <span style={{ color: 'Red' }}>{this.state.errors.latitude}</span>
                    </Form.Item>
                    <Form.Item  {...formItemLayout} label="Longitude" >
                      <Input placeholder="Longitude" value={this.state.longitude} name="longitude" onChange={this.handleChange11} />
                      <span style={{ color: 'Red' }}>{this.state.errors.longitude}</span>
                    </Form.Item>

                    <Form.Item   {...formItemLayout} label="Radius 1">
                      <Row >
                        <Col span={18} >
                          <Slider min={1} max={400} 
                            onChange={this.onChangeRadious1}
                            value={typeof radius === 'number' ? radius : 0}
                          />
                        </Col>
                        <Col span={4}>
                          <InputNumber min={1} max={400}
                            style={{ marginLeft: 16 }}
                            value={radius}
                            onChange={this.onChangeRadious1}
                          />
                        </Col>
                      </Row>
                    </Form.Item>

                    <Form.Item   {...formItemLayout} label="Radius 2">
                      <Row >
                        <Col span={18} >
                          <Slider
                            min={1}
                            max={700}

                            onChange={this.onChangeRadious2}
                            value={typeof radius2 === 'number' ? radius2 : 0}
                          />
                        </Col>
                        <Col span={4}>
                          <InputNumber
                            min={1}
                            max={700}
                            style={{ marginLeft: 16 }}
                            value={radius2}
                            onChange={this.onChangeRadious2}
                          />
                        </Col>
                      </Row>
                    </Form.Item>

                    <Form.Item  {...formItemLayout} label="Radius 3">
                      <Row >
                        <Col span={18} >
                          <Slider
                            min={1}
                            max={1000}

                            onChange={this.onChangeRadious3}
                            value={typeof radius3 === 'number' ? radius3 : 0}
                          />
                        </Col>
                        <Col span={4}>
                          <InputNumber
                            min={1}
                            max={1000}
                            style={{ marginLeft: 16 }}
                            value={radius3}
                            onChange={this.onChangeRadious3}
                          />
                        </Col>
                      </Row>
                    </Form.Item>


                    <Form.Item {...tailFormItemLayout}>
                      <Button type="primary" htmlType="submit">Register</Button>
                    </Form.Item>


                  </Form>




                </Card>
              </Col>
              <Col span={12}>
                <Card className="geoCard" bordered={false}>
                  <h2> Gio Location</h2>
                  <GeolocationExampleGoogleMap
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `550px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    center={this.state.center}
                    content={this.state.content}
                    radius={this.state.radius}
                    radius2={this.state.radius2}
                    radius3={this.state.radius3}
                  />

                </Card>
              </Col>

            </Row>
          </div>

        </div>
      </MainLayout>
    )
  }
}
