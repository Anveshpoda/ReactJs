/* eslint-disable */
import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import clone from 'clone';
import { Link } from 'react-router';
import css from './Celebrities.css';
//import Placeholder from '../images/placeholder.png';
import Placeholder from '../images/fun clubs placeholder image.png';
import { Scrollbars } from 'react-custom-scrollbars';
import viewMore from '../images/icons/view-more.png';
import amitabh1 from '../images/amitabh1.jpg';
import placeholders from '../images/fun clubs placeholder image.png';
import { Row, Pagination, Input, Button, Col, Card, Select } from 'antd';
const Option = Select.Option;
const Search = Input.Search;
function handleChange(value) {
  console.log(`selected ${value}`);
}


class CelebritiesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      subCategories: [],
      celebrities: [],
      celebrityDetails: [],
      categoryId: '',
      categoryName: '',
      subCategoryId: '',
      search: '',
      errors: {},
      disabled: true,
      totalPages: '',
      role: ''
    };
    this._handleDoubleClickItem = this._handleDoubleClickItem.bind(this);
  }
  _handleDoubleClickItem = (e) => {
    if (this.state.search === e.target.value) {
      this.setState({ search: '' })
      var a = "All"
      this.getCelebrityDetails(a);
    }
    console.log("double click", this.state.search, e.target.value)
  }
  componentWillMount() {
    var user = JSON.parse(sessionStorage.getItem('user'));

    if (user.permissions !== '') {

      this.setState({ role: user.permissions.pinCeleb })
    }
    this.loadCategories();
    this.setState({ loading: true });
    this.getCelebrityDetails(1);
  }

  loadCategories = () => {
    var instance = axios.create({
      timeout: 1000,
      headers: { 'x-access-token': sessionStorage.getItem('token') }
    });
    instance.get('/categories/').then((response) => {
      console.log("------>", response.data.data);
      this.setState({
        categories: response.data.data
      })
    });
  }

  onCategoryChange = (e) => {
    if (e === "All") {
      this.setState({
        categoryId: e,
        celebrities: [],
        subCategories: [],
        disabled: false
      })
      this.getCelebrityDetails(e)
    }
    //Sub-Category Removed
    // else{
    //   this.setState({
    //     categoryId: e.key,
    //     categoryName: e.label
    //   });
    //   this.bindSubCategories(e.key)
    // }
    else {
      this.setState({
        categoryId: e
      })
      this.bindSubCategories(e)
      // this.getCelebrityNamesByCategory(e)
      // this.getCelebrityDetailsBySubCategory(e)
    }
  }

  bindSubCategories = (category) => {
    this.state.categories.map((categorydata) => {
      if (category === categorydata._id) {
        this.setState({
          subCategories: categorydata.subCategories,
          subCategoryId: categorydata.subCategories[0]._id,
        })

      }
    })
  }

  onSubCategoryChange = (e) => {
    this.setState({
      subCategoryId: e
    });
    this.getCelebrityDetailsBySubCategory(e);
    this.getCelebrityNamesBySubCategory(e)
  }

  getCelebrityNamesBySubCategory = (id) => {
    var _this = this;
    // const url = process.env.REACT_APP_API_HOST + '/rest/getContentPacksCelebName?subCategoryId=' + id;
    const url = '/celebrity-by-subcategory/' + id;
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
        console.log("dataresponse", response.data);
        if (response.status === 200) {
          _this.setState({ celebrities: response.data });
        }
        else {
          console.log("dataresponse", response);
        }
      })
  }

  getCelebrityDetailsBySubCategory = (id) => {
    var _this = this;
    // const url = process.env.REACT_APP_API_HOST + '/rest/getContentPacksCelebName?subCategoryId=' + id;
    const url = '/celebrity-details-by-subcategory/' + id + '/1';
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
        if (response.status === 200) {
          _this.setState({ celebrityDetails: response.data, totalPages: response.totalNumOfPages });
        }
        else {
          console.log("dataresponse", response);
        }
      })
  }

  onCelebrityChange = (id) => {
    var _this = this;
    const url = '/celebrity-by-name/' + id;
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
        if (response.status === 200) {
          _this.setState({ celebrityDetails: response.data });
        }
        else {
          console.log("dataresponse", response);
        }
      })
  }

  getCelebrityDetails = (id) => {
    var _this = this;
    var url = '/celebrities/' + id;
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
        if (response.status === 200) {
          _this.setState({ celebrityDetails: response.data, totalPages: response.totalNumOfPages });
        }
        else {
          console.log("dataresponse", response);
        }
      })
  }

  celebritiesPagination = (page, pageSize) => {
    var _this = this;
    var url;
    if (!this.state.categoryId == '' && !this.state.subCategoryId == '') {
      url = '/celebrity-details-by-subcategory/' + this.state.subCategoryId + '/' + page + ''
    }
    else {
      var url = '/celebrities/' + page;
    }
    axios.get(url, {
      headers: {
        "x-access-token": sessionStorage.getItem('token'),
      },
    })
      .then(function (response) {
        _this.setState({ celebrityDetails: response.data.data });
      }.bind(_this))
      .catch(function (error) {
        console.log('response error', error)
      });
  }

  searchFanclub = (e) => {

    if (e.target.value === '') {
      this.getCelebrityDetails();
      document.getElementById('mobile').innerHTML = ("");
    }
    this.setState({
      search: e.target.value.substr(0, 10)
    });
  }
  mousedoubleClick = (e) => {
    console.log("doublick", e)
  }
  onKeyPress = (e) => {
    var specialKeys = new Array();
    specialKeys.push(8); //Backspace
    e = (e) ? e : window.event;
    var charCode = (e.which) ? e.which : e.keyCode;
    if ((charCode >= 48 && charCode <= 57) || specialKeys.indexOf(charCode) != -1) {
      document.getElementById('mobile').innerHTML = ("Please enter only characters");
      e.preventDefault();
      return false;
    }
    document.getElementById('mobile').innerHTML = ("");
    return true;
  }

  render() {
    console.log("search", this.state.search)
    const { categories, subCategories, celebrities } = this.state;
    const mapCategories = categories.map((category) => <Option value={category._id}>{category.name}</Option>)
    const mapSubCategories = subCategories.map((subCategory) => <Option value={subCategory._id}>{subCategory.name}</Option>)
    const mapCelebrities = celebrities.map((celebrity) => <Option value={celebrity.celebrityName}>{celebrity.celebrityName}</Option>);

    if (this.state.celebrityDetails.length === 0) {
      return (
        <div >
          <Row className="CelebritypageHeader CelebsSubMenu">
            <Col span={24} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
              <Col span={2} className="CelebritiySelectCatgries">
                <h2 className="celebpageTitle">Celebrities</h2>
              </Col>

              <Col span={3} className="CelebritiySelectCatgries">

                <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                  placeholder="Select Category"
                  onChange={this.onCategoryChange}
                  style={{ width: '100%' }}
                  >
                  {mapCategories}
                  <Option value="All">All</Option>
                </Select>

              </Col>

              <Col span={3} className="CelebritiySelectCatgries">
                <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                  placeholder="Select Sub-Category"
                  // value={{ key: this.state.subCategoryId }}
                  onChange={this.onSubCategoryChange} style={{ width: '100%' }}>
                  {mapSubCategories}
                </Select>
              </Col>
              <Col span={3} className="CelebritiySelectCatgries">
                <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                  showSearch
                  placeholder="Select Celebrity"
                  onChange={this.onCelebrityChange} style={{ width: '100%' }}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                  {mapCelebrities}
                </Select>
              </Col>

              {/*<Col span={4} className="CelebrityHomeCreateBtn">}
            <Link to="/celebrities/create-celebrity"> <Button type="primary" className='createBtn celebritypagesmainbutton'>Create New Celebrity</Button></Link>*/}
              {this.state.role.create === true ?
                <Col span={3} className="CelebrityCbutton">
                  <Link to="/celebritydata/create-celebrity"> <Button type="primary" className='createBtn celebritypagesmainbutton'>Create New Celebrity</Button></Link>
                </Col> : null}
            </Col>
          </Row>
          <Row>
            <Col span={24} className="celebritiessubsecmenu">
              <Col span={3}>
                <Select placeholder="Order By"
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                  style={{ width: '100% ' }} onChange={handleChange}>
                  <Option value="jack">Date</Option>
                  <Option value="lucy">Location</Option>
                </Select>

              </Col>
              <Col span={3} className="searchcelebfan">
                <input placeholder="Search Celebrity" name="celebritySearch" value={this.state.search} disabled={this.state.disabled}
                  onChange={this.searchFanclub}
                  onKeyPress={this.onKeyPress} onDoubleClick={this._handleDoubleClickItem} />
                <p id="mobile" className="mobile"></p>
              </Col>
            </Col>
          </Row>
          <div style={{ paddingLeft: 15 }} className="placeholderImages">
            <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
            <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
            <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
            <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
            <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
            <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
            <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
            <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
            <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
            <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
            <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
            <Col span={6} xs={12} sm={12} xl={5} lg={6} md={8}><img src={Placeholder} alt="Placeholder" className="img-responsive" /></Col>
          </div>
        </div>);
    } else {
      let filteredCelebrities = this.state.celebrityDetails.filter(

        (contest) => {
          console.log("consted", contest.celebrityName.toLowerCase(), this.state.search.toLowerCase())
          return contest.celebrityName.toLowerCase().includes(this.state.search.toLowerCase());
        }
      );

      this.state.celebrityDetails.length === 0 ?

        null : filteredCelebrities.map((item, index) => {
          this.state.celebrityDetails = filteredCelebrities;
        });

      const renderCelebrities = this.state.celebrityDetails.map((celebrity) => {
        return (<Col span={8} xs={12} sm={12} xl={6} lg={8} md={8} className="CelebrityWholecard">
          <Link to={`/celebritydata/ViewCelebrity/${celebrity._id}`} className='' activeClassName='active'>
            <Card className="CelebritiespageCard">
              <ul className="list-inline">
                <li>
                  <img className="Celebrityprofileimage" src={celebrity.celebrityImageUrl} />
                </li>
                <li className="CelebritiesPagesDetails">

                  <h3 className="CelebritiesCelbrityName">{celebrity.celebrityName}</h3>
                  <h4 className="CelebritypageGender">{celebrity.gender ? celebrity.gender : 'Female'}</h4>

                  <h4 className="Celebritysepcalisit">
                    <span className="CelebritypageCelebformat">{celebrity.occupation}</span>
                  </h4>
                  {/*<h4 className="Celebritysepcalisit">
                    {this.state.categories.map((record)=>{
                  return(<span className="CelebritypageCelebformat">{celebrity.occupation}</span>)
                })} 
                  </h4>*/}
                  <h4 className="Celebritysepcalisit">
                    {/* {this.state.categories.map((record)=>{
                  return(<span className="CelebritypageCelebformat">{celebrity.occupation}</span>)
                })} */}
                  </h4>
                  <h4 className="CelebrityCountry">{celebrity.country ? celebrity.country : 'undefined'}</h4>
                  <h4 className="CelebritiespagesmainLocaiotnss">
                    {celebrity.location ? celebrity.location.map((loc, i) => {
                      if (i < 3)
                        return (<span className="Celebritypagelocations">{loc},</span>)
                      else
                        return (null)
                    }) : <span className="Celebritypagelocations">Unspecified</span>}
                  </h4>
                  {/* <h4>(<span className="Celebritypagelocations">Bombay</span>-<span className="Celebritypagelocations">Kolkata</span>-<span className="Celebritypagelocations">Hyderabad</span>)</h4> */}

                  <h4 className="CelebritiesCategories">
                    <span>{celebrity.categoryName}</span>
                    {/* /<span>{celebrity.subCategoryName}</span> */}
                  </h4>
                </li>
              </ul>
            </Card>
          </Link>
        </Col>
        )
      })


      return (
        <div clasName="CelebritiesDashBoard">
          <Row className="CelebritypageHeader CelebsSubMenu">
            <Col span={24} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
              <Col span={2} className="CelebritiySelectCatgries1">
                <h2 className="celebpageTitle">Celebrities</h2>
              </Col>
              <Col span={3} className="CelebritiySelectCatgries CelebritiySelectCatgries123">

                <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                  placeholder="Select Category"
                  onChange={this.onCategoryChange}
                  style={{ width: '100%' }}
                  >
                  {mapCategories}
                  <Option value="All">All</Option>
                </Select>

              </Col>

              <Col span={3} className="CelebritiySelectCatgries">
                <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                  placeholder="Select SubCategory"
                  // value={{ key: this.state.subCategoryId }}
                  onChange={this.onSubCategoryChange} style={{ width: '100%' }}>
                  {mapSubCategories}
                </Select>
              </Col>
              <Col span={3} className="CelebritiySelectCatgries">
                <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                  showSearch
                  placeholder="Select Celebrity"
                  onChange={this.onCelebrityChange} style={{ width: '100%' }}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                  {mapCelebrities}
                </Select>
              </Col>

              {/*<Col span={4} className="CelebrityHomeCreateBtn">}
            <Link to="/celebrities/create-celebrity"> <Button type="primary" className='createBtn celebritypagesmainbutton'>Create New Celebrity</Button></Link>*/}
              {this.state.role.create === true ?
                <Col span={3} className="CelebrityCbutton">
                  <Link to="/celebritydata/create-celebrity"> <Button type="primary" className='createBtn celebritypagesmainbutton'>Create New Celebrity</Button></Link>
                </Col> : null}
            </Col>

          </Row>
          <Row>
            <Col span={24} className="celebritiessubsecmenu">
              <Col span={3}>
                <Select placeholder="Order By"
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                  style={{ width: '100% ' }} onChange={handleChange}>
                  <Option value="jack">Date</Option>
                  <Option value="lucy">Location</Option>
                </Select>

              </Col>
              <Col span={3} className="searchcelebfan">
                <Input.Search placeholder="Search Celebrity" name="celebritySearch" value={this.state.search} disabled={this.state.disabled} onChange={this.searchFanclub} onKeyPress={this.onKeyPress} onDoubleClick={this._handleDoubleClickItem} />
                <p id="mobile" className="mobile"></p>
              </Col>

            </Col>
          </Row>
          {/*-------Card-------------*/}
          <Row>
            <div>
              {renderCelebrities}
            </div>
          </Row>

          {/*-------/Card-------------*/}
          <Row>
            <div className="CelebsPagination">
              {this.state.categoryId == "All" ? null : <Pagination onChange={this.celebritiesPagination.bind(this)} defaultPageSize={12} total={(this.state.totalPages * 12)} />}
            </div>
          </Row>
        </div>
      );
    }
  }
}

export default (CelebritiesPage);
/* eslint-disable */
