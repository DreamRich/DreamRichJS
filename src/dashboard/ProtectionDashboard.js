import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../stylesheet/RegisterForms.sass';
import ProtectionStore from '../stores/ProtectionStore';
// import {postProtectionManager} from '../resources/saveModels';
import {ActualPatrimonySuccessionForm, FuturePatrimonySuccessionForm} from '../protection/form/SuccessionForm';
import PrivatePensionForm from '../protection/form/PrivatePensionForm';
import ReserveInLackForm from '../protection/form/ReserveInLackForm';
import LifeInsuranceForm from '../protection/form/LifeInsuranceForm';
// import EmergencyForm from '../protection/form/EmergencyForm';
import Dashboard from '../components/Dashboard';
import EmergencyInformation from '../protection/EmergencyInformation';
import SuccessionValue from '../protection/SuccessionValue';
import SuccessionSituation from '../protection/SuccessionSituation';

export default class ProtectionRegister extends Component {

  static propTypes = {
    id: PropTypes.number,
  }

  state = ProtectionStore.getState()

  componentWillMount = () => {
    this.setState({
      listener: ProtectionStore.addListener(this.handleChange)
    });
  }


  componentWillUnmount = () => this.state.listener.remove()

  handleChange = () => this.setState(ProtectionStore.getState())

  render() {
    const {
      actual_patrimony_succession,
      future_patrimony_succession
    } = this.state;

    const data = {actual: actual_patrimony_succession,
      future: future_patrimony_succession};

    const listInformationSteps = [
      <SuccessionValue
        key='SuccessionValue1'
        size={6}
        data={data}
        title='Taxas'
        labels={['Patrimônio para ITCMD',
          'Patrimônio para OAB', 'Patrimônio outras taxas', 'Patrimônio para sucessão']}
        itens={['patrimony_necessery_to_itcmd',
          'patrimony_necessery_to_oab', 'patrimony_to_other_taxes',
          'patrimony_total_to_sucession']}
      />,
      <SuccessionValue
        key='SuccessionValue2'
        size={6}
        data={data}
        title='Patrimônio livre de taxas'
        labels={['Patrimônio livre de taxas','Patrimônio para sucessão', 'Patrimônio restante']}
        itens={['patrimony_free_of_taxes',
          'patrimony_total_to_sucession', 'leftover_after_sucession']}
      />,
      <SuccessionSituation
        key='SuccessionSituation'
        reserve={this.state.reserve_in_lack}
        {...data}
        size={6}
      />,
      <ActualPatrimonySuccessionForm
        key='ActualPatrimonySuccessionForm'
        id={this.state.protection_manager.id}
        data={actual_patrimony_succession}
        disabled={true}
        size={6}
      />,
      <FuturePatrimonySuccessionForm
        key='FuturePatrimonySuccessionForm'
        id={this.state.protection_manager.id}
        data={future_patrimony_succession}
        disabled={true}
        size={6}
      />,
      <EmergencyInformation
        key='emergency_form'
        data={this.state.emergency_reserve}
        disabled={!this.state.emergency_reserve_id}
        size={6}
      />,
      <ReserveInLackForm
        key='ReserveInLackForm'
        id={this.state.protection_manager.id}
        data={this.state.reserve_in_lack}
        disabled={true}
        size={6}
      />,
      <PrivatePensionForm
        key='PrivatePensionForm'
        id={this.state.protection_manager.id}
        disabled={true}
        size={12}
      />,
      <LifeInsuranceForm
        key='LifeInsuranceForm'
        id={this.state.protection_manager.id}
        size={12}
      />,
    ];

    return (
      <Dashboard>
        {listInformationSteps}
      </Dashboard>
    );
  }
}
