import React, {Component} from 'react';
import {getData} from '../resources/Requests';
import {routeMap} from '../routes/RouteMap';
import Highcharts from 'highcharts';
import addFunnel from 'highcharts/modules/funnel';
import PropTypes from 'prop-types';
import GoalStore from '../stores/GoalStore';
import {getGoalManager} from '../resources/getModels';
export default class GoalChart extends Component {

  static propTypes = {
    match: PropTypes.shape({
      params : PropTypes.shape({id: PropTypes.number,})
    }),
    id: PropTypes.number,
    type: PropTypes.string,
    options: PropTypes.object
  }

  constructor(props) {
    super(props);
    const {goals_flow_dic, year_init_to_year_end, manager} = GoalStore.getState();

    this.state = {
      goals_flow_dic,
      year_init_to_year_end,
      manager,
    };

    this.highcharts = null;
  }


  updateState = () => {
    const {goals_flow_dic, year_init_to_year_end, manager} = GoalStore.getState();
    this.setState({
      goals_flow_dic,
      year_init_to_year_end,
      manager,
    });
    if (this.highcharts) {
      this.highcharts.showLoading();
      for(let i = 0; i<this.highcharts.series.length; i++){
        this.highcharts.series[i].remove();
      }

      this.highcharts.addSeries(this.state.total_resource_for_annual_goals);
      this.highcharts.addSeries(this.state.goals_flow_dic.map( e => {e.type = 'column'; return e;}));

      this.highcharts.hideLoading();
    }
  }

  mountChart() {
    addFunnel(Highcharts);
    getData(
      routeMap.financial_planning + this.state.id + '/total_resource_for_annual_goals/',
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
        this.setState({ total_resource_for_annual_goals });
        const gm_data = this.state.goals_flow_dic.map( goal => {goal.type = 'column'; return goal;});
        gm_data.push(total_resource_for_annual_goals);
        this.highcharts = new Highcharts.Chart(
          'chart', {
            series: gm_data,
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
              categories: this.state.year_init_to_year_end
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
      routeMap.goal_manager + this.state.id  + '/',
      (data) => {
        data.goals_flow_dic.forEach((obj) => {obj.type = 'column';});
        this.mountChart(data, fp_id);
      });
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.id !== nextProps.id) {
      this.setState({id: nextProps.id});
      getGoalManager(nextProps.id);
    }
  }

  componentWillMount() {
    const id = this.props.match ? this.props.match.params.id : this.props.id;
    this.setState({
      id,
      listener: GoalStore.addListener(this.updateState),
    });
  }

  componentDidMount = () => this.mountChart()

  componentWillUnmount = () => this.state.listener.remove()

  render() {
    return (<div id='chart'></div>);
  }
}
