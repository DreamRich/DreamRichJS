import React, {Component} from 'react';
// import RaisedButton from 'material-ui/RaisedButton';
import RealeStateSubForm from './RealeStateSubForm.js';
import ExtraSubForm from './ExtraSubForm';
import PatrimonyStore from '../stores/PatrimonyStore';
import PropTypes from 'prop-types';
import IncomeSubStepper from './IncomeSubStepper';

export default class PatrimonyRegister extends Component {

  static propTypes = {
    main: PropTypes.bool,
  }

  static defaultProps = {
    main: true,
  }

  state = PatrimonyStore.getState()

  componentWillMount = () => this.setState({
    listener: PatrimonyStore.addListener(this.handleUpdate)
  })

  componentWillUnmount = () => this.state.listener.remove()

  handleUpdate = () => this.setState(PatrimonyStore.getState())

  render() {
    if (this.props.main) {
      return (
        <IncomeSubStepper
          patrimony={this.state.patrimony}
          stepsNumber={2}
          canSubmit={this.state.canSubmit}
          income={this.state.income}
        />
      );
    } else {
      return (
        <div>
          <RealeStateSubForm
            parent_id={this.state.id}
          />
          <ExtraSubForm
            parent_id={this.state.id}
            name='company'
            title="Participação em empresa"
          />
          <ExtraSubForm
            parent_id={this.state.id}
            name='equipament'
            title="Equipamentos"
          />
        </div>
      );
    }
  }
}
