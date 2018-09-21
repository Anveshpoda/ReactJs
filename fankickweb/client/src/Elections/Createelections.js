/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import $ from "jquery";
import classnames from 'classnames';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import Dashboard from '../Dashboard/Dashboard';
import css from './electionPolling.css';
import moment from 'moment';
import axios from 'axios';
import { Form, Icon, Input, Button, Row, Col, Checkbox, Upload, Select, message, DatePicker, Tabs } from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
function callback(key) {
 // console.log(key);
}

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}
const props = {
  name: 'file',
  action:process.env.REACT_APP_API_HOST + '/rest/azureImageUploadWeb',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    // console.log("info", info)
    if (info.file.status !== 'uploading') {
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
class Elections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false, imageUrl: '', pollcheck: '',
      PollTitle: '', PollTitle1: '', PollTitle2: '', PollTitle3: '', PollTitle4: '', PollTitle5: '',
      PollDescription: '', PollDescription1: '', PollDescription2: '', PollDescription3: '', PollDescription4: '', PollDescription5: '',
      contestIcon: '', enddateandtime: '', stratdateandtime: '', terms: '', pollstatus: '', pollended: '',
      winnersd: '', polltype: '', polldes: '', polltext: '', option1: '', option2: '', imageoption1: '', imageoption2: '',
      errors: {}, winnersCount: '', pollingtype: '', option11: '', polldetails: '', stratdateandtime1: '', enddateandtime1: '',
      option22: '', id: '', editdata: []
    }
    this.baseState = this.state
  };
  resetForm = () => {
    this.setState(this.baseState)
  }
  componentWillMount() {
  //  console.log("this.props", this.props.params)
    if (this.props.params._id === undefined) {
    } else {
      this.setState({ id: this.props.params._id });
      this.getContests(this.props.params._id);
    }
  }
  getContests = (id) => {
    axios.get(process.env.REACT_APP_API_HOST + '/rest/optionPollingById?pollId=' + id, {
      headers: {
        "x-access-token": sessionStorage.token,
      },
    })
      .then(function (response) {
       // console.log("response by id", response.data.data)
        this.setState({ editdata: response.data.data })
        this.setState({ pollingtype: this.state.editdata.type })
        this.setState({ terms: this.state.editdata.termsAndConditions })
        this.setState({ polltype: this.state.editdata.pollType })
        this.setState({ polldes: this.state.editdata.pollDescription })
        this.setState({ polldetails: this.state.editdata.pollDetails })
        this.setState({ contestIcon: this.state.editdata.pollImageUrl })
        this.setState({ winnersCount: this.state.editdata.winnersCount })
        var d = new Date(this.state.editdata.pollStartDateTime).toLocaleString();
        var d1 = moment(d).format('YYYY-MM-DD HH:mm:ss');
        var d2 = new Date(this.state.editdata.pollEndDateTime).toLocaleString();
        var d4 = moment(d2).format('YYYY-MM-DD HH:mm:ss');
        this.setState({ stratdateandtime: d1 })
        this.setState({ enddateandtime: d4 })
        this.setState({ stratdateandtime1: this.state.editdata.pollStartDateTime })
        this.setState({ enddateandtime1: this.state.editdata.pollEndDateTime })

        this.setState({ pollcheck: "PollYettoStart" })
        if (this.state.editdata.type === "image") {
          this.setState({ imageoption1: this.state.editdata.option1.optionImage })
          this.setState({ option1: this.state.editdata.option1.option })
          this.setState({ imageoption2: this.state.editdata.option2.optionImage })
          this.setState({ option2: this.state.editdata.option2.option })
        } else {
          this.setState({ option11: this.state.editdata.option1.option })
          this.setState({ option22: this.state.editdata.option2.option })
        }
        if (this.state.editdata.contentOptions != undefined) {
          this.setState({ PollTitle: this.state.editdata.contentOptions.toStart.pTitle })
          this.setState({ PollDescription: this.state.editdata.contentOptions.toStart.pCaption })

          this.setState({ PollTitle1: this.state.editdata.contentOptions.startedNparticipated.pTitle })
          this.setState({ PollDescription1: this.state.editdata.contentOptions.startedNparticipated.pCaption })

          this.setState({ PollTitle2: this.state.editdata.contentOptions.startedNotParticipated.pTitle })
          this.setState({ PollDescription2: this.state.editdata.contentOptions.startedNotParticipated.pCaption })

          this.setState({ PollTitle3: this.state.editdata.contentOptions.endedNparticipated.pTitle })
          this.setState({ PollDescription3: this.state.editdata.contentOptions.endedNparticipated.pCaption })

          this.setState({ PollTitle4: this.state.editdata.contentOptions.endedNotParticipated.pTitle })
          this.setState({ PollDescription4: this.state.editdata.contentOptions.endedNotParticipated.pCaption })


          this.setState({ PollTitle5: this.state.editdata.contentOptions.winnersDeclared.pTitle })
          this.setState({ PollDescription5: this.state.editdata.contentOptions.winnersDeclared.pCaption })
        }
        // if (response.status === 200) {
        //   const hhh = response.data.data;
        //   this.setState({ data: hhh  });

        // }
      }.bind(this))
      .catch(function (error) {
        //console.log(error);
      });

  }
  handleChange14 = (value) => {
    if (this.state.pollcheck !== '') this.state.errors.pollcheck = ''
    this.setState({ pollcheck: value });
  }
  handleChange1 = (value) => {
    if (this.state.pollingtype !== '') this.state.errors.pollingtype = ''
    this.setState({ pollingtype: value });
  }
  onChangetitle = (e) => {
    // var value=[e.target.name]
    // if(this.state.value !== '' ) this.state.errors.PollTitle =''
    // if(this.state.PollTitle1 !== '' ) this.state.errors.PollTitle1 =''
    // if(this.state.PollTitle2 !== '' ) this.state.errors.PollTitle2 =''
    // if(this.state.PollTitle3 !== '' ) this.state.errors.PollTitle3 =''
    // if(this.state.PollTitle4 !== '' ) this.state.errors.PollTitle4 =''
    this.setState({ [e.target.name]: e.target.value });
  }
  onChangedesc = (e) => {
    // if(this.state.PollDescription !== '' ) this.state.errors.PollDescription =''
    // if(this.state.PollDescription1 !== '' ) this.state.errors.PollDescription1 =''
    // if(this.state.PollDescription2 !== '' ) this.state.errors.PollDescription2 =''
    // if(this.state.PollDescription3 !== '' ) this.state.errors.PollDescription3 =''
    // if(this.state.PollDescription4 !== '' ) this.state.errors.PollDescription4 =''
    this.setState({ [e.target.name]: e.target.value });
  }
  handleChange5 = (info) => {
    // console.log("info.file.status", info.file.type);
    if (info.file.type === "image/png" || info.file.type === "image/jpg" || info.file.type === "image/jpeg") {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        if (info.file.response.data !== '') this.state.errors.contestIcon = '';
        this.setState({
          contestIcon: info.file.response.data
        })
      }
    }
  }
  handleChange6 = (info) => {
    // console.log("info.file.status", info.file.type);
    if (info.file.type === "image/png" || info.file.type === "image/jpg" || info.file.type === "image/jpeg") {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        if (info.file.response.data !== '') this.state.errors.imageoption1 = '';
        this.setState({
          imageoption1: info.file.response.data
        })
      }
    }
  }
  handleChange7 = (info) => {
    // console.log("info.file.status", info.file.type);
    if (info.file.type === "image/png" || info.file.type === "image/jpg" || info.file.type === "image/jpeg") {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        if (info.file.response.data !== '') this.state.errors.imageoption2 = '';
        this.setState({
          imageoption2: info.file.response.data
        })
      }
    }
  }
  onChange = (value, dateString) => {
  //  console.log('Value', value, 'DateStrig', dateString);
  //  console.log(moment(dateString, dateFormat))
    if (dateString !== '') this.state.errors.stratdateandtime = '';
    var changeddate = new Date(dateString).toISOString()
    //console.log("changed date for start date",changeddate);
    this.setState({ stratdateandtime: dateString })
    this.setState({ stratdateandtime1: changeddate })
  }

  onOk = (value) => {
    //console.log('onOk: ', value);
  }
  onChange1 = (value, dateString) => {
    if (dateString !== '') this.state.errors.enddateandtime = '';
    var changeddate = new Date(dateString).toISOString()
    //console.log("changed date for end date",changeddate);
    this.setState({ enddateandtime: dateString })
    this.setState({ enddateandtime1: changeddate })
  }

  onOk1 = (value) => {
    // console.log('onOk: ', value);
  }
  onChangeterms = (e) => {
    if (this.state.terms !== '') this.state.errors.terms = '';
    this.setState({ terms: e.target.value });
  }
  handleChange15 = (e) => {
    if (this.state.winnersCount !== '') this.state.errors.winnersCount = '';
    this.setState({ winnersCount: e.target.value });
  }
  done() {

    let errors = {};
    if (this.state.pollingtype === '') errors.pollingtype = "Select one type"
    if (this.state.polltype.trim() === '') errors.polltype = "poll type is required."
    if (this.state.polldes.trim() === '') errors.polldes = "poll Description is required."
    if (this.state.contestIcon === '') errors.contestIcon = "Banner Image is required."
    if (this.state.stratdateandtime === '') errors.stratdateandtime = "start date is required."
    if (this.state.enddateandtime === '') errors.enddateandtime = "end date is required."
    if (this.state.terms.trim() === '') errors.terms = "terms and conditions are required."
    if (this.state.winnersCount === '') errors.winnersCount = "Number is required"
    if (this.state.pollcheck === '') errors.pollcheck = "all options are required."
    if (this.state.polldetails.trim() === '') errors.polldetails = "Poll details is required."
    if (this.state.polldetails.length >= 21) errors.polldetails = "Poll details should be 20 chars."
    if (this.state.pollcheck != '') {
      if (this.state.PollTitle.trim() === '' || this.state.PollDescription === '')
        errors.pollcheck41 = "Please give title description for PollYettoStart"
      if (this.state.PollTitle.length >= 36) errors.pollcheck41 = "Poll title should be 35 chars PollYettoStart"
      if (this.state.PollDescription.length >= 56) errors.pollcheck47 = "Poll caption should be 35 chars PollYettoStart"

      if (this.state.PollTitle1.trim() === '' || this.state.PollDescription1 === '')
        errors.pollcheck42 = "Please give title description for PollStarted(Notparticipated)"
      if (this.state.PollTitle1.length >= 36) errors.pollcheck42 = "Poll title should be 35 chars PollStarted(Notparticipated)"
      if (this.state.PollDescription1.length >= 56) errors.pollcheck48 = "Poll caption should be 35 chars PollStarted(Notparticipated)"


      if (this.state.PollTitle2.trim() === '' || this.state.PollDescription2 === '')
        errors.pollcheck43 = "Please give title description for PollStarted(Participated)"
      if (this.state.PollTitle2.length >= 36) errors.pollcheck43 = "Poll title should be 35 chars PollStarted(Participated)"
      if (this.state.PollDescription2.length >= 56) errors.pollcheck49 = "Poll caption should be 35 chars PollStarted(Participated)"


      if (this.state.PollTitle3.trim() === '' || this.state.PollDescription3 === '')
        errors.pollcheck44 = "Please give title description for PollEnded(Participated)"
      if (this.state.PollTitle3.length >= 36) errors.pollcheck44 = "Poll title should be 35 chars PollEnded(Participated)"
      if (this.state.PollDescription3.length >= 56) errors.pollcheck50 = "Poll caption should be 35 chars PollEnded(Participated)"



      if (this.state.PollTitle4.trim() === '' || this.state.PollDescription4 === '')
        errors.pollcheck45 = "Please give title description for PollEnded(NotParticipated)"
      if (this.state.PollTitle4.length >= 36) errors.pollcheck45 = "Poll title should be 35 chars PollEnded(NotParticipated)"
      if (this.state.PollDescription4.length >= 56) errors.pollcheck51 = "Poll caption should be 35 chars PollEnded(NotParticipated)"



      if (this.state.PollTitle5.trim() === '' || this.state.PollDescription5 === '')
        errors.pollcheck46 = "Please give title description for WinnersDeclared."

      if (this.state.PollTitle5.length >= 36) errors.pollcheck46 = "Poll title should be 35 chars WinnersDeclared"
      if (this.state.PollDescription5.length >= 56) errors.pollcheck52 = "Poll caption should be 35 chars WinnersDeclared"

    }
    if (this.state.pollingtype === "image") {
      if (this.state.imageoption1 === '') errors.imageoption1 = "Image is required."
      if (this.state.imageoption2 === '') errors.imageoption2 = "Image is required."
      if (this.state.option1.trim() === '') errors.option1 = "Option1 is required."
      if (this.state.option2.trim() === '') errors.option2 = "Option2 is required."
      if (this.state.option1.length >= 26) errors.option1 = "Option1 should be 25 chars."
      if (this.state.option2.length >= 26) errors.option2 = "Option2 should be 25 chars."
    } else if (this.state.pollingtype === "text") {
      if (this.state.option11.length >= 26) errors.option11 = "Option1 should be 25 chars."
      if (this.state.option22.length >= 26) errors.option22 = "Option2 should be 25 chars."
    }
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      var data = {
        "type": this.state.pollingtype,
        "pollTitle": this.state.PollTitle.trim(),
        "pollCaption": this.state.PollDescription.trim(),
        "pollText": "",
        "pollType": this.state.polltype.trim(),
        "pollImageUrl": this.state.contestIcon,
        "pollDescription": this.state.polldes.trim(),
        "pollStartDateTime": this.state.stratdateandtime1,
        "pollEndDateTime": this.state.enddateandtime1,
        "option1": {
          "option": this.state.pollingtype === "image" ? this.state.option1.trim() : this.state.option11.trim(),
          "optionImage": this.state.imageoption1,

        },
        "option2": {
          "option": this.state.pollingtype === "image" ? this.state.option2.trim() : this.state.option22.trim(),
          "optionImage": this.state.imageoption2,

        },
        "optionImage1": this.state.imageoption1,
        "optionImage2": this.state.imageoption2,
        "winnersCount": this.state.winnersCount,
        "termsAndConditions": this.state.terms.trim(),
        "pollDetails": this.state.polldetails.trim(),
        "contentOptions": {
          "toStart": {
            "pTitle": this.state.PollTitle.trim(),
            "pCaption": this.state.PollDescription.trim()
          }, "startedNparticipated": {
            "pTitle": this.state.PollTitle1.trim(),
            "pCaption": this.state.PollDescription1.trim()
          }, "startedNotParticipated": {
            "pTitle": this.state.PollTitle2.trim(),
            "pCaption": this.state.PollDescription2.trim()
          }, "endedNparticipated": {
            "pTitle": this.state.PollTitle3.trim(),
            "pCaption": this.state.PollDescription3.trim()
          }, "endedNotParticipated": {
            "pTitle": this.state.PollTitle4.trim(),
            "pCaption": this.state.PollDescription4.trim()
          }, "winnersDeclared": {
            "pTitle": this.state.PollTitle5.trim(),
            "pCaption": this.state.PollDescription5.trim()
          }
        }
      }

      if (this.state.id === '') {
        //console.log("create data", data)
        var self = this
        const url = process.env.REACT_APP_API_HOST + '/rest/optionPollCreation';
        var request = new Request(url, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            'x-access-token': sessionStorage.getItem('token')
          }
        });
        fetch(request)
          .then(response => response.json())
          .then(function (response) {
            if (response.statusCode === 1) {
              //console.log("resposnse", response)
              self.resetForm();
              message.success('Poll Created successfully!');
              browserHistory.push("/ElectioMain");
            }
            else {
             // console.log("resposnse", response)
              message.error(`Unable to create poll.`, 5);
            }
          })
      } else {
        data.pollId = this.state.id;
        //console.log("edit data", data);
        var self = this
        const url = process.env.REACT_APP_API_HOST + '/rest/optionPollEdit';
        var request = new Request(url, {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            'x-access-token': sessionStorage.getItem('token')
          }
        });
        fetch(request)
          .then(response => response.json())
          .then(function (response) {
            if (response.statusCode === 1) {
             // console.log("resposnse", response)
              self.resetForm();

              message.success('Poll Edited successfully!');
              browserHistory.push("/ElectioMain/UpComingElection");

            }
            else {
              //console.log("resposnse", response)
              message.error(`Unable to create poll.`, 5);
            }
          })
      }
    }

  }
  onChangepollended = (e) => {
    if (this.state.pollended !== '') this.state.errors.pollended = ''
    this.setState({ pollended: e.target.value })
  }
  onChangewinnersdeclared = (e) => {
    if (this.state.winnersd !== '') this.state.errors.winnersd = ''
    this.setState({ winnersd: e.target.value })
  }
  onChangepolltype = (e) => {
    if (this.state.polltype !== '') this.state.errors.polltype = ''
    this.setState({ polltype: e.target.value })
  }
  onChangepolldesc = (e) => {
    if (this.state.polldes !== '') this.state.errors.polldes = ''
    this.setState({ polldes: e.target.value })
  }
  onChangepolldetails = (e) => {
    if (this.state.polldetails !== '') this.state.errors.polldetails = ''
    this.setState({ polldetails: e.target.value })
  }
  onChangepolltitle = (e) => {
    if (this.state.polltext !== '') this.state.errors.polltext = ''
    this.setState({ polltext: e.target.value })
  }
  option1 = (e) => {
    if (this.state.option1 !== '') this.state.errors.option1 = ''
    this.setState({ option1: e.target.value })
  }
  option2 = (e) => {
    if (this.state.option2 !== '') this.state.errors.option2 = ''
    this.setState({ option2: e.target.value })
  }
  option11 = (e) => {
    if (this.state.option11 !== '') this.state.errors.option11 = ''
    this.setState({ option11: e.target.value })
  }
  option22 = (e) => {
    if (this.state.option22 !== '') this.state.errors.option22 = ''
    this.setState({ option22: e.target.value })
  }
  render() {
   // console.log("this.state", this.state);
    const imageUrl = this.state;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Dashboard>
        <div classNames="container">
          <div className="ElectionsSubMenu">
            <div className="SubMenu">
              <Col span={20}><h2 className="pageTitle">Polling</h2></Col>
              <Col span={4}>
                <Link to="/ElectioMain"><Button type="primary" className="pollBackBtn">Back to Dash Board</Button></Link>
              </Col>
            </div>
          </div>
          <Row>
            <Col span={6}>

            </Col>
          </Row>

          <Row className="ElectionsContainer">
            <Col span={20} className="ElectionsForm">
              <Form>
                <FormItem label="Select Type" className={classnames('pollingtype', { error: !!this.state.errors.pollingtype })}>
                  <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                    placeholder="Select type" style={{ width: 220 }}
                    optionFilterProp="children"
                    onChange={this.handleChange1}
                    value={this.state.pollingtype || undefined}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    <Option value="image">Image</Option>
                    <Option value="text">Text</Option>


                  </Select>
                  <p>{this.state.errors.pollingtype}</p>

                </FormItem>
                <FormItem label="Select Type" className={classnames('pollcheck', { error: !!this.state.errors.pollcheck })}>
                  <Select getPopupContainer={triggerNode => triggerNode.parentNode}
                    placeholder="Select type"
                    optionFilterProp="children"
                    onChange={this.handleChange14}
                    value={this.state.pollcheck || undefined}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    <Option value="PollYettoStart">Poll Yet to Start</Option>
                    <Option value="PollStarted(participated)">Poll Started( Participated)</Option>
                    <Option value="PollStarted(NotParticipated)">Poll Started(Not Participated)</Option>
                    <Option value="PollEnded(Participated)">Poll Ended(Participated)</Option>
                    <Option value="PollEnded(NotParticipated)">Poll Ended(Not Participated)</Option>
                    <Option value="WinnersDeclared">WinnersDeclared</Option>
                  </Select>
                  <p className="ErrorText">{this.state.errors.pollcheck}</p>
                  <p className="ErrorText">{this.state.errors.pollcheck41}</p>
                  <p className="ErrorText">{this.state.errors.pollcheck42}</p>
                  <p className="ErrorText">{this.state.errors.pollcheck43}</p>
                  <p className="ErrorText">{this.state.errors.pollcheck44}</p>
                  <p className="ErrorText">{this.state.errors.pollcheck45}</p>
                  <p className="ErrorText">{this.state.errors.pollcheck46}</p>
                  <p className="ErrorText">{this.state.errors.pollcheck47}</p>
                  <p className="ErrorText">{this.state.errors.pollcheck48}</p>
                  <p className="ErrorText">{this.state.errors.pollcheck49}</p>
                  <p className="ErrorText">{this.state.errors.pollcheck50}</p>
                  <p className="ErrorText">{this.state.errors.pollcheck51}</p>
                  <p className="ErrorText">{this.state.errors.pollcheck52}</p>
                  <p className="ErrorText">{this.state.errors.pollcheck1}</p>
                </FormItem>


                {this.state.pollcheck === "PollYettoStart" ? <div>

                  <FormItem className={classnames('PollTitle', { error: !!this.state.errors.PollTitle })} label="Poll Title">
                    <Input autoComplete={'off'} name="PollTitle" value={this.state.PollTitle} onChange={this.onChangetitle} />
                    <p>{this.state.errors.PollTitle}</p>
                  </FormItem>
                  <FormItem className={classnames('PollDescription', { error: !!this.state.errors.PollDescription })} label="Poll Caption">
                    <TextArea rows={3} placeholder="Enter Caption here" value={this.state.PollDescription} name="PollDescription" onChange={this.onChangedesc} />
                    <p>{this.state.errors.PollDescription}</p>
                  </FormItem>

                </div> : null}

                {this.state.pollcheck === "PollStarted(participated)" ? <div>
                  <FormItem className={classnames('PollTitle1', { error: !!this.state.errors.PollTitle1 })} label="Poll Title">
                    <Input autoComplete={'off'} name="PollTitle1" value={this.state.PollTitle1} onChange={this.onChangetitle} />
                    <p>{this.state.errors.PollTitle1}</p>
                  </FormItem>
                  <FormItem className={classnames('PollDescription1', { error: !!this.state.errors.PollDescription1 })} label="Poll Caption">
                    <TextArea rows={3} placeholder="Enter Caption here" value={this.state.PollDescription1} name="PollDescription1" onChange={this.onChangedesc} />
                    <p>{this.state.errors.PollDescription1}</p>
                  </FormItem></div> : null}

                {this.state.pollcheck === "PollStarted(NotParticipated)" ? <div>
                  <FormItem className={classnames('PollTitle2', { error: !!this.state.errors.PollTitle2 })} label="Poll Title">
                    <Input autoComplete={'off'} name="PollTitle2" value={this.state.PollTitle2} onChange={this.onChangetitle} />
                    <p>{this.state.errors.PollTitle2}</p>
                  </FormItem>
                  <FormItem className={classnames('PollDescription2', { error: !!this.state.errors.PollDescription2 })} label="Poll Caption">
                    <TextArea rows={3} placeholder="Enter Caption here" value={this.state.PollDescription2} name="PollDescription2" onChange={this.onChangetitle} />
                    <p>{this.state.errors.PollDescription2}</p>
                  </FormItem></div> : null}

                {this.state.pollcheck === "PollEnded(Participated)" ? <div>
                  <FormItem className={classnames('PollTitle3', { error: !!this.state.errors.PollTitle3 })} label="Poll Title">
                    <Input autoComplete={'off'} name="PollTitle3" value={this.state.PollTitle3} onChange={this.onChangetitle} />
                    <p>{this.state.errors.PollTitle3}</p>
                  </FormItem>
                  <FormItem className={classnames('PollDescription3', { error: !!this.state.errors.PollDescription3 })} label="Poll Caption">
                    <TextArea rows={3} placeholder="Enter Caption here" value={this.state.PollDescription3} name="PollDescription3" onChange={this.onChangedesc} />
                    <p>{this.state.errors.PollDescription3}</p>
                  </FormItem></div> : null}

                {this.state.pollcheck === "PollEnded(NotParticipated)" ? <div>
                  <FormItem className={classnames('PollTitle4', { error: !!this.state.errors.PollTitle4 })} label="Poll Title">
                    <Input autoComplete={'off'} name="PollTitle4" value={this.state.PollTitle4} onChange={this.onChangetitle} />
                    <p>{this.state.errors.PollTitle4}</p>
                  </FormItem>
                  <FormItem className={classnames('PollDescription4', { error: !!this.state.errors.PollDescription4 })} label="Poll Caption">
                    <TextArea rows={3} placeholder="Enter Caption here" value={this.state.PollDescription4} name="PollDescription4" onChange={this.onChangedesc} />
                    <p>{this.state.errors.PollDescription4}</p>
                  </FormItem></div> : null}
                {this.state.pollcheck === "WinnersDeclared" ? <div>
                  <FormItem className={classnames('PollTitle5', { error: !!this.state.errors.PollTitle5 })} label="Poll Title">
                    <Input autoComplete={'off'} name="PollTitle5" value={this.state.PollTitle5} onChange={this.onChangetitle} />
                  </FormItem>
                  <FormItem className={classnames('PollDescription5', { error: !!this.state.errors.PollDescription5 })} label="Poll Caption">
                    <TextArea rows={3} placeholder="Enter Caption here" value={this.state.PollDescription5} name="PollDescription5" onChange={this.onChangedesc} />
                  </FormItem></div> : null}

                <FormItem label="Poll Type" className={classnames('polltype', { error: !!this.state.errors.polltype })}>
                  <Input placeholder="Poll Type" value={this.state.polltype} onChange={this.onChangepolltype} />
                  <p>{this.state.errors.polltype}</p>
                </FormItem>



                <FormItem>

                  <Row>
                    <Col span={24}>
                      <Col span={6} xs={12} sm={6} xl={4} lg={6} md={6} className="ElecTon1">
                        <FormItem className={classnames('contestIcon', { error: !!this.state.errors.contestIcon })}>
                          <h6 className='h6Fnt'>Add Banner Image</h6>
                          <Upload {...props}
                            className="ElecTon avatar-uploader"
                            showUploadList={false}
                            onChange={this.handleChange5}

                            accept=".png,.jpg,.jpeg"
                          >
                            {
                              this.state.contestIcon ?
                                <img src={this.state.contestIcon} name="contestIcon" alt="contest Icon Img" className="avatar" style={{ width: 143, height: 143 }} /> :
                                <Icon type="plus" className="avatar-uploader-trigger" />
                            }
                          </Upload>
                          <p>{this.state.errors.contestIcon}</p>
                        </FormItem>
                      </Col>
                      {this.state.pollingtype === "image" ? <div>
                        <Col span={6} xs={12} sm={6} xl={4} lg={6} md={6} className="ElecTon1">
                          <FormItem className={classnames('imageoption1', { error: !!this.state.errors.imageoption1 })}>
                            <h6 className='h6Fnt'>Add Image option1</h6>
                            <Upload {...props}
                              className="ElecTon avatar-uploader"
                              showUploadList={false}
                              onChange={this.handleChange6}

                              accept=".png,.jpg,.jpeg"
                            >
                              {
                                this.state.imageoption1 ?
                                  <img src={this.state.imageoption1} name="contestIcon" alt="contest Icon Img" className="avatar" style={{ width: 143, height: 143 }} /> :
                                  <Icon type="plus" className="avatar-uploader-trigger" />
                              }
                            </Upload>
                            <p>{this.state.errors.imageoption1}</p>
                          </FormItem>
                        </Col>
                        <Col span={6} xs={12} sm={6} xl={4} lg={6} md={6} className="ElecTon1">
                          <FormItem className={classnames('imageoption2', { error: !!this.state.errors.imageoption2 })}>
                            <h6 className='h6Fnt'>Add Image option2</h6>
                            <Upload {...props}
                              className="ElecTon avatar-uploader"
                              showUploadList={false}

                              onChange={this.handleChange7}
                              accept=".png,.jpg,.jpeg"
                            >
                              {
                                this.state.imageoption2 ?
                                  <img src={this.state.imageoption2} name="contestIcon" alt="contest Icon Img" className="avatar" style={{ width: 143, height: 143 }} /> :
                                  <Icon type="plus" className="avatar-uploader-trigger" />
                              }
                            </Upload>
                            <p>{this.state.errors.imageoption2}</p>
                          </FormItem>
                        </Col></div> : null}
                    </Col>
                  </Row>
                </FormItem>
                {this.state.pollingtype === "image" ? <div>
                  <Row>
                    <Col span={24} className="">
                      <Col span={8} className="">
                        <FormItem className={classnames('option1', { error: !!this.state.errors.option1 })}>
                          <Input placeholder="option1" value={this.state.option1} onChange={this.option1} />
                          <p>{this.state.errors.option1}</p>
                        </FormItem>
                      </Col>
                      <Col span={8} className="marginLeft20">
                        <FormItem className={classnames('option2', { error: !!this.state.errors.option2 })}>
                          <Input placeholder="option2" value={this.state.option2} onChange={this.option2} />
                          <p>{this.state.errors.option2}</p>
                        </FormItem>
                      </Col>
                    </Col>
                  </Row>
                </div> : null}
                {this.state.pollingtype === "text" ? <div>
                  <Row>
                    <Col span={24} className="">
                      <Col span={8} className="">
                        <FormItem className={classnames('option11', { error: !!this.state.errors.option11 })}>
                          <Input placeholder="option1" value={this.state.option11} onChange={this.option11} />
                          <p>{this.state.errors.option11}</p>
                        </FormItem>
                      </Col>
                      <Col span={8} className="marginLeft20">
                        <FormItem className={classnames('option22', { error: !!this.state.errors.option22 })}>
                          <Input placeholder="option2" value={this.state.option22} onChange={this.option22} />
                          <p>{this.state.errors.option22}</p>
                        </FormItem>
                      </Col>
                    </Col>
                  </Row></div> : null}
                <Row>
                  <Col span={24} className="">
                    <Col span={6} xs={12} sm={8} xl={4} lg={5} md={7} className="">
                      <FormItem className={classnames('stratdateandtime', { error: !!this.state.errors.stratdateandtime })}>
                        <h4 className="">Poll Time</h4>
                        <DatePicker getCalendarContainer={triggerNode => triggerNode.parentNode}
                          showTime
                          value={this.state.stratdateandtime ? moment(this.state.stratdateandtime, dateFormat) : ''}
                          format="YYYY-MM-DD HH:mm:ss"
                          placeholder="Starts At"
                          onChange={this.onChange}
                          onOk={this.onOk}
                        />
                        <p>{this.state.errors.stratdateandtime}</p>
                      </FormItem>
                    </Col>
                    <Col span={6} xs={12} sm={6} xl={4} lg={6} md={6} className="margnPolls">
                      <FormItem className={classnames('enddateandtime', { error: !!this.state.errors.enddateandtime })}>
                        <DatePicker getCalendarContainer={triggerNode => triggerNode.parentNode}
                          showTime
                          value={this.state.enddateandtime ? moment(this.state.enddateandtime, dateFormat) : ''}
                          format="YYYY-MM-DD HH:mm:ss"
                          placeholder="Ends At"
                          onChange={this.onChange1}
                          onOk={this.onOk1}
                        />
                        <p>{this.state.errors.enddateandtime}</p>
                      </FormItem>
                    </Col>  </Col>
                </Row>
                <Row>
                  <Col span={24} className="">
                    <Col span={6} xs={12} sm={8} xl={4} lg={5} md={7} className="">
                      <FormItem label="Poll Description" className={classnames('polldes', { error: !!this.state.errors.polldes })}>
                        <Input placeholder="Poll Description" value={this.state.polldes} onChange={this.onChangepolldesc} />
                        <p>{this.state.errors.polldes}</p>
                      </FormItem>
                    </Col>
                    <Col span={6} xs={12} sm={6} xl={4} lg={6} md={6} className="margnPolls12">
                      <FormItem label="Poll Details" className={classnames('polldetails', { error: !!this.state.errors.polldetails })}>
                        <Input placeholder="Poll Details" value={this.state.polldetails} onChange={this.onChangepolldetails} />
                        <p>{this.state.errors.polldetails}</p>
                      </FormItem>
                    </Col>  </Col>
                </Row>
                {/*   <FormItem className={classnames('polltext', { error: !!this.state.errors.polltext })}>
                  <Input placeholder="Poll Text" value={this.state.polltext} onChange={this.onChangepolltitle} />
                  <p>{this.state.errors.polltext}</p>
                </FormItem>    */}
                <FormItem className={classnames('winnersCount', { error: !!this.state.errors.winnersCount })}><h4>Winners Count</h4>
                  <Input type="number" placeholder="WinnersCount" value={this.state.winnersCount} onChange={this.handleChange15} />
                  <p>{this.state.errors.winnersCount}</p>
                </FormItem>
                {/* {this.state.pollstatus === "PollEnded" ? <div>
                  <Input onChange={this.onChangepollended} /></div> : null}
                {this.state.pollstatus === "WinnersDeclared" ? <div>
                  <Input onChange={this.onChangewinnersdeclared} /></div> : null}
                */}
                <FormItem className={classnames('terms', { error: !!this.state.errors.terms })} label="Terms and Conditions">
                  <TextArea rows={3} placeholder="Enter Description here"
                    name="PollDescription4" value={this.state.terms} onChange={this.onChangeterms} />
                  <p>{this.state.errors.terms}</p>
                </FormItem>
                <Button type="primary" onClick={() => this.done()} >Submit</Button>
              </Form>
            </Col>
          </Row>
        </div>
      </Dashboard>
    );
  };
}


export default Elections;
/* eslint-disable */