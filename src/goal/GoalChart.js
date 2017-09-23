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
    };
  }

  componentWillMount() {
    getData(goalRouters['goals_flow_dic'], this, 'data_series');
    getData(goalRouters['year_init_to_year_end'], this, 'data_x');
  }

  componentDidMount() {
    addFunnel(Highcharts);

    this.setState({chart: new Highcharts[this.props.type || 'Chart'](
      'chart', {
        series: this.state.data_series.goals_flow_dic,
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
      }
    )});
  }

  componentDidUpdate() {
    console.log(this.state.chart);
    console.log(this.state.chart.series);
    console.log(this.state.chart.get('seire'));
    //this.state.chart.update({series: this.state.data_series.goals_flow_dic});
    this.state.data_series.goals_flow_dic.map((e) => { console.log(e); this.state.chart.addSeries(e);});
    this.state.chart.redraw();
  }

  render() {
    const data_series = this.state.data_series.goals_flow_dic;
    console.log(data_series);

    //console.log(new Highcharts.Chart('chart',{}));
    return (<div id='chart'></div>);
  }
}
GoalChart.propTypes={type: PropTypes.string, options: PropTypes.object};
