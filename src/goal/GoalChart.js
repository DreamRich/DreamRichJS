import React, {Component} from 'react';
import {getData} from '../resources/Requests';
import {routeMap} from '../routes/RouteMap';
import Highcharts from 'highcharts';
import addFunnel from 'highcharts/modules/funnel';
import PropTypes from 'prop-types';

export default class GoalChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      total_resource_for_annual_goals: { 
        type : 'spline',
        name : 'bla',
        data : [],
        marker: {
          lineWidth: 2,
          lineColor: Highcharts.getOptions().colors[3],
          fillColor: 'white'
        },
      },
      data_series: {
        goals_flow_dic: [],
      },
      data_x: {
        year_init_to_year_end: []
      },

    };
    getData(
      routeMap.total_resource_for_annual_goals,
      (data) => {
        this.setState(prevState => ({total_resource_for_annual_goals: {...prevState.total_resource_for_annual_goals, data : data.total_resource_for_annual_goals}}));
        console.log(this.state.total_resource_for_annual_goals);
        console.log(data);
        console.log('dnfkhbdhba');
      }
    );
  }

  componentWillMount() {
    getData(
      routeMap.total_resource_for_annual_goals,
      (data) => {
        this.setState(prevState => ({total_resource_for_annual_goals: {...prevState.total_resource_for_annual_goals, data : data.total_resource_for_annual_goals}}));
        console.log(this.state.total_resource_for_annual_goals);
        console.log(data);
        console.log('dnfkhbdhba');
      }
    );

  }
  componentDidMount() {
    addFunnel(Highcharts);
    getData(
      routeMap.total_resource_for_annual_goals,
      (data) => {
        this.setState(prevState => ({total_resource_for_annual_goals: {...prevState.total_resource_for_annual_goals, data : data.total_resource_for_annual_goals}}));
        console.log(this.state.total_resource_for_annual_goals);
        console.log(data);
      }
    );
    getData(
      routeMap.goals_flow_dic,
      (data) => {
        var a = [];
        data.goals_flow_dic.forEach((obj) => {obj.type = 'column';});
        console.log(data.goals_flow_dic);
        console.log(this.state.total_resource_for_annual_goals);
        console.log('aqui' + a);
        data.goals_flow_dic.push(this.state.total_resource_for_annual_goals);
        new Highcharts.Chart(
          'chart', {
            series: data.goals_flow_dic,
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
      });
  }

  render() {
    return (<div id='chart'></div>);
  }
}
GoalChart.propTypes={type: PropTypes.string, options: PropTypes.object};
