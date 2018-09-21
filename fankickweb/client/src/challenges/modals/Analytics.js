/* eslint-disable */
import React from 'react';
import $ from 'jquery';
import moment from 'moment';
import axios from 'axios';
import { Link } from 'react-router';
import classnames from 'classnames';
import css from '../challenge.css';
import { Menu, Col, Row, Card, Button, Icon, Dropdown, message, Modal, Form, Spin, DatePicker } from 'antd';
const FormItem = Form.Item;
const dateFormat = 'YYYY/MM/DD';
class Analytics extends React.Component {
  constructor(props) {
    super(props);
    this.state =
      {
        visible: false,
        analyticsdata: {},
        participatedcount: '',
        errors: {},
        id: '',
        totalposts: ''
      }

  }
  showModal = (e) => {
    var id = this.props.id
    var self = this;
    axios.get('/contest/' + id, {
      headers: {
        "x-access-token": sessionStorage.token,
      },
    })
      .then(function (response) {
        // console.log("analytics data", response.data.data);
        const data = response.data.data;
        self.setState({ analyticsdata: response.data.data })
        //  console.log("particiupated count", response.data.data.pCount);
        self.setState({ participatedcount: response.data.data.pCount })
        self.setState({ totalposts: response.data.data.feedDetails.length })
      })
      .catch(function (error) {
        // console.log(error);
      });
    self.setState({
      visible: true, id: this.props.id
    });
  }
  handleOk = (e) => {
    //  console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    // console.log(e);

    this.setState({
      visible: false,
    });
  }



  render() {

    var number67 = (Math.floor(Math.random() * 40 + 1));
    var number68 = (Math.floor(Math.random() * 50 + 1));
    // console.log("number67",number67);
    // console.log("number68", number68);
    // var number69=(Math.floor(Math.random() * 200 + 1));
    // var number70=(Math.floor(Math.random() * 50 + 1));
    const analyticsdata = this.state.analyticsdata
    const participatedcount = this.state.participatedcount;
    const totalposts = this.state.totalposts;
    var g = new Date();
    var currentdate = moment(g).format('L,LTS');

    return (
      
       
        <Modal
          className="UpgrademodalHeight analyticsModal"
          title={analyticsdata.contestTitle}
          visible={this.state.visible}
          wrapClassName="vertical-center-modal"
          onOk={this.handleOk}
          width="700"
          onCancel={this.handleCancel}
          footer={<Button className="mrgnRight8" type="primary" onClick={this.handleCancel}>Cancel</Button>}
          >
          <Form className="txtLeft">
            <div className="challengeDetails">
              {/* <Row>
                <Col span={16}>
                  <h2></h2>
                  <h3 className="suBTxt">{currentdate}</h3>
                </Col>

              </Row> */}

              <Row>
                <Col span={12} className="rfunwinimg">
                  <img src={analyticsdata.contestIcon} alt="Contest Cover" width="100%" />

                </Col>
                <Col span={12}>
                  <div className="postAnalytics">
                    <div className="postAnalyticsDivh2">
                      <h2> Post Analytics</h2>
                    </div>
                    <div className="postAnalyticsDiv">
                      <ul className="list-inline">
                        <li>Total Views: {totalposts}</li>
                        <li>Participated :{participatedcount}</li>
                      </ul>
                    </div>
                    <div className="postAnalyticslikes">
                      <ul className="list-inline">
                        <li><span>
                          <Icon type="heart-o" />
                        </span>
                          Total likes:{number67} </li>
                        <li> <span>
                          <Icon type="message" />
                        </span>

                          Comments : {number68}</li>
                      </ul>

                    </div>
                  </div>
                </Col>
                {/* <Col span={12} className="">
                  <Row style={{ paddingBottom: '24px' }}>
                    <h3>Fankick Posts</h3>
                    <Col span={24} className="totalcounts" style={{ border: '1px solid #f0f0f0' }}>
                      <Col span={7}>
                        <h3>Total Posts</h3>
                        <p>125</p>


                      </Col>
                      <Col span={8}>
                        <h3>Participated</h3>
                        <p></p>

                      </Col>
                      <Col span={9}>
                        <h3>Completed</h3>
                        <p>125</p>

                      </Col>

                    </Col>

                  </Row>
                  <Row>
                    <h3>Total posted on different social media:</h3>
                    <Col span={12}>

                      <Col span={24} style={{ border: '1px solid #f0f0f0', borderRadius: '5px', padding: '10px', margin: '5px' }}>
                        <Col span={5}>
                          <span>
                            <Icon type="heart-o" />
                          </span>
                        </Col>
                        <Col span={12}>
                          <h4>Likes</h4>
                          <h3 className="BlueClr">22k</h3>
                        </Col>
                      </Col>


                      <Col style={{ border: '1px solid #f0f0f0', borderRadius: '5px', padding: '10px', margin: '5px' }} span={24}>
                        <Col span={5}>
                          <span>
                            <Icon type="share-alt" />
                          </span>
                        </Col>
                        <Col span={12}>
                          <h4>Shares</h4>
                          <h3 className="BlueClr">22k</h3>
                        </Col>
                      </Col>


                    </Col>

                    <Col span={12}>


                      <Col span={24} style={{ border: '1px solid #f0f0f0', borderRadius: '5px', padding: '10px', margin: '5px' }}>
                        <Col span={5}>
                          <span>
                            <Icon type="message" />
                          </span>
                        </Col>
                        <Col span={12}>
                          <h4>Comments</h4>
                          <h3 className="BlueClr">22k</h3>
                        </Col>
                      </Col>


                      <Col style={{ border: '1px solid #f0f0f0', borderRadius: '5px', padding: '10px', margin: '5px' }} span={24}>
                        <Col span={5}>
                          <span>
                            <Icon className="paddngZero" style={{ padding: '0px' }} type="eye-o" />
                          </span>
                        </Col>
                        <Col span={12}>
                          <h4>Views</h4>
                          <h3 className="BlueClr">22k</h3>
                        </Col>
                      </Col>

                    </Col>

                  </Row>
                </Col> */}
              </Row>
            </div>


          </Form>
        </Modal>



      
    );
  }
}
export default (Analytics);
/* eslint-disable */