import React, {Component} from 'react';
import {getData} from '../resources/Requests';
import {goalRouters} from '../routes/RouteMap';
import Highcharts from 'highcharts';
import addFunnel from 'highcharts/modules/funnel';
import PropTypes from 'prop-types';

export default class GoalChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data_series: {
        goals_flow_dic: []
      },
      data_x: {
        year_init_to_year_end: []
      },
    };
  }

  componentDidMount() {
    addFunnel(Highcharts);
    getData(goalRouters['goals_flow_dic'],
      (data) => {
        new Highcharts.Chart(
          'chart', {
            series: data.goals_flow_dic,
            title:{text: 'Goals'},
            chart:{type: 'column'},
            plotOptions: {
              column: {
                stacking: 'normal',
                dataLabels: {
                  enabled: false,
                  color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
              }
            },
            xAxis: {
              categories: data.year_init_to_year_end
            },
            yAxis: {
              min: 0,
              title:{text: 'Values'},
              stackLabels: {
                enabled: true,
                style: {
                  fontWeight: 'bold',
                  color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
              }
            },
          }
        );
      });
  }

  render() {
    return (<div id='chart'></div>);
  }
}
GoalChart.propTypes={type: PropTypes.string, options: PropTypes.object};
