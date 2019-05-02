import pic from './smartbin.png';
import pic1 from './image.jpg';
import trash from './trash.jpg';
import {Link} from 'react-router-dom';
import React, { Component } from 'react';
import {Redirect} from 'react-router';
import { GoogleLogout } from 'react-google-login';
//mport {history} from "../../util/utils";
//import { createBrowserHistory } from 'history';
class aboutme extends Component {
    state = {  }
    render() { 
        let redirectVar = null;
    
        const logout = (response) => {
            console.log("logout", response);
           // console.log("token", response.Zi.access_token);
            localStorage.removeItem('token')
            redirectVar = <Redirect to="/about" />
            //createBrowserHistory.push('/about')
          }
        return (  
            <div style={{"background-blend-mode": "darken"}}>
            {redirectVar} 
        
            {/* // <div className="images">
            // <img  src={pic1}/></div>
            // <h1>hello</h1> 
            // <div> */}
             <Link to="/about">
            <img style={{"margin-left":"30px", "margin-top":"20px" }} src="https://img.icons8.com/metro/420/twitter.png" height="100" width="100"/></Link>
            <h1 style={{"margin-left":"300px", "margin-top":"-50px" }}>REAL TIME ANALYSIS OF TWITTER DATA &nbsp; &nbsp; &nbsp;</h1>
            <h4 style={{"margin-left":"1000px", "margin-top":"-50px"}}><Link to="/aboutme">  About Us!  </Link></h4> 
            <h4 style={{"margin-left":"1100px", "margin-top":"-40px"}}><Link to="/graphdata">Dashboard</Link></h4>
            {/* <h4 style={{"margin-left":"1200px", "margin-top":"-40px"}}>Login</h4><br/><hr/> */}
            <div style={{"margin-left":"1200px", "margin-top":"-50px"}}>
            <GoogleLogout
      buttonText="Logout"
      onLogoutSuccess={logout}
     
    >
    </GoogleLogout>
             </div>
            <img style={{ width: 500, height:400, "margin-left":"100px", "margin-top":"100px" }} src={"https://im.indiatimes.in/photogallery/2013/Apr/1_1365227481.png"}/>
            <h2 style={{"margin-left":"800px", "margin-bottom":"-50px", "margin-top":"-400px"}}>Influence of Social Media in Elections</h2><br/>
            <p style={{"margin-left":"650px", "margin-top":"70px", "font-size":"20px", "margin-right":"100px"}}>
            The role of social media platforms like Twitter in politics has never been more prominent than it is now. Political scientists study how tweets translate into votes. We have seen Twitter play an important and decisive role in some of the major elections at the global stage. Presidential Elections in 2016 USA was a prominent example of this online phenomenon. In our project, we intend to analyze the sentiments of tweets related to the 2019 Indian (Lok Sabha) Elections. We will use tweet related data and analyze it in real time and perform some analysis on historical data as well to observe trends. We will make use of AWS services like EC2, Kinesis, RDS, Redshift, and Quicksight to stream, store and visualize the data.
             
          
            
            </p>
            </div>
        );
    }
}
  
export default aboutme;