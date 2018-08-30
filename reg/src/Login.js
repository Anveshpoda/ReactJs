import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { browserHistory, hashHistory,Redirect } from 'react-router'

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            mobile: '',
            items: []
        }
    };
    handleFormSubmit = (e) => {
        e.preventDefault();

        let items = [...this.state.items];

        items.push({ username: this.state.username, password: this.state.password, mobile: this.state.mobile });

        this.setState({
            items,
            username: '',
            password: '',
            mobile: ''
        })
        //browserHistory.push("/table");
         this.props.history.push('/table')
        // hashHistory.push("/Table")
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    render() {
        return (
            <div className="App" key="newscreen">
                <Form handleFormSubmit={this.handleFormSubmit} handleInputChange={this.handleInputChange} newUsername={this.state.username} newMobile={this.state.mobile} newPassword={this.state.password} />
                {/* <Table items={ this.state.items }/> */}
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
            <input id="username" value={this.props.newUsername} type="text" name="username" onChange={this.props.handleInputChange} />
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

export default App;