import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import './App.css';

class App extends React.Component {
    constructor() {
        super();
        var item = [];
        if (JSON.parse(localStorage.getItem('Item')) == !undefined || JSON.parse(localStorage.getItem('Item'))) {
            item = JSON.parse(localStorage.getItem('Item'))
        }

        this.state = {
            username: '',
            password: '',
            mobile: '',
            error: '',
            errors: {},
            fields: {},
            redirect: false,
            items: item
        }
    };
    handleFormSubmit = (e) => {
        e.preventDefault();
        if (this.state.username <= 0 || this.state.password <= 0 || this.state.mobile <= 0) return


        let items = [...this.state.items];

        let id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);

        items.push({ id: id, username: this.state.username, password: this.state.password, mobile: this.state.mobile });

        this.setState({
            items,
            username: '',
            password: '',
            mobile: '',
            redirect: true
        })
        localStorage.setItem('Item', JSON.stringify(items));
    };

    handleInputChange = (e) => {
        let error
        let errors = {...this.state.errors};

        //Name
        if(!e.target.value.trim()){
            errors[e.target.name] = e.target.name + " cannot be empty";
         }else errors[e.target.name] = ''
 
        if (e.target.value <= 0) error = e.target.name + "  is mandatory field"
        else error = ''
        this.setState({
            [e.target.name]: e.target.value.trim(),
            error,
            errors
        })
    };



    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect Push to='/table' />;
            // return<Redirect from='/old-path' to='/new-path'/>
        }
        return (
            <div className="App">
                <Form handleFormSubmit={this.handleFormSubmit} handleInputChange={this.handleInputChange} newUsername={this.state.username} newMobile={this.state.mobile} newPassword={this.state.password} errors={this.state.errors} />
                {/* <Table items={ this.state.items }/> */}
                <br /> <br /> <br />
                {this.state.error}
            </div>
        );
    }
}




export class Form extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (

            <div id="Form"> <br></br><br></br><br></br><br></br><br></br>

                <form onSubmit={this.props.handleFormSubmit}>
                    <label htmlFor="username">
                        Username:
            <input id="username" value={this.props.newUsername} type="text" name="username" onChange={this.props.handleInputChange} />
                        <span style={{ color: "red" }}>{this.props.errors["username"]}</span>
                    </label>
                    <label for="password">
                        Password:
            <input id="password" value={this.props.newPassword} type="password" name="password" onChange={this.props.handleInputChange}/>
            <span style={{color: "red"}}>{this.props.errors["password"]}</span>
                    </label>
                    <label for="mobile">
                        Mobile:
            <input id="mobile" value={this.props.newMobile} type="number" name="mobile" onChange={this.props.handleInputChange}/>
            <span style={{color: "red"}}>{this.props.errors["mobile"]}</span>
                    </label>
                    <button type="submit" value="Submit">Add Item</button>
                    {/* <Link to={'/table'}><button type="submit" value="Submit">Add Item</button></Link>  */}
                </form>
            </div>
        );
    }
}

export default App;