import React, {Component} from 'react';
// import {getData} from '../resources/Requests';
import PropTypes from 'prop-types';
import {Doughnut} from 'react-chartjs-2';
// import {routeMap} from '../routes/RouteMap';
import {getActiveChartData} from '../resources/getModels';
import PatrimonyStore from '../stores/PatrimonyStore';
import {Card,
  CardActions,
  // CardHeader,
  CardMedia,
  CardTitle,
  // CardText,
} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import UpdateButtonIcon from 'material-ui/svg-icons/action/autorenew';


const chartOptions = {
  legend: {
    display: false,
  },
  maintainAspectRatio: false,
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
    id: PropTypes.number,
  }

  state = {chartData: {}}

  generateRandomColors = (num) => {
    const intColors = [];
    const extColors = [];
    for(let i = 0;i < num;i++){
      const randomNum = Math.floor(Math.random()*16777215);
      intColors.push('#' + randomNum.toString(16));
      extColors.push('#' + (randomNum + 16).toString(16));
    }

    const colors = [intColors, extColors];
    return colors;
  }

  handleUpdate = () => {
    const {active_chart_dataset, active_type_chart} = PatrimonyStore.getState();

    const colors = this.generateRandomColors(active_chart_dataset.data.length);
    const chartData = {
      datasets: [{
        data: active_chart_dataset.labels,
        backgroundColor: colors[0],
        labels: active_chart_dataset.data,
      },{
        data: active_type_chart.data,
        backgroundColor: colors[1], 
        labels: active_type_chart.labels, 
      },]
    };
    this.setState({chartData});
  }

  getActivesValues = () => {
    const id = parseInt(this.props.id || this.props.match.params.id);
    getActiveChartData(id);
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.id !== prevProps.id) {
      this.getActivesValues();
    }
  }

  componentWillMount = () => {
    this.setState({listener: PatrimonyStore.addListener(this.handleUpdate)});
  }

  componentDidMount = () => {
    this.getActivesValues();
  }

  componentWillUnmount = () => this.state.listener.remove()

  updateGoalsFlow = () => this.getActivesValues()

  render() {
    return (
      <Card>
        <CardActions>
          <RaisedButton
            primary
            className='update-button'
            onClick={this.updateGoalsFlow}
            label='ATUALIZAR'
            icon={<UpdateButtonIcon />}
          />
        </CardActions>
        <CardTitle
          title='Distribuição dos ativos'
        />
        <CardMedia>
          <Doughnut
            data={this.state.chartData}
            options={chartOptions}
            width={420}
            height={350}
            redraw
          />
        </CardMedia>
      </Card>
    );

  }

}

