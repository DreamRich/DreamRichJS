import React, {Component} from 'react';
import '../stylesheet/RegisterForms.sass';
import MenuItem from 'material-ui/MenuItem';
import ActionType from '../actions/ActionType';
import AppDispatcher from '../AppDispatcher';
import ClientStore from '../stores/ClientStore';
import '../stylesheet/RegisterForms.sass';
import ClientDependentForm from './form/ClientDependentForm';
import ClientBankAccountForm from './form/ClientBankAccountForm';
import ClientAddressForm from './form/ClientAddressForm';
import ClientForm from './form/ClientForm';
import ClientSpouseForm from './form/ClientSpouseForm';
import SubStepperClient from '../client/SubStepperClient';

class ClientRegister extends Component {

  constructor(props){
    super(props);

    this.state = ClientStore.getState();
  }

  componentWillMount = () => {
    this.setState({listener: ClientStore.addListener(this.handleChange)});
  }

  componentDidMount = () => {
    AppDispatcher.dispatchDefer({
      action: ActionType.CLIENT.DATAFORM
    });
  }

  componentWillUnmount = () => {
    this.state.listener.remove();
  }

  handleChange = () => {
    this.setState(ClientStore.getState());
  }

  // Convert ordinary Array to MenuItem Array to use in drop down list
  convertRegionToMenuItens = (list) => {
    var listMenuItems = list.map((region, index) => {
      let primaryText = `${region.name} - ${region.abbreviation}`;

      return (
        <MenuItem key={index} value={region.id} primaryText={primaryText} />
      );
    });

    return listMenuItems;
  }

  submit = () => {
    this.form.submit();
  }

  render() {
    const listInformationSteps = [
      {
        text: 'Cadastrar Cliente',
        formComponent:
          <ClientForm
            title='Cliente'
            subtitleCard={'Insira as informações básicas do cliente.'}
            canSubmit={this.state.canSubmit}
            data={this.state.active_client}
            isDisable={false}
          />
      },
      {
        text: 'Cadastrar Cônjuge (Opcional)',
        formComponent:
          <ClientSpouseForm
            title='Cônjuge'
            subtitleCard={'Insira as informações do cônjuge deste cliente'}
            id={this.state.active_client.id}
            canSubmit={this.state.canSubmit}
            data={this.state.spouse}
          />
      },
      {
        text: 'Cadastrar Endereço',
        formComponent:
        <ClientAddressForm
          title='Endereço'
          subtitle={'Insira as informações correspondentes ao endereço do cliente'}
          id={this.state.active_client.id}
          canSubmit={this.state.canSubmit}
          data={this.state.address}
        />
      },
      {
        text: 'Cadastrar Conta bancária',
        formComponent:
        <ClientBankAccountForm
          id={this.state.active_client.id}
          canSubmit={this.state.canSubmit}
          data={this.state.bank_account}
        />
      },
      {
        text: 'Dependentes (Opcional)',
        formComponent:
          <ClientDependentForm
            id={this.state.active_client.id}
            canSubmit={this.state.canSubmit}
          />
      }
    ];

    return (
      <div style={{width:'auto'}}>
        <SubStepperClient
          stepsNumber={listInformationSteps.length}
          listInformationSteps={listInformationSteps}
        />
      </div>
    );
  }
}

export default ClientRegister;
