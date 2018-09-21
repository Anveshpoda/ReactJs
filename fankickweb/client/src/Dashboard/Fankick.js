/* eslint-disable */
import React, { Children } from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
import Challenges from '../challenges/Challenges'
import Fun2WinPage from '../fun2win/Fun2WinPage'
import Dashboard from '../Dashboard/Dashboard'
class Fankick extends React.Component {
constructor(props){
super(props)
this.state = {
    role:''
}
}
    componentDidMount() {
        console.log("called before")

console.log("called after")
        $(".leftMenu").show();
        // $(".rightMenuView").show();
        $(".rightMenu").show();
        $(".ant-layout-header").show();
        $(".ant-layout-footer").show();
        $(".footerview").show();
    }
    componentWillMount() {
      //  window.backAvoid();
      var user = JSON.parse(sessionStorage.getItem('user'));
      console.log("userdata in contest page menu",user.permissions);
      this.setState({role:user.permissions})
    }
    render() {
      
        const role=this.state.role
        console.log("role",role);
        return (
            <div>
              
                <Dashboard>
                    {role.challenges.status === true ?
                     <Challenges />:role.fun2win.status === true? <Fun2WinPage/> :null}
                      

                      
                       </Dashboard>
            </div>
        );
    }
}
export default Fankick;
/* eslint-disable */