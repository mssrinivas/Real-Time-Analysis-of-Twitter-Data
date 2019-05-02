import React,{ Component } from 'react';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
import './applicantprofile.css';
import BarChart from './barchart';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { GoogleLogout } from 'react-google-login';
class GraphData extends Component {

  constructor(props) {
    super(props);
    this.displayValue =[];
    this.heightValue = [];
    this.maxHeight=0;
    this.state={
      datamap1:null,
      datamap2:null,
      flag:false,
      bin_id:"5bfeef7033a5340fd7215b7a"
    }
    this.parseData = this.parseData.bind(this);
    // this.getAdminDashBoardGraph = this.getAdminDashBoardGraph.bind(this);
  }
  //5bfeef7033a5340fd7215b7a
//
  componentDidMount() {
   
  }
  parseData(){
    var labelArray = new Array();
    var datamap = new Map();
    var dataset = this.displayValue;
    for(var i = 3 ; i >0;i--) {
      var d1=new Date();
      d1.setDate(d1.getDate() - i);
      var oldData = d1.toISOString().split('T')[0];
      var firstTime = d1.toISOString().split('T')[1];
      // console.log("Value of old date:", oldData);
      var heightSum=0;
      var count=0;
      for(var j=0;j<dataset.length;j++) {
        var datevalue=dataset[j].timestamp;
        var newdate = datevalue.toString().split('T')[0];
        // console.log("Here I am", newdate);
        if(oldData.split('-')[2]==newdate.split('-')[2]) {
          // console.log("Inside if");
          heightSum+=dataset[j].height;
          count++;
          var v = oldData;
        }

      }
      var finalData=heightSum/count;
      labelArray.push(finalData);
      datamap.set(finalData,v);
    }
        this.state.datamap1 = datamap;
        var labels = new Array();
        var datasets = new Array();
        // for(let [key, value] of this.state.datamap1) {
        //   console.log("Key : " +key +"value: " +value);
        // }
        for(let [key, value] of this.state.datamap1) {
          labels.push(value);
          datasets.push(key);
        }

    if(this.state.datamap1.size >0){
      var data={
        labels: labels,
        datasets:datasets,
        labelName:"Mean Height Per Day",
        header_text:"Bin info"
       }
    return (<BarChart data={data}/>)
    }else{
      return (<h2 style={{color:"red"}}> Analysis data not available </h2>)
}
  }
  parseDataForHeight(){
    var d1=new Date();
    var arrayvalue = new Array();
    d1.setDate(d1.getDate() - 1);
    var oldData = d1.toISOString().split('T')[0];
    var firstTime = oldData.split(':')[0];
    var labelArray = new Array();
    var datamap = new Map();
    var dataset = this.displayValue;
    var prevMaxHeightMorning = 0;
    var prevMaxHeightNoon = 0;
    var prevMaxHeightEvening= 0;
    for(var j=0;j<dataset.length;j++) {
      var datevalue=dataset[j].timestamp;
      var newdate = datevalue.toString().split('T')[0];
      // console.log("new date obtained : ",newdate);
      if(newdate.split('-')[2] == oldData.split('-')[2]) {
        // console.log("data value obtained : ",datevalue);
        var newdate1 = dataset[j].timestamp.toString().split('T')[1];
        var firstTimeDataset = newdate1.split(':')[0];
        console.log("Time obtained :", firstTimeDataset);
          // console.log("Time obtained :", parseInt(firstTimeDataset));
        if(parseInt(firstTimeDataset)>=1 && parseInt(firstTimeDataset)<=11) {
          if(dataset[j].height > prevMaxHeightMorning) {
            prevMaxHeightMorning = dataset[j].height;
            console.log("prevMaxHeightMorning",prevMaxHeightMorning);
            arrayvalue[0] = 30;
          }
        }
        else if(parseInt(firstTimeDataset)>=13 && parseInt(firstTimeDataset)<=19) {
          if(dataset[j].height > prevMaxHeightNoon) {
            prevMaxHeightNoon = dataset[j].height;
            console.log("prevMaxHeightNoon",prevMaxHeightNoon);
            arrayvalue[1] = 40;
          }
        }
        else if (parseInt(firstTimeDataset)>=19 && parseInt(firstTimeDataset)<=23){
          if(dataset[j].height > prevMaxHeightEvening) {
            prevMaxHeightEvening = dataset[j].height;
            console.log("prevMaxHeightEvening",prevMaxHeightEvening);
            arrayvalue[2] = 60;
          }
        }
    }
    }
      datamap.set(arrayvalue[0],"Morning");
      datamap.set(arrayvalue[1],"Noon");
      datamap.set(arrayvalue[2],"Evening");
        this.state.datamap2 = datamap;
        var labels = new Array();
        var datasets = new Array();
        for(let [key, value] of this.state.datamap2) {
          console.log("Key : " +key +"value: " +value);
        }
        for(let [key, value] of this.state.datamap2) {
          labels.push(value);
          datasets.push(key);
        }

    if(this.state.datamap2.size >0){
      var data={
        labels: labels,
        datasets:datasets,
        labelName:"Maximum Height during daytime,noon,evening",
        header_text:"Bin info"
       }
    return (<BarChart data={data}/>)
    }else{
      return (<h2 style={{color:"red"}}> Analysis data not available </h2>)
}
  }


  render() {
    const logout = (response) => {
      console.log("logout", response);
     // console.log("token", response.Zi.access_token);
      localStorage.removeItem('token')
      // redirectVar = <Redirect to="/about" />
      //createBrowserHistory.push('/about')
    }
    return (
            <div>
                <Link to="/about">
              
            <img style={{"margin-left":"30px", "margin-top":"20px" }} src=""/></Link>
            <div style={{"margin-left":"1300px", "margin-top":"20px" }}>
            <GoogleLogout
  buttonText="Logout"
  onLogoutSuccess={logout}

>
</GoogleLogout>
</div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            
            <h1 style={{"margin-left":"500px", "margin-top":"-50px" }}>ANALYSIS OF ELECTION DATA</h1>
            <h4 style={{"margin-left":"1000px", "margin-top":"-50px"}}><Link to="/aboutus">About</Link></h4> 
            <h4 style={{"margin-left":"1100px", "margin-top":"-40px"}}><Link to="/graphdata">Dashboard</Link></h4>
            <br/>
            <br/>
            <br/>
            
            <div style={{"margin-left":"200px", "margin-top":"50px" }}>
            <BarChart />
            </div>
            <div style={{"margin-left":"1300px", "margin-top":"-80px"}}>
           
            
   
           </div>
                
            </div>
           );
  }
}


// function mapStateToProps(state) {
//     return {
//         userTraceActivity: state.LoginReducer.userTraceActivity,
//         currentUserDetails : state.LoginReducer.currentUserDetails
//     };
//
// }
// function matchDispatchToProps(dispatch){
//     console.log("Dispatch",dispatch);
//     return bindActionCreators({userSearch: userSearch, recuriterDashBoardSearch: recuriterDashBoardSearch}, dispatch);
// }
export default GraphData;
// export default connect(mapStateToProps,matchDispatchToProps)(ApplicantDashBoard);
