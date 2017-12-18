import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Line} from 'react-chartjs-2';
import {getPatrimonyFlow} from '../resources/getModels';
import PatrimonyStore from '../stores/PatrimonyStore';

export default class PatrimonyChart extends Component {

  state = {datasets: [{data:[]}, {data:[]}], labels: [] }

  componentWillMount = () => this.setState({
    listener: PatrimonyStore.addListener(this.handleUpdate)
  })

  componentWillUnmount = () => this.state.listener.remove()

  handleUpdate = () => {
    const {flow} = PatrimonyStore.getState();
    if (flow.actual_flow_patrimony && flow.suggested_flow_patrimony) {
      this.setState((state) => {
        const datasets = [
          {
            data: flow.actual_flow_patrimony,
            label: 'Patrimônio atual',
            backgroundColor: '#aaaaaa',
            pointHitRadius: 20,
          },
          {
            data: flow.suggested_flow_patrimony,
            label: 'Patrimônio sugerido',
            backgroundColor: '#a1fcff',
            pointHitRadius: 20,
          }
        ];
        const labels = flow.actual_flow_patrimony.map( (e,index) => index );
        return {...state, datasets, labels};
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
    return (<div>
      {this.props.id}
      <Line data={this.state} />
    </div>);
  }

}
