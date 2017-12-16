import React, {Component} from 'react';
import {getData} from '../resources/Requests';
import PropTypes from 'prop-types';
import {Doughnut} from 'react-chartjs-2';
import {routeMap} from '../routes/RouteMap';

const data = {
  datasets: [{
    data: [300, 50, 100],
    backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
    ],
    labels: [
      'Red',
      'Green',
      'Yellow'
    ],
  },{
    data: [30, 500, 100],
    backgroundColor: [
      '#36A2EB',
      '#FF6384',
      '#FFCE56'
    ],
    labels: [
      'Red',
      'Green',
      'Yellow'
    ],
  },],
  options: {
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
  }
};


export default class ActiveChart extends Component {

  static propTypes = {
    match: PropTypes.shape({
      params : PropTypes.shape({id: PropTypes.number,})
    }),
  }
  
  getActivesValues = () => {
    const id = parseInt(this.props.match.params.id);
    console.log(id);
    getData(
      routeMap.active_chart + id,
      (data) => {
        console.log(data);
      }
    );
  }
 
        

  render() {
    this.getActivesValues();
    return (<div><Doughnut data={data} redraw/></div>); 
  }

}

