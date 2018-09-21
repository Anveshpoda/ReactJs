/* eslint-disable */
import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import clone from 'clone';
import Dashboard from '../Dashboard/Dashboard';
import { Link } from 'react-router';
import { Row, Col, Button,Spin, Tabs, Icon } from 'antd';
import css from './Celebrities.css';
import Placeholder from '../images/placeholder.png';
import amitabh1 from '../images/amitabh1.jpg';
import AddCelebrityImages from './AddCelebrityImages.js';
import AddCelebrityVideo from './AddCelebrityVideo.js';
//import moment from 'moment';
import { Scrollbars } from 'react-custom-scrollbars';
const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}
class ViewCelebrity extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      celebrityData: {},
      CelebListloading:true,
      role:''
    }
  }

  componentWillMount() {
    var user = JSON.parse(sessionStorage.getItem('user'));
    
     if (user.permissions !== '') {
       
       this.setState({ role: user.permissions.pinCeleb })
     }
    this.getCelebrityData(this.props.params._id)
  }

  componentDidMount() {
    $(function () {
      // Then hide the second div
      $("#CelebsTab2").hide();
      // Then add a click handlers to the buttons
      $("#CelebAddimageTab1").click(function () {
        $("#CelebsTab1").show();
        $("#CelebsTab2").hide();
        $(this).addClass('addbuttonColor');
        $('#CelebAddVideoTab2').removeClass('addbuttonColor');
      });
      $("#CelebAddVideoTab2").click(function () {
        $(this).addClass('addbuttonColor');
        $('#CelebAddimageTab1').removeClass('addbuttonColor');
        $("#CelebsTab1").hide();
        $("#CelebsTab2").show();
      });

    })
  }

  getCelebrityData = (id) => {
    var _this = this;
    const url = '/celebrity/' + id;
    var request = new Request(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "x-access-token": sessionStorage.token
      }
    });
 


    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        console.log(response)
        if (response.status === 200) {
          _this.setState({ celebrityData:response.data,CelebListloading:false});
        }
        else {
          console.log("dataresponse", response);
        }
      })
  }


  render() {
    return (
      <Dashboard>
        <div classname="ViewCelebritypageWhole">
          <div>
            <Row className="ViewCelebsPagesHeader Celebritiesview">
            <Col span={12}>
             <h1 className="ViewCelebrityMainsubHead">Celebrity View Details</h1>
            </Col>

              <Col span={4} style={{ float: 'right' }}>
                <Link to={"/celebritydata"} className='' activeClassName='active'>
                  <Button style={{ float: 'right' }} type="primary">Back To celebrities</Button>
                </Link>
              </Col>
            </Row>
          </div>
          <div>
            <Row>
             <Spin spinning={this.state.CelebListloading}>
              <Col span={24} className="CelebrityViewCelebritydetails">
                <ul className="list-inline">
                  <li className="ant-col-4">
                    <img src={this.state.celebrityData.celebrityImageUrl} alt="ContestCover" classname="img-responsive" height="150px" width="100%" />
                  </li>
                  <li className="ant-col-15">

                    <h3 className="ViewPageCelebName"><span className="CelebritiesViewTitles">{this.state.celebrityData.celebrityName}</span><span className="ViewPageCelebGender"> ({this.state.celebrityData.gender ? this.state.celebrityData.gender : ' Female '})</span></h3>
                    <h4 className="viewpageCelebrityRoles">
                      <span className="viewpageCelebrityRoles1">{this.state.celebrityData.occupation}</span>
                      {/* <span className="viewpageCelebrityRoles2">Comedian</span> */}
                    </h4>
                    <h4 className="viewpageCelebrityCountry">{this.state.celebrityData.country ? this.state.celebrityData.country : 'undefined'}</h4>
                    <h4 className="viewpageCelebrityLocation">
                      {this.state.celebrityData.location ? this.state.celebrityData.location.map((loc, i) => {
                        if (i < 3)
                          return (<span className="Celebritypagelocations">{loc},</span>)
                        else
                          return (null)
                      }) : <span className="Celebritypagelocations">Unspecified</span>}
                    </h4>
                    <h4 className="viewpageCelebrityTags">Tags: <span>BollyWood Actor</span></h4>
                  </li>
                  <li className="ant-col-5">
                    <ul className="list-inline ViewCelebEDitDelete">
                      <li>
                        <h4>
                          {this.state.role.edit === true ?
                          <Link to={`/celebritydata/EditCelebrity/${this.state.celebrityData._id}`} className='' activeClassName='active'>
                            <span className="ViewCelebsicons"><Icon type="edit" /></span><span>Edit Profile</span>
                          </Link>:null}
                        </h4>
                      </li>
                      <li>
                      {this.state.role.delete === true ?
                        <h4>
                        
                          <span className="ViewCelebsicons"><Icon type="delete" /></span><span>Delete</span></h4>:null}
                      </li>
                    </ul>
                    <ul  className="list-inline">
                    <li>
                    <h4 className="ViewCelebCategories"><span>{this.state.celebrityData.categoryName}</span>
                    {/* /<span>{this.state.celebrityData.subCategoryName}</span> */}
                    </h4>
                    </li>
                    </ul>
                  </li>
                </ul>
              </Col>
               </Spin>
            </Row>
          </div>
          {this.state.role.imagevideo === true ?<div>
          <div className="CelebrityaddImgsAndViedotabs">
            <Row>
              <Col span={24} style={{ borderBottom: '1px solid #f0f0f0', margin: '20px auto' }}>
                <Col span={3} >
                  <p id="CelebAddimageTab1" className="addbuttonColor" >AddImages</p>
                </Col>
                <Col span={3}>
                  <p id="CelebAddVideoTab2" >AddVideos</p>
                </Col>
              </Col>
             
            </Row>
          </div>
          <div id="CelebsTab1">
            <AddCelebrityImages celebrityData={this.state.celebrityData} />
          </div>
          <div id="CelebsTab2">
            <AddCelebrityVideo celebrityData={this.state.celebrityData} />
          </div></div>:null}
        </div>
      </Dashboard>
    );
  }
}

export default (ViewCelebrity);