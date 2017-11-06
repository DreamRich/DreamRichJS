import React, {Component} from 'react';
// import RaisedButton from 'material-ui/RaisedButton';
import PatrimonyStore from '../stores/PatrimonyStore';
import PropTypes from 'prop-types';
import IncomeSubStepper from './IncomeSubStepper';
import AssetSubStepper from './AssetSubStepper';

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
          incomes={this.state.incomes}
        />
      );
    } else {
      return (
        <AssetSubStepper
          id={this.state.patrimony.id}
          stepsNumber={5}
          realestates={this.state.realestates}
          equipments={this.state.equipments}
          companyparticipations={this.state.companyparticipations}
          activemanager={this.state.activemanager}
          actives={this.state.actives}
          canSubmit={this.state.canSubmit}
          types={this.state.types}
          arrearanges={this.state.arrearanges}
        />
      );
    }
  }
}
