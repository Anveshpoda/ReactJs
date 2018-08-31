import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            mobile: '',
            redirect: false,
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
            mobile: '',
            redirect: true
        })
        localStorage.setItem('Item',JSON.stringify(items) );
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect Push to='/table'/>;
            // return<Redirect from='/old-path' to='/new-path'/>
          }
        return (
            <div className="App">
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