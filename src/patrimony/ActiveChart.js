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
      foo : {},
    };
  }

  generateRandomColors = (num) => {
    const colors = [];
    for(let i = 0;i < num;i++){
      colors.push('#' + Math.floor(Math.random()*16777215).toString(16));
    }
    console.log(colors);
    return colors;
  }

  getActivesValues = () => {
    const id = parseInt(this.props.match.params.id);
    console.log(id);
    getData(
      routeMap.active_chart + id,
      (data) => {
        const colors = this.generateRandomColors(data.active_chart_dataset.data.length);
        const foo = {
          datasets: [{
            data: data.active_chart_dataset.labels,
            backgroundColor: colors, 
            labels: data.active_chart_dataset.data,
          },{
            data: data.active_type_chart.data,
            backgroundColor: [
              '#36A2EB',
              '#FF6384',
              '#FFCE56'
            ],
            labels: data.active_type_chart.labels, 
          },]
        };
        this.setState({foo:foo});
      }
    );
  }
   
          
    componentDidMount = () => {
      this.getActivesValues();
    }

    render() {
      console.log(this.state.foo);
      return (<div><Doughnut data={this.state.foo} options={chartOptions} redraw/></div>); 
    }

}

