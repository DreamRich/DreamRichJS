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
import ClientDependentForm from './ClientDependentForm';
import ClientBankAccountForm from './ClientBankAccountForm';
import ClientAddressForm from './ClientAddressForm';
import ClientForm from './ClientForm';
import SubStepperClient from '../layout/SubStepperClient';
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
    AppDispatcher.dispatch({
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
    let subtitleCard = 'Insira as informações correspondentes as informações básicas do cliente.';
    let listInformationSteps = [
      {
        text: 'Cadastrar Cliente',
        formComponent:
          <ClientForm
            title='Cliente'
            subtitleCard={subtitleCard}
            ref={ref => this.form = ref}
            selectOption={true}
            canSubmit={this.state.canSubmit}
          />
      },
      {
        text: 'Cadastrar Endereço',
        formComponent: <ClientAddressForm 
          id={this.state.active_client.id}
          canSubmit={this.state.canSubmit}
          countries={this.state.countries}
          states={this.state.states}
          addressType={this.state.addressType}
        />
      },
      {
        text: 'Cadastrar Conta bancária',
        formComponent: <ClientBankAccountForm id={this.state.active_client.id} canSubmit={this.state.canSubmit} />
      },
      {
        text: 'Dependentes',
        formComponent:
          <ClientDependentForm
            parent_id={this.state.active_client.id} canSubmit={this.state.canSubmit}
          />
      }
    ];

    return (
      <div style={{width:'auto'}}>
        {this.getDivider()}

        <SubStepperClient stepsNumber={3} listInformationSteps={listInformationSteps}/>

        {this.getDivider()}
      </div>
    );
  }
}

export default ClientRegister;
