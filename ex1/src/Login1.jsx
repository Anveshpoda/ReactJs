import React, { Component } from 'react';
import { browserHistory , hashHistory } from '../node_modules/react-router/lib';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends React.Component {
    constructor() {
      super();
      this.state = {
        username: '',
        password: '',
        mobile:'',
        items: [],
        newscreen:[]
      }
    };
  
    // componentWillMount(){
    //   let newscreen=[];
    //   newscreen.push(<Form handleFormSubmit={ this.handleFormSubmit } handleInputChange={ this.handleInputChange } newUsername={ this.state.username } newPassword={ this.state.password } parentContext={this}  appContext={this.props.appContext}/>);
    //   this.setState({  newscreen:newscreen })
    // }

    handleFormSubmit = (e) => {
      e.preventDefault();
  
      let items = [...this.state.items];
  
      items.push({username: this.state.username, password: this.state.password, mobile: this.state.mobile});
  
      this.setState({
        items,
        username: '',
        password: '',
        mobile:''
      })
       browserHistory.push("/Table");
      // hashHistory.push("/Table")

      // let newscreen=[];
      // newscreen.push(<Table  parentContext={this} 
      //                         appContext={this.props.appContext}
      //                         items={ this.state.items }/>);
      // this.setState({  newscreen:newscreen })
    };
  
    handleInputChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    };
  
    render() {
      return (
        <div className="App" key="newscreen">
           {this.state.newscreen}
          <Form handleFormSubmit={ this.handleFormSubmit } handleInputChange={ this.handleInputChange } newUsername={ this.state.username } newMobile={ this.state.mobile} newPassword={ this.state.password }/>
          <Table items={ this.state.items }/>
        </div>
      );
    }
  }




  class Form extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
      
        <div id="Form">
          <h3>Add a new item to the table:</h3>  
          <form onSubmit={this.props.handleFormSubmit}>
            <label htmlFor="username">
            Username:
            <input id="username" value={this.props.newUsername} type="text" name="username"  onChange={this.props.handleInputChange} />
            </label>
            <label for="password">
            Password:
            <input id="password" value={this.props.newPassword} type="password" name="password" onChange={this.props.handleInputChange} />
            </label>
            <label for="mobile">
            Mobile:
            <input id="mobile" value={this.props.newMobile} type="number" name="mobile" onChange={this.props.handleInputChange} />
            </label>
            <button type="submit" value="Submit">Add Item</button>
          </form>
        </div>
      );
    }
  }
  
  export  class Table extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      //const items = this.props.items;
      return (
        <div id="Table">
          <table>
            <tbody>
              <tr>
                <th>Username</th>
                <th>Password</th>
                <th>Mobile</th>
              </tr>
              {/* {items.map(item => {
                return (
                  <tr>
                    <td>{item.username}</td>
                    <td>{item.password}</td>
                    <td>{item.mobile}</td>
                  </tr>
                );
              })} */}
            </tbody>
          </table>
        </div>
      );
    }
  }


  export default App;


  