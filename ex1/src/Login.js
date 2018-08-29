import React, { Component } from 'react';

class Login extends Component {
    
    constructor() {
        super();
        this.state = {
            username: '',
            number: '',
            email: '',
            selectValue: 'hyderabad',
            selectedOption: '',
            checkedOption: '',
            items: [],
            errors: {}
        }
    };

    handleValidation() {
        let errors = {};
        let formIsValid = true;

        if (this.state.username === "") {
            formIsValid = false;
            errors["username"] = "Cannot be empty";
        }
        if (this.state.number === "") {
            formIsValid = false;
            errors["number"] = "Cannot be empty";
        }
        if (this.state.number === "undefined") {
            if (this.state.number.match(/[0-9]{10}/)) {
                formIsValid = false;
                errors["number"] = "Only Numbers";
            }
        }

        if (this.state.email === "") {
            formIsValid = false;
            errors["email"] = "Cannot be empty";
        }
        if (this.state.email === "undefined") {
            let lastAtPos = this.state.email.lastIndexOf('@');
            let lastDotPos = this.state.email.lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') === -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            }
        }

        else {
            let items = [...this.state.items];
            items.push({
                username: this.state.username,
                number: this.state.number,
                email: this.state.email,
                selectValue: this.state.selectValue,
                selectedOption: this.state.selectedOption,
                checkedOption:this.state.checkedOption
            });
            this.setState({
                items,
                username: '',
                number: '',
                email: '',
                selectValue: 'hyderabad',
                selectedOption: '',
                checkedOption: ''
            });
        }
        this.setState({ errors: errors });
        return formIsValid;
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        if (this.handleValidation()) {
            console.log("success");
        } else {
            console.log("fail");
        }
    };


    handleOptionChange = (e) => {
        this.setState({
            selectedOption: e.target.value
        });
    }
    handleChange = (e) => {
        this.setState({
            selectValue: e.target.value
        });
    }
    handleChecked= (e) => {
        this.setState({
            checkedOption1: e
        });
    }
    

    render() {
        const item = this.state.items;
        return (
            <div className="App">
                <div id="Form">
                    <h3>Registration Form</h3>
                    <form onSubmit={this.handleFormSubmit}>
                        <label htmlFor="username">
                            Username:
                            <input id="username" value={this.state.username} type="text" name="username" onChange={this.handleInputChange} />
                            <span style={{ color: "red" }}>{this.state.errors["username"]}</span>
                        </label>
                        <label htmlFor="number">
                            Number:
                            <input id="number" value={this.state.number} type="number" name="number" onChange={this.handleInputChange} />
                            <span style={{ color: "red" }}>{this.state.errors["number"]}</span>
                        </label>
                        <label htmlFor="email">
                            Email:
                            <input id="email" value={this.state.email} type="email" name="email" onChange={this.handleInputChange} />
                            <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                        </label>
                        <label>
                            Gender:
                            <input id="male" value="male" checked={this.state.selectedOption === 'male'} type="radio" name="gender" onChange={this.handleOptionChange} />Male
                            <input id="female" value="female" checked={this.state.selectedOption === 'female'} type="radio" name="gender" onChange={this.handleOptionChange} />Female
                        </label>
                        <label>
                            Place:
                            <select id="place" value={this.state.selectValue} onChange={this.handleChange} >
                                <option value="hyderabad" >Hyderabad</option>
                                <option value="guntur" >Guntur</option>
                                <option value="bapatla" >Bapatla</option>
                            </select>
                        </label>
                        {/* <label>
                            Languages Known :
                            <input value="telugu" type="checkbox" name="telugu" checked={this.state.checkedOption === 'telugu'} onChange={this.state.handleChecked} />telugu
                            <input value="english" type="checkbox" name="english" checked={this.state.checkedOption === 'english'} onChange={this.state.handleChecked} />English
                        </label> */}
                        <button type="submit" value="Submit">Submit</button>

                    </form>
                </div>
                <table id="Table">
                    <tbody>
                        <tr>
                            <th>Username</th>
                            <th>Number</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Place</th>
                            <th>Languages Known</th>
                        </tr>
                        {item.map(i => {
                            return (
                                <tr>
                                    <td>{i.username}</td>
                                    <td>{i.number}</td>
                                    <td>{i.email}</td>
                                    <td>{i.selectedOption}</td>
                                    <td>{i.selectValue}</td>
                                    <td>{i.checkedOption}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}


export default Login;
