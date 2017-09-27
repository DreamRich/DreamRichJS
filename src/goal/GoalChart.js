import React, {Component} from 'react';
import {getDataReal} from '../resources/Requests';
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
    getDataReal(goalRouters['goals_flow_dic'],
      (data) => {
        new Highcharts.Chart(
          'chart', {
            series: data.goals_flow_dic,
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
            tooltip: {
              headerFormat: '<b>{point.x}</b><br/>',
              pointFormat: '{series.name}: {point.y}<br/>Objetivos Totais: {point.stackTotal}'
            },
            xAxis: {
              categories: data.year_init_to_year_end
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
