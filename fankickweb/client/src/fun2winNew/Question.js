/* eslint-disable */
import React from 'react';
import './CreateFun2Win.css';
import MultiplePack2 from './Questions/MultiplePack2';
import GridPack2 from './Questions/GridPack2';
import PollingPack2 from './Questions/PollingPack2';
import CombinationPack2 from './Questions/CombinationPack2';
import ImagePack2 from './Questions/ImagePack2';
import { Form, Select } from 'antd';
import $ from 'jquery';
const Option = Select.Option;
const FormItem = Form.Item;


class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: ''
    }
    this.onQuestionTypeChange = this.onQuestionTypeChange.bind(this);
  }
  componentDidMount() {
    this.setState({
      category: this.props.questionCategory,queueId:this.props.queueId
    })
  }
  onQuestionTypeChange = (e) => {
    this.setState({
      category: e
    })
  }
  hideDiv = (a) => {
    $("#removeDropdown" + a).hide();
  }
  componentWillReceiveProps(newProps){
    this.setState({
      category: newProps.questionCategory
    })
  }
  displayQuestion = () => {
    if (this.state.category.includes("Multiple")) {
      return (<div><MultiplePack2 questionCategory={this.props.questionCategory}
        multiid={this.props.multiid}
        multiquestion={this.props.multiquestion}
        multioption1={this.props.multioption1}
        multioption2={this.props.multioption2}
        multioption3={this.props.multioption3}
        multioption4={this.props.multioption4}
        multiquestionType={this.props.multiquestionType}
        multicorrectAnswer={this.props.multicorrectAnswer}
        editable={this.props.editable}
        fnRemove={this.props.fnRemove}
        fnEnableEdit={this.props.fnEnableEdit}
        fnmultiEdit={this.props.fnmultiEdit}
        hideDiv={this.hideDiv.bind(this, this.props.counterid)}
        counterid={this.props.counterid}
        counter={this.state.queueId} contentPack={this.props.onQuestionChange} fnAdd={this.props.fnAdd} /> </div>)
    }
    else if (this.state.category.includes("Grid")) {
      return (<div><GridPack2 questionCategory={this.props.questionCategory}
        gridid={this.props.gridid}
        gridquestion={this.props.gridquestion}
        gridoption1={this.props.gridoption1}
        gridoption2={this.props.gridoption2}
        gridoption3={this.props.gridoption3}
        gridoption4={this.props.gridoption4}
        gridquestionType={this.props.gridquestionType}
        gridcorrectAnswer={this.props.gridcorrectAnswer}
        editable={this.props.editable}
        fnRemove={this.props.fnRemove}
        fnEnableEdit={this.props.fnEnableEdit}
        fngridEdit={this.props.fngridEdit}
        hideDiv={this.hideDiv.bind(this, this.props.counterid)}
        contentPackGrid={this.props.onQuestionChange1}
        counterid={this.props.counterid}
        counter={this.state.queueId} /> </div>)
    }
    else if (this.state.category.includes("Poll")) {
      return (<div><PollingPack2
        questionCategory={this.props.questionCategory}
        pollid={this.props.pollid}
        pollquestion={this.props.pollquestion}
        pollimage={this.props.pollimage}
        polloption1={this.props.polloption1}
        polloption2={this.props.polloption2}
        pollquestionType={this.props.pollquestionType}
        editable={this.props.editable}
        fnRemove={this.props.fnRemove}
        fnEnableEdit={this.props.fnEnableEdit}
        fnpollEdit={this.props.fnpollEdit}
        counterid={this.props.counterid}
        hideDiv={this.hideDiv.bind(this, this.props.counterid)}
        counter={this.state.queueId} contentPackPoll={this.props.onQuestionChange2} /> </div>)
    }
    else if (this.state.category.includes("Combination")) {
      return (<div><CombinationPack2
        questionCategory={this.props.questionCategory}
        combinationid={this.props.combinationid}
        combinationquestion={this.props.combinationquestion}
        combinationimage={this.props.combinationimage}
        combinationoption1={this.props.combinationoption1}
        combinationoption2={this.props.combinationoption2}
        combinationoption3={this.props.combinationoption3}
        combinationquestionType={this.props.combinationquestionType}
        combinationcorrectAnswer={this.props.combinationcorrectAnswer}
        editable={this.props.editable}
        fnRemove={this.props.fnRemove}
        fnEnableEdit={this.props.fnEnableEdit}
        fncombiEdit={this.props.fncombiEdit}
        counterid={this.props.counterid}
        hideDiv={this.hideDiv.bind(this, this.props.counterid)}
        counter={this.state.queueId} contentPackCombi={this.props.onQuestionChange3}
      /> </div>)
    }
    else if (this.state.category.includes("Image")) {
      return (<div><ImagePack2
        questionCategory={this.props.questionCategory}
        imageid={this.props.imageid}
        imagequestion={this.props.imagequestion}
        imageimage={this.props.imageimage}
        imageoption1={this.props.imageoption1}
        imageoption2={this.props.imageoption2}
        imageoption3={this.props.imageoption3}
        imagequestionType={this.props.imagequestionType}
        imagecorrectAnswer={this.props.imagecorrectAnswer}
        editable={this.props.editable}
        fnRemove={this.props.fnRemove}
        fnEnableEdit={this.props.fnEnableEdit}
        fnimageEdit={this.props.fnimageEdit}
        counterid={this.props.counterid}
        hideDiv={this.hideDiv.bind(this, this.props.counterid)}
        counter={this.state.queueId} contentPackImage={this.props.onQuestionChange4} /> </div>)
    }
  }

  render() {
    return (
      <div id={"removeDropdown" + this.props.counterid}>
      
        <div> {(this.props.counterid === undefined)?<FormItem>
          <Select getPopupContainer={triggerNode => triggerNode.parentNode} showSearch style={{ width: 200 }} value={this.state.category ? this.state.category : '' || undefined} placeholder="Select Question Category" onChange={this.onQuestionTypeChange}>
            <Option value={"Multiple" + this.props.queueId}>Multiple</Option>
            <Option value={"Grid" + this.props.queueId}>Grid</Option>
            <Option value={"Poll" + this.props.queueId}>Polling</Option>
            <Option value={"Combination" + this.props.queueId}>Combination</Option>
            <Option value={"Image" + this.props.queueId}>Image</Option>
          </Select>
        </FormItem>
        :null}
          <span className="optionBlock">
            {this.displayQuestion()}
          </span>  </div>
      </div>
    );
  };
}

export default Question;
/* eslint-disable */