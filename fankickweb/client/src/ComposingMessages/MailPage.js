/* eslint-disable*/
import React from 'react';
import Dashboard from '../Dashboard/Dashboard';
import { Link } from 'react-router';
import './Composemessage.css';
import attachmentoutlin from '../images/attachmentoutlin.png';
import { Icon, Input, Button, Checkbox,  Col, Row } from 'antd';
const { TextArea } = Input;


class MailPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      messages: []
    }
  }
  componentDidMount = () => {
    console.log("params id", this.props.params.id);
    this.displayMessages();
  }
  displayMessages = () => {
    var _this = this;
    const url = '/approvalCycle/messagesDisplay/' + this.props.params.id;
    var request = new Request(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'x-access-token': sessionStorage.getItem('token')
      },
    });
    fetch(request)
      .then(response => response.json())
      .then(function (response) {
        if (response.status === 200 && response.message === "Success") {
          _this.setState({ messages: response.data })
        }
        else {
        }
      })  
  }
  render() {
var message = [];
for (let key in this.state.messages){
  var msgObj = this.state.messages[key];
  message.push(
    <Row className="MailOpenBlock">
    <Col span={24}>
      <Col span={2}>
        <img className="CirclrMailImg" src={msgObj.imageUrl} alt="message center" />
      </Col>
      <Col span={7}>
        <h3>{msgObj.name}</h3>
        <p>{msgObj.message}</p>
      </Col>
    </Col>
  </Row>
  )
}
    return (
      <Dashboard>
        <div classNames="container">

          <Row>
            <Col span={24} className="Crudmenu">
              <div className="MsgCentreSubMenu">
                <div className="SubMenu">
                  <Col span={5}><h2 className="pageTitle">Messages/Notifications</h2>
                  </Col>

                  <Col span={8}>

                    <nav className='challengesnavigation RghtAlign'>
                      <Link><Button className="ComposemsgBtn">All</Button></Link>
                      <Link><Button className="ComposemsgBtn">Read</Button></Link>
                      <Link><Button className="ComposemsgBtn">Unread</Button></Link>
                      <Link><Button className="ComposemsgBtn">Sent</Button></Link>
                    </nav>
                  </Col>
                  <Col span={6}>
                    <p className="SearchHistryTxt">  <Icon type="search" className="SearchIconNav" /> Search my History</p>
                  </Col>
                 
                </div>
              </div>
            </Col>
          </Row>

          <div className="widthresponsive">
            {/* <div className="MailPagefrstBlockSubmenu">
              <Row className="RowBorder">
                <Col span={24}>
                  <Col span={6} xs={12} sm={12} xl={7} lg={8} md={11}>
                    <ul className="list-inline"><li> <img className="CircleimgMsgCenterMailImg" src="https://i.ndtvimg.com/i/2016-08/pawan-kalyan_650x400_71472348551.jpg" alt="messagecenter" /></li>
                      <li className="bordrRght"><h2 className="imgTxt">Elivintho</h2><br /><h4 className="mailtxt">Moderator</h4></li>
                      <li className="paddingLft15"><h2 className="imgTxt">Modules</h2><br /><h4 className="mailtxt">Message Center Challanges</h4></li>
                    </ul>
                  </Col>

                
                </Col>
              </Row>
            </div> */}

          </div>

          <div className="widthresponsive">
            <div className="MailPagesecondBlockSubmenu">
             {message}


              {/* <Row className="MailOpenBlock">
                <Col span={24}>
                  <Col span={6}>
                    <p className="sntMsg">Sent on 13/04/2018, 4pm</p>
                  </Col>
                  <Col span={6} className="RightAlgnfile">
                    <p className="RightAlgnAttachmnts">Attachments</p><br />
                    <p className="attachmntfileTxt">
                      Manikarnika_img.png</p>
                    <img src={attachmentoutlin} alt="Attachment Img" className="MailAttachmentImg" />
                  </Col>
                </Col>
              </Row> */}




              {/* <div className="widthresponsive">
                <div className="MailPagesecondBlock">
                  <Row className="MailOpenBlock">
                    <Col span={24}>
                      <Col span={1}>
                        <Checkbox></Checkbox>
                      </Col>
                      <Col span={2}>
                        <img className="CirclrMailImg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEV/f3+QyhsjAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=" alt="message center" />
                      </Col>
                      <Col span={8}>
                        <h3>Alexander</h3>
                        <p>The assets are fine, but i need them in different resolutions. Can you kindly send them likewise.</p>
                      </Col>
                    </Col>
                  </Row>


                </div>
              </div> */}
              {/* <Row className="MailOpenBlockTxtArea">
                <Col span={23}>
                  <TextArea rows={4} />
                </Col>
              </Row>

              <Row className="">
                <Col span={6} className="RightAlgnfile">
                  <Button type="primary" className='SendMailbtn mrgLeft30'>Send</Button>
                  <img src={attachmentoutlin} alt="Attachment Img" className="MailAttachmentImag" />

                </Col>

              </Row> */}
            </div>
          </div>



        </div>
      </Dashboard>
    );
  };
}


export default MailPage;
/* eslint-disable*/