import React, {Component} from 'react';
import {getData} from '../resources/Requests';
import PropTypes from 'prop-types';
import {Doughnut} from 'react-chartjs-2';
import {routeMap} from '../routes/RouteMap';


const chartOptions = {
  legend: {
    display: false,
  },
  tooltips: {
    callbacks: {
      label: function(tooltipItem, data) {
        var dataset = data.datasets[tooltipItem.datasetIndex];
        var index = tooltipItem.index;
        return dataset.labels[index] + ': ' + dataset.data[index];
      }
    }
  }
};

export default class ActiveChart extends Component {

  static propTypes = {
    match: PropTypes.shape({
      params : PropTypes.shape({id: PropTypes.number,})
    }),
  }
  
  constructor(props) {
    super(props);
    this.state = {
      chartData : {},
    };
  }

  generateRandomColors = (num) => {
    const colors = [];
    const intColors = [];
    const extColors = [];
    for(let i = 0;i < num;i++){
      let randomNum = Math.floor(Math.random()*16777215);
      intColors.push('#' + randomNum.toString(16));
      extColors.push('#' + (randomNum + 16).toString(16));
    }
    colors.push(intColors);
    colors.push(extColors);
    return colors;
  }

  getActivesValues = () => {
    const id = parseInt(this.props.match.params.id);
    getData(
      routeMap.active_chart + id,
      (data) => {
        const colors = this.generateRandomColors(data.active_chart_dataset.data.length);
        const chartData = {
          datasets: [{
            data: data.active_chart_dataset.labels,
            backgroundColor: colors[0], 
            labels: data.active_chart_dataset.data,
          },{
            data: data.active_type_chart.data,
            backgroundColor: colors[1], 
            labels: data.active_type_chart.labels, 
          },]
        };
        this.setState({chartData:chartData});
      }
    );
  }
   
          
    componentDidMount = () => {
      this.getActivesValues();
    }

    render() {
      return (<div><Doughnut data={this.state.chartData} options={chartOptions} redraw/></div>); 
    }

}

