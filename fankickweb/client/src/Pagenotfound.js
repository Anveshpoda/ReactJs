import React from 'react';
import Dashboard from './Dashboard/Dashboard'
//import { Link } from 'react-router';


class Pagenotfound extends React.Component {
  render() {
    return (
        <Dashboard>
      <div className="pagenotfound" style={{textAlign:'center',paddingTop:'10%',backgroundColor:'#fff',border:'1px solid #e5e5e5',height:'500px',margin:'50px 12px 12px 12px'}}>
      <h1 style={{fontSize:'50px',fontWeight:'800',color:'#783293'}}>Page Not Found</h1>
       <h4 style={{fontSize:'25px',fontWeight:'500',color:'#000'}}>We couldn't find what you were looking for.</h4>
       <h4 style={{fontSize:'15px',fontWeight:'500',color:'#000',paddingTop:'15px'}}>The requested URL was not found on this server.</h4>
    
      </div>
       </Dashboard>
    );
  }
}

export default Pagenotfound;