/* eslint-disable */
import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import clone from 'clone';
import Dashboard from '../Dashboard/Dashboard';
import { Link } from 'react-router';
import RichTextEditor from 'react-rte';
import ReactPlayer from 'react-player';
import ReactAudioPlayer from 'react-audio-player';
import amitabh1 from '../images/amitabh1.jpg';
import amitabh2 from '../images/amitabh2.jpg';
import { Row,Col,Button,Spin,Icon } from 'antd';
import './Webchallenges.css';




class WebliveChallenge extends React.Component {
             constructor(props) {
        super(props);
          this.state = {
            content: RichTextEditor.createEmptyValue()
          };
         }


     

    componentDidMount() {
        $(function () {
            // Then hide the second div
            $("#CelebsTab2").hide();
           // $("#CelebsTab3").hide();
            $("#CelebsTab4").hide();
            // Then add a click handlers to the buttons
            $("#Weblivetab1").click(function () {
                $("#CelebsTab1").show();
                $("#CelebsTab2").hide();
               // $("#CelebsTab3").hide();
                $("#CelebsTab4").hide();
                $(this).addClass('addbuttonColor');
                $('#Weblivetab2').removeClass('addbuttonColor');
               // $('#Weblivetab3').removeClass('addbuttonColor');
                $('#Weblivetab4').removeClass('addbuttonColor');
            });
            $("#Weblivetab2").click(function () {
                $(this).addClass('addbuttonColor');
                $('#Weblivetab1').removeClass('addbuttonColor');
               // $('#Weblivetab3').removeClass('addbuttonColor');
                $('#Weblivetab4').removeClass('addbuttonColor');
                $("#CelebsTab1").hide();
                $("#CelebsTab2").show();
               // $("#CelebsTab3").hide();
                $("#CelebsTab4").hide();
            });

            // $("#Weblivetab3").click(function () {
            //     $(this).addClass('addbuttonColor');
            //     $('#Weblivetab1').removeClass('addbuttonColor');
            //     $('#Weblivetab2').removeClass('addbuttonColor');
            //     $('#Weblivetab4').removeClass('addbuttonColor');
            //     $("#CelebsTab1").hide();
            //     $("#CelebsTab2").hide();
            //    // $("#CelebsTab3").show();
            //     $("#CelebsTab4").hide();
            // });

            $("#Weblivetab4").click(function () {
                $(this).addClass('addbuttonColor');
                $('#Weblivetab1').removeClass('addbuttonColor');
                $('#Weblivetab2').removeClass('addbuttonColor');
              //  $('#Weblivetab3').removeClass('addbuttonColor');
                $("#CelebsTab1").hide();
                $("#CelebsTab2").hide();
               // $("#CelebsTab3").hide();
                $("#CelebsTab4").show();
            });

        })

    }

