import React, {Component} from 'react';
import Divider from 'material-ui/Divider';
// import RaisedButton from 'material-ui/RaisedButton';
//import {getData} from '../resources/Headers.js';
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
// import routeMap from '../routes/RouteMap';

class ClientRegister extends Component {

  constructor(props){
    super(props);

    this.state = ClientStore.getState();
  }

  //state = {
  //  selectedCountry: null,
  //  selectedState: null,  // State region
  //}

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


  getDivider = () => {
    return (<Divider className='Divider' />);
  }

  submit = () => {
    this.form.submit();
  }

  render() {
    let subtitleCard = 'Insira as informações básicas do cliente.';
    let listInformationSteps = [
      {
        text: 'Cadastrar Cliente',
        formComponent:
          <ClientForm
            title='Cliente'
            subtitleCard={subtitleCard}
            canSubmit={this.state.canSubmit}
            data={this.state.active_client}
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
        formComponent: <ClientAddressForm 
          id={this.state.active_client.id}
          canSubmit={this.state.canSubmit}
          data={this.state.address}
        />
      },
      {
        text: 'Cadastrar Conta bancária',
        formComponent: <ClientBankAccountForm 
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
        {this.getDivider()}

        <SubStepperClient 
          stepsNumber={listInformationSteps.length}
          listInformationSteps={listInformationSteps}
        />

        {this.getDivider()}
      </div>
    );
  }
}

export default ClientRegister;
