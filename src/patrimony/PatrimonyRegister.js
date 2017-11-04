import React, {Component} from 'react';
import PatrimonyForm from './PatrimonyForm';
// import RaisedButton from 'material-ui/RaisedButton';
import RealeStateSubForm from './RealeStateSubForm.js';
import IncomeSubForm from './IncomeSubForm.js';
import ExtraSubForm from './ExtraSubForm';
import PatrimonyStore from '../stores/PatrimonyStore';
import PropTypes from 'prop-types';

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
        <div>
          <PatrimonyForm />
          <IncomeSubForm
            parent_id={this.state.id}
          />
        </div>
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
