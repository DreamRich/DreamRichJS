import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Line} from 'react-chartjs-2';
import {getPatrimonyFlow} from '../resources/getModels';
import PatrimonyStore from '../stores/PatrimonyStore';
import formatCurrency from '../utils/currency';

export default class PatrimonyChart extends Component {

  state = {
    data: {
      datasets: [{data:[]}, {data:[]}],
      labels: [],
    },
    options: {
      tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (tooltipItem) => {
            const strValue = formatCurrency(tooltipItem.yLabel);
            return `R$: ${strValue}`;
          },
          title: (tooltipItens) => `Ano ${tooltipItens[0].xLabel}`
        }
      }
    }
  }

  componentWillMount = () => {
    this.setState({
      listener: PatrimonyStore.addListener(this.handleUpdate),
    });

    if (this.props.id){
      getPatrimonyFlow(this.props.id);
    }
  }

  componentWillUnmount = () => this.state.listener.remove()

  handleUpdate = () => {
    const {flow} = PatrimonyStore.getState();
    if (flow.actual_flow_patrimony && flow.suggested_flow_patrimony
      && flow.year_init_to_end) {
      this.setState((state) => {
        const datasets = [
          {
            data: flow.actual_flow_patrimony.flow,
            label: 'Patrimônio atual',
            backgroundColor: '#aaaaaa',
          },
          {
            data: flow.suggested_flow_patrimony.flow,
            label: 'Patrimônio sugerido',
            backgroundColor: '#a1fcff',
          }
        ];
        const labels = flow.year_init_to_end;
        return {...state, data: {datasets, labels, }, };
      });
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.id !== nextProps.id){
      getPatrimonyFlow(nextProps.id);
    }
  }

  static propTypes = {
    id: PropTypes.number,
  }

  render = () => {
    const {data, options} = this.state;

    return (<Line data={data} options={options} />);
  }

}
