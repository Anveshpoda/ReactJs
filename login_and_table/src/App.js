import React, { Component } from 'react'
import './css/App.css';
import Hedder from './Components/Hedder';
import { Card, message } from 'antd';
import LoginForm from './Components/LoginForm'
import TableModule from './Components/Table'
import { users, admin } from "./data";

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      flag: sessionStorage.getItem('loginToken')
    }
  }

  login = data => {
    if (data.username === admin.username && data.password === admin.password) {
      sessionStorage.setItem('loginToken', true)
      this.setState({ flag: true })
      message.success('Login Success')
    } else message.error('Invalid Credentials')

  }

  logout = () => {
    sessionStorage.clear()
    this.setState({ flag: false })
  }

  render() {

    return <div>

      {
        this.state.flag ?

          <div>
            <Hedder logout={this.logout}/>
            <div style={{ marginTop: 95 }}>
              <div style={{ margin: 35 }}>
                <Card>
                  <TableModule data={users} />
                </Card>
              </div>
            </div>
          </div> :

          <div style={{ height: '100vh' }}>
            <div className='divCenter'>
              <Card className='login-Card'>
                <LoginForm login={this.login} />
              </Card>
            </div>
          </div>

      }

    </div>
  }
}