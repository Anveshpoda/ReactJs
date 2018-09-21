/* eslint-disable */
import React, { Component } from 'react';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import Dashboard from './Dashboard/Dashboard'
class App extends Component {
  render() {
    return (
      <LocaleProvider locale={enUS}>
      <div>
        {this.props.children}
        </div>
        {/* <Dashboard> {this.props.children}</Dashboard> */}
      </LocaleProvider>
    );
  }
}

export default App;
/* eslint-disable */