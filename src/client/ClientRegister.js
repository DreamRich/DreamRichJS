import React, {Component} from 'react';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import {getUrl} from '../routes/RouteMap.js';
import {getHeader} from '../resources/Headers.js';
import '../stylesheet/RegisterForms.sass';
import MenuItem from 'material-ui/MenuItem';
import ClientStore from '../stores/ClientStore';
import '../stylesheet/RegisterForms.sass';
import ClientDependentForm from './ClientDependentForm';
import ClientBankAccountForm from './ClientBankAccountForm';
import ClientAddressForm from './ClientAddressForm';
import ClientField from './fields/ClientField';
import SubStepperClient from '../layout/SubStepperClient';

class ClientRegister extends Component {

  constructor(props){
    super(props);
  }

  state = {
    canSubmit: true,
    sponse: false,

    countryListMenuItems: [],
    stateListMenuItems: [],
    type_of_address: [''],
    selectedCountry: null,
    selectedState: null,  // State region
  }

  enableButton = () => {
    this.setState({
      canSubmit: true,
    });
  }

  componentWillMount = () => {
    this.setState({listener: ClientStore.addListener(this.handleChange)});
    this.fetchCountrys();
    fetch('/api/client/address/type_of_address/', {
      headers: getHeader()
    }).then((response) => response.json()).then( (type_of_address) =>
      this.setState({type_of_address}));
  }

  componentWillUnmount = () => {
    this.state.listener.remove();
  }

  handleChange = () => {
    /* This timeout is to prevent the update action launch together with
    * react dipatcher and throw error of Invariant Violation Dispatch.dispatch
    */
    setTimeout(() =>
      this.setState(ClientStore.getState()), 500);
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

  fetchStates = (selectedCountry) => {
    var stateListArray = {};
    var url = `${getUrl('state')}${'?country_id'}=${selectedCountry}`;

    fetch(url, {
      method: 'get',
      headers: getHeader(),
      mode: 'cors',
      cache: 'default'
    })
      .then((response) => {
        if(response.ok) {
          console.log('State list was gotten from API');
          stateListArray = response.json();
        } else {
          throw new Error ('Couldn\'t get state list from API');
        }

        return stateListArray;
      })
      .then((stateListArray) => {
        let stateListMenuItems = this.convertRegionToMenuItens(stateListArray);
        this.setState({stateListMenuItems});
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  fetchCountrys = () => {
    var countryListArray = {};

    fetch(getUrl('country'), {
      method: 'get',
      headers: getHeader(),
      mode: 'cors',
      cache: 'default'
    })
      .then((response) => {
        if(response.ok) {
          console.log('Country list was gotten from API');
          countryListArray = response.json();
        } else {
          throw new Error ('Couldn\'t get country list from API');
        }

        return countryListArray;
      })
      .then((countryListArray) => {
        let countryListMenuItems = this.convertRegionToMenuItens(countryListArray);
        this.setState({countryListMenuItems});
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  getDivider = () => {
    return (<Divider style={{marginTop: '25px', marginBottom: '30px'}} />);
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
          <div>
            <ClientField title='Cliente' subtitleCard={subtitleCard} canSubmit={this.state.canSubmit} ref={ref => this.form = ref} selectOption={true} />
          </div>
      },
      {
        text: 'Cadastrar Endereço',
        formComponent: <ClientAddressForm id={this.state.id} />
      },
      {
        text: 'Cadastrar Conta bancária',
        formComponent: <ClientBankAccountForm id={this.state.id} />
      },
      {
        text: 'Dependentes',
        formComponent:
          <ClientDependentForm
            parent_id={this.state.id}
          />
      }
    ];

    return (
      <div style={{width:'auto'}}>
        {this.getDivider()}

        <SubStepperClient stepsNumber={3} listInformationSteps={listInformationSteps}/>

        {this.getDivider()}

        <RaisedButton onClick={this.submit} disabled={!this.state.canSubmit} style={{marginLeft: '50%', marginRight: '50%' }} >
          Submit
        </RaisedButton>
      </div>
    );
  }
}

export default ClientRegister;
