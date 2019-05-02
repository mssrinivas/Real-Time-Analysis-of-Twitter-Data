/*import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

class BarChart extends Component{
  constructor(){
    super();
    this.chartColor = [
      'rgba(255, 99, 132, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(255, 206, 86, 0.6)',
      'rgba(75, 192, 192, 0.6)',
      'rgba(153, 102, 255, 0.6)'
    ];
  }

  createBarChartData(data){
    console.log("data :",data);
    var data = {
      labels: data.labels,
      datasets:[
        {
          label:data.labelName,
          data:data.datasets,
          backgroundColor:this.chartColor
        }
      ]
    }
    return data;
  }



  render(){
    console.log("this.props.data",this.props.data);
    return (
      <div className="chart">
        <Bar
          data={this.createBarChartData(this.props.data)}
          options={{
            title:{
              display:true,
              text:this.props.data.header_text,
              fontSize:25
            },
            legend:{
              display:true,
              position:"right"
            }
          }}
        />
        </div>
    )
  }
}

export default BarChart;
*/

import React, {Component} from 'react';
import axios from 'axios';
import Chart from "react-google-charts";

const pieOptions = {
    title: "CMPE 266 Pie Chart",
    pieHole: 0,
    slices: [
        {
            color: "#2BB673"
        },
        {
            color: "#d91e48"
        },
        {
            color: "#007fad"
        },
        {
            color: "#e9a227"
        }
    ],
    legend: {
        position: "bottom",
        alignment: "center",
        textStyle: {
            color: "233238",
            fontSize: 14
        }
    },
    tooltip: {
        showColorCode: true
    },
    chartArea: {
        left: 0,
        top: 0,
        width: "100%",
        height: "80%"
    },
    fontName: "Roboto"
};



class BarChart extends Component {
    constructor(){
        super();
        this.state = {
            cp : 10,
            cn : 10,
            bp : 10,
            bn : 10
        }
    }
    //get the Data from backend
    componentDidMount(){
        axios.get('http://localhost:3001/')
            .then((response) => {
                //update the state with the response data
                this.setState({
                    cp : response.data.cp
                });
                this.setState({
                    cn : response.data.cn
                });
                this.setState({
                    bp : response.data.bp
                });this.setState({
                    bn : response.data.cp
                });

            });
    }


    render(){
    return(
        <Chart
            width={'1000px'}
            height={'500px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[["Party", "Polarity"], ["Congress Positive", this.state.cp], ["Congress Negative", this.state.cn], ["BJP Positive", this.state.bp], ["BJP Negative", this.state.bn]]}
            options={pieOptions}
            graph_id="PieChart"
        />
    )
    }
}
//export Home Component
export default BarChart;