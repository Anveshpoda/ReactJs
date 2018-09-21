/* eslint-disable */
import React, { Component } from 'react';
import axios from 'axios';
import clone from 'clone';
import Dashboard from '../Dashboard/Dashboard';
import { Row, Col, Icon, Radio, Button, Card, Modal, Spin } from 'antd';
import { Link } from 'react-router';
import ReactPlayer from 'react-player'
import ReactAudioPlayer from 'react-audio-player';
const RadioGroup = Radio.Group;

class FunClubListAll extends React.Component {
  constructor() {
    super();
    this.state = {
      current: 0,
      SelectCategory: '',
      funClubInfo: [],
      currentPage: 1,
      todosPerPage: 20,
      coverImage: '',
      value: "all",
      FunListloading: true
    }

  }


  state = {
    visible: false,
  }
  showModal = (a, b) => {
    console.log(a)
    console.log(b)
    this.setState({
      visible: true,
      coverImage: a
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }




  componentDidMount() {
    this.getFunClubdetails();
  }


  getFunClubdetails = () => {
    const id = this.props.params._id;
    //console.log("Funclubs Id  -----------",   id);
    //console.log("User -----------", sessionStorage.getItem('token'));

    var instance = axios.create({
      headers: { 'x-access-token': sessionStorage.getItem('token') }
    });
    instance.get('/getFunClubsInfo/' + id).then((response) => {
      // console.log("Funclub Details -----------", response.data.data);
      this.setState({ funClubInfo: response.data.data, FunListloading: false });
    });
  }


  onChange = (e) => {
    //console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
    if (e.target.value === "all") {
      this.getFunClubdetails();

    } else { this.filterJokesType(e.target.value); }
  }


  filterJokesType = (value) => {
    //var FanclubId = this.props.fanclubid;
    const id = this.props.params._id;
    var _this = this;
    var typevale = value;
    //console.log("typevale -----------", typevale);
    //console.log("User -----------", sessionStorage.getItem('token'));
    var instance = axios.create({
      // timeout: 3000,
      headers: { 'x-access-token': sessionStorage.getItem('token') }
    });
    instance.get('/getFunClubsInfo/' + id).then((response) => {
      //console.log("club Feeds Result------------------", response.data.data);
      // this.setState({ clubFeeds: response.data.data });
      _this.setState({ cont: response.data.data });
      const render = [];
      for (let key in _this.state.cont) {
        var contest = _this.state.cont[key]
        if (contest.type === typevale) {
          render.push(contest);
        }
        // console.log("comments", contest.comments)
      }
      _this.setState({ funClubInfo: render });
    });
  }


  render() {
    const { todos, currentPage, todosPerPage } = this.state;
    const data = clone(this.state.funClubInfo);
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = data.slice(indexOfFirstTodo, indexOfLastTodo);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          onChange={this.Change}
          key={number}
          id={number}
          onClick={this.handleClick}
          >
          {number}
        </li>
      );
    });

    const renderTodos = currentTodos.map((funclubs, index) => {
      if (funclubs.type === 'video' || funclubs.type === 'Video') {
        return (<div key={index}>  <Col span={6}  xs={12} sm={12} xl={4} lg={6} md={6}>
          <Card>
            <ReactPlayer height="200px" width="100%" url={'https://www.youtube.com/watch?v=' + funclubs.jokesUrl} playing={false} />
          </Card>
        </Col>


        </div>
        )
      } else {
        return (<div key={index}>  <Col span={6}  xs={12} sm={12} xl={4} lg={6} md={6}>
          <Card onClick={this.showModal.bind(this, funclubs.thumbnail)}>
            <img className="funlistimagesAll" height="200px" width="100%" src={funclubs.thumbnail} alt="ContestCover" />
          </Card>
        </Col>
        </div>


        )
      }
    }
    );


    return (
      <Dashboard>
        <div className="Funclubs">
          <Row className="FunClubsListAllMenu">
            <Col span={24} className="FunClubspageHeader">
              <Col span={12} className="funclubtypelist">
                <RadioGroup onChange={this.onChange} value={this.state.value}>
                  <Radio value="all">All</Radio>
                  <Radio value="image">Image</Radio>
                  <Radio value="text">Text</Radio>
                  <Radio value="video">Video</Radio>
                  <Radio value="audio">Audio</Radio>
                  <Radio value="gif">Gif</Radio>
                </RadioGroup>
              </Col>
              <Col span={8}>
              </Col>
              <Col span={4}>
                <Link to="/fun-clubs" ><Button type="primary" className="FunClubsPagesBtn"><Icon type="arrow-left" /> Back to Fun Clubs</Button></Link>
              </Col>
            </Col>
          </Row>
          <Row className="funClubsRen">
            <Spin spinning={this.state.FunListloading}>
              {renderTodos}

            </Spin>
            {this.state.funClubInfo.length === 0 ? <div id="noFunclubs">There are no funclubs to display</div> : ""}
          </Row>


          <div className="funnsssModal">
            <Modal className="Modalfunns"
              title="Preview"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={null}
              >
              <img clasName="img-responsive" height="400px" width="100%" src={this.state.coverImage} alt="ContestCover" />

            </Modal>
          </div>
        </div>
      </Dashboard>
    );
  }
}

export default FunClubListAll;

/* eslint-disable */