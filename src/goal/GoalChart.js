import React, {Component} from 'react';
import {getData} from '../resources/Requests';
import {routeMap} from '../routes/RouteMap';
import Highcharts from 'highcharts';
import addFunnel from 'highcharts/modules/funnel';
import PropTypes from 'prop-types';
import GoalStore from '../stores/GoalStore';
import {getGoalManager} from '../resources/getModels';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import UpdateButtonIcon from 'material-ui/svg-icons/action/autorenew';
import getElementCentered from '../utils/getElementCentered';
import _ from 'lodash';
import { Row, Col } from 'react-flexbox-grid';
import CostChangeUnit from '../cost/CostChangeUnit';
import IncomeChangeUnit from '../patrimony/form/IncomeChangeUnit';


export default class GoalChart extends Component {

  static propTypes = {
    match: PropTypes.shape({
      params : PropTypes.shape({id: PropTypes.number,})
    }),
    id: PropTypes.number,
    cost_manager_id: PropTypes.number,
    patrimony_id: PropTypes.number,
    type: PropTypes.string,
    options: PropTypes.object
  }

  constructor(props) {
    super(props);
    const {goals_flow_dic,
      year_init_to_year_end,
      manager} = GoalStore.getState();

    this.state = {
      goals_flow_dic,
      year_init_to_year_end,
      manager,
    };

    this.highcharts = null;
  }


  updateState = () => {
    const {goals_flow_dic,
      year_init_to_year_end,
      manager} = GoalStore.getState();

    const difference = _.differenceWith(goals_flow_dic,
      this.state.goals_flow_dic, _.isEqual).length;

    this.setState({ goals_flow_dic, year_init_to_year_end, manager, });

    if (this.highcharts && difference != 0) {
      this.highcharts.showLoading();
      setTimeout( () => {
        while(this.highcharts.series.length){
          this.highcharts.series[0].remove();
        }
        const series = this.getSeries();
        series.forEach( serie => this.highcharts.addSeries(serie) );
        this.highcharts.xAxis[0].setCategories(year_init_to_year_end);
        this.highcharts.hideLoading();
      }, 500);
    }
  }

  getSeries = () => {
    let series = [];
    if (this.state.goals_flow_dic) {
      series = this.state.goals_flow_dic.map( goal => {
        goal.type = 'column';
        return goal;
      });
    }
    if (this.state.total_resource_for_annual_goals) {
      series.push(this.state.total_resource_for_annual_goals);
    }
    return series;
  }

  getCategories = () => {
    return this.state.year_init_to_year_end || [];
  }

  mountChart() {
    addFunnel(Highcharts);
    const series = this.getSeries();
    this.highcharts = new Highcharts.Chart(
      'chart', {
        series: series,
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
          categories: this.getCategories(),
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
    this.getResourceForGoals();
  }

  getResourceForGoals = () => {
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
      }
    );
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.id !== nextProps.id) {
      this.setState({id: nextProps.id});
      getGoalManager(this.state.manager.id);
    }
  }

  componentWillMount() {
    const id = this.props.match ? this.props.match.params.id : this.props.id;
    this.setState({
      id,
      listener: GoalStore.addListener(this.updateState),
    });
  }

  componentDidMount = () => {
    this.mountChart();
    this.updateGoalsFlow();
  }

  componentWillUnmount = () => this.state.listener.remove()

  updateGoalsFlow = () => {
    if(this.state.manager.id) {
      getGoalManager(this.state.manager.id);
      this.getResourceForGoals();
    }
  }

  getUpdateButton = () => {
    return (
      getElementCentered(
        <RaisedButton
          primary
          className='update-button'
          onClick={this.updateGoalsFlow}
          label='ATUALIZAR'
          icon={<UpdateButtonIcon />}
        />
      )
    );
  }

  render() {
    return (
      <Paper zDepth={1}>
        <Row>
          <Col xs={12}>
            {this.getUpdateButton()}
            <div id='chart'></div>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <CostChangeUnit id={this.props.cost_manager_id} />
          </Col>
          <Col xs={6}>
            <IncomeChangeUnit id={this.props.patrimony_id}/>
          </Col>
        </Row>
      </Paper>
    );
  }
}
