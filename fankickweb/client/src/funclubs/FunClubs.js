/* eslint-disable */
import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import clone from 'clone';
import { Row, Col, Icon, Button, Card, Pagination,Spin,Alert } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router';
import Dashboard from '../Dashboard/Dashboard';
import amitabh from '../images/amitabh.jpg';
import amitabh1 from '../images/amitabh1.jpg';
import amitabh2 from '../images/amitabh2.jpg';
import amitabh3 from '../images/amitabh3.jpg';
import barber from '../images/barber.png';
import ReactPlayer from 'react-player'
import ReactAudioPlayer from 'react-audio-player';
import funclubs from './funclub.css';
import Placeholder from '../images/placeholder.png';


class FunClubs extends React.Component {
  constructor() {
    super();
    this.state = {
      current: 0,
      SelectCategory: '',
      funClubs: [],
      currentPage: 1,
      todosPerPage: 20,
      role:''
    }

  }

  componentDidMount() {
    this.getFunClubs();
  }

  getFunClubs = () => {
  //  console.log("User -----------", sessionStorage.getItem('token'))
    var instance = axios.create({
      headers: { 'x-access-token': sessionStorage.getItem('token') }
    });
    instance.get('/getAllFunClubJokes').then((response) => {
    console.log("User -----------", response.data.data);
      this.setState({ funClubs: response.data.data });
    });
  }
componentWillMount() {
   
    var user = JSON.parse(sessionStorage.getItem('user'));
    
    if (user.permissions !== '') {
   
      this.setState({ role: user.permissions.funClubs })
    }
    this.setState({ loading: true })
  
    
  }

  render() {
   console.log("this.state",this.state.role)
    const { todos, currentPage, todosPerPage } = this.state;
    const data = clone(this.state.funClubs);
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
        return (<div key={index} className="Funclubshome">
      
        <Col span={6}  xs={12} sm={12} xl={4} lg={6} md={6}>
        <Link to={`/fun-clubs/${funclubs._id}`}><Card>
            <div className="image hover01">
               {/* <figure>
                {funclubs.jokes.map((joke, index) => {
                  if (index < 1) {
                    if (joke.type == "image" || joke.type == "Image" || joke.type == "gif" || joke.type == "Gif" || joke.type == "text" || joke.type == "Text") {
                      return (
                          <img clasName="img-responsive" height="200px" width="100%" src={joke.thumbnail} alt="ContestCover" />
                      )
                    } else if (joke.type == "audio" || joke.type == "Audio") {
                      return (
                          <img clasName="img-responsive" height="200px" width="100%" src={joke.thumbnail} alt="ContestCover" />
                      )
                    }
                    else if (joke.type == "video" || joke.type == "Video") {
                      return (
                          <ReactPlayer height="205px" width="100%" url={'https://www.youtube.com/watch?v='+joke.jokesUrl} playing={false} />                       
                      )
                    }
                  }
               })}     </figure>*/}
             
                 <figure>
               <img clasName="img-responsive" height="200px" width="100%" src={funclubs.funClubImageUrl} alt="ContestCover" />
                  </figure>
                
            </div>
            {/* <div className="cardContent">
            
            </div> */}
            <div className="cardFooter">
            <h3 className="couponCardTitle">{funclubs.funClubName}</h3>
              
            </div>
        </Card></Link>
    </Col>

      
          {/* <Row>
            <Col className="funclubhomeheader" span={24}>
              <Col span={12}>
                <h3>{funclubs.funClubName}</h3>
              </Col>
              <Col span={8}>
              </Col>
              <Col span={4}>
                <Link to={`/fun-clubs/FunClublistAll/${funclubs._id}`}><h3 className="VieallInFanClubpage"><a href=" ">View All<Icon type="double-right" /></a></h3></Link>
              </Col>
            </Col>
          </Row>
          <Row>
            {funclubs.jokes.map((joke, index) => {
              if (index < 4) {
                if (joke.type == "image" || joke.type == "Image" || joke.type == "gif" || joke.type == "Gif" || joke.type == "text" || joke.type == "Text") {
                  return (<Col span={6}>
                    <Card>
                      <img clasName="img-responsive" height="200px" width="100%" src={joke.thumbnail} alt="ContestCover" />
                    </Card>
                  </Col>)
                } else if (joke.type == "audio" || joke.type == "Audio") {
                  return (<Col span={6}>
                    <Card>
                      <img clasName="img-responsive" height="200px" width="100%" src={joke.thumbnail} alt="ContestCover" />
                    </Card>
                  </Col>)
                }
                else if (joke.type == "video" || joke.type == "Video") {
                  return (<Col span={6}>
                    <Card>
                      <ReactPlayer height="206px" width="100%" url={'https://www.youtube.com/watch?v='+joke.jokesUrl} playing />                       
                    </Card>
                  </Col>)
                }
              }
            })}
          </Row> */}
        </div>)
    }
    );

  if (currentTodos.length === 0) {
    return (
       <Dashboard>
        <div >
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
        </div>
         </Dashboard>
      )
    } 
    else {
    return (
      <Dashboard>
        <div className="Funclubs">
          <Row className="FunClubsSubmenu">
            <Col span={24} className="FunClubspageHeader">
              <Col span={12}>
<h2 className="FunpageTitle">Fun Clubs</h2>
              </Col>
              <Col span={4}>

              </Col>
              <Col span={4}>
              {/*  <Link to="/fun-clubs/FunDemo"><Button type="primary">FunDemo</Button></Link>*/}
              </Col>
              {this.state.role.create === true ?
              <Col span={4}>
                <Link to="/fun-clubs/CreateFunClubJoke"><Button type="primary" className="FunClubsPagesBtn">Add Joke</Button></Link>
              </Col>
              :null}
            </Col>
          </Row>
          {renderTodos}
        </div>
 
        {/* <Col span={24}>
          <Col span={12} offset={11}>
            <div className="FunClubPageination">
              <Pagination defaultCurrent={1} total={50} />
            </div>
          </Col>
        </Col> */}
      </Dashboard>
    );
        

    }
  }
}

export default FunClubs;
/* eslint-disable */