    render() {
        return (
            <Dashboard>
                <div className="Livechallenges">
                    <Row>
                        <Col span={24}>
                            <h2 className="webchlngTitles">Challenge Title</h2>
                        </Col>
                        <Col span={24}>
                            <ReactPlayer width="100%" url={'https://www.youtube.com/watch?v=KMWS5y2gZ6E'} controls playing={false} />

                        </Col>


                    </Row>
                    <Row>
                        <div className="weblivechallengessstabs">
                            <Row>
                                <Col span={24} style={{ borderBottom: '1px solid #f0f0f0', margin: '20px auto' }}>
                                    <Col span={4} >
                                        <p id="Weblivetab1" className="addbuttonColor" >About Challenge</p>
                                    </Col>
                                    <Col span={3}>
                                        <p id="Weblivetab2" ><span>Karoke </span> <span className="webchlngKarokecount">5</span></p>
                                    </Col>
                                   {/*<Col span={3}>
                                        <p id="Weblivetab3" >Dub 2 Win</p>
                                    </Col>*/}
                                    <Col span={4}>
                                        <p id="Weblivetab4" >Terms & Conditions</p>
                                    </Col>
                                </Col>

                            </Row>
                        </div>
                        <div id="CelebsTab1">
                            <Row>
                                <Col span={21} className="WebliveChallengeDescription1">
                                {/*<h4>Challenge Description</h4>*/}

                                    <p className="WebliveChallengeDescription">voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non-recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat…</p>

                                </Col>
                                <Col span={24} className="Webchallenegefancoins1">

                                    <h4><span className="WebchlngsFancoins">Fan Coins</span> <span className="WebliveChallengeFanCoins">250</span></h4>
                                </Col>

                               {/* <Col span={24} className="WebchallenegeCoupons1">
                                    <h4>Coupons</h4>

                                    <p className="WebliveChallengeCoupons">No Coupon</p>
                                </Col>*/}

                            </Row>
                            <Row className="WebchallenegeCast1">
                                <h4>Cast Details</h4>
                                <div>
                                 <Col span={2} className="webchlngcast">
                                <img src={amitabh1} alt='' className="webchlngccelebrityImg" />
                                <p>Amithab</p>
                                <p>Hero</p>

                                 </Col>
                                  <Col span={2} className="webchlngcast">
                                <img src={amitabh2} alt='' className="webchlngccelebrityImg" />
                                <p>Amithab</p>
                                <p>Hero</p>

                                 </Col>
                                  <Col span={2} className="webchlngcast">
                                <img src={amitabh1} alt='' className="webchlngccelebrityImg" />
                                <p>Amithab</p>
                                <p>Hero</p>

                                 </Col>
                                  <Col span={2} className="webchlngcast">
                                <img src={amitabh2} alt='' className="webchlngccelebrityImg" />
                                <p>Amithab</p>
                                <p>Hero</p>

                                 </Col>
                                  <Col span={2} className="webchlngcast">
                                <img src={amitabh1} alt='' className="webchlngccelebrityImg" />
                                <p>Amithab</p>
                                <p>Hero</p>

                                 </Col>
                                  <Col span={2} className="webchlngcast">
                                <img src={amitabh2} alt='' className="webchlngccelebrityImg" />
                                <p>Amithab</p>
                                <p>Hero</p>

                                 </Col>
                                </div>


                            </Row>

                            <Row className="WebchallenegeCrew1">
                                <h4>Crew Details</h4>
                                 <div>
                                  <Col span={2} className="webchlngcrew">
                                <img src={amitabh1} alt='' className="webchlngccelebrityImg" />
                                <p>Amithab</p>
                                <p>Hero</p>

                                 </Col>
                                 <Col span={2} className="webchlngcrew">
                                <img src={amitabh2} alt='' className="webchlngccelebrityImg" />
                                <p>Amithab</p>
                                <p>Hero</p>

                                 </Col>
                                 <Col span={2} className="webchlngcrew">
                                <img src={amitabh1} alt='' className="webchlngccelebrityImg" />
                                <p>Amithab</p>
                                <p>Hero</p>

                                 </Col>
                                 <Col span={2} className="webchlngcrew">
                                <img src={amitabh2} alt='' className="webchlngccelebrityImg" />
                                <p>Amithab</p>
                                <p>Hero</p>

                                 </Col>
                                 <Col span={2} className="webchlngcrew">
                                <img src={amitabh1} alt='' className="webchlngccelebrityImg" />
                                <p>Amithab</p>
                                <p>Hero</p>

                                 </Col>
                                 <Col span={2} className="webchlngcrew">
                                <img src={amitabh2} alt='' className="webchlngccelebrityImg" />
                                <p>Amithab</p>
                                <p>Hero</p>

                                 </Col>
                                </div>
                            </Row>



                        </div>
                        <div id="CelebsTab2">
                        <Row>
                        <h3>Bharat Ane Nenu</h3>

                        <Col span={21} className="webchlngKarokeDescription1">
                        

                        <p className="webchlngKarokeDescription">voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non-recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat…</p>


                        </Col>
                        <Col span={24} className="webchlngKarokeaudioplayers1">
                        <div className="players">
                                  <ReactAudioPlayer className="creactplay"
                                    src={"hello"}
                                    autoPlay={false}
                                    controls
                                    ref={(ref) => { this.audioEl = ref; }}
                                  />
                                </div>

                        </Col>


                        </Row>

                        <Row>
                        <Col span={6} className="webchallengekarokeplayers1">
                            <ReactPlayer width="100%" height="200px" url={'https://www.youtube.com/watch?v=KMWS5y2gZ6E'} controls playing={false} />

                        </Col>
                        <Col span={6} className="webchallengekarokeplayers">
                            <div className="playersparticipatewin">
                             <Button className="Karokewebchlngbtn" type="primary">Participate & Win</Button>
                          </div>
                        </Col>

                        </Row>
                          


                        </div>
                      {/*  <div id="CelebsTab3">
                           
                                   <Row>
                        <h3>Bharat Ane Nenu</h3>

                        <Col span={21} className="webchlngDub2windescription1">
                   

                        <p className="webchallengeDub2windescription">voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non-recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat…</p>


                        </Col>
                        <Col span={24} className="webchlngdub2winplayers">
                        <div className="players">
                                  <ReactAudioPlayer className="creactplay"
                                    src={"hello"}
                                    autoPlay={false}
                                    controls
                                    ref={(ref) => { this.audioEl = ref; }}
                                  />
                                </div>

                        </Col>


                        </Row>

                        <Row>
                        <Col span={6} className="webchallengeDub2winlayers1">
                            <ReactPlayer width="100%" height="200px" url={'https://www.youtube.com/watch?v=KMWS5y2gZ6E'} controls playing={false} />

                        </Col>
                        <Col span={6} className="webchallengeDub2winlayers">
                            <ReactPlayer width="100%" height="200px"  url={'https://www.youtube.com/watch?v=KMWS5y2gZ6E'} controls playing={false} />
                            <Button className="Dub2winwebchlngbtn" type="primary">participate & Win</Button>

                        </Col>

                        </Row>


    </div>*/}
                        <div id="CelebsTab4">
                           <Row>
                           <Col span={21} className="Terms">
                           <RichTextEditor className="viewblgRte"
                                value={this.state.content}
                                readOnly={this.state.readOnly}
                            />
    
                    </Col>

                           </Row>
                        </div>
                    </Row>

                </div>
            </Dashboard>
        );
    }
}

export default (WebliveChallenge);
/* eslint-disable */

