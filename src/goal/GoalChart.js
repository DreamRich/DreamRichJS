import React, {Component} from 'react';
import {getData} from '../resources/Requests';
import {routeMap} from '../routes/RouteMap';
import Highcharts from 'highcharts';
import addFunnel from 'highcharts/modules/funnel';
import PropTypes from 'prop-types';

export default class GoalChart extends Component {
  
  static propTypes = {
    match: {params : {id: PropTypes.number,}}
  }

  constructor(props) {
    super(props);
    this.state = {
      data_series: {
        goals_flow_dic: [],
      },
      data_x: {
        year_init_to_year_end: []
      },

    };
  }

  mountChart(data_flow, fp_id) {
    addFunnel(Highcharts);
    getData(
      routeMap.financial_planning + fp_id + '/total_resource_for_annual_goals/',
      (data) => {
        const total_resource_for_annual_goals = {
          type : 'spline',
          name : 'Recurso Para Objetivo',
          data : [],
          marker: {
            lineWidth: 2,
            lineColor: Highcharts.getOptions().colors[3],
            fillColor: 'white',
          }
        };
        total_resource_for_annual_goals.data = data;
        data_flow.push(total_resource_for_annual_goals);
        new Highcharts.Chart(
          'chart', {
            series: data_flow,
            title:{text: 'Goals'},
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
      }
    );
  }

  getGoalsData(gm_id, fp_id) {
    getData(
      routeMap.goals_flow_dic + gm_id  + '/',
      (data) => {
        data.goals_flow_dic.forEach((obj) => {obj.type = 'column';});
        this.mountChart(data.goals_flow_dic, fp_id);
      });
  }

  componentDidMount() {
    getData(
      routeMap.financial_planning + this.props.match.params.id + '/respective_clients/',
      (data) => {
        this.getGoalsData(data['gm'], data['fp']);
      }
    );
  }

  render() {
    return (<div id='chart'></div>);
  }
}
GoalChart.propTypes={type: PropTypes.string, options: PropTypes.object};
